<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
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
              <!--              <a-col v-bind="colLayout.cols">-->
              <!--                <a-form-item label="合并标识">-->
              <!--                  <a-select-->
              <!--                      v-model:value="queryForm.mergeFlag"-->
              <!--                      :get-popup-container="triggerNode => triggerNode.parentNode"-->
              <!--                      option-filter-prop="children"-->
              <!--                      :show-search="true"-->
              <!--                      :allow-clear="true"-->
              <!--                      placeholder="请选择合并标识"-->
              <!--                  >-->
              <!--                    <a-select-option-->
              <!--                        v-for="item in mergeFlagList"-->
              <!--                        :key="item.sysLookupTlId"-->
              <!--                        :value="item.lookupCode"-->
              <!--                    >-->
              <!--                      {{ item.lookupName }}-->
              <!--                    </a-select-option>-->
              <!--                  </a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
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
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="主责单位">
                  <AvicCommonSelect
                      v-model:value="queryForm.reqDeptId"
                      :defaultShowValue="queryForm.reqDeptIdAlias"
                      placeholder="请选择主责单位"
                      type="deptSelect"
                      @callback="result => {
                  queryForm.reqDeptIdAlias = result.names;
                }
                  "
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="设计员">
                  <AvicCommonSelect
                      v-model:value="queryForm.reqUserId"
                      :defaultShowValue="queryForm.reqUserIdAlias"
                      placeholder="请选择设计员"
                      type="userSelect"
                      @callback="result => {
                  queryForm.reqUserIdAlias = result.names;
                }
                  "
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="采购负责人">
                  <AvicCommonSelect
                      v-model:value="queryForm.managerUserId"
                      :defaultShowValue="queryForm.managerUserIdAlias"
                      placeholder="请选择采购负责人"
                      type="userSelect"
                      @callback="result => {
                  queryForm.managerUserIdAlias = result.names;
                }
                  "
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="对接人">
                  <AvicCommonSelect
                      v-model:value="queryForm.abutmentUserId"
                      :defaultShowValue="queryForm.abutmentUserIdAlias"
                      placeholder="请选择对接人"
                      type="userSelect"
                      @callback="result => {
                  queryForm.abutmentUserIdAlias = result.names;
                }
                  "
                  />
                </a-form-item>
              </a-col>
              <!--              <a-col v-bind="colLayout.cols" v-show="advanced">-->
              <!--                <a-form-item label="产品和服务类别">-->
              <!--                  <a-input-->
              <!--                      v-model:value="queryForm.productServiceCategory"-->
              <!--                      placeholder="请输入产品和服务类别"-->
              <!--                      :allow-clear="true"-->
              <!--                      @pressEnter="handleQuery"-->
              <!--                  />-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
