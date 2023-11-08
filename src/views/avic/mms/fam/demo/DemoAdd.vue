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
            <a-form-item name="customedCode" label="模块编码">
              <a-input
                v-model:value="form.customedCode"
                :maxLength="200"
                :auto-focus="true"
                placeholder="请输入模块编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="customedContent" label="自定义内容">
              <a-input
                v-model:value="form.customedContent"
                :maxLength="4294967295"
                placeholder="请输入自定义内容"
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
import { useDemoForm, emits } from './ts/DemoForm'; // 引入表单ts
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
  saveForm,
  closeModal
} = useDemoForm({
  props: props,
  emit: emit
});
</script>

