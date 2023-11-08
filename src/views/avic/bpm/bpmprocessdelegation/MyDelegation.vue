<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="受托人">
              <AvicCommonSelect
                v-model:value="queryForm.receptUserId"
                type="userSelect"
                placeholder="请选择受托人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="受托部门">
              <AvicCommonSelect
                v-model:value="queryForm.receptDeptId"
                type="deptSelect"
                placeholder="请选择受托部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="委托生效日期(起)">
              <a-date-picker
                v-model:value="queryForm.handEffectiveDateBegin"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, queryForm.handEffectiveDateEnd)
                "
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择委托生效日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="委托生效日期(止)">
              <a-date-picker
                v-model:value="queryForm.handEffectiveDateEnd"
                :disabled-date="
                  startValue => proxy.$disabledEndDate(startValue, queryForm.handEffectiveDateBegin)
                "
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择委托生效日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预计返回日期(起)">
              <a-date-picker
                v-model:value="queryForm.backDateBegin"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, queryForm.backDateEnd)
                "
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                placeholder="请选择预计返回日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预计返回日期(止)">
              <a-date-picker
                v-model:value="queryForm.backDateEnd"
                :disabled-date="
                  startValue => proxy.$disabledEndDate(startValue, queryForm.backDateBegin)
                "
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                placeholder="请选择预计返回日期"
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
                <a-button @click="resetQuery" ghost type="primary">
                  <redo-outlined />
                  清空
                </a-button>
                <a-button type="link" @click="toggleAdvanced">
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
    <!-- 表格 -->
    <div class="table-wrapper">
      <AvicTable
        ref="avicTable"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :row-selection="{
          type: selectType != 'single' ? 'checkbox' : 'radio',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :customRow="
          record => {
            return {
              onClick: () => {
                handleRowSelection(record);
              },
              onDblclick: () => {
                handleRowSelection(record);
              }
            };
          }
        "
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              新建委托
            </a-button>
            <a-button type="primary" @click="handleList" ghost>
              <template #icon>
                <ArrowLeftOutlined />
              </template>
              拿回已移交的待办
            </a-button>
            <a-button
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              @click="handleDeleteDelegation(selectedRowKeys)"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button type="primary" ghost @click="handleCompleteDelegation(selectedRowKeys)">
              <template #icon>
                <LoginOutlined />
              </template>
              注销
            </a-button>
            <a-button type="primary" ghost @click="showHelpModal = true">
              <template #icon>
                <QuestionCircleOutlined />
              </template>
              帮助
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入受托人名称"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.key === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.key === 'workOwnerName'">
            <a href="javascript:;" class="table-detail-link" @click.stop="handleDetail(record.id)">
              {{ record.workOwnerName || '' }}
            </a>
          </template>
          <template v-else-if="column.key === 'validFlag'">
            <a-tag v-if="formatStateTxt(record) == '未开始'" color="red">
              {{ formatStateTxt(record) }}
            </a-tag>
            <a-tag v-if="formatStateTxt(record) == '委托中'" color="blue">
              {{ formatStateTxt(record) }}
            </a-tag>
            <a-tag v-if="formatStateTxt(record) == '已完成'" color="green">
              {{ formatStateTxt(record) }}
            </a-tag>
            <a-tag v-if="formatStateTxt(record) == '无效'" color="orange">
              {{ formatStateTxt(record) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button
              v-if="formatStateTxt(record) !== '已完成'"
              type="link"
              class="inner-btn"
              @click="handleEdit(record.id)"
            >
              编辑
            </a-button>
            <a-button type="link" class="inner-btn" @click="handleDeleteDelegation([record.id])">
              删除
            </a-button>
            <a-button
              v-if="formatStateTxt(record) !== '已完成'"
              type="link"
              class="inner-btn"
              @click.stop="handleCompleteDelegation([record.id])"
            >
              注销
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
  <DelegationAdd
    v-if="showAddModal"
    ref="DelegationAddModal"
    @reloadData="getList"
    @close="showAddModal = false"
  />
  <DelegationEdit
    v-if="showEditModal"
    ref="DelegationEditModal"
    :form-id="formId"
    @reloadData="getList"
    @close="showEditModal = false"
  />
  <DelegationDetail
    v-if="showDetailModal"
    ref="detailModal"
    :form-id="formId"
    @close="showDetailModal = false"
  />
  <DelegationList ref="listModal" v-if="showListModal" @close="showListModal = false" />
  <DelegationHelp v-if="showHelpModal" @close="showHelpModal = false" />
</template>
<script setup lang="ts">
import DelegationAdd from './DelegationAdd.vue';
import DelegationEdit from './DelegationEdit.vue';
import DelegationDetail from './DelegationDetail.vue';
import DelegationList from './DelegationList.vue';
import DelegationHelp from './DelegationHelp.vue';
import {
  completeWorkHandInfoById,
  delWorkHandInfoById,
  listWorkHandDelegationByPage
} from '@/api/avic/bpm/BpmProcessDelegationApi';
import type { deleGationQueryForm } from '../types';
const { proxy } = getCurrentInstance();
const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  },
  selectType = 'multi', // 表格单选: single, 多选: multi
  colLayout = proxy.$colLayout4, // 页面表单响应式布局对象
  columns = [
    {
      title: '序号',
      ellipsis: true,
      width: 56,
      maxWidth: 56,
      align: 'center',
      key: 'id',
      fixed: 'left'
    },
    {
      title: '委托人',
      ellipsis: true,
      dataIndex: 'workOwnerName',
      key: 'workOwnerName',
      width: 160,
      minWidth: 160,
      resizable: true,
      align: 'center'
    },
    {
      title: '委托部门',
      ellipsis: true,
      dataIndex: 'workOwnerDeptName',
      minWidth: 180,
      width: 180,
      resizable: true,
      align: 'center'
    },
    {
      title: '受托人',
      ellipsis: true,
      dataIndex: 'receptUserName',
      width: 160,
      minWidth: 160,
      resizable: true,
      align: 'center'
    },
    {
      title: '受托人部门',
      ellipsis: true,
      dataIndex: 'receptDeptName',
      minWidth: 180,
      width: 180,
      resizable: true,
      align: 'center'
    },
    {
      title: '当前状态',
      dataIndex: 'validFlag',
      key: 'validFlag',
      align: 'center',
      sorter: true,
      resizable: true,
      minWidth: 120,
      width: 120
    },
    {
      title: '创建日期',
      dataIndex: 'handDate',
      align: 'center',
      minWidth: 180,
      width: 180,
      resizable: true,
      customRender: obj => {
        return obj ? proxy.$dateFormat(obj.text, 'YYYY-MM-DD') : '';
      }
    },
    {
      title: '委托生效日期',
      dataIndex: 'handEffectiveDate',
      align: 'center',
      minWidth: 180,
      width: 180,
      resizable: true,
      customRender: obj => {
        return obj ? proxy.$dateFormat(obj.text, 'YYYY-MM-DD') : '';
      }
    },
    {
      title: '预计返回日期',
      dataIndex: 'backDate',
      align: 'center',
      minWidth: 180,
      width: 180,
      resizable: true,
      customRender: obj => {
        return obj ? proxy.$dateFormat(obj.text, 'YYYY-MM-DD') : '';
      }
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      minWidth: 180,
      width: 180,
      align: 'center',
      fixed: 'right'
    }
  ];
const queryForm = ref<deleGationQueryForm>({
  receptUserId: undefined,
  receptDeptId: undefined,
  handEffectiveDateBegin: undefined,
  handEffectiveDateEnd: undefined,
  backDateBegin: undefined,
  backDateEnd: undefined,
  businessState: undefined
});

let avicTable = ref(),
  queryParam = reactive({
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
  }),
  list = ref([]), //表格数据集合
  selectedRowKeys = ref([]), //选中数据主键集合
  loading = ref<boolean>(false), // 表格loading状态
  totalPage = ref<number>(0),
  showAddModal = ref<boolean>(false), // 是否展示添加弹窗
  showEditModal = ref<boolean>(false), // 是否展示编辑弹窗
  showDetailModal = ref<boolean>(false), // 是否展示详情弹窗
  showListModal = ref<boolean>(false),
  showHelpModal = ref<boolean>(false),
  formId = ref<string>(''), // 当前行数据id
  advanced = ref<boolean>(false);

onMounted(() => {
  getList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listWorkHandDelegationByPage(queryParam)
    .then((response: any) => {
      list.value = response.data.rows;
      // list.value.forEach(item => {
      //   item.validFlag = '2';
      // });
      totalPage.value = response.data.records;
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
    });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = { ...queryForm.value };
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {} as deleGationQueryForm;
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value: string) {
  const keyWord = {
    receptUserName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 表格排序 */
function handleTableChange(pagination, filters, sorter) {
  console.log(filters);
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys: string[]) {
  selectedRowKeys.value = _selectedRowKeys;
}
/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  if (selectType === 'multi') {
    // 多选
    if (!selectIds.includes(record.id)) {
      // 选中
      selectedRowKeys.value.push(record.id);
    } else {
      // 取消选中
      selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
    }
  } else {
    // 单选
    if (!selectIds.includes(record.id)) {
      selectedRowKeys.value = [record.id];
    } else {
      selectedRowKeys.value = []; // 单选可取消
    }
  }
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id: string) {
  formId.value = id;
  showEditModal.value = true;
}
/**
 * 删除委托
 */
function handleDeleteDelegation(params: string[]) {
  if (!params.length) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$Modal.confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delWorkHandInfoById(params.join(','))
        .then((response: any) => {
          if (response.success) {
            proxy.$message.success('删除成功');
            getList();
          }
        })
        .catch(err => {
          proxy.$message.warning(err.message);
        });
    }
  });
}
/**
 * 注销委托
 */
