<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="流程名称">
              <a-input
                v-model:value="queryForm.title"
                placeholder="请输入流程名称"
                allow-clear
                @keyup.enter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="创建时间(起)">
              <a-date-picker
                v-model:value="queryForm.startDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择创建时间(起)"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, queryForm.startDateEnd)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="创建时间(止)">
              <a-date-picker
                v-model:value="queryForm.startDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择创建时间(止)"
                :disabled-date="
                  startValue => proxy.$disabledEndDate(startValue, queryForm.startDateBegin)
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
        :row-key="record => record.dbId"
        :data-source="list"
        :loading="loading"
        :row-selection="{
          type: 'checkbox',
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
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.key === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.key === 'taskTitle'">
            <a
              href="javascript:;"
              class="table-detail-link"
              @click.stop="handleDetail(record.dbId)"
            >
              {{ record.title || record.procDefName }}
            </a>
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
import { listHistProcessByPage } from '@/api/avic/bpm/BpmTaskApi';
import type { MyDraftQueryForm, treeParams } from '../types';
import bpmUtils from '../bpmutils/FlowUtils';
import bpmInstanceObject from '../bpmutils/FlowEditor';
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
  selectType = 'multi', // 表格单选: single, 多选: multi
  lookupParams = [{ fieldName: 'businessState', lookUpType: 'PLATFORM_BPM_TASK_STATE' }],
  columns = [
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
      dataIndex: 'procDefName',
      key: 'taskTitle',
      ellipsis: true,
      resizable: true,
      minWidth: 320
    },
    {
      title: '当前节点',
      dataIndex: 'activityName',
      align: 'left',
      ellipsis: true,
      resizable: true,
      width: 160,
      minWidth: 160
    },
    {
      title: '状态',
      dataIndex: 'businessState',
      key: 'businessState',
      align: 'center',
      sorter: true,
      width: 120
    },
    {
      title: '拟稿人',
      dataIndex: 'taskSendUser',
      ellipsis: true,
      width: 160,
      align: 'center'
    },
    {
      title: '处理人',
      dataIndex: 'assigneeName',
      ellipsis: true,
      width: 160,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'startDate',
      width: 180,
      minWidth: 180,
      align: 'center',
      sorter: true,
      customRender: obj => {
        return obj.text ? proxy.$dateFormat(obj.text) : '';
      }
    }
  ];
const queryForm = ref<MyDraftQueryForm>({
  title: undefined,
  businessState: undefined,
  startDateBegin: undefined,
  startDateEnd: undefined,
  type: '0'
});
const treeForms = ref<treeParams>({
  nodeId: '',
  nodeType: ''
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
  loading = ref<boolean>(false), // 表格loading状态
  totalPage = ref<number>(0),
  businessStateList = ref([]); //高级查询通用代码字段

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
  loading.value = true;
  listHistProcessByPage(queryParam)
    .then((response: any) => {
      list.value = response.data.rows;
      totalPage.value = response.data.records;
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
  queryForm.value = { type: '0' } as MyDraftQueryForm;
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys: string[]) {
  selectedRowKeys.value = _selectedRowKeys;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  if (selectType === 'multi') {
    // 多选
    if (!selectIds.includes(record.dbId)) {
      // 选中
      selectedRowKeys.value.push(record.dbId);
    } else {
      // 取消选中
      selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.dbId);
    }
  } else {
    // 单选
    if (!selectIds.includes(record.dbId)) {
      selectedRowKeys.value = [record.dbId];
    } else {
      selectedRowKeys.value = []; // 单选可取消
    }
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
//打开流程详情
function handleDetail(dbId: string) {
  bpmUtils
    .detail(bpmInstanceObject, dbId, '', '', '', bpmOperatorRefresh)
    .then(() => {
      console.log('打开流程成功');
    })
    .catch(() => {
      proxy.$message.error('启动流程失败!');
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
