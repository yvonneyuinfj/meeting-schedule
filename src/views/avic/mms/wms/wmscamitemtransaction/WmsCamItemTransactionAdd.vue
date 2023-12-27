<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionCode" label="事务处理流水号" has-feedback>
              <a-input
                v-model:value="form.transactionCode"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入事务处理流水号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billSource" label="单据来源 ^ R-原材料 C-成品" has-feedback>
              <a-select
                v-model:value="form.billSource"
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
            <a-form-item name="ynRedBill" label="是否红单 ^ Y-红单,N-蓝单">
              <a-select
                v-model:value="form.ynRedBill"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="物料ID">
              <a-input
                v-model:value="form.mdsItemId"
                :maxLength="64"
                placeholder="请输入物料ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemCode" label="物料号【冗余设计】">
              <a-input
                v-model:value="form.mdsItemCode"
                :maxLength="256"
                placeholder="请输入物料号【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemName" label="物料名称 【冗余设计】">
              <a-input
                v-model:value="form.mdsItemName"
                :maxLength="256"
                placeholder="请输入物料名称 【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="marque" label="牌号【冗余设计】">
              <a-input
                v-model:value="form.marque"
                :maxLength="512"
                placeholder="请输入牌号【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="规格【冗余设计】">
              <a-input
                v-model:value="form.specs"
                :maxLength="2048"
                placeholder="请输入规格【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techCondition" label="技术条件【冗余设计】">
              <a-input
                v-model:value="form.techCondition"
                :maxLength="256"
                placeholder="请输入技术条件【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryStatus" label="交货状态【冗余设计】">
              <a-input
                v-model:value="form.deliveryStatus"
                :maxLength="128"
                placeholder="请输入交货状态【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryId" label="库房ID">
              <a-input
                v-model:value="form.mdsInventoryId"
                :maxLength="64"
                placeholder="请输入库房ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsLocatorId" label="库位ID">
              <a-input
                v-model:value="form.mdsLocatorId"
                :maxLength="64"
                placeholder="请输入库位ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsLocatorNo" label="库位号【冗余设计】">
              <a-input
                v-model:value="form.mdsLocatorNo"
                :maxLength="512"
                placeholder="请输入库位号【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsItemInventoryId" label="台账ID">
              <a-input
                v-model:value="form.wmsItemInventoryId"
                :maxLength="64"
                placeholder="请输入台账ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryTransactionId" label="库存事务类型ID">
              <a-input
                v-model:value="form.mdsInventoryTransactionId"
                :maxLength="64"
                placeholder="请输入库存事务类型ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invTransactStatus" label="库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区">
              <a-select
                v-model:value="form.invTransactStatus"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsPeriodId" label="会计期段ID">
              <a-input
                v-model:value="form.mdsPeriodId"
                :maxLength="64"
                placeholder="请输入会计期段ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backFlag" label="事务处理对冲标记">
              <a-input
                v-model:value="form.backFlag"
                :maxLength="2"
                placeholder="请输入事务处理对冲标记"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backTransactionId" label="对冲事务流水ID">
              <a-input
                v-model:value="form.backTransactionId"
                :maxLength="64"
                placeholder="请输入对冲事务流水ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backTransactionCode" label="对冲事务流水号">
              <a-input
                v-model:value="form.backTransactionCode"
                :maxLength="64"
                placeholder="请输入对冲事务流水号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="initQty" label="台账期初数量 ^当前台账在事务发生前的库存数量">
              <a-input
                v-model:value="form.initQty"
                :maxLength="20"
                placeholder="请输入台账期初数量 ^当前台账在事务发生前的库存数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsInitQty" label="库房期初数量^以库房为单位汇总某项物资在事务发生前的当前库存数量">
              <a-input
                v-model:value="form.wmsInitQty"
                :maxLength="20"
                placeholder="请输入库房期初数量^以库房为单位汇总某项物资在事务发生前的当前库存数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsOnhandQty" label="库房结存数量^以库房为单位汇总某项物资在事务发生后台账结存数量">
              <a-input
                v-model:value="form.wmsOnhandQty"
                :maxLength="20"
                placeholder="请输入库房结存数量^以库房为单位汇总某项物资在事务发生后台账结存数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionQty" label="事务处理数量">
              <a-input
                v-model:value="form.transactionQty"
                :maxLength="20"
                placeholder="请输入事务处理数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionUserId" label="事务处理人ID">
              <AvicCommonSelect
                v-model:value="form.transactionUserId"
                type="userSelect"
                placeholder="请选择事务处理人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionUserCode" label="事务处理人编码">
              <AvicCommonSelect
                v-model:value="form.transactionUserCode"
                type="userSelect"
                placeholder="请选择事务处理人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionUserName" label="事务处理人姓名">
              <AvicCommonSelect
                v-model:value="form.transactionUserName"
                type="userSelect"
                placeholder="请选择事务处理人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDate" label="事务处理日期">
              <a-date-picker
                v-model:value="form.transactionDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择事务处理日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitId" label="计量单位">
              <a-input
                v-model:value="form.mdsUnitId"
                :maxLength="64"
                placeholder="请输入计量单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalOrderDetailId" label="原始单据ID（采购订单、销售订单、生产订单）">
              <a-input
                v-model:value="form.originalOrderDetailId"
                :maxLength="64"
                placeholder="请输入原始单据ID（采购订单、销售订单、生产订单）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsOrderDetailId" label="出入库单ID^入库单子表ID或者出库资源分配表ID">
              <a-input
                v-model:value="form.wmsOrderDetailId"
                :maxLength="64"
                placeholder="请输入出入库单ID^入库单子表ID或者出库资源分配表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDeptId" label="事务处理部门^交付部门或领用部门">
              <AvicCommonSelect
                v-model:value="form.transactionDeptId"
                type="deptSelect"
                placeholder="请选择事务处理部门^交付部门或领用部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDeptCode" label="事务处理部门编码">
              <AvicCommonSelect
                v-model:value="form.transactionDeptCode"
                type="deptSelect"
                placeholder="请选择事务处理部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDeptName" label="事务处理部门名称">
              <AvicCommonSelect
                v-model:value="form.transactionDeptName"
                type="deptSelect"
                placeholder="请选择事务处理部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmProjectId" label="项目">
              <a-input
                v-model:value="form.pmProjectId"
                :maxLength="64"
                placeholder="请输入项目"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invoiceNo" label="发票号">
              <a-input
                v-model:value="form.invoiceNo"
                :maxLength="64"
                placeholder="请输入发票号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectNo" label="项目编号">
              <a-input
                v-model:value="form.projectNo"
                :maxLength="64"
                placeholder="请输入项目编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerId" label="客户ID">
              <AvicCommonSelect
                v-model:value="form.crmCustomerId"
                type="userSelect"
                placeholder="请选择客户ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerCode" label="客户编码">
              <AvicCommonSelect
                v-model:value="form.crmCustomerCode"
                type="userSelect"
                placeholder="请选择客户编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerName" label="客户名称">
              <AvicCommonSelect
                v-model:value="form.crmCustomerName"
                type="userSelect"
                placeholder="请选择客户名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorId" label="供应商ID">
              <a-input
                v-model:value="form.srmVendorId"
                :maxLength="64"
                placeholder="请输入供应商ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorCode" label="供应商编码">
              <a-input
                v-model:value="form.srmVendorCode"
                :maxLength="64"
                placeholder="请输入供应商编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorName" label="供应商名称">
              <a-input
                v-model:value="form.srmVendorName"
                :maxLength="256"
                placeholder="请输入供应商名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="合同号">
              <a-input
                v-model:value="form.orderNo"
                :maxLength="128"
                placeholder="请输入合同号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inPrice" label="不含税合同单价">
              <a-input
                v-model:value="form.inPrice"
                :maxLength="20"
                placeholder="请输入不含税合同单价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedPrice" label="计划价">
              <a-input
                v-model:value="form.plannedPrice"
                :maxLength="20"
                placeholder="请输入计划价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="arrivalUnitPrice" label="含税单合同价">
              <a-input
                v-model:value="form.arrivalUnitPrice"
                :maxLength="20"
                placeholder="请输入含税单合同价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currencyType" label="货币类型">
              <a-input
                v-model:value="form.currencyType"
                :maxLength="10"
                placeholder="请输入货币类型"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proMdsItemId" label="产品ID">
              <a-input
                v-model:value="form.proMdsItemId"
                :maxLength="64"
                placeholder="请输入产品ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proMdsItemCode" label="产品号【冗余设计】">
              <a-input
                v-model:value="form.proMdsItemCode"
                :maxLength="256"
                placeholder="请输入产品号【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsItemId" label="父件ID">
              <a-input
                v-model:value="form.parentMdsItemId"
                :maxLength="64"
                placeholder="请输入父件ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lotNo" label="架次">
              <a-input
                v-model:value="form.lotNo"
                :maxLength="64"
                placeholder="请输入架次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stoveNo" label="炉号">
              <a-input
                v-model:value="form.stoveNo"
                :maxLength="128"
                placeholder="请输入炉号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchNo" label="批号">
              <a-input
                v-model:value="form.batchNo"
                :maxLength="128"
                placeholder="请输入批号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="missionNo" label="派工号">
              <a-input
                v-model:value="form.missionNo"
                :maxLength="128"
                placeholder="请输入派工号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationNo" label="合格证号">
              <a-input
                v-model:value="form.certificationNo"
                :maxLength="128"
                placeholder="请输入合格证号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplyCertificationNo" label="供方合格证号">
              <a-input
                v-model:value="form.supplyCertificationNo"
                :maxLength="1024"
                placeholder="请输入供方合格证号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCode" label="质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等">
              <a-input
                v-model:value="form.qualityCode"
                :maxLength="128"
                placeholder="请输入质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="foNo" label="任务序列号">
              <a-input
                v-model:value="form.foNo"
                :maxLength="256"
                placeholder="请输入任务序列号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckBillId" label="检验单ID">
              <a-input
                v-model:value="form.qcCheckBillId"
                :maxLength="64"
                placeholder="请输入检验单ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmOrderListId" label="采购合同子表ID">
              <a-input
                v-model:value="form.srmOrderListId"
                :maxLength="64"
                placeholder="请输入采购合同子表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentReleaseFlag" label="紧急放行标识^Y-是紧急放行、N-非紧急放行">
              <a-select
                v-model:value="form.urgentReleaseFlag"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentReleaseNo" label="紧急放行单号">
              <a-input
                v-model:value="form.urgentReleaseNo"
                :maxLength="128"
                placeholder="请输入紧急放行单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckUserId" label="检验记录人ID">
              <AvicCommonSelect
                v-model:value="form.qcCheckUserId"
                type="userSelect"
                placeholder="请选择检验记录人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckUserCode" label="检验记录人编码">
              <AvicCommonSelect
                v-model:value="form.qcCheckUserCode"
                type="userSelect"
                placeholder="请选择检验记录人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckUserName" label="检验记录人姓名">
              <AvicCommonSelect
                v-model:value="form.qcCheckUserName"
                type="userSelect"
                placeholder="请选择检验记录人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckDate" label="检验记录日期">
              <a-date-picker
                v-model:value="form.qcCheckDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择检验记录日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemSerialNo" label="件号">
              <a-input
                v-model:value="form.itemSerialNo"
                :maxLength="128"
                placeholder="请输入件号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="configNo" label="构型号">
              <a-input
                v-model:value="form.configNo"
                :maxLength="64"
                placeholder="请输入构型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserId" label="接收人ID^配送使用">
              <a-input
                v-model:value="form.recieveUserId"
                :maxLength="64"
                placeholder="请输入接收人ID^配送使用"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserCode" label="接收人编码^配送使用">
              <a-input
                v-model:value="form.recieveUserCode"
                :maxLength="64"
                placeholder="请输入接收人编码^配送使用"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserName" label="接收人姓名^配送使用">
              <a-input
                v-model:value="form.recieveUserName"
                :maxLength="64"
                placeholder="请输入接收人姓名^配送使用"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveDate" label="接收日期^配送使用">
              <a-date-picker
                v-model:value="form.recieveDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择接收日期^配送使用"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsInvBalanceBillId" label="结转主表ID">
              <a-input
                v-model:value="form.wmsInvBalanceBillId"
                :maxLength="64"
                placeholder="请输入结转主表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="2048"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据编号">
              <a-input
                v-model:value="form.billNo"
                :maxLength="64"
                placeholder="请输入单据编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedMoney" label="计划价金额">
              <a-input
                v-model:value="form.plannedMoney"
                :maxLength="20"
                placeholder="请输入计划价金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inMoney" label="不含税合同金额">
              <a-input
                v-model:value="form.inMoney"
                :maxLength="20"
                placeholder="请输入不含税合同金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="arrivalMoney" label="含税合同金额">
              <a-input
                v-model:value="form.arrivalMoney"
                :maxLength="20"
                placeholder="请输入含税合同金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="onhandQty" label="台账结存数量">
              <a-input
                v-model:value="form.onhandQty"
                :maxLength="20"
                placeholder="请输入台账结存数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="innerOrder" label="排序序号 ^ 内部排序序号">
              <a-input-number
                v-model:value="form.innerOrder"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入排序序号 ^ 内部排序序号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationFlag" label="合格标记 Y合格，X限用，N不合格,0 无效">
              <a-select
                v-model:value="form.certificationFlag"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="smeltNo" label="熔炼号">
              <a-input
                v-model:value="form.smeltNo"
                :maxLength="128"
                placeholder="请输入熔炼号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useLimit" label="限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用">
              <a-select
                v-model:value="form.useLimit"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemType" label="物料类型【冗余设计】">
              <a-input
                v-model:value="form.mdsItemType"
                :maxLength="128"
                placeholder="请输入物料类型【冗余设计】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInvOperationType" label="操作类型 O-出库 ，I -入库">
              <a-select
                v-model:value="form.mdsInvOperationType"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="spindleSegmentNo" label="锭节号">
              <a-input
                v-model:value="form.spindleSegmentNo"
                :maxLength="128"
                placeholder="请输入锭节号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialAccountNo" label="材料账本号">
              <a-input
                v-model:value="form.materialAccountNo"
                :maxLength="128"
                placeholder="请输入材料账本号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validStorageDate" label="有效保管期--暂时作废">
              <a-date-picker
                v-model:value="form.validStorageDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期--暂时作废"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialAccountId" label="材料账本号ID">
              <a-input
                v-model:value="form.materialAccountId"
                :maxLength="64"
                placeholder="请输入材料账本号ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialSize" label="材料尺寸">
              <a-input
                v-model:value="form.materialSize"
                :maxLength="2048"
                placeholder="请输入材料尺寸"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineFlag" label="是否限用 YN_flag Y是 ,N 否">
              <a-select
                v-model:value="form.confineFlag"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineProduct" label="限用型号">
              <a-input
                v-model:value="form.confineProduct"
                :maxLength="128"
                placeholder="请输入限用型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineBatch" label="限用批次">
              <a-input
                v-model:value="form.confineBatch"
                :maxLength="128"
                placeholder="请输入限用批次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineLot" label="限用架次">
              <a-input
                v-model:value="form.confineLot"
                :maxLength="128"
                placeholder="请输入限用架次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineDesc" label="限用说明">
              <a-input
                v-model:value="form.confineDesc"
                :maxLength="128"
                placeholder="请输入限用说明"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemQty" label="采购入库单件数量">
              <a-input
                v-model:value="form.itemQty"
                :maxLength="20"
                placeholder="请输入采购入库单件数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchNumber" label="批次">
              <a-input
                v-model:value="form.batchNumber"
                :maxLength="128"
                placeholder="请输入批次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="length" label="长度">
              <a-input
                v-model:value="form.length"
                :maxLength="20"
                placeholder="请输入长度"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="width" label="宽度">
              <a-input
                v-model:value="form.width"
                :maxLength="20"
                placeholder="请输入宽度"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="thickness1" label="厚度1">
              <a-input
                v-model:value="form.thickness1"
                :maxLength="20"
                placeholder="请输入厚度1"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="thickness2" label="厚度2">
              <a-input
                v-model:value="form.thickness2"
                :maxLength="20"
                placeholder="请输入厚度2"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="radius" label="半径">
              <a-input
                v-model:value="form.radius"
                :maxLength="20"
                placeholder="请输入半径"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wallThickness" label="壁厚">
              <a-input
                v-model:value="form.wallThickness"
                :maxLength="20"
                placeholder="请输入壁厚"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="externalDiameter" label="外径">
              <a-input
                v-model:value="form.externalDiameter"
                :maxLength="20"
                placeholder="请输入外径"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ensureDate" label="质保期/最长保管期">
              <a-date-picker
                v-model:value="form.ensureDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保期/最长保管期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionBatchNo" label="生产批号">
              <a-input
                v-model:value="form.productionBatchNo"
                :maxLength="128"
                placeholder="请输入生产批号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="heatBatchNo" label="热处理批号">
              <a-input
                v-model:value="form.heatBatchNo"
                :maxLength="128"
                placeholder="请输入热处理批号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techConditionVersion" label="技术协议版次">
              <a-input
                v-model:value="form.techConditionVersion"
                :maxLength="8"
                placeholder="请输入技术协议版次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageDate" label="最长保管期">
              <a-date-picker
                v-model:value="form.storageDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fixedTestPeriod" label="定试周期">
              <a-input
                v-model:value="form.fixedTestPeriod"
                :maxLength="32"
                placeholder="请输入定试周期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="matetialStatus" label="成品状态">
              <a-input
                v-model:value="form.matetialStatus"
                :maxLength="64"
                placeholder="请输入成品状态"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCategoryLv1Id" label="一级品类ID">
              <a-input
                v-model:value="form.mdsCategoryLv1Id"
                :maxLength="64"
                placeholder="请输入一级品类ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderType" label="订单类型">
              <a-input
                v-model:value="form.orderType"
                :maxLength="2"
                placeholder="请输入订单类型"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="acceptanceDate" label="验收日期">
              <a-date-picker
                v-model:value="form.acceptanceDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="archiveDate" label="封存日期">
              <a-date-picker
                v-model:value="form.archiveDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynInstallFlag" label="是否上机标识">
              <a-input
                v-model:value="form.ynInstallFlag"
                :maxLength="2"
                placeholder="请输入是否上机标识"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="relItemCode" label="实物编码">
              <a-input
                v-model:value="form.relItemCode"
                :maxLength="256"
                placeholder="请输入实物编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门ID 【新增】">
              <a-input
                v-model:value="form.useDeptId"
                :maxLength="64"
                placeholder="请输入使用部门ID 【新增】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptCode" label="使用部门编码 【新增】">
              <a-input
                v-model:value="form.useDeptCode"
                :maxLength="64"
                placeholder="请输入使用部门编码 【新增】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门名称 【新增】">
              <a-input
                v-model:value="form.useDeptName"
                :maxLength="128"
                placeholder="请输入使用部门名称 【新增】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditApplyDate" label="稽核申请时间">
              <a-date-picker
                v-model:value="form.auditApplyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择稽核申请时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditApplyUser" label="稽核申请人名称">
              <a-input
                v-model:value="form.auditApplyUser"
                :maxLength="64"
                placeholder="请输入稽核申请人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditStatus" label="稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核">
              <a-select
                v-model:value="form.auditStatus"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditNotes" label="稽核说明">
              <a-input
                v-model:value="form.auditNotes"
                :maxLength="256"
                placeholder="请输入稽核说明"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditUser" label="稽核人名称">
              <a-input
                v-model:value="form.auditUser"
                :maxLength="64"
                placeholder="请输入稽核人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditDate" label="稽核时间">
              <a-date-picker
                v-model:value="form.auditDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择稽核时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsSettlementId" label="开票通知单id">
              <a-input
                v-model:value="form.pmsSettlementId"
                :maxLength="64"
                placeholder="请输入开票通知单id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="othersValue" label="杂运费">
              <a-input
                v-model:value="form.othersValue"
                :maxLength="20"
                placeholder="请输入杂运费"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAudit" label="是否进行稽核">
              <a-input
                v-model:value="form.ynAudit"
                :maxLength="4"
                placeholder="请输入是否进行稽核"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noChargedReason" label="未挂账原因">
              <a-input
                v-model:value="form.noChargedReason"
                :maxLength="256"
                placeholder="请输入未挂账原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noInvoiceQuantity" label="未开票数量">
              <a-input
                v-model:value="form.noInvoiceQuantity"
                :maxLength="20"
                placeholder="请输入未开票数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="printFlag" label="是否打印">
              <a-input
                v-model:value="form.printFlag"
                :maxLength="8"
                placeholder="请输入是否打印"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="printUser" label="打印人">
              <a-input
                v-model:value="form.printUser"
                :maxLength="64"
                placeholder="请输入打印人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noticeVendorTime" label="通知供应商时间">
              <a-date-picker
                v-model:value="form.noticeVendorTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择通知供应商时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billStatus" label="开票状态 0未开票 5已开票">
              <a-select
                v-model:value="form.billStatus"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementNo" label="开票通知单号">
              <a-input
                v-model:value="form.settlementNo"
                :maxLength="64"
                placeholder="请输入开票通知单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tempInvoiceNo" label="临时发票号">
              <a-input
                v-model:value="form.tempInvoiceNo"
                :maxLength="64"
                placeholder="请输入临时发票号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="writeOffStatus" label="核销状态 0未核销 5已核销 （是否已做发票）">
              <a-select
                v-model:value="form.writeOffStatus"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementUserId" label="开票人id">
              <a-input
                v-model:value="form.settlementUserId"
                :maxLength="64"
                placeholder="请输入开票人id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementUserName" label="开票人姓名">
              <a-input
                v-model:value="form.settlementUserName"
                :maxLength="256"
                placeholder="请输入开票人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sysLongtermAgreementNo" label="合同财务流水号">
              <a-input
                v-model:value="form.sysLongtermAgreementNo"
                :maxLength="128"
                placeholder="请输入合同财务流水号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="rcBillNo" label="到货流水号">
              <a-input
                v-model:value="form.rcBillNo"
                :maxLength="64"
                placeholder="请输入到货流水号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsPeriodName" label="稽核会计期段">
              <a-input
                v-model:value="form.mdsPeriodName"
                :maxLength="64"
                placeholder="请输入稽核会计期段"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserName" label="计划员">
              <a-input
                v-model:value="form.planUserName"
                :maxLength="64"
                placeholder="请输入计划员"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveUserName" label="供应员">
              <a-input
                v-model:value="form.receiveUserName"
                :maxLength="64"
                placeholder="请输入供应员"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="returnPrice" label="退库价格">
              <a-input
                v-model:value="form.returnPrice"
                :maxLength="20"
                placeholder="请输入退库价格"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="writeOffType" label="核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销">
              <a-select
                v-model:value="form.writeOffType"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="writeOffReason" label="核销原因">
              <a-input
                v-model:value="form.writeOffReason"
                :maxLength="64"
                placeholder="请输入核销原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noticeUserId" label="通知人id">
              <a-input
                v-model:value="form.noticeUserId"
                :maxLength="64"
                placeholder="请输入通知人id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noticeUserName" label="通知人姓名">
              <a-input
                v-model:value="form.noticeUserName"
                :maxLength="256"
                placeholder="请输入通知人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="writeOffPeriodName" label="挂账账期">
              <a-input
                v-model:value="form.writeOffPeriodName"
                :maxLength="64"
                placeholder="请输入挂账账期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementStatus" label="挂账状态 0未挂账 5挂账中 10已挂账">
              <a-select
                v-model:value="form.settlementStatus"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="drawingNo" label="图号/型号">
              <a-input
                v-model:value="form.drawingNo"
                :maxLength="64"
                placeholder="请输入图号/型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplierBatchNumber" label="供应商批次号">
              <a-input
                v-model:value="form.supplierBatchNumber"
                :maxLength="64"
                placeholder="请输入供应商批次号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineModel" label="发动机型号">
              <a-input
                v-model:value="form.engineModel"
                :maxLength="64"
                placeholder="请输入发动机型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineQuantity" label="发动机台份">
              <a-input
                v-model:value="form.engineQuantity"
                :maxLength="64"
                placeholder="请输入发动机台份"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assemblyDisassembly" label="装配/分解次数">
              <a-input
                v-model:value="form.assemblyDisassembly"
                :maxLength="64"
                placeholder="请输入装配/分解次数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inspectionFormNumber" label="检验单编号">
              <a-input
                v-model:value="form.inspectionFormNumber"
                :maxLength="64"
                placeholder="请输入检验单编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="usageBasis" label="领用依据">
              <a-input
                v-model:value="form.usageBasis"
                :maxLength="64"
                placeholder="请输入领用依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTo" label="用途">
              <a-input
                v-model:value="form.useTo"
                :maxLength="64"
                placeholder="请输入用途"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="disposalMethod" label="处置方式">
              <a-input
                v-model:value="form.disposalMethod"
                :maxLength="64"
                placeholder="请输入处置方式"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
              label="附件"
            >
              <AvicUploader
                element-id="1"
                form-type="add"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                table-name="WMS_CAM_ITEM_TRANSACTION"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useWmsCamItemTransactionForm, emits } from './ts/WmsCamItemTransactionForm'; // 引入表单ts
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
  rules,
  layout,
  colLayout,
  loading,
  billSourceList,
  ynRedBillList,
  invTransactStatusList,
  urgentReleaseFlagList,
  certificationFlagList,
  useLimitList,
  secretLevelList,
  mdsInvOperationTypeList,
  confineFlagList,
  auditStatusList,
  billStatusList,
  writeOffStatusList,
  writeOffTypeList,
  settlementStatusList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = useWmsCamItemTransactionForm({
  props: props,
  emit: emit
});
</script>

