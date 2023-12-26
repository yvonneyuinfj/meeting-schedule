<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form ref="formRef" :model="queryForm" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="科研任务名称">
              <a-input
                  v-model:value="queryForm.pmsPlanId"
                  :allow-clear="true"
                  placeholder="请输入科研任务名称"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
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
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="采购计划号">
              <a-input
                  v-model:value="queryForm.reqPlanNo"
                  :allow-clear="true"
                  placeholder="请输入采购计划号"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
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
            <a-form-item label="采购方式">
              <a-select
                  v-model:value="queryForm.procurementMethod"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择采购方式"
              >
                <a-select-option
                    v-for="item in procurementMethodList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="单一来源原因">
              <a-input
                  v-model:value="queryForm.singleSourceReason"
                  :allow-clear="true"
                  placeholder="请输入单一来源原因"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="供应商中选标准">
              <a-select
                  v-model:value="queryForm.supplierSelectionCriteria"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择供应商中选标准"
              >
                <a-select-option
                    v-for="item in supplierSelectionCriteriaList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--          <a-col v-show="advanced" v-bind="colLayout.cols">-->
          <!--            <a-form-item label="采购阶段">-->
          <!--              <a-select-->
          <!--                  v-model:value="queryForm.procureStage"-->
          <!--                  :allow-clear="true"-->
          <!--                  :get-popup-container="triggerNode => triggerNode.parentNode"-->
          <!--                  :show-search="true"-->
          <!--                  option-filter-prop="children"-->
          <!--                  placeholder="请选择采购阶段"-->
          <!--              >-->
          <!--                <a-select-option-->
          <!--                    v-for="item in procureStageList"-->
          <!--                    :key="item.sysLookupTlId"-->
          <!--                    :value="item.lookupCode"-->
          <!--                >-->
          <!--                  {{ item.lookupName }}-->
          <!--                </a-select-option>-->
          <!--              </a-select>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="是否为加工类">
              <a-select
                  v-model:value="queryForm.processingType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择是否为加工类"
              >
                <a-select-option
                    v-for="item in processingTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="本次发布信息密级">
              <a-select
                  v-model:value="queryForm.publishInformationSecurityLevel"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择本次发布信息密级"
              >
                <a-select-option
                    v-for="item in publishInformationSecurityLevelList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" v-bind="colLayout.cols">
            <a-form-item label="本项采购任务密级">
              <a-select
                  v-model:value="queryForm.procurementTaskClassification"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择本项采购任务密级"
              >
                <a-select-option
                    v-for="item in procurementTaskClassificationList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--          <a-col v-show="advanced" v-bind="colLayout.cols">-->
          <!--            <a-form-item label="产品和服务类别">-->
          <!--              <a-input-->
          <!--                  v-model:value="queryForm.productServiceCategory"-->
          <!--                  :allow-clear="true"-->
          <!--                  placeholder="请输入产品和服务类别"-->
          <!--                  @pressEnter="handleQuery"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
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
          ref="pmsProcurementRequirementsSelect"
          :columns="columns"
          :customRow="customRow"
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
          :show-table-setting="false"
          :total="totalPage"
          table-key="pmsProcurementRequirementsSelect"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template #toolBarRight>
          <a-input-search
              :allow-clear="true"
              class="opt-btn-commonsearch"
              placeholder="请输入科研任务名称或采购任务编号"
              style="width: 200px"
              @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PmsProcurementRequirementsDto } from '@/api/avic/mms/pms/PmsProcurementRequirementsApi'; // 引入模块DTO
import { listPmsProcurementRequirementsByPage } from '@/api/avic/mms/pms/PmsProcurementRequirementsApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const pmsProcurementRequirementsSelect = ref();
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
    title: '科研任务名称',
    dataIndex: 'pmsPlanId',
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
    title: '采购计划名称',
    dataIndex: 'reqPlanName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购方式',
    dataIndex: 'procurementMethodName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单一来源原因',
    dataIndex: 'singleSourceReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目要求',
    dataIndex: 'projectRequirements',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商要求',
    dataIndex: 'supplierRequirements',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '其他要求',
    dataIndex: 'otherRequirements',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '响应文件的编制要求',
    dataIndex: 'preparationRequirements',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '响应文件的封装和递交要求',
    dataIndex: 'packagingSubmissionRequirements',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商中选标准',
    dataIndex: 'supplierSelectionCriteriaName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '采购阶段',
  //   dataIndex: 'procureStageName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  {
    title: '是否为加工类',
    dataIndex: 'processingTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '本次发布信息密级',
    dataIndex: 'publishInformationSecurityLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '本项采购任务密级',
    dataIndex: 'procurementTaskClassificationName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '产品和服务类别',
    dataIndex: 'productServiceCategoryName',
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
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    visible: false,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<PmsProcurementRequirementsDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const procurementMethodList = ref([]); // 采购方式通用代码
const supplierSelectionCriteriaList = ref([]); // 供应商中选标准通用代码
// const procureStageList = ref([]); // 采购阶段通用代码
const processingTypeList = ref([]); // 是否为加工类通用代码
const publishInformationSecurityLevelList = ref([]); // 本次发布信息密级通用代码
const procurementTaskClassificationList = ref([]); // 本项采购任务密级通用代码
const lookupParams = [
  { fieldName: 'procurementMethod', lookUpType: 'PMS_PROCUREMENT_METHOD' },
  { fieldName: 'supplierSelectionCriteria', lookUpType: 'PMS_SUPPLIER_SELECTION_CRITERIA' },
  // { fieldName: 'procureStage', lookUpType: 'PMS_PROCURE_STAGE' },
  { fieldName: 'processingType', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'publishInformationSecurityLevel', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' },
  { fieldName: 'procurementTaskClassification', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' }
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listPmsProcurementRequirementsByPage(queryParam)
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

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    procurementMethodList.value = result.procurementMethod;
    supplierSelectionCriteriaList.value = result.supplierSelectionCriteria;
    // procureStageList.value = result.procureStage;
    processingTypeList.value = result.processingType;
    publishInformationSecurityLevelList.value = result.publishInformationSecurityLevel;
    procurementTaskClassificationList.value = result.procurementTaskClassification;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
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
  queryForm.value = {};
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

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  // 传出选中项
  $emit('select', selectedRows.value);
}

/** 表格排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

/** 行双击事件 */
function customRow(record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
</script>


