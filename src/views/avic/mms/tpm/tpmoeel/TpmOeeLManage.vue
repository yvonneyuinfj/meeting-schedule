<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable ref="tpmOeeL" table-key="tpmOeeL" :columns="columns" :row-key="record => record.id"
                 :data-source="list" :loading="loading" :row-selection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: onSelectChange,
                    columnWidth: 40,
                    fixed: true
                }" :customRow="
    record => {
        return {
            onClick: () => {
                handleRowSelection(record);
            }
        };
    }
" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <a-button v-hasPermi="['tpmOeeL:add']" title="添加" type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined/>
              </template>
              添加
            </a-button>
            <a-button v-hasPermi="['tpmOeeL:del']" title="删除" danger
                      :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
                      @click="handleDelete(selectedRowKeys, '')">
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
            <a-button v-hasPermi="['tpmOeeL:import']" title="导入" type="primary" ghost @click="handleImport">
              <template #icon>
                <import-outlined/>
              </template>
              导入
            </a-button>
            <!-- <a-button v-hasPermi="['tpmOeeL:export']" title="导出" type="primary" ghost @click="handleExport">
  <template #icon>
    <export-outlined />
  </template>
  导出
</a-button> -->
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button v-hasPermi="['tpmOeeL:del']" type="link" class="inner-btn"
                      @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <tpm-oee-l-add v-if="showAddModal" ref="addModal" :mainId="mainId" :reportDate="props.reportDate"
                   @reloadData="getList"
                   @close="showAddModal = false"/>
    <!-- 编辑页面弹窗 -->
    <tpm-oee-l-edit v-if="showEditModal" ref="editModal" :mainId="mainId" :reportDate="props.reportDate"
                    :form-id="formId" @reloadData="getList"
                    @close="showEditModal = false"/>
    <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="单表模板导入"
                     importUrl="/mms/tpm/tpmoeels/importData/v1"
                     downloadTemplateUrl="/mms/tpm/tpmoeels/downloadTemplate/v1"
                     @reloadData="getList" @close="showImportModal = false"/>
  </div>
</template>
<script lang="ts" setup>
import { listTpmOeeLByPage, delTpmOeeL } from '@/api/avic/mms/tpm/TpmOeeLApi'; // 引入模块API
import TpmOeeLAdd from './TpmOeeLAdd.vue'; // 引入添加页面组件
import TpmOeeLEdit from './TpmOeeLEdit.vue'; // 引入编辑页面组件
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  reportDate: {
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
    title: '资产编号',
    dataIndex: 'assetsCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '试验任务/件号',
    dataIndex: 'testMission',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '理论试验/加工时间',
    dataIndex: 'theoreticalExperimentTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '总时间（h）',
    dataIndex: 'totalTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划停机时间（h）',
    dataIndex: 'planStopDurationTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开动时间（h）',
    dataIndex: 'workDurationTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '空闲待工时间（h）',
    dataIndex: 'freeTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '准备调整时间（h）',
    dataIndex: 'adjustTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '故障停机时间（h）',
    dataIndex: 'stopDurationTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '故障停机次数',
    dataIndex: 'stopDurationNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '平均故障间隔时间MTBF(h)',
    dataIndex: 'mtbf',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '平均故障停机时间MTTR(h)',
    dataIndex: 'mttr',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '试验成功率/合格品率',
    dataIndex: 'passRate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: 'OEE',
    dataIndex: 'oee',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
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
    width: 120,
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
    tpmOeeId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmOeeL', tpmOeeId: '' });
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码

onMounted(() => {
  //重载子表数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.tpmOeeId = props.mainId ? props.mainId : '-1';
  listTpmOeeLByPage(queryParam)
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

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
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

/* 子表删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmOeeL(ids)
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

/** 导入 */
function handleImport() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  excelParams.value.tpmOeeId = props.mainId;
  showImportModal.value = true;
}

/** 导出 */
// function handleExport() {
//     proxy.$confirm({
//         title: '确认导出数据吗?',
//         okText: '确定',
//         cancelText: '取消',
//         onOk: () => {
//             loading.value = true;
//             exportExcel(queryParam).then(() => {
//                 loading.value = false;
//                 proxy.$message.info('导出成功！');
//             });
//         }
//     });
// }
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
