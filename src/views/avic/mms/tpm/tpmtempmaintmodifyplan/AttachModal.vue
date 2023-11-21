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
      ref="uploadFile"
      label="上传附件"
      :form-id="props.attachForm.id"
      :bpm-instance-object="props.bpmInstanceObject"
      :form-secret-level="props.attachForm.secretLevel"
      :allow-download="true"
      table-name="FAM_ACCPET"
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
const emit = defineEmits(['closeAttach']);

function handleCancel() {
  emit('closeAttach');
}

/** 上传成功的回调 */
const afterUploadEvent = () => {};
</script>
