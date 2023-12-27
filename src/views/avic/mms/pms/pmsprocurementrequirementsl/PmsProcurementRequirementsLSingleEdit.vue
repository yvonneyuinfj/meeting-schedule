<template>
  <AvicModal
      :centered="true"
      :visible="true"
      height="520px"
      title="编辑"
      width="960px"
      @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          layout="horizontal"
          v-bind="layout"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="维度" name="dimensionality">
              <a-input
                  v-model:value="form.dimensionality"
                  :auto-focus="true"
                  :maxLength="64"
                  placeholder="请输入维度"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="权重" name="weight">
              <a-input
                  v-model:value="form.weight"
                  :maxLength="64"
                  placeholder="请输入权重"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="得分标准" name="scoringCriteria">
              <a-input
                  v-model:value="form.scoringCriteria"
                  :maxLength="64"
                  placeholder="请输入得分标准"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="密级" name="secretLevel">
              <a-select
                  v-model:value="form.secretLevel"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
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
      <a-button :loading="loading" title="保存" type="primary" @click="saveForm">保存</a-button>
      <a-button ghost title="返回" type="primary" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { emits, usePmsProcurementRequirementsLForm } from './ts/PmsProcurementRequirementsLForm'; // 引入表单ts
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
} = usePmsProcurementRequirementsLForm({
  props: props,
  emit: emit
});
</script>
