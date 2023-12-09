import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsprojectitems';
/** 项目对应产品关系表 */
export interface mdsProjectItemDto extends BaseBeanModel {
  /** 项目id */
  mdsProjectSimplifyId?: string;
  /** 产品id */
  mdsItemId?: string;
  /** 备注 */
  note?: string;
  /** 产品code */
  mdsItemCode?: string;
  /** 产品name */
  mdsItemName?: string;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsProjectItemByPage(
  param: QueryParamModel
): Promise<ResponsePageData<mdsProjectItemDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsProjectItem(id: string): Promise<ResponseBaseData<mdsProjectItemDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsProjectItem(form: mdsProjectItemDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsProjectItem(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
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
