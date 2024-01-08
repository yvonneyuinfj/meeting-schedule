import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/fam/faminvisiblescrapledgers';
/** 无形资产处置台账 */
export interface FamInvisibleScrapLedgerDto extends BaseBeanModel {
  /** 资产编号 */
  assetNo?: string;
  /** 资产名称 */
  assetName?: string;
  /** 原值 */
  factoryPrice?: string;
  /** 净值 */
  assetNetValue?: string;
  /** 购置时间 */
  purchaseTime?: any;
  purchaseTimeBegin?: any;
  purchaseTimeEnd?: any;
  /** 是否已经上报集团 */
  ynReportGroup?: string;
  ynReportGroupName?: string;
  /** 上报集团日期 */
  reportGroupDate?: any;
  reportGroupDateBegin?: any;
  reportGroupDateEnd?: any;
  /** 集团批复文件 */
  groupApprovalDoc?: string;
  /** 集团批复时间 */
  approvalTime?: any;
  approvalTimeBegin?: any;
  approvalTimeEnd?: any;
  /** 备注 */
  note?: string;
  /** 数据密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listFamInvisibleScrapLedgerByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamInvisibleScrapLedgerDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInvisibleScrapLedger (id: string): Promise<ResponseBaseData<FamInvisibleScrapLedgerDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInvisibleScrapLedger (form: FamInvisibleScrapLedgerDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamInvisibleScrapLedger (ids: [string]): Promise<ResponseBaseData<any>> {
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
