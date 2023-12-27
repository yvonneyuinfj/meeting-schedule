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
            <a-form-item label="编号层次" name="numberingHierarchy">
              <a-input
                  v-model:value="form.numberingHierarchy"
                  :auto-focus="true"
                  :maxLength="50"
                  placeholder="请输入编号层次"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划类型" name="planDeliveryType">
              <a-select
                  v-model:value="form.planDeliveryType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
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
            <a-form-item label="生产任务分类" name="productionTaskClassification">
              <a-input
                  v-model:value="form.productionTaskClassification"
                  :maxLength="64"
                  placeholder="请输入生产任务分类"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="图号规格/目录" name="drawingNoSpecification">
              <a-input
                  v-model:value="form.drawingNoSpecification"
                  :maxLength="64"
                  placeholder="请输入图号规格/目录"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="名称" name="name">
              <a-input
                  v-model:value="form.name"
                  :maxLength="64"
                  placeholder="请输入名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="单台数量（件）" name="quantityNumber">
              <a-input-number
                  v-model:value="form.quantityNumber"
                  :max="999999999999"
                  :min="0"
                  :precision="0"
                  :step="1"
                  placeholder="请输入单台数量（件）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="生产数量（件）" name="productionNumber">
              <a-input-number
                  v-model:value="form.productionNumber"
                  :max="999999999999"
                  :min="0"
                  :precision="0"
                  :step="1"
                  placeholder="请输入生产数量（件）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="承制单位" name="supplierDeptId">
              <AvicCommonSelect
                  v-model:value="form.supplierDeptId"
                  :defaultShowValue="form.supplierDeptIdAlias"
                  placeholder="请选择承制单位"
                  type="deptSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="接收单位" name="receiveDeptId">
              <AvicCommonSelect
                  v-model:value="form.receiveDeptId"
                  :defaultShowValue="form.receiveDeptIdAlias"
                  placeholder="请选择接收单位"
                  type="deptSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="发图时间" name="sendingTime">
              <a-date-picker
                  v-model:value="form.sendingTime"
                  format="YYYY-MM-DD"
                  placeholder="请选择发图时间"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划结束时间" name="scheduledEndTime">
              <a-date-picker
                  v-model:value="form.scheduledEndTime"
                  format="YYYY-MM-DD"
                  placeholder="请选择计划结束时间"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="执行文件" name="executionFile">
              <a-input
                  v-model:value="form.executionFile"
                  :maxLength="64"
                  placeholder="请输入执行文件"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="备注" name="note">
              <a-input
                  v-model:value="form.note"
                  :maxLength="512"
                  placeholder="请输入备注"
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
import { emits, usePmsDeliveryDetailForm } from './ts/PmsDeliveryDetailForm'; // 引入表单ts
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

