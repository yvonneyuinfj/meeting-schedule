<template>
  <AvicModal
    :visible="true"
    class="relative-process-modal"
    :title="modalTitle"
    :centered="true"
    width="880px"
    height="520px"
    @cancel="handleClose"
    :body-style="{ padding: '0' }"
  >
    <ProcessTreeTable @selectProcess="selectProcess" />
    <template v-slot:footer>
      <a-button type="primary" :loading="loadingSave" @click="handleSave">保存</a-button>
      <a-button @click="handleClose">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { httpAction } from '@/api/avic/bpm/FlowUtilApi'; //引入模块Action
import ProcessTreeTable from '../ProcessTreeTable.vue'; //引入树表格页面组件
import bpmUtils from '../../../../bpmutils/FlowUtils'; //引入流程相关配置及方法

const props = defineProps(['procinstDbid']);
const loadingSave = ref<boolean>(false); //是否展示保存loding效果
const modalTitle = ref<string>('添加相关流程'); //弹框标题
const processList = ref([]); //表格数据源
const { proxy } = getCurrentInstance();
const emit = defineEmits(['saveSuccess', 'close']); // 表格单选: single, 多选: multi
const httpConfig = {
  saveRelativeProcess: {
    url: bpmUtils.baseurl + '/business/related/relatedSaveData/v1',
    method: 'post'
  }
};

/** 树表格选择 */
function selectProcess(data) {
  processList.value = data;
}
/** 流程保存 */
function handleSave() {
  if (!processList.value || processList.value.length === 0) {
    proxy.$message.warning('请选择至少一项流程');
    return;
  }
  loadingSave.value = true;
  let ids = [];
  processList.value.map(item => {
    ids.push(item.dbId);
  });
  if (ids.indexOf(props.procinstDbid) > -1) {
    proxy.$message.error('选择的相关流程不能是当前流程实例！');
    loadingSave.value = false;
    return;
  }
  let param = { dbid1: props.procinstDbid, dbid2: ids.toString() };
  httpAction(httpConfig.saveRelativeProcess.url, param, httpConfig.saveRelativeProcess.method)
    .then((res: any) => {
      if (res.success) {
        emit('saveSuccess');
      }
      loadingSave.value = false;
    })
    .catch(() => {
      proxy.$message.error('保存失败：保存的数据已经存在！');
      loadingSave.value = false;
    });
}
const handleClose = () => {
  emit('close');
};
</script>
