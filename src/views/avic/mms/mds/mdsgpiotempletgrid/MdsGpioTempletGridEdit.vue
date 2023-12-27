<template>
  <AvicModal :visible="true" title="编辑" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="gridCode" label="表格编号" has-feedback>
              <a-input v-model:value="form.gridCode" :maxLength="256" :auto-focus="true" placeholder="请输入表格编号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="gridName" label="表格名称" has-feedback>
              <a-input v-model:value="form.gridName" :maxLength="512" placeholder="请输入表格名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="gridDesc" label="表格描述">
              <a-input v-model:value="form.gridDesc" :maxLength="1024" placeholder="请输入表格描述" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="innerOrder" label="排序号" has-feedback>
              <a-input-number v-model:value="form.innerOrder" :min="0" :max="99" :precision="0" :step="1"
                placeholder="请输入排序号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsGpioTempletId" label="所属模板ID" has-feedback>
              <a-input v-model:value="form.mdsGpioTempletId" :maxLength="64" placeholder="请输入所属模板ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="firstRowNo" label="首行号（表格中首行数据所在行号）">
              <a-input-number v-model:value="form.firstRowNo" :min="0" :max="99999999" :precision="0" :step="1"
                placeholder="请输入首行号（表格中首行数据所在行号）" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
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
import { useMdsGpioTempletGridForm, emits } from './ts/MdsGpioTempletGridForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  parentId: {
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
  secretLevelList,
  saveForm,
  closeModal
} = useMdsGpioTempletGridForm({
  props: props,
  emit: emit
});
</script>

