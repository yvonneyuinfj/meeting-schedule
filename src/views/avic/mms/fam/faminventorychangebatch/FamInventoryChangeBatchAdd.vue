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
            <a-form-item name="applyNo" label="申请单编号">
              <avic-auto-code
                v-model:value="form.applyNo"
                ref="autoCode"
                code-type="FAM_INVENTORY_NO"
                code-param="FAM_INVENTORY_CHANGE_BATCH"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入申请单编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyPersonId" label="申请人">
              <AvicCommonSelect
                v-model:value="form.applyPersonId"
                type="userSelect"
                placeholder="请选择申请人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptId" label="主管部门">
              <AvicCommonSelect
                v-model:value="form.applyDeptId"
                type="deptSelect"
                placeholder="请选择主管部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyPersonIp" label="申请人联系方式">
              <a-input
                v-model:value="form.applyPersonIp"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入申请人联系方式"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
            <a-col v-bind="colLayout.cols2">
              <a-form-item
                name="changeNote"
                label="变更理由"
              >
                <a-textarea
                  v-model:value="form.changeNote"
                  :rows="2"
                  :maxLength="4000"
                  placeholder="请输入变更理由"
                />
              </a-form-item>
            </a-col>
  <!--          <a-col v-bind="colLayout.cols">-->
  <!--            <a-form-item name="fenqi" label="分期金额">-->
  <!--              <a-input-->
  <!--                v-model:value="form.fenqi"-->
  <!--                :maxLength="64"-->
  <!--                placeholder="请输入分期金额"-->
  <!--              />-->
  <!--            </a-form-item>-->
  <!--          </a-col>-->
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
                table-name="FAM_INVENTORY_CHANGE_BATCH"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <FamInventoryChangeListBatchEdit ref="famInventoryChangeListBatchEdit" />
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamInventoryChangeBatchForm, emits } from './ts/FamInventoryChangeBatchForm'; // 引入表单ts
import FamInventoryChangeListBatchEdit from '@/views/avic/mms/fam/faminventorychangelistbatch/FamInventoryChangeListBatchEdit.vue'; // 引入子表组件

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
  autoCode,
  closeModal,
  saveAndStartProcess,
  famInventoryChangeListBatchEdit
} = useFamInventoryChangeBatchForm({
  props: props,
  emit: emit
});
</script>
