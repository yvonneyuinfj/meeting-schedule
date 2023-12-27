import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmsprocurementrequirementsls';
/** 采购要求子表 */
export interface PmsProcurementRequirementsLDto extends BaseBeanModel {
  /** 科研采购信息发布申请ID */
  pmsProcurementRequirementsId?: string;
  /** 维度 */
  dimensionality?: string;
  /** 权重 */
  weight?: string;
  /** 得分标准 */
  scoringCriteria?: string;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listPmsProcurementRequirementsLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsProcurementRequirementsLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsProcurementRequirementsL (id: string): Promise<ResponseBaseData<PmsProcurementRequirementsLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsProcurementRequirementsL (form: PmsProcurementRequirementsLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

export function saveSinglePmsProcurementRequirementsL (form: PmsProcurementRequirementsLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/saveObject/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsProcurementRequirementsL (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel (param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
