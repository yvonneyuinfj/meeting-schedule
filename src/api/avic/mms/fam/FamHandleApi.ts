import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/famhandles';
/** FAM_HANDLE */
export interface FamHandleDto extends BaseBeanModel {
  /** SECRET_LEVEL */
  secretLevel?: any;
  /** NOTE */
  note?: string;
  /** ATTRIBUTE_01 */
  attribute01?: string;
  /** ATTRIBUTE_02 */
  attribute02?: string;
  /** ATTRIBUTE_03 */
  attribute03?: string;
  /** ATTRIBUTE_04 */
  attribute04?: string;
  /** ATTRIBUTE_05 */
  attribute05?: string;
  /** ATTRIBUTE_06 */
  attribute06?: string;
  /** ATTRIBUTE_07 */
  attribute07?: string;
  /** ATTRIBUTE_08 */
  attribute08?: string;
  /** ATTRIBUTE_09 */
  attribute09?: string;
  /** ATTRIBUTE_10 */
  attribute10?: string;
  /** 申请单编号 */
  applyNo?: any;
  /** 是否科研用 */
  isUsedScientificrs?: any;
  /** 主管部门id */
  managerDeptId?: string;
  managerDeptIdAlias?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  /** 处置部门ID */
  handleDeptId?: string;
  handleDeptIdAlias?: string;
  /** 处置部门名称 */
  handleDeptName?: string;
  /** 处置理由 */
  handleReason?: string;
  /** 资产更新替换方案 */
  assetAlternateSolution?: string;
  /** 其他事项 */
  otherMatter?: string;
  /** 申请部门id */
  applyDeptId?: string;
  applyDeptIdAlias?: string;
  /** 申请部门名称 */
  applyDeptName?: string;
  /** 经办人id */
  handlePersonId?: string;
  handlePersonIdAlias?: string;
  /** 经办人名称 */
  handlePersonName?: string;
  /** 申请时间 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 申请文件号 */
  applicationDocumentNumber?: string;
  /** 批复文号 */
  approvalNumber?: string;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  famHandleListList?: [];
}

/** 获取分页数据 */
export function listFamHandleByPage(param: QueryParamModel): Promise<ResponsePageData<FamHandleDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamHandle (id: string): Promise<ResponseBaseData<FamHandleDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamHandle (form: FamHandleDto): Promise<ResponseBaseData<any>> {
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
export function delFamHandle(ids: [string]): Promise<ResponseBaseData<any>> {
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
