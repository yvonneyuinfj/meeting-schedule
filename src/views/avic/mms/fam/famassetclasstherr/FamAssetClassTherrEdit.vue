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
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="attribute01" label="父级分类">
              <AvicTreeSelect
                v-model:value="form.attribute01"
                ref="treeSelectRef"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle">
              </AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentId" label="上级节点ID" has-feedback>
              <a-input
                v-model:value="form.parentId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入上级节点ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="树节点排序号(本级)" has-feedback>
              <a-input
                v-model:value="form.treeSort"
                :maxLength="22"
                placeholder="请输入树节点排序号(本级)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="资产类别名称">
              <a-input
                v-model:value="form.className"
                :maxLength="50"
                placeholder="请输入资产类别名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentClassName" label="上级类别名称" has-feedback>
              <a-input
                v-model:value="form.parentClassName"
                :maxLength="50"
                placeholder="请输入上级类别名称"
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
import { useFamAssetClassTherrForm, emits } from './ts/FamAssetClassTherrForm'; //引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  parentId: {
    type: String,
    default: ''
  },
  parentTitle: {
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
  baseUrl,
  loading,
  saveForm,
  closeModal
} = useFamAssetClassTherrForm({
  props: props,
  emit: emit
});
</script>
