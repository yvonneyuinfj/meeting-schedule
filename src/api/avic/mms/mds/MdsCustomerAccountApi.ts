import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdscustomeraccounts';
/** 客户银行账户信息表 */
export interface MdsCustomerAccountDto extends BaseBeanModel {
  /** 客户ID */
  mdsCustomerId?: string;
  /** 密级 */
  secretLevel?: any;
  /** 纳税登记号 */
  taxRegNo?: string;
  /** 开户行 */
  bank?: string;
  /** 开户行名称 */
  bankName?: string;
  /** 银行帐号 */
  accountNo?: string;
  /** 账户名称 */
  accountName?: string;
  /** 账户性质 */
  accountAttribute?: any;
  /** 开户行地址 */
  accountAddress?: string;
  /** 默认账户 */
  ynDefaul?: any;
  /** 备注 */
  note?: string;
}

/** 获取分页数据 */
export function listMdsCustomerAccountByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsCustomerAccountDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsCustomerAccount (id: string): Promise<ResponseBaseData<MdsCustomerAccountDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsCustomerAccount (form: MdsCustomerAccountDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsCustomerAccount (ids: [string]): Promise<ResponseBaseData<any>> {
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
