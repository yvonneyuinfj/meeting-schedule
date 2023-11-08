<template>
  <div ref="divRef" v-if="$slots['edit'] && record.editable" :id="record['id'] + column">
    <span :id="record['id'] + column + 'span'">
      <a-tooltip :visible="tipVisible" placement="bottom" :color="tipColor" :title="tipMessage">
        <slot name="edit">{{ $slots['edit'] }}</slot>
      </a-tooltip>
    </span>
  </div>
  <!-- 非编辑状态页面定义default插槽进行内容转换时显示 -->
  <div v-if="$slots['default'] && !record.editable">
    <slot name="default">
      {{ $slots['default'] }}
    </slot>
    <span v-if="cellChangeFlag" class="cellChangeFlagClass"></span>
  </div>
  <!-- 非编辑状态页面未定义default插槽，默认展示对应列数据 -->
  <div v-if="!$slots['default'] && !record.editable">
    {{ record[column] }}
    <span v-if="cellChangeFlag" class="cellChangeFlagClass"></span>
  </div>
</template>
<script setup lang="ts">
import { useMutationObserver } from '@vueuse/core';
const props = defineProps({
  /** 行编辑行数据集合 */
  record: Object,
  /** 编辑单元格对应的列名称 */
  column: String,
  /** 单元格校验失败后提示框颜色 */
  editRowMsgColor: String,
  /** 行编辑时是否记录数据变更标记 */
  editRowIsShowChanged: { type: Boolean, default: undefined }
});
let tipColor = ref<any>(props.editRowMsgColor);
let showChangeFlag = ref<any>(props.editRowIsShowChanged);
const tablePropsEditRowMsgColor = inject('editRowMsgColor');
const tablePropsEditRowIsShowChanged = inject('editRowIsShowChanged');
if (!tipColor.value) {
  //如果行编辑组件自己配置了提示颜色，系统以行编辑配置的为主,如果没配置则看表格是否配置，
  if (tablePropsEditRowMsgColor) {
    tipColor.value = tablePropsEditRowMsgColor;
  } else {
    //表格也未配置则指定默认色
    tipColor.value = 'red';
  }
}
if (showChangeFlag.value == undefined) {
  //如果行编辑组件自己配置了是否提示变更标记，系统以行编辑配置的为主,如果没配置则看表格是否配置，
  if (tablePropsEditRowIsShowChanged != undefined) {
    showChangeFlag.value = tablePropsEditRowIsShowChanged;
  } else {
    //表格也未配置则指定默认值
    showChangeFlag.value = false;
  }
}
const divRef = ref(null);
const tipVisible = ref(false),
  tipMessage = ref();
//监听元素属性变化
useMutationObserver(
  divRef,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _mutations => {
    const dom = document.getElementById(props.record['id'] + props.column);
    const message = dom.attributes['customAtrr'].value;
    if (message) {
      tipMessage.value = message;
      tipVisible.value = true;
      setTimeout(() => {
        tipVisible.value = false;
        const sondom = document.getElementById(props.record['id'] + props.column + 'span');
        if (sondom) {
          sondom.setAttribute('class', '');
        }
      }, 3000);
    } else {
      tipVisible.value = false;
    }
  },
  {
    attributes: true
  }
);
const cellChangeFlag = ref(false);
let initValue = '';
onMounted(() => {
  if (showChangeFlag.value) {
    watch(
      () => props.record,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      () => {
        //页面刷新时，校验通过后关闭值变更标签
        if (!tipVisible.value) {
          cellChangeFlag.value = false;
        }
      },
      { immediate: true }
    );
    initValue = props.record[props.column];
    if (props.record['changeFlag' + props.column]) {
      cellChangeFlag.value = true;
    }
    //监听单元格内容变化时显示变更标记
    watch(
      () => props.record[props.column],
      newVal => {
        if (newVal != initValue) {
          cellChangeFlag.value = true;
          const recordData = props.record;
          recordData['changeFlag' + props.column] = 'true';
        }
      },
      { immediate: true }
    );
  }
});
</script>
<style lang="less" scoped>
.cellChangeFlagClass {
  position: absolute;
  top: -5px;
  left: -5px;
  border-color: transparent #f56c6c transparent transparent;
  border-style: solid;
  border-width: 5px;
  transform: rotate(45deg);
}
</style>
