<template>
  <div
    class="splitpanes__pane"
    :class="defaultCollapsed ? 'close' : 'open'"
    @click="onPaneClick($event, _.uid)"
    :style="style"
  >
    <div class="splitpanes__inner">
      <slot />
    </div>
    <div v-if="collapsibleValue == 'left'" class="goLeft" @click="handleCollapse">
      <avic-icon svg="avic-arrow-left-s-fill" />
    </div>
    <div v-if="collapsibleValue == 'top'" class="goTop" @click="handleCollapse">
      <avic-icon svg="avic-arrow-left-s-fill" />
    </div>
    <div v-if="collapsibleValue == 'right'" class="goRight" @click="handleCollapse">
      <avic-icon svg="avic-arrow-left-s-fill" />
    </div>
    <div v-if="collapsibleValue == 'bottom'" class="goBottom" @click="handleCollapse">
      <avic-icon svg="avic-arrow-left-s-fill" />
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'pane',
  inject: [
    'requestUpdate',
    'onPaneAdd',
    'onPaneRemove',
    'onPaneClick',
    'onMouseMove',
    'resizeNextPaneSize',
    'resizeLastPaneSize',
    'checkHasNextPane',
    'checkHasLastPane',
    'getPaneSize',
    'horizontal',
    'getSplitSize'
  ],

  props: {
    /** 支持百分比和具体宽高，百分比直接写数字，具体宽高写 数字px */
    size: { type: [Number, String], default: null },
    /** 最小尺寸只支持数字0-100(百分比) */
    minSize: { type: [Number, String], default: 0 },
    /** 最大尺寸只支持数字0-100(百分比) */
    maxSize: { type: [Number, String], default: 100 },
    /** 收起状态，默认为不收起 */
    collapsed: { type: Boolean, default: false },
    /** 收起方向 left,right,top,bottom */
    collapsible: { type: String, default: '' },
    /** 是否允许拖动区域大小 */
    draggable: { type: Boolean, default: true }
  },

  data: () => ({
    style: {},
    paneSize: null,
    oldPaneSize: null,
    defaultCollapsed: null,
    collapsibleValue: null
  }),

  mounted() {
    //获取split容器尺寸
    const splitSize = this.getSplitSize();
    const splitWidth = splitSize.splitWidth;
    const splitHeight = splitSize.splitHeight;
    if (this.size && this.size.indexOf('px') > 0) {
      let realSize = null;
      if (this.horizontal) {
        //水平布局高度计算百分比
        realSize = (parseFloat(this.size) / parseFloat(splitHeight)) * 100;
      } else {
        //垂直布局宽度计算百分比
        realSize = (parseFloat(this.size) / parseFloat(splitWidth)) * 100;
      }
      realSize = realSize.toFixed(2);
      this.paneSize = realSize;
      this.oldPaneSize = realSize;
    } else {
      this.paneSize = this.size;
      this.oldPaneSize = this.size;
    }
    this.defaultCollapsed = this.collapsed;
    this.onPaneAdd(this);
    this.collapsibleValue = this.collapsible;
    if (this.horizontal) {
      //水平布局，不能出现left,right折叠
      if (this.collapsible == 'left' || this.collapsible == 'right') {
        this.collapsibleValue = '';
      }
    } else {
      // 垂直布局，不能出现top,bottom折叠
      if (this.collapsible == 'top' || this.collapsible == 'bottom') {
        this.collapsibleValue = '';
      }
    }
    if (this.collapsed) {
      this.handleCollapse();
    }
  },
  beforeUnmount() {
    this.onPaneRemove(this);
  },
  methods: {
    /**
     * 对外暴露pane折叠收起方法
     * @flag open仅做展开操作，close仅做收起操作，其余根据pane折叠收起状态进行折叠收起
     */
    handleCollapse(flag) {
      this.$nextTick(() => {
        if (this.collapsible == 'left' || this.collapsible == 'top') {
          // 当pane默认收起时，收起方向为向左或向上时执行方法改变当前pane下一个pane的尺寸
          this.handleCollapsible(flag);
        } else {
          // 当pane默认收起时，收起方向为向右或向下时执行方法改变当前pane上一个pane的尺寸
          this.handleCollapsibleReverse(flag);
        }
      });
    },
    /** 正向折叠收起，垂直布局向左，水平布局向上 */
    handleCollapsible(flag) {
      //判断是否存在下一个pane
      const checkResult = this.checkHasNextPane({ target: this });
      if (checkResult) {
        let changeSize = this.getChangeSize(flag);
        if (changeSize != null) {
          this.resizeNextPaneSize({ target: this, changeSize: changeSize });
        }
      }
    },
    /** 逆向折叠收起，垂直布局向右，水平布局向下 */
    handleCollapsibleReverse(flag) {
      //判断是否存在上一个pane
      const checkResult = this.checkHasLastPane({ target: this });
      if (checkResult) {
        let changeSize = this.getChangeSize(flag);
        if (changeSize != null) {
          this.resizeLastPaneSize({ target: this, changeSize: changeSize });
        }
      }
    },
    getChangeSize(flag) {
      let changeSize = 0;
      if (this.paneSize != 0) {
        // 执行展开操作时，阻止将pane收起的操作
        if (flag == 'open') {
          return null;
        }
        this.defaultCollapsed = true;
        this.paneSize = 0;
        const realSize = this.getPaneSize({ target: this });
        this.oldPaneSize = parseFloat(realSize);
        changeSize = this.oldPaneSize;
      } else {
        // 执行收起操作时，阻止将pane展开的操作
        if (flag == 'close') {
          return null;
        }
        this.defaultCollapsed = false;
        this.paneSize = this.oldPaneSize;
        //折叠环境下如果拖拽调整宽度后下一个pane尺寸需要减去原有尺寸在加上拖拽后尺寸
        const realSize = this.getPaneSize({ target: this });
        changeSize = -this.oldPaneSize + parseFloat(realSize);
      }
      return changeSize;
    },
    update(style) {
      this.style = style;
    }
  },

  computed: {
    // sizeNumber() {
    //   return this.size || this.size === 0 ? parseFloat(this.size) : null;
    // },
    sizeNumber() {
      return this.paneSize || this.paneSize === 0 ? parseFloat(this.paneSize) : null;
    },
    minSizeNumber() {
      return parseFloat(this.minSize);
    },
    maxSizeNumber() {
      return parseFloat(this.maxSize);
    }
  },

  watch: {
    sizeNumber(size) {
      this.requestUpdate({ target: this, size });
    },
    minSizeNumber(min) {
      this.requestUpdate({ target: this, min });
    },
    maxSizeNumber(max) {
      this.requestUpdate({ target: this, max });
    }
  }
};
</script>
