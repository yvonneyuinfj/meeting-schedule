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
            <a-form-item label="拟稿人">
              <AvicCommonSelect
                v-model:value="queryForm.userId"
                type="userSelect"
                placeholder="请选择拟稿人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="拟稿部门">
              <AvicCommonSelect
                v-model:value="queryForm.deptId"
                type="deptSelect"
                placeholder="请选择拟稿部门"
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
        :row-key="record => record.executionId"
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
            placeholder="请输入流程名称"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.key === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.key === 'procDefName'">
            <a
              href="javascript:;"
              class="table-detail-link"
              @click.stop="handleFlowDetail(record.formId, '1')"
            >
              {{ record.procDefName || '' }}
            </a>
          </template>
          <template v-else-if="column.key === 'priority'">
            <a-badge v-if="text == 1" color="red" text="特急" />
            <a-badge v-if="text == 2" color="orange" text="紧急" />
            <a-badge v-if="text == 0" color="#108ee9" text="一般" />
          </template>
          <template v-else-if="column.key === 'businessState'">
            <AvicDictTag :value="text" match-field="lookupCode" :options="businessStateList" />
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" class="inner-btn" @click="modalHandleDetailOrEdit(record.formId)">
              编辑
            </a-button>
            <a-button type="link" class="inner-btn" @click="handleDelete([record.executionId])">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { searchManageHistProcessByPage, deleteProcessEntry } from '@/api/avic/bpm/BpmProcessApi';
import type { bpmProcessQueryForm, treeParams } from '../types';
import bpmUtils from '../bpmutils/FlowUtils';
import bpmInstanceObject from '../bpmutils/FlowEditor';
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
  },
  selectType = 'multi', // 表格单选: single, 多选: multi
  colLayout = proxy.$colLayout3, // 页面表单响应式布局对象
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
      ellipsis: true,
      dataIndex: 'procDefName',
      key: 'procDefName',
      resizable: true,
      minWidth: 320
    },
    {
      title: '拟稿人',
      ellipsis: true,
      dataIndex: 'userName',
      align: 'center',
      resizable: true,
      width: 120,
      minWidth: 120
    },
    {
      title: '拟稿部门',
      dataIndex: 'deptName',
      ellipsis: true,
      align: 'center',
      resizable: true,
      width: 140,
      minWidth: 140
    },
    {
      title: '当前节点',
      dataIndex: 'activityName',
      ellipsis: true,
      align: 'center',
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
      resizable: true,
      width: 120,
      minWidth: 120
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      align: 'center',
      fixed: 'right'
    }
  ];

const queryForm = ref<bpmProcessQueryForm>({
  title: undefined,
  businessState: undefined,
  userId: undefined,
  deptId: undefined,
  startDateBegin: undefined,
  startDateEnd: undefined,
  type: '3'
});

const treeForms = ref<treeParams>({
  nodeId: undefined,
  nodeType: undefined
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
  delLoading = ref<boolean>(false), // 删除按钮loading状态
  totalPage = ref<number>(0),
  businessStateList = ref([]); //流程状态通用代码字段

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
    getList();
  },
  {
    immediate: true
  }
);
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  searchManageHistProcessByPage(queryParam)
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
  queryForm.value = { type: '3' } as bpmProcessQueryForm;
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value: string) {
  const keyWord = {
    title: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
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
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys: string[]) {
  selectedRowKeys.value = _selectedRowKeys;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  if (selectType === 'multi') {
    // 多选
    if (!selectIds.includes(record.executionId)) {
      // 选中
      selectedRowKeys.value.push(record.executionId);
    } else {
      // 取消选中
      selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.executionId);
    }
  } else {
    // 单选
    if (!selectIds.includes(record.executionId)) {
      selectedRowKeys.value = [record.executionId];
    } else {
      selectedRowKeys.value = []; // 单选可取消
    }
  }
}
/** 删除 */
function handleDelete(ids: string[]) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$Modal.confirm({
    title: '确认要删除选择的数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      deleteProcessEntry({ processInstanceId: ids.join(',') })
        .then((response: any) => {
          if (response.success) {
            proxy.$message.success('删除成功！');
            getList();
          }
        })
        .finally(() => {
          delLoading.value = false;
        })
        .catch(err => {
          proxy.$message.warning(err.message);
        });
    }
  });
}
/** 编辑 */
function modalHandleDetailOrEdit(id: string) {
  //   formId.value = id;
  //   showEditModal.value = true;
  handleFlowDetail(id, '1');
}
/**
 * 打开流程详情页面
 * @param {*} res
 */
function handleFlowDetail(formId: string, extType: string) {
  if (formId) {
    bpmUtils
      .detail(bpmInstanceObject, formId, '', extType || '', '', bpmOperatorRefresh)
      .then(res => {
        console.log(res, '打开流程成功');
      })
      .catch(err => {
        console.log(err, '打开流程失败');
      });
  }
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
