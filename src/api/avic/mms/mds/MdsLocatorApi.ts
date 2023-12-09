import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdslocators';
/** 库位定义表 */
export interface MdsLocatorDto extends BaseBeanModel {
  /** 库房ID ^ */
  mdsInventoryId?: string;
  /** 库位号 ^ 有层架位的代码规则 */
  locatorNo?: string;
  /** 库位类型 ^ 0-常规库位；1-灵活库位 */
  locatorType?: any;
  /** 库位尺寸 ^ 描述长宽高 */
  locatorSize?: string;
  /** 库位描述 */
  locatorDesc?: string;
  /** 物料ID ^ */
  mdsItemId?: string;
  /** 区域类型 ^ 新增字段,表示对应实际库房的区、排、架、层、位 */
  placeType?: any;
  /** 父库位ID ^ 用于树型库位 */
  parentMdsLocatorId?: string;
  /** 备注 ^ 如干燥条件等 */
  note?: string;
  /** 库位是否有效 ^ 0-无效；1-有效 */
  validFlag?: any;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsLocatorByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsLocatorDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsLocator (id: string): Promise<ResponseBaseData<MdsLocatorDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsLocator (form: MdsLocatorDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsLocator (ids: [string]): Promise<ResponseBaseData<any>> {
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
