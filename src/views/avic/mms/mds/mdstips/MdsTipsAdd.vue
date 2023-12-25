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
            <a-form-item name="title" label="标题">
              <a-input
                v-model:value="form.title"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入标题"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="moduleName" label="模块名">
              <a-input
                v-model:value="form.moduleName"
                :maxLength="128"
                placeholder="请输入模块名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="moduleNameEn" label="模块英文名">
              <a-input
                v-model:value="form.moduleNameEn"
                :maxLength="128"
                placeholder="请输入模块英文名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="content" label="内容">
              <a-input
                v-model:value="form.content"
                :maxLength="512"
                placeholder="请输入内容"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiver" label="接收人ID">
              <AvicCommonSelect
                v-model:value="form.receiver"
                type="userSelect"
                placeholder="请选择接收人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receptionTime" label="接收时间">
              <a-date-picker
                v-model:value="form.receptionTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择接收时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jumpAddress" label="跳转地址">
              <a-input
                v-model:value="form.jumpAddress"
                :maxLength="512"
                placeholder="请输入跳转地址"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="emergencyStratification" label="紧急层度">
              <a-select
                v-model:value="form.emergencyStratification"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择紧急层度"
              >
                <a-select-option
                  v-for="item in emergencyStratificationList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
import { useMdsTipsForm, emits } from './ts/MdsTipsForm'; // 引入表单ts
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
  emergencyStratificationList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsTipsForm({
  props: props,
  emit: emit
});
</script>

