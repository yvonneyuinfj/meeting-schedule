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
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
        class="form-excel-style"
      >
        <a-row :gutter="0">
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
                placeholder="请选择经办人id"
                :defaultShowValue="form.handlePersonIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDeptId" label="盘点部门">
              <AvicCommonSelect
                v-model:value="form.inventoryDeptId"
                type="deptSelect"
                placeholder="请选择盘点部门ID"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryUserId" label="盘点人">
              <AvicCommonSelect
                v-model:value="form.inventoryUserId"
                type="userSelect"
                placeholder="请选择盘点部门ID"
                :defaultShowValue="form.inventoryUserIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jkinventoryUserId" label="监盘人">
              <AvicCommonSelect
                v-model:value="form.jkinventoryUserId"
                type="userSelect"
                placeholder="请选择盘点部门ID"
                :defaultShowValue="form.jkinventoryUserIdAlias"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <FamAssetInventoryResultListEdit ref="famAssetInventoryResultListEdit" :mainId="formId || form.id" />
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAssetInventoryResultForm, emits } from './ts/FamAssetInventoryResultForm'; // 引入表单ts
import FamAssetInventoryResultListEdit from '@/views/avic/mms/fam/famassetinventoryresultlist/FamAssetInventoryResultListEdit.vue'; // 引入子表组件

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
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
  famAssetInventoryResultListEdit
} = useFamAssetInventoryResultForm({
  props: props,
  emit: emit
});
</script>
