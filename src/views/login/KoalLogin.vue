<template>
  <div></div>
</template>
<script lang="ts" setup>
import { localStorage } from '@/utils/local-storage';
import { SSO_TYPE } from '@/store/app';
import { useUserStore, RESET_CURRENT_USER } from '@/store/user';
import { koalLoginRequest } from '@/api/avic/system/SingleSignOnApi';
const { proxy } = getCurrentInstance();
const redirect_url = 'redirect_url';
const userStore = useUserStore();

onBeforeMount(() => {
  koalLogin();
});

async function koalLogin() {
  // 清除token
  userStore[RESET_CURRENT_USER]();
  // 记单点登录类型
  localStorage.set(SSO_TYPE, 'koalLogin');

  try {
    const response = await koalLoginRequest();
    const { code, data } = response;
    if (code === '200') {
      userStore.SET_TOKEN(data.token);
      if (proxy.$route.fullPath.indexOf(redirect_url) > -1) {
        proxy.$router.push(decodeURIComponent(proxy.$route.fullPath.split(redirect_url + '=')[1]));
      } else {
        proxy.$router.push('/');
      }
    } else {
      proxy.$router.push({
        name: 'login'
      });
    }
  } catch (error) {
    proxy.$router.push({
      name: 'login'
    });
  }
}
</script>
