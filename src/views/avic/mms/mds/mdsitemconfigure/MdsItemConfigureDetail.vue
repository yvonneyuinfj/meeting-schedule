<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="物料ID ^ 取自Mds_Item.Id">
              <a-input v-model:value="form.mdsItemId" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqType" label="需求类型 ^ 取自通用代码FILTER_FLAG: D-相关需求,I-独立需求,B-相关需求和独立需求。指独立需求或相关需求">
              <a-input v-model:value="form.reqType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mpsMode" label="计划类型 ^ 取自通用代码MPS_MODE: 1-MTS为库存生产,2-MTO为订单生产,3-ATO为订单装配,4-ETO为订单设计,5-BTO为订单构造。用于标识不同的计划环境和计划类型">
              <a-input v-model:value="form.mpsMode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderPoint" label="订货点 ^ 采用订货点法时,库存到此数量时,应发出补充订货单。>0">
              <a-input v-model:value="form.orderPoint" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderPolicyCode" label="订货策略 ^ 取自通用代码ORDER_POLICY_CODE: O-订货点法,M-MRP法,P-周期定货法,J-JIT法。采购该项目时的订货方式的代码,有效订货策略码">
              <a-input v-model:value="form.orderPolicyCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderPointLt" label="订货点订货提前期 ^ ">
              <a-input v-model:value="form.orderPointLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchQty" label="批量/起订点^有三种含义：1.当采用订货点或固定批量原则时，物料的一次投入数量；2.直接批量法的起订点 >0；3.JIT生产中计算用批量(LOT SIZE)。(不能为零，否则生成MRP时会死循环,但在生成MRP时,如果 <= 0 则置批量 = 1)">
              <a-input-number
                v-model:value="form.batchQty"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchQtyPolicy" label="批量方针^制造或采购该项目时确定定单数量的原则,采用固定批量时,需要批量字段有效。批量原则为: L-直接批量原则,F-固定批量原则,P-固定周期。直接批量是指投产或采购批量为需求量；固定批量为指投产或采购批量为平均批量的最小倍数 (LOT SIZE POLICY)。">
              <a-input v-model:value="form.batchQtyPolicy" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynBatchLotMerge" label="批次合并标记 ^ N-批次内不合并,Y-合并,在BOM采用批次有效性控制时使用">
              <a-input v-model:value="form.ynBatchLotMerge" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="avgBatchQty" label="平均批量^ 物料投产每批的投入量,是生产过程的统计平均值,可以等于固定批量数。只作为估算提前期和粗能力需求用。>0(AVERAGE LOT SIZE) ">
              <a-input-number
                v-model:value="form.avgBatchQty"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchMode" label="批次管理方式 ^ 取自通用代码BATCH_MODE: 1-单件,2-批量。按单件还是批量生产。">
              <a-input v-model:value="form.batchMode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="woLevel" label="是否独立周转^取自通用代码WO_LEVEL:1-是，2-无效，3-否【SF不生产，是否生成WO】">
              <a-input v-model:value="form.woLevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynWoEnd" label="配套WO驱动完工 ^  N-配套WO不完工,Y-配套WO完工">
              <a-input v-model:value="form.ynWoEnd" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynPk" label="配套标识 ^ Y-配套出库,N-不配套出库">
              <a-input v-model:value="form.ynPk" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="alocLt" label="备料提前期 ^ 采购提前期">
              <a-input v-model:value="form.alocLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="safLt" label="安全提前期 ^ ">
              <a-input v-model:value="form.safLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planCLt" label="计划不变提前期(天) ^  , 使用的提前期中不随批量大小而变化的部分。定义时为对应平均批量的值 【沈飞叫正常周期】">
              <a-input v-model:value="form.planCLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planVLt" label="计划可变提前期(天) ^  , 使用的提前期中随着批量大小而变化的部分。定义时为对应平均批量值">
              <a-input v-model:value="form.planVLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="theoryCLt" label="理论不变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中不随批量大小而变化的部分。计算时为对应平均批量的值。">
              <a-input v-model:value="form.theoryCLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="theoryVLt" label="理论可变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中随着批量大小而变化的部分。计算时为对应平均批量的值">
              <a-input v-model:value="form.theoryVLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stdCumLt" label="标准累计提前期 ^  , 标准累计提前期,根据工艺路线使用零件车间子表模块计算得出">
              <a-input v-model:value="form.stdCumLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynCumLeadTimeRecal" label="累计提前期重算标记 ^  N-不重算,Y-重算。">
              <a-input v-model:value="form.ynCumLeadTimeRecal" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynCheck" label="是否检验标识 ^ Y-是，N-否">
              <a-input v-model:value="form.ynCheck" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkPeriodType" label="检验周期单位 ^ Y-年，Q-季，M-月，T-旬，W-周，D-天">
              <a-input v-model:value="form.checkPeriodType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkPeriod" label="检验周期">
              <a-input-number
                v-model:value="form.checkPeriod"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="avgUtlRatio" label="平均材料下料利用率 ^ ">
              <a-input v-model:value="form.avgUtlRatio" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="scrapRate" label="物料废品系数 ^物料本身在制造过程中允许的废品损耗,以小数表示。>=0 (SCRAP RATE)">
              <a-input v-model:value="form.scrapRate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="avgCheckValidRatio" label="检验消耗率 ^ 物料入厂检验过程中的消耗率，以小数表示>=0，default 0">
              <a-input v-model:value="form.avgCheckValidRatio" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="safetyStock" label="安全库存量 ^ (SAFETY STOCK) ">
              <a-input v-model:value="form.safetyStock" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maxStock" label="最高库存量">
              <a-input v-model:value="form.maxStock" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="offsetLt" label="偏移提前期(天)">
              <a-input v-model:value="form.offsetLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureInOutRate" label="投入产出比 ^ 投入-产出比率--用于毛料和物料号没有分开的企业">
              <a-input v-model:value="form.manufactureInOutRate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invAbcCode" label="库存ABC码 ^ 取值为A/B/C">
              <a-input v-model:value="form.invAbcCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invPropertyCode" label="保管特征码 ^ 取自通用代码INV_PROPERTY_CODE: 1-无要求,2-易变形,3-防锈不油封,4-油封,5-配钻">
              <a-input v-model:value="form.invPropertyCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynPickUpCheck" label="生产配套/JIT退库是否检验 ^ Y-检验,N-不检验">
              <a-input v-model:value="form.ynPickUpCheck" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="allowOverstockPeriod" label="准许积压期限（天） ^ ">
              <a-input-number
                v-model:value="form.allowOverstockPeriod"
