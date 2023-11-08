<template>
  <div class="user-content surface">
    <div class="user-menu">
      <a-tabs v-model:activeKey="activeKey" :tab-position="'left'" @change="handleChange">
        <a-tab-pane key="1" tab="基本信息">
          <PersonalInfo />
        </a-tab-pane>
        <a-tab-pane key="2" tab="修改密码">
          <Changepwd />
        </a-tab-pane>
        <a-tab-pane key="3" tab="切换组织">
          <ChangeMultiOrg />
        </a-tab-pane>
        <a-tab-pane key="4" tab="个人群组">
          <PersonGroupManage />
        </a-tab-pane>
        <a-tab-pane key="5" tab="常用意见">
          <ApprovalOptionManage />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PersonalInfo from './pages/base.vue';
import Changepwd from './pages/Changepwd.vue';
import ChangeMultiOrg from './pages/ChangeMultiOrg.vue';
import PersonGroupManage from './pages/PersonGroupManage.vue';
import ApprovalOptionManage from './pages/ApprovalOptionManage.vue';

const router = useRouter();
const route = useRoute();
const activeKey = ref('1');
onMounted(() => {
  activeKey.value = route.query.id || ('1' as any);
});
function handleChange(key) {
  router.push({
    path: '/account/settings',
    query: { id: key }
  });
}
</script>

<style lang="less">
.user-content {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  .user-menu {
    height: 100%;
    .ant-tabs-nav {
      width: 220px;
      padding: 8px;
      border-right: 1px solid @border-color-split;
    }
    .ant-tabs {
      height: 100%;
      .ant-tabs-nav {
        margin-right: 0;
        border-right: 1px solid #e5e6eb;
        .ant-tabs-tab {
          position: relative;
          margin: 0px 0 8px 0;
          padding: 0px 20px;
          line-height: 40px;
          text-align: left;
          border-radius: 4px;
        }

        .ant-tabs-tab-active {
          background: #f0f3f9;
        }
        .ant-tabs-tab-active::before {
          position: absolute;
          top: 10px !important;
          left: 0px !important;
          width: 3px;
          height: 18px !important;
          background: @primary-color;
          border-radius: 0 2px 2px 0;
          content: '';
        }
        .ant-tabs-tab:hover {
          background: #f0f3f9;
        }
        .ant-tabs-ink-bar {
          display: none;
        }
        .ant-tabs-nav-wrap {
          margin-right: 0px;
        }
      }
      .ant-tabs-content-left {
        height: 100%;
        padding-left: 0;
        border-left: 0;
      }
      .ant-tabs-tabpane {
        padding-left: 0;
        border-left: 0;
      }
    }
  }
}
</style>
