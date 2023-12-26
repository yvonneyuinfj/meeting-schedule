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
            <a-form-item name="transactionCode" label="事务处理流水号">
              <a-input v-model:value="form.transactionCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billSource" label="单据来源 ^ R-原材料 C-成品">
              <a-select
                v-model:value="form.billSource"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.mdsItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemCode" label="物料号【冗余设计】">
              <a-input v-model:value="form.mdsItemCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemName" label="物料名称 【冗余设计】">
              <a-input v-model:value="form.mdsItemName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="marque" label="牌号【冗余设计】">
              <a-input v-model:value="form.marque" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="规格【冗余设计】">
              <a-input v-model:value="form.specs" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techCondition" label="技术条件【冗余设计】">
              <a-input v-model:value="form.techCondition" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryStatus" label="交货状态【冗余设计】">
              <a-input v-model:value="form.deliveryStatus" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryId" label="库房ID">
              <a-input v-model:value="form.mdsInventoryId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsLocatorId" label="库位ID">
              <a-input v-model:value="form.mdsLocatorId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsLocatorNo" label="库位号【冗余设计】">
              <a-input v-model:value="form.mdsLocatorNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsItemInventoryId" label="台账ID">
              <a-input v-model:value="form.wmsItemInventoryId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryTransactionId" label="库存事务类型ID">
              <a-input v-model:value="form.mdsInventoryTransactionId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invTransactStatus" label="库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区">
              <a-select
                v-model:value="form.invTransactStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.mdsPeriodId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backFlag" label="事务处理对冲标记">
              <a-input v-model:value="form.backFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backTransactionId" label="对冲事务流水ID">
              <a-input v-model:value="form.backTransactionId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backTransactionCode" label="对冲事务流水号">
              <a-input v-model:value="form.backTransactionCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="initQty" label="台账期初数量 ^当前台账在事务发生前的库存数量">
              <a-input v-model:value="form.initQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsInitQty" label="库房期初数量^以库房为单位汇总某项物资在事务发生前的当前库存数量">
              <a-input v-model:value="form.wmsInitQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsOnhandQty" label="库房结存数量^以库房为单位汇总某项物资在事务发生后台账结存数量">
              <a-input v-model:value="form.wmsOnhandQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionQty" label="事务处理数量">
              <a-input v-model:value="form.transactionQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionUserId" label="事务处理人ID">
              <AvicCommonSelect
                v-model:value="form.transactionUserId"
                type="userSelect"
                :defaultShowValue="form.transactionUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionUserCode" label="事务处理人编码">
              <AvicCommonSelect
                v-model:value="form.transactionUserCode"
                type="userSelect"
                :defaultShowValue="form.transactionUserCodeAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionUserName" label="事务处理人姓名">
              <AvicCommonSelect
                v-model:value="form.transactionUserName"
                type="userSelect"
                :defaultShowValue="form.transactionUserNameAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDate" label="事务处理日期">
              <a-date-picker
                v-model:value="form.transactionDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitId" label="计量单位">
              <a-input v-model:value="form.mdsUnitId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalOrderDetailId" label="原始单据ID（采购订单、销售订单、生产订单）">
              <a-input v-model:value="form.originalOrderDetailId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsOrderDetailId" label="出入库单ID^入库单子表ID或者出库资源分配表ID">
              <a-input v-model:value="form.wmsOrderDetailId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDeptId" label="事务处理部门^交付部门或领用部门">
              <AvicCommonSelect
                v-model:value="form.transactionDeptId"
                type="deptSelect"
                :defaultShowValue="form.transactionDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDeptCode" label="事务处理部门编码">
              <AvicCommonSelect
                v-model:value="form.transactionDeptCode"
                type="deptSelect"
                :defaultShowValue="form.transactionDeptCodeAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionDeptName" label="事务处理部门名称">
              <AvicCommonSelect
                v-model:value="form.transactionDeptName"
                type="deptSelect"
                :defaultShowValue="form.transactionDeptNameAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmProjectId" label="项目">
              <a-input v-model:value="form.pmProjectId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invoiceNo" label="发票号">
              <a-input v-model:value="form.invoiceNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectNo" label="项目编号">
              <a-input v-model:value="form.projectNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerId" label="客户ID">
              <AvicCommonSelect
                v-model:value="form.crmCustomerId"
                type="userSelect"
                :defaultShowValue="form.crmCustomerIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerCode" label="客户编码">
              <AvicCommonSelect
                v-model:value="form.crmCustomerCode"
                type="userSelect"
                :defaultShowValue="form.crmCustomerCodeAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerName" label="客户名称">
              <AvicCommonSelect
                v-model:value="form.crmCustomerName"
                type="userSelect"
                :defaultShowValue="form.crmCustomerNameAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorId" label="供应商ID">
              <a-input v-model:value="form.srmVendorId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorCode" label="供应商编码">
              <a-input v-model:value="form.srmVendorCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorName" label="供应商名称">
              <a-input v-model:value="form.srmVendorName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="合同号">
              <a-input v-model:value="form.orderNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inPrice" label="不含税合同单价">
              <a-input v-model:value="form.inPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedPrice" label="计划价">
              <a-input v-model:value="form.plannedPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="arrivalUnitPrice" label="含税单合同价">
              <a-input v-model:value="form.arrivalUnitPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currencyType" label="货币类型">
              <a-input v-model:value="form.currencyType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proMdsItemId" label="产品ID">
              <a-input v-model:value="form.proMdsItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proMdsItemCode" label="产品号【冗余设计】">
              <a-input v-model:value="form.proMdsItemCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsItemId" label="父件ID">
              <a-input v-model:value="form.parentMdsItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lotNo" label="架次">
              <a-input v-model:value="form.lotNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stoveNo" label="炉号">
              <a-input v-model:value="form.stoveNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchNo" label="批号">
              <a-input v-model:value="form.batchNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="missionNo" label="派工号">
              <a-input v-model:value="form.missionNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationNo" label="合格证号">
              <a-input v-model:value="form.certificationNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplyCertificationNo" label="供方合格证号">
              <a-input v-model:value="form.supplyCertificationNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCode" label="质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等">
              <a-input v-model:value="form.qualityCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="foNo" label="任务序列号">
              <a-input v-model:value="form.foNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckBillId" label="检验单ID">
              <a-input v-model:value="form.qcCheckBillId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmOrderListId" label="采购合同子表ID">
              <a-input v-model:value="form.srmOrderListId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentReleaseFlag" label="紧急放行标识^Y-是紧急放行、N-非紧急放行">
              <a-select
                v-model:value="form.urgentReleaseFlag"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.urgentReleaseNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckUserId" label="检验记录人ID">
              <AvicCommonSelect
                v-model:value="form.qcCheckUserId"
                type="userSelect"
                :defaultShowValue="form.qcCheckUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckUserCode" label="检验记录人编码">
              <AvicCommonSelect
                v-model:value="form.qcCheckUserCode"
                type="userSelect"
                :defaultShowValue="form.qcCheckUserCodeAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckUserName" label="检验记录人姓名">
              <AvicCommonSelect
                v-model:value="form.qcCheckUserName"
                type="userSelect"
                :defaultShowValue="form.qcCheckUserNameAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckDate" label="检验记录日期">
              <a-date-picker
                v-model:value="form.qcCheckDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemSerialNo" label="件号">
              <a-input v-model:value="form.itemSerialNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="configNo" label="构型号">
              <a-input v-model:value="form.configNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserId" label="接收人ID^配送使用">
              <a-input v-model:value="form.recieveUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserCode" label="接收人编码^配送使用">
              <a-input v-model:value="form.recieveUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserName" label="接收人姓名^配送使用">
              <a-input v-model:value="form.recieveUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveDate" label="接收日期^配送使用">
              <a-date-picker
                v-model:value="form.recieveDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsInvBalanceBillId" label="结转主表ID">
              <a-input v-model:value="form.wmsInvBalanceBillId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据编号">
              <a-input v-model:value="form.billNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedMoney" label="计划价金额">
              <a-input v-model:value="form.plannedMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inMoney" label="不含税合同金额">
              <a-input v-model:value="form.inMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="arrivalMoney" label="含税合同金额">
              <a-input v-model:value="form.arrivalMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="onhandQty" label="台账结存数量">
              <a-input v-model:value="form.onhandQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="innerOrder" label="排序序号 ^ 内部排序序号">
              <a-input-number
                v-model:value="form.innerOrder"
