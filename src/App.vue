<template>
  <a-config-provider :locale="locale">
    <router-view />
    <teleport-container></teleport-container>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { computed, provide, watch } from 'vue';

import { STORAGE_LANG_KEY, useAppStore } from '@/store/app';
import { localStorage } from '@/utils/local-storage';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { useI18n } from 'vue-i18n';
import useMenuState, { MenuStateSymbol } from './layouts/use-menu-state';
import { useMultiTabStateProvider } from './components/multi-tab';
import { defaultLang } from './locales';
import type { ConfigProviderProps } from 'ant-design-vue/lib/config-provider';
import { updateTheme } from '@/components/setting-drawer/util';
import { omit } from 'lodash-es';
const i18n = useI18n();
const appStore = useAppStore();
// const multiTabState = useMultiTabStateProvider();
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  meta: {
    icon: 'home-outlined',
    title: '首页',
    lock: true,
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideChildrenInMenu: true
  }
};
const multiTabState = useMultiTabStateProvider([
  {
    path: '/dashboard',
    route: { ...omit(dashboardRoute, ['matched']) },
    tabTitle: '首页',
    tabPath: '/dashboard',
    lock: true
  }
]);
const colSize = useMediaQuery();
const isMobile = computed(() => colSize.value === 'sm' || colSize.value === 'xs');
const menuState = useMenuState(
  {
    collapsed: isMobile.value,
    openKeys: [] as string[],
    selectedKeys: [] as string[],
    isMobile
  },
  multiTabState
);
const lang = localStorage.get(STORAGE_LANG_KEY, defaultLang);
if (lang) {
  appStore.SET_LANG(lang);
}
const theme = computed(() => appStore.navTheme);
const primaryColor = computed(() => appStore.primaryColor);
watch(
  theme,
  () => {
    if (theme.value === 'realDark') {
      document
        .getElementsByTagName('html')[0]
        .setAttribute('data-pro-theme', 'antdv-pro-theme-dark');
    } else {
      document
        .getElementsByTagName('html')[0]
        .setAttribute('data-pro-theme', 'antdv-pro-theme-light');
    }
  },
  { immediate: true }
);
watch(
  [theme, primaryColor],
  () => {
    updateTheme(theme.value === 'realDark', primaryColor.value);
  },
  { immediate: true }
);
provide('isMobile', isMobile);
provide(
  'isRealDark',
  computed(() => theme.value === 'realDark')
);
provide(MenuStateSymbol, menuState);
const locale = computed(() => {
  return i18n.getLocaleMessage(i18n.locale.value).antd as ConfigProviderProps['locale'];
});
</script>
