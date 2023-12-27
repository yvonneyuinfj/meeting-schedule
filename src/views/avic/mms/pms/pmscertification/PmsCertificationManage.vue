<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <AvicSplit>
        <AvicPane size="60%">
          <pms-check-bill @mainId="parentIdChange"/>
        </AvicPane>
        <AvicPane>
          <pms-check-bill-list-manage :mainId="mainId" ref="pmsCheckBillListManage"/>
        </AvicPane>
      </AvicSplit>

    </AvicPane>
    <AvicPane>
      <div class="content-wrapper">
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable
              ref="pmsCertification"
              table-key="pmsCertification"
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
                    v-hasPermi="['pmsCertification:add']"
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
                    v-hasPermi="['pmsCertification:save']"
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
                    v-hasPermi="['pmsCertification:del']"
                    title="删除"
                    danger
                    :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                    :loading="delLoading"
                    @click="handleDelete(selectedRows, selectedRowKeys)"
                >
                  <template #icon>
                    <delete-outlined/>
                  </template>
                  删除
                </a-button>
                <a-button type="primary" @click="handleApproval(selectedRows, selectedRowKeys)"
                          :loading="approvalLoading">
                  发起不合格物资审批流程
                  <template #icon>
                    <plus-outlined/>
                  </template>
                </a-button>
                <a-button
                    v-hasPermi="['pmsCertification:save']"
                    :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                    :loading="delLoading"
                    @click="handleCommitStorage(selectedRows, selectedRowKeys)"
                >
                  提交
                </a-button>
              </a-space>
            </template>

            <template #bodyCell="{ column, text, record, index }">
              <AvicRowEdit
                  v-if="column.dataIndex === 'unqualifiedQty'"
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
                  v-else-if="column.dataIndex === 'checkResult'"
                  :record="record"
                  :column="column.dataIndex"
              >
                <template #edit>
                  <a-select
                      v-model:value="record.checkResult"
                      style="width: 100%"
                      placeholder="请选择检验结论"
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
              <template v-if="column.dataIndex === 'id'">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'businessstate_'">
                <span v-if="record.status === '10'"> {{ record.businessstate_ }}</span>
                <a v-else @click="handleFlowDetail(record)">
                  {{ record.businessstate_ }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'action'">
                <div v-if="!record.bpmState || record.bpmState === 'start'">
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
                </div>
                <!--                <a-button-->
                <!--                  type="link"-->
                <!--                  class="inner-btn"-->
                <!--                  @click.stop="-->
                <!--                    event => {-->
                <!--                      handleDelete([record.id], event, 'row');-->
                <!--                    }-->
                <!--                  "-->
                <!--                >-->
                <!--                  删除-->
                <!--                </a-button>-->
              </template>
            </template>
          </AvicTable>
        </div>
        <!-- 添加页面弹窗 -->
        <PmsCertificationAdd
            v-if="showAddModal"
            ref="addModal"
            :mainId="mainId"
            :bpmOperatorRefresh="getList"
            @reloadData="getList"
            @close="showAddModal = false"
        />
        <!-- 编辑页面弹窗 -->
        <PmsCertificationEdit
            v-if="showEditModal"
            ref="editModal"
            :form-id="formId"
            @reloadData="getList"
            @close="showEditModal = false"
        />
      </div>
    </AvicPane>

  </AvicSplit>

</template>
<script lang="ts" setup>
import type {PmsCertificationDto} from '@/api/avic/mms/pms/PmsCertificationApi'; // 引入模块DTO
import {
  listPmsCertificationByPage,
  delPmsCertification,
  exportExcel,
  savePmsCertification, saveFormAndStartProcess, commitStorage
} from '@/api/avic/mms/pms/PmsCertificationApi'; // 引入模块API
import PmsCertificationAdd from './PmsCertificationAdd.vue'; // 引入添加页面组件
import PmsCertificationEdit from './PmsCertificationEdit.vue'; // 引入编辑页面组件
import flowUtils, {startFlowByFormCode} from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import PmsCheckBill from "@/views/avic/mms/pms/pmscertification/PmsCheckBill.vue";
import PmsCheckBillListManage from "@/views/avic/mms/pms/pmscheckbilllist/PmsCheckBillListManage.vue";

const {proxy} = getCurrentInstance();
const layout = {
  labelCol: {flex: '0 0 120px'},
  wrapperCol: {flex: '1 1 0'}
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
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
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '试验单号',
    dataIndex: 'checkBusinessNo',
    key: 'checkBusinessNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厂内合格证',
    dataIndex: 'facprtlotNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验结论',
    dataIndex: 'checkResult',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '合格品数量',
    dataIndex: 'qualifiedQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不合格品数量',
    dataIndex: 'unqualifiedQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不合格品处理单号',
    dataIndex: 'unqualifiedNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '状态',
    dataIndex: 'businessstate_',
    ellipsis: true,
    sorter: true,
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
const queryForm = ref<PmsCertificationDto>({});
// 高级查询对象
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const saveLoading = ref(false); // 统一保存按钮loading 状态
const delLoading = ref(false); // 删除按钮loading状态
const approvalLoading = ref(false); // 提交审批按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const checkResultList = ref([]); // 检验结论通用代码
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const mainId = ref(''); // 上级ID
const pmsCertification = ref(null);
const lookupParams = [
  {fieldName: 'checkResult', lookUpType: 'PMS_UP_TO_STANDARD'}
];
const validateRules = {}; // 必填列,便于保存和新增数据时校验
const editingId = ref(''); // 正在编辑中的数据
const formCode = 'PmsCertification';
const pmsCheckBillListManage = ref(null)

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

function parentIdChange(pmsCheckBillId) {
  mainId.value = pmsCheckBillId;
  getList();
  pmsCheckBillListManage.value.getList();
}

/** 查询数据 */
function getList() {
  if (!mainId.value) {
    return;
  }
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams = {pmsCheckBillId: mainId.value};
  listPmsCertificationByPage(queryParam)
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

/** 获取通用代码 */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    checkResultList.value = result.checkResult;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}

// /** 根据流程状态及发起人查询数据 */
// function changeBpmFilter({bpmType, bpmState}) {
//   queryForm.value.bpmType = bpmType;
//   queryForm.value.bpmState = bpmState;
//   queryParam.searchParams = queryForm.value;
//   getList();
// }

/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}

/** 高级查询 重置按钮操作 */
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
  if (!mainId.value) {
    proxy.$message.warning('请先选择主表数据！');
    return;
  }
  showAddModal.value = true;
}

