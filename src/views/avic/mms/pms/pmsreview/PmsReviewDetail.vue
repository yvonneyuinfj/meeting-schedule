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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('reqPlanName')">
          <a-form-item name="pmsFindSourceId" label="采购计划名称" :rules="fieldRequired('reqPlanName')" has-feedback>
            <a-input
                v-model:value="form.reqPlanName"
                :auto-focus="true"
                disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('reqPlanNo')">
          <a-form-item name="pmsFindSourceId" label="采购计划编号" :rules="fieldRequired('reqPlanNo')" has-feedback>
            <a-input
                v-model:value="form.reqPlanNo"
                :auto-focus="true"
                disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('pmsTaskNo')">
          <a-form-item name="pmsFindSourceId" label="采购任务编号" :rules="fieldRequired('pmsTaskNo')" has-feedback>
            <a-input
                v-model:value="form.pmsTaskNo"
                :auto-focus="true"
                disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('procurementMethodName')">
          <a-form-item name="pmsFindSourceId" label="采购方式" :rules="fieldRequired('procurementMethodName')"
                       has-feedback>
            <a-input
                v-model:value="form.procurementMethodName"
                :auto-focus="true"
                disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('pmsPriceName')">
          <a-form-item name="pmsFindSourceId" label="采购价格" :rules="fieldRequired('pmsPriceName')" has-feedback>
            <a-input
                v-model:value="form.pmsPriceName"
                :auto-focus="true"
                disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('reviewContent')">
          <a-form-item name="reviewContent" label="采购评审情况记录" :rules="fieldRequired('reviewContent')"
                       has-feedback>
            <a-input
                v-model:value="form.reviewContent"
                :disabled="fieldDisabled('reviewContent')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row>
      <a-col :span="12">
        <PmsReviewVendorEdit
            v-if="fieldVisible('PMS_REVIEW_VENDOR')"
            ref="pmsReviewVendorEdit"
            :mainId="form.pmsFindSourceId"
            :bpmInstanceObject="bpmInstanceObject"
            :bpmParams="bpmParams"
            :read-only="true"
        />
      </a-col>
      <a-col :span="12">
        <!--子表组件-->
        <PmsReviewExpertEdit
            v-if="fieldVisible('PMS_REVIEW_EXPERT')"
            ref="pmsReviewExpertEdit"
            :mainId="formId || form.id"
            :bpmInstanceObject="bpmInstanceObject"
            :bpmParams="bpmParams"
            :read-only="true"
        />
      </a-col>
    </a-row>

    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
        class="eform_subtable_bpm_button_auth table-handle-button"
        for="addSubTableButton"
        label="分配专家"
        title="分配专家"
        style="display: none"
    >
      分配专家
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
import {usePmsReviewForm, emits} from './ts/PmsReviewForm'; // 引入表单ts
import PmsReviewExpertEdit from '@/views/avic/mms/pms/pmsreviewexpert/PmsReviewExpertEdit.vue';
import PmsReviewVendorEdit from "@/views/avic/mms/pms/pmsfindsourcevendor/PmsReviewVendorEdit.vue"; // 引入子表组件

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
  pmsReviewExpertEdit,
  pmsReviewVendorEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = usePmsReviewForm({
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


