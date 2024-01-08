<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" class="form-excel-style">
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('invisibleAssetName')">
          <a-form-item name="invisibleAssetName" label="无形资产名称" :rules="fieldRequired('invisibleAssetName')" has-feedback>
            <a-input v-model:value="form.invisibleAssetName" :auto-focus="true"
              :disabled="fieldDisabled('invisibleAssetName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetNum')">
          <a-form-item name="budgetNum" label="预算号" :rules="fieldRequired('budgetNum')" has-feedback>
            <a-input v-model:value="form.budgetNum" :disabled="fieldDisabled('budgetNum')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetUnitPrice')">
          <a-form-item name="budgetUnitPrice" label="预计单价（万元）" :rules="fieldRequired('budgetUnitPrice')" has-feedback>
            <a-input v-model:value="form.budgetUnitPrice" :disabled="fieldDisabled('budgetUnitPrice')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门" :rules="fieldRequired('managerDeptId')" has-feedback>
            <AvicCommonSelect v-model:value="form.managerDeptId" type="deptSelect"
              :defaultShowValue="form.managerDeptIdAlias" :disabled="fieldDisabled('managerDeptId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptName')" hidden>
          <a-form-item name="managerDeptName" label="主管部门名称" :rules="fieldRequired('managerDeptName')" has-feedback>
            <a-input v-model:value="form.managerDeptName" :disabled="fieldDisabled('managerDeptName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerLeaderId')">
          <a-form-item name="managerLeaderId" label="主管副所长" :rules="fieldRequired('managerLeaderId')" has-feedback>
            <AvicCommonSelect v-model:value="form.managerLeaderId" type="userSelect"
              :defaultShowValue="form.managerLeaderIdAlias" :disabled="fieldDisabled('managerLeaderId')" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('applyReasion')">
          <a-form-item name="applyReasion" label="申请理由" :rules="fieldRequired('applyReasion')" has-feedback>
            <a-textarea v-model:value="form.applyReasion" :rows="2" :disabled="fieldDisabled('applyReasion')" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('reqAndAdvise')">
          <a-form-item name="reqAndAdvise" label="要求及建议" :rules="fieldRequired('reqAndAdvise')" has-feedback>
            <a-textarea v-model:value="form.reqAndAdvise" :rows="2" :disabled="fieldDisabled('reqAndAdvise')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersionId')">
          <a-form-item name="handlePersionId" label="经办人" :rules="fieldRequired('handlePersionId')" has-feedback>
            <AvicCommonSelect v-model:value="form.handlePersionId" type="userSelect"
              :defaultShowValue="form.handlePersionIdAlias" :disabled="fieldDisabled('handlePersionId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersionName')" hidden>
          <a-form-item name="handlePersionName" label="经办人名称" :rules="fieldRequired('handlePersionName')" has-feedback>
            <a-input v-model:value="form.handlePersionName" :disabled="fieldDisabled('handlePersionName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('useDeptId')">
          <a-form-item name="useDeptId" label="使用部门" :rules="fieldRequired('useDeptId')" has-feedback>
            <AvicCommonSelect v-model:value="form.useDeptId" type="deptSelect" :defaultShowValue="form.useDeptIdAlias"
              :disabled="fieldDisabled('useDeptId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('useDeptName')" hidden>
          <a-form-item name="useDeptName" label="使用部门名称" :rules="fieldRequired('useDeptName')" has-feedback>
            <a-input v-model:value="form.useDeptName" :disabled="fieldDisabled('useDeptName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')" hidden>
          <a-form-item name="secretLevel" label="数据密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')">
              <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useFamInvisibleNewlyAddForm, emits } from './ts/FamInvisibleNewlyAddForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
  bpmOperatorRefresh: {
    type: Function
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  secretLevelList,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamInvisibleNewlyAddForm({
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
