import request from '@/utils/request';
import type {BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel} from '@/api/model/baseModel';
import type {downloadParam} from '@/utils/download-util';
import {downloadSysFile} from '@/utils/download-util';

const basePath = '/mms/pms/pmscheckitems';

/** 检验项目定义表 */
export interface PmsCheckItemDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 检验项目类型 */
  checkItemType?: any;
  /** 检验项目名称 */
  checkItemName?: string;
  /** 检验项目代码 */
  checkItemCode?: string;
  /** 检验项目说明 */
  checkItemDesc?: string;
  /** 备注 */
  notes?: string;
  /** 状态 */
  ynEnable?: any;
  /** 启用时间 */
  enableDate?: any;
  enableDateBegin?: any;
  enableDateEnd?: any;
  /** 停用时间 */
  disableDate?: any;
  disableDateBegin?: any;
  disableDateEnd?: any;
  /** 检查方式【成品】 */
  checkMeans?: string;
  /** 操作方法【成品】 */
  checkOptions?: string;
  /** 合格判据1【成品】 */
  checkBasis1?: string;
  /** 合格判据2【成品】 */
  checkBasis2?: string;
  /** 合格判据3【成品】 */
  checkBasis3?: string;
  /** 合格判据4【成品】 */
  checkBasis4?: string;
  /** 合格判据5【成品】 */
  checkBasis5?: string;
}

/** 获取分页数据 */
export function listPmsCheckItemByPage(
  param: QueryParamModel
): Promise<ResponsePageData<PmsCheckItemDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsCheckItem(id: string): Promise<ResponseBaseData<PmsCheckItemDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsCheckItem(form: PmsCheckItemDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsCheckItem(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', {data: ids});
}

export function startPmsCheckItem(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/start', ids);
}

export function stopPmsCheckItem(ids: [string]): Promise<ResponseBaseData<any>> {
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
