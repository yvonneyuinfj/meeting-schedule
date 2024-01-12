<template>
  <AvicSplit horizontal>
    <AvicPane size="65">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="资产编号">
                  <a-input
                    v-model:value="queryForm.assetsCode"
                    placeholder="请输入资产编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="设备编号">
                  <a-input
                    v-model:value="queryForm.equipmentCode"
                    placeholder="请输入设备编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="设备名称">
                  <a-input
                    v-model:value="queryForm.equipmentName"
                    placeholder="请输入设备名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备规格">
                  <a-input
                    v-model:value="queryForm.specs"
                    placeholder="请输入设备规格"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="设备型号">
                  <a-input
                    v-model:value="queryForm.model"
                    placeholder="请输入设备型号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
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
          <AvicTable
            ref="tpmInventory"
            table-key="tpmInventory"
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
            rowClickSelectionType="radio"
            @change="handleTableChange"
            @refresh="getList"
          >
            <template #toolBarLeft>
              <a-space>
                <a-button
                  v-hasPermi="['tpmInventory:add']"
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
                  v-hasPermi="['tpmInventory:del']"
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
                  v-hasPermi="['tpmInventory:import']"
                  title="导入"
                  type="primary"
                  ghost
                  @click="handleImport"
                >
                  <template #icon>
                    <import-outlined />
                  </template>
                  导入
                </a-button>
                <a-button
                  v-hasPermi="['tpmInventory:export']"
                  title="导出"
                  type="primary"
                  ghost
                  @click="handleExport"
                >
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
                style="width: 250px"
                placeholder="请输入设备编号或设备名称"
                :allow-clear="true"
                @search="handleKeyWordQuery"
              />
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'equipmentCode'">
                <a @click="handleDetail(record)">
                  {{ record.equipmentCode }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'creationDate'">
                {{ $dayjs(record.creationDate).format('YYYY-MM-DD') }}
              </template>
              <template v-else-if="column.dataIndex === 'action'">
                <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['tpmInventory:del']"
                  type="link"
                  class="inner-btn"
                  @click.stop="handleDelete([record.id], 'row')"
                >
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <tpm-inventory-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <tpm-inventory-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <tpm-inventory-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="模板导入"
        importUrl="/mms/tpm/tpminventorys/importData/Camera/v1"
        downloadTemplateUrl="/mms/tpm/tpminventorys/downloadTemplate/Camera/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
    </AvicPane>
    <AvicPane collapsible="bottom" height="150px">
      <!-- 子表组件 -->
      <!-- <tpm-inventory-property-manage
        key="tpmInventoryPropertyManage"
        ref="tpmInventoryPropertyManage"
        :mainId="mainId"
      /> -->
      <tpm-cameras-inventory-manage
        key="tpmCamerasInventoryManage"
        ref="tpmCamerasInventoryManage"
        :mainId="mainId"
      />
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { TpmInventoryDto } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块DTO
import {
  listTpmInventoryByPage,
  delTpmInventory,
  exportInventoryCameraExcel
} from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块API
import TpmInventoryAdd from './TpmInventoryAdd.vue'; // 引入添加页面组件
import TpmInventoryEdit from './TpmInventoryEdit.vue'; // 引入编辑页面组件
import TpmInventoryDetail from './TpmInventoryDetail.vue'; // 引入详情页面组件
import TpmCamerasInventoryManage from '../tpmcamerasinventory/TpmCamerasInventoryManage.vue'; // 引入子表页面组件
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '100px' },
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
    title: '设备类型',
    dataIndex: 'equipmentTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备大类',
    dataIndex: 'className',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产编号',
    dataIndex: 'assetsCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产属性',
    dataIndex: 'assetAttributeName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '责任人',
    dataIndex: 'responseUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用部门',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备状态',
    dataIndex: 'equipmentStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备区域',
    dataIndex: 'areaName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'storageLocation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作系统安装日期',
    dataIndex: 'systemInstallDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '硬盘序列号',
    dataIndex: 'hdSerialNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  {
    title: '设备序列号',
    dataIndex: 'equipmentSerialNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '创建人',
    dataIndex: 'attribute01',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'creationDate',
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
const queryForm = ref<TpmInventoryDto>({
  equipmentType: '15'
});
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
const excelParams = ref({ tableName: 'tpmInventory' }); // 必填参数tableName全局唯一，与tableKey保持一致
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const equipmentTypeList = ref([]); // 设备类型通用代码
const abcdTypeList = ref([]); // 设备级别，ABCD分类通用代码
const keyOnlyChildFlagList = ref([]); // 是否关键独生子通用代码
const cncTypeList = ref([]); // 数控分类通用代码
const equipmentStatusList = ref([]); // 设备状态通用代码
const assetsStatusList = ref([]); // 资产状态通用代码
const ynEntranceList = ref([]); // 是否进口通用代码
const secretLevelList = ref([]); // 数据密级通用代码
const ynMilitaryKeyEquipList = ref([]); // 是否军工关键设备通用代码
const ynFixedList = ref([]); // 是转固，通用代码：PLATFORM_YES_NO_FLAG^ Y是，N否通用代码
const assetTypeList = ref([]); // 资产类别通用代码
const assetsUseList = ref([]); // 资产用途通用代码
const transferProjectTypeList = ref([]); // 移交项目类别通用代码
const ynMaintainList = ref([]); // 是否保养通用代码
const ynTransferRecordList = ref([]); // 是否调拨通用代码
const equipmentUseList = ref([]); // 用途通用代码
const ynBottleneckEquipmentList = ref([]); // 是否瓶颈设备通用代码
const energyEfficiencyList = ref([]); // 能效通用代码
const ynAnnualInspectionList = ref([]); // 是否年检通用代码
const capitalSourceList = ref([]); // 资金来源通用代码
const lookupParams = [
  { fieldName: 'equipmentType', lookUpType: 'TPM_EQUIPMENT_TYPE' },
  { fieldName: 'abcdType', lookUpType: 'TPM_ABCD_TYPE' },
  { fieldName: 'keyOnlyChildFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'cncType', lookUpType: 'TPM_CNC_TYPE' },
  { fieldName: 'equipmentStatus', lookUpType: 'TPM_EQUIPMENT_STATUS' },
  { fieldName: 'assetsStatus', lookUpType: 'TPM_ASSETS_STATUS' },
  { fieldName: 'ynEntrance', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynFixed', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'assetType', lookUpType: 'TPM_ASSET_TYPE' },
  { fieldName: 'assetsUse', lookUpType: 'TPM_ASSETS_USE' },
  { fieldName: 'transferProjectType', lookUpType: 'TPM_TRANSFER_PROJECT_TYPE' },
  { fieldName: 'ynMaintain', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynTransferRecord', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'equipmentUse', lookUpType: 'TPM_EQUIPMENT_USE' },
  { fieldName: 'ynBottleneckEquipment', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'energyEfficiency', lookUpType: 'TPM_ENERGY_EFFICIENCY' },
  { fieldName: 'ynAnnualInspection', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'capitalSource', lookUpType: 'TPM_CAPITAL_SOURCE' }
];

// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
});

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
  if (proxy.$getLoginUser().entityDeptCode !== 'C410'){
    queryParam.searchParams.useDeptId = proxy.$getLoginUser().entityDeptId;
  }
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmInventoryByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      // 设置表格初始选中项
      if (list.value.length > 0) {
        selectedRowKeys.value = [list.value[0]['id']];
      } else {
        selectedRowKeys.value = [];
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
    equipmentTypeList.value = result.equipmentType;
    abcdTypeList.value = result.abcdType;
    keyOnlyChildFlagList.value = result.keyOnlyChildFlag;
    cncTypeList.value = result.cncType;
    equipmentStatusList.value = result.equipmentStatus;
    assetsStatusList.value = result.assetsStatus;
    ynEntranceList.value = result.ynEntrance;
    ynMilitaryKeyEquipList.value = result.ynMilitaryKeyEquip;
    ynFixedList.value = result.ynFixed;
    assetTypeList.value = result.assetType;
    assetsUseList.value = result.assetsUse;
    transferProjectTypeList.value = result.transferProjectType;
    ynMaintainList.value = result.ynMaintain;
    ynTransferRecordList.value = result.ynTransferRecord;
    equipmentUseList.value = result.equipmentUse;
    ynBottleneckEquipmentList.value = result.ynBottleneckEquipment;
    energyEfficiencyList.value = result.energyEfficiency;
    ynAnnualInspectionList.value = result.ynAnnualInspection;
    capitalSourceList.value = result.capitalSource;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级搜索按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询重置按钮操作  */
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
    equipmentCode: value,
    equipmentName: value
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
/** 详情 */
function handleDetail(record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 导入 */
function handleImport() {
  showImportModal.value = true;
}
/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      exportInventoryCameraExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}
/** 删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '已选数据及关联的子表'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmInventory(ids)
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
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
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

