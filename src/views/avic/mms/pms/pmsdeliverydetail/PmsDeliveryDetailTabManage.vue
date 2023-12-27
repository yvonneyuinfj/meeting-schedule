<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="附件明细">
      <pms-delivery-detail-designer-manage key="pmsDeliveryDetailDesignerManage" ref="pmsDeliveryDetailDesignerManage"
                                           :mainId="mainId"/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="交付明细">
      <pms-delivery-detail-manage key="pmsDeliveryDetailManage" ref="pmsDeliveryDetailManage" :mainId="mainId"/>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PmsDeliveryDetailDesignerManage from './PmsDeliveryDetailDesignerManage.vue'; // 引入子表页面组件
import PmsDeliveryDetailManage from './PmsDeliveryDetailManage.vue'; // 引入子表页面组件

const activeKey = ref('1');
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});
</script>
<style lang="less">
.splitpanes__inner {
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
