<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="计划年度">
                  <a-date-picker
                    v-model:value="queryForm.applyYear"
                    placeholder="请输入计划年度"
                    :allow-clear="true"
                    format="YYYY"
                    value-format="YYYY"
                    picker="year"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="单据号">
                  <a-input
                    v-model:value="queryForm.billNo"
                    placeholder="请输入单据号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col v-bind="colLayout.cols">
                <a-form-item label="密级">
                  <a-select v-model:value="queryForm.secretLevel"
                    :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                    :show-search="true" :allow-clear="true" placeholder="请选择密级">
                    <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报人ID">
                  <a-input v-model:value="queryForm.editUserId" placeholder="请输入填报人ID" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报人姓名">
                  <AvicCommonSelect v-model:value="queryForm.editUserName" type="userSelect" placeholder="请选择填报人姓名"
                    :defaultShowValue="queryForm.editUserNameAlias" @callback="result => {
                      queryForm.editUserNameAlias = result.names;
                    }
                      " />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报日期(起)">
                  <a-date-picker v-model:value="queryForm.editDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                    placeholder="请选择填报日期(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.editDateEnd)" />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报日期(止)">
                  <a-date-picker v-model:value="queryForm.editDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                    placeholder="请选择填报日期(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.editDateBegin)" />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报人编码">
                  <a-input v-model:value="queryForm.editUserCode" placeholder="请输入填报人编码" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报部门ID">
                  <a-input v-model:value="queryForm.editDeptId" placeholder="请输入填报部门ID" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报部门编码">
                  <a-input v-model:value="queryForm.editDeptCode" placeholder="请输入填报部门编码" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="填报部门名称">
                  <AvicCommonSelect v-model:value="queryForm.editDeptName" type="deptSelect" placeholder="请选择填报部门名称"
                    :defaultShowValue="queryForm.editDeptNameAlias" @callback="result => {
                      queryForm.editDeptNameAlias = result.names;
                    }
                      " />
                </a-form-item>
              </a-col> -->
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="流程状态">
                  <a-select v-model:value="queryForm.billStatus"
                    :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                    :show-search="true" :allow-clear="true" placeholder="请选择流程状态">
                    <a-select-option v-for="item in billStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
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
                    <a-button type="primary" @click="resetQuery" ghost style="margin-right:15px">
                      <redo-outlined />
                      重置
                    </a-button>
                    <!-- <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                      {{ advanced ? '收起' : '展开' }}
                      <up-outlined v-if="advanced" />
                      <down-outlined v-else />
                    </a-button> -->
                  </a-space>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable
            ref="tpmYearMaintModifyPlan"
            table-key="tpmYearMaintModifyPlan"
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
                  v-hasPermi="['tpmYearMaintModifyPlan:add']"
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
                  v-hasPermi="['tpmYearMaintModifyPlan:edit']"
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
                  type="primary"
                  @click="handleApproval(selectedRows, selectedRowKeys)"
                  :loading="approvalLoading"
                >
                  <template #icon>
                    <check-circle-outlined />
                  </template>
                  提交审批
                </a-button>
                <a-button
                  v-hasPermi="['tpmYearMaintModifyPlan:del']"
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
                <!--                <a-button v-hasPermi="['tpmYearMaintModifyPlan:export']" title="导出" type="primary" ghost-->
                <!--                          @click="handleExport">-->
                <!--                  <template #icon>-->
                <!--                    <export-outlined/>-->
                <!--                  </template>-->
                <!--                  导出-->
                <!--                </a-button>-->
              </a-space>
            </template>
            <template #toolBarRight>
              <a-space>
                <AvicBpmFilter
                  :allFileAuth="['tpmYearMaintModifyPlan:all']"
                  :myFileAuth="['tpmYearMaintModifyPlan:my']"
                  :defaultBpmType="queryForm.bpmType"
                  :defaultBpmState="queryForm.bpmState"
                  @change="changeBpmFilter"
                />
                <a-input-search
                  class="opt-btn-commonsearch"
                  style="width: 200px"
                  placeholder="请输入单据号"
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
              <template v-else-if="column.dataIndex === 'billNo' && record.bpmState !== null">
                <a @click="handleFlowDetail(record)">
                  {{ record.billNo }}
                </a>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <TpmYearMaintModifyPlanAdd
        v-if="showAddModal"
        ref="addModal"
        :bpmOperatorRefresh="getList"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <TpmYearMaintModifyPlanEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <TpmYearMaintModifyPlanDetail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        :mainForm="mainForm"
        @close="showDetailModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!--子表组件-->
      <TpmYearMaintModifyPlanLManage
        key="tpmYearMaintModifyPlanLManage"
        ref="tpmYearMaintModifyPlanLManage"
        @getTableList="getList"
        :mainId="mainId"
        :mainForm="mainForm"
        @getSonList="getSonList"
      />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import type { TpmYearMaintModifyPlanDto } from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanApi'; // 引入模块DTO
