<template>
  <AvicModal
    :visible="true"
    title="工作移交"
    width="960px"
    height="480px"
    :centered="true"
    :bodyStyle="{ padding: '0' }"
    @cancel="closeModal"
  >
    <div class="content-wrapper">
      <div class="table-wrapper">
        <AvicTable
          ref="avicTables"
          :columns="columns"
          :row-key="record => record.dbid"
          :data-source="list"
          :pageParameter="queryParam.pageParameter"
          :loading="loading"
          :showTableSetting="false"
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
          :total="totalPage"
          @change="handleTableChange"
          @refresh="getList"
        >
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.key === 'id'">
              {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
            </template>
          </template>
        </AvicTable>
      </div>
    </div>
    <template #footer>
      <a-button type="primary" @click="takeback">拿回</a-button>
      <a-button title="返回" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script setup lang="ts">
import {
  deleteWorkHandTaskPass,
  getWorkHandTaskPass
} from '@/api/avic/bpm/BpmProcessDelegationApi';
const emit = defineEmits(['close']);
const { proxy } = getCurrentInstance();
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
    title: '标题',
    dataIndex: 'taskTitle',
    ellipsis: true,
    resizable: true,
    align: 'center',
    sorter: true
  },
  {
    title: '流程名称',
    ellipsis: true,
    dataIndex: 'processDefName',
    width: 120,
    align: 'center',
    sorter: true
  },
  {
    title: '发送人',
    ellipsis: true,
    dataIndex: 'taskSendUser',
    width: 120,
    align: 'center'
  },
  {
    title: '发送部门',
    ellipsis: true,
    dataIndex: 'taskSendDept',
    width: 120,
    align: 'center'
  },
  {
    title: '处理人',
    ellipsis: true,
    dataIndex: 'assigneeName',
    align: 'center',
    width: 120
  }
];

let queryParam = reactive({
    // 请求表格数据参数
    pageParameter: {
      page: 1, // 页数
      rows: 20 // 每页条数
    },
    sidx: null, // 排序字段
    sord: null // 排序方式: desc降序 asc升序
  }),
  list = ref([]), //表格数据集合
  selectedRowKeys = ref([]), //选中数据主键集合
  loading = ref<boolean>(false), // 表格loading状态
  totalPage = ref<number>(0),
  avicTables = ref();

onMounted(() => {
  // 加载表格数据
  getList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  getWorkHandTaskPass()
    .then((response: any) => {
      list.value = response.data;
      totalPage.value = response.data.length;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
    });
}
/** 表格排序 */
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

/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys: string[]) {
  selectedRowKeys.value = _selectedRowKeys;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.dbid)) {
    // 选中
    selectedRowKeys.value.push(record.dbid);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.dbid);
  }
}
/**
 * 拿回按钮
 */
function takeback() {
  if (selectedRowKeys.value.length === 0) {
    proxy.$message.warning('请选择要拿回的记录！');
    return;
  }
  proxy.$Modal.confirm({
    title: '确认拿回所选移交待办吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      const postData = [];
      const selectData = list.value.filter(item => {
        return selectedRowKeys.value.includes(item.dbid);
      });
      for (let i = 0; i < selectData.length; i++) {
        let rowData = selectData[i];
        postData.push(
          rowData['dbid'] + '@@' + rowData['assignee'] + '@@' + rowData['processInstanceId']
        );
      }
      deleteWorkHandTaskPass(postData.join(','))
        .then((response: any) => {
          if (response.success) {
            proxy.$message.success('操作成功！');
            closeModal();
          }
        })
        .catch(() => {});
    }
  });
}
/** 返回关闭事件 */
function closeModal() {
  emit('close');
}
</script>
