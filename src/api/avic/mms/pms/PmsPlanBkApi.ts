import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmsplanbks';
/** 采购计划表 */
export interface PmsPlanBkDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 采购任务编号 */
  pmsTaskNo?: any;
  /** 采购计划号 */
  reqPlanNo?: string;
  /** 采购计划名称 */
  reqPlanName?: string;
  /** 主责单位 */
  reqDeptId?: string;
  reqDeptIdAlias?: string;
  /** 设计员 */
  reqUserId?: string;
  reqUserIdAlias?: string;
  /** 采购负责人 */
  managerUserId?: string;
  managerUserIdAlias?: string;
  /** 对接人 */
  abutmentUserId?: string;
  abutmentUserIdAlias?: string;
  /** 产品和服务类别 */
  productServiceCategory?: string;
  /** 采购阶段 */
  procureStage?: string;
  /** 产品需求分类 */
  productReqClassify?: string;
  /** 产品类型 */
  productType?: string;
  /** 所属项目课题号 */
  projectTopicNumber?: string;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 预算金额 */
  budgetAmount?: string;
  /** 采购部门 */
  procureDeptId?: string;
  procureDeptIdAlias?: string;
  /** 采购主管 */
  procureUserId?: string;
  procureUserIdAlias?: string;
  /** 交付日期 */
  deliveryDate?: any;
  deliveryDateBegin?: any;
  deliveryDateEnd?: any;
  /** 拟寻源方式 */
  proposedSourcingMethod?: any;
  /** 指定供应商 */
  appointVendorId?: string;
  /** 技术文件完成日期 */
  techDocCompleteDate?: any;
  techDocCompleteDateBegin?: any;
  techDocCompleteDateEnd?: any;
  /** 需求接收ID */
  pmsRequireReceiveId?: string;
  /** 采购需求部门编码 */
  reqDeptCode?: string;
  /** 采购需求部门名称 */
  reqDeptName?: string;
  /** 需求人编码 */
  reqUserCode?: string;
  /** 需求人名称 */
  reqUserName?: string;
  /** 项目主管编码 */
  managerUserCode?: string;
  /** 项目主管名称 */
  managerUserName?: string;
  /** 采购部门编码 */
  procureDeptCode?: string;
  /** 采购部门名称 */
  procureDeptName?: string;
  /** 采购主管编码 */
  procureUserCode?: string;
  /** 采购主管名称 */
  procureUserName?: string;
  /** 指定供应商编码 */
  appointVendorCode?: string;
  /** 指定供应商名称 */
  appointVendorName?: string;
  /** 数量 */
  reqQty?: number;
  /** 图号 */
  drawingCode?: string;
  /** 物料ID */
  itemId?: string;
  /** 物料编码 */
  itemCode?: string;
  /** 物料名称 */
  itemName?: string;
  /** 用途 */
  pmsUseType?: string;
  /** 计划员ID */
  planUserId?: string;
  /** 计划员编码 */
  planUserCode?: string;
  /** 计划员名称 */
  planUserName?: string;
  /** 计划依据 */
  planBasis?: string;
  /** 型号规格 */
  modelSpec?: string;
  /** 物资等级 */
  materialLevel?: string;
  /** 计量单位 */
  meteringUnit?: string;
  /** 需求日期 */
  reqDate?: any;
  reqDateBegin?: any;
  reqDateEnd?: any;
  /** 单一来源原因 */
  singleSourceReason?: string;
  /** 申请原因 */
  applyReason?: string;
  /** 合并标识 */
  mergeFlag?: any;
  /** 对接人编码 */
  abutmentUserCode?: string;
  /** 对接人名称 */
  abutmentUserName?: string;
  /** 计划状态 */
  planStatus?: any;
  /** 备注 */
  note?: string;
  /** 计划合并后的ID */
  pmsPlanMergeId?: string;
}

/** 获取分页数据 */
export function listPmsPlanBkByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsPlanBkDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsPlanBk (id: string): Promise<ResponseBaseData<PmsPlanBkDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsPlanBk (form: PmsPlanBkDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsPlanBk (ids: [string]): Promise<ResponseBaseData<any>> {
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
