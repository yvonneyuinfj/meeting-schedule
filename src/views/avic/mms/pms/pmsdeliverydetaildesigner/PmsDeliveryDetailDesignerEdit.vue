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
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
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
            <a-form-item name="pdmArchiveNumber" label="PDM归档编号">
              <a-input
                v-model:value="form.pdmArchiveNumber"
                :maxLength="64"
                placeholder="请输入PDM归档编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fileName" label="文件名称">
              <a-input
                v-model:value="form.fileName"
                :maxLength="512"
                placeholder="请输入文件名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="uplink" label="上传人">
              <a-input
                v-model:value="form.uplink"
                :maxLength="64"
                placeholder="请输入上传人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="uploadTime" label="上传时间">
              <a-date-picker
                v-model:value="form.uploadTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择上传时间"
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
                table-name="PMS_DELIVERY_DETAIL_DESIGNER"
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
import { usePmsDeliveryDetailDesignerForm, emits } from './ts/PmsDeliveryDetailDesignerForm'; // 引入表单ts
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
