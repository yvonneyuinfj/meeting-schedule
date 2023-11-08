<template>
  <AvicModal
    :visible="true"
    title="常用菜单设置"
    width="720px"
    height="520px"
    :centered="true"
    @cancel="closeQuickAddModal"
  >
    <template #footer>
      <a-button title="提交" type="primary" @click="savehandle">提交</a-button>
      <a-button title="取消" @click="closeQuickAddModal">取消</a-button>
    </template>
    <a-input-search
      placeholder="请输入菜单名称"
      style="margin-bottom: 8px"
      @search="onSearchFromMenu"
    />
    <div style="display: flex; height: calc(100% - 40px)">
      <!--左侧一级菜单列表-->
      <div class="quickMenuLevel-left">
        <!-- <div :class="[activeMenu==-1 ? activeMenuStyle:'',activeMenuItem]" -->
        <div
          :class="[activeMenu == -1 ? activeMenuStyle : '', activeMenuItem]"
          @click="menuClicked()"
        >
          已添加 ({{ liked }})
        </div>
        <a-list :data-source="menuData">
          <template #renderItem="{ item, index }">
            <a-list-item
              :class="[activeMenu == index ? activeMenuStyle : '', menuItem]"
              @click="menuClick(item, index)"
            >
              {{ item.meta.title }}
            </a-list-item>
          </template>
        </a-list>
      </div>
      <!--叶子节点菜单列表-->
      <div class="quickMenuData" v-if="!allowDrag">
        <VueDraggableNext
          v-model="menuLeafValue"
          group="site"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          :loading="menuListLoading"
          tag="a-list"
        >
          <transition-group>
            <a-list-item class="ListItem" v-for="item in menuLeafValue" :key="item.id">
              <span :style="{ background: getColor(item.id) }" class="IconClass">
                <avic-icon :svg="item.meta.icon" :type="item.meta.icon" />
              </span>
              <span>{{ item.meta.title }}</span>
              <a-space style="margin-left: auto">
                <a-button size="small" ghost type="primary" style="cursor: move">
                  <template #icon>
                    <drag-outlined />
                  </template>
                </a-button>
                <a-button size="small" danger class="deleteButton" @click="deleteMenuItem(item)">
                  移除
                </a-button>
              </a-space>
            </a-list-item>
          </transition-group>
        </VueDraggableNext>
      </div>
      <div class="quickMenuData" v-if="allowDrag">
        <span v-show="searchShow">共查询到{{ searchResult }}个结果</span>
        <a-list :data-source="menuLeafData" :loading="menuListLoading">
          <a-list-item class="ListItem" v-for="item in menuLeafData" :key="item.id">
            <span :style="{ background: getColor(item.id) }" class="IconClass">
              <avic-icon :svg="item.meta.icon" :type="item.meta.icon" color="white" />
            </span>
            <span>{{ item.meta.title }}</span>
            <a-space style="margin-left: auto">
              <a-button
                v-if="!menuLeafValue.some(data => data.id == item.id)"
                class="addButton theme-main-color theme-main-hover-bg light10"
                @click="addMenuItem(item)"
                size="small"
                ghost
                type="primary"
              >
                添加
              </a-button>
              <a-button
                v-if="menuLeafValue.some(data => data.id == item.id)"
                class="deleteButton"
                @click="deleteMenuItem(item)"
                size="small"
                danger
              >
                移除
              </a-button>
            </a-space>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </AvicModal>
</template>

<script lang="ts" setup>
import { getMenuList, savePersonMenuList } from '@/api/avic/system/CommonMenuApi';
import { VueDraggableNext } from 'vue-draggable-next';
import { useUserStore } from '@/store/user';
const emit = defineEmits(['close', 'flushed']);
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
let userStore = useUserStore();
let allowDrag = ref(false);
let menuListLoading = ref(false);
let drag = ref(false);
let searchShow = ref(false); //搜索显示隐藏
let menuLeafData = ref([]); //二级菜单数据
let menuLeafValue = ref([]); //已添加数据
let menuData = ref([]); //一级菜单数据
let searchResult = ref(0); //搜索谁数量
let liked = ref(0); //添加数量
let activeMenu = ref(-1);
let activeMenuStyle = ['activeMenuStyle', 'theme-main-bdr', 'theme-main-bg', 'light10'];
let menuItem = ['menuItem', 'theme-main-hover-bg', 'light10'];
let activeMenuItem = ['activeMenuItem', 'theme-main-hover-bg', 'light10'];

onMounted(() => {
  loadingLikedMenuItem();
  loadingLevel1Data();
});

