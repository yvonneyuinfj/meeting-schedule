<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="申报月份(起)">
                  <a-date-picker v-model:value="queryForm.reportDateBegin" format="YYYY-MM" value-format="YYYY-MM"
                                 placeholder="请选择申报月份(起)"
                                 :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.reportDateEnd)"
                                 picker="month"/>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="申报月份(止)">
                  <a-date-picker v-model:value="queryForm.reportDateEnd" format="YYYY-MM" value-format="YYYY-MM"
                                 placeholder="请选择申报月份(止)"
                                 :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.reportDateBegin)"
                                 picker="month"/>
                </a-form-item>
              </a-col>
<!--              <a-col v-bind="colLayout.cols">-->
<!--                <a-form-item label="填报部门">-->
<!--                  <AvicCommonSelect v-model:value="queryForm.reportDeptId" type="deptSelect"-->
<!--                                    placeholder="请选择填报部门"-->
<!--                                    :defaultShowValue="queryForm.reportDeptIdAlias" @callback="result => {-->
<!--                              queryForm.reportDeptIdAlias = result.names;-->
<!--                            }-->
<!--                            "/>-->
<!--                </a-form-item>-->
<!--              </a-col>-->
              <a-col v-bind="colLayout.cols" style="margin-left: auto">
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
          <AvicTable ref="tpmIntactRatioMtbfMttr" table-key="tpmIntactRatioMtbfMttr" :columns="columns"
                     :row-key="record => record.id" :data-source="list" :loading="loading" :row-selection="{
                      selectedRowKeys: selectedRowKeys,
                      onChange: onSelectChange,
                      columnWidth: 40,
                      fixed: true
                    }" rowClickSelectionType="radio" :pageParameter="queryParam.pageParameter" :total="totalPage"
                     @change="handleTableChange" @refresh="getList">
            <template #toolBarLeft>
              <a-space>
                <a-button v-hasPermi="['tpmIntactRatioMtbfMttr:add']" title="添加" type="primary" @click="handleAdd">
                  <template #icon>
                    <plus-outlined/>
                  </template>
                  添加
                </a-button>
                <a-button v-hasPermi="['tpmIntactRatioMtbfMttr:edit']" title="编辑" type="primary" ghost
                          @click="handleEdit(selectedRows, selectedRowKeys)">
                  <template #icon>
                    <edit-outlined/>
                  </template>
                  编辑
                </a-button>
                <a-button v-hasPermi="['tpmIntactRatioMtbfMttr:del']" title="删除" danger
                          :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" :loading="delLoading"
                          @click="handleDelete(selectedRows, selectedRowKeys)">
                  <template #icon>
                    <delete-outlined/>
                  </template>
                  删除
                </a-button>
                <a-button v-hasPermi="['tpmIntactRatioMtbfMttr:export']" title="导出" type="primary" ghost
                          @click="handleExport">
                  <template #icon>
                    <export-outlined/>
                  </template>
                  导出
                </a-button>
                  <a-button  title="提交流程" type="primary" ghost
                          @click="handleStartFlow(selectedRows, selectedRowKeys)">
                  <template #icon>
                    <avic-icon svg='avic-arrow-up-circle-line'/>
                  </template>
                  提交流程
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-space>
                <AvicBpmFilter :allFileAuth="['tpmIntactRatioMtbfMttr:all']" :myFileAuth="['tpmIntactRatioMtbfMttr:my']"
                               :defaultBpmType='queryForm.bpmType' :defaultBpmState='queryForm.bpmState'
                               @change="changeBpmFilter"/>
                <!-- <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入" :allow-clear="true"
                        @search="handleKeyWordQuery" /> -->
              </a-space>
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
              <template v-else-if="column.dataIndex === 'reportDate'">
                <template v-if="record.bpmState !== null">
                  <a @click="handleFlowDetail(record)">
                    {{ dayjs(record.reportDate).format('YYYY-MM') }}
                  </a>
                </template>
                <template v-else>
                  {{ dayjs(record.reportDate).format('YYYY-MM') }}
                </template>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <TpmIntactRatioMtbfMttrAdd v-if="showAddModal" ref="addModal" :readOnly="readOnly" :startLoading="startLoading"
                                 :saveLoading="saveLoading" :bpmOperatorRefresh="getList" @reloadData="getList"
                                 @close="showAddModal = false"/>
      <!-- 编辑页面弹窗 -->
      <TpmIntactRatioMtbfMttrEdit v-if="showEditModal" ref="editModal" :form-id="formId" :readOnly="readOnly"
                                  :startLoading="startLoading" :saveLoading="saveLoading" @reloadData="getList"
                                  @close="showEditModal = false"/>
      <!-- 详情页面弹窗 -->
      <TpmIntactRatioMtbfMttrDetail v-if="showDetailModal" ref="detailModal" :form-id="formId"
                                    @close="showDetailModal = false"/>
    </AvicPane>
    <AvicPane>
      <!--子表组件-->
      <TpmIntactRatioMtbfMttrLManage key="tpmIntactRatioMtbfMttrLManage" ref="tpmIntactRatioMtbfMttrLManage"
                                     :mainId="mainId" :reportDate="reportDate" @reloadData="getList"/>
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import type { TpmIntactRatioMtbfMttrDto } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrApi'; // 引入模块DTO
import {
  delTpmIntactRatioMtbfMttr,
  exportExcel,
  listTpmIntactRatioMtbfMttrByPage,
  saveFormAndStartProcess
} from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrApi'; // 引入模块API
import TpmIntactRatioMtbfMttrAdd from './TpmIntactRatioMtbfMttrAdd.vue'; // 引入添加页面组件
import TpmIntactRatioMtbfMttrEdit from './TpmIntactRatioMtbfMttrEdit.vue'; // 引入编辑页面组件
import TpmIntactRatioMtbfMttrDetail from './TpmIntactRatioMtbfMttrDetail.vue'; // 引入详情页面组件
import TpmIntactRatioMtbfMttrLManage from '../tpmintactratiomtbfmttrl/TpmIntactRatioMtbfMttrLManage.vue'; // 引入子表页面组件
import flowUtils, { openFlowDetail, startFlowByFormCode } from '@/views/avic/bpm/bpmutils/FlowUtils.js';

