import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmmaintplanrelease';

/** 保养计划表 */
export interface TpmMaintPlanDto extends BaseBeanModel {
  /** 设备标准主表ID */
  tpmStandardId?: string;
  /** TPM_STANDARD_MAINTENANCE_ID */
  tpmStandardMaintenanceId?: string;
  /** 设备台账ID */
  tpmInventoryId?: string;
  /** 保养周期(月) */
  maintenanceCycle?: number;
  /** 编制日期 */
  editDate?: any;
  editDateBegin?: any;
  editDateEnd?: any;
  /** 计划保养日期 */
  planMaintenanceDate?: any;
  planMaintenanceDateBegin?: any;
  planMaintenanceDateEnd?: any;
  /** 保养状态 */
  maintenanceStatus?: any;
  /** 保养完成日期 */
  maintenanceFinishDate?: any;
  maintenanceFinishDateBegin?: any;
  maintenanceFinishDateEnd?: any;
  /** 保养负责人ID */
  maintUserId?: string;
  maintUserIdAlias?: string;
  /** 保养负责人编码 */
  maintUserCode?: string;
  /** 保养负责人姓名 */
  maintUserName?: string;
  /** 实际保养人ID */
  actrualMaintUserId?: string;
  actrualMaintUserIdAlias?: string;
  /** 实际保养人编码 */
  actrualMaintUserCode?: string;
  /** 实际保养人姓名 */
  actrualMaintUserName?: string;
  /** 下达日期 */
  dispatchDate?: any;
  dispatchDateBegin?: any;
  dispatchDateEnd?: any;
  /** 下达人ID */
  dispatchUserId?: string;
  dispatchUserIdAlias?: string;
  /** 下达人编码 */
  dispatchUserCode?: string;
  /** 下达人姓名 */
  dispatchUserName?: string;
  /** 完好标识 */
  goodConditionFlag?: any;
  /** 保养计划流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过 */
  billStatus?: string;
  /** 保养反馈流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过 */
  feedbackBillStatus?: string;
  /** 最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值） */
  oldLastMaintenPlanDate?: any;
  oldLastMaintenPlanDateBegin?: any;
  oldLastMaintenPlanDateEnd?: any;
  /** 计划编号 */
  billNo?: string;
  /** 保养计划类型 */
  maintenPlanType?: any;
  /** 驳回原因 */
  backReason?: string;
  /** 完工日期 */
  completeDate?: any;
  completeDateBegin?: any;
  completeDateEnd?: any;
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
  /** 外委专业厂家ID */
  vendorId?: string;
  /** 外委专业厂家编码 */
  vendorCode?: string;
  /** 外委专业厂家名称 */
  vendorName?: string;
  /** 保养结论 */
  maintConclusion?: any;
  /** 问题说明 */
  problemDescription?: string;
  /** 保养部位 */
  maintenancePosition?: string;
  /** 保养项目 */
  maintenanceItems?: string;
  /** 保养依据 */
  maintenanceBasis?: string;
  /** 保养内容 */
  maintenanceContent?: string;
  /** 保养要求 */
  maintenanceRequirement?: string;
  /** 小时数 */
  maintenanceHours?: number;
  /** 是否自主维护 */
  ynSelfMaintenance?: string;
}

/** 获取分页数据 */
export function listTpmMaintPlanByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmMaintPlanDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 保存表单数据 */
export function saveTpmMaintPlan(form: [TpmMaintPlanDto]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmMaintPlan(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
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

export function releaseTpmMaintPlan(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/release-by-ids/v1', { ids: ids });
}
