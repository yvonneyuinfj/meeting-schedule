<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="客户联系信息">
      <mds-customer-l-manage key="mdsCustomerLManage" ref="mdsCustomerLManage" :mainId="mainId"/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="银行账户信息">
      <mds-customer-account-manage key="mdsCustomerAccountManage" ref="mdsCustomerAccountManage" :mainId="mainId"/>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MdsCustomerLManage from '../mdscustomerl/MdsCustomerLManage.vue'; // 引入子表页面组件
import MdsCustomerAccountManage from '../mdscustomeraccount/MdsCustomerAccountManage.vue'; // 引入子表页面组件

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
.splitpanes__inner{
  .ant-tabs-card{
    height: 100%;
  }
}
.ant-tabs-content-holder{
  height: 100%;
}
.ant-tabs-content{
  height: 100%;
}
</style>
