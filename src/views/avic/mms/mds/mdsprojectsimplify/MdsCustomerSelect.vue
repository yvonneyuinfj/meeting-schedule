<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="客户编码">
              <a-input
                v-model:value="queryForm.customerCode"
                placeholder="请输入客户编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="企业编码">
              <a-input
                v-model:value="queryForm.corporationUniqueCode"
                placeholder="请输入企业编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户名称">
              <a-input
                v-model:value="queryForm.customerName"
                placeholder="请输入客户名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户地址">
              <a-input
                v-model:value="queryForm.address"
                placeholder="请输入客户地址"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质量等级">
              <a-select
                v-model:value="queryForm.vendorQulityLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择质量等级"
              >
                <a-select-option
                  v-for="item in vendorQulityLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单位性质">
              <a-select
                v-model:value="queryForm.corporationMode"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择单位性质"
              >
                <a-select-option
                  v-for="item in corporationModeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户重要程度">
              <a-select
                v-model:value="queryForm.customerImport"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择客户重要程度"
              >
                <a-select-option
                  v-for="item in customerImportList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注">
              <a-input
                v-model:value="queryForm.note"
                placeholder="请输入备注"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效标识">
              <a-select
                v-model:value="queryForm.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择有效标识"
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
        ref="mdsCustomerSelect"
        table-key="mdsCustomerSelect"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :show-table-setting="false"
        :row-selection="{
          type: 'radio',
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
            placeholder="请输入客户编码或企业编码"
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
import type { MdsCustomerDto } from '@/api/avic/mms/mds/MdsCustomerApi'; // 引入模块DTO
import { listMdsCustomerByPage } from '@/api/avic/mms/mds/MdsCustomerApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const mdsCustomerSelect = ref();
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
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '客户编码',
    dataIndex: 'customerCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业编码',
    dataIndex: 'corporationUniqueCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '客户地址',
    dataIndex: 'address',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量等级',
    dataIndex: 'vendorQulityLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单位性质',
    dataIndex: 'corporationModeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '客户重要程度',
    dataIndex: 'customerImportName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单位类型',
    dataIndex: 'customerTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '有效标识',
    dataIndex: 'validFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
const queryForm = ref<MdsCustomerDto>({});
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
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const payModeList = ref([]); // 付款方式通用代码
const vendorQulityLevelList = ref([]); // 质量等级通用代码
const corporationModeList = ref([]); // 单位性质通用代码
const customerImportList = ref([]); // 客户重要程度通用代码
const customerTypeList = ref([]); // 单位类型通用代码
const riskResistableList = ref([]); // 抗风险能力通用代码
const devAbilityList = ref([]); // 研发能力通用代码
const certificateList = ref([]); // 客户认证通用代码
const qualityCreditIdList = ref([]); // 质量信誉通用代码
const ynReplaceList = ref([]); // 是否可替代通用代码
const deliveryChangeDealList = ref([]); // 交付期变化处理通用代码
const overAcceptDealList = ref([]); // 超出接受处理通用代码
const validFlagList = ref([]); // 有效标识通用代码
const info = ref();
const lookupParams = [
  { fieldName: 'payMode', lookUpType: 'MDS_PAY_MODE' },
  { fieldName: 'vendorQulityLevel', lookUpType: 'MDS_VENDOR_QULITY_LEVEL' },
  { fieldName: 'corporationMode', lookUpType: 'MDS_CORPORATION_MODE' },
  { fieldName: 'customerImport', lookUpType: 'MDS_CUSTOMER_IMPORT' },
  { fieldName: 'customerType', lookUpType: 'MDS_CUSTOMER_TYPE' },
  { fieldName: 'riskResistable', lookUpType: 'MDS_RISK_RESISTABLE' },
  { fieldName: 'devAbility', lookUpType: 'MDS_DEV_ABILITY' },
  { fieldName: 'certificate', lookUpType: 'MDS_CERTIFICATE' },
  { fieldName: 'qualityCreditId', lookUpType: 'MDS_QUALITY_CREDIT_ID' },
  { fieldName: 'ynReplace', lookUpType: 'MDS_YN_REPLACE' },
  { fieldName: 'deliveryChangeDeal', lookUpType: 'MDS_DELIVERY_CHANGE_DEAL' },
  { fieldName: 'overAcceptDeal', lookUpType: 'MDS_OVER_ACCEPT_DEAL' },
  { fieldName: 'validFlag', lookUpType: 'MDS_VAILD_FLAG' }
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
  listMdsCustomerByPage(queryParam)
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
    payModeList.value = result.payMode;
    vendorQulityLevelList.value = result.vendorQulityLevel;
    corporationModeList.value = result.corporationMode;
    customerImportList.value = result.customerImport;
    customerTypeList.value = result.customerType;
    riskResistableList.value = result.riskResistable;
    devAbilityList.value = result.devAbility;
    certificateList.value = result.certificate;
    qualityCreditIdList.value = result.qualityCreditId;
    ynReplaceList.value = result.ynReplace;
    deliveryChangeDealList.value = result.deliveryChangeDeal;
    overAcceptDealList.value = result.overAcceptDeal;
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
    customerCode: value,
    corporationUniqueCode: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  info.value = rows[0];
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
function customRow(record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}

defineExpose({
  info
});
</script>


