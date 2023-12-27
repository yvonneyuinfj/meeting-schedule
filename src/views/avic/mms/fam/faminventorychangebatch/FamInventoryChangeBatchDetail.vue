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
              code-type="FAM_INVENTORY_NO"
              code-param="FAM_INVENTORY_CHANGE_BATCH"
              :allow-clear="true"
              :disabled="fieldDisabled('applyNo')"
              placeholder="请输入申请单编号"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyPersonId')">
          <a-form-item name="applyPersonId" label="申请人" :rules="fieldRequired('applyPersonId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.applyPersonId"
              :auto-focus="true"
              type="userSelect"
              :defaultShowValue="form.applyPersonIdAlias"
              :disabled="fieldDisabled('applyPersonId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDeptId')">
          <a-form-item name="applyDeptId" label="主管部门" :rules="fieldRequired('applyDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.applyDeptId"
              type="deptSelect"
              :defaultShowValue="form.applyDeptIdAlias"
              :disabled="fieldDisabled('applyDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyPersonIp')">
          <a-form-item name="applyPersonIp" label="申请人联系方式" :rules="fieldRequired('applyPersonIp')" has-feedback>
            <a-input
              v-model:value="form.applyPersonIp"
              :disabled="fieldDisabled('applyPersonIp')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('changeNote')">
          <a-form-item name="changeNote" label="变更理由" :rules="fieldRequired('changeNote')" has-feedback>
            <a-textarea v-model:value="form.changeNote" :rows="2" :disabled="fieldDisabled('changeNote')"/>
          </a-form-item>
        </a-col>
        <!--        <a-col v-bind="colLayout.cols" v-if="fieldVisible('fenqi')">
                  <a-form-item name="fenqi" label="分期金额" :rules="fieldRequired('fenqi')" has-feedback>
                    <a-input
                      v-model:value="form.fenqi"
                      :disabled="fieldDisabled('fenqi')"
                    />
                  </a-form-item>
                </a-col> -->
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
              table-name="FAM_INVENTORY_CHANGE_BATCH"
              @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <FamInventoryChangeListBatchEdit
      v-if="fieldVisible('FAM_INVENTORY_CHANGE_LIST_BATCH')"
      ref="famInventoryChangeListBatchEdit"
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
import { useFamInventoryChangeBatchForm, emits } from './ts/FamInventoryChangeBatchForm'; // 引入表单ts
import FamInventoryChangeListBatchEdit
  from '@/views/avic/mms/fam/faminventorychangelistbatch/FamInventoryChangeListBatchEdit.vue'; // 引入子表组件

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
  famInventoryChangeListBatchEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamInventoryChangeBatchForm({
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
