<template>
  <div class="content-form">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classCode" label="资产类别编码">
              <a-input v-model:value="form.classCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="资产类别名称">
              <a-input v-model:value="form.className" disabled />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="modelContent" label="编码规则">
              <a-input v-model:value="form.modelContent" disabled />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTime" label="使用年限">
              <a-input v-model:value="form.useTime" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentAssetClassName" label="上级资产类别名称">
              <a-input v-model:value="form.parentAssetClassName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentAssetCode" label="上级资产类别编码">
              <a-input v-model:value="form.parentAssetCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentId" label="父级分类">
              <AvicTreeSelect
                v-model:value="form.parentId"
                ref="treeSelectRef"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="树节点排序号(本级)">
              <a-input v-model:value="form.treeSort" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
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
  layout,
  colLayout,
  loading,
  baseUrl,
  reloadDetail
} = useFamAssetClassForm({
  props: props,
  emit: emit
});
defineExpose({
  reloadDetail
});
</script>
<style lang="less" scoped>
.content-form {
  max-height: 100%;
  padding: 24px 24px 50px 24px;
  overflow: auto;
}
</style>
