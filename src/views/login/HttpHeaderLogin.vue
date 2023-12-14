<template>
  <div></div>
</template>
<script lang="ts" setup>
import { localStorage } from '@/utils/local-storage';
import { useUserStore, RESET_CURRENT_USER } from '@/store/user';
import { SSO_TYPE, USER_TYPE } from '@/store/app';
import { httpheaderLoginRequest } from '@/api/avic/system/SingleSignOnApi';

const { proxy } = getCurrentInstance();
const paramName = 'username_';
const redirect_url = 'redirect_url';
const type = 'userType';
const userStore = useUserStore();

onBeforeMount(() => {
  httpheaderLogin();
});

async function httpheaderLogin() {
  // 清除token
  userStore[RESET_CURRENT_USER]();
  // 记单点登录类型
  localStorage.set(SSO_TYPE, 'httpheaderLogin');
  localStorage.set(USER_TYPE, proxy.$route.query[type]);

  try {
    let param = proxy.$route.query[paramName];
    if (param) {
      const loginParam = {
        username_: param
      };
      const response = await httpheaderLoginRequest(loginParam);
      // const response = await httpheaderLoginRequest(`${paramName}=${param}`);
      const { code, data } = response;
      if (code === '200') {
        userStore.SET_TOKEN(data.token);
        if (proxy.$route.fullPath.indexOf(redirect_url) > -1) {
          proxy.$router.push(
            decodeURIComponent(proxy.$route.fullPath.split(redirect_url + '=')[1])
          );
        } else {
          proxy.$router.push('/');
        }
      } else {
        proxy.$router.push({
          name: 'login'
        });
      }
    } else {
      throw new Error(`缺少参数${paramName}`);
    }
  } catch (error) {
    proxy.$router.push({
      name: 'login'
    });
  }
}
</script>
