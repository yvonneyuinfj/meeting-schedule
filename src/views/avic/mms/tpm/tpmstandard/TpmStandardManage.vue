<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="设备编号">
                  <a-input
                    v-model:value="queryForm.equipmentCode"
                    placeholder="请输入设备编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="设备名称">
                  <a-input
                    v-model:value="queryForm.equipmentName"
                    placeholder="请输入设备名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="设备代号">
                  <a-input
                    v-model:value="queryForm.equipmentMark"
                    placeholder="请输入设备代号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" style="margin-left: auto">
                <div class="table-page-search-submitButtons">
                  <a-space>
                    <a-button type="primary" @click="handleQuery">
                      <search-outlined />
                      查询
                    </a-button>
                    <a-button type="primary" @click="resetQuery" ghost style="margin-right: 15px">
                      <redo-outlined />
                      重置
                    </a-button>
                    <!-- <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                      {{ advanced ? '收起' : '展开' }}
                      <up-outlined v-if="advanced" />
                      <down-outlined v-else />
                    </a-button> -->
                  </a-space>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable
            ref="tpmStandard"
            table-key="tpmStandard"
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
                <!--                <a-button-->
                <!--                  v-hasPermi="['tpmStandard:add']"-->
                <!--                  title="添加"-->
                <!--                  type="primary"-->
                <!--                  @click="handleAdd"-->
                <!--                >-->
                <!--                  <template #icon>-->
                <!--                    <plus-outlined/>-->
                <!--                  </template>-->
                <!--                  添加-->
                <!--                </a-button>-->
                <a-button
                  v-hasPermi="['tpmStandard:add']"
                  title="批量添加"
                  type="primary"
                  @click="handleOpenAdd"
                >
                  <template #icon>
                    <plus-outlined />
                  </template>
                  批量添加
                </a-button>
                <a-button
                  v-hasPermi="['tpmStandard:del']"
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
                <!--                <a-button type="primary" @click="handleCopy(selectedRows, selectedRowKeys)">-->
                <!--                  复制-->
                <!--                </a-button>-->
                <a-button
                  v-hasPermi="['tpmStandard:import']"
                  title="导入"
                  type="primary"
                  ghost
                  @click="handleImport"
                >
                  <template #icon>
                    <import-outlined />
                  </template>
                  导入
                </a-button>
                <a-button
                    v-hasPermi="['tpmStandard:add']"
                    title="复制"
                    type="primary"
                    @click="handleCopy"
                >
                  <template #icon>
                    <plus-outlined/>
                  </template>
                  复制
                </a-button>
                <!--                <a-button-->
                <!--                    v-hasPermi="['tpmStandard:export']"-->
                <!--                    title="导出"-->
                <!--                    type="primary"-->
                <!--                    ghost-->
                <!--                    @click="handleExport">-->
                <!--                  <template #icon>-->
                <!--                    <export-outlined/>-->
                <!--                  </template>-->
                <!--                  导出-->
                <!--                </a-button>-->
              </a-space>
            </template>
            <template #toolBarRight>
              <a-input-search
                class="opt-btn-commonsearch"
                style="width: 200px"
                placeholder="请输入设备编号"
                :allow-clear="true"
                @search="handleKeyWordQuery"
              />
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'tpmInventoryId'">
                <a @click="handleDetail(record)">
                  {{ record.tpmInventoryId }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'leaveFactoryDate'">
                {{
                  record.leaveFactoryDate != null
                    ? dayjs(record.leaveFactoryDate).format('YYYY-MM-DD')
                    : ''
                }}
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <tpm-standard-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!--批量添加弹窗-->
      <a-modal
        :visible="open"
        title="批量添加"
        @ok="handleOk"
        @cancel="handleCancel"
        width="80%"
        style="top: 20px"
      >
        <div style="height: 400px; overflow: auto">
          <Tpm-inventory-standard-select
            ref="tpmInventoryStandardSelect"
          ></Tpm-inventory-standard-select>
        </div>
      </a-modal>
      <!-- 编辑页面弹窗 -->
      <tpm-standard-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <tpm-standard-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="模板导入"
        importUrl="/mms/tpm/tpmstandards/importData/v1"
        downloadTemplateUrl="/mms/tpm/tpmstandards/downloadTemplate/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
      <a-modal
          :visible="copyMoadl"
          title="复制"
          @ok="handleCopyModal"
          @cancel="handleCopyClose"
          width="80%"
          style="top: 20px"
      >
        <div style="height: 400px;overflow: auto">
          <Tpm-inventory-copy-l-select
              ref="tpmInventoryCopyLSelect" :form-id="mainId">
          </Tpm-inventory-copy-l-select>
        </div>
      </a-modal>
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <tpm-standard-maintenance-manage
        key="tpmStandardMaintenanceManage"
        ref="tpmStandardMaintenanceManage"
        :mainId="mainId"
      />
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { TpmStandardDto } from '@/api/avic/mms/tpm/TpmStandardApi'; // 引入模块DTO
import {
  delTpmStandard,
  exportExcel,
  listTpmStandardByPage,
  saveTpmStandardByTpmInventoryIds,
  saveTpmStandardCopyLByTpmInventoryIds
} from '@/api/avic/mms/tpm/TpmStandardApi'; // 引入模块API
import { saveTpmInventoryList } from '@/api/avic/mms/tpm/TpmInventoryApi';
import TpmStandardAdd from './TpmStandardAdd.vue'; // 引入添加页面组件
import TpmStandardEdit from './TpmStandardEdit.vue'; // 引入编辑页面组件
import TpmStandardDetail from './TpmStandardDetail.vue'; // 引入详情页面组件
import TpmStandardMaintenanceManage from '../tpmstandardmaintenance/TpmStandardMaintenanceManage.vue';
import TpmInventoryStandardSelect from './TpmInventoryStandardSelect.vue';
import TpmInventoryCopyLSelect from './TpmInventoryCopyLSelect.vue';
import dayjs from 'dayjs';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '90px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备代号',
    dataIndex: 'equipmentMark',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备大类',
    dataIndex: 'className',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '出厂日期',
    dataIndex: 'leaveFactoryDate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '使用单位',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '地理区域',
    dataIndex: 'areaName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '具体位置',
    dataIndex: 'storageLocation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    width: 80,
    resizable: true,
    align: 'center'
  }
];
const queryForm = ref<TpmStandardDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm.value
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const copyMoadl = ref<boolean>(false);
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmStandard' }); // 必填参数tableName全局唯一，与tableKey保持一致
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const open = ref<boolean>(false);
const tpmInventoryStandardSelect = ref(null);
const tpmInventoryCopyLSelect = ref(null);

// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
});

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  if (proxy.$getLoginUser().entityDeptCode !== 'C410') {
    queryParam.searchParams.useDeptId = proxy.$getLoginUser().entityDeptId;
  }
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmStandardByPage(queryParam)
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

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    equipmentCode: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}

/** 批量添加 */
function handleOpenAdd() {
  open.value = true;
  tpmInventoryStandardSelect.value.getList();
}

/** 复制 */
function handleCopy() {
  copyMoadl.value = true;
  tpmInventoryCopyLSelect.value.getList();
}

function handleCopyClose() {
  copyMoadl.value = false;
}
/** 提交复制 */
function handleCopyModal() {
  const selectedKeys = tpmInventoryCopyLSelect.value.selectedRowIdKeys;
  if (selectedKeys.length == 0) {
    proxy.$message.warning('请选择要操作的数据！');
    return;
  }
  saveTpmStandardCopyLByTpmInventoryIds(mainId.value, selectedKeys).then(res => {
    if (res.success) {
      proxy.$message.success('添加成功！');
      // 清空选中
      selectedRowKeys.value = [];
      selectedRows.value = [];
      getList();
    }
    copyMoadl.value = false;
  }).catch((error) => {
    proxy.$message.warning(error.message);
    copyMoadl.value = false;
  });
}

const handleCancel = () => {
  open.value = false;
};

/** 批量新增确认  */
const handleOk = () => {
  const selectedKeys = tpmInventoryStandardSelect.value.selectedRowKeys;
  if (selectedKeys.length == 0) {
    proxy.$message.warning('请选择要操作的数据！');
    return;
  }
  saveTpmInventoryList(tpmInventoryStandardSelect.value.selectedRows)
    .then(res => {
      if (res.success) {
        open.value = false;
        saveTpmStandardByTpmInventoryIds(selectedKeys)
          .then(res => {
            if (res.success) {
              proxy.$message.success('添加成功！');
              // 清空选中
              selectedRowKeys.value = [];
              selectedRows.value = [];
              getList();
            }
          })
          .catch(() => {});
      }
    })
    .catch(error => {
      proxy.$message.warning(error.message);
    });
};

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
      delTpmStandard(ids)
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
