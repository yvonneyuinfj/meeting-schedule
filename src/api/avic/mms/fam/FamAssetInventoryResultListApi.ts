import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/famassetinventoryresultlists';
/** FAM_ASSET_INVENTORY_RESULT_LIST */
export interface FamAssetInventoryResultListDto extends BaseBeanModel {
  /** SECRET_LEVEL */
  secretLevel?: any;
  /** NOTE */
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
  /** 资产编码 */
  assetCode?: string;
  /** 资产名称 */
  assetName?: string;
  /** 资产密级 */
  assetSecretLevel?: string;
  /** 设备编号 */
  equipNo?: string;
  /** 资产型号 */
  assetModel?: string;
  /** 资产原值（元） */
  assetOriginalValue?: string;
  /** 购置时间 */
  purchaseTime?: any;
  purchaseTimeBegin?: any;
  purchaseTimeEnd?: any;
  /** 资产净值 */
  assetNetValue?: string;
  /** 出厂序列号 */
  factorySerialNumber?: string;
  /** 资产规格 */
  assetSpec?: string;
  /** 盘点数量 */
  inventoryNum?: string;
  /** 主表ID */
  inventoryResultId?: string;
  /** 盘点结果（正常/盘盈/盘亏） */
  inventoryResults?: any;
}

/** 获取分页数据 */
export function listFamAssetInventoryResultListByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamAssetInventoryResultListDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamAssetInventoryResultList (id: string): Promise<ResponseBaseData<FamAssetInventoryResultListDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAssetInventoryResultList (form: FamAssetInventoryResultListDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamAssetInventoryResultList (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



