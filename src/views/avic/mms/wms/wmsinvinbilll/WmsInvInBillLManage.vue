<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="密级">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料">
              <a-input
                v-model:value="queryForm.mdsItemId"
                placeholder="请输入物料"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="供应商">
              <a-input
                v-model:value="queryForm.srmVendorId"
                placeholder="请输入供应商"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计量单位 ">
              <a-input
                v-model:value="queryForm.mdsUnitId"
                placeholder="请输入计量单位 "
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="不含税合同单价">
              <a-input
                v-model:value="queryForm.inPrice"
                placeholder="请输入不含税合同单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="含税合同单价">
              <a-input
                v-model:value="queryForm.arrivalUnitPrice"
                placeholder="请输入含税合同单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划价">
              <a-input
                v-model:value="queryForm.plannedPrice"
                placeholder="请输入计划价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批次">
              <a-input
                v-model:value="queryForm.batchNumber"
                placeholder="请输入批次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质量编号">
              <a-input
                v-model:value="queryForm.qualityCode"
                placeholder="请输入质量编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="订单类型">
              <a-input
                v-model:value="queryForm.orderType"
                placeholder="请输入订单类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效保管期(起)">
              <a-date-picker
                v-model:value="queryForm.ensureDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.ensureDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效保管期(止)">
              <a-date-picker
                v-model:value="queryForm.ensureDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.ensureDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长保管日期(起)">
              <a-date-picker
                v-model:value="queryForm.storageDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.storageDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="最长保管日期(止)">
              <a-date-picker
                v-model:value="queryForm.storageDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.storageDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="验收日期(起)">
              <a-date-picker
                v-model:value="queryForm.acceptanceDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.acceptanceDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="验收日期(止)">
              <a-date-picker
                v-model:value="queryForm.acceptanceDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.acceptanceDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封存日期(起)">
              <a-date-picker
                v-model:value="queryForm.archiveDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.archiveDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="封存日期(止)">
              <a-date-picker
                v-model:value="queryForm.archiveDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.archiveDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单据状态">
              <a-input
                v-model:value="queryForm.inBillLStatus"
                placeholder="请输入单据状态"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用型号">
              <a-input
                v-model:value="queryForm.confineProduct"
                placeholder="请输入限用型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用批次">
              <a-input
                v-model:value="queryForm.confineBatch"
                placeholder="请输入限用批次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用架次">
              <a-input
                v-model:value="queryForm.confineLot"
                placeholder="请输入限用架次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="限用说明">
              <a-input
                v-model:value="queryForm.confineDesc"
                placeholder="请输入限用说明"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="炉号">
              <a-input
                v-model:value="queryForm.stoveNo"
                placeholder="请输入炉号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批号">
              <a-input
                v-model:value="queryForm.batchNo"
                placeholder="请输入批号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="架次">
              <a-input
                v-model:value="queryForm.lotNo"
                placeholder="请输入架次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined/>
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced"/>
                  <down-outlined v-else/>
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
        ref="wmsInvInBillL"
        table-key="wmsInvInBillL"
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
        :customRow="customRow"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['wmsInvInBillL:save']"
              title="保存"
              type="primary"
              :loading="saveLoading"
              @click="handleSaveAll"
            >
              <template #icon>
                <save-outlined/>
              </template>
              保存
            </a-button>
            <a-button
              v-hasPermi="['wmsInvInBillL:save']"
              title="入库登账"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleRegister(selectedRowKeys, event,'');
                }
              "
            >
              入库登账
            </a-button>
            <a-button
              v-hasPermi="['wmsInvInBillL:del']"
              title="退回"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleBack(selectedRowKeys, event,'');
                }
              "
            >
              <template #icon>
                <delete-outlined/>
              </template>
              退回
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入退回原因"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
            v-if="column.dataIndex === 'ensureDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.ensureDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效保管期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="['inPrice','arrivalUnitPrice','refuseReason'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="20"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'archiveDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.archiveDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择封存日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'storageDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.storageDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择最长保管日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'mdsLocatorNo'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input v-model:value="record.mdsLocatorNo" placeholder="请选择库位" @click="locatorClick(record)">
                <template #suffix>
                  <a-tooltip title="库位" @click="locatorClick(record)">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>
                  </a-tooltip>
                </template>
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'acceptanceDate'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-date-picker
                v-model:value="record.acceptanceDate"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期"
              >
              </a-date-picker>
            </template>
          </AvicRowEdit>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              v-if="record.editable"
              type="link"
              class="inner-btn"
              :disable="editingId !== ''"
              @click.stop="handleSave(record)"
            >
              保存
            </a-button>
            <a-button
              v-else
              type="link"
              class="inner-btn"
              :disable="editingId !== ''"
              @click.stop="handleEdit(record)"
            >
              编辑
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <avic-excel-import
      v-if="showImportModal"
      :formData="excelParams"
      title="导入"
      importUrl="/mms/wms/wmsinvinbillls/importData/v1"
      downloadTemplateUrl="/mms/wms/wmsinvinbillls/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    ></avic-excel-import>
    <MdsLocatorSelect v-if="mdsLocatorModal" ref="mdsLocatorSelect" :visible="mdsLocatorModal"
                      @closeCancel="closeLocator" @getLocatorId="getLocatorId"/>
  </div>
</template>
<script lang="ts" setup>
import type {WmsInvInBillLDto} from '@/api/avic/mms/wms/WmsInvInBillLApi'; // 引入模块DTO
import {
  listWmsInvInBillLByPage,
  saveWmsInvInBillL,
  delWmsInvInBillL,
  exportExcel, doWmsInvInRegister, doBack
} from '@/api/avic/mms/wms/WmsInvInBillLApi'; // 引入模块API
import MdsLocatorSelect from "@/views/avic/mms/mds/mdslocator/MdsLocatorSelect.vue"; // 引入弹窗选择页

const {proxy} = getCurrentInstance();
const layout = {
  labelCol: {flex: '120px'},
  wrapperCol: {flex: '1'}
};
const colLayout = proxy.$colLayout4; // 调用布局公共方法
const columns = [
  {
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '退回原因',
    dataIndex: 'refuseReason',
    key: 'refuseReason',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房编码',
    dataIndex: 'mdsInventoryCode',
    key: 'mdsInventoryCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库房名称',
    dataIndex: 'mdsInventoryName',
    key: 'mdsInventoryName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '库位号',
    dataIndex: 'mdsLocatorNo',
    key: 'mdsLocatorNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料编码',
    dataIndex: 'mdsItemCode',
    key: 'mdsItemCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料名称',
    dataIndex: 'mdsItemName',
    key: 'mdsItemName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商编码',
    dataIndex: 'srmVendorCode',
    key: 'srmVendorCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商名称',
    dataIndex: 'srmVendorName',
    key: 'srmVendorName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计量单位 ',
    dataIndex: 'mdsUnitId',
    key: 'mdsUnitId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请数量',
    dataIndex: 'applyQty',
    key: 'applyQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '不含税合同单价',
    dataIndex: 'inPrice',
    key: 'inPrice',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '含税合同单价',
    dataIndex: 'arrivalUnitPrice',
    key: 'arrivalUnitPrice',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划价',
    dataIndex: 'plannedPrice',
    key: 'plannedPrice',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '单件数量',
    dataIndex: 'itemQty',
    key: 'itemQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '批次',
    dataIndex: 'batchNumber',
    key: 'batchNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量编号',
    dataIndex: 'qualityCode',
    key: 'qualityCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '订单类型',
    dataIndex: 'orderType',
    key: 'orderType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '有效保管期',
    dataIndex: 'ensureDate',
    key: 'ensureDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '最长保管日期',
    dataIndex: 'storageDate',
    key: 'storageDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '验收日期',
    dataIndex: 'acceptanceDate',
    key: 'acceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '封存日期',
    dataIndex: 'archiveDate',
    key: 'archiveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单据状态',
    dataIndex: 'inBillLStatusName',
    key: 'inBillLStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '限用型号',
    dataIndex: 'confineProduct',
    key: 'confineProduct',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '限用批次',
    dataIndex: 'confineBatch',
    key: 'confineBatch',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '限用架次',
    dataIndex: 'confineLot',
    key: 'confineLot',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '限用说明',
    dataIndex: 'confineDesc',
    key: 'confineDesc',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '炉号',
    dataIndex: 'stoveNo',
    key: 'stoveNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '批号',
    dataIndex: 'batchNo',
    key: 'batchNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '架次',
    dataIndex: 'lotNo',
    key: 'lotNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<WmsInvInBillLDto>({});
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
const wmsInvInBillL = ref(null);
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({tableName: 'wmsInvInBillL'}); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const saveLoading = ref(false); // 统一保存按钮loading 状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const validateRules = {}; // 必填列,便于保存和新增数据时校验
const editingId = ref(''); // 正在编辑中的数据
const mdsLocatorModal = ref<boolean>(false);// 是否展示库房弹窗
const mdsLocatorSelect = ref(null);
const editData = ref(null);

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listWmsInvInBillLByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      // 查询的初始数据,保存时做比对
      initialList.value = proxy.$lodash.cloneDeep(list.value);
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

/** 高级查询 重置按钮操作  */
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
    refuseReason: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    secretLevel: undefined,
    refuseReason: '',
    mdsLocatorId: '',
    mdsItemId: '',
    srmVendorId: '',
    mdsUnitId: '',
    applyQty: '',
    inPrice: '',
    arrivalUnitPrice: '',
    plannedPrice: '',
    itemQty: '',
    batchNumber: '',
    qualityCode: '',
    orderType: '',
    ensureDate: null,
    storageDate: null,
    acceptanceDate: null,
    archiveDate: null,
    inBillLStatus: '',
    confineProduct: '',
    confineBatch: '',
    confineLot: '',
    confineDesc: '',
    stoveNo: '',
    batchNo: '',
    lotNo: '',
    editable: true // true为编辑中, false为未编辑
  };
  editingId.value = item.id;
  let newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData)) {
    return;
  }
  // 其他列编辑状态修改为false
  newData.forEach(item => {
    item.editable = false;
  });
  newData.unshift(item);
  list.value = newData;
}

