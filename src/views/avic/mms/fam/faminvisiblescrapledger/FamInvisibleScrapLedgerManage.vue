<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产编号">
              <a-input
                v-model:value="queryForm.assetNo"
                placeholder="请输入资产编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产名称">
              <a-input
                v-model:value="queryForm.assetName"
                placeholder="请输入资产名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
                    <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="原值">
              <a-input
                v-model:value="queryForm.factoryPrice"
                placeholder="请输入原值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="净值">
              <a-input
                v-model:value="queryForm.assetNetValue"
                placeholder="请输入净值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
                    <a-col v-bind="colLayout.cols" v-show="advanced">
                      <a-form-item label="购置时间(起)">
                        <a-date-picker
                          v-model:value="queryForm.purchaseTimeBegin"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择购置时间(起)"
                          :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.purchaseTimeEnd)"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="colLayout.cols" v-show="advanced">
                      <a-form-item label="购置时间(止)">
                        <a-date-picker
                          v-model:value="queryForm.purchaseTimeEnd"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择购置时间(止)"
                          :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.purchaseTimeBegin)"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="colLayout.cols" v-show="advanced">
                      <a-form-item label="是否已经上报集团">
                        <a-select
                          v-model:value="queryForm.ynReportGroup"
                          :get-popup-container="triggerNode => triggerNode.parentNode"
                          option-filter-prop="children"
                          :show-search="true"
                          :allow-clear="true"
                          placeholder="请选择是否已经上报集团"
                        >
                          <a-select-option
                            v-for="item in ynReportGroupList"
                            :key="item.sysLookupTlId"
                            :value="item.lookupCode"
                          >
                            {{ item.lookupName }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="colLayout.cols" v-show="advanced">
                      <a-form-item label="上报集团日期(起)">
                        <a-date-picker
                          v-model:value="queryForm.reportGroupDateBegin"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择上报集团日期(起)"
                          :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.reportGroupDateEnd)"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="colLayout.cols" v-show="advanced">
                      <a-form-item label="上报集团日期(止)">
                        <a-date-picker
                          v-model:value="queryForm.reportGroupDateEnd"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择上报集团日期(止)"
                          :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.reportGroupDateBegin)"
                        />
                      </a-form-item>
                    </a-col>
                    <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="集团批复文件">
              <a-input
                v-model:value="queryForm.groupApprovalDoc"
                placeholder="请输入集团批复文件"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col> -->
                    <a-col v-bind="colLayout.cols" v-show="advanced">
                      <a-form-item label="集团批复时间(起)">
                        <a-date-picker
                          v-model:value="queryForm.approvalTimeBegin"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择集团批复时间(起)"
                          :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.approvalTimeEnd)"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="colLayout.cols" v-show="advanced">
                      <a-form-item label="集团批复时间(止)">
                        <a-date-picker
                          v-model:value="queryForm.approvalTimeEnd"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择集团批复时间(止)"
                          :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.approvalTimeBegin)"
                        />
                      </a-form-item>
                    </a-col>
                    <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="数据密级">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择数据密级"
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
          </a-col> -->
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
                ref="famInvisibleScrapLedger"
                table-key="famInvisibleScrapLedger"
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
                @change="handleTableChange"
                @refresh="getList"
              >
                <template #toolBarLeft>
                  <a-space>
                    <a-button
                      v-hasPermi="['famInvisibleScrapLedger:add']"
                      title="批量录入批复文号"
                      type="primary"
                      @click="handleAdd(selectedRowKeys, '')"
                    >
                      <template #icon>
                        <plus-outlined />
                      </template>
                      批量录入批复文号
                    </a-button>
                    <!-- <a-button
              v-hasPermi="['famInvisibleScrapLedger:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button> -->
                    <!-- <a-button
              v-hasPermi="['famInvisibleScrapLedger:import']"
              title="导入"
              type="primary"
              ghost
              @click="handleImport">
              <template #icon>
                 <import-outlined />
              </template>
              导入
            </a-button> -->
            <a-button
              v-hasPermi="['famInvisibleScrapLedger:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
              <template #icon>
                 <export-outlined />
              </template>
              导出
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入资产编号或资产名称"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'assetNo'">
            <a @click="handleDetail(record)">
              {{ record.assetNo }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button
              v-hasPermi="['famInvisibleScrapLedger:del']"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <fam-invisible-scrap-ledger-add
      v-if="showAddModal"
      ref="addModal"
      :select-ids="selectIds"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <fam-invisible-scrap-ledger-edit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <fam-invisible-scrap-ledger-detail
      v-if="showDetailModal"
      ref="detailModal"
      :form-id="formId"
      @close="showDetailModal = false"
    />
    <AvicExcelImport
      v-if="showImportModal"
      :formData="excelParams"
      title="单表模板导入"
      importUrl="/mms/fam/faminvisiblescrapledgers/importData/v1"
      downloadTemplateUrl="/mms/fam/faminvisiblescrapledgers/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { FamInvisibleScrapLedgerDto } from '@/api/avic/mms/fam/FamInvisibleScrapLedgerApi'; // 引入模块DTO
import { listFamInvisibleScrapLedgerByPage, delFamInvisibleScrapLedger, exportExcel } from '@/api/avic/mms/fam/FamInvisibleScrapLedgerApi'; // 引入模块API
import FamInvisibleScrapLedgerAdd from './FamInvisibleScrapLedgerAdd.vue'; // 引入添加页面组件
import FamInvisibleScrapLedgerEdit from './FamInvisibleScrapLedgerEdit.vue'; // 引入编辑页面组件
import FamInvisibleScrapLedgerDetail from './FamInvisibleScrapLedgerDetail.vue'; // 引入详情页面组件
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
    title: '资产编号',
    dataIndex: 'assetNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产名称',
    dataIndex: 'assetName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原值',
    dataIndex: 'factoryPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '净值',
    dataIndex: 'assetNetValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '购置时间',
    dataIndex: 'purchaseTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否已经上报集团',
    dataIndex: 'ynReportGroupName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '上报集团日期',
    dataIndex: 'reportGroupDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '集团批复文件',
    dataIndex: 'groupApprovalDoc',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '集团批复时间',
    dataIndex: 'approvalTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'note',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '数据密级',
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
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<FamInvisibleScrapLedgerDto>({});
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
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'famInvisibleScrapLedger' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectIds = ref<String>('')
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const ynReportGroupList = ref([]); // 是否已经上报集团通用代码
const secretLevelList = ref([]); // 数据密级通用代码
const lookupParams = [
  { fieldName: 'ynReportGroup', lookUpType: 'PLATFORM_YES_NO_FLAG' }
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
function getList () {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listFamInvisibleScrapLedgerByPage(queryParam)
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
function getLookupList () {
  proxy.$getLookupByType(lookupParams, result => {
    ynReportGroupList.value = result.ynReportGroup;
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
/** 高级查询 重置按钮操作 */
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
    assetNo: value,
    assetName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd (ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要批量录入批复文号的数据！');
    return;
  }
  selectIds.value = ids.join(',')
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit (id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详细 */
function handleDetail (record) {
  formId.value = record.id;
  showDetailModal.value = true;
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
function handleDelete (ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delFamInvisibleScrapLedger(ids)
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
/** 勾选复选框时触发 */
function onSelectChange (rowKeys) {
  selectedRowKeys.value = rowKeys;
}
const selectedRow = () => {
  let rows = [];
  selectedRowKeys.value.map(item => {
    rows.push({
      ...list.value.filter(i => item === i.id)[0],
      operationType_: 'inside'
    });
  });
  return rows;
};
/** 表格排序 */
function handleTableChange (pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
defineExpose({
  selectedRow
});
</script>

