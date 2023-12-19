import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdssubstitutions';
/** 代料关系表 */
export interface MdsSubstitutionDto extends BaseBeanModel {
  /** 单号 */
  substitutionNo?: string;
  /** 类型  ^0-长期代料，1-临时代料 */
  billType?: any;
  /** 代料关系分类 ^ G-代料单，E-等效代料，S-规格代料 */
  substitutionType?: any;
  /** 被替代物料ID ^ 等效代料时可以为空 */
  originalItemId?: string;
  /** 替代物料ID */
  substitutionItemId?: string;
  /** 生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制 */
  effectiveType?: any;
  /** 生效起始架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的起始参数。 */
  effectiveStrPara?: string;
  /** 生效截止架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的截止参数。 */
  effectiveEndPara?: string;
  /** 代料系数 ^ 同一制成品在使用替代后物料的单耗用量与使用替代前物料的单耗用量的比率，即替代后物料的单耗用量/替代前物料的单耗用量 */
  substitutionRate?: string;
  /** 订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回 */
  status?: any;
  /** 是否有效 ^ 0-无效；1-有效 */
  validFlag?: any;
  /** 申请人的ID */
  applyUserId?: string;
  /** 员工编码 */
  applyUserCode?: string;
  /** 申请人姓名 */
  applyUserName?: string;
  /** 申请部门ID */
  applyDeptId?: string;
  /** 申请部门编码 */
  applyDeptCode?: string;
  /** 申请部门名称 */
  applyDeptName?: string;
  /** 申请时间 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 备注 */
  note?: string;
  /** 代料依据 */
  substitutionBasis?: string;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 子表集合 */
  mdsSubstitutionLList?: [];
}

/** 获取分页数据 */
export function listMdsSubstitutionByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsSubstitutionDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsSubstitution (id: string): Promise<ResponseBaseData<MdsSubstitutionDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsSubstitution (form: MdsSubstitutionDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsSubstitution (ids: [string]): Promise<ResponseBaseData<any>> {
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
