import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/fam/famprojectmdrps';
/** 默认配置表 */
export interface FamProjectMdrpDto extends BaseBeanModel {
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
  /** 项目名称 */
  projectName?: string;
  /** 在研开始时间 */
  urStartTime?: any;
  urStartTimeBegin?: any;
  urStartTimeEnd?: any;
  /** 在研结束时间 */
  urEndTime?: any;
  urEndTimeBegin?: any;
  urEndTimeEnd?: any;
}

/** 获取分页数据 */
export function listFamProjectMdrpByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamProjectMdrpDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamProjectMdrp (id: string): Promise<ResponseBaseData<FamProjectMdrpDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamProjectMdrp (form: FamProjectMdrpDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamProjectMdrp (ids: [string]): Promise<ResponseBaseData<any>> {
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
