<template>
  <AvicModal
      :centered="true"
      :visible="true"
      height="520px"
      title="查看"
      width="960px"
      @cancel="closeModal"
  >
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="附件明细">
        <pms-delivery-detail-designer-manage key="pmsDeliveryDetailDesignerManage" ref="pmsDeliveryDetailDesignerManage"
                                             :mainId="formId"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="交付明细">
        <pms-delivery-detail-manage key="pmsDeliveryDetailManage" ref="pmsDeliveryDetailManage" :mainId="formId"/>
      </a-tab-pane>
    </a-tabs>
    <template #footer>
      <a-button ghost title="返回" type="primary" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PmsDeliveryDetailDesignerManage from './PmsDeliveryDetailDesignerManage.vue'; // 引入子表页面组件
import PmsDeliveryDetailManage from './PmsDeliveryDetailManage.vue';
import { emits } from '@/views/avic/mms/pms/pmsprocurementrequirements/ts/PmsProcurementRequirementsForm'; // 引入子表页面组件

const activeKey = ref('1');
const props = defineProps({
  // 主表选中项的keys集合
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);

/** 返回关闭事件 */
function closeModal() {
  emit('close');
}
</script>
<style lang="less">
.ant-modal-content {
  .ant-tabs-card {
    height: 100%;
  }
}

.ant-tabs-content-holder {
  height: 100%;
}

.ant-tabs-content {
  height: 100%;
}
</style>
