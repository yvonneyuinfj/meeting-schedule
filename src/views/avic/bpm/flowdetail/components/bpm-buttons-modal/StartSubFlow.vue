<template>
  <AvicModal
    :visible="startSubflowVisible"
    :title="getIsShowAllFlowModel ? '选择子流程模板' : '流程模板选择'"
    width="1280px"
    height="640px"
    :centered="true"
    @cancel="closeModal"
  >
    <!-- 所有的模板 -->
    <a-row style="height: 100%" v-if="getIsShowAllFlowModel">
      <a-col :span="6" style="height: 100%">
        <div class="surface">
          <div class="tree-search-title">
            <a-input-search
              v-model:value="searchText"
              allow-clear
              placeholder="请输入名称搜索"
              @search="handleSearch"
              @clear="handleSearch"
            />
          </div>
          <div class="surface-content process-tree-content">
            <a-tree
              v-if="filteredData && filteredData.length > 0"
              :tree-data="filteredData"
              :loading="treeLoading"
              v-model:selected-keys="selectedKeys"
              v-model:expandedKeys="expandedKeys"
              :show-icon="true"
              :show-line="true && { showLeafIcon: false }"
              :scoped-slots="{ title: 'action' }"
              search-class-name="view-model-tree"
              @select="selectNodeTree"
            >
              <template v-slot:title="node">
                {{
                  node.nodeType == 'process' && node.attributes.version
                    ? node.title + '-V' + node.attributes.version
                    : node.title
                }}
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
                  svg="avic-checkbox-multiple-blank-fill"
                  v-else-if="dataRef.nodeType == 'dynamicType'"
                  color="#165dff"
                />
                <avic-icon
                  svg="avic-git-pull-request-fill"
                  v-else-if="dataRef.nodeType == 'process'"
                  color="#0fc6c2"
                />
              </template>
            </a-tree>
          </div>
        </div>
      </a-col>
      <a-col :span="18" style="height: 100%">
        <div class="process-tab-content">
          <p class="process-title">
            <span></span>
            模型库
          </p>
          <a-list
            :grid="allProcessColspan"
            :bordered="false"
            :data-source="dataSource"
            :loading="loading"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <div
                  size="small"
                  :key="item.pdId"
                  @click="selectFlowModel(item.deploymentId, item.name)"
                >
                  <div class="process-model-item theme-main-hover-color">
                    <div
                      class="process-item-icon-bg"
                      :style="{ backgroundColor: colorList[Math.floor(Math.random() * 4)].fColor }"
                    >
                      <!-- <a-icon type="branches" class="process-item-icon" /> -->
                      <avic-icon svg="avic-git-branch-line" class="process-item-icon" />
                    </div>
                    <div class="process-item-content">
                      <div class="process-item-name" :title="item.name">
                        {{ item.name }}-V{{ item.version }}
                      </div>
                      <div class="process-item-type" :title="item.name">
                        {{ item.desc || '暂无描述' }}
                      </div>
                    </div>
                  </div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-col>
    </a-row>
    <!-- 配置的模板 -->
    <a-list v-else bordered :data-source="dataSource">
      <template #renderItem="{ item }">
        <a-list-item @click="selectFlowModel(item.id, item.name)">
          <a href="javascript:;">{{ item.name }}</a>
        </a-list-item>
      </template>
    </a-list>
  </AvicModal>
</template>
<script setup lang="ts">
import { getSubFlowTreeData, getModelList } from '@/api/avic/bpm/BpmSubFlowApi.js';
import { getAllExpandedKeys } from '@/utils/tree-util';
const props = defineProps({
  /** 流程实例数据 */
  bpmInstanceObject: { type: Object }
});

const startSubflowVisible = ref(false), // 弹窗modal显隐
  treeLoading = ref(false), // 流程树变量
  defaultParentId = ref('root'), // 树节点默认最高级id
  loadTreeParentId = ref('root'), // 树节点默认最高级id
  openLevel = ref(2), // 每次树展开层级
  processModel = ref([]), // 流程模型ID
  treeNodeData = ref([]), //保存树列表的数据
  selectedKeys = ref([]), //树列表选中项
  expandedKeys = ref([]), //树列表展开项
  searchText = ref(), // 搜索项目
  filteredData = ref([]), // 关键字搜索后的树数据
  loading = ref(false), // list 数据加载状态
  allProcessColspan = reactive({ gutter: 8, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 6 }),
  colorList = ref([
    { color: 'linear-gradient(180deg, #CCBBFF, #a88cff)', fColor: '#a88cff' },
    { color: 'linear-gradient(180deg, #9ec4f4, #5fa4ff)', fColor: '#5fa4ff' },
    { color: 'linear-gradient(180deg, #A1E0C2, #66CCCC)', fColor: '#66CCCC' },
    { color: 'linear-gradient(180deg, #ffc499, #ff964a)', fColor: '#ff964a' }
  ]);
