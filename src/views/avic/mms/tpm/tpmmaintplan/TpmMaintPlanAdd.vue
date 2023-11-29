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
        class="form-excel-style"
      >
        <a-row>
          <!--          <a-col v-bind="colLayout.cols">-->
          <!--            <a-form-item name="billNo" label="计划编号">-->
          <!--              <a-input-->
          <!--                v-model:value="form.billNo"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入计划编号"-->
          <!--                disabled :defaultValue="'自动生成'"/>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmInventoryCode" label="设备编号">
              <AvicModalSelect
                v-model:value="form.tpmInventoryCode"
                title="选择设备编号"
                placeholder="请选择设备编号"
                valueField=""
                showField=""
                :selectComponent="tpmStandardMaintenanceSelectComponent"
                :allow-clear="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceCycle" label="保养周期(月)">
              <a-input-number
                v-model:value="form.maintenanceCycle"
                :min="0"
                :max="9999999999"
                :precision="0"
                :step="1"
                placeholder="请输入保养周期(月)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planMaintenanceDate" label="计划保养日期">
              <a-date-picker
                v-model:value="form.planMaintenanceDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划保养日期"
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
          <!--          <a-col v-bind="colLayout.cols">-->
          <!--            <a-form-item name="maintenPlanType" label="保养计划类型">-->
          <!--              <a-input-->
          <!--                v-model:value="form.maintenPlanType"-->
          <!--                :maxLength="4"-->
          <!--                placeholder="请输入保养计划类型"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <!--      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>-->
      <a-button title="保存" type="primary" :loading="loading" @click="saveFormAdd">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmMaintPlanForm, emits } from './ts/TpmMaintPlanForm'; // 引入表单ts
import tpmStandardMaintenanceSelect from '@/views/avic/mms/tpm/tpmmaintplan/TpmStandardMaintenanceSelect.vue'; // 引入弹窗选择页
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
const tpmStandardMaintenanceSelectComponent = tpmStandardMaintenanceSelect;// 自定义选择
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  saveAndStartProcess,
  saveFormAdd,
  closeModal
} = useTpmMaintPlanForm({
  props: props,
  emit: emit
});
</script>
