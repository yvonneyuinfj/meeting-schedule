<template>
    <a-modal :visible="visible" @ok="handleOk" @cancel.once="handleCancel" title="年度维修计划" width="80%">
      <AvicTable
        ref="famOverhaulRequireSelect"
        table-key="famOverhaulRequireSelect"
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
            placeholder="请输入备注"
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
     </a-modal>
</template>
<script lang="ts" setup>
import type { FamOverhaulRequireDto } from '@/api/avic/mms/fam/FamOverhaulRequireApi'; // 引入模块DTO
import { listFamOverhaulRequireByPage2 } from '@/api/avic/mms/fam/FamOverhaulRequireApi'; // 引入模块API
import { emits } from '@/views/avic/mms/fam/famaccpet/ts/FamAccpetForm';
const $emit = defineEmits(['select', 'handleRowDblClick']);
const famOverhaulRequireSelect = ref();
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
    // {
    //   title: '数据密级',
    //   dataIndex: 'secretLevelName',
    //   ellipsis: true,
    //   minWidth: 120,
    //   resizable: true,
    //   align: 'center'
    // },
    // {
    //   title: '备注',
    //   dataIndex: 'note',
    //   ellipsis: true,
    //   sorter: true,
    //   minWidth: 120,
    //   resizable: true,
    //   align: 'left'
    // },
    {
      title: '单据号',
      dataIndex: 'billNo',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '预计维修/改造金额',
      dataIndex: 'expectedMaintenance',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '维修计划',
      dataIndex: 'maintPlan',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '维修类别',
      dataIndex: 'maintCategoryName',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'center'
    },
    {
      title: '需求时间',
      dataIndex: 'expectMaintTime',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'center'
    },
    // {
    //   title: '主管部门id',
    //   dataIndex: 'managerDeptId',
    //   ellipsis: true,
    //   sorter: true,
    //   minWidth: 120,
    //   resizable: true,
    //   align: 'left'
    // },
    // {
    //   title: '主管部门名称',
    //   dataIndex: 'managerDeptNameAlias',
    //   ellipsis: true,
    //   minWidth: 120,
    //   resizable: true,
    //   align: 'left'
    // },
    {
      title: '是否使用型号经费',
      dataIndex: 'isUsedScientificrsName',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'center'
    },
    {
      title: '预算项目',
      dataIndex: 'budgetProject',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '预算分项',
      dataIndex: 'budgetSubitem',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '预算组织',
      dataIndex: 'budgetOrg',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '年度/临时',
      dataIndex: 'annualProvisionalName',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'center'
    },
    {
      title: '课题号',
      dataIndex: 'projectNumber',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '项目金额（万元）',
      dataIndex: 'projectAmount',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      customRender: text => {
        return text.value ? proxy.$formatZero(Number(text.value), 2) : '';
      },
      align: 'right'
    },
    {
      title: '是否需要评审',
      dataIndex: 'isNeedReviewName',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'center'
    },
    {
      title: '要求及建议',
      dataIndex: 'reqSuggest',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '申请部门',
      dataIndex: 'applyDeptIdAlias',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '需求申请人',
      dataIndex: 'handlePersonIdAlias',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '故障时间',
      dataIndex: 'applyDate',
      ellipsis: true,
      minWidth: 120,
      resizable: true,
      align: 'center'
    },
    {
      title: '联系电话',
      dataIndex: 'telephone',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '验收单号',
      dataIndex: 'accpetApplyNo',
      ellipsis: true,
      sorter: true,
      minWidth: 120,
      resizable: true,
      align: 'left'
    },
    {
      title: '是否提高固定资产性能',
      dataIndex: 'isImproveName',
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
const queryForm = ref<FamOverhaulRequireDto>({});
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
const secretLevelList = ref([]); // 数据密级通用代码
// const emit = defineEmits2(emits);
onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listFamOverhaulRequireByPage2(queryParam)
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
    note: value
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

//确定
const handleOk = () =>{
  $emit('getPlanNo',selectedRows.value[0])
}
//取消
const handleCancel = () =>{
  $emit('closeCancel')
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
