<template>
  <span
    v-if="$settings.consoleUrl && $getLoginUser().consoleType == '0'"
    class="noticeButton ant-dropdown-trigger ant-pro-dropdown ant-pro-dropdown-action action"
  >
    <avic-icon
      class="anticon icon"
      style="vertical-align: -0.175em; font-size: 1.2em"
      title="返回控制台"
      svg="avic-home-4-fill"
      @click="handleToConsole"
    />
  </span>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const { proxy } = getCurrentInstance();
const userStore = useUserStore();
defineProps({
  currentUser: {
    type: Object,
    default: () => null
  }
});
function handleToConsole() {
  window.name = 'portal';
  const token = userStore.token;
  let consoleUrl = proxy.$settings.consoleUrl;
  consoleUrl = consoleUrl.endsWith('/') ? consoleUrl : `${consoleUrl}/`;
  window.open(
    `${consoleUrl}access-from-portal?access_token=${token}&redirect_url=/backstage`,
    'console'
  );
}
</script>

<style lang="less" scoped></style>
