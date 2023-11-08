<template>
  <a-menu
    :theme="theme"
    :mode="mode"
    :inlineIndent="16"
    :selected-keys="selectedKeys"
    @select="handleSelect"
  >
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
            @click.stop="handleUncollect(favMenu.meta.id)"
          />
        </a-menu-item>
      </template>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts" setup>
import type { RouteProps } from '../typing';
import type { MenuProps, MenuTheme } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import type { PropType } from 'vue';
const { t } = useI18n();
defineProps({
  // top-nav-header: horizontal
  mode: {
    type: String as PropType<MenuProps['mode']>,
    default: 'inline'
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: 'dark'
  },
  showType: {
    type: String,
    default: ''
  },
  collectedMenuList: {
    type: Array as PropType<RouteProps[]>,
    default: () => []
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    required: true
  }
});

const $emit = defineEmits(['selectCollectedMenu', 'uncollectMenu']);

function handleSelect({ item, key, selectedKeys }) {
  $emit('selectCollectedMenu', { item, key, selectedKeys });
}
function handleUncollect(menuId) {
  $emit('uncollectMenu', menuId);
}
</script>
