<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <pms-check-bill @mainId="parentIdChange"/>
    </AvicPane>
    <AvicPane>
      <div class="content-wrapper">
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable
            ref="pmsCertification"
            table-key="pmsCertification"
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
                  v-hasPermi="['pmsCertification:add']"
                  title="添加"
                  type="primary"
                  @click="handleAdd"
                >
                  <template #icon>
                    <plus-outlined/>
                  </template>
                  添加
                </a-button>
                <a-button
                  v-hasPermi="['pmsCertification:edit']"
                  title="编辑"
                  type="primary"
                  ghost
                  @click="handleEdit"
                >
                  <template #icon>
                    <edit-outlined/>
                  </template>
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['pmsCertification:del']"
                  title="删除"
                  danger
                  :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                  :loading="delLoading"
                  @click="handleDelete(selectedRows, selectedRowKeys)"
                >
                  <template #icon>
                    <delete-outlined/>
                  </template>
                  删除
                </a-button>
                <a-button
                  v-hasPermi="['pmsCertification:export']"
                  title="导出"
                  type="primary"
                  ghost
                  @click="handleExport">
                  <template #icon>
                    <export-outlined/>
                  </template>
                  导出
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-space>
                <AvicBpmFilter
                  :allFileAuth="['pmsCertification:all']"
                  :myFileAuth="['pmsCertification:my']"
                  :defaultBpmType='queryForm.bpmType'
                  :defaultBpmState='queryForm.bpmState'
                  @change="changeBpmFilter"
                />
                <a-input-search
                  class="opt-btn-commonsearch"
                  style="width: 200px"
                  placeholder="请输入"
                  :allow-clear="true"
                  @search="handleKeyWordQuery"
                />
              </a-space>
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'secretLevelName'">
                <a @click="handleFlowDetail(record)">
                  {{ record.secretLevelName }}
                </a>
              </template>
            </template>
          </AvicTable>
        </div>
        <!-- 添加页面弹窗 -->
        <PmsCertificationAdd
          v-if="showAddModal"
          ref="addModal"
          :mainId="mainId"
          :bpmOperatorRefresh="getList"
          @reloadData="getList"
          @close="showAddModal = false"
        />
        <!-- 编辑页面弹窗 -->
        <PmsCertificationEdit
          v-if="showEditModal"
          ref="editModal"
          :form-id="formId"
          @reloadData="getList"
          @close="showEditModal = false"
        />
      </div>
    </AvicPane>

  </AvicSplit>

</template>
<script lang="ts" setup>
import type {PmsCertificationDto} from '@/api/avic/mms/pms/PmsCertificationApi'; // 引入模块DTO
import {listPmsCertificationByPage, delPmsCertification, exportExcel} from '@/api/avic/mms/pms/PmsCertificationApi'; // 引入模块API
import PmsCertificationAdd from './PmsCertificationAdd.vue'; // 引入添加页面组件
import PmsCertificationEdit from './PmsCertificationEdit.vue'; // 引入编辑页面组件
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import PmsCheckBill from "@/views/avic/mms/pms/pmscertification/PmsCheckBill.vue";

const {proxy} = getCurrentInstance();
const layout = {
  labelCol: {flex: '0 0 120px'},
  wrapperCol: {flex: '1 1 0'}
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
    title: '厂内合格证',
    dataIndex: 'facprtlotNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格品数量',
    dataIndex: 'qualifiedQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '检验结论',
    dataIndex: 'checkResultName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不合格品数量',
    dataIndex: 'unqualifiedQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '不合格品处理单号',
    dataIndex: 'unqualifiedNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检验损耗数量',
    dataIndex: 'checkLossQty',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '状态',
    dataIndex: 'status',
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
const queryForm = ref<PmsCertificationDto>({
  bpmState: 'all',
  bpmType: 'my'
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
const checkResultList = ref([]); // 检验结论通用代码
const mainId = ref(''); // 上级ID
const lookupParams = [
  {fieldName: 'checkResult', lookUpType: 'PMS_UP_TO_STANDARD'}
];

onMounted(() => {
  // 加载表格数据
  getList();
  // 获取通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

function parentIdChange(pmsCheckBillId) {
  mainId.value = pmsCheckBillId;
}

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listPmsCertificationByPage(queryParam)
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
    checkResultList.value = result.checkResult;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}

/** 根据流程状态及发起人查询数据 */
function changeBpmFilter({bpmType, bpmState}) {
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
  const keyWord = {};
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  if (!mainId.value) {
    proxy.$message.warning('请先选择主表数据！');
    return;
  }
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
      delPmsCertification(ids)
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
