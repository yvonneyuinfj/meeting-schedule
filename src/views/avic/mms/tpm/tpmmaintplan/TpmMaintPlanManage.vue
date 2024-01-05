<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="设备编号">
              <a-input
                v-model:value="queryForm.equipmentCode"
                placeholder="请输入设备编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="保养状态">
              <a-select
                v-model:value="queryForm.maintenanceStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择保养状态"
              >
                <a-select-option
                  v-for="item in maintenanceStatusList"
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
        ref="tpmMaintPlan"
        table-key="tpmMaintPlan"
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
            <div style="padding-left: 8px">保养时间:</div>
            <!-- <a-date-picker
              style="width: 125px"
              v-model:value="barForm.startDate"
              :disabled-date="disabledStartDate"
              value-format="YYYY-MM-DD"
              placeholder="请选择开始时间"
              format="YYYY-MM-DD"
            />
            <div style="width: 80px">保养时间(至)</div>
            <a-date-picker
              style="width: 125px"
              v-model:value="barForm.endDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled-date="disabledEndDate"
              placeholder="请选择结束时间"
            /> -->
            <a-range-picker
              v-model:value="dateRange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              @change="
                rangeValue => {
                  barForm.startDate = rangeValue[0];
                  barForm.endDate = rangeValue[1];
                }
              "
              :allowClear = "true"
              style="width: 230px"
            ></a-range-picker>
            <a-button type="primary" @click="handleCreative" :loading="creativeLoading">
              <template #icon>
                <FileAddOutlined />
              </template>
              生成
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
              v-hasPermi="['tpmMaintPlan:del']"
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
              title="取消计划"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="cancelLoading"
              @click="handleCancelPlans(selectedRows, selectedRowKeys)"
            >
              <template #icon>
                <close-circle-outlined />
              </template>
              取消计划
            </a-button>
            <a-button
              v-hasPermi="['tpmMaintPlan:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              手动添加
            </a-button>
            <!--            <a-button-->
            <!--              v-hasPermi="['tpmMaintPlan:export']"-->
            <!--              title="导出"-->
            <!--              type="primary"-->
            <!--              ghost-->
            <!--              @click="handleExport">-->
            <!--              <template #icon>-->
            <!--                <export-outlined/>-->
            <!--              </template>-->
            <!--              导出-->
            <!--            </a-button>-->
          </a-space>
        </template>
        <template #toolBarRight>
          <a-space>
            <AvicBpmFilter
              :allFileAuth="['tpmMaintPlan:all']"
              :myFileAuth="['tpmMaintPlan:my']"
              :defaultBpmType="queryForm.bpmType"
              :defaultBpmState="queryForm.bpmState"
              @change="changeBpmFilter"
            />
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'billNo' && record.bpmState !== null">
            <a @click="handleFlowDetail(record)">
              {{ record.billNo }}
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <TpmMaintPlanAdd
      v-if="showAddModal"
      ref="addModal"
      :bpmOperatorRefresh="getList"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <TpmMaintPlanEdit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { TpmMaintPlanDto } from '@/api/avic/mms/tpm/TpmMaintPlanApi'; // 引入模块DTO
