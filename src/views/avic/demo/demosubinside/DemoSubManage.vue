<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="demoSubManage"
        table-key="demoSubManage"
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
              v-hasPermi="['demoSubManage:del']"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入必填或编码或唯一值"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-if="column.dataIndex === 'demoDate' && text">
            {{ proxy.$dayjs(text).format('YYYY-MM-DD') }}
          </template>
          <template v-if="column.dataIndex === 'demoSwitch'">
            <a-switch
              :checked="'Y' === record.demoSwitch"
              checked-children="有效"
              un-checked-children="无效"
            />
          </template>
          <template v-if="column.dataIndex === 'demoSelectName'">
            <AvicDictTag :value="text" :options="demoSelectList" />
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button
              v-hasPermi="['demoSubManage:del']"
              type="link"
              class="inner-btn"
              @click="handleDelete([record.id], 'row')"
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { listDemoSubInsideByPage, delDemoSubInside } from '@/api/avic/demo/DemoSubInsideApi'; // 引入模块API

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 80,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '必填',
    dataIndex: 'demoNotnull',
    ellipsis: true,
    width: 120,
    resizable: true,
    sorter: true
  },
  {
    title: '编码',
    dataIndex: 'demoCode',
    ellipsis: true,
    width: 120,
    align: 'center'
  },
  {
    title: '唯一值',
    dataIndex: 'demoUnique',
    ellipsis: true,
    width: 120,
    align: 'left'
  },
  {
    title: '用户',
    dataIndex: 'demoUserIdAlias',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '部门',
    dataIndex: 'demoDeptIdAlias',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '群组',
    dataIndex: 'demoGroupIdAlias',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '岗位',
    dataIndex: 'demoPositionIdAlias',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '单选',
    dataIndex: 'demoRadioName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单选（按钮样式）',
    dataIndex: 'demoRadioButtonName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '复选',
    dataIndex: 'demoCheckboxName',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '下拉',
    dataIndex: 'demoSelectName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下拉多选',
    dataIndex: 'demoSelectMultipleName',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开关',
    dataIndex: 'demoSwitch',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '小数',
    dataIndex: 'demoNumber',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '整数',
    dataIndex: 'demoInteger',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '日期',
    dataIndex: 'demoDate',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '日期时间',
    dataIndex: 'demoDateTime',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '电话(正则)',
    dataIndex: 'demoPhone',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '邮箱(正则)',
    dataIndex: 'demoEmail',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '网址(正则)',
    dataIndex: 'demoWebsite',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '弹窗',
    dataIndex: 'demoModalSelect',
    ellipsis: true,
    width: 120
  },
  {
    title: '多行文本',
    dataIndex: 'demoTextarea',
    ellipsis: true,
    width: 120
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    align: 'center',
    fixed: 'right'
  }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    demoMainId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const list = ref([]); // 表格数据集合
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const demoSelectList = ref([]); // 下拉通用代码
const lookupParams = [{ fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' }];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.demoMainId = props.mainId ? props.mainId : '-1';
  listDemoSubInsideByPage(queryParam)
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
    demoSelectList.value = result.demoSelect;
  });
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    demoNotnull: value,
    demoUnique: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 子表删除 */
function handleDelete(ids, type) {
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
      delDemoSubInside(ids)
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
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
watch(
  () => props.mainId,
  newVal => {
    if (newVal) {
      getList(); // 查询表格数据
    } else {
      selectedRowKeys.value = []; // 清空选中
      selectedRows.value = [];
      list.value = [];
      totalPage.value = 0;
    }
  },
  { immediate: true }
);
</script>