import dayjs from 'dayjs';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const tpmIntactRatioMtbfMttrLManage = ref(null);
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
    title: '申报月份',
    dataIndex: 'reportDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '填报部门',
    dataIndex: 'reportDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '填报人',
    dataIndex: 'applyUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '填报日期',
    dataIndex: 'applyDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备完好率(%)',
    dataIndex: 'equipmentIntegrityRate',
    ellipsis: true,
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
const queryForm = ref<TpmIntactRatioMtbfMttrDto>({
  bpmState: 'all',
  bpmType: 'all',
  reportDeptId: proxy.$getLoginUser().entityDeptId
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
  sidx: 'applyDate', // 排序字段
  sord: 'desc' // 排序方式: desc降序 asc升序
});
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  },
  // 保存并启动流程
  startLoading: {
    type: Boolean,
    default: false
  },
  // 保存并返回
  saveLoading: {
    type: Boolean,
    default: false
  }
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); //表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); //选中数据主键集合
const selectedRows = ref([]); //选中行集合
const loading = ref(false); // 表格loading状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : ''; // 主表传入子表的id
});
const readOnly = ref(false);
const startLoading = ref(false);
const saveLoading = ref(false);
const reportDate = computed(() => {
  return selectedRows.value.length === 1 ? selectedRows.value[0].reportDate : ''; // 主表传入子表的申报月份
});
const bpmState = ref();
const bpmType = ref();

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  if (queryParam.searchParams.reportDateBegin != undefined) {
    const reportDateBegin = dayjs(queryParam.searchParams.reportDateBegin);
    queryParam.searchParams.reportDateBegin = dayjs().year(reportDateBegin.year()).month(reportDateBegin.month()).startOf('month').format('YYYY-MM-DD');
  }
  if (queryParam.searchParams.reportDateEnd != undefined) {
    const reportDateEnd = dayjs(queryParam.searchParams.reportDateEnd);
    queryParam.searchParams.reportDateEnd = dayjs().year(reportDateEnd.year()).month(reportDateEnd.month()).endOf('month').format('YYYY-MM-DD');
  }
  listTpmIntactRatioMtbfMttrByPage(queryParam)
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
    bpmState: queryForm.value.bpmState,
    reportDeptId: proxy.$getLoginUser().entityDeptId
  };
  handleQuery();
}

