<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="备注">
              <a-input v-model:value="queryForm.note" placeholder="请输入备注" :allow-clear="true" @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="密级">
              <a-select v-model:value="queryForm.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="单据号">
              <a-input v-model:value="queryForm.billNo" placeholder="请输入单据号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划年度">
              <a-date-picker v-model:value="queryForm.applyYear" placeholder="请输入计划年度" :allow-clear="true" format="YYYY"
                value-format="YYYY" picker="year" @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报人">
              <AvicCommonSelect v-model:value="queryForm.editUserId" type="userSelect" placeholder="请选择填报人ID"
                :defaultShowValue="queryForm.editUserIdAlias" @callback="
                  result => {
                    queryForm.editUserIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报人姓名">
              <a-input v-model:value="queryForm.editUserName" placeholder="请输入填报人姓名" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报日期(起)">
              <a-date-picker v-model:value="queryForm.editDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择填报日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.editDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报日期(止)">
              <a-date-picker v-model:value="queryForm.editDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择填报日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.editDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报人编码">
              <a-input v-model:value="queryForm.editUserCode" placeholder="请输入填报人编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报部门">
              <AvicCommonSelect v-model:value="queryForm.editDeptId" type="deptSelect" placeholder="请选择填报部门ID"
                :defaultShowValue="queryForm.editDeptIdAlias" @callback="
                  result => {
                    queryForm.editDeptIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报部门编码">
              <a-input v-model:value="queryForm.editDeptCode" placeholder="请输入填报部门编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="填报部门名称">
              <a-input v-model:value="queryForm.editDeptName" placeholder="请输入填报部门名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="流程状态">
              <a-input v-model:value="queryForm.billStatus" placeholder="请输入流程状态" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划编号">
              <a-input v-model:value="queryForm.planNo" placeholder="请输入计划编号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算项目">
              <a-input v-model:value="queryForm.budgetItems" placeholder="请输入预算项目" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算分项">
              <a-input v-model:value="queryForm.budgetBreakdownItems" placeholder="请输入预算分项" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算组织">
              <AvicCommonSelect v-model:value="queryForm.budgetOrganizationId" type="groupSelect" placeholder="请选择预算组织"
                :defaultShowValue="queryForm.budgetOrganizationIdAlias" @callback="
                  result => {
                    queryForm.budgetOrganizationIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算组织编码">
              <a-input v-model:value="queryForm.budgetOrganizationCode" placeholder="请输入预算组织编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预算组织名称">
              <AvicCommonSelect v-model:value="queryForm.budgetOrganizationName" type="groupSelect"
                placeholder="请选择预算组织名称" :defaultShowValue="queryForm.budgetOrganizationNameAlias" @callback="
                  result => {
                    queryForm.budgetOrganizationNameAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目名称">
              <a-input v-model:value="queryForm.projectName" placeholder="请输入项目名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>-->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划类别">
              <a-select v-model:value="queryForm.planType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择计划类别">
                <a-select-option v-for="item in planTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求部门">
              <AvicCommonSelect v-model:value="queryForm.requireDeptId" type="deptSelect" placeholder="请选择需求部门"
                :defaultShowValue="queryForm.requireDeptIdAlias" @callback="
                  result => {
                    queryForm.requireDeptIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="需求部门编码">
              <a-input v-model:value="queryForm.requireDeptCode" placeholder="请输入需求部门编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="需求部门名称">
              <a-input v-model:value="queryForm.requireDeptName" placeholder="请输入需求部门名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目金额（万元）">
              <a-input v-model:value="queryForm.projectMoney" placeholder="请输入项目金额（万元）" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同预计签订时间(起)">
              <a-date-picker v-model:value="queryForm.estContractSignDateBegin" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" placeholder="请选择合同预计签订时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.estContractSignDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同预计签订时间(止)">
              <a-date-picker v-model:value="queryForm.estContractSignDateEnd" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" placeholder="请选择合同预计签订时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.estContractSignDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划验收时间(起)">
              <a-date-picker v-model:value="queryForm.estAcceptanceDateBegin" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" placeholder="请选择计划验收时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.estAcceptanceDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划验收时间(止)">
              <a-date-picker v-model:value="queryForm.estAcceptanceDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择计划验收时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.estAcceptanceDateBegin)" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="经办人ID">
              <AvicCommonSelect v-model:value="queryForm.agentId" type="userSelect" placeholder="请选择经办人ID"
                :defaultShowValue="queryForm.agentIdAlias" @callback="
                  result => {
                    queryForm.agentIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="经办人编码">
              <a-input v-model:value="queryForm.agentCode" placeholder="请输入经办人编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="经办人姓名">
              <a-input v-model:value="queryForm.agentName" placeholder="请输入经办人姓名" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请单号">
              <a-input v-model:value="queryForm.applyNo" placeholder="请输入申请单号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同编号">
              <a-input v-model:value="queryForm.contractNo" placeholder="请输入合同编号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同实际签订时间(起)">
              <a-date-picker v-model:value="queryForm.contractSignDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择合同实际签订时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.contractSignDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合同实际签订时间(止)">
              <a-date-picker v-model:value="queryForm.contractSignDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择合同实际签订时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.contractSignDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="实际完成时间（完成验收）(起)">
              <a-date-picker v-model:value="queryForm.acceptanceDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择实际完成时间（完成验收）(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.acceptanceDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="实际完成时间（完成验收）(止)">
              <a-date-picker v-model:value="queryForm.acceptanceDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择实际完成时间（完成验收）(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.acceptanceDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="进度状态">
              <a-select v-model:value="queryForm.progressStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择进度状态">
                <a-select-option v-for="item in progressStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="变更原因">
              <a-input v-model:value="queryForm.changeReason" placeholder="请输入变更原因" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col> -->
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
      <AvicTable ref="tpmYearMaintModifyPlanAll" table-key="tpmYearMaintModifyPlanAll" :columns="columns"
        :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" @change="handleTableChange" @refresh="getList">
        <template #toolBarLeft>
          <a-space>
            <!-- <a-button
              v-hasPermi="['tpmYearMaintModifyPlanAll:add']"
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
              v-hasPermi="['tpmYearMaintModifyPlanAll:edit']"
              title="编辑"
              type="primary"
              ghost
              @click="handleEdit"
            >
              <template #icon>
                <edit-outlined />
              </template>
              编辑
            </a-button>
            <a-button
              v-hasPermi="['tpmYearMaintModifyPlanAll:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRows, selectedRowKeys)"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button> -->
            <a-button v-hasPermi="['tpmYearMaintModifyPlanAll:export']" title="导出" type="primary" ghost
              @click="handleExport">
              <template #icon>
                <export-outlined />
              </template>
              导出
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-space>
            <AvicBpmFilter :allFileAuth="['tpmYearMaintModifyPlanAll:all']" :myFileAuth="['tpmYearMaintModifyPlanAll:my']"
              :defaultBpmType='queryForm.bpmType' :defaultBpmState='queryForm.bpmState' @change="changeBpmFilter" />
            <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入单据号" :allow-clear="true"
              @search="handleKeyWordQuery" />
          </a-space>
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <!-- <template v-else-if="column.dataIndex === 'note'">
            <a @click="handleFlowDetail(record)">
              {{ record.note }}
            </a>
          </template> -->
          <template v-else-if="column.dataIndex === 'attach'">
            <a @click="handleAttach(record)">
              查看
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <!-- <TpmYearMaintModifyPlanAllAdd
      v-if="showAddModal"
      ref="addModal"
      :bpmOperatorRefresh="getList"
      @reloadData="getList"
      @close="showAddModal = false"
    /> -->
    <!-- 编辑页面弹窗 -->
    <!-- <TpmYearMaintModifyPlanAllEdit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    /> -->
    <AttachModal :attachOpen="attachOpen" :attach-form="attchForm" @closeAttach="closeAttach" />
  </div>
</template>
<script lang="ts" setup>
import type { TpmYearMaintModifyPlanAllDto } from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanAllApi'; // 引入模块DTO
import { listTpmYearMaintModifyPlanAllByPage, delTpmYearMaintModifyPlanAll, exportExcel } from '@/api/avic/mms/tpm/TpmYearMaintModifyPlanAllApi'; // 引入模块API
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import AttachModal from './AttachModal.vue';
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const attachOpen = ref(false); // 附件弹窗
const attchForm = reactive({
  id: '',
  secretLevel: ''
});
/** 关闭附件 */
const closeAttach = () => {
  attachOpen.value = false;
  attchForm.id = null;
  attchForm.secretLevel = null;
};
/** 打开附件查看 */
const handleAttach = record => {
  attachOpen.value = true;
  attchForm.id = record.id;
  attchForm.secretLevel = record.secretLevel;
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
    title: '单据号',
    dataIndex: 'billNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划年度',
    dataIndex: 'applyYear',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '计划总数（项）',
  //   dataIndex: 'planTotalCount',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'right'
  // },
  {
    title: '填报人',
    dataIndex: 'editUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '填报人姓名',
  //   dataIndex: 'editUserName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '填报日期',
    dataIndex: 'editDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '填报人编码',
    dataIndex: 'editUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '填报部门',
    dataIndex: 'editDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '填报部门编码',
    dataIndex: 'editDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '填报部门名称',
  //   dataIndex: 'editDeptName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '流程状态',
  //   dataIndex: 'billStatus',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '备注',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划编号',
    dataIndex: 'planNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算项目',
    dataIndex: 'budgetItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算分项',
    dataIndex: 'budgetBreakdownItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算组织',
    dataIndex: 'budgetOrganizationIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算组织编码',
    dataIndex: 'budgetOrganizationCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预算组织名称',
    dataIndex: 'budgetOrganizationNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划类别',
    dataIndex: 'planTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '需求部门',
    dataIndex: 'requireDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求部门编码',
    dataIndex: 'requireDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '需求部门名称',
  //   dataIndex: 'requireDeptName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '项目金额（万元）',
    dataIndex: 'projectMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同预计签订时间',
    dataIndex: 'estContractSignDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划验收时间',
    dataIndex: 'estAcceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '经办人',
    dataIndex: 'agentIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人编码',
    dataIndex: 'agentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '经办人姓名',
  //   dataIndex: 'agentName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '申请单号',
    dataIndex: 'applyNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同编号',
    dataIndex: 'contractNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合同实际签订时间',
    dataIndex: 'contractSignDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '实际完成时间（完成验收）',
    dataIndex: 'acceptanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '进度状态',
    dataIndex: 'progressStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '附件',
    dataIndex: 'attach',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '变更原因',
    dataIndex: 'changeReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
const queryForm = ref<TpmYearMaintModifyPlanAllDto>({
  bpmState: 'all',
  bpmType: 'all'
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const planTypeList = ref([]); // 计划类别，通用代码：TPM_PLAN_TYPE^1维修 2 保养 3 改造通用代码
const progressStatusList = ref([]); // 进度状态，通用代码TPM_PROGRESS_STATUS^通用代码
const lookupParams = [
  { fieldName: 'planType', lookUpType: 'TPM_PLAN_TYPE' },
  { fieldName: 'progressStatus', lookUpType: 'TPM_PROGRESS_STATUS' }
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmYearMaintModifyPlanAllByPage(queryParam)
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
/** 获取通用代码 */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    planTypeList.value = result.planType;
    progressStatusList.value = result.progressStatus;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 根据流程状态及发起人查询数据 */
function changeBpmFilter({ bpmType, bpmState }) {
  queryForm.value.bpmType = bpmType;
  queryForm.value.bpmState = bpmState;
  queryParam.searchParams = queryForm.value;
  getList();
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
  queryForm.value = {
    bpmType: queryForm.value.bpmType,
    bpmState: queryForm.value.bpmState
  };
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    billNo: value
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
function handleEdit() {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要编辑的数据！');
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
}
/** 打开流程详情页面 */
function handleFlowDetail(record) {
  if (record.id) {
    flowUtils.detailByOptions({
      formId: record.id,
      bpmOperatorRefresh: getList
    });
  }
}
/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmYearMaintModifyPlanAll(ids)
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
</script>
