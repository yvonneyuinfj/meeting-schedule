<template>
  <AvicSplit>
    <AvicPane size="25">
      <div class="tree_box" style="height: 100%">
        <a-spin :spinning="loading">
          <a-tree
            v-if="treeData && treeData.length > 0"
            v-model:selectedKeys="selectedKeys"
            v-model:expanded-keys="expandedKeys"
            :tree-data="treeData"
            show-icon
            default-expand-all
            :blockNode="true"
            @select="onSelect"
            :show-line="true && { showLeafIcon: false }"
          >
            <template #title="{ dataRef }">
              {{
                dataRef.nodeType == 'process' && dataRef.attributes.version
                  ? dataRef.title + '-V' + dataRef.attributes.version
                  : dataRef.title
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
    </AvicPane>
    <AvicPane>
      <div class="table-wrapper">
        <AvicTable
          :columns="columns"
          :data-source="data"
          :loading="loading1"
          :showTableSetting="false"
          :row-key="record => record.dbId"
          :row-selection="{
            type: selectType != 'single' ? 'checkbox' : 'radio',
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
            columnWidth: 40,
            fixed: true
          }"
          :rowClickSelectionType="selectType != 'single' ? 'checkbox' : 'radio'"
          :pageParameter="queryParam.pageParameter"
          :total="totalPage"
          @change="handleTableChange"
          @refresh="getList"
          :paginationSimple="true"
        >
          <template #toolBarLeft>
            <a-input-search
              class="opt-btn-commonsearch"
              style="width: 200px"
              placeholder="请输入标题"
              :allow-clear="true"
              @search="searchByKeyWord"
            />
          </template>
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.key === 'id'">
              {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
            </template>
          </template>
        </AvicTable>
      </div>
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import { httpAction } from '@/api/avic/bpm/FlowUtilApi';
import { getExpandedKeys, setNodeSlots } from '@/utils/tree-util'; // 引入树公共方法
const { proxy } = getCurrentInstance();
const emit = defineEmits(['selectProcess']);
const props = defineProps({
  isMultiSelection: {
    type: Boolean,
    default: true
  }
});
const state = reactive({
  loading: false,
  loading1: false,
  treeData: [], //树数据
  data: [], //表格数据
  expandedKeys: [],
  selectedKeys: [],
  totalPage: 0,
  selectedRowKeys: [],
  columns: [
    {
      title: '序号',
      ellipsis: true,
      width: 56,
      align: 'center',
      key: 'id'
    },
    {
      title: '标题',
      ellipsis: true,
      width: 150,
      key: 'title',
      resizable: true,
      dataIndex: 'title',
      customRender(obj) {
        return obj.text ? obj.text : obj.record.procDefName ? obj.record.procDefName : '无';
      }
    },
    {
      title: '申请日期',
      dataIndex: 'startDate',
      ellipsis: true,
      sorter: true,
      resizable: true,
      key: 'startDate',
      width: 150,
      align: 'center',
      customRender: obj => {
        return obj.text ? proxy.$dateFormat(obj.text) : '';
      }
    },
    {
      title: '当前节点',
      ellipsis: true,
      align: 'center',
      key: 'activityName',
      resizable: true,
      dataIndex: 'activityName'
    },
    {
      title: '状态',
      ellipsis: true,
      key: 'businessState',
      resizable: true,
      dataIndex: 'businessState',
      sorter: true,
      align: 'center',
      customRender: obj => {
        if (obj.text == 'active') {
          return '流转中';
        } else if (obj.text == 'ended') {
          return '已完成';
        } else if (obj.text == 'start') {
          return '拟稿中';
        } else {
          return obj.text;
        }
      }
    },
    {
      title: '处理人',
      ellipsis: true,
      dataIndex: 'assigneeName',
      key: 'assigneeName',
      resizable: true
    }
  ]
});
let {
  loading,
  treeData,
  selectedRowKeys,
  expandedKeys,
  selectedKeys,
  columns,
  totalPage,
  data,
  loading1
} = toRefs(state);
let selectType = props.isMultiSelection ? 'multi' : 'single'; //multi 多选 single 单选
let queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    type: 2,
    nodeId: 'root',
    nodeType: '',
    title: '' // 搜索标题
  },
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});

onMounted(() => {
  getTreeList();
  getList();
});
//树数据
function getTreeList() {
  loading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  expandedKeys.value = [];
  expandedKeys.value = [];
  httpAction('/bpm/center/getAppAndBpmModelTreeData/v1', '', 'get').then(response => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    treeData.value = response.data;
    initRootNode();
    loading.value = false;
  });
}
// 默认选择树第一条
function initRootNode() {
  if (treeData.value != null && treeData.value.length > 0) {
    //默认选中第一个节点，并触发选中事件
    onSelect([treeData.value[0].id], {
      node: { dataRef: treeData.value[0] }
    });
  }
}
// 表格数据
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading1.value = true;
  httpAction('/bpm/center/searchHistProcessByPage/v1', queryParam, 'post').then(response => {
    data.value = response.data.rows;
    totalPage.value = response.data.records;
    loading1.value = false;
  });
}
/** 表格排序 */
function handleTableChange(pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
// 表格选择
function onSelectChange(_selectedRowKeys) {
  selectedRowKeys.value = _selectedRowKeys;
  let selectProcess = data.value.filter(item => {
    return selectedRowKeys.value.includes(item.dbId);
  });
  emit('selectProcess', selectProcess);
}
// 搜索
function searchByKeyWord(value) {
  queryParam.pageParameter.page = 1;
  queryParam.searchParams.title = value;
  getList();
}
// 树选择
function onSelect(_selectedKeys, { node }) {
  queryParam.pageParameter.page = 1;
  selectedKeys.value = _selectedKeys;
  queryParam.searchParams.nodeId = node.dataRef.id;
  queryParam.searchParams.nodeType = node.dataRef.nodeType;
  getList();
}
</script>
<style lang="less" scoped></style>
