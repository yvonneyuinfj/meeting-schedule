<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
        class="form-excel-style"
      >
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyNo" label="申请单编号" has-feedback>
              <a-input v-model:value="form.applyNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="title" label="标题">
              <a-input
                v-model:value="form.title"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入标题"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门">
              <AvicCommonSelect
                v-model:value="form.managerDeptId"
                type="deptSelect"
                placeholder="请选择主管部门"
                :defaultShowValue="form.managerDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inTransferDeptId" label="调入部门">
              <AvicCommonSelect
                v-model:value="form.inTransferDeptId"
                type="deptSelect"
                placeholder="请选择调入部门"
                :defaultShowValue="form.inTransferDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="borrowReason" label="调入原因">
              <a-input
                v-model:value="form.borrowReason"
                :maxLength="256"
                placeholder="请输入调入原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outTransferDeptId" label="调出部门">
              <AvicCommonSelect
                v-model:value="form.outTransferDeptId"
                type="deptSelect"
                placeholder="请选择调出部门"
                :defaultShowValue="form.outTransferDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人">
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                placeholder="请选择经办人"
                :defaultShowValue="form.handlePersonIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请时间">
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择申请时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols4">
            <a-form-item
              label="附件"
            >
              <AvicUploader
                element-id="1"
                form-type="edit"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                table-name="FAM_ASSET_TRANSFER"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <FamAssetTransferListEdit ref="famAssetTransferListEdit" :mainId="formId || form.id" />
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
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
  rules,
  layout,
  colLayout,
  loading,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal,
  famAssetTransferListEdit
} = useFamAssetTransferForm({
  props: props,
  emit: emit
});
</script>
