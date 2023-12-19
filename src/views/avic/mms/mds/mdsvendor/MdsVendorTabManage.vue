<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="供应商银行账户信息">
      <mds-vendor-account-manage key="mdsVendorAccountManage" ref="mdsVendorAccountManage" :mainId="mainId" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="供应商联系人信息">
      <mds-vendor-linkman-manage key="mdsVendorLinkmanManage" ref="mdsVendorLinkmanManage" :mainId="mainId"/>
    </a-tab-pane>
    <a-tab-pane key="3" tab="供应商资质信息">
      <mds-vendor-prove-manage key="mdsVendorProveManage" ref="mdsVendorProveManage" :mainId="mainId"/>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MdsVendorAccountManage from '../mdsvendoraccount/MdsVendorAccountManage.vue'; // 引入子表页面组件
import MdsVendorLinkmanManage from '../mdsvendorlinkman/MdsVendorLinkmanManage.vue'; // 引入子表页面组件
import MdsVendorProveManage from '../mdsvendorprove/MdsVendorProveManage.vue'; // 引入子表页面组件
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
