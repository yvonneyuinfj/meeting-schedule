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
                <a-form-item label="验收申请单号">
                  <a-input
                    v-model:value="queryForm.accpetApplyNo"
                    placeholder="请输入验收申请单号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="验收类型">
                  <a-select
                    v-model:value="queryForm.accpetType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择验收类型"
                  >
                    <a-select-option
                      v-for="item in accpetTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="合同名称">
                  <a-input
                    v-model:value="queryForm.orderName"
                    placeholder="请输入合同名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="合同编号">
                  <a-input
                    v-model:value="queryForm.orderNo"
                    placeholder="请输入合同编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="合同金额">
                  <a-input
                    v-model:value="queryForm.orderValue"
                    placeholder="请输入合同金额"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="采购部门名称">
                  <AvicCommonSelect
                    v-model:value="queryForm.procureDeptName"
                    type="deptSelect"
                    placeholder="请选择采购部门名称"
                    :defaultShowValue="queryForm.procureDeptNameAlias"
                    @callback="
                      result => {
                        queryForm.procureDeptNameAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="验收日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.accpetDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择验收日期(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.accpetDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="验收日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.accpetDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择验收日期(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.accpetDateBegin)"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="主管部门名称">
                  <AvicCommonSelect
                    v-model:value="queryForm.managerDeptName"
                    type="deptSelect"
                    placeholder="请选择主管部门名称"
                    :defaultShowValue="queryForm.managerDeptNameAlias"
                    @callback="
                      result => {
                        queryForm.managerDeptNameAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="接收部门名称">
                  <AvicCommonSelect
                    v-model:value="queryForm.receiveDeptName"
                    type="deptSelect"
                    placeholder="请选择接收部门名称"
                    :defaultShowValue="queryForm.receiveDeptNameAlias"
                    @callback="
                      result => {
                        queryForm.receiveDeptNameAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="资产属性">
                  <a-input
                    v-model:value="queryForm.assetClass"
                    placeholder="请输入资产属性"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="资金来源">
                  <a-input
                    v-model:value="queryForm.fundSource"
                    placeholder="请输入资金来源"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="其他事项">
                  <a-input
                    v-model:value="queryForm.otherMatter"
                    placeholder="请输入其他事项"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="购置方式">
                  <a-input
                    v-model:value="queryForm.purchWay"
                    placeholder="请输入购置方式"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="项目名称">
                  <a-input
                    v-model:value="queryForm.projectName"
                    placeholder="请输入项目名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                v-show="advanced"
              >
                <a-form-item label="经办人名称">
                  <AvicCommonSelect
                    v-model:value="queryForm.handlePersonName"
                    type="userSelect"
                    placeholder="请选择经办人名称"
                    :defaultShowValue="queryForm.handlePersonNameAlias"
                    @callback="
                      result => {
                        queryForm.handlePersonNameAlias = result.names;
                      }
                    "
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
            ref="famAccpet"
            table-key="famAccpet"
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
                  v-hasPermi="['famAccpet:add']"
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
                  v-hasPermi="['famAccpet:edit']"
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
                  v-hasPermi="['famAccpet:del']"
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
                <!-- <a-button
                  v-hasPermi="['famAccpet:export']"
                  title="导出"
                  type="primary"
                  ghost
                  @click="handleExport"
                >
                  <template #icon>
                    <export-outlined />
                  </template>
                  导出
                </a-button> -->
              </a-space>
            </template>
            <template #toolBarRight>
              <a-space>
                <AvicBpmFilter
                  :allFileAuth="['famAccpet:all']"
                  :myFileAuth="['famAccpet:my']"
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
              <template v-else-if="column.dataIndex === 'accpetApplyNo'">
                <a @click="handleFlowDetail(record)">
                  {{ record.accpetApplyNo }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'assetClass'">
                <!-- {{ assetClassList.filter(item => item.lookupCode === record.assetClass)[0].lookupName }} -->
                <!-- <AvicDictTag
                  :value="record.assetClass"
                  :options="assetClassList"
                /> -->
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <FamAccpetEntityAdd
        v-if="showAddModal"
        ref="addModal"
        :bpmOperatorRefresh="getList"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <FamAccpetEntityEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <FamAccpetEntityDetail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!--子表组件-->
      <FamAccpetListEntityManage
        key="famAccpetListEntityManage"
        ref="famAccpetListEntityManage"
        :mainId="mainId"
      />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import { useFamAccpetForm, emits } from './ts/FamAccpetEntityForm'; // 引入表单ts
import type { FamAccpetDto } from '@/api/avic/mms/fam/FamAccpetEntityApi'; // 引入模块DTO
import { listFamAccpetByPage, delFamAccpet, exportExcel } from '@/api/avic/mms/fam/FamAccpetEntityApi'; // 引入模块API
import FamAccpetEntityAdd from './FamAccpetEntityAdd.vue'; // 引入添加页面组件
import FamAccpetEntityEdit from './FamAccpetEntityEdit.vue'; // 引入编辑页面组件
import FamAccpetEntityDetail from './FamAccpetEntityDetail.vue'; // 引入详情页面组件
import FamAccpetListEntityManage from '../famaccpetlistentity/FamAccpetListEntityManage.vue'; // 引入子表页面组件
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
    title: '验收申请单号',
    dataIndex: 'accpetApplyNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '验收类型',
    dataIndex: 'accpetTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '合同名称',
    dataIndex: 'orderName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同编号',
    dataIndex: 'orderNo',
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
    title: '采购部门名称',
    dataIndex: 'procureDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '验收日期',
    dataIndex: 'accpetDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '主管部门名称',
    dataIndex: 'managerDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收部门名称',
    dataIndex: 'receiveDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产属性',
    dataIndex: 'assetClass',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资金来源',
    dataIndex: 'fundSource',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '其他事项',
    dataIndex: 'otherMatter',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '购置方式',
    dataIndex: 'purchWay',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人名称',
    dataIndex: 'handlePersonNameAlias',
    ellipsis: true,
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
const queryForm = ref<FamAccpetDto>({
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
const selectedRows = ref([]); //选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const assetTypeList = ref([]);
const secretLevelList = ref([]); // 数据密级通用代码
const accpetTypeList = ref([]); // 验收类型通用代码
const assetClassList = ref([]);
const lookupParams = [
  { fieldName: 'accpetType', lookUpType: 'FAM_ACCPET_TYPE' },
  { fieldName: 'assetClass', lookUpType: 'FAM_ASSET_TYPE' }
];
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listFamAccpetByPage(queryParam)
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
/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    accpetTypeList.value = result.accpetType;
    assetClassList.value = result.assetClass
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
  if (selectedRows.value[0].businessstate_ === '拟稿中') {
    proxy.$message.warning('拟稿中的数据不可修改提交！');
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
/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState !== null && row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确定删除已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delFamAccpet(ids)
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
