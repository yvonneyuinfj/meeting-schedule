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
        form-type="detail"
        :allow-add="false"
        :allow-download="true"
        :allow-preview="true"
        :form-id="form.id"
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
