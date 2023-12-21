<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="活动编号">
              <a-input
                v-model:value="queryForm.billNo"
                placeholder="请输入活动编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="培训单位ID">
              <AvicCommonSelect
                v-model:value="queryForm.oplDeptId"
                type="deptSelect"
                placeholder="请选择培训单位ID"
                :defaultShowValue="queryForm.oplDeptIdAlias"
                @callback="
                  result => {
                    queryForm.oplDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="培训单位名称">
              <a-input
                v-model:value="queryForm.oplDeptName"
                placeholder="请输入培训单位名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="主题">
              <a-input
                v-model:value="queryForm.subject"
                placeholder="请输入主题"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="小组名称">
              <a-input
                v-model:value="queryForm.groupName"
                placeholder="请输入小组名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="课题分类">
              <a-select
                v-model:value="queryForm.subjectCategory"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择课题分类"
              >
                <a-select-option
                  v-for="item in subjectCategoryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制人">
              <a-input
                v-model:value="queryForm.editUserId"
                placeholder="请输入编制人"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制人姓名">
              <a-input
                v-model:value="queryForm.editUserName"
                placeholder="请输入编制人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="培训目的">
              <a-input
                v-model:value="queryForm.trainingPurpose"
                placeholder="请输入培训目的"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="培训要点">
              <a-input
                v-model:value="queryForm.trainingFocus"
                placeholder="请输入培训要点"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="培训时间(起)">
              <a-date-picker
                v-model:value="queryForm.trainingDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择培训时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.trainingDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="培训时间(止)">
              <a-date-picker
                v-model:value="queryForm.trainingDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择培训时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.trainingDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="培训人员id">
              <a-input
                v-model:value="queryForm.trainingPersonId"
                placeholder="请输入培训人员id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="培训人员">
              <a-input
                v-model:value="queryForm.trainingPersonName"
                placeholder="请输入培训人员"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="讲师id">
              <AvicCommonSelect
                v-model:value="queryForm.lecturerUserId"
                type="userSelect"
                placeholder="请选择讲师id"
                :defaultShowValue="queryForm.lecturerUserIdAlias"
                @callback="
                  result => {
                    queryForm.lecturerUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="讲师姓名">
              <a-input
                v-model:value="queryForm.lecturerUserName"
                placeholder="请输入讲师姓名"
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
        ref="tpmOplTraining"
        table-key="tpmOplTraining"
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
              v-hasPermi="['tpmOplTraining:del']"
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
                v-hasPermi="['tpmOplTraining:import']"
                title="导入"
                type="primary"
                ghost
                @click="handleImport">
                <template #icon>
                   <import-outlined />
                </template>
                导入
              </a-button>
              <a-button
                v-hasPermi="['tpmOplTraining:export']"
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
              placeholder="请输入活动编号"
              :allow-clear="true"
              @search="handleKeyWordQuery"
            />
          </template>
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'id'">
              {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
            </template>
            <template v-else-if="column.dataIndex === 'billNo'">
              <a @click="handleDetail(record)">
                {{ record.billNo }}
              </a>
            </template>
            <template v-else-if="column.dataIndex === 'subjectCategoryName'">
                {{ record.subjectCategoryName && record.subjectCategoryName.replaceAll ? record.subjectCategoryName.replaceAll(';', ',') : record.subjectCategoryName }}
            </template>
            <template v-else-if="column.dataIndex === 'trainingPersonName'">
                {{ record.trainingPersonName && record.trainingPersonName.replaceAll ? record.trainingPersonName.replaceAll(';', ',') : record.trainingPersonName }}
            </template>
            <template v-else-if="column.dataIndex === 'action'">
              <a-button
                type="link"
                class="inner-btn"
                @click.stop="handleEdit(record)">
                编辑
              </a-button>
              <a-button
                v-hasPermi="['tpmOplTraining:del']"
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
      <tpm-opl-training-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <tpm-opl-training-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        :info-status="infoStatus"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <tpm-opl-training-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        :info-status="infoStatus"
        @close="showDetailModal = false"
      />
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="单表模板导入"
        importUrl="/mms/tpm/tpmopltrainings/importData/v1"
        downloadTemplateUrl="/mms/tpm/tpmopltrainings/downloadTemplate/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
    </div>
</template>
<script lang="ts" setup>
import type { TpmOplTrainingDto } from '@/api/avic/mms/tpm/TpmOplTrainingApi'; // 引入模块DTO
import { listTpmOplTrainingByPage, delTpmOplTraining, exportExcel } from '@/api/avic/mms/tpm/TpmOplTrainingApi'; // 引入模块API
import TpmOplTrainingAdd from './TpmOplTrainingAdd.vue'; // 引入添加页面组件
import TpmOplTrainingEdit from './TpmOplTrainingEdit.vue'; // 引入编辑页面组件
import TpmOplTrainingDetail from './TpmOplTrainingDetail.vue'; // 引入详情页面组件
import { useUserStore } from "@/store/user";
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
    title: '活动编号',
    dataIndex: 'billNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '培训单位名称',
    dataIndex: 'oplDeptIdAlias',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '主题',
    dataIndex: 'subject',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '小组名称',
    dataIndex: 'groupName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '课题分类',
    dataIndex: 'subjectCategoryName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '培训目的',
    dataIndex: 'trainingPurpose',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '培训要点',
    dataIndex: 'trainingFocus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '讲师姓名',
    dataIndex: 'lecturerUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '培训时间',
    dataIndex: 'trainingDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '制定者',
    dataIndex: 'editUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '培训人员',
    dataIndex: 'trainingPersonName',
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
const userStore = useUserStore();
const queryForm = ref<TpmOplTrainingDto>({
  oplDeptId: userStore.userInfo.deptId
});
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmOplTraining' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const infoStatus = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const subjectCategoryList = ref([]); // 课题分类通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'subjectCategory', lookUpType: 'TPM_OPL_SUBJECT_CATEGORY' }
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
  loading.value = true;
  listTpmOplTrainingByPage(queryParam)
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
    subjectCategoryList.value = result.subjectCategory;
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
    billNo: value
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
function handleEdit(record) {
  if (record.editUserId !== proxy.$getLoginUser().id) {
    proxy.$message.warning('只能编辑自己的数据！');
    return;
  }
  formId.value = record.id;
  infoStatus.value = 'edit';
  showEditModal.value = true;
}
/** 详细 */
function handleDetail(record) {
  formId.value = record.id;
  infoStatus.value = 'detail';
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
  if (ids.filter(row => row.editUserId !== proxy.$getLoginUser().id)?.length > 0) {
    proxy.$message.warning('只能删除自己的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmOplTraining(ids)
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
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
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

</script>

