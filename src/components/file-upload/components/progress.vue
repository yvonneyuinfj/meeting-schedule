<!---
  进度条
-->
<template>
  <div v-show="plan > 0" class="progress_box">
    <a-progress :percent="plan" :status="status" size="small" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  progress: {
    type: [Number, String],
    required: true, //校验
    default: 0
  },
  uploadFailed: {
    type: [Boolean],
    required: true, //校验
    default: false
  }
});
const plan = ref(0);
const status = computed(() => {
  return props.uploadFailed ? 'exception' : plan.value === 100 ? 'success' : 'active';
});
watch(
  () => props.progress,
  newV => {
    if (newV >= plan.value || newV == 0) {
      plan.value = parseFloat(newV);
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.progress_box {
  height: 15px;
  line-height: 10px;
}

.progress_box .ant-progress {
  line-height: 1px;
}
</style>
