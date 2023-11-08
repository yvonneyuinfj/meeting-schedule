<template>
  <div class="avic-content-tab">
    <a-tabs
      id="BpmProcessDelegationManageTabs"
      default-active-key="1"
      class="module-tabs avic-module-tab"
    >
      <a-tab-pane key="1" tab="我的委托" force-render>
        <MyDelegation ref="myDelegation" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="我的受托">
        <MyTrusteeship ref="myTrusteeship" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import MyDelegation from './MyDelegation.vue';
import MyTrusteeship from './MyTrusteeship.vue';
</script>
<style lang="less">
.card-container {
  background-color: #fff;
  .ant-tabs {
    width: 100%;
  }
  .ant-tabs-bar {
    margin-bottom: 0;
  }
  .ant-tabs-content {
    height: calc(100% - 44px);
  }
}
</style>
