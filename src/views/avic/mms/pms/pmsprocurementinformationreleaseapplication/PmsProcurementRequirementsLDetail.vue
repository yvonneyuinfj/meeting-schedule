<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
        ref="pmsProcurementRequirementsL"
        :columns="columns"
        :data-source="list"
        :height="300"
        :loading="loading"
        :pageParameter="queryParam.pageParameter"
        :row-key="record => record.id"
        :showTableSetting="false"
        :total="totalPage"
        table-key="pmsProcurementRequirementsL"
        @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <AvicRowEdit
            :column="column.dataIndex"
            :record="record"
        >
          <template #default>
            {{ record[column.dataIndex] }}
          </template>
        </AvicRowEdit>
      </template>
    </AvicTable>
  </div>
</template>
<script lang="ts" setup>
import type { PmsProcurementRequirementsLDto } from '@/api/avic/mms/pms/PmsProcurementRequirementsLApi'; // 引入模块DTO
import { listPmsProcurementRequirementsLByPage } from '@/api/avic/mms/pms/PmsProcurementRequirementsLApi'; // 引入模块API

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  }
});
const columns = [
  {
    title: '维度',
    dataIndex: 'dimensionality',
    key: 'dimensionality',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '权重',
    dataIndex: 'weight',
    key: 'weight',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '得分标准',
    dataIndex: 'scoringCriteria',
    key: 'scoringCriteria',
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
const queryForm = ref<PmsProcurementRequirementsLDto>({});
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
const pmsProcurementRequirementsL = ref(null);
const list = ref([]); //表格数据集合
const loading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  loading.value = true;
  queryForm.value.pmsProcurementRequirementsId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listPmsProcurementRequirementsLByPage(queryParam)
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

/** 表头排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

</script>


