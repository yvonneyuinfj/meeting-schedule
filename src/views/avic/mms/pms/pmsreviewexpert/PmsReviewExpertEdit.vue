<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
        ref="pmsReviewExpert"
        table-key="pmsReviewExpert"
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
                v-hasPermi="['pmsReviewExpert:add']"
                title="分配专家"
                type="primary"
                @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              分配专家
            </a-button>
            <a-button
                v-hasPermi="['pmsReviewExpert:del']"
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
            v-if="column.dataIndex === 'expertType'"
            :record="record"
            :column="column.dataIndex"
        >
          <template #edit>
            <a-select
                v-model:value="record.expertType"
                style="width: 100%"
                placeholder="请选择专家类型"
                @change="(value)=>changeExpertType(value,record,'expertType')"
            >
              <a-select-option
                  v-for="select in expertTypeList"
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
                :value="record.expertTypeName"
                :options="expertTypeList"
            />
          </template>
        </AvicRowEdit>
        <AvicRowEdit
            v-else-if="column.dataIndex === 'deptId'"
            :record="record"
            :column="column.dataIndex"
        >
          <template #edit>
            <a-input
                v-if="isOuter"
                v-model:value="record.deptName"
                :maxLength="22"
                style="width: 100%"
                placeholder="请输入"
            >
            </a-input>
            <AvicCommonSelect
                v-else
                disabled
                v-model:value="record.deptId"
                :defaultShowValue="record.deptName"
                placeholder="请选择部门"
                type="deptSelect"
                @callback="
                  (value, _selectRows) => {
                    changeDeptSelect(value,record,'deptId')
                  }
                "
            />
          </template>
          <template #default>
            {{ record['deptName'] }}
          </template>
        </AvicRowEdit>
        <AvicRowEdit
            v-else-if="column.dataIndex === 'expertName'"
            :record="record"
            :column="column.dataIndex"
        >
          <template #edit>
            <a-input
                v-if="isOuter"
                v-model:value="record.expertName"
                :maxLength="22"
                style="width: 100%"
                placeholder="请输入"
            >
            </a-input>
            <AvicCommonSelect
                v-else
                v-model:value="record.expertId"
                :defaultShowValue="record.expertName"
                placeholder="请选择专家名称"
                type="userSelect"
                @callback="
                  (value, _selectRows) => {
                    changeUserSelect(value,record,'expertId')
                  }
                "
            />
          </template>
          <template #default>
            {{ record['expertName'] }}
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
import type {PmsReviewExpertDto} from '@/api/avic/mms/pms/PmsReviewExpertApi'; // 引入模块DTO
import {listPmsReviewExpertByPage} from '@/api/avic/mms/pms/PmsReviewExpertApi'; // 引入模块API

const {proxy} = getCurrentInstance();
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
    title: '专家类型',
    dataIndex: 'expertType',
    key: 'expertType',
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
    title: '专家名称',
    dataIndex: 'expertName',
    key: 'expertName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '部门',
    dataIndex: 'deptId',
    key: 'deptId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const queryForm = ref<PmsReviewExpertDto>({});
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
const pmsReviewExpert = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const isOuter = ref(true);
const totalPage = ref(0);
const expertTypeList = ref([]); // 专家类型通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  {fieldName: 'expertType', lookUpType: 'PMS_EXPERT_TYPE'}
];
const validateRules = {
  expertType: [
    {required: true, message: '专家类型列不能为空'}
  ],
  expertName: [
    {required: true, message: '专家名称列不能为空'}
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

  console.log('prop>>', props)
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.pmsReviewId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listPmsReviewExpertByPage(queryParam)
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
    expertTypeList.value = result.expertType;
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
    expertType: undefined,
    expertId: '',
    deptId: '',
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

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeUserSelect(value, record, column) {
  record.expertName = value.names;
  record.expertCode = value.ids;
  record.deptName = value.deptname;
  record.deptCode = value.deptid;
  record.deptId = value.deptid;
}

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeDeptSelect(value, record, column) {
  record.deptName = value.names;
  record.deptCode = value.ids;
}

/**控件变更事件 */
function changeExpertType(values, record, column) {
  // 单选处理
  const target = proxy[column + 'List'].find(item => values === item.lookupCode);
  record[column + 'Name'] = target.lookupName;

  if (values === '20') {
    record.deptId = '';
    record.deptCode = '';
    record.deptName = '';
    record.expertId = '';
    record.expertCode = '';
    record.expertName = '';
    isOuter.value = true;
  } else {
    if (isOuter.value) {
      record.deptName = '';
      record.expertName = '';
    }
    isOuter.value = false;
  }
}

/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, pmsReviewExpert);
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
    {immediate: true}
);

defineExpose({
  validate,
  getChangedData
});
</script>



