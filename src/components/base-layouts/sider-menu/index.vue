<template>
  <template v-if="computedMenus.length || layout != 'left'">
    <div
      v-if="fixed"
      class="ant-pro-fixed-stuff"
      :style="{
        width: `${runtimeSideWidth}px`,
        overflow: 'hidden'
      }"
    />
    <a-layout-sider
      v-bind="$attrs"
      :class="{
        [prefixCls]: true,
        [`${prefixCls}-${runtimeTheme}`]: true,
        [`${prefixCls}-${layout}`]: true,
        [`${prefixCls}-fixed`]: fixed
      }"
      :breakpoint="breakpoint"
      :width="runtimeSideWidth"
      :collapsed="collapsed"
      :collapsible="false"
      :collapsed-width="collapsedWidth"
      :theme="runtimeTheme"
      :style="{
        overflow: 'hidden',
        paddingTop: isMix ? `${headerHeight}px` : undefined
      }"
    >
      <div v-if="!isMix" class="ant-pro-sider-logo">
        <router-link :to="{ name: 'index' }">
          <system-logo :title="title" :horizontal="false" :collapsed="collapsed"></system-logo>
        </router-link>
      </div>
      <slot name="header" />
      <div style="flex: 1; overflow: hidden auto">
        <fav-menu
          v-if="layout != 'left'"
          :theme="runtimeTheme"
          :showType="showType"
          :selected-keys="selectedKeys"
          :collected-menu-list="collectedMenuList"
          @selectCollectedMenu="({ key }) => handleSelectedKeys([key])"
          @uncollectMenu="$emit('uncollectMenu', $event)"
          @collectMenu="$emit('collectMenu', $event)"
        />
        <base-menu
          :theme="runtimeTheme"
          :menus="computedMenus"
          :collapsed="collapsed"
          :selected-keys="selectedKeys"
          :open-keys="openKeys"
          :showType="showType"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
          @mouseenter="$emit('mouseenter', $event)"
          @mouseleave="$emit('mouseleave', $event)"
          @itemHover="$emit('itemHover', $event)"
          @uncollectMenu="handleUncollectMenu($event)"
          @collectMenu="handleCollectMenu($event)"
          :customItem="customItem"
          under-sider
        />
      </div>
      <div :class="`${prefixCls}-links`">
        <a-menu
          v-if="collapsedButton"
          :class="`${prefixCls}-link-menu`"
          :inline-indent="16"
          :theme="runtimeTheme"
          :selected-keys="[]"
          :open-keys="[]"
          mode="inline"
        >
          <a-menu-item
            key="collapsed-button"
            :class="`${prefixCls}-collapsed-button`"
            :title="null"
            @click="handleCollapse"
          >
            <template #icon>
              <slot name="collapsedButton">
                <menu-unfold-outlined v-if="collapsed" />
                <menu-fold-outlined v-else />
              </slot>
            </template>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
  </template>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, toRefs } from 'vue';
import { useProProvider } from '../pro-provider/index';
import BaseMenu, { BaseMenuProps } from '../base-menu/index.vue';
import SystemLogo from '@/components/base-layouts/system-logo/index.vue';
import FavMenu from '../fav-menu/index.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { findMenuChildren } from '@/layouts/menu-util';
import { useRoute } from 'vue-router';
import type { RouteProps, LayoutType } from '../typing';

import type { MenuTheme } from 'ant-design-vue';
import type { Breakpoint } from '@/typing';
const SiderMenuProps = Object.assign({}, BaseMenuProps, {
  prefixCls: {
    type: String,
    default: () => undefined
  },
  breakpoint: {
    type: String as PropType<Breakpoint>,
    default: 'lg'
  },
  siderWidth: {
    type: Number,
    default: 208
  },
  splitMenus: {
    type: Boolean,
    default: false
  },
  collapsedButton: {
    type: Boolean,
    default: () => true
  },
  collapsedWidth: {
    type: Number,
    default: 48
  },
  headerHeight: {
    type: Number,
    default: 56
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: () => undefined
  },
  layout: {
    type: String as PropType<LayoutType>,
    default: 'side'
  },
  fixed: {
    type: Boolean,
    default: () => false
  },
  collapsible: {
    type: Boolean,
    default: false
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  customItem: {
    type: Function,
    default: undefined
  },
  showType: {
    //菜单显示方式，默认或者上下vertical
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  collectedMenuList: {
    type: Array as PropType<RouteProps[]>,
    default: () => []
  }
});

export default defineComponent({
  name: 'SiderMenu',
  props: SiderMenuProps,
  inheritAttrs: false,
  emits: [
    'update:openKeys',
    'update:selectedKeys',
    'update:collapsed',
    'mouseenter',
    'mouseleave',
    'itemHover',
    'selectCollectedMenu',
    'uncollectMenu',
    'collectMenu'
  ],
  setup(props, { emit }) {
    const {
      prefixCls: propPrefixCls,
      theme,
      layout,
      title,
      collapsed,
      collapsedWidth,
      siderWidth,
      splitMenus
    } = toRefs(props);
    const route = useRoute();
    const { getPrefixCls } = useProProvider();
    const prefixCls = propPrefixCls.value || getPrefixCls('sider');

    const isMix = computed(() => layout.value === 'mix');
    const runtimeTheme = computed<MenuTheme>(() =>
      layout.value === 'mix' ? 'light' : theme.value
    );
    const runtimeSideWidth = computed(() =>
      collapsed.value ? collapsedWidth.value : siderWidth.value
    );
    const computedMenus = computed(() =>
      splitMenus.value ? findMenuChildren(props.menus, route.matched[1].name) : props.menus
    );

    const handleSelectedKeys = (selectedKeys: string[]): void => {
      emit('update:selectedKeys', selectedKeys);
    };
    const handleOpenKeys = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys);
    };
    const handleCollapse = () => {
      emit('update:collapsed', !collapsed.value);
    };
    const handleUncollectMenu = menuId => {
      emit('uncollectMenu', menuId);
    };
    const handleCollectMenu = menu => {
      emit('collectMenu', menu);
    };
    return {
      prefixCls,
      isMix,
      runtimeTheme,
      runtimeSideWidth,
      computedMenus,
      title,
      handleSelectedKeys,
      handleOpenKeys,
      handleCollapse,
      handleUncollectMenu,
      handleCollectMenu
    };
  },
  components: {
    FavMenu,
    BaseMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SystemLogo
    // [Menu.name]: Menu,
    // [Menu.Item.name]: Menu.Item,
  }
});
</script>

<style lang="less">
body {
  @import url('./index.less');
}
</style>
