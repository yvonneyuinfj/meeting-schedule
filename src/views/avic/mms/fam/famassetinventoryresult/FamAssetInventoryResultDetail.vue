<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      layout="horizontal"
      class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('inventoryNo')">
          <a-form-item name="inventoryNo" label="盘点编号" :rules="fieldRequired('inventoryNo')" has-feedback>
              <AvicAutoCode
                v-model:value="form.inventoryNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_ASSET_INVENTORY_RESULT"
                :allow-clear="true"
                :disabled="fieldDisabled('inventoryNo')"
                placeholder="请输入盘点编号"
              />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId')">
          <a-form-item name="handlePersonId" label="经办人id" :rules="fieldRequired('handlePersonId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              :auto-focus="true"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('inventoryDeptId')">
          <a-form-item name="inventoryDeptId" label="盘点部门ID" :rules="fieldRequired('inventoryDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.inventoryDeptId"
              type="deptSelect"
              :defaultShowValue="form.inventoryDeptIdAlias"
              :disabled="fieldDisabled('inventoryDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('inventoryDate')">
          <a-form-item name="inventoryDate" label="盘点日期" :rules="fieldRequired('inventoryDate')" has-feedback>
            <a-date-picker
              v-model:value="form.inventoryDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('inventoryDate')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <FamAssetInventoryResultListEdit
      v-if="fieldVisible('FAM_ASSET_INVENTORY_RESULT_LIST')"
      ref="famAssetInventoryResultListEdit"
      :mainId="formId || form.id"
      :bpmInstanceObject="bpmInstanceObject"
      :bpmParams="bpmParams"
    />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="addSubTableButton"
      label="添加"
      title="添加"
      style="display: none"
    >
      添加
    </a-button>
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="deleteSubTableButton"
      label="删除"
      title="删除"
      style="display: none"
    >
      删除
    </a-button>
  </div>
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
  bpmParams,
  layout,
  colLayout,
  autoCode,
  famAssetInventoryResultListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamAssetInventoryResultForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>


