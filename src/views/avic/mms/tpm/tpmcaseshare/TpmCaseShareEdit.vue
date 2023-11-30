<template>
  <AvicModal :visible="true" title="编辑" width="1200px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="shareUserId" label="分享人">
              <AvicCommonSelect v-model:value="form.shareUserId" type="userSelect" placeholder="请选择分享人" disabled
                :defaultShowValue="form.shareUserIdAlias" />
            </a-form-item>
          </a-col>


          <a-col v-bind="colLayout.cols">
            <a-form-item name="shareDeptId" label="分享部门">
              <AvicCommonSelect v-model:value="form.shareDeptId" type="deptSelect" placeholder="请选择分享部门" disabled
                :defaultShowValue="form.shareDeptIdAlias" />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="shareDate" label="分享时间">
              <a-date-picker v-model:value="form.shareDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" show-time
                placeholder="请选择分享时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classicCaseType" label="经典案例类型">
              <a-select v-model:value="form.classicCaseType" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择经典案例类型">
                <a-select-option v-for="item in classicCaseTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="note" label="备注">
              <a-textarea v-model:value="form.note" :rows="2" :maxLength="4000" placeholder="请输入备注" />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols3">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="edit" ref="uploadFile" :allow-download="true" :allow-preview="true"
                :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                :form-secret-level="form.secretLevel" table-name="TPM_CASE_SHARE" @afterUpload="afterUploadEvent" />
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
  rules,
  layout,
  colLayout,
  loading,
  classicCaseTypeList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = useTpmCaseShareForm({
  props: props,
  emit: emit
});
</script>
