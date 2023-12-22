<template>
  <div>
    <a-input v-model:value="showValue" @change="handleInput" @click="handleTrigger">
      <template #suffix>
        <AvicIcon svg="avic-app-channel" @click="handleTrigger" color="#86909c"/>
        <!--        <avic-icon svg="avic-node-tree" @click="handleTrigger" color="#86909c"/>-->
      </template>
    </a-input>
    <a-modal :visible="visible" :footer="null" @cancel="handleCancel" style="top: 100px">
      <a-spin :spinning="loading">
        <div :style="{ height: treeSelectHeight - 40 + 'px', overflow: 'auto', padding: '4px' }">
          <a-tree
            v-if="treeData && treeData.length > 0"
            v-model:expanded-keys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            :tree-data="treeData"
            :load-data="onLoadData"
            :show-line="false"
            :default-expand-all="true"
            :multiple="multiple"
            @expand="onExpand"
            @select="selectNode"
            showIcon
          >
            <template #title="{ dataRef }">
                <span v-if="dataRef.title.indexOf(searchValue) > -1">
                  {{ dataRef.title.substr(0, dataRef.title.indexOf(searchValue)) }}
                  <span style="color: #f50">{{ searchValue }}</span>
                  {{
                    dataRef.title.substr(dataRef.title.indexOf(searchValue) + searchValue.length)
                  }}
                </span>
              <span v-else>{{ dataRef.title }}</span>
            </template>
            <template #icon="{ dataRef }">
              <avic-icon v-if="dataRef.isLeaf" svg="avic-file-fill" color="#3370ff"/>
              <avic-icon
                v-if="!dataRef.expanded && !dataRef.isLeaf"
                svg="avic-folder-3-fill"
                color="#ffb800"
              />
              <avic-icon
                v-if="dataRef.expanded && !dataRef.isLeaf"
                svg="avic-folder-open-fill"
                color="#ffb800"
              />
            </template>
          </a-tree>
          <template v-else>
            <a-empty :image="simpleImage"/>
          </template>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { getTreeData, searchTree } from '@/api/avic/system/AvicTreeSelectApi';
import { getExpandedKeys, getAllExpandedKeys, setNodeSlots } from '@/utils/tree-util';
import { Empty } from 'ant-design-vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
  /** 树的后台服务地址 */
  baseUrl: { type: String, default: '' },
  /** 树选择时默认传入的父节点id，用户默认选中id  */
  parentId: { type: String, default: '' },
  /** 树选择时默认传入的父节点title，用户默认选中展示  */
  parentTitle: { type: String, default: '' },
  /** 允许选择非叶子节点,默认允许 */
  allowSelectNonIsLeaf: { type: Boolean, default: true },
  /** 是否允许多选 */
  multiple: { type: Boolean, default: false },
  /** 选择页高度 */
  treeSelectHeight: { type: Number, default: 260 }
  /** 是否禁用控件 */
  // disabled: { type: Boolean, default: false },
  /** 下拉弹出框样式 */
  // dropdownStyle: {
  //   type: Object,
  //   required: false, //校验
  //   default: () => {}
  // }
});

const $emit = defineEmits(['input', 'change', 'select', 'update:value', 'getTile']);
const state = reactive({
  bindValue: props.parentId,
  showValue: props.parentTitle,
  valueList: [props.parentId], //多选时使用
  showValueList: [],
  visible: false,
  loading: false,
  defaultRootParentId: '-1',
  treeData: [],
  expandedKeys: [],
  selectedKeys: [],
  searchValue: '',
  simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
});
let {
  bindValue,
  showValue,
  valueList,
  showValueList,
  visible,
  loading,
  defaultRootParentId,
  treeData,
  expandedKeys,
  selectedKeys,
  searchValue,
  simpleImage
} = toRefs(state);
const bodyStyle = {
  overflow: 'hidden',
  overflowY: 'scroll',
  height: '600px'
};

watch(
  bindValue,
  newVal => {
    $emit('input', newVal);
    $emit('change', newVal);
    $emit('update:value', newVal);

  },
  { immediate: true }
);