/** 编辑 */
function handleEdit(record) {
  record.editable = true;
  record.operationType_ = record.operationType_ || 'update';
  const newData = [...list.value];
  editingId.value = record.id;
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}

/** 保存 */
function handleSave(record) {
  let target = proxy.$lodash.cloneDeep(record);
  // 单数据校验
  if (!validateRecordData([target])) {
    return;
  }
  // 保存前数据处理
  for (let key in target) {
    // 多选控件的数据，数组转化为字符串，
    if (Array.isArray(target[key])) {
      target[key] = target[key].join(',');
    }
  }
  editingId.value = '';
  saveWmsInvInBillL([target]).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('保存成功！');
    } else {
      proxy.$message.error('保存失败！');
    }
  });
}

/** 批量保存 */
function handleSaveAll() {
  // 规避正在保存时连续点击
  if (saveLoading.value) return;
  // 开始处理数据
  saveLoading.value = true;
  // 获取改变和新增的数据
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && changedData.length == 0) {
    proxy.$message.warning('请先修改数据！');
    saveLoading.value = false;
  } else if (changedData && validateRecordData(changedData)) {
    saveWmsInvInBillL(changedData).then(res => {
      if (res.success) {
        getList();
        proxy.$message.success('保存成功！');
        saveLoading.value = false;
      } else {
        proxy.$message.error('保存失败！');
        saveLoading.value = false;
      }
    })
      .catch(() => {
        saveLoading.value = false;
      });
  } else {
    saveLoading.value = false;
  }
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
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}

