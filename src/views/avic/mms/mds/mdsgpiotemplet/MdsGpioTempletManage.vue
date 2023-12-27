<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="模板编号">
              <a-input v-model:value="queryForm.templetCode" placeholder="请输入模板编号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="模板名称">
              <a-input v-model:value="queryForm.templetName" placeholder="请输入模板名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="模板格式 ">
              <a-select v-model:value="queryForm.templetType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择模板格式 ">
                <a-select-option v-for="item in templetTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="模板分类">
              <a-select v-model:value="queryForm.templetClass"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择模板分类">
                <a-select-option v-for="item in templetClassList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
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
      <AvicTable ref="mdsGpioTemplet" table-key="mdsGpioTemplet" :columns="columns" :row-key="record => record.id"
        :data-source="list" :loading="loading" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <a-button v-hasPermi="['mdsGpioTemplet:add']" title="添加" type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button v-hasPermi="['mdsGpioTemplet:del']" title="删除" danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')">
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <!-- <a-button
              v-hasPermi="['mdsGpioTemplet:import']"
              title="导入"
              type="primary"
              ghost
              @click="handleImport">
              <template #icon>
                 <import-outlined />
              </template>
              导入
            </a-button>
            <a-button
              v-hasPermi="['mdsGpioTemplet:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
              <template #icon>
                 <export-outlined />
              </template>
              导出
            </a-button> -->
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入模板编号或模板名称" :allow-clear="true"
            @search="handleKeyWordQuery" />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'templetCode'">
            <a @click="handleDetail(record)">
              {{ record.templetCode }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'textView'">
            <a @click="handleTextView(record)">
              正文查看
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'textEdit'">
            <a @click="handleTextEdit(record)">
              正文编辑
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'tagDomainDataSet'">
            <a @click="formatTagDomainDataSet(record)">
              标签域数据集
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'listDomainDataSet'">
            <a @click="formatListDomainDataSet(record)">
              列表域数据集
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button v-hasPermi="['mdsGpioTemplet:del']" type="link" class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <mds-gpio-templet-add v-if="showAddModal" ref="addModal" @reloadData="getList" @close="showAddModal = false" />
    <!-- 编辑页面弹窗 -->
    <mds-gpio-templet-edit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
      @close="showEditModal = false" />
    <!-- 详情页面弹窗 -->
    <mds-gpio-templet-detail v-if="showDetailModal" ref="detailModal" :form-id="formId"
      @close="showDetailModal = false" />
    <!--标签域数据集页面弹窗-->
    <AvicModal :visible="showTagDomainModal" title="标签域数据集" @cancel="handleCancel" width="100%" height="100%"
      fullScreen="true">
      <MdsGpioTempletLabelManage v-if="showTagDomainModal" ref="tagDomainModal" :mainId="mainId">
      </MdsGpioTempletLabelManage>
      <template #footer>

      </template>
    </AvicModal>
    <!--列表域数据集页面弹窗-->
    <AvicModal :visible="showListDomainModal" title="列表域数据集" @cancel="handleCancel2" width="100%" height="100%"
      fullScreen="true">
      <MdsGpioTempletGridManage v-if="showListDomainModal" ref="listDomainModal" :parentId="mainId">
      </MdsGpioTempletGridManage>
      <template #footer>

      </template>
    </AvicModal>
    <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="单表模板导入"
      importUrl="/mms/mds/mdsgpiotemplets/importData/v1"
      downloadTemplateUrl="/mms/mds/mdsgpiotemplets/downloadTemplate/v1" @reloadData="getList"
      @close="showImportModal = false" />
  </div>
</template>
<script lang="ts" setup>
import type { MdsGpioTempletDto } from '@/api/avic/mms/mds/MdsGpioTempletApi'; // 引入模块DTO
import { listMdsGpioTempletByPage, delMdsGpioTemplet, exportExcel } from '@/api/avic/mms/mds/MdsGpioTempletApi'; // 引入模块API
import MdsGpioTempletAdd from './MdsGpioTempletAdd.vue'; // 引入添加页面组件
import MdsGpioTempletEdit from './MdsGpioTempletEdit.vue'; // 引入编辑页面组件
import MdsGpioTempletDetail from './MdsGpioTempletDetail.vue'; // 引入详情页面组件
import MdsGpioTempletLabelManage from '@/views/avic/mms/mds/mdsgpiotempletlabel/MdsGpioTempletLabelManage.vue'; // 引入标签域数据集页面组件
import MdsGpioTempletGridManage from '@/views/avic/mms/mds/mdsgpiotempletgrid/MdsGpioTempletGridManage.vue';//引入列表域数据集页面组件
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
    title: '模板编号',
    dataIndex: 'templetCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '模板名称',
    dataIndex: 'templetName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '模板分类',
    dataIndex: 'templetClassName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '二级分类',
    dataIndex: 'secModelTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '合同分类',
    dataIndex: 'contractClassName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '模板文件类型 ',
    dataIndex: 'templetTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否标准模板',
    dataIndex: 'standardContactFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '正文查看',
    dataIndex: 'textView',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '正文编辑',
    dataIndex: 'textEdit',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '标签域数据集',
    dataIndex: 'tagDomainDataSet',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '列表域数据集',
    dataIndex: 'listDomainDataSet',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '版本号',
    dataIndex: 'templetVersion',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '品类ID',
  //   dataIndex: 'mdsCategoryLvId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left',
  //   hidden: true
  // },
  // {
  //   title: '品类编码',
  //   dataIndex: 'mdsCategoryLvCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left',
  //   hidden: true
  // },
  // {
  //   title: '品类名称',
  //   dataIndex: 'mdsCategoryLvName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left',
  //   hidden: true
  // },
  {
    title: '模板描述',
    dataIndex: 'templetDesc',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<MdsGpioTempletDto>({});
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showTagDomainModal = ref(false); // 是否展示标签域数据集弹窗
const showListDomainModal = ref(false); // 是否展示列表域数据集弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'mdsGpioTemplet' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const mainId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const templetTypeList = ref([]); // 模板格式 通用代码
const templetClassList = ref([]); // 模板分类通用代码
const secretLevelList = ref([]); // 密级通用代码
const secModelTypeList = ref([]); // 二级类型通用代码
const contractClassList = ref([]); // 合同分类通用代码
const standardContactFlagList = ref([]); // 是否标准模板通用代码
const lookupParams = [
  { fieldName: 'templetType', lookUpType: 'MDS_GPIO_TEMPLET_TYPE' },
  { fieldName: 'templetClass', lookUpType: 'MDS_GPIO_TEMPLET_CLASS' },
  { fieldName: 'secModelType', lookUpType: 'PMS_SEC_MODEL_TYPE' },
  { fieldName: 'contractClass', lookUpType: 'MDS_CONTRACT_TYPE' },
  { fieldName: 'standardContactFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
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
  loading.value = true;
  listMdsGpioTempletByPage(queryParam)
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
    templetTypeList.value = result.templetType;
    templetClassList.value = result.templetClass;
    secModelTypeList.value = result.secModelType;
    contractClassList.value = result.contractClass;
    standardContactFlagList.value = result.standardContactFlag;
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
    templetCode: value,
    templetName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详细 */
function handleDetail(record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/**标签域数据集查看 */
function formatTagDomainDataSet(record) {
  mainId.value = record.id;
  showTagDomainModal.value = true;
}
/**列表域数据集查看 */
function formatListDomainDataSet(record) {
  mainId.value = record.id;
  showListDomainModal.value = true;
}
function handleCancel() {
  showTagDomainModal.value = false;
}
function handleCancel2() {
  showListDomainModal.value = false;
}
/** 导入 */
// function handleImport() {
//   showImportModal.value = true;
// }
/** 导出 */
// function handleExport() {
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
/** 删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delMdsGpioTemplet(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
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
/** 勾选复选框时触发 */
function onSelectChange(rowKeys) {
  selectedRowKeys.value = rowKeys;
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

