<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求部门">
              <AvicCommonSelect
                v-model:value="queryForm.requireDeptId"
                type="deptSelect"
                placeholder="请选择需求部门"
                :defaultShowValue="queryForm.requireDeptIdAlias"
                @callback="
                  result => {
                    queryForm.requireDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划类别">
              <a-select
                v-model:value="queryForm.planType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择计划类别"
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

          <a-col v-bind="colLayout.cols">
            <a-form-item label="制单状态">
              <a-select
                v-model:value="queryForm.businessStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择制单状态"
              >
                <a-select-option
                  v-for="item in businessStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined />
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost style="margin-right: 15px">
                  <redo-outlined />
                  重置
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
        ref="tpmTempMaintModifyPlan"
        table-key="tpmTempMaintModifyPlan"
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
        :customRow="customRow"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <!-- <a-button
              v-hasPermi="['tpmTempMaintModifyPlan:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button> -->
            <a-button
              v-hasPermi="['tpmTempMaintModifyPlan:save']"
              title="保存"
              type="primary"
              :loading="saveLoading"
              @click="handleSaveAll"
            >
              <template #icon>
                <save-outlined />
              </template>
              保存
            </a-button>
            <!-- <a-button
              v-hasPermi="['tpmTempMaintModifyPlan:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleDelete(selectedRowKeys, event,'');
                }
              "
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button> -->
            <a-button
              v-hasPermi="['tpmTempMaintModifyPlan:release']"
              title="下达"
              type="primary"
              :loading="commitLoading"
              @click="handleRelease(selectedRowKeys, '')"
            >
              <template #icon>
                <send-outlined />
              </template>
              下达
            </a-button>
            <a-button
              v-hasPermi="['tpmTempMaintModifyPlan:return']"
              title="退回"
              :loading="returnLoading"
              @click="handleBack(selectedRowKeys, '')"
              danger
            >
              <template #icon>
                <rollback-outlined />
              </template>
              退回
            </a-button>
            <a-button
              v-hasPermi="['tpmTempMaintModifyPlan:export']"
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
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入计划编号"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
            v-if="column.dataIndex === 'returnReason'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="512"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
              />
            </template>
            <template #default>
              {{ record['returnReason'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-if="column.dataIndex === 'estContractSignDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record[column.dataIndex]"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择"
              />
            </template>
            <template #default>
              {{ record['estContractSignDate'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-if="column.dataIndex === 'estAcceptanceDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record[column.dataIndex]"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择"
              />
            </template>
            <template #default>
              {{ record['estAcceptanceDate'] }}
            </template>
          </AvicRowEdit>
          <template v-else-if="column.dataIndex === 'attach'">
            <a @click="handleAttach(record)">查看</a>
          </template>
          <template v-else-if="column.dataIndex === 'businessStatusName'">
            <a-tag v-if="record['businessStatusName'] === '已指定'" color="orange">
              {{ record['businessStatusName'] }}
            </a-tag>
            <a-tag v-if="record['businessStatusName'] === '已下达'" color="green">
              {{ record['businessStatusName'] }}
            </a-tag>
          </template>
        </template>
      </AvicTable>
    </div>
    <avic-excel-import
      v-if="showImportModal"
      :formData="excelParams"
      title="导入"
      importUrl="/mms/tpm/tpmtempmaintmodifyplans/importData/v1"
      downloadTemplateUrl="/mms/tpm/tpmtempmaintmodifyplans/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    ></avic-excel-import>
    <AttachModal :attachOpen="attachOpen" :attach-form="attchForm" @closeAttach="closeAttach" />
  </div>
</template>
<script lang="ts" setup>
import type { TpmTempMaintModifyPlanDto } from '@/api/avic/mms/tpm/TpmTempMaintModifyPlanApi'; // 引入模块DTO
import {
  backTpmTempMaintModifyPlan,
  commitTpmTempMaintModifyPlan,
  delTpmTempMaintModifyPlan,
  exportReleaseExcel,
  listTpmTempMaintModifyPlanReleaseByPage,
  releaseTpmTempMaintModifyPlan,
  saveTpmTempMaintModifyPlan
} from '@/api/avic/mms/tpm/TpmTempMaintModifyPlanApi'; // 引入模块API
import AttachModal from '@/views/avic/mms/tpm/tpmtempmaintmodifyplan/AttachModal.vue';

const { proxy } = getCurrentInstance();
const commitLoading = ref(false); // 下达按钮loading状态
const returnLoading = ref(false); // 退回按钮loading状态
const layout = {
  labelCol: { flex: '90px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 调用布局公共方法
const columns = [
  {
    title: '制单状态',
    dataIndex: 'businessStatusName',
    key: 'businessStatusName',
    ellipsis: true,
    minWidth: 100,
    resizable: true,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '计划编号',
    dataIndex: 'planNo',
    key: 'planNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '经办人',
    dataIndex: 'agentIdAlias',
    key: 'agentIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '合同预计签订时间',
    dataIndex: 'estContractSignDate',
    key: 'estContractSignDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '计划验收时间',
    dataIndex: 'estAcceptanceDate',
    key: 'estAcceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '退回原因',
    dataIndex: 'returnReason',
    key: 'returnReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算项目',
    dataIndex: 'budgetItems',
    key: 'budgetItems',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '预算分项',
    dataIndex: 'budgetBreakdownItems',
    key: 'budgetBreakdownItems',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '预算组织',
    dataIndex: 'budgetOrganizationIdAlias',
    key: 'budgetOrganizationIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划类别',
    dataIndex: 'planTypeName',
    key: 'planTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '需求部门',
    dataIndex: 'requireDeptIdAlias',
    key: 'requireDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '需求时间',
    dataIndex: 'requireDate',
    key: 'requireDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },

  {
    title: '需求申请人',
    dataIndex: 'applyUserIdAlias',
    key: 'applyUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '联系电话',
    dataIndex: 'applyUserTel',
    key: 'applyUserTel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目金额（万元）',
    dataIndex: 'projectMoney',
    key: 'projectMoney',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '课题号',
    dataIndex: 'subjectNo',
    key: 'subjectNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否使用型号经费',
    dataIndex: 'ynUseModelFundingName',
    key: 'ynUseModelFundingName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '故障时间',
    dataIndex: 'faultDate',
    key: 'faultDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '申请理由',
    dataIndex: 'applyReason',
    key: 'applyReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '要求及建议',
    dataIndex: 'repairContent',
    key: 'repairContent',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  // {
  //   title: '申请单号',
  //   dataIndex: 'applyNo',
  //   key: 'applyNo',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '合同编号',
  //   dataIndex: 'contractNo',
  //   key: 'contractNo',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '合同实际签订时间',
  //   dataIndex: 'contractSignDate',
  //   key: 'contractSignDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '实际完成时间（完成验收）',
  //   dataIndex: 'acceptanceDate',
  //   key: 'acceptanceDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '进度状态',
  //   dataIndex: 'progressStatus',
  //   key: 'progressStatus',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '附件',
    dataIndex: 'attach',
    key: 'attach',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    key: 'secretLevelName',
    ellipsis: true,
    width: 80,
    resizable: true,
    align: 'center'
  }
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: 120,
  //   align: 'center',
  //   fixed: 'right'
  // }
];
const queryForm = ref<TpmTempMaintModifyPlanDto>({});
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
const tpmTempMaintModifyPlan = ref(null);
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmTempMaintModifyPlan' }); // 导入Excel数据过滤参数
const list = ref([]); // 表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const saveLoading = ref(false); // 统一保存按钮loading 状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'planType', lookUpType: 'TPM_PLAN_TYPE' },
  { fieldName: 'businessStatus', lookUpType: 'TPM_BUSINESS_STATUS' }
];
const attachOpen = ref(false); // 附件弹窗
const attchForm = reactive({
  id: '',
  secretLevel: ''
});
const planTypeList = ref([]); // 计划类别列表
const businessStatusList = ref([]); // 制单状态列表
const validateRules = {
  // returnReason: [{ required: true, message: '退回原因列不能为空' }]
  estContractSignDate: [{ required: true, message: '合同预计签约时间列不能为空' }],
  estAcceptanceDate: [{ required: true, message: '计划验收时间列不能为空' }]
}; // 必填列,便于保存和新增数据时校验
const returnRules = {
  returnReason: [{ required: true, message: '退回原因列不能为空' }]
};
const editingId = ref(''); // 正在编辑中的数据

onMounted(() => {
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
  queryForm.value.businessStatus = '5';
  queryParam.searchParams = { ...queryForm.value };
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  queryParam.searchParams.agentId = proxy.$getLoginUser().id;
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmTempMaintModifyPlanReleaseByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      // 查询的初始数据,保存时做比对
      initialList.value = proxy.$lodash.cloneDeep(list.value);
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

/** 提交 */
function handleCommit(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要提交的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要提交${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      commitLoading.value = true;
      commitTpmTempMaintModifyPlan(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('提交成功！');
            getList();
          }
          commitLoading.value = false;
        })
        .catch(() => {
          commitLoading.value = false;
        });
    }
  });
}

/** 退回 */
function handleBack(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要退回的数据！');
    return;
  }
  for (let item in ids) {
    let target = proxy.$lodash.cloneDeep(list.value.filter(i => i.id === ids[item])[0]);
    if (!validateRecordData([target], 'return')) {
      return;
    }
  }
  proxy.$confirm({
    title: `确认要退回${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      returnLoading.value = true;
      backTpmTempMaintModifyPlan(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('退回成功！');
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

/** 下达 */
function handleRelease(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要下达的数据！');
    return;
  }
  for (let item in ids) {
    let target = proxy.$lodash.cloneDeep(list.value.filter(i => i.id === ids[item])[0]);
    if (!validateRecordData([target], '')) {
      return;
    }
    if (target.businessStatus === '10') {
      proxy.$message.warning('选择的数据已下达');
      return;
    }
  }
  proxy.$confirm({
    title: `确认要下达${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      commitLoading.value = true;

      // 获取改变和新增的数据
      const changedData = proxy.$getChangeRecords(list, initialList);
      if (changedData && validateRecordData(changedData, '')) {
        saveTpmTempMaintModifyPlan(changedData)
          .then(res => {
            if (res.success) {
              releaseTpmTempMaintModifyPlan(ids)
                .then(result => {
                  if (result.success) {
                    proxy.$message.success('下达成功！');
                    getList();
                  }
                  commitLoading.value = false;
                })
                .catch(() => {
                  commitLoading.value = false;
                });
              commitLoading.value = false;
            } else {
              proxy.$message.error('保存失败！');
              commitLoading.value = false;
            }
          })
          .catch(() => {
            commitLoading.value = false;
          });
      } else {
        releaseTpmTempMaintModifyPlan(ids)
          .then(res => {
            if (res.success) {
              proxy.$message.success('下达成功！');
              getList();
            }
            commitLoading.value = false;
          })
          .catch(() => {
            commitLoading.value = false;
          });
      }
    }
  });
}

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    planTypeList.value = result.planType;
    businessStatusList.value = result.businessStatus.filter(
      row => row.lookupCode === '5' || row.lookupCode === '10'
    );
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

/** 高级查询 重置按钮操作  */
function resetQuery() {
  queryForm.value = {};
  queryForm.value.businessStatus = '5';
  handleQuery();
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

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    planNo: '',
    budgetItems: '',
    budgetBreakdownItems: '',
    budgetOrganizationId: '',
    budgetOrganizationCode: '',
    budgetOrganizationName: '',
    projectName: '',
    planType: undefined,
    requireDeptId: '',
    requireDeptCode: '',
    requireDeptName: '',
    applyUserId: '',
    applyUserCode: '',
    applyUserName: '',
    applyUserTel: '',
    projectMoney: '',
    subjectNo: '',
    ynUseModelFunding: undefined,
    faultDate: null,
    applyReason: '',
    repairContent: '',
    businessStatus: undefined,
    estContractSignDate: null,
    estAcceptanceDate: null,
    agentId: '',
    agentCode: '',
    agentName: '',
    applyNo: '',
    contractNo: '',
    contractSignDate: null,
    acceptanceDate: null,
    progressStatus: '',
    returnReason: '',
    note: '',
    secretLevel: undefined,
    editable: true // true为编辑中, false为未编辑
  };
  editingId.value = item.id;
  let newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData, '')) {
    return;
  }
  // 其他列编辑状态修改为false
  newData.forEach(item => {
    item.editable = false;
  });
  newData.unshift(item);
  list.value = newData;
}

/** 编辑 */
function handleEdit(record) {
  record.editable = true;
  record.operationType_ = record.operationType_ || 'update';
  const newData = [...list.value];
  editingId.value = record.id;
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}

/** 保存 */
function handleSave(record) {
  let target = proxy.$lodash.cloneDeep(record);
  // 单数据校验
  if (!validateRecordData([target], '')) {
    return;
  }
  // 保存前数据处理
  for (let key in target) {
    // 多选控件的数据，数组转化为字符串，
    if (Array.isArray(target[key])) {
      target[key] = target[key].join(',');
    }
  }
  editingId.value = '';
  saveTpmTempMaintModifyPlan([target]).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('保存成功！');
    } else {
      proxy.$message.error('保存失败！');
    }
  });
}

