<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="必填">
              <a-input
                v-model:value="queryForm.demoNotnull"
                placeholder="请输入必填"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="编码">
              <a-input
                v-model:value="queryForm.demoCode"
                placeholder="请输入编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="唯一值">
              <a-input
                v-model:value="queryForm.demoUnique"
                placeholder="请输入唯一值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="用户">
              <AvicCommonSelect
                v-model:value="queryForm.demoUserId"
                type="userSelect"
                placeholder="请选择用户"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="部门">
              <AvicCommonSelect
                v-model:value="queryForm.demoDeptId"
                type="deptSelect"
                placeholder="请选择部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单选">
              <a-select
                v-model:value="queryForm.demoRadio"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择单选"
              >
                <a-select-option
                  v-for="item in demoRadioList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单选按钮">
              <a-select
                v-model:value="queryForm.demoRadioButton"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                :allow-clear="true"
                placeholder="请选择单选按钮"
              >
                <a-select-option
                  v-for="item in demoRadioButtonList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下拉">
              <a-select
                v-model:value="queryForm.demoSelect"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择下拉"
              >
                <a-select-option
                  v-for="item in demoSelectList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开关">
              <a-select
                v-model:value="queryForm.demoSwitch"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择开关"
              >
                <a-select-option value="Y">有效</a-select-option>
                <a-select-option value="N">无效</a-select-option>
              </a-select>
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
      <AvicTable
        ref="demoRightList"
        table-key="demoRightList"
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
              v-hasPermi="['demoRightList:add']"
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
              v-hasPermi="['demoRightList:del']"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
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
            placeholder="请输入必填或编码或唯一值"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'demoNotnull'">
            <a @click="handleDetail(record)">
              {{ record.demoNotnull }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'demoSwitch'">
            <a-popconfirm
              ok-text="确定"
              cancel-text="取消"
              @confirm="changeDemoSwitchStatus(record, index)"
            >
              <template #title>
                确认将该数据改为
                <b>{{ record.demoSwitch === 'Y' ? '无效' : '有效' }}</b>
                吗?
              </template>
              <a-switch
                :checked="list[index].demoSwitch == 'Y'"
                checked-children="有效"
                un-checked-children="无效"
              />
            </a-popconfirm>
          </template>
          <template v-else-if="column.dataIndex === 'demoSelectName'">
            <AvicDictTag :value="text" :options="demoSelectList" />
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              v-hasPermi="['demoRightList:edit']"
              type="link"
              class="inner-btn"
              @click="handleEdit(record.id)"
            >
              编辑
            </a-button>
            <a-button
              v-hasPermi="['demoRightList:del']"
              type="link"
              class="inner-btn"
              @click="handleDelete([record.id], 'row')"
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <DemoRightListAdd
      v-if="showAddModal"
      ref="addModal"
      :mainId="mainId"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <DemoRightListEdit
      v-if="showEditModal"
      ref="editModal"
      :mainId="mainId"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <DemoRightListDetail
      v-if="showDetailModal"
      ref="detailModal"
      :mainId="mainId"
      :form-id="formId"
      @close="showDetailModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { DemoRightListDto } from '@/api/avic/demo/DemoRightListApi'; // 引入模块DTO
import {
  delDemoRightList,
  listDemoRightListByPage,
  updateDemoSwitch
} from '@/api/avic/demo/DemoRightListApi'; // 引入模块API
import DemoRightListAdd from './DemoRightListAdd.vue'; // 引入添加页面组件
import DemoRightListEdit from './DemoRightListEdit.vue'; // 引入编辑页面组件
import DemoRightListDetail from './DemoRightListDetail.vue'; // 引入详情页面组件

const { proxy } = getCurrentInstance();
const props = defineProps({
  mainId: {
    type: String,
    required: true,
    default: ''
  }
});
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout3; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center',
    key: 'id',
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
    title: '编码',
    dataIndex: 'demoCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '唯一值',
    dataIndex: 'demoUnique',
    ellipsis: true,
    minWidth: 120,
    resizable: true
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
  {
    title: '单选',
    dataIndex: 'demoRadioName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单选按钮',
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
  },
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
    title: '多行文本',
    dataIndex: 'demoTextarea',
    ellipsis: true,
    minWidth: 120,
    resizable: true
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
const queryForm = ref<DemoRightListDto>({});
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
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const demoRadioList = ref([]); // 单选通用代码
const demoRadioButtonList = ref([]); // 单选按钮组通用代码
const demoSelectList = ref([]); // 下拉通用代码
const lookupParams = [
  { fieldName: 'demoRadio', lookUpType: 'PLATFORM_SEX' },
  { fieldName: 'demoRadioButton', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' }
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  queryForm.value.demoTreeId = props.mainId;
  queryParam.searchParams = queryForm.value;
  listDemoRightListByPage(queryParam)
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
/** 获取通用代码 */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    demoRadioList.value = result.demoRadio;
    demoRadioButtonList.value = result.demoRadioButton;
    demoSelectList.value = result.demoSelect;
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
    demoNotnull: value,
    demoCode: value,
    demoUnique: value
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
/** 详细 */
function handleDetail(record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delDemoRightList(ids)
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
/** 改变开关状态 */
function changeDemoSwitchStatus(record, index) {
  const tip = record.demoSwitch === 'Y' ? '无效' : '有效';
  const updateValue = record.demoSwitch === 'Y' ? 'N' : 'Y';
  updateDemoSwitch(record.id, updateValue).then(res => {
    if (res.success) {
      list.value[index].demoSwitch = updateValue;
      proxy.$message.success(`${tip}成功！`);
    }
  });
}
/** 勾选复选框时触发 */
function onSelectChange(rowKeys) {
  selectedRowKeys.value = rowKeys;
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

watch(
  () => props.mainId,
  newVal => {
    if (newVal) {
      getList(); // 加载表格数据
    }
  },
  { immediate: true }
);
</script>
