<template>
  <AvicModal
    :visible="true"
    title="编辑"
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
            <a-form-item name="assetNo" label="资产编号" has-feedback>
              <a-input
                v-model:value="form.assetNo"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入资产编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetName" label="资产名称" has-feedback>
              <a-input
                v-model:value="form.assetName"
                :maxLength="64"
                placeholder="请输入资产名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factoryPrice" label="原值">
              <a-input
                v-model:value="form.factoryPrice"
                :maxLength="16"
                placeholder="请输入原值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNetValue" label="净值">
              <a-input
                v-model:value="form.assetNetValue"
                :maxLength="16"
                placeholder="请输入净值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseTime" label="购置时间">
              <a-date-picker
                v-model:value="form.purchaseTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynReportGroup" label="是否已经上报集团">
                  <a-select v-model:value="form.ynReportGroup" :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children" show-search :allow-clear="true" placeholder="请选择是否已经上报集团">
                    <a-select-option v-for="item in ynReportGroupList" :key="item.sysLookupTlId" :value="item.lookupCode">
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportGroupDate" label="上报集团日期">
              <a-date-picker
                v-model:value="form.reportGroupDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择上报集团日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="groupApprovalDoc" label="集团批复文件">
              <a-input
                v-model:value="form.groupApprovalDoc"
                :maxLength="64"
                placeholder="请输入集团批复文件"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approvalTime" label="集团批复时间">
              <a-date-picker
                v-model:value="form.approvalTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择集团批复时间"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
              name="note"
              label="备注"
            >
              <a-textarea
                v-model:value="form.note"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入备注"
              />
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
import { useFamInvisibleScrapLedgerForm, emits } from './ts/FamInvisibleScrapLedgerForm'; // 引入表单ts
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
  ynReportGroupList,
  secretLevelList,
  saveForm,
  closeModal
} = useFamInvisibleScrapLedgerForm({
  props: props,
  emit: emit
});
</script>


