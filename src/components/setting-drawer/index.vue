<template>
  <span
    class="noticeButton ant-dropdown-trigger ant-pro-dropdown ant-pro-dropdown-action action"
    @click="handleClickShowButton"
  >
    <avic-icon
      svg="avic-t-shirt-fill"
      class="anticon icon"
      style="vertical-align: -0.175em; font-size: 1.2em"
    />
  </span>
  <a-drawer
    :visible="visible"
    :width="300"
    :getContainer="getContainer"
    @close="() => setShow(false)"
    style="z-index: 99"
    placement="right"
  >
    <!-- <template #handle>
      <div :class="`${prefixCls}-handle`" @click="handleClickShowButton">
        <close-outlined v-if="visible" :style="iconStyle" />
        <setting-outlined v-else :style="iconStyle" />
      </div>
    </template> -->

    <div :class="`${prefixCls}-content`">
      <!-- <body-wrapper key="pageStyle" :title="t('app.setting.pagestyle')">
        <block-checkbox
          :value="navTheme"
          :list="themeList.themeList"
          @change="val => handleChange('theme', val)"
        />
      </body-wrapper> -->
      <body-wrapper key="mode" :title="t('app.setting.navigationmode')">
        <block-checkbox
          :value="layout"
          @change="val => handleChange('layout', val)"
        ></block-checkbox>
      </body-wrapper>
      <a-divider />
      <body-wrapper key="themeColor" :title="t('app.setting.themecolor')">
        <theme-color
          :value="genStringToTheme(primaryColor)"
          :colorList="themeList.colorList"
          @change="val => handleChange('primaryColor', val)"
        />
      </body-wrapper>
      <!--注释掉无用设置
      <layout-change
        :contentWidth="contentWidth"
        :fixedHeader="fixedHeader"
        :fixSiderbar="fixSidebar"
        :layout="layout"
        :splitMenus="splitMenus"
        @change="({ type, value }) => handleChange(type, value)"
      />
 
      <a-divider />

      <body-wrapper :title="t('app.setting.othersettings')">
        <a-list :split="false">
          <a-list-item>
            <span style="opacity: 1">{{ t('app.setting.transitionname') }}</span>
            <template #actions>
              <a-select
                size="small"
                style="width: 100px"
                :value="transitionName || 'null'"
                @change="val => handleChange('transition', val)"
              >
                <a-select-option value="null">Null</a-select-option>
                <a-select-option value="slide-fadein-up">Slide Up</a-select-option>
                <a-select-option value="slide-fadein-right">Slide Right</a-select-option>
                <a-select-option value="fadein">Fade In</a-select-option>
                <a-select-option value="zoom-fadein">Zoom</a-select-option>
              </a-select>
            </template>
          </a-list-item>

          <a-tooltip>
            <a-list-item>
              <span style="opacity: 1">{{ t('app.setting.multitab') }}</span>
              <template #actions>
                <a-switch
                  size="small"
                  :checked="multiTab"
                  @change="() => handleChange('multiTab', !multiTab)"
                />
              </template>
            </a-list-item>
          </a-tooltip>

          <a-tooltip placement="left" :title="t('app.setting.multitab.fixed.hit')">
            <a-list-item>
              <span :style="{ opacity: !multiTab ? '0.5' : '1' }">
                {{ t('app.setting.multitab.fixed') }}
              </span>
              <template #actions>
                <a-switch
                  size="small"
                  :checked="multiTabFixed"
                  :disabled="!multiTab && !fixedHeader"
                  @change="() => handleChange('multiTabFixed', !multiTabFixed)"
                />
              </template>
            </a-list-item>
          </a-tooltip>

          <a-list-item>
            <span style="opacity: 0.5">{{ t('app.setting.weakmode') }}</span>
            <template #actions>
              <a-switch size="small" :checked="false" :disabled="true" />
            </template>
          </a-list-item>
        </a-list>
      </body-wrapper> -->
    </div>
  </a-drawer>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, ref } from 'vue';
import { useProProvider } from '../base-layouts/pro-provider';
import type { ContentWidth, LayoutType } from '../base-layouts/typing';
import BodyWrapper from './body-wrapper.vue';
import BlockCheckbox from './block-checkbox.vue';
import { useI18n } from 'vue-i18n';
import type { LayoutBlockTheme } from './layout-block.vue';
import { genStringToTheme } from './util';
import ThemeColor from './theme-color.vue';
import { useAppStore, colorList as colors } from '@/store/app';

const iconStyle = {
  color: '#fff',
  fontSize: '20px'
};

