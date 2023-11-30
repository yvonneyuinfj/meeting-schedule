<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="编制日期(起)">
              <a-date-picker
                v-model:value="queryForm.editDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.editDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="编制日期(止)">
              <a-date-picker
                v-model:value="queryForm.editDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.editDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划保养日期(起)">
              <a-date-picker
                v-model:value="queryForm.planMaintenanceDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划保养日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.planMaintenanceDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划保养日期(止)">
              <a-date-picker
                v-model:value="queryForm.planMaintenanceDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划保养日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.planMaintenanceDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="保养状态">
              <a-select
                v-model:value="queryForm.maintenanceStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择保养状态"
              >
                <a-select-option
                  v-for="item in maintenanceStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="保养完成日期(起)">
              <a-date-picker
                v-model:value="queryForm.maintenanceFinishDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择保养完成日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.maintenanceFinishDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="保养完成日期(止)">
              <a-date-picker
                v-model:value="queryForm.maintenanceFinishDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择保养完成日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.maintenanceFinishDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="保养负责人ID">
              <AvicCommonSelect
                v-model:value="queryForm.maintUserId"
                type="userSelect"
                placeholder="请选择保养负责人ID"
                :defaultShowValue="queryForm.maintUserIdAlias"
                @callback="
                  result => {
                    queryForm.maintUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="实际保养人ID">
              <AvicCommonSelect
                v-model:value="queryForm.actrualMaintUserId"
                type="userSelect"
                placeholder="请选择实际保养人ID"
                :defaultShowValue="queryForm.actrualMaintUserIdAlias"
                @callback="
                  result => {
                    queryForm.actrualMaintUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下达日期(起)">
              <a-date-picker
                v-model:value="queryForm.dispatchDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下达日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.dispatchDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下达日期(止)">
              <a-date-picker
                v-model:value="queryForm.dispatchDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择下达日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.dispatchDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下达人ID">
              <AvicCommonSelect
                v-model:value="queryForm.dispatchUserId"
                type="userSelect"
                placeholder="请选择下达人ID"
                :defaultShowValue="queryForm.dispatchUserIdAlias"
                @callback="
                  result => {
                    queryForm.dispatchUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）(起)">
              <a-date-picker
                v-model:value="queryForm.oldLastMaintenPlanDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.oldLastMaintenPlanDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）(止)">
              <a-date-picker
                v-model:value="queryForm.oldLastMaintenPlanDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.oldLastMaintenPlanDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划编号">
              <a-input
                v-model:value="queryForm.billNo"
                placeholder="请输入计划编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="保养计划类型">
              <a-select
                v-model:value="queryForm.maintenPlanType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择保养计划类型"
              >
                <a-select-option
                  v-for="item in maintenPlanTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注">
              <a-input
                v-model:value="queryForm.note"
                placeholder="请输入备注"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
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
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="外委专业厂家名称">
              <a-input
                v-model:value="queryForm.vendorName"
                placeholder="请输入外委专业厂家名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="保养结论">
              <a-select
                v-model:value="queryForm.maintConclusion"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择保养结论"
              >
                <a-select-option
                  v-for="item in maintConclusionList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="问题说明">
              <a-input
                v-model:value="queryForm.problemDescription"
                placeholder="请输入问题说明"
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
        ref="tpmMaintPlanSelect"
        table-key="tpmMaintPlanSelect"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :show-table-setting="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        :customRow="customRow"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入"
            :allow-clear="true"
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
import type { TpmMaintPlanDto } from '@/api/avic/mms/tpm/TpmMaintPlanApi'; // 引入模块DTO
import { listTpmMaintPlanByPage } from '@/api/avic/mms/tpm/TpmMaintPlanApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const tpmMaintPlanSelect = ref();
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
    title: '保养周期(月)',
    dataIndex: 'maintenanceCycle',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '编制日期',
    dataIndex: 'editDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划保养日期',
    dataIndex: 'planMaintenanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养状态',
    dataIndex: 'maintenanceStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养完成日期',
    dataIndex: 'maintenanceFinishDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养负责人ID',
    dataIndex: 'maintUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '实际保养人ID',
    dataIndex: 'actrualMaintUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下达日期',
    dataIndex: 'dispatchDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下达人ID',
    dataIndex: 'dispatchUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '完好标识',
    dataIndex: 'goodConditionFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '最后一次保养计划时间（保养计划生成时对应设备标准保养规程表里的值）',
    dataIndex: 'oldLastMaintenPlanDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划编号',
    dataIndex: 'billNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养计划类型',
    dataIndex: 'maintenPlanTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '驳回原因',
    dataIndex: 'backReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '完工日期',
    dataIndex: 'completeDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'note',
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
    title: '外委专业厂家名称',
    dataIndex: 'vendorName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养结论',
    dataIndex: 'maintConclusionName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '问题说明',
    dataIndex: 'problemDescription',
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
const queryForm = ref<TpmMaintPlanDto>({});
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
const  totalPage = ref(0);
const maintenanceStatusList = ref([]); // 保养状态通用代码
const goodConditionFlagList = ref([]); // 完好标识通用代码
const maintenPlanTypeList = ref([]); // 保养计划类型通用代码
const secretLevelList = ref([]); // 密级通用代码
const maintConclusionList = ref([]); // 保养结论通用代码
const lookupParams = [
  { fieldName: 'maintenanceStatus', lookUpType: 'TPM_MAINTEN_STATUS' },
  { fieldName: 'goodConditionFlag', lookUpType: 'TPM_YN_FALG' },
  { fieldName: 'maintenPlanType', lookUpType: 'TPM_MAINTEN_PLAN_TYPE' },
  { fieldName: 'maintConclusion', lookUpType: 'TPM_MAINT_CONCLUSION' }
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
  listTpmMaintPlanByPage(queryParam)
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
    maintenanceStatusList.value = result.maintenanceStatus;
    goodConditionFlagList.value = result.goodConditionFlag;
    maintenPlanTypeList.value = result.maintenPlanType;
    maintConclusionList.value = result.maintConclusion;
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
function customRow (record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
</script>
