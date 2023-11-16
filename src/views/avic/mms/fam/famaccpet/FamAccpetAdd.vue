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
            <a-form-item name="accpetApplyNo" label="验收申请单号" has-feedback>
              <avic-auto-code
                  v-model:value="form.accpetApplyNo"
                  ref="autoCode"
                  code-type="FAM_BILL_NO"
                  code-param="FAM_ACCPET"
                  :allow-clear="true"
                  :disabled="false"
                  placeholder="请输入验收申请单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accpetType" label="验收类型" has-feedback>
              <a-select
                  v-model:value="form.accpetType"
                  :auto-focus="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择验收类型"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderName" label="合同名称" has-feedback>
              <a-input
                  v-model:value="form.orderName"
                  :maxLength="64"
                  placeholder="请输入合同名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="合同编号" has-feedback>
              <a-input
                  v-model:value="form.orderNo"
                  :maxLength="64"
                  placeholder="请输入合同编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderValue" label="合同金额" has-feedback>
              <a-input
                  v-model:value="form.orderValue"
                  :maxLength="16"
                  placeholder="请输入合同金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptName" label="采购部门名称" has-feedback>
              <AvicCommonSelect
                  v-model:value="form.procureDeptName"
                  type="deptSelect"
                  placeholder="请选择采购部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accpetDate" label="验收日期" has-feedback>
              <a-date-picker
                  v-model:value="form.accpetDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择验收日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptName" label="主管部门名称" has-feedback>
              <AvicCommonSelect
                  v-model:value="form.managerDeptName"
                  type="deptSelect"
                  placeholder="请选择主管部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveDeptName" label="接收部门名称" has-feedback>
              <AvicCommonSelect
                  v-model:value="form.receiveDeptName"
                  type="deptSelect"
                  placeholder="请选择接收部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClass" label="资产属性" has-feedback>
              <a-select
                  v-model:value="form.assetClass"
                  :auto-focus="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择验收类型"
              >
                <a-select-option
                    v-for="item in assetTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fundSource" label="资金来源" has-feedback>
              <a-input
                  v-model:value="form.fundSource"
                  :maxLength="32"
                  placeholder="请输入资金来源"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="otherMatter" label="其他事项" has-feedback>
              <a-input
                  v-model:value="form.otherMatter"
                  :maxLength="32"
                  placeholder="请输入其他事项"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchWay" label="购置方式" has-feedback>
              <a-input
                  v-model:value="form.purchWay"
                  :maxLength="32"
                  placeholder="请输入购置方式"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称" has-feedback>
              <a-input
                  v-model:value="form.projectName"
                  :maxLength="32"
                  placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonName" label="经办人名称" has-feedback>
              <AvicCommonSelect
                  v-model:value="form.handlePersonName"
                  type="userSelect"
                  placeholder="请选择经办人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="附件"
            >
              <AvicUploader
                  element-id="1"
                  form-type="add"
                  ref="uploadFile"
                  :allow-download="true"
                  :allow-preview="true"
                  :allow-delete="true"
                  :allow-update-secret-level="true"
                  :form-id="form.id"
                  table-name="FAM_ACCPET"
                  @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAccpetForm, emits } from './ts/FamAccpetForm'; // 引入表单ts


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
  secretLevelList,
  assetTypeList,
  accpetTypeList,
  uploadFile,
  afterUploadEvent,
  autoCode,
  closeModal,
  saveForm,
  famAccpetListEdit
} = useFamAccpetForm({
  props: props,
  emit: emit
});
</script>
