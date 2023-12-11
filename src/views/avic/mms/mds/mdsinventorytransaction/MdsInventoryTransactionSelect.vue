<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="库存事务处理类型">
              <a-input
                v-model:value="queryForm.invTransactTypeCode"
                placeholder="请输入库存事务处理类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="库存事务类型说明">
              <a-input
                v-model:value="queryForm.invTransactTypeDesc"
                placeholder="请输入库存事务类型说明"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="操作来源">
              <a-select
                v-model:value="queryForm.operationSource"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择操作来源"
              >
                <a-select-option
                  v-for="item in operationSourceList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="操作类型">
              <a-select
                v-model:value="queryForm.operationType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择操作类型"
              >
                <a-select-option
                  v-for="item in operationTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否登帐标记">
              <a-select
                v-model:value="queryForm.keepAccountFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否登帐标记"
              >
                <a-select-option
                  v-for="item in keepAccountFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="库房总数量变化标记">
              <a-select
                v-model:value="queryForm.changeInvQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择库房总数量变化标记"
              >
                <a-select-option
                  v-for="item in changeInvQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="累计入库量变化标记">
              <a-select
                v-model:value="queryForm.changeSumupInQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择累计入库量变化标记"
              >
                <a-select-option
                  v-for="item in changeSumupInQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="累计出库量变化标记">
              <a-select
                v-model:value="queryForm.changeSumupOutQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择累计出库量变化标记"
              >
                <a-select-option
                  v-for="item in changeSumupOutQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="已分配量变化标记">
              <a-select
                v-model:value="queryForm.changeAllocatedQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择已分配量变化标记"
              >
                <a-select-option
                  v-for="item in changeAllocatedQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单据前缀">
              <a-input
                v-model:value="queryForm.prefixCode"
                placeholder="请输入单据前缀"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单据报表名称">
              <a-input
                v-model:value="queryForm.reportName"
                placeholder="请输入单据报表名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否进行出库审批">
              <a-select
                v-model:value="queryForm.ynOutApprove"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否进行出库审批"
              >
                <a-select-option
                  v-for="item in ynOutApproveList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否进行出库检验">
              <a-select
                v-model:value="queryForm.ynOutCheck"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否进行出库检验"
              >
                <a-select-option
                  v-for="item in ynOutCheckList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效标记">
              <a-select
                v-model:value="queryForm.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择有效标记"
              >
                <a-select-option
                  v-for="item in validFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否允许选择">
              <a-input
                v-model:value="queryForm.ynEnableChoose"
                placeholder="请输入是否允许选择"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
              >
                <a-select-option
                  v-for="item in secretLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否进行稽核【SFERP新增】">
              <a-input
                v-model:value="queryForm.ynAudit"
                placeholder="请输入是否进行稽核【SFERP新增】"
                :allow-clear="true"
                @pressEnter="handleQuery"
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
                  <search-outlined />
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined />
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced" />
                  <down-outlined v-else />
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
        ref="mdsInventoryTransactionSelect"
        table-key="mdsInventoryTransactionSelect"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :show-table-setting="false"
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
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入库存事务处理类型代码或库存事务类型说明"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { MdsInventoryTransactionDto } from '@/api/avic/mms/mds/MdsInventoryTransactionApi'; // 引入模块DTO
import { listMdsInventoryTransactionByPage } from '@/api/avic/mms/mds/MdsInventoryTransactionApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const mdsInventoryTransactionSelect = ref();
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
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
    title: '库存事务处理类型',
    dataIndex: 'invTransactTypeCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库存事务类型说明',
    dataIndex: 'invTransactTypeDesc',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作来源',
    dataIndex: 'operationSourceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '操作类型代码',
    dataIndex: 'operationTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否登帐标记',
    dataIndex: 'keepAccountFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '库房总数量变化标记',
    dataIndex: 'changeInvQtyFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '累计入库量变化标记',
    dataIndex: 'changeSumupInQtyFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '累计出库量变化标记',
    dataIndex: 'changeSumupOutQtyFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '已分配量变化标记',
    dataIndex: 'changeAllocatedQtyFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单据前缀',
    dataIndex: 'prefixCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '单据报表名称',
    dataIndex: 'reportName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否进行出库审批',
    dataIndex: 'ynOutApproveName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否进行出库检验',
    dataIndex: 'ynOutCheckName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '有效标记',
    dataIndex: 'validFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否允许选择',
    dataIndex: 'ynEnableChoose',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '是否进行稽核【SFERP新增】',
    dataIndex: 'ynAudit',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    visible: false,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<MdsInventoryTransactionDto>({});
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
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const  totalPage = ref(0);
const operationSourceList = ref([]); // 操作来源代码 ^ C --采购; S--生产; K--库存; X--销售; P--配套; I--零星; J--JIT; D--调换; T--退货; Z--建帐; Y--移库; L--领用; W--维修;B--报废;通用代码
const operationTypeList = ref([]); // 操作类型代码 ^ O --出库;   I--入库通用代码
const keepAccountFlagList = ref([]); // 是否登帐标记 ^ 通用代码
const changeInvQtyFlagList = ref([]); // 库房总数量变化标记 ^+ --增加；- --减少；0 --不变通用代码
const changeSumupInQtyFlagList = ref([]); // 累计入库量变化标记 ^+ --增加；- --减少；0 --不变通用代码
const changeSumupOutQtyFlagList = ref([]); // 累计出库量变化标记 ^+ --增加；- --减少；0 --不变通用代码
const changeAllocatedQtyFlagList = ref([]); // 已分配量变化标记 ^+ --增加；- --减少；0 --不变通用代码
const ynOutApproveList = ref([]); // 是否进行出库审批通用代码
const ynOutCheckList = ref([]); // 是否进行出库检验通用代码
const validFlagList = ref([]); // 有效标记^ 0-无效；1-有效通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const lookupParams = [
  { fieldName: 'operationSource', lookUpType: 'TRANSACTION_OPERATION_SOURCE' },
  { fieldName: 'operationType', lookUpType: 'TRANSACTION_OPERATION_TYPE' },
  { fieldName: 'keepAccountFlag', lookUpType: 'TRANSACTION_KEEP_ACCOUNT_FLAG' },
  { fieldName: 'changeInvQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
  { fieldName: 'changeSumupInQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
  { fieldName: 'changeSumupOutQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
  { fieldName: 'changeAllocatedQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
  { fieldName: 'ynOutApprove', lookUpType: 'TRANSACTION_KEEP_ACCOUNT_FLAG' },
  { fieldName: 'ynOutCheck', lookUpType: 'TRANSACTION_KEEP_ACCOUNT_FLAG' },
  { fieldName: 'validFlag', lookUpType: 'TRANSACTION_VALID_FLAG' }
 ];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listMdsInventoryTransactionByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
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
    operationSourceList.value = result.operationSource;
    operationTypeList.value = result.operationType;
    keepAccountFlagList.value = result.keepAccountFlag;
    changeInvQtyFlagList.value = result.changeInvQtyFlag;
    changeSumupInQtyFlagList.value = result.changeSumupInQtyFlag;
    changeSumupOutQtyFlagList.value = result.changeSumupOutQtyFlag;
    changeAllocatedQtyFlagList.value = result.changeAllocatedQtyFlag;
    ynOutApproveList.value = result.ynOutApprove;
    ynOutCheckList.value = result.ynOutCheck;
    validFlagList.value = result.validFlag;
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
  const keyWord = {
    invTransactTypeCode: value,
    invTransactTypeDesc: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  // 传出选中项
  $emit('select', selectedRows.value);
}
/** 表格排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 行双击事件 */
function customRow (record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
</script>

