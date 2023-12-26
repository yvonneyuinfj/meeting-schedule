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
            <a-form-item name="innerOrder" label="台账序列号^内部排序序号，新台账取值为已有最大序列号加1">
              <a-input-number
                v-model:value="form.innerOrder"
                :auto-focus="true"
min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billSource" label="单据来源 ^ R-原材料,C-成品">
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
            <a-form-item name="currentInitInvQty" label="当前期段期初库存数量">
              <a-input v-model:value="form.currentInitInvQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentSumupInQty" label="当前期段累计入库数量">
              <a-input v-model:value="form.currentSumupInQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentSumupOutQty" label="当前期段累计出库数量">
              <a-input v-model:value="form.currentSumupOutQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentSumupAdjustQty" label="当前期段累计调整数量">
              <a-input v-model:value="form.currentSumupAdjustQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentOnhandQty" label="结存数量 ^ 结存数量=新进数量+现存数量+占用数量+分配数量">
              <a-input v-model:value="form.currentOnhandQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="unusedOnhandQty" label="新进数量^未使用过的数量，结存数量包含新进数量">
              <a-input v-model:value="form.unusedOnhandQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engagedQty" label="占用数量">
              <a-input v-model:value="form.engagedQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="allocatedQty" label="分配数量">
              <a-input v-model:value="form.allocatedQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDate" label="入库日期">
              <a-date-picker
                v-model:value="form.inventoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryStatus" label="库存状态 ^“1-正常，0-冻结，2-异常">
              <a-select
                v-model:value="form.inventoryStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createWmsItemTransactionId" label="创建事务ID^取Wms_Item_Transaction.Id用于记录创建该台账的入库事务">
              <a-input v-model:value="form.createWmsItemTransactionId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptId" label="入库部门ID^取自SYS_DEPT.Id用于记录创建该台账的事务的业务所属部门">
              <a-input v-model:value="form.inDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptCode" label="入库部门编码">
              <a-input v-model:value="form.inDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptName" label="入库部门名称">
              <a-input v-model:value="form.inDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdUserId" label="建账人ID">
              <a-input v-model:value="form.createdUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdUserCode" label="建账人编码">
              <a-input v-model:value="form.createdUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdUserName" label="建账人姓名">
              <a-input v-model:value="form.createdUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdDate" label="建账日期">
              <a-date-picker
                v-model:value="form.createdDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedPrice" label="计划价">
              <a-input v-model:value="form.plannedPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="leaveFactoryDate" label="出厂日期">
              <a-date-picker
                v-model:value="form.leaveFactoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInvThreePeriodId" label="库存三期定义表ID">
              <a-input v-model:value="form.mdsInvThreePeriodId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="envelopCode" label="封装方式代码">
              <a-input v-model:value="form.envelopCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="envelopDate" label="封装日期">
              <a-date-picker
                v-model:value="form.envelopDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitId" label="计量单位^">
              <a-input v-model:value="form.mdsUnitId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCode" label="质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等">
              <a-input v-model:value="form.qualityCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplyCertificationNo" label="供方合格证号">
              <a-input v-model:value="form.supplyCertificationNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectNo" label="项目编号">
              <a-input v-model:value="form.projectNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="合同号">
              <a-input v-model:value="form.orderNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorId" label="供应商ID">
              <a-input v-model:value="form.srmVendorId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerId" label="客户ID">
              <a-input v-model:value="form.crmCustomerId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="foNo" label="任务序列号">
              <a-input v-model:value="form.foNo" disabled />
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
            <a-form-item name="manufactoryDate" label="制造日期">
              <a-date-picker
                v-model:value="form.manufactoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billingDate" label="开单日期">
              <a-date-picker
                v-model:value="form.billingDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oilSealDate" label="本次油封日期">
              <a-date-picker
                v-model:value="form.oilSealDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="nextOilSealDate" label="下次油封日期">
              <a-date-picker
                v-model:value="form.nextOilSealDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckDate" label="本次复验日期">
              <a-date-picker
                v-model:value="form.recheckDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="nextRecheckDate" label="下次复验日期">
              <a-date-picker
                v-model:value="form.nextRecheckDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageDate" label="最长保管日期">
              <a-date-picker
                v-model:value="form.storageDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
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
            <a-form-item name="currencyType" label="货币类型 ^ 实际价的货币类型,继承合同中的货币类型">
              <a-input v-model:value="form.currencyType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inPrice" label="不含税合同单价">
              <a-input v-model:value="form.inPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="arrivalUnitPrice" label="含税合同单价">
              <a-input v-model:value="form.arrivalUnitPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCertificationId" label="合格证ID ^ 厂内检验合格后的合格证ID">
              <a-input v-model:value="form.qcCertificationId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationNo" label="合格证号 ^ 厂内检验合格后的合格证编号">
              <a-input v-model:value="form.certificationNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCheckBillId" label="检验单ID">
              <a-input v-model:value="form.qcCheckBillId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDeptId" label="交付车间ID">
              <a-input v-model:value="form.deliveryDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDeptCode" label="交付车间编码">
              <a-input v-model:value="form.deliveryDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDeptName" label="交付车间名称">
              <a-input v-model:value="form.deliveryDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门ID">
              <a-input v-model:value="form.useDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptCode" label="使用部门编码">
              <a-input v-model:value="form.useDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门名称">
              <a-input v-model:value="form.useDeptName" disabled />
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
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lockReason" label="冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中">
              <a-select
                v-model:value="form.lockReason"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="extensionPeriod" label="延期天数">
              <a-input-number
                v-model:value="form.extensionPeriod"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abnormalReason" label="异常原因 ^1-复验不合格，2-超最长保管期">
              <a-select
                v-model:value="form.abnormalReason"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oilSealPeriod" label="油封周期">
              <a-input-number
                v-model:value="form.oilSealPeriod"
