import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmyearmaintmodifyplanalls';
/** 年度维修改造计划主表 */
export interface TpmYearMaintModifyPlanAllDto extends BaseBeanModel {
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
  /** 单据号，ND+年两位+两位流水 */
  billNo?: string;
  /** 计划年度 */
  applyYear?: string;
  /** 计划总数（项） */
  planTotalCount?: number;
  /** 填报人ID */
  editUserId?: string;
  editUserIdAlias?: string;
  /** 填报人姓名 */
  editUserName?: string;
  /** 填报日期 */
  editDate?: any;
  editDateBegin?: any;
  editDateEnd?: any;
  /** 填报人编码 */
  editUserCode?: string;
  /** 填报部门ID */
  editDeptId?: string;
  editDeptIdAlias?: string;
  /** 填报部门编码 */
  editDeptCode?: string;
  /** 填报部门名称 */
  editDeptName?: string;
  /** 流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过 */
  billStatus?: string;
  /** 计划编号，ND+四位年+三位流水 */
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
  budgetOrganizationNameAlias?: string;
  /** 项目名称 */
  projectName?: string;
  /** 计划类别，通用代码：TPM_PLAN_TYPE^1维修 2 保养 3 改造 */
  planType?: any;
  /** 需求部门ID */
  requireDeptId?: string;
  requireDeptIdAlias?: string;
  /** 需求部门编码 */
  requireDeptCode?: string;
  /** 需求部门名称 */
  requireDeptName?: string;
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
  progressStatus?: any;
  /** 变更原因 */
  changeReason?: string;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listTpmYearMaintModifyPlanAllByPage(param: QueryParamModel): Promise<ResponsePageData<TpmYearMaintModifyPlanAllDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmYearMaintModifyPlanAll (id: string): Promise<ResponseBaseData<TpmYearMaintModifyPlanAllDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmYearMaintModifyPlanAll (form: TpmYearMaintModifyPlanAllDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 保存并启动流程 */
export function saveFormAndStartProcess({
  processDefId,
  formCode,
  postData
}): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save-and-start-process/v1', {
    processDefId,
    formCode,
    bean: postData
  });
}

/** 根据id集合删除数据 */
export function delTpmYearMaintModifyPlanAll(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
