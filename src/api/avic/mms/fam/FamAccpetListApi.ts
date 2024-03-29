import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';

const basePath = '/mms/fam/famaccpetlists';
const uploadPath = 'appsys/common/uploader/downloadForPreview/v1/';

/** FAM_ACCPET_LIST */
export interface FamAccpetListDto extends BaseBeanModel {
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
  /** 资产验收申请主表ID */
  amAccpetId?: string;
  /** 是否新增资产 */
  isNewAsset?: any;
  /** 资产类别 */
  assetClass?: string;
  /** 资产编号 */
  assetNo?: string;
  /** 设备编号 */
  equipNo?: string;
  /** 设备大类 */
  equipClass?: string;
  /** 资产名称 */
  assetName?: string;
  /** 资产规格 */
  assetSpec?: string;
  /** 资产型号 */
  assetModel?: string;
  /** 资产单价 */
  assetUnit?: string;
  /** 资产数量 */
  assetNum?: string;
  /** 资产原值 */
  assetOriginalValue?: string;
  /** 安装地点 */
  installLocation?: string;
  /** 责任人 */
  liablePerson?: string;
  /** 生产商 */
  producer?: string;
  /** 出厂号 */
  factoryNo?: string;
  /** 品牌 */
  brand?: string;
  /** 采购合同 */
  procureOrder?: string;
  /** 发票号 */
  invoiceNo?: string;
  /** 权属证号 */
  ownershipCertNo?: string;
  /** 出厂日期 */
  productionDate?: any;
  productionDateBegin?: any;
  productionDateEnd?: any;
  /** 父资产编号 */
  parentAssetNo?: string;
  /** 质保期 */
  warrantyPeriod?: string;
  /** 是否为进口设备 */
  importedOrNot?: any;
}

/** 获取分页数据 */
export function listFamAccpetListByPage(
  param: QueryParamModel
): Promise<ResponsePageData<FamAccpetListDto>> {
  return request.post(basePath + '/search-by/v1', param);
}

/** 根据id加载数据 */
export function getFamAccpetList(id: string): Promise<ResponseBaseData<FamAccpetListDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAccpetList(form: FamAccpetListDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

export function previewImage(id: string, result: boolean): Promise<ResponseBaseData<any>> {
  return request.get(uploadPath + id + '/' + result);
}

/** 根据id集合删除数据 */
export function delFamAccpetList(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 根据设备大类获取设备编码 */
export function getEquipClassCode(equipClass: [string]): Promise<ResponseBaseData<any>> {
  return request.get(basePath + '/getEquipClassCode/' + equipClass + '/v1');
}
