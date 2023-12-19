import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsvendorlinkmans';
/** 供应商联系人信息 */
export interface MdsVendorLinkmanDto extends BaseBeanModel {
  /** 供应商信息表主键ID */
  mdsVendorId?: string;
  /** 联系人 */
  contactUser?: string;
  contactUserAlias?: string;
  /** 性别 */
  sex?: any;
  /** 岗位 */
  jobName?: string;
  jobNameAlias?: string;
  /** 职称 */
  positionName?: string;
  /** 所在部门 */
  contactDept?: string;
  contactDeptAlias?: string;
  /** 学历 */
  education?: string;
  /** 籍贯 */
  place?: string;
  /** 公司电话 */
  companyTel?: string;
  /** 个人电话 */
  userTel?: string;
  /** 传真 */
  fax?: string;
  /** EMAIL */
  email?: string;
  /** 发货地址 */
  sendAddress?: string;
  /** 编制人ID */
  editorUserId?: string;
  editorUserIdAlias?: string;
  /** 编制人编码 ^ 员工编码 */
  editorUserCode?: string;
  editorUserCodeAlias?: string;
  /** 编制人姓名 */
  editorUserName?: string;
  editorUserNameAlias?: string;
  /** 编制部门ID */
  editorDeptId?: string;
  editorDeptIdAlias?: string;
  /** 编制部门编码 */
  editorDeptCode?: string;
  editorDeptCodeAlias?: string;
  /** 编制部门名称 */
  editorDeptName?: string;
  editorDeptNameAlias?: string;
  /** 编制时间 */
  editorDate?: any;
  editorDateBegin?: any;
  editorDateEnd?: any;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsVendorLinkmanByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsVendorLinkmanDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsVendorLinkman (id: string): Promise<ResponseBaseData<MdsVendorLinkmanDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsVendorLinkman (form: MdsVendorLinkmanDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsVendorLinkman (ids: [string]): Promise<ResponseBaseData<any>> {
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
