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
            <a-form-item name="maintenanceItems" label="保养项目">
              <a-input
                  v-model:value="form.maintenanceItems"
                  :maxLength="256"
                  placeholder="请输入保养项目"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenancePosition" label="保养部位">
              <a-input
                  v-model:value="form.maintenancePosition"
                  :maxLength="256"
                  placeholder="请输入保养部位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceBasis" label="保养依据">
              <a-input
                  v-model:value="form.maintenanceBasis"
                  :maxLength="2000"
                  placeholder="请输入保养依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceContent" label="保养内容">
              <a-input
                  v-model:value="form.maintenanceContent"
                  :maxLength="2000"
                  placeholder="请输入保养内容"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceRequirement" label="保养要求">
              <a-input
                  v-model:value="form.maintenanceRequirement"
                  :maxLength="2000"
                  placeholder="请输入保养要求"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techUserId" label="保养负责人">
              <AvicCommonSelect
                  v-model:value="form.techUserId"
                  type="userSelect"
                  placeholder="请选择主管技术员"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lastMaintenDate" label="上次保养日期">
              <a-date-picker
                  v-model:value="form.lastMaintenDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择上次保养日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceCycle" label="保养周期(月)">
              <a-input-number
                  v-model:value="form.maintenanceCycle"
                  :min="0"
                  :max="999999999999"
                  :precision="0"
                  :step="1"
                  placeholder="请输入保养周期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceHours" label="小时数">
              <a-input-number
                  v-model:value="form.maintenanceHours"
                  :min="0"
                  :max="999999999999"
                  :precision="0"
                  :step="1"
                  placeholder="请输入小时数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynSelfMaintenance" label="是否自主维护">
              <a-select
                  v-model:value="form.ynSelfMaintenance"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择是否自主维护"
              >
                <a-select-option
                    v-for="item in ynSelfMaintenanceList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols">-->
          <!--            <a-form-item name="note" label="备注">-->
          <!--              <a-input-->
          <!--                  v-model:value="form.note"-->
          <!--                  :maxLength="512"-->
          <!--                  placeholder="请输入备注"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
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
          <!--            <a-form-item name="techUserCode" label="主管计划员编码">-->
          <!--              <a-input-->
          <!--                  v-model:value="form.techUserCode"-->
          <!--                  :maxLength="64"-->
          <!--                  placeholder="请输入主管计划员编码"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols">-->
          <!--            <a-form-item name="applyUserCode" label="申请人编码">-->
          <!--              <a-input-->
          <!--                  v-model:value="form.applyUserCode"-->
          <!--                  :maxLength="50"-->
          <!--                  placeholder="请输入申请人编码"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
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
import { useTpmStandardMaintenanceForm, emits } from './ts/TpmStandardMaintenanceForm'; // 引入表单ts
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
  ynSelfMaintenanceList,
  secretLevelList,
  saveForm,
  closeModal
} = useTpmStandardMaintenanceForm({
  props: props,
  emit: emit
});
</script>
