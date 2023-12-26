import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsvendoraccounts';
/** 供应商银行账户信息 */
export interface MdsVendorAccountDto extends BaseBeanModel {
  /** 供应商信息表主键ID */
  mdsVendorId?: string;
  /** 开户行 */
  bank?: string;
  /** 开户行名称 */
  bankName?: string;
  /** 银行帐号 */
  accountNo?: string;
  /** 账户名称 */
  accountName?: string;
  /** 账户性质 ^ SRM_ACCOUNT_ATTRIBUTE:1-基本存款账户,2-一般存款账户,3-临时存款账户,4-专用存款账户 */
  accountAttribute?: any;
  /** 开户行地址 */
  accountAddress?: string;
  /** 备注 */
  remark?: string;
  /** 编制人ID */
  editorUserId?: string;
  /** 编制人编码 ^ 员工编码 */
  editorUserCode?: string;
  /** 编制人姓名 */
  editorUserName?: string;
  /** 编制部门ID */
  editorDeptId?: string;
  /** 编制部门编码 */
  editorDeptCode?: string;
  /** 编制部门名称 */
  editorDeptName?: string;
  /** 编制时间 */
  editorDate?: any;
  editorDateBegin?: any;
  editorDateEnd?: any;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效 */
  validFlag?: any;
}

/** 获取分页数据 */
export function listMdsVendorAccountByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsVendorAccountDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsVendorAccount (id: string): Promise<ResponseBaseData<MdsVendorAccountDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsVendorAccount (form: MdsVendorAccountDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsVendorAccount (ids: [string]): Promise<ResponseBaseData<any>> {
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
