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
            @click="handleDelete(selectedRowKeys, false)"
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
          placeholder="请输入群组名称"
          :allow-clear="true"
          @search="handleKeyWordQuery"
        />
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'id'">
          {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
        </template>
        <template v-else-if="column.key === 'sysSetUser'">
          <div :title="record['sysSetUserAlias']">{{ userStore.currentUser.realname }}</div>
        </template>
        <template v-else-if="column.key === 'sysUserId'">
          <div :title="record['sysUserIdAlias']" class="sysUserId">
            <span class="sysUserIdContent">{{ record['sysUserIdAlias'] }}</span>
            <a-tag
              color="blue"
              ghost
              size="small"
              style="float: right"
              @click="handleMaintain(record, 'sysUser')"
              v-if="record.sysUserCount != 0"
            >
              共{{ record.sysUserCount }}人
            </a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'sharedUserId'">
          <div :title="record['sharedUserName']" class="sysUserName">
            <span class="sysUserNameContent">{{ record['sharedUserName'] }}</span>
            <a-tag
              color="blue"
              ghost
              size="small"
              style="float: right"
              v-if="record.sharedUserCount != 0"
              @click="handleMaintain(record, 'sharedUser')"
            >
              共{{ record.sharedUserCount }}人
            </a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
            编辑
          </a-button>
          <a-button
            type="link"
            class="inner-btn"
            @click.stop="handleDelete([record.id], record.isShared)"
          >
            删除
          </a-button>
        </template>
      </template>
    </AvicTable>
    <PersonGroupManageAdd
      v-if="showAddModal"
      ref="addModal"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <PersonGroupManageEdit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <PersonGroupUser
      v-if="showUserModal"
      ref="userModal"
      :form-id="formId"
      :params="params"
      @reloadData="getList"
      @close="showUserModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import PersonGroupManageAdd from './PersonGroupManageAdd.vue';
import PersonGroupManageEdit from './PersonGroupManageEdit.vue';
import PersonGroupUser from './PersonGroupUser.vue';
import { useUserStore } from '@/store/user';
import {
  deletePersonalGroupList,
  getPersonalGroupListByPage
} from '@/api/avic/system/UserSettingApi';
const { proxy }: any = getCurrentInstance();
const userStore = useUserStore();
const data = reactive({
  list: [], //表格数据集合
  initialList: [], // 记录每次刷新得到的表格的数据
  selectedRowKeys: [], //选中数据主键集合
  selectedRows: [], //选中行集合
  loading: false, // 表格loading状态
  saveLoading: false, // 统一保存按钮loading 状态
  delLoading: false, // 删除按钮loading状态
  totalPage: 0, // 总数据条数
  editable: false,
  formatArrayKeys: [], // 多选控件的值需要格式化数据
  editingId: '', // 正在编辑中的数据
  showAddModal: false, // 是否展示添加弹窗
  showEditModal: false, // 是否展示编辑弹窗
  showUserModal: false, // 当前行数据id
  formId: '',
  params: {} // 群组成员/分享成员参数
});
let {
  list,
  selectedRowKeys,
  selectedRows,
  loading,
  delLoading,
  totalPage,
  showAddModal,
  showEditModal,
  showUserModal,
  formId,
  params
} = toRefs(data);

const queryParam = reactive({
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {},
  keyWord: '' // 快速查询数据
});

const columns = [
  {
    title: '序号',
    ellipsis: true,
    width: 56,
    align: 'center',
    key: 'id',
    fixed: 'left'
  },
  {
    title: '群组名称',
    dataIndex: 'sysGroupName',
    key: 'sysGroupName',
    width: 120,
    ellipsis: true
  },
  {
    title: '群组描述',
    dataIndex: 'sysGroupDesc',
    key: 'sysGroupDesc',
    width: 200,
    ellipsis: true
  },
  {
    title: '排序',
    dataIndex: 'orderBy',
    key: 'orderBy',
    width: 50,
    align: 'center'
  },
  {
    title: '群组成员',
    dataIndex: 'sysUserId',
    key: 'sysUserId',
    ellipsis: true,
    width: 200
  },
  {
    title: '分享成员',
    ellipsis: true,
    dataIndex: 'sharedUserId',
    key: 'sharedUserId',
    width: 200
  },
  {
    title: '群组创建人',
    dataIndex: 'createdUserName',
    key: 'createdUserName',
    align: 'center',
    width: 120
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    key: 'action',
    fixed: 'right'
  }
];

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  getPersonalGroupListByPage(queryParam)
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
    sysGroupName: value,
    sysUserId: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 选择群组成员 */
function handleMaintain(record, e) {
  formId.value = record.id;
  params.value = {
    type: e,
    isShared: record.isShared
  };
  showUserModal.value = true;
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys, _selectedRows) {
  selectedRowKeys.value = _selectedRowKeys;
  selectedRows.value = _selectedRows;
}
/** 表头排序 */
function handleTableChange(pagination) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  getList();
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
    selectedRows.value.push(record);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
    selectedRows.value = selectedRows.value.filter(item => item.id != record.id);
  }
}
/** 删除 */
function handleDelete(id, shared) {
  if (id.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  const item = selectedRows.value.some(item => {
    return item.isShared === 'true';
  });
  if ((shared && shared === 'true') || (item && !shared)) {
    proxy.$message.warning('不允许删除分享群组！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      deletePersonalGroupList(id)
        .then((res: any) => {
          if (res.success) {
            proxy.$message.success('删除成功！');
          }
          getList();
          delLoading.value = false;
        })
        .catch(() => {
          delLoading.value = false;
        });
    }
  });
}
</script>
<style lang="less" scoped>
.sysUserName,
.sysUserId {
  display: flex;
  justify-content: space-between;
  :deep(.ant-tag) {
    cursor: pointer;
  }
  .sysUserIdContent,
  .sysUserNameContent {
    display: block;
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
