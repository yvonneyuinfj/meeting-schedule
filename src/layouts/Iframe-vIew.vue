<template>
  <iframe
    ref="iframe"
    :id="id"
    :src="url"
    frameborder="0"
    width="100%"
    :height="height"
    scrolling="auto"
  />
</template>

<script>
export default {
  name: 'IframeVIew',
  data() {
    return {
      height: '',
      url: '',
      id: ''
    };
  },
  watch: {
    $route() {
      this.goUrl();
    }
  },
  created() {
    this.goUrl();
  },
  updated() {
    this.goUrl();
  },
  mounted() {
    this.height = this.$refs['iframe'].parentNode.offsetHeight;
  },
  methods: {
    goUrl() {
      let url = this.$route.meta.url;
      this.id = this.$route.path;
      if (url !== null && url !== undefined) {
        this.url = url;
      }
    }
  }
};
</script>
