import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/faminvisibleacceptls';
/** 无形资产验收（子表） */
export interface FamInvisibleAcceptLDto extends BaseBeanModel {
  /** 资产名称 */
  assetName?: string;
  /** 资产编号 */
  assetNo?: string;
  /** 使用权 */
  usufruct?: string;
  /** 所有权 */
  ownerShip?: string;
  /** 软件商名称 */
  softwareVendors?: string;
  /** 使用年限（10年） */
  useTime?: number;
  /** 是否授权 */
  ynAuthorization?: any;
  /** 实体 */
  entity?: string;
  /** 使用权编号 */
  usufructNo?: string;
  /** 出厂原价 */
  factoryPrice?: string;
  /** 数量（默认1） */
  num?: number;
  /** 数据密级 */
  secretLevel?: any;
  /** 主表id */
  famInvisibleAcceptId?: string;
}

/** 获取分页数据 */
export function listFamInvisibleAcceptLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamInvisibleAcceptLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInvisibleAcceptL (id: string): Promise<ResponseBaseData<FamInvisibleAcceptLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInvisibleAcceptL (form: FamInvisibleAcceptLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamInvisibleAcceptL (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



