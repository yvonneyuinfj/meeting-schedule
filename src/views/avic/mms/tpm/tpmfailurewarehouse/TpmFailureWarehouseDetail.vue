<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="单据号" :rules="fieldRequired('billNo')" has-feedback>
            <!--            <AvicAutoCode-->
            <!--              v-model:value="form.billNo"-->
            <!--              ref="autoCode"-->
            <!--              code-type="FAILURE_BILL_NO"-->
            <!--              code-param="TPM_FAILURE_WAREHOUSE"-->
            <!--              :allow-clear="true"-->
            <!--              :disabled="fieldDisabled('billNo')"-->
            <!--              placeholder="请输入单据号"-->
            <!--            />-->
            <a-input
              v-model:value="form.billNo"
              :auto-focus="true"
              :disabled="fieldDisabled('billNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('equipmentCode')">
          <a-form-item
            name="equipmentCode"
            label="设备编号"
            :rules="fieldRequired('equipmentCode')"
            has-feedback
          >
            <AvicModalSelect
              v-model:value="form.equipmentCode"
              :defaultShowValue="form.equipmentCode"
              modalTitle="选择设备编号"
              placeholder="请选择设备编号"
              valueField=""
              showField=""
              :selectComponent="tpmInventorySelectComponent"
              :isMultiSelection="false"
              :allow-clear="true"
              :disabled="fieldDisabled('equipmentCode')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('equipmentName')">
          <a-form-item name="equipmentName" label="设备名称" :rules="fieldRequired('equipmentName')" has-feedback>
            <a-input
              v-model:value="form.equipmentName"
              :auto-focus="true"
              :disabled="fieldDisabled('equipmentName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('model')">
          <a-form-item name="model" label="设备型号" :rules="fieldRequired('model')" has-feedback>
            <a-input
              v-model:value="form.model"
              :disabled="fieldDisabled('model')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('specs')">
          <a-form-item name="specs" label="设备规格" :rules="fieldRequired('specs')" has-feedback>
            <a-input
              v-model:value="form.specs"
              :disabled="fieldDisabled('specs')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('useDeptName')">
          <a-form-item name="useDeptName" label="使用部门名称" :rules="fieldRequired('useDeptName')" has-feedback>
            <a-input
              v-model:value="form.useDeptName"
              :disabled="fieldDisabled('useDeptName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyUserName')">
          <a-form-item name="applyUserName" label="申请人姓名" :rules="fieldRequired('applyUserName')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.applyUserName"
              type="userSelect"
              :defaultShowValue="form.applyUserNameAlias"
              :disabled="fieldDisabled('applyUserName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyUserTel')">
          <a-form-item name="applyUserTel" label="申请人电话" :rules="fieldRequired('applyUserTel')" has-feedback>
            <a-input
              v-model:value="form.applyUserTel"
              :disabled="fieldDisabled('applyUserTel')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('repairDept')">
          <a-form-item name="repairDept" label="维修单位" :rules="fieldRequired('repairDept')" has-feedback>
            <a-input
              v-model:value="form.repairDept"
              :disabled="fieldDisabled('repairDept')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="申请日期" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
              v-model:value="form.applyDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('faultDate')">
          <a-form-item name="faultDate" label="故障发生时间" :rules="fieldRequired('faultDate')" has-feedback>
            <a-date-picker
              v-model:value="form.faultDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('faultDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('planFinishDate')">
          <a-form-item name="planFinishDate" label="计划完成时间" :rules="fieldRequired('planFinishDate')" has-feedback>
            <a-date-picker
              v-model:value="form.planFinishDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('planFinishDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('repairMoney')">
          <a-form-item name="repairMoney" label="维修金额" :rules="fieldRequired('repairMoney')" has-feedback>
            <a-input
              v-model:value="form.repairMoney"
              :disabled="fieldDisabled('repairMoney')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('failureWarehouseType')">
          <a-form-item name="failureWarehouseType" label="故障库类型" :rules="fieldRequired('failureWarehouseType')"
                       has-feedback>
            <a-select
              v-model:value="form.failureWarehouseType"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('failureWarehouseType')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select
              v-model:value="form.secretLevel"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')"
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
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('faultContent')">
          <a-form-item name="faultContent" label="故障现象及原因" :rules="fieldRequired('faultContent')" has-feedback>
            <a-textarea v-model:value="form.faultContent" :rows="2" :disabled="fieldDisabled('faultContent')"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('repairContent')">
          <a-form-item name="repairContent" label="维修内容" :rules="fieldRequired('repairContent')" has-feedback>
            <a-textarea v-model:value="form.repairContent" :rows="2" :disabled="fieldDisabled('repairContent')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols3">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader
              element-id="1"
              ref="uploadFile"
              label="上传附件"
              :form-id="form.id"
              :bpm-instance-object="props.bpmInstanceObject"
              :form-secret-level="form.secretLevel"
              :allow-download="true"
              table-name="TPM_FAILURE_WAREHOUSE"
              @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useTpmFailureWarehouseForm, emits } from './ts/TpmFailureWarehouseForm'; // 引入表单ts
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
  layout,
  colLayout,
  billStatusList,
  failureWarehouseTypeList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  autoCode,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useTpmFailureWarehouseForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>
