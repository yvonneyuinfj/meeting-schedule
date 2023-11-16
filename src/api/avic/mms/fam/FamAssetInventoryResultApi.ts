import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/famassetinventoryresults';
/** FAM_ASSET_INVENTORY_RESULT */
export interface FamAssetInventoryResultDto extends BaseBeanModel {
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
  /** 盘点编号 */
  inventoryNo?: any;
  /** 经办人id */
  handlePersonId?: string;
  handlePersonIdAlias?: string;
  /** 经办人名称 */
  handlePersonName?: string;
  /** 盘点部门ID */
  inventoryDeptId?: string;
  inventoryDeptIdAlias?: string;
  /** 盘点部门名称 */
  inventoryDeptName?: string;
  /** 盘点日期 */
  inventoryDate?: any;
  inventoryDateBegin?: any;
  inventoryDateEnd?: any;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  famAssetInventoryResultListList?: [];
}

/** 获取分页数据 */
export function listFamAssetInventoryResultByPage(param: QueryParamModel): Promise<ResponsePageData<FamAssetInventoryResultDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamAssetInventoryResult (id: string): Promise<ResponseBaseData<FamAssetInventoryResultDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAssetInventoryResult (form: FamAssetInventoryResultDto): Promise<ResponseBaseData<any>> {
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
export function delFamAssetInventoryResult(ids: [string]): Promise<ResponseBaseData<any>> {
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
