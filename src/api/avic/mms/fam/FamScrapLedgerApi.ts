import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/fam/famscrapledgers';
/** FAM_SCRAP_LEDGER */
export interface FamScrapLedgerDto extends BaseBeanModel {
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
  classifiedMediaList?: string;
  /** 配件、附件工具清单 */
  attachmentToolList?: string;
  /** 报废原因 */
  scrapReason?: string;
  /** 处置类型 */
  handleType?: string;
  /** 主表ID */
  scrapId?: string;
  /** 使用年限 */
  lifeYear?: string;
  /** 累计折旧 */
  depreciationValue?: string;
  /** 品牌型号 */
  brandModel?: string;
  /** 建设项目 */
  buildProject?: string;
  /** 是否上会 */
  isAttend?: any;
  /** 所内决策商会决议文号 */
  documentNumber?: string;
  /** 所内决策上会日期 */
  meetingDate?: any;
  meetingDateBegin?: any;
  meetingDateEnd?: any;
  /** 是否已上报集团 */
  reportToGroup?: any;
  /** 上报集团日期 */
  reportingDate?: any;
  reportingDateBegin?: any;
  reportingDateEnd?: any;
  /** 上报集团文件号 */
  reportingFileNumber?: string;
  /** 集团是否已批复 */
  hasBeenApproved?: any;
  /** 集团批复文件 */
  groupApprovalDocuments?: string;
  /** 集团批复时间 */
  approvalTime?: any;
  approvalTimeBegin?: any;
  approvalTimeEnd?: any;
  /** 是否为军工关键设备 */
  isMilitaryIndustry?: any;
  /** 是否已上报科工局 */
  isIndustry?: any;
  /** 科工局是否已批复 */
  approvedOrNot?: any;
  /** 科工局批复文号 */
  isScienceIndustry?: string;
  /** 是否完成 */
  completedOrNot?: any;
  /** 处置收入凭证号 */
  disposalVoucherNumber?: string;
  /** 处置收入（元） */
  disposalIncome?: string;
  /** 备注 */
  notess?: string;
  /** 资产台账ID */
  inventoryId?: string;
}

/** 获取分页数据 */
export function listFamScrapLedgerByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamScrapLedgerDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamScrapLedger (id: string): Promise<ResponseBaseData<FamScrapLedgerDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamScrapLedger (form: FamScrapLedgerDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 保存批量录入批复文号 */
export function saveEnterFamScrapLedger (form: FamScrapLedgerDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/update-sensitiveList/v1', form);
}

/** 根据id集合删除数据 */
export function delFamScrapLedger (ids: [string]): Promise<ResponseBaseData<any>> {
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
