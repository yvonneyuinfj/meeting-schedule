import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsprojects';
/** MDS_PROJECT */
export interface MdsProjectDto extends BaseBeanModel {
  /** 项目编号 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /** 项目描述 */
  projectDesc?: string;
  /** 项目等级 */
  projectGrade?: any;
  /** 项目密级 */
  projectSecretClass?: any;
  /** 项目状态 */
  projectStatus?: any;
  /** 立项日期 */
  projectApprovalDate?: any;
  projectApprovalDateBegin?: any;
  projectApprovalDateEnd?: any;
  /** 项目经理ID */
  projectManagerId?: string;
  projectManagerIdAlias?: string;
  /** 项目经理CODE */
  projectManagerCode?: string;
  /** 项目经理NAME */
  projectManagerName?: string;
  /** 责任部门ID */
  responsibleDeptId?: string;
  responsibleDeptIdAlias?: string;
  /** 责任部门CODE */
  responsibleDeptCode?: string;
  /** 责任部门NAME */
  responsibleDeptName?: string;
  /** 项目负责人 */
  projectResponsiblePerson?: string;
  projectResponsiblePersonAlias?: string;
  /** 工期(天) */
  projectDuration?: string;
  /** 项目计划开始时间 */
  planStartDate?: any;
  planStartDateBegin?: any;
  planStartDateEnd?: any;
  /** 项目计划结束时间 */
  planEndDate?: any;
  planEndDateBegin?: any;
  planEndDateEnd?: any;
  /** 项目实际开始时间 */
  actualStartDate?: any;
  actualStartDateBegin?: any;
  actualStartDateEnd?: any;
  /** 项目实际结束时间 */
  actualEndDate?: any;
  actualEndDateBegin?: any;
  actualEndDateEnd?: any;
  /** 币种 */
  currencyType?: any;
  /** 上级项目ID */
  parentMdsProjectId?: string;
  /** 是否实物生产 */
  ynProduction?: any;
  /** 项目所属行业 */
  industryType?: any;
  /** 所属业务域 */
  businessArea?: any;
  /** 客户类型 */
  mdsCustomerTypeId?: string;
  /** 客户ID */
  mdsCustomerId?: string;
  mdsCustomerIdAlias?: string;
  /** 申请人 */
  applyUserId?: string;
  applyUserIdAlias?: string;
  /** 申请人编码 */
  applyUserCode?: string;
  /** 申请人名称 */
  applyUserName?: string;
  /** 申请部门 */
  applyedDeptId?: string;
  applyedDeptIdAlias?: string;
  /** 申请部门编码 */
  applyedDeptCode?: string;
  /** 申请部门名称 */
  applyedDeptName?: string;
  /** 是否按项目号平衡 */
  balanceFlag?: any;
  /** 产品ID */
  proMdsItemId?: string;
  /** 有效标识 */
  validFlag?: any;
  /** 备注 */
  remark?: string;
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
  /** 项目类型 */
  projectType?: any;
  /** 应用类型 */
  applicationType?: any;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 协作部门ID */
  cooperationDeptId?: string;
  cooperationDeptIdAlias?: string;
  /** 协作部门CODE */
  cooperationDeptCode?: string;
  /** 协作部门NAME */
  cooperationDeptName?: string;
  /** 密级  */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsProjectByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsProjectDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsProject (id: string): Promise<ResponseBaseData<MdsProjectDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsProject (form: MdsProjectDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsProject (ids: [string]): Promise<ResponseBaseData<any>> {
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
