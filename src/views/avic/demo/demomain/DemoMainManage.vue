<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box" style="max-height: 160px; overflow: auto">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="项目编号">
                  <a-input
                    v-model:value="queryForm.projectClassCode"
                    placeholder="请输入项目编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="项目名称">
                  <a-input
                    v-model:value="queryForm.projectClassName"
                    placeholder="请输入项目名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="项目负责人">
                  <AvicCommonSelect
                    v-model:value="queryForm.projectClassManager"
                    type="userSelect"
                    placeholder="请选择项目负责人"
                    :defaultShowValue="queryForm.projectClassManagerAlias"
                    @callback="
                      result => {
                        queryForm.projectClassManagerAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="项目状态">
                  <a-radio-group v-model:value="queryForm.projectClassStatus">
                    <a-radio
                      v-for="item in projectClassStatusList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="项目密级">
                  <a-select
                    v-model:value="queryForm.secretLevel"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    show-search
                    :allow-clear="true"
                    placeholder="请选择项目密级"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="项目分类维护开始日期">
                  <a-date-picker
                    v-model:value="queryForm.projectClassDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择开始日期"
                    :disabled-date="
                      startValue =>
                        proxy.$disabledStartDate(startValue, queryForm.projectClassDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="项目分类维护结束时间">
                  <a-date-picker
                    v-model:value="queryForm.projectClassDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择结束日期"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.projectClassDateBegin)
                    "
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
                    <a-button type="primary" @click="resetQuery" ghost>
                      <redo-outlined />
                      重置
                    </a-button>
                    <a-button
                      type="link"
                      @click="toggleAdvanced"
                      style="margin: 0; padding-left: 0"
                    >
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
            ref="demoMain"
            table-key="demoMain"
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
            rowClickSelectionType="radio"
            :pageParameter="queryParam.pageParameter"
            :total="totalPage"
            @change="handleTableChange"
            @refresh="getList"
          >
            <template #toolBarLeft>
              <a-space>
                <a-button
                  v-hasPermi="['demoMain:add']"
                  type="primary"
                  title="添加"
                  @click="handleAdd"
                >
                  <template #icon>
                    <plus-outlined />
                  </template>
                  添加
                </a-button>
                <a-button
                  v-hasPermi="['demoMain:del']"
                  danger
                  :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                  title="删除"
                  :loading="delLoading"
                  @click="handleDelete(selectedRowKeys)"
                >
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-input-search
                class="opt-btn-commonsearch"
                style="width: 200px"
                placeholder="请输入项目分类编号或项目分类名称"
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
              <template v-else-if="column.dataIndex === 'projectClassCode'">
                <a @click="handleDetail(record)">
                  {{ record.projectClassCode }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'projectClassDate'">
                {{ proxy.$dayjs(text).format('YYYY-MM-DD') }}
              </template>
              <template v-else-if="column.dataIndex === 'action'">
                <a-button
                  v-hasPermi="['demoMain:edit']"
                  type="link"
                  class="inner-btn"
                  @click="handleEdit(record.id)"
                >
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['demoMain:del']"
                  type="link"
                  class="inner-btn"
                  @click="handleDelete([record.id])"
                >
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <DemoMainAdd
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <DemoMainEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <DemoMainDetail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <DemoSubManage key="demoSubManage" ref="demoSubManage" :mainId="mainId" />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import type { DemoMainDto } from '@/api/avic/demo/DemoMainApi'; // 引入模块DTO
import { delDemoMain, listDemoMainByPage } from '@/api/avic/demo/DemoMainApi'; // 引入模块API
import DemoMainAdd from './DemoMainAdd.vue'; // 引入添加页面组件
import DemoMainEdit from './DemoMainEdit.vue'; // 引入编辑页面组件
import DemoMainDetail from './DemoMainDetail.vue'; // 引入详情页面组件
import DemoSubManage from '../demosub/DemoSubManage.vue'; // 引入子表组件

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
    title: '项目分类编号',
    dataIndex: 'projectClassCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目分类名称',
    dataIndex: 'projectClassName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left',
    sorter: true
  },
  {
    title: '项目分类级别',
    dataIndex: 'projectClassLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center',
    sorter: true
  },
  {
    title: '项目分类管理员',
    dataIndex: 'projectClassManagerAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目分类状态',
    dataIndex: 'projectClassStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目分类维护时间',
    dataIndex: 'projectClassDate',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'center',
    sorter: true
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
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<DemoMainDto>({}); // 高级查询对象
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
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const projectClassLevelList = ref([]); // 项目分类通用代码
const projectClassStatusList = ref([]); // 项目状态通用代码
const lookupParams = [
  { fieldName: 'projectClassLevel', lookUpType: 'MPM_PROJECT_CLASS_LEVEL' },
  { fieldName: 'projectClassStatus', lookUpType: 'MPM_PROJECT_STATUS' }
];
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
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
function getList() {
  selectedRowKeys.value = []; //清空选中
  selectedRows.value = [];
  loading.value = true;
  listDemoMainByPage(queryParam)
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
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    projectClassLevelList.value = result.projectClassLevel;
    projectClassStatusList.value = result.projectClassStatus;
  });
}
/** 获取当前用户对应的文档密级  */
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
    projectClassCode: value,
    projectClassName: value
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
/** 删除 */
function handleDelete(ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: '确定删除已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delDemoMain(ids)
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
