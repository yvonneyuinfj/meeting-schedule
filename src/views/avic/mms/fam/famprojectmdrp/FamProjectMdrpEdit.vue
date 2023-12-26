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
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="512"
                :auto-focus="true"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称" has-feedback>
              <a-input
                v-model:value="form.projectName"
                :maxLength="32"
                placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urStartTime" label="在研开始时间" has-feedback>
              <a-date-picker
                v-model:value="form.urStartTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择在研开始时间"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, form.urEndTime)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urEndTime" label="在研结束时间" has-feedback>
              <a-date-picker
                v-model:value="form.urEndTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择在研结束时间"
                :disabled-date="
                  startValue => proxy.$disabledEndDate(startValue, form.urStartTime)
                "
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamProjectMdrpForm, emits } from './ts/FamProjectMdrpForm'; // 引入表单ts
const { proxy } = getCurrentInstance();
const props = defineProps({
  formId: {
    type: String,
    default: ''
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
  closeModal
} = useFamProjectMdrpForm({
  props: props,
  emit: emit
});
</script>