/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {};
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  readOnly.value = false;
  startLoading.value = true;
  saveLoading.value = true;
  showAddModal.value = true;
}

/** 编辑 */
function handleEdit(rows, ids) {
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要编辑的数据！');
    return;
  }
  if (selectedRows.value[0].applyUserId !== proxy.$getLoginUser().id) {
    proxy.$message.warning('只有自己的数据才可以编辑！');
    return;
  }
  // if (rows.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
  //   proxy.$message.warning('只有拟稿中和未提交的数据才可以编辑！');
  //   return;
  // }
  if (selectedRows.value[0].bpmState === 'start') {
    readOnly.value = false;
    startLoading.value = false;
    saveLoading.value = true;
  } else if (selectedRows.value[0].bpmState == null) {
    readOnly.value = false;
    startLoading.value = true;
    saveLoading.value = true;
  } else {
    readOnly.value = true;
    startLoading.value = false;
    saveLoading.value = false;
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

/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      if (queryForm.value.reportDateBegin != undefined) {
        const reportDateBegin = dayjs(queryForm.value.reportDateBegin);
        queryForm.value.reportDateBegin = dayjs().year(reportDateBegin.year()).month(reportDateBegin.month()).startOf('month').format('YYYY-MM-DD');
      }
      if (queryForm.value.reportDateEnd != undefined) {
        const reportDateEnd = dayjs(queryForm.value.reportDateEnd);
        queryForm.value.reportDateEnd = dayjs().year(reportDateEnd.year()).month(reportDateEnd.month()).endOf('month').format('YYYY-MM-DD');
      }
      queryParam.searchParams = queryForm.value;
      const post = queryParam;
      bpmState.value = post.searchParams.bpmState;
      bpmType.value = post.searchParams.bpmType;
      post.searchParams.bpmState = null;
      post.searchParams.bpmType = null;
      exportExcel(post).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
      post.searchParams.bpmState = bpmState.value;
      post.searchParams.bpmType = bpmType.value;
    }
  });
}

/** 删除 */
function handleDelete(rows, ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  if (rows.filter(row => row.applyUserId !== proxy.$getLoginUser().id)?.length > 0) {
    proxy.$message.warning('只有自己的数据才可以删除！');
    return;
  }
  if (rows.filter(row => row.bpmState !== 'start' && row.bpmState !== null)?.length > 0) {
    proxy.$message.warning('只有拟稿中和未提交的数据才可以删除！');
    return;
  }
  proxy.$confirm({
    title: '确定删除已选数据及关联的子表数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmIntactRatioMtbfMttr(ids)
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

/** 提交流程 */
function handleStartFlow(rows, ids) {
  console.log(tpmIntactRatioMtbfMttrLManage.value.list.length);
  if (tpmIntactRatioMtbfMttrLManage.value.list.length == 1) {
    proxy.$message.warning('请编辑设备信息再提交流程！');
    return;
  }
  if (selectedRows.value.length !== 1) {
    proxy.$message.warning('请选择一条要提交流程的数据！');
    return;
  }
  if (selectedRows.value[0].businessstate_ != '') {
    proxy.$message.warning('流程已存在，不能重复提交！');
    return;
  }
  startFlowByFormCode({
    formCode: 'TpmIntactRatioMtbfMttr',
    formData: selectedRows.value[0],
    callback: bpmDefinedInfo => {
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(selectedRows.value[0]);
      const params = {
        processDefId: bpmDefinedInfo.dbid || bpmDefinedInfo.value.defineId,
        formCode: 'TpmIntactRatioMtbfMttr',
        postData
      };
      saveFormAndStartProcess(params)
          .then(res => {
            if (res.success) {
              bpmResult.value = res.data;
              if (bpmResult.value) {
                openFlowDetail(bpmResult.value, props.bpmOperatorRefresh);
              }
              proxy.$message.info('提交流程成功！');
              handleQuery();
            } else {
              proxy.$message.info('提交流程失败！');
            }
          })
          .catch(() => {
            proxy.$message.info('提交流程失败！');
          });
    }
  });

}
</script>

