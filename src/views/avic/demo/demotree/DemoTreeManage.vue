<template>
  <AvicSplit @onresize="onResize">
    <AvicPane size="250px" collapsible="left">
      <div class="tree_content" ref="treeContentRef">
        <div class="surface-title">左侧树</div>
        <div class="surface-search">
          <a-input-search
            :allow-clear="true"
            placeholder="输入节点名称查询"
            @search="handleSearchTree"
            style="margin-right: 4px"
          />
          <a-button class="opt-icon" @click="getTreeList">
            <template #icon>
              <sync-outlined />
            </template>
          </a-button>
        </div>
        <div class="tree_box">
          <a-spin :spinning="loading">
            <a-tree
              v-if="treeData && treeData.length > 0"
              v-model:expanded-keys="expandedKeys"
              v-model:selectedKeys="selectedKeys"
              :tree-data="treeData"
              :load-data="onLoadData"
              :show-icon="true"
              :show-line="true && { showLeafIcon: false }"
              :default-expand-all="true"
              :height="treeHeight"
              @expand="handleExpand"
              @select="handleSelect"
              @rightClick="handleRightClick"
            >
              <template #title="{ dataRef }">
                <a-dropdown :trigger="['contextmenu']">
                  <span v-if="dataRef.title.indexOf(searchValue) > -1" :title="dataRef.title">
                    {{ dataRef.title.substr(0, dataRef.title.indexOf(searchValue)) }}
                    <span style="color: #f50">{{ searchValue }}</span>
                    {{
                      dataRef.title.substr(dataRef.title.indexOf(searchValue) + searchValue.length)
                    }}
                  </span>
                  <span v-else :title="dataRef.title">
                    {{ dataRef.title }}
                  </span>
                  <template #overlay>
                    <a-menu @click="({ key: menuKey }) => handleContextMenuClick(dataRef, menuKey)">
                      <a-menu-item
                        key="1"
                        v-if="
                          getContextMenuVisiable(dataRef, '1') && proxy.$hasPermi(['demoTree:add'])
                        "
                      >
                        添加平级节点
                      </a-menu-item>
                      <a-menu-item key="2" v-if="proxy.$hasPermi(['demoTree:add'])">
                        添加子节点
                      </a-menu-item>
                      <a-menu-item key="3" v-if="proxy.$hasPermi(['demoTree:edit'])">
                        编辑节点
                      </a-menu-item>
                      <a-menu-item key="4" v-if="proxy.$hasPermi(['demoTree:del'])">
                        删除节点
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
              <template #icon="{ expanded, dataRef }">
                <AvicIcon v-if="dataRef.isLeaf" svg="avic-file-fill" color="#3370ff" />
                <AvicIcon
                  v-if="!expanded && !dataRef.isLeaf"
                  svg="avic-folder-3-fill"
                  color="#ffb800"
                />
                <AvicIcon
                  v-if="expanded && !dataRef.isLeaf"
                  svg="avic-folder-open-fill"
                  color="#ffb800"
                />
              </template>
            </a-tree>
            <template v-else>
              <a-empty :image="proxy.$Empty.PRESENTED_IMAGE_SIMPLE" />
            </template>
          </a-spin>
        </div>
      </div>
    </AvicPane>
    <AvicPane>
      <DemoTreeDetail
        ref="demoTreeDetailRef"
        :formId="nodeId"
        :parentId="detailParentId"
        :parentTitle="detailParentTitle"
      />
    </AvicPane>
    <!-- 添加页面弹窗 -->
    <DemoTreeAdd
      v-if="showAddNodeModal"
      :parentId="parentId"
      :parentTitle="parentTitle"
      @afterAddTreeNode="afterAddTreeNode"
      @close="showAddNodeModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <DemoTreeEdit
      v-if="showEditNodeModal"
      :formId="nodeId"
      :parentId="parentId"
      :parentTitle="parentTitle"
      @afterEditTreeNode="afterEditTreeNode"
      @close="showEditNodeModal = false"
    />
  </AvicSplit>
