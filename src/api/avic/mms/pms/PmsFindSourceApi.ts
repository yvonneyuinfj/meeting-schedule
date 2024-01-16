import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/pms/pmsfindsources';
/** 采购寻源 */
export interface PmsFindSourceDto extends BaseBeanModel {
  /** 计划ID */
  pmsPlanId?: string;
  /** 采购任务编号 */
  pmsTaskNo?: string;
  /** 采购计划号 */
  reqPlanNo?: string;
  /** 采购计划名称 */
  reqPlanName?: string;
  /** 科研采购信息发布申请ID */
  pmsProcurementInformationReleaseApplicationId?: string;
  /** 采购方式 */
  pmsMethod?: string;
  pmsMethodName?: string;
  /** 采购价格 */
  pmsPrice?: string;
  pmsPriceName?: string;
  /** 确定供应商理由 */
  projectTopicNumber?: string;
  /** 候选供应商审查方式 */
  productReqClassify?: string;
  /** 经办人 */
  handlePersonId?: string;
  handlePersonIdAlias?: string;
  /** 经办人名称 */
  handlePersonName?: string;
  /** 密级 */
  secretLevel?: any;
  /** 经办人编码 */
  handlePersonCode?: string;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  pmsFindSourceVendorList?: [];
}

/** 获取分页数据 */
export function listPmsFindSourceByPage(param: QueryParamModel): Promise<ResponsePageData<PmsFindSourceDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsFindSource (id: string): Promise<ResponseBaseData<PmsFindSourceDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsFindSource (form: PmsFindSourceDto): Promise<ResponseBaseData<any>> {
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
export function delPmsFindSource(ids: [string]): Promise<ResponseBaseData<any>> {
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
