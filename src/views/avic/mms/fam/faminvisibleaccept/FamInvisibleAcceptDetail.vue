<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal" class="form-excel-style">
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="单据号" :rules="fieldRequired('billNo')" has-feedback>
            <AvicAutoCode v-model:value="form.billNo" ref="autoCode" code-type="FAM_ADD_APPLY_NO"
              code-param="FAM_INVISIBLE_ACCEPT" :allow-clear="true" :disabled="fieldDisabled('billNo')"
              placeholder="请输入单据号" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('contractNo')">
          <a-form-item name="contractNo" label="合同编号" :rules="fieldRequired('contractNo')" has-feedback>
            <a-input v-model:value="form.contractNo" :auto-focus="true" :disabled="fieldDisabled('contractNo')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('persionLiable')">
          <a-form-item name="persionLiable" label="责任人" :rules="fieldRequired('persionLiable')" has-feedback>
            <AvicCommonSelect v-model:value="form.persionLiable" type="userSelect"
              :defaultShowValue="form.persionLiableAlias" :disabled="fieldDisabled('persionLiable')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门" :rules="fieldRequired('managerDeptId')" has-feedback>
            <AvicCommonSelect v-model:value="form.managerDeptId" type="deptSelect"
              :defaultShowValue="form.managerDeptIdAlias" :disabled="fieldDisabled('managerDeptId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptName')" hidden>
          <a-form-item name="managerDeptName" label="主管部门名称" :rules="fieldRequired('managerDeptName')" has-feedback>
            <a-input v-model:value="form.managerDeptName" :disabled="fieldDisabled('managerDeptName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('useDeptId')">
          <a-form-item name="useDeptId" label="使用部门" :rules="fieldRequired('useDeptId')" has-feedback>
            <AvicCommonSelect v-model:value="form.useDeptId" type="deptSelect" :defaultShowValue="form.useDeptIdAlias"
              :disabled="fieldDisabled('useDeptId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('useDeptName')" hidden>
          <a-form-item name="useDeptName" label="使用部门名称" :rules="fieldRequired('useDeptName')" has-feedback>
            <a-input v-model:value="form.useDeptName" :disabled="fieldDisabled('useDeptName')" />
          </a-form-item>
        </a-col>
        <!-- <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="数据密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')">
              <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader element-id="1" ref="uploadFile" label="上传附件" :form-id="form.id"
              :bpm-instance-object="props.bpmInstanceObject" :form-secret-level="form.secretLevel" :allow-download="true"
              table-name="FAM_INVISIBLE_ACCEPT" @afterUpload="afterUploadEvent" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <FamInvisibleAcceptLEdit v-if="fieldVisible('FAM_INVISIBLE_ACCEPT_L')" ref="famInvisibleAcceptLEdit"
      :mainId="formId || form.id" :bpmInstanceObject="bpmInstanceObject" :bpmParams="bpmParams" />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button class="eform_subtable_bpm_button_auth table-handle-button" for="addSubTableButton" label="添加" title="添加"
      style="display: none">
      添加
    </a-button>
    <a-button class="eform_subtable_bpm_button_auth table-handle-button" for="deleteSubTableButton" label="删除" title="删除"
      style="display: none">
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { useFamInvisibleAcceptForm, emits } from './ts/FamInvisibleAcceptForm'; // 引入表单ts
import FamInvisibleAcceptLEdit from '@/views/avic/mms/fam/faminvisibleacceptl/FamInvisibleAcceptLEdit.vue'; // 引入子表组件

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
  uploadFile,
  afterUploadEvent,
  attachmentRequired,
  autoCode,
  famInvisibleAcceptLEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamInvisibleAcceptForm({
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


