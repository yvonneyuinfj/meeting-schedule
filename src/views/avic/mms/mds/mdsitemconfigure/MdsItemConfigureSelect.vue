<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料ID ^ 取自Mds_Item.Id">
              <a-input
                v-model:value="queryForm.mdsItemId"
                placeholder="请输入物料ID ^ 取自Mds_Item.Id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求类型 ^ 取自通用代码FILTER_FLAG: D-相关需求,I-独立需求,B-相关需求和独立需求。指独立需求或相关需求">
              <a-input
                v-model:value="queryForm.reqType"
                placeholder="请输入需求类型 ^ 取自通用代码FILTER_FLAG: D-相关需求,I-独立需求,B-相关需求和独立需求。指独立需求或相关需求"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划类型 ^ 取自通用代码MPS_MODE: 1-MTS为库存生产,2-MTO为订单生产,3-ATO为订单装配,4-ETO为订单设计,5-BTO为订单构造。用于标识不同的计划环境和计划类型">
              <a-input
                v-model:value="queryForm.mpsMode"
                placeholder="请输入计划类型 ^ 取自通用代码MPS_MODE: 1-MTS为库存生产,2-MTO为订单生产,3-ATO为订单装配,4-ETO为订单设计,5-BTO为订单构造。用于标识不同的计划环境和计划类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="订货点 ^ 采用订货点法时,库存到此数量时,应发出补充订货单。>0">
              <a-input
                v-model:value="queryForm.orderPoint"
                placeholder="请输入订货点 ^ 采用订货点法时,库存到此数量时,应发出补充订货单。>0"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="订货策略 ^ 取自通用代码ORDER_POLICY_CODE: O-订货点法,M-MRP法,P-周期定货法,J-JIT法。采购该项目时的订货方式的代码,有效订货策略码">
              <a-input
                v-model:value="queryForm.orderPolicyCode"
                placeholder="请输入订货策略 ^ 取自通用代码ORDER_POLICY_CODE: O-订货点法,M-MRP法,P-周期定货法,J-JIT法。采购该项目时的订货方式的代码,有效订货策略码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="订货点订货提前期 ^ ">
              <a-input
                v-model:value="queryForm.orderPointLt"
                placeholder="请输入订货点订货提前期 ^ "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批量方针^制造或采购该项目时确定定单数量的原则,采用固定批量时,需要批量字段有效。批量原则为: L-直接批量原则,F-固定批量原则,P-固定周期。直接批量是指投产或采购批量为需求量；固定批量为指投产或采购批量为平均批量的最小倍数 (LOT SIZE POLICY)。">
              <a-input
                v-model:value="queryForm.batchQtyPolicy"
                placeholder="请输入批量方针^制造或采购该项目时确定定单数量的原则,采用固定批量时,需要批量字段有效。批量原则为: L-直接批量原则,F-固定批量原则,P-固定周期。直接批量是指投产或采购批量为需求量；固定批量为指投产或采购批量为平均批量的最小倍数 (LOT SIZE POLICY)。"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批次合并标记 ^ N-批次内不合并,Y-合并,在BOM采用批次有效性控制时使用">
              <a-input
                v-model:value="queryForm.ynBatchLotMerge"
                placeholder="请输入批次合并标记 ^ N-批次内不合并,Y-合并,在BOM采用批次有效性控制时使用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批次管理方式 ^ 取自通用代码BATCH_MODE: 1-单件,2-批量。按单件还是批量生产。">
              <a-input
                v-model:value="queryForm.batchMode"
                placeholder="请输入批次管理方式 ^ 取自通用代码BATCH_MODE: 1-单件,2-批量。按单件还是批量生产。"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否独立周转^取自通用代码WO_LEVEL:1-是，2-无效，3-否【SF不生产，是否生成WO】">
              <a-input
                v-model:value="queryForm.woLevel"
                placeholder="请输入是否独立周转^取自通用代码WO_LEVEL:1-是，2-无效，3-否【SF不生产，是否生成WO】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="配套WO驱动完工 ^  N-配套WO不完工,Y-配套WO完工">
              <a-input
                v-model:value="queryForm.ynWoEnd"
                placeholder="请输入配套WO驱动完工 ^  N-配套WO不完工,Y-配套WO完工"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="配套标识 ^ Y-配套出库,N-不配套出库">
              <a-input
                v-model:value="queryForm.ynPk"
                placeholder="请输入配套标识 ^ Y-配套出库,N-不配套出库"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备料提前期 ^ 采购提前期">
              <a-input
                v-model:value="queryForm.alocLt"
                placeholder="请输入备料提前期 ^ 采购提前期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="安全提前期 ^ ">
              <a-input
                v-model:value="queryForm.safLt"
                placeholder="请输入安全提前期 ^ "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划不变提前期(天) ^  , 使用的提前期中不随批量大小而变化的部分。定义时为对应平均批量的值 【沈飞叫正常周期】">
              <a-input
                v-model:value="queryForm.planCLt"
                placeholder="请输入计划不变提前期(天) ^  , 使用的提前期中不随批量大小而变化的部分。定义时为对应平均批量的值 【沈飞叫正常周期】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划可变提前期(天) ^  , 使用的提前期中随着批量大小而变化的部分。定义时为对应平均批量值">
              <a-input
                v-model:value="queryForm.planVLt"
                placeholder="请输入计划可变提前期(天) ^  , 使用的提前期中随着批量大小而变化的部分。定义时为对应平均批量值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="理论不变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中不随批量大小而变化的部分。计算时为对应平均批量的值。">
              <a-input
                v-model:value="queryForm.theoryCLt"
                placeholder="请输入理论不变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中不随批量大小而变化的部分。计算时为对应平均批量的值。"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="理论可变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中随着批量大小而变化的部分。计算时为对应平均批量的值">
              <a-input
                v-model:value="queryForm.theoryVLt"
                placeholder="请输入理论可变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中随着批量大小而变化的部分。计算时为对应平均批量的值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="标准累计提前期 ^  , 标准累计提前期,根据工艺路线使用零件车间子表模块计算得出">
              <a-input
                v-model:value="queryForm.stdCumLt"
                placeholder="请输入标准累计提前期 ^  , 标准累计提前期,根据工艺路线使用零件车间子表模块计算得出"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="累计提前期重算标记 ^  N-不重算,Y-重算。">
              <a-input
                v-model:value="queryForm.ynCumLeadTimeRecal"
                placeholder="请输入累计提前期重算标记 ^  N-不重算,Y-重算。"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否检验标识 ^ Y-是，N-否">
              <a-input
                v-model:value="queryForm.ynCheck"
                placeholder="请输入是否检验标识 ^ Y-是，N-否"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验周期单位 ^ Y-年，Q-季，M-月，T-旬，W-周，D-天">
              <a-input
                v-model:value="queryForm.checkPeriodType"
                placeholder="请输入检验周期单位 ^ Y-年，Q-季，M-月，T-旬，W-周，D-天"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="平均材料下料利用率 ^ ">
              <a-input
                v-model:value="queryForm.avgUtlRatio"
                placeholder="请输入平均材料下料利用率 ^ "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料废品系数 ^物料本身在制造过程中允许的废品损耗,以小数表示。>=0 (SCRAP RATE)">
              <a-input
                v-model:value="queryForm.scrapRate"
                placeholder="请输入物料废品系数 ^物料本身在制造过程中允许的废品损耗,以小数表示。>=0 (SCRAP RATE)"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验消耗率 ^ 物料入厂检验过程中的消耗率，以小数表示>=0，default 0">
              <a-input
                v-model:value="queryForm.avgCheckValidRatio"
                placeholder="请输入检验消耗率 ^ 物料入厂检验过程中的消耗率，以小数表示>=0，default 0"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="安全库存量 ^ (SAFETY STOCK) ">
              <a-input
                v-model:value="queryForm.safetyStock"
                placeholder="请输入安全库存量 ^ (SAFETY STOCK) "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最高库存量">
              <a-input
                v-model:value="queryForm.maxStock"
                placeholder="请输入最高库存量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="偏移提前期(天)">
              <a-input
                v-model:value="queryForm.offsetLt"
                placeholder="请输入偏移提前期(天)"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="投入产出比 ^ 投入-产出比率--用于毛料和物料号没有分开的企业">
              <a-input
                v-model:value="queryForm.manufactureInOutRate"
                placeholder="请输入投入产出比 ^ 投入-产出比率--用于毛料和物料号没有分开的企业"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库存ABC码 ^ 取值为A/B/C">
              <a-input
                v-model:value="queryForm.invAbcCode"
                placeholder="请输入库存ABC码 ^ 取值为A/B/C"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="保管特征码 ^ 取自通用代码INV_PROPERTY_CODE: 1-无要求,2-易变形,3-防锈不油封,4-油封,5-配钻">
              <a-input
                v-model:value="queryForm.invPropertyCode"
                placeholder="请输入保管特征码 ^ 取自通用代码INV_PROPERTY_CODE: 1-无要求,2-易变形,3-防锈不油封,4-油封,5-配钻"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生产配套/JIT退库是否检验 ^ Y-检验,N-不检验">
              <a-input
                v-model:value="queryForm.ynPickUpCheck"
                placeholder="请输入生产配套/JIT退库是否检验 ^ Y-检验,N-不检验"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最小订货量 ^ ">
              <a-input
                v-model:value="queryForm.indentLeastQty"
                placeholder="请输入最小订货量 ^ "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最大采购批量">
              <a-input
                v-model:value="queryForm.indentMostQty"
                placeholder="请输入最大采购批量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验类型 ^ 取自通用代码CHECK_TIME_TYPE: 1-到货检验,2-出库检验,3-移库检验,4-不检验">
              <a-input
                v-model:value="queryForm.checkTimeType"
                placeholder="请输入检验类型 ^ 取自通用代码CHECK_TIME_TYPE: 1-到货检验,2-出库检验,3-移库检验,4-不检验"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长存储期 ^ ">
              <a-input
                v-model:value="queryForm.storageLt"
                placeholder="请输入最长存储期 ^ "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="选商策略 ^ 取自通用代码PUR_FLOW_FLAG: 1-询价，4-长期协议，5－招投标。采购计划下达后,决定询价比价流程。 --2-维护比价单（系统外询报价），3－直接订货（价格有效时直接进行审批），是询比价的一种特例，停用">
              <a-input
                v-model:value="queryForm.purFlowFlag"
                placeholder="请输入选商策略 ^ 取自通用代码PUR_FLOW_FLAG: 1-询价，4-长期协议，5－招投标。采购计划下达后,决定询价比价流程。 --2-维护比价单（系统外询报价），3－直接订货（价格有效时直接进行审批），是询比价的一种特例，停用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否时间温度敏感标记 ^ Y-是 N-否">
              <a-input
                v-model:value="queryForm.ynTimeSense"
                placeholder="请输入是否时间温度敏感标记 ^ Y-是 N-否"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否长周期标记 ^ ">
              <a-input
                v-model:value="queryForm.ynLongPeriod"
                placeholder="请输入是否长周期标记 ^ "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否使用计件工资 ^ 取自通用代码YN_COST_PIECE: Y-计件,N-计时">
              <a-input
                v-model:value="queryForm.ynCostPiece"
                placeholder="请输入是否使用计件工资 ^ 取自通用代码YN_COST_PIECE: Y-计件,N-计时"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="构型 ^ 如901,902等">
              <a-input
                v-model:value="queryForm.configNo"
                placeholder="请输入构型 ^ 如901,902等"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否通用 ^ 取自通用代码YN_GENERAL: Y-是,N-否">
              <a-input
                v-model:value="queryForm.ynGeneral"
                placeholder="请输入是否通用 ^ 取自通用代码YN_GENERAL: Y-是,N-否"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库存三期定义表ID">
              <a-input
                v-model:value="queryForm.mdsInvThreePeriodId"
                placeholder="请输入库存三期定义表ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否带小编号标识 ^ Y-是,N-否">
              <a-input
                v-model:value="queryForm.ynItemSerialNo"
                placeholder="请输入是否带小编号标识 ^ Y-是,N-否"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关联工序配套目录标识 ^ Y-是,N-否">
              <a-input
                v-model:value="queryForm.ynRelSeqCatalog"
                placeholder="请输入关联工序配套目录标识 ^ Y-是,N-否"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验部门">
              <a-input
                v-model:value="queryForm.checkDeptId"
                placeholder="请输入检验部门"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="维修部门 ">
              <a-input
                v-model:value="queryForm.repairDeptId"
                placeholder="请输入维修部门 "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否易耗  ^ Y-是,N-否">
              <a-input
                v-model:value="queryForm.ynConsumable"
                placeholder="请输入是否易耗  ^ Y-是,N-否"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生产厂家">
              <a-input
                v-model:value="queryForm.manufactureFactory"
                placeholder="请输入生产厂家"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="通端MSJX ^ 工装工具专用">
              <a-input
                v-model:value="queryForm.goMsjx"
                placeholder="请输入通端MSJX ^ 工装工具专用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="通端图纸要求 ^ 工装工具专用">
              <a-input
                v-model:value="queryForm.goDrawingRequire"
                placeholder="请输入通端图纸要求 ^ 工装工具专用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="止端MSJX ^ 工装工具专用">
              <a-input
                v-model:value="queryForm.endMsjx"
                placeholder="请输入止端MSJX ^ 工装工具专用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="止端图纸要求 ^ 工装工具专用">
              <a-input
                v-model:value="queryForm.endDrawingRequire"
                placeholder="请输入止端图纸要求 ^ 工装工具专用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="尺寸大小">
              <a-input
                v-model:value="queryForm.itemSize"
                placeholder="请输入尺寸大小"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料">
              <a-input
                v-model:value="queryForm.material"
                placeholder="请输入材料"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="温度要求">
              <a-input
                v-model:value="queryForm.temperatureCondition"
                placeholder="请输入温度要求"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="湿度要求">
              <a-input
                v-model:value="queryForm.humidityCondition"
                placeholder="请输入湿度要求"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="其它存储要求">
              <a-input
                v-model:value="queryForm.otherStorageCondition"
                placeholder="请输入其它存储要求"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库存三期计算基准 ^ 1-入库日期，2-出厂日期，3-制造日期">
              <a-input
                v-model:value="queryForm.threePeriodCalBase"
                placeholder="请输入库存三期计算基准 ^ 1-入库日期，2-出厂日期，3-制造日期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="复验日期计算类型 ^ 1-固定复验期，2-非固定复验期">
              <a-input
                v-model:value="queryForm.recheckDateCalType"
                placeholder="请输入复验日期计算类型 ^ 1-固定复验期，2-非固定复验期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注 ^ ">
              <a-input
                v-model:value="queryForm.note"
                placeholder="请输入备注 ^ "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料密度(比重),>0">
              <a-input
                v-model:value="queryForm.density"
                placeholder="请输入材料密度(比重),>0"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="纯度、成色">
              <a-input
                v-model:value="queryForm.purity"
                placeholder="请输入纯度、成色"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否老化，N-否，Y-是">
              <a-input
                v-model:value="queryForm.ynAgeing"
                placeholder="请输入是否老化，N-否，Y-是"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="统一编码">
              <a-input
                v-model:value="queryForm.uniqueCode"
                placeholder="请输入统一编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="原属主产品型号ID">
              <a-input
                v-model:value="queryForm.originalProMdsItemId"
                placeholder="请输入原属主产品型号ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="原属主产品型号代码">
              <a-input
                v-model:value="queryForm.originalProMdsItemCode"
                placeholder="请输入原属主产品型号代码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否配套子项 N-否，Y-是">
              <a-input
                v-model:value="queryForm.ynChildPk"
                placeholder="请输入是否配套子项 N-否，Y-是"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料分解层级^ 0、生产部分解 1、车间分解">
              <a-input
                v-model:value="queryForm.itemBreakLevel"
                placeholder="请输入物料分解层级^ 0、生产部分解 1、车间分解"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否允许销售, N-否,Y-是">
              <a-input
                v-model:value="queryForm.ynSale"
                placeholder="请输入是否允许销售, N-否,Y-是"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否允许海外销售, N-否,Y-是">
              <a-input
                v-model:value="queryForm.ynOverseaSale"
                placeholder="请输入是否允许海外销售, N-否,Y-是"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="重量计量单位^取值MDS_UNIT.ID">
              <a-input
                v-model:value="queryForm.mdsWeightUnitId"
                placeholder="请输入重量计量单位^取值MDS_UNIT.ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="重量（成飞-米重量）">
              <a-input
                v-model:value="queryForm.weight"
                placeholder="请输入重量（成飞-米重量）"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供应商id">
              <a-input
                v-model:value="queryForm.mdsVendorId"
                placeholder="请输入供应商id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="研制状态">
              <a-input
                v-model:value="queryForm.developmentStatus"
                placeholder="请输入研制状态"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术协议编码">
              <a-input
                v-model:value="queryForm.agreeementCode"
                placeholder="请输入技术协议编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="季度赶工周期">
              <a-input
                v-model:value="queryForm.quarterLt"
                placeholder="请输入季度赶工周期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="月度赶工周期   【沈飞扩展，沈飞不区分月度还是季度】">
              <a-input
                v-model:value="queryForm.monthlyLt"
                placeholder="请输入月度赶工周期   【沈飞扩展，沈飞不区分月度还是季度】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL"
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
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="一级品类ID">
              <a-input
                v-model:value="queryForm.mdsCategoryLv1Id"
                placeholder="请输入一级品类ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="二级品类ID">
              <a-input
                v-model:value="queryForm.mdsCategoryLv2Id"
                placeholder="请输入二级品类ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="三级品类ID">
              <a-input
                v-model:value="queryForm.mdsCategoryLv3Id"
                placeholder="请输入三级品类ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="产品类型 ^ 1、军机；2、民机；3、其他，引用通用代码PRODUCT_CLASS">
              <a-input
                v-model:value="queryForm.productClass"
                placeholder="请输入产品类型 ^ 1、军机；2、民机；3、其他，引用通用代码PRODUCT_CLASS"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否理化试验">
              <a-input
                v-model:value="queryForm.isEntrust"
                placeholder="请输入是否理化试验"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否无损检测">
              <a-input
                v-model:value="queryForm.isLossless"
                placeholder="请输入是否无损检测"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术标准级别">
              <a-input
                v-model:value="queryForm.technicalStandardClass"
                placeholder="请输入技术标准级别"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术标准号">
              <a-input
                v-model:value="queryForm.technicalStandardNo"
                placeholder="请输入技术标准号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密度计量单位">
              <a-input
                v-model:value="queryForm.densityUnitId"
                placeholder="请输入密度计量单位"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="准备周期">
              <a-input
                v-model:value="queryForm.prepareLt"
                placeholder="请输入准备周期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="周转周期">
              <a-input
                v-model:value="queryForm.transferLt"
                placeholder="请输入周转周期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单件加工周期">
              <a-input
                v-model:value="queryForm.processLt"
                placeholder="请输入单件加工周期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结算时间(单位：天)">
              <a-input
                v-model:value="queryForm.settlementDay"
                placeholder="请输入结算时间(单位：天)"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结算金额">
              <a-input
                v-model:value="queryForm.settlementMoney"
                placeholder="请输入结算金额"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结算数量">
              <a-input
                v-model:value="queryForm.settlementCount"
                placeholder="请输入结算数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料基础码【新增】">
              <a-input
                v-model:value="queryForm.mdsItemBasicCode"
                placeholder="请输入物料基础码【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="特殊要求【新增】">
              <a-input
                v-model:value="queryForm.specialRequirements"
                placeholder="请输入特殊要求【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料尺寸【新增】">
              <a-input
                v-model:value="queryForm.sizeInfo"
                placeholder="请输入材料尺寸【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料长度【新增">
              <a-input
                v-model:value="queryForm.materialLength"
                placeholder="请输入材料长度【新增"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料宽度【新增】">
              <a-input
                v-model:value="queryForm.materialWidth"
                placeholder="请输入材料宽度【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="棒料直径【新增】">
              <a-input
                v-model:value="queryForm.materialDiameter"
                placeholder="请输入棒料直径【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="管料壁厚【新增】">
              <a-input
                v-model:value="queryForm.materialWallThickness"
                placeholder="请输入管料壁厚【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="采购尺寸【新增】">
              <a-input
                v-model:value="queryForm.purchaseSize"
                placeholder="请输入采购尺寸【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质检方案ID【SFERP项目添加】">
              <a-input
                v-model:value="queryForm.pmsCheckTmplId"
                placeholder="请输入质检方案ID【SFERP项目添加】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="采购计划价格【SFERP项目添加】">
              <a-input
                v-model:value="queryForm.itemPlanPrice"
                placeholder="请输入采购计划价格【SFERP项目添加】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="溢短装比例【SFERP项目添加】">
              <a-input
                v-model:value="queryForm.moreOrLess"
                placeholder="请输入溢短装比例【SFERP项目添加】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="【沈飞扩展】紧急周期">
              <a-input
                v-model:value="queryForm.urgencyLt"
                placeholder="请输入【沈飞扩展】紧急周期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="【沈飞扩展】阶段 【取通用代码 FCS_STAGE】">
              <a-input
                v-model:value="queryForm.zwKeyPath"
                placeholder="请输入【沈飞扩展】阶段 【取通用代码 FCS_STAGE】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="【沈飞扩展】分组">
              <a-input
                v-model:value="queryForm.zwGroup"
                placeholder="请输入【沈飞扩展】分组"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="【沈飞扩展】部件">
              <a-input
                v-model:value="queryForm.zwComponentCode"
                placeholder="请输入【沈飞扩展】部件"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined />
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined />
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced" />
                  <down-outlined v-else />
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="mdsItemConfigureSelect"
        table-key="mdsItemConfigureSelect"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :show-table-setting="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        :customRow="customRow"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入物料ID ^ 取自Mds_Item.Id或需求类型 ^ 取自通用代码FILTER_FLAG: D-相关需求,I-独立需求,B-相关需求和独立需求。指独立需求或相关需求"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { MdsItemConfigureDto } from '@/api/avic/mms/mds/MdsItemConfigureApi'; // 引入模块DTO
