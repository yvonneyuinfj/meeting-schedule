<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form ref="formRef" :model="queryForm" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购计划名称">
              <a-input
                  v-model:value="queryForm.reqPlanName"
                  :allow-clear="true"
                  placeholder="请输入采购计划名称"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="主责单位">
              <AvicCommonSelect
                  v-model:value="queryForm.reqDeptId"
                  :defaultShowValue="queryForm.reqDeptIdAlias"
                  placeholder="请选择主责单位"
                  type="deptSelect"
                  @callback="result => {
                  queryForm.reqDeptIdAlias = result.names;
                }
                  "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购负责人">
              <AvicCommonSelect
                  v-model:value="queryForm.managerUserId"
                  :defaultShowValue="queryForm.managerUserIdAlias"
                  placeholder="请选择采购负责人"
                  type="userSelect"
                  @callback="result => {
                  queryForm.managerUserIdAlias = result.names;
                }
                  "
              />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="计划类型">
              <a-select
                  v-model:value="queryForm.planType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择计划类型"
              >
                <a-select-option
                    v-for="item in planTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
              style="margin-left: auto"
              v-bind="colLayout.cols"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined/>
                  查询
                </a-button>
                <a-button ghost type="primary" @click="resetQuery">
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button style="margin: 0" type="link" @click="toggleAdvanced">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced"/>
                  <down-outlined v-else/>
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
          ref="pmsRequireReceive"
          :columns="columns"
          :data-source="list"
          :loading="loading"
          :pageParameter="queryParam.pageParameter"
          :row-key="record => record.id"
          :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
          :total="totalPage"
          table-key="pmsRequireReceive"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <!-- <a-button
              v-hasPermi="['pmsRequireReceive:add']"
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
              v-hasPermi="['pmsRequireReceive:del']"
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
            <a-button
                v-hasPermi="['pmsRequireReceive:import']"
                ghost
                title="导入"
                type="primary"
                @click="handleImport">
              <template #icon>
                <import-outlined/>
              </template>
              导入
            </a-button>
            <a-button
                v-hasPermi="['pmsRequireReceive:export']"
                ghost
                title="导出"
                type="primary"
                @click="handleExport">
              <template #icon>
                <export-outlined/>
              </template>
              导出
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
              :allow-clear="true"
              class="opt-btn-commonsearch"
              placeholder="请输入采购计划号或采购计划名称"
              style="width: 200px"
              @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <!-- <template v-else-if="column.dataIndex === 'secretLevelName'">
            <a @click="handleDetail(record)">
              {{ record.secretLevelName }}
            </a>
          </template> -->
          <!-- <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button
              v-hasPermi="['pmsRequireReceive:del']"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template> -->
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <!-- <pms-require-receive-add
      v-if="showAddModal"
      ref="addModal"
      @reloadData="getList"
      @close="showAddModal = false"
    /> -->
    <!-- 编辑页面弹窗 -->
    <!-- <pms-require-receive-edit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    /> -->
    <!-- 详情页面弹窗 -->
    <!-- <pms-require-receive-detail
      v-if="showDetailModal"
      ref="detailModal"
      :form-id="formId"
      @close="showDetailModal = false"
    /> -->
    <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        downloadTemplateUrl="/mms/pms/pmsrequirereceives/downloadTemplate/v1"
        importUrl="/mms/pms/pmsrequirereceives/importData/v1"
        title="单表模板导入"
        @close="showImportModal = false"
        @reloadData="getList"
    />
  </div>
</template>
<script lang="ts" setup>
import type { PmsRequireReceiveDto } from '@/api/avic/mms/pms/PmsRequireReceiveApi'; // 引入模块DTO
import { exportExcel, listPmsRequireReceiveByPage } from '@/api/avic/mms/pms/PmsRequireReceiveApi'; // 引入模块API
// import PmsRequireReceiveAdd from './PmsRequireReceiveAdd.vue'; // 引入添加页面组件
// import PmsRequireReceiveEdit from './PmsRequireReceiveEdit.vue'; // 引入编辑页面组件
// import PmsRequireReceiveDetail from './PmsRequireReceiveDetail.vue'; // 引入详情页面组件
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
    title: '采购计划号',
    dataIndex: 'reqPlanNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购计划名称',
    dataIndex: 'reqPlanName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '主责单位',
    dataIndex: 'reqDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设计员',
    dataIndex: 'reqUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购负责人',
    dataIndex: 'managerUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '产品和服务类别',
    dataIndex: 'productServiceCategoryName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '产品需求分类',
    dataIndex: 'productReqClassifyName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划类型',
    dataIndex: 'planTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '产品类型',
    dataIndex: 'productTypeName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '所属项目课题号',
    dataIndex: 'projectTopicNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求来源',
    dataIndex: 'sourceTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '预算金额',
    dataIndex: 'budgetAmount',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购部门',
    dataIndex: 'procureDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购主管',
    dataIndex: 'procureUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交付日期',
    dataIndex: 'deliveryDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '拟寻源方式',
    dataIndex: 'proposedSourcingMethodName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '指定供应商',
    dataIndex: 'appointVendorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术文件完成日期',
    dataIndex: 'techDocCompleteDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
];
const queryForm = ref<PmsRequireReceiveDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm.value
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
// const showAddModal = ref(false); // 是否展示添加弹窗
// const showEditModal = ref(false); // 是否展示编辑弹窗
// const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'pmsRequireReceive' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
// const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
// const delLoading = ref(false);
const totalPage = ref(0);
// const secretLevelList = ref([]); // 密级通用代码
const planTypeList = ref([]); // 计划类型通用代码
const sourceTypeList = ref([]); // 需求来源通用代码
const proposedSourcingMethodList = ref([]); // 拟寻源方式通用代码
const reqStatusList = ref([]); // 需求状态通用代码
const lookupParams = [
  { fieldName: 'planType', lookUpType: 'PMS_PLAN_TYPE' },
  { fieldName: 'sourceType', lookUpType: 'PMS_SOURCE_TYPE' },
  { fieldName: 'proposedSourcingMethod', lookUpType: 'PMS_PROPOSED_SOURCING_METHOD' },
  { fieldName: 'reqStatus', lookUpType: 'PMS_REQ_STATUS' }
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
  listPmsRequireReceiveByPage(queryParam)
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
    planTypeList.value = result.planType;
    sourceTypeList.value = result.sourceType;
    proposedSourcingMethodList.value = result.proposedSourcingMethod;
    reqStatusList.value = result.reqStatus;
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
    reqPlanNo: value,
    reqPlanName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
// function handleAdd() {
//   showAddModal.value = true;
// }
/** 编辑 */
// function handleEdit(id) {
//   formId.value = id;
//   showEditModal.value = true;
// }
/** 详细 */
// function handleDetail(record) {
//   formId.value = record.id;
//   showDetailModal.value = true;
// }
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
// function handleDelete(ids, type) {
//   if (ids.length == 0) {
//     proxy.$message.warning('请选择要删除的数据！');
//     return;
//   }
//   proxy.$confirm({
//     title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
//     okText: '确定',
//     cancelText: '取消',
//     onOk: () => {
//       delLoading.value = true;
//       delPmsRequireReceive(ids)
//         .then(res => {
//           if (res.success) {
//             proxy.$message.success('删除成功！');
//             getList();
//           }
//           delLoading.value = false;
//         })
//         .catch(() => {
//           delLoading.value = false;
//         });
//     }
//   });
// }
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

