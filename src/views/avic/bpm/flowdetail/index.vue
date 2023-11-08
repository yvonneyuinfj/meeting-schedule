<template>
  <flow-detail-content
    ref="flowDetailContent"
    :params="params"
    :detailVueCompnent="detailVueCompnent"
    :viewMode="viewMode"
    :loadComponent="loadComponent"
  />
</template>
<script>
import FlowDetailContent from './components/flow-detail-content/index.vue';
import { defineAsyncComponent } from 'vue';
const modules = import.meta.glob('@/views/**/*.vue');
export default defineComponent({
  name: 'FlowDetail',
  components: {
    FlowDetailContent
  },
  props: ['params', 'viewMode'],
  data() {
    return {
      id: null,
      detailVueCompnent: shallowRef()
    };
  },
  created() {
    if (this.params) {
      this.id = this.params.routeId;
    } else {
      this.id = this.$route.params.id;
    }
    let filePath = decodeURIComponent(this.id).replace(RegExp('_', 'g'), '/');
    if (this.$route.query?.siteType == '1') {
      // this.detailVueCompnent = AvicMicroPage;
    } else {
      this.detailVueCompnent = defineAsyncComponent(modules[`/src/${filePath}.vue`]);
    }
  },
  methods: {
    loadComponent(filePath) {
      const component = defineAsyncComponent({
        loader: modules[`/src/${filePath}.vue`],
        //loading: LoadingPage,
        //error: ErrorPage,
        delay: 100,
        timeout: 10000
      });
      return component;
    },
    inModalResize(h) {
      this.$refs.flowDetailContent.inModalResize(h);
    }
  }
});
</script>
<style lang="css" scoped>
body {
  padding-top: 96px;
}
</style>
