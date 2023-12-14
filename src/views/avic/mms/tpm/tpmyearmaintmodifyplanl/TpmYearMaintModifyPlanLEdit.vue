<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable ref="tpmYearMaintModifyPlanL" table-key="tpmYearMaintModifyPlanL" :height="300" :columns="columns"
               :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }" :showTableSetting="false" :pageParameter="queryParam.pageParameter" :total="totalPage" :customRow="customRow"
               @change="handleTableChange">
      <template v-if="!props.readOnly" #toolBarLeft>
        <a-space>
          <a-space>
            <a-button v-hasPermi="['tpmYearMaintModifyPlanL:add']" title="添加" type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined/>
              </template>
              添加
            </a-button>
            <a-button v-hasPermi="['tpmYearMaintModifyPlanL:del']" title="删除" danger
                      :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading" @click="event => {
                handleDelete(selectedRowKeys, event);
              }
                ">
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
          </a-space>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
        <AvicRowEdit v-if="['note', 'agentId', 'changeReason', 'agentCode', 'contractNo', 'projectMoney', 'requireDeptId', 'budgetBreakdownItems', 'budgetItems', 'requireDeptCode', 'budgetOrganizationId', 'applyNo', 'budgetOrganizationCode', 'projectName'].includes(
          column.dataIndex
        )" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-input v-model:value="record[column.dataIndex]" :maxLength="64" @input="$forceUpdate()"
                     style="width: 100%"
                     placeholder="请输入" @blur="blurInput($event, record, column.dataIndex)">
            </a-input>
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'secretLevel'" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-select v-model:value="record.secretLevel" style="width: 100%" placeholder="请选择密级"
                      @change="(value) => changeControlValue(value, record, 'secretLevel')">
              <a-select-option v-for="select in secretLevelList" :key="select.sysLookupTlId" :value="select.lookupCode"
                               :title="select.lookupName" :disabled="select.disabled === true">
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            {{ record['secretLevelName'] }}
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'budgetOrganizationName'" :record="record"
                     :column="column.dataIndex">
          <template #edit>
            <AvicCommonSelect v-model:value="record.budgetOrganizationName"
                              :defaultShowValue="record.budgetOrganizationNameAlias" placeholder="请选择预算组织名称"
                              type="deptSelect" @callback="(value, _selectRows) => {
                changeCommonSelect(value, record, 'budgetOrganizationName')
              }
                "/>
          </template>
          <template #default>
            {{ record['budgetOrganizationNameAlias'] }}
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'estContractSignDate'" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-date-picker v-model:value="record.estContractSignDate" value-format="YYYY-MM-DD"
                           placeholder="请选择合同预计签订时间">
            </a-date-picker>
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'acceptanceDate'" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-date-picker v-model:value="record.acceptanceDate" value-format="YYYY-MM-DD"
                           placeholder="请选择实际完成时间（完成验收）">
            </a-date-picker>
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'planType'" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-select v-model:value="record.planType" style="width: 100%" placeholder="请选择计划类别"
                      @change="(value) => changeControlValue(value, record, 'planType')">
              <a-select-option v-for="select in planTypeList" :key="select.sysLookupTlId" :value="select.lookupCode"
                               :title="select.lookupName" :disabled="select.disabled === true">
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            <AvicDictTag :value="record.planTypeName" :options="planTypeList"/>
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'agentName'" :record="record" :column="column.dataIndex">
          <template #edit>
            <AvicCommonSelect v-model:value="record.agentName" :defaultShowValue="record.agentNameAlias"
                              placeholder="请选择经办人姓名" type="userSelect" @callback="(value, _selectRows) => {
                changeCommonSelect(value, record, 'agentName')
              }
                "/>
          </template>
          <template #default>
            {{ record['agentNameAlias'] }}
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'requireDeptName'" :record="record" :column="column.dataIndex">
          <template #edit>
            <AvicCommonSelect v-model:value="record.requireDeptName" :defaultShowValue="record.requireDeptNameAlias"
                              placeholder="请选择需求部门名称" type="deptSelect" @callback="(value, _selectRows) => {
                changeCommonSelect(value, record, 'requireDeptName')
              }
                "/>
          </template>
          <template #default>
            {{ record['requireDeptNameAlias'] }}
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'estAcceptanceDate'" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-date-picker v-model:value="record.estAcceptanceDate" value-format="YYYY-MM-DD"
                           placeholder="请选择计划验收时间">
            </a-date-picker>
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'progressStatus'" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-select v-model:value="record.progressStatus" style="width: 100%" placeholder="请选择进度状态"
                      @change="(value) => changeControlValue(value, record, 'progressStatus')">
              <a-select-option v-for="select in progressStatusList" :key="select.sysLookupTlId"
                               :value="select.lookupCode"
                               :title="select.lookupName" :disabled="select.disabled === true">
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            <AvicDictTag :value="record.progressStatusName" :options="progressStatusList"/>
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'contractSignDate'" :record="record" :column="column.dataIndex">
          <template #edit>
            <a-date-picker v-model:value="record.contractSignDate" value-format="YYYY-MM-DD"
                           placeholder="请选择合同实际签订时间">
            </a-date-picker>
          </template>
        </AvicRowEdit>
        <template v-else-if="column.dataIndex === 'action' && !props.readOnly">
          <a-button class="inner-btn" type="link" @click="event => {
            handleDelete([record.id], event);
          }
            ">
            删除
          </a-button>
        </template>
      </template>
    </AvicTable>
  </div>
