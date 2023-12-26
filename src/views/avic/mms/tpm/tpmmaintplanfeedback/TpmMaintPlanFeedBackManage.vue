<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划编号">
              <a-input
                  v-model:value="queryForm.billNo"
                  placeholder="请输入计划编号"
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
          :customRow="customRow"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
                v-hasPermi="['tpmMaintPlan:save']"
                title="保存"
                type="primary"
                :loading="saveLoading"
                @click="handleSaveAll"
            >
              <template #icon>
                <save-outlined/>
              </template>
              保存
            </a-button>
            <a-button type="primary" @click="handleApproval(selectedRows, selectedRowKeys)" :loading="approvalLoading">
              提交审批
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-space>
            <AvicBpmFilter
                :allFileAuth="['tpmMaintPlan:all']"
                :myFileAuth="['tpmMaintPlan:my']"
                :defaultBpmType='queryForm.bpmType'
                :defaultBpmState='queryForm.bpmState'
                @change="changeBpmFilter"
            />
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'billNo' && record.bpmState !== null">
            <a @click="handleFlowDetail(record)">
              {{ record.billNo }}
            </a>
          </template>
          <AvicRowEdit
              v-if="column.dataIndex === 'completeDate'"
              :record="record"
              :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                  v-model:value="record.completeDate"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择完工日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
              v-else-if="column.dataIndex === 'goodConditionFlag' "
              :record="record"
              :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                  v-model:value="record.goodConditionFlag"
                  style="width: 100%"
                  placeholder="请选择完好标识"
                  @change="(value)=>changeControlValue(value,record,'goodConditionFlag')"
              >
                <a-select-option
                    v-for="select in goodConditionFlagList"
                    :key="select.sysLookupTlId"
                    :value="select.lookupCode"
                    :title="select.lookupName"
                >
                  {{ select.lookupName }}
                </a-select-option>
              </a-select>
            </template>
            <template #default>
              <AvicDictTag
                  :value="record.goodConditionFlagName"
                  :options="goodConditionFlagList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
              v-else-if="column.dataIndex === 'maintConclusion'"
              :record="record"
              :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                  v-model:value="record.maintConclusion"
                  style="width: 100%"
                  placeholder="请选择保养结论"
                  @change="(value)=>changeControlValue(value,record,'maintConclusion')"
              >
                <a-select-option
                    v-for="select in maintConclusionList"
                    :key="select.sysLookupTlId"
                    :value="select.lookupCode"
                    :title="select.lookupName"
                >
                  {{ select.lookupName }}
                </a-select-option>
              </a-select>
            </template>
            <template #default>
              <AvicDictTag
                  :value="record.maintConclusionName"
                  :options="maintConclusionList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
              v-else-if="['problemDescription'].includes(
               column.dataIndex
              )"
              :record="record"
              :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                  v-model:value="record[column.dataIndex]"
                  :maxLength="256"
                  @input="$forceUpdate()"
                  style="width: 100%"
                  placeholder="请输入问题说明"
                  @click="handleOpen(record)"
                  @blur="blurInput($event, record, column.dataIndex)"
              >
              </a-input>
            </template>
          </AvicRowEdit>
        </template>
      </AvicTable>
    </div>
    <!--问题说明弹窗-->
    <a-modal :visible="open" title="问题说明" @ok="handleOk" @cancel="handleCancel" width="40%" style="top: 20px">
      <div style="height: 400px;overflow: auto">
        <Attach-modal ref="attachModal"></Attach-modal>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import type { TpmMaintPlanReleaseDto } from '@/api/avic/mms/tpm/TpmMaintPlanReleaseApi'; // 引入模块DTO
