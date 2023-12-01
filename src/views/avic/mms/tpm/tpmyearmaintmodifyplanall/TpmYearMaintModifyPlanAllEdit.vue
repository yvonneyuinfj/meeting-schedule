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
        class="form-excel-style"
       >
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="512"
                :auto-focus="true"
                placeholder="请输入备注"
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
            <a-form-item name="billNo" label="单据号，ND+年两位+两位流水">
              <a-input
                v-model:value="form.billNo"
                :maxLength="32"
                placeholder="请输入单据号，ND+年两位+两位流水"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyYear" label="计划年度">
              <a-input
                v-model:value="form.applyYear"
                :maxLength="8"
                placeholder="请输入计划年度"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planTotalCount" label="计划总数（项）">
              <a-input-number
                v-model:value="form.planTotalCount"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入计划总数（项）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editUserId" label="填报人ID">
              <AvicCommonSelect
                v-model:value="form.editUserId"
                type="userSelect"
                placeholder="请选择填报人ID"
                :defaultShowValue="form.editUserIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editUserName" label="填报人姓名">
              <a-input
                v-model:value="form.editUserName"
                :maxLength="32"
                placeholder="请输入填报人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDate" label="填报日期">
              <a-date-picker
                v-model:value="form.editDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择填报日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editUserCode" label="填报人编码">
              <a-input
                v-model:value="form.editUserCode"
                :maxLength="50"
                placeholder="请输入填报人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptId" label="填报部门ID">
              <AvicCommonSelect
                v-model:value="form.editDeptId"
                type="deptSelect"
                placeholder="请选择填报部门ID"
                :defaultShowValue="form.editDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptCode" label="填报部门编码">
              <a-input
                v-model:value="form.editDeptCode"
                :maxLength="50"
                placeholder="请输入填报部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptName" label="填报部门名称">
              <a-input
                v-model:value="form.editDeptName"
                :maxLength="50"
                placeholder="请输入填报部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billStatus" label="流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过">
              <a-input
                v-model:value="form.billStatus"
                :maxLength="2"
                placeholder="请输入流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planNo" label="计划编号，ND+四位年+三位流水">
              <a-input
                v-model:value="form.planNo"
                :maxLength="50"
                placeholder="请输入计划编号，ND+四位年+三位流水"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetItems" label="预算项目">
              <a-input
                v-model:value="form.budgetItems"
                :maxLength="128"
                placeholder="请输入预算项目"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetBreakdownItems" label="预算分项">
              <a-input
                v-model:value="form.budgetBreakdownItems"
                :maxLength="128"
                placeholder="请输入预算分项"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetOrganizationId" label="预算组织ID">
              <AvicCommonSelect
                v-model:value="form.budgetOrganizationId"
                type="groupSelect"
                placeholder="请选择预算组织ID"
                :defaultShowValue="form.budgetOrganizationIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetOrganizationCode" label="预算组织编码">
              <a-input
                v-model:value="form.budgetOrganizationCode"
                :maxLength="64"
                placeholder="请输入预算组织编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetOrganizationName" label="预算组织名称">
              <AvicCommonSelect
                v-model:value="form.budgetOrganizationName"
                type="groupSelect"
                placeholder="请选择预算组织名称"
                :defaultShowValue="form.budgetOrganizationNameAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称">
              <a-input
                v-model:value="form.projectName"
                :maxLength="128"
                placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planType" label="计划类别，通用代码：TPM_PLAN_TYPE^1维修 2 保养 3 改造">
              <a-select
                v-model:value="form.planType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择计划类别，通用代码：TPM_PLAN_TYPE^1维修 2 保养 3 改造"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="requireDeptId" label="需求部门ID">
              <AvicCommonSelect
                v-model:value="form.requireDeptId"
                type="deptSelect"
                placeholder="请选择需求部门ID"
                :defaultShowValue="form.requireDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="requireDeptCode" label="需求部门编码">
              <a-input
                v-model:value="form.requireDeptCode"
                :maxLength="64"
                placeholder="请输入需求部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="requireDeptName" label="需求部门名称">
              <a-input
                v-model:value="form.requireDeptName"
                :maxLength="64"
                placeholder="请输入需求部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectMoney" label="项目金额（万元）">
              <a-input
                v-model:value="form.projectMoney"
                :maxLength="20"
                placeholder="请输入项目金额（万元）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="estContractSignDate" label="合同预计签订时间">
              <a-date-picker
                v-model:value="form.estContractSignDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择合同预计签订时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="estAcceptanceDate" label="计划验收时间">
              <a-date-picker
                v-model:value="form.estAcceptanceDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划验收时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="agentId" label="经办人ID">
              <AvicCommonSelect
                v-model:value="form.agentId"
                type="userSelect"
                placeholder="请选择经办人ID"
                :defaultShowValue="form.agentIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="agentCode" label="经办人编码">
              <a-input
                v-model:value="form.agentCode"
                :maxLength="64"
                placeholder="请输入经办人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="agentName" label="经办人姓名">
              <a-input
                v-model:value="form.agentName"
                :maxLength="64"
                placeholder="请输入经办人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyNo" label="申请单号">
              <a-input
                v-model:value="form.applyNo"
                :maxLength="64"
                placeholder="请输入申请单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contractNo" label="合同编号">
              <a-input
                v-model:value="form.contractNo"
                :maxLength="128"
                placeholder="请输入合同编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contractSignDate" label="合同实际签订时间">
              <a-date-picker
                v-model:value="form.contractSignDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择合同实际签订时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="acceptanceDate" label="实际完成时间（完成验收）">
              <a-date-picker
                v-model:value="form.acceptanceDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择实际完成时间（完成验收）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="progressStatus" label="进度状态，通用代码TPM_PROGRESS_STATUS^">
              <a-select
                v-model:value="form.progressStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择进度状态，通用代码TPM_PROGRESS_STATUS^"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="changeReason" label="变更原因">
              <a-input
                v-model:value="form.changeReason"
                :maxLength="512"
                placeholder="请输入变更原因"
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
                table-name="TPM_YEAR_MAINT_MODIFY_PLAN_ALL"
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
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  planTypeList,
  progressStatusList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = useTpmYearMaintModifyPlanAllForm({
  props: props,
  emit: emit
});
</script>
