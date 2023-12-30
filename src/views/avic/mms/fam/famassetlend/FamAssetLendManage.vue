<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form
            v-bind="layout"
            ref="formRef"
            :model="queryForm"
          >
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="申请单编号">
                  <a-input
                    v-model:value="queryForm.applyNo"
                    placeholder="请输入申请单编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="标题">
                  <a-input
                    v-model:value="queryForm.title"
                    placeholder="请输入标题"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="主管部门">
                  <AvicCommonSelect
                    v-model:value="queryForm.managerDeptId"
                    type="deptSelect"
                    placeholder="请选择主管部门"
                    :defaultShowValue="queryForm.managerDeptIdAlias"
                    @callback="
                      result => {
                        queryForm.managerDeptIdAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="出租单位">
                  <AvicCommonSelect
                    v-model:value="queryForm.hireDeptId"
                    type="deptSelect"
                    placeholder="请选择出租单位"
                    :defaultShowValue="queryForm.hireDeptIdAlias"
                    @callback="
                      result => {
                        queryForm.hireDeptIdAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="承租单位">
                  <AvicCommonSelect
                    v-model:value="queryForm.lesseeDeptId"
                    type="deptSelect"
                    placeholder="请选择承租单位"
                    :defaultShowValue="queryForm.lesseeDeptIdAlias"
                    @callback="
                      result => {
                        queryForm.lesseeDeptIdAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="起租日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.startLeaseDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择起租日期(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.startLeaseDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="起租日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.startLeaseDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择起租日期(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.startLeaseDateBegin)"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="经办人">
                  <AvicCommonSelect
                    v-model:value="queryForm.handlePersonId"
                    type="userSelect"
                    placeholder="请选择经办人"
                    :defaultShowValue="queryForm.handlePersonIdAlias"
                    @callback="
                      result => {
                        queryForm.handlePersonIdAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="经办人">
                  <a-input
                    v-model:value="queryForm.handlePersonName"
                    placeholder="请输入经办人"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="申请时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.applyDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择申请时间(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.applyDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="申请时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.applyDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择申请时间(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.applyDateBegin)"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="审批状态(编制中/流程中/审批通过)">
                  <a-input
                    v-model:value="queryForm.billStatus"
                    placeholder="请输入审批状态(编制中/流程中/审批通过)"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="租赁期限(单位年)">
                  <a-input
                    v-model:value="queryForm.leaseTerm"
                    placeholder="请输入租赁期限(单位年)"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="租金">
                  <a-input
                    v-model:value="queryForm.rent"
                    placeholder="请输入租金"
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
                    <a-button
                      type="primary"
                      @click="handleQuery"
                    >
                      <search-outlined />
                      查询
                    </a-button>
                    <a-button
                      type="primary"
                      @click="resetQuery"
                      ghost
                    >
                      <redo-outlined />
                      重置
                    </a-button>
                    <a-button
                      type="link"
                      @click="toggleAdvanced"
                      style="margin: 0"
                    >
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
            ref="famAssetLend"
            table-key="famAssetLend"
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
            rowClickSelectionType="radio"
            :pageParameter="queryParam.pageParameter"
            :total="totalPage"
            @change="handleTableChange"
            @refresh="getList"
          >
            <template #toolBarLeft>
              <a-space>
                <a-button
                  v-hasPermi="['famAssetLend:add']"
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
                  v-hasPermi="['famAssetLend:edit']"
                  title="编辑"
                  type="primary"
                  ghost
                  @click="handleEdit"
                >
                  <template #icon>
                    <edit-outlined />
                  </template>
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['famAssetLend:del']"
                  title="删除"
                  danger
                  :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                  :loading="delLoading"
                  @click="handleDelete(selectedRows, selectedRowKeys)"
                >
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
                <a-button
                  v-hasPermi="['famAssetLend:export']"
                  title="导出"
                  type="primary"
                  ghost
                  @click="handleExport"
                >
                  <template #icon>
                    <export-outlined />
                  </template>
                  导出
                </a-button>
                <a-button
                  v-hasPermi="['famAssetLend:export']"
                  title="归还"
                  type="primary"
                  ghost
                  :loading="returnLoading"
                  @click="handleReturn(selectedRows, selectedRowKeys)"
                >
                  <template #icon>
                    <import-outlined />
                  </template>
                  归还
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-space>
                <AvicBpmFilter
                  :allFileAuth="['famAssetLend:all']"
                  :myFileAuth="['famAssetLend:my']"
                  :defaultBpmType='queryForm.bpmType'
                  :defaultBpmState='queryForm.bpmState'
                  @change="changeBpmFilter"
                />
                <a-input-search
                  class="opt-btn-commonsearch"
                  style="width: 200px"
                  placeholder="请输入"
                  :allow-clear="true"
                  @search="handleKeyWordQuery"
                />
              </a-space>
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'applyNo'">
                <a @click="handleFlowDetail(record)">
                  {{ record.applyNo }}
                </a>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <FamAssetLendAdd
        v-if="showAddModal"
        ref="addModal"
        :bpmOperatorRefresh="getList"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <FamAssetLendEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <FamAssetLendDetail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!--子表组件-->
      <FamAssetLendListManage
        key="famAssetLendListManage"
        ref="famAssetLendListManage"
        :mainId="mainId"
      />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import type { FamAssetLendDto } from '@/api/avic/mms/fam/FamAssetLendApi'; // 引入模块DTO
import {
  listFamAssetLendByPage,
  delFamAssetLend,
  exportExcel, returnFamAssetLend
} from '@/api/avic/mms/fam/FamAssetLendApi'; // 引入模块API
import FamAssetLendAdd from './FamAssetLendAdd.vue'; // 引入添加页面组件
import FamAssetLendEdit from './FamAssetLendEdit.vue'; // 引入编辑页面组件
import FamAssetLendDetail from './FamAssetLendDetail.vue'; // 引入详情页面组件
import FamAssetLendListManage from '../famassetlendlist/FamAssetLendListManage.vue'; // 引入子表页面组件
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
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
    title: '申请单编号',
    dataIndex: 'applyNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    title: '主管部门',
    dataIndex: 'managerDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出租单位',
    dataIndex: 'hireDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '承租单位',
    dataIndex: 'lesseeDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '起租日期',
    dataIndex: 'startLeaseDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '经办人',
    dataIndex: 'handlePersonIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人',
    dataIndex: 'handlePersonName',
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
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '审批状态(编制中/流程中/审批通过)',
    dataIndex: 'billStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '租赁期限(单位年)',
    dataIndex: 'leaseTerm',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '租金',
    dataIndex: 'rent',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
const queryForm = ref<FamAssetLendDto>({
  bpmState: 'all',
  bpmType: 'all'
}); // 高级查询对象
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
const showDetailModal = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); //表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); //选中数据主键集合
const returnLoading = ref(false)
const selectedRows = ref([]); //选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
});

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listFamAssetLendByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      // 设置表格初始选中项
      if (list.value.length > 0) {
        selectedRowKeys.value = [list.value[0]['id']];
        selectedRows.value = [list.value[0]];
      } else {
        selectedRowKeys.value = [];
        selectedRows.value = [];
      }
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
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
  const keyWord = {};
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
  if (selectedRows.value.filter(row => row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以编辑！');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
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

function handleReturn(rows, ids){
  if (ids.length == 0) {
    proxy.$message.warning('请选择要归还的数据！');
    return;
  }
  const returnids = ids.join(',')
  console.log(returnids)
  proxy.$confirm({
    title: '确定归还已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      returnLoading.value = true;
      returnFamAssetLend(returnids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('归还成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
            getList();
          }
          returnLoading.value = false;
        })
        .catch(() => {
          returnLoading.value = false;
        });
    }
  });
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
    title: '确定删除已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delFamAssetLend(ids)
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
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
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
</script>

