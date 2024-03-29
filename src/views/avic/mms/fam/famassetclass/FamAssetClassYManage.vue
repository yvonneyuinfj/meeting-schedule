<template>
      <div class="content-wrapper">
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable ref="famOverhaulRequire" table-key="famOverhaulRequire" :columns="columns"
            :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 40,
              fixed: true
            }" rowClickSelectionType="radio" :pageParameter="queryParam.pageParameter" :total="totalPage"
            @change="handleTableChange" @refresh="getList">
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'billNo'">
                <a @click="handleFlowDetail(record)">
                  {{ record.billNo }}
                </a>
              </template>
            </template>
            <template #toolBarLeft>
              <a-space>
                <a-button
                  v-hasPermi="['famProjectMdrp:import']"
                  title="导入"
                  type="primary"
                  ghost
                  @click="handleImport">
                  <template #icon>
                     <import-outlined />
                  </template>
                  导入
                </a-button>
              </a-space>
            </template>
          </AvicTable>
        </div>
       
      </div>

  <AvicExcelImport
    v-if="showImportModal"
    :formData="excelParams"
    title="单表模板导入"
    importUrl="/mms/fam/famassetclasss/importData/v1"
    downloadTemplateUrl="/mms/fam/famassetclasss/downloadTemplate/v1"
    @reloadData="reload"
    @close="showImportModal = false"
  />
</template>
<script lang="ts" setup>
import type { FamAssetClassDto } from '@/api/avic/mms/fam/FamAssetClassApi'; // 引入模块DTO
import { listFamAssetClassByPage } from '@/api/avic/mms/fam/FamAssetClassApi'; // 引入模块API
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
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
    title: '资产类别编码',
    dataIndex: 'classCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产类别名称',
    dataIndex: 'className',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '编码规则',
  //   dataIndex: 'modelContent',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  {
    title: '使用年限',
    dataIndex: 'useTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '上级类别名称',
    dataIndex: 'parentAssetClassName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '上级类别编号',
    dataIndex: 'parentAssetCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
];
const queryForm = ref<FamAssetClassDto>({

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
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'famAssetClass', parentId: '' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); //表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); //选中数据主键集合
const selectedRows = ref([]); //选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 数据密级通用代码
const maintCategoryList = ref([]); // 维修类别通用代码
const isUsedScientificrsList = ref([]); // 是否使用型号经费通用代码
const annualProvisionalList = ref([]); // 年度/临时（勾选）通用代码
const isNeedReviewList = ref([]); // 是否需要评审通用代码
const emit = defineEmits(['getTree']);
const lookupParams = [
  { fieldName: 'maintCategory', lookUpType: 'FAM_MAINT_CATEGORY' },
  { fieldName: 'isUsedScientificrs', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'annualProvisional', lookUpType: 'FAM_ANNUAL_PROVISIONAL' },
  { fieldName: 'isNeedReview', lookUpType: 'PLATFORM_YES_NO_FLAG' }
];
const props = defineProps({
  mainId: {
    type: String,
    default: ''
  }
});

onMounted(() => {
  // 加载表格数据
  if (props.mainId) {
    // 加载表格数据
    getList();
  }
  // 加载查询区所需通用代码
  getLookupList();
});

/** 导入 */
function handleImport () {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  showImportModal.value = true;
  excelParams.value.parentId = props.mainId;
}

function reload(){
  getList();
  emit('getTree');
}

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.parentId = props.mainId;
  queryParam.searchParams = queryForm.value;
  listFamAssetClassByPage(queryParam)
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
    maintCategoryList.value = result.maintCategory;
    isUsedScientificrsList.value = result.isUsedScientificrs;
    annualProvisionalList.value = result.annualProvisional;
    isNeedReviewList.value = result.isNeedReview;
  });
}


/** 导出 */
// function handleExport () {
//   proxy.$confirm({
//     title: '确认导出数据吗?',
//     okText: '确定',
//     cancelText: '取消',
//     onOk: () => {
//       loading.value = true;
//       queryParam.searchParams = queryForm.value;
//       exportExcel(queryParam).then(() => {
//         loading.value = false;
//         proxy.$message.info('导出成功！');
//       });
//     }
//   });
// }

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

watch(
  () => props.mainId,
  newVal => {
    if (newVal) {
      if (props.mainId) {
        getList();
      }
    }
  },
  { immediate: true }
);
defineExpose({
  getList
});
</script>
