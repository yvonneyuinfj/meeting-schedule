import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/faminvisiblenewlyadds';
/** 无形资产新增 */
export interface FamInvisibleNewlyAddDto extends BaseBeanModel {
  /** 无形资产名称 */
  invisibleAssetName?: string;
  /** 预算号 */
  budgetNum?: string;
  /** 预计单价（万元） */
  budgetUnitPrice?: number;
  /** 主管部门id */
  managerDeptId?: string;
  managerDeptIdAlias?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  /** 主管副所长 */
  managerLeaderId?: string;
  managerLeaderIdAlias?: string;
  /** 申请理由 */
  applyReasion?: string;
  /** 要求及建议 */
  reqAndAdvise?: string;
  /** 经办人id */
  handlePersionId?: string;
  handlePersionIdAlias?: string;
  /** 经办人名称 */
  handlePersionName?: string;
  /** 使用部门id */
  useDeptId?: string;
  useDeptIdAlias?: string;
  /** 使用部门名称 */
  useDeptName?: string;
  /** 数据密级 */
  secretLevel?: any;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listFamInvisibleNewlyAddByPage(param: QueryParamModel): Promise<ResponsePageData<FamInvisibleNewlyAddDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInvisibleNewlyAdd(id: string): Promise<ResponseBaseData<FamInvisibleNewlyAddDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInvisibleNewlyAdd(form: FamInvisibleNewlyAddDto): Promise<ResponseBaseData<any>> {
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
export function delFamInvisibleNewlyAdd(ids: [string]): Promise<ResponseBaseData<any>> {
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
