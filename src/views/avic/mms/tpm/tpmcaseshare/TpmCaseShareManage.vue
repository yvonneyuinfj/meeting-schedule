<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="shareDeptId" label="分享部门">
              <AvicCommonSelect v-model:value="queryForm.shareDeptId" type="deptSelect" placeholder="请选择分享部门" />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item name="shareUserId" label="分享人">
              <AvicCommonSelect v-model:value="queryForm.shareUserId" type="userSelect" placeholder="请选择分享人" />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item label="经典案例类型">
              <a-select v-model:value="queryForm.classicCaseType"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择经典案例类型">
                <a-select-option v-for="item in classicCaseTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <a-col v-bind="colLayout.cols">
            <a-form-item label="分享时间(起)">
              <a-date-picker v-model:value="queryForm.shareDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                showTime placeholder="请选择分享时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.shareDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="分享时间(止)">
              <a-date-picker v-model:value="queryForm.shareDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD" showTime
                placeholder="请选择分享时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.shareDateBegin)" />
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
      <AvicTable ref="tpmCaseShare" table-key="tpmCaseShare" :columns="columns" :row-key="record => record.id"
        :data-source="list" :loading="loading" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <a-button v-hasPermi="['tpmCaseShare:add']" title="添加" type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button v-hasPermi="['tpmCaseShare:edit']" title="编辑" type="primary" ghost @click="handleEdit">
              <template #icon>
                <edit-outlined />
              </template>
              编辑
            </a-button>
            <a-button v-hasPermi="['tpmCaseShare:del']" title="删除" danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
              @click="handleDelete(selectedRows, selectedRowKeys)">
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button v-hasPermi="['tpmCaseShare:export']" title="导出" type="primary" ghost @click="handleExport">
              <template #icon>
                <export-outlined />
              </template>
              导出
            </a-button>
            <a-button v-hasPermi="['tpmCaseShare:startFlow']" title="提交流程" type="primary" ghost
              @click="handleStartFlow(selectedRows, selectedRowKeys)">
              <template #icon>
                <avic-icon svg='avic-arrow-up-circle-line' />
              </template>
              提交流程
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-space>
            <AvicBpmFilter :allFileAuth="['tpmCaseShare:all']" :myFileAuth="['tpmCaseShare:my']"
              :defaultBpmType='queryForm.bpmType' :defaultBpmState='queryForm.bpmState' @change="changeBpmFilter" />

          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'classicCaseTypeName'">
            <a @click="handleFlowDetail(record)">
              {{ record.classicCaseTypeName }}
            </a>
          </template>
            <!-- <template v-else-if="column.dataIndex === 'note'">
            <a @click="handleOpenNote(record)">
              {{ record.note }}
            </a>
          </template> -->
          <template v-else-if="column.dataIndex === 'attach'">
            <a @click="handleAttach(record)">
              查看
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <TpmCaseShareAdd v-if="showAddModal" ref="addModal" :bpmOperatorRefresh="getList" @reloadData="getList"
      @close="showAddModal = false" />
    <!-- 编辑页面弹窗 -->
    <TpmCaseShareEdit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
      @close="showEditModal = false" />
    <!-- 备注页面弹窗 -->
    <TpmCaseShareNote v-if="showNoteModal" ref="noteModal" :form-id="formId" @reloadData="getList"
      @close="showNoteModal = false" />
    <AttachModal :attachOpen="attachOpen" :attach-form="attchForm" @closeAttach="closeAttach" />
  </div>