/** 获取菜单 */
function loadingLevel1Data() {
  menuData.value = userStore.menuList.filter(item => item.meta.menuType == 1);
}
/** 用于更多快捷菜单的搜索 */
function onSearchFromMenu(value) {
  allowDrag.value = true;
  value = value.trim();
  loadingSearchData(value);
  searchShow.value = true;
}
/** 搜索 */
function loadingSearchData(value) {
  menuListLoading.value = true;
  let dac = [];
  for (let i = 0; i < menuData.value.length; i++) {
    dac.push(...menuData.value[i].children);
  }
  menuLeafData.value = dac.filter(item => {
    return item.meta.title.includes(value);
  });
  searchResult.value = menuLeafData.value.length;
  menuListLoading.value = false;
}
/** 切换已添加菜单 */
function menuClicked() {
  allowDrag.value = false;
  activeMenu.value = -1;
  searchShow.value = false;
}
/** 初始化获取收藏节点 */
function loadingLikedMenuItem() {
  menuListLoading.value = true;
  getMenuList()
    .then((response: any) => {
      if (response.success) {
        let likedMenuItem = response.data;
        //对收藏的菜单数据进行改造
        likedMenuItem.forEach((item, index) => {
          item.sort = (index + 1) * 10;
        });
        menuListLoading.value = false;
        menuLeafValue.value = likedMenuItem;
        liked.value = response.data.length;
      }
    })
    .catch(() => {
      menuListLoading.value = false;
    });
}
/** 叶子节点菜单 */
function menuClick(item, index) {
  allowDrag.value = true;
  activeMenu.value = index;
  menuLeafData.value = filtration(item.children);
  searchShow.value = false;
}
/** 数据过滤 */
function filtration(source) {
  let res = [];
  source.forEach(el => {
    res.push(el);
    el.children && res.push(...filtration(el.children));
  });
  return res.filter(item => !item.children);
}
/** 保存 */
function savehandle() {
  alladdMenuItem();
}
/** 批量保存 */
function alladdMenuItem() {
  let newArr = [];
  menuLeafValue.value.forEach((item, index) => {
    let obj = { menuId: '', sort: 0 };
    obj.menuId = item.id;
    obj.sort = (index + 1) * 10;
    newArr.push(obj);
  });
  savePersonMenuList(newArr).then((response: any) => {
    if (response.success) {
      emit('flushed');
      emit('close');
    }
  });
}
/** 添加 */
function addMenuItem(item) {
  menuLeafValue.value.push(item);
  liked.value = liked.value + 1;
}
/** 移除 */
function deleteMenuItem(item) {
  menuLeafValue.value.splice(
    menuLeafValue.value.findIndex(data => data.id === item.id),
    1
  );
  liked.value = liked.value - 1;
}
/** 关闭 */
function closeQuickAddModal() {
  emit('close');
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
/** 开始拖拽事件 */
function onStart() {
  drag.value = true;
}
</script>

<style lang="less" scoped>
:deep(.ant-input-group .ant-input) {
  height: 32px;
}

.quickMenuLevel-left {
  width: 180px;
  margin-right: 24px;
  overflow: auto;
}

.activeMenuItem,
.menuItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}
.activeMenuItem:hover,
.menuItem:hover {
  color: @primary-color;
  background-color: #f5f7fa;
}
.activeMenuStyle {
  position: relative;
  color: @primary-color;
  font-weight: 600;
  background-color: @primary-1;
  &::before {
    position: absolute;
    left: 0;
    width: 2px;
    height: 16px;
    background: @primary-color;
    content: '';
  }
}
.quickMenuData {
  flex: 1;
  overflow: auto;
  .ant-list-item {
    padding: 8px 16px;
    border: 0;
    border-radius: 6px;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  .IconClass {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    font-size: 1.2em;
    line-height: 24px;
    border-radius: 6px;
    .avic-icon {
      color: #fff;
      opacity: 0.85;
    }
    :deep(.svg-icon) {
      vertical-align: -0.15em;
    }
  }
}
// .theme-main-color {
//   border-left: 3px solid;
// }
// :deep(.ant-card-head) {
//   background-color:#f5f7fa;
// }
// :deep(.ant-list-item){
//   border-bottom:0px;
// }
// :deep(.ant-modal-content) {
//   div{
//     .ant-modal-footer{
//     display:none;
//     //  visibility:hidden;
//     }
//   }
// }

// .addButton{
//   border: 1px solid;
//   color: @primary-color;
//   float:right;
// }
// .addButton:hover{
//   background-color:#e9f2fd;
// }
// .deleteButton{
//   border: 1px solid #F0A100!important;
//   color: #F0A100!important;
//   float:right;
// }
// .deleteButton:hover{
//   background-color:#f5f6f7;
// }
// .search-frame{
//   width: 200xp;
//   position: absolute;
//   top: 10px;
//   left: calc(100% - 290px);
// }
// .ant-btn-circle{
//  min-width: 28px;
//  font-size: 17px;
//  color: rgb(173, 152, 152);
// }
// .SortBtn{
// }
// .ListItem{
//   padding: 8px;
// }
// .ListItem:hover{
//   background-color:#e9f2fd;
// }
// .IconClass{
//   font-size: 1.4em;
//   display: inline-block;
//   height: 32px;
//   width: 32px;
// }
</style>
