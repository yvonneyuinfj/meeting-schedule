<template>
  <div class="content-form">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
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
            <a-form-item name="classCode" label="大类编码">
              <a-input v-model:value="form.classCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="大类名称">
              <a-input v-model:value="form.className" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="序号（本级）">
              <a-input-number
                v-model:value="form.treeSort"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
            <a-form-item name="treeLeaf" label="是否末级">
              <a-input :value="form.treeLeaf==='Y'?'是':'否'" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { useTpmAssetClassForm, emits } from './ts/TpmAssetClassForm'; //引入表单ts
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
  secretLevelList,
  baseUrl,
  reloadDetail
} = useTpmAssetClassForm({
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
