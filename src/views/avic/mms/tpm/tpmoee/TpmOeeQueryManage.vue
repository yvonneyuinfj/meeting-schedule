<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="申报部门">
                  <AvicCommonSelect
                      v-model:value="queryForm.reportDeptId"
                      type="deptSelect"
                      placeholder="请选择申报部门"
                      :defaultShowValue="queryForm.reportDeptIdAlias"
                      @callback="result => {
                        queryForm.reportDeptIdAlias = result.names;
                      }
                        "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="申报月份(起)">
                  <a-date-picker
                      v-model:value="queryForm.reportDateBegin"
                      format="YYYY-MM"
                      value-format="YYYY-MM"
                      placeholder="请选择申报月份(起)"
                      :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.reportDateEnd)"
                      picker="month"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="申报月份(止)">
                  <a-date-picker
                      v-model:value="queryForm.reportDateEnd"
                      format="YYYY-MM"
                      value-format="YYYY-MM"
                      placeholder="请选择申报月份(止)"
                      :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.reportDateBegin)"
                      picker="month"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="申请人">
                  <AvicCommonSelect
                      v-model:value="queryForm.applyUserId"
                      type="userSelect"
                      placeholder="请选择申请人"
                      :defaultShowValue="queryForm.applyUserName"
                      @callback="result => {
                        queryForm.applyUserName = result.names;
                      }
                        "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="申请日期(起)">
                  <a-date-picker
                      v-model:value="queryForm.applyDateBegin"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      placeholder="请选择申请日期(起)"
                      :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.applyDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="申请日期(止)">
                  <a-date-picker
                      v-model:value="queryForm.applyDateEnd"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      placeholder="请选择申请日期(止)"
                      :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.applyDateBegin)"
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
          <AvicTable ref="tpmOee" table-key="tpmOee" :columns="columns" :row-key="record => record.id"
                     :data-source="list" :loading="loading" :row-selection="{
                       selectedRowKeys: selectedRowKeys,
                       onChange: onSelectChange,
                       columnWidth: 40,
                       fixed: true
                     }" :pageParameter="queryParam.pageParameter" :total="totalPage" rowClickSelectionType="radio"
                     @change="handleTableChange" @refresh="getList">
            <template #toolBarLeft>
              <a-space>
                <!-- <a-button v-hasPermi="['tpmOee:import']" title="导入" type="primary" ghost @click="handleImport">
  <template #icon>
    <import-outlined />
  </template>
  导入
</a-button> -->
                <a-button v-hasPermi="['tpmOee:export']" title="导出" type="primary" ghost
                          @click="handleExport">
                  <template #icon>
                    <export-outlined/>
                  </template>
                  导出
                </a-button>
              </a-space>
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'reportDate'">
                  {{ dayjs(record.reportDate).format('YYYY-MM') }}
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <tpm-oee-l-query-manage key="tpmOeeLQueryManage" ref="tpmOeeLQueryManage" :mainId="mainId" :reportDate="reportDate"/>
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { TpmOeeDto } from '@/api/avic/mms/tpm/TpmOeeApi'; // 引入模块DTO
import { exportExcel, listTpmOeeByPage } from '@/api/avic/mms/tpm/TpmOeeApi'; // 引入模块API
import TpmOeeLQueryManage from '../tpmoeel/TpmOeeLQueryManage.vue'; // 引入子表页面组件
import dayjs from 'dayjs';
import { useUserStore } from '@/store/user';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
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
    title: '申报部门',
    dataIndex: 'reportDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请人名称',
    dataIndex: 'applyUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申报月份',
    dataIndex: 'reportDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
];
const userStore = useUserStore();
const queryForm = ref<TpmOeeDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: queryForm,
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const totalPage = ref(0);
const advanced = ref(false); // 高级搜索 展开/关闭
const secretLevelList = ref([]); // 密级通用代码

// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
});
const reportDate = computed(() => {
  return selectedRows.value.length === 1 ? selectedRows.value[0].reportDate : '';
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  if (queryForm.value.reportDateBegin != undefined) {
    const reportDateBegin = dayjs(queryForm.value.reportDateBegin);
    queryForm.value.reportDateBegin = dayjs().year(reportDateBegin.year()).month(reportDateBegin.month()).startOf('month').format('YYYY-MM-DD');
  }
  if (queryForm.value.reportDateEnd != undefined) {
    const reportDateEnd = dayjs(queryForm.value.reportDateEnd);
    queryForm.value.reportDateEnd = dayjs().year(reportDateEnd.year()).month(reportDateEnd.month()).endOf('month').format('YYYY-MM-DD');
  }
  listTpmOeeByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      // 设置表格初始选中项
      if (list.value.length > 0) {
        selectedRowKeys.value = [list.value[0]['id']];
      } else {
        selectedRowKeys.value = [];
      }
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

/** 高级搜索按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}

/** 高级查询重置按钮操作  */
function resetQuery() {
  queryForm.value = {};
  handleQuery();
}

/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      if (queryForm.value.reportDateBegin != undefined) {
        const reportDateBegin = dayjs(queryForm.value.reportDateBegin);
        queryForm.value.reportDateBegin = dayjs().year(reportDateBegin.year()).month(reportDateBegin.month()).startOf('month').format('YYYY-MM-DD');
      }
      if (queryForm.value.reportDateEnd != undefined) {
        const reportDateEnd = dayjs(queryForm.value.reportDateEnd);
        queryForm.value.reportDateEnd = dayjs().year(reportDateEnd.year()).month(reportDateEnd.month()).endOf('month').format('YYYY-MM-DD');
      }
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

