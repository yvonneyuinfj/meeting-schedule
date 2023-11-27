import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/faminventorychangelistbatchs';
/** FAM_INVENTORY_CHANGE_LIST_BATCH */
export interface FamInventoryChangeListBatchDto extends BaseBeanModel {
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
  /** 主表id */
  inventoryChangeBatchId?: string;
  /** 资产台账表ID */
  inventoryId?: string;
  /** 资产变更表ID */
  inventoryChangeId?: string;
  /** 资产原值 */
  assetOriginalValue?: string;
}

/** 获取分页数据 */
export function listFamInventoryChangeListBatchByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamInventoryChangeListBatchDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInventoryChangeListBatch (id: string): Promise<ResponseBaseData<FamInventoryChangeListBatchDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInventoryChangeListBatch (form: FamInventoryChangeListBatchDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamInventoryChangeListBatch (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



