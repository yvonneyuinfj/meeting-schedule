<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="标题">
              <a-input
                v-model:value="queryForm.taskTitle"
                placeholder="请输入标题"
                allow-clear
                @keyup.enter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="紧急程度">
              <a-select
                v-model:value="queryForm.priority"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                allow-clear
                placeholder="请选择紧急程度"
              >
                <a-select-option
                  v-for="item in priorityList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发送人">
              <a-input
                v-model:value="queryForm.taskSendUser"
                placeholder="请输入发送人"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发送部门">
              <a-input
                v-model:value="queryForm.taskSendDept"
                placeholder="请输入发送部门"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="流程状态">
              <a-select
                v-model:value="queryForm.businessState"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                allow-clear
                placeholder="请选择流程状态"
              >
                <a-select-option
                  v-for="item in businessStateList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="创建时间(起)">
              <a-date-picker
                v-model:value="queryForm.processStartTimeBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择创建时间(起)"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, queryForm.processStartTimeEnd)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="创建时间(止)">
              <a-date-picker
                v-model:value="queryForm.processStartTimeEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择创建时间(止)"
                :disabled-date="
                  startValue => proxy.$disabledEndDate(startValue, queryForm.processStartTimeBegin)
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
                <a-button @click="resetQuery" type="primary" ghost>
                  <redo-outlined />
                  清空
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
        ref="avicTable"
        :columns="columns"
        :row-key="record => record.dbid"
        :data-source="list"
        :loading="loading"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :customRow="
          record => {
            return {
              onClick: () => {
                handleRowSelection(record);
              },
              onDblclick: () => {
                handleRowSelection(record);
              }
            };
          }
        "
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft><div></div></template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入标题"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.key === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.key === 'taskTitle'">
            <a href="javascript:;" class="table-detail-link" @click.stop="handleFlowDetail(record)">
              {{ record.taskTitle || record.taskName }}
            </a>
          </template>
          <template v-else-if="column.key === 'priority'">
            <a-tag v-if="text == 1" color="red" text="特急">
              特急
              <template #icon>
                <avic-icon svg="avic-time-fill" />
              </template>
            </a-tag>
            <a-tag v-if="text == 2" color="orange" text="紧急">
              紧急
              <template #icon>
                <avic-icon svg="avic-time-fill" />
              </template>
            </a-tag>
            <a-tag v-if="text == 0" color="blue" text="一般">
              一般
              <template #icon>
                <avic-icon svg="avic-time-fill" />
              </template>
            </a-tag>
          </template>

          <template v-else-if="column.key === 'businessState'">
            <AvicDictTag :value="text" match-field="lookupCode" :options="businessStateList" />
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { listBpmTaskListByPage } from '@/api/avic/bpm/BpmTaskApi';
import type { TodoTaskQueryForm, treeParams } from '../types';
import bpmUtils from '../bpmutils/FlowUtils';
const { proxy } = getCurrentInstance();
const props = defineProps({
  params: {
    type: Object,
    default: null
  }
});

const layout = {
    labelCol: { flex: '0 0 100px' },
    wrapperCol: { flex: '1 1 0' }
  },
  colLayout = proxy.$colLayout3, // 页面表单响应式布局对象
  lookupParams = [
    { fieldName: 'priority', lookUpType: 'PLATFORM_BPM_TASK_PRIORITY' },
    { fieldName: 'businessState', lookUpType: 'PLATFORM_BPM_TASK_STATE' }
  ],
  columns = [
    {
      title: '序号',
      ellipsis: true,
      width: 56,
      align: 'center',
      key: 'id',
      fixed: 'left'
    },
    {
      title: '标题',
      dataIndex: 'taskTitle',
      key: 'taskTitle',
      ellipsis: true,
      minWidth: 320,
      resizable: true
    },
    {
      title: '紧急程度',
      dataIndex: 'priority',
      key: 'priority',
      align: 'center',
      sorter: true,
      resizable: true,
      with: 120,
      maxWidth: 120,
      minWidth: 120
    },
    {
      title: '创建时间',
      dataIndex: 'processStartTime',
      minWidth: 180,
      align: 'center',
      sorter: true,
      resizable: true,
      customRender: obj => {
        return obj.text ? proxy.$dateFormat(obj.text) : '';
      }
    },
    {
      title: '已办节点',
      dataIndex: 'curActName',
      align: 'left',
      ellipsis: true,
      resizable: true,
      minWidth: 160
    },
    {
      title: '状态',
      dataIndex: 'businessState',
      key: 'businessState',
      align: 'center',
      sorter: true,
      resizable: true,
      with: 120,
      maxWidth: 120,
      minWidth: 120
    },
    {
      title: '发送人',
      dataIndex: 'taskSendUser',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'center'
    },
    {
      title: '发送部门',
      dataIndex: 'taskSendDept',
      align: 'center',
      ellipsis: true,
      resizable: true,
      minWidth: 160
    }
  ];

