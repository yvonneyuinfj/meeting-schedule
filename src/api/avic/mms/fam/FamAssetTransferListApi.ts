import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/famassettransferlists';
/** FAM_ASSET_TRANSFER_LIST */
export interface FamAssetTransferListDto extends BaseBeanModel {
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
  /** 责任人ID */
  responseUserId?: string;
  responseUserIdAlias?: string;
  /** 责任人NAME */
  responseUserName?: string;
  /** 资产型号 */
  assetModel?: string;
  /** 资产是否完好 */
  isAssetIntact?: any;
  /** 资产原值（元） */
  assetOriginalValue?: string;
  /** 资产原值（元） */
  factorySerialNumber?: string;
  /** 资产规格 */
  assetSpec?: string;
  /** 技术资料清单 */
  technicalDataList?: string;
  /** 附件工具清单 */
  attachmentToolList?: string;
  /** 主表id */
  assetTransferId?: string;
}

/** 获取分页数据 */
export function listFamAssetTransferListByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamAssetTransferListDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamAssetTransferList (id: string): Promise<ResponseBaseData<FamAssetTransferListDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAssetTransferList (form: FamAssetTransferListDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamAssetTransferList (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



