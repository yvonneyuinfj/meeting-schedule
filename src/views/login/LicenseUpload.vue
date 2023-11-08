<template>
  <AvicModal
    :visible="visible"
    title="请上传平台授权文件"
    width="650px"
    height="400px"
    :adjustSize="false"
    :centered="true"
    :footer="null"
    @cancel="closeModal"
    :body-style="{ padding: '16px 24px' }"
  >
    <license-manage :use-form-info-param="false" />
  </AvicModal>
</template>

<script lang="ts" setup>
import LicenseManage from './LicenseManage.vue';
const visible = ref(false);
const $emit = defineEmits(['close']);
onMounted(() => {
  visible.value = true;
});
function closeModal() {
  $emit('close');
}
</script>

<style scoped></style>
