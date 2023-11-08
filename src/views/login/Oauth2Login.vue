<template>
  <div></div>
</template>
<script lang="ts" setup>
import { localStorage } from '@/utils/local-storage';
import { SSO_TYPE } from '@/store/app';
import { useUserStore, RESET_CURRENT_USER } from '@/store/user';
import { getOauth2Info, loginByOauth2Ticket } from '@/api/avic/system/SingleSignOnApi';
const { proxy } = getCurrentInstance();
const redirect_url = 'redirect_url';
let theIdaasParamNameTicket = '';
const userStore = useUserStore();

onBeforeMount(() => {
  oauth2Login();
});

async function oauth2Login() {
  // 清除token
  userStore[RESET_CURRENT_USER]();
  // 记单点登录类型
  localStorage.set(SSO_TYPE, 'oauth2Login');

  // 1.读取Oauth2信息
  let result = null;
  const response = await getOauth2Info();
  result = response.data;
  const { idaasServerLoginUrl, idaasParamNameService, idaasParamNameTicket } = result;
  theIdaasParamNameTicket = idaasParamNameTicket;
  if (proxy.$route.query[idaasParamNameTicket]) {
    let service = window.location.href;
    service = service.substring(0, service.indexOf(`${idaasParamNameTicket}=`));
    service = service.endsWith('&') ? service.substring(0, service.length - 1) : service;
    service = service.endsWith('?') ? service.substring(0, service.length - 1) : service;

    let param = { ticket: proxy.$route.query[idaasParamNameTicket], service: service };
    let paramNames = { ticket: idaasParamNameTicket, service: idaasParamNameService };
    oauth2Auth(param, paramNames);
  } else {
    // 校验
    if (!idaasParamNameService) {
      throw new Error(`无法完成Oauth2认证: 缺失回调地址参数配置${idaasParamNameService}`);
    }
    // 2.根据参数配置跳转
    // 不进行编码，复杂的地址会被idds服务截断
    let href = encodeURIComponent(window.location.href);
    let url = idaasServerLoginUrl;
    if (url.indexOf('?') > -1) {
      url = url + `&${idaasParamNameService}=${href}`;
    } else {
      url = url + `?${idaasParamNameService}=${href}`;
    }
    window.location = url;
  }
}
async function oauth2Auth(params, paramNames) {
  try {
    // 给接口传的地址与adds服务的地址保持一致
    let href = encodeURIComponent(params.service);
    const response = await loginByOauth2Ticket(
      `?${paramNames.ticket}=${params.ticket}&${paramNames.service}=${href}`
    );
    const { code, data } = response;
    if (code === '200') {
      userStore.SET_TOKEN(data.token);
      if (proxy.$route.fullPath.indexOf(redirect_url) > -1) {
        let newPath = '';
        let urlArr = decodeURIComponent(proxy.$route.fullPath.split(redirect_url + '=')[1]);
        if (urlArr.indexOf(theIdaasParamNameTicket) > -1) {
          newPath = urlArr.substring(0, urlArr.indexOf(theIdaasParamNameTicket) - 1);
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
