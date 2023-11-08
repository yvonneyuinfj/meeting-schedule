<template>
  <div class="vue-grid-item-content">
    <template v-if="element.type == 'smallPage'">
      <card-container :element="element" source="renderer" :preview="preview" />
    </template>
  </div>
</template>

<script setup lang="ts">
import CardContainer from './CardContainer.vue';
defineProps({
  element: { type: Object },
  /** 是否预览模式 */
  preview: { type: Boolean }
});
</script>
<style lang="less" scoped>
.vue-grid-item-content {
  height: 100%;
}
</style>
