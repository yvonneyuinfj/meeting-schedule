import { useDraggable } from '@vueuse/core';
import type { CSSProperties } from 'vue';
/* 大小拖拽hooks */
export const useModalDrag = (modalRef: Ref<any>, isFullScreen, callback) => {
  const widthDom = modalRef.value;
  const dragDom = widthDom?.closest('.ant-modal-wrap');
  // const widthDom = el.closest('.ant-modal');
  const widthBodyDom = widthDom?.querySelector('.ant-modal-body');
  const sizeChangeDom = widthDom?.querySelector('.modal-drag-position');
  const headerDom = widthDom?.querySelector('.ant-modal-header');
  const footerDom = widthDom?.querySelector('.ant-modal-footer');
  if (!widthDom || !dragDom || !widthBodyDom || !sizeChangeDom) return;
  const minWidth = widthDom.clientWidth < 300 ? widthDom.clientWidth : 300;
  const minHeight = widthDom.clientHeight < 200 ? widthDom.clientHeight : 200;
  sizeChangeDom.style.width = '100%';
  sizeChangeDom.style.height = '100%';

  dragDom.onmousemove = function (e) {
    if (isFullScreen.value) return;
    const rect = widthDom.getBoundingClientRect();
    widthDom.style.cursor = 'default';
    widthDom.onmousedown = null;
    if (
      e.clientX > widthDom.clientWidth + rect.left - 10 &&
      e.clientY > widthDom.clientHeight + rect.top - 10
    ) {
      widthDom.style.cursor = 'se-resize';
    }
    dragDom.onmousedown = e => {
      if (isFullScreen.value) return;
      const rect = widthDom.getBoundingClientRect();
      dragDom.style.userSelect = 'none';
      let moveDirection = '';
      const initClientHeight = widthDom.clientHeight;
      let heightChange = 0;
      let widthNeedChange = false;
      let heightNeedChange = false;
      if (
        e.clientX > widthDom.clientWidth + rect.left - 10 &&
        e.clientX <= widthDom.clientWidth + rect.left &&
        e.clientY > widthDom.clientHeight + rect.top - 10 &&
        e.clientY <= widthDom.clientHeight + rect.top
      ) {
        // 上下左右移动
        moveDirection = 'xy';
      }
      if (moveDirection == '') {
        return;
      }
      const onMouseup = () => {
        if (sizeChangeDom.style.width && widthNeedChange) {
          widthDom.style.width = sizeChangeDom.style.width;
        }
        if (heightChange && heightNeedChange) {
          const height =
            sizeChangeDom.clientHeight -
            (headerDom?.clientHeight || 0) -
            (footerDom?.clientHeight || 0);
          widthBodyDom.style.height = height + 'px';
          callback();
        }
        dragDom.removeEventListener('mousemove', onMousemove);
        sizeChangeDom.style.zIndex = -1;
        moveDirection = '';
        heightChange = 0;
        widthNeedChange = false;
        heightNeedChange = false;
        document.onmouseup = null;
      };
      const onMousemove = e => {
        if (isFullScreen.value) return;
        if (moveDirection === 'xy') {
          sizeChangeDom.style.zIndex = 1;
          let width = e.clientX - rect.left;
          width = width >= minWidth ? width : minWidth;
          sizeChangeDom.style.width = width + 'px';
          widthNeedChange = true;
          sizeChangeDom.style.zIndex = 1;
          let height = e.clientY - rect.top;
          height = height >= minHeight ? height : minHeight;
          // 找到移动后的变化
          heightChange = height - initClientHeight;
          sizeChangeDom.style.height = height + 'px';
          heightNeedChange = true;
        }
        document.onmouseup = onMouseup;
      };
      dragDom.onmouseup = onMouseup;
      dragDom.addEventListener('mousemove', onMousemove);
    };
  };
};
/* 移动hooks，不限制modal在屏幕区域 */
export const useModalMove = (modalTitleRef, sizeState) => {
  const { x, y, isDragging } = useDraggable(modalTitleRef);
  const startX = ref<number>(0);
  const startY = ref<number>(0);
  const startedDrag = ref(false);
  const transformX = ref(0);
  const transformY = ref(0);
  const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
  watch([x, y], () => {
    if (!startedDrag.value) {
      startX.value = x.value;
      startY.value = y.value;
      const bodyRect = document.body.getBoundingClientRect();
      const titleRect = modalTitleRef.value.getBoundingClientRect();
      dragRect.value.right = bodyRect.width - titleRect.width;
      dragRect.value.bottom = bodyRect.height - titleRect.height;
    }
    startedDrag.value = true;
  });
  watch(isDragging, () => {
    if (!isDragging) {
      startedDrag.value = false;
    }
  });

  watchEffect(() => {
    if (startedDrag.value) {
      transformX.value = Math.min(x.value, dragRect.value.right) - startX.value;
      transformY.value = Math.min(y.value, dragRect.value.bottom) - startY.value;
    }
  });
  const transformStyle = computed<CSSProperties>(() => {
    if (sizeState.value) {
      return {
        transform: 'none'
      };
    } else {
      return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`
      };
    }
  });
  return {
    transformStyle
  };
};
