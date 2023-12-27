<template>
  <a-dropdown
    v-if="currentUser && currentUser.name"
    class="ant-pro-dropdown ant-pro-dropdown-action"
    placement="bottomRight"
    overlayClassName="pro-components-header-dropdown-index-container"
  >
    <span>
      <!-- <avic-icon svg='avic-avatar' class="ant-pro-header-account-avatar" /> -->
      <avic-icon svg="avic-icon-user" class="ant-pro-header-account-avatar" />
      <!-- <a-avatar size="small" :src="userHead" class="ant-pro-header-account-avatar" /> -->

      <span class="ant-pro-header-account-name anticon">{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-dropdown-menu" :selected-keys="[]">
        <a-menu-item>
          <div class="user-mess" v-if="currentOrgName">组织：{{ currentOrgName }}</div>
          <div class="user-mess" v-if="currentDeptName">部门：{{ currentDeptName }}</div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="settings" @click="handleToRouter('1')">
          <template #icon><avic-icon svg="UserOutlined" /></template>
          个人设置
        </a-menu-item>
        <a-menu-item key="password" @click="handleToRouter('2')">
          <template #icon><avic-icon svg="LockOutlined" /></template>
          修改密码
        </a-menu-item>
        <a-menu-item key="multiorg" @click="handleToRouter('3')">
          <template #icon><avic-icon svg="UserDeleteOutlined" /></template>
          切换组织
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" v-if="isShowLogOut" @click="handleLogout">
          <template #icon>
            <avic-icon svg="logoutOutlined" />
          </template>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { getUserPhoto } from '@/api/user/login';
import { getCurrentMultiOrgInfo } from '@/api/avic/system/UserSettingApi';
import { localStorage } from '@/utils/local-storage';
import { SSO_TYPE } from '@/store/app';
const { proxy } = getCurrentInstance();
defineProps({
  currentUser: {
    type: Object,
    default: () => null
  },
  menu: {
    type: Boolean,
    default: true
  }
});
const router = useRouter();
const userStore = useUserStore();
const userHead = ref('');
const currentOrgName = ref('');
const currentDeptName = ref('');
const isShowLogOut = computed(() => {
  return localStorage.get(SSO_TYPE) && localStorage.get(SSO_TYPE) != 'httpheaderLogin'
    ? false
    : true;
});
onMounted(() => {
  getUserAvatar();
  getUserORG();
});
function handleToRouter(flag) {
  router.push({
    path: '/account/settings',
    query: { id: flag }
  });
}
function getUserAvatar() {
  getUserPhoto()
    .then((res: any) => {
      if (res.byteLength == 0) {
        userHead.value = '/src/assets/user/head.png';
      } else {
        userHead.value =
          'data:image/png;base64,' +
          btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      }
    })
    .catch(err => {
      console.log(err);
    });
}
async function getUserORG() {
  getCurrentMultiOrgInfo().then(res => {
    currentOrgName.value = res.data.currentOrgName;
    // currentDeptName.value = res.data.currentDeptName;
    currentDeptName.value = proxy.$getLoginUser().entityDeptName;
  });
}
const handleLogout = () => {
  proxy.$Modal.confirm({
    title: '确认要离开系统吗？',
    onOk() {
      // 注销登录（否则换用户登录和菜单信息不会刷新），并location.href到登录否则页签会被缓存
      userStore.LOGOUT().then(() => {
        const basePath = proxy.$settings.routerOptions.base;
        if (basePath && basePath == '/') {
          location.href = '/user/login';
        } else {
          location.href = proxy.$settings.routerOptions.base + '/user/login';
        }
      });
    }
  });
};
</script>

<style lang="less">
body {
  @import './header-dropdown.less';
  .ant-pro-header-account-name {
    vertical-align: unset;
  }
  .ant-pro-header-account-avatar {
    margin: 12px 8px 12px 0;
    // color: @primary-color;
    // vertical-align: top;
    // background: hsla(0, 0%, 0%, 0);
    .svg-icon {
      vertical-align: -0.175em;
      font-size: 16px;
    }
  }
}
</style>