import { listMdsItemConfigureByPage } from '@/api/avic/mms/mds/MdsItemConfigureApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const mdsItemConfigureSelect = ref();
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '物料ID ^ 取自Mds_Item.Id',
    dataIndex: 'mdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求类型 ^ 取自通用代码FILTER_FLAG: D-相关需求,I-独立需求,B-相关需求和独立需求。指独立需求或相关需求',
    dataIndex: 'reqType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划类型 ^ 取自通用代码MPS_MODE: 1-MTS为库存生产,2-MTO为订单生产,3-ATO为订单装配,4-ETO为订单设计,5-BTO为订单构造。用于标识不同的计划环境和计划类型',
    dataIndex: 'mpsMode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订货点 ^ 采用订货点法时,库存到此数量时,应发出补充订货单。>0',
    dataIndex: 'orderPoint',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订货策略 ^ 取自通用代码ORDER_POLICY_CODE: O-订货点法,M-MRP法,P-周期定货法,J-JIT法。采购该项目时的订货方式的代码,有效订货策略码',
    dataIndex: 'orderPolicyCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订货点订货提前期 ^ ',
    dataIndex: 'orderPointLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批量/起订点^有三种含义：1.当采用订货点或固定批量原则时，物料的一次投入数量；2.直接批量法的起订点 >0；3.JIT生产中计算用批量(LOT SIZE)。(不能为零，否则生成MRP时会死循环,但在生成MRP时,如果 <= 0 则置批量 = 1)',
    dataIndex: 'batchQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '批量方针^制造或采购该项目时确定定单数量的原则,采用固定批量时,需要批量字段有效。批量原则为: L-直接批量原则,F-固定批量原则,P-固定周期。直接批量是指投产或采购批量为需求量；固定批量为指投产或采购批量为平均批量的最小倍数 (LOT SIZE POLICY)。',
    dataIndex: 'batchQtyPolicy',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批次合并标记 ^ N-批次内不合并,Y-合并,在BOM采用批次有效性控制时使用',
    dataIndex: 'ynBatchLotMerge',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '平均批量^ 物料投产每批的投入量,是生产过程的统计平均值,可以等于固定批量数。只作为估算提前期和粗能力需求用。>0(AVERAGE LOT SIZE) ',
    dataIndex: 'avgBatchQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '批次管理方式 ^ 取自通用代码BATCH_MODE: 1-单件,2-批量。按单件还是批量生产。',
    dataIndex: 'batchMode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否独立周转^取自通用代码WO_LEVEL:1-是，2-无效，3-否【SF不生产，是否生成WO】',
    dataIndex: 'woLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '配套WO驱动完工 ^  N-配套WO不完工,Y-配套WO完工',
    dataIndex: 'ynWoEnd',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '配套标识 ^ Y-配套出库,N-不配套出库',
    dataIndex: 'ynPk',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备料提前期 ^ 采购提前期',
    dataIndex: 'alocLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '安全提前期 ^ ',
    dataIndex: 'safLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划不变提前期(天) ^  , 使用的提前期中不随批量大小而变化的部分。定义时为对应平均批量的值 【沈飞叫正常周期】',
    dataIndex: 'planCLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划可变提前期(天) ^  , 使用的提前期中随着批量大小而变化的部分。定义时为对应平均批量值',
    dataIndex: 'planVLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '理论不变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中不随批量大小而变化的部分。计算时为对应平均批量的值。',
    dataIndex: 'theoryCLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '理论可变提前期(天) ^  , 根据工艺路线给定的工时数据计算得出的提前期中随着批量大小而变化的部分。计算时为对应平均批量的值',
    dataIndex: 'theoryVLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '标准累计提前期 ^  , 标准累计提前期,根据工艺路线使用零件车间子表模块计算得出',
    dataIndex: 'stdCumLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '累计提前期重算标记 ^  N-不重算,Y-重算。',
    dataIndex: 'ynCumLeadTimeRecal',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否检验标识 ^ Y-是，N-否',
    dataIndex: 'ynCheck',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验周期单位 ^ Y-年，Q-季，M-月，T-旬，W-周，D-天',
    dataIndex: 'checkPeriodType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验周期',
    dataIndex: 'checkPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '平均材料下料利用率 ^ ',
    dataIndex: 'avgUtlRatio',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料废品系数 ^物料本身在制造过程中允许的废品损耗,以小数表示。>=0 (SCRAP RATE)',
    dataIndex: 'scrapRate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验消耗率 ^ 物料入厂检验过程中的消耗率，以小数表示>=0，default 0',
    dataIndex: 'avgCheckValidRatio',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '安全库存量 ^ (SAFETY STOCK) ',
    dataIndex: 'safetyStock',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '最高库存量',
    dataIndex: 'maxStock',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '偏移提前期(天)',
    dataIndex: 'offsetLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '投入产出比 ^ 投入-产出比率--用于毛料和物料号没有分开的企业',
    dataIndex: 'manufactureInOutRate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库存ABC码 ^ 取值为A/B/C',
    dataIndex: 'invAbcCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保管特征码 ^ 取自通用代码INV_PROPERTY_CODE: 1-无要求,2-易变形,3-防锈不油封,4-油封,5-配钻',
    dataIndex: 'invPropertyCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生产配套/JIT退库是否检验 ^ Y-检验,N-不检验',
    dataIndex: 'ynPickUpCheck',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '准许积压期限（天） ^ ',
    dataIndex: 'allowOverstockPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '底层码 ^ ',
    dataIndex: 'maxLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '最小订货量 ^ ',
    dataIndex: 'indentLeastQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '最大采购批量',
    dataIndex: 'indentMostQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验类型 ^ 取自通用代码CHECK_TIME_TYPE: 1-到货检验,2-出库检验,3-移库检验,4-不检验',
    dataIndex: 'checkTimeType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '最长存储期 ^ ',
    dataIndex: 'storageLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '选商策略 ^ 取自通用代码PUR_FLOW_FLAG: 1-询价，4-长期协议，5－招投标。采购计划下达后,决定询价比价流程。 --2-维护比价单（系统外询报价），3－直接订货（价格有效时直接进行审批），是询比价的一种特例，停用',
    dataIndex: 'purFlowFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '允许外置时间 ^ 时间温度敏感材料',
    dataIndex: 'outerTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '是否时间温度敏感标记 ^ Y-是 N-否',
    dataIndex: 'ynTimeSense',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否长周期标记 ^ ',
    dataIndex: 'ynLongPeriod',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否使用计件工资 ^ 取自通用代码YN_COST_PIECE: Y-计件,N-计时',
    dataIndex: 'ynCostPiece',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '构型 ^ 如901,902等',
    dataIndex: 'configNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否通用 ^ 取自通用代码YN_GENERAL: Y-是,N-否',
    dataIndex: 'ynGeneral',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库存三期定义表ID',
    dataIndex: 'mdsInvThreePeriodId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否带小编号标识 ^ Y-是,N-否',
    dataIndex: 'ynItemSerialNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关联工序配套目录标识 ^ Y-是,N-否',
    dataIndex: 'ynRelSeqCatalog',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验部门',
    dataIndex: 'checkDeptId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '维修部门 ',
    dataIndex: 'repairDeptId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否易耗  ^ Y-是,N-否',
    dataIndex: 'ynConsumable',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生产厂家',
    dataIndex: 'manufactureFactory',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '通端MSJX ^ 工装工具专用',
    dataIndex: 'goMsjx',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '通端图纸要求 ^ 工装工具专用',
    dataIndex: 'goDrawingRequire',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '止端MSJX ^ 工装工具专用',
    dataIndex: 'endMsjx',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '止端图纸要求 ^ 工装工具专用',
    dataIndex: 'endDrawingRequire',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '尺寸大小',
    dataIndex: 'itemSize',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料',
    dataIndex: 'material',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '温度要求',
    dataIndex: 'temperatureCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '湿度要求',
    dataIndex: 'humidityCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '其它存储要求',
    dataIndex: 'otherStorageCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库存三期计算基准 ^ 1-入库日期，2-出厂日期，3-制造日期',
    dataIndex: 'threePeriodCalBase',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '复验日期计算类型 ^ 1-固定复验期，2-非固定复验期',
    dataIndex: 'recheckDateCalType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注 ^ ',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料密度(比重),>0',
    dataIndex: 'density',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '纯度、成色',
    dataIndex: 'purity',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否老化，N-否，Y-是',
    dataIndex: 'ynAgeing',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '统一编码',
    dataIndex: 'uniqueCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原属主产品型号ID',
    dataIndex: 'originalProMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原属主产品型号代码',
    dataIndex: 'originalProMdsItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否配套子项 N-否，Y-是',
    dataIndex: 'ynChildPk',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料分解层级^ 0、生产部分解 1、车间分解',
    dataIndex: 'itemBreakLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否允许销售, N-否,Y-是',
    dataIndex: 'ynSale',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否允许海外销售, N-否,Y-是',
    dataIndex: 'ynOverseaSale',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '重量计量单位^取值MDS_UNIT.ID',
    dataIndex: 'mdsWeightUnitId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '重量（成飞-米重量）',
    dataIndex: 'weight',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商id',
    dataIndex: 'mdsVendorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '研制状态',
    dataIndex: 'developmentStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术协议编码',
    dataIndex: 'agreeementCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '季度赶工周期',
    dataIndex: 'quarterLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '月度赶工周期   【沈飞扩展，沈飞不区分月度还是季度】',
    dataIndex: 'monthlyLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '一级品类ID',
    dataIndex: 'mdsCategoryLv1Id',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '二级品类ID',
    dataIndex: 'mdsCategoryLv2Id',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '三级品类ID',
    dataIndex: 'mdsCategoryLv3Id',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '到货接收周期',
    dataIndex: 'acceptPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '产品类型 ^ 1、军机；2、民机；3、其他，引用通用代码PRODUCT_CLASS',
    dataIndex: 'productClass',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否理化试验',
    dataIndex: 'isEntrust',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否无损检测',
    dataIndex: 'isLossless',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术标准级别',
    dataIndex: 'technicalStandardClass',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术标准号',
    dataIndex: 'technicalStandardNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密度计量单位',
    dataIndex: 'densityUnitId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '准备周期',
    dataIndex: 'prepareLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '周转周期',
    dataIndex: 'transferLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '单件加工周期',
    dataIndex: 'processLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '结算时间(单位：天)',
    dataIndex: 'settlementDay',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '结算金额',
    dataIndex: 'settlementMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '结算数量',
    dataIndex: 'settlementCount',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划编制周期',
    dataIndex: 'planEditPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '合同签订周期',
    dataIndex: 'contractSignPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '物料基础码【新增】',
    dataIndex: 'mdsItemBasicCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '特殊要求【新增】',
    dataIndex: 'specialRequirements',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料尺寸【新增】',
    dataIndex: 'sizeInfo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料长度【新增',
    dataIndex: 'materialLength',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料宽度【新增】',
    dataIndex: 'materialWidth',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '棒料直径【新增】',
    dataIndex: 'materialDiameter',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '管料壁厚【新增】',
    dataIndex: 'materialWallThickness',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购尺寸【新增】',
    dataIndex: 'purchaseSize',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质检方案ID【SFERP项目添加】',
    dataIndex: 'pmsCheckTmplId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购计划价格【SFERP项目添加】',
    dataIndex: 'itemPlanPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '溢短装比例【SFERP项目添加】',
    dataIndex: 'moreOrLess',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '【沈飞扩展】紧急周期',
    dataIndex: 'urgencyLt',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '【沈飞扩展】阶段 【取通用代码 FCS_STAGE】',
    dataIndex: 'zwKeyPath',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '【沈飞扩展】分组',
    dataIndex: 'zwGroup',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '【沈飞扩展】部件',
    dataIndex: 'zwComponentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    visible: false,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<MdsItemConfigureDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const  totalPage = ref(0);
const secretLevelList = ref([]); // 默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listMdsItemConfigureByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    mdsItemId: value,
    reqType: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  // 传出选中项
  $emit('select', selectedRows.value);
}
/** 表格排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 行双击事件 */
function customRow (record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
</script>

