<!--
  跳转流程详情页面多个任务选择打开的任务操作
-->
<template>
  <AvicModal
    :visible="visible"
    title="添加"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="handleCancel"
  >
    <div>
      <AvicTable
        :columns="tableColumns"
        :data-source="bpmDetailData"
        :row-key="rowKey"
        :pagination="false"
        :row-selection="{
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :customRow="
          record => {
            return {
              onDblclick: () => {
                handleRowDblClick(record);
              }
            };
          }
        "
      />
    </div>
    <template v-slot:footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>
  </AvicModal>
</template>
<script setup lang="ts">
const { proxy } = getCurrentInstance();
const props = defineProps({
  /** 流程实例信息 */
  bpmInstanceObject: { type: Object },
  data: { type: Array }
});
const tableColumns = ref([
  {
    title: '任务名称',
    dataIndex: 'taskTitle'
  },
  {
    title: '任务类型',
    dataIndex: 'userIdentity'
  },
  {
    title: '节点',
    dataIndex: 'taskName'
  },
  {
    title: '发送人',
    dataIndex: 'taskSendUser'
  },
  {
    title: '接收时间',
    dataIndex: 'cTime'
  }
]);
const rowKey = ref('dbid');
const visible = ref(false);
const selectedRows = ref([]);
const bpmDetailData = ref([]);
watch(
  () => props.bpmInstanceObject,
  newVal => {
    if (newVal && newVal.bpmDetailSelect && newVal.bpmDetailSelect.data.length > 0) {
      visible.value = true;
      bpmDetailData.value = newVal.bpmDetailSelect.data;
    }
  },
  { immediate: true }
);
watch(
  () => props.data,
  newVal => {
    if (newVal) {
      visible.value = true;
      bpmDetailData.value = newVal;
    }
  },
  { immediate: true }
);

/** 公共方法，外部组件或js调用*/
function showTaskList() {
  visible.value = true;
}
defineExpose({
  showTaskList
});
const $emit = defineEmits(['select', 'close']);

function handleOk() {
  if (selectedRows.value.length == 1) {
    $emit('select', selectedRows.value[0]);
    $emit('close');
  } else {
    proxy.$message.error('请选择一条要打开的待办任务');
  }
}

function handleCancel() {
  selectedRows.value = [];
  visible.value = false;
  $emit('close');
}

/** 选中事件*/
function onSelectChange(rowKeys) {
  if (rowKeys.length > 0) {
    selectedRows.value = bpmDetailData.value.filter(tim => tim.dbid == rowKeys[0]);
  } else {
    selectedRows.value = [];
  }
}

/** 表格行双击选择 */
function handleRowDblClick(row) {
  if (row[rowKey.value]) {
    selectedRows.value = [row];
  }
  handleOk();
  $emit('close');
}
</script>
