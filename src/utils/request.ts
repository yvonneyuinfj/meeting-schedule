import type { AxiosRequestConfig, AxiosResponseHeaders } from 'axios';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { notification } from 'ant-design-vue';
import { useUserStore, RESET_CURRENT_USER } from '@/store/user';
import { modalError, getssoInfo } from './common-util';
import router from '@/router';
import { settings } from '@/settings';

// 这里是用于设定请求后端时，所用的 Token KEY
// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'X-Access-Token';
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: settings.axiosRequestConfig.baseURL || import.meta.env.VITE_APP_API_BASE_URL || '/',
  // 请求超时时间
  timeout: settings.axiosRequestConfig.timeout || 100,
  headers: {
    // 设置请求头中携带应用ID
    ['X-App-Id']: settings.appId,
    // 设置默认请求数据类型为json 格式
    ['Content-Type']: 'application/json;charset=UTF-8'
  }
});
export class AvicResponseData {
  /** 请求响应报文中的请求状态码(业务) */
  retCode: string;
  /** 请求响应报文中的请求错误信息 */
  errorDesc: string;
  /** 请求响应报文中的业务数据 */
  responseBody: any;
  /** 请求响应报文中的描述信息 */
  message: string;
}
/* 接口最终暴露结构 */
export class ResponseData {
  errorDesc: string;
  message: string;
  code: string;
  success: boolean;
  data: any;
}
export interface AvicRequestConfig extends AxiosRequestConfig<AvicResponseData> {
  /** 请求失败时是否通过notification提示 */
  withoutPrompt?: boolean;
  /** 请求是否刷新token有效期 */
  notUpdateSession?: boolean;
}
export class AvicResponse<AvicResponseData> implements AxiosResponse<AvicResponseData> {
  data: AvicResponseData;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AvicRequestConfig;
  request?: any;
}
export class RequestError extends AxiosError<AvicResponseData> {
  result?: any;
  errorDesc?: string;
}
const unauthorizedHandler = () => {
  const userStore = useUserStore();
  userStore[RESET_CURRENT_USER]();
  const ssoInfo = getssoInfo();
  // 开启单点登录后跳转至对应登录页
  if (ssoInfo.enable) {
    router.push({
      name: ssoInfo.name
    });
  } else {
    modalError({
      title: '登录已过期',
      content: '很抱歉，登录已过期，请重新登录',
      okText: '重新登录',
      onOk: () => {
        router.push({
          name: 'login'
        });
      }
    });
  }
};

// 异常拦截处理器
const errorHandler = (error: RequestError): Promise<any> => {
  if (error.response) {
    const { data, status, statusText } = error.response;
    // 403 无权限 401 未登录/未授权
    if (status === 403 || status === 401) {
      notification.error({
        message: `请求失败:${status}`,
        description: (data && data.message) || statusText
      });
    }
  } else {
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    notification.error({
      message: '请求失败',
      description: message
    });
  }
  return Promise.reject(error);
};

// 请求拦截器
const requestHandler = (
  config: AvicRequestConfig
): AvicRequestConfig | Promise<AvicRequestConfig> => {
  const userStore = useUserStore();
  const savedToken = userStore.token;
  // 如果 token 存在
  // 让每个请求携带自定义 token, 请根据实际情况修改
  if (savedToken) {
    config.headers[REQUEST_TOKEN_KEY] = savedToken;
  }

  //GET请求附加时间戳
  if (!config.method || config.method.toLowerCase() === 'get') {
    config.params = {
      _t: new Date().getTime() / 1000,
      ...config.data
    };
  }
  return config;
};

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler);

// 响应拦截器
const responseHandler = (response: AvicResponse<AvicResponseData>) => {
  const { config, request, status } = response;
  const code = response.data.retCode || String(status);
  const errorMessage = response.data.message || response.data.errorDesc;
  if (code === '401') {
    unauthorizedHandler();
    return Promise.reject(new RequestError(errorMessage, code, config, request, response));
  } else if (code !== '200') {
    if (config.withoutPrompt) {
      notification.error({
        message: `请求失败:${code}`,
        description: errorMessage
      });
    }
    return Promise.reject(new RequestError(errorMessage, code, config, request, response));
  }
  if (Reflect.has(response.data, 'responseBody')) {
    const { retCode, message, responseBody, errorDesc } = response.data;
    const responseData = new ResponseData();
    responseData.message = message;
    responseData.errorDesc = errorDesc;
    responseData.code = retCode;
    responseData.data = responseBody;
    if (retCode === '200') {
      responseData.success = true;
    } else {
      responseData.success = false;
    }
    //return response.data.responseBody;
    return responseData;
  } else {
    return response.data;
  }
};

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler);

export { AxiosResponse };

export default request;
