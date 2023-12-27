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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyNo')">
          <a-form-item name="applyNo" label="申请单编号" :rules="fieldRequired('applyNo')" has-feedback>
              <AvicAutoCode
                v-model:value="form.applyNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_SEAL_AND_UNSEAL"
                :allow-clear="true"
                :disabled="fieldDisabled('applyNo')"
                placeholder="请输入申请单编号"
              />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('title')">
          <a-form-item name="title" label="标题" :rules="fieldRequired('title')" has-feedback>
            <a-input
              v-model:value="form.title"
              :auto-focus="true"
              :disabled="fieldDisabled('title')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('sealingType')">
          <a-form-item name="sealingType" label="封存类型" :rules="fieldRequired('sealingType')" has-feedback>
            <a-select
              v-model:value="form.sealingType"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('sealingType')"
            >
              <a-select-option
                v-for="item in sealingTypeList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('isAssetIntact')">
          <a-form-item name="isAssetIntact" label="资产是否完好" :rules="fieldRequired('isAssetIntact')" has-feedback>
            <a-select
              v-model:value="form.isAssetIntact"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('isAssetIntact')"
            >
              <a-select-option
                v-for="item in isAssetIntactList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门" :rules="fieldRequired('managerDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.managerDeptId"
              type="deptSelect"
              :defaultShowValue="form.managerDeptIdAlias"
              :disabled="fieldDisabled('managerDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('sealingStartDate')">
          <a-form-item name="sealingStartDate" label="封存开始日期" :rules="fieldRequired('sealingStartDate')" has-feedback>
            <a-date-picker
              v-model:value="form.sealingStartDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('sealingStartDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('sealingEndDate')">
          <a-form-item name="sealingEndDate" label="封存终止日期" :rules="fieldRequired('sealingEndDate')" has-feedback>
            <a-date-picker
              v-model:value="form.sealingEndDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('sealingEndDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('unsealStartDate')">
          <a-form-item name="unsealStartDate" label="启封开始日期" :rules="fieldRequired('unsealStartDate')" has-feedback>
            <a-date-picker
              v-model:value="form.unsealStartDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('unsealStartDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyReason')">
          <a-form-item name="applyReason" label="申请理由" :rules="fieldRequired('applyReason')" has-feedback>
            <a-input
              v-model:value="form.applyReason"
              :disabled="fieldDisabled('applyReason')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('sealingExecuteStatus')">
          <a-form-item name="sealingExecuteStatus" label="封存规定执行情况" :rules="fieldRequired('sealingExecuteStatus')" has-feedback>
            <a-input
              v-model:value="form.sealingExecuteStatus"
              :disabled="fieldDisabled('sealingExecuteStatus')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('unsealExecuteStatus')">
          <a-form-item name="unsealExecuteStatus" label="启封执行情况" :rules="fieldRequired('unsealExecuteStatus')" has-feedback>
            <a-input
              v-model:value="form.unsealExecuteStatus"
              :disabled="fieldDisabled('unsealExecuteStatus')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDeptId')">
          <a-form-item name="applyDeptId" label="申请部门" :rules="fieldRequired('applyDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.applyDeptId"
              type="deptSelect"
              :defaultShowValue="form.applyDeptIdAlias"
              :disabled="fieldDisabled('applyDeptId')"
            />
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="申请时间" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
              v-model:value="form.applyDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <FamSealAndUnsealListEdit
      v-if="fieldVisible('FAM_SEAL_AND_UNSEAL_LIST')"
      ref="famSealAndUnsealListEdit"
      :mainId="formId || form.id"
      read-only="true"
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
import { useFamSealAndUnsealForm, emits } from './ts/FamSealAndUnsealForm'; // 引入表单ts
import FamSealAndUnsealListEdit from '@/views/avic/mms/fam/famsealandunseallist/FamSealAndUnsealListEdit.vue'; // 引入子表组件

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
  secretLevelList,
  isAssetIntactList,
  autoCode,
  famSealAndUnsealListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  sealingTypeList,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamSealAndUnsealForm({
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


