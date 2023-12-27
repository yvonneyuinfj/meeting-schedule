<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="供应商信息表主键ID">
              <a-input
                v-model:value="queryForm.mdsVendorId"
                placeholder="请输入供应商信息表主键ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资质编号">
              <a-input
                v-model:value="queryForm.proveNo"
                placeholder="请输入资质编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资质名称">
              <a-input
                v-model:value="queryForm.proveName"
                placeholder="请输入资质名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证">
              <a-select
                v-model:value="queryForm.proveType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证"
              >
                <a-select-option
                  v-for="item in proveTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III">
              <a-select
                v-model:value="queryForm.proveGrade"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III"
              >
                <a-select-option
                  v-for="item in proveGradeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发证单位">
              <a-input
                v-model:value="queryForm.releaseDept"
                placeholder="请输入发证单位"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发证日期(起)">
              <a-date-picker
                v-model:value="queryForm.releaseDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择发证日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.releaseDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发证日期(止)">
              <a-date-picker
                v-model:value="queryForm.releaseDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择发证日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.releaseDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效开始日期(起)">
              <a-date-picker
                v-model:value="queryForm.effectiveBenDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效开始日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.effectiveBenDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效开始日期(止)">
              <a-date-picker
                v-model:value="queryForm.effectiveBenDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效开始日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.effectiveBenDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效结束日期(起)">
              <a-date-picker
                v-model:value="queryForm.effectiveEndDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效结束日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.effectiveEndDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效结束日期(止)">
              <a-date-picker
                v-model:value="queryForm.effectiveEndDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效结束日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.effectiveEndDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制人ID">
              <AvicCommonSelect
                v-model:value="queryForm.editorUserId"
                type="userSelect"
                placeholder="请选择编制人ID"
                :defaultShowValue="queryForm.editorUserIdAlias"
                @callback="
                  result => {
                    queryForm.editorUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制人编码 ^ 员工编码">
              <AvicCommonSelect
                v-model:value="queryForm.editorUserCode"
                type="userSelect"
                placeholder="请选择编制人编码 ^ 员工编码"
                :defaultShowValue="queryForm.editorUserCodeAlias"
                @callback="
                  result => {
                    queryForm.editorUserCodeAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制人姓名">
              <AvicCommonSelect
                v-model:value="queryForm.editorUserName"
                type="userSelect"
                placeholder="请选择编制人姓名"
                :defaultShowValue="queryForm.editorUserNameAlias"
                @callback="
                  result => {
                    queryForm.editorUserNameAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制部门ID">
              <AvicCommonSelect
                v-model:value="queryForm.editorDeptId"
                type="deptSelect"
                placeholder="请选择编制部门ID"
                :defaultShowValue="queryForm.editorDeptIdAlias"
                @callback="
                  result => {
                    queryForm.editorDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制部门编码">
              <AvicCommonSelect
                v-model:value="queryForm.editorDeptCode"
                type="deptSelect"
                placeholder="请选择编制部门编码"
                :defaultShowValue="queryForm.editorDeptCodeAlias"
                @callback="
                  result => {
                    queryForm.editorDeptCodeAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制部门名称">
              <AvicCommonSelect
                v-model:value="queryForm.editorDeptName"
                type="deptSelect"
                placeholder="请选择编制部门名称"
                :defaultShowValue="queryForm.editorDeptNameAlias"
                @callback="
                  result => {
                    queryForm.editorDeptNameAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制时间(起)">
              <a-date-picker
                v-model:value="queryForm.editorDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.editorDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="编制时间(止)">
              <a-date-picker
                v-model:value="queryForm.editorDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.editorDateBegin)"
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
        ref="mdsVendorProve"
        table-key="mdsVendorProve"
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
              v-hasPermi="['mdsVendorProve:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['mdsVendorProve:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button
              v-hasPermi="['mdsVendorProve:import']"
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
              v-hasPermi="['mdsVendorProve:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
              <template #icon>
                 <export-outlined />
              </template>
              导出
            </a-button>
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
          <template v-else-if="column.dataIndex === 'mdsVendorId'">
            <a @click="handleDetail(record)">
              {{ record.mdsVendorId }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record.id)">
              编辑
            </a-button>
            <a-button
              v-hasPermi="['mdsVendorProve:del']"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete([record.id], 'row')">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <mds-vendor-prove-add
      v-if="showAddModal"
      ref="addModal"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <mds-vendor-prove-edit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <mds-vendor-prove-detail
      v-if="showDetailModal"
      ref="detailModal"
      :form-id="formId"
      @close="showDetailModal = false"
    />
    <AvicExcelImport
      v-if="showImportModal"
      :formData="excelParams"
      title="单表模板导入"
      importUrl="/mms/mds/mdsvendorproves/importData/v1"
      downloadTemplateUrl="/mms/mds/mdsvendorproves/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { MdsVendorProveDto } from '@/api/avic/mms/mds/MdsVendorProveApi'; // 引入模块DTO
import { listMdsVendorProveByPage, delMdsVendorProve, exportExcel } from '@/api/avic/mms/mds/MdsVendorProveApi'; // 引入模块API
import MdsVendorProveAdd from './MdsVendorProveAdd.vue'; // 引入添加页面组件
import MdsVendorProveEdit from './MdsVendorProveEdit.vue'; // 引入编辑页面组件
import MdsVendorProveDetail from './MdsVendorProveDetail.vue'; // 引入详情页面组件
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
    title: '供应商信息表主键ID',
    dataIndex: 'mdsVendorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资质编号',
    dataIndex: 'proveNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资质名称',
    dataIndex: 'proveName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证',
    dataIndex: 'proveTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III',
    dataIndex: 'proveGradeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '发证单位',
    dataIndex: 'releaseDept',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发证日期',
    dataIndex: 'releaseDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '有效开始日期',
    dataIndex: 'effectiveBenDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '有效结束日期',
    dataIndex: 'effectiveEndDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '编制人ID',
    dataIndex: 'editorUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制人编码 ^ 员工编码',
    dataIndex: 'editorUserCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制人姓名',
    dataIndex: 'editorUserNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制部门ID',
    dataIndex: 'editorDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制部门编码',
    dataIndex: 'editorDeptCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制部门名称',
    dataIndex: 'editorDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制时间',
    dataIndex: 'editorDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<MdsVendorProveDto>({});
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
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'mdsVendorProve' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const proveTypeList = ref([]); // 资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证通用代码
const proveGradeList = ref([]); // 资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const lookupParams = [
  { fieldName: 'proveType', lookUpType: 'MDS_PROVE_TYPE' },
  { fieldName: 'proveGrade', lookUpType: 'MDS_VENDOR_LEVEL' }
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
function getList () {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listMdsVendorProveByPage(queryParam)
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
function getLookupList () {
  proxy.$getLookupByType(lookupParams, result => {
    proveTypeList.value = result.proveType;
    proveGradeList.value = result.proveGrade;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList () {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery () {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery () {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced () {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery (value) {
  const keyWord = {
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd () {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit (id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详细 */
function handleDetail (record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 导入 */
function handleImport () {
  showImportModal.value = true;
}
/** 导出 */
function handleExport () {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}
/** 删除 */
function handleDelete (ids, type) {
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
      delMdsVendorProve(ids)
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
function onSelectChange (rowKeys) {
  selectedRowKeys.value = rowKeys;
}
/** 表格排序 */
function handleTableChange (pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

</script>

