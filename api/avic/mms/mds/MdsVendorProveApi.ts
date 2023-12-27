import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsvendorproves';
/** 供应商资质信息 */
export interface MdsVendorProveDto extends BaseBeanModel {
  /** 供应商信息表主键ID */
  mdsVendorId?: string;
  /** 资质编号 */
  proveNo?: string;
  /** 资质名称 */
  proveName?: string;
  /** 资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证 */
  proveType?: any;
  /** 资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III */
  proveGrade?: any;
  /** 发证单位 */
  releaseDept?: string;
  /** 发证日期 */
  releaseDate?: any;
  releaseDateBegin?: any;
  releaseDateEnd?: any;
  /** 有效开始日期 */
  effectiveBenDate?: any;
  effectiveBenDateBegin?: any;
  effectiveBenDateEnd?: any;
  /** 有效结束日期 */
  effectiveEndDate?: any;
  effectiveEndDateBegin?: any;
  effectiveEndDateEnd?: any;
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
export function listMdsVendorProveByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsVendorProveDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsVendorProve (id: string): Promise<ResponseBaseData<MdsVendorProveDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsVendorProve (form: MdsVendorProveDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsVendorProve (ids: [string]): Promise<ResponseBaseData<any>> {
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
