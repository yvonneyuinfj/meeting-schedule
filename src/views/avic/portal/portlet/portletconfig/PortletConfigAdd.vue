<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="500px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="portletCode" label="编码" has-feedback>
              <a-input v-model:value="form.portletCode" :maxLength="100" placeholder="请输入编码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="portletName" label="名称" has-feedback>
              <a-input v-model:value="form.portletName" :maxLength="100" placeholder="请输入名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="resourceType" label="应用范围">
              <a-radio-group
                v-model:value="form.resourceType"
                button-style="solid"
                @change="e => handleRadioChange(e.target.value)"
              >
                <a-radio value="0">系统默认</a-radio>
                <a-radio value="1">角色定义</a-radio>
                <a-radio value="2">用户自定义</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-if="!isUser">
            <a-form-item name="isDefault" label="是否默认">
              <a-radio-group v-model:value="form.isDefault" button-style="solid">
                <a-radio value="1">是</a-radio>
                <a-radio value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-if="isUser">
            <a-form-item
              name="resourceId"
              :rules="[{ required: true, message: '请选择用户!' }]"
              label="用户"
              has-feedback
            >
              <AvicCommonSelect
                v-model:value="form.resourceId"
                type="userSelect"
                placeholder="请选择用户"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-if="isRole">
            <a-form-item
              name="resourceId"
              :rules="[{ required: true, message: '请选择角色!' }]"
              label="角色"
              has-feedback
            >
              <AvicCommonSelect
                v-model:value="form.resourceId"
                type="roleSelect"
                placeholder="请选择角色"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="memo" label="描述">
              <a-textarea
                v-model:value="form.memo"
                :rows="2"
                placeholder="请输入描述"
                :maxLength="200"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button
        title="保存并设计桌面门户"
        type="primary"
        :loading="loading"
        @click="saveForm('addAndDesign')"
      >
        保存并设计桌面门户
      </a-button>
      <a-button title="保存" type="primary" ghost :loading="loading" @click="saveForm">
        保存
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useDemoSingleForm, emits } from './ts/PortletConfigForm'; // 引入表单ts
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
  isUser,
  isRole,
  handleRadioChange,
  rules,
  layout,
  colLayout,
  loading,
  saveForm,
  closeModal
} = useDemoSingleForm({
  props: props,
  emit: emit
});
</script>