/** 删除 */
function handleDelete(ids, e, type) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
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
      // 获取所有非新增的数据，执行后台删除逻辑，新增的数据直接界面删除
      const deleteIds = ids.filter(id => id.indexOf('newLine') == -1);
      if (deleteIds.length > 0) {
        return delWmsInvInBillL(deleteIds)
          .then(() => {
            removeRecordByIds(ids);
          })
          .catch(() => {
            delLoading.value = false;
          });
      } else {
        removeRecordByIds(ids);
      }
    }
  });
}

/** 入库登账 */
function handleRegister() {
  if (delLoading.value) return;  // 规避正在保存时连续点击
  let changedData = list.value.filter(i => selectedRowKeys.value.indexOf(i.id) !== -1).map(i => toRaw(i));
  if (!changedData || !changedData.length) {
    proxy.$message.warning('请选择要入库登账的数据！');
    return;
  }
  for (const bill of changedData) {
    if (bill.inBillLStatus === '15') {
      proxy.$message.warning('已入库登账，不允许重复提交！');
      return;
    }
  }
  proxy.$confirm({
    title: `确认要入库登账选择的数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      doWmsInvInRegister(changedData).then(() => {
        proxy.$message.success('操作成功！');
      }).catch(err => {
        proxy.$message.error(err.message);
      }).finally(() => {
        delLoading.value = false;
      });
    }
  });
}

/** 退回 */
function handleBack() {
  if (delLoading.value) return;  // 规避正在保存时连续点击
  let changedData = list.value.filter(i => selectedRowKeys.value.indexOf(i.id) !== -1).map(i => toRaw(i));
  if (!changedData || !changedData.length) {
    proxy.$message.warning('请选择要退回的数据！');
    return;
  }
  for (const bill of changedData) {
    if (bill.inBillLStatus === '15') {
      proxy.$message.warning('已入库登账，不允许退回！');
      return;
    }
    if (!bill.refuseReason) {
      proxy.$message.warning('退回原因不能为空！');
      return;
    }
  }
  proxy.$confirm({
    title: `确认要入库登账选择的数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      doWmsInvInRegister(changedData).then(() => {
        proxy.$message.success('操作成功！');
      }).catch(err => {
        proxy.$message.error(err.message);
      }).finally(() => {
        delLoading.value = false;
      });
    }
  });
}

