import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmyearmaintmodifyplans';
/** 年度维修改造计划主表 */
export interface TpmYearMaintModifyPlanDto extends BaseBeanModel {
  /** 预留字段 */
  attribute01?: string;
  /** 预留字段 */
  attribute02?: string;
  /** 预留字段 */
  attribute03?: string;
  /** 预留字段 */
  attribute04?: string;
  /** 预留字段 */
  attribute05?: string;
  /** 预留字段 */
  attribute06?: string;
  /** 预留字段 */
  attribute07?: string;
  /** 预留字段 */
  attribute08?: string;
  /** 预留字段 */
  attribute09?: string;
  /** 预留字段 */
  attribute10?: string;
  /** 单据号 */
  billNo?: any;
  /** 密级 */
  secretLevel?: any;
  /** 计划年度 */
  applyYear?: string;
  /** 计划总数（项） */
  planTotalCount?: number;
  /** 填报人ID */
  editUserId?: string;
  /** 填报人姓名 */
  editUserName?: string;
  editUserNameAlias?: string;
  /** 填报日期 */
  editDate?: any;
  editDateBegin?: any;
  editDateEnd?: any;
  /** 填报人编码 */
  editUserCode?: string;
  /** 填报部门ID */
  editDeptId?: string;
  /** 填报部门编码 */
  editDeptCode?: string;
  /** 填报部门名称 */
  editDeptName?: string;
  editDeptNameAlias?: string;
  /** 流程状态 */
  billStatus?: any;
  /** 备注 */
  note?: string;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  tpmYearMaintModifyPlanLList?: [];
}

/** 获取分页数据 */
export function listTpmYearMaintModifyPlanByPage(param: QueryParamModel): Promise<ResponsePageData<TpmYearMaintModifyPlanDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmYearMaintModifyPlan(id: string): Promise<ResponseBaseData<TpmYearMaintModifyPlanDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmYearMaintModifyPlan(form: TpmYearMaintModifyPlanDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 保存并启动流程 */
export function saveFormAndStartProcess({
  processDefId,
  formCode,
  postData
}): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save-and-start-process/v1', {
    processDefId,
    formCode,
    bean: postData
  });
}

/** 根据id集合删除数据 */
export function delTpmYearMaintModifyPlan(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
