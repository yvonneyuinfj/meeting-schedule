import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmscheckbilllists';
/** 采购到货检验单明细表 */
export interface PmsCheckBillListDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 检验项目名称 */
  checkItemName?: string;
  /** 检验项目说明 */
  checkItemDesc?: string;
  /** 计划完成日期 */
  plnDate?: any;
  plnDateBegin?: any;
  plnDateEnd?: any;
  /** 检验结论  */
  checkResult?: any;
  /** 不合格品数量 */
  unqualifiedQty?: number;
  /** 合格品数量 */
  qualifiedQty?: number;
  /** 验收说明 */
  checkNotes?: string;
  /** 状态 */
  chkStatus?: any;
  /** 提交检验日期 */
  relDate?: any;
  relDateBegin?: any;
  relDateEnd?: any;
  /** 提交人 */
  relUserId?: string;
  relUserIdAlias?: string;
  /** 检验部门 */
  chkDeptId?: string;
  chkDeptIdAlias?: string;
  /** 检验人 */
  chkUserId?: string;
  chkUserIdAlias?: string;
  /** 检验日期 */
  checkDate?: any;
  checkDateBegin?: any;
  checkDateEnd?: any;
  /** 检验单ID */
  pmsCheckBillId?: string;
  /** 检验项目ID */
  pmsCheckItemId?: string;
  /** 检验项目代码 */
  checkItemCode?: string;
  /** 提交人代码 */
  relUserCode?: string;
  /** 提交人 */
  relUserName?: string;
  /** 检验部门名称 */
  chkDeptName?: string;
  /** 检验人代码 */
  chkUserCode?: string;
  /** 检验人名称 */
  chkUserName?: string;
  /** 检验部门代码 */
  chkDeptCode?: string;
  /** 检验损耗数量 ^ 消耗数量 */
  checkLossQty?: number;
  /** 检查方式【成品】 */
  checkMeans?: string;
  /** 操作方法【成品】 */
  checkOptions?: string;
  /** 合格判据1【成品】 */
  checkBasis1?: string;
  /** 合格判据1结论【成品】N不勾选，Y勾选 */
  checkBasis1Flag?: string;
  /** 合格判据2【成品】 */
  checkBasis2?: string;
  /** 合格判据2结论【成品】N不勾选，Y勾选 */
  checkBasis2Flag?: string;
  /** 合格判据3【成品】 */
  checkBasis3?: string;
  /** 合格判据3结论【成品】N不勾选，Y勾选 */
  checkBasis3Flag?: string;
  /** 合格判据4【成品】 */
  checkBasis4?: string;
  /** 合格判据4结论【成品】N不勾选，Y勾选 */
  checkBasis4Flag?: string;
  /** 合格判据5【成品】 */
  checkBasis5?: string;
  /** 合格判据5结论【成品】N不勾选，Y勾选 */
  checkBasis5Flag?: string;
}

/** 获取分页数据 */
export function listPmsCheckBillListByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsCheckBillListDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 保存表单数据 */
export function savePmsCheckBillList (form: [PmsCheckBillListDto]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsCheckBillList (ids: [string]): Promise<ResponseBaseData<any>> {
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
