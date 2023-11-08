<template>
  <a-sub-menu v-if="!menu.meta?.hideInMenu" :key="menu.path">
    <template #icon>
      <avic-icon v-if="menu.meta?.icon !== undefined" :svg="menu.meta.icon" :key="menu.meta.icon" />
    </template>
    <template #title>
      {{ t(menu.meta.title) }}
      <a-tag v-if="menu.meta.menuMarkName" color="rgba(255,80,80,.9)">
        {{ t(menu.meta.menuMarkName) }}
      </a-tag>
    </template>
    <template v-for="child in menu.children">
      <a-menu-item
        :title="t(child.meta.title)"
        @mouseenter="$emit('itemHover', { key: child.path })"
        v-if="(!child.children || child.meta?.hideChildrenInMenu) && !child.meta?.hideInMenu"
        :key="child.path"
      >
        <template #icon>
          <avic-icon
            v-if="child.meta.icon !== undefined"
            :svg="child.meta.icon"
            :key="child.meta.icon"
          />
        </template>
        {{ t(child.meta.title) }}
        <a-tag v-if="child.meta.menuMarkName" color="#f50">
          {{ t(child.meta.menuMarkName) }}
        </a-tag>
        <avic-icon
          class="menu-star"
          v-if="child.meta.collected"
          svg="avic-star-fill"
          title="取消收藏"
          @click.stop="$emit('uncollectMenu', child.meta.id)"
        />
        <avic-icon
          class="menu-star"
          v-else-if="child.meta.id"
          svg="avic-star-line"
          title="收藏菜单"
          @click.stop="$emit('collectMenu', child)"
        />
      </a-menu-item>
      <template v-else>
        <sub-menu
          :menu="child"
          :key="child.path"
          :collapsed="collapsed"
          @uncollectMenu="$emit('uncollectMenu', $event)"
          @collectMenu="$emit('collectMenu', $event)"
        />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RouteProps } from '../typing';

export interface SubMenuProps {
  menu: RouteProps;
}

export default defineComponent({
  name: 'SubMenu',
  emits: ['itemHover', 'collectMenu', 'uncollectMenu'],
  props: {
    menu: {
      type: Object,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { t } = useI18n();
    return {
      t
    };
  }
});
</script>

<style scoped></style>
