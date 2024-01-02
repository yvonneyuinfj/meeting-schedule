<template>
  <div>
    <a-form
        ref="formRef"
        :model="form"
        class="form-excel-style"
        layout="horizontal"
        v-bind="layout"
    >
      <a-row>
        <a-col v-if="fieldVisible('reqPlanName')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('reqPlanName')" has-feedback label="科研任务名称" name="reqPlanName">
            <a-input
                v-model:value="form.reqPlanName"
                :auto-focus="true"
                :disabled="fieldDisabled('reqPlanName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('secretLevel')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('secretLevel')" has-feedback label="密级" name="secretLevel">
            <a-select
                v-model:value="form.secretLevel"
                :allow-clear="true"
                :disabled="fieldDisabled('secretLevel')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
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
        <a-col v-if="fieldVisible('procurementMethod')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('procurementMethod')" has-feedback label="采购方式"
                       name="procurementMethod">
            <a-radio-group v-model:value="form.procurementMethod" :disabled="fieldDisabled('procurementMethod')">
              <a-radio
                  v-for="item in procurementMethodList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('singleSourceReason')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('singleSourceReason')" has-feedback label="单一来源原因"
                       name="singleSourceReason">
            <a-input
                v-model:value="form.singleSourceReason"
                :disabled="fieldDisabled('singleSourceReason')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('projectRequirements')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('projectRequirements')" has-feedback label="项目要求"
                       name="projectRequirements">
            <a-textarea v-model:value="form.projectRequirements" :disabled="fieldDisabled('projectRequirements')"
                        :rows="2"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('supplierRequirements')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('supplierRequirements')" has-feedback label="供应商要求"
                       name="supplierRequirements">
            <a-textarea v-model:value="form.supplierRequirements" :disabled="fieldDisabled('supplierRequirements')"
                        :rows="2"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('otherRequirements')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('otherRequirements')" has-feedback label="其他要求"
                       name="otherRequirements">
            <a-textarea v-model:value="form.otherRequirements" :disabled="fieldDisabled('otherRequirements')"
                        :rows="2"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('preparationRequirements')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('preparationRequirements')" has-feedback
                       label="响应文件的编制要求" name="preparationRequirements">
            <a-textarea v-model:value="form.preparationRequirements"
                        :disabled="fieldDisabled('preparationRequirements')"
                        :rows="2"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('packagingSubmissionRequirements')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('packagingSubmissionRequirements')" has-feedback
                       label="响应文件的封装和递交要求" name="packagingSubmissionRequirements">
            <a-textarea v-model:value="form.packagingSubmissionRequirements"
                        :disabled="fieldDisabled('packagingSubmissionRequirements')"
                        :rows="2"/>
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('supplierSelectionCriteria')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('supplierSelectionCriteria')" has-feedback
                       label="供应商中选标准" name="supplierSelectionCriteria">
            <a-radio-group v-model:value="form.supplierSelectionCriteria"
                           :disabled="fieldDisabled('supplierSelectionCriteria')">
              <a-radio
                  v-for="item in supplierSelectionCriteriaList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('procureStage')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('procureStage')" has-feedback label="采购阶段" name="procureStage">
            <a-select
                v-model:value="form.procureStage"
                :allow-clear="true"
                :disabled="fieldDisabled('procureStage')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in procureStageList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('processingType')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('processingType')" has-feedback label="是否为加工类" name="processingType">
            <a-select
                v-model:value="form.processingType"
                :allow-clear="true"
                :disabled="fieldDisabled('processingType')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in processingTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('publishInformationSecurityLevel')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('publishInformationSecurityLevel')" has-feedback
                       label="本次发布信息密级" name="publishInformationSecurityLevel">
            <a-select
                v-model:value="form.publishInformationSecurityLevel"
                :allow-clear="true"
                :disabled="fieldDisabled('publishInformationSecurityLevel')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in publishInformationSecurityLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('procurementTaskClassification')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('procurementTaskClassification')" has-feedback
                       label="本项采购任务密级" name="procurementTaskClassification">
            <a-select
                v-model:value="form.procurementTaskClassification"
                :allow-clear="true"
                :disabled="fieldDisabled('procurementTaskClassification')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in procurementTaskClassificationList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item :rules="attachmentRequired('uploadFile')" label="上传附件" type="attachment">
            <AvicUploader
                ref="uploadFile"
                :allow-download="true"
                :bpm-instance-object="props.bpmInstanceObject"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                element-id="1"
                label="上传附件"
                table-name="PMS_PROCUREMENT_REQUIREMENTS"
                @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <PmsProcurementRequirementsLEdit
        v-if="fieldVisible('PMS_PROCUREMENT_REQUIREMENTS_L')"
        ref="pmsProcurementRequirementsLEdit"
        :bpmInstanceObject="bpmInstanceObject"
        :bpmParams="bpmParams"
        :mainId="formId || form.id"
    />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
        class="eform_subtable_bpm_button_auth table-handle-button"
        for="addSubTableButton"
        label="添加"
        style="display: none"
        title="添加"
    >
      添加
    </a-button>
    <a-button
        class="eform_subtable_bpm_button_auth table-handle-button"
        for="deleteSubTableButton"
        label="删除"
        style="display: none"
        title="删除"
    >
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { emits, usePmsProcurementRequirementsForm } from './ts/PmsProcurementRequirementsForm'; // 引入表单ts
import PmsProcurementRequirementsLEdit
  from '@/views/avic/mms/pms/pmsprocurementrequirementsl/PmsProcurementRequirementsLEdit.vue'; // 引入子表组件

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  bpmParams,
  layout,
  colLayout,
  secretLevelList,
  procurementMethodList,
  supplierSelectionCriteriaList,
  procureStageList,
  processingTypeList,
  publishInformationSecurityLevelList,
  procurementTaskClassificationList,
  uploadFile,
  afterUploadEvent,
  attachmentRequired,
  pmsProcurementRequirementsLEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = usePmsProcurementRequirementsForm({
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


