import request from '@/utils/request';
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils';

/** 获取流程按钮列表 */
export function getBpmButtonExtsByPage(data) {
  return request.post(bpmUtils.baseurl + '/bpmButtonExt/getBpmButtonExtsByPage/v1', data);
}

/** 获取表单权限数据 */
export function getFormSecuritys(data) {
  return request.post(bpmUtils.baseurl + '/business/getFormSecuritys/v1', data);
}

/** 获取当前节点信息 */
export function getcoordinate(data) {
  return request.post(bpmUtils.baseurl + '/clientbpmdisplayaction/getcoordinate/v1', data);
}

/** 加签、补发、加签并提交 */
export function dosupplementassignee(data) {
  return request.post(bpmUtils.baseurl + '/business/dosupplementassignee/v1', data);
}

/** 帮助 */
export function getTaskRemark(data) {
  return request.post(bpmUtils.baseurl + '/business/getTaskRemark/v1', data);
}

/** 关注工作 */
export function setFocusedTask(data) {
  return request.post(bpmUtils.baseurl + '/business/setFocusedTask/v1', data);
}

/** 流程结束 */
export function doend(data) {
  return request.post(bpmUtils.baseurl + '/business/doend/v1', data);
}

/** 流程跳转 */
export function dojump(data) {
  return request.post(bpmUtils.baseurl + '/business/dojump/v1', data);
}

/** 流程恢复 */
export function doresume(data) {
  return request.post(bpmUtils.baseurl + '/business/doresume/v1', data);
}

/** 流程暂停 */
export function dosuspend(data) {
  return request.post(bpmUtils.baseurl + '/business/dosuspend/v1', data);
}

/** 发送催办 */
export function beforepresstodo(data) {
  return request.post(bpmUtils.baseurl + '/business/beforepresstodo/v1', data);
}
/** 再次发送催办 */
export function dopresstodo(data) {
  return request.post(bpmUtils.baseurl + '/business/dopresstodo/v1', data);
}

/** 退回拟稿人 */
export function dobacktofirst(data) {
  return request.post(bpmUtils.baseurl + '/business/dobacktofirst/v1', data);
}

/** 退回上一步 */
export function dobacktoprev(data) {
  return request.post(bpmUtils.baseurl + '/business/dobacktoprev/v1', data);
}

/** 任意退回 */
export function dobacktowant(data) {
  return request.post(bpmUtils.baseurl + '/business/dobacktowant/v1', data);
}

/** 跨节点退回 */
export function dobacktoactivity(data) {
  return request.post(bpmUtils.baseurl + '/business/dobacktoactivity/v1', data);
}

/** 获取子流程定义id */
export function getSubPdId(data) {
  return request.post(bpmUtils.baseurl + '/business/getSubPdId/v1', data);
}
/** 获取流程启动列表 */
export function processStartView(data) {
  return request.get(bpmUtils.baseurl + '/business/processStartView/v1', { data: data });
}
/** 发起子流程 */
export function dostartsubprocess(data) {
  return request.post(bpmUtils.baseurl + '/business/dostartsubprocess/v1', data);
}

/** 自定义选人 */
export function douserdefined(data) {
  return request.post(bpmUtils.baseurl + '/business/douserdefined/v1', data);
}

/** 提交 */
export function dosubmit(data) {
  return request.post(bpmUtils.baseurl + '/business/dosubmit/v1', data);
}

/** 流程转办 */
export function dosupersede(data) {
  return request.post(bpmUtils.baseurl + '/business/dosupersede/v1', data);
}

/** 增加读者 */
export function dotaskreader(data) {
  return request.post(bpmUtils.baseurl + '/business/dotaskreader/v1', data);
}

/** 发送阅知 */
export function dotransmit(data) {
  return request.post(bpmUtils.baseurl + '/business/dotransmit/v1', data);
}

/** 已阅 */
export function dosubmitTransmit(data) {
  return request.post(bpmUtils.baseurl + '/business/dosubmitTransmit/v1', data);
}

/** 拿回 */
export function dowithdrawcurract(data) {
  return request.post(bpmUtils.baseurl + '/business/dowithdrawcurract/v1', data);
}

/** 减签 */
export function dowithdrawactassignee(data) {
  return request.post(bpmUtils.baseurl + '/business/dowithdrawactassignee/v1', data);
}

/** 拿回部分待办 */
export function dowithdrawpart(data) {
  return request.post(bpmUtils.baseurl + '/business/dowithdrawpart/v1', data);
}
