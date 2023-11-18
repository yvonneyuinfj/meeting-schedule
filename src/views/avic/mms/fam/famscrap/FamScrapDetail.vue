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
                code-type="FAM_APPLY_NO"
                code-param="FAM_SCRAP"
                :allow-clear="true"
                :disabled="fieldDisabled('applyNo')"
                placeholder="请输入申请单编号"
              />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('isUsedScientificrs')">
          <a-form-item name="isUsedScientificrs" label="是否科研用" :rules="fieldRequired('isUsedScientificrs')" has-feedback>
            <a-input
              v-model:value="form.isUsedScientificrs"
              :auto-focus="true"
              :disabled="fieldDisabled('isUsedScientificrs')"
            />
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handleDeptId')">
          <a-form-item name="handleDeptId" label="处置部门" :rules="fieldRequired('handleDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.handleDeptId"
              type="deptSelect"
              :defaultShowValue="form.handleDeptIdAlias"
              :disabled="fieldDisabled('handleDeptId')"
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('handleReason')">
          <a-form-item name="handleReason" label="处置理由" :rules="fieldRequired('handleReason')" has-feedback>
            <a-textarea v-model:value="form.handleReason" :rows="2" :disabled="fieldDisabled('handleReason')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('assetAlternateSolution')">
          <a-form-item name="assetAlternateSolution" label="资产更新替换方案" :rules="fieldRequired('assetAlternateSolution')" has-feedback>
            <a-input
              v-model:value="form.assetAlternateSolution"
              :disabled="fieldDisabled('assetAlternateSolution')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('otherMatter')">
          <a-form-item name="otherMatter" label="其他事项" :rules="fieldRequired('otherMatter')" has-feedback>
            <a-input
              v-model:value="form.otherMatter"
              :disabled="fieldDisabled('otherMatter')"
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
    <FamScrapListEdit
      v-if="fieldVisible('FAM_SCRAP_LIST')"
      ref="famScrapListEdit"
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
import { useFamScrapForm, emits } from './ts/FamScrapForm'; // 引入表单ts
import FamScrapListEdit from '@/views/avic/mms/fam/famscraplist/FamScrapListEdit.vue'; // 引入子表组件

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
  famScrapListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamScrapForm({
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


