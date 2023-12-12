<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="380px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="camerasCode" label="摄像头编号" has-feedback>
              <a-input
                v-model:value="form.camerasCode"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入摄像头编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageLocation" label="摄像头位置" has-feedback>
              <a-input
                v-model:value="form.storageLocation"
                :maxLength="512"
                placeholder="请输入摄像头位置"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ipAddress" label="IP地址">
              <a-input v-model:value="form.ipAddress" :maxLength="64" placeholder="请输入IP地址" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recordDate" label="启用时间">
              <a-date-picker
                v-model:value="form.recordDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择启用时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equiomentStatus" label="设备状态">
              <a-select
                v-model:value="form.equiomentStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择设备状态"
              >
                <a-select-option
                  v-for="item in equiomentStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="televisionCode" label="关联电视机编号" :labelCol="{ span: 6 }">
              <a-input
                v-model:value="form.televisionCode"
                :maxLength="64"
                placeholder="请输入关联电视机编号"
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
            <a-form-item name="note" label="备注">
              <a-textarea
                v-model:value="form.note"
                :maxLength="512"
                placeholder="请输入备注"
                :rows="2"
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
import { useTpmCamerasInventoryForm, emits } from './ts/TpmCamerasInventoryForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
    type: String,
    default: ''
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
  equiomentStatusList,
  secretLevelList,
  saveForm,
  closeModal
} = useTpmCamerasInventoryForm({
  props: props,
  emit: emit
});
</script>

