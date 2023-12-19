import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdssubstitutionls';
/** 代料关系适用产品表 */
export interface MdsSubstitutionLDto extends BaseBeanModel {
  /** 代料关系表ID  */
  mdsSubstitutionId?: string;
  /** 产品ID */
  proItemId?: string;
  /** 产品编码 */
  proItemCode?: string;
  /** 产品名称 */
  proItemName?: string;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsSubstitutionLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsSubstitutionLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsSubstitutionL (id: string): Promise<ResponseBaseData<MdsSubstitutionLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsSubstitutionL (form: MdsSubstitutionLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsSubstitutionL (ids: [string]): Promise<ResponseBaseData<any>> {
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