</template>
<script lang="ts" setup>
import type { TpmCaseShareDto } from '@/api/avic/mms/tpm/TpmCaseShareApi'; // 引入模块DTO
import { listTpmCaseShareByPage, delTpmCaseShare, exportExcel, saveFormAndStartProcess } from '@/api/avic/mms/tpm/TpmCaseShareApi'; // 引入模块API
import TpmCaseShareAdd from './TpmCaseShareAdd.vue'; // 引入添加页面组件
import TpmCaseShareEdit from './TpmCaseShareEdit.vue'; // 引入编辑页面组件
import TpmCaseShareNote from './TpmCaseShareNote.vue'; // 引入备注页面组件
import AttachModal from './AttachModal.vue';
import { default as flowUtils, startFlowByFormCode, openFlowDetail, } from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import { click } from 'dom7';
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
    title: '经典案例类型',
    dataIndex: 'classicCaseTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '分享人',
    dataIndex: 'shareUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '分享部门',
    dataIndex: 'shareDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '分享时间',
    dataIndex: 'shareDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'note',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '附件',
    dataIndex: 'attach',
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
    title: '当前处理人',
    dataIndex: 'assigneenames_',
    ellipsis: true,
    width: 130,
    align: 'left',
    fixed: 'right'
  }
];
const queryForm = ref<TpmCaseShareDto>({
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showNoteModal = ref(false); // 是否展示备注弹窗
const attachOpen = ref(false); // 附件弹窗
const attchForm = reactive({
  id: '',
  secretLevel: ''
});
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const classicCaseTypeList = ref([]); // 经典案例类型，通用代码：TPM_CLASSIC_CASE_TYPE通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'classicCaseType', lookUpType: 'TPM_CLASSIC_CASE_TYPE' }
];
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
  bpmOperatorRefresh: {
    type: Function
  }
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
  listTpmCaseShareByPage(queryParam)
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
    classicCaseTypeList.value = result.classicCaseType;
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
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {
    bpmType: queryForm.value.bpmType,
    bpmState: queryForm.value.bpmState
  };
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    billStatus: value,
    shareUserCode: value
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
function handleEdit() {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要编辑的数据！');
    return;
  }
  if (selectedRows.value[0].businessstate_ != '拟稿中' && selectedRows.value[0].businessstate_ != '') {
    proxy.$message.warning('不能编辑流转中和结束状态的数据');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
}
/** 打开流程详情页面 */
function handleFlowDetail(record) {
  if (record.id) {
    flowUtils.detailByOptions({
      formId: record.id,
      bpmOperatorRefresh: getList
    });
  }
}
/**打开note详细页 */
function handleOpenNote(record) {
  formId.value = record.id;
  showNoteModal.value = true;
}
/** 打开附件查看 */
const handleAttach = record => {
  attachOpen.value = true;
  attchForm.id = record.id;
  attchForm.secretLevel = record.secretLevel;
};
/** 关闭附件 */
const closeAttach = () => {
  attachOpen.value = false;
  attchForm.id = null;
  attchForm.secretLevel = null;
};
/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (selectedRows.value[0].businessstate_ != '拟稿中' && selectedRows.value[0].businessstate_ != '') {
    proxy.$message.warning('不能删除流转中和结束状态的数据');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmCaseShare(ids)
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
/** 提交流程 */
function handleStartFlow(rows, ids) {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要提交流程的数据！');
    return;
  }
  if (selectedRows.value[0].businessstate_ != '') {
    proxy.$message.warning('流程已存在，不能重复提交！');
    return;
  }

  startFlowByFormCode({
    formCode: 'TpmCaseShare',
    formData: selectedRows.value[0],
    callback: bpmDefinedInfo => {
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(selectedRows.value[0]);
      const params = {
        processDefId: bpmDefinedInfo.dbid || bpmDefinedInfo.value.defineId,
        formCode: 'TpmCaseShare',
        postData
      };
      saveFormAndStartProcess(params)
        .then(res => {
          if (res.success) {
            bpmResult.value = res.data;
            if (bpmResult.value) {
              openFlowDetail(bpmResult.value, props.bpmOperatorRefresh);
            }
            proxy.$message.info('提交流程成功！');
            handleQuery();
          } else {
            proxy.$message.info('提交流程失败！');
          }
        })
        .catch(() => {
          proxy.$message.info('提交流程失败！');
        });
    }
  });

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
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
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
</script>
