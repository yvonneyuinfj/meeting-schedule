<template>
  <AvicModal
      :visible="true"
      title="添加"
      width="1200px"
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
            <a-form-item name="billNo" label="单据号" has-feedback>
              <avic-auto-code
                  v-model:value="form.billNo"
                  ref="autoCode"
                  code-type="TPM_FAILURE_BILL_NO"
                  code-param="TPM_FAILURE_WAREHOUSE"
                  :allow-clear="true"
                  :disabled="true"
                  placeholder="请输入单据号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号" has-feedback>
              <!-- <AvicModalSelect
                v-model:value="form.equipmentCode"
                title="选择设备编号"
                placeholder="请选择设备编号"
                valueField=""
                showField=""
                :selectComponent="tpmInventorySelectComponent"
                :allow-clear="true"
              /> -->
              <a-input v-model:value="form.equipmentCode" :maxLength="64" :auto-focus="true"
                       placeholder="请选择设备编号" :readonly="true" @click="handleOpen"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentName" label="设备名称" has-feedback>
              <a-input
                  v-model:value="form.equipmentName"
                  :maxLength="128"
                  :auto-focus="true"
                  placeholder="请输入设备名称"
                  :readonly="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="model" label="设备型号" has-feedback>
              <a-input
                  v-model:value="form.model"
                  :maxLength="128"
                  placeholder="请输入设备型号"
                  :readonly="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="设备规格" has-feedback>
              <a-input
                  v-model:value="form.specs"
                  :maxLength="128"
                  placeholder="请输入设备规格"
                  :readonly="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门" has-feedback>
              <a-input
                  v-model:value="form.useDeptName"
                  :maxLength="128"
                  placeholder="请输入使用部门"
                  :readonly="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserId" label="申请人姓名" has-feedback>
              <AvicCommonSelect
                  v-model:value="form.applyUserId"
                  :defaultShowValue="form.applyUserName"
                  type="userSelect"
                  placeholder="请选择申请人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserTel" label="申请人电话">
              <a-input
                  v-model:value="form.applyUserTel"
                  :maxLength="64"
                  placeholder="请输入申请人电话"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="repairDept" label="维修/改造单位">
              <a-input
                  v-model:value="form.repairDept"
                  :maxLength="128"
                  placeholder="请输入维修/改造单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请日期" has-feedback>
              <a-date-picker
                  v-model:value="form.applyDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择申请日期"
                    :defaultValue="currentTime"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="faultDate" label="故障发生时间" has-feedback>
              <a-date-picker
                  v-model:value="form.faultDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择故障发生时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planFinishDate" label="计划完成时间" has-feedback>
              <a-date-picker
                  v-model:value="form.planFinishDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择计划完成时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="repairMoney" label="维修/改造金额">
              <a-input
                  v-model:value="form.repairMoney"
                  :maxLength="20"
                  placeholder="请输入维修/改造金额"
                  suffix="元"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="failureWarehouseType" label="故障库类型" has-feedback>
              <a-select
                  v-model:value="form.failureWarehouseType"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择故障库类型"
              >
                <a-select-option
                    v-for="item in failureWarehouseTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item
                name="faultContent"
                label="故障现象及原因"
            >
              <a-textarea
                  v-model:value="form.faultContent"
                  :rows="2"
                  :maxLength="4000"
                  placeholder="请输入故障现象及原因"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item
                name="repairContent"
                label="维修/改造内容"
            >
              <a-textarea
                  v-model:value="form.repairContent"
                  :rows="2"
                  :maxLength="4000"
                  placeholder="请输入维修/改造内容"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols3">
            <a-form-item
                label="附件"
            >
              <AvicUploader
                  element-id="1"
                  form-type="add"
                  ref="uploadFile"
                  :allow-download="true"
                  :allow-preview="true"
                  :allow-delete="true"
                  :allow-update-secret-level="true"
                  :form-id="form.id"
                  :form-secret-level="form.secretLevel"
                  table-name="TPM_FAILURE_WAREHOUSE"
                  @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存并提交流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并提交流程</a-button>
      <a-button title="保存并返回" type="primary" :loading="loading" @click="saveFormAdd">保存并返回</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
    <!--选择设备弹窗-->
    <a-modal :visible="open" title="选择设备" @ok="handleOk" @cancel="handleCancel" width="80%" style="top: 20px">
      <div style="height: 400px;overflow: auto">
        <Tpm-inventory-failure-select ref="tpmInventoryFailureSelect">
        </Tpm-inventory-failure-select>
      </div>
    </a-modal>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmFailureWarehouseForm, emits } from './ts/TpmFailureWarehouseForm'; // 引入表单ts
import TpmInventoryFailureSelect from './TpmInventoryFailureSelect.vue'; // 引入弹窗选择页
import dayjs from 'dayjs';
const currentTime = ref(dayjs().format('YYYY-MM-DD'));
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
const open = ref<boolean>(false);
const tpmInventoryFailureSelect = ref(null);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  billStatusList,
  failureWarehouseTypeList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  autoCode,
  saveAndStartProcess,
  saveFormAdd,
  closeModal
} = useTpmFailureWarehouseForm({
  props: props,
  emit: emit
});

/** 选择设备 */
function handleOpen() {
  open.value = true;
}

const handleCancel = () => {
  open.value = false;
};

const handleOk = () => {
  const info = tpmInventoryFailureSelect.value.info;
  form.value.equipmentCode = info.equipmentCode;
  form.value.equipmentName = info.equipmentName;
  form.value.specs = info.specs;
  form.value.model = info.model;
  form.value.useDeptName = info.useDeptName;
  form.value.useDeptId = info.useDeptId;
  form.value.useDeptCode = info.useDeptCode;
  form.value['tpmInventoryId'] = info.id;

  open.value = false;
};
onMounted(() => {
  form.value.applyDate = currentTime;
});
</script>
