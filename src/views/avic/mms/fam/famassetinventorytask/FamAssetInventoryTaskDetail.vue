<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="1280px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryNo" label="盘点编号">
              <a-input v-model:value="form.inventoryNo" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人id">
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                :defaultShowValue="form.handlePersonIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDeptId" label="盘点部门ID">
              <AvicCommonSelect
                v-model:value="form.inventoryDeptId"
                type="deptSelect"
                :defaultShowValue="form.inventoryDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDate" label="盘点日期">
              <a-date-picker
                v-model:value="form.inventoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAssetInventoryTaskForm, emits } from './ts/FamAssetInventoryTaskForm'; // 引入表单ts
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
  layout,
  colLayout,
  loading,
  closeModal
} = useFamAssetInventoryTaskForm({
  props: props,
  emit: emit
});
</script>

