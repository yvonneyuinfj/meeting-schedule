<template>
  <div class="module module02 bpm-task">
    <a-tabs class="bpm-task-tabs" @change="change" v-model:activeKey="activeKey">
      <template #rightExtra>
        <div class="refresh more-icon">
          <div>
            <Pagination
              size="small"
              v-model:current="queryParam.pageParameter.pageNo"
              v-model:page-size="queryParam.pageParameter.pageSize"
              simple
              :total="total"
              @change="pageChange"
            />
          </div>
          <a-button size="small" type="text">
            <sync-outlined :spin="loading" @click="refreshList" />
          </a-button>
          <a-button size="small" type="text">
            <template v-slot:icon>
              <router-link :to="taskManagePath">
                <avic-icon svg="MoreOutlined" />
              </router-link>
            </template>
          </a-button>
        </div>
      </template>

      <!-- 我的待办 -->
      <a-tab-pane class="bpm-task-pane" key="todo" :force-render="true">
        <template v-slot:tab>
          <a-badge :count="TodoTaskTotal">
            <span>
              我的待办
              <!-- <a-tag>{{ TodoTaskTotal }}</a-tag> -->
            </span>
          </a-badge>
        </template>
        <div class="module-in">
          <div class="backlog">
            <AvicTable
              ref="avicTable"
              :height="380"
              :data-source="TodoTaskList"
              :columns="columns"
              :showTableSetting="false"
              :pagination="false"
              :loading="loading"
              :row-key="record => record.dbid"
              @change="handleTableChange"
              :bordered="false"
              autoHeaderHeight
              :stripe="false"
              resizable="true"
              size="defaut"
              :rowHeight="40"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.key === 'processDefName'">
                  {{ record.processDefName }}
                </template>
                <template v-else-if="column.key === 'taskTitle'">
                  <a-tooltip placement="bottomLeft">
                    <template #title>
                      <span>被拿回</span>
                    </template>
                    <avic-icon
                      class="a-icon-style"
                      svg="avic-undo"
                      color="#F06500"
                      v-if="
                        record.sendType == 'dowithdraw' ||
                        record.sendType == 'dowithdrawassignee' ||
                        record.sendType == 'dowithdrawassigneeop'
                      "
                    />
                  </a-tooltip>
                  <a-tooltip placement="bottomLeft">
                    <template #title>
                      <span>被退回</span>
                    </template>
                    <avic-icon
                      svg="avic-reply-fill"
                      class="a-icon-style"
                      color="#EE0000"
                      v-if="
                        record.sendType == 'doretreattoprev' ||
                        record.sendType == 'doretreattoactivity' ||
                        record.sendType == 'doretreattowant' ||
                        record.sendType == 'doretreattodraft'
                      "
                    />
                  </a-tooltip>
                  <a-tooltip placement="bottomLeft">
                    <template #title>
                      <span>被委托</span>
                    </template>
                    <avic-icon
                      class="a-icon-style"
                      svg="avic-entrust"
                      color="#2BCB95"
                      v-if="record.workhandType == 's'"
                    />
                  </a-tooltip>
                  <span :title="record.activityalias_">
                    <a
                      href="javascript:;"
                      class="table-detail-link"
                      @click.stop="toFlowDetail(record)"
                    >
                      {{ record.activityalias_ }}
                    </a>
                  </span>
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
                  {{ record.businessState }}
                </template>
                <template v-else-if="column.key === 'action'">
                  <a-button type="link" class="inner-btn" @click="batchHandleTodo(record)">
                    办理
                  </a-button>
                </template>
              </template>
            </AvicTable>
          </div>
        </div>
      </a-tab-pane>

      <!-- 我的待阅 -->
      <a-tab-pane class="bpm-task-pane" key="read" :force-render="true">
        <template v-slot:tab>
          <a-badge :count="ToReadTotal">
            <span>
              我的待阅
              <!-- <a-tag>{{ ToReadTotal }}</a-tag> -->
            </span>
          </a-badge>
        </template>
        <div class="module-in bpm-task-content">
          <div class="backlog">
            <AvicTable
              :height="380"
              ref="avicTable"
              :columns="columns"
              :data-source="ToReadList"
              :showTableSetting="false"
              :pagination="false"
              :loading="loading"
              :row-key="record => record.dbid"
              @change="handleTableChange"
              :bordered="false"
              autoHeaderHeight
              :stripe="false"
              resizable="true"
              size="defaut"
              :rowHeight="40"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.key === 'processDefName'">
                  {{ record.processDefName }}>
                </template>
                <template v-else-if="column.key === 'taskTitle'">
                  <a-tooltip placement="bottomLeft">
                    <template #title>
                      <span>被拿回</span>
                    </template>
                    <avic-icon
                      class="a-icon-style"
                      svg="avic-undo"
                      color="#F06500"
                      v-if="
                        record.sendType == 'dowithdraw' ||
                        record.sendType == 'dowithdrawassignee' ||
                        record.sendType == 'dowithdrawassigneeop'
                      "
                    />
                  </a-tooltip>
                  <a-tooltip placement="bottomLeft">
                    <template #title>
                      <span>被退回</span>
                    </template>
                    <avic-icon
                      svg="avic-reply-fill"
                      class="a-icon-style"
                      color="#EE0000"
                      v-if="
                        record.sendType == 'doretreattoprev' ||
                        record.sendType == 'doretreattoactivity' ||
                        record.sendType == 'doretreattowant' ||
                        record.sendType == 'doretreattodraft'
                      "
                    />
                  </a-tooltip>
                  <a-tooltip placement="bottomLeft">
                    <template #title>
                      <span>被委托</span>
                    </template>
                    <avic-icon
                      class="a-icon-style"
                      svg="avic-entrust"
                      color="#2BCB95"
                      v-if="record.workhandType == 's'"
                    />
                  </a-tooltip>
                  <span :title="record.activityalias_">
                    <a
                      href="javascript:;"
                      class="table-detail-link"
                      @click.stop="toFlowDetail(record)"
                    >
                      {{ record.activityalias_ }}
                    </a>
                  </span>
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
                <template v-else-if="column.key === 'action'">
                  <a-button type="link" class="inner-btn" @click="batchHandleTodo(record)">
                    办理
                  </a-button>
                </template>
              </template>
            </AvicTable>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MyTask'
});
</script>

