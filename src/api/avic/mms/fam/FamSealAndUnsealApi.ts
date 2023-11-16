import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/famsealandunseals';
/** FAM_SEAL_AND_UNSEAL */
export interface FamSealAndUnsealDto extends BaseBeanModel {
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
  /** 标题 */
  title?: string;
  /** 封存类型 */
  sealingType?: string;
  /** 资产是否完好（是/否） */
  isAssetIntact?: any;
  /** 主管部门id */
  managerDeptId?: string;
  managerDeptIdAlias?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  /** 封存开始日期 */
  sealingStartDate?: any;
  sealingStartDateBegin?: any;
  sealingStartDateEnd?: any;
  /** 封存终止日期 */
  sealingEndDate?: any;
  sealingEndDateBegin?: any;
  sealingEndDateEnd?: any;
  /** 启封开始日期 */
  unsealStartDate?: any;
  unsealStartDateBegin?: any;
  unsealStartDateEnd?: any;
  /** 申请理由 */
  applyReason?: string;
  /** 其他事项 */
  otherMatter?: string;
  /** 封存规定执行情况 */
  sealingExecuteStatus?: string;
  /** 启封执行情况 */
  unsealExecuteStatus?: string;
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
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  famSealAndUnsealListList?: [];
}

/** 获取分页数据 */
export function listFamSealAndUnsealByPage(param: QueryParamModel): Promise<ResponsePageData<FamSealAndUnsealDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamSealAndUnseal (id: string): Promise<ResponseBaseData<FamSealAndUnsealDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamSealAndUnseal (form: FamSealAndUnsealDto): Promise<ResponseBaseData<any>> {
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
export function delFamSealAndUnseal(ids: [string]): Promise<ResponseBaseData<any>> {
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
