import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/faminvisiblehandles';
/** 无形资产处置管理（主表） */
export interface FamInvisibleHandleDto extends BaseBeanModel {
  /** 单据号 */
  billNo?: any;
  /** 处置理由 */
  handelReason?: string;
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
  /** 经办人 */
  handlePersionId?: string;
  handlePersionIdAlias?: string;
  /** 经办人名称 */
  handlePersionName?: string;
  /** 数据密级 */
  secretLevel?: any;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  famInvisibleHandleLList?: [];
}

/** 获取分页数据 */
export function listFamInvisibleHandleByPage(param: QueryParamModel): Promise<ResponsePageData<FamInvisibleHandleDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInvisibleHandle (id: string): Promise<ResponseBaseData<FamInvisibleHandleDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInvisibleHandle (form: FamInvisibleHandleDto): Promise<ResponseBaseData<any>> {
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
export function delFamInvisibleHandle(ids: [string]): Promise<ResponseBaseData<any>> {
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
