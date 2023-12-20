<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="pmsDeliveryDetailDesigner"
        table-key="pmsDeliveryDetailDesigner"
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
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'attach'">
            <a @click="handleAttach(record)">
              查看
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <AttachModal
        :attachOpen="attachOpen"
        :attach-form="attchForm"
        @closeAttach="closeAttach"
    />
  </div>
</template>
<script lang="ts" setup>
import type { PmsDeliveryDetailDesignerDto } from '@/api/avic/mms/pms/PmsDeliveryDetailDesignerApi'; // 引入模块DTO
import { listPmsDeliveryDetailDesignerByPage } from '@/api/avic/mms/pms/PmsDeliveryDetailDesignerApi'; // 引入模块API
import AttachModal from './AttachModal.vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});
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
    title: 'PDM归档编号',
    dataIndex: 'pdmArchiveNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '文件名称',
    dataIndex: 'fileName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '上传人',
    dataIndex: 'uplink',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否审批',
    dataIndex: 'ynApproverName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '附件',
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
const queryForm = ref<PmsDeliveryDetailDesignerDto>({
  bpmState: 'all',
  bpmType: 'all',
  pmsPlanId: props.mainId,
  ynApprover: '5'
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
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const attachOpen = ref(false); // 附件弹窗
const attchForm = reactive({
  id: '',
  secretLevel: ''
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.pmsPlanId = props.mainId ? props.mainId : '-1';
  listPmsDeliveryDetailDesignerByPage(queryParam)
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

/** 打开附件查看 */
const handleAttach = record => {
  attachOpen.value = true;
  attchForm.id = record.id;
  attchForm.secretLevel = record.secretLevel;
};

/** 关闭附件 */
const closeAttach = () => {
  attachOpen.value = false;
  attchForm.id = null;
  attchForm.secretLevel = null;
};

watch(
    () => props.mainId,
    newVal => {
      if (newVal) {
        getList(); // 查询表格数据
      } else {
        selectedRowKeys.value = []; // 清空选中
        selectedRows.value = [];
        list.value = [];
        totalPage.value = 0;
      }
    },
    { immediate: true }
);
</script>
