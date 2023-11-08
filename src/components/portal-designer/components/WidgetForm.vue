<template>
  <div class="portal-widget-form-container">
    <div v-if="data.list.length == 0" class="portal-widget-form-empty">
      <!-- <avic-icon class="widget-form-empty" svg="avic-layout-2-line"></avic-icon>
      您还未添加任何模块
      <br />
      请从左侧列表中选择添加 -->
      <a-empty v-if="data.list.length == 0">
        <template v-slot:description>
          <span>
            您还未添加任何模块
            <br />
            请从左侧列表中选择添加
          </span>
        </template>
      </a-empty>
    </div>
    <a-form
      class="widget-form-content"
      :size="data.config.size"
      label-suffix=":"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <grid-layout
        class="vue-grid-layout"
        v-model:layout="layout"
        :col-num="24"
        :row-height="10"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[0, 0]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="(item, index) in layout"
          :min-h="10"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.key"
          @resized="resizedEvent"
          @moved="layoutUpdate"
        >
          <transition-group v-if="item" name="fade" tag="div" class="portal-widget-form-list">
            <widget-form-item
              :key="item.key"
              :element="layoutTemp[index]"
              :select="select"
              :index="index"
              :data="data"
              @handleWidgetOpensSet="handleWidgetOpensSet"
              @move="handleWidgetDelete"
              @handleSelectWidget="handleSelectWidget"
            />
          </transition-group>
        </grid-item>
      </grid-layout>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import WidgetFormItem from './WidgetFormItem.vue';

const props = defineProps({
  /** 门户小页配置信息 */
  data: { type: Object },
  /** 选中的小页 */
  select: { type: Object }
});
const layout = ref([]);
const layoutTemp = ref([]);
const emit = defineEmits(['handleSelectWidget', 'move', 'handleWidgetOpensSet']);

watch(
  () => props.data,
  val => {
    if (Array.isArray(val.list)) {
      layoutTemp.value = [...val.list];
      const newLayout = [];
      val.list.forEach(item => {
        const node = {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          i: item.i,
          key: item.key
        };
        newLayout.push(node);
      });
      layout.value = newLayout;
    }
  },
  { deep: true }
);

onMounted(() => {
  document.body.ondrop = function (event) {
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
});
/**调整小页大小后同步 */
function resizedEvent(i, newH, newW) {
  layoutTemp.value.forEach(item => {
    if (item.i == i) {
      item.w = newW;
      item.h = newH;
    }
  });
}
/**调整小页位置后同步 */
function layoutUpdate() {
  layout.value.forEach(tim => {
    layoutTemp.value.forEach(item => {
      if (tim.i == item.i) {
        item.x = tim.x;
        item.y = tim.y;
      }
    });
  });
}
function handleWidgetDelete(key) {
  emit('move', key);
}
function handleWidgetOpensSet() {
  emit('handleWidgetOpensSet');
}
function handleSelectWidget(selectIndex) {
  emit('handleSelectWidget', selectIndex);
}
</script>
<style lang="less" scoped>
:deep(.vue-grid-layout) {
  .vue-grid-item {
    padding: 4px;
    .portal-widget-col-list {
      height: 100%;
    }
    .vue-resizable-handle {
      z-index: 3;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: none;
    }
    .vue-resizable-handle::after {
      position: relative;
      right: 5px;
      bottom: 5px;
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid @border-color-base;
      border-top-color: transparent;
      border-left-color: transparent;
      content: '';
    }
  }
}
</style>
