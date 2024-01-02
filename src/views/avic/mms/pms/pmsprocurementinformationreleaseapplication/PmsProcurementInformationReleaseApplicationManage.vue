<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form ref="formRef" :model="queryForm" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购任务编号">
              <a-input
                  v-model:value="queryForm.pmsTaskNo"
                  :allow-clear="true"
                  placeholder="请输入采购任务编号"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购计划号">
              <a-input
                  v-model:value="queryForm.reqPlanNo"
                  :allow-clear="true"
                  placeholder="请输入采购计划号"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购计划名称">
              <a-input
                  v-model:value="queryForm.reqPlanName"
                  :allow-clear="true"
                  placeholder="请输入采购计划名称"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="所属项目课题号">
              <a-input
                  v-model:value="queryForm.projectTopicNumber"
                  :allow-clear="true"
                  placeholder="请输入所属项目课题号"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="密级">
              <a-select
                  v-model:value="queryForm.secretLevel"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
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
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="产品类型">
              <a-select
                  v-model:value="queryForm.productType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品类型"
              >
                <a-select-option
                    v-for="item in productTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="产品需求分类">
              <a-select
                  v-model:value="queryForm.productReqClassify"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品需求分类"
              >
                <a-select-option
                    v-for="item in productReqClassifyList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="产品和服务类别">
              <a-select
                  v-model:value="queryForm.productServiceCategory"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品和服务类别"
              >
                <a-select-option
                    v-for="item in productServiceCategoryList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="采购阶段">
              <a-select
                  v-model:value="queryForm.procureStage"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择采购阶段"
              >
                <a-select-option
                    v-for="item in procureStageList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="预算金额">
              <a-input
                  v-model:value="queryForm.budgetAmount"
                  :allow-clear="true"
                  placeholder="请输入预算金额"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="需求文件归档编号">
              <a-input
                  v-model:value="queryForm.requirementsDocumentArchivingCode"
                  :allow-clear="true"
                  placeholder="请输入需求文件归档编号"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
              style="margin-left: auto"
              v-bind="colLayout.cols"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined/>
                  查询
                </a-button>
                <a-button ghost type="primary" @click="resetQuery">
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button style="margin: 0" type="link" @click="toggleAdvanced">
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
          ref="pmsProcurementInformationReleaseApplication"
          :columns="columns"
          :data-source="list"
          :loading="loading"
          :pageParameter="queryParam.pageParameter"
          :row-key="record => record.id"
          :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
          :total="totalPage"
          table-key="pmsProcurementInformationReleaseApplication"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
                v-hasPermi="['pmsProcurementInformationReleaseApplication:add']"
                title="添加"
                type="primary"
                @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              添加
            </a-button>
            <a-button :loading="approvalLoading" :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                      title="提交流程" @click="handleStartFlow">
              提交流程
            </a-button>
            <a-button
                v-hasPermi="['pmsProcurementInformationReleaseApplication:edit']"
                title="编辑"
                :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                @click="handleEdit"
            >
              <template #icon>
                <edit-outlined/>
              </template>
              编辑
            </a-button>
            <a-button
                v-hasPermi="['pmsProcurementInformationReleaseApplication:del']"
                :loading="delLoading"
                :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                danger
                title="删除"
                @click="handleDelete(selectedRows, selectedRowKeys)"
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
            <!--            <a-button-->
            <!--              v-hasPermi="['pmsProcurementInformationReleaseApplication:export']"-->
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
                :allFileAuth="['pmsProcurementInformationReleaseApplication:all']"
                :defaultBpmState='queryForm.bpmState'
                :defaultBpmType='queryForm.bpmType'
                :myFileAuth="['pmsProcurementInformationReleaseApplication:my']"
                @change="changeBpmFilter"
            />
            <a-input-search
                :allow-clear="true"
                class="opt-btn-commonsearch"
                placeholder="请输入计划ID或采购任务编号"
                style="width: 200px"
                @search="handleKeyWordQuery"
            />
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'reqPlanName' && record.bpmState !== null">
            <a @click="handleFlowDetail(record)">
              {{ record.reqPlanName }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'procurementRequirements'">
            <a @click="handleAttach(record)">
              查看
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
    <PmsProcurementInformationReleaseApplicationAdd
        v-if="showAddModal"
        ref="addModal"
        :bpmOperatorRefresh="getList"
        @close="showAddModal = false"
        @reloadData="getList"
    />
    <!-- 编辑页面弹窗 -->
    <PmsProcurementInformationReleaseApplicationEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @close="showEditModal = false"
        @reloadData="getList"
    />
    <!-- 子表组件 -->
    <pms-delivery-detail-tab-manage v-if="attachOpen" ref="pmsDeliveryDetailTabManage" :form-id="pmsPlanId"
                                    @close="attachOpen = false"/>
  </div>
</template>
<script lang="ts" setup>
import type {
  PmsProcurementInformationReleaseApplicationDto
} from '@/api/avic/mms/pms/PmsProcurementInformationReleaseApplicationApi'; // 引入模块DTO
import {
  delPmsProcurementInformationReleaseApplication,
  exportExcel,
  saveFormAndStartProcess,
  listPmsProcurementInformationReleaseApplicationByPage
} from '@/api/avic/mms/pms/PmsProcurementInformationReleaseApplicationApi'; // 引入模块API
import PmsProcurementInformationReleaseApplicationAdd from './PmsProcurementInformationReleaseApplicationAdd.vue'; // 引入添加页面组件
import PmsProcurementInformationReleaseApplicationEdit from './PmsProcurementInformationReleaseApplicationEdit.vue'; // 引入编辑页面组件
import flowUtils, { openFlowDetail, startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import PmsDeliveryDetailTabManage from './PmsDeliveryDetailTabManage.vue';

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
    title: '采购计划名称',
    dataIndex: 'reqPlanName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购任务编号',
    dataIndex: 'pmsTaskNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购计划号',
    dataIndex: 'reqPlanNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '所属项目课题号',
    dataIndex: 'projectTopicNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '产品类型',
    dataIndex: 'productTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '产品需求分类',
    dataIndex: 'productReqClassifyName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '产品和服务类别',
    dataIndex: 'productServiceCategoryName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '采购阶段',
    dataIndex: 'procureStageName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '预算金额',
    dataIndex: 'budgetAmount',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求文件归档编号',
    dataIndex: 'requirementsDocumentArchivingCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购要求',
    dataIndex: 'procurementRequirements',
    key: 'procurementRequirements',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '交付明细',
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
const queryForm = ref<PmsProcurementInformationReleaseApplicationDto>({
  bpmState: 'all',
  bpmType: 'my'
});
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  }
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
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const productTypeList = ref([]); // 产品类型通用代码
const productReqClassifyList = ref([]); // 产品需求分类通用代码
const productServiceCategoryList = ref([]); // 产品和服务类别通用代码
const procureStageList = ref([]); // 采购阶段通用代码
const qualificationRequirementsList = ref([]); // 资质要求通用代码
const professionalFieldList = ref([]); // 专业领域通用代码
const dockingWorkdaysList = ref([]); // 对接工作日通用代码
const lookupParams = [
  { fieldName: 'productType', lookUpType: 'PMS_PRODUCT_TYPE' },
  { fieldName: 'productReqClassify', lookUpType: 'PMS_PRODUCT_REQ_CLASSIFY' },
  { fieldName: 'productServiceCategory', lookUpType: 'PMS_PRODUCT_SERVICE_CATEGORY' },
  { fieldName: 'procureStage', lookUpType: 'PMS_PROCURE_STAGE' },
  { fieldName: 'qualificationRequirements', lookUpType: 'PMS_QUALIFICATION_REQUIREMENTS' },
  { fieldName: 'professionalField', lookUpType: 'PMS_PROFESSIONAL_FIELD' },
  { fieldName: 'dockingWorkdays', lookUpType: 'PMS_DOCKING_WORKDAYS' }
];
const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
const attachOpen = ref(false); // 附件弹窗
const pmsPlanId = ref(''); // 当前行数据id
const approvalLoading = ref(false);

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
  listPmsProcurementInformationReleaseApplicationByPage(queryParam)
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
    productTypeList.value = result.productType;
    productReqClassifyList.value = result.productReqClassify;
    productServiceCategoryList.value = result.productServiceCategory;
    procureStageList.value = result.procureStage;
    qualificationRequirementsList.value = result.qualificationRequirements;
    professionalFieldList.value = result.professionalField;
    dockingWorkdaysList.value = result.dockingWorkdays;
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
    pmsTaskNo: value
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
  if (selectedRows.value.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有拟稿中和未提交的数据才可以编辑！');
    return;
  }
  if (selectedRows.value.filter(row => row.createdBy !== proxy.$getLoginUser().id)?.length > 0) {
    proxy.$message.warning('只有自己的数据才可以编辑！');
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

/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有拟稿中和未提交的数据才可以删除！');
    return;
  }
  if (rows.filter(row => row.createdBy !== proxy.$getLoginUser().id)?.length > 0) {
    proxy.$message.warning('只有自己的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delPmsProcurementInformationReleaseApplication(ids)
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


/** 提交流程 */
function handleStartFlow() {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要提交流程的数据！');
    return;
  }
  if (selectedRows.value[0].businessstate_ != '') {
    proxy.$message.warning('流程已存在，不能重复提交！');
    return;
  }
  proxy.$confirm({
    title: '确定提交流程吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      approvalLoading.value = true;
      startFlowByFormCode({
        formCode: 'PmsProcurementInformationReleaseApplication',
        formData: selectedRows.value[0],
        callback: bpmDefinedInfo => {
          // 处理数据
          const postData = proxy.$lodash.cloneDeep(selectedRows.value[0]);
          const params = {
            processDefId: bpmDefinedInfo.dbid || bpmDefinedInfo.value.defineId,
            formCode: 'PmsProcurementInformationReleaseApplication',
            postData
          };
          saveFormAndStartProcess(params)
              .then(res => {
                if (res.success) {
                  bpmResult.value = res.data;
                  // if (bpmResult.value) {
                  //   openFlowDetail(bpmResult.value, props.bpmOperatorRefresh);
                  // }
                  handleFlowDetail(postData);
                  proxy.$message.info('提交流程成功！');
                  handleQuery();
                } else {
                  proxy.$message.info('提交流程失败！');
                }
                approvalLoading.value = false;
              })
              .catch((error) => {
                proxy.$message.warning(error.message);
                proxy.$message.info('提交流程失败！');
                approvalLoading.value = false;
              });
        }
      });
    }
  });
}

/** 查看 */
function handleAttach(record) {
  pmsPlanId.value = record.pmsPlanId;
  attachOpen.value = true;
}
</script>
