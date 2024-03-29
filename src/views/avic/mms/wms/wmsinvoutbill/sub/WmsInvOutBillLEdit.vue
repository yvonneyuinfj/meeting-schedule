<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="wmsInvOutBillL"
      table-key="wmsInvOutBillL"
      :height="300"
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
      :showTableSetting="false"
      :pageParameter="queryParam.pageParameter"
      :total="totalPage"
      :customRow="customRow"
      @change="handleTableChange"
    >
      <template v-if="!props.readOnly" #toolBarLeft>
        <a-space>
          <a-space>
            <a-button
              v-hasPermi="['wmsInvOutBillL:add']"
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
              v-hasPermi="['wmsInvOutBillL:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleDelete(selectedRowKeys, event);
                }
              "
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
          </a-space>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
           v-if="column.dataIndex === 'planOpenDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.planOpenDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择开放时间"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="['cuttingFlag','note','checkKiloQty','mdsItemId','outDeptCode','dispatchListNo','grantBasis','surplusSize','planOpenUserName','missionNo','siteName','pmsInvoiceAssonInvBillId','lotNo','urgentLevel','outDeptName','momOutRequireId','surplusQty','outDeptId','deflectionBillno','planOpenUserCode','batchNo','siteCode','planType','workLine','planOpenUserId','otherSysFlag','ynInstallFlag','siteId','applyQty','originalItemId','proMdsItemId'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="64"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
             >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'secretLevel'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.secretLevel"
                style="width: 100%"
                placeholder="请选择密级"
                @change="(value)=>changeControlValue(value,record,'secretLevel')"
              >
                <a-select-option
                  v-for="select in secretLevelList"
                  :key="select.sysLookupTlId"
                  :value="select.lookupCode"
                  :title="select.lookupName"
                  :disabled="select.disabled === true"
                >
                  {{ select.lookupName }}
                </a-select-option>
              </a-select>
            </template>
            <template #default>
              {{ record['secretLevelName'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'requireDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.requireDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择需求日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
        <template v-else-if="column.dataIndex === 'action' && !props.readOnly">
          <a-button
            class="inner-btn"
            type="link"
            @click="
              event => {
                handleDelete([record.id], event);
              }
            "
          >
            删除
          </a-button>
        </template>
      </template>
    </AvicTable>
  </div>
</template>
<script lang="ts" setup>
import type { WmsInvOutBillLDto } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块DTO
import { listWmsInvOutBillLByPage } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块API

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
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell () {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '物料编码',
    dataIndex: 'mdsItemId',
    key: 'mdsItemId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell () {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  },
  {
    title: '申请数量',
    dataIndex: 'applyQty',
    key: 'applyQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell () {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  },
  {
    title: '产品/机型',
    dataIndex: 'proMdsItemId',
    key: 'proMdsItemId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批次',
    dataIndex: 'batchNo',
    key: 'batchNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '架次',
    dataIndex: 'lotNo',
    key: 'lotNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '派工号',
    dataIndex: 'missionNo',
    key: 'missionNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
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
    title: '单据状态',
    dataIndex: 'outBillLStatus',
    key: 'outBillLStatus',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '退回原因',
    dataIndex: 'refuseReason',
    key: 'refuseReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门ID',
    dataIndex: 'outDeptId',
    key: 'outDeptId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门CODE',
    dataIndex: 'outDeptCode',
    key: 'outDeptCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门NAME',
    dataIndex: 'outDeptName',
    key: 'outDeptName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票关联表ID【冗余字段】^用于是否关联发票',
    dataIndex: 'pmsInvoiceAssonInvBillId',
    key: 'pmsInvoiceAssonInvBillId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否下料 N-否，Y-是',
    dataIndex: 'cuttingFlag',
    key: 'cuttingFlag',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库需求表ID',
    dataIndex: 'momOutRequireId',
    key: 'momOutRequireId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '余料数量',
    dataIndex: 'surplusQty',
    key: 'surplusQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '余料尺寸',
    dataIndex: 'surplusSize',
    key: 'surplusSize',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急程度/发放进度',
    dataIndex: 'urgentLevel',
    key: 'urgentLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人ID',
    dataIndex: 'planOpenUserId',
    key: 'planOpenUserId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人CODE',
    dataIndex: 'planOpenUserCode',
    key: 'planOpenUserCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人NAME',
    dataIndex: 'planOpenUserName',
    key: 'planOpenUserName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放时间',
    dataIndex: 'planOpenDate',
    key: 'planOpenDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下料站点ID',
    dataIndex: 'siteId',
    key: 'siteId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下料站点CODE',
    dataIndex: 'siteCode',
    key: 'siteCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下料站点NAME',
    dataIndex: 'siteName',
    key: 'siteName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求日期',
    dataIndex: 'requireDate',
    key: 'requireDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划类型',
    dataIndex: 'planType',
    key: 'planType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '派工单号',
    dataIndex: 'dispatchListNo',
    key: 'dispatchListNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原申请物料id',
    dataIndex: 'originalItemId',
    key: 'originalItemId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '代料/发放依据',
    dataIndex: 'grantBasis',
    key: 'grantBasis',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否资源选择其它系统 0 -否，1 -是',
    dataIndex: 'otherSysFlag',
    key: 'otherSysFlag',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '工艺路线',
    dataIndex: 'workLine',
    key: 'workLine',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否上机标识',
    dataIndex: 'ynInstallFlag',
    key: 'ynInstallFlag',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '偏离单编号',
    dataIndex: 'deflectionBillno',
    key: 'deflectionBillno',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检斤数量',
    dataIndex: 'checkKiloQty',
    key: 'checkKiloQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const queryForm = ref<WmsInvOutBillLDto>({});
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
const wmsInvOutBillL = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
];
const validateRules = {
  secretLevel: [
    { required:true, message: '密级列不能为空' }
  ],
  mdsItemId: [
    { required:true, message: '物料编码列不能为空' }
  ],
  applyQty: [
    { required:true, message: '申请数量列不能为空' }
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
  queryForm.value.wmsInvOutBillId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listWmsInvOutBillLByPage(queryParam)
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
    secretLevel: undefined,
    mdsItemId: '',
    applyQty: '',
    proMdsItemId: '',
    batchNo: '',
    lotNo: '',
    missionNo: '',
    note: '',
    outBillLStatus: undefined,
    refuseReason: '',
    outDeptId: '',
    outDeptCode: '',
    outDeptName: '',
    pmsInvoiceAssonInvBillId: '',
    cuttingFlag: '',
    momOutRequireId: '',
    surplusQty: '',
    surplusSize: '',
    urgentLevel: '',
    planOpenUserId: '',
    planOpenUserCode: '',
    planOpenUserName: '',
    planOpenDate: null,
    siteId: '',
    siteCode: '',
    siteName: '',
    requireDate: null,
    planType: '',
    dispatchListNo: '',
    originalItemId: '',
    grantBasis: '',
    otherSysFlag: '',
    workLine: '',
    ynInstallFlag: '',
    deflectionBillno: '',
    checkKiloQty: '',
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
  record.editable = true;
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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, wmsInvOutBillL);
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



