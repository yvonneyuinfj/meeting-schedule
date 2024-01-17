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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('pmsFindSourceId')">
          <a-form-item name="pmsFindSourceId" label="采购寻源" :rules="fieldRequired('pmsFindSourceId')" has-feedback>
            <a-input
              v-model:value="form.pmsFindSourceId"
              :auto-focus="true"
              :disabled="fieldDisabled('pmsFindSourceId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('reviewContent')">
          <a-form-item name="reviewContent" label="采购评审情况记录" :rules="fieldRequired('reviewContent')" has-feedback>
            <a-input
              v-model:value="form.reviewContent"
              :disabled="fieldDisabled('reviewContent')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <PmsReviewExpertEdit
      v-if="fieldVisible('PMS_REVIEW_EXPERT')"
      ref="pmsReviewExpertEdit"
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
import { usePmsReviewForm, emits } from './ts/PmsReviewForm'; // 引入表单ts
import PmsReviewExpertEdit from '@/views/avic/mms/pms/pmsreviewexpert/PmsReviewExpertEdit.vue'; // 引入子表组件

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