/** 批量保存 */
function handleSaveAll() {
  // 规避正在保存时连续点击
  if (saveLoading.value) return;
  // 开始处理数据
  saveLoading.value = true;
  // 获取改变和新增的数据
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && changedData.length == 0) {
    proxy.$message.warning('请先修改数据！');
    saveLoading.value = false;
  } else if (changedData && validateRecordData(changedData, '')) {
    saveTpmTempMaintModifyPlan(changedData)
      .then(res => {
        if (res.success) {
          getList();
          proxy.$message.success('保存成功！');
          saveLoading.value = false;
        } else {
          proxy.$message.error('保存失败！');
          saveLoading.value = false;
        }
      })
      .catch(() => {
        saveLoading.value = false;
      });
  } else {
    saveLoading.value = false;
  }
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
      exportReleaseExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}

/** 删除 */
function handleDelete(ids, e, type) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      // 获取所有非新增的数据，执行后台删除逻辑，新增的数据直接界面删除
      const deleteIds = ids.filter(id => id.indexOf('newLine') == -1);
      if (deleteIds.length > 0) {
        return delTpmTempMaintModifyPlan(deleteIds)
          .then(() => {
            removeRecordByIds(ids);
          })
          .catch(() => {
            delLoading.value = false;
          });
      } else {
        removeRecordByIds(ids);
      }
    }
  });
}

