import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmsprocurementrequirementss';
/** 采购要求表 */
export interface PmsProcurementRequirementsDto extends BaseBeanModel {
  /** 科研任务名称 */
  pmsPlanId?: string;
  /** 密级 */
  secretLevel?: any;
  /** 采购任务编号 */
  pmsTaskNo?: string;
  /** 采购计划号 */
  reqPlanNo?: string;
  /** 采购计划名称 */
  reqPlanName?: string;
  /** 采购方式 */
  procurementMethod?: string;
  procurementMethodName?: string;
  /** 单一来源原因 */
  singleSourceReason?: string;
  /** 项目要求 */
  projectRequirements?: string;
  /** 供应商要求 */
  supplierRequirements?: string;
  /** 其他要求 */
  otherRequirements?: string;
  /** 响应文件的编制要求 */
  preparationRequirements?: string;
  /** 响应文件的封装和递交要求 */
  packagingSubmissionRequirements?: string;
  /** 供应商中选标准 */
  supplierSelectionCriteria?: string;
  supplierSelectionCriteriaName?: string;
  /** 采购阶段 */
  procureStage?: any;
  /** 是否为加工类 */
  processingType?: any;
  /** 本次发布信息密级 */
  publishInformationSecurityLevel?: any;
  /** 本项采购任务密级 */
  procurementTaskClassification?: any;
  /** 产品和服务类别 */
  productServiceCategory?: string;
  /** 所属项目课题号 */
  projectTopicNumber?: string;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  pmsProcurementRequirementsLList?: [];
}

/** 获取分页数据 */
export function listPmsProcurementRequirementsByPage(param: QueryParamModel): Promise<ResponsePageData<PmsProcurementRequirementsDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsProcurementRequirements (id: string): Promise<ResponseBaseData<PmsProcurementRequirementsDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsProcurementRequirements (form: PmsProcurementRequirementsDto): Promise<ResponseBaseData<any>> {
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
export function delPmsProcurementRequirements(ids: [string]): Promise<ResponseBaseData<any>> {
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