min="0"
                :max="9999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maxLevel" label="底层码 ^ ">
              <a-input-number
                v-model:value="form.maxLevel"
min="0"
                :max="9999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="indentLeastQty" label="最小订货量 ^ ">
              <a-input v-model:value="form.indentLeastQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="indentMostQty" label="最大采购批量">
              <a-input v-model:value="form.indentMostQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkTimeType" label="检验类型 ^ 取自通用代码CHECK_TIME_TYPE: 1-到货检验,2-出库检验,3-移库检验,4-不检验">
              <a-input v-model:value="form.checkTimeType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageLt" label="最长存储期 ^ ">
              <a-input v-model:value="form.storageLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purFlowFlag" label="选商策略 ^ 取自通用代码PUR_FLOW_FLAG: 1-询价，4-长期协议，5－招投标。采购计划下达后,决定询价比价流程。 --2-维护比价单（系统外询报价），3－直接订货（价格有效时直接进行审批），是询比价的一种特例，停用">
              <a-input v-model:value="form.purFlowFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outerTime" label="允许外置时间 ^ 时间温度敏感材料">
              <a-input-number
                v-model:value="form.outerTime"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynTimeSense" label="是否时间温度敏感标记 ^ Y-是 N-否">
              <a-input v-model:value="form.ynTimeSense" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynLongPeriod" label="是否长周期标记 ^ ">
              <a-input v-model:value="form.ynLongPeriod" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynCostPiece" label="是否使用计件工资 ^ 取自通用代码YN_COST_PIECE: Y-计件,N-计时">
              <a-input v-model:value="form.ynCostPiece" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="configNo" label="构型 ^ 如901,902等">
              <a-input v-model:value="form.configNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynGeneral" label="是否通用 ^ 取自通用代码YN_GENERAL: Y-是,N-否">
              <a-input v-model:value="form.ynGeneral" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInvThreePeriodId" label="库存三期定义表ID">
              <a-input v-model:value="form.mdsInvThreePeriodId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynItemSerialNo" label="是否带小编号标识 ^ Y-是,N-否">
              <a-input v-model:value="form.ynItemSerialNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynRelSeqCatalog" label="关联工序配套目录标识 ^ Y-是,N-否">
              <a-input v-model:value="form.ynRelSeqCatalog" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkDeptId" label="检验部门">
              <a-input v-model:value="form.checkDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="repairDeptId" label="维修部门 ">
              <a-input v-model:value="form.repairDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynConsumable" label="是否易耗  ^ Y-是,N-否">
              <a-input v-model:value="form.ynConsumable" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactory" label="生产厂家">
              <a-input v-model:value="form.manufactureFactory" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="goMsjx" label="通端MSJX ^ 工装工具专用">
              <a-input v-model:value="form.goMsjx" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="goDrawingRequire" label="通端图纸要求 ^ 工装工具专用">
              <a-input v-model:value="form.goDrawingRequire" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="endMsjx" label="止端MSJX ^ 工装工具专用">
              <a-input v-model:value="form.endMsjx" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="endDrawingRequire" label="止端图纸要求 ^ 工装工具专用">
              <a-input v-model:value="form.endDrawingRequire" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemSize" label="尺寸大小">
              <a-input v-model:value="form.itemSize" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="material" label="材料">
              <a-input v-model:value="form.material" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="temperatureCondition" label="温度要求">
              <a-input v-model:value="form.temperatureCondition" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="humidityCondition" label="湿度要求">
              <a-input v-model:value="form.humidityCondition" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="otherStorageCondition" label="其它存储要求">
              <a-input v-model:value="form.otherStorageCondition" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="threePeriodCalBase" label="库存三期计算基准 ^ 1-入库日期，2-出厂日期，3-制造日期">
              <a-input v-model:value="form.threePeriodCalBase" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckDateCalType" label="复验日期计算类型 ^ 1-固定复验期，2-非固定复验期">
              <a-input v-model:value="form.recheckDateCalType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注 ^ ">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="density" label="材料密度(比重),>0">
              <a-input v-model:value="form.density" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purity" label="纯度、成色">
              <a-input v-model:value="form.purity" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAgeing" label="是否老化，N-否，Y-是">
              <a-input v-model:value="form.ynAgeing" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="uniqueCode" label="统一编码">
              <a-input v-model:value="form.uniqueCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalProMdsItemId" label="原属主产品型号ID">
              <a-input v-model:value="form.originalProMdsItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalProMdsItemCode" label="原属主产品型号代码">
              <a-input v-model:value="form.originalProMdsItemCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynChildPk" label="是否配套子项 N-否，Y-是">
              <a-input v-model:value="form.ynChildPk" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemBreakLevel" label="物料分解层级^ 0、生产部分解 1、车间分解">
              <a-input v-model:value="form.itemBreakLevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynSale" label="是否允许销售, N-否,Y-是">
              <a-input v-model:value="form.ynSale" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOverseaSale" label="是否允许海外销售, N-否,Y-是">
              <a-input v-model:value="form.ynOverseaSale" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsWeightUnitId" label="重量计量单位^取值MDS_UNIT.ID">
              <a-input v-model:value="form.mdsWeightUnitId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="weight" label="重量（成飞-米重量）">
              <a-input v-model:value="form.weight" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsVendorId" label="供应商id">
              <a-input v-model:value="form.mdsVendorId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="developmentStatus" label="研制状态">
              <a-input v-model:value="form.developmentStatus" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="agreeementCode" label="技术协议编码">
              <a-input v-model:value="form.agreeementCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="quarterLt" label="季度赶工周期">
              <a-input v-model:value="form.quarterLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="monthlyLt" label="月度赶工周期   【沈飞扩展，沈飞不区分月度还是季度】">
              <a-input v-model:value="form.monthlyLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in secretLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCategoryLv1Id" label="一级品类ID">
              <a-input v-model:value="form.mdsCategoryLv1Id" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCategoryLv2Id" label="二级品类ID">
              <a-input v-model:value="form.mdsCategoryLv2Id" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCategoryLv3Id" label="三级品类ID">
              <a-input v-model:value="form.mdsCategoryLv3Id" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="acceptPeriod" label="到货接收周期">
              <a-input-number
                v-model:value="form.acceptPeriod"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productClass" label="产品类型 ^ 1、军机；2、民机；3、其他，引用通用代码PRODUCT_CLASS">
              <a-input v-model:value="form.productClass" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isEntrust" label="是否理化试验">
              <a-input v-model:value="form.isEntrust" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isLossless" label="是否无损检测">
              <a-input v-model:value="form.isLossless" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="technicalStandardClass" label="技术标准级别">
              <a-input v-model:value="form.technicalStandardClass" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="technicalStandardNo" label="技术标准号">
              <a-input v-model:value="form.technicalStandardNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="densityUnitId" label="密度计量单位">
              <a-input v-model:value="form.densityUnitId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="prepareLt" label="准备周期">
              <a-input v-model:value="form.prepareLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferLt" label="周转周期">
              <a-input v-model:value="form.transferLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="processLt" label="单件加工周期">
              <a-input v-model:value="form.processLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementDay" label="结算时间(单位：天)">
              <a-input v-model:value="form.settlementDay" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementMoney" label="结算金额">
              <a-input v-model:value="form.settlementMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementCount" label="结算数量">
              <a-input v-model:value="form.settlementCount" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planEditPeriod" label="计划编制周期">
              <a-input-number
                v-model:value="form.planEditPeriod"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contractSignPeriod" label="合同签订周期">
              <a-input-number
                v-model:value="form.contractSignPeriod"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemBasicCode" label="物料基础码【新增】">
              <a-input v-model:value="form.mdsItemBasicCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specialRequirements" label="特殊要求【新增】">
              <a-input v-model:value="form.specialRequirements" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sizeInfo" label="材料尺寸【新增】">
              <a-input v-model:value="form.sizeInfo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialLength" label="材料长度【新增">
              <a-input v-model:value="form.materialLength" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialWidth" label="材料宽度【新增】">
              <a-input v-model:value="form.materialWidth" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialDiameter" label="棒料直径【新增】">
              <a-input v-model:value="form.materialDiameter" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialWallThickness" label="管料壁厚【新增】">
              <a-input v-model:value="form.materialWallThickness" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseSize" label="采购尺寸【新增】">
              <a-input v-model:value="form.purchaseSize" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsCheckTmplId" label="质检方案ID【SFERP项目添加】">
              <a-input v-model:value="form.pmsCheckTmplId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemPlanPrice" label="采购计划价格【SFERP项目添加】">
              <a-input v-model:value="form.itemPlanPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="moreOrLess" label="溢短装比例【SFERP项目添加】">
              <a-input v-model:value="form.moreOrLess" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgencyLt" label="【沈飞扩展】紧急周期">
              <a-input v-model:value="form.urgencyLt" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="zwKeyPath" label="【沈飞扩展】阶段 【取通用代码 FCS_STAGE】">
              <a-input v-model:value="form.zwKeyPath" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="zwGroup" label="【沈飞扩展】分组">
              <a-input v-model:value="form.zwGroup" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="zwComponentCode" label="【沈飞扩展】部件">
              <a-input v-model:value="form.zwComponentCode" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsItemConfigureForm, emits } from './ts/MdsItemConfigureForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  loading,
  secretLevelList,
  closeModal
} = useMdsItemConfigureForm({
  props: props,
  emit: emit
});
</script>


