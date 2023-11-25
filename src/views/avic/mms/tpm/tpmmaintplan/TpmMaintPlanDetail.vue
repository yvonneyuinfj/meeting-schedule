<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      class="form-excel-style"
     >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('tpmStandardId')">
          <a-form-item name="tpmStandardId" label="设备标准主表ID" :rules="fieldRequired('tpmStandardId')" has-feedback>
            <a-input
              v-model:value="form.tpmStandardId"
              :auto-focus="true"
              :disabled="fieldDisabled('tpmStandardId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('tpmStandardMaintenanceId')">
          <a-form-item name="tpmStandardMaintenanceId" label="TPM_STANDARD_MAINTENANCE_ID" :rules="fieldRequired('tpmStandardMaintenanceId')" has-feedback>
            <a-input
              v-model:value="form.tpmStandardMaintenanceId"
              :disabled="fieldDisabled('tpmStandardMaintenanceId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('tpmInventoryId')">
          <a-form-item name="tpmInventoryId" label="设备台账ID" :rules="fieldRequired('tpmInventoryId')" has-feedback>
            <a-input
              v-model:value="form.tpmInventoryId"
              :disabled="fieldDisabled('tpmInventoryId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintenanceCycle')">
          <a-form-item name="maintenanceCycle" label="保养周期(月)" :rules="fieldRequired('maintenanceCycle')" has-feedback>
            <a-input-number
              v-model:value="form.maintenanceCycle"
              :min="0"
              :max="9999999999"
              :precision="0"
              :step="1"
              :disabled="fieldDisabled('maintenanceCycle')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDate')">
          <a-form-item name="editDate" label="编制日期" :rules="fieldRequired('editDate')" has-feedback>
            <a-date-picker
              v-model:value="form.editDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('editDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('planMaintenanceDate')">
          <a-form-item name="planMaintenanceDate" label="计划保养日期" :rules="fieldRequired('planMaintenanceDate')" has-feedback>
            <a-date-picker
              v-model:value="form.planMaintenanceDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('planMaintenanceDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintenanceStatus')">
          <a-form-item name="maintenanceStatus" label="保养状态" :rules="fieldRequired('maintenanceStatus')" has-feedback>
            <a-select
              v-model:value="form.maintenanceStatus"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('maintenanceStatus')"
            >
              <a-select-option
                v-for="item in maintenanceStatusList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintenanceFinishDate')">
          <a-form-item name="maintenanceFinishDate" label="保养完成日期" :rules="fieldRequired('maintenanceFinishDate')" has-feedback>
            <a-date-picker
              v-model:value="form.maintenanceFinishDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('maintenanceFinishDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintUserId')">
          <a-form-item name="maintUserId" label="保养负责人ID" :rules="fieldRequired('maintUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.maintUserId"
              type="userSelect"
              :defaultShowValue="form.maintUserIdAlias"
              :disabled="fieldDisabled('maintUserId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintUserCode')">
          <a-form-item name="maintUserCode" label="保养负责人编码" :rules="fieldRequired('maintUserCode')" has-feedback>
            <a-input
              v-model:value="form.maintUserCode"
              :disabled="fieldDisabled('maintUserCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintUserName')">
          <a-form-item name="maintUserName" label="保养负责人姓名" :rules="fieldRequired('maintUserName')" has-feedback>
            <a-input
              v-model:value="form.maintUserName"
              :disabled="fieldDisabled('maintUserName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('actrualMaintUserId')">
          <a-form-item name="actrualMaintUserId" label="实际保养人ID" :rules="fieldRequired('actrualMaintUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.actrualMaintUserId"
              type="userSelect"
              :defaultShowValue="form.actrualMaintUserIdAlias"
              :disabled="fieldDisabled('actrualMaintUserId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('actrualMaintUserCode')">
          <a-form-item name="actrualMaintUserCode" label="实际保养人编码" :rules="fieldRequired('actrualMaintUserCode')" has-feedback>
            <a-input
              v-model:value="form.actrualMaintUserCode"
              :disabled="fieldDisabled('actrualMaintUserCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('actrualMaintUserName')">
          <a-form-item name="actrualMaintUserName" label="实际保养人姓名" :rules="fieldRequired('actrualMaintUserName')" has-feedback>
            <a-input
              v-model:value="form.actrualMaintUserName"
              :disabled="fieldDisabled('actrualMaintUserName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('dispatchDate')">
          <a-form-item name="dispatchDate" label="下达日期" :rules="fieldRequired('dispatchDate')" has-feedback>
            <a-date-picker
              v-model:value="form.dispatchDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('dispatchDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('dispatchUserId')">
          <a-form-item name="dispatchUserId" label="下达人ID" :rules="fieldRequired('dispatchUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.dispatchUserId"
              type="userSelect"
              :defaultShowValue="form.dispatchUserIdAlias"
              :disabled="fieldDisabled('dispatchUserId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('dispatchUserCode')">
          <a-form-item name="dispatchUserCode" label="下达人编码" :rules="fieldRequired('dispatchUserCode')" has-feedback>
            <a-input
              v-model:value="form.dispatchUserCode"
              :disabled="fieldDisabled('dispatchUserCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('dispatchUserName')">
          <a-form-item name="dispatchUserName" label="下达人姓名" :rules="fieldRequired('dispatchUserName')" has-feedback>
            <a-input
              v-model:value="form.dispatchUserName"
              :disabled="fieldDisabled('dispatchUserName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('goodConditionFlag')">
          <a-form-item name="goodConditionFlag" label="完好标识" :rules="fieldRequired('goodConditionFlag')" has-feedback>
            <a-select
              v-model:value="form.goodConditionFlag"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('goodConditionFlag')"
            >
              <a-select-option
                v-for="item in goodConditionFlagList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billStatus')">
          <a-form-item name="billStatus" label="保养计划流程状态" :rules="fieldRequired('billStatus')" has-feedback>
            <a-input
              v-model:value="form.billStatus"
              :disabled="fieldDisabled('billStatus')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('feedbackBillStatus')">
          <a-form-item name="feedbackBillStatus" label="保养反馈流程状态" :rules="fieldRequired('feedbackBillStatus')" has-feedback>
            <a-input
              v-model:value="form.feedbackBillStatus"
              :disabled="fieldDisabled('feedbackBillStatus')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('oldLastMaintenPlanDate')">
          <a-form-item name="oldLastMaintenPlanDate" label="最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）" :rules="fieldRequired('oldLastMaintenPlanDate')" has-feedback>
            <a-date-picker
              v-model:value="form.oldLastMaintenPlanDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('oldLastMaintenPlanDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="计划编号" :rules="fieldRequired('billNo')" has-feedback>
            <a-input
              v-model:value="form.billNo"
              :disabled="fieldDisabled('billNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintenPlanType')">
          <a-form-item name="maintenPlanType" label="保养计划类型" :rules="fieldRequired('maintenPlanType')" has-feedback>
            <a-input
              v-model:value="form.maintenPlanType"
              :disabled="fieldDisabled('maintenPlanType')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('backReason')">
          <a-form-item name="backReason" label="驳回原因" :rules="fieldRequired('backReason')" has-feedback>
            <a-input
              v-model:value="form.backReason"
              :disabled="fieldDisabled('backReason')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('completeDate')">
          <a-form-item name="completeDate" label="完工日期" :rules="fieldRequired('completeDate')" has-feedback>
            <a-date-picker
              v-model:value="form.completeDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('completeDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-input
              v-model:value="form.note"
              :disabled="fieldDisabled('note')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select
              v-model:value="form.secretLevel"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')"
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
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useTpmMaintPlanForm, emits } from './ts/TpmMaintPlanForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
  bpmOperatorRefresh: {
    type: Function
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  maintenanceStatusList,
  goodConditionFlagList,
  secretLevelList,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useTpmMaintPlanForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>
