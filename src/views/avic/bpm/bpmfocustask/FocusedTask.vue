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
                  endValue => proxy.$disabledEndDate(endValue, queryForm.processStartTimeBegin)
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
        ref="FocusedTask"
        table-key="FocusedTask"
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
        <template #toolBarLeft>
          <a-space>
            <a-button
              type="primary"
              :loading="delLoading"
              @click="handleBatchCancel(selectedRowKeys)"
              style="margin: 0"
            >
              <edit-outlined />
              批量取消
            </a-button>
            <a-button
              type="primary"
              :loading="delLoading"
              ghost
              @click="handleCancelAlls()"
              style="margin: 0"
            >
              <edit-outlined />
              清空所有关注
            </a-button>
          </a-space>
        </template>
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
            <a href="javascript:;" @click.stop="handleFlowDetail(record)">
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
          <template v-else-if="column.key === 'action'">
            <a-button type="link" class="inner-btn" @click.stop="handleCancelFocus(record.dbid)">
              取消关注
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { treeParams } from '../types';
import type { BpmFocusedTaskDto } from '@/api/avic/bpm/BpmFocusedTaskApi'; // 引入模块DTO
import {
  cancelFocusedTask,
  handleCancelAll,
  batchCancel,
  listBpmFocusTaskListByPage
} from '@/api/avic/bpm/BpmFocusedTaskApi';
import bpmUtils from '../bpmutils/FlowUtils';

const props = defineProps({
  params: {
    type: Object,
    default: null
  }
});
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout3; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    ellipsis: true,
    width: 56,
    maxWidth: 56,
    align: 'center',
    key: 'id',
    fixed: 'left'
  },
  {
    title: '流程名称',
    dataIndex: 'processDefName',
    key: 'processDefName',
    ellipsis: true,
    resizable: true,
    width: 180,
    minWidth: 180
  },
  {
    title: '标题',
    dataIndex: 'taskTitle',
    key: 'taskTitle',
    ellipsis: true,
    resizable: true,
    width: 180,
    minWidth: 180
  },
  {
    title: '紧急程度',
    dataIndex: 'priority',
    key: 'priority',
    width: 120,
    minWidth: 120,
    resizable: true,
    sorter: true,
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'processStartTime',
    width: 180,
    minWidth: 180,
    resizable: true,
    align: 'center',
    sorter: true,
    customRender: obj => {
      return obj ? proxy.$dateFormat(obj.text, 'YYYY-MM-DD HH:mm:ss') : '';
    }
  },
  {
    title: '关注的节点',
    dataIndex: 'curActName',
    ellipsis: true,
    resizable: true,
    align: 'left',
    width: 160,
    minWidth: 160
  },
  {
    title: '状态',
    dataIndex: 'businessState',
    key: 'businessState',
    align: 'center',
    sorter: true,
    resizable: true,
    width: 100
  },
  {
    title: '处理人',
    dataIndex: 'assigneeName',
    ellipsis: true,
    width: 120,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    minWidth: 120,
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<BpmFocusedTaskDto>({});
const treeForms = ref<treeParams>({
  nodeId: '',
  nodeType: ''
});
const queryParam = reactive({
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
});
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); //表格数据集合
const selectType = 'multi'; // 表格单选: single, 多选: multi
const selectedRowKeys = ref([]); //选中数据主键集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const priorityList = ref([]); //紧急程度通用代码字段
const businessStateList = ref([]); //流程状态通用代码字段
const lookupParams = [
  { fieldName: 'priority', lookUpType: 'PLATFORM_BPM_TASK_PRIORITY' },
  { fieldName: 'businessState', lookUpType: 'PLATFORM_BPM_TASK_STATE' }
];

onMounted(() => {
  // 加载查询区所需通用代码
  getLookupList();
});

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
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listBpmFocusTaskListByPage(queryParam)
    .then((response: any) => {
      list.value = response.data.rows;
      totalPage.value = response.data.total;
      queryParam.pageParameter.page = response.data.page;
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
    taskTitle: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 批量取消函数 */
function handleBatchCancel(params) {
  if (!params.length) {
    proxy.$message.warning('请选择要取消的关注！');
    return;
  } else {
    proxy.$Modal.confirm({
      title: '您确认要取消关注吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        delLoading.value = true;
        batchCancel({ dbids: params.join(',') })
          .then((res: any) => {
            if (res.success) {
              proxy.$message.success('取消关注成功！');
              getList();
              selectedRowKeys.value = [];
            }
          })
          .finally(() => {
            delLoading.value = false;
          })
          .catch(e => {
            console.log(e, 'err');
          });
      }
    });
  }
}
/** 清空所有关注 */
function handleCancelAlls() {
  if (!list.value.length) {
    proxy.$message.warning('暂无关注内容！');
    return;
  }
  proxy.$Modal.confirm({
    title: '确定清空所有关注吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      handleCancelAll()
        .then((response: any) => {
          if (response.success) {
            proxy.$message.success('清空成功！');
            delLoading.value = false;
            getList();
          }
        })
        .catch(() => {
          delLoading.value = false;
        });
    }
  });
}
/** 取消关注 */
function handleCancelFocus(id) {
  proxy.$Modal.confirm({
    title: '您确认要取消关注吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      saveCancelFocus(id);
    }
  });
}
/** 取消关注，确认后函数 */
function saveCancelFocus(id) {
  cancelFocusedTask({ dbid: id })
    .then((res: any) => {
      if (res.success) {
        proxy.$message.success('取消关注成功！');
        getList();
      }
    })
    .catch(e => {
      console.log(e, 'err');
    });
}
/** 打开流程详情页面 */
function handleFlowDetail(params) {
  if (!params) return;
  bpmUtils
    .executeTask(
      params.processInstance,
      params.executionId,
      params.dbid,
      params.businessId,
      params.formResourceName,
      params.processDefName,
      params.taskType,
      '',
      bpmOperatorRefresh
    )
    .then(() => {
      console.log('打开成功');
      //打开成功
      // _this.openEditFlowLoading = false;
      // _this.openEditFlowId = '';
    })
    .catch(() => {
      console.log('打开失败');
      //打开失败
      // _this.openEditFlowLoading = false;
      // _this.openEditFlowId = '';
    });
}
/** 流程详情页面关闭后刷新页面 */
function bpmOperatorRefresh() {
  if (treeForms.value.nodeId && treeForms.value.nodeType) {
    getList();
  }
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys) {
  selectedRowKeys.value = _selectedRowKeys;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  if (selectType === 'multi') {
    // 多选
    if (!selectIds.includes(record.dbid)) {
      // 选中
      selectedRowKeys.value.push(record.dbid);
    } else {
      // 取消选中
      selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.dbid);
    }
  } else {
    // 单选
    if (!selectIds.includes(record.dbid)) {
      selectedRowKeys.value = [record.dbid];
    } else {
      selectedRowKeys.value = []; // 单选可取消
    }
  }
}
/** 表格排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
</script>
