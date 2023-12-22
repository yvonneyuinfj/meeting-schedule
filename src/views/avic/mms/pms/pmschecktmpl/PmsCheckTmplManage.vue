<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
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
                <a-form-item label="方案编号">
                  <a-input
                    v-model:value="queryForm.checkTmplCode"
                    placeholder="请输入方案编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="方案名称">
                  <a-input
                    v-model:value="queryForm.checkTmplName"
                    placeholder="请输入方案名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="方案说明">
                  <a-input
                    v-model:value="queryForm.checkTmplDesc"
                    placeholder="请输入方案说明"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="状态">
                  <a-select
                    v-model:value="queryForm.tmplStatus"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择状态"
                  >
                    <a-select-option
                      v-for="item in tmplStatusList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="启用时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.enableDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择启用时间(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.enableDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="启用时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.enableDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择启用时间(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.enableDateBegin)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="停用时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.disableDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择停用时间(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.disableDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="停用时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.disableDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择停用时间(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.disableDateBegin)"
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
            ref="pmsCheckTmpl"
            table-key="pmsCheckTmpl"
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
            rowClickSelectionType="radio"
            @change="handleTableChange"
            @refresh="getList"
          >
            <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['pmsCheckTmpl:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['pmsCheckTmpl:del']"
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
            </a-button>
            <a-button
              v-hasPermi="['pmsCheckItem:edit']"
              title="启用"
              type="primary"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleStart(selectedRowKeys, '')"
            >
              启用
            </a-button>
            <a-button
              v-hasPermi="['pmsCheckItem:edit']"
              title="停用"
              type="primary"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleStop(selectedRowKeys, '')"
            >
              停用
            </a-button>
<!--            <a-button-->
<!--              v-hasPermi="['pmsCheckTmpl:import']"-->
<!--              title="导入"-->
<!--              type="primary"-->
<!--              ghost-->
<!--              @click="handleImport">-->
<!--              <template #icon>-->
<!--                 <import-outlined />-->
<!--              </template>-->
<!--              导入-->
<!--            </a-button>-->
<!--            <a-button-->
<!--              v-hasPermi="['pmsCheckTmpl:export']"-->
<!--              title="导出"-->
<!--              type="primary"-->
<!--              ghost-->
<!--              @click="handleExport">-->
<!--              <template #icon>-->
<!--                 <export-outlined />-->
<!--              </template>-->
<!--              导出-->
<!--            </a-button>-->
          </a-space>
            </template>
            <template #toolBarRight>
              <a-input-search
                class="opt-btn-commonsearch"
                style="width: 200px"
                placeholder="请输入方案编号或方案名称"
                :allow-clear="true"
                @search="handleKeyWordQuery"
              />
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex  === 'id'">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'secretLevelName'">
                <a @click="handleDetail(record)">
                  {{ record.secretLevelName }}
                </a>
              </template>
              <template v-else-if="column.dataIndex  === 'action'">
                <a-button
                  type="link"
                  class="inner-btn"
                  @click.stop="handleEdit(record.id)"
                >
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['pmsCheckTmpl:del']"
                  type="link"
                  class="inner-btn"
                  @click.stop="handleDelete([record.id], 'row')"
                >
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <pms-check-tmpl-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <pms-check-tmpl-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <pms-check-tmpl-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="模板导入"
        importUrl="/mms/pms/pmschecktmpls/importData/v1"
        downloadTemplateUrl="/mms/pms/pmschecktmpls/downloadTemplate/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <pms-check-tmpl-l-manage key="pmsCheckTmplLManage" ref="pmsCheckTmplLManage" :mainId="mainId" />
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { PmsCheckTmplDto } from '@/api/avic/mms/pms/PmsCheckTmplApi'; // 引入模块DTO
import {
  listPmsCheckTmplByPage,
  delPmsCheckTmpl,
  exportExcel,
  startPmsCheckTmpl, stopPmsCheckTmpl
} from '@/api/avic/mms/pms/PmsCheckTmplApi'; // 引入模块API
import PmsCheckTmplAdd from './PmsCheckTmplAdd.vue'; // 引入添加页面组件
import PmsCheckTmplEdit from './PmsCheckTmplEdit.vue'; // 引入编辑页面组件
import PmsCheckTmplDetail from './PmsCheckTmplDetail.vue'; // 引入详情页面组件
import PmsCheckTmplLManage from '../pmschecktmpll/PmsCheckTmplLManage.vue'; // 引入子表页面组件
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
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '方案编号',
    dataIndex: 'checkTmplCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '方案名称',
    dataIndex: 'checkTmplName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '方案说明',
    dataIndex: 'checkTmplDesc',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '状态',
    dataIndex: 'tmplStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '启用时间',
    dataIndex: 'enableDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '停用时间',
    dataIndex: 'disableDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'notes',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
 ];
const queryForm = ref<PmsCheckTmplDto>({});
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
const excelParams = ref({ tableName: 'pmsCheckTmpl' }); // 必填参数tableName全局唯一，与tableKey保持一致
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const checkItemTypeList = ref([]); // 检验项目类型通用代码
const tmplStatusList = ref([]); // 状态通用代码
const lookupParams = [
  { fieldName: 'checkItemType', lookUpType: 'PMS_CHECK_ITEM_TYPE ' },
  { fieldName: 'tmplStatus', lookUpType: 'POM_TMPL_STATUS' }
];

// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
});

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
  listPmsCheckTmplByPage(queryParam)
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
/** 获取通用代码  */
function getLookupList () {
  proxy.$getLookupByType(lookupParams, result => {
    checkItemTypeList.value = result.checkItemType;
    tmplStatusList.value = result.tmplStatus;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList () {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级搜索按钮操作 */
function handleQuery () {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询重置按钮操作  */
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
    checkTmplCode: value,
    checkTmplName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd () {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit (id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详情 */
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
    title: `确认要删除${type == 'row' ? '当前行的' : '已选数据及关联的子表'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delPmsCheckTmpl(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
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

/** 启用 */
function handleStart(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要启用的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要启用${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      startPmsCheckTmpl(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('操作成功！');
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

/** 停用 */
function handleStop(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要停用的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要停用${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      stopPmsCheckTmpl(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('操作成功！');
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

</script>

