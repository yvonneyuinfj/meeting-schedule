<template>
  <AvicModal
    :visible="true"
    title="添加"
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
        layout="horizontal"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogUsernameZh" label="SYSLOG_USERNAME_ZH">
              <a-input
                v-model:value="form.syslogUsernameZh"
                :maxLength="50"
                :auto-focus="true"
                placeholder="请输入SYSLOG_USERNAME_ZH"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogUsername" label="SYSLOG_USERNAME">
              <a-input
                v-model:value="form.syslogUsername"
                :maxLength="50"
                placeholder="请输入SYSLOG_USERNAME"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogUserno" label="SYSLOG_USERNO">
              <a-input
                v-model:value="form.syslogUserno"
                :maxLength="50"
                placeholder="请输入SYSLOG_USERNO"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogIp" label="SYSLOG_IP">
              <a-input
                v-model:value="form.syslogIp"
                :maxLength="128"
                placeholder="请输入SYSLOG_IP"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogTime" label="SYSLOG_TIME">
              <a-date-picker
                v-model:value="form.syslogTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择SYSLOG_TIME"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogModule" label="SYSLOG_MODULE">
              <a-input
                v-model:value="form.syslogModule"
                :maxLength="100"
                placeholder="请输入SYSLOG_MODULE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogContent" label="SYSLOG_CONTENT">
              <a-input
                v-model:value="form.syslogContent"
                :maxLength="2147483647"
                placeholder="请输入SYSLOG_CONTENT"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogOp" label="SYSLOG_OP">
              <a-input
                v-model:value="form.syslogOp"
                :maxLength="50"
                placeholder="请输入SYSLOG_OP"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogType" label="SYSLOG_TYPE">
              <a-input
                v-model:value="form.syslogType"
                :maxLength="50"
                placeholder="请输入SYSLOG_TYPE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogIsGd" label="SYSLOG_IS_GD">
              <a-input
                v-model:value="form.syslogIsGd"
                :maxLength="1"
                placeholder="请输入SYSLOG_IS_GD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogResult" label="SYSLOG_RESULT">
              <a-select
                v-model:value="form.syslogResult"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择SYSLOG_RESULT"
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
              <a-input
                v-model:value="form.syslogTable"
                :maxLength="50"
                placeholder="请输入SYSLOG_TABLE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogSecretlevel" label="SYSLOG_SECRETLEVEL">
              <a-input
                v-model:value="form.syslogSecretlevel"
                :maxLength="50"
                placeholder="请输入SYSLOG_SECRETLEVEL"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogFormid" label="SYSLOG_FORMID">
              <a-input
                v-model:value="form.syslogFormid"
                :maxLength="50"
                placeholder="请输入SYSLOG_FORMID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="syslogTitle" label="SYSLOG_TITLE">
              <a-input
                v-model:value="form.syslogTitle"
                :maxLength="3900"
                placeholder="请输入SYSLOG_TITLE"
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
  rules,
  layout,
  colLayout,
  loading,
  syslogResultList,
  saveForm,
  closeModal
} = useSyncUserLogForm({
  props: props,
  emit: emit
});
</script>

