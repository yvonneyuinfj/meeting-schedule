<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="pmsReceiveLDetail"
        table-key="pmsReceiveLDetail"
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
        :customRow="customRow"
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['pmsReceiveLDetail:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['pmsReceiveLDetail:add']"
              title="按合同添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              按合同添加
            </a-button>
            <a-button
              v-hasPermi="['pmsReceiveLDetail:add']"
              title="按交付明细添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              按交付明细添加
            </a-button>
            <a-button
              v-hasPermi="['pmsReceiveLDetail:edit']"
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
            <a-button
              v-hasPermi="['pmsReceiveLDetail:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
<!--            <a-button-->
<!--              v-hasPermi="['pmsReceiveLDetail:import']"-->
<!--              title="导入"-->
<!--              type="primary"-->
<!--              ghost-->
<!--              @click="handleImport">-->
<!--              <template #icon>-->
<!--                <import-outlined/>-->
<!--              </template>-->
<!--              导入-->
<!--            </a-button>-->
<!--            <a-button-->
<!--              v-hasPermi="['pmsReceiveLDetail:export']"-->
<!--              title="导出"-->
<!--              type="primary"-->
<!--              ghost-->
<!--              @click="handleExport">-->
<!--              <template #icon>-->
<!--                <export-outlined/>-->
<!--              </template>-->
<!--              导出-->
<!--            </a-button>-->
            <a-button
              v-hasPermi="['pmsReceiveLDetail:add']"
              title="按到货数量拆分"
              type="primary"
              :loading="splitLoading"
              @click="handleSplit(selectedRowKeys, '')"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              按到货数量拆分
            </a-button>
            <a-button
              v-hasPermi="['pmsReceiveLDetail:edit']"
              title="提交送检"
              type="primary"
              :loading="checkLoading"
              @click="handleCheck(selectedRowKeys, '')"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              提交送检
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入目的库房"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex  === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'mdsInventoryId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.mdsInventoryId"
                style="width: 100%"
                placeholder="请选择目的库房"
                @change="(value)=>inventoryChange(value,record)"
              >

                <a-select-option
                  v-for="select in inventoryList"
                  :key="select.id"
                  :value="select.id"
                  :title="select.inventoryName"
                  :disabled="select.disabled === true"
                >
                  {{ select.inventoryName }}
                </a-select-option>
              </a-select>
            </template>
            <template #default>
              {{ record['mdsInventoryName'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'receiverUserId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <AvicCommonSelect
                v-model:value="record.receiverUserId"
                :defaultShowValue="record.receiverUserName"
                placeholder="请选择待验员"
                type="userSelect"
                @callback="
                  (value, _selectRows) => {
                    changeCommonSelect(value,record,'receiverUserName')
                  }
                "
              />
            </template>
            <template #default>
              {{ record['receiverUserName'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'mdsItemCode'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input v-model:value="record.mdsItemCode" :maxLength="64" placeholder="请选择物料号" :readonly="true"
                       @click="proMdsItemOpen(record)">
                <template #suffix>
                  <a-tooltip title="物料号" @click="proMdsItemOpen(record)">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </template>
            <template #default>
              {{ record['mdsItemCode'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="['stoveNo','batchNo','itemSerialNo'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="400"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <template v-else-if="column.dataIndex  === 'action'">
            <a-button
              v-if="record.editable"
              type="link"
              class="inner-btn"
              :disable="editingId !== ''"
              @click.stop="handleSave(record)"
            >
              保存
            </a-button>
            <a-button
              v-else
              type="link"
              class="inner-btn"
              :disable="editingId !== ''"
              @click.stop="handleEdit(record)"
            >
              编辑
            </a-button>
            <!--            <a-button-->
            <!--              type="link"-->
            <!--              class="inner-btn"-->
            <!--              @click.stop="handleEdit(record.id)"-->
            <!--            >-->
            <!--              编辑-->
            <!--            </a-button>-->
            <a-button
              v-hasPermi="['pmsReceiveLDetail:del']"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')"
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <pms-receive-l-detail-add
      v-if="showAddModal"
      ref="addModal"
      :mainId="mainId"
      @reloadData="getList"
      :inventoryList="inventoryList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <pms-receive-l-detail-edit
      v-if="showEditModal"
      ref="editModal"
      :mainId="mainId"
      :form-id="formId"
      @reloadData="getList"
      :inventoryList="inventoryList"
      @close="showEditModal = false"
    />
    <AvicExcelImport
      v-if="showImportModal"
      :formData="excelParams"
      title="单表模板导入"
      importUrl="/mms/pms/pmsreceiveldetails/importData/v1"
      downloadTemplateUrl="/mms/pms/pmsreceiveldetails/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    />
  </div>
  <!--选择产品弹窗-->
  <a-modal :visible="openMdsItem" title="选择物料" @ok="handleOk2" @cancel="handleCancel2" width="80%" style="top: 20px">
    <div style="height: 400px;overflow: auto">
      <Mds-item-select ref="mdsItemSelect">
      </Mds-item-select>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import {
  listPmsReceiveLDetailByPage,
  delPmsReceiveLDetail,
  exportExcel,
  splitPmsReceiveLDetail,
  getInventory, savePmsReceiveLDetail, checkPmsReceiveLDetail
} from '@/api/avic/mms/pms/PmsReceiveLDetailApi'; // 引入模块API
import PmsReceiveLDetailAdd from './PmsReceiveLDetailAdd.vue'; // 引入添加页面组件
import PmsReceiveLDetailEdit from './PmsReceiveLDetailEdit.vue'; // 引入编辑页面组件
const {proxy} = getCurrentInstance();
const saveLoading = ref(false); // 统一保存按钮loading 状态
const editingId = ref(''); // 正在编辑中的数据
const initialList = ref([]); // 记录每次刷新得到的表格的数据
import MdsItemSelect from "@/views/avic/mms/mds/mdsproject/MdsItemSelect.vue";
const mdsItemSelect = ref(null);
const openMdsItem = ref<boolean>(false);
const editData = ref({});

const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '密级 ',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '目的库房',
    dataIndex: 'mdsInventoryId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '炉号',
    dataIndex: 'stoveNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批号',
    dataIndex: 'batchNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '件号(产品编号)',
    dataIndex: 'itemSerialNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料号',
    dataIndex: 'mdsItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '待验员姓名',
    dataIndex: 'receiverUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '送检状态',
    dataIndex: 'checkStatusName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '退回原因',
    dataIndex: 'rejectReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '登记日期',
    dataIndex: 'receiveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '应到数量',
    dataIndex: 'reqQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '序号',
    dataIndex: 'produceSeq',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '到货数量(采购)',
    dataIndex: 'pmsReceiveQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '到货数量(库存)',
    dataIndex: 'invReceiveQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '到货报废量',
    dataIndex: 'wasteQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '单件数量',
    dataIndex: 'itemQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '材料件数',
    dataIndex: 'materialQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    pmsReceiveId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({tableName: 'pmsReceiveLDetail', pmsReceiveId: ''});
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const splitLoading = ref(false);
const checkLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级 通用代码
const inventoryList = ref([]); // 库房列表
const pmsReceiveLDetail = ref(null);
const validateRules = {
  secretLevel: [
    {required: true, message: '密级不能为空'}
  ]
}; // 必填列,便于保存和新增数据时校验

onMounted(() => {
  //重载子表数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
  getInventory().then(res => {
    if (res.code === '200') {
      inventoryList.value = res.data
    }
  })
});


/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.pmsReceiveId = props.mainId ? props.mainId : '-1';
  listPmsReceiveLDetailByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      initialList.value = proxy.$lodash.cloneDeep(list.value);
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    mdsInventoryId: value,
    pmsReceiveLId: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  showAddModal.value = true;
}

/** 编辑 */
function handleEdit(record) {
  // formId.value = id;
  // showEditModal.value = true;

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
    if (key.endsWith('Date')) {
      target[key] = null
    }
  }
  editingId.value = '';
  savePmsReceiveLDetail([target]).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('保存成功！');
    } else {
      proxy.$message.error('保存失败！');
    }
  });
}

/* 子表删除 */
function handleDelete(ids, type) {
  if (!ids || ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delPmsReceiveLDetail(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
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

function handleSplit(ids, type) {
  if (!ids || ids.length == 0) {
    proxy.$message.warning('请选择要拆分的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要拆分${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      splitLoading.value = true;
      splitPmsReceiveLDetail(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('拆分成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
            getList();
          }
          splitLoading.value = false;
        })
        .catch(() => {
          splitLoading.value = false;
        });
    }
  });
}

/**
 * 提交送检
 */
function handleCheck(ids, type) {
  if (!ids || ids.length == 0) {
    proxy.$message.warning('请选择提交的数据！');
    return;
  }
  let changedData = list.value.filter(i => selectedRowKeys.value.indexOf(i.id) !== -1).map(i => toRaw(i));
  for (const detail of changedData) {
    console.log(detail, 'ha');
    if (detail.checkStatus === '5') {
      proxy.$message.warning('已送检数据请勿重复提交！');
      return;
    }
  }
  proxy.$confirm({
    title: `确认要提交${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      checkLoading.value = true;
      checkPmsReceiveLDetail(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('提交成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
            getList();
          }
          checkLoading.value = false;
        })
        .catch(() => {
          checkLoading.value = false;
        });
    }
  });
}

/** 导入 */
function handleImport() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  excelParams.value.pmsReceiveId = props.mainId;
  showImportModal.value = true;
}

/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
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

/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}
/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
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

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column] = value.names;
  record.receiverUserId = value.ids;
  record.receiverUserCode = value.ids;
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

function inventoryChange(inventoryId, record) {
  let inventory = toRaw(inventoryList.value.find(i => i.id === inventoryId));
  record.mdsInventoryName = inventory.inventoryName;
  record.mdsInventoryCode = inventory.inventoryCode;
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
    savePmsReceiveLDetail(changedData).then(res => {
      if (res.success) {
        getList();
        proxy.$message.success('保存成功！');
        saveLoading.value = false;
      } else {
        proxy.$message.error('保存失败！');
        saveLoading.value = false;
      }
    })
      .catch(() => {
        saveLoading.value = false;
      });
  } else {
    saveLoading.value = false;
  }
}

function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, pmsReceiveLDetail);
    if (!flag) {
      break;
    }
  }
  return flag;
}

/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}

function proMdsItemOpen(record) {
  openMdsItem.value = true;
  editData.value = record;
}

const handleCancel2 = () => {
  openMdsItem.value = false;
};

const handleOk2 = () => {
  const info = mdsItemSelect.value.info;
  editData.value.mdsItemId = info.id;
  editData.value.mdsItemCode = info.itemCode;
  editData.value.mdsItemName = info.itemName;
  openMdsItem.value = false;
};

</script>