/** 打开附件查看 */
const handleAttach = record => {
  attachOpen.value = true;
  attchForm.id = record.id;
  attchForm.secretLevel = record.secretLevel;
};

/** 关闭附件 */
const closeAttach = () => {
  attachOpen.value = false;
  attchForm.id = null;
  attchForm.secretLevel = null;
};

/** 删除操作后更新list */
function removeRecordByIds(deleteIds) {
  let newData = [...list.value];
  let updateList = [...list.value];
  let delUpdateData = [];
  for (let i = 0; i < deleteIds.length; i++) {
    newData = newData.filter(item => item['id'] !== deleteIds[i]);
    delUpdateData = updateList.filter(
      item => item['id'] == deleteIds[i] && item['operationType_'] != 'insert'
    );
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  // 前台刷新表格
  list.value = newData;
  // 提示成功
  proxy.$message.success('删除成功！');
  delLoading.value = false;
  if (list.value.length == 0) {
    // 当前页数据被清空
    let currentPage = 1;
    if (queryParam.pageParameter.page > 1) {
      currentPage = queryParam.pageParameter.page - 1;
    }
    queryParam.pageParameter.page = currentPage;
    getList();
  } else {
    // 当前页数据没有全部删除时分页总条数为原total-删除数据中心非添加数据个数
    totalPage.value = totalPage.value - delUpdateData.length;
  }
}

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}

/** 控件变更事件  */
function changeControlValue(values, record, column) {
  let labels = [];
  if (Array.isArray(values)) {
    // 多选处理
    for (let i = 0; i < values.length; i++) {
      // 从对应的通用代码中查询对应的label
      const target = proxy[column + 'List'].find(item => values[i] === item.lookupCode);
      labels.push(target.lookupName);
    }
  } else {
    // 单选处理
    const target = proxy[column + 'List'].find(item => values === item.lookupCode);
    labels.push(target.lookupName);
  }
  if (record) {
    record[column + 'Name'] = labels.join(',');
  }
}

/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}

/** 批量数据校验 */
function validateRecordData(records, type) {
  let flag = true;
  for (let index in records) {
    if (type) {
      flag = proxy.$validateRecordData(
        records[index],
        returnRules,
        list.value,
        tpmTempMaintModifyPlan
      );
    } else {
      flag = proxy.$validateRecordData(
        records[index],
        validateRules,
        list.value,
        tpmTempMaintModifyPlan
      );
    }
    if (!flag) {
      break;
    }
  }
  return flag;
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}

/** 表头排序 */
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
