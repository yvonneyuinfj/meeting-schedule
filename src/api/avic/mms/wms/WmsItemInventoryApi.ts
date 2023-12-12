import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/wms/wmsiteminventorys';
/** 库存台账表 */
export interface WmsItemInventoryDto extends BaseBeanModel {
  /** 输入依据 */
  inputBasis?: any;
  /** 计划依据 */
  planBasis?: any;
  /** 客户类型ID */
  mdsCustomerTypeId?: any;
  /** 计划编号 */
  planNo?: string;
  /** 合同号 */
  orderNo?: string;
  /** 台账序列号^内部排序序号，新台账取值为已有最大序列号加1 */
  innerOrder?: number;
  /** 单据来源 ^ R-原材料,C-成品 */
  billSource?: string;
  /** 物料ID  */
  mdsItemId?: string;
  /** 物料号 */
  mdsItemCode?: string;
  /** 物料名称 */
  mdsItemName?: string;
  /** 牌号【冗余设计】 */
  marque?: string;
  /** 规格【冗余设计】 */
  specs?: string;
  /** 技术条件 */
  techCondition?: string;
  /** 供货状态 */
  deliveryStatus?: string;
  /** 库房名称 */
  mdsInventoryId?: string;
  /** 库位名称 */
  mdsLocatorId?: string;
  /** 库位号【冗余设计】 */
  mdsLocatorNo?: string;
  /** 当前期段期初库存数量  */
  currentInitInvQty?: string;
  /** 当前期段累计入库数量  */
  currentSumupInQty?: string;
  /** 当前期段累计出库数量  */
  currentSumupOutQty?: string;
  /** 当前期段累计调整数量  */
  currentSumupAdjustQty?: string;
  /** 结存数量 */
  currentOnhandQty?: string;
  /** 新进数量^未使用过的数量，结存数量包含新进数量 */
  unusedOnhandQty?: string;
  /** 占用数量 */
  engagedQty?: string;
  /** 分配数量 */
  allocatedQty?: string;
  /** 首次入库时间 */
  inventoryDate?: any;
  inventoryDateBegin?: any;
  inventoryDateEnd?: any;
  /** 库存状态 ^“1-正常，0-冻结，2-异常 */
  inventoryStatus?: string;
  /** 创建事务ID^取Wms_Item_Transaction.Id用于记录创建该台账的入库事务 */
  createWmsItemTransactionId?: string;
  /** 入库部门ID^取自SYS_DEPT.Id用于记录创建该台账的事务的业务所属部门 */
  inDeptId?: string;
  /** 入库部门编码 */
  inDeptCode?: string;
  /** 入库部门名称 */
  inDeptName?: string;
  /** 建账人ID */
  createdUserId?: string;
  /** 建账人编码 */
  createdUserCode?: string;
  /** 建账人姓名 */
  createdUserName?: string;
  /** 建账日期 */
  createdDate?: any;
  createdDateBegin?: any;
  createdDateEnd?: any;
  /** 计划价 */
  plannedPrice?: string;
  /** 出厂日期 */
  leaveFactoryDate?: any;
  leaveFactoryDateBegin?: any;
  leaveFactoryDateEnd?: any;
  /** 库存三期定义表ID */
  mdsInvThreePeriodId?: string;
  /** 封装方式代码  */
  envelopCode?: string;
  /** 封装日期 */
  envelopDate?: any;
  envelopDateBegin?: any;
  envelopDateEnd?: any;
  /** 计量单位 */
  mdsUnitId?: string;
  /** 质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等 */
  qualityCode?: string;
  /** 供方合格证号 */
  supplyCertificationNo?: string;
  /** 项目编号 */
  projectNo?: string;
  /** 供应商ID */
  srmVendorId?: string;
  /** 客户ID */
  crmCustomerId?: string;
  /** 任务序列号 */
  foNo?: string;
  /** 产品ID */
  proMdsItemId?: string;
  /** 产品号【冗余设计】 */
  proMdsItemCode?: string;
  /** 父件ID */
  parentMdsItemId?: string;
  /** 制造日期 */
  manufactoryDate?: any;
  manufactoryDateBegin?: any;
  manufactoryDateEnd?: any;
  /** 开单日期 */
  billingDate?: any;
  billingDateBegin?: any;
  billingDateEnd?: any;
  /** 本次油封日期 */
  oilSealDate?: any;
  oilSealDateBegin?: any;
  oilSealDateEnd?: any;
  /** 下次油封日期 */
  nextOilSealDate?: any;
  nextOilSealDateBegin?: any;
  nextOilSealDateEnd?: any;
  /** 本次复验日期 */
  recheckDate?: any;
  recheckDateBegin?: any;
  recheckDateEnd?: any;
  /** 下次复验日期 */
  nextRecheckDate?: any;
  nextRecheckDateBegin?: any;
  nextRecheckDateEnd?: any;
  /** 最长保管日期 */
  storageDate?: any;
  storageDateBegin?: any;
  storageDateEnd?: any;
  /** 架次 */
  lotNo?: string;
  /** 炉号 */
  stoveNo?: string;
  /** 批号 */
  batchNo?: string;
  /** 派工号 */
  missionNo?: string;
  /** 货币类型 ^ 实际价的货币类型,继承合同中的货币类型 */
  currencyType?: string;
  /** 不含税合同单价 */
  inPrice?: string;
  /** 含税合同单价 */
  arrivalUnitPrice?: string;
  /** 合格证ID ^ 厂内检验合格后的合格证ID */
  qcCertificationId?: string;
  /** 合格证号 ^ 厂内检验合格后的合格证编号 */
  certificationNo?: string;
  /** 检验单ID */
  qcCheckBillId?: string;
  /** 交付车间ID */
  deliveryDeptId?: string;
  /** 交付车间编码 */
  deliveryDeptCode?: string;
  /** 交付车间名称 */
  deliveryDeptName?: string;
  /** 使用部门ID */
  useDeptId?: string;
  /** 使用部门编码 */
  useDeptCode?: string;
  /** 使用部门名称 */
  useDeptName?: string;
  /** 件号 */
  itemSerialNo?: string;
  /** 构型号 */
  configNo?: string;
  /** 备注 */
  note?: string;
  /** 冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中 */
  lockReason?: string;
  /** 延期天数 */
  extensionPeriod?: number;
  /** 异常原因 ^1-复验不合格，2-超最长保管期 */
  abnormalReason?: string;
  /** 油封周期 */
  oilSealPeriod?: number;
  /** 复验周期 */
  recheckPeriod?: number;
  /** 计划价金额 */
  plannedMoney?: string;
  /** 不含合同税金额 */
  inMoney?: string;
  /** 含税合同金额 */
  arrivalMoney?: string;
  /** 分工路线主表ID */
  mdsWorkLineId?: string;
  /** 分工路线 */
  mdsWorkLine?: string;
  /** 合格标记 Y合格，X限用，N不合格,0 无效 */
  certificationFlag?: string;
  /** 熔炼号 */
  smeltNo?: string;
  /** 限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用 */
  useLimit?: string;
  /** 物料类型【冗余设计】 */
  mdsItemType?: string;
  /** 密级 */
  secretLevel?: any;
  /** 锭节号 */
  spindleSegmentNo?: string;
  /** 材料账本号 */
  materialAccountNo?: string;
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
  /** 材料状态 */
  materialStatus?: any;
  /** 原始材料状态，用以记录站点领料出库前的材料状态，为余料退库登账后还原“材料状态”字段值服务 */
  originalMaterialStatus?: string;
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
  /** 是否上机标识 */
  ynInstallFlag?: string;
  /** 实物编码 */
  relItemCode?: string;
  /** 制造商名称【SFERP】 */
  manufactoryName?: string;
  /** 合同子表id【SFERP】 */
  pmsLongtermAgreementLId?: string;
  /** 理化单号 */
  initTdmBusinessNo?: string;
  /** 理化日期 */
  tdmBusinessDate?: any;
  tdmBusinessDateBegin?: any;
  tdmBusinessDateEnd?: any;
  /** 到货流水号 */
  rcBillNo?: string;
  /** 盘点标志 */
  checkInfo?: string;
  /** 盘点人 */
  checkUserName?: string;
  /** 盘点人id */
  checkUserId?: string;
  /** 盘点时间 */
  checkTime?: any;
  checkTimeBegin?: any;
  checkTimeEnd?: any;
  /** 价格标志 值为1取计划价，否则取合同价 */
  priceFlag?: string;
  /** 当前期段期初库存金额 */
  currentInitInvMoney?: string;
  /** 成本核算价 */
  factPrice?: string;
  /** 初始验收单事务ID^取Wms_Item_Transaction.Id用于记录该台账采购入库的入库事务 */
  originalWmsItemTransactionId?: string;
  /** 批次课题号 */
  projectNumber?: string;
  /** 经办人 */
  handledUserId?: string;
  handledUserIdAlias?: string;
  /** 经办人CODE */
  handledUserCode?: string;
  /** 经办人名称 */
  handledUserName?: string;
  /** 图号/型号 */
  drawingNo?: string;
  /** 批次发动机型号 */
  batchEngineModel?: string;
  /** 供应商批次号 */
  supplierBatchNumber?: string;
  /** 质量凭证 */
  qualityCertificate?: string;
  /** 试验类别 */
  testCategory?: string;
  /** 试验结论 */
  testConclusion?: string;
  /** 产品状况/寿命 */
  productCondition?: string;
  /** 生产单位CODE */
  produceDeptCode?: string;
  /** 生产单位名称 */
  produceDeptName?: string;
  /** 生产单位 */
  produceDeptId?: string;
  produceDeptIdAlias?: string;
}

/** 获取分页数据 */
export function listWmsItemInventoryByPage (
  param: QueryParamModel
): Promise<ResponsePageData<WmsItemInventoryDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getWmsItemInventory (id: string): Promise<ResponseBaseData<WmsItemInventoryDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsItemInventory (form: WmsItemInventoryDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delWmsItemInventory (ids: [string]): Promise<ResponseBaseData<any>> {
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