<!--              <a-col v-show="advanced" v-bind="colLayout.cols">-->
<!--                <a-form-item label="产品需求分类">-->
<!--                  <a-input-->
<!--                      v-model:value="queryForm.productReqClassify"-->
<!--                      :allow-clear="true"-->
<!--                      placeholder="请输入产品需求分类"-->
<!--                      @pressEnter="handleQuery"-->
<!--                  />-->
<!--                </a-form-item>-->
<!--              </a-col>-->
<!--              <a-col v-show="advanced" v-bind="colLayout.cols">-->
<!--                <a-form-item label="产品类型">-->
<!--                  <a-input-->
<!--                      v-model:value="queryForm.productType"-->
<!--                      :allow-clear="true"-->
<!--                      placeholder="请输入产品类型"-->
<!--                      @pressEnter="handleQuery"-->
<!--                  />-->
<!--                </a-form-item>-->
<!--              </a-col>-->
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
                <a-form-item label="申请日期(起)">
                  <a-date-picker
                      v-model:value="queryForm.applyDateBegin"
                      :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.applyDateEnd)"
                      format="YYYY-MM-DD"
                      placeholder="请选择申请日期(起)"
                      value-format="YYYY-MM-DD"
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="申请日期(止)">
                  <a-date-picker
                      v-model:value="queryForm.applyDateEnd"
                      :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.applyDateBegin)"
                      format="YYYY-MM-DD"
                      placeholder="请选择申请日期(止)"
                      value-format="YYYY-MM-DD"
                  />
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
                <a-form-item label="采购部门">
                  <AvicCommonSelect
                      v-model:value="queryForm.procureDeptId"
                      :defaultShowValue="queryForm.procureDeptIdAlias"
                      placeholder="请选择采购部门"
                      type="deptSelect"
                      @callback="result => {
                  queryForm.procureDeptIdAlias = result.names;
                }
                  "
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="采购主管">
                  <AvicCommonSelect
                      v-model:value="queryForm.procureUserId"
                      :defaultShowValue="queryForm.procureUserIdAlias"
                      placeholder="请选择采购主管"
                      type="userSelect"
                      @callback="result => {
                  queryForm.procureUserIdAlias = result.names;
                }
                  "
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="交付日期(起)">
                  <a-date-picker
                      v-model:value="queryForm.deliveryDateBegin"
                      :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.deliveryDateEnd)"
                      format="YYYY-MM-DD"
                      placeholder="请选择交付日期(起)"
                      value-format="YYYY-MM-DD"
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="交付日期(止)">
                  <a-date-picker
                      v-model:value="queryForm.deliveryDateEnd"
                      :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.deliveryDateBegin)"
                      format="YYYY-MM-DD"
                      placeholder="请选择交付日期(止)"
                      value-format="YYYY-MM-DD"
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="拟寻源方式">
                  <a-select
                      v-model:value="queryForm.proposedSourcingMethod"
                      :allow-clear="true"
                      :get-popup-container="triggerNode => triggerNode.parentNode"
                      :show-search="true"
                      option-filter-prop="children"
                      placeholder="请选择拟寻源方式"
                  >
                    <a-select-option
                        v-for="item in proposedSourcingMethodList"
                        :key="item.sysLookupTlId"
                        :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="指定供应商">
                  <a-input
                      v-model:value="queryForm.appointVendorId"
                      :allow-clear="true"
                      placeholder="请输入指定供应商"
                      @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="技术文件完成日期(起)">
                  <a-date-picker
                      v-model:value="queryForm.techDocCompleteDateBegin"
                      :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.techDocCompleteDateEnd)"
                      format="YYYY-MM-DD"
                      placeholder="请选择技术文件完成日期(起)"
                      value-format="YYYY-MM-DD"
                  />
                </a-form-item>
              </a-col>
              <a-col v-show="advanced" v-bind="colLayout.cols">
                <a-form-item label="技术文件完成日期(止)">
                  <a-date-picker
                      v-model:value="queryForm.techDocCompleteDateEnd"
                      :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.techDocCompleteDateBegin)"
                      format="YYYY-MM-DD"
                      placeholder="请选择技术文件完成日期(止)"
                      value-format="YYYY-MM-DD"
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
              ref="pmsPlan"
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
              table-key="pmsPlan"
              @change="handleTableChange"
              @refresh="getList"
          >
            <template #toolBarRight>
              <a-input-search
                  :allow-clear="true"
                  class="opt-btn-commonsearch"
                  placeholder="请输入采购任务编号或采购计划号"
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
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <pms-delivery-detail-tab-manage key="pmsDeliveryDetailTabManage" ref="pmsDeliveryDetailTabManage"
                                      :mainId="mainId"/>
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import type { PmsPlanDto } from '@/api/avic/mms/pms/PmsPlanApi'; // 引入模块DTO
import { listPmsPlanByPage } from '@/api/avic/mms/pms/PmsPlanApi'; // 引入模块API
import PmsDeliveryDetailTabManage from './PmsDeliveryDetailTabManage.vue'; // 引入子表页面组件
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
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '合并标识',
  //   dataIndex: 'mergeFlagName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
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
    title: '主责单位',
    dataIndex: 'reqDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '设计员',
  //   dataIndex: 'reqUserIdAlias',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '采购负责人',
    dataIndex: 'managerUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '对接人',
  //   dataIndex: 'abutmentUserIdAlias',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '产品和服务类别',
  //   dataIndex: 'productServiceCategory',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '产品需求分类',
  //   dataIndex: 'productReqClassify',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '产品类型',
  //   dataIndex: 'productType',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '所属项目课题号',
  //   dataIndex: 'projectTopicNumber',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '申请日期',
  //   dataIndex: 'applyDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '预算金额',
  //   dataIndex: 'budgetAmount',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '采购部门',
  //   dataIndex: 'procureDeptIdAlias',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '采购主管',
  //   dataIndex: 'procureUserIdAlias',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '交付日期',
  //   dataIndex: 'deliveryDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '拟寻源方式',
  //   dataIndex: 'proposedSourcingMethodName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '指定供应商',
  //   dataIndex: 'appointVendorId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '技术文件完成日期',
  //   dataIndex: 'techDocCompleteDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  {
    title: '计划类型',
    dataIndex: 'planTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
];
const queryForm = ref<PmsPlanDto>({});
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
const selectedRows = ref([]); //选中行集合
const loading = ref(false);
const totalPage = ref(0);
// const mergeFlagList = ref([]); // 合并标识通用代码
const proposedSourcingMethodList = ref([]); // 拟寻源方式通用代码
const planStatusList = ref([]); // 计划状态通用代码
const lookupParams = [
  // { fieldName: 'mergeFlag', lookUpType: 'PMS_MERGE_FLAG' },
  { fieldName: 'proposedSourcingMethod', lookUpType: 'PMS_PROPOSED_SOURCING_METHOD' },
  { fieldName: 'planStatus', lookUpType: 'PMS_PLAN_STATUS' }
];
// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
});

/** 查询数据  */
function getList() {
  queryParam.searchParams.managerUserId = proxy.$getLoginUser().id;
  queryParam.searchParams.planStatus = '5';
  // queryParam.searchParams.mergeFlag = '0';
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listPmsPlanByPage(queryParam)
      .then(response => {
        list.value = response.data.result;
        totalPage.value = response.data.pageParameter.totalCount;
        // 设置表格初始选中项
        if (list.value.length > 0) {
          selectedRowKeys.value = [list.value[0]['id']];
        } else {
          selectedRowKeys.value = [];
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
    // mergeFlagList.value = result.mergeFlag;
    proposedSourcingMethodList.value = result.proposedSourcingMethod;
    planStatusList.value = result.planStatus;
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
    pmsTaskNo: value,
    reqPlanNo: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
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

