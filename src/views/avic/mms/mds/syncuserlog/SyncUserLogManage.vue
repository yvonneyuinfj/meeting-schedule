<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="SYSLOG_USERNAME_ZH">
              <a-input
                v-model:value="queryForm.syslogUsernameZh"
                placeholder="请输入SYSLOG_USERNAME_ZH"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="SYSLOG_USERNAME">
              <a-input
                v-model:value="queryForm.syslogUsername"
                placeholder="请输入SYSLOG_USERNAME"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="SYSLOG_USERNO">
              <a-input
                v-model:value="queryForm.syslogUserno"
                placeholder="请输入SYSLOG_USERNO"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item label="操作人IP">
              <a-input v-model:value="queryForm.syslogIp" placeholder="请输入操作人IP" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="操作时间(起)">
              <a-date-picker v-model:value="queryForm.syslogTimeBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择操作时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.syslogTimeEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="操作时间(止)">
              <a-date-picker v-model:value="queryForm.syslogTimeEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择操作时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.syslogTimeBegin)" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="SYSLOG_MODULE">
              <a-input
                v-model:value="queryForm.syslogModule"
                placeholder="请输入SYSLOG_MODULE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="操作类型">
              <a-select v-model:value="queryForm.syslogOp" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择操作类型">
                <a-select-option v-for="item in syslogOpList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="日志类型">
              <a-select v-model:value="queryForm.syslogType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择日志类型">
                <a-select-option v-for="item in syslogTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="操作结果">
              <a-select v-model:value="queryForm.syslogResult"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择操作结果">
                <a-select-option v-for="item in syslogResultList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="SYSLOG_IS_GD">
              <a-input
                v-model:value="queryForm.syslogIsGd"
                placeholder="请输入SYSLOG_IS_GD"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="SYSLOG_TABLE">
              <a-input
                v-model:value="queryForm.syslogTable"
                placeholder="请输入SYSLOG_TABLE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="SYSLOG_SECRETLEVEL">
              <a-input
                v-model:value="queryForm.syslogSecretlevel"
                placeholder="请输入SYSLOG_SECRETLEVEL"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="SYSLOG_FORMID">
              <a-input
                v-model:value="queryForm.syslogFormid"
                placeholder="请输入SYSLOG_FORMID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="SYSLOG_TITLE">
              <a-input
                v-model:value="queryForm.syslogTitle"
                placeholder="请输入SYSLOG_TITLE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
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
      <AvicTable ref="syncUserLog" table-key="syncUserLog" :columns="columns" :row-key="record => record.id"
        :data-source="list" :loading="loading" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <!-- <a-button v-hasPermi="['syncUserLog:add']" title="添加" type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button> -->
            <!-- <a-button v-hasPermi="['syncUserLog:del']" title="删除" danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')">
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button> -->
            <!-- <a-button v-hasPermi="['syncUserLog:import']" title="导入" type="primary" ghost @click="handleImport">
              <template #icon>
                <import-outlined />
              </template>
              导入
            </a-button>
            <a-button v-hasPermi="['syncUserLog:export']" title="导出" type="primary" ghost @click="handleExport">
              <template #icon>
                <export-outlined />
              </template>
              导出
            </a-button> -->
          </a-space>
        </template>
        <!-- <template #toolBarRight>
          <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入SYSLOG_USERNAME或SYSLOG_IP"
            :allow-clear="true" @search="handleKeyWordQuery" />
        </template> -->
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'syslogUsernameZh'">
            <a @click="handleDetail(record)">
              {{ record.syslogUsernameZh }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <!-- <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
              编辑
            </a-button> -->
            <a-button v-hasPermi="['syncUserLog:del']" type="link" class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <sync-user-log-add v-if="showAddModal" ref="addModal" @reloadData="getList" @close="showAddModal = false" />
    <!-- 编辑页面弹窗 -->
    <sync-user-log-edit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
      @close="showEditModal = false" />
    <!-- 详情页面弹窗 -->
    <sync-user-log-detail v-if="showDetailModal" ref="detailModal" :form-id="formId" @close="showDetailModal = false" />
    <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="单表模板导入"
      importUrl="/mms/mds/syncuserlogs/importData/v1" downloadTemplateUrl="/mms/mds/syncuserlogs/downloadTemplate/v1"
      @reloadData="getList" @close="showImportModal = false" />
  </div>
</template>
<script lang="ts" setup>
import type { SyncUserLogDto } from '@/api/avic/mms/mds/SyncUserLogApi'; // 引入模块DTO
import { listSyncUserLogByPage, delSyncUserLog, exportExcel } from '@/api/avic/mms/mds/SyncUserLogApi'; // 引入模块API
import SyncUserLogAdd from './SyncUserLogAdd.vue'; // 引入添加页面组件
import SyncUserLogEdit from './SyncUserLogEdit.vue'; // 引入编辑页面组件
import SyncUserLogDetail from './SyncUserLogDetail.vue'; // 引入详情页面组件
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
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
    title: '操作人',
    dataIndex: 'syslogUsernameZh',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: 'SYSLOG_USERNAME',
  //   dataIndex: 'syslogUsername',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '操作人编码',
    dataIndex: 'syslogUserno',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作人IP',
    dataIndex: 'syslogIp',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作时间',
    dataIndex: 'syslogTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: 'SYSLOG_MODULE',
  //   dataIndex: 'syslogModule',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '操作内容',
    dataIndex: 'syslogContent',
    ellipsis: true,
    sorter: true,
    minWidth: 360,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作类型',
    dataIndex: 'syslogOpName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  // {
  //   title: 'SYSLOG_IS_GD',
  //   dataIndex: 'syslogIsGd',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '操作结果',
    dataIndex: 'syslogResultName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '日志类型',
    dataIndex: 'syslogTypeName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: 'SYSLOG_TABLE',
  //   dataIndex: 'syslogTable',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: 'SYSLOG_SECRETLEVEL',
  //   dataIndex: 'syslogSecretlevel',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: 'SYSLOG_FORMID',
  //   dataIndex: 'syslogFormid',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: 'SYSLOG_TITLE',
  //   dataIndex: 'syslogTitle',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<SyncUserLogDto>({});
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
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'syncUserLog' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const syslogResultList = ref([]); // SYSLOG_RESULT通用代码
const syslogOpList = ref([]); // SYSLOG_OP通用代码
const syslogTypeList = ref([]); // SYSLOG_TYPE通用代码
const lookupParams = [
  { fieldName: 'syslogResult', lookUpType: 'SYNC_USER_LOG_RESULT' },
  { fieldName: 'syslogOp', lookUpType: 'SYNC_USER_LOG_OP' },
  { fieldName: 'syslogType', lookUpType: 'SYNC_USER_LOG_TYPE' }
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listSyncUserLogByPage(queryParam)
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
/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    syslogResultList.value = result.syslogResult;
    syslogOpList.value = result.syslogOp;
    syslogTypeList.value = result.syslogType;
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
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    syslogUsername: value,
    syslogIp: value
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
/** 详细 */
function handleDetail(record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 导入 */
function handleImport() {
  showImportModal.value = true;
}
/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}
/** 删除 */
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
      delSyncUserLog(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
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
function onSelectChange(rowKeys) {
  selectedRowKeys.value = rowKeys;
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

</script>

