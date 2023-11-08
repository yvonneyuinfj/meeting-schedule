<template>
  <div class="avic-modal-select">
    <slot />
    <a-input
      v-if="!$slots.default"
      ref="showValueComp"
      :value="select.showFields"
      :disabled="disabled"
      :placeholder="!disabled ? placeholder : ''"
      @change="handleChange"
      @dblclick="showSelectModal"
      @click="handleInputClick"
      @blur="inputBlur"
      @focus="handleFocus"
      @pressEnter="handlePressEnter"
    >
      <template v-if="iconPosition == 'after'" v-slot:suffix>
        <avic-icon :svg="iconType" title="点击选择" @click="showSelectModal" />
        <avic-icon
          v-if="!disabled && allowClear"
          v-show="select.showFields !== ''"
          title="点击清空"
          class="icon-clear"
          svg="avic-close-circle-fill"
          @click="handleClear"
        />
      </template>
      <template v-if="iconPosition == 'before'" v-slot:prefix>
        <avic-icon :svg="iconType" title="点击选择" @click="showSelectModal" />
        <avic-icon
          v-if="!disabled && allowClear"
          v-show="select.showFields !== ''"
          title="点击清空"
          class="icon-clear"
          svg="avic-close-circle-fill"
          @click="handleClear"
        />
      </template>
    </a-input>
    <AvicModal
      v-if="visible"
      v-bind="$attrs"
      :visible="visible"
      :title="title"
      :width="width"
      :height="height"
      @cancel="hideSelectModal"
      :bodyStyle="{ padding: 0 }"
    >
      <component
        :is="selectComponent"
        v-bind="{ ...$attrs }"
        :value="value"
        @select="handleSelect"
        @handleRowDblClick="handleRowDblClick"
      />
      <template v-slot:footer>
        <a-button @click="hideSelectModal">取消</a-button>
        <a-button type="primary" @click="handleConfirm">确定</a-button>
      </template>
    </AvicModal>
  </div>
</template>
<script setup lang="ts">
import { Form } from 'ant-design-vue';
const { proxy } = getCurrentInstance();
/**
 * focus失去焦点回调
 * pressEnter 回车的回调
 * change 数据改变回调
 * input 双向绑定回调
 * selectConfirm 选中数据对象回调
 * clear 清除回调
 */
const $emit = defineEmits([
  'focus',
  'blur',
  'pressEnter',
  'change',
  'input',
  'selectConfirm',
  'clear',
  'update:value'
]);
const props = defineProps({
  /** 双向绑定的值 */
  value: { type: [String] },
  /** 标题 */
  title: { type: String, default: '选择' },
  /** 弹框宽度 */
  height: { type: String, required: false, default: '580px' },
  /** 弹窗高度 */
  width: { type: String, required: false, default: '1200px' },
  /** 要选择的单表组件对象 */
  selectComponent: { type: Object, default: null },
  /** 是否多选 ，默认：否 */
  multiple: { type: Boolean, default: false },
  /** 是否展示清空图标 */
  allowClear: { type: Boolean, default: false },
  /** 用于展示的字段名称 */
  showField: String,
  /** 存储值对应字段名 */
  valueField: { type: String, default: 'id' },
  /** 默认显示内容 */
  defaultShowValue: { type: String, default: '' },
  /** 输入框提示 */
  placeholder: { type: String, required: false, default: '' },
  /** 是否禁用控件 */
  disabled: { type: Boolean, required: false, default: false },
  /** 否禁止输入 */
  disabledInput: { type: Boolean, required: false, default: true },
  /** input的图标类型 */
  iconType: { type: String, default: 'SelectOutlined' },
  /** input的图标位置 */
  iconPosition: {
    type: String as PropType<'after' | 'before'>,
    default: 'after'
  },
  /**
   * 确认时自定义异步校验函数及校验提示信息
   * @type Promise
   * @param 参数：{selectedData}
   *              selectedData: Array<Record>
   * @returns Boolean true:校验通过；false:校验不通过
   */
  checkBeforeConfirm: {
    type: [Function, null]
  }
});
const showValueComp = ref();
let visible = ref(false),
  isFilled = ref(false),
  selectedData = ref([]),
  select = ref({ valueFields: '', showFields: '' });
