import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData } from '@/api/model/baseModel';
const centerPath = '/bpm/center';
const bpmBussinessPath = '/bpm/bpm/business';

export interface BpmFocusedTaskDto extends BaseBeanModel {
  /** 标题 */
  taskTitle?: string;
  /** 紧急程度 */
  priority?: string;
  /** 申请人 */
  processStarter?: string;
  /** 申请部门 */
  processStartDept?: string;
  /** 流程状态 */
  businessState?: string;
  /** 申请时间(起) */
  processStartTimeBegin?: string;
  /** 申请时间(止) */
  processStartTimeEnd?: string;
  /** 树id */
  nodeId?: string;
  /** 树类型 */
  nodeType?: string;
}

/** 获取关注信息 */
export function listBpmFocusTaskListByPage(param): Promise<ResponsePageData<BpmFocusedTaskDto>> {
  return request.post(centerPath + '/searchFocusedTaskByPageNew/v1', param);
}

/** 批量取消关注 */
export function batchCancel(param): Promise<ResponseBaseData<any>> {
  return request.post(bpmBussinessPath + '/delete/v1', param);
}

/** 清空关注 */
export function handleCancelAll(): Promise<ResponseBaseData<any>> {
  return request.post(bpmBussinessPath + '/cleanFocusedTask/v1');
}

/** 取消关注 */
export function cancelFocusedTask(param): Promise<ResponseBaseData<any>> {
  return request.post(bpmBussinessPath + '/cancelFocusedTask/v1', param);
}
