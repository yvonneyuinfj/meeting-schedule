<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="事务处理流水号">
              <a-input
                v-model:value="queryForm.transactionCode"
                placeholder="请输入事务处理流水号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="单据来源 ^ R-原材料 C-成品">
              <a-select
                v-model:value="queryForm.billSource"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择单据来源 ^ R-原材料 C-成品"
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
            <a-form-item label="是否红单 ^ Y-红单,N-蓝单">
              <a-select
                v-model:value="queryForm.ynRedBill"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否红单 ^ Y-红单,N-蓝单"
              >
                <a-select-option
                  v-for="item in ynRedBillList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
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
            <a-form-item label="台账ID">
              <a-input
                v-model:value="queryForm.wmsItemInventoryId"
                placeholder="请输入台账ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库存事务类型ID">
              <a-input
                v-model:value="queryForm.mdsInventoryTransactionId"
                placeholder="请输入库存事务类型ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区">
              <a-select
                v-model:value="queryForm.invTransactStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区"
              >
                <a-select-option
                  v-for="item in invTransactStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="会计期段ID">
              <a-input
                v-model:value="queryForm.mdsPeriodId"
                placeholder="请输入会计期段ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理对冲标记">
              <a-input
                v-model:value="queryForm.backFlag"
                placeholder="请输入事务处理对冲标记"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="对冲事务流水ID">
              <a-input
                v-model:value="queryForm.backTransactionId"
                placeholder="请输入对冲事务流水ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="对冲事务流水号">
              <a-input
                v-model:value="queryForm.backTransactionCode"
                placeholder="请输入对冲事务流水号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="台账期初数量 ^当前台账在事务发生前的库存数量">
              <a-input
                v-model:value="queryForm.initQty"
                placeholder="请输入台账期初数量 ^当前台账在事务发生前的库存数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房期初数量^以库房为单位汇总某项物资在事务发生前的当前库存数量">
              <a-input
                v-model:value="queryForm.wmsInitQty"
                placeholder="请输入库房期初数量^以库房为单位汇总某项物资在事务发生前的当前库存数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房结存数量^以库房为单位汇总某项物资在事务发生后台账结存数量">
              <a-input
                v-model:value="queryForm.wmsOnhandQty"
                placeholder="请输入库房结存数量^以库房为单位汇总某项物资在事务发生后台账结存数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理数量">
              <a-input
                v-model:value="queryForm.transactionQty"
                placeholder="请输入事务处理数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理人ID">
              <AvicCommonSelect
                v-model:value="queryForm.transactionUserId"
                type="userSelect"
                placeholder="请选择事务处理人ID"
                :defaultShowValue="queryForm.transactionUserIdAlias"
                @callback="
                  result => {
                    queryForm.transactionUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理人编码">
              <AvicCommonSelect
                v-model:value="queryForm.transactionUserCode"
                type="userSelect"
                placeholder="请选择事务处理人编码"
                :defaultShowValue="queryForm.transactionUserCodeAlias"
                @callback="
                  result => {
                    queryForm.transactionUserCodeAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理人姓名">
              <AvicCommonSelect
                v-model:value="queryForm.transactionUserName"
                type="userSelect"
                placeholder="请选择事务处理人姓名"
                :defaultShowValue="queryForm.transactionUserNameAlias"
                @callback="
                  result => {
                    queryForm.transactionUserNameAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理日期(起)">
              <a-date-picker
                v-model:value="queryForm.transactionDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择事务处理日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.transactionDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理日期(止)">
              <a-date-picker
                v-model:value="queryForm.transactionDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择事务处理日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.transactionDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计量单位">
              <a-input
                v-model:value="queryForm.mdsUnitId"
                placeholder="请输入计量单位"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="原始单据ID（采购订单、销售订单、生产订单）">
              <a-input
                v-model:value="queryForm.originalOrderDetailId"
                placeholder="请输入原始单据ID（采购订单、销售订单、生产订单）"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出入库单ID^入库单子表ID或者出库资源分配表ID">
              <a-input
                v-model:value="queryForm.wmsOrderDetailId"
                placeholder="请输入出入库单ID^入库单子表ID或者出库资源分配表ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理部门^交付部门或领用部门">
              <AvicCommonSelect
                v-model:value="queryForm.transactionDeptId"
                type="deptSelect"
                placeholder="请选择事务处理部门^交付部门或领用部门"
                :defaultShowValue="queryForm.transactionDeptIdAlias"
                @callback="
                  result => {
                    queryForm.transactionDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理部门编码">
              <AvicCommonSelect
                v-model:value="queryForm.transactionDeptCode"
                type="deptSelect"
                placeholder="请选择事务处理部门编码"
                :defaultShowValue="queryForm.transactionDeptCodeAlias"
                @callback="
                  result => {
                    queryForm.transactionDeptCodeAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理部门名称">
              <AvicCommonSelect
                v-model:value="queryForm.transactionDeptName"
                type="deptSelect"
                placeholder="请选择事务处理部门名称"
                :defaultShowValue="queryForm.transactionDeptNameAlias"
                @callback="
                  result => {
                    queryForm.transactionDeptNameAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目">
              <a-input
                v-model:value="queryForm.pmProjectId"
                placeholder="请输入项目"
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
            <a-form-item label="客户ID">
              <AvicCommonSelect
                v-model:value="queryForm.crmCustomerId"
                type="userSelect"
                placeholder="请选择客户ID"
                :defaultShowValue="queryForm.crmCustomerIdAlias"
                @callback="
                  result => {
                    queryForm.crmCustomerIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户编码">
              <AvicCommonSelect
                v-model:value="queryForm.crmCustomerCode"
                type="userSelect"
                placeholder="请选择客户编码"
                :defaultShowValue="queryForm.crmCustomerCodeAlias"
                @callback="
                  result => {
                    queryForm.crmCustomerCodeAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户名称">
              <AvicCommonSelect
                v-model:value="queryForm.crmCustomerName"
                type="userSelect"
                placeholder="请选择客户名称"
                :defaultShowValue="queryForm.crmCustomerNameAlias"
                @callback="
                  result => {
                    queryForm.crmCustomerNameAlias = result.names;
                  }
                "
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
            <a-form-item label="供应商编码">
              <a-input
                v-model:value="queryForm.srmVendorCode"
                placeholder="请输入供应商编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供应商名称">
              <a-input
                v-model:value="queryForm.srmVendorName"
                placeholder="请输入供应商名称"
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
            <a-form-item label="含税单合同价">
              <a-input
                v-model:value="queryForm.arrivalUnitPrice"
                placeholder="请输入含税单合同价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="货币类型">
              <a-input
                v-model:value="queryForm.currencyType"
                placeholder="请输入货币类型"
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
            <a-form-item label="合格证号">
              <a-input
                v-model:value="queryForm.certificationNo"
                placeholder="请输入合格证号"
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
            <a-form-item label="采购合同子表ID">
              <a-input
                v-model:value="queryForm.srmOrderListId"
                placeholder="请输入采购合同子表ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="紧急放行标识^Y-是紧急放行、N-非紧急放行">
              <a-select
                v-model:value="queryForm.urgentReleaseFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择紧急放行标识^Y-是紧急放行、N-非紧急放行"
              >
                <a-select-option
                  v-for="item in urgentReleaseFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="紧急放行单号">
              <a-input
                v-model:value="queryForm.urgentReleaseNo"
                placeholder="请输入紧急放行单号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验记录人ID">
              <AvicCommonSelect
                v-model:value="queryForm.qcCheckUserId"
                type="userSelect"
                placeholder="请选择检验记录人ID"
                :defaultShowValue="queryForm.qcCheckUserIdAlias"
                @callback="
                  result => {
                    queryForm.qcCheckUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验记录人编码">
              <AvicCommonSelect
                v-model:value="queryForm.qcCheckUserCode"
                type="userSelect"
                placeholder="请选择检验记录人编码"
                :defaultShowValue="queryForm.qcCheckUserCodeAlias"
                @callback="
                  result => {
                    queryForm.qcCheckUserCodeAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验记录人姓名">
              <AvicCommonSelect
                v-model:value="queryForm.qcCheckUserName"
                type="userSelect"
                placeholder="请选择检验记录人姓名"
                :defaultShowValue="queryForm.qcCheckUserNameAlias"
                @callback="
                  result => {
                    queryForm.qcCheckUserNameAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验记录日期(起)">
              <a-date-picker
                v-model:value="queryForm.qcCheckDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择检验记录日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.qcCheckDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验记录日期(止)">
              <a-date-picker
                v-model:value="queryForm.qcCheckDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择检验记录日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.qcCheckDateBegin)"
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
            <a-form-item label="接收人ID^配送使用">
              <a-input
                v-model:value="queryForm.recieveUserId"
                placeholder="请输入接收人ID^配送使用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收人编码^配送使用">
              <a-input
                v-model:value="queryForm.recieveUserCode"
                placeholder="请输入接收人编码^配送使用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收人姓名^配送使用">
              <a-input
                v-model:value="queryForm.recieveUserName"
                placeholder="请输入接收人姓名^配送使用"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收日期^配送使用(起)">
              <a-date-picker
                v-model:value="queryForm.recieveDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择接收日期^配送使用(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.recieveDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收日期^配送使用(止)">
              <a-date-picker
                v-model:value="queryForm.recieveDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择接收日期^配送使用(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.recieveDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结转主表ID">
              <a-input
                v-model:value="queryForm.wmsInvBalanceBillId"
                placeholder="请输入结转主表ID"
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
            <a-form-item label="单据编号">
              <a-input
                v-model:value="queryForm.billNo"
                placeholder="请输入单据编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
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
            <a-form-item label="不含税合同金额">
              <a-input
                v-model:value="queryForm.inMoney"
                placeholder="请输入不含税合同金额"
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
            <a-form-item label="台账结存数量">
              <a-input
                v-model:value="queryForm.onhandQty"
                placeholder="请输入台账结存数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
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
            <a-form-item label="操作类型 O-出库 ，I -入库">
              <a-select
                v-model:value="queryForm.mdsInvOperationType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择操作类型 O-出库 ，I -入库"
              >
                <a-select-option
                  v-for="item in mdsInvOperationTypeList"
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
            <a-form-item label="有效保管期--暂时作废(起)">
              <a-date-picker
                v-model:value="queryForm.validStorageDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期--暂时作废(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.validStorageDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效保管期--暂时作废(止)">
              <a-date-picker
                v-model:value="queryForm.validStorageDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期--暂时作废(止)"
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
            <a-form-item label="质保期/最长保管期(起)">
              <a-date-picker
                v-model:value="queryForm.ensureDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保期/最长保管期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.ensureDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质保期/最长保管期(止)">
              <a-date-picker
                v-model:value="queryForm.ensureDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保期/最长保管期(止)"
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
            <a-form-item label="最长保管期(起)">
              <a-date-picker
                v-model:value="queryForm.storageDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.storageDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长保管期(止)">
              <a-date-picker
                v-model:value="queryForm.storageDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.storageDateBegin)"
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
            <a-form-item label="使用部门ID 【新增】">
              <a-input
                v-model:value="queryForm.useDeptId"
                placeholder="请输入使用部门ID 【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="使用部门编码 【新增】">
              <a-input
                v-model:value="queryForm.useDeptCode"
                placeholder="请输入使用部门编码 【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="使用部门名称 【新增】">
              <a-input
                v-model:value="queryForm.useDeptName"
                placeholder="请输入使用部门名称 【新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核申请时间(起)">
              <a-date-picker
                v-model:value="queryForm.auditApplyDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择稽核申请时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.auditApplyDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核申请时间(止)">
              <a-date-picker
                v-model:value="queryForm.auditApplyDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择稽核申请时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.auditApplyDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核申请人名称">
              <a-input
                v-model:value="queryForm.auditApplyUser"
                placeholder="请输入稽核申请人名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核">
              <a-select
                v-model:value="queryForm.auditStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核"
              >
                <a-select-option
                  v-for="item in auditStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核说明">
              <a-input
                v-model:value="queryForm.auditNotes"
                placeholder="请输入稽核说明"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核人名称">
              <a-input
                v-model:value="queryForm.auditUser"
                placeholder="请输入稽核人名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核时间(起)">
              <a-date-picker
                v-model:value="queryForm.auditDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择稽核时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.auditDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="稽核时间(止)">
              <a-date-picker
                v-model:value="queryForm.auditDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择稽核时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.auditDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开票通知单id">
              <a-input
                v-model:value="queryForm.pmsSettlementId"
                placeholder="请输入开票通知单id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="杂运费">
              <a-input
                v-model:value="queryForm.othersValue"
                placeholder="请输入杂运费"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否进行稽核">
              <a-input
                v-model:value="queryForm.ynAudit"
                placeholder="请输入是否进行稽核"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="未挂账原因">
              <a-input
                v-model:value="queryForm.noChargedReason"
                placeholder="请输入未挂账原因"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="未开票数量">
              <a-input
                v-model:value="queryForm.noInvoiceQuantity"
                placeholder="请输入未开票数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否打印">
              <a-input
                v-model:value="queryForm.printFlag"
                placeholder="请输入是否打印"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="打印人">
              <a-input
                v-model:value="queryForm.printUser"
                placeholder="请输入打印人"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="通知供应商时间(起)">
              <a-date-picker
                v-model:value="queryForm.noticeVendorTimeBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择通知供应商时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.noticeVendorTimeEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="通知供应商时间(止)">
              <a-date-picker
                v-model:value="queryForm.noticeVendorTimeEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择通知供应商时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.noticeVendorTimeBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开票状态 0未开票 5已开票">
              <a-select
                v-model:value="queryForm.billStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择开票状态 0未开票 5已开票"
              >
                <a-select-option
                  v-for="item in billStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开票通知单号">
              <a-input
                v-model:value="queryForm.settlementNo"
                placeholder="请输入开票通知单号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="临时发票号">
              <a-input
                v-model:value="queryForm.tempInvoiceNo"
                placeholder="请输入临时发票号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="核销状态 0未核销 5已核销 （是否已做发票）">
              <a-select
                v-model:value="queryForm.writeOffStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择核销状态 0未核销 5已核销 （是否已做发票）"
              >
                <a-select-option
                  v-for="item in writeOffStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开票人id">
              <a-input
                v-model:value="queryForm.settlementUserId"
                placeholder="请输入开票人id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开票人姓名">
              <a-input
                v-model:value="queryForm.settlementUserName"
                placeholder="请输入开票人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同财务流水号">
              <a-input
                v-model:value="queryForm.sysLongtermAgreementNo"
                placeholder="请输入合同财务流水号"
                :allow-clear="true"
                @pressEnter="handleQuery"
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
            <a-form-item label="稽核会计期段">
              <a-input
                v-model:value="queryForm.mdsPeriodName"
                placeholder="请输入稽核会计期段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划员">
              <a-input
                v-model:value="queryForm.planUserName"
                placeholder="请输入计划员"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供应员">
              <a-input
                v-model:value="queryForm.receiveUserName"
                placeholder="请输入供应员"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="退库价格">
              <a-input
                v-model:value="queryForm.returnPrice"
                placeholder="请输入退库价格"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销">
              <a-select
                v-model:value="queryForm.writeOffType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销"
              >
                <a-select-option
                  v-for="item in writeOffTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="核销原因">
              <a-input
                v-model:value="queryForm.writeOffReason"
                placeholder="请输入核销原因"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="通知人id">
              <a-input
                v-model:value="queryForm.noticeUserId"
                placeholder="请输入通知人id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="通知人姓名">
              <a-input
                v-model:value="queryForm.noticeUserName"
                placeholder="请输入通知人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="挂账账期">
              <a-input
                v-model:value="queryForm.writeOffPeriodName"
                placeholder="请输入挂账账期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="挂账状态 0未挂账 5挂账中 10已挂账">
              <a-select
                v-model:value="queryForm.settlementStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择挂账状态 0未挂账 5挂账中 10已挂账"
              >
                <a-select-option
                  v-for="item in settlementStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
            <a-form-item label="发动机台份">
              <a-input
                v-model:value="queryForm.engineQuantity"
                placeholder="请输入发动机台份"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="装配/分解次数">
              <a-input
                v-model:value="queryForm.assemblyDisassembly"
                placeholder="请输入装配/分解次数"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验单编号">
              <a-input
                v-model:value="queryForm.inspectionFormNumber"
                placeholder="请输入检验单编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="领用依据">
              <a-input
                v-model:value="queryForm.usageBasis"
                placeholder="请输入领用依据"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="用途">
              <a-input
                v-model:value="queryForm.useTo"
                placeholder="请输入用途"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="处置方式">
              <a-input
                v-model:value="queryForm.disposalMethod"
                placeholder="请输入处置方式"
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
        ref="wmsCamItemTransaction"
        table-key="wmsCamItemTransaction"
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
              v-hasPermi="['wmsCamItemTransaction:add']"
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
              v-hasPermi="['wmsCamItemTransaction:del']"
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
              v-hasPermi="['wmsCamItemTransaction:import']"
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
              v-hasPermi="['wmsCamItemTransaction:export']"
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
            placeholder="请输入事务处理流水号"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'transactionCode'">
            <a @click="handleDetail(record)">
              {{ record.transactionCode }}
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
              v-hasPermi="['wmsCamItemTransaction:del']"
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
    <wms-cam-item-transaction-add
      v-if="showAddModal"
      ref="addModal"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <wms-cam-item-transaction-edit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <wms-cam-item-transaction-detail
      v-if="showDetailModal"
      ref="detailModal"
      :form-id="formId"
      @close="showDetailModal = false"
    />
    <AvicExcelImport
      v-if="showImportModal"
      :formData="excelParams"
      title="单表模板导入"
      importUrl="/mms/wms/wmscamitemtransactions/importData/v1"
      downloadTemplateUrl="/mms/wms/wmscamitemtransactions/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { WmsCamItemTransactionDto } from '@/api/avic/mms/wms/WmsCamItemTransactionApi'; // 引入模块DTO
import { listWmsCamItemTransactionByPage, delWmsCamItemTransaction, exportExcel } from '@/api/avic/mms/wms/WmsCamItemTransactionApi'; // 引入模块API
import WmsCamItemTransactionAdd from './WmsCamItemTransactionAdd.vue'; // 引入添加页面组件
import WmsCamItemTransactionEdit from './WmsCamItemTransactionEdit.vue'; // 引入编辑页面组件
import WmsCamItemTransactionDetail from './WmsCamItemTransactionDetail.vue'; // 引入详情页面组件
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
    title: '事务处理流水号',
    dataIndex: 'transactionCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '单据来源 ^ R-原材料 C-成品',
    dataIndex: 'billSourceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否红单 ^ Y-红单,N-蓝单',
    dataIndex: 'ynRedBillName',
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
    title: '台账ID',
    dataIndex: 'wmsItemInventoryId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库存事务类型ID',
    dataIndex: 'mdsInventoryTransactionId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区',
    dataIndex: 'invTransactStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '会计期段ID',
    dataIndex: 'mdsPeriodId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理对冲标记',
    dataIndex: 'backFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '对冲事务流水ID',
    dataIndex: 'backTransactionId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '对冲事务流水号',
    dataIndex: 'backTransactionCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '台账期初数量 ^当前台账在事务发生前的库存数量',
    dataIndex: 'initQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房期初数量^以库房为单位汇总某项物资在事务发生前的当前库存数量',
    dataIndex: 'wmsInitQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房结存数量^以库房为单位汇总某项物资在事务发生后台账结存数量',
    dataIndex: 'wmsOnhandQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理数量',
    dataIndex: 'transactionQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理人ID',
    dataIndex: 'transactionUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理人编码',
    dataIndex: 'transactionUserCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理人姓名',
    dataIndex: 'transactionUserNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理日期',
    dataIndex: 'transactionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计量单位',
    dataIndex: 'mdsUnitId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原始单据ID（采购订单、销售订单、生产订单）',
    dataIndex: 'originalOrderDetailId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出入库单ID^入库单子表ID或者出库资源分配表ID',
    dataIndex: 'wmsOrderDetailId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理部门^交付部门或领用部门',
    dataIndex: 'transactionDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理部门编码',
    dataIndex: 'transactionDeptCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理部门名称',
    dataIndex: 'transactionDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目',
    dataIndex: 'pmProjectId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
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
    title: '客户ID',
    dataIndex: 'crmCustomerIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '客户编码',
    dataIndex: 'crmCustomerCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '客户名称',
    dataIndex: 'crmCustomerNameAlias',
    ellipsis: true,
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
    title: '供应商编码',
    dataIndex: 'srmVendorCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商名称',
    dataIndex: 'srmVendorName',
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
    title: '不含税合同单价',
    dataIndex: 'inPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '含税单合同价',
    dataIndex: 'arrivalUnitPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '货币类型',
    dataIndex: 'currencyType',
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
    title: '合格证号',
    dataIndex: 'certificationNo',
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
    title: '质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等',
    dataIndex: 'qualityCode',
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
    title: '检验单ID',
    dataIndex: 'qcCheckBillId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购合同子表ID',
    dataIndex: 'srmOrderListId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急放行标识^Y-是紧急放行、N-非紧急放行',
    dataIndex: 'urgentReleaseFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '紧急放行单号',
    dataIndex: 'urgentReleaseNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验记录人ID',
    dataIndex: 'qcCheckUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验记录人编码',
    dataIndex: 'qcCheckUserCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验记录人姓名',
    dataIndex: 'qcCheckUserNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验记录日期',
    dataIndex: 'qcCheckDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    title: '接收人ID^配送使用',
    dataIndex: 'recieveUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收人编码^配送使用',
    dataIndex: 'recieveUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收人姓名^配送使用',
    dataIndex: 'recieveUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收日期^配送使用',
    dataIndex: 'recieveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '结转主表ID',
    dataIndex: 'wmsInvBalanceBillId',
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
    title: '单据编号',
    dataIndex: 'billNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '不含税合同金额',
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
    title: '台账结存数量',
    dataIndex: 'onhandQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '排序序号 ^ 内部排序序号',
    dataIndex: 'innerOrder',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
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
    title: '操作类型 O-出库 ，I -入库',
    dataIndex: 'mdsInvOperationTypeName',
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
    title: '有效保管期--暂时作废',
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
    title: '质保期/最长保管期',
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
    title: '最长保管期',
    dataIndex: 'storageDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    title: '一级品类ID',
    dataIndex: 'mdsCategoryLv1Id',
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
    title: '使用部门ID 【新增】',
    dataIndex: 'useDeptId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门编码 【新增】',
    dataIndex: 'useDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门名称 【新增】',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '稽核申请时间',
    dataIndex: 'auditApplyDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '稽核申请人名称',
    dataIndex: 'auditApplyUser',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核',
    dataIndex: 'auditStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '稽核说明',
    dataIndex: 'auditNotes',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '稽核人名称',
    dataIndex: 'auditUser',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '稽核时间',
    dataIndex: 'auditDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开票通知单id',
    dataIndex: 'pmsSettlementId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '杂运费',
    dataIndex: 'othersValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否进行稽核',
    dataIndex: 'ynAudit',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '未挂账原因',
    dataIndex: 'noChargedReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '未开票数量',
    dataIndex: 'noInvoiceQuantity',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否打印',
    dataIndex: 'printFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '打印人',
    dataIndex: 'printUser',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '通知供应商时间',
    dataIndex: 'noticeVendorTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开票状态 0未开票 5已开票',
    dataIndex: 'billStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开票通知单号',
    dataIndex: 'settlementNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '临时发票号',
    dataIndex: 'tempInvoiceNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '核销状态 0未核销 5已核销 （是否已做发票）',
    dataIndex: 'writeOffStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开票人id',
    dataIndex: 'settlementUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开票人姓名',
    dataIndex: 'settlementUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同财务流水号',
    dataIndex: 'sysLongtermAgreementNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '稽核会计期段',
    dataIndex: 'mdsPeriodName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划员',
    dataIndex: 'planUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应员',
    dataIndex: 'receiveUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '退库价格',
    dataIndex: 'returnPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销',
    dataIndex: 'writeOffTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '核销原因',
    dataIndex: 'writeOffReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '通知人id',
    dataIndex: 'noticeUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '通知人姓名',
    dataIndex: 'noticeUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '挂账账期',
    dataIndex: 'writeOffPeriodName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '挂账状态 0未挂账 5挂账中 10已挂账',
    dataIndex: 'settlementStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    title: '供应商批次号',
    dataIndex: 'supplierBatchNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发动机型号',
    dataIndex: 'engineModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发动机台份',
    dataIndex: 'engineQuantity',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '装配/分解次数',
    dataIndex: 'assemblyDisassembly',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验单编号',
    dataIndex: 'inspectionFormNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '领用依据',
    dataIndex: 'usageBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '用途',
    dataIndex: 'useTo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '处置方式',
    dataIndex: 'disposalMethod',
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
const queryForm = ref<WmsCamItemTransactionDto>({});
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
const excelParams = ref({ tableName: 'wmsCamItemTransaction' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const billSourceList = ref([]); // 单据来源 ^ R-原材料 C-成品通用代码
const ynRedBillList = ref([]); // 是否红单 ^ Y-红单,N-蓝单通用代码
const invTransactStatusList = ref([]); // 库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区通用代码
const urgentReleaseFlagList = ref([]); // 紧急放行标识^Y-是紧急放行、N-非紧急放行通用代码
const certificationFlagList = ref([]); // 合格标记 Y合格，X限用，N不合格,0 无效通用代码
const useLimitList = ref([]); // 限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const mdsInvOperationTypeList = ref([]); // 操作类型 O-出库 ，I -入库通用代码
const confineFlagList = ref([]); // 是否限用 YN_flag Y是 ,N 否通用代码
const auditStatusList = ref([]); // 稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核通用代码
const billStatusList = ref([]); // 开票状态 0未开票 5已开票通用代码
const writeOffStatusList = ref([]); // 核销状态 0未核销 5已核销 （是否已做发票）通用代码
const writeOffTypeList = ref([]); // 核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销通用代码
const settlementStatusList = ref([]); // 挂账状态 0未挂账 5挂账中 10已挂账通用代码
const lookupParams = [
  { fieldName: 'billSource', lookUpType: 'MDS_ITEM_DATASOURCE ' },
  { fieldName: 'ynRedBill', lookUpType: 'WMS_YN_RED_BILL' },
  { fieldName: 'invTransactStatus', lookUpType: 'WMS_INV_TRANSACT_STATUS' },
  { fieldName: 'urgentReleaseFlag', lookUpType: 'WMS_URGENT_RELEASE_FLAG' },
  { fieldName: 'certificationFlag', lookUpType: 'WMS_CERTIFICATION_FLAG' },
  { fieldName: 'useLimit', lookUpType: 'WMS_USE_LIMIT' },
  { fieldName: 'mdsInvOperationType', lookUpType: 'WMS_OPERATION_TYPE' },
  { fieldName: 'confineFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'auditStatus', lookUpType: 'WMS_AUDIT_STATUS' },
  { fieldName: 'billStatus', lookUpType: 'WMS_BILL_STATUS' },
  { fieldName: 'writeOffStatus', lookUpType: 'WMS_WRITE_OFF_STATUS' },
  { fieldName: 'writeOffType', lookUpType: 'WMS_WRITE_OFF_TYPE' },
  { fieldName: 'settlementStatus', lookUpType: 'WMS_SETTLEMENT_STATUS' }
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
  listWmsCamItemTransactionByPage(queryParam)
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
    ynRedBillList.value = result.ynRedBill;
    invTransactStatusList.value = result.invTransactStatus;
    urgentReleaseFlagList.value = result.urgentReleaseFlag;
    certificationFlagList.value = result.certificationFlag;
    useLimitList.value = result.useLimit;
    mdsInvOperationTypeList.value = result.mdsInvOperationType;
    confineFlagList.value = result.confineFlag;
    auditStatusList.value = result.auditStatus;
    billStatusList.value = result.billStatus;
    writeOffStatusList.value = result.writeOffStatus;
    writeOffTypeList.value = result.writeOffType;
    settlementStatusList.value = result.settlementStatus;
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
    transactionCode: value
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
      delWmsCamItemTransaction(ids)
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

