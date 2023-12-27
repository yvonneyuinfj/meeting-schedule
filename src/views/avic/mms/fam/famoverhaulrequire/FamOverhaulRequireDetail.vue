<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      layout="horizontal"
      class="form-excel-style"
    >
      <a-row>
        <!--   <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
             <a-form-item name="secretLevel" label="数据密级" :rules="fieldRequired('secretLevel')" has-feedback>
               <a-select
                 v-model:value="form.secretLevel"
                 :auto-focus="true"
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
           <a-col v-bind="colLayout.cols" v-if="fieldVisible('note')">
             <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
               <a-input
                 v-model:value="form.note"
                 :disabled="fieldDisabled('note')"
               />
             </a-form-item>
           </a-col> -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="单据号" :rules="fieldRequired('billNo')" has-feedback>
            <a-input
              v-model:value="form.billNo"
              :disabled="fieldDisabled('billNo')"
            />
          </a-form-item>
        </a-col>

        <a-col v-bind="colLayout.cols" v-if="fieldVisible('expectedMaintenance')">
          <a-form-item name="expectedMaintenance" label="预计维修/改造金额"
                       :rules="fieldRequired('expectedMaintenance')" has-feedback>
            <a-input
              v-model:value="form.expectedMaintenance"
              :disabled="fieldDisabled('expectedMaintenance')"
            />
          </a-form-item>
        </a-col>

        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintPlan') && annual === '1' ">
          <a-form-item name="maintPlan" label="维修计划" :rules="fieldRequired('maintPlan')" has-feedback>
            <a-input
              v-model:value="form.maintPlan"
              :disabled="fieldDisabled('maintPlan')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('maintCategory')">
          <a-form-item name="maintCategory" label="维修类别" :rules="fieldRequired('maintCategory')" has-feedback>
            <a-select
              v-model:value="form.maintCategory"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('maintCategory')"
            >
              <a-select-option
                v-for="item in maintCategoryList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('expectMaintTime')">
          <a-form-item name="expectMaintTime" label="需求时间" :rules="fieldRequired('expectMaintTime')" has-feedback>
            <a-date-picker
              v-model:value="form.expectMaintTime"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('expectMaintTime')"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门id" :rules="fieldRequired('managerDeptId')" has-feedback>
            <a-input
              v-model:value="form.managerDeptId"
              :disabled="fieldDisabled('managerDeptId')"
            />
          </a-form-item>
        </a-col> -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门名称" :rules="fieldRequired('managerDeptId')"
                       has-feedback>
            <AvicCommonSelect
              v-model:value="form.managerDeptId"
              type="deptSelect"
              :defaultShowValue="form.managerDeptIdAlias"
              :disabled="fieldDisabled('managerDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('isUsedScientificrs')">
          <a-form-item name="isUsedScientificrs" label="是否使用型号经费" :rules="fieldRequired('isUsedScientificrs')"
                       has-feedback>
            <a-select
              v-model:value="form.isUsedScientificrs"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('isUsedScientificrs')"
            >
              <a-select-option
                v-for="item in isUsedScientificrsList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetProject')">
          <a-form-item name="budgetProject" label="预算项目" :rules="fieldRequired('budgetProject')" has-feedback>
            <a-input
              v-model:value="form.budgetProject"
              :disabled="fieldDisabled('budgetProject')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetSubitem')">
          <a-form-item name="budgetSubitem" label="预算分项" :rules="fieldRequired('budgetSubitem')" has-feedback>
            <a-input
              v-model:value="form.budgetSubitem"
              :disabled="fieldDisabled('budgetSubitem')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetOrg')">
          <a-form-item name="budgetOrg" label="预算组织" :rules="fieldRequired('budgetOrg')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.budgetOrg"
              type="deptSelect"
              :defaultShowValue="form.budgetOrgAlias"
              :disabled="fieldDisabled('managerDeptId')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('annualProvisional')">
          <a-form-item name="annualProvisional" label="年度/临时" :rules="fieldRequired('annualProvisional')"
                       has-feedback>
            <a-radio-group v-model:value="form.annualProvisional" :disabled="fieldDisabled('annualProvisional')">
              <a-radio
                v-for="item in annualProvisionalList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectNumber')">
          <a-form-item name="projectNumber" label="课题号" :rules="fieldRequired('projectNumber')" has-feedback>
            <a-input
              v-model:value="form.projectNumber"
              :disabled="fieldDisabled('projectNumber')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectAmount')">
          <a-form-item name="projectAmount" label="项目金额（万元）" :rules="fieldRequired('projectAmount')" has-feedback>
            <a-input-number
              v-model:value="form.projectAmount"
              :min="0"
              :max="9999999999.99"
              :precision="2"
              :step="0.01"
              :disabled="fieldDisabled('projectAmount')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('isNeedReview')">
          <a-form-item name="isNeedReview" label="是否需要评审" :rules="fieldRequired('isNeedReview')" has-feedback>
            <a-select
              v-model:value="form.isNeedReview"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('isNeedReview')"
            >
              <a-select-option
                v-for="item in isNeedReviewList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="故障时间" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
              v-model:value="form.applyDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('isImproveName')">
          <a-form-item name="isImproveName" label="是否提高固定资产性能" :rules="fieldRequired('isImproveName')"
                       has-feedback>
            <a-input
              v-model:value="form.isImproveName"
              :disabled="fieldDisabled('isImproveName')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('applyReason')">
          <a-form-item name="applyReason" label="申请理由" :rules="fieldRequired('applyReason')" has-feedback>
            <div class="Richtext">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
              />
              <Editor
                style="height: 250px; overflow-y: auto"
                v-model:value="form.applyReason"
                :defaultConfig="editorConfig"
                @onCreated="onCreated"
              />
            </div>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('reqSuggest')">
          <a-form-item name="reqSuggest" label="要求及建议" :rules="fieldRequired('reqSuggest')" has-feedback>
            <a-textarea v-model:value="form.reqSuggest"
                        :disabled="fieldDisabled('reqSuggest')"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDeptId')">
          <a-form-item name="applyDeptId" label="申请部门id" :rules="fieldRequired('applyDeptId')" has-feedback>
            <a-input
              v-model:value="form.applyDeptId"
              :disabled="fieldDisabled('applyDeptId')"
            />
          </a-form-item>
        </a-col> -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDeptId')">
          <a-form-item name="applyDeptId" label="申请部门名称" :rules="fieldRequired('applyDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.applyDeptId"
              type="deptSelect"
              :defaultShowValue="form.applyDeptIdAlias"
              :disabled="fieldDisabled('applyDeptId')"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId')">
          <a-form-item name="handlePersonId" label="需求申请人id" :rules="fieldRequired('handlePersonId')" has-feedback>
            <a-input
              v-model:value="form.handlePersonId"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col> -->
        <!--        && annual !== '2'-->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId') ">
          <a-form-item name="handlePersonId" label="需求申请人名称" :rules="fieldRequired('handlePersonId')"
                       has-feedback>
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>

        <a-col v-bind="colLayout.cols" v-if="fieldVisible('telephone')">
          <a-form-item name="telephone" label="联系电话" :rules="fieldRequired('telephone')" has-feedback>
            <a-input
              v-model:value="form.telephone"
              :disabled="fieldDisabled('telephone')"
            />
          </a-form-item>
        </a-col>

        <a-col v-bind="colLayout.cols" v-if="fieldVisible('accpetApplyNo')">
          <a-form-item name="accpetApplyNo" label="验收单号" :rules="fieldRequired('accpetApplyNo')" has-feedback>
            <a-input
              v-model:value="form.accpetApplyNo"
              :disabled="fieldDisabled('accpetApplyNo')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader
              element-id="1"
              ref="uploadFile"
              label="上传附件"
              :form-id="form.id"
              :bpm-instance-object="props.bpmInstanceObject"
              :form-secret-level="form.secretLevel"
              :allow-download="true"
              table-name="FAM_OVERHAUL_REQUIRE"
              @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <FamOverhaulRequireListEdit
      v-if="fieldVisible('FAM_OVERHAUL_REQUIRE_LIST')"
      ref="famOverhaulRequireListEdit"
      read-only="true"
      :mainId="formId || form.id"
      :bpmInstanceObject="bpmInstanceObject"
      :bpmParams="bpmParams"
    />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="addSubTableButton"
      label="添加"
      title="添加"
      style="display: none"
    >
      添加
    </a-button>
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="deleteSubTableButton"
      label="删除"
      title="删除"
      style="display: none"
    >
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { useFamOverhaulRequireForm, emits } from './ts/FamOverhaulRequireForm'; // 引入表单ts
import FamOverhaulRequireListEdit from '@/views/avic/mms/fam/famoverhaulrequirelist/FamOverhaulRequireListEdit.vue'; // 引入子表组件
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'; // 引入富文本依赖
import '@wangeditor/editor/dist/css/style.css'; // 引入富文本样式

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
  maintCategoryList,
  isUsedScientificrsList,
  annualProvisionalList,
  isNeedReviewList,
  uploadFile,
  afterUploadEvent,
  autoCode,
  attachmentRequired,
  toolbarConfig,
  editorConfig,
  editorRef,
  onCreated,
  famOverhaulRequireListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamOverhaulRequireForm({
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
