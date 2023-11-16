import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/famassetlendlists';
/** FAM_ASSET_LEND_LIST */
export interface FamAssetLendListDto extends BaseBeanModel {
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
  /** 资产编码 */
  assetName?: string;
  /** 资产密级 */
  assetSecretLevel?: string;
  /** 责任人ID */
  responseUserId?: string;
  responseUserIdAlias?: string;
  /** 责任人名称 */
  responseUserName?: string;
  /** 主管部门名称id */
  managerDeptId?: string;
  managerDeptIdAlias?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  /** 资产型号 */
  assetModel?: string;
  /** 资产是否完好 */
  isAssetIntact?: string;
  /** 资产原值（元） */
  assetOriginalValue?: string;
  /** 出厂序列号 */
  factorySerialNumber?: string;
  /** 出厂序列号 */
  assetSpec?: string;
  /** 资产数量 */
  assetNum?: string;
  /** 租赁状态 */
  leaseStatus?: string;
  /** 主表id */
  assetLendId?: string;
}

/** 获取分页数据 */
export function listFamAssetLendListByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamAssetLendListDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamAssetLendList (id: string): Promise<ResponseBaseData<FamAssetLendListDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAssetLendList (form: FamAssetLendListDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamAssetLendList (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