function handleCompleteDelegation(params: string[]) {
  if (!params.length) {
    proxy.$message.warning('请选择要注销的数据！');
    return;
  }
  proxy.$Modal.confirm({
    title: '确定注销选择的委托吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      completeWorkHandInfoById(params.join(','))
        .then((response: any) => {
          if (response.success) {
            proxy.$message.success('操作成功');
            getList();
          }
        })
        .catch(err => {
          proxy.$message.warning(err.message);
        });
    }
  });
}
/** 详细 */
function handleDetail(id: string) {
  formId.value = id;
  showDetailModal.value = true;
}
/** 拿回已移交的待办 */
function handleList() {
  showListModal.value = true;
}
/**
 * 格式化状态
 */
function formatStateTxt(record) {
  let validString = '';
  if (record.validFlag === '1') {
    // let beginDate = record.handEffectiveDate;
    // let beginDateStr = new Date(beginDate).getTime() / 1000;
    // let nowDate = new Date();
    // let nowDateStr = new Date(nowDate).getTime() / 1000;
    let beginDate = record.handEffectiveDate;
    let beginDateStr = proxy.$dateFormat(beginDate, 'YYYY-MM-DD');
    let nowDate = new Date();
    let nowDateStr = proxy.$dateFormat(nowDate, 'YYYY-MM-DD');

    if (beginDateStr > nowDateStr) {
      validString = '未开始';
    } else {
      validString = '委托中';
    }
  } else if (record.validFlag === '0') {
    validString = '无效';
  } else if (record.validFlag === '2') {
    validString = '已完成';
  }
  return validString;
}
</script>
