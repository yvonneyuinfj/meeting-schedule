import request from '@/utils/request';
const basePath = '/appsys/lookup/LookupRest';

/** 获取多个通用代码Map */
export function getAllLookUpData(param) {
  return request({
    url: basePath + '/getAllLookUpDataMap/v1',
    data: param,
    method: 'post'
  });
}

/** 获取当前用户对应的文档密级 */
export function getUserFileSecretList() {
  return request({
    url: basePath + '/getCurrentUserSecretWordList/v1',
    method: 'get'
  });
}