let selectedNode: any = {}; //树列表选中的阶段
/**
 * 监听发起子流程弹窗显隐
 */
watch(
  () => props.bpmInstanceObject.bpmStartsubflow.startsubflowVisible,
  value => {
    startSubflowVisible.value = value;
  },
  { immediate: true }
);
/**
 * 最多选择的数量
 */
const getIsShowAllFlowModel = computed(() => {
  return props.bpmInstanceObject.bpmStartsubflow.isShowAllFlowModel;
});

/**
 * 列表数据
 */
const dataSource = computed(() => {
  if (getIsShowAllFlowModel.value) {
    let processModelList = [];
    processModel.value?.map(process => {
      let item = { ...process };
      processModelList.push(item);
    });
    return processModelList;
  } else {
    // 配置的模板
    return props.bpmInstanceObject.bpmStartsubflow.selectedFlowModelData;
  }
});

onMounted(() => {
  getTreeData();
});

/**
 * 加载流程模型
 */
function getProcessModel(id) {
  loading.value = true;
  let params = {
    nodeId: id,
    nodeType: selectedNode.nodeType
  };
  getModelList(params)
    .then(res => {
      if (res.success) {
        processModel.value = res.data;
      }
    })
    .then(() => {
      loading.value = false;
    });
}
/**
 *  加载树列表数据
 */
function getTreeData() {
  const treeParams = {
    parentId: defaultParentId.value,
    level: openLevel.value
  };
  getSubFlowTreeData({ data: treeParams }).then(res => {
    if (res.data) {
      afterLoadData(res.data);
    }
  });
}
/**
 *  加载树节点之后
 */
function afterLoadData(treeData) {
  if (treeData) {
    //设置默认选中
    if (loadTreeParentId.value == defaultParentId.value) {
      if (treeData && treeData.length > 0) {
        selectedKeys.value = [treeData[0].id];
        selectedNode = treeData[0];
        expandedKeys.value = [treeData[0].id];
        getProcessModel(selectedKeys.value[0]);
      }
    }
    treeLoading.value = false;
  }
  filteredData.value = [...treeData];
  treeNodeData.value = [...treeData];
}
/**
 *  选中树节点加载右侧表单模型数据
 */
function selectNodeTree(keys, { node }) {
  if (keys && keys.length > 0) {
    selectedKeys.value = keys;
    selectedNode = node;
    getProcessModel(keys[0]);
  } else if (keys.length == 0) {
    selectedNode = {};
    selectedKeys.value = [node.dataRef.id]; // 单击始终选中
  }
}
/**
 *  搜索树列表
 */
function handleSearch() {
  if (searchText.value && searchText.value.trim().length) {
    filteredData.value = filterByKeywords(treeNodeData.value);
    getAllExpandedKeys(filteredData.value, expandedKeys.value);
    selectedKeys.value = getSelectKey(filteredData.value);
  } else {
    filteredData.value = treeNodeData.value;
  }
}
/**
 *  根据关键词过滤数据
 */
function filterByKeywords(tree) {
  const res = [];
  if (tree && tree.length) {
    tree.map(node => {
      if (node.title.indexOf(searchText.value.trim()) !== -1) {
        res.push(node);
      } else if (node.children?.length) {
        const _children = filterByKeywords(node.children);
        if (_children.length) {
          const newNode = { ...node, children: [..._children] };
          res.push(newNode);
        }
      }
    });
  }
  return res;
}
/**
 *  根据关键词过滤key
 */
function getSelectKey(tree) {
  let res = [];
  if (tree && tree.length) {
    tree.forEach(item => {
      if (res.length === 0 && item.title.indexOf(searchText.value.trim()) !== -1) {
        res.push(item.id);
      } else {
        if (res.length === 0 && item.children?.length) {
          const newNode = getSelectKey(item.children);
          res.push(...newNode);
        }
      }
    });
  }
  return res;
}
/**
 * 点击返回、点击X关闭事件
 */
function closeModal() {
  props.bpmInstanceObject.bpmStartsubflow.closeStartsubflowModal(props.bpmInstanceObject);
}

/**
 * 点击模板跳选人
 */
function selectFlowModel(id, name) {
  props.bpmInstanceObject.bpmStartsubflow.executeUserInfo(props.bpmInstanceObject, id, name);
}
</script>
<style lang="less" scoped>
@import './style/base.less';
.surface {
  height: 100%;
  overflow-y: auto;
  .surface-content {
    margin-top: 8px;
  }
}
</style>
