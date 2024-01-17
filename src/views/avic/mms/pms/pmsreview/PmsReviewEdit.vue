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
            <a-form-item name="pmsFindSourceId" label="采购寻源">
              <a-input
                v-model:value="form.pmsFindSourceId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入采购寻源"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reviewContent" label="采购评审情况记录">
              <a-input
                v-model:value="form.reviewContent"
                :maxLength="4000"
                placeholder="请输入采购评审情况记录"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <PmsReviewExpertEdit ref="pmsReviewExpertEdit" :mainId="formId || form.id" />
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
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
  rules,
  layout,
  colLayout,
  loading,
  saveForm,
  closeModal,
  pmsReviewExpertEdit
} = usePmsReviewForm({
  props: props,
  emit: emit
});
</script>
