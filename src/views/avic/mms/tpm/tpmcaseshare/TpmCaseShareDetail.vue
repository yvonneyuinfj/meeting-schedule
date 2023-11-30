<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" class="form-excel-style">
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('classicCaseType')">
          <a-form-item name="classicCaseType" label="经典案例类型" :rules="fieldRequired('classicCaseType')" has-feedback>
            <a-select v-model:value="form.classicCaseType" :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
              :show-search="true" :allow-clear="true" :disabled="fieldDisabled('classicCaseType')">
              <a-select-option v-for="item in classicCaseTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col v-bind="colLayout.cols" v-if="fieldVisible('shareUserId')">
          <a-form-item name="shareUserId" label="分享人" :rules="fieldRequired('shareUserId')" has-feedback>
            <AvicCommonSelect v-model:value="form.shareUserId" type="userSelect" :defaultShowValue="form.shareUserIdAlias"
              :disabled="fieldDisabled('shareUserId')" />
          </a-form-item>
        </a-col>

        <a-col v-bind="colLayout.cols" v-if="fieldVisible('shareDate')">
          <a-form-item name="shareDate" label="分享时间" :rules="fieldRequired('shareDate')" has-feedback>
            <a-date-picker v-model:value="form.shareDate" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
              show-time :disabled="fieldDisabled('shareDate')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('shareDeptId')">
          <a-form-item name="shareDeptId" label="分享部门" :rules="fieldRequired('shareDeptId')" has-feedback>
            <AvicCommonSelect v-model:value="form.shareDeptId" type="deptSelect" :defaultShowValue="form.shareDeptIdAlias"
              :disabled="fieldDisabled('shareDeptId')" />
          </a-form-item>
        </a-col>

      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-textarea v-model:value="form.note" :rows="2" :disabled="fieldDisabled('note')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')">
              <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols3">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader element-id="1" ref="uploadFile" label="上传附件" :form-id="form.id"
              :bpm-instance-object="props.bpmInstanceObject" :form-secret-level="form.secretLevel" :allow-download="true"
              table-name="TPM_CASE_SHARE" @afterUpload="afterUploadEvent" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useTpmCaseShareForm, emits } from './ts/TpmCaseShareForm'; // 引入表单ts
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
  classicCaseTypeList,
  secretLevelList,
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
} = useTpmCaseShareForm({
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
