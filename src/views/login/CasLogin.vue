<template>
  <div></div>
</template>
<script lang="ts" setup>
import { localStorage } from '@/utils/local-storage';
import { useUserStore, RESET_CURRENT_USER } from '@/store/user';
import { SSO_TYPE } from '@/store/app';
import { getCasInfo, loginByCasTicket } from '@/api/avic/system/SingleSignOnApi';
const { proxy } = getCurrentInstance();
const redirect_url = 'redirect_url';
let theCasParamNameTicket = '';
const userStore = useUserStore();

onBeforeMount(() => {
  casLogin();
});

/**
 * 跳转到CAS-server进行登录认证
 */
async function casLogin() {
  // 清除token
  userStore[RESET_CURRENT_USER]();
  // 记单点登录类型
  localStorage.set(SSO_TYPE, 'casLogin');

  // 1.读取CAS-server信息
  let result = null;
  const response = await getCasInfo();
  result = response.data;

  const { casServerLoginUrl, casParamNameService, casParamNameTicket } = result;
  theCasParamNameTicket = casParamNameTicket;
  if (proxy.$route.query[casParamNameTicket]) {
    let service = window.location.href;
    service = service.substring(0, service.indexOf(`${casParamNameTicket}=`));
    service = service.endsWith('&') ? service.substring(0, service.length - 1) : service;
    service = service.endsWith('?') ? service.substring(0, service.length - 1) : service;

    let param = {
      ticket: proxy.$route.query[casParamNameTicket],
      service: service
    };
    casAuth(param);
  } else {
    // 校验
    if (!casParamNameService) {
      throw new Error('无法完成CAS认证: 缺失回调地址参数配置(casParamNameService) ');
    }
    // 2.根据参数配置跳转
    window.location.href = `${casServerLoginUrl}?${casParamNameService}=${encodeURIComponent(
      window.location.href
    )}`;
  }
}
/**
 * CAS认证后获取平台登录信息
 */
async function casAuth(params) {
  try {
    const response = await loginByCasTicket(params);
    const { code, data } = response;
    if (code === '200') {
      userStore.SET_TOKEN(data.token);
      if (proxy.$route.fullPath.indexOf(redirect_url) > -1) {
        let newPath = '';
        let urlArr = decodeURIComponent(proxy.$route.fullPath.split(redirect_url + '=')[1]);
        if (urlArr.indexOf(theCasParamNameTicket) > -1) {
          newPath = urlArr.substring(0, urlArr.indexOf(theCasParamNameTicket) - 1);
        } else {
          newPath = urlArr;
        }
        proxy.$router.push(newPath);
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
