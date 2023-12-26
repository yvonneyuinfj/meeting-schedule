<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="famAccpetEntityList"
        table-key="famAccpetEntityList"
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
        :customRow="
          record => {
            return {
              onClick: () => {
                handleRowSelection(record);
              }
            };
          }
        "
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
    <!--        <a-button
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button> -->
<!--            <a-button
              title="导入"
              type="primary"
              ghost
              @click="handleImport"
            >
              <template #icon>
                <import-outlined/>
              </template>
              导入
            </a-button> -->
          </a-space>
        </template>
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
          <template v-if="column.dataIndex === 'action'">
    <!--        <a-button
              type="link"
              class="inner-btn"
              @click="handleDelete([record.id], 'row')"
            >
              删除
            </a-button> -->
            <a-button
              type="link"
              class="inner-btn"
              @click="handleLink(record.id)"
            >
              链接
            </a-button>
          </template>
        </template>
      </AvicTable>
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="单表模板导入"
        importUrl="/mms/fam/famaccpetlists/importData/v1"
        downloadTemplateUrl="/mms/fam/famaccpetlists/downloadTemplate/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
      <FamCipAccpetListSubsidiary ref="famCipAccpetListSubsidiary" :open="linkModal" :main-id="linkId"
                                  @closeLink="closeLink"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { listFamAccpetListByPage, delFamAccpetList } from '@/api/avic/mms/fam/FamCipAccpetListApi'; // 引入模块API
import FamCipAccpetListSubsidiary from './FamCipAccpetListSubsidiary.vue';
import { AllColumns } from '@/views/avic/mms/fam/famaccpetlist/ListColumns';

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
  ...AllColumns,
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    amAccpetId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const linkModal = ref(false);
const linkId = ref();
const list = ref([]); // 表格数据集合
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const showImportModal = ref(false); // 是否展示导入弹窗
const totalPage = ref(0);
const secretLevelList = ref([]); // 数据密级通用代码
const excelParams = ref({ tableName: 'famAssetClass' }); // 导入Excel数据过滤参数
const isNewAssetList = ref([]); // 是否新增资产通用代码
const importedOrNotList = ref([]); // 是否为进口设备通用代码
const lookupParams = [
  { fieldName: 'isNewAsset', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'importedOrNot', lookUpType: 'PLATFORM_YES_NO_FLAG' }
];

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
  queryParam.searchParams.amAccpetId = props.mainId ? props.mainId : '-1';
  listFamAccpetListByPage(queryParam)
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
    isNewAssetList.value = result.isNewAsset;
    importedOrNotList.value = result.importedOrNot;
  });
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {};
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 导入 */
function handleImport() {
  showImportModal.value = true;
}


/** 子表删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delFamAccpetList(ids)
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

function handleLink(id) {
  console.log(id);
  linkModal.value = true;
  linkId.value = id;
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}

function closeLink() {
  linkModal.value = false;
  linkId.value = '';
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

/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}

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

defineExpose({
  closeLink
});
</script>
