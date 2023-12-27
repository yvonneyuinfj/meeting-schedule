<template>
  <AvicModal
    :visible="true"
    title="编辑"
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
            <a-form-item name="innerOrder" label="台账序列号^内部排序序号，新台账取值为已有最大序列号加1">
              <a-input-number
                v-model:value="form.innerOrder"
                :auto-focus="true"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入台账序列号^内部排序序号，新台账取值为已有最大序列号加1"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billSource" label="单据来源 ^ R-原材料,C-成品">
              <a-select
                v-model:value="form.billSource"
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
            <a-form-item name="currentInitInvQty" label="当前期段期初库存数量">
              <a-input
                v-model:value="form.currentInitInvQty"
                :maxLength="20"
                placeholder="请输入当前期段期初库存数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentSumupInQty" label="当前期段累计入库数量">
              <a-input
                v-model:value="form.currentSumupInQty"
                :maxLength="20"
                placeholder="请输入当前期段累计入库数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentSumupOutQty" label="当前期段累计出库数量">
              <a-input
                v-model:value="form.currentSumupOutQty"
                :maxLength="20"
                placeholder="请输入当前期段累计出库数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentSumupAdjustQty" label="当前期段累计调整数量">
              <a-input
                v-model:value="form.currentSumupAdjustQty"
                :maxLength="20"
                placeholder="请输入当前期段累计调整数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentOnhandQty" label="结存数量 ^ 结存数量=新进数量+现存数量+占用数量+分配数量">
              <a-input
                v-model:value="form.currentOnhandQty"
                :maxLength="20"
                placeholder="请输入结存数量 ^ 结存数量=新进数量+现存数量+占用数量+分配数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="unusedOnhandQty" label="新进数量^未使用过的数量，结存数量包含新进数量">
              <a-input
                v-model:value="form.unusedOnhandQty"
                :maxLength="20"
                placeholder="请输入新进数量^未使用过的数量，结存数量包含新进数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engagedQty" label="占用数量">
              <a-input
                v-model:value="form.engagedQty"
                :maxLength="20"
                placeholder="请输入占用数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="allocatedQty" label="分配数量">
              <a-input
                v-model:value="form.allocatedQty"
                :maxLength="20"
                placeholder="请输入分配数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDate" label="入库日期">
              <a-date-picker
                v-model:value="form.inventoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择入库日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryStatus" label="库存状态 ^“1-正常，0-冻结，2-异常">
              <a-select
                v-model:value="form.inventoryStatus"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createWmsItemTransactionId" label="创建事务ID^取Wms_Item_Transaction.Id用于记录创建该台账的入库事务">
              <a-input
                v-model:value="form.createWmsItemTransactionId"
                :maxLength="64"
                placeholder="请输入创建事务ID^取Wms_Item_Transaction.Id用于记录创建该台账的入库事务"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptId" label="入库部门ID^取自SYS_DEPT.Id用于记录创建该台账的事务的业务所属部门">
              <a-input
                v-model:value="form.inDeptId"
                :maxLength="64"
                placeholder="请输入入库部门ID^取自SYS_DEPT.Id用于记录创建该台账的事务的业务所属部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptCode" label="入库部门编码">
              <a-input
                v-model:value="form.inDeptCode"
                :maxLength="64"
                placeholder="请输入入库部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptName" label="入库部门名称">
              <a-input
                v-model:value="form.inDeptName"
                :maxLength="128"
                placeholder="请输入入库部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdUserId" label="建账人ID">
              <a-input
                v-model:value="form.createdUserId"
                :maxLength="64"
                placeholder="请输入建账人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdUserCode" label="建账人编码">
              <a-input
                v-model:value="form.createdUserCode"
                :maxLength="64"
                placeholder="请输入建账人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdUserName" label="建账人姓名">
              <a-input
                v-model:value="form.createdUserName"
                :maxLength="128"
                placeholder="请输入建账人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="createdDate" label="建账日期">
              <a-date-picker
                v-model:value="form.createdDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择建账日期"
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
            <a-form-item name="leaveFactoryDate" label="出厂日期">
              <a-date-picker
                v-model:value="form.leaveFactoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInvThreePeriodId" label="库存三期定义表ID">
              <a-input
                v-model:value="form.mdsInvThreePeriodId"
                :maxLength="64"
                placeholder="请输入库存三期定义表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="envelopCode" label="封装方式代码">
              <a-input
                v-model:value="form.envelopCode"
                :maxLength="64"
                placeholder="请输入封装方式代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="envelopDate" label="封装日期">
              <a-date-picker
                v-model:value="form.envelopDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封装日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitId" label="计量单位^">
              <a-input
                v-model:value="form.mdsUnitId"
                :maxLength="64"
                placeholder="请输入计量单位^"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCode" label="质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等">
              <a-input
                v-model:value="form.qualityCode"
                :maxLength="512"
                placeholder="请输入质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等"
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
            <a-form-item name="projectNo" label="项目编号">
              <a-input
                v-model:value="form.projectNo"
                :maxLength="64"
                placeholder="请输入项目编号"
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
            <a-form-item name="srmVendorId" label="供应商ID">
              <a-input
                v-model:value="form.srmVendorId"
                :maxLength="64"
                placeholder="请输入供应商ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="crmCustomerId" label="客户ID">
              <a-input
                v-model:value="form.crmCustomerId"
                :maxLength="64"
                placeholder="请输入客户ID"
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
            <a-form-item name="manufactoryDate" label="制造日期">
              <a-date-picker
                v-model:value="form.manufactoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择制造日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billingDate" label="开单日期">
              <a-date-picker
                v-model:value="form.billingDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开单日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oilSealDate" label="本次油封日期">
              <a-date-picker
                v-model:value="form.oilSealDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择本次油封日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="nextOilSealDate" label="下次油封日期">
              <a-date-picker
                v-model:value="form.nextOilSealDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下次油封日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckDate" label="本次复验日期">
              <a-date-picker
                v-model:value="form.recheckDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择本次复验日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="nextRecheckDate" label="下次复验日期">
              <a-date-picker
                v-model:value="form.nextRecheckDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下次复验日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageDate" label="最长保管日期">
              <a-date-picker
                v-model:value="form.storageDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期"
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
                :maxLength="256"
                placeholder="请输入派工号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currencyType" label="货币类型 ^ 实际价的货币类型,继承合同中的货币类型">
              <a-input
                v-model:value="form.currencyType"
                :maxLength="10"
                placeholder="请输入货币类型 ^ 实际价的货币类型,继承合同中的货币类型"
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
            <a-form-item name="arrivalUnitPrice" label="含税合同单价">
              <a-input
                v-model:value="form.arrivalUnitPrice"
                :maxLength="20"
                placeholder="请输入含税合同单价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCertificationId" label="合格证ID ^ 厂内检验合格后的合格证ID">
              <a-input
                v-model:value="form.qcCertificationId"
                :maxLength="64"
                placeholder="请输入合格证ID ^ 厂内检验合格后的合格证ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationNo" label="合格证号 ^ 厂内检验合格后的合格证编号">
              <a-input
                v-model:value="form.certificationNo"
                :maxLength="128"
                placeholder="请输入合格证号 ^ 厂内检验合格后的合格证编号"
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
            <a-form-item name="deliveryDeptId" label="交付车间ID">
              <a-input
                v-model:value="form.deliveryDeptId"
                :maxLength="64"
                placeholder="请输入交付车间ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDeptCode" label="交付车间编码">
              <a-input
                v-model:value="form.deliveryDeptCode"
                :maxLength="64"
                placeholder="请输入交付车间编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDeptName" label="交付车间名称">
              <a-input
                v-model:value="form.deliveryDeptName"
                :maxLength="128"
                placeholder="请输入交付车间名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门ID">
              <a-input
                v-model:value="form.useDeptId"
                :maxLength="64"
                placeholder="请输入使用部门ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptCode" label="使用部门编码">
              <a-input
                v-model:value="form.useDeptCode"
                :maxLength="64"
                placeholder="请输入使用部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门名称">
              <a-input
                v-model:value="form.useDeptName"
                :maxLength="128"
                placeholder="请输入使用部门名称"
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
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="2048"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lockReason" label="冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中">
              <a-select
                v-model:value="form.lockReason"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="extensionPeriod" label="延期天数">
              <a-input-number
                v-model:value="form.extensionPeriod"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入延期天数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abnormalReason" label="异常原因 ^1-复验不合格，2-超最长保管期">
              <a-select
                v-model:value="form.abnormalReason"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oilSealPeriod" label="油封周期">
              <a-input-number
                v-model:value="form.oilSealPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入油封周期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckPeriod" label="复验周期">
              <a-input-number
                v-model:value="form.recheckPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入复验周期"
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
            <a-form-item name="inMoney" label="不含合同税金额">
              <a-input
                v-model:value="form.inMoney"
                :maxLength="20"
                placeholder="请输入不含合同税金额"
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
            <a-form-item name="mdsCustomerTypeId" label="客户类型ID">
              <a-input
                v-model:value="form.mdsCustomerTypeId"
                :maxLength="64"
                placeholder="请输入客户类型ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsWorkLineId" label="分工路线主表ID">
              <a-input
                v-model:value="form.mdsWorkLineId"
                :maxLength="64"
                placeholder="请输入分工路线主表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsWorkLine" label="分工路线">
              <a-input
                v-model:value="form.mdsWorkLine"
                :maxLength="128"
                placeholder="请输入分工路线"
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
            <a-form-item name="validStorageDate" label="有效保管期--暂时作废该字段">
              <a-date-picker
                v-model:value="form.validStorageDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期--暂时作废该字段"
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
            <a-form-item name="materialStatus" label="材料状态 1 标准料 ，2 下料中 ，3 余料">
              <a-select
                v-model:value="form.materialStatus"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalMaterialStatus" label="原始材料状态，用以记录站点领料出库前的材料状态，为余料退库登账后还原“材料状态”字段值服务">
              <a-input
                v-model:value="form.originalMaterialStatus"
                :maxLength="2"
                placeholder="请输入原始材料状态，用以记录站点领料出库前的材料状态，为余料退库登账后还原“材料状态”字段值服务"
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
            <a-form-item name="ensureDate" label="质保期/有效保管期">
              <a-date-picker
                v-model:value="form.ensureDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保期/有效保管期"
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
            <a-form-item name="manufactoryName" label="制造商名称【SFERP】">
              <a-input
                v-model:value="form.manufactoryName"
                :maxLength="512"
                placeholder="请输入制造商名称【SFERP】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsLongtermAgreementLId" label="合同子表id【SFERP】">
              <a-input
                v-model:value="form.pmsLongtermAgreementLId"
                :maxLength="64"
                placeholder="请输入合同子表id【SFERP】"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="initTdmBusinessNo" label="理化单号">
              <a-input
                v-model:value="form.initTdmBusinessNo"
                :maxLength="512"
                placeholder="请输入理化单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tdmBusinessDate" label="理化日期">
              <a-date-picker
                v-model:value="form.tdmBusinessDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择理化日期"
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
            <a-form-item name="checkInfo" label="盘点标志">
              <a-input
                v-model:value="form.checkInfo"
                :maxLength="1024"
                placeholder="请输入盘点标志"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkUserName" label="盘点人">
              <a-input
                v-model:value="form.checkUserName"
                :maxLength="64"
                placeholder="请输入盘点人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkUserId" label="盘点人id">
              <a-input
                v-model:value="form.checkUserId"
                :maxLength="64"
                placeholder="请输入盘点人id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkTime" label="盘点时间">
              <a-date-picker
                v-model:value="form.checkTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择盘点时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="priceFlag" label="价格标志 值为1取计划价，否则取合同价">
              <a-input
                v-model:value="form.priceFlag"
                :maxLength="64"
                placeholder="请输入价格标志 值为1取计划价，否则取合同价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentInitInvMoney" label="当前期段期初库存金额">
              <a-input
                v-model:value="form.currentInitInvMoney"
                :maxLength="20"
                placeholder="请输入当前期段期初库存金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factPrice" label="成本核算价">
              <a-input
                v-model:value="form.factPrice"
                :maxLength="20"
                placeholder="请输入成本核算价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalWmsItemTransactionId" label="初始验收单事务ID^取Wms_Item_Transaction.Id用于记录该台账采购入库的入库事务">
              <a-input
                v-model:value="form.originalWmsItemTransactionId"
                :maxLength="64"
                placeholder="请输入初始验收单事务ID^取Wms_Item_Transaction.Id用于记录该台账采购入库的入库事务"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inputBasis" label="输入依据">
              <a-input
                v-model:value="form.inputBasis"
                :maxLength="64"
                placeholder="请输入输入依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planBasis" label="计划依据">
              <a-input
                v-model:value="form.planBasis"
                :maxLength="64"
                placeholder="请输入计划依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planNo" label="计划编号">
              <a-input
                v-model:value="form.planNo"
                :maxLength="64"
                placeholder="请输入计划编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectNumber" label="批次课题号">
              <a-input
                v-model:value="form.projectNumber"
                :maxLength="64"
                placeholder="请输入批次课题号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handledUserId" label="经办人">
              <a-input
                v-model:value="form.handledUserId"
                :maxLength="64"
                placeholder="请输入经办人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handledUserCode" label="经办人CODE">
              <a-input
                v-model:value="form.handledUserCode"
                :maxLength="64"
                placeholder="请输入经办人CODE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handledUserName" label="经办人名称">
              <a-input
                v-model:value="form.handledUserName"
                :maxLength="64"
                placeholder="请输入经办人名称"
              />
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
            <a-form-item name="batchEngineModel" label="批次发动机型号">
              <a-input
                v-model:value="form.batchEngineModel"
                :maxLength="64"
                placeholder="请输入批次发动机型号"
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
            <a-form-item name="qualityCertificate" label="质量凭证">
              <a-input
                v-model:value="form.qualityCertificate"
                :maxLength="64"
                placeholder="请输入质量凭证"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testCategory" label="试验类别">
              <a-input
                v-model:value="form.testCategory"
                :maxLength="64"
                placeholder="请输入试验类别"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testConclusion" label="试验结论">
              <a-input
                v-model:value="form.testConclusion"
                :maxLength="64"
                placeholder="请输入试验结论"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productCondition" label="产品状况/寿命">
              <a-input
                v-model:value="form.productCondition"
                :maxLength="64"
                placeholder="请输入产品状况/寿命"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceDeptCode" label="生产单位CODE">
              <a-input
                v-model:value="form.produceDeptCode"
                :maxLength="64"
                placeholder="请输入生产单位CODE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceDeptName" label="生产单位名称">
              <a-input
                v-model:value="form.produceDeptName"
                :maxLength="64"
                placeholder="请输入生产单位名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceDeptId" label="生产单位ID">
              <a-input
                v-model:value="form.produceDeptId"
                :maxLength="64"
                placeholder="请输入生产单位ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
              label="附件"
            >
              <AvicUploader
                element-id="1"
                form-type="edit"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                table-name="WMS_CAM_ITEM_INVENTORY"
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
  rules,
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
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = useWmsCamItemInventoryForm({
  props: props,
  emit: emit
});
</script>


