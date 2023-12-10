<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="事务处理流水号 ">
              <a-input
                v-model:value="queryForm.transactionCode"
                placeholder="请输入事务处理流水号 "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料编码">
              <a-input
                v-model:value="queryForm.mdsItemCode"
                placeholder="请输入物料编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料名称">
              <a-input
                v-model:value="queryForm.mdsItemName"
                placeholder="请输入物料名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
<!--          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术条件">
              <a-input
                v-model:value="queryForm.techCondition"
                placeholder="请输入技术条件"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
<!--          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供货状态">
              <a-input
                v-model:value="queryForm.deliveryStatus"
                placeholder="请输入供货状态"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房名称">
              <a-input
                v-model:value="queryForm.mdsInventoryId"
                placeholder="请输入库房名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库位名称 ">
              <a-input
                v-model:value="queryForm.mdsLocatorId"
                placeholder="请输入库位名称 "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务类型">
              <a-input
                v-model:value="queryForm.mdsInventoryTransactionId"
                placeholder="请输入事务类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
<!--          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理数量 ">
              <a-input
                v-model:value="queryForm.transactionQty"
                placeholder="请输入事务处理数量 "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理人">
              <AvicCommonSelect
                v-model:value="queryForm.transactionUserId"
                type="userSelect"
                placeholder="请选择事务处理人"
                :defaultShowValue="queryForm.transactionUserIdAlias"
                @callback="
                  result => {
                    queryForm.transactionUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理日期 (起)">
              <a-date-picker
                v-model:value="queryForm.transactionDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择事务处理日期 (起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.transactionDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理日期 (止)">
              <a-date-picker
                v-model:value="queryForm.transactionDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择事务处理日期 (止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.transactionDateBegin)"
              />
            </a-form-item>
          </a-col>
<!--          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计量单位 ">
              <a-input
                v-model:value="queryForm.mdsUnitId"
                placeholder="请输入计量单位 "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="事务处理部门">
              <AvicCommonSelect
                v-model:value="queryForm.transactionDeptId"
                type="deptSelect"
                placeholder="请选择事务处理部门"
                :defaultShowValue="queryForm.transactionDeptIdAlias"
                @callback="
                  result => {
                    queryForm.transactionDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="操作类型">
              <a-select
                v-model:value="queryForm.mdsInvOperationType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择操作类型"
              >
                <a-select-option
                  v-for="item in mdsInvOperationTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="图号/型号">
              <a-input
                v-model:value="queryForm.drawingNo"
                placeholder="请输入图号/型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供应商批次号">
              <a-input
                v-model:value="queryForm.supplierBatchNumber"
                placeholder="请输入供应商批次号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发动机型号">
              <a-input
                v-model:value="queryForm.engineModel"
                placeholder="请输入发动机型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发动机台份">
              <a-input
                v-model:value="queryForm.engineQuantity"
                placeholder="请输入发动机台份"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="装配/分解次数">
              <a-input
                v-model:value="queryForm.assemblyDisassembly"
                placeholder="请输入装配/分解次数"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
<!--          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检验单编号">
              <a-input
                v-model:value="queryForm.inspectionFormNumber"
                placeholder="请输入检验单编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
<!--          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="领用依据">
              <a-input
                v-model:value="queryForm.usageBasis"
                placeholder="请输入领用依据"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="用途">
              <a-input
                v-model:value="queryForm.useTo"
                placeholder="请输入用途"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="处置方式">
              <a-input
                v-model:value="queryForm.disposalMethod"
                placeholder="请输入处置方式"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
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
        ref="wmsItemTransaction"
        table-key="wmsItemTransaction"
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
            <a-button
              v-hasPermi="['wmsItemTransaction:add']"
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
              v-hasPermi="['wmsItemTransaction:del']"
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
              v-hasPermi="['wmsItemTransaction:import']"
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
              v-hasPermi="['wmsItemTransaction:export']"
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
            placeholder="请输入"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'transactionCode'">
            <a @click="handleDetail(record)">
              {{ record.transactionCode }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button
              v-hasPermi="['wmsItemTransaction:del']"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <wms-item-transaction-add
      v-if="showAddModal"
      ref="addModal"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <wms-item-transaction-edit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <wms-item-transaction-detail
      v-if="showDetailModal"
      ref="detailModal"
      :form-id="formId"
      @close="showDetailModal = false"
    />
    <AvicExcelImport
      v-if="showImportModal"
      :formData="excelParams"
      title="单表模板导入"
      importUrl="/mms/wms/wmsitemtransactions/importData/v1"
      downloadTemplateUrl="/mms/wms/wmsitemtransactions/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { WmsItemTransactionDto } from '@/api/avic/mms/wms/WmsItemTransactionApi'; // 引入模块DTO
import { listWmsItemTransactionByPage, delWmsItemTransaction, exportExcel } from '@/api/avic/mms/wms/WmsItemTransactionApi'; // 引入模块API
import WmsItemTransactionAdd from './WmsItemTransactionAdd.vue'; // 引入添加页面组件
import WmsItemTransactionEdit from './WmsItemTransactionEdit.vue'; // 引入编辑页面组件
import WmsItemTransactionDetail from './WmsItemTransactionDetail.vue'; // 引入详情页面组件
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
    title: '事务处理流水号 ',
    dataIndex: 'transactionCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '技术条件',
    dataIndex: 'techCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供货状态',
    dataIndex: 'deliveryStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房名称',
    dataIndex: 'mdsInventoryId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库位名称 ',
    dataIndex: 'mdsLocatorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务类型',
    dataIndex: 'mdsInventoryTransactionId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理数量 ',
    dataIndex: 'transactionQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理人',
    dataIndex: 'transactionUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理日期 ',
    dataIndex: 'transactionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计量单位 ',
    dataIndex: 'mdsUnitId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '事务处理部门',
    dataIndex: 'transactionDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作类型',
    dataIndex: 'mdsInvOperationTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '图号/型号',
    dataIndex: 'drawingNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商批次号',
    dataIndex: 'supplierBatchNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发动机型号',
    dataIndex: 'engineModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发动机台份',
    dataIndex: 'engineQuantity',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '装配/分解次数',
    dataIndex: 'assemblyDisassembly',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验单编号',
    dataIndex: 'inspectionFormNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '领用依据',
    dataIndex: 'usageBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '用途',
    dataIndex: 'useTo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '处置方式',
    dataIndex: 'disposalMethod',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<WmsItemTransactionDto>({});
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
const excelParams = ref({ tableName: 'wmsItemTransaction' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const lookupParams = [
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
});

/** 查询数据  */
function getList () {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listWmsItemTransactionByPage(queryParam)
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
function getLookupList () {
  proxy.$getLookupByType(lookupParams, result => {
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery () {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery () {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced () {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery (value) {
  const keyWord = {
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd () {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit (id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详细 */
function handleDetail (record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 导入 */
function handleImport () {
  showImportModal.value = true;
}
/** 导出 */
function handleExport () {
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
function handleDelete (ids, type) {
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
      delWmsItemTransaction(ids)
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
function onSelectChange (rowKeys) {
  selectedRowKeys.value = rowKeys;
}
/** 表格排序 */
function handleTableChange (pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

</script>

