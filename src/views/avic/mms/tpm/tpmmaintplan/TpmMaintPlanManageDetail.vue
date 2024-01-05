<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="tpmMaintPlan"
        table-key="tpmMaintPlan"
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
              title="驳回计划"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="backLoading"
              @click="handleBack(selectedRowKeys)"
            >
            <template #icon>
              <!-- <avic-icon svg='avic-arrow-go-back-fill' /> -->
              <RollbackOutlined />
            </template>
              驳回计划
            </a-button>
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
        </template>
      </AvicTable>
      <a-modal :visible="backModal" @cancel="closeBack" @ok="handleBackModal" title="驳回原因">
        <a-textarea
          v-model:value="backReason"
          placeholder="请输入驳回原因"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TpmMaintPlanDto } from '@/api/avic/mms/tpm/TpmMaintPlanApi'; // 引入模块DTO
import {
  backTpmMaintPlan,
  listTpmMaintPlanDetailByPage
} from '@/api/avic/mms/tpm/TpmMaintPlanApi'; // 引入模块API
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils';
import { useRouter } from 'vue-router';

const backLoading = ref(false); // 提交按钮loading状态
const router = useRouter();

const props = defineProps({
  // 流程主表id
  tpmWorkflowId: {
    type: String,
    default: ''
  },
  originalOrderTabName: {
    type: String,
    default: ''
  }
});
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const backModal = ref(false);
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center'
  },
  {
    title: '计划编号',
    dataIndex: 'billNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '完好标识',
  //   dataIndex: 'goodConditionFlag',
  //   key: 'goodConditionFlag',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
  //   align: 'center'
  // },
  // {
  //   title: '完工日期',
  //   dataIndex: 'completeDate',
  //   key: 'completeDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
  //   align: 'center'
  // },
  // {
  //   title: '保养结论',
  //   dataIndex: 'maintConclusion',
  //   key: 'maintConclusion',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
  //   align: 'center'
  // },
  // {
  //   title: '问题说明',
  //   dataIndex: 'problemDescription',
  //   key: 'problemDescription',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
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
    title: '上次保养日期',
    dataIndex: 'oldLastMaintenPlanDate',
    key: 'oldLastMaintenPlanDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '使用部门',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养项目',
    dataIndex: 'maintenanceItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养部位',
    dataIndex: 'maintenancePosition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养依据',
    dataIndex: 'maintenanceBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养内容',
    dataIndex: 'maintenanceContent',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养要求',
    dataIndex: 'maintenanceRequirement',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养周期(月)',
    dataIndex: 'maintenanceCycle',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '小时数',
    dataIndex: 'maintenanceHours',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否自主维护',
    dataIndex: 'ynSelfMaintenanceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '编制时间',
    dataIndex: 'editDate',
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
  // {
  //   title: '保养负责人',
  //   dataIndex: 'maintUserIdAlias',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '实际保养人',
  //   dataIndex: 'actrualMaintUserIdAlias',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '外委专业厂家',
  //   dataIndex: 'vendorName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '下达人',
  //   dataIndex: 'dispatchUserIdAlias',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '下达日期',
  //   dataIndex: 'dispatchDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '密级',
  //   dataIndex: 'secretLevelName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '保养完成日期',
  //   dataIndex: 'maintenanceFinishDate',
  //   key: 'maintenanceFinishDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  {
    title: '保养计划类型',
    dataIndex: 'maintenPlanTypeName',
    key: 'maintenPlanType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '备注',
  //   dataIndex: 'note',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '驳回原因',
  //   dataIndex: 'backReason',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    width: 90,
    resizable: true,
    align: 'center'
  }
];
const backReason = ref<string>('');
const queryForm = ref<TpmMaintPlanDto>({});
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
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const totalPage = ref(0);
const maintenanceStatusList = ref([]); // 保养状态通用代码
const goodConditionFlagList = ref([]); // 完好标识通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'maintenanceStatus', lookUpType: 'TPM_MAINTEN_STATUS' },
  { fieldName: 'goodConditionFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

// 保存驳回原因
const handleBackModal = () => {
  if (!backReason.value) {
    proxy.$message.warning('请输入驳回原因');
    return;
  }
  backTpmMaintPlan(selectedRowKeys.value, backReason.value)
    .then(res => {
      if (res.success) {
        proxy.$message.success('驳回成功！');
        if (verificationBackReason()) {
          window.close();
          backReason.value = '';
          backModal.value = false;
          bpmUtils.refreshBack(router.currentRoute.value.query.entryId, undefined);
        } else {
          backReason.value = '';
          backModal.value = false;
          getList();
        }
      }
      backLoading.value = false;
    })
    .catch(() => {
      backLoading.value = false;
    });
};

/** 校验是否全部驳回 */
const verificationBackReason = () => {
  return selectedRowKeys.value.length === list.value.length;
};

/** 关闭驳回窗口 */
const closeBack = () => {
  backReason.value = '';
  backModal.value = false;
};

/** 驳回 */
function handleBack(ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要驳回的数据！');
    return;
  }
  backModal.value = true;
}

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.tpmWorkflowId = props.tpmWorkflowId;
  queryForm.value.originalOrderTabName = props.originalOrderTabName;
  queryParam.searchParams = queryForm.value;
  listTpmMaintPlanDetailByPage(queryParam)
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
    maintenanceStatusList.value = result.maintenanceStatus;
    goodConditionFlagList.value = result.goodConditionFlag;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
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
