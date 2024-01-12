<template>
  <AvicSplit horizontal>
    <AvicPane size="65">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm" :colon="false">
            <a-row :gutter="16">
              <!-- <a-col v-bind="colLayout.cols">
                <a-form-item label="设备大类">
                  <a-input
                    v-model:value="queryForm.tpmAssetClassId"
                    placeholder="请选择资产大类表ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                  <AvicTreeSelect
                    v-model:value="queryForm.tpmAssetClassId"
                    baseUrl="/mms/tpm/tpmassetclasss"
                    :allowSelectNonIsLeaf="false"
                    @pressEnter="handleQuery"
                  ></AvicTreeSelect>
                </a-form-item> 
              </a-col>-->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产大类名称">
                  <a-input
                    v-model:value="queryForm.className"
                    placeholder="请输入资产大类名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产大类编码">
                  <a-input
                    v-model:value="queryForm.classCode"
                    placeholder="请输入资产大类编码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col> -->

              <a-col v-bind="colLayout.cols">
                <a-form-item label="资产编号">
                  <a-input
                    v-model:value="queryForm.assetsCode"
                    placeholder="请输入资产编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="设备编号">
                  <a-input
                    v-model:value="queryForm.equipmentCode"
                    placeholder="请输入设备编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="设备名称">
                  <a-input
                    v-model:value="queryForm.equipmentName"
                    placeholder="请输入设备名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备类型">
                  <a-select
                    v-model:value="queryForm.equipmentType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择设备类型"
                  >
                    <a-select-option
                      v-for="item in equipmentTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备规格">
                  <a-input
                    v-model:value="queryForm.specs"
                    placeholder="请输入设备规格"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备型号">
                  <a-input
                    v-model:value="queryForm.model"
                    placeholder="请输入设备型号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备重量（kg）">
                  <a-input
                    v-model:value="queryForm.weight"
                    placeholder="请输入设备重量（kg）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商ID">
                  <a-input
                    v-model:value="queryForm.mdsVendorId"
                    placeholder="请输入供应商ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商名称【冗余设计】">
                  <a-input
                    v-model:value="queryForm.mdsVendorName"
                    placeholder="请输入供应商名称【冗余设计】"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="生产厂家ID">
                  <a-input
                    v-model:value="queryForm.manufactureFactoryId"
                    placeholder="请输入生产厂家ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="生产厂家名称">
                  <a-input
                    v-model:value="queryForm.manufactureFactoryName"
                    placeholder="请输入生产厂家名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="生产国别">
                  <a-input
                    v-model:value="queryForm.manufactureFactoryCountry"
                    placeholder="请输入生产国别"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="出厂编号">
                  <a-input
                    v-model:value="queryForm.leaveFactoryNo"
                    placeholder="请输入出厂编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="出厂时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.leaveFactoryDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择出厂时间(起)"
                    :disabled-date="
                      startValue =>
                        proxy.$disabledStartDate(startValue, queryForm.leaveFactoryDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="出厂时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.leaveFactoryDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择出厂时间(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.leaveFactoryDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="投产时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.commissionDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择投产时间(起)"
                    :disabled-date="
                      startValue =>
                        proxy.$disabledStartDate(startValue, queryForm.commissionDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="投产时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.commissionDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择投产时间(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.commissionDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="入账时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.recordDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择入账时间(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.recordDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="入账时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.recordDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择入账时间(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.recordDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="使用部门ID">
                  <a-input
                    v-model:value="queryForm.useDeptId"
                    placeholder="请输入使用部门ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="使用部门NAME">
                  <a-input
                    v-model:value="queryForm.useDeptName"
                    placeholder="请输入使用部门NAME"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="数量">
                  <a-input
                    v-model:value="queryForm.qty"
                    placeholder="请输入数量"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="计量单位名称">
                  <a-input
                    v-model:value="queryForm.mdsUnitName"
                    placeholder="请输入计量单位名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="责任人ID">
                  <a-input
                    v-model:value="queryForm.responseUserId"
                    placeholder="请输入责任人ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="责任人NAME">
                  <a-input
                    v-model:value="queryForm.responseUserName"
                    placeholder="请输入责任人NAME"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="原值(元)">
                  <a-input
                    v-model:value="queryForm.originalValue"
                    placeholder="请输入原值(元)"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="质保日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.qaDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择质保日期(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.qaDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="质保日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.qaDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择质保日期(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.qaDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备级别，ABCD分类">
                  <a-select
                    v-model:value="queryForm.abcdType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择设备级别，ABCD分类"
                  >
                    <a-select-option
                      v-for="item in abcdTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="购置日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.purchaseDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择购置日期(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.purchaseDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="购置日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.purchaseDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择购置日期(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.purchaseDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="存放地点">
                  <a-input
                    v-model:value="queryForm.storageLocation"
                    placeholder="请输入存放地点"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="机械复杂系数">
                  <a-input
                    v-model:value="queryForm.machineComplexRate"
                    placeholder="请输入机械复杂系数"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="电气复杂系数">
                  <a-input
                    v-model:value="queryForm.electricComplexRate"
                    placeholder="请输入电气复杂系数"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备功率（kW）">
                  <a-input
                    v-model:value="queryForm.equipmentPower"
                    placeholder="请输入设备功率（kW）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否关键独生子">
                  <a-select
                    v-model:value="queryForm.keyOnlyChildFlag"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否关键独生子"
                  >
                    <a-select-option
                      v-for="item in keyOnlyChildFlagList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="车牌号">
                  <a-input
                    v-model:value="queryForm.plateNumber"
                    placeholder="请输入车牌号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="油箱大小（L）">
                  <a-input
                    v-model:value="queryForm.tankSize"
                    placeholder="请输入油箱大小（L）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="上次检定日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.lastVerificationDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择上次检定日期(起)"
                    :disabled-date="
                      startValue =>
                        proxy.$disabledStartDate(startValue, queryForm.lastVerificationDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="上次检定日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.lastVerificationDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择上次检定日期(止)"
                    :disabled-date="
                      endValue =>
                        proxy.$disabledEndDate(endValue, queryForm.lastVerificationDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资金来源">
                  <a-input
                    v-model:value="queryForm.capitalSource"
                    placeholder="请输入资金来源"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="数控分类">
                  <a-select
                    v-model:value="queryForm.cncType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择数控分类"
                  >
                    <a-select-option
                      v-for="item in cncTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="数控控制系统">
                  <a-input
                    v-model:value="queryForm.cncCtrlSystem"
                    placeholder="请输入数控控制系统"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备状态">
                  <a-select
                    v-model:value="queryForm.equipmentStatus"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择设备状态"
                  >
                    <a-select-option
                      v-for="item in equipmentStatusList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产状态">
                  <a-select
                    v-model:value="queryForm.assetsStatus"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择资产状态"
                  >
                    <a-select-option
                      v-for="item in assetsStatusList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否进口">
                  <a-select
                    v-model:value="queryForm.ynEntrance"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否进口"
                  >
                    <a-select-option
                      v-for="item in ynEntranceList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="报废日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.wasteDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择报废日期(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.wasteDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="报废日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.wasteDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择报废日期(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.wasteDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>

              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="备注">
                  <a-input
                    v-model:value="queryForm.note"
                    placeholder="请输入备注"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="数据密级">
                  <a-select
                    v-model:value="queryForm.secretLevel"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择数据密级"
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
                <a-form-item label="净值(元)">
                  <a-input
                    v-model:value="queryForm.netValue"
                    placeholder="请输入净值(元)"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="累计折旧值">
                  <a-input
                    v-model:value="queryForm.depreciationValue"
                    placeholder="请输入累计折旧值"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否军工关键设备">
                  <a-select
                    v-model:value="queryForm.ynMilitaryKeyEquip"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否军工关键设备"
                  >
                    <a-select-option
                      v-for="item in ynMilitaryKeyEquipList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="原因，可以是各种原因，作废原因、报废原因、拆除原因等">
                  <a-input
                    v-model:value="queryForm.reason"
                    placeholder="请输入原因，可以是各种原因，作废原因、报废原因、拆除原因等"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备区域表ID">
                  <a-input
                    v-model:value="queryForm.tpmAreaId"
                    placeholder="请输入设备区域表ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="区域名称">
                  <a-input
                    v-model:value="queryForm.areaName"
                    placeholder="请输入区域名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="调拨记录">
                  <a-input
                    v-model:value="queryForm.transferRecord"
                    placeholder="请输入调拨记录"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是转固，通用代码：PLATFORM_YES_NO_FLAG^ Y是，N否">
                  <a-select
                    v-model:value="queryForm.ynFixed"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是转固，通用代码：PLATFORM_YES_NO_FLAG^ Y是，N否"
                  >
                    <a-select-option
                      v-for="item in ynFixedList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="检定单位">
                  <a-input
                    v-model:value="queryForm.checkDeptName"
                    placeholder="请输入检定单位"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备外文名称">
                  <a-input
                    v-model:value="queryForm.equipmentForeignName"
                    placeholder="请输入设备外文名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产类别">
                  <a-select
                    v-model:value="queryForm.assetType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择资产类别"
                  >
                    <a-select-option
                      v-for="item in assetTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产分管人员ID">
                  <a-input
                    v-model:value="queryForm.assetManageUserId"
                    placeholder="请输入资产分管人员ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产分管人员名称">
                  <a-input
                    v-model:value="queryForm.assetManageUserName"
                    placeholder="请输入资产分管人员名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产用途">
                  <a-select
                    v-model:value="queryForm.assetsUse"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择资产用途"
                  >
                    <a-select-option
                      v-for="item in assetsUseList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="安装运杂费">
                  <a-input
                    v-model:value="queryForm.otherCost"
                    placeholder="请输入安装运杂费"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="财务凭证号">
                  <a-input
                    v-model:value="queryForm.voucherNo"
                    placeholder="请输入财务凭证号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="燃料种类">
                  <a-input
                    v-model:value="queryForm.fuelType"
                    placeholder="请输入燃料种类"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="外廓尺寸">
                  <a-input
                    v-model:value="queryForm.outlineSize"
                    placeholder="请输入外廓尺寸"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="车身颜色">
                  <a-input
                    v-model:value="queryForm.carColor"
                    placeholder="请输入车身颜色"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="车架号">
                  <a-input
                    v-model:value="queryForm.vinNo"
                    placeholder="请输入车架号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="发动机号码">
                  <a-input
                    v-model:value="queryForm.engineNo"
                    placeholder="请输入发动机号码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="发动机型号">
                  <a-input
                    v-model:value="queryForm.engineModel"
                    placeholder="请输入发动机型号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="订单号">
                  <a-input
                    v-model:value="queryForm.orderNo"
                    placeholder="请输入订单号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="发票号">
                  <a-input
                    v-model:value="queryForm.invoiceNo"
                    placeholder="请输入发票号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="批复文号">
                  <a-input
                    v-model:value="queryForm.documentNo"
                    placeholder="请输入批复文号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="对应试验器">
                  <a-input
                    v-model:value="queryForm.equipmentNo"
                    placeholder="请输入对应试验器"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="登记号">
                  <a-input
                    v-model:value="queryForm.registrationNo"
                    placeholder="请输入登记号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="验收日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.acceptanceDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择验收日期(起)"
                    :disabled-date="
                      startValue =>
                        proxy.$disabledStartDate(startValue, queryForm.acceptanceDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="验收日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.acceptanceDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择验收日期(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.acceptanceDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备性能/主要技术指标">
                  <a-input
                    v-model:value="queryForm.equipmentPerformance"
                    placeholder="请输入设备性能/主要技术指标"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="技术资料">
                  <a-input
                    v-model:value="queryForm.technicalInfo"
                    placeholder="请输入技术资料"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="载货（吨）">
                  <a-input
                    v-model:value="queryForm.carryCargo"
                    placeholder="请输入载货（吨）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="移交项目类别">
                  <a-select
                    v-model:value="queryForm.transferProjectType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择移交项目类别"
                  >
                    <a-select-option
                      v-for="item in transferProjectTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="移交转固表ID">
                  <a-input
                    v-model:value="queryForm.tpmTransferFixedBillId"
                    placeholder="请输入移交转固表ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否保养">
                  <a-select
                    v-model:value="queryForm.ynMaintain"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否保养"
                  >
                    <a-select-option
                      v-for="item in ynMaintainList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="资产分管单位ID">
                  <a-input
                    v-model:value="queryForm.assetManageDeptId"
                    placeholder="请输入资产分管单位ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否调拨">
                  <a-select
                    v-model:value="queryForm.ynTransferRecord"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否调拨"
                  >
                    <a-select-option
                      v-for="item in ynTransferRecordList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="调拨时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.transferRecordDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择调拨时间(起)"
                    :disabled-date="
                      startValue =>
                        proxy.$disabledStartDate(startValue, queryForm.transferRecordDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="调拨时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.transferRecordDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择调拨时间(止)"
                    :disabled-date="
                      endValue =>
                        proxy.$disabledEndDate(endValue, queryForm.transferRecordDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备分管单位ID">
                  <a-input
                    v-model:value="queryForm.equipmentManageDeptId"
                    placeholder="请输入设备分管单位ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="用途">
                  <a-select
                    v-model:value="queryForm.equipmentUse"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择用途"
                  >
                    <a-select-option
                      v-for="item in equipmentUseList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="军工关键设备专用代码">
                  <a-input
                    v-model:value="queryForm.militaryKeyEquipCode"
                    placeholder="请输入军工关键设备专用代码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否瓶颈设备">
                  <a-select
                    v-model:value="queryForm.ynBottleneckEquipment"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否瓶颈设备"
                  >
                    <a-select-option
                      v-for="item in ynBottleneckEquipmentList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="能效">
                  <a-select
                    v-model:value="queryForm.energyEfficiency"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择能效"
                  >
                    <a-select-option
                      v-for="item in energyEfficiencyList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备序列号">
                  <a-input
                    v-model:value="queryForm.equipmentSerialNumber"
                    placeholder="请输入设备序列号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="硬盘序列号">
                  <a-input
                    v-model:value="queryForm.hdSerialNumber"
                    placeholder="请输入硬盘序列号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="操作系统安装时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.systemInstallDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择操作系统安装时间(起)"
                    :disabled-date="
                      startValue =>
                        proxy.$disabledStartDate(startValue, queryForm.systemInstallDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="操作系统安装时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.systemInstallDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择操作系统安装时间(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.systemInstallDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="存储介质类型">
                  <a-input
                    v-model:value="queryForm.storageType"
                    placeholder="请输入存储介质类型"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="存储介质序列号">
                  <a-input
                    v-model:value="queryForm.storageMediaSerialNumber"
                    placeholder="请输入存储介质序列号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="存储介质编号">
                  <a-input
                    v-model:value="queryForm.storageMediaCode"
                    placeholder="请输入存储介质编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="存储介质名称">
                  <a-input
                    v-model:value="queryForm.storageMediaName"
                    placeholder="请输入存储介质名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="联网设备IP地址">
                  <a-input
                    v-model:value="queryForm.ipAddress"
                    placeholder="请输入联网设备IP地址"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="特种设备注册代码">
                  <a-input
                    v-model:value="queryForm.registrationCode"
                    placeholder="请输入特种设备注册代码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否年检">
                  <a-select
                    v-model:value="queryForm.ynAnnualInspection"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否年检"
                  >
                    <a-select-option
                      v-for="item in ynAnnualInspectionList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="物料表ID">
                  <a-input
                    v-model:value="queryForm.mdsItemId"
                    placeholder="请输入物料表ID"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col> -->
              <a-col v-bind="colLayout.cols" style="margin-left: auto">
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
            ref="tpmInventory"
            table-key="tpmInventory"
            :columns="columns"
            :row-key="record => record.id"
            :data-source="list"
            :loading="loading"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 40,
              fixed: true
            }"
            :pageParameter="queryParam.pageParameter"
            :total="totalPage"
            rowClickSelectionType="radio"
            @change="handleTableChange"
            @refresh="getList"
          >
            <template #toolBarLeft>
              <a-space>
                <a-button
                  v-hasPermi="['tpmInventory:add']"
                  title="添加"
                  type="primary"
                  @click="handleAdd"
                >
                  <template #icon>
                    <plus-outlined />
                  </template>
                  添加
                </a-button>
                <a-button
                  v-hasPermi="['tpmInventory:del']"
                  title="删除"
                  danger
                  :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                  :loading="delLoading"
                  @click="handleDelete(selectedRowKeys, '')"
                >
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
                <a-button
                  v-hasPermi="['tpmInventory:import']"
                  title="导入"
                  type="primary"
                  ghost
                  @click="handleImport"
                >
                  <template #icon>
                    <import-outlined />
                  </template>
                  导入
                </a-button>
                <a-button
                  v-hasPermi="['tpmInventory:export']"
                  title="导出"
                  type="primary"
                  ghost
                  @click="handleExport"
                >
                  <template #icon>
                    <export-outlined />
                  </template>
                  导出
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-input-search
                class="opt-btn-commonsearch"
                style="width: 250px"
                placeholder="请输入设备编号或设备名称"
                :allow-clear="true"
                @search="handleKeyWordQuery"
              />
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'equipmentCode'">
                <a @click="handleDetail(record)">
                  {{ record.equipmentCode }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'creationDate'">
                {{ $dayjs(record.creationDate).format('YYYY-MM-DD') }}
              </template>
              <template v-else-if="column.dataIndex === 'action'">
                <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['tpmInventory:del']"
                  type="link"
                  class="inner-btn"
                  @click.stop="handleDelete([record.id], 'row')"
                >
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <tpm-inventory-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <tpm-inventory-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <tpm-inventory-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="模板导入"
        importUrl="/mms/tpm/tpminventorys/importData/JD/v1"
        downloadTemplateUrl="/mms/tpm/tpminventorys/downloadTemplate/JD/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
    </AvicPane>
    <AvicPane collapsible="bottom" height="150px">
      <!-- 子表组件 -->
      <tpm-inventory-property-manage
        key="tpmInventoryPropertyManage"
        ref="tpmInventoryPropertyManage"
        :mainId="mainId"
      />
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { TpmInventoryDto } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块DTO
import {
  listTpmInventoryByPage,
  listTpmInventoryByPageType,
  delTpmInventory,
  exportExcel
} from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块API
import TpmInventoryAdd from './TpmInventoryAdd.vue'; // 引入添加页面组件
import TpmInventoryEdit from './TpmInventoryEdit.vue'; // 引入编辑页面组件
import TpmInventoryDetail from './TpmInventoryDetail.vue'; // 引入详情页面组件
import TpmInventoryPropertyManage from '../tpminventoryproperty/TpmInventoryPropertyManage.vue'; // 引入子表页面组件
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '90px' },
  wrapperCol: { flex: '1' }
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
  // {
  //   title: '物料表ID',
  //   dataIndex: 'mdsItemId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '设备大类',
    dataIndex: 'className',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产编号',
    dataIndex: 'assetsCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产属性',
    dataIndex: 'assetAttributeName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '设备大类',
  //   dataIndex: 'tpmAssetClassId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },

  // {
  //   title: '设备大类编码',
  //   dataIndex: 'classCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },

  {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备类型',
    dataIndex: 'equipmentTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '对应试验器',
    dataIndex: 'equipmentNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '特种设备注册代码',
    dataIndex: 'registrationCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否年检',
    dataIndex: 'ynAnnualInspectionName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '生产厂家',
    dataIndex: 'manufactureFactoryName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商',
    dataIndex: 'mdsVendorName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厂家国别',
    dataIndex: 'manufactureFactoryCountry',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂编号',
    dataIndex: 'leaveFactoryNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂日期',
    dataIndex: 'leaveFactoryDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备级别',
    dataIndex: 'abcdTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '使用部门ID',
  //   dataIndex: 'useDeptId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '使用部门',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '责任人ID',
  //   dataIndex: 'responseUserId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '责任人',
    dataIndex: 'responseUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '购置日期',
    dataIndex: 'purchaseDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '原值(元)',
    dataIndex: 'originalValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '净值(元)',
    dataIndex: 'netValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '累计折旧',
    dataIndex: 'depreciationValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '启用时间',
    dataIndex: 'recordDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '投产时间',
    dataIndex: 'commissionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '质保期',
    dataIndex: 'qaDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '管理部门',
  //   dataIndex: 'equipmentManageDeptId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '管理部门',
    dataIndex: 'attribute02',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否军工关键设备',
    dataIndex: 'ynMilitaryKeyEquipName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否军工重大专用资产',
    dataIndex: 'ynMajorAssetsName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '军工关键设备专用代码',
    dataIndex: 'militaryKeyEquipCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否瓶颈设备',
    dataIndex: 'ynBottleneckEquipmentName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '能效',
    dataIndex: 'energyEfficiencyName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  
  // {
  //   title: '设备区域',
  //   dataIndex: 'tpmAreaId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '设备区域',
    dataIndex: 'areaName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'storageLocation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资金来源',
    dataIndex: 'capitalSourceName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备状态',
    dataIndex: 'equipmentStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否保养',
    dataIndex: 'ynMaintainName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否进口',
    dataIndex: 'ynEntranceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否调拨',
    dataIndex: 'ynTransferRecordName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '调拨时间',
    dataIndex: 'transferRecordDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '调拨记录',
    dataIndex: 'transferRecord',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '报废日期',
    dataIndex: 'wasteDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '创建人',
    dataIndex: 'attribute01',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'creationDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },

  // {
  //   title: '设备重量（kg）',
  //   dataIndex: 'weight',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '供应商ID',
  //   dataIndex: 'mdsVendorId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '供应商名称【冗余设计】',
  //   dataIndex: 'mdsVendorName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '生产厂家ID',
  //   dataIndex: 'manufactureFactoryId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },

  // {
  //   title: '数量',
  //   dataIndex: 'qty',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '计量单位名称',
  //   dataIndex: 'mdsUnitName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '机械复杂系数',
  //   dataIndex: 'machineComplexRate',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '电气复杂系数',
  //   dataIndex: 'electricComplexRate',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '设备功率（kW）',
  //   dataIndex: 'equipmentPower',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '电机台数',
  //   dataIndex: 'motorQty',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'right'
  // },
  // {
  //   title: '是否关键独生子',
  //   dataIndex: 'keyOnlyChildFlagName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '车牌号',
  //   dataIndex: 'plateNumber',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '油箱大小（L）',
  //   dataIndex: 'tankSize',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '检定周期（月）',
  //   dataIndex: 'verificationCycle',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'right'
  // },
  // {
  //   title: '上次检定日期',
  //   dataIndex: 'lastVerificationDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },

  // {
  //   title: '数控分类',
  //   dataIndex: 'cncTypeName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '数控控制系统',
  //   dataIndex: 'cncCtrlSystem',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '资产状态',
  //   dataIndex: 'assetsStatusName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'note',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '原因，可以是各种原因，作废原因、报废原因、拆除原因等',
  //   dataIndex: 'reason',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '是转固，通用代码：PLATFORM_YES_NO_FLAG^ Y是，N否',
  //   dataIndex: 'ynFixedName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '使用年限',
  //   dataIndex: 'useTime',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'right'
  // },
  // {
  //   title: '检定单位',
  //   dataIndex: 'checkDeptName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '设备外文名称',
  //   dataIndex: 'equipmentForeignName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '资产类别',
  //   dataIndex: 'assetTypeName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '资产分管人员ID',
  //   dataIndex: 'assetManageUserId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '资产分管人员名称',
  //   dataIndex: 'assetManageUserName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '资产用途',
  //   dataIndex: 'assetsUseName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '安装运杂费',
  //   dataIndex: 'otherCost',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '财务凭证号',
  //   dataIndex: 'voucherNo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '燃料种类',
  //   dataIndex: 'fuelType',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '外廓尺寸',
  //   dataIndex: 'outlineSize',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '车身颜色',
  //   dataIndex: 'carColor',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '车架号',
  //   dataIndex: 'vinNo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '发动机号码',
  //   dataIndex: 'engineNo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '发动机型号',
  //   dataIndex: 'engineModel',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '订单号',
  //   dataIndex: 'orderNo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '发票号',
  //   dataIndex: 'invoiceNo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '批复文号',
  //   dataIndex: 'documentNo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },

  // {
  //   title: '登记号',
  //   dataIndex: 'registrationNo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '验收日期',
  //   dataIndex: 'acceptanceDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '设备性能/主要技术指标',
  //   dataIndex: 'equipmentPerformance',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '技术资料',
  //   dataIndex: 'technicalInfo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '载货（吨）',
  //   dataIndex: 'carryCargo',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '载人数量',
  //   dataIndex: 'passengersNum',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'right'
  // },
  // {
  //   title: '移交项目类别',
  //   dataIndex: 'transferProjectTypeName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '移交转固表ID',
  //   dataIndex: 'tpmTransferFixedBillId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },

  // {
  //   title: '资产分管单位ID',
  //   dataIndex: 'assetManageDeptId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },

  // {
  //   title: '用途',
  //   dataIndex: 'equipmentUseName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '设备序列号',
  //   dataIndex: 'equipmentSerialNumber',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '硬盘序列号',
  //   dataIndex: 'hdSerialNumber',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '操作系统安装时间',
  //   dataIndex: 'systemInstallDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '存储介质类型',
  //   dataIndex: 'storageType',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '存储介质序列号',
  //   dataIndex: 'storageMediaSerialNumber',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '存储介质编号',
  //   dataIndex: 'storageMediaCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '存储介质名称',
  //   dataIndex: 'storageMediaName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '联网设备IP地址',
  //   dataIndex: 'ipAddress',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<TpmInventoryDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm.value
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmInventory' }); // 必填参数tableName全局唯一，与tableKey保持一致
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const equipmentTypeList = ref([]); // 设备类型通用代码
const abcdTypeList = ref([]); // 设备级别，ABCD分类通用代码
const keyOnlyChildFlagList = ref([]); // 是否关键独生子通用代码
const cncTypeList = ref([]); // 数控分类通用代码
const equipmentStatusList = ref([]); // 设备状态通用代码
const assetsStatusList = ref([]); // 资产状态通用代码
const ynEntranceList = ref([]); // 是否进口通用代码
const secretLevelList = ref([]); // 数据密级通用代码
const ynMilitaryKeyEquipList = ref([]); // 是否军工关键设备通用代码
const ynFixedList = ref([]); // 是转固，通用代码：PLATFORM_YES_NO_FLAG^ Y是，N否通用代码
const assetTypeList = ref([]); // 资产类别通用代码
const assetsUseList = ref([]); // 资产用途通用代码
const transferProjectTypeList = ref([]); // 移交项目类别通用代码
const ynMaintainList = ref([]); // 是否保养通用代码
const ynTransferRecordList = ref([]); // 是否调拨通用代码
const equipmentUseList = ref([]); // 用途通用代码
const ynBottleneckEquipmentList = ref([]); // 是否瓶颈设备通用代码
const energyEfficiencyList = ref([]); // 能效通用代码
const ynAnnualInspectionList = ref([]); // 是否年检通用代码
const capitalSourceList = ref([]); // 资金来源通用代码
const lookupParams = [
  { fieldName: 'equipmentType', lookUpType: 'TPM_EQUIPMENT_TYPE' },
  { fieldName: 'abcdType', lookUpType: 'TPM_ABCD_TYPE' },
  { fieldName: 'keyOnlyChildFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'cncType', lookUpType: 'TPM_CNC_TYPE' },
  { fieldName: 'equipmentStatus', lookUpType: 'TPM_EQUIPMENT_STATUS' },
  { fieldName: 'assetsStatus', lookUpType: 'TPM_ASSETS_STATUS' },
  { fieldName: 'ynEntrance', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynFixed', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'assetType', lookUpType: 'TPM_ASSET_TYPE' },
  { fieldName: 'assetsUse', lookUpType: 'TPM_ASSETS_USE' },
  { fieldName: 'transferProjectType', lookUpType: 'TPM_TRANSFER_PROJECT_TYPE' },
  { fieldName: 'ynMaintain', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynTransferRecord', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'equipmentUse', lookUpType: 'TPM_EQUIPMENT_USE' },
  { fieldName: 'ynBottleneckEquipment', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'energyEfficiency', lookUpType: 'TPM_ENERGY_EFFICIENCY' },
  { fieldName: 'ynAnnualInspection', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'capitalSource', lookUpType: 'TPM_CAPITAL_SOURCE' }
];
watchEffect(() => {
    if (equipmentTypeList.value.length > 0) {
      equipmentTypeList.value = equipmentTypeList.value.filter(item => item.lookupCode != 10 && item.lookupCode != 15);
    }
  });

// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  if (proxy.$getLoginUser().entityDeptCode !== 'C410'){
    queryParam.searchParams.useDeptId = proxy.$getLoginUser().entityDeptId;
  }
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmInventoryByPageType(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      // 设置表格初始选中项
      if (list.value.length > 0) {
        selectedRowKeys.value = [list.value[0]['id']];
      } else {
        selectedRowKeys.value = [];
      }
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}
/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    equipmentTypeList.value = result.equipmentType;
    abcdTypeList.value = result.abcdType;
    keyOnlyChildFlagList.value = result.keyOnlyChildFlag;
    cncTypeList.value = result.cncType;
    equipmentStatusList.value = result.equipmentStatus;
    assetsStatusList.value = result.assetsStatus;
    ynEntranceList.value = result.ynEntrance;
    ynMilitaryKeyEquipList.value = result.ynMilitaryKeyEquip;
    ynFixedList.value = result.ynFixed;
    assetTypeList.value = result.assetType;
    assetsUseList.value = result.assetsUse;
    transferProjectTypeList.value = result.transferProjectType;
    ynMaintainList.value = result.ynMaintain;
    ynTransferRecordList.value = result.ynTransferRecord;
    equipmentUseList.value = result.equipmentUse;
    ynBottleneckEquipmentList.value = result.ynBottleneckEquipment;
    energyEfficiencyList.value = result.energyEfficiency;
    ynAnnualInspectionList.value = result.ynAnnualInspection;
    capitalSourceList.value = result.capitalSource;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级搜索按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询重置按钮操作  */
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
    equipmentCode: value,
    equipmentName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详情 */
function handleDetail(record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 导入 */
function handleImport() {
  showImportModal.value = true;
}
/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}
/** 删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '已选数据及关联的子表'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmInventory(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
            getList();
          }
          delLoading.value = false;
        })
        .catch(() => {
          delLoading.value = false;
        });
    }
  });
}
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
function handleTableChange(pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
</script>

