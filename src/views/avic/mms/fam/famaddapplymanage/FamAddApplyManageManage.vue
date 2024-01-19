<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="申请单号">
              <a-input v-model:value="queryForm.applyNo" placeholder="请输入申请单号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="固定资产名称">
              <a-input v-model:value="queryForm.capitalAssetName" placeholder="请输入固定资产名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="固定资产主管部门">
              <AvicCommonSelect v-model:value="queryForm.capitalAssetDept" type="deptSelect" placeholder="请选择固定资产主管部门"
                :defaultShowValue="queryForm.capitalAssetDeptAlias" @callback="
                  result => {
                    queryForm.capitalAssetDeptAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否科研用">
              <a-select v-model:value="queryForm.ynScientific"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否科研用">
                <a-select-option v-for="item in ynScientificList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算项目ID">
              <a-input v-model:value="queryForm.budgetItemId" placeholder="请输入预算项目ID" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算项目名称">
              <a-input v-model:value="queryForm.budgetItemName" placeholder="请输入预算项目名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算分项">
              <a-input v-model:value="queryForm.budgetSubItem" placeholder="请输入预算分项" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算组织">
              <a-input v-model:value="queryForm.budgetOrg" placeholder="请输入预算组织" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="购置数量">
              <a-input v-model:value="queryForm.purchaseNum" placeholder="请输入购置数量" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算单价（元）">
              <a-input v-model:value="queryForm.budgetUnivalent" placeholder="请输入预算单价（元）" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算总价（元）">
              <a-input v-model:value="queryForm.budgetTotal" placeholder="请输入预算总价（元）" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否需要评审">
              <a-select v-model:value="queryForm.ynReview" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否需要评审">
                <a-select-option v-for="item in ynReviewList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="联系电话">
              <a-input v-model:value="queryForm.tel" placeholder="请输入联系电话" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="需求日期(起)">
              <a-date-picker v-model:value="queryForm.qualityDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择需求日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.qualityDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="需求日期(止)">
              <a-date-picker v-model:value="queryForm.qualityDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择需求日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.qualityDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物资等级">
              <a-input v-model:value="queryForm.goodsLevel" placeholder="请输入物资等级" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请部门">
              <a-input v-model:value="queryForm.appllDeptId" placeholder="请输入申请部门" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请时间">
              <a-input v-model:value="queryForm.applyDate" placeholder="请输入申请时间" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="标题">
              <a-input v-model:value="queryForm.title" placeholder="请输入标题" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级">
              <a-select v-model:value="queryForm.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
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
      <AvicTable ref="famAddApplyManage" table-key="famAddApplyManage" :columns="columns" :row-key="record => record.id"
        :data-source="list" :loading="loading" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <a-button v-hasPermi="['famAddApplyManage:add']" title="添加" type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button v-hasPermi="['famAddApplyManage:edit']" title="编辑" type="primary" ghost @click="handleEdit">
              <template #icon>
                <edit-outlined />
              </template>
              编辑
            </a-button>
            <a-button v-hasPermi="['famAddApplyManage:del']" title="删除" danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
              @click="handleDelete(selectedRows, selectedRowKeys)">
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button v-hasPermi="['famAddApplyManage:export']" title="导出" type="primary" ghost @click="handleExport">
              <template #icon>
                <export-outlined />
              </template>
              导出
            </a-button>
                  <a-button v-hasPermi="['famAddApplyManage:print']" title="打印" type="primary" ghost @click="handlePrint">
                    <template #icon>
                      <avic-icon svg='avic-save-3-line' />
                    </template>
                    打印
                  </a-button>
            </a-space>
          </template>
          <template #toolBarRight>
            <a-space>
              <AvicBpmFilter :allFileAuth="['famAddApplyManage:all']" :myFileAuth="['famAddApplyManage:my']"
                :defaultBpmType='queryForm.bpmType' :defaultBpmState='queryForm.bpmState' @change="changeBpmFilter" />
              <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入申请单号" :allow-clear="true"
                @search="handleKeyWordQuery" />
            </a-space>
          </template>
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'id'">
              {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
            </template>
            <template v-else-if="column.dataIndex === 'applyNo'">
              <a @click="handleFlowDetail(record)">
                {{ record.applyNo }}
              </a>
            </template>
          </template>
        </AvicTable>
      </div>
      <!-- 添加页面弹窗 -->
      <FamAddApplyManageAdd v-if="showAddModal" ref="addModal" :bpmOperatorRefresh="getList" @reloadData="getList"
        @close="showAddModal = false" />
      <!-- 编辑页面弹窗 -->
      <FamAddApplyManageEdit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
        @close="showEditModal = false" />
      <!-- 打印页面弹窗（全屏） -->
      <FamAddApplyManageDetailForPrint v-if="showDetailModal" ref="detailModal" :form-id="formId" @reloadData="getList"
        @close="showDetailModal = false" />
  </div>
</template>
<script lang="ts" setup>
import type { FamAddApplyManageDto } from '@/api/avic/mms/fam/FamAddApplyManageApi'; // 引入模块DTO
import { listFamAddApplyManageByPage, delFamAddApplyManage, exportExcel } from '@/api/avic/mms/fam/FamAddApplyManageApi'; // 引入模块API
import FamAddApplyManageAdd from './FamAddApplyManageAdd.vue'; // 引入添加页面组件
import FamAddApplyManageEdit from './FamAddApplyManageEdit.vue'; // 引入编辑页面组件
import FamAddApplyManageDetailForPrint from './FamAddApplyManageDetailForPrint.vue'; // 引入打印页面组件
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';
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
    title: '申请单号',
    dataIndex: 'applyNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '固定资产名称',
    dataIndex: 'capitalAssetName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '固定资产主管部门',
    dataIndex: 'capitalAssetDeptAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否科研用',
    dataIndex: 'ynScientificName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '预算项目ID',
    dataIndex: 'budgetItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算项目名称',
    dataIndex: 'budgetItemName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算分项',
    dataIndex: 'budgetSubItem',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算组织',
    dataIndex: 'budgetOrg',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '购置数量',
    dataIndex: 'purchaseNum',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算单价（元）',
    dataIndex: 'budgetUnivalent',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算总价（元）',
    dataIndex: 'budgetTotal',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否需要评审',
    dataIndex: 'ynReviewName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '联系电话',
    dataIndex: 'tel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求日期',
    dataIndex: 'qualityDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '物资等级',
    dataIndex: 'goodsLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请理由',
    dataIndex: 'applyReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '要求及建议',
    dataIndex: 'reqAndAdvise',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注',
    dataIndex: 'note',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '申请部门',
  //   dataIndex: 'appllDeptId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '申请部门',
    dataIndex: 'appllDeptIdAlias',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请时间',
    dataIndex: 'applyDate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '标题',
    dataIndex: 'title',
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
    title: '流程状态',
    dataIndex: 'businessstate_',
    ellipsis: true,
    width: 120,
    align: 'center',
    fixed: 'right'
  },
  {
    title: '流程当前步骤',
    dataIndex: 'activityalias_',
    width: 120,
    fixed: 'right'
  },
  {
    title: '当前处理人',
    dataIndex: 'assigneenames_',
    ellipsis: true,
    width: 130,
    align: 'left',
    fixed: 'right'
  }
];
const queryForm = ref<FamAddApplyManageDto>({
  bpmState: 'all',
  bpmType: 'my'
});
// 高级查询对象
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示打印弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const ynScientificList = ref([]); // 是否科研用通用代码
const ynReviewList = ref([]); // 是否需要评审通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'ynScientific', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynReview', lookUpType: 'PLATFORM_YES_NO_FLAG' }
];
const $emit = defineEmits(['select', 'handleRowDblClick']);
onMounted(() => {
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listFamAddApplyManageByPage(queryParam)
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
/** 获取通用代码 */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    ynScientificList.value = result.ynScientific;
    ynReviewList.value = result.ynReview;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 根据流程状态及发起人查询数据 */
function changeBpmFilter({ bpmType, bpmState }) {
  queryForm.value.bpmType = bpmType;
  queryForm.value.bpmState = bpmState;
  queryParam.searchParams = queryForm.value;
  getList();
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
  queryForm.value = {
    bpmType: queryForm.value.bpmType,
    bpmState: queryForm.value.bpmState
  };
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    applyNo: value
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
function handleEdit() {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要编辑的数据！');
    return;
  }
  if (selectedRows.value[0].businessstate_ && selectedRows.value[0].businessstate_ !== '拟稿中') {
    proxy.$message.warning('当前流程状态不可编辑');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
}
/** 打印 */
function handlePrint() {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要打印的数据！');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showDetailModal.value = true;
}
/** 打开流程详情页面 */
function handleFlowDetail(record) {
  if (record.id) {
    flowUtils.detailByOptions({
      formId: record.id,
      bpmOperatorRefresh: getList
    });
  }
}
/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delFamAddApplyManage(ids)
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
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  $emit('select', selectedRows.value);
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
