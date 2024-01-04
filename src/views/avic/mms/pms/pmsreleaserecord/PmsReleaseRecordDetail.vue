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
            <a-form-item name="pmsTaskNo" label="采购任务编号">
              <a-input v-model:value="form.pmsTaskNo" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqPlanNo" label="采购计划号">
              <a-input v-model:value="form.reqPlanNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqPlanName" label="采购计划名称">
              <a-input v-model:value="form.reqPlanName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="powerLetterNumber" label="动力函号">
              <a-input v-model:value="form.powerLetterNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="decryptionReleaseName" label="脱密发布名称">
              <a-input v-model:value="form.decryptionReleaseName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseDate" label="发布日期">
              <a-date-picker
                v-model:value="form.releaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseEndDate" label="截止日期">
              <a-date-picker
                v-model:value="form.releaseEndDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUnifiedCode" label="发布统一编码">
              <a-input v-model:value="form.releaseUnifiedCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUserId" label="发布人ID">
              <AvicCommonSelect
                v-model:value="form.releaseUserId"
                type="userSelect"
                :defaultShowValue="form.releaseUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUserCode" label="发布人编码">
              <a-input v-model:value="form.releaseUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseUserName" label="发布人名称">
              <a-input v-model:value="form.releaseUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据号">
              <a-input v-model:value="form.billNo" disabled />
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
  layout,
  colLayout,
  loading,
  secretLevelList,
  closeModal
} = usePmsReleaseRecordForm({
  props: props,
  emit: emit
});
</script>


