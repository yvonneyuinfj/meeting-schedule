import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsunits';
/** 计量单位 */
export interface MdsUnitDto extends BaseBeanModel {
  /** 计量单位代码 如Cm,Km */
  unitCode?: string;
  /** 计量单位说明 例如厘米，毫米 */
  unitDesc?: string;
  /** 计量单位大类，通用代码：0-长度；1-宽度 */
  unitClass?: any;
  /** 有效标识 1-有效；0-无效，默认为1 */
  validFlag?: any;
  /** 密级  */
  secretLevel?: any;
  /** 对应主数据计量单位字典类别。basic(基本计量单位)，他类物资计量单位(other) */
  mdmType?: string;
}

/** 获取分页数据 */
export function listMdsUnitByPage(
  param: QueryParamModel
): Promise<ResponsePageData<MdsUnitDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsUnit(id: string): Promise<ResponseBaseData<MdsUnitDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsUnit(form: MdsUnitDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsUnit(ids: [string]): Promise<ResponseBaseData<any>> {
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
