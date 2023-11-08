import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/fam/demos';
/** 默认配置表 */
export interface DemoDto extends BaseBeanModel {
  /** 模块编码 */
  customedCode?: string;
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
  /** 自定义内容 */
  customedContent?: string;
  /** 应用ID */
  sysApplicationId?: string;
}

/** 获取分页数据 */
export function listDemoByPage (
  param: QueryParamModel
): Promise<ResponsePageData<DemoDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getDemo (id: string): Promise<ResponseBaseData<DemoDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveDemo (form: DemoDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delDemo (ids: [string]): Promise<ResponseBaseData<any>> {
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