/** 编辑 */
// function handleEdit() {
//   if (selectedRows.value.length !== 1) {
//     proxy.$message.warning('请选择一条要编辑的数据！');
//     return;
//   }
//   formId.value = selectedRows.value[0].id;
//   showEditModal.value = true;
// }
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

/** 打开流程详情页面 */
function handleFlowDetail(record) {
  if (record.id) {
    flowUtils.detailByOptions({
      formId: record.id,
      bpmOperatorRefresh: getList
    });
  }
}

/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState && row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delPmsCertification(ids)
          .then(res => {
            if (res.success) {
              proxy.$message.success('删除成功！');
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

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}

/** 表格排序 */
function handleTableChange(pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
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
  savePmsCertification([target]).then(res => {
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
    savePmsCertification(changedData).then(res => {
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


/** 提交入库 */
function handleCommitStorage(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要提交的数据！');
    return;
  }
  if (rows.filter(row => row.checkResult !== '1')?.length > 0) {
    proxy.$message.warning('不能提交不合格物资！');
    return;
  }
  if (rows.filter(row => row.status === '10')?.length > 0) {
    proxy.$message.warning('已生效不可重复提交！');
    return;
  }
  proxy.$confirm({
    title: '确认要提交选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      commitStorage(ids)
          .then(res => {
            if (res.success) {
              proxy.$message.success('提交成功！');
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

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      if (!record.bpmState || record.bpmState === 'start') {
        handleEdit(record);
      }
    }
  };
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

/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, pmsCertification);
    if (!flag) {
      break;
    }
  }
  return flag;
}

// 提交审批
const handleApproval = (rows, ids) => {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要提交审批的数据！');
    return;
  }
  if (ids.length > 1) {
    proxy.$message.warning('请选择一条要提交审批的数据！');
    return;
  }
  for (let item of rows) {
    if (item.bpmState !== null) {
      proxy.$message.warning('请选择未提交审批的数据！');
      return;
    }
    if (item.checkResult === '1') {
      proxy.$message.warning('请提交不合格物资！');
      return;
    }
  }
  proxy.$confirm({
    title: '确认提交审批?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      approvalLoading.value = true;
      getBpmDefine(rows);
    }
  });
};

function getBpmDefine(rows) {
  for (let postData of rows) {
    startFlowByFormCode({
      formCode: formCode,
      formData: postData,
      callback: bpmDefinedInfo => {
        approval(bpmDefinedInfo, postData);
      }
    });
  }
}

const approval = (bpmDefinedInfo, postData) => {
  const param = {
    processDefId: bpmDefinedInfo.dbid,
    formCode: formCode,
    postData
  };
  saveFormAndStartProcess(param).then(res => {
    if (res.success) {
      approvalLoading.value = false;
      proxy.$message.success('提交成功!');
      getList();
      handleFlowDetail(postData);
    } else {
      approvalLoading.value = false;
    }
  }).catch(() => {
    approvalLoading.value = false;
  });
};

</script>
