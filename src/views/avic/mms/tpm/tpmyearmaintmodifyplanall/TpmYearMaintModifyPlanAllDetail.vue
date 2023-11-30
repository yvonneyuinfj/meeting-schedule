<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      class="form-excel-style"
     >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-input
              v-model:value="form.note"
              :auto-focus="true"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="单据号，ND+年两位+两位流水" :rules="fieldRequired('billNo')" has-feedback>
            <a-input
              v-model:value="form.billNo"
              :disabled="fieldDisabled('billNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyYear')">
          <a-form-item name="applyYear" label="计划年度" :rules="fieldRequired('applyYear')" has-feedback>
            <a-input
              v-model:value="form.applyYear"
              :disabled="fieldDisabled('applyYear')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('planTotalCount')">
          <a-form-item name="planTotalCount" label="计划总数（项）" :rules="fieldRequired('planTotalCount')" has-feedback>
            <a-input-number
              v-model:value="form.planTotalCount"
              :min="0"
              :max="999999999999"
              :precision="0"
              :step="1"
              :disabled="fieldDisabled('planTotalCount')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editUserId')">
          <a-form-item name="editUserId" label="填报人ID" :rules="fieldRequired('editUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.editUserId"
              type="userSelect"
              :defaultShowValue="form.editUserIdAlias"
              :disabled="fieldDisabled('editUserId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editUserName')">
          <a-form-item name="editUserName" label="填报人姓名" :rules="fieldRequired('editUserName')" has-feedback>
            <a-input
              v-model:value="form.editUserName"
              :disabled="fieldDisabled('editUserName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDate')">
          <a-form-item name="editDate" label="填报日期" :rules="fieldRequired('editDate')" has-feedback>
            <a-date-picker
              v-model:value="form.editDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('editDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editUserCode')">
          <a-form-item name="editUserCode" label="填报人编码" :rules="fieldRequired('editUserCode')" has-feedback>
            <a-input
              v-model:value="form.editUserCode"
              :disabled="fieldDisabled('editUserCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDeptId')">
          <a-form-item name="editDeptId" label="填报部门ID" :rules="fieldRequired('editDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.editDeptId"
              type="deptSelect"
              :defaultShowValue="form.editDeptIdAlias"
              :disabled="fieldDisabled('editDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDeptCode')">
          <a-form-item name="editDeptCode" label="填报部门编码" :rules="fieldRequired('editDeptCode')" has-feedback>
            <a-input
              v-model:value="form.editDeptCode"
              :disabled="fieldDisabled('editDeptCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDeptName')">
          <a-form-item name="editDeptName" label="填报部门名称" :rules="fieldRequired('editDeptName')" has-feedback>
            <a-input
              v-model:value="form.editDeptName"
              :disabled="fieldDisabled('editDeptName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billStatus')">
          <a-form-item name="billStatus" label="流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过" :rules="fieldRequired('billStatus')" has-feedback>
            <a-input
              v-model:value="form.billStatus"
              :disabled="fieldDisabled('billStatus')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('planNo')">
          <a-form-item name="planNo" label="计划编号，ND+四位年+三位流水" :rules="fieldRequired('planNo')" has-feedback>
            <a-input
              v-model:value="form.planNo"
              :disabled="fieldDisabled('planNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetItems')">
          <a-form-item name="budgetItems" label="预算项目" :rules="fieldRequired('budgetItems')" has-feedback>
            <a-input
              v-model:value="form.budgetItems"
              :disabled="fieldDisabled('budgetItems')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetBreakdownItems')">
          <a-form-item name="budgetBreakdownItems" label="预算分项" :rules="fieldRequired('budgetBreakdownItems')" has-feedback>
            <a-input
              v-model:value="form.budgetBreakdownItems"
              :disabled="fieldDisabled('budgetBreakdownItems')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetOrganizationId')">
          <a-form-item name="budgetOrganizationId" label="预算组织ID" :rules="fieldRequired('budgetOrganizationId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.budgetOrganizationId"
              type="groupSelect"
              :defaultShowValue="form.budgetOrganizationIdAlias"
              :disabled="fieldDisabled('budgetOrganizationId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetOrganizationCode')">
          <a-form-item name="budgetOrganizationCode" label="预算组织编码" :rules="fieldRequired('budgetOrganizationCode')" has-feedback>
            <a-input
              v-model:value="form.budgetOrganizationCode"
              :disabled="fieldDisabled('budgetOrganizationCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetOrganizationName')">
          <a-form-item name="budgetOrganizationName" label="预算组织名称" :rules="fieldRequired('budgetOrganizationName')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.budgetOrganizationName"
              type="groupSelect"
              :defaultShowValue="form.budgetOrganizationNameAlias"
              :disabled="fieldDisabled('budgetOrganizationName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectName')">
          <a-form-item name="projectName" label="项目名称" :rules="fieldRequired('projectName')" has-feedback>
            <a-input
              v-model:value="form.projectName"
              :disabled="fieldDisabled('projectName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('planType')">
          <a-form-item name="planType" label="计划类别，通用代码：TPM_PLAN_TYPE^1维修 2 保养 3 改造" :rules="fieldRequired('planType')" has-feedback>
            <a-select
              v-model:value="form.planType"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('planType')"
            >
              <a-select-option
                v-for="item in planTypeList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('requireDeptId')">
          <a-form-item name="requireDeptId" label="需求部门ID" :rules="fieldRequired('requireDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.requireDeptId"
              type="deptSelect"
              :defaultShowValue="form.requireDeptIdAlias"
              :disabled="fieldDisabled('requireDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('requireDeptCode')">
          <a-form-item name="requireDeptCode" label="需求部门编码" :rules="fieldRequired('requireDeptCode')" has-feedback>
            <a-input
              v-model:value="form.requireDeptCode"
              :disabled="fieldDisabled('requireDeptCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('requireDeptName')">
          <a-form-item name="requireDeptName" label="需求部门名称" :rules="fieldRequired('requireDeptName')" has-feedback>
            <a-input
              v-model:value="form.requireDeptName"
              :disabled="fieldDisabled('requireDeptName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectMoney')">
          <a-form-item name="projectMoney" label="项目金额（万元）" :rules="fieldRequired('projectMoney')" has-feedback>
            <a-input
              v-model:value="form.projectMoney"
              :disabled="fieldDisabled('projectMoney')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('estContractSignDate')">
          <a-form-item name="estContractSignDate" label="合同预计签订时间" :rules="fieldRequired('estContractSignDate')" has-feedback>
            <a-date-picker
              v-model:value="form.estContractSignDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('estContractSignDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('estAcceptanceDate')">
          <a-form-item name="estAcceptanceDate" label="计划验收时间" :rules="fieldRequired('estAcceptanceDate')" has-feedback>
            <a-date-picker
              v-model:value="form.estAcceptanceDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('estAcceptanceDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('agentId')">
          <a-form-item name="agentId" label="经办人ID" :rules="fieldRequired('agentId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.agentId"
              type="userSelect"
              :defaultShowValue="form.agentIdAlias"
              :disabled="fieldDisabled('agentId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('agentCode')">
          <a-form-item name="agentCode" label="经办人编码" :rules="fieldRequired('agentCode')" has-feedback>
            <a-input
              v-model:value="form.agentCode"
              :disabled="fieldDisabled('agentCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('agentName')">
          <a-form-item name="agentName" label="经办人姓名" :rules="fieldRequired('agentName')" has-feedback>
            <a-input
              v-model:value="form.agentName"
              :disabled="fieldDisabled('agentName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyNo')">
          <a-form-item name="applyNo" label="申请单号" :rules="fieldRequired('applyNo')" has-feedback>
            <a-input
              v-model:value="form.applyNo"
              :disabled="fieldDisabled('applyNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('contractNo')">
          <a-form-item name="contractNo" label="合同编号" :rules="fieldRequired('contractNo')" has-feedback>
            <a-input
              v-model:value="form.contractNo"
              :disabled="fieldDisabled('contractNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('contractSignDate')">
          <a-form-item name="contractSignDate" label="合同实际签订时间" :rules="fieldRequired('contractSignDate')" has-feedback>
            <a-date-picker
              v-model:value="form.contractSignDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('contractSignDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('acceptanceDate')">
          <a-form-item name="acceptanceDate" label="实际完成时间（完成验收）" :rules="fieldRequired('acceptanceDate')" has-feedback>
            <a-date-picker
              v-model:value="form.acceptanceDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('acceptanceDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('progressStatus')">
          <a-form-item name="progressStatus" label="进度状态，通用代码TPM_PROGRESS_STATUS^" :rules="fieldRequired('progressStatus')" has-feedback>
            <a-select
              v-model:value="form.progressStatus"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('progressStatus')"
            >
              <a-select-option
                v-for="item in progressStatusList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('changeReason')">
          <a-form-item name="changeReason" label="变更原因" :rules="fieldRequired('changeReason')" has-feedback>
            <a-input
              v-model:value="form.changeReason"
              :disabled="fieldDisabled('changeReason')"
            />
          </a-form-item>
        </a-col>
      <a-col v-bind="colLayout.cols2">
        <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
          <AvicUploader
            element-id="1"
            ref="uploadFile"
            label="上传附件"
            :form-id="form.id"
            :bpm-instance-object="props.bpmInstanceObject"
            :form-secret-level="form.secretLevel"
            :allow-download="true"
            table-name="TPM_YEAR_MAINT_MODIFY_PLAN_ALL"
            @afterUpload="afterUploadEvent"
          />
        </a-form-item>
      </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useTpmYearMaintModifyPlanAllForm, emits } from './ts/TpmYearMaintModifyPlanAllForm'; // 引入表单ts
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
  secretLevelList,
  planTypeList,
  progressStatusList,
  uploadFile,
  afterUploadEvent,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useTpmYearMaintModifyPlanAllForm({
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