</template>
<script lang="ts" setup>
import type { TpmYearMaintModifyPlanLDto } from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanLApi'; // 引入模块DTO
import { listTpmYearMaintModifyPlanLByPage } from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanLApi'; // 引入模块API

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  }
});
const columns = [
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
    title: '预算项目',
    dataIndex: 'budgetItems',
    key: 'budgetItems',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算分项',
    dataIndex: 'budgetBreakdownItems',
    key: 'budgetBreakdownItems',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '预算组织ID',
  //   dataIndex: 'budgetOrganizationId',
  //   key: 'budgetOrganizationId',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '预算组织编码',
  //   dataIndex: 'budgetOrganizationCode',
  //   key: 'budgetOrganizationCode',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '预算组织名称',
    dataIndex: 'budgetOrganizationName',
    key: 'budgetOrganizationName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划类别',
    dataIndex: 'planType',
    key: 'planType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '需求部门ID',
  //   dataIndex: 'requireDeptId',
  //   key: 'requireDeptId',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '需求部门编码',
  //   dataIndex: 'requireDeptCode',
  //   key: 'requireDeptCode',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '需求部门名称',
    dataIndex: 'requireDeptName',
    key: 'requireDeptName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目金额（万元）',
    dataIndex: 'projectMoney',
    key: 'projectMoney',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同预计签订时间',
    dataIndex: 'estContractSignDate',
    key: 'estContractSignDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '经办人ID',
  //   dataIndex: 'agentId',
  //   key: 'agentId',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '经办人编码',
  //   dataIndex: 'agentCode',
  //   key: 'agentCode',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '经办人姓名',
    dataIndex: 'agentName',
    key: 'agentName',
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
  {
    title: '计划验收时间',
    dataIndex: 'estAcceptanceDate',
    key: 'estAcceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '进度状态',
  //   dataIndex: 'progressStatus',
  //   key: 'progressStatus',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  {
    title: '变更原因',
    dataIndex: 'changeReason',
    key: 'changeReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  }
] as any[];
const queryForm = ref<TpmYearMaintModifyPlanLDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {},
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const tpmYearMaintModifyPlanL = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const isShow = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const planTypeList = ref([]); // 计划类别通用代码
const progressStatusList = ref([]); // 进度状态通用代码
const lookupParams = [
  { fieldName: 'planType', lookUpType: 'TPM_PLAN_TYPE' },
  { fieldName: 'progressStatus', lookUpType: 'TPM_PROGRESS_STATUS' }
];
const validateRules = {
  secretLevel: [
    { required: true, message: '密级列不能为空' }
  ]
}; // 必填列,便于保存和新增数据时校验
const deletedData = ref([]); // 前台删除数据的记录

// 非只读状态添加操作列
if (!props.readOnly) {
  columns.push({
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    fixed: 'right',
    align: 'center'
  });
}

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
  queryForm.value.tpmYearMaintModifyPlanId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listTpmYearMaintModifyPlanLByPage(queryParam)
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

/** 获取修改的数据 */
function getChangedData() {
  deletedData.value.forEach(item => {
    item['operationType_'] = 'delete';
  });
  const changedData = proxy.$getChangeRecords(list, initialList);
  return deletedData.value.concat(changedData);
}

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    planNo: '',
    budgetItems: '',
    budgetBreakdownItems: '',
    // budgetOrganizationId: '',
    // budgetOrganizationCode: '',
    budgetOrganizationName: '',
    projectName: '',
    planType: undefined,
    // requireDeptId: '',
    // requireDeptCode: '',
    requireDeptName: '',
    projectMoney: '',
    estContractSignDate: null,
    estAcceptanceDate: null,
    // agentId: '',
    // agentCode: '',
    agentName: '',
    // applyNo: '',
    // contractNo: '',
    // contractSignDate: null,
    // acceptanceDate: null,
    // progressStatus: undefined,
    changeReason: '',
    // note: '',
    secretLevel: undefined,
    editable: true // true为编辑中, false为未编辑
  };
  const newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData)) {
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
  record.editable = !props.readOnly;
  record.operationType_ = record.operationType_ || 'update';
  const newData = [...list.value];
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}

/** 删除处理逻辑*/
function handleDelete(ids, e) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  let newData = [...list.value];
  let deletedItems = [];
  for (let i = 0; i < ids.length; i++) {
    if (ids[i].indexOf('newLine') == -1) {
      // 缓存删除的后台数据
      deletedItems.push(newData.find(item => item['id'] == ids[i]));
    }
    newData = newData.filter(item => item['id'] !== ids[i]);
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  selectedRows.value = [];
  // 前台刷新表格
  list.value = newData;
  deletedData.value = deletedData.value.concat(deletedItems);
}

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
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

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}

/**控件变更事件 */
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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, tpmYearMaintModifyPlanL);
    if (!flag) {
      break;
    }
  }
  return flag;
}

/** 校验并执行回调函数*/
function validate(callback) {
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && validateRecordData(changedData)) {
    // 校验通过
    if (callback) {
      callback(true);
    }
  } else {
    // 校验未通过
    if (callback) {
      callback(false);
    }
  }
}

defineExpose({
  validate,
  getChangedData
});
</script>



