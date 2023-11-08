<template>
  <div style="position: relative" ref="generateForm">
    <grid-layout
      :layout="data.list"
      :col-num="24"
      :row-height="10"
      :is-draggable="false"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[0, 0]"
      :use-css-transforms="false"
    >
      <grid-item
        v-for="item in data.list"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.key"
      >
        <div
          class="box-card-container"
          :style="{ paddingRight: item.x + item.w == 24 ? '0px' : '8px', paddingBottom: '8px' }"
        >
          <genetate-form-item :element="item" :preview="preview" />
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup lang="ts">
import GenetateFormItem from './GenerateFormItem.vue';
defineProps({
  data: { type: Object },
  /** 是否预览模式 */
  preview: { type: Boolean }
});
const emit = defineEmits(['afterUpdate']);
onMounted(() => {
  emit('afterUpdate');
});
</script>

<style lang="less">
.vue-grid-layout {
  min-height: 300px;
  .vue-grid-item {
    overflow: hidden;
    .box-card-container {
      width: 100%;
      height: 100%;
      padding-bottom: 10px;
      .portal-widget-col-list {
        height: 100%;
      }
    }
  }
}
</style>
