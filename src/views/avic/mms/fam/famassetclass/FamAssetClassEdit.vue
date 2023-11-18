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
      <a-form ref="formRef" :model="form" :rules="rules" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classCode" label="资产类别编码" has-feedback>
              <a-input
                v-model:value="form.classCode"
                :maxLength="32"
                :auto-focus="true"
                placeholder="请输入资产类别编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="资产类别名称" has-feedback>
              <a-input
                v-model:value="form.className"
                :maxLength="64"
                placeholder="请输入资产类别名称"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="modelContent" label="编码规则" has-feedback>
              <a-input
                v-model:value="form.modelContent"
                :maxLength="32"
                placeholder="请输入编码规则"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTime" label="使用年限" has-feedback>
              <a-input
                v-model:value="form.useTime"
                :maxLength="4"
                placeholder="请输入使用年限"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentAssetClassName" label="上级资产类别名称" has-feedback>
              <a-input
                v-model:value="form.parentAssetClassName"
                :maxLength="64"
                placeholder="请输入上级资产类别名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentAssetCode" label="上级资产类别编码" has-feedback>
              <a-input
                v-model:value="form.parentAssetCode"
                :maxLength="32"
                placeholder="请输入上级资产类别编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentId" label="父级分类">
              <AvicTreeSelect
                v-model:value="form.parentId"
                ref="treeSelectRef"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle">
              </AvicTreeSelect>
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
import { useFamAssetClassForm, emits } from './ts/FamAssetClassForm'; //引入表单ts
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
  loading,
  baseUrl,
  saveForm,
  closeModal
} = useFamAssetClassForm({
  props: props,
  emit: emit
});
</script>
<style lang="less" scoped>
.content-form {
  max-height: 100%;
  padding: 24px 24px 50px 24px;
  overflow: auto;
}
</style>
