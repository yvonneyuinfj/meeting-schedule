<template>
  <AvicModal :visible="true" width="1200px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="note" label="备注">
              <a-textarea v-model:value="form.note" :rows="15" :maxLength="4000" placeholder="请输入备注" :disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>

    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmCaseShareForm, emits } from './ts/TpmCaseShareForm'; // 引入表单ts
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
  closeModal
} = useTpmCaseShareForm({
  props: props,
  emit: emit
});
</script>
