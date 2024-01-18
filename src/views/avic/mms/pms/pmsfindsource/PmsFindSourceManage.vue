<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="计划编号">
                  <a-input
                      v-model:value="queryForm.reqPlanNo"
                      placeholder="计划编号"
                      :allow-clear="true"
                      @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="计划名称">
                  <a-input
                      v-model:value="queryForm.reqPlanName"
                      placeholder="计划名称"
                      :allow-clear="true"
                      @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="采购方式">
                  <a-select
                      v-model:value="queryForm.procurementMethod"
                      :get-popup-container="triggerNode => triggerNode.parentNode"
                      option-filter-prop="children"
                      :show-search="true"
                      :allow-clear="true"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="采购价格">
                  <a-select
                      v-model:value="queryForm.pmsPrice"
                      :get-popup-container="triggerNode => triggerNode.parentNode"
                      option-filter-prop="children"
                      :show-search="true"
                      :allow-clear="true"
                      placeholder="请选择采购价格"
                  >
                    <a-select-option
                        v-for="item in pmsPriceList"
                        :key="item.sysLookupTlId"
                        :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="经办人">
                  <AvicCommonSelect
                      v-model:value="queryForm.handlePersonId"
                      type="userSelect"
                      placeholder="请选择经办人"
                      :defaultShowValue="queryForm.handlePersonIdAlias"
                      @callback="
                      result => {
                        queryForm.handlePersonIdAlias = result.names;
                      }
                    "
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
                      <search-outlined/>
                      查询
                    </a-button>
                    <a-button type="primary" @click="resetQuery" ghost>
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
              ref="pmsFindSource"
              table-key="pmsFindSource"
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
              rowClickSelectionType="radio"
              :pageParameter="queryParam.pageParameter"
              :total="totalPage"
              @change="handleTableChange"
              @refresh="getList"
          >
            <template #toolBarLeft>
              <a-space>
                <a-button
                    v-hasPermi="['pmsFindSource:add']"
                    title="添加"
                    type="primary"
                    @click="handleAdd"
                >
                  <template #icon>
                    <plus-outlined/>
                  </template>
                  添加
                </a-button>
                <a-button
                    v-hasPermi="['pmsFindSource:add']"
                    :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                    type="default"
                    :loading="delLoading"
                    @click="handleStartFlow"
                >
                  提交审批
                </a-button>
                <a-button
                    v-hasPermi="['pmsFindSource:edit']"
                    title="编辑"
                    type="primary"
                    ghost
                    @click="handleEdit"
                >
                  <template #icon>
                    <edit-outlined/>
                  </template>
                  编辑
                </a-button>
                <a-button
                    v-hasPermi="['pmsFindSource:del']"
                    title="删除"
                    danger
                    :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                    :loading="delLoading"
                    @click="handleDelete(selectedRows, selectedRowKeys)"
                >
                  <template #icon>
                    <delete-outlined/>
                  </template>
                  删除
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-space>
                <AvicBpmFilter
                    :allFileAuth="['pmsFindSource:all']"
                    :myFileAuth="['pmsFindSource:my']"
                    :defaultBpmType='queryForm.bpmType'
                    :defaultBpmState='queryForm.bpmState'
                    @change="changeBpmFilter"
                />
                <a-input-search
                    class="opt-btn-commonsearch"
                    style="width: 200px"
                    placeholder="请输入计划编号或采购任务编号"
                    :allow-clear="true"
                    @search="handleKeyWordQuery"
                />
              </a-space>
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'reqPlanName'">
                <a @click="handleFlowDetail(record)">
                  {{ record.reqPlanName }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'procurementRequirements'">
                <a @click="handleProcurementRequirements(record)">
                  查看
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'detail'">
                <a @click="handleDetail(record)">
                  查看
                </a>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <PmsFindSourceAdd
          v-if="showAddModal"
          ref="addModal"
          :bpmOperatorRefresh="getList"
          @reloadData="getList"
          @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <PmsFindSourceEdit
          v-if="showEditModal"
          ref="editModal"
          :form-id="formId"
          @reloadData="getList"
          @close="showEditModal = false"
          :read-only="editModalReadOnly"
      />
      <!-- 详情页面弹窗 -->
      <PmsFindSourceDetail
          v-if="showDetailModal"
          ref="detailModal"
          :form-id="formId"
          @close="showDetailModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!--子表组件-->
      <PmsFindSourceVendorManage
          key="pmsFindSourceVendorManage"
          ref="pmsFindSourceVendorManage"
          :mainId="mainId"
          :read-only="vendorReadOnly"
      />
    </AvicPane>
  </AvicSplit>
  <!-- 子表组件 -->
  <pms-procurement-requirements-detail v-if="procurementRequirementsOpen" ref="pmsProcurementRequirementsDetail"
                                       :form-id="pmsProcurementRequirementsId"
                                       @close="procurementRequirementsOpen = false"/>
</template>
<script lang="ts" setup>
import type {PmsFindSourceDto} from '@/api/avic/mms/pms/PmsFindSourceApi'; // 引入模块DTO
import {listPmsFindSourceByPage, delPmsFindSource, saveFormAndStartProcess} from '@/api/avic/mms/pms/PmsFindSourceApi'; // 引入模块API
import PmsFindSourceAdd from './PmsFindSourceAdd.vue'; // 引入添加页面组件
import PmsFindSourceEdit from './PmsFindSourceEdit.vue'; // 引入编辑页面组件
import PmsFindSourceDetail from './PmsFindSourceDetail.vue'; // 引入详情页面组件
import PmsFindSourceVendorManage from '../pmsfindsourcevendor/PmsFindSourceVendorManage.vue'; // 引入子表页面组件
import flowUtils, {startFlowByFormCode} from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import PmsProcurementRequirementsDetail
  from "@/views/avic/mms/pms/pmsprocurementinformationreleaseapplication/PmsProcurementRequirementsDetail.vue";

const {proxy} = getCurrentInstance();
const procurementRequirementsOpen = ref(false); // 附件弹窗

const layout = {
  labelCol: {flex: '120px'},
  wrapperCol: {flex: '1'}
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
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    title: '采购价格',
    dataIndex: 'pmsPriceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '确定供应商理由',
    dataIndex: 'vendorReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '候选供应商审查方式',
    dataIndex: 'vendorReviewMode',
    ellipsis: true,
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
    title: '详细',
    dataIndex: 'detail',
    key: 'detail',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '经办人',
    dataIndex: 'handlePersonIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
const queryForm = ref<PmsFindSourceDto>({
  bpmState: 'all',
  bpmType: 'all'
}); // 高级查询对象
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
const editModalReadOnly = ref(false); // 编辑弹窗只读
const showDetailModal = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); //表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); //选中数据主键集合
const selectedRows = ref([]); //选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const procurementMethodList = ref([]); // 采购方式通用代码
const pmsPriceList = ref([]); // 采购价格通用代码
const secretLevelList = ref([]); // 密级通用代码
const supplierSelectionCriteriaList = ref([]); // 供应商中选标准通用代码
const pmsProcurementRequirementsId = ref(''); // 当前行数据id
const lookupParams = [
  {fieldName: 'procurementMethod', lookUpType: 'PMS_PROCUREMENT_METHOD'},
  {fieldName: 'pmsPrice', lookUpType: 'PMS_PRICE'},
  {fieldName: 'supplierSelectionCriteria', lookUpType: 'PMS_SUPPLIER_SELECTION_CRITERIA'}
];
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
});
const vendorReadOnly = computed(() => {
  return selectedRows.value.filter(row => row.bpmState && row.bpmState !== 'start')?.length > 0;
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listPmsFindSourceByPage(queryParam)
      .then(response => {
        list.value = response.data.result;
        totalPage.value = response.data.pageParameter.totalCount;
        // 设置表格初始选中项
        if (list.value.length > 0) {
          selectedRowKeys.value = [list.value[0]['id']];
          selectedRows.value = [list.value[0]];
        } else {
          selectedRowKeys.value = [];
          selectedRows.value = [];
        }
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
    pmsPriceList.value = result.pmsPrice;
    supplierSelectionCriteriaList.value = result.supplierSelectionCriteria;
  });
}

/** 根据流程状态及发起人查询数据 */
function changeBpmFilter({bpmType, bpmState}) {
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
    reqPlanNo: value,
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
  if (selectedRows.value.filter(row => row.bpmState && row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以编辑！');
    return;
  }
  formId.value = selectedRows.value[0].id;
  editModalReadOnly.value = false;
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

/** 打开详情页面 */
function handleDetail(record) {
  if (record.id) {
    formId.value = record.id;
    editModalReadOnly.value = true;
    showEditModal.value = true;
  }
}

/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState && row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确定删除已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delPmsFindSource(ids)
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
      delLoading.value = true;
      startFlowByFormCode({
        formCode: 'PmsFindSource',
        formData: selectedRows.value[0],
        callback: bpmDefinedInfo => {
          // 处理数据
          const postData = proxy.$lodash.cloneDeep(selectedRows.value[0]);
          const params = {
            processDefId: bpmDefinedInfo.dbid || bpmDefinedInfo.value.defineId,
            formCode: 'PmsFindSource',
            postData
          };
          saveFormAndStartProcess(params)
              .then(res => {
                if (res.success) {
                  handleFlowDetail(postData);
                  proxy.$message.info('提交流程成功！');
                  handleQuery();
                } else {
                  proxy.$message.info('提交流程失败！');
                }
                delLoading.value = false;
              })
              .catch((error) => {
                proxy.$message.warning(error.message);
                proxy.$message.info('提交流程失败！');
                delLoading.value = false;
              });
        }
      });
    }
  });
}

/** 查看 */
function handleProcurementRequirements(record) {
  pmsProcurementRequirementsId.value = record.pmsProcurementRequirementsId;
  procurementRequirementsOpen.value = true;
}

</script>

