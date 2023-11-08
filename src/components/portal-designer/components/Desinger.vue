<template>
  <designer-container
    ref="designer"
    generate-json
    v-bind="$attrs"
    @reloadData="reloadData"
  ></designer-container>
</template>
<script lang="ts" setup>
import designerContainer from './Container.vue';
const props = defineProps({
  /** 小页设计信息 */
  widgetForm: {
    type: Object,
    default: () => {
      return null;
    }
  }
});
const designer = ref();
watch(
  () => props.widgetForm,
  newVal => {
    if (newVal) {
      if (designer.value) {
        designer.value.setWidgetForm(JSON.parse(JSON.stringify(newVal)));
      }
    }
  },
  { immediate: true, deep: true }
);
const emit = defineEmits(['reloadData']);
/** 刷新方法 */
function reloadData(portalId) {
  emit('reloadData', portalId);
}
</script>
