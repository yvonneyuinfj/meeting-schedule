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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('reqPlanName')">
          <a-form-item name="reqPlanName" label="采购计划名称" :rules="fieldRequired('reqPlanName')" has-feedback>
            <a-input
              v-model:value="form.reqPlanName"
              :auto-focus="true"
              :disabled="fieldDisabled('reqPlanName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('procurementMethod')">
          <a-form-item name="procurementMethod" label="采购方式" :rules="fieldRequired('procurementMethod')" has-feedback>
            <a-radio-group v-model:value="form.procurementMethod" :disabled="fieldDisabled('procurementMethod')">
              <a-radio
                v-for="item in procurementMethodList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('pmsPrice')">
          <a-form-item name="pmsPrice" label="采购价格" :rules="fieldRequired('pmsPrice')" has-feedback>
            <a-radio-group v-model:value="form.pmsPrice" :disabled="fieldDisabled('pmsPrice')">
              <a-radio
                v-for="item in pmsPriceList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('vendorReason')">
          <a-form-item name="vendorReason" label="确定供应商理由" :rules="fieldRequired('vendorReason')" has-feedback>
            <a-textarea v-model:value="form.vendorReason" :rows="2" :disabled="fieldDisabled('vendorReason')" />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('vendorReviewMode')">
          <a-form-item name="vendorReviewMode" label="候选供应商审查方式" :rules="fieldRequired('vendorReviewMode')" has-feedback>
            <a-textarea v-model:value="form.vendorReviewMode" :rows="2" :disabled="fieldDisabled('vendorReviewMode')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId')">
          <a-form-item name="handlePersonId" label="经办人" :rules="fieldRequired('handlePersonId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <PmsFindSourceVendorEdit
      v-if="fieldVisible('PMS_FIND_SOURCE_VENDOR')"
      ref="pmsFindSourceVendorEdit"
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
import { usePmsFindSourceForm, emits } from './ts/PmsFindSourceForm'; // 引入表单ts
import PmsFindSourceVendorEdit from '@/views/avic/mms/pms/pmsfindsourcevendor/PmsFindSourceVendorEdit.vue'; // 引入子表组件

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
  procurementMethodList,
  pmsPriceList,
  secretLevelList,
  supplierSelectionCriteriaList,
  pmsFindSourceVendorEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = usePmsFindSourceForm({
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


