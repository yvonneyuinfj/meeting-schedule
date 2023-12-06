<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="famAssetInventoryResultList"
      table-key="famAssetInventoryResultList"
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
      <template
        v-if="!props.readOnly"
        #toolBarLeft
      >
        <a-space>
          <a-space>
            <!-- <a-button
              v-hasPermi="['famAssetInventoryResultList:add']"
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
              v-hasPermi="['famAccpetList:add']"
              title="添加"
              type="primary"
              @click="handleMostAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              批量添加
            </a-button>
            <a-button
              v-hasPermi="['famAssetInventoryResultList:del']"
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
          v-if="['inventoryNum','assetCode','assetNetValue','assetOriginalValue','factorySerialNumber','assetModel','assetName','equipNo','assetSecretLevel','assetSpec'].includes(
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
        <AvicRowEdit
          v-else-if="['note','inventoryPal'].includes(
               column.dataIndex
              )"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
              <a-textarea
                v-model:value="record[column.dataIndex]"
                @input="$forceUpdate()"
                style="width: 100%;padding-top: 25px"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
              >
              </a-textarea>
          </template>
          <template #default>
            <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ record[column.dataIndex] }}
            </div>
          </template>
        </AvicRowEdit>
        <AvicRowEdit
          v-else-if="column.dataIndex === 'purchaseTime'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-date-picker
              v-model:value="record.purchaseTime"
              value-format="YYYY-MM-DD"
              placeholder="请选择购置时间"
            >
            </a-date-picker>
          </template>
        </AvicRowEdit>
        <AvicRowEdit
          v-else-if="column.dataIndex === 'inventoryResults'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.inventoryResults"
              style="width: 100%"
              placeholder="请选择损益类型"
              @change="(value)=>changeControlValue(value,record,'inventoryResults')"
            >
              <a-select-option
                v-for="select in inventoryResultsList"
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
              :value="record.inventoryResultsName"
              :options="inventoryResultsList"
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
    <a-modal
      :visible="open"
      title="批量新增"
      @ok="handleOk"
      @cancel="handleOk"
      width="80%"
      style="top: 20px"
    >
      <div style="height: 600px;overflow: auto">
        <fam-inventory-manage
          :isAdd="'true'"
          ref="famInventoryManage"
        ></fam-inventory-manage>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import type { FamAssetInventoryResultListDto } from '@/api/avic/mms/fam/FamAssetInventoryResultListApi'; // 引入模块DTO
import { listFamAssetInventoryResultListByPage } from '@/api/avic/mms/fam/FamAssetInventoryResultListApi'; // 引入模块API
import FamInventoryManage from '@/views/avic/mms/fam/faminventory/FamInventoryManage.vue';

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
    title: '资产编码',
    dataIndex: 'assetCode',
    key: 'assetCode',
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
    title: '资产密级',
    dataIndex: 'assetSecretLevel',
    key: 'assetSecretLevel',
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
    title: '资产型号',
    dataIndex: 'assetModel',
    key: 'assetModel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值（元）',
    dataIndex: 'assetOriginalValue',
    key: 'assetOriginalValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '购置时间',
    dataIndex: 'purchaseTime',
    key: 'purchaseTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产净值',
    dataIndex: 'assetNetValue',
    key: 'assetNetValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂序列号',
    dataIndex: 'factorySerialNumber',
    key: 'factorySerialNumber',
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
    title: '盘点数量',
    dataIndex: 'inventoryNum',
    key: 'inventoryNum',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '损益类型',
    dataIndex: 'inventoryResults',
    key: 'inventoryResults',
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
    title: '盘营亏原因',
    dataIndex: 'inventoryPal',
    key: 'inventoryPal',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'left'
  }
] as any[];
const queryForm = ref<FamAssetInventoryResultListDto>({});
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
const famAssetInventoryResultList = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const open = ref<boolean>(false);
const famInventoryManage = ref(null);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // SECRET_LEVEL通用代码
const inventoryResultsList = ref([]); // 盘点结果（正常/盘盈/盘亏）通用代码
const lookupParams = [{ fieldName: 'inventoryResults', lookUpType: 'FAM_INVENTORY_RESULTS' }];
const validateRules = {
  inventoryResults: [{ required: true, message: '盘点结果（正常/盘盈/盘亏）列不能为空' }]
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
  queryForm.value.inventoryResultId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listFamAssetInventoryResultListByPage(queryParam)
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
    inventoryResultsList.value = result.inventoryResults;
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
    assetCode: '',
    assetName: '',
    assetSecretLevel: '',
    equipNo: '',
    assetModel: '',
    assetOriginalValue: '',
    purchaseTime: null,
    assetNetValue: '',
    factorySerialNumber: '',
    assetSpec: '',
    inventoryNum: '',
    inventoryResults: undefined,
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

/** 批量添加 */
function handleMostAdd() {
  open.value = true;
}

/** 批量新增确认  */
const handleOk = () => {
  open.value = false;
  const selectRow = famInventoryManage.value.selectedRow();
  selectRow.map(item => {
    console.log(item);
    item['assetNo'] = item.assetsName;
    item['assetName'] = item.assetsName;
    item['assetCode'] = item.assetsCode;
    item['managerDeptId'] = item.managerDeptName;
    item['liablePerson'] = item.responseUserId;
    item['factoryNo'] = item.productionNo;
    item['procureOrder'] = item.procureOrderNo;
    item['equipType'] = item.equipClass;
    item['inventoryId'] = item.id;
    item['installLocation'] = item.installLocation;
  });
  console.log(selectRow);
  console.log(list.value);
  list.value = [...list.value, ...selectRow];
};

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
    flag = proxy.$validateRecordData(
      records[index],
      validateRules,
      list.value,
      famAssetInventoryResultList
    );
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



