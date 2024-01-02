<template>
  <div>
    <a-form
        ref="formRef"
        :model="form"
        class="form-excel-style"
        v-bind="layout"
    >
      <a-row>
        <a-col v-if="fieldVisible('reqPlanName')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('reqPlanName')" has-feedback label="采购计划名称" name="reqPlanName">
            <a-input
                v-model:value="form.reqPlanName"
                :auto-focus="true"
                :disabled="fieldDisabled('reqPlanName')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('projectTopicNumber')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('projectTopicNumber')" has-feedback label="所属项目课题号"
                       name="projectTopicNumber">
            <a-input
                v-model:value="form.projectTopicNumber"
                :disabled="fieldDisabled('projectTopicNumber')"
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
        <a-col v-if="fieldVisible('productType')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('productType')" has-feedback label="产品类型" name="productType">
            <a-select
                v-model:value="form.productType"
                :allow-clear="true"
                :disabled="fieldDisabled('productType')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in productTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('productReqClassify')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('productReqClassify')" has-feedback label="产品需求分类"
                       name="productReqClassify">
            <a-select
                v-model:value="form.productReqClassify"
                :allow-clear="true"
                :disabled="fieldDisabled('productReqClassify')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in productReqClassifyList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('productServiceCategory')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('productServiceCategory')" has-feedback
                       label="产品和服务类别" name="productServiceCategory">
            <a-select
                v-model:value="form.productServiceCategory"
                :allow-clear="true"
                :disabled="fieldDisabled('productServiceCategory')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in productServiceCategoryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
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
        <a-col v-if="fieldVisible('budgetAmount')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('budgetAmount')" has-feedback label="预算金额" name="budgetAmount">
            <a-input
                v-model:value="form.budgetAmount"
                :disabled="fieldDisabled('budgetAmount')"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('armyRepresentativeId')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('armyRepresentativeId')" has-feedback label="军代表"
                       name="armyRepresentativeId">
            <AvicCommonSelect
                v-model:value="form.armyRepresentativeId"
                :defaultShowValue="form.armyRepresentativeIdAlias"
                :disabled="fieldDisabled('armyRepresentativeId')"
                type="userSelect"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('requirementsDocumentArchivingCode')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('requirementsDocumentArchivingCode')" has-feedback
                       label="需求文件归档编号" name="requirementsDocumentArchivingCode">
            <a-input
                v-model:value="form.requirementsDocumentArchivingCode"
                :disabled="fieldDisabled('requirementsDocumentArchivingCode')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('qualificationRequirements')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('qualificationRequirements')" has-feedback
                       label="资质要求" name="qualificationRequirements">
            <a-checkbox-group v-model:value="form.qualificationRequirements"
                              :disabled="fieldDisabled('qualificationRequirements')">
              <a-checkbox
                  v-for="item in qualificationRequirementsList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('publishingDept')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('publishingDept')" has-feedback label="发布单位" name="publishingDept">
            <a-input
                v-model:value="form.publishingDept"
                :disabled="fieldDisabled('publishingDept')"
                :maxLength="64"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="fieldVisible('affiliatedLargeDept')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('affiliatedLargeDept')" has-feedback label="所属大单位"
                       name="affiliatedLargeDept">
            <a-input
                v-model:value="form.affiliatedLargeDept"
                :disabled="fieldDisabled('affiliatedLargeDept')"
                :maxLength="64"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('email')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('email')" has-feedback label="电子邮箱" name="email">
            <a-input
                v-model:value="form.email"
                :disabled="fieldDisabled('email')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('professionalField')" v-bind="colLayout.cols2">
          <a-form-item :rules="fieldRequired('professionalField')" has-feedback label="专业领域"
                       name="professionalField">
            <a-checkbox-group v-model:value="form.professionalField" :disabled="fieldDisabled('professionalField')">
              <a-checkbox
                  v-for="item in professionalFieldList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
      </a-row>
      <a-row>
        <a-col v-if="fieldVisible('dockingWorkdays')" v-bind="colLayout.cols">
          <a-form-item :rules="fieldRequired('dockingWorkdays')" has-feedback label="对接工作日" name="dockingWorkdays">
            <a-select
                v-model:value="form.dockingWorkdays"
                :allow-clear="true"
                :disabled="fieldDisabled('dockingWorkdays')"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                :show-search="true"
                option-filter-prop="children"
            >
              <a-select-option
                  v-for="item in dockingWorkdaysList"
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
                table-name="PMS_PROCUREMENT_INFORMATION_RELEASE_APPLICATION"
                @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import {
  emits,
  usePmsProcurementInformationReleaseApplicationForm
} from './ts/PmsProcurementInformationReleaseApplicationForm'; // 引入表单ts
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
  secretLevelList,
  productTypeList,
  productReqClassifyList,
  productServiceCategoryList,
  procureStageList,
  qualificationRequirementsList,
  professionalFieldList,
  dockingWorkdaysList,
  uploadFile,
  afterUploadEvent,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = usePmsProcurementInformationReleaseApplicationForm({
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
