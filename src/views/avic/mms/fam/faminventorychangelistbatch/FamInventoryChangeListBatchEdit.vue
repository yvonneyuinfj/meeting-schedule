<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="famInventoryChangeListBatch"
      table-key="famInventoryChangeListBatch"
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
            <!--            <a-button-->
            <!--              v-hasPermi="['famInventoryChangeListBatch:add']"-->
            <!--              title="添加"-->
            <!--              type="primary"-->
            <!--              @click="handleAdd"-->
            <!--            >-->
            <!--              <template #icon>-->
            <!--                <plus-outlined/>-->
            <!--              </template>-->
            <!--              添加-->
            <!--            </a-button>-->
            <a-button
              v-hasPermi="['famInventoryChangeListBatch:add']"
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
              v-hasPermi="['famInventoryChangeListBatch:del']"
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
            <div style="display: flex;align-items: center">
              <div style="width: 65px;margin-left: 20px">
                分期金额
              </div>
              <a-input-number
                style="width: 120px"
                clear
                v-model:value="shareAmount"
                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
              />
            </div>
            <a-button
              title="保存"
              type="primary"
              @click="handleShare"
            >
              保存
            </a-button>

          </a-space>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
        <AvicRowEdit
          v-if="['assetOriginalValue'].includes(
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
import type { FamInventoryChangeListBatchDto } from '@/api/avic/mms/fam/FamInventoryChangeListBatchApi'; // 引入模块DTO
import { listFamInventoryChangeListBatchByPage } from '@/api/avic/mms/fam/FamInventoryChangeListBatchApi'; // 引入模块API
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
    dataIndex: 'assetsCode',
    key: 'assetCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产名称',
    dataIndex: 'assetsName',
    key: 'assetName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门',
    dataIndex: 'managerDeptName',
    key: 'managerDeptName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'storageLocation',
    key: 'storageLocation',
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
    title: '资产净值',
    dataIndex: 'assetNetValue',
    key: 'assetNetValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const queryForm = ref<FamInventoryChangeListBatchDto>({});
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
const famInventoryChangeListBatch = ref(null);
const list = ref([]); //表格数据集合
const originalList = ref([]); //原始数组
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const validateRules = {}; // 必填列,便于保存和新增数据时校验
const deletedData = ref([]); // 前台删除数据的记录
const shareAmount = ref<number>(0);
const open = ref<boolean>(false);
const famInventoryManage = ref(null);

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
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.inventoryChangeBatchId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listFamInventoryChangeListBatchByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      // 查询的初始数据,保存时做比对
      initialList.value = proxy.$lodash.cloneDeep(list.value);
      let amountList = [];
      list.value.map(item => {
        amountList.push({ assetOriginalValue: item.assetOriginalValue, inventoryId: item.inventoryId });
      });
      originalList.value = amountList;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
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
    assetOriginalValue: '',
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
    let inventoryId = newData.filter(item => item['id'] === ids[i])[0].inventoryId;
    originalList.value = originalList.value.filter(item => item.inventoryId !== inventoryId);
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
      famInventoryChangeListBatch
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

/** 计算分摊 */
const handleShare = e => {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (shareAmount.value === 0 || !shareAmount.value) {
    //输入为空或者0时
    loading.value = true;
    list.value.map(item => {
      item.assetOriginalValue = originalList.value.filter(
        it => it.inventoryId === item.inventoryId
      )[0].assetOriginalValue;
    });
    loading.value = false;
  } else {
    //计算分摊
    loading.value = true;
    let percentage = 0;
    originalList.value.map(item => {
      percentage += Number(item.assetOriginalValue);
    });
    list.value.map((item, index) => {
      let num = Number(
        (Number(originalList.value[index].assetOriginalValue) / percentage)
      );
      item.assetOriginalValue = Number(shareAmount.value * num).toFixed(2);
    });
    loading.value = false;
  }
};

/** 批量添加 */
const handleMostAdd = () => {
  open.value = true;
};

/** 批量新增确认  */
const handleOk = () => {
  open.value = false;
  const selectRow = famInventoryManage.value.selectedRow();
  const amountList = [];
  selectRow.map(item => {
    amountList.push({ assetOriginalValue: item.assetOriginalValue, inventoryId: item.id });
    item['assetName'] = item.assetsName;
    item['inventoryId'] = item.id;
    item['managerDeptName'] = item.receiveDeptNameAlias;
  });
  // 批量新增数组合并去重
  let array = JSON.parse(JSON.stringify([...list.value, ...selectRow]));
  let obj = {};
  array = array.reduce((cur, next) => {
    obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
    return cur;
  }, []);
  list.value = array;
  // 原始数组合并去重
  let oriArray = JSON.parse(JSON.stringify([...originalList.value, ...amountList]));
  let oriObj = {};
  oriArray = oriArray.reduce((cur, next) => {
    oriObj[next.inventoryId] ? '' : (oriObj[next.inventoryId] = true && cur.push(next));
    return cur;
  }, []);
  originalList.value = oriArray;
};

defineExpose({
  validate,
  getChangedData
});
</script>