<script lang="ts" setup>
import { batchHandle, getBatchHandleInfo } from '@/api/avic/bpm/BpmTaskApi'; //引入模块API
import { listBpmTaskListByPage } from '@/api/avic/bpm/BpmTaskDndReadApi';
import { Pagination } from 'ant-design-vue';
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils'; //引入流程相关配置及方法

const columns = ref<any>([
  {
    title: '标题',
    dataIndex: 'originalTaskTitle',
    scopedSlots: { customRender: 'originalTaskTitle' },
    ellipsis: false,
    width: 240,
    key: 'taskTitle'
  },
  {
    title: '流程名称',
    dataIndex: 'processDefName',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '紧急程度',
    dataIndex: 'priority',
    scopedSlots: { customRender: 'priority' },
    align: 'center',
    sorter: true,
    width: 100,
    key: 'priority'
  },
  {
    title: '节点',
    dataIndex: 'activityalias_',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '接收人',
    dataIndex: 'taskSendUser',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '接收时间',
    dataIndex: 'oTime',
    width: 170,
    align: 'center',
    sorter: true,
    customRender: obj => {
      return obj.text ? proxy.$dateFormat(obj.text) : '';
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    ellipsis: true,
    width: 60,
    align: 'center',
    fixed: 'right'
  }
]);
const queryForm = reactive({
  taskType: '0',
  taskFinished: '0',
  nodeId: 'root',
  nodeType: 'dynamicClassic'
});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    pageNo: 1, // 页数
    pageSize: 8, // 每页条数
    tabType: 'todo'
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const batchHandleParam = reactive({
  // 批量办理请求接口
  entryIds: '',
  executionIds: '',
  taskIds: ''
});
const TodoTaskList = ref([]); //待办数据集合
const TodoTaskTotal = ref(0); //待办总条数
const ToReadList = ref([]); //待阅数据集合
const ToReadTotal = ref(); //待阅总条数
const loading = ref(false); // 表格loading状态
const TodoTaskPage = ref(1); //待办当前浏览页码
const ToReadPage = ref(1); //待阅当前浏览页码
const activeKey = ref('todo'); //当前激活tab面板的key
const total = ref(0); //数据总条数
const { proxy } = getCurrentInstance();
const taskManagePath = '/bpm/BpmTaskManage'; //静态页面跳转

onMounted(() => {
  getTodoTaskList();
  getToReadList();
  pageChange(1);
});
/** 待办数据查询 */
function getTodoTaskList() {
  loading.value = true;
  listBpmTaskListByPage(queryParam.pageParameter)
    .then((response: any) => {
      TodoTaskList.value = response.data.todoRows;
      TodoTaskTotal.value = response.data.todoTotal;
      total.value = response.data.todoTotal;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      TodoTaskList.value = [];
      TodoTaskTotal.value = 0;
      total.value = 0;
    });
}
/** 待阅数据查询 */
function getToReadList() {
  loading.value = true;
  const data = {
    // 请求表格数据参数
    pageParameter: {
      pageNo: 1, // 页数
      pageSize: 8, // 每页条数
      tabType: 'todo'
    },
    searchParams: {
      taskType: '1',
      taskFinished: '0',
      nodeId: 'root',
      nodeType: 'dynamicClassic'
    },
    keyWord: '', // 快速查询数据
    sidx: null, // 排序字段
    sord: null // 排序方式: desc降序 asc升序
  };
  listBpmTaskListByPage(data.pageParameter)
    .then((response: any) => {
      ToReadList.value = response.data.readRows;
      ToReadTotal.value = response.data.readTotal;
      total.value = response.data.readTotal;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      ToReadList.value = [];
      ToReadTotal.value = 0;
      total.value = 0;
    });
}
/** 公共分页 */
function pageChange(value) {
  queryParam.pageParameter.pageNo = value;
  if (activeKey.value === 'todo') {
    TodoTaskPage.value = value;
  } else if (activeKey.value === 'read') {
    ToReadPage.value = value;
  }
  getTodoTaskList();
}
/** 刷新按钮 */
function refreshList() {
  if (activeKey.value === 'todo') {
    getTodoTaskList();
  } else if (activeKey.value === 'read') {
    getToReadList();
  }
}
/** 升序降序 */
function handleTableChange(pagination, filters, sorter) {
  console.log(filters);
  console.log(pagination);
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getTodoTaskList();
}
/** 流程跳转 */
function toFlowDetail(row) {
  if (row.processDefName) {
    bpmUtils.executeTask(
      row.processInstance,
      row.executionId,
      row.dbid,
      row.businessId,
      row.formResourceName,
      row.processDefName || row.taskTitle,
      row.taskType,
      '',
      bpmOperatorRefresh
    );
  } else {
    /** 非流程待办 */
    let url = row.formResourceName;
    if (url == null || url == '') {
      return;
    }
    if (url.indexOf('?') > 0) {
      url += '&processInstanceId=' + row.processInstance;
    } else {
      url += '?processInstanceId=' + row.processInstance;
    }
    url += '&taskId=' + row.dbid;
    url += '&id=' + row.businessId;

    let skipUrl = '';
    if (url.indexOf('?') != -1) {
      let urlStr = url.split('?');
      skipUrl = encodeURIComponent(urlStr[0].replace(RegExp('/', 'g'), '_')) + '?' + urlStr[1];
    } else {
      skipUrl = encodeURIComponent(url.replace(RegExp('/', 'g'), '_'));
    }

    window.open('/notFlowTodoDetail/' + skipUrl, 'NotFlowTodoDetailWin');
    window['bpmOperatorRefresh' + row.processInstance] = () => {
      bpmOperatorRefresh();
    };
  }
}
/** 流程跳转刷新 */
function bpmOperatorRefresh() {
  refreshList();
}
/** 待办与待阅切换状态判断 */
function change(params: string) {
  if (params === 'todo') {
    queryForm.taskType = '0';
    queryParam.pageParameter.pageNo = TodoTaskPage.value;
    // queryParam.searchParams = { ...queryForm };
    getTodoTaskList();
  } else if (params === 'read') {
    queryForm.taskType = '1';
    queryParam.pageParameter.pageNo = ToReadPage.value;
    getToReadList();
  }
}
/** 待办办理 */
function batchHandleTodo(record: any) {
  batchHandleParam.entryIds = record.processInstance;
  batchHandleParam.executionIds = record.executionId;
  batchHandleParam.taskIds = record.dbid;
  proxy.$Modal.confirm({
    title: '确定对数据进行办理吗？',
    content: '提示：只有符合办理前提条件的才会被办理成功',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      batchHandle(batchHandleParam)
        .then((res: any) => {
          if (res.success) {
            let resultData = res.data;
            let falureCnt = resultData.result[2];
            if (falureCnt > 0) {
              proxy.$message.error('不符合办理条件的待办无法办理！');
            } else {
              getBatchHandlesInfo();
            }
          }
        })
        .catch(() => {});
    }
  });
}
/** 待办办理后的回调 */
function getBatchHandlesInfo() {
  getBatchHandleInfo()
    .then((res: any) => {
      if (res.success) {
        proxy.$message.success('数据办理成功！');
        getTodoTaskList();
      }
    })
    .catch(e => {
      console.log(e, 'err');
    });
}
/**自动刷新 */
function loadData() {
  refreshList();
  console.log('refreshList0--------------------');
}
defineExpose({
  loadData
});
</script>

<style lang="less">
@import '../style/base.less';
</style>
<style lang="less" scoped>
:deep(.ant-tabs-nav) {
  padding: 0 12px;
  &::before {
    border: 0;
  }
  .ant-tabs-tab {
    margin-right: 8px;
    padding: 12px 0 8px 0;

    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      font-weight: 600;
    }
  }
  .ant-tag {
    height: 20px;
    margin: 0;
    background-color: @border-color-split;
    border: @border-color-split;
  }
  .ant-tabs-tab-active {
    .ant-tag {
      color: #fff;
      background-color: @primary-color;
      border: @primary-color;
    }
  }
}
</style>
