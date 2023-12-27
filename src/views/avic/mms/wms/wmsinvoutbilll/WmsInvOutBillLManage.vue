<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="单据状态">
                  <a-select v-model:value="queryForm.outBillLStatus"
                    :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                    :show-search="true" :allow-clear="true" placeholder="请选择单据状态">
                    <a-select-option v-for="item in outBillLStatusList" :key="item.sysLookupTlId"
                      :value="item.lookupCode">
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="密级">
                  <a-select v-model:value="queryForm.secretLevel"
                    :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                    :show-search="true" :allow-clear="true" placeholder="请选择密级">
                    <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="计划类型">
                  <a-input v-model:value="queryForm.planType" placeholder="请输入计划类型" :allow-clear="true"
                    @pressEnter="handleQuery" />
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
          <AvicTable ref="wmsInvOutBillL" table-key="wmsInvOutBillL" :columns="columns" :row-key="record => record.id"
            :data-source="list" :loading="loading" :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 40,
              fixed: true
            }" :pageParameter="queryParam.pageParameter" :total="totalPage" rowClickSelectionType="radio"
            @change="handleTableChange" @refresh="getList">
            <template #toolBarLeft>
              <a-space>
                <a-button v-hasPermi="['wmsInvOutBillL:add']" title="退回" type="primary" @click="handleAdd">
                  <template #icon>
                    <avic-icon svg='avic-reply-fill' />
                  </template>
                  退回
                </a-button>
                <a-button v-hasPermi="['wmsInvOutBillL:del']" title="提交校验" danger
                  :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
                  @click="handleDelete(selectedRowKeys, '')">
                  <template #icon>
                    <avic-icon svg='avic-upload-2-fill' />
                  </template>
                  提交校验
                </a-button>
                <a-button v-hasPermi="['wmsInvOutBillL:import']" title="撤回提检" type="primary" ghost @click="handleImport">
                  <template #icon>
                    <avic-icon svg='avic-reply-all-fill' />
                  </template>
                  撤回提检
                </a-button>
                <a-button v-hasPermi="['wmsInvOutBillL:export']" title="出库登账" type="primary" ghost @click="handleExport">
                  <template #icon>
                    <avic-icon svg='avic-logout-box-r-fill' />
                  </template>
                  出库登账
                </a-button>
                <a-button v-hasPermi="['wmsInvOutBillL:export']" title="合计需求数量" type="primary" ghost
                  @click="handleExport">
                  <template #icon>
                    <avic-icon svg='avic-checkbox-circle-line' />
                  </template>
                  合计需求数量
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入申请单主表ID或原始单据表ID"
                :allow-clear="true" @search="handleKeyWordQuery" />
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'wmsInvOutBillId'">
                <a @click="handleDetail(record)">
                  {{ record.wmsInvOutBillId }}
                </a>
              </template>
              <template v-else-if="column.dataIndex === 'action'">
                <a-button type="link" class="inner-btn" @click.stop="handleEdit(record.id)">
                  编辑
                </a-button>
                <a-button v-hasPermi="['wmsInvOutBillL:del']" type="link" class="inner-btn"
                  @click.stop="handleDelete([record.id], 'row')">
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <wms-inv-out-bill-l-add v-if="showAddModal" ref="addModal" @reloadData="getList" @close="showAddModal = false" />
      <!-- 编辑页面弹窗 -->
      <wms-inv-out-bill-l-edit v-if="showEditModal" ref="editModal" :form-id="formId" @reloadData="getList"
        @close="showEditModal = false" />
      <!-- 详情页面弹窗 -->
      <wms-inv-out-bill-l-detail v-if="showDetailModal" ref="detailModal" :form-id="formId"
        @close="showDetailModal = false" />
      <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="模板导入"
        importUrl="/mms/wms/wmsinvoutbillls/importData/v1"
        downloadTemplateUrl="/mms/wms/wmsinvoutbillls/downloadTemplate/v1" @reloadData="getList"
        @close="showImportModal = false" />
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <!-- <wms-check-record-manage key="wmsCheckRecordManage" ref="wmsCheckRecordManage" :mainId="mainId" /> -->
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="库存信息">
          <WmsCheckRecordManage key="mdsCustomerLManage" ref="mdsCustomerLManage" :mainId="mainId" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="送检信息">
          <WmsCheckRecordManage key="mdsCustomerLManage" ref="mdsCustomerLManage" :mainId="mainId" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="ERP3.0台账">
          <WmsCheckRecordManage key="mdsCustomerLManage" ref="mdsCustomerLManage" :mainId="mainId" />
        </a-tab-pane>
      </a-tabs>
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { WmsInvOutBillLDto } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块DTO
import { listWmsInvOutBillLByPage, delWmsInvOutBillL, exportExcel } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块API
import WmsInvOutBillLAdd from './WmsInvOutBillLAdd.vue'; // 引入添加页面组件
import WmsInvOutBillLEdit from './WmsInvOutBillLEdit.vue'; // 引入编辑页面组件
import WmsInvOutBillLDetail from './WmsInvOutBillLDetail.vue'; // 引入详情页面组件
import WmsCheckRecordManage from '../wmscheckrecord/WmsCheckRecordManage.vue'; // 引入子表页面组件
const activeKey = ref('1');
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
    title: '申请单主表ID',
    dataIndex: 'wmsInvOutBillId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原始单据表ID',
    dataIndex: 'originalOrderDetailId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原始单据表名',
    dataIndex: 'originalOrderTabName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料ID',
    dataIndex: 'mdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '台账ID',
    dataIndex: 'wmsItemInventoryId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量编号',
    dataIndex: 'qualityCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供方合格证号',
    dataIndex: 'supplyCertificationNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '炉号',
    dataIndex: 'stoveNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批号/批次',
    dataIndex: 'batchNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请数量',
    dataIndex: 'applyQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库数量',
    dataIndex: 'outQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人ID',
    dataIndex: 'outUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人编码',
    dataIndex: 'outUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人姓名',
    dataIndex: 'outUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库日期',
    dataIndex: 'outDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '接收人ID',
    dataIndex: 'recieveUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收人编码',
    dataIndex: 'recieveUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收人姓名',
    dataIndex: 'recieveUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收日期',
    dataIndex: 'recieveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '拒绝原因',
    dataIndex: 'refuseReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注、批料备注',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '单据状态',
    dataIndex: 'outBillLStatusName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '机型',
    dataIndex: 'proMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '架次',
    dataIndex: 'lotNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '父件ID',
    dataIndex: 'parentMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划价',
    dataIndex: 'plannedPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '派工号',
    dataIndex: 'missionNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商ID',
    dataIndex: 'srmVendorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格证ID',
    dataIndex: 'qcCertificationId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格证号',
    dataIndex: 'certificationNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批数量',
    dataIndex: 'approveQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批日期',
    dataIndex: 'approveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '审批人ID',
    dataIndex: 'approveUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批人编码',
    dataIndex: 'approveUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批人姓名',
    dataIndex: 'approveUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急放行标识',
    dataIndex: 'urgentReleaseFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急放行单号',
    dataIndex: 'urgentReleaseNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否关闭 ',
    dataIndex: 'ynCloseName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '关闭数量',
    dataIndex: 'closeQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关闭日期',
    dataIndex: 'closeDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '关闭人ID',
    dataIndex: 'closeUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关闭人编码',
    dataIndex: 'closeUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关闭人姓名',
    dataIndex: 'closeUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item01',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item02',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item03',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item04',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item05',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item06',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item07',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item08',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item09',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item10',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item11',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item12',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item13',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item14',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item15',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item16',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item17',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item18',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item19',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item20',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门ID',
    dataIndex: 'outDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门CODE',
    dataIndex: 'outDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门NAME',
    dataIndex: 'outDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票关联表ID【冗余字段】^用于是否关联发票',
    dataIndex: 'pmsInvoiceAssonInvBillId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否下料',
    dataIndex: 'cuttingFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '出库需求表ID',
    dataIndex: 'momOutRequireId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '余料数量',
    dataIndex: 'surplusQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '余料尺寸',
    dataIndex: 'surplusSize',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急程度/发放进度',
    dataIndex: 'urgentLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人ID',
    dataIndex: 'planOpenUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人CODE',
    dataIndex: 'planOpenUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人NAME',
    dataIndex: 'planOpenUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放时间',
    dataIndex: 'planOpenDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下料站点ID',
    dataIndex: 'siteId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下料站点CODE',
    dataIndex: 'siteCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下料站点NAME',
    dataIndex: 'siteName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求日期',
    dataIndex: 'requireDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
    title: '计划类型',
    dataIndex: 'planType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '派工单号',
    dataIndex: 'dispatchListNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原申请物料id',
    dataIndex: 'originalItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '代料/发放依据',
    dataIndex: 'grantBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否资源选择其它系统',
    dataIndex: 'otherSysFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '工艺路线',
    dataIndex: 'workLine',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否上机标识',
    dataIndex: 'ynInstallFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '偏离单编号',
    dataIndex: 'deflectionBillno',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检斤数量',
    dataIndex: 'checkKiloQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
  // ,
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   ellipsis: true,
  //   width: 120,
  //   fixed: 'right'
  // }
];
const queryForm = ref<WmsInvOutBillLDto>({});
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
const excelParams = ref({ tableName: 'wmsInvOutBillL' }); // 必填参数tableName全局唯一，与tableKey保持一致
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const ynCloseList = ref([]); // 是否关闭 通用代码
const cuttingFlagList = ref([]); // 是否下料通用代码
const secretLevelList = ref([]); // 密级通用代码
const otherSysFlagList = ref([]); // 是否资源选择其它系统通用代码
const ynInstallFlagList = ref([]); // 是否上机标识通用代码
const outBillLStatusList = ref([]);//单据状态通用代码
const lookupParams = [
  { fieldName: 'ynClose', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'cuttingFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'otherSysFlag', lookUpType: 'YN_FLAG' },
  { fieldName: 'ynInstallFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'outBillLStatus', lookUpType: 'WMS_OUT_BILL_L_STATUS' }
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
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listWmsInvOutBillLByPage(queryParam)
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
    ynCloseList.value = result.ynClose;
    cuttingFlagList.value = result.cuttingFlag;
    otherSysFlagList.value = result.otherSysFlag;
    ynInstallFlagList.value = result.ynInstallFlag;
    outBillLStatusList.value = result.outBillLStatus;
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
    wmsInvOutBillId: value,
    originalOrderDetailId: value
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
      exportExcel(queryParam).then(() => {
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
      delWmsInvOutBillL(ids)
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

<style lang="less">
.splitpanes__inner {
  .ant-tabs-card {
    height: 100%;
  }
}

.ant-tabs-content-holder {
  height: 100%;
}

.ant-tabs-content {
  height: 100%;
}
</style>