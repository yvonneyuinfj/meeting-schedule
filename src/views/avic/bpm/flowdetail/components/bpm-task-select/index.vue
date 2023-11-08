<!--
  流程中间部分
-->
<template>
  <a-select
    :get-popup-container="triggerNode => triggerNode.parentNode"
    :default-value="defaultValue"
    :style="defaultStyle"
    @change="handleChange"
  >
    <a-select-option v-for="option in data" :key="option.id">
      {{ option.value }}
    </a-select-option>
  </a-select>
</template>
<script>
import { Select } from 'ant-design-vue';
export default {
  name: 'AvicBpmListSelect',
  components: {
    ASelect: Select,
    ASelectOption: Select.Option
  },
  props: {
    // 下拉框数据 格式 [{id: 'start',value: '拟稿中'}]
    selectData: {
      type: Array,
      required: false
    },
    defaultValue: {
      required: false,
      default: () => {
        return 'all';
      }
    },
    defaultStyle: {
      type: Object,
      required: false,
      default: () => {
        return { width: '100px', margin: ' 10px 5px' };
      }
    }
  },
  data() {
    return {
      data: [
        {
          id: 'all',
          value: '全部'
        },
        {
          id: 'start',
          value: '拟稿中'
        },
        {
          id: 'active',
          value: '流转中'
        },
        {
          id: 'ended',
          value: '已完成'
        }
      ]
    };
  },
  //接收组件传参
  watch: {
    selectData: {
      immediate: true,
      handler(newV) {
        if (newV && newV.length > 0) {
          this.data = newV;
        }
      }
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', e);
    }
  }
};
</script>