export interface ThemeItem {
  disabled?: boolean;
  key: LayoutBlockTheme;
  url?: string;
  title: string;
}

export interface SettingState {
  theme: 'dark' | 'light' | 'realDark';
  primaryColor: string;
  layout: 'side' | 'top' | 'mix' | 'left';
  colorWeak: boolean;
  splitMenus: boolean;
  contentWidth: ContentWidth;
  fixedHeader: boolean;
  fixSiderbar: boolean;
  hideHintAlert: boolean;
  hideCopyButton: boolean;
  transitionName: string;
  multiTab: boolean;
  multiTabFixed: boolean;
}

const getThemeList = (t: (s: string) => string) => {
  const colorList = colors;
  const themeList: ThemeItem[] = [
    {
      key: 'light',
      title: t('app.setting.pagestyle.light')
    },
    {
      key: 'dark',
      title: t('app.setting.pagestyle.dark')
    },
    {
      key: 'realDark',
      title: t('app.setting.pagestyle.realdark')
    }
  ];

  return {
    colorList,
    themeList
  };
};

export default defineComponent({
  name: 'SettingDrawer',
  props: {
    // value: {
    //   type: Object as PropType<SettingProps>,
    //   required: true,
    // },
    getContainer: Function as PropType<(node: HTMLElement) => HTMLElement>
  },
  emits: ['change'],
  setup() {
    const { getPrefixCls } = useProProvider();
    const prefixCls = getPrefixCls('setting-drawer');
    const visible = ref(false);
    const { t } = useI18n();
    const themeList = getThemeList(t);
    const appStore = useAppStore();
    const layout = computed(() => appStore.layout);
    const navTheme = computed(() => appStore.navTheme);
    const primaryColor = computed(() => appStore.primaryColor);
    const contentWidth = computed(() => appStore.contentWidth);
    const splitMenus = computed(() => appStore.splitMenus);
    const fixedHeader = computed(() => appStore.fixedHeader);
    const fixSidebar = computed(() => appStore.fixedSidebar);
    const transitionName = computed(() => appStore.transitionName);
    const multiTab = computed(() => appStore.multiTab);
    const multiTabFixed = computed(() => appStore.multiTabFixed);
    const setShow = (flag: boolean) => {
      visible.value = flag;
    };

    const handleClickShowButton = (e: Event) => {
      // 组件库内部会劫持，导致触发两遍，做一下判断，组件库修复后可去除判断
      if (e) {
        visible.value = !visible.value;
      }
    };
    const updateLayoutSetting = (val: LayoutType) => {
      if (val !== 'mix') {
        // 强制停止使用分割菜单
        appStore.SET_SPLIT_MENUS(false);
      } else {
        // Mix 模式下，header 必须被锁定
        appStore.SET_FIXED_HEADER(true);
      }
      appStore.SET_LAYOUT(val);
    };

    const handleChange = (type: string, val: any) => {
      if (type === 'layout') {
        updateLayoutSetting(val as LayoutType);
      } else if (type === 'theme') {
        appStore.SET_NAV_THEME(val);
      } else if (type === 'primaryColor') {
        appStore.SET_PRIMARY_COLOR(val);
      } else if (type === 'splitmenus') {
        appStore.SET_SPLIT_MENUS(val);
      } else if (type === 'fixSiderbar') {
        appStore.SET_FIXED_SIDEBAR(val);
      } else if (type === 'fixedHeader') {
        // 关闭 header 固定时，取消 multi-tab 固定
        if (!val) {
          appStore.SET_FIXED_MULTI_TAB(false);
        }
        appStore.SET_FIXED_HEADER(val);
      } else if (type === 'contentWidth') {
        appStore.SET_CONTENT_WIDTH(val);
      } else if (type === 'transition') {
        appStore.SET_TRANSITION_NAME(val === 'null' ? '' : val);
      } else if (type === 'multiTab') {
        appStore.SET_MULTI_TAB(val);
      } else if (type === 'multiTabFixed') {
        if (!fixedHeader.value) {
          appStore.SET_FIXED_HEADER(true);
        }
        appStore.SET_FIXED_MULTI_TAB(val);
      }
    };
    return {
      t,
      layout,
      navTheme,
      primaryColor,
      contentWidth,
      splitMenus,
      fixedHeader,
      fixSidebar,
      transitionName,
      multiTab,
      multiTabFixed,
      prefixCls,
      iconStyle,
      themeList,
      genStringToTheme,
      visible,
      setShow,
      handleChange,
      handleClickShowButton
    };
  },
  components: {
    ThemeColor,
    BodyWrapper,
    BlockCheckbox
  }
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
