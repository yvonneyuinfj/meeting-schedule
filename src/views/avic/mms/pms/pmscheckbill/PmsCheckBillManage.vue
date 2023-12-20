<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="到货流水号">
              <a-input
                v-model:value="queryForm.billNo"
                placeholder="请输入到货流水号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="检验单号">
              <a-input
                v-model:value="queryForm.checkTaskNo"
                placeholder="请输入检验单号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="炉批号">
              <a-input
                v-model:value="queryForm.stoveNo"
                placeholder="请输入炉批号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批号">
              <a-input
                v-model:value="queryForm.batchNo"
                placeholder="请输入批号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="件号">
              <a-input
                v-model:value="queryForm.itemSerialNo"
                placeholder="请输入件号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="送检日期(起)">
              <a-date-picker
                v-model:value="queryForm.checkSendDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择送检日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.checkSendDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="送检日期(止)">
              <a-date-picker
                v-model:value="queryForm.checkSendDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择送检日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.checkSendDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined/>
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced"/>
                  <down-outlined v-else/>
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="pmsCheckBill"
        table-key="pmsCheckBill"
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
        <template #toolBarLeft>
          <a-space>
            <!--            <a-button-->
            <!--              v-hasPermi="['pmsCheckBill:add']"-->
            <!--              title="添加"-->
            <!--              type="primary"-->
            <!--              @click="handleAdd"-->
            <!--            >-->
            <!--              <template #icon>-->
            <!--                <plus-outlined />-->
            <!--              </template>-->
            <!--              添加-->
            <!--            </a-button>-->
            <a-button
              v-hasPermi="['pmsCheckBill:save']"
              title="指定为送检"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="saveLoading"
              @click="
                event => {
                  handleUpdateSendType(selectedRowKeys, event,'1');
                }
              "
            >
              <template #icon>
                <save-outlined/>
              </template>
              指定为送检
            </a-button>
            <a-button
              v-hasPermi="['pmsCheckBill:save']"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="saveLoading"
              @click="
                event => {
                  handleUpdateSendType(selectedRowKeys, event,'5');
                }
              "
            >
              <template #icon>
                <save-outlined/>
              </template>
              指定为自检
            </a-button>
            <a-button
              v-hasPermi="['pmsCheckBill:del']"
              title="退回"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="saveLoading"
              @click="handleSendBack"
            >
              <template #icon>
                <delete-outlined/>
              </template>
              退回
            </a-button>
            <!--            <a-button-->
            <!--              v-hasPermi="['pmsCheckBill:del']"-->
            <!--              title="删除"-->
            <!--              danger-->
            <!--              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"-->
            <!--              :loading="delLoading"-->
            <!--              @click="-->
            <!--                event => {-->
            <!--                  handleDelete(selectedRowKeys, event,'');-->
            <!--                }-->
            <!--              "-->
            <!--            >-->
            <!--              <template #icon>-->
            <!--                <delete-outlined />-->
            <!--              </template>-->
            <!--              删除-->
            <!--            </a-button>-->
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入到货流水号或检验单号"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
            v-if="['rejectReason'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="2048"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
              >
              </a-input>
<!--               @blur="blurInput($event, record, column.dataIndex)"-->
            </template>
          </AvicRowEdit>
          <!--          <template v-else-if="column.dataIndex === 'action'">-->
          <!--            <a-button-->
          <!--              v-if="record.editable"-->
          <!--              type="link"-->
          <!--              class="inner-btn"-->
          <!--              :disable="editingId !== ''"-->
          <!--              @click.stop="handleSave(record)"-->
          <!--            >-->
          <!--              保存-->
          <!--            </a-button>-->
          <!--            <a-button-->
          <!--              v-else-->
          <!--              type="link"-->
          <!--              class="inner-btn"-->
          <!--              :disable="editingId !== ''"-->
          <!--              @click.stop="handleEdit(record)"-->
          <!--            >-->
          <!--              编辑-->
          <!--            </a-button>-->
          <!--            <a-button-->
          <!--              type="link"-->
          <!--              class="inner-btn"-->
          <!--              @click.stop="-->
          <!--                event => {-->
          <!--                  handleDelete([record.id], event, 'row');-->
          <!--                }-->
          <!--              "-->
          <!--            >-->
          <!--              删除-->
          <!--            </a-button>-->
          <!--          </template>-->
        </template>
      </AvicTable>
    </div>
    <avic-excel-import
      v-if="showImportModal"
      :formData="excelParams"
      title="导入"
      importUrl="/mms/pms/pmscheckbills/importData/v1"
      downloadTemplateUrl="/mms/pms/pmscheckbills/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    ></avic-excel-import>
  </div>
</template>
<script lang="ts" setup>
import type {PmsCheckBillDto} from '@/api/avic/mms/pms/PmsCheckBillApi'; // 引入模块DTO
import {
  listPmsCheckBillByPage,
  savePmsCheckBill,
  delPmsCheckBill,
  exportExcel,
  updateCompType, sendBack
} from '@/api/avic/mms/pms/PmsCheckBillApi'; // 引入模块API

