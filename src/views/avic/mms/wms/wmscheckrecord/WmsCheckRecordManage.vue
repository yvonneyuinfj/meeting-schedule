<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable ref="wmsCheckRecord" table-key="wmsCheckRecord" :columns="columns" :row-key="record => record.id"
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
        <!-- <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['wmsCheckRecord:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['wmsCheckRecord:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button
              v-hasPermi="['wmsCheckRecord:import']"
              title="导入"
              type="primary"
              ghost
              @click="handleImport">
              <template #icon>
                 <import-outlined />
              </template>
              导入
            </a-button>
            <a-button
              v-hasPermi="['wmsCheckRecord:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
              <template #icon>
                 <export-outlined />
              </template>
              导出
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入原始单据ID"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template> -->
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button v-hasPermi="['wmsCheckRecord:del']" type="link" class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <wms-check-record-add v-if="showAddModal" ref="addModal" :mainId="mainId" @reloadData="getList"
      @close="showAddModal = false" />
    <!-- 编辑页面弹窗 -->
    <wms-check-record-edit v-if="showEditModal" ref="editModal" :mainId="mainId" :form-id="formId" @reloadData="getList"
      @close="showEditModal = false" />
    <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="单表模板导入"
      importUrl="/mms/wms/wmscheckrecords/importData/v1"
      downloadTemplateUrl="/mms/wms/wmscheckrecords/downloadTemplate/v1" @reloadData="getList"
      @close="showImportModal = false" />
  </div>
</template>
<script lang="ts" setup>
import { listWmsCheckRecordByPage, delWmsCheckRecord, exportExcel } from '@/api/avic/mms/wms/WmsCheckRecordApi'; // 引入模块API
import WmsCheckRecordAdd from './WmsCheckRecordAdd.vue'; // 引入添加页面组件
import WmsCheckRecordEdit from './WmsCheckRecordEdit.vue'; // 引入编辑页面组件
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
    title: '密级 ',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '送检单号',
    dataIndex: 'wmsCheckNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '送检类型',
    dataIndex: 'checkSubmitTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },

  {
    title: '单据类型',
    dataIndex: 'billSourceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '物料编码',
    dataIndex: 'mdsItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料名称',
    dataIndex: 'mdsItemName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格证编号',
    dataIndex: 'qualiticationNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '送检数量',
    dataIndex: 'checkSubmitQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  {
    title: '送检人',
    dataIndex: 'checkSubmitUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '送检部门',
    dataIndex: 'checkSubmitDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '送检日期',
    dataIndex: 'checkSubmitDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '质量编号',
    dataIndex: 'quanlityNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验结果',
    dataIndex: 'checkResult',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格数量',
    dataIndex: 'qualifiedQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '不合格数量',
    dataIndex: 'unqualifiedQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验员',
    dataIndex: 'checkOperatorName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验日期',
    dataIndex: 'checkDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    originalOrderTabName: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'wmsCheckRecord', originalOrderTabName: '' });
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const billSourceList = ref([]); // 单据类型通用代码
const checkSubmitTypeList = ref([]); // 送检类型通用代码
const checkStatusList = ref([]); // 检验状态通用代码
const secretLevelList = ref([]); // 密级 通用代码
const confineFlagList = ref([]); // 是否限用通用代码
const lookupParams = [
  { fieldName: 'billSource', lookUpType: 'WMS_BILL_SOURCE' },
  { fieldName: 'checkSubmitType', lookUpType: 'WMS_CHECK_SUBMIT_TYPE' },
  { fieldName: 'checkStatus', lookUpType: 'WMS_CHECK_STATUS' },
  { fieldName: 'confineFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
];

onMounted(() => {
  //重载子表数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.originalOrderTabName = props.mainId ? props.mainId : '-1';
  listWmsCheckRecordByPage(queryParam)
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
    billSourceList.value = result.billSource;
    checkSubmitTypeList.value = result.checkSubmitType;
    checkStatusList.value = result.checkStatus;
    confineFlagList.value = result.confineFlag;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    originalOrderDetailId: value
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
      delWmsCheckRecord(ids)
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
  excelParams.value.originalOrderTabName = props.mainId;
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
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
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
