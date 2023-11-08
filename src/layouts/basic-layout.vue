<template>
  <pro-provider :content-width="contentWidth">
    <a-layout class="ant-pro-basicLayout">
      <template v-if="isMobile">
        <a-drawer
          :bodyStyle="{ padding: 0, height: '100%' }"
          placement="left"
          :width="sideWidth"
          :closable="false"
          :visible="!collapsed"
          @update:visible="updateCollapsed"
        >
          <sider-menu
            style="height: 100%"
            :theme="theme"
            :layout="layout"
            :title="title"
            :fixed="fixedSidebar"
            :menus="menus"
            :sider-width="sideWidth"
            :split-menus="false"
            :collapsed-button="false"
            :collapsed="false"
            v-model:open-keys="openKeys"
            v-model:selected-keys="selectedKeys"
          />
        </a-drawer>
      </template>
      <sider-menu
        v-else-if="!hasTopMenu"
        :theme="theme"
        :layout="layout"
        :title="title"
        :fixed="fixedSidebar"
        :menus="menus"
        :collected-menu-list="collectedMenuList"
        :split-menus="splitMenus"
        :collapsed-button="!splitMenus"
        v-model:collapsed="collapsed"
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
        @uncollectMenu="handleUncollectMenu($event)"
        @collectMenu="handleCollectMenu($event)"
      >
        <template v-slot:header>
          <a-input-search
            class="left-top-menu-search"
            placeholder="在此处搜索菜单"
            :allow-clear="!collapsed"
            @search="handleSearhMenu"
          ></a-input-search>
        </template>
      </sider-menu>
      <a-layout>
        <header-view
          :theme="theme"
          :layout="layout"
          :title="title"
          :menus="menus"
          :collected-menu-list="collectedMenuList"
          :sider-width="sideWidth"
          :has-sider-menu="hasSideMenu"
          :fixed-header="fixedHeader"
          :split-menus="splitMenus"
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
          @uncollectMenu="handleUncollectMenu($event)"
          @collectMenu="handleCollectMenu($event)"
        >
          <div style="text-align: right">
            <console-icon />
            <setting-drawer />
            <notice-icon />
            <avatar-dropdown :current-user="currentUser" />
            <!-- <select-lang /> -->
          </div>
        </header-view>
        <multi-tab-vue v-if="multiTab" :fixed="multiTabFixed" :sider-width="sideWidth" />
        <router-view v-slot="{ Component }">
          <wrap-content>
            <component :is="Component"></component>
          </wrap-content>
        </router-view>
        <message-popup />
      </a-layout>
    </a-layout>
  </pro-provider>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { genMenuInfoByKeywords, checkMenuTitleByKeywords } from './menu-util';
import { default as WrapContent } from '@/components/base-layouts/wrap-content/index.vue';
import { default as SiderMenu } from '@/components/base-layouts/sider-menu/index.vue';
import { default as HeaderView } from '@/components/base-layouts/header/index.vue';
// import { default as SelectLang } from '@/components/select-lang/index.vue';
import { default as AvatarDropdown } from '@/components/base-layouts/avatar-dropdown/index.vue';
import { default as SettingDrawer } from '@/components/setting-drawer/index.vue';
import { default as NoticeIcon } from '@/components/notice-icon/index.vue';
import { default as ConsoleIcon } from '@/components/base-layouts/console-icon/index.vue';
import { default as MessagePopup } from './components/message-popup/index.vue';
import type { MenuDataItem } from '@/router/typing';
import { MultiTab as MultiTabVue } from '@/components/multi-tab';
import { injectMenuState } from './use-menu-state';
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: 'BasicLayout',
  setup() {
    const userStore = useUserStore();
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const menuState = injectMenuState();
    const isMobile = inject('isMobile', ref(false));
    const currentUser = computed(() => userStore.currentUser);
    const collectedMenuList = computed(() => {
      if (keywords.value) {
        return userStore.collectedMenuList.filter(item =>
          checkMenuTitleByKeywords(item.meta.title, keywords.value)
        );
      } else {
        return userStore.collectedMenuList;
      }
    });
    const hasSideMenu = computed(
      () => menuState.layout.value === 'side' || menuState.layout.value === 'left'
    );
    const hasTopMenu = computed(() => menuState.layout.value === 'top');
    const keywords = ref('');
    // gen menus
    const allowRouters = computed(() => userStore.allowRouters); // genMenuInfo(filterMenu(routes)).menus;
    const menus = computed(() =>
      genMenuInfoByKeywords(allowRouters.value, keywords.value, collectedMenuList.value)
    );
    /** 菜单搜索 */
    const handleSearhMenu = (value: string) => {
      if (menuState.collapsed.value) {
        menuState.collapsed.value = false;
      }
      keywords.value = value ? value.trim() : '';
    };
    /** 取消收藏菜单事件 */
    const handleUncollectMenu = menuId => {
      if (!menuId) return;
      userStore['UNCOLLECT_MENU'](menuId);
      proxy.$message.success('取消收藏');
    };
    /** 收藏菜单事件 */
    const handleCollectMenu = menu => {
      if (!menu.meta?.id) return;
      userStore['COLLECT_MENU'](menu as MenuDataItem);
      proxy.$message.success('收藏成功');
    };

    onMounted(() => {
      /** 加载用户收藏的菜单 */
      userStore['GET_COLLECTED_MENUS']();
    });
    return {
      t,
      currentUser,
      menus,
      ...menuState,
      hasSideMenu,
      hasTopMenu,
      isMobile,
      collectedMenuList,
      handleSearhMenu,
      handleUncollectMenu,
      handleCollectMenu
    };
  },
  components: {
    MultiTabVue,
    WrapContent,
    SiderMenu,
    HeaderView,
    MessagePopup,
    // SelectLang,
    AvatarDropdown,
    SettingDrawer,
    NoticeIcon,
    ConsoleIcon
  }
});
</script>

<style lang="less">
body {
  @import '../components/base-layouts/basic-layout.less';
}
</style>
