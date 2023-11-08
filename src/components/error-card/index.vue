<template>
  <div class="error-card">
    <div class="error-card-box">
      <avic-icon :svg="errorIcon" class="icon" />
      <div class="message">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AvicErrorCard',
  components: {},
  props: {
    errorMessage: {
      //加载失败时的文案
      type: String,
      required: false,
      default: '加载失败'
    },
    errorIcon: {
      //加载失败时的显示的图标
      type: String,
      required: false,
      default: 'warning'
    }
  }
};
</script>
<style lang="less" scoped>
.error-card {
  position: relative;
  width: 100%;
  height: 100%;
  .error-card-box {
    position: absolute;
    top: 40%;
    right: 50%;
    text-align: center;
    .icon {
      color: #09f;
      font-size: 25px;
    }
    .message {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
