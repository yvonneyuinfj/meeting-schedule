<template>
  <AvicModal
      :centered="true"
      :visible="true"
      height="520px"
      title="编辑"
      width="960px"
      @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="form-excel-style"
          v-bind="layout"
      >
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="密级" name="secretLevel">
              <a-select
                  v-model:value="form.secretLevel"
                  :allow-clear="true"
                  :auto-focus="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
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
            <a-form-item label="PDM归档编号" name="pdmArchiveNumber">
              <a-input
                  v-model:value="form.pdmArchiveNumber"
                  :maxLength="64"
                  placeholder="请输入PDM归档编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="文件名称" name="fileName">
              <a-input
                  v-model:value="form.fileName"
                  :maxLength="512"
                  placeholder="请输入文件名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="上传人" name="uplink">
              <a-input
                  v-model:value="form.uplink"
                  :maxLength="64"
                  placeholder="请输入上传人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="上传时间" name="uploadTime">
              <a-date-picker
                  v-model:value="form.uploadTime"
                  format="YYYY-MM-DD"
                  placeholder="请选择上传时间"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="附件"
            >
              <AvicUploader
                  ref="uploadFile"
                  :allow-delete="true"
                  :allow-download="true"
                  :allow-preview="true"
                  :allow-update-secret-level="true"
                  :form-id="form.id"
                  :form-secret-level="form.secretLevel"
                  element-id="1"
                  form-type="edit"
                  table-name="PMS_DELIVERY_DETAIL_DESIGNER"
                  @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button :loading="loading" title="保存" type="primary" @click="saveForm">保存</a-button>
      <a-button ghost title="返回" type="primary" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
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
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = usePmsDeliveryDetailDesignerForm({
  props: props,
  emit: emit
});
</script>
