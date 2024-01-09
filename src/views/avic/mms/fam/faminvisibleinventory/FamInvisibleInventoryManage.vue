<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产名称">
              <a-input v-model:value="queryForm.assetName" placeholder="请输入资产名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产编号">
              <a-input v-model:value="queryForm.assetNo" placeholder="请输入资产编号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
                  <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="使用权">
              <a-input v-model:value="queryForm.usufruct" placeholder="请输入使用权" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="所有权">
              <a-input v-model:value="queryForm.ownerShip" placeholder="请输入所有权" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="软件商名称">
                      <a-input v-model:value="queryForm.softwareVendors" placeholder="请输入软件商名称" :allow-clear="true"
                        @pressEnter="handleQuery" />
                    </a-form-item>
                  </a-col>
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="是否授权">
                      <a-select v-model:value="queryForm.ynAuthorization"
                        :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                        :show-search="true" :allow-clear="true" placeholder="请选择是否授权">
                        <a-select-option v-for="item in ynAuthorizationList" :key="item.sysLookupTlId" :value="item.lookupCode">
                          {{ item.lookupName }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="实体">
              <a-input v-model:value="queryForm.entity" placeholder="请输入实体" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="使用权编号">
              <a-input v-model:value="queryForm.usufructNo" placeholder="请输入使用权编号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="原值（等于出厂原价）">
              <a-input v-model:value="queryForm.factoryPrice" placeholder="请输入原值（等于出厂原价）" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同编号">
              <a-input v-model:value="queryForm.contractNo" placeholder="请输入合同编号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同金额">
              <a-input v-model:value="queryForm.orderValue" placeholder="请输入合同金额" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="责任人">
                      <AvicCommonSelect v-model:value="queryForm.liablePersion" type="userSelect" placeholder="请选择责任人"
                        :defaultShowValue="queryForm.liablePersionAlias" @callback="
                          result => {
                            queryForm.liablePersionAlias = result.names;
                          }
                        " />
                    </a-form-item>
                  </a-col>
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="主管部门">
                      <AvicCommonSelect v-model:value="queryForm.managerDeptId" type="deptSelect" placeholder="请选择主管部门id"
                        :defaultShowValue="queryForm.managerDeptIdAlias" @callback="
                          result => {
                            queryForm.managerDeptIdAlias = result.names;
                          }
                        " />
                    </a-form-item>
                  </a-col>
                  <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="主管部门名称">
              <a-input v-model:value="queryForm.managerDeptName" placeholder="请输入主管部门名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="使用部门">
                      <AvicCommonSelect v-model:value="queryForm.useDeptId" type="deptSelect" placeholder="请选择使用部门id"
                        :defaultShowValue="queryForm.useDeptIdAlias" @callback="
                          result => {
                            queryForm.useDeptIdAlias = result.names;
                          }
                        " />
                    </a-form-item>
                  </a-col>
                  <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="使用部门名称">
              <a-input v-model:value="queryForm.useDeptName" placeholder="请输入使用部门名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="资产状态（在用，处置）">
                      <a-select v-model:value="queryForm.assetStatus" :get-popup-container="triggerNode => triggerNode.parentNode"
                        option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择资产状态（在用，处置）">
                        <a-select-option v-for="item in assetStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                          {{ item.lookupName }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="购置时间（验收审批完成时间）(起)">
                      <a-date-picker v-model:value="queryForm.purchaseTimeBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                        placeholder="请选择购置时间（验收审批完成时间）(起)"
                        :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.purchaseTimeEnd)" />
                    </a-form-item>
                  </a-col>
                  <a-col v-bind="colLayout.cols" v-show="advanced">
                    <a-form-item label="购置时间（验收审批完成时间）(止)">
                      <a-date-picker v-model:value="queryForm.purchaseTimeEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                        placeholder="请选择购置时间（验收审批完成时间）(止)"
                        :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.purchaseTimeBegin)" />
                    </a-form-item>
                  </a-col>
                  <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="数据密级">
              <a-select v-model:value="queryForm.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择数据密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
              <AvicTable ref="famInvisibleInventory" table-key="famInvisibleInventory" :columns="columns"
                :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
                  selectedRowKeys: selectedRowKeys,
                  onChange: onSelectChange,
                  columnWidth: 40,
                  fixed: true
                }" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
                <template #toolBarLeft  v-if="!isAdd">
                  <a-space>
                    <!-- <a-button
              v-hasPermi="['famInvisibleInventory:add']"
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
              v-hasPermi="['famInvisibleInventory:del']"
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
            </a-button> -->
                    <a-button v-hasPermi="['famInvisibleInventory:import']" title="导入" type="primary" ghost @click="handleImport">
                      <template #icon>
                        <import-outlined />
                      </template>
                      导入
                    </a-button>
                    <a-button v-hasPermi="['famInvisibleInventory:export']" title="导出" type="primary" ghost @click="handleExport">
                      <template #icon>
                        <export-outlined />
                      </template>
                      导出
                    </a-button>
                        <a-button
                              title="同步浪潮折旧信息"
                              type="primary"
                          >
                            <template #icon>
                              <import-outlined/>
                            </template>
                            同步浪潮折旧信息
                      </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入资产名称或资产编号" :allow-clear="true"
            @search="handleKeyWordQuery" />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'assetName'">
            <a @click="handleDetail(record)">
              {{ record.assetName }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button v-hasPermi="['famInvisibleInventory:del']" type="link" class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <fam-invisible-inventory-add v-if="showAddModal" ref="addModal" @reloadData="getList" @close="showAddModal = false" />
    <!-- 编辑页面弹窗 -->
    <fam-invisible-inventory-edit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
      @close="showEditModal = false" />
    <!-- 详情页面弹窗 -->
    <fam-invisible-inventory-detail v-if="showDetailModal" ref="detailModal" :form-id="formId"
      @close="showDetailModal = false" />
    <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="单表模板导入"
      importUrl="/mms/fam/faminvisibleinventorys/importData/v1"
      downloadTemplateUrl="/mms/fam/faminvisibleinventorys/downloadTemplate/v1" @reloadData="getList"
      @close="showImportModal = false" />
  </div>
</template>
<script lang="ts" setup>
import type { FamInvisibleInventoryDto } from '@/api/avic/mms/fam/FamInvisibleInventoryApi'; // 引入模块DTO
import { listFamInvisibleInventoryByPage, delFamInvisibleInventory, exportExcel } from '@/api/avic/mms/fam/FamInvisibleInventoryApi'; // 引入模块API
import FamInvisibleInventoryAdd from './FamInvisibleInventoryAdd.vue'; // 引入添加页面组件
import FamInvisibleInventoryEdit from './FamInvisibleInventoryEdit.vue'; // 引入编辑页面组件
import FamInvisibleInventoryDetail from './FamInvisibleInventoryDetail.vue'; // 引入详情页面组件
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const props = defineProps({
  isAdd: {
    type: Boolean,
    default: false
  },
  assetClass: {
    type: String,
    default: false
  }
});
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
    title: '资产名称',
    dataIndex: 'assetName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产编号',
    dataIndex: 'assetNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用权',
    dataIndex: 'usufruct',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '所有权',
    dataIndex: 'ownerShip',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '软件商名称',
    dataIndex: 'softwareVendors',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用年限（10年）',
    dataIndex: 'useTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '是否授权',
    dataIndex: 'ynAuthorizationName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '实体',
    dataIndex: 'entity',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用权编号',
    dataIndex: 'usufructNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原值（等于出厂原价）',
    dataIndex: 'factoryPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '数量（默认1）',
    dataIndex: 'num',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '合同编号',
    dataIndex: 'contractNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同金额',
    dataIndex: 'orderValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '责任人',
    dataIndex: 'liablePersionAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '主管部门',
    dataIndex: 'managerDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '主管部门名称',
  //   dataIndex: 'managerDeptName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '使用部门',
    dataIndex: 'useDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '使用部门名称',
  //   dataIndex: 'useDeptName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '资产状态（在用，处置）',
    dataIndex: 'assetStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '购置时间（验收审批完成时间）',
    dataIndex: 'purchaseTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '数据密级',
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
const queryForm = ref<FamInvisibleInventoryDto>({});
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
const excelParams = ref({ tableName: 'famInvisibleInventory' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const ynAuthorizationList = ref([]); // 是否授权通用代码
const assetStatusList = ref([]); // 资产状态（在用，处置）通用代码
const secretLevelList = ref([]); // 数据密级通用代码
const lookupParams = [
  { fieldName: 'ynAuthorization', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'assetStatus', lookUpType: 'FAM_ASSETS_STATUS' }
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
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listFamInvisibleInventoryByPage(queryParam)
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
    ynAuthorizationList.value = result.ynAuthorization;
    assetStatusList.value = result.assetStatus;
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
    assetName: value,
    assetNo: value
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
      delFamInvisibleInventory(ids)
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
function onSelectChange(rowKeys,rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
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
/**
 *  批量添加返回勾选数据
 */

 const selectedRow = (code) => {
  let rows = [];
  selectedRows.value.map(item => {
    rows.push({
      ...item,
      operationType_: 'inside'
    });
  });
  return rows;
};
defineExpose({
  selectedRow
});
</script>

