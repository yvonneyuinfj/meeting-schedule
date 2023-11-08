import request from '@/utils/request';
import type { ResponseBaseData, ResponsePageData } from '@/api/model/baseModel';

/** 获取未读消息数据地址 */
export function getUnreadDataApi(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/message/MessageRest/searchTopUnread/v1', param);
}

/** 获取列表数据 */
export function getListApi(param): Promise<ResponsePageData<any>> {
  return request.post('/appsys/message/MessageRest/searchByPage/v1', param);
}

/** 获取未读消息数量地址 */
export function getUnreadCountApi(): Promise<ResponseBaseData<any>> {
  return request.get('/appsys/message/MessageRest/searchUnreadCount/v1');
}

/** 设置已读 */
export function doReadParamApi(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/message/MessageRest/doread/v1', param);
}

/** 设置未读 */
export function doUnReadParamApi(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/message/MessageRest/dounread/v1', param);
}

/** 添加 */
export function addParamApi(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/message/MessageRest/save/v1', param);
}

/** 详情 */
export function detailParamApi(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/message/MessageRest/get/v1', param);
}

/** 删除 */
export function delParamApi(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/message/MessageRest/deleteByIds/v1', param);
}
