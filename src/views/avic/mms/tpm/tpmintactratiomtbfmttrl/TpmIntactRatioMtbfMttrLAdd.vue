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
            <a-form-item name="tpmInventoryId" label="设备台账ID" has-feedback>
              <a-input
                v-model:value="form.tpmInventoryId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入设备台账ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号">
              <a-input
                v-model:value="form.equipmentCode"
                :maxLength="64"
                placeholder="请输入设备编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentName" label="设备名称">
              <a-input
                v-model:value="form.equipmentName"
                :maxLength="64"
                placeholder="请输入设备名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentRunTime" label="设备运行时间（h）">
              <a-input
                v-model:value="form.equipmentRunTime"
                :maxLength="16"
                placeholder="请输入设备运行时间（h）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="repairTime" label="设备故障修复时间（h）">
              <a-input
                v-model:value="form.repairTime"
                :maxLength="16"
                placeholder="请输入设备故障修复时间（h）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="failureNumber" label="设备故障次数">
              <a-input
                v-model:value="form.failureNumber"
                :maxLength="16"
                placeholder="请输入设备故障次数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mtbf" label="MTBF">
              <a-input
                v-model:value="form.mtbf"
                :maxLength="16"
                placeholder="请输入MTBF"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mttr" label="MTTR">
              <a-input
                v-model:value="form.mttr"
                :maxLength="16"
                placeholder="请输入MTTR"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="monthMtbf" label="月MTBF">
              <a-input
                v-model:value="form.monthMtbf"
                :maxLength="16"
                placeholder="请输入月MTBF"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="monthMttr" label="月MTTR">
              <a-input
                v-model:value="form.monthMttr"
                :maxLength="16"
                placeholder="请输入月MTTR"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentStatus" label="月设备状态">
              <a-input
                v-model:value="form.equipmentStatus"
                :maxLength="4000"
                placeholder="请输入月设备状态"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentStatusTotal" label="月设备状态合计">
              <a-input-number
                v-model:value="form.equipmentStatusTotal"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入月设备状态合计"
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
import { useTpmIntactRatioMtbfMttrLForm, emits } from './ts/TpmIntactRatioMtbfMttrLForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
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
} = useTpmIntactRatioMtbfMttrLForm({
  props: props,
  emit: emit
});
</script>
