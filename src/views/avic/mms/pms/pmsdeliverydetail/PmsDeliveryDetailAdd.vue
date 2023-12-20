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
            <a-form-item name="numberingHierarchy" label="编号层次">
              <a-input
                v-model:value="form.numberingHierarchy"
                :maxLength="50"
                :auto-focus="true"
                placeholder="请输入编号层次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planDeliveryType" label="计划类型">
              <a-select
                v-model:value="form.planDeliveryType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择计划类型"
              >
                <a-select-option
                  v-for="item in planDeliveryTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionTaskClassification" label="生产任务分类">
              <a-input
                v-model:value="form.productionTaskClassification"
                :maxLength="64"
                placeholder="请输入生产任务分类"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="drawingNoSpecification" label="图号规格/目录">
              <a-input
                v-model:value="form.drawingNoSpecification"
                :maxLength="64"
                placeholder="请输入图号规格/目录"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="name" label="名称">
              <a-input
                v-model:value="form.name"
                :maxLength="64"
                placeholder="请输入名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="quantityNumber" label="单台数量（件）">
              <a-input-number
                v-model:value="form.quantityNumber"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入单台数量（件）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionNumber" label="生产数量（件）">
              <a-input-number
                v-model:value="form.productionNumber"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入生产数量（件）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplierDeptId" label="承制单位">
              <AvicCommonSelect
                v-model:value="form.supplierDeptId"
                type="deptSelect"
                placeholder="请选择承制单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveDeptId" label="接收单位">
              <AvicCommonSelect
                v-model:value="form.receiveDeptId"
                type="deptSelect"
                placeholder="请选择接收单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sendingTime" label="发图时间">
              <a-date-picker
                v-model:value="form.sendingTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择发图时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="scheduledEndTime" label="计划结束时间">
              <a-date-picker
                v-model:value="form.scheduledEndTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划结束时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="executionFile" label="执行文件">
              <a-input
                v-model:value="form.executionFile"
                :maxLength="64"
                placeholder="请输入执行文件"
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
import { usePmsDeliveryDetailForm, emits } from './ts/PmsDeliveryDetailForm'; // 引入表单ts
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
  planDeliveryTypeList,
  secretLevelList,
  saveForm,
  closeModal
} = usePmsDeliveryDetailForm({
  props: props,
  emit: emit
});
</script>
