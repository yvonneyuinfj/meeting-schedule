<!--
  文件上传按钮
-->
<template>
  <div class="button-box">
    <a-button v-bind="$attrs" @click="uploadfile">
      <template #icon><upload-outlined /></template>
      <slot />
    </a-button>
  </div>
</template>

<script lang="ts" setup>
const $emit = defineEmits(['upload']);
function uploadfile() {
  $emit('upload');
}
</script>

<style lang="less">
// .button-box {
//   display: inline-block;
//   margin: 0;
//   margin-right: 10px;
//   cursor: pointer;
// }
</style>