const formItemContext = Form.useInjectFormItemContext();
watch(
  () => props.value,
  newValue => {
    select.value.valueFields = newValue || '';
    if (!newValue) {
      select.value.showFields = '';
    }
  },
  { immediate: true }
);
watch(
  () => props.defaultShowValue,
  newValue => {
    select.value.showFields = newValue || '';
  },
  { immediate: true }
);
function showSelectModal() {
  if (!props.disabled) {
    visible.value = true;
    selectedData.value = []; // 初始化选择的值为空，以免影响其他使用该组件地方
  }
}
function hideSelectModal() {
  if (showValueComp) {
    showValueComp.value.focus();
  }
  nextTick(() => {
    visible.value = false;
  });
}
function handleFocus(e) {
  // if (props.disabledInput && !isFilled.value) {
  //   showSelectModal();
  // }
  $emit('focus', e);
}
function handlePressEnter(e) {
  $emit('pressEnter', e);
}
function handleInputClick() {
  if (props.disabledInput) {
    showSelectModal();
  }
}
function handleSelect(data) {
  selectedData.value = data;
}
function handleConfirm() {
  if (selectedData.value.length === 0) {
    proxy.$message.warning('请至少选择一条数据');
    return;
  }
  if (!props.multiple && selectedData.value.length > 1) {
    proxy.$message.warning('最多选择一条数据');
    return;
  }
  if (props.checkBeforeConfirm) {
    props.checkBeforeConfirm({ selectedData: selectedData.value }).then(result => {
      if (result) {
        afterCheck();
      }
    });
  } else {
    afterCheck();
  }
}
function afterCheck() {
  let valueFieldsArr = [];
  let showFieldsArr = [];
  selectedData.value.map(item => {
    valueFieldsArr.push(item[props.valueField] || '');
    showFieldsArr.push(item[props.showField] || '');
  });
  let valueFields = valueFieldsArr.join(';');
  let showFields = showFieldsArr.join(';');
  select.value = { valueFields, showFields };
  $emit('change', select.value.valueFields);
  $emit('input', select.value.valueFields);
  $emit('update:value', select.value.valueFields);
  $emit('selectConfirm', selectedData.value);
  visible.value = false;
  isFilled.value = true;
  formItemContext?.onFieldChange && formItemContext.onFieldChange();
}
function handleChange(e) {
  let oldValue = select.value.showFields;
  if (props.disabledInput) {
    select.value.showFields = oldValue;
  } else {
    select.value.showFields = e.target.value;
    $emit('change', select.value.showFields);
    $emit('input', select.value.showFields);
    $emit('update:value', select.value.valueFields);
    let obj = {};
    obj[props.valueField] = select.value.showFields;
    obj[props.showField] = select.value.showFields;
    $emit('selectConfirm', [obj]);
    formItemContext?.onFieldChange && formItemContext.onFieldChange();
  }
}
function handleClear() {
  select.value = { valueFields: '', showFields: '' };
  $emit('change', select.value.valueFields);
  $emit('input', select.value.valueFields);
  $emit('update:value', select.value.valueFields);
  $emit('clear');
  formItemContext?.onFieldChange && formItemContext.onFieldChange();
}
function inputBlur(e) {
  $emit('blur', e);
  // 触发表单字段的blur校验
  formItemContext?.onFieldBlur && formItemContext.onFieldBlur();
}
function handleRowDblClick(data) {
  selectedData.value = data;
  handleConfirm();
}
</script>
<style lang="less">
.avic-modal-select {
  .ant-input-affix-wrapper {
    .ant-input:not(:last-child) {
      // padding-right: 44px;
    }
    .ant-input-suffix {
      .anticon {
        cursor: pointer;
      }
      .icon-clear {
        font-size: 1.2em;
        display: none;
        margin-left: 8px;
        .svg-icon {
          vertical-align: -0.05em;
        }
      }
    }
  }
  .ant-input-affix-wrapper:hover {
    .ant-input-suffix .icon-clear {
      display: inline-block;
    }
  }
}
</style>
