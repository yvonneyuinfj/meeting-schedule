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
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="数据密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择数据密级"
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
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="512"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据号" has-feedback>
              <a-input
                v-model:value="form.billNo"
                :maxLength="32"
                placeholder="请输入单据号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintPlan" label="维修计划" has-feedback>
              <a-input
                v-model:value="form.maintPlan"
                :maxLength="32"
                placeholder="请输入维修计划"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="maintCategory" label="维修类别" has-feedback>
              <a-select
                v-model:value="form.maintCategory"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择维修类别"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="expectMaintTime" label="需求时间" has-feedback>
              <a-date-picker
                v-model:value="form.expectMaintTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择需求时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门id" has-feedback>
              <a-input
                v-model:value="form.managerDeptId"
                :maxLength="64"
                placeholder="请输入主管部门id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptName" label="主管部门名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.managerDeptName"
                type="deptSelect"
                placeholder="请选择主管部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isUsedScientificrs" label="是否使用型号经费" has-feedback>
              <a-select
                v-model:value="form.isUsedScientificrs"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否使用型号经费"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetProject" label="预算项目" has-feedback>
              <a-input
                v-model:value="form.budgetProject"
                :maxLength="32"
                placeholder="请输入预算项目"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetSubitem" label="预算分项" has-feedback>
              <a-input
                v-model:value="form.budgetSubitem"
                :maxLength="32"
                placeholder="请输入预算分项"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetOrg" label="预算组织" has-feedback>
              <a-input
                v-model:value="form.budgetOrg"
                :maxLength="32"
                placeholder="请输入预算组织"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="annualProvisional" label="年度/临时">
              <a-radio-group v-model:value="form.annualProvisional">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectNumber" label="课题号" has-feedback>
              <a-input
                v-model:value="form.projectNumber"
                :maxLength="64"
                placeholder="请输入课题号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectAmount" label="项目金额（万元）" has-feedback>
              <a-input-number
                v-model:value="form.projectAmount"
                :min="0"
                :max="9999999999.99"
                :precision="2"
                :step="0.01"
                placeholder="请输入项目金额（万元）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isNeedReview" label="是否需要评审" has-feedback>
              <a-select
                v-model:value="form.isNeedReview"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否需要评审"
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
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
              name="applyReason"
              label="申请理由"
            >
              <div class="Richtext">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                />
                <Editor
                  style="height: 500px; overflow-y: auto"
                  v-model:value="form.applyReason"
                  :defaultConfig="editorConfig"
                  @onCreated="onCreated"
                />
              </div>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqSuggest" label="要求及建议" has-feedback>
              <a-input
                v-model:value="form.reqSuggest"
                :maxLength="128"
                placeholder="请输入要求及建议"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptId" label="申请部门id" has-feedback>
              <a-input
                v-model:value="form.applyDeptId"
                :maxLength="64"
                placeholder="请输入申请部门id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptName" label="申请部门名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.applyDeptName"
                type="deptSelect"
                placeholder="请选择申请部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="需求申请人id" has-feedback>
              <a-input
                v-model:value="form.handlePersonId"
                :maxLength="64"
                placeholder="请输入需求申请人id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonName" label="需求申请人名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.handlePersonName"
                type="userSelect"
                placeholder="请选择需求申请人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="故障时间" has-feedback>
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择故障时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="telephone" label="联系电话" has-feedback>
              <a-input
                v-model:value="form.telephone"
                :maxLength="64"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="annex" label="附件" has-feedback>
              <a-input
                v-model:value="form.annex"
                :maxLength="65535"
                placeholder="请输入附件"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
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
                table-name="FAM_OVERHAUL_REQUIRE"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <FamOverhaulRequireListEdit ref="famOverhaulRequireListEdit" />
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
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
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  maintCategoryList,
  isUsedScientificrsList,
  annualProvisionalList,
  isNeedReviewList,
  toolbarConfig,
  editorConfig,
  editorRef,
  onCreated,
  uploadFile,
  afterUploadEvent,
  closeModal,
  saveAndStartProcess,
  famOverhaulRequireListEdit
} = useFamOverhaulRequireForm({
  props: props,
  emit: emit
});
</script>
