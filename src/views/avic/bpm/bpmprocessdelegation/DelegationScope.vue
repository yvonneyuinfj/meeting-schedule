<template>
  <AvicModal
    :visible="true"
    title="流程业务目录"
    width="960px"
    height="520px"
    wrap-class-name="table-modal-wrap"
    :body-style="{ padding: '0' }"
    :adjust-size="true"
    :centered="true"
    :destroy-on-close="true"
    :mask-close-able="false"
    @cancel="closeModal"
  >
    <template v-slot:footer>
      <a-button title="关闭" @click="closeModal">关闭</a-button>
      <a-button title="确定" type="primary" :loading="loading" @click="handleEnsure">确定</a-button>
    </template>
    <AvicSplit>
      <AvicPane size="250px">
        <div class="tree_content">
          <div class="surface-search">
            <a-input-search
              :allow-clear="true"
              placeholder="请输入名称搜索"
              @search="handleSearchTree"
            />
          </div>
          <div class="tree_box">
            <a-spin :spinning="loading">
              <a-tree
                v-if="treeData && treeData.length > 0"
                :tree-data="treeData"
                v-model:expandedKeys="expandedKeys"
                v-model:selectedKeys="selectedKeys"
                :default-expand-all="true"
                @expand="onExpand"
                @select="selectNode"
                :show-icon="true"
                :show-line="true && { showLeafIcon: false }"
              >
                <template v-slot:title="node">
                  {{
                    node.nodeType == 'process' && node.attributes.version
                      ? node.title + '-V' + node.attributes.version
                      : node.title
                  }}
                </template>
                <template v-slot:icon="node">
                  <!--跟节点图标 -->
                  <avic-icon
                    svg="avic-server-fill"
                    v-if="node.id == defaultParentId"
                    style="color: #1f76cb"
                  />
                  <!--分类图标 -->
                  <avic-icon
                    svg="avic-folder-open-fill"
                    v-else-if="node.nodeType == 'dynamicClassic'"
                    style="color: #ffb800"
                  />
                  <!--应用图标 -->
                  <avic-icon
                    svg="avic-folder-open-fill"
                    v-else-if="node.nodeType == 'dynamicApp'"
                    style="color: #ffb800"
                  />
                  <!--应用分组图标 -->
                  <avic-icon
                    svg="avic-folder-open-fill"
                    v-else-if="node.nodeType == 'dynamicType'"
                    style="color: #ffb800"
                  />
                  <!-- 流程图标 -->
                  <avic-icon
                    svg="avic-git-pull-request-fill"
                    v-else-if="node.nodeType == 'process'"
                    style="color: #0fc6c2"
                  />
                </template>
              </a-tree>
            </a-spin>
          </div>
        </div>
      </AvicPane>
      <AvicPane>
        <AvicSplit>
          <AvicPane size="50">
            <a-list :data-source="modelList" class="my-list">
              <template #header>
                <div class="my-list-title">候选流程</div>
              </template>
              <template #renderItem="{ item }">
                <a-list-item class="my-list-item" @click="selectModel(item)">
                  {{ item.name }}
                </a-list-item>
              </template>
            </a-list>
          </AvicPane>
          <AvicPane>
            <a-list :data-source="selectedModelList" class="my-list">
              <template #header>
                <div class="my-list-title">
                  已选流程
                  <avic-icon
                    svg="avic-close-fill"
                    style="float: right; cursor: pointer"
                    @click="deleteAll"
                  />
                </div>
              </template>
              <template #renderItem="{ item }">
                <a-list-item class="my-list-item">
                  {{ item.name }}
                  <avic-icon svg="avic-close-fill" class="my-close" @click="deleteFlow(item)" />
                </a-list-item>
              </template>
            </a-list>
          </AvicPane>
        </AvicSplit>
      </AvicPane>
    </AvicSplit>
  </AvicModal>
</template>
<script lang="ts" setup>
import { getAllExpandedKeys, getExpandedKeys, setNodeSlots } from '@/utils/tree-util';
import {
  getBpmModelsByParentId,
  getClassicAppTreeData,
  searchClassicAppTreeData
} from '@/api/avic/bpm/BpmProcessDelegationApi';

const props = defineProps({
  parentItem: {
    type: Object,
    default: null
  }
});
const emit = defineEmits(['close', 'sendSelectedFlow']);
const { proxy } = getCurrentInstance();
const data = reactive({
  treeData: null,
  expandedKeys: [],
  selectedKeys: [],
  loading: false,
  searchText: '',
  filteredData: [], // 关键字搜索后的树数据
  autoExpandParent: false,
  treeNodeData: [], //保存树列表的数据
  searchSelectedNode: {},
  defaultParentId: 'root', //树节点默认最高级id
  modelList: [],
  selectedModelList: [],
  nodeType: '',
  nodeId: ''
});

let {
  treeData,
  expandedKeys,
  selectedKeys,
  loading,
  defaultParentId,
  modelList,
  selectedModelList,
  nodeType,
  nodeId
} = toRefs(data);

