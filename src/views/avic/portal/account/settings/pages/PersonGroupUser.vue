<template>
  <AvicModal
    :visible="true"
    :title="title"
    width="880px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
    :bodyStyle="{ padding: '0 0' }"
  >
    <div class="table-wrapper">
      <AvicTable
        ref="avicTable"
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
        @refresh="init"
        size="small"
        :showTableSetting="false"
      >
        <template #toolBarLeft>
          <a-space>
            <AvicCommonSelect select-model="multi" type="userSelect" @callback="handleAdd">
              <a-button type="primary" title="添加" :disabled="disabled">
                <template #icon>
                  <plus-outlined />
                </template>
                添加
              </a-button>
            </AvicCommonSelect>
            <a-button
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              :disabled="disabled"
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
            placeholder="请输入姓名"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-if="column.key === 'orderBy'">
            {{ record.orderBy }}
          </template>
        </template>
      </AvicTable>
    </div>
    <template #footer>
      <a-button
        title="保存"
        :disabled="disabled"
        type="primary"
        :loading="loading"
        @click.stop="saveForm"
      >
        保存
      </a-button>
      <a-button title="返回" type="primary" ghost @click.stop="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import {
  getPersonalGroupMember,
  savePersonalGroupMember,
  deletePersonalGroupMember,
  getPersonalGroupSharedUser,
  savePersonalGroupShareUsers,
  deletePersonalGroupShareUser
} from '@/api/avic/system/UserSettingApi';
import { useUserStore } from '@/store/user';
const emit = defineEmits(['close', 'reloadData', 'getUnreadCount']);
const { proxy }: any = getCurrentInstance();
const userStore = useUserStore();
const props = defineProps({
  params: {
    type: Object,
    default: null
  },
  formId: {
    // 初始查询参数
    type: String,
    default: ''
  }
});

const data = reactive({
  list: [], //表格数据集合
  selectedRowKeys: [], //选中数据主键集合
  loading: false, // 表格loading状态
  delLoading: false, // 删除按钮loading状态
  totalPage: 0
});
let { list, totalPage, selectedRowKeys, loading, delLoading } = toRefs(data);
const columns = [
  {
    title: '序号',
    ellipsis: true,
    width: 56,
    align: 'center',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    minwidth: 100,
    key: 'userName'
  },
  {
    title: '登录名',
    dataIndex: 'loginName',
    key: 'loginName',
    minwidth: 100,
    align: 'center'
  },
  {
    title: '排序',
    dataIndex: 'orderBy',
    key: 'orderBy',
    width: 50,
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
  init();
});

const disabled = computed(() => {
  return props.params.isShared === 'true' ? true : false;
});

const title = computed(() => {
  return props.params.type === 'sysUser' ? '群组成员' : '分享成员';
});

function init() {
  if (props.params.type === 'sysUser') {
    getSysUser();
  } else if (props.params.type === 'sharedUser') {
    getSharedUser();
  }
}
/** 添加 */
function handleAdd(params) {
  if (params.ids && params.names) {
    const filterAddRows = [];
    const ids = params.ids.split(';');
    const names = params.names.split(';');

    if (props.params.type === 'sharedUser' && ids.includes(userStore.currentUser.id)) {
      proxy.$message.warning('不能将自建群组分享给自己！');
      return;
    }
    ids.forEach((id, i) => {
      const items = list.value.find(item => id === item.userId);
      if (!items) {
        filterAddRows.push({
          userId: id,
          userName: names[i]
        });
      }
    });
    const selectedAddRows = filterAddRows.map((e1, index) => {
      return {
        userId: e1.userId,
        userName: e1.userName,
        orderBy:
          props.params.type === 'sysUser'
            ? list.value.length + index
            : (list.value.length + index + 1) * 10
      };
    });
    if (selectedAddRows.length == 0) {
      init();
      return;
    }
    if (props.params.type === 'sysUser') {
      savePersonalGroupMember({
        selectedAddRows: selectedAddRows,
        id: props.formId
      })
        .then((res: any) => {
          if (res.code === '200') {
            init();
          }
        })
        .catch(() => {
          proxy.$message.warning('添加失败！');
        });
    } else if (props.params.type === 'sharedUser') {
      savePersonalGroupShareUsers({
        selectedAddRows: selectedAddRows,
        id: props.formId
      })
        .then(res => {
          if (res.code === '200') {
            init();
          }
        })
        .catch(() => {
          proxy.$message.warning('添加失败！');
        });
    }
  }
}
/** 关闭 */
function closeModal() {
  emit('close');
  emit('reloadData');
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys) {
  selectedRowKeys.value = _selectedRowKeys;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}
/** 查询群组成员数据  */
function getSysUser() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  getPersonalGroupMember({ queryParam: queryParam, id: props.formId })
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
    });
}
/** 查询分享成员数据  */
function getSharedUser() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  getPersonalGroupSharedUser({ queryParam: queryParam, id: props.formId })
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
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
    userName: value,
    loginName: value
  };
  queryParam.keyWord = value != '' ? JSON.stringify(keyWord) : '';
  queryParam.pageParameter.page = 1;
  init();
}
/** 表头排序 */
function handleTableChange(pagination) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  init();
}
/** 保存 */
function saveForm() {
  closeModal();
}

/** 删除处理逻辑*/
function handleDelete(ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: '确定要删除选择的数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      if (props.params.type === 'sysUser') {
        deletePersonalGroupMember({
          selectedRowKeys: selectedRowKeys.value,
          id: props.formId
        })
          .then(res => {
            if (res.success) {
              proxy.$message.success('删除成功！');
              init();
            }
          })
          .finally(() => {
            delLoading.value = false;
          })
          .catch(() => {
            proxy.$message.warning('删除失败！');
          });
      } else if (props.params.type === 'sharedUser') {
        deletePersonalGroupShareUser({
          selectedRowKeys: selectedRowKeys.value,
          id: props.formId
        })
          .then(res => {
            if (res.success) {
              proxy.$message.success('删除成功！');
              init();
            }
          })
          .finally(() => {
            delLoading.value = false;
          })
          .catch(() => {
            proxy.$message.warning('删除失败！');
          });
      }
    }
  });
}
</script>
