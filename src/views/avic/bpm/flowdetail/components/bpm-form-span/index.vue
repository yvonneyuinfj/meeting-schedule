<template>
  <!-- <span
    class="ant-form-text"
    :class="{ 'form-text-overflow': isOverFlow }"
    :style="bodyStyle"
    :title="defaultValue"
  >
    {{ defaultValue }}
  </span> -->
  <a-textarea
    v-if="type && type == 'textarea'"
    disabled
    :value="defaultValue"
    :style="bodyStyle"
    :title="defaultValue"
    :rows="rows || 4"
  />
  <a-input v-else disabled :value="defaultValue" :style="bodyStyle" :title="defaultValue" />
</template>

<script>
export default {
  name: 'AvicBpmFormSpan',
  props: {
    //初始值
    initValue: {
      required: false
    },
    //空数据状态显示的文字
    tip: {
      type: String,
      required: false,
      default: '--'
    },
    //是否显示滚动条
    isOverFlow: {
      type: Boolean,
      required: false,
      default: false
    },
    //自定义样式
    bodyStyle: {
      type: Object,
      required: false,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {};
  },
  computed: {
    defaultValue() {
      if (this.initValue !== null && this.initValue !== undefined && this.initValue !== '') {
        return this.initValue;
      } else {
        return this.tip;
      }
    }
  }
};
</script>

<style lang="less" scoped>
// .form-text-overflow {
//   white-space: normal;
//   overflow: auto;
//   line-height: 18px;
// }
// .ant-form-text{
// display: block;
// width: 100%;
// overflow: hidden;
// white-space: nowrap;
// text-overflow: ellipsis;
// color:rgba(90, 90, 90, .65);
// font-size: 12px;
// }
</style>
