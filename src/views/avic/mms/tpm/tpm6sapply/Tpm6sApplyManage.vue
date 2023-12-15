<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划完成时间(起)">
              <a-date-picker
                v-model:value="queryForm.planFinishDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划完成时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.planFinishDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划完成时间(止)">
              <a-date-picker
                v-model:value="queryForm.planFinishDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划完成时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.planFinishDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目组长">
              <AvicCommonSelect
                v-model:value="queryForm.chargeUserName"
                type="userSelect"
                placeholder="请选择项目组长"
                :defaultShowValue="queryForm.chargeUserNameAlias"
                @callback="
                  result => {
                    queryForm.chargeUserNameAlias = result.names;
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
        ref="tpm6sApply"
        table-key="tpm6sApply"
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
              v-hasPermi="['tpm6sApply:add']"
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
              v-hasPermi="['tpm6sApply:edit']"
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
              v-hasPermi="['tpm6sApply:del']"
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
              v-hasPermi="['tpm6sApply:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
              <template #icon>
                 <export-outlined />
              </template>
              导出
            </a-button>
            <a-button
              v-hasPermi="['tpm6sApply:commitProcess']"
              title="提交审批"
              type="primary"
              :loading="approvalLoading"
              ghost
              @click="handleApproval(selectedRows, selectedRowKeys)">
              提交审批
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-space>
            <AvicBpmFilter
              :allFileAuth="['tpm6sApply:all']"
              :myFileAuth="['tpm6sApply:my']"
              :defaultBpmType = 'queryForm.bpmType'
              :defaultBpmState = 'queryForm.bpmState'
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
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'billNo'">
            <a @click="handleFlowDetail(record)">
              {{ record.billNo }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'problemDescription'">
            <a @click="handleAttach(record, column.dataIndex)">
              查看
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <Tpm6sApplyAdd
      v-if="showAddModal"
      ref="addModal"
      :bpmOperatorRefresh="getList"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <Tpm6sApplyEdit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <AttachModal
        :attachOpen="attachOpen"
        :attach-form="attchForm"
        @closeAttach="closeAttach"
    />
  </div>
</template>
<script lang="ts" setup>
import type { Tpm6sApplyDto } from '@/api/avic/mms/tpm/Tpm6sApplyApi'; // 引入模块DTO
import { listTpm6sApplyByPage, delTpm6sApply, approval6sApply, exportExcel } from '@/api/avic/mms/tpm/Tpm6sApplyApi'; // 引入模块API
import Tpm6sApplyAdd from './Tpm6sApplyAdd.vue'; // 引入添加页面组件
import Tpm6sApplyEdit from './Tpm6sApplyEdit.vue'; // 引入编辑页面组件
import AttachModal from './AttachModal.vue';
import flowUtils, { startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import { useUserStore } from '@/store/user';
import Tpm6sResolveCompareEdit from '@/views/avic/mms/tpm/tpm6sresolvecompare/Tpm6sResolveCompareEdit.vue';
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
    title: '立项编号',
    dataIndex: 'billNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '立项单位',
    dataIndex: 'editDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '问题立项',
    dataIndex: 'projectCategoryName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目立项名称',
    dataIndex: 'projectName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '提出时间',
    dataIndex: 'applyDate',
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
    title: '地点/位置',
    dataIndex: 'location',
    ellipsis: true,
    sorter: true,
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
    title: '问题描述',
    dataIndex: 'problemDescription',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '问题改善建议',
    dataIndex: 'problemAdvice',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目组长',
    dataIndex: 'chargeUserNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '团队成员',
    dataIndex: 'teamUserNameAlias',
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
const userStore = useUserStore();
const queryForm = ref<Tpm6sApplyDto>({
  bpmState: 'all',
  bpmType: 'all',
  editDeptId: userStore.userInfo.deptId
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
const approvalLoading = ref(false); // 提交审批按钮loading状态
const totalPage = ref(0);
const formCode = 'Tpm6sApply';
const attachOpen = ref(false); // 附件弹窗
const attchForm = reactive({
  id: '',
  info: ''
});

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpm6sApplyByPage(queryParam)
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
  if (selectedRows.value[0].editUserId !== userStore.userInfo.id) {
    proxy.$message.warning('请选择自己的数据编辑！');
    return;
  }
  if (selectedRows.value[0].createdBy !== userStore.userInfo.id) {
    proxy.$message.warning('只有自己添加的数据才可以编辑！');
    return;
  }
  if (selectedRows.value[0].bpmState !== 'start' && selectedRows.value[0].bpmState !== null) {
    proxy.$message.warning('只有拟稿中的数据和未提交审批的数据才可以编辑！');
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
  if (rows.filter(row => row.editUserId !== userStore.userInfo.id)?.length > 0) {
    proxy.$message.warning('只有自己的数据才可以删除！');
    return;
  }
  if (rows.filter(row => row.createdBy !== userStore.userInfo.id)?.length > 0) {
    proxy.$message.warning('只有自己添加的数据才可以删除！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据和未提交审批的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpm6sApply(ids)
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
/** 提交审批 */
const handleApproval = (rows, ids) => {
  if (ids.length !== 1) {
    proxy.$message.warning('请选择要提交审批的数据！');
    return;
  }
  if (rows.filter(row => row.editUserId !== userStore.userInfo.id)?.length > 0) {
    proxy.$message.warning('只有自己的数据才可以提交！');
    return;
  }
  if (rows.filter(row => row.createdBy !== userStore.userInfo.id)?.length > 0) {
    proxy.$message.warning('只有自己添加的数据才可以提交！');
    return;
  }
  if (rows.filter(row => row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有未提交的数据才可以提交审批！');
    return;
  }
  proxy.$confirm({
    title: '确认要提交审批选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      approvalLoading.value = true;
      getBpmDefine(rows[0]);
    }
  });
};

function getBpmDefine(row){
  startFlowByFormCode({
    formCode: formCode,
    formData: row,
    callback: bpmDefinedInfo => {
      approval(bpmDefinedInfo, row);
    }
  });
}

const approval = (bpmDefinedInfo, row) => {
  const param = {
    processDefId: bpmDefinedInfo.dbid,
    formCode: formCode,
    postData: row
  };
  approval6sApply(param).then(res => {
    if (res.success) {
      proxy.$message.success('提交成功');
      getList();
      approvalLoading.value = false;
      handleFlowDetail(row);
    } else {
      approvalLoading.value = false;
    }
  }).catch(() => {
    approvalLoading.value = false;
  });
};

/** 打开查看 */
const handleAttach = (record, title) => {
  attchForm.id = record.id;
  if (title === 'problemDescription') {
    attchForm.info = record.problemDescription;
  } else if (title === 'problemSolvingInstruction'){
    attchForm.info = record.problemSolvingInstruction;
  }
  attachOpen.value = true;
};

/** 关闭查看 */
const closeAttach = () => {
  attachOpen.value = false;
  attchForm.id = null;
};
</script>
