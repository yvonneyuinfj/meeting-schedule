<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
          ref="pmsProcurementRequirementsL"
          :columns="columns"
          :data-source="list"
          :loading="loading"
          :pageParameter="queryParam.pageParameter"
          :row-key="record => record.id"
          :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 40,
              fixed: true
            }"
          :total="totalPage"
          rowClickSelectionType="radio"
          table-key="pmsProcurementRequirementsL"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
                v-hasPermi="['pmsProcurementRequirementsL:add']"
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
                v-hasPermi="['pmsProcurementRequirements:edit']"
                :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                title="编辑"
                @click="handleEdit"
            >
              <template #icon>
                <edit-outlined/>
              </template>
              编辑
            </a-button>
            <a-button
                :loading="delLoading"
                :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                danger
                title="删除"
                @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
            <!--            <a-button-->
            <!--              title="导入"-->
            <!--              type="primary"-->
            <!--              ghost-->
            <!--              @click="handleImport">-->
            <!--              <template #icon>-->
            <!--                <import-outlined />-->
            <!--              </template>-->
            <!--              导入-->
            <!--            </a-button>-->
            <!--            <a-button-->
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
              :allow-clear="true"
              class="opt-btn-commonsearch"
              placeholder="请输入维度或权重"
              style="width: 200px"
              @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button
                class="inner-btn"
                type="link"
                @click="handleDelete([record.id], 'row')"
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <pms-procurement-requirements-l-add
        v-if="showAddModal"
        ref="addModal"
        :mainId="mainId"
        @close="showAddModal = false"
        @reloadData="getList"
    />
    <!-- 编辑页面弹窗 -->
    <pms-procurement-requirements-l-single-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        :mainId="mainId"
        @close="showEditModal = false"
        @reloadData="getList"
    />
    <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        downloadTemplateUrl="/mms/pms/pmsprocurementrequirementsls/downloadTemplate/v1"
        importUrl="/mms/pms/pmsprocurementrequirementsls/importData/v1"
        title="单表模板导入"
        @close="showImportModal = false"
        @reloadData="getList"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  delPmsProcurementRequirementsL,
  exportExcel,
  listPmsProcurementRequirementsLByPage
} from '@/api/avic/mms/pms/PmsProcurementRequirementsLApi'; // 引入模块API
import PmsProcurementRequirementsLAdd from './PmsProcurementRequirementsLAdd.vue'; // 引入添加页面组件
import PmsProcurementRequirementsLSingleEdit from './PmsProcurementRequirementsLSingleEdit.vue'; // 引入编辑页面组件

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  record: {
    type: Object,
    default: {}
  }
});
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
    title: '维度',
    dataIndex: 'dimensionality',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '权重',
    dataIndex: 'weight',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '得分标准',
    dataIndex: 'scoringCriteria',
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
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    pmsProcurementRequirementsId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'pmsProcurementRequirementsL', pmsProcurementRequirementsId: '' });
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
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
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.pmsProcurementRequirementsId = props.mainId ? props.mainId : '-1';
  listPmsProcurementRequirementsLByPage(queryParam)
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

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    dimensionality: value,
    weight: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 子表删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (props.record.bpmState !== null) {
    proxy.$message.warning('只有未提交的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delPmsProcurementRequirementsL(ids)
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
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}

/** 添加 */
function handleAdd() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  if (props.record.bpmState !== null) {
    proxy.$message.warning('只有未提交的数据才可以添加！');
    return;
  }
  showAddModal.value = true;
}

/** 编辑 */
function handleEdit() {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要编辑的数据！');
    return;
  }
  if (props.record.bpmState !== null) {
    proxy.$message.warning('只有未提交的数据才可以编辑！');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
}

watch(
    () => props.mainId,
    newVal => {
      if (newVal) {
        getList(); // 查询表格数据
      } else {
        selectedRowKeys.value = []; // 清空选中
        selectedRows.value = [];
        list.value = [];
        totalPage.value = 0;
      }
    },
    { immediate: true }
);
defineExpose({
  list
});
</script>

