<template>
  <div class="module guide">
    <div class="guide-top">
      <h3 class="tabBox">我的关注</h3>
      <div class="refresh more-icon">
        <a-button size="small" type="text" @click="getList">
          <sync-outlined :spin="loading" />
        </a-button>
        <a-button size="small" type="text">
          <template v-slot:icon>
            <router-link :to="BpmTaskManage">
              <avic-icon svg="MoreOutlined" />
            </router-link>
          </template>
        </a-button>
      </div>
    </div>
    <div class="backlog">
      <AvicTable
        ref="avicTable"
        :height="320"
        :data-source="AttentionList"
        :columns="columns"
        :loading="loading"
        :showTableSetting="false"
        :pagination="false"
        :row-key="record => record.dbid"
        @change="handleTableChange"
        :bordered="false"
        :stripe="false"
        resizable="true"
        size="defaut"
        :rowHeight="40"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'processDefName'">
            <a class="task_text">
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
              <span @click="toFlowDetail(record)">
                {{ record.processDefName }}
              </span>
            </a>
          </template>
          <template v-else-if="column.key === 'businessState'">
            {{ record.businessState }}
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

<script lang="ts">
export default defineComponent({
  name: 'FocusedTask'
});
</script>

<script lang="ts" setup>
import { cancelFocusedTask, listBpmFocusTaskListByPage } from '@/api/avic/bpm/BpmFocusedTaskApi.js'; //引入模块API
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils'; //引入流程相关配置及方法

const columns = ref<any>([
  {
    title: '流程名称',
    ellipsis: true,
    dataIndex: 'processDefName',
    width: 200,
    key: 'processDefName'
  },
  // {
  //   title: '标题',
  //   dataIndex: 'taskTitle',
  //   ellipsis: true,
  //   align: 'center',
  //   width: 120,
  //   key: 'taskTitle'
  // },
  {
    title: '创建时间',
    dataIndex: 'processStartTime',
    align: 'center',
    sorter: true,
    key: 'processStartTime',
    width: 180,
    customRender: obj => {
      return obj ? proxy.$dateFormat(obj.text, 'YYYY-MM-DD HH:mm:ss') : '';
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    ellipsis: true,
    width: 100,
    align: 'center',
    fixed: 'right'
  }
]);
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    nodeId: 'root',
    nodeType: 'dynamicClassic'
  },
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const AttentionList = ref([]); //表格数据集合
const AttentionTotal = ref(0); //我的关注总条数
const loading = ref(false); // 表格loading状态
const { proxy } = getCurrentInstance();
const BpmTaskManage = '/bpm/BpmFocused'; //静态页面跳转

onMounted(() => {
  getList();
});
/** 查询数据 */
function getList() {
  loading.value = true;
  listBpmFocusTaskListByPage(queryParam)
    .then((response: any) => {
      AttentionList.value = response.data.rows;
      AttentionTotal.value = response.data.total;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      AttentionList.value = [];
      AttentionTotal.value = 0;
      loading.value = false;
    });
}
/** 升序降序 */
function handleTableChange(pagination, filters, sorter) {
  console.log(filters);
  console.log(pagination);
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 取消关注 */
function handleCancelFocus(id: string) {
  proxy.$Modal.confirm({
    title: '您确认要取消关注吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      saveCancelFocus(id);
    }
  });
}
/** 取消关注后的回调 */
function saveCancelFocus(id: string) {
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
/** 无用函数 */
function bpmOperatorRefresh() {}
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
/** 父组件调用刷新 */
function loadData() {
  getList();
}
defineExpose({
  loadData
});
</script>

<style lang="less" scoped>
@import '../style/base.less';
</style>
