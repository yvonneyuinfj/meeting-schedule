<template>
  <AvicModal
    :visible="true"
    title="修改意见"
    width="960px"
    height="580px"
    :centered="true"
    @cancel="closeModal"
    :body-style="{ padding: '0' }"
  >
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" :model="queryForm">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="流程节点">
              <a-input
                v-model:value="queryForm.currentActiveLabel"
                placeholder="请输入流程节点"
                allow-clear
                @keyup.enter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="处理人">
              <a-input
                v-model:value="queryForm.assigneeName"
                placeholder="请输入处理人"
                allow-clear
                @keyup.enter="handleQuery"
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
        :pageParameter="pageParameter"
        :total="totalPage"
        :show-table-setting="false"
        rowClickSelectionType="no"
        :showTableSetting="false"
        :customRow="
          record => {
            return {
              onClick: () => {
                handleRowSelection(record);
              }
            };
          }
        "
        @refresh="getList"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.key === 'id'">
            {{ index + 1 + pageParameter.rows * (pageParameter.page - 1) }}
          </template>
          <template v-if="column.key === 'message'">
            <div v-if="record.editable" @click.stop>
              <a-input
                :value="text"
                style="width: 100%"
                placeholder="请输入"
                @change.stop="e => changeInput(e.target.value, record, 'message')"
              ></a-input>
            </div>
            <div v-else class="table-row-text">
              {{ text }}
            </div>
          </template>
        </template>
      </AvicTable>
    </div>
    <template #footer>
      <a-button @click="closeModal">关闭</a-button>
      <a-button type="primary" @click="save" :disabled="list.length == 0" :loading="saveLoading">
        确定
      </a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { httpAction } from '../../../../../../api/avic/bpm/FlowUtilApi';
import type { modifyOpinionsParams } from '../../../types';
const props = defineProps({
  bpmInstanceObject: {
    type: Object,
    default: null
  }
});
const emit = defineEmits(['closeGlobalidea']);
const columns = [
  {
    title: '序号',
    ellipsis: true,
    width: 50,
    align: 'center',
    key: 'id'
  },
  {
    title: '节点',
    dataIndex: 'currentActiveLabel',
    width: 120,
    align: 'center'
  },
  {
    title: '处理人',
    dataIndex: 'assigneeName',
    width: 120,
    align: 'center'
  },
  {
    title: '接收时间',
    dataIndex: 'iTime',
    width: 160,
    align: 'center'
  },
  {
    title: '处理时间',
    dataIndex: 'eTime',
    width: 160,
    align: 'center'
  },
  {
    title: '操作类型',
    dataIndex: 'opType',
    width: 80,
    align: 'center'
  },
  {
    title: '处理意见',
    dataIndex: 'message',
    key: 'message',
    scopedSlots: { customRender: 'message' },
    ellipsis: true,
    fixed: 'right',
    width: 200
  }
];
const data = reactive({
    list: [],
    loading: false,
    globalideaVisible: false, // 弹窗modal显隐
    saveLoading: false, // 弹窗确定按钮loading状态
    selectedRowKeys: [], //选中数据主键集合
    totalPage: 0,
    pageParameter: {
      page: 1, // 页数
      rows: 20 // 每页条数
    }
  }),
  { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const queryForm = ref<modifyOpinionsParams>({ currentActiveLabel: '', assigneeName: '' });
const colLayout = proxy.$colLayout3; // 页面表单响应式布局对象
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
let { list, saveLoading, loading, totalPage, pageParameter } = toRefs(data);
onMounted(() => {
  getList();
});

function getList() {
  loading.value = true;
  httpAction(
    '/bpm/bpm/business/doGettracksByPage/v1',
    {
      entryId: props.bpmInstanceObject.bpmGlobalidea.data.procinstDbid,
      ...queryForm.value
    },
    'post'
  )
    .then(response => {
      list.value = response.data;
      totalPage.value = response.data.length;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = {
    ...queryForm.value
  };
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = { currentActiveLabel: '', assigneeName: '' };
  handleQuery();
}
/** 表格排序 */
function handleTableChange(pagination) {
  pageParameter.value.page = pagination.current;
  pageParameter.value.rows = pagination.pageSize;
  // getList();
}
// 行点击事件
function handleRowSelection(record) {
  console.log(record, record.dbid, 'record');
  console.log(list.value);

  const newData = [...list.value];
  newData.forEach(item => {
    if (record.dbid === item.dbid) {
      item.editable = !item.editable;
    } else {
      item.editable = false;
    }
  });
  list.value = newData;
}
/** 输入框的值发生变化事件 */
function changeInput(value, record, column) {
  const newData = [...list.value];
  const target = newData.find(item => record.dbid === item.dbid);
  if (target) {
    target[column] = value;
    target['changeFlag'] = true;
    list.value = newData;
  }
}
/**
 * 保存，包括整体保存与独行保存
 */
function save() {
  saveLoading.value = true;
  const changeList = list.value.filter(item => item.changeFlag === true);
  if (changeList && changeList.length > 0) {
    httpAction(
      '/bpm/bpm/business/saveGettracks/v1',
      {
        processInstanceId: props.bpmInstanceObject.bpmGlobalidea.data.procinstDbid,
        data: JSON.stringify(changeList)
      },
      'post'
    )
      .then((response: any) => {
        if (response.success) {
          proxy.$message.success('保存成功！');
          closeModal();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        saveLoading.value = false;
      });
  } else {
    proxy.$message.warning('对不起，没有可修改的数据');
    saveLoading.value = false;
  }
}
/**
 * 点击返回、点击X关闭事件
 */
function closeModal() {
  emit('closeGlobalidea');
}
</script>
<style scoped>
.table-row-text {
  /* display: inline-block; */
  /* max-width: 95%; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.table-wrapper {
  height: calc(100% - 60px);
}
</style>