min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationFlag" label="合格标记 Y合格，X限用，N不合格,0 无效">
              <a-select
                v-model:value="form.certificationFlag"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.smeltNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useLimit" label="限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用">
              <a-select
                v-model:value="form.useLimit"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.mdsItemType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
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
            <a-form-item name="mdsInvOperationType" label="操作类型 O-出库 ，I -入库">
              <a-select
                v-model:value="form.mdsInvOperationType"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.spindleSegmentNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialAccountNo" label="材料账本号">
              <a-input v-model:value="form.materialAccountNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validStorageDate" label="有效保管期--暂时作废">
              <a-date-picker
                v-model:value="form.validStorageDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialAccountId" label="材料账本号ID">
              <a-input v-model:value="form.materialAccountId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialSize" label="材料尺寸">
              <a-input v-model:value="form.materialSize" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineFlag" label="是否限用 YN_flag Y是 ,N 否">
              <a-select
                v-model:value="form.confineFlag"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.confineProduct" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineBatch" label="限用批次">
              <a-input v-model:value="form.confineBatch" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineLot" label="限用架次">
              <a-input v-model:value="form.confineLot" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineDesc" label="限用说明">
              <a-input v-model:value="form.confineDesc" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemQty" label="采购入库单件数量">
              <a-input v-model:value="form.itemQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchNumber" label="批次">
              <a-input v-model:value="form.batchNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="length" label="长度">
              <a-input v-model:value="form.length" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="width" label="宽度">
              <a-input v-model:value="form.width" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="thickness1" label="厚度1">
              <a-input v-model:value="form.thickness1" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="thickness2" label="厚度2">
              <a-input v-model:value="form.thickness2" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="radius" label="半径">
              <a-input v-model:value="form.radius" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wallThickness" label="壁厚">
              <a-input v-model:value="form.wallThickness" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="externalDiameter" label="外径">
              <a-input v-model:value="form.externalDiameter" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ensureDate" label="质保期/最长保管期">
              <a-date-picker
                v-model:value="form.ensureDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionBatchNo" label="生产批号">
              <a-input v-model:value="form.productionBatchNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="heatBatchNo" label="热处理批号">
              <a-input v-model:value="form.heatBatchNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techConditionVersion" label="技术协议版次">
              <a-input v-model:value="form.techConditionVersion" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageDate" label="最长保管期">
              <a-date-picker
                v-model:value="form.storageDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fixedTestPeriod" label="定试周期">
              <a-input v-model:value="form.fixedTestPeriod" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="matetialStatus" label="成品状态">
              <a-input v-model:value="form.matetialStatus" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCategoryLv1Id" label="一级品类ID">
              <a-input v-model:value="form.mdsCategoryLv1Id" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderType" label="订单类型">
              <a-input v-model:value="form.orderType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="acceptanceDate" label="验收日期">
              <a-date-picker
                v-model:value="form.acceptanceDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="archiveDate" label="封存日期">
              <a-date-picker
                v-model:value="form.archiveDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynInstallFlag" label="是否上机标识">
              <a-input v-model:value="form.ynInstallFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="relItemCode" label="实物编码">
              <a-input v-model:value="form.relItemCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门ID 【新增】">
              <a-input v-model:value="form.useDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptCode" label="使用部门编码 【新增】">
              <a-input v-model:value="form.useDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门名称 【新增】">
              <a-input v-model:value="form.useDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditApplyDate" label="稽核申请时间">
              <a-date-picker
                v-model:value="form.auditApplyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditApplyUser" label="稽核申请人名称">
              <a-input v-model:value="form.auditApplyUser" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditStatus" label="稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核">
              <a-select
                v-model:value="form.auditStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.auditNotes" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditUser" label="稽核人名称">
              <a-input v-model:value="form.auditUser" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="auditDate" label="稽核时间">
              <a-date-picker
                v-model:value="form.auditDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsSettlementId" label="开票通知单id">
              <a-input v-model:value="form.pmsSettlementId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="othersValue" label="杂运费">
              <a-input v-model:value="form.othersValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAudit" label="是否进行稽核">
              <a-input v-model:value="form.ynAudit" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noChargedReason" label="未挂账原因">
              <a-input v-model:value="form.noChargedReason" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noInvoiceQuantity" label="未开票数量">
              <a-input v-model:value="form.noInvoiceQuantity" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="printFlag" label="是否打印">
              <a-input v-model:value="form.printFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="printUser" label="打印人">
              <a-input v-model:value="form.printUser" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noticeVendorTime" label="通知供应商时间">
              <a-date-picker
                v-model:value="form.noticeVendorTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billStatus" label="开票状态 0未开票 5已开票">
              <a-select
                v-model:value="form.billStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.settlementNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tempInvoiceNo" label="临时发票号">
              <a-input v-model:value="form.tempInvoiceNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="writeOffStatus" label="核销状态 0未核销 5已核销 （是否已做发票）">
              <a-select
                v-model:value="form.writeOffStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.settlementUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementUserName" label="开票人姓名">
              <a-input v-model:value="form.settlementUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sysLongtermAgreementNo" label="合同财务流水号">
              <a-input v-model:value="form.sysLongtermAgreementNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="rcBillNo" label="到货流水号">
              <a-input v-model:value="form.rcBillNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsPeriodName" label="稽核会计期段">
              <a-input v-model:value="form.mdsPeriodName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserName" label="计划员">
              <a-input v-model:value="form.planUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveUserName" label="供应员">
              <a-input v-model:value="form.receiveUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="returnPrice" label="退库价格">
              <a-input v-model:value="form.returnPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="writeOffType" label="核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销">
              <a-select
                v-model:value="form.writeOffType"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.writeOffReason" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noticeUserId" label="通知人id">
              <a-input v-model:value="form.noticeUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="noticeUserName" label="通知人姓名">
              <a-input v-model:value="form.noticeUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="writeOffPeriodName" label="挂账账期">
              <a-input v-model:value="form.writeOffPeriodName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementStatus" label="挂账状态 0未挂账 5挂账中 10已挂账">
              <a-select
                v-model:value="form.settlementStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.drawingNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplierBatchNumber" label="供应商批次号">
              <a-input v-model:value="form.supplierBatchNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineModel" label="发动机型号">
              <a-input v-model:value="form.engineModel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineQuantity" label="发动机台份">
              <a-input v-model:value="form.engineQuantity" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assemblyDisassembly" label="装配/分解次数">
              <a-input v-model:value="form.assemblyDisassembly" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inspectionFormNumber" label="检验单编号">
              <a-input v-model:value="form.inspectionFormNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="usageBasis" label="领用依据">
              <a-input v-model:value="form.usageBasis" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTo" label="用途">
              <a-input v-model:value="form.useTo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="disposalMethod" label="处置方式">
              <a-input v-model:value="form.disposalMethod" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader
                element-id="1"
                form-type="detail"
                :allow-add="false"
                :allow-download="true"
                :allow-preview="true"
                :form-id="form.id"
              />
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
  closeModal
} = useWmsCamItemTransactionForm({
  props: props,
  emit: emit
});
</script>


