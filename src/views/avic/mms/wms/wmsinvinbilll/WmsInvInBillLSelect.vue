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
            <a-form-item label="物料">
              <a-input
                v-model:value="queryForm.mdsItemId"
                placeholder="请输入物料"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="供应商">
              <a-input
                v-model:value="queryForm.srmVendorId"
                placeholder="请输入供应商"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计量单位 ">
              <a-input
                v-model:value="queryForm.mdsUnitId"
                placeholder="请输入计量单位 "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="不含税合同单价">
              <a-input
                v-model:value="queryForm.inPrice"
                placeholder="请输入不含税合同单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="含税合同单价">
              <a-input
                v-model:value="queryForm.arrivalUnitPrice"
                placeholder="请输入含税合同单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划价">
              <a-input
                v-model:value="queryForm.plannedPrice"
                placeholder="请输入计划价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批次">
              <a-input
                v-model:value="queryForm.batchNumber"
                placeholder="请输入批次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质量编号">
              <a-input
                v-model:value="queryForm.qualityCode"
                placeholder="请输入质量编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="订单类型">
              <a-input
                v-model:value="queryForm.orderType"
                placeholder="请输入订单类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效保管期(起)">
              <a-date-picker
                v-model:value="queryForm.ensureDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.ensureDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效保管期(止)">
              <a-date-picker
                v-model:value="queryForm.ensureDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.ensureDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长保管日期(起)">
              <a-date-picker
                v-model:value="queryForm.storageDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.storageDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长保管日期(止)">
              <a-date-picker
                v-model:value="queryForm.storageDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.storageDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="验收日期(起)">
              <a-date-picker
                v-model:value="queryForm.acceptanceDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.acceptanceDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="验收日期(止)">
              <a-date-picker
                v-model:value="queryForm.acceptanceDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.acceptanceDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封存日期(起)">
              <a-date-picker
                v-model:value="queryForm.archiveDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.archiveDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封存日期(止)">
              <a-date-picker
                v-model:value="queryForm.archiveDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.archiveDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单据状态">
              <a-input
                v-model:value="queryForm.inBillLStatus"
                placeholder="请输入单据状态"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用型号">
              <a-input
                v-model:value="queryForm.confineProduct"
                placeholder="请输入限用型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用批次">
              <a-input
                v-model:value="queryForm.confineBatch"
                placeholder="请输入限用批次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用架次">
              <a-input
                v-model:value="queryForm.confineLot"
                placeholder="请输入限用架次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用说明">
              <a-input
                v-model:value="queryForm.confineDesc"
                placeholder="请输入限用说明"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="炉号">
              <a-input
                v-model:value="queryForm.stoveNo"
                placeholder="请输入炉号"
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
            <a-form-item label="架次">
              <a-input
                v-model:value="queryForm.lotNo"
                placeholder="请输入架次"
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
        ref="wmsInvInBillLSelect"
        table-key="wmsInvInBillLSelect"
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
            placeholder="请输入退回原因"
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
import type { WmsInvInBillLDto } from '@/api/avic/mms/wms/WmsInvInBillLApi'; // 引入模块DTO
import { listWmsInvInBillLByPage } from '@/api/avic/mms/wms/WmsInvInBillLApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const wmsInvInBillLSelect = ref();
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
    title: '退回原因',
    dataIndex: 'refuseReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库位号',
    dataIndex: 'mdsLocatorIdName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料',
    dataIndex: 'mdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商',
    dataIndex: 'srmVendorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计量单位 ',
    dataIndex: 'mdsUnitId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请数量',
    dataIndex: 'applyQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '不含税合同单价',
    dataIndex: 'inPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '含税合同单价',
    dataIndex: 'arrivalUnitPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划价',
    dataIndex: 'plannedPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '批次',
    dataIndex: 'batchNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量编号',
    dataIndex: 'qualityCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订单类型',
    dataIndex: 'orderType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '有效保管期',
    dataIndex: 'ensureDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '最长保管日期',
    dataIndex: 'storageDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '验收日期',
    dataIndex: 'acceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '封存日期',
    dataIndex: 'archiveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单据状态',
    dataIndex: 'inBillLStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用型号',
    dataIndex: 'confineProduct',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用批次',
    dataIndex: 'confineBatch',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用架次',
    dataIndex: 'confineLot',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '限用说明',
    dataIndex: 'confineDesc',
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
    title: '架次',
    dataIndex: 'lotNo',
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
const queryForm = ref<WmsInvInBillLDto>({});
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
const secretLevelList = ref([]); // 密级通用代码

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listWmsInvInBillLByPage(queryParam)
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
    refuseReason: value
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
