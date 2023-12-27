<template>
  <a-modal
      :footer="null"
      :visible="props.attachOpen"
      title="查看附件"
      width="40%"
      @cancel="handleCancel"
  >
    <AvicUploader
        :allow-add="false"
        :allow-download="true"
        :allow-preview="true"
        :form-id="form.id"
        element-id="1"
        form-type="detail"
    />
  </a-modal>
</template>
<script lang="ts" setup>
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
