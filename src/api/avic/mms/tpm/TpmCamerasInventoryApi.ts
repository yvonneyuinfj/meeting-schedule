import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/tpm/tpmcamerasinventorys';
/** 摄像头台账表 */
export interface TpmCamerasInventoryDto extends BaseBeanModel {
  /** 设备台账ID */
  tpmInventoryId?: string;
  /** 摄像头编号 */
  camerasCode?: string;
  /** 摄像头位置 */
  storageLocation?: string;
  /** IP地址 */
  ipAddress?: string;
  /** 启用时间 */
  recordDate?: any;
  recordDateBegin?: any;
  recordDateEnd?: any;
  /** 设备状态 */
  equiomentStatus?: any;
  /** 关联电视机编号 */
  televisionCode?: string;
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
}

/** 获取分页数据 */
export function listTpmCamerasInventoryByPage (
  param: QueryParamModel
): Promise<ResponsePageData<TpmCamerasInventoryDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmCamerasInventory (id: string): Promise<ResponseBaseData<TpmCamerasInventoryDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmCamerasInventory (form: TpmCamerasInventoryDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmCamerasInventory (ids: [string]): Promise<ResponseBaseData<any>> {
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
