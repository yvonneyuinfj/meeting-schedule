<template>
  <AvicSplit horizontal>
    <AvicPane size="60">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="用户">
                  <AvicCommonSelect
                    v-model:value="queryForm.demoUserId"
                    type="userSelect"
                    placeholder="请选择用户"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="部门">
                  <AvicCommonSelect
                    v-model:value="queryForm.demoDeptId"
                    type="deptSelect"
                    placeholder="请选择部门"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="角色">
                  <a-input
                    v-model:value="queryForm.demoRoleId"
                    placeholder="请输入角色"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="群组">
                  <a-input
                    v-model:value="queryForm.demoGroupId"
                    placeholder="请输入群组"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="岗位">
                  <a-input
                    v-model:value="queryForm.demoPositionId"
                    placeholder="请输入岗位"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="单选">
                  <a-input
                    v-model:value="queryForm.demoRadio"
                    placeholder="请输入单选"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="单选（按钮样式）">
                  <a-input
                    v-model:value="queryForm.demoRadioButton"
                    placeholder="请输入单选（按钮样式）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="复选">
                  <a-input
                    v-model:value="queryForm.demoCheckbox"
                    placeholder="请输入复选"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="下拉">
                  <a-input
                    v-model:value="queryForm.demoSelect"
                    placeholder="请输入下拉"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="下拉多选">
                  <a-input
                    v-model:value="queryForm.demoSelectMultiple"
                    placeholder="请输入下拉多选"
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
                    show-search
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="开关">
                  <a-input
                    v-model:value="queryForm.demoSwitch"
                    placeholder="请输入开关"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.demoDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择日期(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.demoDateEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.demoDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择日期(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.demoDateBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="日期时间">
                  <a-input
                    v-model:value="queryForm.demoDateTime"
                    placeholder="请输入日期时间"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="必填">
                  <a-input
                    v-model:value="queryForm.demoNotnull"
                    placeholder="请输入必填"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="多行文本">
                  <a-input
                    v-model:value="queryForm.demoTextarea"
                    placeholder="请输入多行文本"
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
        <!-- 表格 -->
        <div class="table-wrapper">
          <AvicTable
            ref="demoMainInsideFlow"
            table-key="demoMainInsideFlow"
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
                  v-hasPermi="['demoMainInsideFlow:add']"
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
                  v-hasPermi="['demoMainInsideFlow:edit']"
                  type="primary"
                  ghost
                  title="编辑"
                  @click="handleEdit"
                >
                  <template #icon>
                    <edit-outlined />
                  </template>
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['demoMainInsideFlow:del']"
                  danger
                  :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                  title="删除"
                  :loading="delLoading"
                  @click="handleDelete(selectedRows, selectedRowKeys)"
                >
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-space>
                <AvicBpmFilter
                  :allFileAuth="['demoMainInsideFlow:all']"
                  :myFileAuth="['demoMainInsideFlow:my']"
                  @change="changeBpmFilter"
                />
                <a-input-search
                  class="opt-btn-commonsearch"
                  style="width: 200px"
                  placeholder="请输入必填"
                  :allow-clear="true"
                  @search="handleKeyWordQuery"
                />
              </a-space>
            </template>
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'demoNotnull'">
                <a @click="handleFlowDetail(record)">
                  {{ record.demoNotnull }}
                </a>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <DemoMainInsideFlowAdd
        v-if="showAddModal"
        ref="addModal"
        :bpmOperatorRefresh="getList"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <DemoMainInsideFlowEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <DemoMainInsideFlowDetail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!--子表组件-->
      <DemoSubInsideFlowManage
        key="demoSubInsideFlowManage"
        ref="demoSubInsideFlowManage"
        :mainId="mainId"
      />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import type { DemoMainInsideFlowDto } from '@/api/avic/demo/DemoMainInsideFlowApi'; // 引入模块DTO
import { listMainFlowByPage, delDemoMainFlow } from '@/api/avic/demo/DemoMainInsideFlowApi'; // 引入模块API
import DemoMainInsideFlowAdd from './DemoMainInsideFlowAdd.vue';
import DemoMainInsideFlowEdit from './DemoMainInsideFlowEdit.vue';
import DemoMainInsideFlowDetail from './DemoMainInsideFlowDetail.vue';
import DemoSubInsideFlowManage from '@/views/avic/demo/demosubinsideflow/DemoSubInsideFlowManage.vue';
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';

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
    title: '必填',
    dataIndex: 'demoNotnull',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    sorter: true
  },
  {
    title: '用户',
    dataIndex: 'demoUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '部门',
    dataIndex: 'demoDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '角色',
    dataIndex: 'demoRoleIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '群组',
    dataIndex: 'demoGroupIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '岗位',
    dataIndex: 'demoPositionIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  /*{
    title: '单选',
    dataIndex: 'demoRadioName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单选（按钮样式）',
    dataIndex: 'demoRadioButtonName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '复选',
    dataIndex: 'demoCheckboxName',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '下拉',
    dataIndex: 'demoSelectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下拉多选',
    dataIndex: 'demoSelectMultipleName',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },*/
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  /*{
    title: '开关',
    dataIndex: 'demoSwitch',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '小数',
    dataIndex: 'demoNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right',
    customRender: text => {
      return proxy.$formatZero(text.value, 2);
    }
  },*/
  {
    title: '整数',
    dataIndex: 'demoInteger',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '日期',
    dataIndex: 'demoDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '日期时间',
    dataIndex: 'demoDateTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '编码',
    dataIndex: 'demoCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '电话(正则)',
    dataIndex: 'demoPhone',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '邮箱(正则)',
    dataIndex: 'demoEmail',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '网址(正则)',
    dataIndex: 'demoWebsite',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '唯一值',
    dataIndex: 'demoUnique',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '弹窗',
    dataIndex: 'demoModalSelect',
    ellipsis: true,
    minWidth: 120
  },
  {
    title: '多行文本',
    dataIndex: 'demoTextarea',
    ellipsis: true,
    minWidth: 120
  },
  {
    title: '流程状态',
    dataIndex: 'businessstate_',
    ellipsis: true,
    minWidth: 120,
    align: 'center',
    fixed: 'right'
  },
  {
    title: '流程当前步骤',
    dataIndex: 'activityalias_',
    minWidth: 120,
    fixed: 'right'
  },
  {
    title: '当前处理人',
    dataIndex: 'assigneenames_',
    ellipsis: true,
    minWidth: 120,
    fixed: 'right'
  }
];
const queryForm = ref<DemoMainInsideFlowDto>({
  bpmState: 'active',
  bpmType: 'my'
}); // 高级查询对象
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); //表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); //选中数据主键集合
const selectedRows = ref([]); //选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]);
const demoRadioList = ref([]);
const demoRadioButtonList = ref([]);
const demoSelectList = ref([]);
const demoSwitchList = ref([]);
const lookupParams = [
  { fieldName: 'demoRadio', lookUpType: 'PLATFORM_SEX' },
  { fieldName: 'demoRadioButton', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' },
  { fieldName: 'demoSwitch', lookUpType: 'PLATFORM_SKIN_STATE' }
];
const mainId = computed(() => {
  return selectedRowKeys.value.length > 0 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
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
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listMainFlowByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      // 设置表格初始选中项
      if (list.value.length > 0) {
        selectedRowKeys.value = [list.value[0]['id']];
        selectedRows.value = [list.value[0]];
      } else {
        selectedRowKeys.value = [];
        selectedRows.value = [];
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
    demoRadioList.value = result.demoRadio;
    demoRadioButtonList.value = result.demoRadioButton;
    demoSelectList.value = result.demoSelect;
    demoSwitchList.value = result.demoSwitch;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 根据流程状态及发起人查询数据 */
function changeBpmFilter({ bpmType, bpmState }) {
  queryForm.value.bpmType = bpmType;
  queryForm.value.bpmState = bpmState;
  queryParam.searchParams = queryForm.value;
  getList();
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
  queryForm.value = {
    bpmType: queryForm.value.bpmType,
    bpmState: queryForm.value.bpmState
  };
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    demoNotnull: value
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
function handleEdit() {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要编辑的数据！');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
}
// /** 详细 */
// function handleDetail(record) {
//   formId.value = record.id;
//   showDetailModal.value = true;
// }
/** 打开流程详情页面 */
function handleFlowDetail(record) {
  if (record.id) {
    flowUtils.detailByOptions({
      formId: record.id,
      bpmOperatorRefresh: getList
    });
  }
}
/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确定删除已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delDemoMainFlow(ids)
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
/** 表格排序 */
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
