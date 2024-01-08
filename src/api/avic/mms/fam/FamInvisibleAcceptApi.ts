import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/faminvisibleaccepts';
/** 无形资产验收 */
export interface FamInvisibleAcceptDto extends BaseBeanModel {
  /** 单据号 */
  billNo?: any;
  /** 合同编号 */
  contractNo?: string;
  /** 责任人 */
  persionLiable?: string;
  persionLiableAlias?: string;
  /** 主管部门 */
  managerDeptId?: string;
  managerDeptIdAlias?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  /** 使用部门 */
  useDeptId?: string;
  useDeptIdAlias?: string;
  /** 使用部门名称 */
  useDeptName?: string;
  /** 数据密级 */
  secretLevel?: any;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  famInvisibleAcceptLList?: [];
}

/** 获取分页数据 */
export function listFamInvisibleAcceptByPage(param: QueryParamModel): Promise<ResponsePageData<FamInvisibleAcceptDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInvisibleAccept (id: string): Promise<ResponseBaseData<FamInvisibleAcceptDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInvisibleAccept (form: FamInvisibleAcceptDto): Promise<ResponseBaseData<any>> {
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
export function delFamInvisibleAccept(ids: [string]): Promise<ResponseBaseData<any>> {
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
