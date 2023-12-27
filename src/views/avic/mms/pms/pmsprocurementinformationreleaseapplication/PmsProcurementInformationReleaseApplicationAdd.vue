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
      <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="form-excel-style"
          v-bind="layout"
      >
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="采购计划名称" name="reqPlanName">
              <a-input
                  v-model:value="form.reqPlanName"
                  :auto-focus="true"
                  :maxLength="4000"
                  :readonly="true"
                  placeholder="请输入采购计划名称"
                  @click="handleOpen"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="所属项目课题号" name="projectTopicNumber">
              <a-input
                  v-model:value="form.projectTopicNumber"
                  :maxLength="32"
                  placeholder="请输入所属项目课题号"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="产品类型" name="productType">
              <a-select
                  v-model:value="form.productType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品类型"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="产品需求分类" name="productReqClassify">
              <a-select
                  v-model:value="form.productReqClassify"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品需求分类"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="产品和服务类别" name="productServiceCategory">
              <a-select
                  v-model:value="form.productServiceCategory"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品和服务类别"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购阶段" name="procureStage">
              <a-select
                  v-model:value="form.procureStage"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择采购阶段"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="预算金额" name="budgetAmount">
              <a-input
                  v-model:value="form.budgetAmount"
                  :maxLength="20"
                  placeholder="请输入预算金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="军代表" name="armyRepresentativeId">
              <AvicCommonSelect
                  v-model:value="form.armyRepresentativeId"
                  placeholder="请选择军代表"
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求文件归档编号" name="requirementsDocumentArchivingCode">
              <a-input
                  v-model:value="form.requirementsDocumentArchivingCode"
                  :maxLength="128"
                  placeholder="请输入需求文件归档编号"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="资质要求" name="qualificationRequirements">
              <a-checkbox-group v-model:value="form.qualificationRequirements">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="发布单位" name="publishingDept">
              <a-input
                  v-model:value="form.publishingDept"
                  :maxLength="64"
                  :readonly="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="所属大单位" name="affiliatedLargeDept">
              <a-input
                  v-model:value="form.affiliatedLargeDept"
                  :maxLength="64"
                  :readonly="true"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="电子邮箱" name="email">
              <a-input
                  v-model:value="form.email"
                  :maxLength="512"
                  :readonly="true"
                  placeholder="请输入电子邮箱"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="专业领域" name="professionalField">
              <a-checkbox-group v-model:value="form.professionalField">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="对接工作日" name="dockingWorkdays">
              <a-select
                  v-model:value="form.dockingWorkdays"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择对接工作日"
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
                  table-name="PMS_PROCUREMENT_INFORMATION_RELEASE_APPLICATION"
                  @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button :loading="loading" title="保存并启动流程" type="primary" @click="saveAndStartProcess">保存并启动流程
      </a-button>
      <a-button :loading="loading" title="保存并返回" type="primary" @click="saveForm">保存并返回</a-button>
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
import {
  emits,
  usePmsProcurementInformationReleaseApplicationForm
} from './ts/PmsProcurementInformationReleaseApplicationForm';
import PmsPlanSelect from './PmsPlanSelect.vue'; // 引入表单ts
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
  saveForm,
  saveAndStartProcess,
  closeModal
} = usePmsProcurementInformationReleaseApplicationForm({
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
  form.value.pmsProcurementRequirementsId = info.pmsProcurementRequirementsId;
  form.value.pmsTaskNo = info.pmsTaskNo;
  form.value.reqPlanName = info.reqPlanName;
  form.value.reqPlanNo = info.reqPlanNo;
  form.value.procureStage = info.procureStage;
  form.value.productServiceCategory = info.productServiceCategory;
  form.value.projectTopicNumber = info.projectTopicNumber;
  form.value.secretLevel = info.secretLevel;
  form.value.productType = info.productType;
  form.value.productReqClassify = info.productReqClassify;
  form.value.budgetAmount = info.budgetAmount;
  open.value = false;
};
</script>
