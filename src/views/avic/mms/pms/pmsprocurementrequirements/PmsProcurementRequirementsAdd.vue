<template>
  <AvicModal
      :centered="true"
      :visible="true"
      height="520px"
      title="添加"
      width="960px"
      @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="科研任务名称" name="reqPlanName">
              <a-input
                  v-model:value="form.reqPlanName"
                  :auto-focus="true"
                  :maxLength="64"
                  :readonly="true"
                  placeholder="请输入科研任务名称"
                  @click="handleOpen"
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
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="采购方式" name="procurementMethod">
              <a-radio-group v-model:value="form.procurementMethod">
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
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="项目要求"
                name="projectRequirements"
            >
              <a-textarea
                  v-model:value="form.projectRequirements"
                  :maxLength="4000"
                  :rows="2"
                  placeholder="请输入项目要求"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="供应商要求"
                name="supplierRequirements"
            >
              <a-textarea
                  v-model:value="form.supplierRequirements"
                  :maxLength="4000"
                  :rows="2"
                  placeholder="请输入供应商要求"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="其他要求"
                name="otherRequirements"
            >
              <a-textarea
                  v-model:value="form.otherRequirements"
                  :maxLength="4000"
                  :rows="2"
                  placeholder="请输入其他要求"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="响应文件的编制要求"
                name="preparationRequirements"
            >
              <a-textarea
                  v-model:value="form.preparationRequirements"
                  :maxLength="4000"
                  :rows="2"
                  placeholder="请输入响应文件的编制要求"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="响应文件的封装和递交要求"
                name="packagingSubmissionRequirements"
            >
              <a-textarea
                  v-model:value="form.packagingSubmissionRequirements"
                  :maxLength="4000"
                  :rows="2"
                  placeholder="请输入响应文件的封装和递交要求"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="供应商中选标准" name="supplierSelectionCriteria">
              <a-radio-group v-model:value="form.supplierSelectionCriteria">
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
          <!--          <a-col v-bind="colLayout.cols">-->
          <!--            <a-form-item label="采购阶段" name="procureStage">-->
          <!--              <a-select-->
          <!--                  v-model:value="form.procureStage"-->
          <!--                  :allow-clear="true"-->
          <!--                  :get-popup-container="triggerNode => triggerNode.parentNode"-->
          <!--                  :show-search="true"-->
          <!--                  option-filter-prop="children"-->
          <!--                  placeholder="请选择采购阶段"-->
          <!--              >-->
          <!--                <a-select-option-->
          <!--                    v-for="item in procureStageList"-->
          <!--                    :key="item.sysLookupTlId"-->
          <!--                    :value="item.lookupCode"-->
          <!--                >-->
          <!--                  {{ item.lookupName }}-->
          <!--                </a-select-option>-->
          <!--              </a-select>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item label="是否为加工类" name="processingType">
              <a-select
                  v-model:value="form.processingType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择是否为加工类"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="本次发布信息密级" name="publishInformationSecurityLevel">
              <a-select
                  v-model:value="form.publishInformationSecurityLevel"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择本次发布信息密级"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="本项采购任务密级" name="procurementTaskClassification">
              <a-select
                  v-model:value="form.procurementTaskClassification"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择本项采购任务密级"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="单一来源原因" name="singleSourceReason">
              <a-input
                  v-model:value="form.singleSourceReason"
                  :maxLength="64"
                  placeholder="请输入单一来源原因"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="附件"
            >
              <AvicUploader
                  ref="uploadFile"
                  :allow-delete="true"
                  :allow-download="true"
                  :allow-preview="true"
                  :allow-update-secret-level="true"
                  :form-id="form.id"
                  :form-secret-level="form.secretLevel"
                  element-id="1"
                  form-type="add"
                  table-name="PMS_PROCUREMENT_REQUIREMENTS"
                  @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <PmsProcurementRequirementsLEdit ref="pmsProcurementRequirementsLEdit"></PmsProcurementRequirementsLEdit>
    </a-spin>
    <template #footer>
      <a-button :loading="loading" title="保存并启动流程" type="primary" @click="saveAndStartProcess">保存并启动流程
      </a-button>
      <a-button :loading="loading" title="保存并返回" type="primary" @click="saveForm">保存并返回
      </a-button>
      <a-button ghost title="返回" type="primary" @click="closeModal">返回</a-button>
    </template>
    <!--选择计划弹窗-->
    <a-modal :visible="open" style="top: 20px" title="选择计划" width="80%" @cancel="handleCancel" @ok="handleOk">
      <div style="height: 400px;overflow: auto">
        <Pms-plan-select ref="pmsPlanSelect">
        </Pms-plan-select>
      </div>
    </a-modal>
  </AvicModal>
</template>
<script lang="ts" setup>
import { emits, usePmsProcurementRequirementsForm } from './ts/PmsProcurementRequirementsForm'; // 引入表单ts
import PmsProcurementRequirementsLEdit
  from '@/views/avic/mms/pms/pmsprocurementrequirementsl/PmsProcurementRequirementsLEdit.vue';
import PmsPlanSelect from './PmsPlanSelect.vue';

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
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  procurementMethodList,
  supplierSelectionCriteriaList,
  // procureStageList,
  processingTypeList,
  publishInformationSecurityLevelList,
  procurementTaskClassificationList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal,
  saveAndStartProcess,
  pmsProcurementRequirementsLEdit
} = usePmsProcurementRequirementsForm({
  props: props,
  emit: emit
});
const open = ref<boolean>(false);
const pmsPlanSelect = ref(null);

/** 选择计划 */
function handleOpen() {
  open.value = true;
}

const handleCancel = () => {
  open.value = false;
};

const handleOk = () => {
  const info = pmsPlanSelect.value.info;
  form.value.pmsPlanId = info.id;
  form.value.pmsTaskNo = info.pmsTaskNo;
  form.value.reqPlanName = info.reqPlanName;
  form.value.reqPlanNo = info.reqPlanNo;
  form.value.procureStage = info.procureStage;
  form.value.productServiceCategory = info.productServiceCategory;
  form.value.projectTopicNumber = info.projectTopicNumber;
  form.value.secretLevel = info.secretLevel;
  open.value = false;
};

</script>