/** 删除操作后更新list */
function removeRecordByIds(deleteIds) {
  let newData = [...list.value];
  let updateList = [...list.value];
  let delUpdateData = [];
  for (let i = 0; i < deleteIds.length; i++) {
    newData = newData.filter(item => item['id'] !== deleteIds[i]);
    delUpdateData = updateList.filter(
      item => item['id'] == deleteIds[i] && item['operationType_'] != 'insert'
    );
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  // 前台刷新表格
  list.value = newData;
  // 提示成功
  proxy.$message.success('删除成功！');
  delLoading.value = false;
  if (list.value.length == 0) {
    // 当前页数据被清空
    let currentPage = 1;
    if (queryParam.pageParameter.page > 1) {
      currentPage = queryParam.pageParameter.page - 1;
    }
    queryParam.pageParameter.page = currentPage;
    getList();
  } else {
    // 当前页数据没有全部删除时分页总条数为原total-删除数据中心非添加数据个数
    totalPage.value = totalPage.value - delUpdateData.length;
  }
}

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}

/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}

/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, wmsInvInBillL);
    if (!flag) {
      break;
    }
  }
  return flag;
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

/** 库位弹窗 */
const locatorClick = (record) => {
  mdsLocatorModal.value = true;
  editData.value = record;
};
/** 关闭库位弹窗 */
const closeLocator = () => {
  mdsLocatorModal.value = false;
};
const getLocatorId = (v) => {
  editData.value.mdsLocatorId = v.id;
  editData.value.mdsLocatorNo = v.locatorNo;
  mdsLocatorModal.value = false;
};
</script>

