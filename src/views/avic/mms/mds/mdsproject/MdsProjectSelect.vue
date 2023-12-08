<template>
  <a-modal :visible="visible" @ok="handleOk" @cancel.once="handleCancel" title="项目选择" width="80%">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目编号">
              <a-input v-model:value="queryForm.projectCode" placeholder="请输入项目编号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目名称">
              <a-input v-model:value="queryForm.projectName" placeholder="请输入项目名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目描述">
              <a-input v-model:value="queryForm.projectDesc" placeholder="请输入项目描述" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目等级">
              <a-select v-model:value="queryForm.projectGrade"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择项目等级">
                <a-select-option v-for="item in projectGradeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目密级">
              <a-select v-model:value="queryForm.projectSecretClass"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择项目密级">
                <a-select-option v-for="item in projectSecretClassList" :key="item.sysLookupTlId"
                  :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目状态">
              <a-select v-model:value="queryForm.projectStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择项目状态">
                <a-select-option v-for="item in projectStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="立项日期(起)">
              <a-date-picker v-model:value="queryForm.projectApprovalDateBegin" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" placeholder="请选择立项日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.projectApprovalDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="立项日期(止)">
              <a-date-picker v-model:value="queryForm.projectApprovalDateEnd" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" placeholder="请选择立项日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.projectApprovalDateBegin)" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目经理ID">
              <AvicCommonSelect v-model:value="queryForm.projectManagerId" type="userSelect" placeholder="请选择项目经理ID"
                :defaultShowValue="queryForm.projectManagerIdAlias" @callback="
                  result => {
                    queryForm.projectManagerIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目经理CODE">
              <a-input v-model:value="queryForm.projectManagerCode" placeholder="请输入项目经理CODE" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目经理NAME">
              <a-input v-model:value="queryForm.projectManagerName" placeholder="请输入项目经理NAME" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="责任部门ID">
              <AvicCommonSelect v-model:value="queryForm.responsibleDeptId" type="deptSelect" placeholder="请选择责任部门ID"
                :defaultShowValue="queryForm.responsibleDeptIdAlias" @callback="
                  result => {
                    queryForm.responsibleDeptIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="责任部门CODE">
              <a-input v-model:value="queryForm.responsibleDeptCode" placeholder="请输入责任部门CODE" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="责任部门NAME">
              <a-input v-model:value="queryForm.responsibleDeptName" placeholder="请输入责任部门NAME" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目负责人">
              <AvicCommonSelect v-model:value="queryForm.projectResponsiblePerson" type="userSelect"
                placeholder="请选择项目负责人" :defaultShowValue="queryForm.projectResponsiblePersonAlias" @callback="
                  result => {
                    queryForm.projectResponsiblePersonAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="工期(天)">
              <a-input v-model:value="queryForm.projectDuration" placeholder="请输入工期(天)" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目计划开始时间(起)">
              <a-date-picker v-model:value="queryForm.planStartDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目计划开始时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.planStartDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目计划开始时间(止)">
              <a-date-picker v-model:value="queryForm.planStartDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目计划开始时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.planStartDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目计划结束时间(起)">
              <a-date-picker v-model:value="queryForm.planEndDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目计划结束时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.planEndDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目计划结束时间(止)">
              <a-date-picker v-model:value="queryForm.planEndDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目计划结束时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.planEndDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目实际开始时间(起)">
              <a-date-picker v-model:value="queryForm.actualStartDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目实际开始时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.actualStartDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目实际开始时间(止)">
              <a-date-picker v-model:value="queryForm.actualStartDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目实际开始时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.actualStartDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目实际结束时间(起)">
              <a-date-picker v-model:value="queryForm.actualEndDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目实际结束时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.actualEndDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目实际结束时间(止)">
              <a-date-picker v-model:value="queryForm.actualEndDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目实际结束时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.actualEndDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="币种">
              <a-select v-model:value="queryForm.currencyType"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择币种">
                <a-select-option v-for="item in currencyTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="上级项目ID">
              <a-input v-model:value="queryForm.parentMdsProjectId" placeholder="请输入上级项目ID" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否实物生产">
              <a-select v-model:value="queryForm.ynProduction"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否实物生产">
                <a-select-option v-for="item in ynProductionList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目所属行业">
              <a-select v-model:value="queryForm.industryType"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择项目所属行业">
                <a-select-option v-for="item in industryTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="所属业务域">
              <a-select v-model:value="queryForm.businessArea"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择所属业务域">
                <a-select-option v-for="item in businessAreaList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户类型">
              <a-input v-model:value="queryForm.mdsCustomerTypeId" placeholder="请输入客户类型" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="客户ID">
              <a-input v-model:value="queryForm.mdsCustomerId" placeholder="请输入客户ID" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请人">
              <AvicCommonSelect v-model:value="queryForm.applyUserId" type="userSelect" placeholder="请选择申请人"
                :defaultShowValue="queryForm.applyUserIdAlias" @callback="
                  result => {
                    queryForm.applyUserIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请人编码">
              <a-input v-model:value="queryForm.applyUserCode" placeholder="请输入申请人编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请人名称">
              <a-input v-model:value="queryForm.applyUserName" placeholder="请输入申请人名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请部门">
              <AvicCommonSelect v-model:value="queryForm.applyedDeptId" type="deptSelect" placeholder="请选择申请部门"
                :defaultShowValue="queryForm.applyedDeptIdAlias" @callback="
                  result => {
                    queryForm.applyedDeptIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请部门编码">
              <a-input v-model:value="queryForm.applyedDeptCode" placeholder="请输入申请部门编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请部门名称">
              <a-input v-model:value="queryForm.applyedDeptName" placeholder="请输入申请部门名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否按项目号平衡">
              <a-select v-model:value="queryForm.balanceFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否按项目号平衡">
                <a-select-option v-for="item in balanceFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="产品ID">
              <a-input v-model:value="queryForm.proMdsItemId" placeholder="请输入产品ID" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="有效标识">
              <a-select v-model:value="queryForm.validFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择有效标识">
                <a-select-option v-for="item in validFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注">
              <a-input v-model:value="queryForm.remark" placeholder="请输入备注" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目类型">
              <a-select v-model:value="queryForm.projectType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择项目类型">
                <a-select-option v-for="item in projectTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="应用类型">
              <a-select v-model:value="queryForm.applicationType"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择应用类型">
                <a-select-option v-for="item in applicationTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请日期(起)">
              <a-date-picker v-model:value="queryForm.applyDateBegin" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择申请日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.applyDateEnd)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请日期(止)">
              <a-date-picker v-model:value="queryForm.applyDateEnd" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择申请日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.applyDateBegin)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="协作部门ID">
              <AvicCommonSelect v-model:value="queryForm.cooperationDeptId" type="deptSelect" placeholder="请选择协作部门ID"
                :defaultShowValue="queryForm.cooperationDeptIdAlias" @callback="
                  result => {
                    queryForm.cooperationDeptIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="协作部门CODE">
              <a-input v-model:value="queryForm.cooperationDeptCode" placeholder="请输入协作部门CODE" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="协作部门NAME">
              <a-input v-model:value="queryForm.cooperationDeptName" placeholder="请输入协作部门NAME" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级 ">
              <a-select v-model:value="queryForm.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级 ">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
    <AvicTable ref="mdsProjectSelect" table-key="mdsProjectSelect" :columns="columns" :row-key="record => record.id"
      :data-source="list" :loading="loading" :show-table-setting="false" :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }" :pageParameter="queryParam.pageParameter" :total="totalPage" :customRow="customRow"
      @change="handleTableChange" @refresh="getList">
      <template #toolBarRight>
        <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入项目编号或项目名称" :allow-clear="true"
          @search="handleKeyWordQuery" />
      </template>
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.dataIndex === 'id'">
          {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
        </template>
      </template>
    </AvicTable>
  </a-modal>
</template>
<script lang="ts" setup>
import type { MdsProjectDto } from '@/api/avic/mms/mds/MdsProjectApi'; // 引入模块DTO
import { listMdsProjectByPage } from '@/api/avic/mms/mds/MdsProjectApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const mdsProjectSelect = ref();
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
    title: '项目编号',
    dataIndex: 'projectCode',
    ellipsis: true,
    sorter: true,
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
    title: '项目描述',
    dataIndex: 'projectDesc',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目等级',
    dataIndex: 'projectGradeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目密级',
    dataIndex: 'projectSecretClassName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目状态',
    dataIndex: 'projectStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '立项日期',
    dataIndex: 'projectApprovalDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目经理',
    dataIndex: 'projectManagerIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '项目经理CODE',
  //   dataIndex: 'projectManagerCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  //},
  // {
  //   title: '项目经理NAME',
  //   dataIndex: 'projectManagerName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '责任部门',
    dataIndex: 'responsibleDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '责任部门CODE',
  //   dataIndex: 'responsibleDeptCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '责任部门NAME',
  //   dataIndex: 'responsibleDeptName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '项目负责人',
    dataIndex: 'projectResponsiblePersonAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '工期(天)',
    dataIndex: 'projectDuration',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目计划开始时间',
    dataIndex: 'planStartDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目计划结束时间',
    dataIndex: 'planEndDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目实际开始时间',
    dataIndex: 'actualStartDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目实际结束时间',
    dataIndex: 'actualEndDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '币种',
    dataIndex: 'currencyTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '上级项目ID',
  //   dataIndex: 'parentMdsProjectId',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '是否实物生产',
    dataIndex: 'ynProductionName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '项目所属行业',
    dataIndex: 'industryTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '所属业务域',
    dataIndex: 'businessAreaName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '客户类型',
    dataIndex: 'mdsCustomerTypeId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '客户ID',
    dataIndex: 'mdsCustomerId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请人',
    dataIndex: 'applyUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '申请人编码',
  //   dataIndex: 'applyUserCode',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '申请人名称',
  //   dataIndex: 'applyUserName',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '申请部门',
    dataIndex: 'applyedDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请部门编码',
    dataIndex: 'applyedDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请部门名称',
    dataIndex: 'applyedDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否按项目号平衡',
    dataIndex: 'balanceFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '产品ID',
    dataIndex: 'proMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '有效标识',
    dataIndex: 'validFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目类型',
    dataIndex: 'projectTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '应用类型',
    dataIndex: 'applicationTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '协作部门ID',
    dataIndex: 'cooperationDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '协作部门CODE',
    dataIndex: 'cooperationDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '协作部门NAME',
    dataIndex: 'cooperationDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级 ',
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
    visible: false,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<MdsProjectDto>({});
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
const totalPage = ref(0);
const projectGradeList = ref([]); // 项目等级通用代码
const projectSecretClassList = ref([]); // 项目密级通用代码
const projectStatusList = ref([]); // 项目状态通用代码
const currencyTypeList = ref([]); // 币种通用代码
const ynProductionList = ref([]); // 是否实物生产通用代码
const industryTypeList = ref([]); // 项目所属行业通用代码
const businessAreaList = ref([]); // 所属业务域通用代码
const balanceFlagList = ref([]); // 是否按项目号平衡通用代码
const validFlagList = ref([]); // 有效标识通用代码
const projectTypeList = ref([]); // 项目类型通用代码
const applicationTypeList = ref([]); // 应用类型通用代码
const secretLevelList = ref([]); // 密级 通用代码
const lookupParams = [
  { fieldName: 'projectGrade', lookUpType: 'MDS_PROJECT_GRADE' },
  { fieldName: 'projectSecretClass', lookUpType: 'MDS_SECRET_CLASS' },
  { fieldName: 'projectStatus', lookUpType: 'MDS_PROJECT_STATUS' },
  { fieldName: 'currencyType', lookUpType: 'MDS_CURRENDY_TYPE' },
  { fieldName: 'ynProduction', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'industryType', lookUpType: 'MDS_INDUSTRY_TYPE' },
  { fieldName: 'businessArea', lookUpType: 'MDS_BUSINESS_AREA' },
  { fieldName: 'balanceFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'validFlag', lookUpType: 'MDS_VAILD_FLAG' },
  { fieldName: 'projectType', lookUpType: 'MDS_PROJECT_TYPE' },
  { fieldName: 'applicationType', lookUpType: 'PROJECT_APPLICATION_TYPE' }
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
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listMdsProjectByPage(queryParam)
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
    projectGradeList.value = result.projectGrade;
    projectSecretClassList.value = result.projectSecretClass;
    projectStatusList.value = result.projectStatus;
    currencyTypeList.value = result.currencyType;
    ynProductionList.value = result.ynProduction;
    industryTypeList.value = result.industryType;
    businessAreaList.value = result.businessArea;
    balanceFlagList.value = result.balanceFlag;
    validFlagList.value = result.validFlag;
    projectTypeList.value = result.projectType;
    applicationTypeList.value = result.applicationType;
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
    projectCode: value,
    projectName: value
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
function customRow(record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
//确定
const handleOk = () => {
  $emit('getProjectId', selectedRows.value[0])
}
//取消
const handleCancel = () => {
  $emit('closeCancel')
}
</script>

