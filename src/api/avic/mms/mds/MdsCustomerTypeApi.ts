import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdscustomertypes';
/** 客户类型定义表 */
export interface MdsCustomerTypeDto extends BaseBeanModel {
  /** 类型编码 */
  typeCode?: string;
  /** 类型名称 */
  typeName?: string;
  /** 父类型ID */
  parentTypeId?: string;
  /** 显示顺序 */
  displayOrder?: number;
  /** 备注 */
  note?: string;
  /** 有效标识 */
  validFlag?: any;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsCustomerTypeByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsCustomerTypeDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsCustomerType (id: string): Promise<ResponseBaseData<MdsCustomerTypeDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsCustomerType (form: MdsCustomerTypeDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsCustomerType (ids: [string]): Promise<ResponseBaseData<any>> {
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
