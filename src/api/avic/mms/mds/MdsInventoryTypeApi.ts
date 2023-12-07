import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsinventorytypes';
/** 库房类型定义表 */
export interface MdsInventoryTypeDto extends BaseBeanModel {
  /** 库房类型代码  */
  invTypeCode?: string;
  /** 库房类型描述  */
  invTypeDesc?: string;
  /** 是否有效 */
  validFlag?: any;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsInventoryTypeByPage(
  param: QueryParamModel
): Promise<ResponsePageData<MdsInventoryTypeDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsInventoryType(id: string): Promise<ResponseBaseData<MdsInventoryTypeDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsInventoryType(form: MdsInventoryTypeDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsInventoryType(ids: [string]): Promise<ResponseBaseData<any>> {
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

/**获取项目类型 */
export function getMdsInventoryTypeAll(
  param: QueryParamModel
): Promise<ResponsePageData<MdsInventoryTypeDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}