const queryForm = ref<TodoTaskQueryForm>({
  taskTitle: undefined,
  priority: undefined,
  taskSendUser: undefined,
  taskSendDept: undefined,
  businessState: undefined,
  processStartTimeBegin: undefined,
  processStartTimeEnd: undefined,
  taskType: '1',
  taskFinished: '1'
});
const treeForms = ref<treeParams>({
  nodeId: '',
  nodeType: '',
  procDefId: ''
});

let advanced = ref(false), // 高级搜索 展开/关闭
  queryParam = reactive({
    // 请求表格数据参数
    pageParameter: {
      page: 1, // 页数
      rows: 20 // 每页条数
    },
    searchParams: {
      ...treeForms.value,
      ...queryForm.value
    },
    keyWord: ref(''), // 快速查询数据
    sidx: null, // 排序字段
    sord: null // 排序方式: desc降序 asc升序
  }),
  list = ref([]), //表格数据集合
  selectedRowKeys = ref([]), //选中数据主键集合
  selectedRowData = ref([]), //选中数据主键集合
  loading = ref<boolean>(false), // 表格loading状态
  totalPage = ref<number>(0),
  priorityList = ref([]), //紧急程度通用代码字段
  businessStateList = ref([]);

watch(
  props.params,
  (newVal: treeParams) => {
    treeForms.value = { ...newVal };
    queryParam.searchParams = {
      ...treeForms.value,
      ...queryForm.value
    };
    // 加载表格数据
    if (treeForms.value.nodeId != '') {
      getList();
    }
  },
  {
    immediate: true
  }
);

onMounted(() => {
  // 加载查询区所需通用代码
  getLookupList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRowData.value = [];
  loading.value = true;
  listBpmTaskListByPage(queryParam)
    .then((response: any) => {
      list.value = response.data.rows;
      totalPage.value = response.data.total;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
    });
}

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    priorityList.value = result.priority;
    businessStateList.value = result.businessState;
  });
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value: string) {
  let searchParamReset = {
    ...treeForms.value,
    ...queryForm.value,
    taskTitle: value
  };
  queryParam.searchParams = searchParamReset;
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = {
    ...treeForms.value,
    ...queryForm.value
  };
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = { taskType: '1', taskFinished: '1' } as TodoTaskQueryForm;
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys: string[], _selectedRowData) {
  selectedRowKeys.value = _selectedRowKeys;
  selectedRowData.value = _selectedRowData;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  if (!selectIds.includes(record.dbid)) {
    // 选中
    selectedRowKeys.value.push(record.dbid);
    selectedRowData.value.push(record);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.dbid);
    selectedRowData.value = selectedRowData.value.filter(item => item.dbid != record.dbid);
  }
}
/** 表格排序 */
function handleTableChange(pagination, filters, sorter) {
  console.log(filters);
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/**
 * 打开流程详情页面
 * @param {*} params
 */
function handleFlowDetail(params) {
  bpmUtils
    .executeTask(
      params.processInstance,
      params.executionId,
      params.dbid,
      params.businessId,
      params.formResourceName,
      params.processDefName || params.taskTitle,
      params.taskType,
      '',
      bpmOperatorRefresh
    )
    .then(() => {
      //打开成功
    })
    .catch(() => {
      //打开失败
    });
}

/**
 * 流程详情页面关闭后刷新页面
 */
function bpmOperatorRefresh() {
  if (treeForms.value.nodeId && treeForms.value.nodeType) {
    getList();
  }
}
</script>
<style lang="less">
@import './style/base.less';
</style>
