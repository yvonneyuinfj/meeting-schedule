import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdscustomerls';
/** 客户信息定义子表 */
export interface MdsCustomerLDto extends BaseBeanModel {
  /** 客户定义表ID */
  mdsCustomerId?: string;
  /** 密级 */
  secretLevel?: any;
  /** 联系人 */
  linkman?: string;
  /** 电话 */
  tel?: string;
  /** 地址 */
  address?: string;
  /** 传真 */
  fax?: string;
  /** EMAIL */
  email?: string;
  /** 邮政编码 */
  postcode?: string;
  /** 电挂 */
  cableAddress?: string;
  /** 通讯地址 */
  communicationAddress?: string;
  /** 发货地址 */
  deliverAddress?: string;
  /** 有效标识 */
  validFlag?: any;
  /** 默认联系人 */
  ynDefaul?: any;
  /** 备注 */
  note?: string;
}

/** 获取分页数据 */
export function listMdsCustomerLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsCustomerLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsCustomerL (id: string): Promise<ResponseBaseData<MdsCustomerLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsCustomerL (form: MdsCustomerLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsCustomerL (ids: [string]): Promise<ResponseBaseData<any>> {
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
