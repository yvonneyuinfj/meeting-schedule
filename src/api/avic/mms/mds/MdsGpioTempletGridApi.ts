import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsgpiotempletgrids';
/** 通用输出模板列表域管理 */
export interface MdsGpioTempletGridDto extends BaseBeanModel {
  /** 表格编号 */
  gridCode?: string;
  /** 表格名称 */
  gridName?: string;
  /** 表格描述 */
  gridDesc?: string;
  /** 排序号 */
  innerOrder?: number;
  /** 所属模板ID */
  mdsGpioTempletId?: string;
  /** 预留字段1 */
  attribute01?: string;
  /** 预留字段2 */
  attribute02?: string;
  /** 预留字段3 */
  attribute03?: string;
  /** 预留字段4 */
  attribute04?: string;
  /** 预留字段5 */
  attribute05?: string;
  /** 预留字段6 */
  attribute06?: string;
  /** 预留字段7 */
  attribute07?: string;
  /** 预留字段8 */
  attribute08?: string;
  /** 预留字段9 */
  attribute09?: string;
  /** 预留字段10 */
  attribute10?: string;
  /** 首行号（表格中首行数据所在行号） */
  firstRowNo?: number;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsGpioTempletGridByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsGpioTempletGridDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsGpioTempletGrid (id: string): Promise<ResponseBaseData<MdsGpioTempletGridDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsGpioTempletGrid (form: MdsGpioTempletGridDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsGpioTempletGrid (ids: [string]): Promise<ResponseBaseData<any>> {
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
