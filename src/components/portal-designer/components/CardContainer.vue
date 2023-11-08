<template>
  <a-card class="box-card" :bordered="false" :body-style="{}">
    <div>
      <a-row type="flex" align="middle" v-if="element.options.titleRequired" class="box-card-title">
        <a-col :span="16">
          <span
            class="box-card-title-text"
            :style="{
              lineHeight: (element.options.lineHeight || '40') + 'px',
              height: (element.options.lineHeight || '40') + 'px',
              color: element.options.fontColor,
              fontSize: element.options.fontSize + 'px',
              fontWeight: element.options.fontWeight ? 'bold' : 'normal',
              textDecoration: element.options.textDecoration ? 'underline' : 'none',
              fontStyle: element.options.italic ? 'italic' : 'normal'
            }"
          >
            <span class="vertical-line"></span>
            {{ element.options.title }}
          </span>
        </a-col>
        <a-col :span="8" class="box-card-title-bar" v-if="source == 'renderer'">
          <a-button
            class="btn-icon"
            size="small"
            type="text"
            :spin="loading"
            v-if="element.options.isShowRefresh"
          >
            <sync-outlined :spin="loading" @click="reFreshData" />
          </a-button>
          <a-button class="btn-icon" size="small" type="text" v-if="element.options.moreUrl">
            <template v-slot:icon>
              <router-link :to="element.options.moreUrl">
                <avic-icon svg="MoreOutlined" />
              </router-link>
            </template>
          </a-button>
        </a-col>
        <a-col :span="8" class="box-card-title-bar" v-if="source == 'design'">
          <a-button
            class="btn-icon"
            size="small"
            type="text"
            :spin="loading"
            v-if="element.options.isShowRefresh"
          >
            <sync-outlined :spin="loading" />
          </a-button>
          <a-button class="btn-icon" size="small" type="text" v-if="element.options.moreUrl">
            <avic-icon svg="MoreOutlined" />
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div
      class="box-card-body"
      :class="{ 'body-mask': preview }"
      v-if="element.type == 'smallPage'"
      :style="{
        // top: element.options.titleRequired ? Number(element.options.lineHeight || '40') + 'px' : '0'
      }"
    >
      <component ref="smallPages" :is="detailVueCompnent" />
    </div>
  </a-card>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const modules = import.meta.glob('@/views/**/*.vue');
const props = defineProps({
  /**门户小页元素 */
  element: { type: Object },
  /**打开设计器来源 */
  source: { type: String },
  /** 是否预览模式 */
  preview: { type: Boolean, default: true }
});
const loading = ref(false);
let timer = null;
const smallPages = ref();
const detailVueCompnent = shallowRef();
let page = modules[`/src/${props.element.url}.vue`];
page = page ? page : modules[`/src/views/dashboard/404.vue`];
detailVueCompnent.value = defineAsyncComponent(page);
onMounted(() => {
  /*定时刷新*/
  if (props.element.options.refresh > 0) {
    let time = (60 / props.element.options.refresh) * 1000;
    timer = setInterval(loadData, time);
  }
});
function reFreshData() {
  loadData();
}
/*刷新门户小页组件*/
function loadData() {
  if (loading.value) {
    return;
  }
  loading.value = true;
  if (smallPages.value) {
    if (typeof smallPages.value.loadData === 'function') {
      smallPages.value.loadData();
    }
  }
  setTimeout(() => {
    loading.value = false;
  }, 300);
}
onUnmounted(() => clearInterval(timer));
</script>
<style lang="less">
@import '../style/cardContainer.less';
</style>
