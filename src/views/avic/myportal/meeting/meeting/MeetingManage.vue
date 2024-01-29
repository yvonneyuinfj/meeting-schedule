<template>
  <AvicSplit horizontal>
    <AvicPane size="99">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="会议名称">
                  <a-input
                    v-model:value="queryForm.name"
                    placeholder="请输入会议名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="创建人">
                  <AvicCommonSelect
                    v-model:value="queryForm.authorId"
                    type="userSelect"
                    placeholder="请选择创建人"
                    :defaultShowValue="queryForm.authorIdAlias"
                    @callback="
                      result => {
                        queryForm.authorIdAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="会议室名称">
                  <a-input
                    v-model:value="queryForm.meetingRoomName"
                    placeholder="请输入会议室名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否需要审批">
                  <a-select
                    v-model:value="queryForm.ynApprove"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否需要审批"
                  >
                    <a-select-option
                      v-for="item in ynApproveList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="审批人名称">
                  <a-input
                    v-model:value="queryForm.approvalNames"
                    placeholder="请输入审批人名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="占用开始时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.preStartTimeBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择占用开始时间(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.preStartTimeEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="占用开始时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.preStartTimeEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择占用开始时间(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.preStartTimeBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="开始时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.startTimeBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择开始时间(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.startTimeEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="开始时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.startTimeEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择开始时间(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.startTimeBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="结束时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.endTimeBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择结束时间(起)"
                    :disabled-date="
                      startValue => proxy.$disabledStartDate(startValue, queryForm.endTimeEnd)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="结束时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.endTimeEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择结束时间(止)"
                    :disabled-date="
                      endValue => proxy.$disabledEndDate(endValue, queryForm.endTimeBegin)
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="组织部门名称">
                  <a-input
                    v-model:value="queryForm.orgDeptName"
                    placeholder="请输入组织部门名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否公开">
                  <a-select
                    v-model:value="queryForm.ynPublic"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否公开"
                  >
                    <a-select-option
                      v-for="item in ynPublicList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否显示日程">
                  <a-select
                    v-model:value="queryForm.ynShowEvent"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择是否显示日程"
                  >
                    <a-select-option
                      v-for="item in ynShowEventList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="联系电话">
                  <a-input
                    v-model:value="queryForm.phoneNumber"
                    placeholder="请输入联系电话"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="会议内容">
                  <a-input
                    v-model:value="queryForm.content"
                    placeholder="请输入会议内容"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="参会人员名称">
                  <a-input
                    v-model:value="queryForm.attendeeNames"
                    placeholder="请输入参会人员名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="日程类型">
                  <a-select
                    v-model:value="queryForm.eventType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择日程类型"
                  >
                    <a-select-option
                      v-for="item in eventTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="待办提醒">
                  <a-select
                    v-model:value="queryForm.remindType"
                    :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children"
                    :show-search="true"
                    :allow-clear="true"
                    placeholder="请选择待办提醒"
                  >
                    <a-select-option
                      v-for="item in remindTypeList"
                      :key="item.sysLookupTlId"
                      :value="item.lookupCode"
                    >
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
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
              </a-col> -->
              <a-col v-bind="colLayout.cols" style="margin-left: auto">
                <div class="table-page-search-submitButtons">
                  <a-space>
                    <a-button type="primary" @click="handleQuery">
                      <search-outlined />
                      查询
                    </a-button>
                    <a-button type="primary" @click="resetQuery" ghost style="margin-right: 15px">
                      <redo-outlined />
                      重置
                    </a-button>
                    <!-- <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                      {{ advanced ? '收起' : '展开' }}
                      <up-outlined v-if="advanced" />
                      <down-outlined v-else />
                    </a-button> -->
                  </a-space>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable
            ref="meeting"
            table-key="meeting"
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
            rowClickSelectionType="radio"
            :pageParameter="queryParam.pageParameter"
            :total="totalPage"
            @change="handleTableChange"
            @refresh="getList"
          >
            <template #toolBarLeft>
              <a-space>
                <a-button
                  v-hasPermi="['meeting:add']"
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
                  v-hasPermi="['meeting:edit']"
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
                  v-hasPermi="['meeting:del']"
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
                </a-button>
                <a-button
                  v-hasPermi="['meeting:export']"
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
              <a-space>
                <AvicBpmFilter
                  :allFileAuth="['meeting:all']"
                  :myFileAuth="['meeting:my']"
                  :defaultBpmType="queryForm.bpmType"
                  :defaultBpmState="queryForm.bpmState"
                  @change="changeBpmFilter"
                />
                <a-input-search
                  class="opt-btn-commonsearch"
                  style="width: 200px"
                  placeholder="请输入会议名称"
                  :allow-clear="true"
                  @search="handleKeyWordQuery"
                />
              </a-space>
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'name'">
                <a @click="handleDetail(record)">
                  {{ record.name }}
                </a>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <MeetingAdd
        v-if="showAddModal"
        ref="addModal"
        :bpmOperatorRefresh="getList"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <MeetingEdit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <MeetingDetail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
      <MeetingDetailNonFlow
        v-if="showDetailModalNonFlow"
        ref="detailModalNonFlow"
        :form-id="formId"
        @close="showDetailModalNonFlow = false"
      />
    </AvicPane>
    <AvicPane>
      <!--子表组件-->
      <MeetingUserManage key="meetingUserManage" ref="meetingUserManage" :mainId="mainId" />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import type { MeetingDto } from '@/api/avic/myportal/meeting/MeetingApi'; // 引入模块DTO
import { listMeetingByPage, delMeeting, exportExcel } from '@/api/avic/myportal/meeting/MeetingApi'; // 引入模块API
import MeetingAdd from './MeetingAdd.vue'; // 引入添加页面组件
import MeetingEdit from './MeetingEdit.vue'; // 引入编辑页面组件
import MeetingDetail from './MeetingDetail.vue'; // 引入详情页面组件
import MeetingDetailNonFlow from './MeetingDetailNonFlow.vue'; // 引入详情页面组件
import MeetingUserManage from '../meetinguser/MeetingUserManage.vue'; // 引入子表页面组件
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '90px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 50,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '会议名称',
    dataIndex: 'name',
    ellipsis: true,
    sorter: true,
    minWidth: 150,
    resizable: true,
    align: 'center'
  },
  {
    title: '创建人',
    dataIndex: 'authorIdAlias',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '会议地点',
    dataIndex: 'meetingRoomName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '占用开始时间',
    dataIndex: 'preStartTime',
    ellipsis: true,
    sorter: true,
    minWidth: 130,
    resizable: true,
    align: 'center'
  },
  {
    title: '会议开始时间',
    dataIndex: 'startTime',
    ellipsis: true,
    sorter: true,
    minWidth: 130,
    resizable: true,
    align: 'center'
  },
  {
    title: '预计结束时间',
    dataIndex: 'endTime',
    ellipsis: true,
    sorter: true,
    minWidth: 130,
    resizable: true,
    align: 'center'
  },
  {
    title: '会议类型',
    dataIndex: 'meetingTypeName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '主持人',
    dataIndex: 'hostName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '组织部门',
    dataIndex: 'orgDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '联系电话',
    dataIndex: 'phoneNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '会议内容',
    dataIndex: 'content',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '参会人员',
    dataIndex: 'attendeeNames',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否需要审批',
    dataIndex: 'ynApproveName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '审批人',
    dataIndex: 'approvalNames',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否公开',
    dataIndex: 'ynPublicName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否显示日程',
    dataIndex: 'ynShowEventName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '日程类型',
    dataIndex: 'eventTypeName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '待办提醒',
    dataIndex: 'remindTypeName',
    ellipsis: true,
    sorter: true,
    minWidth: 100,
    resizable: true,
    align: 'center'
  },
  {
    title: '提醒天数',
    dataIndex: 'remindDuration',
    ellipsis: true,
    sorter: true,
    minWidth: 100,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    sorter: true,
    minWidth: 90,
    resizable: true,
    align: 'center'
  },
  {
    title: '流程状态',
    dataIndex: 'businessstate_',
    ellipsis: true,
    sorter: true,
    width: 100,
    align: 'center',
    fixed: 'right'
  },
  {
    title: '流程当前步骤',
    dataIndex: 'activityalias_',
    ellipsis: true,
    sorter: true,
    width: 120,
    align: 'center',
    fixed: 'right'
  },
  {
    title: '当前处理人',
    dataIndex: 'assigneenames_',
    ellipsis: true,
    sorter: true,
    width: 100,
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<MeetingDto>({
  bpmState: 'all',
  bpmType: 'my',
  eventType: '5'
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
const formRef = ref(null);
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showDetailModalNonFlow = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); //表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); //选中数据主键集合
const selectedRows = ref([]); //选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const ynApproveList = ref([]); // 是否需要审批通用代码
const ynValidList = ref([]); // 是否有效通用代码
const ynPublicList = ref([]); // 是否公开通用代码
const ynNewPlaceList = ref([]); // 是否新地点通用代码
const ynShowEventList = ref([]); // 是否显示日程通用代码
const eventTypeList = ref([]); // 日程类型通用代码
const remindTypeList = ref([]); // 待办提醒通用代码
const secretLevelList = ref([]); // 密级通用代码
const lookupParams = [
  { fieldName: 'ynApprove', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynValid', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynPublic', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynNewPlace', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynShowEvent', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'eventType', lookUpType: 'MYPORTAL_EVENT_TYPE' },
  { fieldName: 'remindType', lookUpType: 'MYPORTAL_REMIND_TYPE' }
];
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
});
// import request from '@/utils/request';
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
  listMeetingByPage(queryParam)
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
    ynApproveList.value = result.ynApprove;
    ynValidList.value = result.ynValid;
    ynPublicList.value = result.ynPublic;
    ynNewPlaceList.value = result.ynNewPlace;
    ynShowEventList.value = result.ynShowEvent;
    eventTypeList.value = result.eventType;
    remindTypeList.value = result.remindType;
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
// function toggleAdvanced() {
//   advanced.value = !advanced.value;
// }
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    name: value
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
    proxy.$message.warning('请勾选一条数据进行编辑！');
    return;
  }
  if (selectedRows.value[0].createdBy != proxy.$getLoginUser().id) {
    proxy.$message.warning(`不能编辑他人创建的数据！`);
    return;
  }
  if (selectedRows.value[0].businessstate_ && selectedRows.value[0].businessstate_ != '拟稿中') {
    proxy.$message.warning(`不能编辑${selectedRows.value[0].businessstate_}的数据！`);
    return;
  }
  formId.value = selectedRows.value[0].id;
  showEditModal.value = true;
}
/** 查看详情 */
function handleDetail(record) {
  if (record.ynApprove == 'N') {
    formId.value = record.id;
    showDetailModalNonFlow.value = true;
  } else {
    handleFlowDetail(record);
  }
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
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.createdBy !== proxy.$getLoginUser().id)?.length > 0) {
    proxy.$message.warning('不可以删除他人创建的数据！');
    return;
  }
  if (rows.filter(row => row.bpmState && row.bpmState !== 'start')?.length > 0) {
    proxy.$message.warning('只有拟稿中或者流程状态为空的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确定删除已选数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delMeeting(ids)
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
