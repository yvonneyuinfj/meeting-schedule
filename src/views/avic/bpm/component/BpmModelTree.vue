<template>
  <div class="tree_content">
    <!-- 1.树有标题时，.surface-title v-show为true -->
    <div class="surface-search">
      <a-input-search
        :allow-clear="true"
        placeholder="请输入名称搜索"
        @search="handleSearchTree"
        style="width: calc(100%-32px)"
      />
      <!-- 1.树没有标题时，.opt-icon v-show为true -->
      <a-button class="opt-icon" @click="getTreeListData" v-show="false">
        <template #icon>
          <SyncOutlined />
        </template>
      </a-button>
      <!-- <a-button class="tittle-opt-icon" @click="getTreeListData" type="text">
        <template #icon>
          <SyncOutlined />
        </template>
      </a-button> -->
    </div>
    <div class="tree_box">
      <a-spin :spinning="loading">
        <a-tree
          v-if="treeData && treeData.length > 0"
          :tree-data="treeData"
          :load-data="onLoadData"
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          :show-icon="true"
          :show-line="true && { showLeafIcon: false }"
          :default-expand-all="true"
          @expand="onExpand"
          @select="selectNode"
        >
          <template #title="{ dataRef }">
            <span
              :title="
                dataRef.nodeType == 'process' && dataRef.attributes.version
                  ? dataRef.title + '-V' + dataRef.attributes.version
                  : dataRef.title
              "
            >
              {{
                dataRef.nodeType == 'process' && dataRef.attributes.version
                  ? dataRef.title + '-V' + dataRef.attributes.version
                  : dataRef.title
              }}
            </span>
          </template>
          <template #icon="{ expanded, dataRef }">
            <avic-icon
              svg="avic-server-fill"
              v-if="dataRef.id == defaultParentId"
              color="#1f76cb"
            />

            <avic-icon
              svg="avic-folder-open-fill"
              v-else-if="expanded && !dataRef.isLeaf && dataRef.nodeType == 'dynamicClassic'"
              color="#FFB800"
            />
            <avic-icon
              v-else-if="!expanded && !dataRef.isLeaf && dataRef.nodeType == 'dynamicClassic'"
              svg="avic-folder-3-fill"
              color="#ffb800"
            />
            <avic-icon
              svg="avic-folder-open-fill"
              v-else-if="dataRef.nodeType == 'dynamicApp' && expanded"
              color="#FFB800"
            />
            <avic-icon
              v-else-if="dataRef.nodeType == 'dynamicApp' && !expanded"
              svg="avic-folder-3-fill"
              color="#ffb800"
            />
            <avic-icon
              svg="avic-folder-open-fill"
              v-else-if="dataRef.nodeType == 'dynamicType'"
              color="#FFB800"
            />
            <avic-icon
              svg="avic-git-pull-request-fill"
              v-if="dataRef.nodeType == 'process'"
              color="#0fc6c2"
            />
          </template>
        </a-tree>
        <a-empty v-else :image="simpleImage" />
      </a-spin>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getTreeList, searchTreeList } from '@/api/avic/bpm/BpmModelTreeApi';
