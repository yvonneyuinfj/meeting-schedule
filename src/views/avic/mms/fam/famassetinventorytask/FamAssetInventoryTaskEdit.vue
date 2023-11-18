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
            <a-form-item name="inventoryNo" label="盘点编号" has-feedback>
              <a-input v-model:value="form.inventoryNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人">
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                placeholder="请选择经办人"
                :defaultShowValue="form.handlePersonIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDeptId" label="盘点部门">
              <AvicCommonSelect
                v-model:value="form.inventoryDeptId"
                type="deptSelect"
                placeholder="请选择盘点部门"
                :defaultShowValue="form.inventoryDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDate" label="盘点日期">
              <a-date-picker
                v-model:value="form.inventoryDate"
                :auto-focus="true"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择盘点日期"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <FamAssetInventoryTaskListEdit ref="famAssetInventoryTaskListEdit" :mainId="formId"></FamAssetInventoryTaskListEdit>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAssetInventoryTaskForm, emits } from './ts/FamAssetInventoryTaskForm'; // 引入表单ts
import FamAssetInventoryTaskListEdit from '@/views/avic/mms/fam/famassetinventorytasklist/FamAssetInventoryTaskListEdit.vue'; // 引入子表组件
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
  closeModal,
  famAssetInventoryTaskListEdit
} = useFamAssetInventoryTaskForm({
  props: props,
  emit: emit
});
</script>


