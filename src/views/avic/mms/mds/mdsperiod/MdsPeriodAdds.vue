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
            <a-form-item name="year" label="会计年度">
              <a-input-number
                v-model:value="form.year"
                :auto-focus="true"
                :min="0"
                :max="9999"
                :precision="0"
                :step="1"
                placeholder="请输入会计年度"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="期段号" has-feedback>
              <a-input-number
                v-model:value="form.orderNo"
                :min="0"
                :max="999999"
                :precision="0"
                :step="1"
                placeholder="请输入期段号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="arrangeDate" label="起始日期" has-feedback>
              <a-date-picker
                v-model:value="form.arrangeDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择起始日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="endDate" label="结束日期" has-feedback>
              <a-date-picker
                v-model:value="form.endDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="periodType" label="期段类型" has-feedback>
              <a-select
                v-model:value="form.periodType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择期段类型"
              >
                <a-select-option
                  v-for="item in periodTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="countWorkDay" label="期段工作日总数（生产）">
              <a-input-number
                v-model:value="form.countWorkDay"
                :min="0"
                :max="999999"
                :precision="0"
                :step="1"
                placeholder="请输入期段工作日总数（生产）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDate" label="期段需求日期（生产）">
              <a-date-picker
                v-model:value="form.reqDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择期段需求日期（生产）"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applicationType" label="期段应用类型">
              <a-select
                v-model:value="form.applicationType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择期段应用类型"
              >
                <a-select-option
                  v-for="item in applicationTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="2048"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynUsedFlag" label="是否使用">
              <a-select
                v-model:value="form.ynUsedFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否使用"
              >
                <a-select-option
                  v-for="item in ynUsedFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="是否允许跨年">
              <a-radio/>
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
import { useMdsPeriodForm, emits } from './ts/MdsPeriodForm'; // 引入表单ts
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
  periodTypeList,
  applicationTypeList,
  ynUsedFlagList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsPeriodForm({
  props: props,
  emit: emit
});
</script>

