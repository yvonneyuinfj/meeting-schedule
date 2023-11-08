<template>
  <slot />
</template>
<script lang="ts" setup>
import { RESET_CURRENT_USER, useUserStore } from '@/store/user';
const ROUTE_PARAM_ACCESS_TOKEN = 'access_token';
const redirect_url = 'redirect_url';
const { proxy } = getCurrentInstance();

onBeforeMount(() => {
  accessFromConsole();
});

function accessFromConsole() {
  // 清除token
  const userStore = useUserStore();
  userStore[RESET_CURRENT_USER]();
  try {
    let param = proxy.$route.query[ROUTE_PARAM_ACCESS_TOKEN];
    if (param) {
      userStore.SET_TOKEN(param as string);
      proxy.$router.isReady().then(() => {
        if (proxy.$route.fullPath.indexOf(`${redirect_url}=`) > -1) {
          proxy.$router.push(
            decodeURIComponent(proxy.$route.fullPath.split(redirect_url + '=')[1])
          );
        } else {
          proxy.$router.push('/');
        }
      });
    } else {
      throw new Error(`缺少参数${ROUTE_PARAM_ACCESS_TOKEN}`);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
