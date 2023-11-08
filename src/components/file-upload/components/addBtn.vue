<template>
  <div class="button-box">
    <a-button v-bind="attrs">
      <template #icon><PlusOutlined /></template>
      <slot />
    </a-button>
  </div>
</template>
<script lang="ts" setup>
const attrs = useAttrs();
</script>
<style lang="less" scoped>
// .button-box {
//   margin-right: 10px;
//   cursor: pointer;
//   .avic-drag-uploader {
//     color: #666;
//   }
// }
</style>
