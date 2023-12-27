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
            <a-form-item name="mdsItemId" label="物料">
              <a-input
                v-model:value="form.mdsItemId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入物料"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitId" label="计量单位 ">
              <a-input
                v-model:value="form.mdsUnitId"
                :maxLength="64"
                placeholder="请输入计量单位 "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inQty" label="入库数量">
              <a-input-number
                v-model:value="form.inQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入入库数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inUserId" label="入库登账人ID">
              <a-input
                v-model:value="form.inUserId"
                :maxLength="64"
                placeholder="请输入入库登账人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inUserCode" label="入库登账人编码">
              <a-input
                v-model:value="form.inUserCode"
                :maxLength="64"
                placeholder="请输入入库登账人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inUserName" label="入库登账人姓名">
              <a-input
                v-model:value="form.inUserName"
                :maxLength="128"
                placeholder="请输入入库登账人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDate" label="入库登账日期">
              <a-date-picker
                v-model:value="form.inDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择入库登账日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptId" label="入库登账人所在部门ID">
              <a-input
                v-model:value="form.inDeptId"
                :maxLength="64"
                placeholder="请输入入库登账人所在部门ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptCode" label="入库登账人所在部门编码">
              <a-input
                v-model:value="form.inDeptCode"
                :maxLength="64"
                placeholder="请输入入库登账人所在部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inDeptName" label="入库登账人所在部门名称">
              <a-input
                v-model:value="form.inDeptName"
                :maxLength="128"
                placeholder="请输入入库登账人所在部门名称"
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
            <a-form-item name="oilSealDate" label="油封日期">
              <a-date-picker
                v-model:value="form.oilSealDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择油封日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckDate" label="复验日期">
              <a-date-picker
                v-model:value="form.recheckDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择复验日期"
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
            <a-form-item name="proMdsItemId" label="产品ID">
              <a-input
                v-model:value="form.proMdsItemId"
                :maxLength="64"
                placeholder="请输入产品ID"
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
                :maxLength="128"
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
                :maxLength="64"
                placeholder="请输入批号"
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
            <a-form-item name="currencyType" label="货币类型 ^ ">
              <a-input
                v-model:value="form.currencyType"
                :maxLength="10"
                placeholder="请输入货币类型 ^ "
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
            <a-form-item name="certificationNo" label="合格证号">
              <a-input
                v-model:value="form.certificationNo"
                :maxLength="128"
                placeholder="请输入合格证号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCode" label="质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等">
              <a-input
                v-model:value="form.qualityCode"
                :maxLength="64"
                placeholder="请输入质量编号 ^ 用于唯一标识本批物料,如:到货送检编号,本厂合格证号等"
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
            <a-form-item name="urgentReleaseFlag" label="紧急放行标识^Y-是紧急放行、N-非紧急放行">
              <a-input
                v-model:value="form.urgentReleaseFlag"
                :maxLength="2"
                placeholder="请输入紧急放行标识^Y-是紧急放行、N-非紧急放行"
              />
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
            <a-form-item name="refuseReason" label="拒绝原因">
              <a-input
                v-model:value="form.refuseReason"
                :maxLength="512"
                placeholder="请输入拒绝原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynPrint" label="打印标识 ^ N-未打印,Y-已打印">
              <a-input
                v-model:value="form.ynPrint"
                :maxLength="4"
                placeholder="请输入打印标识 ^ N-未打印,Y-已打印"
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
            <a-form-item name="supplyCertificationNo" label="供方合格证号">
              <a-input
                v-model:value="form.supplyCertificationNo"
                :maxLength="1024"
                placeholder="请输入供方合格证号"
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
            <a-form-item name="srmOrderListId" label="采购合同子表ID">
              <a-input
                v-model:value="form.srmOrderListId"
                :maxLength="64"
                placeholder="请输入采购合同子表ID"
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
            <a-form-item name="deliveryDeptId" label="交付部门ID">
              <a-input
                v-model:value="form.deliveryDeptId"
                :maxLength="64"
                placeholder="请输入交付部门ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDeptCode" label="交付部门编码">
              <a-input
                v-model:value="form.deliveryDeptCode"
                :maxLength="64"
                placeholder="请输入交付部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDeptName" label="交付部门名称">
              <a-input
                v-model:value="form.deliveryDeptName"
                :maxLength="128"
                placeholder="请输入交付部门名称"
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
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="2048"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationFlag" label="合格标记 Y合格，X限用，N不合格,0 无效">
              <a-input
                v-model:value="form.certificationFlag"
                :maxLength="2"
                placeholder="请输入合格标记 Y合格，X限用，N不合格,0 无效"
              />
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
              <a-input
                v-model:value="form.useLimit"
                :maxLength="4"
                placeholder="请输入限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
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
            <a-form-item name="mdsItemType" label="物料类型">
              <a-input
                v-model:value="form.mdsItemType"
                :maxLength="8"
                placeholder="请输入物料类型"
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
            <a-form-item name="batchNumber" label="批次">
              <a-input
                v-model:value="form.batchNumber"
                :maxLength="128"
                placeholder="请输入批次"
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
import { useWmsInvInBillLForm, emits } from './ts/WmsInvInBillLForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
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
  secretLevelList,
  saveForm,
  closeModal
} = useWmsInvInBillLForm({
  props: props,
  emit: emit
});
</script>
