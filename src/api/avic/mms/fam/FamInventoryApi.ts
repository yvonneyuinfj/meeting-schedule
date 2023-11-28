import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/fam/faminventorys';
const assetsPath = '/mms/fam/famassettransfers'
const faminventorychangesPath = '/mms/fam/faminventorychanges'
const famoverhaulrequiresPath='/mms/fam/famoverhaulrequires'
const famassetlendsPath = '/mms/fam/famassetlends'
const famsealandunsealsPath = '/mms/fam/famsealandunseals'
const famassetborrowapplysPath = '/mms/fam/famassetborrowapplys'

/** FAM_INVENTORY */
export interface FamInventoryDto extends BaseBeanModel {
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
  /** 资产编号 */
  assetsCode?: string;
  /** 资产名称 */
  assetsName?: string;
  /** 资产类别名称 */
  assetClassName?: string;
  /** 资产来源 */
  assetSource?: string;
  /** 资产状态 */
  assetsStatus?: any;
  /** 资产用途 */
  assetsUse?: string;
  /** 入账日期 */
  entryDate?: string;
  /** 资产原值 */
  assetOriginalValue?: string;
  /** 累计折旧 */
  depreciationValue?: string;
  /** 折旧方法 */
  depreciationWay?: string;
  /** 资产数量 */
  assetNum?: string;
  /** 使用年限 */
  useTime?: string;
  /** 资产净值 */
  assetNetValue?: string;
  /** 月折旧额 */
  monDepreciation?: string;
  /** 存放地点 */
  storageLocation?: string;
  /** 部门名称 */
  deptName?: string;
  /** 主管部门id */
  managerDeptId?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  managerDeptNameAlias?: string;
  /** 责任人ID */
  responseUserId?: string;
  /** 责任人NAME */
  responseUserName?: string;
  responseUserNameAlias?: string;
  /** 入账时累计折旧 */
  firstDepreciationValue?: string;
  /** 已提月份 */
  monthProposed?: any;
  monthProposedBegin?: any;
  monthProposedEnd?: any;
  /** 品牌型号 */
  brandModel?: string;
  /** 购置日期 */
  purchaseDate?: any;
  purchaseDateBegin?: any;
  purchaseDateEnd?: any;
  /** 入账前当年折旧 */
  currentYearDepreciation?: string;
  /** 新增当月计提 */
  newaCurrentmProvision?: string;
  /** 其他 */
  other?: string;
  /** 重置凭证号 */
  resetVoucherNo?: string;
  /** 设备编号 */
  equipNo?: string;
  /** 出厂编号 */
  productionNo?: string;
  /** 凭证号 */
  voucherNo?: string;
  /** 厂商 */
  factoryOwner?: string;
  /** 建设项目 */
  buildProject?: string;
  /** 品牌 */
  brand?: string;
  /** 权属证号 */
  ownershipCertNo?: string;
  /** 采购合同号 */
  procureOrderNo?: string;
  /** 资产密级 */
  assetSecretLevel?: string;
  /** 是否军工关键设备 */
  ynMilitaryKeyEquip?: any;
  /** 接收部门ID */
  receiveDeptId?: string;
  /** 接收部门名称 */
  receiveDeptName?: string;
  receiveDeptNameAlias?: string;
  /** 资产类别 */
  assetClass?: string;
  /** 资金来源 */
  fundSource?: string;
  /** 项目名称 */
  projectName?: string;
  /** 经办人ID */
  handlePersonId?: string;
  /** 经办人名称 */
  handlePersonName?: string;
  handlePersonNameAlias?: string;
  /** 设备大类 */
  equipClass?: string;
  /** 资产规格 */
  assetSpec?: string;
  /** 资产型号 */
  assetModel?: string;
  /** 资产单价 */
  assetUnit?: string;
  /** 发票号 */
  invoiceNo?: string;
  /** 出厂日期 */
  productionDate?: any;
  productionDateBegin?: any;
  productionDateEnd?: any;
  /** 父资产编号 */
  parentAssetNo?: string;
  /** 是否为进口设备 */
  importedOrNot?: any;
  /** 资产分类 */
  assetType?: any;
  /** 质保期 */
  warrantyPeriod?: string;
}

/** 获取分页数据 */
export function listFamInventoryByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamInventoryDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInventory (id: string): Promise<ResponseBaseData<FamInventoryDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInventory (form: FamInventoryDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamInventory (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 资产调配信息列表 */
export function getFormList(selectId,id) {
  switch (selectId) {
    case 1:
      return request.get(faminventorychangesPath + '/getInventoryChange/'+id+'/v1')
    case 2:
      return request.get(famoverhaulrequiresPath + '/getInventoryChange/'+id+'/v1')
    case 3:
      return request.get(famassetlendsPath + '/getInventoryChange/'+id+'/v1')
    case 4:
      return request.get(assetsPath + '/getInventoryChange/'+id+'/v1')
    case 5:
      return request.get(famsealandunsealsPath + '/getInventoryChange/'+id+'/v1')
    case 6:
      return request.get(famassetborrowapplysPath + '/getInventoryChange/'+id+'/v1')
  }
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
