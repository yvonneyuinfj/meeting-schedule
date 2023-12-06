import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/fam/faminventorysubs';
/** FAM_INVENTORY_SUB */
export interface FamInventorySubDto extends BaseBeanModel {
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
  /** 单项工程名称 */
  singleProjectName?: string;
  /** 资产描述 */
  assetDescribe?: string;
  /** 资产类别 */
  assetClass?: string;
  /** 规格型号 */
  specModel?: string;
  /** 单位 */
  unit?: string;
  /** 面积 */
  area?: string;
  /** 购置价值 */
  acquisitionValue?: string;
  /** 主表ID */
  inventoryListId?: string;
}

/** 获取分页数据 */
export function listFamInventorySubByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamInventorySubDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInventorySub (id: string): Promise<ResponseBaseData<FamInventorySubDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInventorySub (form: FamInventorySubDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamInventorySub (ids: [string]): Promise<ResponseBaseData<any>> {
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
