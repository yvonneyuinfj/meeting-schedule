<template>
  <AvicModal :visible="true" title="编辑" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal" class="form-excel-style">
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据号" has-feedback>
              <a-input v-model:value="form.billNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contractNo" label="合同编号" has-feedback>
              <a-input v-model:value="form.contractNo" :maxLength="64" :auto-focus="true" placeholder="请输入合同编号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="persionLiable" label="责任人" has-feedback>
              <AvicCommonSelect v-model:value="form.persionLiable" type="userSelect" placeholder="请选择责任人"
               disabled  :defaultShowValue="form.persionLiableAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门" has-feedback>
              <AvicCommonSelect v-model:value="form.managerDeptId" type="deptSelect" placeholder="请选择主管部门"
                :defaultShowValue="form.managerDeptIdAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="managerDeptName" label="主管部门名称">
              <a-input v-model:value="form.managerDeptName" :maxLength="64" placeholder="请输入主管部门名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门" has-feedback>
              <AvicCommonSelect v-model:value="form.useDeptId" type="deptSelect" placeholder="请选择使用部门"
                                disabled :defaultShowValue="form.useDeptIdAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="useDeptName" label="使用部门名称">
              <a-input v-model:value="form.useDeptName" :maxLength="64" placeholder="请输入使用部门名称" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="数据密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择数据密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="edit" ref="uploadFile" :allow-download="true" :allow-preview="true"
                :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                :form-secret-level="form.secretLevel" table-name="FAM_INVISIBLE_ACCEPT" @afterUpload="afterUploadEvent" />
            </a-form-item>
          </a-col>
        </a-row>
        <FamInvisibleAcceptLEdit ref="famInvisibleAcceptLEdit" :mainId="formId || form.id" />
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">推进流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
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
  rules,
  layout,
  colLayout,
  loading,
  saveAndStartProcess,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal,
  famInvisibleAcceptLEdit
} = useFamInvisibleAcceptForm({
  props: props,
  emit: emit
});
</script>
