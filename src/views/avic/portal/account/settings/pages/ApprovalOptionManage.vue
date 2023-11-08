<template>
  <div class="table-wrapper">
    <AvicTable
      ref="avicTable"
      :columns="columns"
      :row-key="record => record.id"
      :data-source="list"
      :loading="loading"
      :row-selection="{
        type: 'checkbox',
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }"
      :customRow="
        record => {
          return {
            onClick: () => {
              handleRowSelection(record);
            },
            onDblclick: () => {
              handleRowSelection(record);
            }
          };
        }
      "
      :pageParameter="queryParam.pageParameter"
      :total="totalPage"
      @change="handleTableChange"
      @refresh="getList"
    >
      <template #toolBarLeft>
        <a-space>
          <a-button type="primary" title="添加" @click="handleAdd">
            <template #icon>
              <plus-outlined />
            </template>
            添加
          </a-button>
          <a-button
            danger
            :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
            title="删除"
            :loading="delLoading"
            @click="handleDelete(selectedRowKeys)"
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
          placeholder="请输入审批意见或流程名称"
          title="请输入审批意见或流程名称"
          :allow-clear="true"
          @search="handleKeyWordQuery"
        />
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'id'">
          {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
        </template>
        <template v-else-if="column.key === 'processType'">
          {{ record['processType'] == '1' ? '全部' : '自定义' }}
        </template>
        <template v-else-if="column.key === 'processName'">
          <div :title="record['processName']">{{ record['processName'] }}</div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="link" class="inner-btn" @click="handleEdit(record.id)">编辑</a-button>
          <a-button type="link" class="inner-btn" @click.stop="handleDelete([record.id])">
            删除
          </a-button>
        </template>
      </template>
    </AvicTable>
  </div>
  <ApprovalOptionManageAdd
    v-if="showAddModal"
    ref="addModal"
    @reloadData="getList"
    @close="showAddModal = false"
  />
  <ApprovalOptionManageEdit
    v-if="showEditModal"
    ref="editModal"
    :form-id="formId"
    @reloadData="getList"
    @close="showEditModal = false"
  />
</template>
<script lang="ts" setup>
import ApprovalOptionManageAdd from './ApprovalOptionManageAdd.vue';
import ApprovalOptionManageEdit from './ApprovalOptionManageEdit.vue';
import {
  deleteApprovalOptionList,
  getApprovalOptionListByPage
} from '@/api/avic/system/UserSettingApi';

const { proxy }: any = getCurrentInstance();
const data = reactive({
  list: [], //表格数据集合
  initialList: [], // 记录每次刷新得到的表格的数据
  selectedRowKeys: [], //选中数据主键集合
  selectedRows: [], //选中行集合
  loading: false, // 表格loading状态
  saveLoading: false, // 统一保存按钮loading 状态
  delLoading: false, // 删除按钮loading状态
  totalPage: 0,
  editable: false,
  formatArrayKeys: [],
  editingId: '', // 正在编辑中的数据
  showAddModal: false, // 是否展示添加弹窗
  showEditModal: false, // 是否展示编辑弹窗
  formId: '' // 当前行数据id
});
let {
  list,
  totalPage,
  selectedRowKeys,
  selectedRows,
  loading,
  delLoading,
  showAddModal,
  showEditModal,
  formId
} = toRefs(data);
const columns = [
  {
    title: '序号',
    width: 56,
    align: 'center',
    key: 'id',
    fixed: 'left'
  },
  {
    title: '审批意见',
    dataIndex: 'value',
    width: 300,
    ellipsis: true,
    key: 'value'
  },
  {
    title: '类型',
    dataIndex: 'processType',
    key: 'processType',
    width: 120,
    align: 'center'
  },
  {
    title: '流程名称',
    dataIndex: 'processName',
    key: 'processName',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    fixed: 'right',
    align: 'center'
  }
];

let queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {},
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  getApprovalOptionListByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      // 查询的初始数据,保存时做比对
      data.initialList = proxy.$lodash.cloneDeep(list);
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
    });
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    processType: value,
    processName: value,
    value: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys, _selectedRows) {
  selectedRowKeys.value = _selectedRowKeys;
  selectedRows.value = _selectedRows;
}
/** 表头排序 */
function handleTableChange(pagination, filters, sorter) {
  console.log(filters);
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 删除处理逻辑*/
function handleDelete(id) {
  if (id.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  let newIdsArray = id.filter(id => id.indexOf('newLine') != -1); // 定义新添加项的id集合
  if (newIdsArray.length === 0) {
    // 选中的均为后台已保存过的数据
    proxy.$confirm({
      title: '确认要删除选择的数据吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        console.log(id);

        deleteApprovalOptionList(id)
          .then((res: any) => {
            if (res.success) {
              proxy.$message.success('删除成功！');
              updateListByDelete(id);
              getList();
            }
          })
          .finally(() => {
            delLoading.value = false;
          });
      }
    });
  } else if (newIdsArray.length === id.length) {
    // 选中的均为未保存项,前台直接删除
    proxy.$confirm({
      title: '确认要删除选择的数据吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        delLoading.value = true;
        updateListByDelete(newIdsArray);
        // 提示成功
        proxy.$message.success('删除成功！');
        delLoading.value = false;
        getList();
      }
    });
  } else if (newIdsArray.length < id.length) {
    // 选中的既有未保存的,又有保存过的,给出提示
    proxy.$warning({
      title: '请确保新增数据保存完毕！'
    });
  }
}
/** 删除操作后更新 list */
function updateListByDelete(deleteIds) {
  let newData = [...list.value];
  for (let i = 0; i < deleteIds.length; i++) {
    newData = newData.filter(item => item['id'] !== deleteIds[i]);
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  selectedRows.value = [];
  // 前台刷新表格
  list.value = newData;
}
</script>
<style lang="less" scoped>
.surface.person-group-manage {
  height: calc(100vh - 160px);
  overflow: auto;
}
</style>
