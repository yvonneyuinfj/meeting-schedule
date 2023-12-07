<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="库房代码 ">
              <a-input v-model:value="queryForm.inventoryCode" placeholder="请输入库房代码 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="库房名称">
              <a-input v-model:value="queryForm.inventoryName" placeholder="请输入库房名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="库房地点">
              <a-input v-model:value="queryForm.inventoryLocation" placeholder="请输入库房地点" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房是否有效 ">
              <a-input v-model:value="queryForm.validFlag" placeholder="请输入库房是否有效 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房所属部门ID">
              <a-input v-model:value="queryForm.inventoryDeptId" placeholder="请输入库房所属部门ID" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房所属部门编码">
              <a-input v-model:value="queryForm.inventoryDeptCode" placeholder="请输入库房所属部门编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房所属部门名称">
              <a-input v-model:value="queryForm.inventoryDeptName" placeholder="请输入库房所属部门名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="联系人ID">
              <a-input v-model:value="queryForm.contactUserId" placeholder="请输入联系人ID" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="联系人编码">
              <a-input v-model:value="queryForm.contactUserCode" placeholder="请输入联系人编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="联系人姓名">
              <a-input v-model:value="queryForm.contactUserName" placeholder="请输入联系人姓名" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="联系电话 ^">
              <a-input v-model:value="queryForm.contactTel" placeholder="请输入联系电话 ^" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注 ^">
              <a-input v-model:value="queryForm.note" placeholder="请输入备注 ^" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="业务类型">
              <a-select v-model:value="queryForm.transactionType"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择业务类型">
                <a-select-option v-for="item in transactionTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质量状态">
              <a-select v-model:value="queryForm.quanlityType"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择质量状态">
                <a-select-option v-for="item in quanlityTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select v-model:value="queryForm.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true"
                placeholder="请选择密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房所存储物料品类">
              <a-input v-model:value="queryForm.storageItemCategory" placeholder="请输入库房所存储物料品类" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
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
      <AvicTable ref="mdsInventory" table-key="mdsInventory" :columns="columns" :row-key="record => record.id"
        :data-source="list" :loading="loading" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <a-button v-hasPermi="['mdsInventory:add']" title="添加" type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button v-hasPermi="['mdsInventory:del']" title="删除" danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')">
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button v-hasPermi="['mdsInventory:import']" title="导入" type="primary" ghost @click="handleImport">
              <template #icon>
                <import-outlined />
              </template>
              导入
            </a-button>
            <a-button v-hasPermi="['mdsInventory:export']" title="导出" type="primary" ghost @click="handleExport">
              <template #icon>
                <export-outlined />
              </template>
              导出
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入库房代码或库房名称" :allow-clear="true"
            @search="handleKeyWordQuery" />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'inventoryCode'">
            <a @click="handleDetail(record)">
              {{ record.inventoryCode }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button v-hasPermi="['mdsInventory:del']" type="link" class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <mds-inventory-add v-if="showAddModal" ref="addModal" @reloadData="getList" @close="showAddModal = false" />
    <!-- 编辑页面弹窗 -->
    <mds-inventory-edit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
      @close="showEditModal = false" />
    <!-- 详情页面弹窗 -->
    <mds-inventory-detail v-if="showDetailModal" ref="detailModal" :form-id="formId" @close="showDetailModal = false" />
    <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="单表模板导入"
      importUrl="/mms/mds/mdsinventorys/importData/v1" downloadTemplateUrl="/mms/mds/mdsinventorys/downloadTemplate/v1"
      @reloadData="getList" @close="showImportModal = false" />
  </div>
</template>
<script lang="ts" setup>
import type { MdsInventoryDto } from '@/api/avic/mms/mds/MdsInventoryApi'; // 引入模块DTO
import { listMdsInventoryByPage, delMdsInventory, exportExcel } from '@/api/avic/mms/mds/MdsInventoryApi'; // 引入模块API
import MdsInventoryAdd from './MdsInventoryAdd.vue'; // 引入添加页面组件
import MdsInventoryEdit from './MdsInventoryEdit.vue'; // 引入编辑页面组件
import MdsInventoryDetail from './MdsInventoryDetail.vue'; // 引入详情页面组件
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
    title: '上级库房',
    dataIndex: 'parentMdsInventoryIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目',
    dataIndex: 'mdsProjectIdName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房代码 ',
    dataIndex: 'inventoryCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房名称',
    dataIndex: 'inventoryName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房地点',
    dataIndex: 'inventoryLocation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房类别 ',
    dataIndex: 'mdsInventoryTypeIdName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '库房是否有效 ',
    dataIndex: 'validFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '库房所属部门ID',
  //   dataIndex: 'inventoryDeptId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '库房所属部门编码',
  //   dataIndex: 'inventoryDeptCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '库房所属部门',
    dataIndex: 'inventoryDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '联系人',
  //   dataIndex: 'contactUserId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '联系人编码',
  //   dataIndex: 'contactUserCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '联系人',
    dataIndex: 'contactUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '联系电话',
    dataIndex: 'contactTel',
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
    title: '业务类型',
    dataIndex: 'transactionTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '质量状态',
    dataIndex: 'quanlityTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '区域ID',
    dataIndex: 'mdsAreaIdName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '库房所存储物料品类',
    dataIndex: 'storageItemCategory',
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
const queryForm = ref<MdsInventoryDto>({});
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
const excelParams = ref({ tableName: 'mdsInventory' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const mdsInventoryTypeIdList = ref([]); // 库房类别 通用代码
const transactionTypeList = ref([]); // 业务类型通用代码
const quanlityTypeList = ref([]); // 质量状态通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const lookupParams = [
  { fieldName: 'mdsInventoryTypeId', lookUpType: 'MDS_INVENTORY_TYPE' },
  { fieldName: 'transactionType', lookUpType: 'MDS_TRANSACTION_TYPE' },
  { fieldName: 'quanlityType', lookUpType: 'MDS_QUANLITY_TYPE' }
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listMdsInventoryByPage(queryParam)
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
    mdsInventoryTypeIdList.value = result.mdsInventoryTypeId;
    transactionTypeList.value = result.transactionType;
    quanlityTypeList.value = result.quanlityType;
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
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    inventoryCode: value,
    inventoryName: value
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
      delMdsInventory(ids)
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

