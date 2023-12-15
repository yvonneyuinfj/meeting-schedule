<template>
  <div class="content-wrapper">
    <a-textarea
        v-model:value="note"
        :rows="10"
        :maxLength="512"
        placeholder="请输入备注"
    />
  </div>
</template>
<script setup lang="ts">
const note = ref();
defineExpose({
  note
});
</script>
