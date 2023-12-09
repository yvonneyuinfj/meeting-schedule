<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="开始日期(起)">
              <a-date-picker
                v-model:value="queryForm.arrangeDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.arrangeDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="开始日期(止)">
              <a-date-picker
                v-model:value="queryForm.arrangeDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.arrangeDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结束日期(起)">
              <a-date-picker
                v-model:value="queryForm.endDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.endDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结束日期(止)">
              <a-date-picker
                v-model:value="queryForm.endDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.endDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="期段类型 ^ 取自通用代码APPLICATION_TYPE:  1-日,2-周,3-月,4-季度,5-年份'">
              <a-select
                v-model:value="queryForm.periodType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择期段类型 ^ 取自通用代码APPLICATION_TYPE:  1-日,2-周,3-月,4-季度,5-年份'"
              >
                <a-select-option
                  v-for="item in periodTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="期段需求日期（生产）(起)">
              <a-date-picker
                v-model:value="queryForm.reqDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择期段需求日期（生产）(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.reqDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="期段需求日期（生产）(止)">
              <a-date-picker
                v-model:value="queryForm.reqDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择期段需求日期（生产）(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.reqDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="期段应用类型 ^  取自通用代码APPLICATION_TYPE:  1-生产,2-采购,3-库存,4-成本'">
              <a-select
                v-model:value="queryForm.applicationType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择期段应用类型 ^  取自通用代码APPLICATION_TYPE:  1-生产,2-采购,3-库存,4-成本'"
              >
                <a-select-option
                  v-for="item in applicationTypeList"
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
            <a-form-item label="是否使用 ^ Y: 已使用   N: 未使用">
              <a-select
                v-model:value="queryForm.ynUsedFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否使用 ^ Y: 已使用   N: 未使用"
              >
                <a-select-option
                  v-for="item in ynUsedFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 ^ 通用代码MMS_DATA_SECRET_LEVEL"
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
        ref="mdsPeriodSelect"
        table-key="mdsPeriodSelect"
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
            placeholder="请输入"
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
import type { MdsPeriodDto } from '@/api/avic/mms/mds/MdsPeriodApi'; // 引入模块DTO
import { listMdsPeriodByPage } from '@/api/avic/mms/mds/MdsPeriodApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const mdsPeriodSelect = ref();
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
    title: '会计年度',
    dataIndex: 'year',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '期段号',
    dataIndex: 'orderNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '开始日期',
    dataIndex: 'arrangeDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '结束日期',
    dataIndex: 'endDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '期段类型 ^ 取自通用代码APPLICATION_TYPE:  1-日,2-周,3-月,4-季度,5-年份',
    dataIndex: 'periodTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '期段工作日总数（生产） ^',
    dataIndex: 'countWorkDay',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '期段需求日期（生产）',
    dataIndex: 'reqDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '期段应用类型 ^  取自通用代码APPLICATION_TYPE:  1-生产,2-采购,3-库存,4-成本',
    dataIndex: 'applicationTypeName',
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
    title: '是否使用 ^ Y: 已使用   N: 未使用',
    dataIndex: 'ynUsedFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级 ^ 通用代码MMS_DATA_SECRET_LEVEL',
    dataIndex: 'secretLevelName',
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
const queryForm = ref<MdsPeriodDto>({});
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
const periodTypeList = ref([]); // 期段类型 ^ 取自通用代码APPLICATION_TYPE:  1-日,2-周,3-月,4-季度,5-年份'通用代码
const applicationTypeList = ref([]); // 期段应用类型 ^  取自通用代码APPLICATION_TYPE:  1-生产,2-采购,3-库存,4-成本'通用代码
const ynUsedFlagList = ref([]); // 是否使用 ^ Y: 已使用   N: 未使用通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const lookupParams = [
  { fieldName: 'periodType', lookUpType: 'MDS_PERIOD_PERIOD_TYPE' },
  { fieldName: 'applicationType', lookUpType: 'MDS_PERIOD_APPLICATION_TYPE' },
  { fieldName: 'ynUsedFlag', lookUpType: 'MDS_PERIOD_USED_FLAG' }
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
  listMdsPeriodByPage(queryParam)
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
    periodTypeList.value = result.periodType;
    applicationTypeList.value = result.applicationType;
    ynUsedFlagList.value = result.ynUsedFlag;
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

