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
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
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
              <a-input
                v-model:value="form.tpmInventoryCode"
                placeholder="请输入设备编号"
                @click="tpmInventoryCodeClick"
              >
                <template #suffix>
                  <a-tooltip title="Extra information">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>
                  </a-tooltip>
                </template>
              </a-input>
              <!-- <AvicModalSelect
                v-model:value="form.tpmInventoryCode"
                title="选择设备编号"
                placeholder="请选择设备编号"
                valueField=""
                showField=""
                :selectComponent="tpmStandardMaintenanceSelectComponent"
                :allow-clear="true"
              /> -->
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
            <a-form-item name="equipmentName" label="设备名称">
              <a-input v-model:value="form.equipmentName" disabled placeholder="请输入设备名称"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevelName" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevelName"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
            <a-form-item name="model" label="型号">
              <a-input v-model:value="form.model" disabled placeholder="请输入型号"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="设备规格">
              <a-input v-model:value="form.specs" disabled placeholder="请输入设备规格"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceItems" label="保养项目">
              <a-input
                v-model:value="form.maintenanceItems"
                disabled
                placeholder="请输入保养项目"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenancePosition" label="保养部位">
              <a-input
                v-model:value="form.maintenancePosition"
                disabled
                placeholder="请输入保养部位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceBasis" label="保养依据">
              <a-input
                v-model:value="form.maintenanceBasis"
                disabled
                placeholder="请输入保养依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceContent" label="保养内容">
              <a-input
                v-model:value="form.maintenanceContent"
                disabled
                placeholder="请输入保养内容"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceRequirement" label="保养要求">
              <a-input
                v-model:value="form.maintenanceRequirement"
                disabled
                placeholder="请输入保养要求"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techUserIdAlias" label="保养负责人">
              <a-input
                v-model:value="form.techUserIdAlias"
                disabled
                placeholder="请输入保养负责人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lastMaintenDate" label="上次保养日期">
              <a-input
                v-model:value="form.lastMaintenDate"
                disabled
                placeholder="请输入上次保养日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceCycle" label="保养周期(月)">
              <a-input-number
                v-model:value="form.maintenanceCycle"
                :min="0"
                :max="9999999999"
                disabled
                :precision="0"
                :step="1"
                placeholder="请输入保养周期(月)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintenanceHours" label="小时数">
              <a-input v-model:value="form.maintenanceHours" disabled placeholder="请输入小时数"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynSelfMaintenanceName" label="是否自主维护">
              <a-input
                v-model:value="form.ynSelfMaintenanceName"
                disabled
                placeholder="请选择是否自主维护"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <!--      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>-->
      <a-button title="保存" type="primary" :loading="loading" @click="saveFormAdd">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
    <a-modal
      :visible="codeModalOpen"
      width="70%"
      @cancel="() => (codeModalOpen = false)"
      @ok="handleSummit"
    >
      <tpm-standard-maintenance-select
        ref="tpmStandardMaintenanceSelect"
        style="min-height: 450px"
      />
    </a-modal>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmMaintPlanForm, emits } from './ts/TpmMaintPlanForm'; // 引入表单ts
import TpmStandardMaintenanceSelect from '@/views/avic/mms/tpm/tpmmaintplan/TpmStandardMaintenanceSelect.vue'; // 引入弹窗选择页
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
const { proxy } = getCurrentInstance();
const emit = defineEmits(emits);
const codeModalOpen = ref<boolean>(false);
const tpmStandardMaintenanceSelect = ref(null);

function tpmInventoryCodeClick() {
  codeModalOpen.value = true;
}

function handleSummit() {
  const selectRows = tpmStandardMaintenanceSelect.value.selectedRows;
  if (selectRows.length > 1 || selectRows.length === 0) {
    proxy.$message.warning('请选择一条需要导出的数据');
    return;
  }
  codeModalOpen.value = false;
  const {
    equipmentCode,
    maintenanceContent,
    maintenanceRequirement,
    techUserIdAlias,
    lastMaintenDate,
    maintenanceCycle,
    maintenanceHours,
    ynSelfMaintenanceName,
    ynSelfMaintenance,
    secretLevelName,
    equipmentName,
    model,
    specs,
    maintenanceItems,
    maintenancePosition,
    maintenanceBasis,
    tpmStandardId,
    tpmStandardMaintenanceId,
    tpmInventoryId
  } = selectRows[0];
  form.value.tpmInventoryCode = equipmentCode;
  form.value.maintenanceContent = maintenanceContent;
  form.value.maintenanceRequirement = maintenanceRequirement;
  form.value.techUserIdAlias = techUserIdAlias;
  form.value.lastMaintenDate = lastMaintenDate;
  form.value.maintenanceCycle = maintenanceCycle;
  form.value.maintenanceHours = maintenanceHours;
  form.value.secretLevelName = secretLevelName;
  form.value.secretLevel = secretLevel;
  form.value.equipmentName = equipmentName;
  form.value.model = model;
  form.value.specs = specs;
  form.value.maintenanceItems = maintenanceItems;
  form.value.maintenancePosition = maintenancePosition;
  form.value.maintenanceBasis = maintenanceBasis;
  form.value.ynSelfMaintenanceName = ynSelfMaintenanceName;
  form.value.ynSelfMaintenance = ynSelfMaintenance;
  form.value.tpmStandardId = tpmStandardId;
  form.value.tpmStandardMaintenanceId = tpmStandardMaintenanceId;
  form.value.tpmInventoryId = tpmInventoryId;
}

// const tpmStandardMaintenanceSelectComponent = tpmStandardMaintenanceSelect; // 自定义选择
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
