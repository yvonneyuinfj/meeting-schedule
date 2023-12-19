<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="单号">
              <a-input
                v-model:value="queryForm.substitutionNo"
                placeholder="请输入单号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="类型  ^0-长期代料，1-临时代料">
              <a-select
                v-model:value="queryForm.billType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择类型  ^0-长期代料，1-临时代料"
              >
                <a-select-option
                  v-for="item in billTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="代料关系分类 ^ G-代料单，E-等效代料，S-规格代料">
              <a-select
                v-model:value="queryForm.substitutionType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择代料关系分类 ^ G-代料单，E-等效代料，S-规格代料"
              >
                <a-select-option
                  v-for="item in substitutionTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="被替代物料ID ^ 等效代料时可以为空">
              <a-input
                v-model:value="queryForm.originalItemId"
                placeholder="请输入被替代物料ID ^ 等效代料时可以为空"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="替代物料ID">
              <a-input
                v-model:value="queryForm.substitutionItemId"
                placeholder="请输入替代物料ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制">
              <a-select
                v-model:value="queryForm.effectiveType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制"
              >
                <a-select-option
                  v-for="item in effectiveTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生效起始架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的起始参数。">
              <a-input
                v-model:value="queryForm.effectiveStrPara"
                placeholder="请输入生效起始架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的起始参数。"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="生效截止架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的截止参数。">
              <a-input
                v-model:value="queryForm.effectiveEndPara"
                placeholder="请输入生效截止架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的截止参数。"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="代料系数 ^ 同一制成品在使用替代后物料的单耗用量与使用替代前物料的单耗用量的比率，即替代后物料的单耗用量/替代前物料的单耗用量">
              <a-input
                v-model:value="queryForm.substitutionRate"
                placeholder="请输入代料系数 ^ 同一制成品在使用替代后物料的单耗用量与使用替代前物料的单耗用量的比率，即替代后物料的单耗用量/替代前物料的单耗用量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回">
              <a-select
                v-model:value="queryForm.status"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回"
              >
                <a-select-option
                  v-for="item in statusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否有效 ^ 0-无效；1-有效">
              <a-select
                v-model:value="queryForm.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否有效 ^ 0-无效；1-有效"
              >
                <a-select-option
                  v-for="item in validFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请人的ID">
              <a-input
                v-model:value="queryForm.applyUserId"
                placeholder="请输入申请人的ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="员工编码">
              <a-input
                v-model:value="queryForm.applyUserCode"
                placeholder="请输入员工编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请人姓名">
              <a-input
                v-model:value="queryForm.applyUserName"
                placeholder="请输入申请人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请部门ID">
              <a-input
                v-model:value="queryForm.applyDeptId"
                placeholder="请输入申请部门ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请部门编码">
              <a-input
                v-model:value="queryForm.applyDeptCode"
                placeholder="请输入申请部门编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请部门名称">
              <a-input
                v-model:value="queryForm.applyDeptName"
                placeholder="请输入申请部门名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请时间(起)">
              <a-date-picker
                v-model:value="queryForm.applyDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择申请时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.applyDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请时间(止)">
              <a-date-picker
                v-model:value="queryForm.applyDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择申请时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.applyDateBegin)"
              />
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
            <a-form-item label="代料依据">
              <a-input
                v-model:value="queryForm.substitutionBasis"
                placeholder="请输入代料依据"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 ^ 通用代码MMS_DATA_SECRET_LEVEL"
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
        ref="mdsSubstitutionSelect"
        table-key="mdsSubstitutionSelect"
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
            placeholder="请输入单号"
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
import type { MdsSubstitutionDto } from '@/api/avic/mms/mds/MdsSubstitutionApi'; // 引入模块DTO
import { listMdsSubstitutionByPage } from '@/api/avic/mms/mds/MdsSubstitutionApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const mdsSubstitutionSelect = ref();
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
    title: '单号',
    dataIndex: 'substitutionNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '类型  ^0-长期代料，1-临时代料',
    dataIndex: 'billTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '代料关系分类 ^ G-代料单，E-等效代料，S-规格代料',
    dataIndex: 'substitutionTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '被替代物料ID ^ 等效代料时可以为空',
    dataIndex: 'originalItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '替代物料ID',
    dataIndex: 'substitutionItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制',
    dataIndex: 'effectiveTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '生效起始架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的起始参数。',
    dataIndex: 'effectiveStrPara',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生效截止架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的截止参数。',
    dataIndex: 'effectiveEndPara',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '代料系数 ^ 同一制成品在使用替代后物料的单耗用量与使用替代前物料的单耗用量的比率，即替代后物料的单耗用量/替代前物料的单耗用量',
    dataIndex: 'substitutionRate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回',
    dataIndex: 'statusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否有效 ^ 0-无效；1-有效',
    dataIndex: 'validFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '申请人的ID',
    dataIndex: 'applyUserId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '员工编码',
    dataIndex: 'applyUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请人姓名',
    dataIndex: 'applyUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请部门ID',
    dataIndex: 'applyDeptId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请部门编码',
    dataIndex: 'applyDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请部门名称',
    dataIndex: 'applyDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请时间',
    dataIndex: 'applyDate',
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
    title: '代料依据',
    dataIndex: 'substitutionBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级 ^ 通用代码MMS_DATA_SECRET_LEVEL',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
const queryForm = ref<MdsSubstitutionDto>({});
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
const billTypeList = ref([]); // 类型  ^0-长期代料，1-临时代料通用代码
const substitutionTypeList = ref([]); // 代料关系分类 ^ G-代料单，E-等效代料，S-规格代料通用代码
const effectiveTypeList = ref([]); // 生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制通用代码
const statusList = ref([]); // 订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回通用代码
const validFlagList = ref([]); // 是否有效 ^ 0-无效；1-有效通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const lookupParams = [
  { fieldName: 'billType', lookUpType: 'MDS_SUBSTITUTION_BILL_TYPE' },
  { fieldName: 'substitutionType', lookUpType: 'MDS_SUBSTITUTION_TYPE' },
  { fieldName: 'effectiveType', lookUpType: 'MDS_SUBSTITUTION_EFFECTIVE_TYPE' },
  { fieldName: 'status', lookUpType: 'MDS_SUBSTITUTION_STATUS' },
  { fieldName: 'validFlag', lookUpType: 'MDS_SUB_VALID_FLAG' }
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
  listMdsSubstitutionByPage(queryParam)
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
    billTypeList.value = result.billType;
    substitutionTypeList.value = result.substitutionType;
    effectiveTypeList.value = result.effectiveType;
    statusList.value = result.status;
    validFlagList.value = result.validFlag;
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
    substitutionNo: value
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


