<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="famOverhaulRequireList"
      table-key="famOverhaulRequireList"
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
    >
      <template v-if="!props.readOnly ||  task==='task2'" #toolBarLeft>
        <a-space>
          <a-space>
            <!-- <a-button
              v-hasPermi="['famOverhaulRequireList:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              添加
            </a-button> -->
            <a-button
              v-hasPermi="['famOverhaulRequireList:add']"
              title="批量添加"
              type="primary"
              @click="handleMostAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              批量添加
            </a-button>
            <a-button
              v-hasPermi="['famOverhaulRequireList:del']"
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
                <delete-outlined/>
              </template>
              删除
            </a-button>
          </a-space>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">

        <AvicRowEdit
          v-if="['assetOriginalValue','assetModel','assetName','equipNo','assetClass','assetSpec'].includes(
               column.dataIndex
              )"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record[column.dataIndex]"
              :maxLength="32"
              @input="$forceUpdate()"
              style="width: 100%"
              placeholder="请输入"
              @blur="blurInput($event, record, column.dataIndex)"
            >
            </a-input>
          </template>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'history'" :record="record"
                     :column="column.dataIndex">
          <div @click="showAssetNo(record)" class="assetNoLink">
            查看
          </div>
        </AvicRowEdit>
        <AvicRowEdit v-else-if="column.dataIndex === 'assetNo'" :record="record"
                     :column="column.dataIndex">
          <template #edit>
            <a-input
              v-model:value="record[column.dataIndex]"
              :maxLength="32"
              @input="$forceUpdate()"
              @click="showAssetNo(record)"
              style="width: 100%"
              placeholder="请输入"
              @blur="blurInput($event, record, column.dataIndex)"
            >
            </a-input>
          </template>
          <template #default>
            {{ record.assetNo }}
          </template>
        </AvicRowEdit>

        <AvicRowEdit
          v-else-if="column.dataIndex === 'importedOrNot'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.importedOrNot"
              style="width: 100%"
              placeholder="请选择是否为进口设备"
              @change="(value)=>changeControlValue(value,record,'importedOrNot')"
            >
              <a-select-option
                v-for="select in importedOrNotList"
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
              :value="record.importedOrNotName"
              :options="importedOrNotList"
            />
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

    <a-modal :visible="open" title="批量新增" @ok="handleOk" @cancel="handleOk" width="80%" style="top: 20px">
      <div style="height: 600px;overflow: auto">
        <fam-inventory-manage assetClass="2" :isAdd="'true'" ref="famInventoryManage"></fam-inventory-manage>
      </div>
    </a-modal>

    <a-modal :visible="assetNoOpen" title="维修改造记录" @ok="handleAssetNo" :footer="null" @cancel="handleAssetNo"
             width="80%"
             style="top: 20px">

      <AvicTable
        table-key="assetNo"
        :columns="assetNoColumns"
        :row-key="record => record.id"
        :data-source="assetNoData"
        :loading="assetNoLoading"
        @refresh="getAssetNoList"
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'creationDate'">
            {{ dayjs(record.creationDate).format('YYYY-MM-DD') }}
          </template>
          <template v-if="column.dataIndex === 'applyReason'">
            <div v-html="record.applyReason"></div>
          </template>
        </template>
      </AvicTable>
    </a-modal>

  </div>
</template>
<script lang="ts" setup>
import type { FamOverhaulRequireListDto } from '@/api/avic/mms/fam/FamOverhaulRequireListApi'; // 引入模块DTO
import { listFamOverhaulRequireListByPage } from '@/api/avic/mms/fam/FamOverhaulRequireListApi'; // 引入模块API
import { getFormList } from '@/api/avic/mms/fam/FamInventoryApi';
import FamInventoryManage from '@/views/avic/mms/fam/faminventory/FamInventoryManage.vue';
import dayjs from 'dayjs';

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
  },
  bpmInstanceObject: {
    type: Object,
    default: {}
  }
});
const task = props.bpmInstanceObject.hasOwnProperty('bpmModel') ? props.bpmInstanceObject.bpmModel : '';

