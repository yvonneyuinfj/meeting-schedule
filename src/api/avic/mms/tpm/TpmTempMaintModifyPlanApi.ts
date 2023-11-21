import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmtempmaintmodifyplans';

/** 临时维修改造计划表 */
export interface TpmTempMaintModifyPlanDto extends BaseBeanModel {
  /** 计划编号 */
  planNo?: string;
  /** 预算项目 */
  budgetItems?: string;
  /** 预算分项 */
  budgetBreakdownItems?: string;
  /** 预算组织ID */
  budgetOrganizationId?: string;
  budgetOrganizationIdAlias?: string;
  /** 预算组织编码 */
  budgetOrganizationCode?: string;
  /** 预算组织名称 */
  budgetOrganizationName?: string;
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
  /** 需求申请人ID */
  applyUserId?: string;
  applyUserIdAlias?: string;
  /** 需求申请人编码 */
  applyUserCode?: string;
  /** 需求申请人姓名 */
  applyUserName?: string;
  /** 联系电话 */
  applyUserTel?: string;
  /** 项目金额（万元） */
  projectMoney?: string;
  /** 课题号 */
  subjectNo?: string;
  /** 是否使用型号经费 */
  ynUseModelFunding?: any;
  /** 故障时间 */
  faultDate?: any;
  faultDateBegin?: any;
  faultDateEnd?: any;
  /** 申请理由 */
  applyReason?: string;
  /** 要求及建议 */
  repairContent?: string;
  /** 制单状态 */
  businessStatus?: any;
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
  /** 进度状态，通用代码TPM_PROGRESS_STATUS^ */
  progressStatus?: string;
  /** 退回原因 */
  returnReason?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
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
}

/** 获取分页数据 */
export function listTpmTempMaintModifyPlanByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmTempMaintModifyPlanDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 保存表单数据 */
export function saveTpmTempMaintModifyPlan(form: [TpmTempMaintModifyPlanDto]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmTempMaintModifyPlan(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

export function commitTpmTempMaintModifyPlan(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/commit-by-ids/v1', { ids: ids });
}

/** 导出Excel */
export function exportExcel(param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
