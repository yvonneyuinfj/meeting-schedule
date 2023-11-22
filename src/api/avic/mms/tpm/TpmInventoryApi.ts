import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpminventorys';

/** 设备台账 */
export interface TpmInventoryDto extends BaseBeanModel {
  /** 物料表ID */
  mdsItemId?: string;
  /** 资产编号 */
  assetsCode?: string;
  /** 设备编号，编码规则：分类码+四位流水 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 设备类型，通用代码：TPM_EQUIPMENT_TYPE^1特种设备 5 普通设备 10 办公自动化设备 15 视频监控、硬盘录像设备 */
  equipmentType?: string;
  /** 设备规格 ^ */
  specs?: string;
  /** 设备型号 */
  model?: string;
  /** 设备重量（kg） */
  weight?: string;
  /** 供应商ID */
  mdsVendorId?: string;
  /** 供应商名称【冗余设计】 */
  mdsVendorName?: string;
  /** 生产厂家ID */
  manufactureFactoryId?: string;
  /** 生产厂家名称 */
  manufactureFactoryName?: string;
  /** 生产国别 */
  manufactureFactoryCountry?: string;
  /** 出厂编号 */
  leaveFactoryNo?: string;
  /** 出厂时间 */
  leaveFactoryDate?: any;
  leaveFactoryDateBegin?: any;
  leaveFactoryDateEnd?: any;
  /** 投产时间 */
  commissionDate?: any;
  commissionDateBegin?: any;
  commissionDateEnd?: any;
  /** 入账时间 */
  recordDate?: any;
  recordDateBegin?: any;
  recordDateEnd?: any;
  /** 使用部门ID */
  useDeptId?: string;
  /** 使用部门NAME */
  useDeptName?: string;
  /** 数量 */
  qty?: string;
  /** 计量单位名称 */
  mdsUnitName?: string;
  /** 责任人ID */
  responseUserId?: string;
  /** 责任人NAME */
  responseUserName?: string;
  /** 原值(元) */
  originalValue?: string;
  /** 质保日期 */
  qaDate?: any;
  qaDateBegin?: any;
  qaDateEnd?: any;
  /** 设备级别，ABCD分类，通用代码：TPM_ABCD_TYPE^ A重点设备B主要设备 C一般设备 D不重要设备 */
  abcdType?: string;
  /** 购置日期 */
  purchaseDate?: any;
  purchaseDateBegin?: any;
  purchaseDateEnd?: any;
  /** 具体位置 */
  storageLocation?: string;
  /** 机械复杂系数 */
  machineComplexRate?: string;
  /** 电气复杂系数 */
  electricComplexRate?: string;
  /** 设备功率（kW） */
  equipmentPower?: string;
  /** 电机台数 */
  motorQty?: number;
  /** 是否关键独生子，通用代码：YN_FLAG^ Y是，N否 */
  keyOnlyChildFlag?: string;
  /** 车牌号 */
  plateNumber?: string;
  /** 油箱大小（L） */
  tankSize?: string;
  /** 检定周期（月） */
  verificationCycle?: number;
  /** 上次检定日期 */
  lastVerificationDate?: any;
  lastVerificationDateBegin?: any;
  lastVerificationDateEnd?: any;
  /** 资金来源 */
  capitalSource?: string;
  /** 数控分类，通用代码：TPM_CNC_TYPE，1数控车床 5数控铣床及数控镗铣床 10数控加工中心 15数控坐标磨床 20数控电火花机床 25数控弯管机 30其它数控 */
  cncType?: string;
  /** 数控控制系统 */
  cncCtrlSystem?: string;
  /** 设备状态，通用代码：TPM_EQUIPMENT_STATUS^1在用 5限用 10待修 15 待修 20封存 25调试 30禁用 */
  equipmentStatus?: string;
  /** 资产状态，通用代码：TPM_ASSETS_STATUS^^1在用 5租借 10闲置 15封存 20积压 25待报废 30报废 35拆除 40处置 45降级 50作废 默认在用 */
  assetsStatus?: string;
  /** 是否进口 */
  ynEntrance?: string;
  /** 报废日期 */
  wasteDate?: any;
  wasteDateBegin?: any;
  wasteDateEnd?: any;
  /** 资产大类表ID */
  tpmAssetClassId?: string;
  /** 资产大类名称 */
  className?: string;
  /** 资产大类编码 */
  classCode?: string;
  /** 备注 */
  note?: string;
  /** 数据密级 */
  secretLevel?: any;
  /** 净值(元) */
  netValue?: string;
  /** 累计折旧值 */
  depreciationValue?: string;
  /** 是否军工关键设备，通用代码：YN_FLAG^ Y是，N否 */
  ynMilitaryKeyEquip?: string;
  /** 原因，可以是各种原因，作废原因、报废原因、拆除原因等 */
  reason?: string;
  /** 设备区域表ID */
  tpmAreaId?: string;
  /** 区域名称 */
  areaName?: string;
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
  /** 调拨记录 */
  transferRecord?: string;
  /** 是转固，通用代码：YN_FLAG^ Y是，N否 */
  ynFixed?: string;
  /** 使用年限 */
  useTime?: number;
  /** 检定单位 */
  checkDeptName?: string;
  /** 设备外文名称 */
  equipmentForeignName?: string;
  /** 资产类别，通用代码：TPM_ASSET_TYPE^1土地、2设备、3运输工具、4房屋及建筑物、5投资性房地产、6土地使用权、7计算机软件 */
  assetType?: string;
  /** 资产分管人员ID */
  assetManageUserId?: string;
  /** 资产分管人员名称 */
  assetManageUserName?: string;
  /** 资产用途，通用代码：TPM_ASSETS_USE^1科研用、2生产用、3试验用、4办公用、5经营用、6其他 */
  assetsUse?: string;
  /** 安装运杂费 */
  otherCost?: string;
  /** 财务凭证号 */
  voucherNo?: string;
  /** 燃料种类 */
  fuelType?: string;
  /** 外廓尺寸 */
  outlineSize?: string;
  /** 车身颜色 */
  carColor?: string;
  /** 车架号 */
  vinNo?: string;
  /** 发动机号码 */
  engineNo?: string;
  /** 发动机型号 */
  engineModel?: string;
  /** 订单号 */
  orderNo?: string;
  /** 发票号 */
  invoiceNo?: string;
  /** 批复文号 */
  documentNo?: string;
  /** 对应试验器 */
  equipmentNo?: string;
  /** 登记号 */
  registrationNo?: string;
  /** 验收日期 */
  acceptanceDate?: any;
  acceptanceDateBegin?: any;
  acceptanceDateEnd?: any;
  /** 设备性能/主要技术指标 */
  equipmentPerformance?: string;
  /** 技术资料 */
  technicalInfo?: string;
  /** 载货（吨） */
  carryCargo?: string;
  /** 载人数量 */
  passengersNum?: number;
  /** 移交项目类别，通用代码：TPM_TRANSFER_PROJECT_TYPE^1购置、2科研、3自制 */
  transferProjectType?: string;
  /** 移交转固表ID */
  tpmTransferFixedBillId?: string;
  /** 是否保养，通用代码：YN_FLAG^ Y是，N否 */
  ynMaintain?: string;
  /** 资产分管单位ID */
  assetManageDeptId?: string;
  /** 是否调拨 通用代码：YN_FLAG^ Y是，N否 */
  ynTransferRecord?: string;
  /** 调拨时间 */
  transferRecordDate?: any;
  transferRecordDateBegin?: any;
  transferRecordDateEnd?: any;
  /** 设备分管单位ID */
  equipmentManageDeptId?: string;
  /** 用途，通用代码：TPM_EQUIPMENT_USE^ */
  equipmentUse?: string;
  /** 军工关键设备专用代码 */
  militaryKeyEquipCode?: string;
  /** 是否瓶颈设备，通用代码：YN_FALG^Y是,N否 */
  ynBottleneckEquipment?: string;
  /** 能效，通用代码：TPM_ENERGY_EFFICIENCY^1 I ,2 II , 3 III */
  energyEfficiency?: string;
  /** 设备序列号 */
  equipmentSerialNumber?: string;
  /** 硬盘序列号 */
  hdSerialNumber?: string;
  /** 操作系统安装时间 */
  systemInstallDate?: any;
  systemInstallDateBegin?: any;
  systemInstallDateEnd?: any;
  /** 存储介质类型 */
  storageType?: string;
  /** 存储介质序列号 */
  storageMediaSerialNumber?: string;
  /** 存储介质编号 */
  storageMediaCode?: string;
  /** 存储介质名称 */
  storageMediaName?: string;
  /** 联网设备IP地址 */
  ipAddress?: string;
  /** 注册代码 */
  registrationCode?: string;
  /** 是否年检，通用代码：YN_FALG^Y是,N否 */
  ynAnnualInspection?: string;
}

/** 获取分页数据 */
export function listTpmInventoryByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmInventoryDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

export function standardListTpmInventorySelectByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmInventoryDto>> {
  return request.post(basePath + '/searchStandard-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmInventory(id: string): Promise<ResponseBaseData<TpmInventoryDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmInventory(form: TpmInventoryDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmInventory(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
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
