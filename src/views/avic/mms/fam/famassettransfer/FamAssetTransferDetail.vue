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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyNo')">
          <a-form-item name="applyNo" label="申请单编号" :rules="fieldRequired('applyNo')" has-feedback>
              <AvicAutoCode
                v-model:value="form.applyNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_ASSET_TRANSFER"
                :allow-clear="true"
                :disabled="fieldDisabled('applyNo')"
                placeholder="请输入申请单编号"
              />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('title')">
          <a-form-item name="title" label="标题" :rules="fieldRequired('title')" has-feedback>
            <a-input
              v-model:value="form.title"
              :auto-focus="true"
              :disabled="fieldDisabled('title')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门" :rules="fieldRequired('managerDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.managerDeptId"
              type="deptSelect"
              :defaultShowValue="form.managerDeptIdAlias"
              :disabled="fieldDisabled('managerDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('inTransferDeptId')">
          <a-form-item name="inTransferDeptId" label="调入部门" :rules="fieldRequired('inTransferDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.inTransferDeptId"
              type="deptSelect"
              :defaultShowValue="form.inTransferDeptIdAlias"
              :disabled="fieldDisabled('inTransferDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('borrowReason')">
          <a-form-item name="borrowReason" label="调入原因" :rules="fieldRequired('borrowReason')" has-feedback>
            <a-input
              v-model:value="form.borrowReason"
              :disabled="fieldDisabled('borrowReason')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('outTransferDeptId')">
          <a-form-item name="outTransferDeptId" label="调出部门" :rules="fieldRequired('outTransferDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.outTransferDeptId"
              type="deptSelect"
              :defaultShowValue="form.outTransferDeptIdAlias"
              :disabled="fieldDisabled('outTransferDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId')">
          <a-form-item name="handlePersonId" label="经办人" :rules="fieldRequired('handlePersonId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="申请时间" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
              v-model:value="form.applyDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
      <a-col v-bind="colLayout.cols4">
        <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
          <AvicUploader
            element-id="1"
            ref="uploadFile"
            label="上传附件"
            :form-id="form.id"
            :bpm-instance-object="props.bpmInstanceObject"
            :form-secret-level="form.secretLevel"
            :allow-download="true"
            table-name="FAM_ASSET_TRANSFER"
            @afterUpload="afterUploadEvent"
          />
        </a-form-item>
      </a-col>
      </a-row>
    </a-form>
    <FamAssetTransferListEdit
      v-if="fieldVisible('FAM_ASSET_TRANSFER_LIST')"
      ref="famAssetTransferListEdit"
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
import { useFamAssetTransferForm, emits } from './ts/FamAssetTransferForm'; // 引入表单ts
import FamAssetTransferListEdit from '@/views/avic/mms/fam/famassettransferlist/FamAssetTransferListEdit.vue'; // 引入子表组件

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
  uploadFile,
  afterUploadEvent,
  attachmentRequired,
  autoCode,
  famAssetTransferListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamAssetTransferForm({
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


