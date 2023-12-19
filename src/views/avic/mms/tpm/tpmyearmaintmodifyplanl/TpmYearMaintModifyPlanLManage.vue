<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable ref="tpmYearMaintModifyPlanL" table-key="tpmYearMaintModifyPlanL" :columns="columns"
                 :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" :customRow="record => {
  return {
    onClick: () => {
      handleRowSelection(record);
    }
  };
}
  " @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <a-button v-hasPermi="['tpmYearMaintModifyPlanL:import']" title="导入" type="primary" ghost
                      @click="handleImport">
              <template #icon>
                <import-outlined/>
              </template>
              导入
            </a-button>
            <a-button danger :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" title="删除"
                      :loading="delLoading"
                      @click="handleDelete(selectedRowKeys, '')">
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入计划编号"
                          :allow-clear="true"
                          @search="handleKeyWordQuery"/>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" class="inner-btn" @click="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <AvicExcelImport
      v-if="showImportModal"
      :formData="excelParams"
      title="单表模板导入"
      importUrl="/mms/tpm/tpmyearmaintmodifyplanls/importData/v1"
      downloadTemplateUrl="/mms/tpm/tpmyearmaintmodifyplanls/downloadTemplate/v1"
      @reloadData="reloadList"
      @close="showImportModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  listTpmYearMaintModifyPlanLByPage,
  delTpmYearMaintModifyPlanL
} from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanLApi'; // 引入模块API
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmYearMaintModifyPlanL', tpmYearMaintModifyPlanId: '' });
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  mainForm: {
    type: Object
  }
});
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
    title: '计划编号',
    dataIndex: 'planNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '预算项目',
    dataIndex: 'budgetItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算分项',
    dataIndex: 'budgetBreakdownItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算组织',
    dataIndex: 'budgetOrganizationIdAlias',
    ellipsis: true,
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
    title: '计划类别',
    dataIndex: 'planTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '需求部门',
    dataIndex: 'requireDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目金额（万元）',
    dataIndex: 'projectMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同预计签订时间',
    dataIndex: 'estContractSignDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划验收时间',
    dataIndex: 'estAcceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '经办人',
    dataIndex: 'agentIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '变更原因',
    dataIndex: 'changeReason',
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
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    tpmYearMaintModifyPlanId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const emit = defineEmits(['getSonList', 'getTableList']);
const list = ref([]); // 表格数据集合
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const planTypeList = ref([]); // 计划类别通用代码
const progressStatusList = ref([]); // 进度状态通用代码
const lookupParams = [
  { fieldName: 'planType', lookUpType: 'TPM_PLAN_TYPE' },
  { fieldName: 'progressStatus', lookUpType: 'TPM_PROGRESS_STATUS' }
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
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.tpmYearMaintModifyPlanId = props.mainId ? props.mainId : '-1';
  listTpmYearMaintModifyPlanLByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      emit('getSonList', list.value.length);
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

function reloadList() {
  getList();
  emit('getTableList');
}

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    planTypeList.value = result.planType;
    progressStatusList.value = result.progressStatus;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    planNo: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 子表导入 */
function handleImport() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  if (props.mainForm.bpmState !== null && props.mainForm.bpmState !== 'start') {
    proxy.$message.warning('请选择未提交或拟稿中的主数据导入！');
    return;
  }
  excelParams.value.tpmYearMaintModifyPlanId = props.mainId;
  showImportModal.value = true;
}

/** 子表删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (props.mainForm.bpmState !== null && props.mainForm.bpmState !== 'start') {
    proxy.$message.warning('请选择未提交或拟稿中的数据删除！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmYearMaintModifyPlanL(ids)
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

/** 表头排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}

watch(
  () => props.mainId,
  newVal => {
    if (newVal) {
      getList(); // 查询表格数据
    } else {
      selectedRowKeys.value = []; // 清空选中
      selectedRows.value = [];
      list.value = [];
      totalPage.value = 0;
    }
  },
  { immediate: true }
);
</script>

