<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="单据来源 ^ R-原材料,C-成品">
              <a-select
                v-model:value="queryForm.billSource"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择单据来源 ^ R-原材料,C-成品"
              >
                <a-select-option
                  v-for="item in billSourceList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料ID">
              <a-input
                v-model:value="queryForm.mdsItemId"
                placeholder="请输入物料ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料号【冗余设计】">
              <a-input
                v-model:value="queryForm.mdsItemCode"
                placeholder="请输入物料号【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料名称 【冗余设计】">
              <a-input
                v-model:value="queryForm.mdsItemName"
                placeholder="请输入物料名称 【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="牌号【冗余设计】">
              <a-input
                v-model:value="queryForm.marque"
                placeholder="请输入牌号【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="规格【冗余设计】">
              <a-input
                v-model:value="queryForm.specs"
                placeholder="请输入规格【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术条件【冗余设计】">
              <a-input
                v-model:value="queryForm.techCondition"
                placeholder="请输入技术条件【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="交货状态【冗余设计】">
              <a-input
                v-model:value="queryForm.deliveryStatus"
                placeholder="请输入交货状态【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房ID">
              <a-input
                v-model:value="queryForm.mdsInventoryId"
                placeholder="请输入库房ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库位ID">
              <a-input
                v-model:value="queryForm.mdsLocatorId"
                placeholder="请输入库位ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库位号【冗余设计】">
              <a-input
                v-model:value="queryForm.mdsLocatorNo"
                placeholder="请输入库位号【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="当前期段期初库存数量">
              <a-input
                v-model:value="queryForm.currentInitInvQty"
                placeholder="请输入当前期段期初库存数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="当前期段累计入库数量">
              <a-input
                v-model:value="queryForm.currentSumupInQty"
                placeholder="请输入当前期段累计入库数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="当前期段累计出库数量">
              <a-input
                v-model:value="queryForm.currentSumupOutQty"
                placeholder="请输入当前期段累计出库数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="当前期段累计调整数量">
              <a-input
                v-model:value="queryForm.currentSumupAdjustQty"
                placeholder="请输入当前期段累计调整数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结存数量 ^ 结存数量=新进数量+现存数量+占用数量+分配数量">
              <a-input
                v-model:value="queryForm.currentOnhandQty"
                placeholder="请输入结存数量 ^ 结存数量=新进数量+现存数量+占用数量+分配数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="新进数量^未使用过的数量，结存数量包含新进数量">
              <a-input
                v-model:value="queryForm.unusedOnhandQty"
                placeholder="请输入新进数量^未使用过的数量，结存数量包含新进数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="占用数量">
              <a-input
                v-model:value="queryForm.engagedQty"
                placeholder="请输入占用数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="分配数量">
              <a-input
                v-model:value="queryForm.allocatedQty"
                placeholder="请输入分配数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入库日期(起)">
              <a-date-picker
                v-model:value="queryForm.inventoryDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择入库日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.inventoryDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入库日期(止)">
              <a-date-picker
                v-model:value="queryForm.inventoryDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择入库日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.inventoryDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库存状态 ^“1-正常，0-冻结，2-异常">
              <a-select
                v-model:value="queryForm.inventoryStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择库存状态 ^“1-正常，0-冻结，2-异常"
              >
                <a-select-option
                  v-for="item in inventoryStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="创建事务ID^取Wms_Item_Transaction.Id用于记录创建该台账的入库事务">
              <a-input
                v-model:value="queryForm.createWmsItemTransactionId"
                placeholder="请输入创建事务ID^取Wms_Item_Transaction.Id用于记录创建该台账的入库事务"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入库部门ID^取自SYS_DEPT.Id用于记录创建该台账的事务的业务所属部门">
              <a-input
                v-model:value="queryForm.inDeptId"
                placeholder="请输入入库部门ID^取自SYS_DEPT.Id用于记录创建该台账的事务的业务所属部门"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入库部门编码">
              <a-input
                v-model:value="queryForm.inDeptCode"
                placeholder="请输入入库部门编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入库部门名称">
              <a-input
                v-model:value="queryForm.inDeptName"
                placeholder="请输入入库部门名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="建账人ID">
              <a-input
                v-model:value="queryForm.createdUserId"
                placeholder="请输入建账人ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="建账人编码">
              <a-input
                v-model:value="queryForm.createdUserCode"
                placeholder="请输入建账人编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="建账人姓名">
              <a-input
                v-model:value="queryForm.createdUserName"
                placeholder="请输入建账人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="建账日期(起)">
              <a-date-picker
                v-model:value="queryForm.createdDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择建账日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.createdDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="建账日期(止)">
              <a-date-picker
                v-model:value="queryForm.createdDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择建账日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.createdDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划价">
              <a-input
                v-model:value="queryForm.plannedPrice"
                placeholder="请输入计划价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出厂日期(起)">
              <a-date-picker
                v-model:value="queryForm.leaveFactoryDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.leaveFactoryDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出厂日期(止)">
              <a-date-picker
                v-model:value="queryForm.leaveFactoryDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.leaveFactoryDateBegin)"
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
            <a-form-item label="封装方式代码">
              <a-input
                v-model:value="queryForm.envelopCode"
                placeholder="请输入封装方式代码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封装日期(起)">
              <a-date-picker
                v-model:value="queryForm.envelopDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封装日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.envelopDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封装日期(止)">
              <a-date-picker
                v-model:value="queryForm.envelopDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封装日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.envelopDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计量单位^">
              <a-input
                v-model:value="queryForm.mdsUnitId"
                placeholder="请输入计量单位^"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等">
              <a-input
                v-model:value="queryForm.qualityCode"
                placeholder="请输入质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供方合格证号">
              <a-input
                v-model:value="queryForm.supplyCertificationNo"
                placeholder="请输入供方合格证号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目编号">
              <a-input
                v-model:value="queryForm.projectNo"
                placeholder="请输入项目编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同号">
              <a-input
                v-model:value="queryForm.orderNo"
                placeholder="请输入合同号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供应商ID">
              <a-input
                v-model:value="queryForm.srmVendorId"
                placeholder="请输入供应商ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户ID">
              <a-input
                v-model:value="queryForm.crmCustomerId"
                placeholder="请输入客户ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="任务序列号">
              <a-input
                v-model:value="queryForm.foNo"
                placeholder="请输入任务序列号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="产品ID">
              <a-input
                v-model:value="queryForm.proMdsItemId"
                placeholder="请输入产品ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="产品号【冗余设计】">
              <a-input
                v-model:value="queryForm.proMdsItemCode"
                placeholder="请输入产品号【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="父件ID">
              <a-input
                v-model:value="queryForm.parentMdsItemId"
                placeholder="请输入父件ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="制造日期(起)">
              <a-date-picker
                v-model:value="queryForm.manufactoryDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择制造日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.manufactoryDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="制造日期(止)">
              <a-date-picker
                v-model:value="queryForm.manufactoryDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择制造日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.manufactoryDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开单日期(起)">
              <a-date-picker
                v-model:value="queryForm.billingDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开单日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.billingDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开单日期(止)">
              <a-date-picker
                v-model:value="queryForm.billingDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开单日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.billingDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="本次油封日期(起)">
              <a-date-picker
                v-model:value="queryForm.oilSealDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择本次油封日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.oilSealDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="本次油封日期(止)">
              <a-date-picker
                v-model:value="queryForm.oilSealDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择本次油封日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.oilSealDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下次油封日期(起)">
              <a-date-picker
                v-model:value="queryForm.nextOilSealDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下次油封日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.nextOilSealDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下次油封日期(止)">
              <a-date-picker
                v-model:value="queryForm.nextOilSealDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下次油封日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.nextOilSealDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="本次复验日期(起)">
              <a-date-picker
                v-model:value="queryForm.recheckDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择本次复验日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.recheckDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="本次复验日期(止)">
              <a-date-picker
                v-model:value="queryForm.recheckDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择本次复验日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.recheckDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下次复验日期(起)">
              <a-date-picker
                v-model:value="queryForm.nextRecheckDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下次复验日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.nextRecheckDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下次复验日期(止)">
              <a-date-picker
                v-model:value="queryForm.nextRecheckDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下次复验日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.nextRecheckDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长保管日期(起)">
              <a-date-picker
                v-model:value="queryForm.storageDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.storageDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长保管日期(止)">
              <a-date-picker
                v-model:value="queryForm.storageDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.storageDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="架次">
              <a-input
                v-model:value="queryForm.lotNo"
                placeholder="请输入架次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="炉号">
              <a-input
                v-model:value="queryForm.stoveNo"
                placeholder="请输入炉号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批号">
              <a-input
                v-model:value="queryForm.batchNo"
                placeholder="请输入批号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="派工号">
              <a-input
                v-model:value="queryForm.missionNo"
                placeholder="请输入派工号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="货币类型 ^ 实际价的货币类型,继承合同中的货币类型">
              <a-input
                v-model:value="queryForm.currencyType"
                placeholder="请输入货币类型 ^ 实际价的货币类型,继承合同中的货币类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="不含税合同单价">
              <a-input
                v-model:value="queryForm.inPrice"
                placeholder="请输入不含税合同单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="含税合同单价">
              <a-input
                v-model:value="queryForm.arrivalUnitPrice"
                placeholder="请输入含税合同单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合格证ID ^ 厂内检验合格后的合格证ID">
              <a-input
                v-model:value="queryForm.qcCertificationId"
                placeholder="请输入合格证ID ^ 厂内检验合格后的合格证ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合格证号 ^ 厂内检验合格后的合格证编号">
              <a-input
                v-model:value="queryForm.certificationNo"
                placeholder="请输入合格证号 ^ 厂内检验合格后的合格证编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验单ID">
              <a-input
                v-model:value="queryForm.qcCheckBillId"
                placeholder="请输入检验单ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="交付车间ID">
              <a-input
                v-model:value="queryForm.deliveryDeptId"
                placeholder="请输入交付车间ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="交付车间编码">
              <a-input
                v-model:value="queryForm.deliveryDeptCode"
                placeholder="请输入交付车间编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="交付车间名称">
              <a-input
                v-model:value="queryForm.deliveryDeptName"
                placeholder="请输入交付车间名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
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
            <a-form-item label="使用部门编码">
              <a-input
                v-model:value="queryForm.useDeptCode"
                placeholder="请输入使用部门编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="使用部门名称">
              <a-input
                v-model:value="queryForm.useDeptName"
                placeholder="请输入使用部门名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="件号">
              <a-input
                v-model:value="queryForm.itemSerialNo"
                placeholder="请输入件号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="构型号">
              <a-input
                v-model:value="queryForm.configNo"
                placeholder="请输入构型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
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
            <a-form-item label="冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中">
              <a-select
                v-model:value="queryForm.lockReason"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中"
              >
                <a-select-option
                  v-for="item in lockReasonList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="异常原因 ^1-复验不合格，2-超最长保管期">
              <a-select
                v-model:value="queryForm.abnormalReason"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择异常原因 ^1-复验不合格，2-超最长保管期"
              >
                <a-select-option
                  v-for="item in abnormalReasonList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划价金额">
              <a-input
                v-model:value="queryForm.plannedMoney"
                placeholder="请输入计划价金额"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="不含合同税金额">
              <a-input
                v-model:value="queryForm.inMoney"
                placeholder="请输入不含合同税金额"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="含税合同金额">
              <a-input
                v-model:value="queryForm.arrivalMoney"
                placeholder="请输入含税合同金额"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户类型ID">
              <a-input
                v-model:value="queryForm.mdsCustomerTypeId"
                placeholder="请输入客户类型ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="分工路线主表ID">
              <a-input
                v-model:value="queryForm.mdsWorkLineId"
                placeholder="请输入分工路线主表ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="分工路线">
              <a-input
                v-model:value="queryForm.mdsWorkLine"
                placeholder="请输入分工路线"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合格标记 Y合格，X限用，N不合格,0 无效">
              <a-select
                v-model:value="queryForm.certificationFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择合格标记 Y合格，X限用，N不合格,0 无效"
              >
                <a-select-option
                  v-for="item in certificationFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="熔炼号">
              <a-input
                v-model:value="queryForm.smeltNo"
                placeholder="请输入熔炼号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用">
              <a-select
                v-model:value="queryForm.useLimit"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用"
              >
                <a-select-option
                  v-for="item in useLimitList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料类型【冗余设计】">
              <a-input
                v-model:value="queryForm.mdsItemType"
                placeholder="请输入物料类型【冗余设计】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 ^ 通用代码MMS_DATA_SECRET_LEVEL"
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
            <a-form-item label="锭节号">
              <a-input
                v-model:value="queryForm.spindleSegmentNo"
                placeholder="请输入锭节号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料账本号">
              <a-input
                v-model:value="queryForm.materialAccountNo"
                placeholder="请输入材料账本号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效保管期--暂时作废该字段(起)">
              <a-date-picker
                v-model:value="queryForm.validStorageDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期--暂时作废该字段(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.validStorageDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效保管期--暂时作废该字段(止)">
              <a-date-picker
                v-model:value="queryForm.validStorageDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期--暂时作废该字段(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.validStorageDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料账本号ID">
              <a-input
                v-model:value="queryForm.materialAccountId"
                placeholder="请输入材料账本号ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料尺寸">
              <a-input
                v-model:value="queryForm.materialSize"
                placeholder="请输入材料尺寸"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否限用 YN_flag Y是 ,N 否">
              <a-select
                v-model:value="queryForm.confineFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否限用 YN_flag Y是 ,N 否"
              >
                <a-select-option
                  v-for="item in confineFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用型号">
              <a-input
                v-model:value="queryForm.confineProduct"
                placeholder="请输入限用型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用批次">
              <a-input
                v-model:value="queryForm.confineBatch"
                placeholder="请输入限用批次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用架次">
              <a-input
                v-model:value="queryForm.confineLot"
                placeholder="请输入限用架次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用说明">
              <a-input
                v-model:value="queryForm.confineDesc"
                placeholder="请输入限用说明"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="材料状态 1 标准料 ，2 下料中 ，3 余料">
              <a-select
                v-model:value="queryForm.materialStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择材料状态 1 标准料 ，2 下料中 ，3 余料"
              >
                <a-select-option
                  v-for="item in materialStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="原始材料状态，用以记录站点领料出库前的材料状态，为余料退库登账后还原“材料状态”字段值服务">
              <a-input
                v-model:value="queryForm.originalMaterialStatus"
                placeholder="请输入原始材料状态，用以记录站点领料出库前的材料状态，为余料退库登账后还原“材料状态”字段值服务"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="采购入库单件数量">
              <a-input
                v-model:value="queryForm.itemQty"
                placeholder="请输入采购入库单件数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批次">
              <a-input
                v-model:value="queryForm.batchNumber"
                placeholder="请输入批次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="长度">
              <a-input
                v-model:value="queryForm.length"
                placeholder="请输入长度"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="宽度">
              <a-input
                v-model:value="queryForm.width"
                placeholder="请输入宽度"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="厚度1">
              <a-input
                v-model:value="queryForm.thickness1"
                placeholder="请输入厚度1"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="厚度2">
              <a-input
                v-model:value="queryForm.thickness2"
                placeholder="请输入厚度2"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="半径">
              <a-input
                v-model:value="queryForm.radius"
                placeholder="请输入半径"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="壁厚">
              <a-input
                v-model:value="queryForm.wallThickness"
                placeholder="请输入壁厚"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="外径">
              <a-input
                v-model:value="queryForm.externalDiameter"
                placeholder="请输入外径"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质保期/有效保管期(起)">
              <a-date-picker
                v-model:value="queryForm.ensureDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保期/有效保管期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.ensureDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质保期/有效保管期(止)">
              <a-date-picker
                v-model:value="queryForm.ensureDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保期/有效保管期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.ensureDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生产批号">
              <a-input
                v-model:value="queryForm.productionBatchNo"
                placeholder="请输入生产批号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="热处理批号">
              <a-input
                v-model:value="queryForm.heatBatchNo"
                placeholder="请输入热处理批号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术协议版次">
              <a-input
                v-model:value="queryForm.techConditionVersion"
                placeholder="请输入技术协议版次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="定试周期">
              <a-input
                v-model:value="queryForm.fixedTestPeriod"
                placeholder="请输入定试周期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="成品状态">
              <a-input
                v-model:value="queryForm.matetialStatus"
                placeholder="请输入成品状态"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="订单类型">
              <a-input
                v-model:value="queryForm.orderType"
                placeholder="请输入订单类型"
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
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.acceptanceDateEnd)"
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
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.acceptanceDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封存日期(起)">
              <a-date-picker
                v-model:value="queryForm.archiveDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.archiveDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封存日期(止)">
              <a-date-picker
                v-model:value="queryForm.archiveDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.archiveDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否上机标识">
              <a-input
                v-model:value="queryForm.ynInstallFlag"
                placeholder="请输入是否上机标识"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="实物编码">
              <a-input
                v-model:value="queryForm.relItemCode"
                placeholder="请输入实物编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="制造商名称【SFERP】">
              <a-input
                v-model:value="queryForm.manufactoryName"
                placeholder="请输入制造商名称【SFERP】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同子表id【SFERP】">
              <a-input
                v-model:value="queryForm.pmsLongtermAgreementLId"
                placeholder="请输入合同子表id【SFERP】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="理化单号">
              <a-input
                v-model:value="queryForm.initTdmBusinessNo"
                placeholder="请输入理化单号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="理化日期(起)">
              <a-date-picker
                v-model:value="queryForm.tdmBusinessDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择理化日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.tdmBusinessDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="理化日期(止)">
              <a-date-picker
                v-model:value="queryForm.tdmBusinessDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择理化日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.tdmBusinessDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="到货流水号">
              <a-input
                v-model:value="queryForm.rcBillNo"
                placeholder="请输入到货流水号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="盘点标志">
              <a-input
                v-model:value="queryForm.checkInfo"
                placeholder="请输入盘点标志"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="盘点人">
              <a-input
                v-model:value="queryForm.checkUserName"
                placeholder="请输入盘点人"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="盘点人id">
              <a-input
                v-model:value="queryForm.checkUserId"
                placeholder="请输入盘点人id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="盘点时间(起)">
              <a-date-picker
                v-model:value="queryForm.checkTimeBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择盘点时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.checkTimeEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="盘点时间(止)">
              <a-date-picker
                v-model:value="queryForm.checkTimeEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择盘点时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.checkTimeBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="价格标志 值为1取计划价，否则取合同价">
              <a-input
                v-model:value="queryForm.priceFlag"
                placeholder="请输入价格标志 值为1取计划价，否则取合同价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="当前期段期初库存金额">
              <a-input
                v-model:value="queryForm.currentInitInvMoney"
                placeholder="请输入当前期段期初库存金额"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="成本核算价">
              <a-input
                v-model:value="queryForm.factPrice"
                placeholder="请输入成本核算价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="初始验收单事务ID^取Wms_Item_Transaction.Id用于记录该台账采购入库的入库事务">
              <a-input
                v-model:value="queryForm.originalWmsItemTransactionId"
                placeholder="请输入初始验收单事务ID^取Wms_Item_Transaction.Id用于记录该台账采购入库的入库事务"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="输入依据">
              <a-input
                v-model:value="queryForm.inputBasis"
                placeholder="请输入输入依据"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划依据">
              <a-input
                v-model:value="queryForm.planBasis"
                placeholder="请输入计划依据"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划编号">
              <a-input
                v-model:value="queryForm.planNo"
                placeholder="请输入计划编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批次课题号">
              <a-input
                v-model:value="queryForm.projectNumber"
                placeholder="请输入批次课题号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="经办人">
              <a-input
                v-model:value="queryForm.handledUserId"
                placeholder="请输入经办人"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="经办人CODE">
              <a-input
                v-model:value="queryForm.handledUserCode"
                placeholder="请输入经办人CODE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="经办人名称">
              <a-input
                v-model:value="queryForm.handledUserName"
                placeholder="请输入经办人名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="图号/型号">
              <a-input
                v-model:value="queryForm.drawingNo"
                placeholder="请输入图号/型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批次发动机型号">
              <a-input
                v-model:value="queryForm.batchEngineModel"
                placeholder="请输入批次发动机型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供应商批次号">
              <a-input
                v-model:value="queryForm.supplierBatchNumber"
                placeholder="请输入供应商批次号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质量凭证">
              <a-input
                v-model:value="queryForm.qualityCertificate"
                placeholder="请输入质量凭证"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="试验类别">
              <a-input
                v-model:value="queryForm.testCategory"
                placeholder="请输入试验类别"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="试验结论">
              <a-input
                v-model:value="queryForm.testConclusion"
                placeholder="请输入试验结论"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="产品状况/寿命">
              <a-input
                v-model:value="queryForm.productCondition"
                placeholder="请输入产品状况/寿命"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生产单位CODE">
              <a-input
                v-model:value="queryForm.produceDeptCode"
                placeholder="请输入生产单位CODE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生产单位名称">
              <a-input
                v-model:value="queryForm.produceDeptName"
                placeholder="请输入生产单位名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生产单位ID">
              <a-input
                v-model:value="queryForm.produceDeptId"
                placeholder="请输入生产单位ID"
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
        ref="wmsCamItemInventory"
        table-key="wmsCamItemInventory"
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
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['wmsCamItemInventory:add']"
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
              v-hasPermi="['wmsCamItemInventory:del']"
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
              v-hasPermi="['wmsCamItemInventory:import']"
              title="导入"
              type="primary"
              ghost
              @click="handleImport">
              <template #icon>
                 <import-outlined />
              </template>
              导入
            </a-button>
            <a-button
              v-hasPermi="['wmsCamItemInventory:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
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
            style="width: 200px"
            placeholder="请输入物料ID"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'billSourceName'">
            <a @click="handleDetail(record)">
              {{ record.billSourceName }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button
              v-hasPermi="['wmsCamItemInventory:del']"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <wms-cam-item-inventory-add
      v-if="showAddModal"
      ref="addModal"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <wms-cam-item-inventory-edit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <wms-cam-item-inventory-detail
      v-if="showDetailModal"
      ref="detailModal"
      :form-id="formId"
      @close="showDetailModal = false"
    />
    <AvicExcelImport
      v-if="showImportModal"
      :formData="excelParams"
      title="单表模板导入"
      importUrl="/mms/wms/wmscamiteminventorys/importData/v1"
      downloadTemplateUrl="/mms/wms/wmscamiteminventorys/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { WmsCamItemInventoryDto } from '@/api/avic/mms/wms/WmsCamItemInventoryApi'; // 引入模块DTO
import { listWmsCamItemInventoryByPage, delWmsCamItemInventory, exportExcel } from '@/api/avic/mms/wms/WmsCamItemInventoryApi'; // 引入模块API
import WmsCamItemInventoryAdd from './WmsCamItemInventoryAdd.vue'; // 引入添加页面组件
import WmsCamItemInventoryEdit from './WmsCamItemInventoryEdit.vue'; // 引入编辑页面组件
import WmsCamItemInventoryDetail from './WmsCamItemInventoryDetail.vue'; // 引入详情页面组件
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
    title: '台账序列号^内部排序序号，新台账取值为已有最大序列号加1',
    dataIndex: 'innerOrder',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '单据来源 ^ R-原材料,C-成品',
    dataIndex: 'billSourceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '物料ID',
    dataIndex: 'mdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料号【冗余设计】',
    dataIndex: 'mdsItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料名称 【冗余设计】',
    dataIndex: 'mdsItemName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '牌号【冗余设计】',
    dataIndex: 'marque',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '规格【冗余设计】',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术条件【冗余设计】',
    dataIndex: 'techCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交货状态【冗余设计】',
    dataIndex: 'deliveryStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房ID',
    dataIndex: 'mdsInventoryId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库位ID',
    dataIndex: 'mdsLocatorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库位号【冗余设计】',
    dataIndex: 'mdsLocatorNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段期初库存数量',
    dataIndex: 'currentInitInvQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段累计入库数量',
    dataIndex: 'currentSumupInQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段累计出库数量',
    dataIndex: 'currentSumupOutQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段累计调整数量',
    dataIndex: 'currentSumupAdjustQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '结存数量 ^ 结存数量=新进数量+现存数量+占用数量+分配数量',
    dataIndex: 'currentOnhandQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '新进数量^未使用过的数量，结存数量包含新进数量',
    dataIndex: 'unusedOnhandQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '占用数量',
    dataIndex: 'engagedQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '分配数量',
    dataIndex: 'allocatedQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入库日期',
    dataIndex: 'inventoryDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '库存状态 ^“1-正常，0-冻结，2-异常',
    dataIndex: 'inventoryStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '创建事务ID^取Wms_Item_Transaction.Id用于记录创建该台账的入库事务',
    dataIndex: 'createWmsItemTransactionId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入库部门ID^取自SYS_DEPT.Id用于记录创建该台账的事务的业务所属部门',
    dataIndex: 'inDeptId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入库部门编码',
    dataIndex: 'inDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入库部门名称',
    dataIndex: 'inDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '建账人ID',
    dataIndex: 'createdUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '建账人编码',
    dataIndex: 'createdUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '建账人姓名',
    dataIndex: 'createdUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '建账日期',
    dataIndex: 'createdDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划价',
    dataIndex: 'plannedPrice',
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
    title: '库存三期定义表ID',
    dataIndex: 'mdsInvThreePeriodId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '封装方式代码',
    dataIndex: 'envelopCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '封装日期',
    dataIndex: 'envelopDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计量单位^',
    dataIndex: 'mdsUnitId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等',
    dataIndex: 'qualityCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供方合格证号',
    dataIndex: 'supplyCertificationNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目编号',
    dataIndex: 'projectNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同号',
    dataIndex: 'orderNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商ID',
    dataIndex: 'srmVendorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '客户ID',
    dataIndex: 'crmCustomerId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '任务序列号',
    dataIndex: 'foNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '产品ID',
    dataIndex: 'proMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '产品号【冗余设计】',
    dataIndex: 'proMdsItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '父件ID',
    dataIndex: 'parentMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '制造日期',
    dataIndex: 'manufactoryDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开单日期',
    dataIndex: 'billingDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '本次油封日期',
    dataIndex: 'oilSealDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下次油封日期',
    dataIndex: 'nextOilSealDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '本次复验日期',
    dataIndex: 'recheckDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下次复验日期',
    dataIndex: 'nextRecheckDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '最长保管日期',
    dataIndex: 'storageDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '架次',
    dataIndex: 'lotNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '炉号',
    dataIndex: 'stoveNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批号',
    dataIndex: 'batchNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '派工号',
    dataIndex: 'missionNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '货币类型 ^ 实际价的货币类型,继承合同中的货币类型',
    dataIndex: 'currencyType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '不含税合同单价',
    dataIndex: 'inPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '含税合同单价',
    dataIndex: 'arrivalUnitPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格证ID ^ 厂内检验合格后的合格证ID',
    dataIndex: 'qcCertificationId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格证号 ^ 厂内检验合格后的合格证编号',
    dataIndex: 'certificationNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验单ID',
    dataIndex: 'qcCheckBillId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交付车间ID',
    dataIndex: 'deliveryDeptId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交付车间编码',
    dataIndex: 'deliveryDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交付车间名称',
    dataIndex: 'deliveryDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门ID',
    dataIndex: 'useDeptId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门编码',
    dataIndex: 'useDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门名称',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '件号',
    dataIndex: 'itemSerialNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '构型号',
    dataIndex: 'configNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中',
    dataIndex: 'lockReasonName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '延期天数',
    dataIndex: 'extensionPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '异常原因 ^1-复验不合格，2-超最长保管期',
    dataIndex: 'abnormalReasonName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '油封周期',
    dataIndex: 'oilSealPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '复验周期',
    dataIndex: 'recheckPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '计划价金额',
    dataIndex: 'plannedMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '不含合同税金额',
    dataIndex: 'inMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '含税合同金额',
    dataIndex: 'arrivalMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '客户类型ID',
    dataIndex: 'mdsCustomerTypeId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '分工路线主表ID',
    dataIndex: 'mdsWorkLineId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '分工路线',
    dataIndex: 'mdsWorkLine',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格标记 Y合格，X限用，N不合格,0 无效',
    dataIndex: 'certificationFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '熔炼号',
    dataIndex: 'smeltNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用',
    dataIndex: 'useLimitName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '物料类型【冗余设计】',
    dataIndex: 'mdsItemType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级 ^ 通用代码MMS_DATA_SECRET_LEVEL',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '锭节号',
    dataIndex: 'spindleSegmentNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料账本号',
    dataIndex: 'materialAccountNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '有效保管期--暂时作废该字段',
    dataIndex: 'validStorageDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '材料账本号ID',
    dataIndex: 'materialAccountId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料尺寸',
    dataIndex: 'materialSize',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否限用 YN_flag Y是 ,N 否',
    dataIndex: 'confineFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '限用型号',
    dataIndex: 'confineProduct',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用批次',
    dataIndex: 'confineBatch',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用架次',
    dataIndex: 'confineLot',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用说明',
    dataIndex: 'confineDesc',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '材料状态 1 标准料 ，2 下料中 ，3 余料',
    dataIndex: 'materialStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '原始材料状态，用以记录站点领料出库前的材料状态，为余料退库登账后还原“材料状态”字段值服务',
    dataIndex: 'originalMaterialStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购入库单件数量',
    dataIndex: 'itemQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批次',
    dataIndex: 'batchNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '长度',
    dataIndex: 'length',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '宽度',
    dataIndex: 'width',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厚度1',
    dataIndex: 'thickness1',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厚度2',
    dataIndex: 'thickness2',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '半径',
    dataIndex: 'radius',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '壁厚',
    dataIndex: 'wallThickness',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '外径',
    dataIndex: 'externalDiameter',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质保期/有效保管期',
    dataIndex: 'ensureDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '生产批号',
    dataIndex: 'productionBatchNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '热处理批号',
    dataIndex: 'heatBatchNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术协议版次',
    dataIndex: 'techConditionVersion',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '定试周期',
    dataIndex: 'fixedTestPeriod',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '成品状态',
    dataIndex: 'matetialStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订单类型',
    dataIndex: 'orderType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '验收日期',
    dataIndex: 'acceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '封存日期',
    dataIndex: 'archiveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否上机标识',
    dataIndex: 'ynInstallFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '实物编码',
    dataIndex: 'relItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '制造商名称【SFERP】',
    dataIndex: 'manufactoryName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同子表id【SFERP】',
    dataIndex: 'pmsLongtermAgreementLId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '理化单号',
    dataIndex: 'initTdmBusinessNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '理化日期',
    dataIndex: 'tdmBusinessDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '到货流水号',
    dataIndex: 'rcBillNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '盘点标志',
    dataIndex: 'checkInfo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '盘点人',
    dataIndex: 'checkUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '盘点人id',
    dataIndex: 'checkUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '盘点时间',
    dataIndex: 'checkTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '价格标志 值为1取计划价，否则取合同价',
    dataIndex: 'priceFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段期初库存金额',
    dataIndex: 'currentInitInvMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '成本核算价',
    dataIndex: 'factPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '初始验收单事务ID^取Wms_Item_Transaction.Id用于记录该台账采购入库的入库事务',
    dataIndex: 'originalWmsItemTransactionId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '输入依据',
    dataIndex: 'inputBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划依据',
    dataIndex: 'planBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划编号',
    dataIndex: 'planNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批次课题号',
    dataIndex: 'projectNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人',
    dataIndex: 'handledUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人CODE',
    dataIndex: 'handledUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人名称',
    dataIndex: 'handledUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '图号/型号',
    dataIndex: 'drawingNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批次发动机型号',
    dataIndex: 'batchEngineModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商批次号',
    dataIndex: 'supplierBatchNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量凭证',
    dataIndex: 'qualityCertificate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '试验类别',
    dataIndex: 'testCategory',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '试验结论',
    dataIndex: 'testConclusion',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '产品状况/寿命',
    dataIndex: 'productCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生产单位CODE',
    dataIndex: 'produceDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生产单位名称',
    dataIndex: 'produceDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生产单位ID',
    dataIndex: 'produceDeptId',
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
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<WmsCamItemInventoryDto>({});
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'wmsCamItemInventory' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const billSourceList = ref([]); // 单据来源 ^ R-原材料,C-成品通用代码
const inventoryStatusList = ref([]); // 库存状态 ^“1-正常，0-冻结，2-异常通用代码
const lockReasonList = ref([]); // 冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中通用代码
const abnormalReasonList = ref([]); // 异常原因 ^1-复验不合格，2-超最长保管期通用代码
const certificationFlagList = ref([]); // 合格标记 Y合格，X限用，N不合格,0 无效通用代码
const useLimitList = ref([]); // 限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const confineFlagList = ref([]); // 是否限用 YN_flag Y是 ,N 否通用代码
const materialStatusList = ref([]); // 材料状态 1 标准料 ，2 下料中 ，3 余料通用代码
const lookupParams = [
  { fieldName: 'billSource', lookUpType: 'WMS_BILL_SOURCE' },
  { fieldName: 'inventoryStatus', lookUpType: 'WMS_INVENTORY_STATUS' },
  { fieldName: 'lockReason', lookUpType: 'WMS_LOCK_REASON' },
  { fieldName: 'abnormalReason', lookUpType: 'WMS_ABNORMAL_REASON' },
  { fieldName: 'certificationFlag', lookUpType: 'WMS_CERTIFICATION_FLAG' },
  { fieldName: 'useLimit', lookUpType: 'WMS_USE_LIMIT' },
  { fieldName: 'confineFlag', lookUpType: 'PLATFORM_VALID_FLAG' },
  { fieldName: 'materialStatus', lookUpType: '	WMS_MATERIAL_STATUS_CL' }
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList () {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listWmsCamItemInventoryByPage(queryParam)
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
/** 获取通用代码  */
function getLookupList () {
  proxy.$getLookupByType(lookupParams, result => {
    billSourceList.value = result.billSource;
    inventoryStatusList.value = result.inventoryStatus;
    lockReasonList.value = result.lockReason;
    abnormalReasonList.value = result.abnormalReason;
    certificationFlagList.value = result.certificationFlag;
    useLimitList.value = result.useLimit;
    confineFlagList.value = result.confineFlag;
    materialStatusList.value = result.materialStatus;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList () {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery () {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery () {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced () {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery (value) {
  const keyWord = {
    mdsItemId: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd () {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit (id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详细 */
function handleDetail (record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 导入 */
function handleImport () {
  showImportModal.value = true;
}
/** 导出 */
function handleExport () {
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
function handleDelete (ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delWmsCamItemInventory(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
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
function onSelectChange (rowKeys) {
  selectedRowKeys.value = rowKeys;
}
/** 表格排序 */
function handleTableChange (pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

</script>

