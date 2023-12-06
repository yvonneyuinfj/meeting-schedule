<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="大类编码">
              <a-input
                v-model:value="queryForm.classCode"
                placeholder="请输入大类编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="大类名称">
              <a-input
                v-model:value="queryForm.className"
                placeholder="请输入大类名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="大类类型">
              <a-input
                v-model:value="queryForm.classType"
                placeholder="请输入大类类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="层级编码">
              <a-input
                v-model:value="queryForm.levelClassCode"
                placeholder="请输入层级编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料大类树状索引">
              <a-input
                v-model:value="queryForm.classIndexTreeNo"
                placeholder="请输入物料大类树状索引"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否有效">
              <a-input
                v-model:value="queryForm.validFlag"
                placeholder="请输入是否有效"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="大类说明">
              <a-input
                v-model:value="queryForm.classDesc"
                placeholder="请输入大类说明"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否带小编号标识">
              <a-input
                v-model:value="queryForm.ynItemSerialNo"
                placeholder="请输入是否带小编号标识"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否检验标识">
              <a-input
                v-model:value="queryForm.ynCheck"
                placeholder="请输入是否检验标识"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否关联工序配套目录标识">
              <a-input
                v-model:value="queryForm.ynRelSeqCatalog"
                placeholder="请输入是否关联工序配套目录标识"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="别称">
              <a-input
                v-model:value="queryForm.classAlias"
                placeholder="请输入别称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
              >
                <a-select-option
                  v-for="item in secretLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined />
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined />
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced" />
                  <down-outlined v-else />
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
          ref="mdsItemClass"
          table-key="mdsItemClass"
          :columns="columns"
          :row-key="record => record.id"
          :data-source="list"
          :loading="loading"
          :pageParameter="queryParam.pageParameter"
          :total="totalPage"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              type="primary"
              title="添加"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入大类编码"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'classCode'">
            <a @click="handleDetail(record)">
              {{ record.classCode }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record)">
              编辑
            </a-button>
            <a-button
              v-hasPermi="['mdsItemClass:del']"
              v-if="record.treeLeaf == 'Y'"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete(record)">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>

    <!-- 添加页面弹窗 -->
    <MdsItemClassAdd
      v-if="showAddModal"
      ref="addModal"
      :default-tree-level="treeLevel"
      :parent-id="props.formId"
      :parent-title="props.parentTitle"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <MdsItemClassEdit
      v-if="showEditModal"
      ref="editModal"
      :parent-id="parentNodeId"
      :parent-title="props.parentTitle"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <MdsItemClassDetail
      v-if="showDetailModal"
      ref="detailModal"
      :parent-id="props.formId"
      :parent-title="props.parentTitle"
      :form-id="formId"
      @close="showDetailModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { MdsItemClassDto } from '@/api/avic/mms/mds/MdsItemClassApi'; // 引入模块DTO
import { listMdsItemClassByParentIDPage, delMdsItemClass } from '@/api/avic/mms/mds/MdsItemClassApi'; // 引入模块API
import MdsItemClassAdd from './MdsItemClassAdd.vue'; // 引入添加页面组件
import MdsItemClassEdit from './MdsItemClassEdit.vue'; // 引入编辑页面组件
import MdsItemClassDetail from './MdsItemClassDetail.vue'; // 引入详情页面组件
const { proxy } = getCurrentInstance();
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  parentId: {
    type: String,
    default: ''
  },
  parentTitle: {
    type: String,
    default: ''
  }
});
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '大类编码',
    dataIndex: 'classCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '大类名称',
    dataIndex: 'className',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '大类类型',
    dataIndex: 'classType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '排序序号内部排序序号',
    dataIndex: 'innerOrder',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '层级编码',
    dataIndex: 'levelClassCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料大类树状索引',
    dataIndex: 'classIndexTreeNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否有效',
    dataIndex: 'validFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '大类说明',
    dataIndex: 'classDesc',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否带小编号标识',
    dataIndex: 'ynItemSerialNoName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否检验标识',
    dataIndex: 'ynCheckName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否关联工序配套目录标识',
    dataIndex: 'ynRelSeqCatalogName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '别称',
    dataIndex: 'classAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 150,
    fixed: 'right'
  }
];
const queryForm = ref<MdsItemClassDto>({
  parentClassId: props.parentId
}); // 高级查询对象
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const loading = ref(false);
const expandedRowKeys = ref([]); // 展开数据集合
const parentNodeId = ref(''); // 添加节点的初始父节点
const treeLevel = ref(1);
const secretLevelList = ref([]); // 密级通用代码
const totalPage = ref(0);

onMounted(() => {
  if (props.parentId) {
    // 加载表格数据
    getList();
  }
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 加载树表格数据  */
function getList() {
  loading.value = true;
  list.value = [];
  expandedRowKeys.value = [];
  queryForm.value.parentClassId = props.formId;
  queryParam.searchParams = queryForm.value;
  listMdsItemClassByParentIDPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      console.error('获取根节点失败！');
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑  */
function handleKeyWordQuery(value) {
  const keyWord = {
    classCode: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  console.log(props);

  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(row) {
  // 编辑节点
  parentNodeId.value = row.parentClassId;
  formId.value = row.id;
  showEditModal.value = true;
}
/** 详情 */
function handleDetail(row) {
  parentNodeId.value = row.parentClassId;
  formId.value = row.id;
  showDetailModal.value = true;
}
/** 删除 */
function handleDelete(treeNode) {
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      delMdsItemClass(treeNode.id)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！'); // 提示成功
          }
          loading.value = false;
        })
        .catch((error) => {
          proxy.$message.warning(error.message);
          loading.value = false;
        });
    }
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

watch(
  () => props.formId,
  newVal => {
    if (newVal) {
      if (props.parentId) {
        getList();
      }
    }
  },
  { immediate: true }
);
defineExpose({
  getList
});
</script>
