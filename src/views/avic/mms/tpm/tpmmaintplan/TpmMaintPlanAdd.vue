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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmStandardId" label="设备标准主表ID">
              <a-input
                v-model:value="form.tpmStandardId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入设备标准主表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmStandardMaintenanceId" label="TPM_STANDARD_MAINTENANCE_ID">
              <a-input
                v-model:value="form.tpmStandardMaintenanceId"
                :maxLength="64"
                placeholder="请输入TPM_STANDARD_MAINTENANCE_ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmInventoryId" label="设备台账ID">
              <a-input
                v-model:value="form.tpmInventoryId"
                :maxLength="64"
                placeholder="请输入设备台账ID"
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
            <a-form-item name="editDate" label="编制日期">
              <a-date-picker
                v-model:value="form.editDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制日期"
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
            <a-form-item name="maintenanceStatus" label="保养状态">
              <a-select
                v-model:value="form.maintenanceStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择保养状态"
              >
                <a-select-option
                  v-for="item in maintenanceStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceFinishDate" label="保养完成日期">
              <a-date-picker
                v-model:value="form.maintenanceFinishDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择保养完成日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintUserId" label="保养负责人ID">
              <AvicCommonSelect
                v-model:value="form.maintUserId"
                type="userSelect"
                placeholder="请选择保养负责人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintUserCode" label="保养负责人编码">
              <a-input
                v-model:value="form.maintUserCode"
                :maxLength="64"
                placeholder="请输入保养负责人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintUserName" label="保养负责人姓名">
              <a-input
                v-model:value="form.maintUserName"
                :maxLength="64"
                placeholder="请输入保养负责人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="actrualMaintUserId" label="实际保养人ID">
              <AvicCommonSelect
                v-model:value="form.actrualMaintUserId"
                type="userSelect"
                placeholder="请选择实际保养人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="actrualMaintUserCode" label="实际保养人编码">
              <a-input
                v-model:value="form.actrualMaintUserCode"
                :maxLength="64"
                placeholder="请输入实际保养人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="actrualMaintUserName" label="实际保养人姓名">
              <a-input
                v-model:value="form.actrualMaintUserName"
                :maxLength="64"
                placeholder="请输入实际保养人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dispatchDate" label="下达日期">
              <a-date-picker
                v-model:value="form.dispatchDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下达日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dispatchUserId" label="下达人ID">
              <AvicCommonSelect
                v-model:value="form.dispatchUserId"
                type="userSelect"
                placeholder="请选择下达人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dispatchUserCode" label="下达人编码">
              <a-input
                v-model:value="form.dispatchUserCode"
                :maxLength="64"
                placeholder="请输入下达人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dispatchUserName" label="下达人姓名">
              <a-input
                v-model:value="form.dispatchUserName"
                :maxLength="64"
                placeholder="请输入下达人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="goodConditionFlag" label="完好标识">
              <a-select
                v-model:value="form.goodConditionFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择完好标识"
              >
                <a-select-option
                  v-for="item in goodConditionFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billStatus" label="保养计划流程状态">
              <a-input
                v-model:value="form.billStatus"
                :maxLength="2"
                placeholder="请输入保养计划流程状态"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="feedbackBillStatus" label="保养反馈流程状态">
              <a-input
                v-model:value="form.feedbackBillStatus"
                :maxLength="2"
                placeholder="请输入保养反馈流程状态"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oldLastMaintenPlanDate" label="最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）">
              <a-date-picker
                v-model:value="form.oldLastMaintenPlanDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="计划编号">
              <a-input
                v-model:value="form.billNo"
                :maxLength="64"
                placeholder="请输入计划编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenPlanType" label="保养计划类型">
              <a-input
                v-model:value="form.maintenPlanType"
                :maxLength="4"
                placeholder="请输入保养计划类型"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backReason" label="驳回原因">
              <a-input
                v-model:value="form.backReason"
                :maxLength="500"
                placeholder="请输入驳回原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="completeDate" label="完工日期">
              <a-date-picker
                v-model:value="form.completeDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择完工日期"
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
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmMaintPlanForm, emits } from './ts/TpmMaintPlanForm'; // 引入表单ts
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
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  maintenanceStatusList,
  goodConditionFlagList,
  secretLevelList,
  saveAndStartProcess,
  closeModal
} = useTpmMaintPlanForm({
  props: props,
  emit: emit
});
</script>
