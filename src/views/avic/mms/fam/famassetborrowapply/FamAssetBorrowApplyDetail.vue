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
                code-type="FAM_APPLY_NO"
                code-param="FAM_ASSET_BORROW_APPLY"
                :allow-clear="true"
                :disabled="fieldDisabled('applyNo')"
                placeholder="请输入申请单编号"
              />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('borrowReson')">
          <a-form-item name="borrowReson" label="借用理由" :rules="fieldRequired('borrowReson')" has-feedback>
            <a-input
              v-model:value="form.borrowReson"
              :auto-focus="true"
              :disabled="fieldDisabled('borrowReson')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('borrowDeptId')">
          <a-form-item name="borrowDeptId" label="借用部门" :rules="fieldRequired('borrowDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.borrowDeptId"
              type="deptSelect"
              :defaultShowValue="form.borrowDeptIdAlias"
              :disabled="fieldDisabled('borrowDeptId')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('otherMatter')">
          <a-form-item name="otherMatter" label="其他事项" :rules="fieldRequired('otherMatter')" has-feedback>
            <a-input
              v-model:value="form.otherMatter"
              :disabled="fieldDisabled('otherMatter')"
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
            table-name="FAM_ASSET_BORROW_APPLY"
            @afterUpload="afterUploadEvent"
          />
        </a-form-item>
      </a-col>
      </a-row>
    </a-form>
    <FamAssetBorrowApplyListEdit
      v-if="fieldVisible('FAM_ASSET_BORROW_APPLY_LIST')"
      ref="famAssetBorrowApplyListEdit"
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
import { useFamAssetBorrowApplyForm, emits } from './ts/FamAssetBorrowApplyForm'; // 引入表单ts
import FamAssetBorrowApplyListEdit from '@/views/avic/mms/fam/famassetborrowapplylist/FamAssetBorrowApplyListEdit.vue'; // 引入子表组件

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
  famAssetBorrowApplyListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamAssetBorrowApplyForm({
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