import flowUtils, { openFlowDetail, startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import {
  listTpmMaintPlanFeedBackByPage,
  saveTpmMaintPlan,
  exportExcel, approvalMaintPlanFeedBack
} from '@/api/avic/mms/tpm/TpmMaintPlanReleaseApi';
import AttachModal from './AttachModal.vue';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 调用布局公共方法
const columns = [
  {
    title: '计划编号',
    dataIndex: 'billNo',
    key: 'billNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '完好标识',
    dataIndex: 'goodConditionFlag',
    key: 'goodConditionFlag',
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
    title: '完工日期',
    dataIndex: 'completeDate',
    key: 'completeDate',
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
    title: '保养结论',
    dataIndex: 'maintConclusion',
    key: 'maintConclusion',
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
    title: '问题说明',
    dataIndex: 'problemDescription',
    key: 'problemDescription',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '使用部门',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养项目',
    dataIndex: 'maintenanceItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养部位',
    dataIndex: 'maintenancePosition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养依据',
    dataIndex: 'maintenanceBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养内容',
    dataIndex: 'maintenanceContent',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养要求',
    dataIndex: 'maintenanceRequirement',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '上次保养日期',
    dataIndex: 'oldLastMaintenPlanDate',
    key: 'oldLastMaintenPlanDate',
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
    align: 'right'
  },
  {
    title: '小时数',
    dataIndex: 'maintenanceHours',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
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
    title: '计划保养日期',
    dataIndex: 'planMaintenanceDate',
    key: 'planMaintenanceDate',
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
    title: '保养负责人',
    dataIndex: 'maintUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '实际保养人',
    dataIndex: 'actrualMaintUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '外委专业厂家',
    dataIndex: 'vendorName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下达人',
    dataIndex: 'dispatchUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下达日期',
    dataIndex: 'dispatchDate',
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
    title: '保养完成日期',
    dataIndex: 'maintenanceFinishDate',
    key: 'maintenanceFinishDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养计划类型',
    dataIndex: 'maintenPlanTypeName',
    key: 'maintenPlanType',
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
const queryForm = ref<TpmMaintPlanReleaseDto>({
  bpmState: 'all',
  bpmType: 'all'
});
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
const tpmMaintPlan = ref(null);
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmMaintPlan' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const saveLoading = ref(false); // 统一保存按钮loading 状态
const approvalLoading = ref(false);
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const maintenanceStatusList = ref([]); // 保养状态通用代码
const goodConditionFlagList = ref([]); // 完好标识通用代码
const maintenPlanTypeList = ref([]); // 保养计划类型通用代码
const secretLevelList = ref([]); // 密级通用代码
const maintConclusionList = ref([]); // 保养结论通用代码
const lookupParams = [
  { fieldName: 'maintenanceStatus', lookUpType: 'TPM_MAINTEN_STATUS' },
  { fieldName: 'goodConditionFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'maintenPlanType', lookUpType: 'TPM_MAINTEN_PLAN_TYPE' },
  { fieldName: 'maintConclusion', lookUpType: 'TPM_MAINT_CONCLUSION' }
];
const validateRules = {
  goodConditionFlag: [
    { required: true, message: '完好标识列不能为空' }
  ],
  completeDate: [
    { required: true, message: '完工日期列不能为空' }
  ],
  maintConclusion: [
    { required: true, message: '保养结论列不能为空' }
  ]
}; // 必填列,便于保存和新增数据时校验
const editingId = ref(''); // 正在编辑中的数据
const open = ref(false); // 附件弹窗
const attachModal = ref(null);
const currentRecord = ref<TpmMaintPlanReleaseDto>({});
const props = defineProps({
  bpmOperatorRefresh: {
    type: Function
  }
});

onMounted(() => {
  queryForm.value.maintenanceStatus = '10';
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  const keyWord = {
    maintUserId: proxy.$getLoginUser().id,
    actrualMaintUserId: proxy.$getLoginUser().id,
    maintenanceStatus: '10',
    billNo: queryForm.value.billNo
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmMaintPlanFeedBackByPage(queryParam)
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

/** 根据流程状态及发起人查询数据 */
function changeBpmFilter({ bpmType, bpmState }) {
  queryForm.value.bpmType = bpmType;
  queryForm.value.bpmState = bpmState;
  queryParam.searchParams = queryForm.value;
  getList();
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
  if (ids.length == 0) {
    proxy.$message.warning('请选择要提交审批的数据！');
    return;
  }
  // if (ids.length > 1) {
  //   proxy.$message.warning('请选择一条要提交审批的数据！');
  //   return;
  // }
  for (let item of rows) {
    if (item.bpmState !== null) {
      proxy.$message.warning('请选择未提交审批的数据！');
      return;
    }
  }
  if (validateRecordData(rows)) {
    proxy.$confirm({
      title: '确认要提交审批查询出的数据吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        for (let item of rows) {
          item.operationType_ = 'update';
        }
        saveTpmMaintPlan(rows).then(res => {
          if (res.success) {
            approvalLoading.value = true;
            getBpmDefine(rows, ids);
          }
        });

      }
    });
  }
};

function getBpmDefine(rows, ids) {
  startFlowByFormCode({
    formCode: 'TpmMaintPlanFeedBack',
    formData: rows,
    callback: bpmDefinedInfo => {
      approval(bpmDefinedInfo, ids, rows);
    }
  });
}

const approval = (bpmDefinedInfo, ids, rows) => {
  const param = {
    processDefId: bpmDefinedInfo.dbid,
    formCode: 'TpmMaintPlanFeedBack',
    jsonString: JSON.stringify({ ids: ids })
  };
  approvalMaintPlanFeedBack(param).then(res => {
    if (res.success) {
      approvalLoading.value = false;
      proxy.$message.success('提交成功!');
      getList();
      if (res.data) {
        openFlowDetail(res.data, props.bpmOperatorRefresh);
      }
    } else {
      approvalLoading.value = false;
    }
  }).catch(() => {
    approvalLoading.value = false;
  });
};

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    maintenanceStatusList.value = result.maintenanceStatus;
    goodConditionFlagList.value = result.goodConditionFlag;
    maintenPlanTypeList.value = result.maintenPlanType;
    maintConclusionList.value = result.maintConclusion;
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
  queryForm.value.maintenanceStatus = '10';
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
  if (!validateRecordData([target])) {
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
  saveTpmMaintPlan([target]).then(res => {
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
  } else if (changedData && validateRecordData(changedData)) {
    saveTpmMaintPlan(changedData).then(res => {
      if (res.success) {
        getList();
        proxy.$message.success('保存成功！');
        saveLoading.value = false;
      } else {
        proxy.$message.error('保存失败！');
        saveLoading.value = false;
      }
    }).catch(() => {
      saveLoading.value = false;
    });
  } else {
    saveLoading.value = false;
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

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      if (record.bpmState == null || record.bpmState == 'start') {
        handleEdit(record);
      }
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
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, tpmMaintPlan);
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

function handleOpen(record) {
  open.value = true;
  currentRecord.value = record;
  console.log(record.problemDescription);
  setTimeout(async () => {
    attachModal.value.note = record.problemDescription;
  }, 300);
  // if (record.problemDescription){
  //   attachModal.value.note = record.problemDescription;
  // }
}

const handleCancel = () => {
  open.value = false;
};

const handleOk = () => {
  currentRecord.value.problemDescription = attachModal.value.note;
  open.value = false;
};
</script>