const {proxy} = getCurrentInstance();
const layout = {
  labelCol: {flex: '120px'},
  wrapperCol: {flex: '1'}
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
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '到货流水号',
    dataIndex: 'billNo',
    key: 'billNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验单号',
    dataIndex: 'checkTaskNo',
    key: 'checkTaskNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商',
    dataIndex: 'mdsVendorName',
    key: 'mdsVendorName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订单号/合同号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '规格',
    dataIndex: 'testBarSpec',
    key: 'testBarSpec',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计量单位',
    dataIndex: 'invMdsUnitId',
    key: 'invMdsUnitId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供方合格证号',
    dataIndex: 'recprtlotNo',
    key: 'recprtlotNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '炉批号',
    dataIndex: 'stoveNo',
    key: 'stoveNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批号',
    dataIndex: 'batchNo',
    key: 'batchNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '件号',
    dataIndex: 'itemSerialNo',
    key: 'itemSerialNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收数量',
    dataIndex: 'receiveQty',
    key: 'receiveQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '出厂日期',
    dataIndex: 'lfackoryDate',
    key: 'lfackoryDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '制造日期',
    dataIndex: 'manuDate',
    key: 'manuDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '送检日期',
    dataIndex: 'checkSendDate',
    key: 'checkSendDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '退回原因',
    dataIndex: 'rejectReason',
    key: 'rejectReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
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
const queryForm = ref<PmsCheckBillDto>({});
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
const pmsCheckBill = ref(null);
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({tableName: 'pmsCheckBill'}); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const saveLoading = ref(false); // 统一保存按钮loading 状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const validateRules = {
  rejectReason: [
    {required: true, message: '退回原因列不能为空'}
  ]
}; // 必填列,便于保存和新增数据时校验
const editingId = ref(''); // 正在编辑中的数据

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listPmsCheckBillByPage(queryParam)
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

/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}

/** 高级查询 重置按钮操作  */
function resetQuery() {
  queryForm.value = {};
  handleQuery();
}

/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    billNo: value,
    checkTaskNo: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    secretLevel: undefined,
    status: '',
    billNo: '',
    checkTaskNo: '',
    mdsVendorId: '',
    orderNo: '',
    testBarSpec: '',
    invMdsUnitId: '',
    recprtlotNo: '',
    stoveNo: '',
    batchNo: '',
    itemSerialNo: '',
    receiveQty: '',
    lfackoryDate: null,
    manuDate: null,
    checkSendDate: null,
    rejectReason: '',
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
function handleEdit(record) {
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
  }
  editingId.value = '';
  savePmsCheckBill([target]).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('保存成功！');
    } else {
      proxy.$message.error('保存失败！');
    }
  });
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
    savePmsCheckBill(changedData).then(res => {
      if (res.success) {
        getList();
        proxy.$message.success('操作成功！');
        saveLoading.value = false;
      } else {
        proxy.$message.error('操作失败！');
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

function handleSendBack() { // TODO
  if (saveLoading.value) return;  // 规避正在保存时连续点击
  // 开始处理数据
  saveLoading.value = true;
  let changedData = list.value.filter(i => selectedRowKeys.value.indexOf(i.id) !== -1).map(i => toRaw(i));
  console.log(changedData, "<<<");
  if (!changedData || !changedData.length) {
    proxy.$message.warning('请先选择数据！');
    saveLoading.value = false;
  }
  let checkReason = true
  for (const bill of changedData) {
    if (!bill.rejectReason) {
      bill.editable = true;
      bill.operationType_ = bill.operationType_ || 'update';
      checkReason = false;
    }
  }
  if (!checkReason) {
    proxy.$message.warning('请填写退回理由！');
    saveLoading.value = false;
    return;
  }
  sendBack(changedData).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('操作成功！');
      saveLoading.value = false;
    } else {
      proxy.$message.error('操作失败！');
      saveLoading.value = false;
    }
  }).finally(() => {
    saveLoading.value = false;
  });
}

function handleUpdateSendType(ids, e, type) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要指定的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要指定${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      saveLoading.value = true;
      // 获取所有非新增的数据，执行后台删除逻辑，新增的数据直接界面删除
      const updateIds = ids.filter(id => id.indexOf('newLine') == -1);
      if (updateIds.length > 0) {
        updateCompType(updateIds, type).then(res => {
          if (res.success) {
            getList();
            proxy.$message.success('操作成功！');
            saveLoading.value = false;
          } else {
            proxy.$message.error('操作失败！');
            saveLoading.value = false;
          }
        }).finally(() => {
          saveLoading.value = false;
        });
      }
    }
  });
}

/** 导入 */
function handleImport() {
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
      queryParam.searchParams = queryForm.value;
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}

/** 删除 */
function handleDelete(ids, e, type) {
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
        return delPmsCheckBill(deleteIds)
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
function removeRecordByIds(deleteIds) {
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
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}

/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}

/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, pmsCheckBill);
    if (!flag) {
      break;
    }
  }
  return flag;
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
</script>

