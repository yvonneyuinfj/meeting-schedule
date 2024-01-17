<template>
  <AvicModal :visible="true" title="添加" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据号" has-feedback>
                <avic-auto-code v-model:value="form.billNo" ref="autoCode" code-type="FAM_INVISIBLE_HANDLE_APPLY_NO"
                code-param="FAM_INVISIBLE_HANDLE" :allow-clear="true" :disabled="false" placeholder="请输入单据号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="handelReason" label="处置理由">
              <a-textarea v-model:value="form.handelReason" :rows="2" :maxLength="4000" placeholder="请输入处置理由" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门">
              <AvicCommonSelect v-model:value="form.managerDeptId" type="deptSelect" placeholder="请选择主管部门" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="managerDeptName" label="主管部门名称">
              <a-input v-model:value="form.managerDeptName" :maxLength="64" :auto-focus="true" placeholder="请输入主管部门名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门">
              <AvicCommonSelect v-model:value="form.useDeptId" type="deptSelect" placeholder="请选择使用部门"
                                disabled
                :defaultShowValue='proxy.$getLoginUser().deptName' />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="useDeptName" label="使用部门名称">
              <a-input v-model:value="form.useDeptName" :maxLength="64" placeholder="请输入使用部门名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersionId" label="经办人">
              <AvicCommonSelect v-model:value="form.handlePersionId" type="deptSelect" placeholder="请选择经办人"
                                disabled
                :defaultShowValue='proxy.$getLoginUser().name' />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="handlePersionName" label="经办人名称">
              <a-input v-model:value="form.handlePersionName" :maxLength="64" placeholder="请输入经办人名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="secretLevel" label="数据密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择数据密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="add" ref="uploadFile" :allow-download="true" :allow-preview="true"
                :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                :form-secret-level="form.secretLevel" table-name="FAM_INVISIBLE_HANDLE" @afterUpload="afterUploadEvent" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <FamInvisibleHandleLEdit ref="famInvisibleHandleLEdit" />
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamInvisibleHandleForm, emits } from './ts/FamInvisibleHandleForm'; // 引入表单ts
import FamInvisibleHandleLEdit from '@/views/avic/mms/fam/faminvisiblehandlel/FamInvisibleHandleLEdit.vue'; // 引入子表组件

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
const { proxy } = getCurrentInstance();
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  autoCode,
  saveForm,
  closeModal,
  saveAndStartProcess,
  famInvisibleHandleLEdit
} = useFamInvisibleHandleForm({
  props: props,
  emit: emit
});
onMounted(() => {
  form.value.handlePersionId = proxy.$getLoginUser().id;
  form.value.handlePersionName = proxy.$getLoginUser().name;
  form.value.useDeptId = proxy.$getLoginUser().entityDeptId;
  form.value.useDeptName = proxy.$getLoginUser().entityDeptName;
});
</script>
