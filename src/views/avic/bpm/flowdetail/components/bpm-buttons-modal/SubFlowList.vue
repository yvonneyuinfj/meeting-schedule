<template>
  <AvicModal
    :visible="true"
    title="子流程"
    width="460px"
    height="480px"
    :centered="true"
    @cancel="closeModal"
  >
    <div>
      <AvicTable
        :columns="columns"
        :data-source="dataSource"
        :row-key="record => record.entryId"
        :pagination="false"
        :show-table-setting="false"
        :row-selection="{
          type: 'radio',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
      />
    </div>
    <template #footer>
      <a-button @click="closeModal">取消</a-button>
      <a-button type="primary" @click="handleConfirm">确定</a-button>
    </template>
  </AvicModal>
</template>

<script lang="ts" setup>
const { proxy } = getCurrentInstance();

const props = defineProps({
  subData: { type: Array, default: () => [] },
  visible: { type: Boolean, required: false, default: false }
});

const columns = ref([
  {
    title: '标题',
    dataIndex: 'entryName'
  },
  {
    title: '接收人',
    dataIndex: 'userName'
  },
  {
    title: '子流程模板',
    dataIndex: 'procdefName'
  }
]);
const dataSource = ref([]);
const selectedRowKeys = ref([]);
const emits = defineEmits(['close', 'confirm']);
watch(
  () => props.subData,
  newVal => {
    if (newVal && newVal.length > 0) {
      dataSource.value = newVal;
    } else {
      dataSource.value = [];
    }
  },
  { immediate: true }
);
function closeModal() {
  emits('close');
}
/** 选中事件*/
function onSelectChange(rowKeys) {
  selectedRowKeys.value = rowKeys;
}
/** 点击确认*/
function handleConfirm() {
  if (selectedRowKeys.value.length == 1) {
    emits('confirm', selectedRowKeys.value[0]);
    emits('close');
  } else {
    proxy.$message.error('请选择一条要打开的子流程');
  }
}
</script>

<style scoped></style>
