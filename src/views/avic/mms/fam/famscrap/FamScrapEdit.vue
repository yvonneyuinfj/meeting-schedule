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
<!--          <a-col v-bind="colLayout.cols">-->
<!--            <a-form-item name="isUsedScientificrs" label="是否科研用" has-feedback>-->
<!--              <a-input-->
<!--                v-model:value="form.isUsedScientificrs"-->
<!--                :maxLength="10"-->
<!--                :auto-focus="true"-->
<!--                placeholder="请输入是否科研用"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
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
            <a-form-item name="handleDeptId" label="处置部门">
              <a-select
                v-model:value="form.handleDeptId"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择处置部门"
              >
                <a-select-option
                  v-for="item in handleDeptIdList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handleWay" label="处置方式">
              <a-select
                v-model:value="form.handleWay"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择处置方式"
              >
                <a-select-option
                  v-for="item in handleWayList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item
              name="handleReason"
              label="处置理由"
            >
              <a-textarea
                v-model:value="form.handleReason"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入处置理由"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetAlternateSolution" label="资产更新替换方案">
              <a-input
                v-model:value="form.assetAlternateSolution"
                :maxLength="64"
                placeholder="请输入资产更新替换方案"
              />
            </a-form-item>
          </a-col>
<!--          <a-col v-bind="colLayout.cols">-->
<!--            <a-form-item name="otherMatter" label="其他事项">-->
<!--              <a-input-->
<!--                v-model:value="form.otherMatter"-->
<!--                :maxLength="64"-->
<!--                placeholder="请输入其他事项"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptId" label="申请部门" has-feedback>
              <AvicCommonSelect
                v-model:value="form.applyDeptId"
                type="deptSelect"
                placeholder="请选择申请部门"
                :defaultShowValue="form.applyDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人" has-feedback>
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                disabled
                placeholder="请选择经办人"
                :defaultShowValue="form.handlePersonIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请时间" has-feedback>
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择申请时间"
              />
            </a-form-item>
          </a-col>
        </a-row>
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
            table-name="FAM_SCRAP"
            @afterUpload="afterUploadEvent"
          />
        </a-form-item>
        <FamScrapListEdit ref="famScrapListEdit" :mainId="formId || form.id" />
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamScrapForm, emits } from './ts/FamScrapForm'; // 引入表单ts
import FamScrapListEdit from '@/views/avic/mms/fam/famscraplist/FamScrapListEdit.vue'; // 引入子表组件

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
  handleWayList,
  loading,
  handleDeptIdList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal,
  famScrapListEdit
} = useFamScrapForm({
  props: props,
  emit: emit
});
</script>