import {
  listTpmMaintPlanByPage,
  delTpmMaintPlan,
  cancelTpmMaintPlan,
  exportExcel,
  creativeMaintPlan,
  approvalMaintPlan
} from '@/api/avic/mms/tpm/TpmMaintPlanApi'; // 引入模块API
import TpmMaintPlanAdd from './TpmMaintPlanAdd.vue'; // 引入添加页面组件
import TpmMaintPlanEdit from './TpmMaintPlanEdit.vue'; // 引入编辑页面组件
import flowUtils, { startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import dayjs from 'dayjs';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 90px' },
  wrapperCol: { flex: '1 1 0' }
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
    title: '计划编号',
    dataIndex: 'billNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },

  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划保养日期',
    dataIndex: 'planMaintenanceDate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '上次保养日期',
    dataIndex: 'oldLastMaintenPlanDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '使用部门',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养项目',
    dataIndex: 'maintenanceItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养部位',
    dataIndex: 'maintenancePosition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养依据',
    dataIndex: 'maintenanceBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养内容',
    dataIndex: 'maintenanceContent',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养要求',
    dataIndex: 'maintenanceRequirement',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养负责人',
    dataIndex: 'maintUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },

  {
    title: '保养周期(月)',
    dataIndex: 'maintenanceCycle',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '小时数',
    dataIndex: 'maintenanceHours',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否自主维护',
    dataIndex: 'ynSelfMaintenanceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '编制时间',
    dataIndex: 'editDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养状态',
    dataIndex: 'maintenanceStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养计划类型',
    dataIndex: 'maintenPlanTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '驳回原因',
    dataIndex: 'backReason',
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
    align: 'center',
    fixed: 'right'
  },
  {
    title: '当前处理人',
    dataIndex: 'assigneenames_',
    ellipsis: true,
    width: 130,
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<TpmMaintPlanDto>({
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
const barForm = ref({
  endDate: '',
  startDate: ''
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
const approvalLoading = ref(false);
const creativeLoading = ref(false);
const cancelLoading = ref(false);
const totalPage = ref(0);
const maintenanceStatusList = ref([]); // 保养状态通用代码
const goodConditionFlagList = ref([]); // 完好标识通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'maintenanceStatus', lookUpType: 'TPM_MAINTEN_STATUS' },
  { fieldName: 'goodConditionFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
];
const dateRange = ref<[string, string]>();

onBeforeMount(() => {
  barForm.value.startDate = dayjs(new Date()).startOf('year').format('YYYY-MM-DD');
  barForm.value.endDate = dayjs(new Date()).endOf('year').format('YYYY-MM-DD');
  dateRange.value = [barForm.value.startDate, barForm.value.endDate];
  queryForm.value.maintenanceStatus = '0';
});

onMounted(() => {
  queryParam.searchParams = { ...queryForm.value };
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 开始时间禁选 */
// const disabledStartDate = current => {
//   if (barForm.value.endDate) {
//     return current && current > barForm.value.endDate;
//   }
// };

/** 结束时间禁选 */
// const disabledEndDate = current => {
//   if (barForm.value.startDate) {
//     return current && current < barForm.value.startDate;
//   }
// };

/** 生成 */
const handleCreative = () => {
  if (!barForm.value.startDate || !barForm.value.endDate) {
    proxy.$message.warning('请选择保养时间的开始时间与结束时间!');
  }
  const data = {
    planMaintenanceDateBegin: barForm.value.startDate,
    planMaintenanceDateEnd: barForm.value.endDate,
    useDeptId: proxy.$getLoginUser().entityDeptId
  };
  creativeLoading.value = true;
  //生成逻辑
  creativeMaintPlan(data)
    .then(res => {
      if (res.success) {
        if (res.data > 0) {
          proxy.$message.success(`生成成功！共生成${res.data}条数据。`);
          getList();
        } else {
          proxy.$message.info('该时段内没有可生成的数据。');
        }
      }
    })
    .catch(e => {
      proxy.$message.error(e.message);
      getList();
    })
    .finally(() => {
      creativeLoading.value = false;
    });
};

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmMaintPlanByPage(queryParam)
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
    maintenanceStatusList.value = result.maintenanceStatus;
    goodConditionFlagList.value = result.goodConditionFlag;
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
  queryForm.value.maintenanceStatus = '0';
  handleQuery();
}

/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    tpmStandardId: value,
    tpmStandardMaintenanceId: value
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
  if (record.tpmWorkflowId) {
    flowUtils.detailByOptions({
      formId: record.tpmWorkflowId,
      bpmOperatorRefresh: getList
    });
  }
}

/** 提交审批 */
const handleApproval = (rows, ids) => {
  proxy.$confirm({
    title: '确认要提交审批查询出的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      approvalLoading.value = true;
      getBpmDefine(rows[0]);
    }
  });
};

function getBpmDefine(row) {
  startFlowByFormCode({
    formCode: 'TpmMaintPlan',
    formData: row,
    callback: bpmDefinedInfo => {
      approval(bpmDefinedInfo);
    }
  });
}

const approval = bpmDefinedInfo => {
  console.log(bpmDefinedInfo);
  const param = {
    processDefId: bpmDefinedInfo.dbid,
    formCode: 'TpmMaintPlan'
  };
  approvalMaintPlan(param)
    .then(res => {
      if (res.success) {
        approvalLoading.value = false;
        if (res.data.formId) {
          flowUtils.detailByOptions({
            formId: res.data.formId,
            bpmOperatorRefresh: getList
          });
        }
        proxy.$message.success('提交成功!');
        getList();
      } else {
        approvalLoading.value = false;
      }
    })
    .catch(() => {
      approvalLoading.value = false;
    });
};

/** 取消计划 */
const handleCancelPlans = (rows, ids) => {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要取消的计划！');
    return;
  }
  if (rows.filter(row => row.billStatus !== 20)?.length > 0) {
    proxy.$message.warning('审批通过后取消计划');
    return;
  }
  if (rows.filter(row => row.businessstate_ != '结束')?.length > 0) {
    proxy.$message.warning('审批通过后才可以取消计划');
    return;
  }
  proxy.$confirm({
    title: '确认要取消选择的计划吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      cancelLoading.value = true;
      cancelTpmMaintPlan(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('取消成功！');
            getList();
          }
        })
        .catch((e) => {
          proxy.$message.error(e.message);
        }).finally(() => {
          cancelLoading.value = false;
        });
    }
  });
};

/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmMaintPlan(ids)
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
<style scoped>
.ant-picker-range {
  display: flex;
}
</style>
