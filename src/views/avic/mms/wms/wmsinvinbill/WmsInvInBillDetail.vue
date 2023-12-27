<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
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
            <a-form-item name="billNo" label="申请单号">
              <a-input v-model:value="form.billNo" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryId" label="库房">
              <a-input v-model:value="form.mdsInventoryId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserId" label="申请人">
              <AvicCommonSelect
                v-model:value="form.applyUserId"
                type="userSelect"
                :defaultShowValue="form.applyUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptId" label="申请部门">
              <AvicCommonSelect
                v-model:value="form.applyDeptId"
                type="deptSelect"
                :defaultShowValue="form.applyDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请日期">
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
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
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useWmsInvInBillForm, emits } from './ts/WmsInvInBillForm'; // 引入表单ts
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
  secretLevelList,
  closeModal
} = useWmsInvInBillForm({
  props: props,
  emit: emit
});
</script>

