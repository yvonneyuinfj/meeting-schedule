<template>
  <div>
    <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('pdmArchiveNumber')">
          <a-form-item name="pdmArchiveNumber" label="PDM归档编号" :rules="fieldRequired('pdmArchiveNumber')"
                       has-feedback>
            <a-input
                v-model:value="form.pdmArchiveNumber"
                :disabled="fieldDisabled('pdmArchiveNumber')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('fileName')">
          <a-form-item name="fileName" label="文件名称" :rules="fieldRequired('fileName')" has-feedback>
            <a-input
                v-model:value="form.fileName"
                :disabled="fieldDisabled('fileName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('uplink')">
          <a-form-item name="uplink" label="上传人" :rules="fieldRequired('uplink')" has-feedback>
            <a-input
                v-model:value="form.uplink"
                :disabled="fieldDisabled('uplink')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('uploadTime')">
          <a-form-item name="uploadTime" label="上传时间" :rules="fieldRequired('uploadTime')" has-feedback>
            <a-date-picker
                v-model:value="form.uploadTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                :disabled="fieldDisabled('uploadTime')"
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
                table-name="PMS_DELIVERY_DETAIL_DESIGNER"
                @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { emits, usePmsDeliveryDetailDesignerForm } from './ts/PmsDeliveryDetailDesignerForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
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
} = usePmsDeliveryDetailDesignerForm({
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
