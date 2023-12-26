import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsitemconfigures';
/** 物料配置表 */
export interface MdsItemConfigureDto extends BaseBeanModel {
  /** 物料ID ^ 取自Mds_Item.Id */
  mdsItemId?: string;
  /** 需求类型 ^ 取自通用代码FILTER_FLAG: D-相关需求,I-独立需求,B-相关需求和独立需求。指独立需求或相关需求 */
  reqType?: string;
  /** 计划类型 ^ 取自通用代码MPS_MODE: 1-MTS为库存生产,2-MTO为订单生产,3-ATO为订单装配,4-ETO为订单设计,5-BTO为订单构造。用于标识不同的计划环境和计划类型 */
  mpsMode?: string;
  /** 订货点 ^ 采用订货点法时,库存到此数量时,应发出补充订货单。>0 */
  orderPoint?: string;
  /** 订货策略 ^ 取自通用代码ORDER_POLICY_CODE: O-订货点法,M-MRP法,P-周期定货法,J-JIT法。采购该项目时的订货方式的代码,有效订货策略码 */
  orderPolicyCode?: string;
  /** 订货点订货提前期 ^  */
  orderPointLt?: string;
  /** 批量/起订点^有三种含义：1.当采用订货点或固定批量原则时，物料的一次投入数量；2.直接批量法的起订点 >0；3.JIT生产中计算用批量(LOT SIZE)。(不能为零，否则生成MRP时会死循环,但在生成MRP时,如果 <= 0 则置批量 = 1) */
  batchQty?: number;
  /** 批量方针^制造或采购该项目时确定定单数量的原则,采用固定批量时,需要批量字段有效。批量原则为: L-直接批量原则,F-固定批量原则,P-固定周期。直接批量是指投产或采购批量为需求量；固定批量为指投产或采购批量为平均批量的最小倍数 (LOT SIZE POLICY)。 */
  batchQtyPolicy?: string;
  /** 批次合并标记 ^ N-批次内不合并,Y-合并,在BOM采用批次有效性控制时使用 */
  ynBatchLotMerge?: string;
  /** 平均批量^ 物料投产每批的投入量,是生产过程的统计平均值,可以等于固定批量数。只作为估算提前期和粗能力需求用。>0(AVERAGE LOT SIZE)  */
  avgBatchQty?: number;
  /** 批次管理方式 ^ 取自通用代码BATCH_MODE: 1-单件,2-批量。按单件还是批量生产。 */
  batchMode?: string;
  /** 是否独立周转^取自通用代码WO_LEVEL:1-是，2-无效，3-否【SF不生产，是否生成WO】 */
  woLevel?: string;
  /** 配套WO驱动完工 ^  N-配套WO不完工,Y-配套WO完工 */
  ynWoEnd?: string;
  /** 配套标识 ^ Y-配套出库,N-不配套出库 */
  ynPk?: string;
  /** 备料提前期 ^ 采购提前期 */
  alocLt?: string;
  /** 安全提前期 ^  */
  safLt?: string;
  /** 计划不变提前期(天) ^  , 使用的提前期中不随批量大小而变化的部分。定义时为对应平均批量的值 【沈飞叫正常周期】 */
  planCLt?: string;
  /** 计划可变提前期(天) ^  , 使用的提前期中随着批量大小而变化的部分。定义时为对应平均批量值 */
  planVLt?: string;
  /** 理论不变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中不随批量大小而变化的部分。计算时为对应平均批量的值。 */
  theoryCLt?: string;
  /** 理论可变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中随着批量大小而变化的部分。计算时为对应平均批量的值 */
  theoryVLt?: string;
  /** 标准累计提前期 ^  , 标准累计提前期,根据工艺路线使用零件车间子表模块计算得出 */
  stdCumLt?: string;
  /** 累计提前期重算标记 ^  N-不重算,Y-重算。 */
  ynCumLeadTimeRecal?: string;
  /** 是否检验标识 ^ Y-是，N-否 */
  ynCheck?: string;
  /** 检验周期单位 ^ Y-年，Q-季，M-月，T-旬，W-周，D-天 */
  checkPeriodType?: string;
  /** 检验周期 */
  checkPeriod?: number;
  /** 平均材料下料利用率 ^  */
  avgUtlRatio?: string;
  /** 物料废品系数 ^物料本身在制造过程中允许的废品损耗,以小数表示。>=0 (SCRAP RATE) */
  scrapRate?: string;
  /** 检验消耗率 ^ 物料入厂检验过程中的消耗率，以小数表示>=0，default 0 */
  avgCheckValidRatio?: string;
  /** 安全库存量 ^ (SAFETY STOCK)  */
  safetyStock?: string;
  /** 最高库存量 */
  maxStock?: string;
  /** 偏移提前期(天) */
  offsetLt?: string;
  /** 投入产出比 ^ 投入-产出比率--用于毛料和物料号没有分开的企业 */
  manufactureInOutRate?: string;
  /** 库存ABC码 ^ 取值为A/B/C */
  invAbcCode?: string;
  /** 保管特征码 ^ 取自通用代码INV_PROPERTY_CODE: 1-无要求,2-易变形,3-防锈不油封,4-油封,5-配钻 */
  invPropertyCode?: string;
  /** 生产配套/JIT退库是否检验 ^ Y-检验,N-不检验 */
  ynPickUpCheck?: string;
  /** 准许积压期限（天） ^  */
  allowOverstockPeriod?: number;
  /** 底层码 ^  */
  maxLevel?: number;
  /** 最小订货量 ^  */
  indentLeastQty?: string;
  /** 最大采购批量 */
  indentMostQty?: string;
  /** 检验类型 ^ 取自通用代码CHECK_TIME_TYPE: 1-到货检验,2-出库检验,3-移库检验,4-不检验 */
  checkTimeType?: string;
  /** 最长存储期 ^  */
  storageLt?: string;
  /** 选商策略 ^ 取自通用代码PUR_FLOW_FLAG: 1-询价，4-长期协议，5－招投标。采购计划下达后,决定询价比价流程。 --2-维护比价单（系统外询报价），3－直接订货（价格有效时直接进行审批），是询比价的一种特例，停用 */
  purFlowFlag?: string;
  /** 允许外置时间 ^ 时间温度敏感材料 */
  outerTime?: number;
  /** 是否时间温度敏感标记 ^ Y-是 N-否 */
  ynTimeSense?: string;
  /** 是否长周期标记 ^  */
  ynLongPeriod?: string;
  /** 是否使用计件工资 ^ 取自通用代码YN_COST_PIECE: Y-计件,N-计时 */
  ynCostPiece?: string;
  /** 构型 ^ 如901,902等 */
  configNo?: string;
  /** 是否通用 ^ 取自通用代码YN_GENERAL: Y-是,N-否 */
  ynGeneral?: string;
  /** 库存三期定义表ID */
  mdsInvThreePeriodId?: string;
  /** 是否带小编号标识 ^ Y-是,N-否 */
  ynItemSerialNo?: string;
  /** 关联工序配套目录标识 ^ Y-是,N-否 */
  ynRelSeqCatalog?: string;
  /** 检验部门 */
  checkDeptId?: string;
  /** 维修部门  */
  repairDeptId?: string;
  /** 是否易耗  ^ Y-是,N-否 */
  ynConsumable?: string;
  /** 生产厂家 */
  manufactureFactory?: string;
  /** 通端MSJX ^ 工装工具专用 */
  goMsjx?: string;
  /** 通端图纸要求 ^ 工装工具专用 */
  goDrawingRequire?: string;
  /** 止端MSJX ^ 工装工具专用 */
  endMsjx?: string;
  /** 止端图纸要求 ^ 工装工具专用 */
  endDrawingRequire?: string;
  /** 尺寸大小 */
  itemSize?: string;
  /** 材料 */
  material?: string;
  /** 温度要求 */
  temperatureCondition?: string;
  /** 湿度要求 */
  humidityCondition?: string;
  /** 其它存储要求 */
  otherStorageCondition?: string;
  /** 库存三期计算基准 ^ 1-入库日期，2-出厂日期，3-制造日期 */
  threePeriodCalBase?: string;
  /** 复验日期计算类型 ^ 1-固定复验期，2-非固定复验期 */
  recheckDateCalType?: string;
  /** 备注 ^  */
  note?: string;
  /** 材料密度(比重),>0 */
  density?: string;
  /** 纯度、成色 */
  purity?: string;
  /** 是否老化，N-否，Y-是 */
  ynAgeing?: string;
  /** 统一编码 */
  uniqueCode?: string;
  /** 原属主产品型号ID */
  originalProMdsItemId?: string;
  /** 原属主产品型号代码 */
  originalProMdsItemCode?: string;
  /** 是否配套子项 N-否，Y-是 */
  ynChildPk?: string;
  /** 物料分解层级^ 0、生产部分解 1、车间分解 */
  itemBreakLevel?: string;
  /** 是否允许销售, N-否,Y-是 */
  ynSale?: string;
  /** 是否允许海外销售, N-否,Y-是 */
  ynOverseaSale?: string;
  /** 重量计量单位^取值MDS_UNIT.ID */
  mdsWeightUnitId?: string;
  /** 重量（成飞-米重量） */
  weight?: string;
  /** 供应商id */
  mdsVendorId?: string;
  /** 研制状态 */
  developmentStatus?: string;
  /** 技术协议编码 */
  agreeementCode?: string;
  /** 季度赶工周期 */
  quarterLt?: string;
  /** 月度赶工周期   【沈飞扩展，沈飞不区分月度还是季度】 */
  monthlyLt?: string;
  /** 默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 一级品类ID */
  mdsCategoryLv1Id?: string;
  /** 二级品类ID */
  mdsCategoryLv2Id?: string;
  /** 三级品类ID */
  mdsCategoryLv3Id?: string;
  /** 到货接收周期 */
  acceptPeriod?: number;
  /** 产品类型 ^ 1、军机；2、民机；3、其他，引用通用代码PRODUCT_CLASS */
  productClass?: string;
  /** 是否理化试验 */
  isEntrust?: string;
  /** 是否无损检测 */
  isLossless?: string;
  /** 技术标准级别 */
  technicalStandardClass?: string;
  /** 技术标准号 */
  technicalStandardNo?: string;
  /** 密度计量单位 */
  densityUnitId?: string;
  /** 准备周期 */
  prepareLt?: string;
  /** 周转周期 */
  transferLt?: string;
  /** 单件加工周期 */
  processLt?: string;
  /** 结算时间(单位：天) */
  settlementDay?: string;
  /** 结算金额 */
  settlementMoney?: string;
  /** 结算数量 */
  settlementCount?: string;
  /** 计划编制周期 */
  planEditPeriod?: number;
  /** 合同签订周期 */
  contractSignPeriod?: number;
  /** 物料基础码【新增】 */
  mdsItemBasicCode?: string;
  /** 特殊要求【新增】 */
  specialRequirements?: string;
  /** 材料尺寸【新增】 */
  sizeInfo?: string;
  /** 材料长度【新增 */
  materialLength?: string;
  /** 材料宽度【新增】 */
  materialWidth?: string;
  /** 棒料直径【新增】 */
  materialDiameter?: string;
  /** 管料壁厚【新增】 */
  materialWallThickness?: string;
  /** 采购尺寸【新增】 */
  purchaseSize?: string;
  /** 质检方案ID【SFERP项目添加】 */
  pmsCheckTmplId?: string;
  /** 采购计划价格【SFERP项目添加】 */
  itemPlanPrice?: string;
  /** 溢短装比例【SFERP项目添加】 */
  moreOrLess?: string;
  /** 【沈飞扩展】紧急周期 */
  urgencyLt?: string;
  /** 【沈飞扩展】阶段 【取通用代码 FCS_STAGE】 */
  zwKeyPath?: string;
  /** 【沈飞扩展】分组 */
  zwGroup?: string;
  /** 【沈飞扩展】部件 */
  zwComponentCode?: string;
}

/** 获取分页数据 */
export function listMdsItemConfigureByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsItemConfigureDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsItemConfigure (id: string): Promise<ResponseBaseData<MdsItemConfigureDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsItemConfigure (form: MdsItemConfigureDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsItemConfigure (ids: [string]): Promise<ResponseBaseData<any>> {
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
