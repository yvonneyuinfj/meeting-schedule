<template>
  <div class="module guide">
    <div class="guide-top">
      <h3 class="tabBox">我的委托</h3>
      <div class="refresh more-icon">
        <a-button size="small" type="text">
          <sync-outlined :spin="loading" @click="getList" />
        </a-button>
        <a-button size="small" type="text">
          <template v-slot:icon>
            <router-link :to="MyDelegation">
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
        :data-source="entrustList"
        :columns="columns"
        :showTableSetting="false"
        :loading="loading"
        :pagination="false"
        :row-key="record => record.id"
        @change="handleTableChange"
        :bordered="false"
        :stripe="false"
        resizable="true"
        size="defaut"
        :rowHeight="40"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'taskSendUser'">
            <a class="task_text">
              <span>
                {{ record.taskSendUser }}
              </span>
            </a>
          </template>
          <template v-else-if="column.key === 'validFlag'">
            <a-tag v-if="formatStateTxt(record) == '未开始'" color="red">
              {{ formatStateTxt(record) }}
            </a-tag>
            <a-tag v-if="formatStateTxt(record) == '委托中'" color="blue">
              {{ formatStateTxt(record) }}
            </a-tag>
            <a-tag v-if="formatStateTxt(record) == '已完成'" color="green">
              {{ formatStateTxt(record) }}
            </a-tag>
            <a-tag v-if="formatStateTxt(record) == '无效'" color="orange">
              {{ formatStateTxt(record) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'businessState'">
            {{ record.businessState }}
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" class="inner-btn" @click="handleDeleteDelegation([record.id])">
              删除
            </a-button>
            <a-button
              v-if="formatStateTxt(record) !== '已完成'"
              type="link"
              class="inner-btn"
              @click.stop="handleCompleteDelegation([record.id])"
            >
              注销
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MyTrusteeship'
});
</script>

<script lang="ts" setup>
import {
  delWorkHandInfoById,
  completeWorkHandInfoById,
  listWorkHandDelegationByPage
} from '@/api/avic/bpm/BpmProcessDelegationApi'; //引入模块API

const columns = ref<any>([
  {
    title: '受托人',
    dataIndex: 'receptUserName',
    ellipsis: true,
    width: 120,
    key: 'receptUserName'
  },
  {
    title: '受托人部门',
    dataIndex: 'receptDeptName',
    align: 'center',
    ellipsis: true,
    width: 120,
    key: 'receptDeptName'
  },
  {
    title: '创建日期',
    dataIndex: 'handDate',
    align: 'center',
    sorter: true,
    width: 120,
    key: 'handDate',
    customRender: obj => {
      return obj ? proxy.$dateFormat(obj.text, 'YYYY-MM-DD') : '';
    }
  },
  {
    title: '状态',
    dataIndex: 'validFlag',
    align: 'center',
    width: 80,
    key: 'validFlag'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    ellipsis: true,
    width: 130,
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
    searchParams: {
      nodeId: '',
      nodeType: ''
    }
  },
  keyWord: '', // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const entrustList = ref([]); //表格数据集合
const entrustTotal = ref(0); //我的委托总条数
const loading = ref(false); // 表格loading状态
const { proxy } = getCurrentInstance();
const MyDelegation = 'bpm/BpmProcessDelegationManage'; //静态页面跳转

onMounted(() => {
  getList();
});
/** 查询数据 */
function getList() {
  loading.value = true;
  listWorkHandDelegationByPage(queryParam)
    .then((response: any) => {
      entrustList.value = response.data.rows;
      entrustTotal.value = response.data.total;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      entrustList.value = [];
      entrustTotal.value = 0;
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
/** 格式化状态 */
function formatStateTxt(record) {
  let validString = '';
  if (record.validFlag === '1') {
    let beginDate = record.handEffectiveDate;
    let beginDateStr = proxy.$dateFormat(beginDate, 'YYYY-MM-DD');
    let nowDate = new Date();
    let nowDateStr = proxy.$dateFormat(nowDate, 'YYYY-MM-DD');
    if (beginDateStr > nowDateStr) {
      validString = '未开始';
    } else {
      validString = '委托中';
    }
  } else if (record.validFlag === '0') {
    validString = '无效';
  } else if (record.validFlag === '2') {
    validString = '已完成';
  }
  return validString;
}
/** 删除委托 */
function handleDeleteDelegation(params: string[]) {
  proxy.$Modal.confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delWorkHandInfoById(params.join(','))
        .then((res: any) => {
          if (res.success) {
            proxy.$message.success('删除成功');
            getList();
          }
        })
        .catch(err => {
          proxy.$message.warning(err.message);
        });
    }
  });
}
/** 注销委托 */
function handleCompleteDelegation(params: string[]) {
  proxy.$Modal.confirm({
    title: '确定注销选择的委托吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      completeWorkHandInfoById(params.join(','))
        .then((res: any) => {
          if (res.success) {
            proxy.$message.success('操作成功');
            getList();
          }
        })
        .catch(err => {
          proxy.$message.warning(err.message);
        });
    }
  });
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
