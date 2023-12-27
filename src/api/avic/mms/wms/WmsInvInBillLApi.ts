import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/wms/wmsinvinbillls';
/** 入库单子表 */
export interface WmsInvInBillLDto extends BaseBeanModel {
  /** 申请单主表ID */
  wmsInvInBillId?: string;
  /** 原始单据ID */
  originalOrderDetailId?: string;
  /** 原始单据表名 */
  originalOrderTabName?: string;
  /** 物料 */
  mdsItemId?: string;
  /** 计量单位  */
  mdsUnitId?: string;
  /** 入库数量 */
  inQty?: number;
  /** 入库登账人ID */
  inUserId?: string;
  /** 入库登账人编码 */
  inUserCode?: string;
  /** 入库登账人姓名 */
  inUserName?: string;
  /** 入库登账日期 */
  inDate?: any;
  inDateBegin?: any;
  inDateEnd?: any;
  /** 入库登账人所在部门ID */
  inDeptId?: string;
  /** 入库登账人所在部门编码 */
  inDeptCode?: string;
  /** 入库登账人所在部门名称 */
  inDeptName?: string;
  /** 库位ID */
  mdsLocatorId?: string;
  /** 封装日期 */
  envelopDate?: any;
  envelopDateBegin?: any;
  envelopDateEnd?: any;
  /** 制造日期 */
  manufactoryDate?: any;
  manufactoryDateBegin?: any;
  manufactoryDateEnd?: any;
  /** 出厂日期 */
  leaveFactoryDate?: any;
  leaveFactoryDateBegin?: any;
  leaveFactoryDateEnd?: any;
  /** 开单日期 */
  billingDate?: any;
  billingDateBegin?: any;
  billingDateEnd?: any;
  /** 油封日期 */
  oilSealDate?: any;
  oilSealDateBegin?: any;
  oilSealDateEnd?: any;
  /** 复验日期 */
  recheckDate?: any;
  recheckDateBegin?: any;
  recheckDateEnd?: any;
  /** 最长保管日期 */
  storageDate?: any;
  storageDateBegin?: any;
  storageDateEnd?: any;
  /** 项目编号 */
  projectNo?: string;
  /** 合同号 */
  orderNo?: string;
  /** 供应商ID */
  srmVendorId?: string;
  /** 产品ID */
  proMdsItemId?: string;
  /** 父件ID */
  parentMdsItemId?: string;
  /** 架次 */
  lotNo?: string;
  /** 炉号 */
  stoveNo?: string;
  /** 批号 */
  batchNo?: string;
  /** 计划价 */
  plannedPrice?: string;
  /** 货币类型 ^  */
  currencyType?: string;
  /** 不含税合同单价 */
  inPrice?: string;
  /** 含税合同单价 */
  arrivalUnitPrice?: string;
  /** 合格证ID ^ 厂内检验合格后的合格证ID */
  qcCertificationId?: string;
  /** 合格证号 */
  certificationNo?: string;
  /** 质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等 */
  qualityCode?: string;
  /** 派工号 */
  missionNo?: string;
  /** 紧急放行标识^Y-是紧急放行、N-非紧急放行 */
  urgentReleaseFlag?: string;
  /** 紧急放行单号 */
  urgentReleaseNo?: string;
  /** 拒绝原因 */
  refuseReason?: string;
  /** 打印标识 ^ N-未打印,Y-已打印 */
  ynPrint?: string;
  /** 客户ID */
  crmCustomerId?: string;
  /** 供方合格证号 */
  supplyCertificationNo?: string;
  /** 任务序列号 */
  foNo?: string;
  /** 采购合同子表ID */
  srmOrderListId?: string;
  /** 检验单ID */
  qcCheckBillId?: string;
  /** 件号 */
  itemSerialNo?: string;
  /** 构型号 */
  configNo?: string;
  /** 交付部门ID */
  deliveryDeptId?: string;
  /** 交付部门编码 */
  deliveryDeptCode?: string;
  /** 交付部门名称 */
  deliveryDeptName?: string;
  /** 使用部门ID */
  useDeptId?: string;
  /** 使用部门编码 */
  useDeptCode?: string;
  /** 使用部门名称 */
  useDeptName?: string;
  /** 单据状态 ^0-编制中；5-提交申请；10-已派工；13-提交检验，15-部分完成；20-已完成；25-已拒绝;3-用于显示采购入库申请 */
  inBillLStatus?: string;
  /** 备注 */
  note?: string;
  /** 是否挂账 ^ N-未挂账,Y-已挂账 */
  ynOnAccount?: string;
  /** 是否关闭 ^ N-未关闭,Y-已关闭 */
  ynClose?: string;
  /** 关闭日期 */
  closeDate?: any;
  closeDateBegin?: any;
  closeDateEnd?: any;
  /** 关闭人ID */
  closeUserId?: string;
  /** 关闭人编码 */
  closeUserCode?: string;
  /** 关闭人姓名 */
  closeUserName?: string;
  /** 下次油封日期 */
  nextOilSealDate?: any;
  nextOilSealDateBegin?: any;
  nextOilSealDateEnd?: any;
  /** 下次复验日期 */
  nextRecheckDate?: any;
  nextRecheckDateBegin?: any;
  nextRecheckDateEnd?: any;
  /** 油封周期 */
  oilSealPeriod?: number;
  /** 复验周期 */
  recheckPeriod?: number;
  /** 客户类型ID */
  mdsCustomerTypeId?: string;
  /** 分工路线主表ID */
  mdsWorkLineId?: string;
  /** 分工路线 */
  mdsWorkLine?: string;
  /** 库存占用子表ID^补货订单需要记录库存占用子表ID    */
  wmsInvEngagedBillLId?: string;
  /** 发票关联表ID【冗余字段】^用于是否关联发票 */
  pmsInvoiceAssonInvBillId?: string;
  /** 合格标记 Y合格，X限用，N不合格,0 无效 */
  certificationFlag?: string;
  /** 熔炼号 */
  smeltNo?: string;
  /** 限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用 */
  useLimit?: string;
  /** 保留单号 */
  reservationNoteNo?: string;
  /** 审理单号 */
  qualityNoteNo?: string;
  /** 偏离单号 */
  aberrationNoteNo?: string;
  /** 成品首翻期 */
  firstOverhaulDate?: any;
  firstOverhaulDateBegin?: any;
  firstOverhaulDateEnd?: any;
  /** 密级 */
  secretLevel?: any;
  /** 锭节号 */
  spindleSegmentNo?: string;
  /** 材料账本号 */
  materialAccountNo?: string;
  /** 物料类型 */
  mdsItemType?: string;
  /** 有效保管期--暂时作废该字段 */
  validStorageDate?: any;
  validStorageDateBegin?: any;
  validStorageDateEnd?: any;
  /** 材料账本号ID */
  materialAccountId?: string;
  /** 材料尺寸 */
  materialSize?: string;
  /** 是否限用 YN_flag Y是 ,N 否 */
  confineFlag?: string;
  /** 限用型号 */
  confineProduct?: string;
  /** 限用批次 */
  confineBatch?: string;
  /** 限用架次 */
  confineLot?: string;
  /** 限用说明 */
  confineDesc?: string;
  /** 批次 */
  batchNumber?: string;
  /** 长度 */
  length?: string;
  /** 宽度 */
  width?: string;
  /** 厚度1 */
  thickness1?: string;
  /** 厚度2 */
  thickness2?: string;
  /** 半径 */
  radius?: string;
  /** 壁厚 */
  wallThickness?: string;
  /** 外径 */
  externalDiameter?: string;
  /** 质保期/有效保管期 */
  ensureDate?: any;
  ensureDateBegin?: any;
  ensureDateEnd?: any;
  /** 生产批号 */
  productionBatchNo?: string;
  /** 热处理批号 */
  heatBatchNo?: string;
  /** 技术协议版次 */
  techConditionVersion?: string;
  /** 定试周期 */
  fixedTestPeriod?: string;
  /** 成品状态 */
  matetialStatus?: string;
  /** 订单类型 */
  orderType?: string;
  /** 验收日期 */
  acceptanceDate?: any;
  acceptanceDateBegin?: any;
  acceptanceDateEnd?: any;
  /** 封存日期 */
  archiveDate?: any;
  archiveDateBegin?: any;
  archiveDateEnd?: any;
  /** 采购到货检验单表ID;多个以','分割 */
  pmsCheckInfoId?: string;
  /** 是否上机标识 */
  ynInstallFlag?: string;
  /** 客户类型编码 ^ 关联MDS_CUSTOMER_TYPE表【SFERP项目添加】 */
  mdsCustomerTypeCode?: string;
  /** 客户类型名称 ^ 关联MDS_CUSTOMER_TYPE表【SFERP项目添加】 */
  mdsCustomerTypeName?: string;
  /** 制造商名称 */
  manufactoryName?: string;
  /** 理化单号 */
  tdmBusinessNo?: string;
  /** 理化日期 */
  tdmBusinessDate?: any;
  tdmBusinessDateBegin?: any;
  tdmBusinessDateEnd?: any;
  /** 计划编码 ^ 采购计划唯一识别编号，由系统生成：编码格式：PYYYYMMDD#####，#为流水码 */
  planListNo?: string;
  /** 到货流水号 */
  rcBillNo?: string;
  /** 合同财务流水号 */
  sysLongtermAgreementNo?: string;
  /** 计划员 */
  planUserName?: string;
  /** 供应员 */
  receiveUserName?: string;
  /** 让步接收单号 */
  rbrkNo?: string;
  /** 税款抵扣类型01全额抵扣02不抵扣03混合抵扣 */
  pmsTaxDeductionType?: string;
  /** 申请数量 */
  applyQty?: number;
  /** 新进入库数量^未使用过的数量，入库数量包含新进入库数量 */
  unusedInQty?: number;
  /** 关闭数量 */
  closeQty?: number;
  /** 本次入库数量 */
  thisTimeInQty?: number;
  /** 检验损耗数量 */
  checkLossQty?: number;
  /** 采购入库单件数量 */
  itemQty?: number;
}

/** 获取分页数据 */
export function listWmsInvInBillLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<WmsInvInBillLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getWmsInvInBillL (id: string): Promise<ResponseBaseData<WmsInvInBillLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsInvInBillL (form: WmsInvInBillLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delWmsInvInBillL (ids: [string]): Promise<ResponseBaseData<any>> {
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