</template>
<script lang="ts" setup>
import { getTreeData, searchTreeList, delDemoTree } from '@/api/avic/demo/DemoTreeApi'; // 引入模块API
import {
  addSameNode,
  addSubNode,
  getExpandedKeys,
  getAllExpandedKeys,
  setNodeSlots,
  deleteNode,
  findNodeForTreegrid
} from '@/utils/tree-util'; // 引入树公共方法
import DemoTreeAdd from './DemoTreeAdd.vue'; // 引入添加页面组件
import DemoTreeEdit from './DemoTreeEdit.vue'; // 引入编辑页面组件
import DemoTreeDetail from './DemoTreeDetail.vue'; // 引入详细页面组件
const { proxy } = getCurrentInstance();
const loading = ref(false);
const showAddNodeModal = ref(false); // 是否展示添加弹窗
const showEditNodeModal = ref(false); // 是否展示编辑弹窗
const treeData = ref(null);
const expandedKeys = ref([]);
const selectedKeys = ref([]);
const searchValue = ref('');
const nodeId = ref('');
const defaultRootParentId = ref('-1');
const currentSelectedNode = ref(null);
const parentId = ref(''); // 父节点id
const parentTitle = ref(''); // 父节点标题
const detailParentId = ref(''); // 详细页父节点id
const detailParentTitle = ref(''); // 详细页父节点标题
const selectMenuKey = ref(''); // 当前选择的右键操作类型
const treeContentRef = ref();
const treeHeight = ref();
const demoTreeDetailRef = ref(null);
onMounted(() => {
  // 加载树数据
  getTreeList();
  // 重置树高度
  onResize();
});

