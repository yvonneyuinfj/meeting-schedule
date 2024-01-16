import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/pms/pmsfindsourcevendors';
/** 采购寻源供应商 */
export interface PmsFindSourceVendorDto extends BaseBeanModel {
  /** 采购寻源ID */
  pmsFindSourceId?: string;
  /** 供应商名称 */
  mdsVendorId?: string;
  mdsVendorIdAlias?: string;
  /** 供应商名称 */
  mdsVendorName?: string;
  /** 是否所合格供应商 */
  isStandard?: any;
  /** 候选供应商关联关系 */
  isRelevance?: any;
  /** 是否符合要求 */
  isSatisfactory?: any;
  /** SECRET_LEVEL */
  secretLevel?: any;
  /** 报价（元） */
  quote?: string;
  /** 报价大写 */
  quoteCn?: string;
  /** 最终价格（元） */
  finalPrice?: string;
  /** 最终价格大写 */
  finalPriceCn?: string;
}

/** 获取分页数据 */
export function listPmsFindSourceVendorByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsFindSourceVendorDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsFindSourceVendor (id: string): Promise<ResponseBaseData<PmsFindSourceVendorDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsFindSourceVendor (form: PmsFindSourceVendorDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsFindSourceVendor (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



