<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="表格编号">
                  <a-input v-model:value="queryForm.gridCode" placeholder="请输入表格编号" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="表格名称">
                  <a-input v-model:value="queryForm.gridName" placeholder="请输入表格名称" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="表格描述">
                  <a-input v-model:value="queryForm.gridDesc" placeholder="请输入表格描述" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="所属模板ID">
                  <a-input v-model:value="queryForm.mdsGpioTempletId" placeholder="请输入所属模板ID" :allow-clear="true"
                    @pressEnter="handleQuery" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="密级">
                  <a-select v-model:value="queryForm.secretLevel"
                    :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                    :show-search="true" :allow-clear="true" placeholder="请选择密级">
                    <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" style="margin-left: auto">
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
          <AvicTable ref="mdsGpioTempletGrid" table-key="mdsGpioTempletGrid" :columns="columns"
            :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 40,
              fixed: true
            }" :pageParameter="queryParam.pageParameter" :total="totalPage" rowClickSelectionType="radio"
            @change="handleTableChange" @refresh="getList">
            <template #toolBarLeft>
              <a-space>
                <a-button title="添加" type="primary" @click="handleAdd">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  添加
                </a-button>
                <a-button title="删除" danger :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                  :loading="delLoading" @click="handleDelete(selectedRowKeys, '')">
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
                <a-button title="导入" type="primary" ghost @click="handleImport">
                  <template #icon>
                    <import-outlined />
                  </template>
                  导入
                </a-button>
                <a-button title="导出" type="primary" ghost @click="handleExport">
                  <template #icon>
                    <export-outlined />
                  </template>
                  导出
                </a-button>
              </a-space>
            </template>
            <!-- <template #toolBarRight>
              <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入表格编号或表格名称"
                :allow-clear="true" @search="handleKeyWordQuery" />
            </template> -->
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'gridCode'">
                <a @click="handleDetail(record)">
                  {{ record.gridCode }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'action'">
                <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
                  编辑
                </a-button>
                <a-button type="link" class="inner-btn" @click.stop="handleDelete([record.id], 'row')">
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <mds-gpio-templet-grid-add v-if="showAddModal" ref="addModal" @reloadData="getList" @close="showAddModal = false"
        :form-id="formId" :parentId="parentId" />
      <!-- 编辑页面弹窗 -->
      <mds-gpio-templet-grid-edit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
        @close="showEditModal = false" :parentId="parentId" />
      <!-- 详情页面弹窗 -->
      <mds-gpio-templet-grid-detail v-if="showDetailModal" ref="detailModal" :form-id="formId"
        @close="showDetailModal = false" />
      <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="模板导入"
        importUrl="/mms/mds/mdsgpiotempletgrids/importData/v1"
        downloadTemplateUrl="/mms/mds/mdsgpiotempletgrids/downloadTemplate/v1" @reloadData="getList"
        @close="showImportModal = false" />
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <mds-gpio-templet-grid-d-manage key="mdsGpioTempletGridDManage" ref="mdsGpioTempletGridDManage" :mainId="mainId" />
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { MdsGpioTempletGridDto } from '@/api/avic/mms/mds/MdsGpioTempletGridApi'; // 引入模块DTO
import { listMdsGpioTempletGridByPage, delMdsGpioTempletGrid, exportExcel } from '@/api/avic/mms/mds/MdsGpioTempletGridApi'; // 引入模块API
import MdsGpioTempletGridAdd from './MdsGpioTempletGridAdd.vue'; // 引入添加页面组件
import MdsGpioTempletGridEdit from './MdsGpioTempletGridEdit.vue'; // 引入编辑页面组件
import MdsGpioTempletGridDetail from './MdsGpioTempletGridDetail.vue'; // 引入详情页面组件
import MdsGpioTempletGridDManage from '../mdsgpiotempletgridd/MdsGpioTempletGridDManage.vue'; // 引入子表页面组件
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
};
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  parentId: {
    type: String,
    default: ''
  }
});
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
    title: '表格编号',
    dataIndex: 'gridCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '表格名称',
    dataIndex: 'gridName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '表格描述',
    dataIndex: 'gridDesc',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '排序号',
    dataIndex: 'innerOrder',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '所属模板ID',
    dataIndex: 'mdsGpioTempletId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '首行号（表格中首行数据所在行号）',
    dataIndex: 'firstRowNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
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
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<MdsGpioTempletGridDto>({});
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
const excelParams = ref({ tableName: 'mdsGpioTempletGrid' }); // 必填参数tableName全局唯一，与tableKey保持一致
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码

// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
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
  queryForm.value.mdsGpioTempletId = props.parentId;
  queryParam.searchParams = queryForm.value;
  listMdsGpioTempletGridByPage(queryParam)
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
  queryForm.value.mdsGpioTempletId = props.parentId;
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询重置按钮操作  */
function resetQuery() {
  queryForm.value = {};
  queryForm.value.mdsGpioTempletId = props.parentId;
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    gridCode: value,
    gridName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详情 */
function handleDetail(record) {
  formId.value = record.id;
  showDetailModal.value = true;
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
function handleDelete(ids, type) {
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
      delMdsGpioTempletGrid(ids)
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

