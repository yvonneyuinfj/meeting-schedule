<template>
  <AvicModal :visible="true" title="编辑" width="960px" height="520px" :centered="true" @cancel="closeModal"
             fullScreen="true">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal" class="form-excel-style">
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="单据号">
              <a-input v-model:value="form.billNo" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editUserName" label="填报人">
              <a-input v-model:value="form.editUserName" disabled placeholder="默认当前登录人"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptName" label="填报单位">
              <a-input v-model:value="form.editDeptName" disabled placeholder="默认登录人部门"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDate" label="填报日期">
              <a-input v-model:value="form.editDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                       placeholder="默认当前时间"
                       disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyYear" label="计划年度" has-feedback>
              <a-date-picker v-model:value="form.applyYear" format="YYYY" value-format="YYYY" picker="year"
                             placeholder="请输入计划年度"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :auto-focus="true"
                        :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                        :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" :maxLength="512" placeholder="请输入备注"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols3">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="edit" ref="uploadFile" :allow-download="true"
                            :allow-preview="true"
                            :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                            :form-secret-level="form.secretLevel" table-name="TPM_YEAR_MAINT_MODIFY_PLAN"
                            @afterUpload="afterUploadEvent"/>
            </a-form-item>
          </a-col>
        </a-row>
        <TpmYearMaintModifyPlanLEdit ref="tpmYearMaintModifyPlanLEdit" :mainId="formId || form.id"/>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button v-show="form.bpmState === null" title="保存并启动流程" type="primary" :loading="processLoading"
                @click="saveAndStartProcess">保存并启动流程
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmYearMaintModifyPlanForm, emits } from './ts/TpmYearMaintModifyPlanForm'; // 引入表单ts
import TpmYearMaintModifyPlanLEdit from '@/views/avic/mms/tpm/tpmyearmaintmodifyplanl/TpmYearMaintModifyPlanLEdit.vue'; // 引入子表组件

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
  processLoading,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  saveAndStartProcess,
  closeModal,
  tpmYearMaintModifyPlanLEdit
} = useTpmYearMaintModifyPlanForm({
  props: props,
  emit: emit
});
</script>
