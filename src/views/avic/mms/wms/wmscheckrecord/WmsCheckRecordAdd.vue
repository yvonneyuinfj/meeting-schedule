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
            <a-form-item name="originalOrderDetailId" label="原始单据ID" has-feedback>
              <a-input
                v-model:value="form.originalOrderDetailId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入原始单据ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billSource" label="单据类型" has-feedback>
              <a-select
                v-model:value="form.billSource"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择单据类型"
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
            <a-form-item name="checkSubmitType" label="送检类型" has-feedback>
              <a-select
                v-model:value="form.checkSubmitType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择送检类型"
              >
                <a-select-option
                  v-for="item in checkSubmitTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="送检物料ID" has-feedback>
              <a-input
                v-model:value="form.mdsItemId"
                :maxLength="64"
                placeholder="请输入送检物料ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemCode" label="送检物料CODE">
              <a-input
                v-model:value="form.mdsItemCode"
                :maxLength="64"
                placeholder="请输入送检物料CODE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemName" label="送检物料NAME">
              <a-input
                v-model:value="form.mdsItemName"
                :maxLength="64"
                placeholder="请输入送检物料NAME"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitQty" label="送检数量" has-feedback>
              <a-input
                v-model:value="form.checkSubmitQty"
                :maxLength="20"
                placeholder="请输入送检数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitUserId" label="送检人ID" has-feedback>
              <AvicCommonSelect
                v-model:value="form.checkSubmitUserId"
                type="userSelect"
                placeholder="请选择送检人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitUserCode" label="送检人CODE">
              <a-input
                v-model:value="form.checkSubmitUserCode"
                :maxLength="64"
                placeholder="请输入送检人CODE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitUserName" label="送检人NAME">
              <a-input
                v-model:value="form.checkSubmitUserName"
                :maxLength="64"
                placeholder="请输入送检人NAME"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitDeptId" label="送检部门ID" has-feedback>
              <AvicCommonSelect
                v-model:value="form.checkSubmitDeptId"
                type="deptSelect"
                placeholder="请选择送检部门ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitDeptCode" label="送检部门CODE">
              <a-input
                v-model:value="form.checkSubmitDeptCode"
                :maxLength="64"
                placeholder="请输入送检部门CODE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitDeptName" label="送检部门NAME">
              <a-input
                v-model:value="form.checkSubmitDeptName"
                :maxLength="64"
                placeholder="请输入送检部门NAME"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkSubmitDate" label="送检日期" has-feedback>
              <a-date-picker
                v-model:value="form.checkSubmitDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择送检日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="quanlityNo" label="质量编号">
              <a-input
                v-model:value="form.quanlityNo"
                :maxLength="128"
                placeholder="请输入质量编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkResult" label="检验结果">
              <a-input
                v-model:value="form.checkResult"
                :maxLength="400"
                placeholder="请输入检验结果"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualifiedQty" label="合格数量">
              <a-input
                v-model:value="form.qualifiedQty"
                :maxLength="20"
                placeholder="请输入合格数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="unqualifiedQty" label="不合格数量">
              <a-input
                v-model:value="form.unqualifiedQty"
                :maxLength="20"
                placeholder="请输入不合格数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkOperatorName" label="检验员name">
              <a-input
                v-model:value="form.checkOperatorName"
                :maxLength="128"
                placeholder="请输入检验员name"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkDate" label="检验日期">
              <a-date-picker
                v-model:value="form.checkDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择检验日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualiticationNo" label="合格证编号">
              <a-input
                v-model:value="form.qualiticationNo"
                :maxLength="128"
                placeholder="请输入合格证编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testBillno" label="试验单号">
              <a-input
                v-model:value="form.testBillno"
                :maxLength="128"
                placeholder="请输入试验单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testResult" label="试验结论">
              <a-input
                v-model:value="form.testResult"
                :maxLength="400"
                placeholder="请输入试验结论"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="consumeQty" label="试验数量">
              <a-input
                v-model:value="form.consumeQty"
                :maxLength="128"
                placeholder="请输入试验数量"
              />
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
            <a-form-item name="confineStartLot" label="限用起始架次">
              <a-input
                v-model:value="form.confineStartLot"
                :maxLength="128"
                placeholder="请输入限用起始架次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineEndLot" label="限用截止架次">
              <a-input
                v-model:value="form.confineEndLot"
                :maxLength="128"
                placeholder="请输入限用截止架次"
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
            <a-form-item name="malNo" label="故障单号">
              <a-input
                v-model:value="form.malNo"
                :maxLength="128"
                placeholder="请输入故障单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deflectionBillno" label="偏离单号">
              <a-input
                v-model:value="form.deflectionBillno"
                :maxLength="128"
                placeholder="请输入偏离单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reserveBillno" label="保留单号">
              <a-input
                v-model:value="form.reserveBillno"
                :maxLength="128"
                placeholder="请输入保留单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkStatus" label="检验状态" has-feedback>
              <a-select
                v-model:value="form.checkStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择检验状态"
              >
                <a-select-option
                  v-for="item in checkStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
            <a-form-item name="wmsOutAssignId" label="资源分配表ID">
              <a-input
                v-model:value="form.wmsOutAssignId"
                :maxLength="64"
                placeholder="请输入资源分配表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="docNumber" label="审理单编号">
              <a-input
                v-model:value="form.docNumber"
                :maxLength="128"
                placeholder="请输入审理单编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 " has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 "
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
            <a-form-item name="wmsCheckNo" label="送检单号" has-feedback>
              <a-input
                v-model:value="form.wmsCheckNo"
                :maxLength="64"
                placeholder="请输入送检单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="rejectReason" label="检验驳回原因">
              <a-input
                v-model:value="form.rejectReason"
                :maxLength="300"
                placeholder="请输入检验驳回原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="confineFlag" label="是否限用">
              <a-select
                v-model:value="form.confineFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否限用"
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
            <a-form-item name="checkNote" label="检验备注">
              <a-input
                v-model:value="form.checkNote"
                :maxLength="4000"
                placeholder="请输入检验备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkOperatorCode" label="检验员code">
              <a-input
                v-model:value="form.checkOperatorCode"
                :maxLength="128"
                placeholder="请输入检验员code"
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
import { useWmsCheckRecordForm, emits } from './ts/WmsCheckRecordForm'; // 引入表单ts
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
  billSourceList,
  checkSubmitTypeList,
  checkStatusList,
  secretLevelList,
  confineFlagList,
  saveForm,
  closeModal
} = useWmsCheckRecordForm({
  props: props,
  emit: emit
});
</script>
