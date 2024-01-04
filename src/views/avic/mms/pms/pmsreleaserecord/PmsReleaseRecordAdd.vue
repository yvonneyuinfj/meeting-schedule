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
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsTaskNo" label="采购任务编号" has-feedback>
              <a-input
                v-model:value="form.pmsTaskNo"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入采购任务编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqPlanNo" label="采购计划号" has-feedback>
              <a-input
                v-model:value="form.reqPlanNo"
                :maxLength="4000"
                placeholder="请输入采购计划号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqPlanName" label="采购计划名称" has-feedback>
              <a-input
                v-model:value="form.reqPlanName"
                :maxLength="4000"
                placeholder="请输入采购计划名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="powerLetterNumber" label="动力函号" has-feedback>
              <a-input
                v-model:value="form.powerLetterNumber"
                :maxLength="64"
                placeholder="请输入动力函号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="decryptionReleaseName" label="脱密发布名称" has-feedback>
              <a-input
                v-model:value="form.decryptionReleaseName"
                :maxLength="64"
                placeholder="请输入脱密发布名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseDate" label="发布日期" has-feedback>
              <a-date-picker
                v-model:value="form.releaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择发布日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseEndDate" label="截止日期" has-feedback>
              <a-date-picker
                v-model:value="form.releaseEndDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择截止日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUnifiedCode" label="发布统一编码" has-feedback>
              <a-input
                v-model:value="form.releaseUnifiedCode"
                :maxLength="64"
                placeholder="请输入发布统一编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUserId" label="发布人ID" has-feedback>
              <AvicCommonSelect
                v-model:value="form.releaseUserId"
                type="userSelect"
                placeholder="请选择发布人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUserCode" label="发布人编码">
              <a-input
                v-model:value="form.releaseUserCode"
                :maxLength="64"
                placeholder="请输入发布人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUserName" label="发布人名称">
              <a-input
                v-model:value="form.releaseUserName"
                :maxLength="64"
                placeholder="请输入发布人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据号">
              <a-input
                v-model:value="form.billNo"
                :maxLength="64"
                placeholder="请输入单据号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="512"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
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
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { usePmsReleaseRecordForm, emits } from './ts/PmsReleaseRecordForm'; // 引入表单ts
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
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  saveForm,
  closeModal
} = usePmsReleaseRecordForm({
  props: props,
  emit: emit
});
</script>

