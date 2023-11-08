<template>
  <a-empty>
    <template v-slot:description>
      <span>
        未找到小页信息
        <a href="#API">请联系管理员</a>
      </span>
    </template>
  </a-empty>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Exception404',
  setup() {
    return {};
  }
});
</script>
<style lang="less" scoped>
.ant-empty {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  :deep(.ant-empty-image) {
    height: 64px;
  }
  :deep(.ant-empty-description) {
    font-size: @font-size-sm;
  }
}
</style>
