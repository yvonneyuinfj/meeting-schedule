<template>
  <a-menu
    :theme="theme"
    :mode="mode"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    :inlineIndent="16"
    @openChange="handleOpenChange"
    @select="handleSelect"
    v-bind="dynamicProps"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <template v-if="layout == 'top'">
      <a-menu-item title="我的首页" key="/dashboard">
        <template #icon>
          <avic-icon svg="avic-home-4-fill" />
        </template>
        我的首页
      </a-menu-item>
      <a-sub-menu key="fav">
        <template #icon>
          <avic-icon svg="avic-bookmark-3-fill" />
        </template>
        <template #title>我的收藏</template>
        <template v-for="favMenu in collectedMenuList" :key="favMenu.path">
          <a-menu-item
            :title="t(favMenu.meta?.title ? favMenu.meta.title : '未标题')"
            :class="showType"
          >
            <template #icon>
              <avic-icon
                v-if="favMenu.meta?.icon !== undefined"
                :svg="favMenu.meta.icon"
                :key="favMenu.meta.icon"
              />
            </template>
            {{ t(favMenu.meta?.title ? favMenu.meta.title : '未标题') }}
            <a-tag v-if="favMenu.meta.menuMarkName" color="rgba(255,80,80,.9)">
              {{ t(favMenu.meta.menuMarkName) }}
            </a-tag>
            <avic-icon
              class="menu-star"
              svg="avic-star-fill"
              title="取消收藏"
              @click.stop="handleUncollectMenu(favMenu.meta.id)"
            />
          </a-menu-item>
        </template>
      </a-sub-menu>
    </template>
    <template v-for="menu in menus">
      <transform-vnode
        :key="menu.path"
        v-if="(!menu.children || menu.meta?.hideChildrenInMenu) && !menu.meta?.hideInMenu"
        :by="customItem"
        :opt="menu"
      >
        <a-menu-item
          @mouseenter="$emit('itemHover', { key: menu.path })"
          :key="menu.path"
          :class="showType"
        >
          <template #icon>
            <avic-icon
              v-if="menu.meta?.icon !== undefined"
              :svg="menu.meta.icon"
              :key="menu.meta.icon"
            />
          </template>
          <span>{{ t(menu.meta.title) }}</span>
          <a-tag v-if="menu.meta.menuMarkName" color="rgba(255,80,80,.9) ">
            {{ t(menu.meta.menuMarkName) }}
          </a-tag>
          <avic-icon
            v-if="menu.meta.collected"
            svg="avic-star-fill"
            title="取消收藏"
            class="menu-star"
            @click.stop="handleUncollectMenu(menu.meta.id)"
          />
          <avic-icon
            v-else-if="menu.meta.id"
            svg="avic-star-line"
            class="menu-star"
            title="收藏菜单"
            @click.stop="handleCollectMenu(menu)"
          />
        </a-menu-item>
      </transform-vnode>
      <template v-else-if="menu.children && !menu.meta?.hideInMenu">
        <sub-menu
          :key="menu.path"
          :menu="menu"
          :collapsed="collapsed"
          @itemHover="$emit('itemHover', $event)"
          @uncollectMenu="handleUncollectMenu($event)"
          @collectMenu="handleCollectMenu($event)"
        />
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts">
import type { MenuProps, MenuTheme } from 'ant-design-vue';
import type { ComputedRef, PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RouteProps } from '../typing';
import SubMenu from './sub-menu.vue';

export function useRootSubmenuKeys(menus: RouteProps[]): ComputedRef<string[]> {
  return computed(() => menus.map(it => it.path));
}

export const BaseMenuProps = {
  locale: {
    type: Boolean,
    default: false
  },
  menus: {
    type: Array as PropType<RouteProps[]>,
    required: true
  },
  // top-nav-header: horizontal
  mode: {
    type: String as PropType<MenuProps['mode']>,
    default: 'inline'
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: 'dark'
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  openKeys: {
    type: Array as PropType<string[]>,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    required: true
  },
  customItem: {
    type: Function,
    default: undefined
  },
  underSider: Boolean,
  showType: {
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: ''
  },
  collectedMenuList: {
    type: Array as PropType<RouteProps[]>,
    default: () => []
  }
};

export default defineComponent({
  name: 'BaseMenu',
  props: { ...BaseMenuProps },
  emits: [
    'update:openKeys',
    'update:selectedKeys',
    'mouseenter',
    'mouseleave',
    'itemHover',
    'uncollectMenu',
    'collectMenu'
  ],
  setup(props, { emit }) {
    const { t } = useI18n();
    const isInline = computed(() => props.mode === 'inline');
    const { showType } = toRefs(props);
    const dynamicProps = computed(() => {
      return isInline.value
        ? { [props.underSider ? 'collapsed' : 'inlineCollapsed']: props.collapsed }
        : {};
    });
    const handleOpenChange = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys);
    };
    const handleSelect = (ctx: { [key: string]: any }): void => {
      emit('update:selectedKeys', ctx.selectedKeys);
    };
    const handleUncollectMenu = menuId => {
      emit('uncollectMenu', menuId);
    };
    const handleCollectMenu = menu => {
      emit('collectMenu', menu);
    };
    return {
      t,
      isInline,
      dynamicProps,
      handleOpenChange,
      handleSelect,
      showType,
      handleUncollectMenu,
      handleCollectMenu
    };
  },
  components: {
    SubMenu
  }
});
</script>
<style lang="less">
.ant-menu-inline {
  .ant-menu-item.vertical {
    flex-direction: column;
    width: auto !important;
    height: auto;
    margin: 4px;
    padding: 8px 0 !important;
    line-height: 1;

    &.ant-menu-item-selected {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
    .ant-menu-item-icon {
      width: 32px;
      height: 32px;
      font-size: 1.3em;
      text-align: center;
    }
    .ant-menu-title-content {
      margin: 0;
      padding: 0;
      .ant-tag-has-color {
        position: absolute;
        top: -38px;
        right: 12px;
        color: #fff;
      }
      .menu-star {
        display: none;
      }
    }
    .ant-menu-title-content {
      margin: 0;
      overflow: initial;
      white-space: break-spaces;
      text-align: center;
    }
    .ant-menu-item-icon .anticon {
      margin: 8px;
      font-size: @font-size-lg;
    }
  }
}
</style>
