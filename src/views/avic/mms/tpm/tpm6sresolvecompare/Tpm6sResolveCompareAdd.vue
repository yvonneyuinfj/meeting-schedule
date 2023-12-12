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
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        class="form-excel-style"
      >
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpm6sApplyId" label="TPM_6S_APPLY_ID">
              <a-input
                v-model:value="form.tpm6sApplyId"
                :maxLength="50"
                :auto-focus="true"
                placeholder="请输入TPM_6S_APPLY_ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptId" label="立项单位ID(冗余)">
              <a-input
                v-model:value="form.editDeptId"
                :maxLength="50"
                placeholder="请输入立项单位ID(冗余)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptName" label="立项单位名称(冗余)">
              <a-input
                v-model:value="form.editDeptName"
                :maxLength="600"
                placeholder="请输入立项单位名称(冗余)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approvedDate" label="立项时间">
              <a-date-picker
                v-model:value="form.approvedDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择立项时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="finishDate" label="完成时间">
              <a-date-picker
                v-model:value="form.finishDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择完成时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="problemSolvingInstruction" label="六源问题解决情况">
              <a-input
                v-model:value="form.problemSolvingInstruction"
                :maxLength="10"
                placeholder="请输入六源问题解决情况"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="problemSolvingEvaluation" label="六源问题问题解决评价">
              <a-input
                v-model:value="form.problemSolvingEvaluation"
                :maxLength="2"
                placeholder="请输入六源问题问题解决评价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billStatus" label="流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过">
              <a-radio-group v-model:value="form.billStatus">
                <a-radio
                  v-for="item in billStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
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
                table-name="TPM_6S_RESOLVE_COMPARE"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpm6sResolveCompareForm, emits } from './ts/Tpm6sResolveCompareForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
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
  billStatusList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveAndStartProcess,
  closeModal
} = useTpm6sResolveCompareForm({
  props: props,
  emit: emit
});
</script>
