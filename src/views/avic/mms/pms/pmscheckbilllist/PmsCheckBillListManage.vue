<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="pmsCheckBillList"
        table-key="pmsCheckBillList"
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
            <a-button
              v-hasPermi="['pmsCheckBillList:add']"
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
              v-hasPermi="['pmsCheckBillList:save']"
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
              v-hasPermi="['pmsCheckBillList:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleDelete(selectedRowKeys, event,'');
                }
              "
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
          </a-space>
        </template>
        <!--        <template #toolBarRight>-->
        <!--          <a-input-search-->
        <!--            class="opt-btn-commonsearch"-->
        <!--            style="width: 200px"-->
        <!--            placeholder="请输入"-->
        <!--            :allow-clear="true"-->
        <!--            @search="handleKeyWordQuery"-->
        <!--          />-->
        <!--        </template>-->
        <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
            v-if="column.dataIndex === 'relDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.relDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择提交检验日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'unqualifiedQty'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input-number
                v-model:value="record.unqualifiedQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                style="width: 100%"
                placeholder="请输入不合格品数量"
              >
              </a-input-number>
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
            v-else-if="column.dataIndex === 'checkResult'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.checkResult"
                style="width: 100%"
                placeholder="请选择检验结论 "
                @change="(value)=>changeControlValue(value,record,'checkResult')"
              >
                <a-select-option
                  v-for="select in checkResultList"
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
                :value="record.checkResultName"
                :options="checkResultList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'chkStatus'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.chkStatus"
                style="width: 100%"
                placeholder="请选择状态"
                @change="(value)=>changeControlValue(value,record,'chkStatus')"
              >
                <a-select-option
                  v-for="select in chkStatusList"
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
                :value="record.chkStatusName"
                :options="chkStatusList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'plnDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.plnDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划完成日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'qualifiedQty'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input-number
                v-model:value="record.qualifiedQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                style="width: 100%"
                placeholder="请输入合格品数量"
              >
              </a-input-number>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'chkDeptId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <AvicCommonSelect
                v-model:value="record.chkDeptId"
                :defaultShowValue="record.chkDeptIdAlias"
                placeholder="请选择检验部门"
                type="deptSelect"
                @callback="
                  (value, _selectRows) => {
                    changeCommonSelect(value,record,'chkDeptId')
                  }
                "
              />
            </template>
            <template #default>
              {{ record['chkDeptIdAlias'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="['checkNotes','checkItemDesc','checkItemName'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="512"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'chkUserId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <AvicCommonSelect
                v-model:value="record.chkUserId"
                :defaultShowValue="record.chkUserIdAlias"
                placeholder="请选择检验人"
                type="userSelect"
                @callback="
                  (value, _selectRows) => {
                    changeCommonSelect(value,record,'chkUserId')
                  }
                "
              />
            </template>
            <template #default>
              {{ record['chkUserIdAlias'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'checkDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.checkDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择检验日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'relUserId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <AvicCommonSelect
                v-model:value="record.relUserId"
                :defaultShowValue="record.relUserIdAlias"
                placeholder="请选择提交人"
                type="userSelect"
                @callback="
                  (value, _selectRows) => {
                    changeCommonSelect(value,record,'relUserId')
                  }
                "
              />
            </template>
            <template #default>
              {{ record['relUserIdAlias'] }}
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
      importUrl="/mms/pms/pmscheckbilllists/importData/v1"
      downloadTemplateUrl="/mms/pms/pmscheckbilllists/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    ></avic-excel-import>
  </div>
</template>
<script lang="ts" setup>
import type {PmsCheckBillListDto} from '@/api/avic/mms/pms/PmsCheckBillListApi'; // 引入模块DTO
import {
  listPmsCheckBillListByPage,
  savePmsCheckBillList,
  delPmsCheckBillList,
  exportExcel
} from '@/api/avic/mms/pms/PmsCheckBillListApi'; // 引入模块API

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
    title: '检验项目名称',
    dataIndex: 'checkItemName',
    key: 'checkItemName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验项目说明',
    dataIndex: 'checkItemDesc',
    key: 'checkItemDesc',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划完成日期',
    dataIndex: 'plnDate',
    key: 'plnDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '检验结论 ',
    dataIndex: 'checkResult',
    key: 'checkResult',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不合格品数量',
    dataIndex: 'unqualifiedQty',
    key: 'unqualifiedQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '合格品数量',
    dataIndex: 'qualifiedQty',
    key: 'qualifiedQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '验收说明',
    dataIndex: 'checkNotes',
    key: 'checkNotes',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '状态',
    dataIndex: 'chkStatus',
    key: 'chkStatus',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '提交检验日期',
    dataIndex: 'relDate',
    key: 'relDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '提交人',
    dataIndex: 'relUserId',
    key: 'relUserId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验部门',
    dataIndex: 'chkDeptId',
    key: 'chkDeptId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验人',
    dataIndex: 'chkUserId',
    key: 'chkUserId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验日期',
    dataIndex: 'checkDate',
    key: 'checkDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<PmsCheckBillListDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    pmsCheckBillId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const pmsCheckBillList = ref(null);
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({tableName: 'pmsCheckBillList'}); // 导入Excel数据过滤参数
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
const checkResultList = ref([]); // 检验结论 通用代码
const chkStatusList = ref([]); // 状态通用代码
const lookupParams = [
  {fieldName: 'checkResult', lookUpType: 'PMS_CHECK_RESULT'},
  {fieldName: 'chkStatus', lookUpType: 'PMS_CHK_STATUS'}
];
const validateRules = {}; // 必填列,便于保存和新增数据时校验
const editingId = ref(''); // 正在编辑中的数据

const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

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

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.pmsCheckBillId = props.mainId ? props.mainId : '-1';
  listPmsCheckBillListByPage(queryParam)
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
    checkResultList.value = result.checkResult;
    chkStatusList.value = result.chkStatus;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
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
  const keyWord = {};
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
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    secretLevel: undefined,
    checkItemName: '',
    checkItemDesc: '',
    plnDate: null,
    checkResult: undefined,
    unqualifiedQty: '',
    qualifiedQty: '',
    checkNotes: '',
    chkStatus: undefined,
    relDate: null,
    relUserId: '',
    chkDeptId: '',
    chkUserId: '',
    checkDate: null,
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
  target.pmsCheckBillId = props.mainId;
  savePmsCheckBillList([target]).then(res => {
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
    changedData.forEach(item => item.pmsCheckBillId = props.mainId);
    savePmsCheckBillList(changedData).then(res => {
      if (res.success) {
        getList();
        proxy.$message.success('保存成功！');
      } else {
        proxy.$message.error('保存失败！');
      }
    }).finally(() => {
      saveLoading.value = false;
    });
  } else {
    saveLoading.value = false;
  }
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
        return delPmsCheckBillList(deleteIds)
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

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
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

/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}

/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, pmsCheckBillList);
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
defineExpose({
  getList
});
</script>

