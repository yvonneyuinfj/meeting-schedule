<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="PDM归档编号">
              <a-input
                v-model:value="queryForm.pdmArchiveNumber"
                placeholder="请输入PDM归档编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="文件名称">
              <a-input
                v-model:value="queryForm.fileName"
                placeholder="请输入文件名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="上传人">
              <a-input
                v-model:value="queryForm.uplink"
                placeholder="请输入上传人"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="上传时间(起)">
              <a-date-picker
                v-model:value="queryForm.uploadTimeBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择上传时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.uploadTimeEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="上传时间(止)">
              <a-date-picker
                v-model:value="queryForm.uploadTimeEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择上传时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.uploadTimeBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否审批">
              <a-input
                v-model:value="queryForm.ynApprover"
                placeholder="请输入是否审批"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            style="margin-left: auto"
          >
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
      <AvicTable
        ref="pmsDeliveryDetailDesigner"
        table-key="pmsDeliveryDetailDesigner"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['pmsDeliveryDetailDesigner:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
<!--            <a-button-->
<!--              v-hasPermi="['pmsDeliveryDetailDesigner:edit']"-->
<!--              title="编辑"-->
<!--              type="primary"-->
<!--              ghost-->
<!--              @click="handleEdit"-->
<!--            >-->
<!--              <template #icon>-->
<!--                <edit-outlined />-->
<!--              </template>-->
<!--              编辑-->
<!--            </a-button>-->
            <a-button
              v-hasPermi="['pmsDeliveryDetailDesigner:commitProcess']"
              title="提交审批"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="approvalLoading"
              @click="handleApproval(selectedRows, selectedRowKeys)">
              提交审批
            </a-button>
            <a-button
              v-hasPermi="['pmsDeliveryDetailDesigner:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRows, selectedRowKeys)"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
<!--            <a-button-->
<!--              v-hasPermi="['pmsDeliveryDetailDesigner:export']"-->
<!--              title="导出"-->
<!--              type="primary"-->
<!--              ghost-->
<!--              @click="handleExport">-->
<!--              <template #icon>-->
<!--                 <export-outlined />-->
<!--              </template>-->
<!--              导出-->
<!--            </a-button>-->
          </a-space>
        </template>
        <template #toolBarRight>
          <a-space>
            <AvicBpmFilter
              :allFileAuth="['pmsDeliveryDetailDesigner:all']"
              :myFileAuth="['pmsDeliveryDetailDesigner:my']"
              :defaultBpmType = 'queryForm.bpmType'
              :defaultBpmState = 'queryForm.bpmState'
              @change="changeBpmFilter"
            />
            <a-input-search
              class="opt-btn-commonsearch"
              style="width: 200px"
              placeholder="请输入计划ID或PDM归档编号"
              :allow-clear="true"
              @search="handleKeyWordQuery"
            />
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'secretLevelName' && record.bpmState != null">
            <a @click="handleFlowDetail(record)">
              {{ record.secretLevelName }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'attach'">
            <a @click="handleAttach(record)">
              查看
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <PmsDeliveryDetailDesignerAdd
      v-if="showAddModal"
      ref="addModal"
      :mainId="mainId"
      :bpmOperatorRefresh="getList"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
<!--    <PmsDeliveryDetailDesignerEdit-->
<!--      v-if="showEditModal"-->
<!--      ref="editModal"-->
<!--      :form-id="formId"-->
<!--      @reloadData="getList"-->
<!--      @close="showEditModal = false"-->
<!--    />-->
    <AttachModal
        :attachOpen="attachOpen"
        :attach-form="attchForm"
        @closeAttach="closeAttach"
    />
  </div>
</template>
<script lang="ts" setup>
import type { PmsDeliveryDetailDesignerDto } from '@/api/avic/mms/pms/PmsDeliveryDetailDesignerApi'; // 引入模块DTO
import {
  listPmsDeliveryDetailDesignerByPage,
  // exportExcel ,
  delPmsDeliveryDetailDesigner,
  approvalPmsDeliveryDetailDesigner
} from '@/api/avic/mms/pms/PmsDeliveryDetailDesignerApi'; // 引入模块API
import PmsDeliveryDetailDesignerAdd from './PmsDeliveryDetailDesignerAdd.vue'; // 引入添加页面组件
// import PmsDeliveryDetailDesignerEdit from './PmsDeliveryDetailDesignerEdit.vue'; // 引入编辑页面组件
import flowUtils, { startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import AttachModal from './AttachModal.vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});
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
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '计划ID',
  //   dataIndex: 'pmsPlanId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: 'PDM归档编号',
    dataIndex: 'pdmArchiveNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '文件名称',
    dataIndex: 'fileName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '上传人',
    dataIndex: 'uplink',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否审批',
    dataIndex: 'ynApproverName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '附件',
    dataIndex: 'attach',
    key: 'attach',
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
const queryForm = ref<PmsDeliveryDetailDesignerDto>({
  bpmState: 'all',
  bpmType: 'all',
  pmsPlanId: props.mainId
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
// const showEditModal = ref(false); // 是否展示编辑弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
// const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const approvalLoading = ref(false); // 提交流程按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const attachOpen = ref(false); // 附件弹窗
const attchForm = reactive({
  id: '',
  secretLevel: ''
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.pmsPlanId = props.mainId ? props.mainId : '-1';
  listPmsDeliveryDetailDesignerByPage(queryParam)
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
    pmsPlanId: value,
    pdmArchiveNumber: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  showAddModal.value = true;
}
/** 编辑 */
// function handleEdit() {
//   if (selectedRows.value.length !== 1) {
//     proxy.$message.warning('请选择一条要编辑的数据！');
//     return;
//   }
//   formId.value = selectedRows.value[0].id;
//   showEditModal.value = true;
// }
/** 打开流程详情页面 */
function handleFlowDetail(record) {
  if (record.id) {
    flowUtils.detailByOptions({
      formId: record.id,
      bpmOperatorRefresh: getList
    });
  }
}
/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有拟稿中和未提交审批的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delPmsDeliveryDetailDesigner(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
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
/** 导出 */
// function handleExport() {
//   proxy.$confirm({
//     title: '确认导出数据吗?',
//     okText: '确定',
//     cancelText: '取消',
//     onOk: () => {
//       loading.value = true;
//       queryParam.searchParams = queryForm.value;
//       exportExcel(queryParam).then(() => {
//         loading.value = false;
//         proxy.$message.info('导出成功！');
//       });
//     }
//   });
// }
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

/** 提交审批 */
const handleApproval = (rows, ids) => {
  if (ids.length !== 1) {
    proxy.$message.warning('请选择要提交审批的数据！');
    return;
  }
  // if (rows.filter(row => row.editUserId !== userStore.userInfo.id)?.length > 0) {
  //   proxy.$message.warning('只有自己的数据才可以提交！');
  //   return;
  // }
  if (rows.filter(row => row.bpmState !== null )?.length > 0) {
    proxy.$message.warning('只有未提交的数据才可以提交审批！');
    return;
  }
  proxy.$confirm({
    title: '确认要提交审批选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      approvalLoading.value = true;
      getBpmDefine(rows[0]);
    }
  });
};

function getBpmDefine(row){
  startFlowByFormCode({
    formCode: 'PmsDeliveryDetailDesigner',
    formData: row,
    callback: bpmDefinedInfo => {
      approval(bpmDefinedInfo, row);
    }
  });
}

const approval = (bpmDefinedInfo, row) => {
  const param = {
    processDefId: bpmDefinedInfo.dbid,
    formCode: 'PmsDeliveryDetailDesigner',
    postData: row
  };
  approvalPmsDeliveryDetailDesigner(param).then(res => {
    if (res.success) {
      proxy.$message.success('提交成功');
      getList();
      handleFlowDetail(row);
      approvalLoading.value = false;
    } else {
      approvalLoading.value = false;
    }
  }).catch(() => {
    approvalLoading.value = false;
  });
};

watch(
    () => props.mainId,
    newVal => {
      if (newVal) {
        getList(); // 查询表格数据
      } else {
        selectedRowKeys.value = []; // 清空选中
        selectedRows.value = [];
        list.value = [];
        totalPage.value = 0;
      }
    },
    { immediate: true }
);
</script>
