import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/tpm/tpmyearmaintmodifyplanls';
/** 年度维修改造计划子表 */
export interface TpmYearMaintModifyPlanLDto extends BaseBeanModel {
  /** 预留字段 */
  attribute01?: string;
  /** 预留字段 */
  attribute02?: string;
  /** 预留字段 */
  attribute03?: string;
  /** 预留字段 */
  attribute04?: string;
  /** 预留字段 */
  attribute05?: string;
  /** 预留字段 */
  attribute06?: string;
  /** 预留字段 */
  attribute07?: string;
  /** 预留字段 */
  attribute08?: string;
  /** 预留字段 */
  attribute09?: string;
  /** 预留字段 */
  attribute10?: string;
  /** 年度维修改造计划主表ID */
  tpmYearMaintModifyPlanId?: string;
  /** 计划编号 */
  planNo?: string;
  /** 密级 */
  secretLevel?: any;
  /** 预算项目 */
  budgetItems?: string;
  /** 预算分项 */
  budgetBreakdownItems?: string;
  /** 预算组织ID */
  budgetOrganizationId?: string;
  /** 预算组织编码 */
  budgetOrganizationCode?: string;
  /** 预算组织名称 */
  budgetOrganizationName?: string;
  budgetOrganizationNameAlias?: string;
  /** 项目名称 */
  projectName?: string;
  /** 计划类别 */
  planType?: any;
  /** 需求部门ID */
  requireDeptId?: string;
  requireDeptIdAlias?: string;
  /** 需求部门编码 */
  requireDeptCode?: string;
  /** 需求部门名称 */
  requireDeptName?: string;
  requireDeptNameAlias?: string;
  /** 项目金额（万元） */
  projectMoney?: string;
  /** 合同预计签订时间 */
  estContractSignDate?: any;
  estContractSignDateBegin?: any;
  estContractSignDateEnd?: any;
  /** 计划验收时间 */
  estAcceptanceDate?: any;
  estAcceptanceDateBegin?: any;
  estAcceptanceDateEnd?: any;
  /** 经办人ID */
  agentId?: string;
  agentIdAlias?: string;
  /** 经办人编码 */
  agentCode?: string;
  /** 经办人姓名 */
  agentName?: string;
  agentNameAlias?: string;
  /** 申请单号 */
  applyNo?: string;
  /** 合同编号 */
  contractNo?: string;
  /** 合同实际签订时间 */
  contractSignDate?: any;
  contractSignDateBegin?: any;
  contractSignDateEnd?: any;
  /** 实际完成时间（完成验收） */
  acceptanceDate?: any;
  acceptanceDateBegin?: any;
  acceptanceDateEnd?: any;
  /** 进度状态 */
  progressStatus?: any;
  /** 变更原因 */
  changeReason?: string;
  /** 备注 */
  note?: string;
}

/** 获取分页数据 */
export function listTpmYearMaintModifyPlanLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<TpmYearMaintModifyPlanLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

export function selectlistTpmYearMaintModifyPlanLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<TpmYearMaintModifyPlanLDto>> {
  return request.post(basePath + '/search-select-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmYearMaintModifyPlanL (id: string): Promise<ResponseBaseData<TpmYearMaintModifyPlanLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmYearMaintModifyPlanL (form: TpmYearMaintModifyPlanLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmYearMaintModifyPlanL (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



