<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="pmsFindSourceVendor"
      table-key="pmsFindSourceVendor"
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
              v-hasPermi="['pmsFindSourceVendor:add']"
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
              v-hasPermi="['pmsFindSourceVendor:del']"
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
           v-if="column.dataIndex === 'isSatisfactory'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.isSatisfactory"
                style="width: 100%"
                placeholder="请选择是否符合要求"
                @change="(value)=>changeControlValue(value,record,'isSatisfactory')"
              >
                <a-select-option
                  v-for="select in isSatisfactoryList"
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
              <AvicDictTag
                :value="record.isSatisfactoryName"
                :options="isSatisfactoryList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'mdsVendorId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <AvicModalSelect
                v-model:value="record.mdsVendorId"
                title="选择供应商名称"
                placeholder="请选择供应商名称"
                valueField="id"
                showField="vendorName"
                :defaultShowValue="record.mdsVendorName"
                :selectComponent="mdsVendorSelectComponent"
                :allow-clear="true"
                @selectConfirm="changeVendor($event, record)"
              />
            </template>
            <template #default>
              {{ record.mdsVendorName }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'isRelevance'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.isRelevance"
                style="width: 100%"
                placeholder="请选择候选供应商关联关系"
                @change="(value)=>changeControlValue(value,record,'isRelevance')"
              >
                <a-select-option
                  v-for="select in isRelevanceList"
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
              <AvicDictTag
                :value="record.isRelevanceName"
                :options="isRelevanceList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'isStandard'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.isStandard"
                style="width: 100%"
                placeholder="请选择是否所合格供应商"
                @change="(value)=>changeControlValue(value,record,'isStandard')"
              >
                <a-select-option
                  v-for="select in isStandardList"
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
              <AvicDictTag
                :value="record.isStandardName"
                :options="isStandardList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="['quote','finalPrice'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="22"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
             >
              </a-input>
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
import type { PmsFindSourceVendorDto } from '@/api/avic/mms/pms/PmsFindSourceVendorApi'; // 引入模块DTO
import { listPmsFindSourceVendorByPage } from '@/api/avic/mms/pms/PmsFindSourceVendorApi'; // 引入模块API
import MdsVendorSelect from '@/views/avic/mms/mds/mdsvendor/MdsVendorSelect.vue';

const mdsVendorSelectComponent = MdsVendorSelect;

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
    title: '候选供应商名称',
    dataIndex: 'mdsVendorId',
    key: 'mdsVendorId',
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
    title: '是否所合格供应商',
    dataIndex: 'isStandard',
    key: 'isStandard',
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
    title: '候选供应商关联关系',
    dataIndex: 'isRelevance',
    key: 'isRelevance',
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
    title: '是否符合要求',
    dataIndex: 'isSatisfactory',
    key: 'isSatisfactory',
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
  // {
  //   title: '报价（元）',
  //   dataIndex: 'quote',
  //   key: 'quote',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '最终价格（元）',
  //   dataIndex: 'finalPrice',
  //   key: 'finalPrice',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },

] as any[];
const queryForm = ref<PmsFindSourceVendorDto>({});
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
const pmsFindSourceVendor = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const isStandardList = ref([]); // 是否所合格供应商通用代码
const isRelevanceList = ref([]); // 候选供应商关联关系通用代码
const isSatisfactoryList = ref([]); // 是否符合要求通用代码
const secretLevelList = ref([]); // SECRET_LEVEL通用代码
const lookupParams = [
  { fieldName: 'isStandard', lookUpType: 'YN_FLAG' },
  { fieldName: 'isRelevance', lookUpType: 'YN_FLAG' },
  { fieldName: 'isSatisfactory', lookUpType: 'YN_FLAG' }
];
const validateRules = {
  mdsVendorId: [
    { required:true, message: '供应商名称列不能为空' }
  ],
  isStandard: [
    { required:true, message: '是否所合格供应商列不能为空' }
  ],
  isRelevance: [
    { required:true, message: '候选供应商关联关系列不能为空' }
  ],
  isSatisfactory: [
    { required:true, message: '是否符合要求列不能为空' }
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
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.pmsFindSourceId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listPmsFindSourceVendorByPage(queryParam)
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
    isStandardList.value = result.isStandard;
    isRelevanceList.value = result.isRelevance;
    isSatisfactoryList.value = result.isSatisfactory;
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
    mdsVendorId: '',
    isStandard: undefined,
    isRelevance: undefined,
    isSatisfactory: undefined,
    quote: '',
    quoteCn: '',
    finalPrice: '',
    finalPriceCn: '',
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
      if (!props.readOnly) {
        handleEdit(record);
      }
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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, pmsFindSourceVendor);
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

function changeVendor(e, record) {
  record.mdsVendorName = e[0].vendorName;
}

defineExpose({
  validate,
  getChangedData
});
</script>



