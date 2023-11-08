<template>
  <a-modal
    v-bind="$attrs"
    :wrap-class-name="fullModalClass"
    :wrap-style="{ overflow: 'auto' }"
    :width="modalWidth"
    :footer="footer"
    :bodyStyle="customBodyStyle"
  >
    <template #title v-if="showTitle">
      <template v-if="slots.title">
        <slot name="title" />
      </template>
      <template v-else>
        <div class="header-bar">
          <span ref="modalTitleRef" class="headerBarLeft">
            {{ title }}
          </span>
          <span class="modal_full" @click="fullDialog" v-if="adjustSize">
            <avic-icon :svg="sizeState ? 'FullscreenExitOutlined' : 'FullscreenOutlined'" />
          </span>
        </div>
      </template>
    </template>
    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle" ref="modalRef">
        <component :is="originVNode" />
        <!--主要增加这个元素用于拖拽的时候显示能够变化的大小-->
        <div class="modal-drag-position"></div>
      </div>
    </template>
    <slot />
  </a-modal>
</template>

<script setup lang="ts">
import type { ComputedRef, CSSProperties } from 'vue';
import { useModalDrag, useModalMove } from './useModalHooks';
import { useWindowSize } from '@vueuse/core';
const windowSize = useWindowSize();
const slots = useSlots();
const props = defineProps({
  /** 弹框标题 */
  title: String,
  /** 是否显示标题区域 */
  showTitle: { type: Boolean, default: true },
  /** 弹框宽度，支持具体宽度和百分比 */
  width: String,
  /** 弹框高度，支持具体高度和百分比 */
  height: String,
  /** 否展示全屏按钮 */
  adjustSize: { type: Boolean, default: true },
  /** 初始化是否全屏 */
  fullScreen: { type: Boolean, default: false },
  /** 是否支持弹框拖拽大小 */
  draggable: { type: Boolean, default: true },
  /** Modal组件原生属性Modal body 样式 */
  bodyStyle: Object,
  footer: { type: Object }
});
let modalHeight = ref(props.height);
//支持弹框高度百分比
function computedModalHeight() {
  let heightInt = 0;
  if (modalHeight && modalHeight.value && modalHeight.value.indexOf('%') >= 0) {
    const windowHeight = windowSize.height.value;
    const heightBfb = modalHeight.value.replace('%', '');
    const computedHeight = (windowHeight / 100) * parseInt(heightBfb);
    heightInt = parseInt(computedHeight.toString());
  } else {
    const heightStr = modalHeight.value.replace('px', '');
    heightInt = parseInt(heightStr.toString());
  }
  if (props.showTitle || slots.title) {
    heightInt = heightInt - 46.8;
  }
  if (!props.footer || slots.footer) {
    heightInt = heightInt - 56.8;
  }
  modalHeight.value = heightInt + 'px';
}

const sizeState = ref(null);
const customBodyStyle = ref();
const fullModalClass = ref();
const modalWidth = ref(props.width);
let isChangeSize = false;
nextTick(() => {
  sizeState.value = props.fullScreen;
  if (!props.fullScreen) {
    computedModalHeight();
  }
  changeSizeStateFn();
});

function changeSizeStateFn() {
  if (sizeState.value) {
    fullModalClass.value = 'full-modal';
    customBodyStyle.value = props.bodyStyle;
    modalWidth.value = '100%';
  } else {
    fullModalClass.value = 'modalFixed';
    if (isChangeSize) {
      // customBodyStyle.value = { height: initHeight, overflowY: 'auto' };
      customBodyStyle.value = Object.assign(
        { height: initHeight, overflowY: 'auto' },
        props.bodyStyle
      );
      modalWidth.value = initWidth;
    } else {
      // customBodyStyle.value = { height: modalHeight.value, overflowY: 'auto' };
      customBodyStyle.value = Object.assign(
        { height: modalHeight.value, overflowY: 'auto' },
        props.bodyStyle
      );
      modalWidth.value = props.width;
    }
  }
}
let initWidth = '0px';
let initHeight = '0px';
const modalRef = ref(null);
function changePosition() {
  isChangeSize = true;
  initWidth = modalRef.value.clientWidth + 'px';
  initHeight = modalRef.value.clientHeight - 107 + 'px';
}
/* modal拖拽大小实现 */
nextTick(() => {
  if (props.draggable) {
    useModalDrag(modalRef, sizeState, changePosition);
  }
});
// 浏览器size发生变化的时候也调用这个函数
window.addEventListener('resize', () => {
  nextTick(() => {
    if (props.draggable) {
      useModalDrag(modalRef, sizeState, changePosition);
    }
  });
});
let oldTransformStyle = {} as ComputedRef<CSSProperties>;
function fullDialog() {
  if (!sizeState.value) {
    oldTransformStyle = transformStyle;
  }
  sizeState.value = !sizeState.value;
  changeSizeStateFn();
  if (!sizeState.value) {
    transformStyle = oldTransformStyle;
  }
}
/* modal移动实现 */
const modalTitleRef = ref<HTMLElement>(null);
let { transformStyle } = useModalMove(modalTitleRef, sizeState);
</script>
<style lang="less" scoped>
:deep(.header-bar) {
  display: inline-flex;
  flex: 0;
  align-items: center;
  width: 100%;
  padding: 0;
  border-radius: 4px;
  transition: all 0.3s;
}

:deep(.headerBarLeft) {
  flex: 1;
  margin: 0;
  text-align: left;
  cursor: move;
}
:deep(.modal_full) {
  width: 30px;
  margin-right: 32px;
  margin-left: auto;
  text-align: right;
  cursor: pointer;
}
</style>