min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckPeriod" label="复验周期">
              <a-input-number
                v-model:value="form.recheckPeriod"
min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedMoney" label="计划价金额">
              <a-input v-model:value="form.plannedMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inMoney" label="不含合同税金额">
              <a-input v-model:value="form.inMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="arrivalMoney" label="含税合同金额">
              <a-input v-model:value="form.arrivalMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCustomerTypeId" label="客户类型ID">
              <a-input v-model:value="form.mdsCustomerTypeId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsWorkLineId" label="分工路线主表ID">
              <a-input v-model:value="form.mdsWorkLineId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsWorkLine" label="分工路线">
              <a-input v-model:value="form.mdsWorkLine" disabled />
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
            <a-form-item name="validStorageDate" label="有效保管期--暂时作废该字段">
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
            <a-form-item name="materialStatus" label="材料状态 1 标准料 ，2 下料中 ，3 余料">
              <a-select
                v-model:value="form.materialStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalMaterialStatus" label="原始材料状态，用以记录站点领料出库前的材料状态，为余料退库登账后还原“材料状态”字段值服务">
              <a-input v-model:value="form.originalMaterialStatus" disabled />
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
            <a-form-item name="ensureDate" label="质保期/有效保管期">
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
            <a-form-item name="manufactoryName" label="制造商名称【SFERP】">
              <a-input v-model:value="form.manufactoryName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsLongtermAgreementLId" label="合同子表id【SFERP】">
              <a-input v-model:value="form.pmsLongtermAgreementLId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="initTdmBusinessNo" label="理化单号">
              <a-input v-model:value="form.initTdmBusinessNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tdmBusinessDate" label="理化日期">
              <a-date-picker
                v-model:value="form.tdmBusinessDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="rcBillNo" label="到货流水号">
              <a-input v-model:value="form.rcBillNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkInfo" label="盘点标志">
              <a-input v-model:value="form.checkInfo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkUserName" label="盘点人">
              <a-input v-model:value="form.checkUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkUserId" label="盘点人id">
              <a-input v-model:value="form.checkUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkTime" label="盘点时间">
              <a-date-picker
                v-model:value="form.checkTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="priceFlag" label="价格标志 值为1取计划价，否则取合同价">
              <a-input v-model:value="form.priceFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentInitInvMoney" label="当前期段期初库存金额">
              <a-input v-model:value="form.currentInitInvMoney" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factPrice" label="成本核算价">
              <a-input v-model:value="form.factPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalWmsItemTransactionId" label="初始验收单事务ID^取Wms_Item_Transaction.Id用于记录该台账采购入库的入库事务">
              <a-input v-model:value="form.originalWmsItemTransactionId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inputBasis" label="输入依据">
              <a-input v-model:value="form.inputBasis" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planBasis" label="计划依据">
              <a-input v-model:value="form.planBasis" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planNo" label="计划编号">
              <a-input v-model:value="form.planNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectNumber" label="批次课题号">
              <a-input v-model:value="form.projectNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handledUserId" label="经办人">
              <a-input v-model:value="form.handledUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handledUserCode" label="经办人CODE">
              <a-input v-model:value="form.handledUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handledUserName" label="经办人名称">
              <a-input v-model:value="form.handledUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="drawingNo" label="图号/型号">
              <a-input v-model:value="form.drawingNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchEngineModel" label="批次发动机型号">
              <a-input v-model:value="form.batchEngineModel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplierBatchNumber" label="供应商批次号">
              <a-input v-model:value="form.supplierBatchNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCertificate" label="质量凭证">
              <a-input v-model:value="form.qualityCertificate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testCategory" label="试验类别">
              <a-input v-model:value="form.testCategory" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testConclusion" label="试验结论">
              <a-input v-model:value="form.testConclusion" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productCondition" label="产品状况/寿命">
              <a-input v-model:value="form.productCondition" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceDeptCode" label="生产单位CODE">
              <a-input v-model:value="form.produceDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceDeptName" label="生产单位名称">
              <a-input v-model:value="form.produceDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceDeptId" label="生产单位ID">
              <a-input v-model:value="form.produceDeptId" disabled />
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
import { useWmsCamItemInventoryForm, emits } from './ts/WmsCamItemInventoryForm'; // 引入表单ts
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
  inventoryStatusList,
  lockReasonList,
  abnormalReasonList,
  certificationFlagList,
  useLimitList,
  secretLevelList,
  confineFlagList,
  materialStatusList,
  closeModal
} = useWmsCamItemInventoryForm({
  props: props,
  emit: emit
});
</script>


