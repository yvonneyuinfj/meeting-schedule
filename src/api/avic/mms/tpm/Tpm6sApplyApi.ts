import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpm6sapplys';
/** TPM_6S_APPLY */
export interface Tpm6sApplyDto extends BaseBeanModel {
  /** 立项编号 */
  billNo?: any;
  /** 立项单位 */
  editDeptName?: string;
  editDeptNameAlias?: string;
  /** 问题发现人 */
  problemFinderName?: string;
  problemFinderNameAlias?: string;
  /** ‘六源’问题立项 */
  projectCategory?: any;
  projectCategoryName?: string;
  /** 项目立项名称 */
  projectName?: string;
  /** 提出时间 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 计划完成时间 */
  planFinishDate?: any;
  planFinishDateBegin?: any;
  planFinishDateEnd?: any;
  /** 地点/位置 */
  location?: string;
  /** 密级 */
  secretLevel?: any;
  /** ‘六源’问题描述 */
  problemDescription?: string;
  /** ‘六源’问题改善建议 */
  problemAdvice?: string;
  /** 项目组长 */
  chargeUserName?: string;
  chargeUserNameAlias?: string;
  /** 团队成员 */
  teamUserName?: string;
  teamUserNameAlias?: string;
  /** 编制人ID */
  editUserId?: string;
  /** 项目组长ID */
  chargeUserId?: string;
  /** 立项单位ID */
  editDeptId?: string;
  /** 团队成员ID */
  teamUserId?: string;
  /** 编制人姓名 */
  editUserName?: string;
  editUserNameAlias?: string;
  /** 流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过 */
  billStatus?: string;
  billStatusName?: string;
  /** 问题发现人ID */
  problemFinderId?: string;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listTpm6sApplyByPage(param: QueryParamModel): Promise<ResponsePageData<Tpm6sApplyDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpm6sApply (id: string): Promise<ResponseBaseData<Tpm6sApplyDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpm6sApply (form: Tpm6sApplyDto): Promise<ResponseBaseData<any>> {
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
export function delTpm6sApply(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 提交审批数据 */
export function approval6sApply({
  processDefId,
  formCode,
  postData
}): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/start-create-process/v1', {
    processDefId,
    formCode,
    bean: postData
  });
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
