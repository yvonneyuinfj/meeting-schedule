<template>
  <AvicModal
      :centered="true"
      :visible="true"
      height="520px"
      title="查看"
      width="960px"
      @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="科研任务名称" name="reqPlanName">
              <a-input
                  v-model:value="form.reqPlanName"
                  :auto-focus="true"
                  :maxLength="64"
                  placeholder="请输入科研任务名称"
                  :disabled="true"
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
                  :disabled="true"
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
                    :disabled="true"
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
                  :disabled="true"
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
                  :disabled="true"
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
                  :disabled="true"
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
                  :disabled="true"
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
                  :disabled="true"
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
                    :disabled="true"
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
                  :disabled="true"
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
                  :disabled="true"
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
                  :disabled="true"
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
                  :disabled="true"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                label="附件"
                type="attachment"
            >
              <AvicUploader
                  :allow-add="false"
                  :allow-delete="false"
                  :allow-download="true"
                  :allow-preview="true"
                  :form-id="form.id"
                  element-id="1"
                  label="上传附件"
                  table-name="PMS_PROCUREMENT_REQUIREMENTS"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <PmsProcurementRequirementsLDetail ref="pmsProcurementRequirementsLDetail"
                                       :mainId="formId"></PmsProcurementRequirementsLDetail>
    </a-spin>
    <template #footer>
      <a-button ghost title="返回" type="primary" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import PmsProcurementRequirementsLDetail from './PmsProcurementRequirementsLDetail.vue';
import type {
  PmsProcurementRequirementsDto
} from '@/api/avic/mms/pms/PmsProcurementRequirementsApi';
import {
  getPmsProcurementRequirements
} from '@/api/avic/mms/pms/PmsProcurementRequirementsApi';
import { closeFlowLoading } from '@/views/avic/bpm/bpmutils/FlowUtils'; // 引入子表组件
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
const { proxy } = getCurrentInstance();
const loading = ref(false);
const form = ref<PmsProcurementRequirementsDto>({});
const formRef = ref(null);
const layout = {
  labelCol: { flex: '140px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout2; // 调用布局公共方法
const secretLevelList = ref([]); // 密级通用代码
const procurementMethodList = ref([]); // 采购方式通用代码
const supplierSelectionCriteriaList = ref([]); // 供应商中选标准通用代码
const procureStageList = ref([]); // 采购阶段通用代码
const processingTypeList = ref([]); // 是否为加工类通用代码
const publishInformationSecurityLevelList = ref([]); // 本次发布信息密级通用代码
const procurementTaskClassificationList = ref([]); // 本项采购任务密级通用代码
const lookupParams = [
  { fieldName: 'procurementMethod', lookUpType: 'PMS_PROCUREMENT_METHOD' },
  { fieldName: 'supplierSelectionCriteria', lookUpType: 'PMS_SUPPLIER_SELECTION_CRITERIA' },
  { fieldName: 'procureStage', lookUpType: 'PMS_PROCURE_STAGE' },
  { fieldName: 'processingType', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'publishInformationSecurityLevel', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' },
  { fieldName: 'procurementTaskClassification', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' }
];
const emit = defineEmits(['close', 'reloadData']);

onMounted(() => {
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
  if (props.formId || form.value.id) {
    // 编辑详情页面加载数据
    getFormData(props.formId || form.value.id);
  }
});

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    procurementMethodList.value = result.procurementMethod;
    supplierSelectionCriteriaList.value = result.supplierSelectionCriteria;
    procureStageList.value = result.procureStage;
    processingTypeList.value = result.processingType;
    publishInformationSecurityLevelList.value = result.publishInformationSecurityLevel;
    procurementTaskClassificationList.value = result.procurementTaskClassification;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}

/**
 * 编辑、详情页面加载数据
 * @param {String} id 行数据的id
 */
function getFormData(id) {
  if (!id) {
    return;
  }
  loading.value = true;
  getPmsProcurementRequirements(id)
      .then(async res => {
        if (res.data) {
          form.value = res.data;
          // 处理数据
          loading.value = false;
        } else {
          initForm();
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取表单数据失败！');
        loading.value = false;
      });
}

/** 设置添加表单的初始值 */
function initForm() {
  // 初始化光标定位
  nextTick(() => {
    closeFlowLoading(props.bpmInstanceObject);
  });
}

/** 返回关闭事件 */
function closeModal() {
  emit('close');
}

</script>


