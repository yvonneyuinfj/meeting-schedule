import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmstandards';

/** 设备标准主表 */
export interface TpmStandardDto extends BaseBeanModel {
  /** 设备台账ID */
  tpmInventoryId?: string;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 申请人ID */
  applyUserId?: string;
  applyUserIdAlias?: string;
  /** 申请人编号 */
  applyUserCode?: string;
  /** 申请人姓名 */
  applyUserName?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
  /** 预留字段 */
  attribute01?: string;
  /** 预留字段 */
  attribute02?: string;
  /** 预留字段 */
  attribute03?: string;
  /** 预留字段 */
  attribute04?: string;
  /** 预留字段 */
  attribute05?: string;
  /** 预留字段 */
  attribute06?: string;
  /** 预留字段 */
  attribute07?: string;
  /** 预留字段 */
  attribute08?: string;
  /** 预留字段 */
  attribute09?: string;
  /** 预留字段 */
  attribute10?: string;
  /** 设备编号 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 设备规格 */
  specs?: string;
  /** 设备型号 */
  model?: string;
  /** 设备大类 */
  className?: string;
  /** 出厂日期 */
  leaveFactoryDate?: any;
  /** 使用单位 */
  useDeptName?: string;
  /** 地理区域 */
  areaName?: string;
  /** 具体位置 */
  storageLocation?: string;
}

/** 获取分页数据 */
export function listTpmStandardByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmStandardDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmStandard(id: string): Promise<ResponseBaseData<TpmStandardDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmStandard(form: TpmStandardDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmStandard(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

export function saveTpmStandardByTpmInventoryIds(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save-by-ids/v1', { ids: ids });
}

/** 导出Excel */
export function exportExcel(param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