import {
  listTpmYearMaintModifyPlanByPage,
  delTpmYearMaintModifyPlan,
  exportExcel,
  saveFormAndStartProcess
} from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanApi'; // 引入模块API
import TpmYearMaintModifyPlanAdd from './TpmYearMaintModifyPlanAdd.vue'; // 引入添加页面组件
import TpmYearMaintModifyPlanEdit from './TpmYearMaintModifyPlanEdit.vue'; // 引入编辑页面组件
import TpmYearMaintModifyPlanDetail from './TpmYearMaintModifyPlanDetail.vue'; // 引入详情页面组件
import TpmYearMaintModifyPlanLManage from '../tpmyearmaintmodifyplanl/TpmYearMaintModifyPlanLManage.vue'; // 引入子表页面组件
import flowUtils, { startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '90px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center'
  },
  {
    title: '单据号',
    dataIndex: 'billNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划年度',
    dataIndex: 'applyYear',
    ellipsis: true,
    sorter: true,
    minWidth: 100,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划总数',
    dataIndex: 'planTotalCount',
    ellipsis: true,
    sorter: true,
    minWidth: 100,
    resizable: true,
    align: 'center'
  },
  {
    title: '填报人',
    dataIndex: 'editUserName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '填报日期',
    dataIndex: 'editDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '填报部门',
    dataIndex: 'editDeptName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    width: 80,
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
    ellipsis: true,
    width: 120,
    align: 'center',
    fixed: 'right'
  },
  {
    title: '当前处理人',
    dataIndex: 'assigneenames_',
    ellipsis: true,
    width: 120,
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<TpmYearMaintModifyPlanDto>({
  bpmState: 'all',
  bpmType: 'my'
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
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [];
const approvalLoading = ref(false);
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
});
const mainForm = computed(() => {
  return selectedRowKeys.value.length === 1
    ? list.value.filter(item => item.id === selectedRowKeys.value[0])[0]
    : ''; // 主表传入数据
});
const formCode = 'TpmYearMaintModifyPlan';
const sonnum = ref(null);
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
  selectedRows.value = [];
  loading.value = true;
  listTpmYearMaintModifyPlanByPage(queryParam)
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
  proxy.$getLookupByType(lookupParams, result => {});
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
    billNo: value
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
  if (selectedRows.value[0].bpmState !== 'start' && selectedRows.value[0].bpmState !== null) {
    proxy.$message.warning('请选择未提交或拟稿中的数据编辑！');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
}

// 提交审批
const handleApproval = (rows, ids) => {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要提交审批的数据！');
    return;
  }
  if (ids.length > 1) {
    proxy.$message.warning('请选择一条要提交审批的数据！');
    return;
  }
  for (let item of rows) {
    if (item.bpmState !== null) {
      proxy.$message.warning('请选择未提交审批的数据！');
      return;
    }
  }
  if (sonnum.value === 0) {
    proxy.$message.warning('年度维修改造计划明细不能为空');
    return;
  }
  proxy.$confirm({
    title: '确认要提交审批查询出的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      approvalLoading.value = true;
      getBpmDefine(rows);
    }
  });
};

function getBpmDefine(rows) {
  for (let postData of rows) {
    startFlowByFormCode({
      formCode: formCode,
      formData: postData,
      callback: bpmDefinedInfo => {
        approval(bpmDefinedInfo, postData);
      }
    });
  }
}

function getSonList(v) {
  sonnum.value = v;
}

/** 提交审批回调 */
const approval = (bpmDefinedInfo, postData) => {
  const param = {
    processDefId: bpmDefinedInfo.dbid,
    formCode: formCode,
    postData
  };
  saveFormAndStartProcess(param)
    .then(res => {
      if (res.success) {
        approvalLoading.value = false;
        proxy.$message.success('提交成功!');
        getList();
        handleFlowDetail(postData);
      } else {
        approvalLoading.value = false;
      }
    })
    .catch(() => {
      approvalLoading.value = false;
    });
};

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
  if (rows.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有未提交及拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确定删除已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmYearMaintModifyPlan(ids)
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

defineExpose({
  getSonList
});
</script>
