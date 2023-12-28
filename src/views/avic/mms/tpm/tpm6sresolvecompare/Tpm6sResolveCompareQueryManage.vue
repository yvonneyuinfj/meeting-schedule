<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="立项单位名称">
              <AvicCommonSelect
                  v-model:value="queryForm.editDeptId"
                  type="deptSelect"
                  placeholder="请选择立项单位名称"
                  :defaultShowValue="queryForm.editDeptIdAlias"
                  @callback="
                  result => {
                    queryForm.editDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="立项时间(起)">
              <a-date-picker
                  v-model:value="queryForm.approvedDateBegin"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择立项时间(起)"
                  :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.approvedDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="立项时间(止)">
              <a-date-picker
                  v-model:value="queryForm.approvedDateEnd"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择立项时间(止)"
                  :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.approvedDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="完成时间(起)">
              <a-date-picker
                  v-model:value="queryForm.finishDateBegin"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择完成时间(起)"
                  :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.finishDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="完成时间(止)">
              <a-date-picker
                  v-model:value="queryForm.finishDateEnd"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择完成时间(止)"
                  :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.finishDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="问题解决情况">
              <a-input
                  v-model:value="queryForm.problemSolvingInstruction"
                  placeholder="请输入问题解决情况"
                  :allow-clear="true"
                  @pressEnter="handle"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="问题解决评价">
              <a-select
                  v-model:value="queryForm.problemSolvingEvaluation"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择问题解决评价"
              >
                <a-select-option
                    v-for="item in problemSolvingEvaluationList"
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
          <a-col
              v-bind="colLayout.cols"
              style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handle">
                  <search-outlined/>
                  查询
                </a-button>
                <a-button type="primary" @click="reset" ghost>
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced"/>
                  <down-outlined v-else/>
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
          ref="tpm6sResolveCompare"
          table-key="tpm6sResolveCompare"
          :columns="columns"
          :row-key="record => record.id"
          :data-source="list"
          :loading="loading"
          :pageParameter="queryParam.pageParameter"
          :total="totalPage"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
                v-hasPermi="['tpm6sResolveCompare:export']"
                title="导出"
                type="primary"
                ghost
                @click="handleExport">
              <template #icon>
                <export-outlined/>
              </template>
              导出
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-space>
            <AvicBpmFilter
                :allFileAuth="['tpm6sResolveCompare:all']"
                :myFileAuth="['tpm6sResolveCompare:my']"
                :defaultBpmType='queryForm.bpmType'
                :defaultBpmState='queryForm.bpmState'
                @change="changeBpmFilter"
            />
            <a-input-search
                class="opt-btn-commonsearch"
                style="width: 200px"
                placeholder="请输入问题立项申请表ID"
                :allow-clear="true"
                @search="handleKeyWord"
            />
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'problemDescription'">
            <a @click="handleAttach(record, column.dataIndex)">
              查看
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'problemSolvingInstruction'">
            <a @click="handleAttach(record, column.dataIndex)">
              查看
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <AttachModal
        :attachOpen="attachOpen"
        :attach-form="attchForm"
        @closeAttach="closeAttach"
    />
  </div>
</template>
<script lang="ts" setup>
import type { Tpm6sResolveCompareDto } from '@/api/avic/mms/tpm/Tpm6sResolveCompareApi'; // 引入模块DTO
import { exportExcel, listTpm6sResolveCompareByPage } from '@/api/avic/mms/tpm/Tpm6sResolveCompareApi';
import AttachModal from './AttachModal.vue';
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
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
    title: '立项单位',
    dataIndex: 'editDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目立项名称',
    dataIndex: 'projectName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '问题发现人',
    dataIndex: 'problemFinderName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '地点位置',
    dataIndex: 'location',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '立项时间',
    dataIndex: 'applyDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '完成时间',
    dataIndex: 'finishDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '问题描述',
    dataIndex: 'problemDescription',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '问题解决情况',
    dataIndex: 'problemSolvingInstruction',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目组长',
    dataIndex: 'chargeUserName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '问题解决评价',
    dataIndex: 'problemSolvingEvaluationName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '团队成员',
    dataIndex: 'teamUserName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    title: '流程状态',
    dataIndex: 'businessstate_',
    ellipsis: true,
    width: 120,
    align: 'center',
    fixed: 'right'
  },
  {
    title: '流程当前步骤',
    dataIndex: 'activityalias_',
    width: 120,
    fixed: 'right'
  },
  {
    title: '当前处理人',
    dataIndex: 'assigneenames_',
    ellipsis: true,
    width: 130,
    align: 'left',
    fixed: 'right'
  }
];
const queryForm = ref<Tpm6sResolveCompareDto>({
  bpmState: 'all',
  bpmType: 'my'
});
// 高级查询对象
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
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const totalPage = ref(0);
const problemSolvingEvaluationList = ref([]); // 问题问题解决评价通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'problemSolvingEvaluation', lookUpType: 'TPM_PROBLEM_SOLVING_EVALUATION' }
];
const bpmState = ref();
const bpmType = ref();
const attachOpen = ref(false); // 附件弹窗
const attchForm = reactive({
  id: '',
  info: ''
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpm6sResolveCompareByPage(queryParam)
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
    problemSolvingEvaluationList.value = result.problemSolvingEvaluation;
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
function handle() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}

/** 高级查询 重置按钮操作 */
function reset() {
  queryForm.value = {
    bpmType: queryForm.value.bpmType,
    bpmState: queryForm.value.bpmState
  };
  handle();
}

/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}

/** 快速查询逻辑 */
function handleKeyWord(value) {
  const keyWord = {
    tpm6sApplyId: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      const post = queryParam;
      bpmState.value = post.searchParams.bpmState;
      bpmType.value = post.searchParams.bpmType;
      post.searchParams.bpmState = null;
      post.searchParams.bpmType = null;
      exportExcel(post).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
      post.searchParams.bpmState = bpmState.value;
      post.searchParams.bpmType = bpmType.value;
    }
  });
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

/** 打开查看 */
const handleAttach = (record, title) => {
  attchForm.id = record.id;
  if (title === 'problemDescription') {
    attchForm.info = record.problemDescription;
  } else if (title === 'problemSolvingInstruction'){
    attchForm.info = record.problemSolvingInstruction;
  }
  attachOpen.value = true;
};

/** 关闭查看 */
const closeAttach = () => {
  attachOpen.value = false;
  attchForm.id = null;
};
</script>
