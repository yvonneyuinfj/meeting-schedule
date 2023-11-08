<template>
  <div class="icons-container">
    <div class="top-search-box">
      <a-input-search
        placeholder="请输入图标名称"
        style="position: relative"
        @search="filterIcons"
      />
    </div>
    <a-tabs type="card" v-model:activeKey="activeKey" class="iconSelectTab">
      <a-tab-pane :key="classify.title" :tab="classify.title" v-for="classify of iconList">
        <div class="grid">
          <div v-for="item of classify.iconList" :key="item" @click="handleClipboard(item)">
            <AvicIcon :svg="item"></AvicIcon>
            <span>{{ item }}</span>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="queryResult" tab="查询结果" v-if="searchIconList.length > 0">
        <div class="grid">
          <div v-for="item of searchIconList" :key="item" @click="handleClipboard(item)">
            <AvicIcon :svg="item"></AvicIcon>
            <span>{{ item }}</span>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { getIcons } from '@/assets/icon/index';
const { proxy } = getCurrentInstance();
let iconList = ref(getIcons());
let searchIconList = ref([]);
//let oldIconList = proxy.$lodash.cloneDeep(iconList);
//用户查找图标时定位到第一个找到图标的页签
let activeKey = ref();
if (iconList.value) {
  activeKey.value = iconList.value[0].title;
}
//let tabKeyMap = new Map();
function handleClipboard(symbol) {
  let text = (symbol = `<avic-icon svg='${symbol}' />`);
  let oInput = document.createElement('input');
  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.className = 'oInput';
  oInput.style.display = 'none';
  proxy.$message.success('拷贝成功' + text);
}
let firstTitle = iconList.value[0].title;
function filterIcons(searchValue) {
  searchIconList.value = [];
  if (searchValue) {
    iconList.value.forEach(function (icons) {
      const searchList = icons.iconList.filter(item => {
        if (item) {
          return item.includes(searchValue);
        }
      });
      searchIconList.value = [...searchIconList.value, ...searchList];
    });
    if (searchIconList.value.length > 0) {
      activeKey.value = 'queryResult';
    } else {
      activeKey.value = firstTitle;
    }
    /* iconList.value = proxy.$lodash.cloneDeep(oldIconList.value);
  if (searchValue) {
    tabKeyMap = new Map();
    iconList.value.forEach(function (icons) {
      icons.iconList = icons.iconList.filter(item => {
        if (item) {
          if (item.includes(searchValue)) {
            tabKeyMap.set(icons.title, icons.title);
          }
          return item.includes(searchValue);
        }
      },
      );
    }); */
    //当前页签如果找到符合条件的图标则定位到当前页签，当前页签如果没有则定位到第一个服务条件的页签
    /* let index = 0;
    let queryTabKey = activeKey.value;
    tabKeyMap.forEach((item) => {
      if (index == 0) {
        queryTabKey = item;
      }
      index++;
      if (activeKey.value == item) {
        queryTabKey = item;
        return;
      }
    });
    activeKey.value = queryTabKey; */
  } else {
    activeKey.value = firstTitle;
  }
}
</script>
<style lang="less">
@import './style/AvicIconList.less';
</style>
