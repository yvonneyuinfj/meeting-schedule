<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="使用部门名称">
              <a-input
                  v-model:value="queryForm.useDeptName"
                  placeholder="请输入使用部门名称"
                  :allow-clear="true"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="申请人姓名">
              <AvicCommonSelect
                  v-model:value="queryForm.applyUserName"
                  type="userSelect"
                  placeholder="请选择申请人姓名"
                  :defaultShowValue="queryForm.applyUserNameAlias"
                  @callback="
                  result => {
                    queryForm.applyUserNameAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="流程状态">
              <a-select
                  v-model:value="queryForm.billStatus"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择流程状态"
              >
                <a-select-option
                    v-for="item in billStatusList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="故障库类型">
              <a-select
                  v-model:value="queryForm.failureWarehouseType"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择故障库类型"
              >
                <a-select-option
                    v-for="item in failureWarehouseTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
              v-bind="colLayout.cols"
              style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined/>
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
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
          ref="tpmFailureWarehouse"
          table-key="tpmFailureWarehouse"
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
                v-hasPermi="['tpmFailureWarehouse:add']"
                title="添加"
                type="primary"
                @click="handleAdd"
            >
              添加
            </a-button>
            <a-button
                v-hasPermi="['tpmFailureWarehouse:edit']"
                title="编辑"
                type="primary"
                ghost
                @click="handleEdit"
            >
              编辑
            </a-button>
            <a-button type="primary" @click="handleApproval(selectedRows, selectedRowKeys)" :loading="approvalLoading">
              提交审批
            </a-button>
            <a-button
                v-hasPermi="['tpmFailureWarehouse:del']"
                title="删除"
                danger
                :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                :loading="delLoading"
                @click="handleDelete(selectedRows, selectedRowKeys)"
            >
              删除
            </a-button>

            <!-- <a-button
              v-hasPermi="['tpmFailureWarehouse:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
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
                :allFileAuth="['tpmFailureWarehouse:all']"
                :myFileAuth="['tpmFailureWarehouse:my']"
                :defaultBpmType='queryForm.bpmType'
                :defaultBpmState='queryForm.bpmState'
                @change="changeBpmFilter"
            />
            <a-input-search
                class="opt-btn-commonsearch"
                style="width: 200px"
                placeholder="请输入设备台账ID"
                :allow-clear="true"
                @search="handleKeyWordQuery"
            />
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'billNo' && record.bpmState != null">
            <a @click="handleFlowDetail(record)">
              {{ record.billNo }}
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <TpmFailureWarehouseAdd
        v-if="showAddModal"
        ref="addModal"
        :bpmOperatorRefresh="getList"
        @reloadData="getList"
        @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <TpmFailureWarehouseEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { TpmFailureWarehouseDto } from '@/api/avic/mms/tpm/TpmFailureWarehouseApi'; // 引入模块DTO
import {
  listTpmFailureWarehouseByPage,
  delTpmFailureWarehouse,
  exportExcel,
  approvalTpmFailureWarehouse, saveFormAndStartProcess
} from '@/api/avic/mms/tpm/TpmFailureWarehouseApi'; // 引入模块API
import TpmFailureWarehouseAdd from './TpmFailureWarehouseAdd.vue'; // 引入添加页面组件
import TpmFailureWarehouseEdit from './TpmFailureWarehouseEdit.vue'; // 引入编辑页面组件
import flowUtils, { startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';

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
    title: '单据号',
    dataIndex: 'billNo',
    ellipsis: true,
    minWidth: 150,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门名称',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请人姓名',
    dataIndex: 'applyUserNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请人电话',
    dataIndex: 'applyUserTel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    sorter: true,
    align: 'left'
  },
  {
    title: '维修单位',
    dataIndex: 'repairDept',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '流程状态',
    dataIndex: 'billStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '故障发生时间',
    dataIndex: 'faultDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划完成时间',
    dataIndex: 'planFinishDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '维修类型：自主/外委',
    dataIndex: 'repairTypeName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '维修金额',
    dataIndex: 'repairMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '故障库类型',
    dataIndex: 'failureWarehouseTypeName',
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
  },
  {
    title: '故障现象及原因',
    dataIndex: 'faultContent',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '维修内容',
    dataIndex: 'repairContent',
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
const queryForm = ref<TpmFailureWarehouseDto>({
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
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const approvalLoading = ref(false);
const billStatusList = ref([]); // 流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过通用代码
const failureWarehouseTypeList = ref([]); // 故障库类型通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'billStatus', lookUpType: 'FAILURE_BILL_STATUS' },
  { fieldName: 'failureWarehouseType', lookUpType: 'FAILURE_WAREHOUSE_TYPE' }
];
const formCode = 'TpmFailureWarehouse';

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmFailureWarehouseByPage(queryParam)
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

const approval = (bpmDefinedInfo, postData) => {
  const param = {
    processDefId: bpmDefinedInfo.dbid,
    formCode: formCode,
    postData
  };
  saveFormAndStartProcess(param).then(res => {
    if (res.success) {
      approvalLoading.value = false;
      proxy.$message.success('提交成功!');
      getList();
    } else {
      approvalLoading.value = false;
    }
  }).catch(() => {
    approvalLoading.value = false;
  });
};

/** 获取通用代码 */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    billStatusList.value = result.billStatus;
    failureWarehouseTypeList.value = result.failureWarehouseType;
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
    tpmInventoryId: value
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
      delTpmFailureWarehouse(ids)
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
