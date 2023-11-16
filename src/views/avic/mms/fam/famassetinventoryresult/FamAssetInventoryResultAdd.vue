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
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryNo" label="盘点编号" has-feedback>
              <avic-auto-code
                v-model:value="form.inventoryNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_ASSET_INVENTORY_RESULT"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入盘点编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人id">
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                placeholder="请选择经办人id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDeptId" label="盘点部门ID">
              <AvicCommonSelect
                v-model:value="form.inventoryDeptId"
                type="deptSelect"
                placeholder="请选择盘点部门ID"
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
      <FamAssetInventoryResultListEdit ref="famAssetInventoryResultListEdit" />
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
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
  autoCode,
  closeModal,
  saveAndStartProcess,
  famAssetInventoryResultListEdit
} = useFamAssetInventoryResultForm({
  props: props,
  emit: emit
});
</script>