import { getSubFlowTreeData } from '@/api/avic/bpm/BpmSubFlowApi';
import { getAllExpandedKeys, getExpandedKeys, setNodeSlots } from '@/utils/tree-util';
import { Empty } from 'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';
const props = defineProps({
  hasAuthEnable: {
    type: Boolean,
    default: false
  },
  hasFlow: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: null
  }
});
const emit = defineEmits(['onModelTreeSelect']);
const defaultParentId = 'root'; //树节点默认最高级id
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const defaultRootParentId = '-1';
let loading = ref(false);
let data = reactive({
  treeData: [],
  expandedKeys: [],
  selectedKeys: [],
  selectedTreeNode: {
    nodeId: 'root',
    nodeType: 'dynamicClassic',
    procDefId: ''
  }
});
const { treeData, expandedKeys, selectedKeys } = toRefs(data);
getTreeListData();
function getTreeListData() {
  loading.value = true;
  const expandLevel = 2;
  const parentId = defaultRootParentId;
  data.treeData = [];
  data.expandedKeys = [];
  if (props.type === 'classicAppTree') {
    const treeParams = {
      parentId: defaultParentId,
      level: expandLevel
    };
    getSubFlowTreeData({ data: treeParams })
      .then(response => {
        setNodeSlots(response.data);
        getExpandedKeys(response.data, expandLevel, data.expandedKeys);
        data.treeData = response.data;
        data.selectedKeys = [response.data[0]?.id];
        emit('onModelTreeSelect', {
          nodeId: response.data[0]?.id,
          nodeType: response.data[0]?.nodeType,
          procDefId: '',
          showLine: ''
        });
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    const treeParam = {
      id: parentId,
      level: expandLevel,
      hasAuthEnable: props.hasAuthEnable,
      hasFlow: props.hasFlow
    };
    getTreeList(treeParam)
      .then(response => {
        setNodeSlots(response.data);
        getExpandedKeys(response.data, expandLevel, data.expandedKeys);
        data.treeData = response.data;
        data.selectedKeys = [response.data[0]?.id];
        emit('onModelTreeSelect', {
          nodeId: response.data[0]?.id,
          nodeType: response.data[0]?.nodeType,
          procDefId: '',
          showLine: ''
        });
      })
      .finally(() => {
        loading.value = false;
      });
  }
}
/**
 * 树节点查询
 * @param {Object} value
 */
function handleSearchTree(value: string) {
  if (!value) {
    getTreeListData();
  } else {
    const searchText = {
      searchTxt: value,
      hasAuthEnable: props.hasAuthEnable,
      hasFlow: props.hasFlow
    };
    loading.value = true;
    data.treeData = [];
    data.expandedKeys = [];
    searchTreeList(searchText).then(response => {
      setNodeSlots(response.data);
      getAllExpandedKeys(response.data, data.expandedKeys);
      data.treeData = response.data;
      data.selectedKeys = [response.data[0]?.id];
      emit('onModelTreeSelect', {
        nodeId: response.data[0]?.id,
        nodeType: response.data[0]?.nodeType,
        procDefId: ''
      });
      loading.value = false;
    });
  }
}
/**
 * 异步加载树节点
 * @param {Object} treeNode
 */
const onLoadData: TreeProps['loadData'] = treeNode => {
  return new Promise(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    const treeParam = {
      id: treeNode.dataRef.id,
      level: 1,
      hasAuthEnable: props.hasAuthEnable,
      hasFlow: props.hasFlow
    };
    getTreeList(treeParam).then(response => {
      setNodeSlots(response.data);
      treeNode.dataRef.children = response.data;
      data.treeData = [...data.treeData];
      resolve();
    });
  });
};
const onExpand = (expandedKeys: string[]) => {
  data.expandedKeys = expandedKeys;
};
/**
 * 树选中事件
 */
function selectNode(selectedKeys: string[], { node }) {
  data.selectedKeys = selectedKeys;
  data.selectedTreeNode.nodeId = node.dataRef.id;
  if (node.dataRef.attributes != null) {
    data.selectedTreeNode.procDefId = node.dataRef.attributes.pdId;
  } else {
    data.selectedTreeNode.procDefId = '';
  }
  data.selectedTreeNode.nodeType = node.dataRef.nodeType;
  if (data.selectedTreeNode.nodeType == 'process') {
    data.selectedTreeNode.nodeId = node.dataRef.attributes?.pdid;
    if (data.selectedTreeNode.nodeId == undefined) {
      data.selectedTreeNode.nodeId = node.dataRef.id;
    }
  } else {
    data.selectedTreeNode.nodeId = node.dataRef.id;
  }
  emit('onModelTreeSelect', data.selectedTreeNode);
}
</script>
