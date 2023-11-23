<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产编码">
              <a-input
                v-model:value="queryForm.assetCode"
                placeholder="请输入资产编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产名称">
              <a-input
                v-model:value="queryForm.assetName"
                placeholder="请输入资产名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产密级">
              <a-input
                v-model:value="queryForm.assetSecretLevel"
                placeholder="请输入资产密级"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="设备编号">
              <a-input
                v-model:value="queryForm.equipNo"
                placeholder="请输入设备编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产型号">
              <a-input
                v-model:value="queryForm.assetModel"
                placeholder="请输入资产型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产原值（元）">
              <a-input
                v-model:value="queryForm.assetOriginalValue"
                placeholder="请输入资产原值（元）"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="购置时间(起)">
              <a-date-picker
                v-model:value="queryForm.purchaseTimeBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.purchaseTimeEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="购置时间(止)">
              <a-date-picker
                v-model:value="queryForm.purchaseTimeEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.purchaseTimeBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产净值">
              <a-input
                v-model:value="queryForm.assetNetValue"
                placeholder="请输入资产净值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出厂序列号">
              <a-input
                v-model:value="queryForm.factorySerialNumber"
                placeholder="请输入出厂序列号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产规格">
              <a-input
                v-model:value="queryForm.assetSpec"
                placeholder="请输入资产规格"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="涉密存储介质清单">
              <a-input
                v-model:value="queryForm.classifiedMediaList"
                placeholder="请输入涉密存储介质清单"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="配件、附件工具清单">
              <a-input
                v-model:value="queryForm.attachmentToolList"
                placeholder="请输入配件、附件工具清单"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="报废原因">
              <a-input
                v-model:value="queryForm.scrapReason"
                placeholder="请输入报废原因"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="处置类型">
              <a-input
                v-model:value="queryForm.handleType"
                placeholder="请输入处置类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="使用年限">
              <a-input
                v-model:value="queryForm.lifeYear"
                placeholder="请输入使用年限"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="累计折旧">
              <a-input
                v-model:value="queryForm.depreciationValue"
                placeholder="请输入累计折旧"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="品牌型号">
              <a-input
                v-model:value="queryForm.brandModel"
                placeholder="请输入品牌型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="建设项目">
              <a-input
                v-model:value="queryForm.buildProject"
                placeholder="请输入建设项目"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否上会">
              <a-select
                v-model:value="queryForm.isAttend"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否上会"
              >
                <a-select-option
                  v-for="item in isAttendList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="所内决策商会决议文号">
              <a-input
                v-model:value="queryForm.documentNumber"
                placeholder="请输入所内决策商会决议文号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="所内决策上会日期(起)">
              <a-date-picker
                v-model:value="queryForm.meetingDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择所内决策上会日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.meetingDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="所内决策上会日期(止)">
              <a-date-picker
                v-model:value="queryForm.meetingDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择所内决策上会日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.meetingDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否已上报集团">
              <a-select
                v-model:value="queryForm.reportToGroup"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否已上报集团"
              >
                <a-select-option
                  v-for="item in reportToGroupList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="上报集团日期(起)">
              <a-date-picker
                v-model:value="queryForm.reportingDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择上报集团日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.reportingDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="上报集团日期(止)">
              <a-date-picker
                v-model:value="queryForm.reportingDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择上报集团日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.reportingDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="上报集团文件号">
              <a-input
                v-model:value="queryForm.reportingFileNumber"
                placeholder="请输入上报集团文件号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="集团是否已批复">
              <a-select
                v-model:value="queryForm.hasBeenApproved"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择集团是否已批复"
              >
                <a-select-option
                  v-for="item in hasBeenApprovedList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="集团批复文件">
              <a-input
                v-model:value="queryForm.groupApprovalDocuments"
                placeholder="请输入集团批复文件"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="集团批复时间(起)">
              <a-date-picker
                v-model:value="queryForm.approvalTimeBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择集团批复时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.approvalTimeEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="集团批复时间(止)">
              <a-date-picker
                v-model:value="queryForm.approvalTimeEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择集团批复时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.approvalTimeBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否为军工关键设备">
              <a-select
                v-model:value="queryForm.isMilitaryIndustry"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否为军工关键设备"
              >
                <a-select-option
                  v-for="item in isMilitaryIndustryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否已上报科工局">
              <a-select
                v-model:value="queryForm.isIndustry"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否已上报科工局"
              >
                <a-select-option
                  v-for="item in isIndustryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="科工局是否已批复">
              <a-select
                v-model:value="queryForm.approvedOrNot"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择科工局是否已批复"
              >
                <a-select-option
                  v-for="item in approvedOrNotList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="科工局批复文号">
              <a-input
                v-model:value="queryForm.isScienceIndustry"
                placeholder="请输入科工局批复文号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否完成">
              <a-select
                v-model:value="queryForm.completedOrNot"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否完成"
              >
                <a-select-option
                  v-for="item in completedOrNotList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="处置收入凭证号">
              <a-input
                v-model:value="queryForm.disposalVoucherNumber"
                placeholder="请输入处置收入凭证号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="处置收入（元）">
              <a-input
                v-model:value="queryForm.disposalIncome"
                placeholder="请输入处置收入（元）"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注">
              <a-input
                v-model:value="queryForm.notess"
                placeholder="请输入备注"
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
        ref="famScrapLedgerSelect"
        table-key="famScrapLedgerSelect"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :show-table-setting="false"
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
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FamScrapLedgerDto } from '@/api/avic/mms/fam/FamScrapLedgerApi'; // 引入模块DTO
import { listFamScrapLedgerByPage } from '@/api/avic/mms/fam/FamScrapLedgerApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const famScrapLedgerSelect = ref();
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
    title: '资产编码',
    dataIndex: 'assetCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产名称',
    dataIndex: 'assetName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产密级',
    dataIndex: 'assetSecretLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产型号',
    dataIndex: 'assetModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值（元）',
    dataIndex: 'assetOriginalValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '购置时间',
    dataIndex: 'purchaseTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产净值',
    dataIndex: 'assetNetValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂序列号',
    dataIndex: 'factorySerialNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产规格',
    dataIndex: 'assetSpec',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '涉密存储介质清单',
    dataIndex: 'classifiedMediaList',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '配件、附件工具清单',
    dataIndex: 'attachmentToolList',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '报废原因',
    dataIndex: 'scrapReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '处置类型',
    dataIndex: 'handleType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用年限',
    dataIndex: 'lifeYear',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '累计折旧',
    dataIndex: 'depreciationValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '品牌型号',
    dataIndex: 'brandModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '建设项目',
    dataIndex: 'buildProject',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否上会',
    dataIndex: 'isAttendName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '所内决策商会决议文号',
    dataIndex: 'documentNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '所内决策上会日期',
    dataIndex: 'meetingDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否已上报集团',
    dataIndex: 'reportToGroupName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '上报集团日期',
    dataIndex: 'reportingDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '上报集团文件号',
    dataIndex: 'reportingFileNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '集团是否已批复',
    dataIndex: 'hasBeenApprovedName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '集团批复文件',
    dataIndex: 'groupApprovalDocuments',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '集团批复时间',
    dataIndex: 'approvalTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否为军工关键设备',
    dataIndex: 'isMilitaryIndustryName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否已上报科工局',
    dataIndex: 'isIndustryName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '科工局是否已批复',
    dataIndex: 'approvedOrNotName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '科工局批复文号',
    dataIndex: 'isScienceIndustry',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否完成',
    dataIndex: 'completedOrNotName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '处置收入凭证号',
    dataIndex: 'disposalVoucherNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '处置收入（元）',
    dataIndex: 'disposalIncome',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注',
    dataIndex: 'notess',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    visible: false,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<FamScrapLedgerDto>({});
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
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const  totalPage = ref(0);
const secretLevelList = ref([]); // 数据密级通用代码
const isAttendList = ref([]); // 是否上会通用代码
const reportToGroupList = ref([]); // 是否已上报集团通用代码
const hasBeenApprovedList = ref([]); // 集团是否已批复通用代码
const isMilitaryIndustryList = ref([]); // 是否为军工关键设备通用代码
const isIndustryList = ref([]); // 是否已上报科工局通用代码
const approvedOrNotList = ref([]); // 科工局是否已批复通用代码
const completedOrNotList = ref([]); // 是否完成通用代码
const lookupParams = [
  { fieldName: 'isAttend', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'reportToGroup', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'hasBeenApproved', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'isMilitaryIndustry', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'isIndustry', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'approvedOrNot', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'completedOrNot', lookUpType: 'FAM_PROGRAM_VERSION' }
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
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listFamScrapLedgerByPage(queryParam)
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
    isAttendList.value = result.isAttend;
    reportToGroupList.value = result.reportToGroup;
    hasBeenApprovedList.value = result.hasBeenApproved;
    isMilitaryIndustryList.value = result.isMilitaryIndustry;
    isIndustryList.value = result.isIndustry;
    approvedOrNotList.value = result.approvedOrNot;
    completedOrNotList.value = result.completedOrNot;
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
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  // 传出选中项
  $emit('select', selectedRows.value);
}
/** 表格排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 行双击事件 */
function customRow (record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
</script>

