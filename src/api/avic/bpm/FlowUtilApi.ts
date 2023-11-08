import request from '@/utils/request';
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils';

/** 发起流程获取流程参数 */
export function start(data) {
  return request.post(bpmUtils.baseurl + '/business/start/v1', data);
}

/** 获取流程详情页面相关数据*/
export function getProcessDetailParameter(data) {
  return request.post(bpmUtils.baseurl + '/business/getProcessDetailParameter/v1', data);
}

/** 完成待阅任务 */
export function finishreader(data) {
  return request.post(bpmUtils.baseurl + '/business/finishreader/v1', data);
}

/** 获取流程定义id */
export function getDefineIdByEntryId(data) {
  return request.post(bpmUtils.baseurl + '/business/getDefineIdByEntryId/v1', data);
}

/** 获取流程按钮设置 */
export function getBpmButtonListBySelf(data) {
  return request.post(bpmUtils.baseurl + '/business/getBpmButtonListBySelf/v1', data);
}

/** 获取流程按钮 */
export function getoperateright(data) {
  return request.post(bpmUtils.baseurl + '/business/getoperateright/v1', data);
}

/** 请求合并后接口，获取defineId、流程按钮、流程节点、表单权限 */
export function getOperaterightAndFormSecuritys(data) {
  return request.post(bpmUtils.baseurl + '/business/getOperaterightAndFormSecuritys/v1', data);
}

/** 获取流程页面标签页 */
export function getBpmTabs(data) {
  return request.post(bpmUtils.baseurl + '/business/getBpmTabs/v1', data);
}

/** 获取流程标签类型 */
export function getBpmNavbarType(data) {
  return request.post(bpmUtils.baseurl + '/business/getBpmNavbarType/v1', data);
}

/** 获取流程标签类型 */
export function getProcessPicInfo(data) {
  return request.get('/bpm/bpmmodel/appBpmPicRest/getProcessPicInfo/v1', { data: data });
}

export function httpAction(url, parameter, method) {
  return request({
    url: url,
    data: parameter,
    method: method
  });
}