watch(showValue, newVal => {
  $emit('getTile', newVal);
});

watch(
  () => props.parentTitle,
  newVal => {
    if (newVal) {
      showValue.value = newVal;
      showValueList.value.push(newVal);
    }
  },
  { immediate: true }
);

function initData(pid, ptitle) {
  showValue.value = ptitle;
  showValueList.value.push(ptitle);
  bindValue.value = pid;
  valueList.value = [pid]; //多选时使用
}

function getTreeList() {
  loading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  expandedKeys.value = [];
  getTreeData(props.baseUrl, expandLevel, defaultRootParentId.value)
    .then(response => {
      setNodeSlots(response.data);
      getExpandedKeys(response.data, expandLevel, expandedKeys.value);
      treeData.value = response.data;
      selectedKeys.value = [props.parentId];
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

function reloadTreeData() {
  treeData.value = [];
}

/**
 * 树节点查询
 * @param {Object} value
 * @param {Object} e
 */
function handleSearchTree(value) {
  if (value.trim() == '') {
    getTreeList();
  } else {
    const searchText = { searchText: value };
    loading.value = true;
    treeData.value = [];
    expandedKeys.value = [];
    searchTree(props.baseUrl, searchText).then(response => {
      setNodeSlots(response.data);
      getAllExpandedKeys(response.data, expandedKeys.value);
      treeData.value = response.data;
      loading.value = false;
    });
  }
  /*Object.assign(this, {
    expandedKeys: this.expandedKeys,
    searchValue: value
  })*/
  searchValue.value = value;
}

/**
 * 异步加载树节点
 * @param {Object} treeNode
 */
function onLoadData(treeNode) {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    getTreeData(props.baseUrl, 1, treeNode.dataRef.id).then(response => {
      setNodeSlots(response.data);
      treeNode.dataRef.children = response.data;
      treeData.value = [...treeData.value];
      resolve();
    });
  });
}

function onExpand(_expandedKeys) {
  expandedKeys.value = _expandedKeys;
}

function handleInput(e) {
  // 允许清空且点击清空图标时清空数据
  if (!showValue.value && e.type === 'click') {
    $emit('input', '');
    $emit('change', '');
    $emit('select', [], null, e);
    // 清空输入框时，清空树选中
    selectedKeys.value = [];
    valueList.value = [];
    showValueList.value = [];
    getTreeList();
  } else {
    showValue.value = props.parentTitle;
  }
}

function handleTrigger(e) {
  if (treeData.value.length == 0) {
    getTreeList();
  }
  e.stopPropagation();
  visible.value = !visible.value;
}

/**
 * 树选中事件
 */
function selectNode(_selectedKeys, { node }) {
  if (!props.allowSelectNonIsLeaf && node.dataRef.isLeaf == false) {
    //禁止选择非叶子节点，并且当前节点为非叶子节点
    proxy.$message.warning('禁止选择非叶子节点！');
    return;
  }
  if (!props.multiple) {
    visible.value = false;
    (bindValue.value = node.dataRef.id), (showValue.value = node.dataRef.title);
    selectedKeys.value = _selectedKeys;
    console.log(showValue.value);
  } else {
    //选择前节点选中状态
    const selected = node.selected;
    if (selected) {
      valueList.value = valueList.value.filter(id => id !== node.dataRef.id);
      showValueList.value = showValueList.value.filter(title => title !== node.dataRef.title);
    } else {
      valueList.value.push(node.dataRef.id);
      showValueList.value.push(node.dataRef.title);
    }
    bindValue.value = valueList.value.toString();
    showValue.value = showValueList.value.toString();
    selectedKeys.value = _selectedKeys;
  }
}

/** 确定 */
function handleOk() {

}

/** 关闭 */
function handleCancel(e) {
  e.stopPropagation();
  visible.value = !visible.value;
}

defineExpose({
  reloadTreeData,
  initData
});
</script>

<style scoped lang="less">

</style>
