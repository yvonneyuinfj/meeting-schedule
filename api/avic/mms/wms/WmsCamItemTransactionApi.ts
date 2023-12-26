import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/wms/wmscamitemtransactions';
/** 顾客财产履历表 */
export interface WmsCamItemTransactionDto extends BaseBeanModel {
  /** 事务处理流水号 */
  transactionCode?: string;
  /** 单据来源 ^ R-原材料 C-成品 */
  billSource?: any;
  /** 是否红单 ^ Y-红单,N-蓝单 */
  ynRedBill?: any;
  /** 物料ID */
  mdsItemId?: string;
  /** 物料号【冗余设计】 */
  mdsItemCode?: string;
  /** 物料名称 【冗余设计】 */
  mdsItemName?: string;
  /** 牌号【冗余设计】 */
  marque?: string;
  /** 规格【冗余设计】 */
  specs?: string;
  /** 技术条件【冗余设计】 */
  techCondition?: string;
  /** 交货状态【冗余设计】 */
  deliveryStatus?: string;
  /** 库房ID */
  mdsInventoryId?: string;
  /** 库位ID */
  mdsLocatorId?: string;
  /** 库位号【冗余设计】 */
  mdsLocatorNo?: string;
  /** 台账ID */
  wmsItemInventoryId?: string;
  /** 库存事务类型ID */
  mdsInventoryTransactionId?: string;
  /** 库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区 */
  invTransactStatus?: any;
  /** 会计期段ID */
  mdsPeriodId?: string;
  /** 事务处理对冲标记 */
  backFlag?: string;
  /** 对冲事务流水ID */
  backTransactionId?: string;
  /** 对冲事务流水号 */
  backTransactionCode?: string;
  /** 台账期初数量 ^当前台账在事务发生前的库存数量 */
  initQty?: string;
  /** 库房期初数量^以库房为单位汇总某项物资在事务发生前的当前库存数量 */
  wmsInitQty?: string;
  /** 库房结存数量^以库房为单位汇总某项物资在事务发生后台账结存数量 */
  wmsOnhandQty?: string;
  /** 事务处理数量 */
  transactionQty?: string;
  /** 事务处理人ID */
  transactionUserId?: string;
  transactionUserIdAlias?: string;
  /** 事务处理人编码 */
  transactionUserCode?: string;
  transactionUserCodeAlias?: string;
  /** 事务处理人姓名 */
  transactionUserName?: string;
  transactionUserNameAlias?: string;
  /** 事务处理日期 */
  transactionDate?: any;
  transactionDateBegin?: any;
  transactionDateEnd?: any;
  /** 计量单位 */
  mdsUnitId?: string;
  /** 原始单据ID（采购订单、销售订单、生产订单） */
  originalOrderDetailId?: string;
  /** 出入库单ID^入库单子表ID或者出库资源分配表ID */
  wmsOrderDetailId?: string;
  /** 事务处理部门^交付部门或领用部门 */
  transactionDeptId?: string;
  transactionDeptIdAlias?: string;
  /** 事务处理部门编码 */
  transactionDeptCode?: string;
  transactionDeptCodeAlias?: string;
  /** 事务处理部门名称 */
  transactionDeptName?: string;
  transactionDeptNameAlias?: string;
  /** 项目 */
  pmProjectId?: string;
  /** 发票号 */
  invoiceNo?: string;
  /** 项目编号 */
  projectNo?: string;
  /** 客户ID */
  crmCustomerId?: string;
  crmCustomerIdAlias?: string;
  /** 客户编码 */
  crmCustomerCode?: string;
  crmCustomerCodeAlias?: string;
  /** 客户名称 */
  crmCustomerName?: string;
  crmCustomerNameAlias?: string;
  /** 供应商ID */
  srmVendorId?: string;
  /** 供应商编码 */
  srmVendorCode?: string;
  /** 供应商名称 */
  srmVendorName?: string;
  /** 合同号 */
  orderNo?: string;
  /** 不含税合同单价 */
  inPrice?: string;
  /** 计划价 */
  plannedPrice?: string;
  /** 含税单合同价 */
  arrivalUnitPrice?: string;
  /** 货币类型 */
  currencyType?: string;
  /** 产品ID */
  proMdsItemId?: string;
  /** 产品号【冗余设计】 */
  proMdsItemCode?: string;
  /** 父件ID */
  parentMdsItemId?: string;
  /** 架次 */
  lotNo?: string;
  /** 炉号 */
  stoveNo?: string;
  /** 批号 */
  batchNo?: string;
  /** 派工号 */
  missionNo?: string;
  /** 合格证号 */
  certificationNo?: string;
  /** 供方合格证号 */
  supplyCertificationNo?: string;
  /** 质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等 */
  qualityCode?: string;
  /** 任务序列号 */
  foNo?: string;
  /** 检验单ID */
  qcCheckBillId?: string;
  /** 采购合同子表ID */
  srmOrderListId?: string;
  /** 紧急放行标识^Y-是紧急放行、N-非紧急放行 */
  urgentReleaseFlag?: any;
  /** 紧急放行单号 */
  urgentReleaseNo?: string;
  /** 检验记录人ID */
  qcCheckUserId?: string;
  qcCheckUserIdAlias?: string;
  /** 检验记录人编码 */
  qcCheckUserCode?: string;
  qcCheckUserCodeAlias?: string;
  /** 检验记录人姓名 */
  qcCheckUserName?: string;
  qcCheckUserNameAlias?: string;
  /** 检验记录日期 */
  qcCheckDate?: any;
  qcCheckDateBegin?: any;
  qcCheckDateEnd?: any;
  /** 件号 */
  itemSerialNo?: string;
  /** 构型号 */
  configNo?: string;
  /** 接收人ID^配送使用 */
  recieveUserId?: string;
  /** 接收人编码^配送使用 */
  recieveUserCode?: string;
  /** 接收人姓名^配送使用 */
  recieveUserName?: string;
  /** 接收日期^配送使用 */
  recieveDate?: any;
  recieveDateBegin?: any;
  recieveDateEnd?: any;
  /** 结转主表ID */
  wmsInvBalanceBillId?: string;
  /** 备注 */
  note?: string;
  /** 单据编号 */
  billNo?: string;
  /** 计划价金额 */
  plannedMoney?: string;
  /** 不含税合同金额 */
  inMoney?: string;
  /** 含税合同金额 */
  arrivalMoney?: string;
  /** 台账结存数量 */
  onhandQty?: string;
  /** 排序序号 ^ 内部排序序号 */
  innerOrder?: number;
  /** 合格标记 Y合格，X限用，N不合格,0 无效 */
  certificationFlag?: any;
  /** 熔炼号 */
  smeltNo?: string;
  /** 限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用 */
  useLimit?: any;
  /** 物料类型【冗余设计】 */
  mdsItemType?: string;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 操作类型 O-出库 ，I -入库 */
  mdsInvOperationType?: any;
  /** 锭节号 */
  spindleSegmentNo?: string;
  /** 材料账本号 */
  materialAccountNo?: string;
  /** 有效保管期--暂时作废 */
  validStorageDate?: any;
  validStorageDateBegin?: any;
  validStorageDateEnd?: any;
  /** 材料账本号ID */
  materialAccountId?: string;
  /** 材料尺寸 */
  materialSize?: string;
  /** 是否限用 YN_flag Y是 ,N 否 */
  confineFlag?: any;
  /** 限用型号 */
  confineProduct?: string;
  /** 限用批次 */
  confineBatch?: string;
  /** 限用架次 */
  confineLot?: string;
  /** 限用说明 */
  confineDesc?: string;
  /** 采购入库单件数量 */
  itemQty?: string;
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
  /** 质保期/最长保管期 */
  ensureDate?: any;
  ensureDateBegin?: any;
  ensureDateEnd?: any;
  /** 生产批号 */
  productionBatchNo?: string;
  /** 热处理批号 */
  heatBatchNo?: string;
  /** 技术协议版次 */
  techConditionVersion?: string;
  /** 最长保管期 */
  storageDate?: any;
  storageDateBegin?: any;
  storageDateEnd?: any;
  /** 定试周期 */
  fixedTestPeriod?: string;
  /** 成品状态 */
  matetialStatus?: string;
  /** 一级品类ID */
  mdsCategoryLv1Id?: string;
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
  /** 是否上机标识 */
  ynInstallFlag?: string;
  /** 实物编码 */
  relItemCode?: string;
  /** 使用部门ID 【新增】 */
  useDeptId?: string;
  /** 使用部门编码 【新增】 */
  useDeptCode?: string;
  /** 使用部门名称 【新增】 */
  useDeptName?: string;
  /** 稽核申请时间 */
  auditApplyDate?: any;
  auditApplyDateBegin?: any;
  auditApplyDateEnd?: any;
  /** 稽核申请人名称 */
  auditApplyUser?: string;
  /** 稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核 */
  auditStatus?: any;
  /** 稽核说明 */
  auditNotes?: string;
  /** 稽核人名称 */
  auditUser?: string;
  /** 稽核时间 */
  auditDate?: any;
  auditDateBegin?: any;
  auditDateEnd?: any;
  /** 开票通知单id */
  pmsSettlementId?: string;
  /** 杂运费 */
  othersValue?: string;
  /** 是否进行稽核 */
  ynAudit?: string;
  /** 未挂账原因 */
  noChargedReason?: string;
  /** 未开票数量 */
  noInvoiceQuantity?: string;
  /** 是否打印 */
  printFlag?: string;
  /** 打印人 */
  printUser?: string;
  /** 通知供应商时间 */
  noticeVendorTime?: any;
  noticeVendorTimeBegin?: any;
  noticeVendorTimeEnd?: any;
  /** 开票状态 0未开票 5已开票 */
  billStatus?: any;
  /** 开票通知单号 */
  settlementNo?: string;
  /** 临时发票号 */
  tempInvoiceNo?: string;
  /** 核销状态 0未核销 5已核销 （是否已做发票） */
  writeOffStatus?: any;
  /** 开票人id */
  settlementUserId?: string;
  /** 开票人姓名 */
  settlementUserName?: string;
  /** 合同财务流水号 */
  sysLongtermAgreementNo?: string;
  /** 到货流水号 */
  rcBillNo?: string;
  /** 稽核会计期段 */
  mdsPeriodName?: string;
  /** 计划员 */
  planUserName?: string;
  /** 供应员 */
  receiveUserName?: string;
  /** 退库价格 */
  returnPrice?: string;
  /** 核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销 */
  writeOffType?: any;
  /** 核销原因 */
  writeOffReason?: string;
  /** 通知人id */
  noticeUserId?: string;
  /** 通知人姓名 */
  noticeUserName?: string;
  /** 挂账账期 */
  writeOffPeriodName?: string;
  /** 挂账状态 0未挂账 5挂账中 10已挂账 */
  settlementStatus?: any;
  /** 图号/型号 */
  drawingNo?: string;
  /** 供应商批次号 */
  supplierBatchNumber?: string;
  /** 发动机型号 */
  engineModel?: string;
  /** 发动机台份 */
  engineQuantity?: string;
  /** 装配/分解次数 */
  assemblyDisassembly?: string;
  /** 检验单编号 */
  inspectionFormNumber?: string;
  /** 领用依据 */
  usageBasis?: string;
  /** 用途 */
  useTo?: string;
  /** 处置方式 */
  disposalMethod?: string;
}

/** 获取分页数据 */
export function listWmsCamItemTransactionByPage (
  param: QueryParamModel
): Promise<ResponsePageData<WmsCamItemTransactionDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getWmsCamItemTransaction (id: string): Promise<ResponseBaseData<WmsCamItemTransactionDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsCamItemTransaction (form: WmsCamItemTransactionDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delWmsCamItemTransaction (ids: [string]): Promise<ResponseBaseData<any>> {
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
