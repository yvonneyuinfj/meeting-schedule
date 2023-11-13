<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="famAccpetList"
      table-key="famAccpetList"
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
              v-hasPermi="['famAccpetList:add']"
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
              v-hasPermi="['famAccpetList:del']"
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
           v-if="['installLocation','ownershipCertNo','assetOriginalValue','assetModel','factoryNo','procureOrder','assetClass','assetNo','assetSpec','liablePerson','equipClass','assetUnit','warrantyPeriod','assetNum','assetName','producer','equipNo','invoiceNo','brand','parentAssetNo'].includes(
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
          <AvicRowEdit
            v-else-if="column.dataIndex === 'productionDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.productionDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期"
              >
              </a-date-picker>
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
          <AvicRowEdit
            v-else-if="column.dataIndex === 'isNewAsset'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.isNewAsset"
                style="width: 100%"
                placeholder="请选择是否新增资产"
                @change="(value)=>changeControlValue(value,record,'isNewAsset')"
              >
                <a-select-option
                  v-for="select in isNewAssetList"
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
                :value="record.isNewAssetName"
                :options="isNewAssetList"
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
  </div>

</template>
<script lang="ts" setup>
import type { FamAccpetListDto } from '@/api/avic/mms/fam/FamAccpetListApi'; // 引入模块DTO
import { listFamAccpetListByPage } from '@/api/avic/mms/fam/FamAccpetListApi'; // 引入模块API

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
    title: '是否新增资产',
    dataIndex: 'isNewAsset',
    key: 'isNewAsset',
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
    title: '资产类别',
    dataIndex: 'assetClass',
    key: 'assetClass',
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
    title: '资产编号',
    dataIndex: 'assetNo',
    key: 'assetNo',
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
    title: '设备编号',
    dataIndex: 'equipNo',
    key: 'equipNo',
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
    title: '设备大类',
    dataIndex: 'equipClass',
    key: 'equipClass',
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
    title: '资产名称',
    dataIndex: 'assetName',
    key: 'assetName',
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
    title: '资产规格',
    dataIndex: 'assetSpec',
    key: 'assetSpec',
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
    title: '资产型号',
    dataIndex: 'assetModel',
    key: 'assetModel',
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
    title: '资产单价',
    dataIndex: 'assetUnit',
    key: 'assetUnit',
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
    title: '资产数量',
    dataIndex: 'assetNum',
    key: 'assetNum',
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
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    key: 'assetOriginalValue',
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
    title: '安装地点',
    dataIndex: 'installLocation',
    key: 'installLocation',
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
    title: '责任人',
    dataIndex: 'liablePerson',
    key: 'liablePerson',
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
    title: '生产商',
    dataIndex: 'producer',
    key: 'producer',
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
    title: '出厂号',
    dataIndex: 'factoryNo',
    key: 'factoryNo',
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
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
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
    title: '采购合同',
    dataIndex: 'procureOrder',
    key: 'procureOrder',
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
    title: '发票号',
    dataIndex: 'invoiceNo',
    key: 'invoiceNo',
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
    title: '权属证号',
    dataIndex: 'ownershipCertNo',
    key: 'ownershipCertNo',
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
    title: '出厂日期',
    dataIndex: 'productionDate',
    key: 'productionDate',
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
    title: '父资产编号',
    dataIndex: 'parentAssetNo',
    key: 'parentAssetNo',
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
    title: '质保期',
    dataIndex: 'warrantyPeriod',
    key: 'warrantyPeriod',
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
    title: '是否为进口设备',
    dataIndex: 'importedOrNot',
    key: 'importedOrNot',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell () {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  }
] as any[];
const queryForm = ref<FamAccpetListDto>({});
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
const famAccpetList = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 数据密级通用代码
const isNewAssetList = ref([]); // 是否新增资产通用代码
const importedOrNotList = ref([]); // 是否为进口设备通用代码
const lookupParams = [
  { fieldName: 'isNewAsset', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'importedOrNot', lookUpType: 'FAM_PROGRAM_VERSION' }
];
const validateRules = {
  isNewAsset: [
    { required:true, message: '是否新增资产列不能为空' }
  ],
  assetClass: [
    { required:true, message: '资产类别列不能为空' }
  ],
  assetNo: [
    { required:true, message: '资产编号列不能为空' }
  ],
  equipNo: [
    { required:true, message: '设备编号列不能为空' }
  ],
  equipClass: [
    { required:true, message: '设备大类列不能为空' }
  ],
  assetName: [
    { required:true, message: '资产名称列不能为空' }
  ],
  assetSpec: [
    { required:true, message: '资产规格列不能为空' }
  ],
  assetModel: [
    { required:true, message: '资产型号列不能为空' }
  ],
  assetUnit: [
    { required:true, message: '资产单价列不能为空' }
  ],
  assetNum: [
    { required:true, message: '资产数量列不能为空' }
  ],
  assetOriginalValue: [
    { required:true, message: '资产原值列不能为空' }
  ],
  installLocation: [
    { required:true, message: '安装地点列不能为空' }
  ],
  liablePerson: [
    { required:true, message: '责任人列不能为空' }
  ],
  producer: [
    { required:true, message: '生产商列不能为空' }
  ],
  factoryNo: [
    { required:true, message: '出厂号列不能为空' }
  ],
  brand: [
    { required:true, message: '品牌列不能为空' }
  ],
  procureOrder: [
    { required:true, message: '采购合同列不能为空' }
  ],
  invoiceNo: [
    { required:true, message: '发票号列不能为空' }
  ],
  ownershipCertNo: [
    { required:true, message: '权属证号列不能为空' }
  ],
  productionDate: [
    { required:true, message: '出厂日期列不能为空' }
  ],
  parentAssetNo: [
    { required:true, message: '父资产编号列不能为空' }
  ],
  warrantyPeriod: [
    { required:true, message: '质保期列不能为空' }
  ],
  importedOrNot: [
    { required:true, message: '是否为进口设备列不能为空' }
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
  queryForm.value.amAccpetId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listFamAccpetListByPage(queryParam)
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
    isNewAssetList.value = result.isNewAsset;
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

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    isNewAsset: undefined,
    assetClass: '',
    assetNo: '',
    equipNo: '',
    equipClass: '',
    assetName: '',
    assetSpec: '',
    assetModel: '',
    assetUnit: '',
    assetNum: '',
    assetOriginalValue: '',
    installLocation: '',
    liablePerson: '',
    producer: '',
    factoryNo: '',
    brand: '',
    procureOrder: '',
    invoiceNo: '',
    ownershipCertNo: '',
    productionDate: null,
    parentAssetNo: '',
    warrantyPeriod: '',
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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, famAccpetList);
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



