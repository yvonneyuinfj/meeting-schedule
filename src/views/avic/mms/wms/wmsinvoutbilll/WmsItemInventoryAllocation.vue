<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="wmsItemInventory"
        table-key="wmsItemInventory"
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
        <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
           v-if="['allocatedQty'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="20"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
             >
              </a-input>
            </template>
          </AvicRowEdit>
          <template v-else-if="column.dataIndex === 'action'">
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
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="
                event => {
                  handleDelete([record.id], event, 'row');
                }
              "
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <avic-excel-import
      v-if="showImportModal"
      :formData="excelParams"
      title="导入"
      importUrl="/mms/wms/wmsiteminventorys/importData/v1"
      downloadTemplateUrl="/mms/wms/wmsiteminventorys/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    ></avic-excel-import>
  </div>
</template>
<script lang="ts" setup>
import type { WmsItemInventoryDto } from '@/api/avic/mms/wms/WmsItemInventoryApi'; // 引入模块DTO
import { listWmsItemInventoryByPage, saveWmsItemInventory, delWmsItemInventory, exportExcel } from '@/api/avic/mms/wms/WmsItemInventoryApi'; // 引入模块API

const { proxy } = getCurrentInstance();
const layout = {
    labelCol: { flex: '120px' },
    wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 调用布局公共方法
const columns = [
  {
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '材料状态',
    dataIndex: 'materialStatus',
    key: 'materialStatus',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '物料编码',
    dataIndex: 'mdsItemCode',
    key: 'mdsItemCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料名称',
    dataIndex: 'mdsItemName',
    key: 'mdsItemName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '牌号',
    dataIndex: 'marque',
    key: 'marque',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '规格',
    dataIndex: 'specs',
    key: 'specs',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术条件',
    dataIndex: 'techCondition',
    key: 'techCondition',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交货状态',
    dataIndex: 'deliveryStatus',
    key: 'deliveryStatus',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量编号',
    dataIndex: 'qualityCode',
    key: 'qualityCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段期初库存数量 ',
    dataIndex: 'currentInitInvQty',
    key: 'currentInitInvQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段累计入库数量 ',
    dataIndex: 'currentSumupInQty',
    key: 'currentSumupInQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段累计出库数量 ',
    dataIndex: 'currentSumupOutQty',
    key: 'currentSumupOutQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '当前期段累计调整数量 ',
    dataIndex: 'currentSumupAdjustQty',
    key: 'currentSumupAdjustQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '占用数量',
    dataIndex: 'engagedQty',
    key: 'engagedQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '分配数量',
    dataIndex: 'allocatedQty',
    key: 'allocatedQty',
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
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: 120,
  //   align: 'center',
  //   fixed: 'right'
  // }
];
const queryForm = ref<WmsItemInventoryDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const wmsItemInventory = ref(null);
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'wmsItemInventory' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const saveLoading = ref(false); // 统一保存按钮loading 状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
];
const validateRules = {
  allocatedQty: [
    { required:true, message: '分配数量列不能为空' }
  ]
}; // 必填列,便于保存和新增数据时校验
const editingId = ref(''); // 正在编辑中的数据

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList () {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listWmsItemInventoryByPage(queryParam)
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
function getLookupList () {
  proxy.$getLookupByType(lookupParams, result => {
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList () {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery () {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作  */
function resetQuery () {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced () {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery (value) {
  const keyWord = {
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd () {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    secretLevel: undefined,
    materialStatus: undefined,
    mdsItemCode: '',
    mdsItemName: '',
    marque: '',
    specs: '',
    techCondition: '',
    deliveryStatus: '',
    qualityCode: '',
    currentInitInvQty: '',
    currentSumupInQty: '',
    currentSumupOutQty: '',
    currentSumupAdjustQty: '',
    engagedQty: '',
    allocatedQty: '',
    editable: true // true为编辑中, false为未编辑
  };
  editingId.value = item.id;
  let newData = [...list.value];
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
function handleEdit (record) {
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
function handleSave (record) {
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
  saveWmsItemInventory([target]).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('保存成功！');
    } else {
      proxy.$message.error('保存失败！');
    }
  });
}
/** 批量保存 */
function handleSaveAll () {
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
    saveWmsItemInventory(changedData).then(res => {
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
/** 导入 */
function handleImport () {
  showImportModal.value = true;
}
/** 导出 */
function handleExport () {
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
/** 删除 */
function handleDelete (ids, e, type) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      // 获取所有非新增的数据，执行后台删除逻辑，新增的数据直接界面删除
      const deleteIds = ids.filter(id => id.indexOf('newLine') == -1);
      if (deleteIds.length > 0) {
        return delWmsItemInventory(deleteIds)
          .then(() => {
            removeRecordByIds(ids);
          })
          .catch(() => {
            delLoading.value = false;
          });
      } else {
        removeRecordByIds(ids);
      }
    }
  });
}
/** 删除操作后更新list */
function removeRecordByIds (deleteIds) {
  let newData = [...list.value];
  let updateList = [...list.value];
  let delUpdateData = [];
  for (let i = 0; i < deleteIds.length; i++) {
    newData = newData.filter(item => item['id'] !== deleteIds[i]);
    delUpdateData = updateList.filter(
      item => item['id'] == deleteIds[i] && item['operationType_'] != 'insert'
    );
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  // 前台刷新表格
  list.value = newData;
  // 提示成功
  proxy.$message.success('删除成功！');
  delLoading.value = false;
  if (list.value.length == 0) {
    // 当前页数据被清空
    let currentPage = 1;
    if (queryParam.pageParameter.page > 1) {
      currentPage = queryParam.pageParameter.page - 1;
    }
    queryParam.pageParameter.page = currentPage;
    getList();
  } else {
    // 当前页数据没有全部删除时分页总条数为原total-删除数据中心非添加数据个数
    totalPage.value = totalPage.value - delUpdateData.length;
  }
}
/** 行点击事件 */
function customRow (record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}
/** 输入框的值失去焦点 */
function blurInput (e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}
/** 批量数据校验 */
function validateRecordData (records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, wmsItemInventory);
    if (!flag) {
      break;
    }
  }
  return flag;
}
/** 勾选复选框时触发 */
function onSelectChange (rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
function handleTableChange (pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
</script>

