<template>
  <a-modal
    title="查看附件"
    :visible="props.attachOpen"
    @cancel="handleCancel"
    :footer="null"
    width="40%"
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
      :form-secret-level="form.secretLevel"
      table-name="TPM_YEAR_MAINT_MODIFY_PLAN"
      @afterUpload="afterUploadEvent"
    />
  </a-modal>
</template>
<script setup lang="ts">
const props = defineProps({
  attachOpen: {
    type: Boolean,
    default: false
  },
  attachForm: {
    type: Object,
    default: {}
  },
  bpmInstanceObject: {
    type: Object
  }
});
const form = reactive({
  id: '',
  secretLevel: ''
});
const emit = defineEmits(['closeAttach']);

function handleCancel() {
  emit('closeAttach');
}

/** 上传成功的回调 */
const afterUploadEvent = () => {};

watch(
  () => props.attachForm.id,
  newV => {
    if (newV) {
      form.id = newV;
      form.secretLevel = props.attachForm.secretLevel;
    }
  }
);
</script>
