import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmschecktmplls';
/** 质检方案明细表（检验模板明细） */
export interface PmsCheckTmplLDto extends BaseBeanModel {
  /** 质检方案ID */
  pmsCheckTmplId?: string;
  /** 密级 */
  secretLevel?: any;
  /** 检验项目 */
  pmsCheckItemId?: string;
  pmsCheckItemIdAlias?: string;
  /** 检验人 */
  chkUserId?: string;
  chkUserIdAlias?: string;
  /** 检验部门 */
  chkDeptId?: string;
  chkDeptIdAlias?: string;
  /** 检验标准 */
  checkLevel?: string;
  /** 是否关键项目 */
  isKeyItem?: any;
  /** 备注 */
  remark?: string;
  /** 检验部门代码 */
  chkDeptCode?: string;
  /** 检验部门名称 */
  chkDeptName?: string;
  /** 检验人代码 */
  chkUserCode?: string;
  /** 检验人名称 */
  chkUserName?: string;
}

/** 获取分页数据 */
export function listPmsCheckTmplLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsCheckTmplLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsCheckTmplL (id: string): Promise<ResponseBaseData<PmsCheckTmplLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsCheckTmplL (form: PmsCheckTmplLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsCheckTmplL (ids: [string]): Promise<ResponseBaseData<any>> {
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
