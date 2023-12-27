import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/wms/wmsinvoutbillls';
/** 出库单子表 */
export interface WmsInvOutBillLDto extends BaseBeanModel {
  /** 申请单主表ID */
  wmsInvOutBillId?: string;
  /** 原始单据表ID */
  originalOrderDetailId?: string;
  /** 原始单据表名 */
  originalOrderTabName?: string;
  /** 物料ID */
  mdsItemId?: string;
  /** 台账ID */
  wmsItemInventoryId?: string;
  /** 质量编号 */
  qualityCode?: string;
  /** 供方合格证号 */
  supplyCertificationNo?: string;
  /** 炉号 */
  stoveNo?: string;
  /** 批号/批次 */
  batchNo?: string;
  /** 申请数量 */
  applyQty?: string;
  /** 出库数量 */
  outQty?: string;
  /** 出库登账人ID */
  outUserId?: string;
  outUserIdAlias?: string;
  /** 出库登账人编码 */
  outUserCode?: string;
  /** 出库登账人姓名 */
  outUserName?: string;
  /** 出库日期 */
  outDate?: any;
  outDateBegin?: any;
  outDateEnd?: any;
  /** 接收人ID */
  recieveUserId?: string;
  recieveUserIdAlias?: string;
  /** 接收人编码 */
  recieveUserCode?: string;
  /** 接收人姓名 */
  recieveUserName?: string;
  /** 接收日期 */
  recieveDate?: any;
  recieveDateBegin?: any;
  recieveDateEnd?: any;
  /** 拒绝原因 */
  refuseReason?: string;
  /** 备注、批料备注 */
  note?: string;
  /** 单据状态 */
  outBillLStatus?: string;
  /** 机型 */
  proMdsItemId?: string;
  /** 架次 */
  lotNo?: string;
  /** 父件ID */
  parentMdsItemId?: string;
  /** 计划价 */
  plannedPrice?: string;
  /** 派工号 */
  missionNo?: string;
  /** 供应商ID */
  srmVendorId?: string;
  /** 合格证ID */
  qcCertificationId?: string;
  /** 合格证号 */
  certificationNo?: string;
  /** 审批数量 */
  approveQty?: string;
  /** 审批日期 */
  approveDate?: any;
  approveDateBegin?: any;
  approveDateEnd?: any;
  /** 审批人ID */
  approveUserId?: string;
  approveUserIdAlias?: string;
  /** 审批人编码 */
  approveUserCode?: string;
  /** 审批人姓名 */
  approveUserName?: string;
  /** 紧急放行标识 */
  urgentReleaseFlag?: string;
  /** 紧急放行单号 */
  urgentReleaseNo?: string;
  /** 是否关闭  */
  ynClose?: any;
  /** 关闭数量 */
  closeQty?: string;
  /** 关闭日期 */
  closeDate?: any;
  closeDateBegin?: any;
  closeDateEnd?: any;
  /** 关闭人ID */
  closeUserId?: string;
  closeUserIdAlias?: string;
  /** 关闭人编码 */
  closeUserCode?: string;
  /** 关闭人姓名 */
  closeUserName?: string;
  /** 预留扩展字段 */
  item01?: string;
  /** 预留扩展字段 */
  item02?: string;
  /** 预留扩展字段 */
  item03?: string;
  /** 预留扩展字段 */
  item04?: string;
  /** 预留扩展字段 */
  item05?: string;
  /** 预留扩展字段 */
  item06?: string;
  /** 预留扩展字段 */
  item07?: string;
  /** 预留扩展字段 */
  item08?: string;
  /** 预留扩展字段 */
  item09?: string;
  /** 预留扩展字段 */
  item10?: string;
  /** 预留扩展字段 */
  item11?: string;
  /** 预留扩展字段 */
  item12?: string;
  /** 预留扩展字段 */
  item13?: string;
  /** 预留扩展字段 */
  item14?: string;
  /** 预留扩展字段 */
  item15?: string;
  /** 预留扩展字段 */
  item16?: string;
  /** 预留扩展字段 */
  item17?: string;
  /** 预留扩展字段 */
  item18?: string;
  /** 预留扩展字段 */
  item19?: string;
  /** 预留扩展字段 */
  item20?: string;
  /** 出库登账人所在部门ID */
  outDeptId?: string;
  outDeptIdAlias?: string;
  /** 出库登账人所在部门CODE */
  outDeptCode?: string;
  /** 出库登账人所在部门NAME */
  outDeptName?: string;
  /** 发票关联表ID【冗余字段】^用于是否关联发票 */
  pmsInvoiceAssonInvBillId?: string;
  /** 是否下料 */
  cuttingFlag?: any;
  /** 出库需求表ID */
  momOutRequireId?: string;
  /** 余料数量 */
  surplusQty?: string;
  /** 余料尺寸 */
  surplusSize?: string;
  /** 紧急程度/发放进度 */
  urgentLevel?: string;
  /** 开放人ID */
  planOpenUserId?: string;
  planOpenUserIdAlias?: string;
  /** 开放人CODE */
  planOpenUserCode?: string;
  /** 开放人NAME */
  planOpenUserName?: string;
  /** 开放时间 */
  planOpenDate?: any;
  planOpenDateBegin?: any;
  planOpenDateEnd?: any;
  /** 下料站点ID */
  siteId?: string;
  /** 下料站点CODE */
  siteCode?: string;
  /** 下料站点NAME */
  siteName?: string;
  /** 需求日期 */
  requireDate?: any;
  requireDateBegin?: any;
  requireDateEnd?: any;
  /** 密级 */
  secretLevel?: any;
  /** 计划类型 */
  planType?: string;
  /** 派工单号 */
  dispatchListNo?: string;
  /** 原申请物料id */
  originalItemId?: string;
  /** 代料/发放依据 */
  grantBasis?: string;
  /** 是否资源选择其它系统 */
  otherSysFlag?: any;
  /** 工艺路线 */
  workLine?: string;
  /** 是否上机标识 */
  ynInstallFlag?: any;
  /** 偏离单编号 */
  deflectionBillno?: string;
  /** 检斤数量 */
  checkKiloQty?: string;
}

/** 获取分页数据 */
export function listWmsInvOutBillLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<WmsInvOutBillLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getWmsInvOutBillL (id: string): Promise<ResponseBaseData<WmsInvOutBillLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsInvOutBillL (form: WmsInvOutBillLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delWmsInvOutBillL (ids: [string]): Promise<ResponseBaseData<any>> {
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
