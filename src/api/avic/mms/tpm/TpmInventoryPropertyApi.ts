import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/tpm/tpminventorypropertys';
/** 设备台账属性扩展表 */
export interface TpmInventoryPropertyDto extends BaseBeanModel {
  /** 设备台账表id */
  tpmInventoryId?: string;
  /** 序号 */
  serialNo?: string;
  /** 属性名称 */
  propertyName?: string;
  /** 属性内容 */
  propertyContent?: string;
  /** 数据密级 */
  secretLevel?: any;
  /** 备注 */
  note?: string;
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
export function listTpmInventoryPropertyByPage (
  param: QueryParamModel
): Promise<ResponsePageData<TpmInventoryPropertyDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmInventoryProperty (id: string): Promise<ResponseBaseData<TpmInventoryPropertyDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmInventoryProperty (form: TpmInventoryPropertyDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmInventoryProperty (ids: [string]): Promise<ResponseBaseData<any>> {
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
