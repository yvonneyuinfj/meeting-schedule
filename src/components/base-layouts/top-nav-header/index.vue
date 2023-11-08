<template>
  <div :class="classNames">
    <div ref="headRef" :class="headerClassName">
      <div :class="`${prefixedClassName}-main-left`" @click="handleMenuHeaderClick">
        <div :class="`${prefixedClassName}-logo`" key="logo" id="logo">
          <slot v-if="hasLogoSlot" name="logo" />
          <div v-else>
            <router-link :to="{ name: 'index' }">
              <system-logo :title="title" :horizontal="true"></system-logo>
            </router-link>
          </div>
        </div>
        <!-- <page-container v-if="layout == 'mix'"></page-container> -->
      </div>
      <div :style="{ flex: 1 }" :class="`${prefixedClassName}-menu`">
        <base-menu
          v-if="menus && menus.length > 0"
          mode="horizontal"
          theme="light"
          :menus="menus"
          :open-keys="openKeys"
          :selected-keys="selectedKeys"
          :collected-menu-list="collectedMenuList"
          :layout="layout"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
          @uncollectMenu="handleUncollectMenu($event)"
          @collectMenu="handleCollectMenu($event)"
        />
      </div>
      <right-content>
        <slot name="rightContent" />
      </right-content>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, toRefs } from 'vue';
import { useProProvider } from '../pro-provider/index';
import BaseMenu from '@/components/base-layouts/base-menu/index.vue';
import SystemLogo from '@/components/base-layouts/system-logo/index.vue';
import RightContent from '../top-nav-header/right-content.vue';
import type { RouteProps } from '../typing';
import type { MenuTheme } from 'ant-design-vue';
export default defineComponent({
  props: {
    prefixCls: {
      type: String,
      default: undefined
    },
    layout: {
      type: String,
      default: 'side'
    },
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'dark'
    },
    contentWidth: {
      type: String,
      default: 'Fluid'
    },

    // menu
    menus: {
      type: Array as PropType<RouteProps[]>,
      default: () => []
    },
    openKeys: {
      type: Array as PropType<string[]>,
      required: true
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    collectedMenuList: {
      type: Array as PropType<RouteProps[]>,
      default: () => []
    }
  },
  emits: ['update:openKeys', 'update:selectedKeys', 'uncollectMenu', 'collectMenu'],
  setup(props, { slots, emit }) {
    const { theme, contentWidth, prefixCls: customizePrefixCls } = toRefs(props);
    const { getPrefixCls } = useProProvider();
    const prefixedClassName = customizePrefixCls.value || getPrefixCls('top-nav-header');
    const hasMix = computed(() => props.layout === 'mix');
    const classNames = computed(() => {
      return {
        [prefixedClassName]: true,
        ['light']: theme.value === 'light'
      };
    });
    const headerClassName = computed(() => {
      return {
        [`${prefixedClassName}-main`]: true,
        ['wide']: contentWidth.value === 'Fixed'
      };
    });
    const { logo: hasLogoSlot } = slots;

    /** events */
    const handleSelectedKeys = (selectedKeys: string[]): void => {
      emit('update:selectedKeys', selectedKeys);
    };
    const handleOpenKeys = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys);
    };
    const handleMenuHeaderClick = (): void => {};

    const handleUncollectMenu = menuId => {
      emit('uncollectMenu', menuId);
    };
    const handleCollectMenu = menu => {
      emit('collectMenu', menu);
    };
    return {
      classNames,
      headerClassName,
      prefixedClassName,
      hasMix,
      hasLogoSlot,
      handleSelectedKeys,
      handleOpenKeys,
      handleMenuHeaderClick,
      handleUncollectMenu,
      handleCollectMenu
    };
  },
  components: {
    BaseMenu,
    RightContent,
    SystemLogo
  }
});
</script>

<style lang="less">
body {
  @import url('./index.less');
}
</style>
