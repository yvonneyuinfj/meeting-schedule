import request from '@/utils/request';
import type { ResponseBaseData } from '@/api/model/baseModel';

/** 获取子流程树列表 */
export function getSubFlowTreeData({ data }): Promise<ResponseBaseData<any>> {
  return request({
    url: '/bpm/center/getClassicAppTreeData/v1',
    data: data,
    method: 'get'
  });
}

/** 获取子流程模型列表 */
export function getModelList(data): Promise<ResponseBaseData<any>> {
  return request({
    url: '/bpm/center/getStartBpmModelsByParentId/v1',
    data: data,
    method: 'get'
  });
}

/** 校验发起流程权限 */
export function checkStartProcessRight(pdId) {
  return request({
    url: '/bpm/center/checkStartProcessRight/v1',
    data: pdId,
    method: 'get'
  });
}
