<template>
  <AvicModal :visible="true" title="添加" width="1200px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row>


          <a-col v-bind="colLayout.cols">
            <a-form-item name="shareUserName" label="分享人">
              <a-input v-model:value="form.shareUserName" disabled placeholder="默认当前登录人"
                :defaultValue="proxy.$getLoginUser().name" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="shareDeptName" label="分享部门">
              <a-input v-model:value="form.shareDeptName" disabled placeholder="默认当前部门"
                :defaultValue="proxy.$getLoginUser().deptName" />
            </a-form-item>
          </a-col>


          <a-col v-bind="colLayout.cols">
            <a-form-item name="shareDate" label="分享时间">
              <a-input v-model:value="form.shareDate" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                :disabled="true" :defaultValue="currentTime" />
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
                <AvicUploader element-id="1" form-type="add" ref="uploadFile" :allow-download="true" :allow-preview="true" :file-size-limit="500"
                :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                :form-secret-level="form.secretLevel" table-name="TPM_CASE_SHARE" @afterUpload="afterUploadEvent" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmCaseShareForm, emits } from './ts/TpmCaseShareForm'; // 引入表单ts
const { proxy } = getCurrentInstance();
import dayjs from 'dayjs';
const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
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
  saveAndStartProcess,
  closeModal
} = useTpmCaseShareForm({
  props: props,
  emit: emit
});
onMounted(() => {
  form.value.shareDate = currentTime;
  form.value.shareUserId = proxy.$getLoginUser().id;
  form.value.shareUserName = proxy.$getLoginUser().Name;
  form.value.shareDeptId = proxy.$getLoginUser().deptId;
  form.value.shareDeptName = proxy.$getLoginUser().deptName;
});
</script>
