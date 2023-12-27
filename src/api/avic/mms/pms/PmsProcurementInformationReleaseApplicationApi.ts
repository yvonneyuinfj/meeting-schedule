import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/pms/pmsprocurementinformationreleaseapplications';
/** 科研采购信息发布申请表 */
export interface PmsProcurementInformationReleaseApplicationDto extends BaseBeanModel {
  /** 计划ID */
  pmsPlanId?: string;
  /** 采购任务编号 */
  pmsTaskNo?: string;
  /** 采购计划号 */
  reqPlanNo?: string;
  /** 采购计划名称 */
  reqPlanName?: string;
  /** 所属项目课题号 */
  projectTopicNumber?: string;
  /** 密级 */
  secretLevel?: any;
  /** 产品类型 */
  productType?: any;
  /** 产品需求分类 */
  productReqClassify?: any;
  /** 编制采购要求ID */
  pmsProcurementRequirementsId?: string;
  /** 产品和服务类别 */
  productServiceCategory?: any;
  /** 采购阶段 */
  procureStage?: any;
  /** 预算金额 */
  budgetAmount?: string;
  /** 军代表 */
  armyRepresentativeId?: string;
  armyRepresentativeIdAlias?: string;
  /** 需求文件归档编号 */
  requirementsDocumentArchivingCode?: string;
  /** 资质要求 */
  qualificationRequirements?: any;
  /** 发布单位 */
  publishingDept?: string;
  /** 所属大单位 */
  affiliatedLargeDept?: string;
  /** 电子邮箱 */
  email?: string;
  /** 专业领域 */
  professionalField?: any;
  /** 对接工作日 */
  dockingWorkdays?: any;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listPmsProcurementInformationReleaseApplicationByPage(param: QueryParamModel): Promise<ResponsePageData<PmsProcurementInformationReleaseApplicationDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsProcurementInformationReleaseApplication (id: string): Promise<ResponseBaseData<PmsProcurementInformationReleaseApplicationDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsProcurementInformationReleaseApplication (form: PmsProcurementInformationReleaseApplicationDto): Promise<ResponseBaseData<any>> {
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
export function delPmsProcurementInformationReleaseApplication(ids: [string]): Promise<ResponseBaseData<any>> {
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
