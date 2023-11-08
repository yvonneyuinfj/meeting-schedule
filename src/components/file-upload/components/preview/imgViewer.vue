<template>
  <div>
    <viewer :images="images" :options="options" class="viewer" ref="viewer" @inited="inited"
      v-if="images && images.length">
      <img v-for="({ source, thumbnail }, index) in images" :src="thumbnail" :data-source="source" :key="index"
        class="image" />
    </viewer>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css';

export default {
  data() {
    let that = this;
    return {
      index: 0,
      images: [],
      options: {
        navbar: false,
        title: false,
        url: 'data-source',
        hidden() {
        }
      }
    };
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
      this.$viewer.view(this.index);
    },
    view(index) {
      this.index = index;
      this.$viewer.view(this.index);
    },
    show(images, index = 0) {
      if (this.images === images) {
        this.view(index);
        return;
      }
      this.images = images;
      this.index = index;
    }
  }
};
</script>

<style lang="less" scoped>
.image {
  display: none;
}
</style>
<style>
.viewer-loading>img {
  display: none;
}

.viewer-next,
.viewer-prev,
.viewer-play {
  display: none;
}
</style>