/** 查询数据 */
function getTreeList() {
  loading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  expandedKeys.value = [];
  getTreeData(expandLevel, defaultRootParentId.value).then(response => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    treeData.value = response.data;
    if (treeData.value != null && treeData.value.length > 0) {
      // 默认选中第一个节点，并触发选中事件
      selectNode(
        [treeData.value[0].id],
        {
          node: { dataRef: treeData.value[0] }
        },
        ''
      );
    }
    loading.value = false;
  });
}
/** 布局尺寸发生变更时重新设置树高度 */
function onResize() {
  treeHeight.value = treeContentRef.value.clientHeight - 88;
}
/** 树节点查询 */
function handleSearchTree(value) {
  if (value.trim() === '') {
    getTreeList();
  } else {
    const searchText = { searchText: value };
    loading.value = true;
    treeData.value = [];
    expandedKeys.value = [];
    searchTreeList(searchText).then(response => {
      setNodeSlots(response.data);
      getAllExpandedKeys(response.data, expandedKeys.value);
      treeData.value = response.data;
      loading.value = false;
    });
  }
  searchValue.value = value;
}
/** 异步加载树节点 */
async function onLoadData(treeNode) {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    getTreeData(1, treeNode.dataRef.id).then(response => {
      setNodeSlots(response.data);
      treeNode.dataRef.children = response.data;
      treeData.value = [...treeData.value];
      resolve();
    });
  });
}
/** 树节点展开事件 */
function handleExpand(keys) {
  expandedKeys.value = keys;
}
/** 树选中事件 */
function handleSelect(keys: string[], node) {
  selectNode(keys, node, '');
}
/** 树选中事件 */
function selectNode(keys: string[], { node }, type) {
  selectedKeys.value = keys;
  nodeId.value = node.dataRef.id;
  // 正常单击事件时执行，右键操作时不执行以下逻辑
  if (!type) {
    currentSelectedNode.value = node;
    parentId.value = node.dataRef.parentId;
    detailParentId.value = node.dataRef.parentId;
    if (parentId.value == defaultRootParentId.value) {
      parentTitle.value = '根节点';
      detailParentTitle.value = '根节点无需修改';
    } else {
      parentTitle.value = node.parent.node.title;
      detailParentTitle.value = node.parent.node.title;
    }
  } else {
    const parentNodes = findNodeForTreegrid(treeData.value, 'id', node.dataRef.parentId);
    if (parentNodes.length > 0) {
      parentTitle.value = parentNodes[0].title;
      parentId.value = parentNodes[0].id;
      detailParentTitle.value = parentNodes[0].title;
      detailParentId.value = parentNodes[0].id;
    }
  }
}
/** 树右键点击事件 */
function handleRightClick({ node }) {
  // 右键操作节点设置为当前节点
  currentSelectedNode.value = node;
}
/** 树右键菜单点击事件 */
function handleContextMenuClick(node, menuKey) {
  parentId.value = '';
  parentTitle.value = '';
  selectMenuKey.value = menuKey;
  // 右键操作时定位树选择节点
  selectNode([node.id], { node: { dataRef: node } }, 'none');
  const selectNodeData = currentSelectedNode.value;
  if (menuKey == '1') {
    // 添加平级节点
    parentId.value = selectNodeData.parentId;
    parentTitle.value = selectNodeData.parent.node.title;
    showAddNodeModal.value = true;
  } else if (menuKey == '2') {
    // 添加子节点
    parentId.value = selectNodeData.id;
    parentTitle.value = selectNodeData.title;
    showAddNodeModal.value = true;
  } else if (menuKey == '3') {
    // 编辑节点
    parentId.value = selectNodeData.parentId;
    if (parentId.value == defaultRootParentId.value) {
      parentTitle.value = '根节点无需修改';
    } else {
      parentTitle.value = currentSelectedNode.value.parent.node.title;
    }
    nodeId.value = selectNodeData.id;
    showEditNodeModal.value = true;
  } else if (menuKey == '4') {
    // 删除节点
    if (selectNodeData.parentId == '-1') {
      proxy.$message.warning('当前选中节点为根节点，不允许删除！');
      return;
    }
    if (
      selectNodeData.isLeaf &&
      (selectNodeData.children == null || selectNodeData.children.length == 0)
    ) {
      handleDelete();
    } else {
      proxy.$message.warning('当前选中节点含有子节点，请先删除子节点！');
    }
  }
}
/** 获取右键按钮显隐 */
function getContextMenuVisiable(dataRef, menuKey) {
  if (dataRef.parentId == defaultRootParentId.value && menuKey == '1') {
    return false;
  } else {
    return true;
  }
}
/** 添加成功回调方法 */
function afterAddTreeNode(data) {
  if (selectMenuKey.value == '1') {
    // 添加同级
    const dataRef = currentSelectedNode.value.dataRef;
    if (dataRef.id != data.parentId) {
      // 添加同级时重新选择了父节点，这里刷新数据
      getTreeList();
    } else {
      addSameNode(currentSelectedNode.value, data);
    }
  } else if (selectMenuKey.value == '2') {
    // 添加子级
    const dataRef = currentSelectedNode.value.dataRef;
    if (dataRef.id != data.parentId) {
      // 添加子节点时重新选择了父节点，这里刷新数据
      getTreeList();
    } else {
      addSubNode(currentSelectedNode.value, data, expandedKeys.value);
    }
  }
  selectNode([data.id], { node: { dataRef: data } }, 'none');
}
/** 编辑成功回调方法 */
function afterEditTreeNode(data) {
  if (currentSelectedNode.value.dataRef.parentId != data.parentId) {
    // 修改时如果更改了父节点id，需要刷新树
    getTreeList();
  } else {
    currentSelectedNode.value.dataRef.title = data.title;
    // 节点编辑成功后重新加载右侧详细区数据
    demoTreeDetailRef.value.reloadDetail();
  }
}
/** 树节点删除方法 */
function handleDelete() {
  const selectNodeData = currentSelectedNode.value.dataRef;
  proxy.$confirm({
    title: '确认要删除已选数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      if (selectNodeData.id) {
        delDemoTree(selectNodeData.id)
          .then(res => {
            if (res.success) {
              proxy.$message.success('删除成功！');
              // 前端移除节点
              const currentParentNode = deleteNode(currentSelectedNode.value);
              // 定位到删除节点父节点
              selectNode(
                [selectNodeData.parentId],
                {
                  node: { dataRef: currentParentNode.value }
                },
                'none'
              );
            }
          })
          .catch(() => {});
      }
    }
  });
}
</script>