const columns = [
  {
    title: '资产编号',
    dataIndex: 'assetNo',
    key: 'assetNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    key: 'equipNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产类别',
    dataIndex: 'assetClassName',
    key: 'assetClassName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产名称',
    dataIndex: 'assetName',
    key: 'assetName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产规格',
    dataIndex: 'assetSpec',
    key: 'assetSpec',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  {
    title: '资产型号',
    dataIndex: 'assetModel',
    key: 'assetModel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    key: 'assetOriginalValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否为进口设备',
    dataIndex: 'importedOrNot',
    key: 'importedOrNot',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
] as any[];

const assetNoColumns = [
  // {
  //   title: '流程状态',
  //   dataIndex: 'businessstate_',
  //   key: 'businessstate_'
  // },
  {
    title: '单据号',
    dataIndex: 'billNo',
    key: 'billNo'
  },
  // {
  //   title: '维修内容',
  //   dataIndex: 'address',
  //   key: 'address'
  // },
  // {
  //   title: '新增原值',
  //   key: 'tags',
  //   dataIndex: 'tags'
  // },
  {
    title: '申请人',
    key: 'createdBy',
    dataIndex: 'createdBy'
  },
  {
    title: '申请日期',
    key: 'creationDate',
    dataIndex: 'creationDate'
  },
  {
    title: '维修金额',
    key: 'expectedMaintenance',
    dataIndex: 'expectedMaintenance'
  },
  {
    title: '申请理由',
    key: 'applyReason',
    dataIndex: 'applyReason'
  }
  // {
  //   title: '联系电话',
  //   key: 'telephone',
  //   dataIndex: 'telephone'
  // }
  // {
  //   title: '密级',
  //   key: 'action'
  // }
] as any[];

const assetNoData = ref([]);
const assetNoQueryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    id: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const assetNoLoading = ref(false);

const queryForm = ref<FamOverhaulRequireListDto>({});
const open = ref<boolean>(false);
const famInventoryManage = ref(null);
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
const famOverhaulRequireList = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 数据密级通用代码
const importedOrNotList = ref([]); // 是否为进口设备通用代码
const assetNoOpen = ref(false);
const lookupParams = [
  { fieldName: 'importedOrNot', lookUpType: 'PLATFORM_YES_NO_FLAG' }
];
const validateRules = {}; // 必填列,便于保存和新增数据时校验
const deletedData = ref([]); // 前台删除数据的记录


if (props.bpmInstanceObject.hasOwnProperty('bpmModel')) {
  columns.unshift({
    title: '历史记录',
    dataIndex: 'history',
    key: 'history',
    width: 120,
    align: 'center'
  });
}

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
  queryForm.value.overhaulRequireId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listFamOverhaulRequireListByPage(queryParam)
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

function getAssetNoList() {
  assetNoLoading.value = true;
  // console.log(queryParam.searchParams);
  getFormList(2, assetNoQueryParam.searchParams.id).then(response => {
    assetNoData.value = response.data;
    assetNoLoading.value = false;
  })
    .catch(() => {
      assetNoData.value = [];
      assetNoLoading.value = false;
    });
}

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    importedOrNotList.value = result.importedOrNot;
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

/** 批量添加 */
function handleMostAdd() {
  open.value = true;
}

/** 批量新增确认  */
const handleOk = () => {
  open.value = false;
  let code = '';
  if (list.value.length > 0) {
    code = list.value[0].assetClass.charAt(0);
  }
  const selectRow = famInventoryManage.value.selectedRow(code);
  let selectRowList = [];
  selectRow.map(item => {
    item['assetNo'] = item.assetsCode;
    item['assetName'] = item.assetsName;
    item['inventoryId'] = item.id;
    if (!item.warrantyPeriod) {
      selectRowList.push(item);
    }
    if (item.warrantyPeriod && dayjs().isAfter(dayjs(item.warrantyPeriod))) {
      selectRowList.push(item);
    } else {
      proxy.$message.warning('该资产在质保期内，不需提维修申请。');
    }
  });
  list.value = [...list.value, ...selectRowList];
  let array = JSON.parse(JSON.stringify([...list.value, ...selectRowList]));
  let obj = {};
  array = array.reduce((cur, next) => {
    obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
    return cur;
  }, []);
  list.value = array;
};

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    assetClass: '',
    assetNo: '',
    equipNo: '',
    assetName: '',
    assetSpec: '',
    assetModel: '',
    assetOriginalValue: '',
    importedOrNot: undefined,
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
  return;
  // record.editable = true;
  // record.operationType_ = record.operationType_ || 'update';
  // const newData = [...list.value];
  // newData.forEach(item => {
  //   if (item.id !== record.id) {
  //     item.editable = false;
  //   }
  // });
  // list.value = newData;
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
// function handleTableChange(pagination, _filters, sorter) {
//   queryParam.pageParameter.page = pagination.current;
//   queryParam.pageParameter.rows = pagination.pageSize;
//   if (proxy.$objIsNotBlank(sorter.field)) {
//     queryParam.sidx = sorter.field;
//     queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
//   }
//   getList();
// }

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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, famOverhaulRequireList);
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

function showAssetNo(record) {
  if (!props.bpmInstanceObject.hasOwnProperty('bpmModel')) return;
  assetNoOpen.value = true;
  assetNoQueryParam.searchParams.id = record.inventoryId;
  getAssetNoList();
}

function handleAssetNo() {
  assetNoOpen.value = false;
}

defineExpose({
  validate,
  getChangedData
});
</script>
<style lang="less" scoped>
.assetNoLink {
  color: #1f76cb;
  cursor: pointer
}
</style>



