import request from '@/utils/request';
import type { ResponsePageData, BaseBeanModel, ResponseBaseData } from '@/api/model/baseModel';
const centerPath = '/bpm/center';
const bpmConsolePath = '/bpm/bpm/bpmConsoleAction';
/** 流程管理 */
export interface BpmProcessDto extends BaseBeanModel {
  /** 树id */
  nodeId?: string;
  /** 树类型 */
  nodeType?: string;
  /** 流程名称 */
  procDefName?: string;
  /** 流程状态 */
  businessState?: string;
  /** 申请人 */
  userId?: string;
  /** 申请部门 */
  deptId?: string;
  type?: string;
}
/** 获取流程管理信息 */
export function searchManageHistProcessByPage(param): Promise<ResponsePageData<BpmProcessDto>> {
  return request({
    url: centerPath + '/searchManageHistProcessByPage/v1',
    data: param,
    method: 'post'
  });
}

/** 删除流程 */
export function deleteProcessEntry(param): Promise<ResponseBaseData<any>> {
  return request.post(bpmConsolePath + '/deleteProcessEntry/v1', param);
}
