import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData } from '@/api/model/baseModel';
const centerPath = '/bpm/center';
const workhandActioinPath = '/bpm/bpm/clientbpmWorkHandAction';
const workhandPath = '/bpm/bpm/business/workhand';
/** 流程委托 */
export interface BpmProcessDelegationDto extends BaseBeanModel {
  /** 委托人 */
  workOwnerId?: string;
  /** 委托人部门 */
  workOwnerDeptId?: string;
  /** 受托人 */
  receptUserId?: string;
  /** 受托人部门 */
  receptDeptId?: string;
  /** 委托生效时间 */
  handEffectiveDate?: string;
  /** 预计返回时间 */
  backDate?: string;
  /** 流程状态 */
  businessState?: string;
  dataVo?: any;
  modules?: any;
}

/** 获取委托信息 */
export function getWorkHandInfo(): Promise<ResponseBaseData<any>> {
  return request.get(workhandActioinPath + '/addWorkHand/v1');
}

/** 添加委托 */
export function insertWorkHand(param: BpmProcessDelegationDto): Promise<ResponseBaseData<any>> {
  return request.post(workhandActioinPath + '/doWorkHand/v1', param);
}

/** 修改委托 */
export function updateWorkHand(param: BpmProcessDelegationDto): Promise<ResponseBaseData<any>> {
  return request.post(workhandPath + '/updateWorkHand/v1', param);
}

/** 获取委托数据 */
export function getWorkHandInfoById(id: string) {
  return request({
    url: workhandPath + '/toUpdate/v1',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: id,
    method: 'post'
  });
}

/** 删除委托 */
export function delWorkHandInfoById(id: string): Promise<ResponseBaseData<any>> {
  return request.post(workhandPath + '/deleteSysWorkHand/v1', id);
}

/** 完成委托 */
export function completeWorkHandInfoById(id: string): Promise<ResponseBaseData<any>> {
  return request.post(workhandPath + '/completeSysWorkHand/v1', id);
}

/** 获取已移交的待办 */
export function getWorkHandTaskPass(): Promise<ResponseBaseData<any>> {
  return request.get(workhandActioinPath + '/getWorkHandTask/v1');
}

/** 拿回已移交的待办 */
export function deleteWorkHandTaskPass(param) {
  return request({
    url: workhandActioinPath + '/deleteSysWorkHandPass/v1',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: param,
    method: 'post'
  });
}

/** 获取委托列表信息 */
export function listWorkHandDelegationByPage(
  param
): Promise<ResponsePageData<BpmProcessDelegationDto>> {
  return request.post(workhandActioinPath + '/getSysWorkHandListDelegationByPage/v1', param);
}

/** 获取受托列表信息 */
export function listWorkHandTrusteeshipByPage(
  param
): Promise<ResponsePageData<BpmProcessDelegationDto>> {
  return request.post(workhandActioinPath + '/getSysWorkHandListTrusteeshipByPage/v1', param);
}

/** 驳回该委托 */
export function rejectWorkhand(id): Promise<ResponseBaseData<any>> {
  return request.post(workhandPath + '/rejectWorkhand/v1', id);
}

/** 获取模型分类 */
export function getBpmModelsByParentId(param) {
  return request({
    url: centerPath + '/getBpmModelsByParentId/v1',
    data: param,
    method: 'get'
  });
}

/** 获取模型分类 */
export function getClassicAppTreeData() {
  return request({
    url: centerPath + '/getClassicAppTreeData/v1',
    data: null,
    method: 'get'
  });
}

/** 获取模型分类 */
export function searchClassicAppTreeData(param) {
  return request({
    url: centerPath + '/searchClassicAppTreeData/v1',
    data: param,
    method: 'post'
  });
}
