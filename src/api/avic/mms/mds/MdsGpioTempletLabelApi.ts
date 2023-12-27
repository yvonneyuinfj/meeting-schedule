import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsgpiotempletlabels';
/** 通用输出模板标签域管理 */
export interface MdsGpioTempletLabelDto extends BaseBeanModel {
  /** 标签名称 */
  lableName?: string;
  /** 字段名称 */
  fieldName?: string;
  /** 字段说明 */
  fieldDesc?: string;
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
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsGpioTempletLabelByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsGpioTempletLabelDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsGpioTempletLabel (id: string): Promise<ResponseBaseData<MdsGpioTempletLabelDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsGpioTempletLabel (form: MdsGpioTempletLabelDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsGpioTempletLabel (ids: [string]): Promise<ResponseBaseData<any>> {
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
