import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmsreceiveldetails';
/** 采购到货物资批次明细表 */
export interface PmsReceiveLDetailDto extends BaseBeanModel {
  /** 密级  */
  secretLevel?: any;
  /** 目的库房 */
  mdsInventoryId?: string;
  /** 炉号 */
  stoveNo?: string;
  /** 批号 */
  batchNo?: string;
  /** 件号(产品编号) */
  itemSerialNo?: string;
  /** 物料号 */
  mdsItemCode?: string;
  /** 待验员姓名 */
  receiverUserName?: string;
  /** 物料ID */
  mdsItemId?: string;
  /** 采购到货主信息表ID */
  pmsReceiveId?: string;
  /** 采购物资到货明细表ID */
  pmsReceiveLId?: string;
  /** 供方合格证号 */
  recprtlotNo?: string;
  /** 制造日期 */
  manuDate?: any;
  manuDateBegin?: any;
  manuDateEnd?: any;
  /** 出厂日期 */
  lfackoryDate?: any;
  lfackoryDateBegin?: any;
  lfackoryDateEnd?: any;
  /** 待验员ID */
  receiverUserId?: string;
  /** 待验员代码 */
  receiverUserCode?: string;
  /** 单据状态  */
  billStatus?: string;
  /** 尺寸-长 */
  measurementLength?: string;
  /** 尺寸-宽 */
  measurementWidth?: string;
  /** 尺寸-其他描述 */
  measurementOtherSize?: string;
  /** 退回原因 */
  rejectReason?: string;
  /** 采购计量单位ID */
  pmsMdsUnitId?: string;
  /** 采购计量单位名称 */
  pmsMdsUnitDesc?: string;
  /** 采购计量单位转换系数^针对物料设定基础计量单位 */
  pmsMdsUnitFactor?: string;
  /** 库存计量单位ID */
  invMdsUnitId?: string;
  /** 库存计量单位名称 */
  invMdsUnitDesc?: string;
  /** 库存计量单位转换系数^针对物料设定基础计量单位 */
  invMdsUnitFactor?: string;
  /** 尺寸计量单位 */
  measurementUnitDesc?: string;
  /** 待验库房描述 */
  mdsInventoryDesc?: string;
  /** 登记日期 */
  receiveDate?: any;
  receiveDateBegin?: any;
  receiveDateEnd?: any;
  /** 成品到货业务中，子件对应的父节点id */
  parentId?: string;
  /** 子件结构对数 */
  partQty?: string;
  /** 应到数量 */
  reqQty?: string;
  /** 一级品类ID */
  mdsCategoryLv1Id?: string;
  /** 一级品类名称 */
  mdsCategoryLv1Name?: string;
  /** 二级品类ID */
  mdsCategoryLv2Id?: string;
  /** 二级品类名称 */
  mdsCategoryLv2Name?: string;
  /** 三级品类ID */
  mdsCategoryLv3Id?: string;
  /** 三级品类名称 */
  mdsCategoryLv3Name?: string;
  /** 限用范围 */
  usedRangeLimit?: string;
  /** 入厂复验规范 */
  reviewCheckSpecs?: string;
  /** 锭节号 */
  serialNo?: string;
  /** 熔炼号 */
  smeltingNo?: string;
  /** 材料状态 */
  itemState?: string;
  /** 制造商 */
  manufacturer?: string;
  /** 质保条款 */
  qaCl?: string;
  /** 实际到货日期 */
  arrivalDate?: any;
  arrivalDateBegin?: any;
  arrivalDateEnd?: any;
  /** 封存期 */
  storagePeriod?: string;
  /** 热处理批号 */
  heatBatchNo?: string;
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
  /** 是否带证 */
  isHaveCredentials?: string;
  /** 齐套标志 */
  pickupTotalFlag?: string;
  /** 外包装条码 */
  barcodeOutPack?: string;
  /** 履历本条码 */
  barcodeResume?: string;
  /** 实物表面条码 */
  barcodeEntity?: string;
  /** 备注 */
  note?: string;
  /** 创建来源，1、手动；2、扫码 */
  setupSource?: string;
  /** 扫描的条码 */
  barcode?: string;
  /** 扫描的附加条码 */
  notecode?: string;
  /** 承制单位代码 */
  produceSupplier?: string;
  /** 物品编码，`P`+机载产品:生产数据:零组件编号或`W`+机载产品:生产数据:物品码 */
  produceItemFlag?: string;
  /** 序号 */
  produceSeq?: string;
  /** 物料名称，三码扫描出来的数据 */
  mdsItemName?: string;
  /** 采购到货尺寸 */
  pmsReceiveSize?: string;
  /** ???? */
  weight?: string;
  /** 父件代码 */
  parentItemCode?: string;
  /** 单据编号^ 系统自动编码,^ 编号规则为DH-YYYYMMddAAA，即DH-,加上四位年的数字，两位月的数字，两位日的数字和三位流水号 */
  billNo?: string;
  /** 父件名称 */
  parentItemName?: string;
  /** 封存日期 ^ 用于库房送检时检验员填写 */
  envelopDate?: any;
  envelopDateBegin?: any;
  envelopDateEnd?: any;
  /** 计划编码 ^ 采购计划唯一识别编号，由系统生成：编码格式：PYYYYMMDD#####，#为流水码 */
  planListNo?: string;
  /** 导入时间（如果为导入数据，自动插入该时间） */
  exportDate?: any;
  exportDateBegin?: any;
  exportDateEnd?: any;
  /** 试棒规格 */
  testBarSpec?: string;
  /** 到货数量(采购) */
  pmsReceiveQty?: number;
  /** 到货数量(库存) */
  invReceiveQty?: number;
  /** 到货报废量 */
  wasteQty?: number;
  /** 装箱数量 */
  qnit?: number;
  /** 单件数量 */
  itemQty?: number;
  /** 材料件数 */
  materialQty?: number;
  /** 免费到货数量（采购） */
  freePmsReceiveQty?: number;
  /** 免费到货数量（库存） */
  freeInvReceiveQty?: number;
}

/** 获取分页数据 */
export function listPmsReceiveLDetailByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsReceiveLDetailDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsReceiveLDetail (id: string): Promise<ResponseBaseData<PmsReceiveLDetailDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsReceiveLDetail (form: PmsReceiveLDetailDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsReceiveLDetail (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}
export function splitPmsReceiveLDetail (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/split',  ids);
}

export function getInventory (): Promise<ResponseBaseData<any>> {
  return request.get(basePath + '/getInventory');
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
