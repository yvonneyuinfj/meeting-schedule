import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/famoverhaulrequirelists';
/** 默认配置表 */
export interface FamOverhaulRequireListDto extends BaseBeanModel {
  /** 数据密级 */
  secretLevel?: any;
  /** 备注 */
  note?: string;
  /** ATTRIBUTE_01 */
  attribute01?: string;
  /** ATTRIBUTE_02 */
  attribute02?: string;
  /** ATTRIBUTE_03 */
  attribute03?: string;
  /** ATTRIBUTE_04 */
  attribute04?: string;
  /** ATTRIBUTE_05 */
  attribute05?: string;
  /** ATTRIBUTE_06 */
  attribute06?: string;
  /** ATTRIBUTE_07 */
  attribute07?: string;
  /** ATTRIBUTE_08 */
  attribute08?: string;
  /** ATTRIBUTE_09 */
  attribute09?: string;
  /** ATTRIBUTE_10 */
  attribute10?: string;
  /** 资产类别 */
  assetClass?: string;
  /** 资产编号 */
  assetNo?: string;
  /** 设备编号 */
  equipNo?: string;
  /** 资产名称 */
  assetName?: string;
  /** 资产规格 */
  assetSpec?: string;
  /** 资产型号 */
  assetModel?: string;
  /** 资产原值 */
  assetOriginalValue?: string;
  /** 主表id */
  overhaulRequireId?: string;
  /** 是否为进口设备 */
  importedOrNot?: string;
  importedOrNotName?: string;
}

/** 获取分页数据 */
export function listFamOverhaulRequireListByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamOverhaulRequireListDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamOverhaulRequireList (id: string): Promise<ResponseBaseData<FamOverhaulRequireListDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamOverhaulRequireList (form: FamOverhaulRequireListDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamOverhaulRequireList (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



