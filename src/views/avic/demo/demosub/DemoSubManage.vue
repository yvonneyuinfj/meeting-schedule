<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="demoSub"
        table-key="demoSub"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button v-hasPermi="['demoSub:add']" type="primary" title="添加" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['demoSub:del']"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入项目编号或项目名称"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'projectStartDate'">
            {{ text ? proxy.$dayjs(text).format('YYYY-MM-DD') : '' }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              v-hasPermi="['demoSub:edit']"
              type="link"
              class="inner-btn"
              @click="handleEdit(record.id)"
            >
              编辑
            </a-button>
            <a-button
              v-hasPermi="['demoSub:del']"
              type="link"
              class="inner-btn"
              @click="handleDelete([record.id], 'row')"
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <DemoSubAdd
      v-if="showAddModal"
      ref="addModal"
      :mainId="mainId"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <DemoSubEdit
      v-if="showEditModal"
      ref="editModal"
      :mainId="mainId"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import { delDemoSub, listDemoSubByPage } from '@/api/avic/demo/DemoSubApi'; // 引入模块API
import DemoSubAdd from './DemoSubAdd.vue'; // 引入添加页面组件
import DemoSubEdit from './DemoSubEdit.vue'; // 引入编辑页面组件

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '项目编号',
    dataIndex: 'projectCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    sorter: true
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    sorter: true
  },
  {
    title: '项目经理',
    dataIndex: 'projectManagerAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '项目组成员',
    dataIndex: 'projectMembersAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '项目启动时间',
    dataIndex: 'projectStartDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center',
    sorter: true
  },
  {
    title: '项目所属部门',
    dataIndex: 'projectDeptAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '年度',
    dataIndex: 'projectYear',
    ellipsis: true,
    minWidth: 90,
    resizable: true,
    align: 'right',
    sorter: true
  },
  {
    title: '项目状态',
    dataIndex: 'projectStatusName',
    ellipsis: true,
    minWidth: 90,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目技术',
    dataIndex: 'projectTechsName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    width: 120,
    align: 'center',
    fixed: 'right'
  }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    projectClassId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);

onMounted(() => {
  // 加载子表数据
  getList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.projectClassId = props.mainId ? props.mainId : '-1';
  listDemoSubByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    projectCode: value,
    projectName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delDemoSub(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
            getList();
          }
          delLoading.value = false;
        })
        .catch(() => {
          delLoading.value = false;
        });
    }
  });
}
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
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
  () => props.mainId,
  newVal => {
    if (newVal) {
      getList(); // 查询表格数据
    } else {
      selectedRowKeys.value = []; // 清空选中
      selectedRows.value = [];
      list.value = [];
      totalPage.value = 0;
    }
  },
  { immediate: true }
);
</script>
