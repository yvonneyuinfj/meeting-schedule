<template>
  <div class="module module02 bpm-task" style="min-height: 120px">
    <div class="guide">
      <div class="usedNav">
        <div class="guide-top">
          <h3 class="tabBox">常用菜单</h3>
          <div class="more-icon">
            <a-button size="small" type="text" @click="flushed">
              <sync-outlined :spin="loading" />
            </a-button>
            <a-button size="small" type="text">
              <setting-outlined @click="showQuickAddModal" />
            </a-button>
          </div>
        </div>
        <a-row v-if="shortcutData.length != 0" type="flex" class="usedNavrow" :gutter="[16, 16]">
          <a-col class="usedNavcol" v-for="(v, i) in shortcutData" :key="i" :xl="6" :xxl="4">
            <div class="usedNavText" @click="fun(v.path)">
              <span class="usedNavrowIcon" :style="{ background: getColor(v.id) }">
                <avic-icon :svg="v.meta.icon" :type="v.meta.icon" class="usedNavicon" />
              </span>
              <span :title="v.meta.title" class="usedNavTitle">
                {{ v.meta.title }}
              </span>
            </div>
          </a-col>
        </a-row>
        <div v-else style="margin-top: 60px">
          <a-empty :image="simpleImage">
            <template #description>
              <span>
                暂无数据，
                <a-button style="padding: 0" type="link" @click="showQuickAddModal">
                  请添加常用
                </a-button>
              </span>
            </template>
          </a-empty>
        </div>
      </div>
      <QuickAdd v-if="quickAddShow" @close="quickAddShow = false" @flushed="flushed" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMenuList } from '@/api/avic/system/CommonMenuApi';
import { Empty } from 'ant-design-vue';
import QuickAdd from './QuickAdd.vue';
const { proxy } = getCurrentInstance();
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const colorList = [
  'linear-gradient(120deg, #84b5ff, #3473fe)',
  'linear-gradient(120deg, #a6a6ff, #6160fa)',
  'linear-gradient(120deg, #ffcaa1, #ff6a00)',
  'linear-gradient(120deg, #00d2b5, #00bea2)',
  'linear-gradient(120deg, #7e78fd, #6961f7)',
  'linear-gradient(120deg, #779fff, #346ffe)',
  'linear-gradient(120deg, #ffd247, #ea9e02)',
  'linear-gradient(120deg, #77e739, #48c019)'
];
let quickAddShow = ref(false);
let loading = ref(false);
let shortcutData = ref([]);

onMounted(() => {
  loadingLikedData();
});

/** 获取常用菜单数据 */
function loadingLikedData() {
  loading.value = true;
  getMenuList()
    .then((response: any) => {
      if (response.success) {
        shortcutData.value = response.data;
      }
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      shortcutData.value = [];
    });
}

/** 添加 */
function showQuickAddModal() {
  quickAddShow.value = true;
}

/** 跳转 */
function fun(path) {
  proxy.$router.push(path);
}

/** 颜色 */
function getColor(uuid) {
  if (typeof uuid === 'string' && uuid.length) {
    let sum = 0;
    for (let i = 0; i < uuid.length; i++) {
      sum += uuid.charAt(i).charCodeAt(0);
    }
    let cIndex = sum % colorList.length;
    return colorList[cIndex];
  } else if (typeof uuid === 'number') {
    return colorList[uuid % colorList.length];
  } else {
    return colorList[0];
  }
}

/** 刷新 */
function flushed() {
  loadingLikedData();
}
/** 父组件调用刷新 */
function loadData() {
  flushed();
}
defineExpose({
  loadData
});
</script>

<style lang="less" scoped>
@import '../../homepage/style/base.less';
</style>
