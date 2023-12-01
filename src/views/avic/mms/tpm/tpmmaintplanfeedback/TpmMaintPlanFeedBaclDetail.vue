<template>
  <div>
    <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        class="form-excel-style"
    >
      <a-row></a-row>
    </a-form>
    <TpmMaintPlanManageDetail ref="tpmMaintPlanManageDetail" :tpmWorkflowId="formId || form.id" style="height:260px"/>
  </div>
</template>
<script lang="ts" setup>
import { useTpmMaintPlanForm, emits } from './ts/TpmMaintPlanFeedBackForm';
import TpmMaintPlanManageDetail from '@/views/avic/mms/tpm/tpmmaintplan/TpmMaintPlanManageDetail.vue'; // 引入表单ts
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
  layout,
  colLayout,
  secretLevelList,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useTpmMaintPlanForm({
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
