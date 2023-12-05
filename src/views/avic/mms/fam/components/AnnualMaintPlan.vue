<template>
  <a-modal :visible="visible" @ok="handleOk" @cancel.once="handleCancel" title="年度维修计划" width="80%">
    <AvicTable ref="tpmYearMaintModifyPlanL" table-key="tpmYearMaintModifyPlanL" :height="300" :columns="columns"
               :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        type:'radio',
        columnWidth: 40,
        fixed: true
      }" :showTableSetting="false" :pageParameter="queryParam.pageParameter"   :total="totalPage">
    </AvicTable>
  </a-modal>
</template>

<script lang="ts" setup>
import { emits } from '@/views/avic/mms/fam/famoverhaulrequire/ts/FamOverhaulRequireForm';
import {
  selectlistTpmYearMaintModifyPlanLByPage,
  TpmYearMaintModifyPlanLDto
} from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanLApi';

const props = defineProps({
  visible:{
    type:Boolean,
    default:false
  },
})
const list = ref([]); //表格数据集合
const loading = ref(false);
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const totalPage = ref(0);
const queryForm = ref<TpmYearMaintModifyPlanLDto>({});
// const initialList = ref([]); // 记录每次刷新得到的表格的数据
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {},
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const columns = [
  {
    title: '计划编号',
    dataIndex: 'planNo',
    key: 'planNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '预算项目',
    dataIndex: 'budgetItems',
    key: 'budgetItems',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算分项',
    dataIndex: 'budgetBreakdownItems',
    key: 'budgetBreakdownItems',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '预算组织ID',
  //   dataIndex: 'budgetOrganizationId',
  //   key: 'budgetOrganizationId',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '预算组织编码',
  //   dataIndex: 'budgetOrganizationCode',
  //   key: 'budgetOrganizationCode',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '预算组织名称',
    dataIndex: 'budgetOrganizationNameAlias',
    key: 'budgetOrganizationNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划类别',
    dataIndex: 'planTypeName',
    key: 'planTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '需求部门ID',
  //   dataIndex: 'requireDeptId',
  //   key: 'requireDeptId',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '需求部门编码',
  //   dataIndex: 'requireDeptCode',
  //   key: 'requireDeptCode',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '需求部门名称',
    dataIndex: 'requireDeptNameAlias',
    key: 'requireDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目金额（万元）',
    dataIndex: 'projectMoney',
    key: 'projectMoney',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同预计签订时间',
    dataIndex: 'estContractSignDate',
    key: 'estContractSignDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '经办人ID',
  //   dataIndex: 'agentId',
  //   key: 'agentId',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '经办人编码',
  //   dataIndex: 'agentCode',
  //   key: 'agentCode',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '经办人姓名',
    dataIndex: 'agentNameAlias',
    key: 'agentNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '申请单号',
  //   dataIndex: 'applyNo',
  //   key: 'applyNo',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '合同编号',
  //   dataIndex: 'contractNo',
  //   key: 'contractNo',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '合同实际签订时间',
  //   dataIndex: 'contractSignDate',
  //   key: 'contractSignDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '实际完成时间（完成验收）',
  //   dataIndex: 'acceptanceDate',
  //   key: 'acceptanceDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  {
    title: '计划验收时间',
    dataIndex: 'estAcceptanceDate',
    key: 'estAcceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '进度状态',
  //   dataIndex: 'progressStatus',
  //   key: 'progressStatus',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  {
    title: '变更原因',
    dataIndex: 'changeReason',
    key: 'changeReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
] as any[];

onMounted(()=>{
  getList()
})



const emit = defineEmits(emits);

function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams = queryForm.value;
  selectlistTpmYearMaintModifyPlanLByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      // 查询的初始数据,保存时做比对
      // initialList.value = proxy.$lodash.cloneDeep(list.value);
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

//确定
const handleOk = () =>{
  emit('getPlanNo',selectedRows.value[0])
}
//取消
const handleCancel = () =>{
  emit('closeCancel')
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}

</script>

<style scoped lang="less">

</style>
