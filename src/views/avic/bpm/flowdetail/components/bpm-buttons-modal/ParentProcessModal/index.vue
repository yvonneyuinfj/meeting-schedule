<template>
  <AvicModal
    :visible="true"
    :title="modalTitle"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
    :body-style="{ padding: '0' }"
  >
    <process-tree-table @selectProcess="selectProcess" :is-multi-selection="false" />
    <template #footer>
      <a-button
        v-if="showDeleteBtn"
        type="primary"
        danger
        :loading="loadingDelete"
        @click="handleDelete"
      >
        取消已关联的父流程
      </a-button>
      <a-button type="primary" :loading="loadingSave" @click="handleSave">保存</a-button>
      <a-button @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { httpAction } from '@/api/avic/bpm/FlowUtilApi';
import { Modal, message } from 'ant-design-vue';
import ProcessTreeTable from '../ProcessTreeTable.vue';
const { proxy } = getCurrentInstance();
const emit = defineEmits(['saveSuccess', 'updateParentFlow', 'close']);
const props = defineProps({
  procinstDbid: {
    type: String,
    required: true
  },
  isParentProcessExist: {
    type: Boolean,
    default: false
  }
});
let loadingSave = ref(false);
let loadingDelete = ref(false);
let modalTitle = '关联父流程';
let showDeleteBtn = ref(props.isParentProcessExist);
let processList = ref([]);
function selectProcess(data) {
  processList.value = data;
}
function handleSave() {
  if (!processList.value || processList.value.length === 0) {
    proxy.$message.warning('请先选择要关联的父流程');
    return;
  }
  loadingSave.value = true;
  let param = { dbid1: props.procinstDbid, dbid2: processList.value[0].dbId, task: '' };
  httpAction('/bpm/bpm/business/related/subProcessSaveData/v1', param, 'post')
    .then(response => {
      loadingSave.value = false;
      if (response.success) {
        emit('saveSuccess');
        emit('updateParentFlow');
      }
    })
    .catch(e => {
      if (e.code == 500) {
        proxy.$message.error(e.message);
      }
      loadingSave.value = false;
    });
}
function handleDelete() {
  Modal.confirm({
    title: '确定取消已关联的父流程吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loadingDelete.value = true;
      confirmDelete();
    }
  });
}
function confirmDelete() {
  let param = { id: props.procinstDbid };
  httpAction('/bpm/bpm/business/related/subDelData/v1', param, 'post')
    .then(response => {
      loadingDelete.value = false;
      if (response.success) {
        showDeleteBtn.value = false;
        message.success('【取消已关联的父流程】操作成功');
        emit('updateParentFlow');
      }
    })
    .catch(() => {
      loadingDelete.value = false;
    });
}
function closeModal() {
  emit('close');
}
</script>
<style lang="less" scoped>
.relative-process-modal {
  .model-actions {
    width: 100%;
    height: 55px;
    text-align: right;
  }
}
</style>
