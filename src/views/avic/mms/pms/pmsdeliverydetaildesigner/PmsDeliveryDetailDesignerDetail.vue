<template>
  <div>
    <a-form
        ref="formRef"
        :model="form"
        class="form-excel-style"
        v-bind="layout"
    >
      <a-row>
        <a-col v-if="fieldVisible('secretLevel')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('secretLevel')" has-feedback label="密级" name="secretLevel">
            <a-select
                v-model:value="form.secretLevel"
                :allow-clear="true"
                :auto-focus="true"
                :disabled="fieldDisabled('secretLevel')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
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
        <a-col v-if="fieldVisible('pdmArchiveNumber')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('pdmArchiveNumber')" has-feedback label="PDM归档编号"
                       name="pdmArchiveNumber">
            <a-input
                v-model:value="form.pdmArchiveNumber"
                :disabled="fieldDisabled('pdmArchiveNumber')"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('fileName')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('fileName')" has-feedback label="文件名称" name="fileName">
            <a-input
                v-model:value="form.fileName"
                :disabled="fieldDisabled('fileName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('uplink')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('uplink')" has-feedback label="上传人" name="uplink">
            <AvicCommonSelect
                v-model:value="form.uplink"
                :defaultShowValue="form.uplinkName"
                :disabled="fieldDisabled('uplink')"
                type="userSelect"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('uploadTime')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('uploadTime')" has-feedback label="上传时间" name="uploadTime">
            <a-date-picker
                v-model:value="form.uploadTime"
                :disabled="fieldDisabled('uploadTime')"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item :rules="attachmentRequired('uploadFile')" label="上传附件" type="attachment">
            <AvicUploader
                ref="uploadFile"
                :allow-download="true"
                :bpm-instance-object="props.bpmInstanceObject"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                element-id="1"
                label="上传附件"
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