onMounted(() => {
  initModel();
  getTreeList();
});

function initModel() {
  // 根据初始带过来的值,渲染已选流程数据
  console.log(props.parentItem, '---');

  if (props.parentItem.modelId !== '') {
    let modelIdsArr = props.parentItem.modelId.split(',');
    let modelNamesArr = props.parentItem.modelName.split(',');
    let workHandTypsArr = props.parentItem.workHandType.split(',');
    let modelArr = [];
    for (let i = 0; i < modelIdsArr.length; i++) {
      modelArr.push({
        key: modelIdsArr[i],
        name: modelNamesArr[i],
        modelType: workHandTypsArr[i]
      });
    }
    selectedModelList.value = modelArr;
  }
}
/**
 * 树选中事件
 */
function selectNode(selectedKeys, { node }) {
  selectedKeys.value = selectedKeys;
  nodeType.value = node.dataRef.nodeType;
  if (nodeType.value == 'process') {
    nodeId.value = node.dataRef.attributes?.pdid;
  } else {
    nodeId.value = node.dataRef.id;
  }
  // 添加节点目录
  let muluData = [];
  // 获取节点下的流程列表
  let flowData = [];
  getBpmModelsByParentId({
    nodeId: nodeId.value,
    nodeType: nodeType.value
  }).then((res: any) => {
    if (res.success) {
      // 渲染候选流程
      for (let i = 0; i < res.data.length; i++) {
        flowData.push({
          key: res.data[i].key,
          name: res.data[i].name,
          modelType: '1'
        });
      }
      modelList.value = [...muluData, ...flowData];
    }
  });
}
function onExpand(expandedKeys) {
  expandedKeys.value = expandedKeys;
}
function getTreeList() {
  loading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  expandedKeys.value = [];
  getClassicAppTreeData().then((response: any) => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    treeData.value = response.data;
    loading.value = false;
  });
}

/**
 * 树节点查询
 * @param {Object} value
 * @param {Object} e
 */
function handleSearchTree(value) {
  if (value.trim() === '') {
    getTreeList();
  } else {
    const searchText = { searchTxt: value };
    loading.value = true;
    treeData.value = [];
    expandedKeys.value = [];
    searchClassicAppTreeData(searchText).then((response: any) => {
      setNodeSlots(response.data);
      getAllExpandedKeys(response.data, expandedKeys.value);
      treeData.value = response.data;
      loading.value = false;
    });
  }
  Object.assign(
    {},
    {
      expandedKeys: expandedKeys.value,
      searchValue: value
    }
  );
}
/**
 * 当前弹窗关闭事件
 */
function closeModal() {
  emit('close');
}
/**
 * 点击候选流程拿到数据渲染已选流程模板选择流程模板
 */
function selectModel(item) {
  // 不可重复添加
  for (let i = 0; i < selectedModelList.value.length; i++) {
    if (selectedModelList.value[i].key === item.key) {
      proxy.$message.warning('已添加该条记录');
      return;
    }
  }
  selectedModelList.value.push(item);
}
/**
 * 删除当前已选流程
 */
function deleteFlow(item) {
  selectedModelList.value = selectedModelList.value.filter(i => i.key !== item.key);
}
/**
 * 删除所有已选流程
 */
function deleteAll() {
  selectedModelList.value = [];
}
/**
 * 点击确定事件
 */
function handleEnsure() {
  //  将数据传回
  let modelIdsArr = [];
  let modelNamesArr = [];
  let modelTypeArr = [];
  selectedModelList.value.forEach(item => {
    modelIdsArr.push(item.key);
    modelNamesArr.push(item.name);
    modelTypeArr.push(item.modelType);
  });
  emit('sendSelectedFlow', {
    id: props.parentItem.id,
    data: {
      modelIds: modelIdsArr.join(','),
      modelNames: modelNamesArr.join(','),
      modelType: modelTypeArr.join(',')
    }
  });
  // 关闭弹窗
  closeModal();
}
</script>
<style lang="less" scoped>
.delegation-scope-modal .ant-modal-body {
  padding: 0;
}
.my-list-title {
  font-weight: bold;
}
.my-list .my-list-item {
  position: relative;
  padding: 5px 0;
  border-bottom: 1px dotted #e8e8e8;
}
.my-close {
  position: absolute;
  top: 50%;
  right: 5px;
  display: none;
  float: right;
  padding-top: 4px;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  cursor: pointer;
}
.my-list .my-list-item:hover {
  background-color: #e8e8e8;
  .my-close {
    display: inline-block;
  }
}
.avic-app-icon {
  margin: 2px;
}
.model-tree-node-action {
  float: right;
}
.avic-type-icon {
  margin: 2px;
}
.process-tree-content {
  height: 100%;
  padding-top: 10px;
}
.process-tab-content {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  overflow-y: scroll;
}
.my-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
  .ant-list-header {
    padding: 0 0 8px 0;
  }
  :deep(.ant-list-items) {
    height: 360px;
    overflow: auto;
    .my-list-item {
      padding: 4px 8px;
    }
  }
}
</style>
