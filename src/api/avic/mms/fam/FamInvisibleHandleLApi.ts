import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/faminvisiblehandlels';
/** 无形资产处置管理（子表） */
export interface FamInvisibleHandleLDto extends BaseBeanModel {
  /** 资产编号 */
  assetNo?: string;
  /** 资产名称 */
  assetName?: string;
  /** 原值 */
  factoryPrice?: string;
  /** 净值 */
  assetNetValue?: string;
  /** 购置时间 */
  purchaseTime?: any;
  purchaseTimeBegin?: any;
  purchaseTimeEnd?: any;
  /** 备注 */
  note?: string;
  /** 数据密级 */
  secretLevel?: any;
  /** 主表id */
  famInvisibleHandleId?: string;
}

/** 获取分页数据 */
export function listFamInvisibleHandleLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamInvisibleHandleLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInvisibleHandleL (id: string): Promise<ResponseBaseData<FamInvisibleHandleLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInvisibleHandleL (form: FamInvisibleHandleLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamInvisibleHandleL (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



