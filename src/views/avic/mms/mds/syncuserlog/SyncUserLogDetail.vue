<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogUsernameZh" label="SYSLOG_USERNAME_ZH">
              <a-input v-model:value="form.syslogUsernameZh" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogUsername" label="SYSLOG_USERNAME">
              <a-input v-model:value="form.syslogUsername" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogUserno" label="SYSLOG_USERNO">
              <a-input v-model:value="form.syslogUserno" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogIp" label="SYSLOG_IP">
              <a-input v-model:value="form.syslogIp" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogTime" label="SYSLOG_TIME">
              <a-date-picker
                v-model:value="form.syslogTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogModule" label="SYSLOG_MODULE">
              <a-input v-model:value="form.syslogModule" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogContent" label="SYSLOG_CONTENT">
              <a-input v-model:value="form.syslogContent" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogOp" label="SYSLOG_OP">
              <a-input v-model:value="form.syslogOp" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogType" label="SYSLOG_TYPE">
              <a-input v-model:value="form.syslogType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogIsGd" label="SYSLOG_IS_GD">
              <a-input v-model:value="form.syslogIsGd" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogResult" label="SYSLOG_RESULT">
              <a-select
                v-model:value="form.syslogResult"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in syslogResultList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogTable" label="SYSLOG_TABLE">
              <a-input v-model:value="form.syslogTable" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogSecretlevel" label="SYSLOG_SECRETLEVEL">
              <a-input v-model:value="form.syslogSecretlevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogFormid" label="SYSLOG_FORMID">
              <a-input v-model:value="form.syslogFormid" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogTitle" label="SYSLOG_TITLE">
              <a-input v-model:value="form.syslogTitle" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useSyncUserLogForm, emits } from './ts/SyncUserLogForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  loading,
  syslogResultList,
  closeModal
} = useSyncUserLogForm({
  props: props,
  emit: emit
});
</script>


