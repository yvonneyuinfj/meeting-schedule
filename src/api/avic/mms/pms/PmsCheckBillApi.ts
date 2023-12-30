import request from '@/utils/request';
import type {BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel} from '@/api/model/baseModel';
import type {downloadParam} from '@/utils/download-util';
import {downloadSysFile} from '@/utils/download-util';

const basePath = '/mms/pms/pmscheckbills';

/** 采购到货检验单表 */
export interface PmsCheckBillDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 状态 */
  status?: string;
  /** 到货流水号 */
  billNo?: string;
  /** 检验单号 */
  checkTaskNo?: string;
  /** 供应商 */
  mdsVendorId?: string;
  /** 订单号/合同号 */
  orderNo?: string;
  /** 规格 */
  testBarSpec?: string;
  /** 计量单位 */
  invMdsUnitId?: string;
  /** 供方合格证号 */
  recprtlotNo?: string;
  /** 炉批号 */
  stoveNo?: string;
  /** 批号 */
  batchNo?: string;
  /** 件号 */
  itemSerialNo?: string;
  /** 接收数量 */
  receiveQty?: number;
  /** 出厂日期 */
  lfackoryDate?: any;
  lfackoryDateBegin?: any;
  lfackoryDateEnd?: any;
  /** 制造日期 */
  manuDate?: any;
  manuDateBegin?: any;
  manuDateEnd?: any;
  /** 送检日期 */
  checkSendDate?: any;
  checkSendDateBegin?: any;
  checkSendDateEnd?: any;
  /** 退回原因 */
  rejectReason?: string;
  /** 业务类型 ^ PMS_CHECK_BILL_BUSINESS_TYPE:1到货检验,2返厂检验,3生产检验,4三期检验,5现场送检 */
  businessType?: string;
  /** 对应的业务单ID ^ 到货对应的是到货明细表ID，库房对应的是三期处理子表ID */
  sourceTableId?: string;
  /** 采购到货三期信息表ID */
  pmsReceiveLDetailThreeId?: string;
  /** 采购订单/合同主表ID ^  */
  pmsOrderId?: string;
  /** 库房ID ^ */
  mdsInventoryId?: string;
  /** 项目ID */
  mdsProjectId?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 机型/产品ID */
  proMdsItemId?: string;
  /** 零件/组件ID */
  partsMdsItemId?: string;
  /** 物料编码ID */
  mdsItemId?: string;
  /** 检验方式 ^ 通用代码 PMS_SEND_TYPE: 1-送检 5-自检 */
  compType?: string;
  /** 送检人 ^  开单人 */
  senderUserId?: string;
  /** 送检人代码 */
  senderUserCode?: string;
  /** 送检人姓名 */
  senderUserName?: string;
  /** 送检部门ID */
  sendByDeptId?: string;
  /** 接收人ID ^ 检验部门接受检验单的人员ID */
  receiveUserId?: string;
  /** 接收人代码 */
  receiveUserCode?: string;
  /** 接收人姓名 */
  receiveUserName?: string;
  /** 接收部门ID */
  receiveDeptId?: string;
  /** 接收部门代码 */
  receiveDeptCode?: string;
  /** 接收部门名称 */
  receiveDeptName?: string;
  /** 接收日期 */
  receiveDate?: any;
  receiveDateBegin?: any;
  receiveDateEnd?: any;
  /** 检验人代码 ^ 引用T_USER(USERNAME) */
  checkerUserId?: string;
  /** 检验人代码 */
  checkerUserCode?: string;
  /** 检验人姓名 */
  checkerUserName?: string;
  /** 紧急放行状态 ^ 通用代码：PMS_URGENT_PASS_STATUS 0-正常 5-紧急放行 10-处理完成 */
  urgentReleaseStatus?: string;
  /** 紧急放行单号 */
  urgentReleaseNo?: string;
  /** 备注 */
  notes?: string;
  /** 质量系统反馈检验单id */
  iqsCheckBillId?: string;
  /** 是否理化试验 */
  isEntrust?: string;
  /** 是否无损检测 */
  isLossless?: string;
  /** 质量系统拒绝人id */
  rejectUserId?: string;
  /** 质量系统拒绝人编号 */
  rejectUserCode?: string;
  /** 质量系统拒绝人名称 */
  rejectUserName?: string;
  /** 入厂复验规范 */
  reviewCheckSpecs?: string;
  /** 锭节号 */
  serialNo?: string;
  /** 试样编号 */
  sampleNo?: string;
  /** 是否限用 */
  confineFlag?: string;
  /** 限用型号 */
  confineProcuct?: string;
  /** 限用批次 */
  confineBatch?: string;
  /** 限用架次 */
  confineLot?: string;
  /** 限用说明 */
  confineDesc?: string;
  /** 尺寸-其他描述 */
  measurementOtherSize?: string;
  /** 质量返回流水号 */
  docNumber?: string;
  /** 保留单id */
  iqsReserveId?: string;
  /** 保留单号 */
  reserveNo?: string;
  /** 最长保管期 */
  maxStorageDate?: any;
  maxStorageDateBegin?: any;
  maxStorageDateEnd?: any;
  /** 有效保管期 */
  validateDate?: any;
  validateDateBegin?: any;
  validateDateEnd?: any;
  /** 定试周期 */
  fixedTestPeriod?: string;
  /** 质检方案ID【SFERP项目添加】 */
  pmsCheckTmplId?: string;
  /** 履历本 【成品】N不勾选，Y勾选 */
  logbookFile?: string;
  /** 合格证【成品】N不勾选，Y勾选 */
  certificationFile?: string;
  /** 装机证明【成品】N不勾选，Y勾选 */
  assembleFile?: string;
  /** 客户类型编码 ^ 关联MDS_CUSTOMER_TYPE表【SFERP项目添加】 */
  mdsCustomerTypeCode?: string;
  /** 客户类型名称 ^ 关联MDS_CUSTOMER_TYPE表【SFERP项目添加】 */
  mdsCustomerTypeName?: string;
  /** 理化单号 */
  tdmBusinessNo?: string;
  /** 理化日期 */
  tdmBusinessDate?: any;
  tdmBusinessDateBegin?: any;
  tdmBusinessDateEnd?: any;
  /** 到货物资批次明细ID */
  pmsReceiveLDetailId?: string;
  /** 免费到货标识 1.否 2.是 */
  freeFlag?: string;
  /** 待验库盘点标志 */
  checkInfo?: string;
  /** 待验库盘点人 */
  checkUserName?: string;
  /** 待验库盘点人 */
  checkUserId?: string;
  /** 待验库盘点时间 */
  checkTime?: any;
  checkTimeBegin?: any;
  checkTimeEnd?: any;
  /** 是否理化 1.否 2.是 */
  isBusiness?: string;
  /** 样品数 ^  */
  sampleQty?: number;
  /** 送验数量 */
  totalTestQty?: number;
  /** 试块数量 */
  testBlocksQty?: number;
  /** 单件数量（材料对应单件重量） */
  itemQty?: number;
  /** 材料件数 */
  materialQty?: number;
  /** 已物资保留发放数量 */
  resourceReservationOutQty?: number;
}

/** 获取分页数据 */
export function listPmsCheckBillByPage(
  param: QueryParamModel
): Promise<ResponsePageData<PmsCheckBillDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 保存表单数据 */
export function savePmsCheckBill(form: [PmsCheckBillDto]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 修改到货检验单，同时修改检验方案 */
export function updateCheckBillWithPlan(form: [PmsCheckBillDto]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/updateWithPlan', form);
}

export function sendBack(list: any): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/sendBack', list);
}

/** 根据id集合删除数据 */
export function delPmsCheckBill(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', {data: ids});
}

/** 提交送检 */
export function commitCheck(list: any[]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + `/commitCheck`, list);
}

/** 无需检验直接提交入库申请 */
export function commitStorage(list: any[]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + `/commitStorage`, list);
}

/** 导出Excel */
export function exportExcel(param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
