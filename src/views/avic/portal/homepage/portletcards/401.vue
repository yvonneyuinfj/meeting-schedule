<template>
  <div class="empty-body">
    <a-empty>
      <template v-slot:description>
        <span>
          非常抱歉，暂无权限访问
          <a href="#API">请联系管理员</a>
        </span>
      </template>
    </a-empty>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false);
const timer = ref();
onMounted(() => {
  timer.value = setTimeout(() => {
    loading.value = false;
  }, 2000);
});
onUnmounted(() => {
  clearTimeout(timer.value);
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
