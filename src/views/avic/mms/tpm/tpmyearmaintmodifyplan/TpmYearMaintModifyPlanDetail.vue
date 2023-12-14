<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal" class="form-excel-style">
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="单据号" :rules="fieldRequired('billNo')" has-feedback>
            <!--            <AvicAutoCode v-model:value="form.billNo" ref="autoCode" code-type="TPM_YEAR_MAINT_MODIFY_PLAN_NO"-->
            <!--                          code-param="TPM_YEAR_MAINT_MODIFY_PLAN" :allow-clear="true"-->
            <!--                          :disabled="fieldDisabled('billNo')"-->
            <!--                          placeholder="请输入单据号"/>-->
            <a-input
                v-model:value="form.billNo"
                :auto-focus="true"
                :disabled="fieldDisabled('billNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editUserName')">
          <a-form-item name="editUserName" label="填报人" :rules="fieldRequired('editUserName')" has-feedback>
            <AvicCommonSelect v-model:value="form.editUserName" type="userSelect" :defaultShowValue="form.editUserName"
                              :disabled="fieldDisabled('editUserName')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDeptName')">
          <a-form-item name="editDeptName" label="填报部门" :rules="fieldRequired('editDeptName')" has-feedback>
            <AvicCommonSelect v-model:value="form.editDeptName" type="deptSelect" :defaultShowValue="form.editDeptName"
                              :disabled="fieldDisabled('editDeptName')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDate')">
          <a-form-item name="editDate" label="填报日期" :rules="fieldRequired('editDate')" has-feedback>
            <a-date-picker v-model:value="form.editDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                           :disabled="fieldDisabled('editDate')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyYear')">
          <a-form-item name="applyYear" label="计划年度" :rules="fieldRequired('applyYear')" has-feedback>
            <a-date-picker v-model:value="form.applyYear" :disabled="fieldDisabled('applyYear')" format="YYYY"
                           value-format="YYYY" picker="year"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select v-model:value="form.secretLevel" :auto-focus="true"
                      :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                      :show-search="true" :allow-clear="true" :disabled="fieldDisabled('secretLevel')">
              <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-input v-model:value="form.note" :disabled="fieldDisabled('note')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols3">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader element-id="1" ref="uploadFile" label="上传附件" :form-id="form.id"
                          :bpm-instance-object="props.bpmInstanceObject" :form-secret-level="form.secretLevel"
                          :allow-download="true"
                          table-name="TPM_YEAR_MAINT_MODIFY_PLAN" @afterUpload="afterUploadEvent"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!--    <TpmYearMaintModifyPlanLEditDetail v-if="fieldVisible('TPM_YEAR_MAINT_MODIFY_PLAN_L')"-->
    <!--      ref="tpmYearMaintModifyPlanLEditDetail" :mainId="formId || form.id" :bpmInstanceObject="bpmInstanceObject"-->
    <!--      :bpmParams="bpmParams" />-->
    <TpmYearMaintModifyPlanLEdit v-if="fieldVisible('TPM_YEAR_MAINT_MODIFY_PLAN_L')"
                                 ref="tpmYearMaintModifyPlanLEdit" :mainId="formId || form.id"
                                 :bpmInstanceObject="bpmInstanceObject" :read-only="form.bpmState !== 'start'"
                                 :bpmParams="bpmParams"/>
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button class="eform_subtable_bpm_button_auth table-handle-button" for="addSubTableButton" label="添加"
              title="添加" style="display: none">
      添加
    </a-button>
    <a-button class="eform_subtable_bpm_button_auth table-handle-button" for="deleteSubTableButton" label="删除"
              title="删除" style="display: none">
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { useTpmYearMaintModifyPlanForm, emits } from './ts/TpmYearMaintModifyPlanForm'; // 引入表单ts
// import TpmYearMaintModifyPlanLEditDetail from '@/views/avic/mms/tpm/tpmyearmaintmodifyplanl/TpmYearMaintModifyPlanLEditDetail.vue'; // 引入子表组件
import TpmYearMaintModifyPlanLEdit from '@/views/avic/mms/tpm/tpmyearmaintmodifyplanl/TpmYearMaintModifyPlanLEdit.vue'; // 引入子表组件

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  bpmParams,
  layout,
  colLayout,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  attachmentRequired,
  autoCode,
  // tpmYearMaintModifyPlanLEditDetail,
  tpmYearMaintModifyPlanLEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useTpmYearMaintModifyPlanForm({
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


