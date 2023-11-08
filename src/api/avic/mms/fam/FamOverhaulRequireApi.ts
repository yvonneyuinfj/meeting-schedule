import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/famoverhaulrequires';
/** 默认配置表 */
export interface FamOverhaulRequireDto extends BaseBeanModel {
  /** 数据密级 */
  secretLevel?: any;
  /** 备注 */
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
  /** 单据号 */
  billNo?: string;
  /** 维修计划 */
  maintPlan?: string;
  /** 维修类别 */
  maintCategory?: any;
  /** 需求时间 */
  expectMaintTime?: any;
  expectMaintTimeBegin?: any;
  expectMaintTimeEnd?: any;
  /** 主管部门id */
  managerDeptId?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  managerDeptNameAlias?: string;
  /** 是否使用型号经费 */
  isUsedScientificrs?: any;
  /** 预算项目 */
  budgetProject?: string;
  /** 预算分项 */
  budgetSubitem?: string;
  /** 预算组织 */
  budgetOrg?: string;
  /** 年度/临时 */
  annualProvisional?: string;
  annualProvisionalName?: string;
  /** 课题号 */
  projectNumber?: string;
  /** 项目金额（万元） */
  projectAmount?: number;
  /** 是否需要评审 */
  isNeedReview?: any;
  /** 申请理由 */
  applyReason?: string;
  /** 要求及建议 */
  reqSuggest?: string;
  /** 申请部门id */
  applyDeptId?: string;
  /** 申请部门名称 */
  applyDeptName?: string;
  applyDeptNameAlias?: string;
  /** 需求申请人id */
  handlePersonId?: string;
  /** 需求申请人名称 */
  handlePersonName?: string;
  handlePersonNameAlias?: string;
  /** 故障时间 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 联系电话 */
  telephone?: string;
  /** 附件 */
  annex?: string;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  famOverhaulRequireListList?: [];
}

/** 获取分页数据 */
export function listFamOverhaulRequireByPage(param: QueryParamModel): Promise<ResponsePageData<FamOverhaulRequireDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamOverhaulRequire (id: string): Promise<ResponseBaseData<FamOverhaulRequireDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamOverhaulRequire (form: FamOverhaulRequireDto): Promise<ResponseBaseData<any>> {
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
export function delFamOverhaulRequire(ids: [string]): Promise<ResponseBaseData<any>> {
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
