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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('accpetApplyNo')">
          <a-form-item name="accpetApplyNo" label="验收申请单号" :rules="fieldRequired('accpetApplyNo')" has-feedback>
              <AvicAutoCode
                v-model:value="form.accpetApplyNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_CIP_ACCPET"
                :allow-clear="true"
                :disabled="fieldDisabled('accpetApplyNo')"
                placeholder="请输入验收申请单号"
              />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('accpetType')">
          <a-form-item name="accpetType" label="验收类型（新增/改造）" :rules="fieldRequired('accpetType')" has-feedback>
            <a-select
              v-model:value="form.accpetType"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('accpetType')"
            >
              <a-select-option
                v-for="item in accpetTypeList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('orderName')">
          <a-form-item name="orderName" label="合同名称" :rules="fieldRequired('orderName')" has-feedback>
            <a-input
              v-model:value="form.orderName"
              :disabled="fieldDisabled('orderName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('orderNo')">
          <a-form-item name="orderNo" label="合同编号" :rules="fieldRequired('orderNo')" has-feedback>
            <a-input
              v-model:value="form.orderNo"
              :disabled="fieldDisabled('orderNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('orderValue')">
          <a-form-item name="orderValue" label="合同金额" :rules="fieldRequired('orderValue')" has-feedback>
            <a-input
              v-model:value="form.orderValue"
              :disabled="fieldDisabled('orderValue')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('procureDeptId')">
          <a-form-item name="procureDeptId" label="采购部门id" :rules="fieldRequired('procureDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.procureDeptId"
              type="deptSelect"
              :defaultShowValue="form.procureDeptIdAlias"
              :disabled="fieldDisabled('procureDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('accpetDate')">
          <a-form-item name="accpetDate" label="验收日期" :rules="fieldRequired('accpetDate')" has-feedback>
            <a-date-picker
              v-model:value="form.accpetDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('accpetDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门id" :rules="fieldRequired('managerDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.managerDeptId"
              type="deptSelect"
              :defaultShowValue="form.managerDeptIdAlias"
              :disabled="fieldDisabled('managerDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('receiveDeptId')">
          <a-form-item name="receiveDeptId" label="接收部门ID" :rules="fieldRequired('receiveDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.receiveDeptId"
              type="deptSelect"
              :defaultShowValue="form.receiveDeptIdAlias"
              :disabled="fieldDisabled('receiveDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('assetClass')">
          <a-form-item name="assetClass" label="资产类别" :rules="fieldRequired('assetClass')" has-feedback>
            <a-input
              v-model:value="form.assetClass"
              :disabled="fieldDisabled('assetClass')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('fundSource')">
          <a-form-item name="fundSource" label="资金来源" :rules="fieldRequired('fundSource')" has-feedback>
            <a-input
              v-model:value="form.fundSource"
              :disabled="fieldDisabled('fundSource')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('purchWay')">
          <a-form-item name="purchWay" label="购置方式" :rules="fieldRequired('purchWay')" has-feedback>
            <a-input
              v-model:value="form.purchWay"
              :disabled="fieldDisabled('purchWay')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectName')">
          <a-form-item name="projectName" label="项目名称" :rules="fieldRequired('projectName')" has-feedback>
            <a-input
              v-model:value="form.projectName"
              :disabled="fieldDisabled('projectName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId')">
          <a-form-item name="handlePersonId" label="经办人id" :rules="fieldRequired('handlePersonId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>
      <a-col v-bind="colLayout.cols2">
        <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
          <AvicUploader
            element-id="1"
            ref="uploadFile"
            label="上传附件"
            :form-id="form.id"
            :bpm-instance-object="props.bpmInstanceObject"
            :form-secret-level="form.secretLevel"
            :allow-download="true"
            table-name="FAM_CIP_ACCPET"
            @afterUpload="afterUploadEvent"
          />
        </a-form-item>
      </a-col>
      </a-row>
    </a-form>
    <FamCipAccpetListEdit
      v-if="fieldVisible('FAM_CIP_ACCPET_LIST')"
      ref="famCipAccpetListEdit"
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
import { useFamCipAccpetForm, emits } from './ts/FamCipAccpetForm'; // 引入表单ts
import FamCipAccpetListEdit from '@/views/avic/mms/fam/famcipaccpetlist/FamCipAccpetListEdit.vue'; // 引入子表组件

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
  accpetTypeList,
  uploadFile,
  afterUploadEvent,
  attachmentRequired,
  autoCode,
  famCipAccpetListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamCipAccpetForm({
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


