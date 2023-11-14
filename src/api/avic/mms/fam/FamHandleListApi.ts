import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/fam/famhandlelists';
/** FAM_HANDLE_LIST */
export interface FamHandleListDto extends BaseBeanModel {
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
  /** 涉密存储介质清单 */
  classifiedStorageMediaList?: string;
  /** 配件、附件工具清单 */
  attachmentToolList?: string;
  /** 报废原因 */
  scrapReason?: string;
  /** 处置类型 */
  handleType?: string;
  /** 处置状态 */
  handleStatus?: string;
  /** 主表ID */
  handleId?: string;
}

/** 获取分页数据 */
export function listFamHandleListByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamHandleListDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamHandleList (id: string): Promise<ResponseBaseData<FamHandleListDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamHandleList (form: FamHandleListDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamHandleList (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



