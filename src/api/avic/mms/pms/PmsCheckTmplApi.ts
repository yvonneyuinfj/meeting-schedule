import request from '@/utils/request';
import type {BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel} from '@/api/model/baseModel';
import type {downloadParam} from '@/utils/download-util';
import {downloadSysFile} from '@/utils/download-util';

const basePath = '/mms/pms/pmschecktmpls';

/** 检验模板表 */
export interface PmsCheckTmplDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 检验项目类型 */
  checkItemType?: any;
  /** 方案编号 */
  checkTmplCode?: string;
  /** 方案名称 */
  checkTmplName?: string;
  /** 方案说明 */
  checkTmplDesc?: string;
  /** 状态 */
  tmplStatus?: any;
  /** 启用时间 */
  enableDate?: any;
  enableDateBegin?: any;
  enableDateEnd?: any;
  /** 停用时间 */
  disableDate?: any;
  disableDateBegin?: any;
  disableDateEnd?: any;
  /** 备注 */
  notes?: string;
}

/** 获取分页数据 */
export function listPmsCheckTmplByPage(
  param: QueryParamModel
): Promise<ResponsePageData<PmsCheckTmplDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsCheckTmpl(id: string): Promise<ResponseBaseData<PmsCheckTmplDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsCheckTmpl(form: PmsCheckTmplDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsCheckTmpl(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', {data: ids});
}

/** 根据id集合启用数据 */
export function startPmsCheckTmpl(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/start', ids);
}

/** 根据id集合停用数据 */
export function stopPmsCheckTmpl(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/stop', ids);
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
