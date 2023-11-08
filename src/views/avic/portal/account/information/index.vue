<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <a-form v-bind="layout" ref="formRef" :model="form">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="消息标题">
              <a-input v-model:value="form.attribute01" allow-clear placeholder="请输入消息标题" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="消息内容">
              <a-input v-model:value="form.content" allow-clear placeholder="请输入消息内容" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="发送时间(起)">
              <a-date-picker
                :show-time="{
                  format: 'HH:mm'
                }"
                v-model:value="form.sendDateBegin"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                :show-today="true"
                placeholder="发送时间(起)"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, form.sendDateEnd)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发送时间(止)">
              <a-date-picker
                :show-time="{
                  format: 'HH:mm'
                }"
                v-model:value="form.sendDateEnd"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                :show-today="true"
                placeholder="发送时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, form.sendDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="消息发送人">
              <AvicCommonSelect
                v-model:value="form.sendUser"
                type="userSelect"
                select-model="single"
                :defaultShowValue="form.sendUserAlias"
                placeholder="请选择消息发送人"
                @callback="
                  result => {
                    form.sendUserAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="我的接收">
              <a-radio-group v-model:value="form.receiveMsg" @change="handleReceiveMsg">
                <a-radio value="-1">全部</a-radio>
                <a-radio value="0">未读</a-radio>
                <a-radio value="1">已读</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="我的发送">
              <a-radio-group v-model:value="form.sendMsg" @change="handleSendMsg">
                <a-radio value="0" />
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined />
                  查询
                </a-button>
                <a-button @click="resetQuery" type="primary" ghost>
                  <redo-outlined />
                  重置
                </a-button>
                <a-button type="link" @click="handleAdvancedSearch" style="margin: 0">
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
    <div class="table-wrapper">
      <AvicTable
        ref="avicTable"
        :columns="columns"
        :data-source="data"
        :row-key="record => record.id"
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
        <template #toolBarRight>
          <a-space>
            <a-select
              @change="handleChange"
              style="width: 100px; text-align: left"
              default-value="0"
            >
              <a-select-opt-group>
                <template #label>
                  <span>
                    <avic-icon svg="SoundOutlined" />
                    我的接收
                  </span>
                </template>
                <a-select-option value>全部</a-select-option>
                <a-select-option value="0">未读</a-select-option>
                <a-select-option value="1">已读</a-select-option>
              </a-select-opt-group>
              <a-select-opt-group>
                <template #label>
                  <span>
                    <user-outlined />
                    我的发送
                  </span>
                </template>
                <a-select-option value="2">我的发送</a-select-option>
              </a-select-opt-group>
            </a-select>
            <a-input-search
              class="opt-btn-commonsearch"
              style="width: 250px"
              v-model:value="searchText"
              placeholder="请输入消息标题或消息内容"
              title="请输入消息标题或消息内容"
              :allow-clear="true"
              :maxLength="30"
              @search="searchByKeyWord()"
            />
          </a-space>
        </template>
        <template #toolBarLeft>
          <a-space>
            <a-button type="primary" title="添加" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              danger
              title="删除"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :disabled="recvOrSend == '0'"
              @click="handleDelete"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button @click="haveRead" :disabled="recvOrSend == '0'">
              <template #icon>
                <folder-open-outlined />
              </template>
              标记已读
            </a-button>
            <a-button @click="noRead" :disabled="recvOrSend == '0'">
              <template #icon>
                <mail-outlined />
              </template>
              标记未读
            </a-button>
          </a-space>
        </template>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.key === 'attribute01'">
            <a href="javascript:;" class="table-detail-link" @click="handleDetail(record)">
              {{ record.attribute01 }}
            </a>
          </template>
          <template v-else-if="column.key === 'isReaded'">
            <div style="text-align: center" :key="record.id">
              <a-switch
                v-if="record.recvOrSend == '1'"
                checked-children="是"
                un-checked-children="否"
                @change="isRead({ param: { id: record.id, isReadFlag: record.isReaded } })"
                :checked="record.isReaded == '是' ? true : false"
              />
              <template v-else>
                {{ record.isReaded == '是' ? '消息已读' : '消息未读' }}
              </template>
            </div>
          </template>
        </template>
      </AvicTable>
      <NoticeAdd
        v-if="showAddModal"
        :ref="addModalRefName"
        layout="2"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 详情弹框 -->
      <NoticeDetail
        v-if="showDetailModal"
        :ref="detailModalRefName"
        :param-id="messageId"
        layout="2"
        @closeDetail="menuRefresh"
        @close="showDetailModal = false"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  getListApi,
  doReadParamApi,
  doUnReadParamApi,
  delParamApi
} from '@/api/avic/system/MessageApi';
import NoticeAdd from '@/components/notice-icon/NoticeAdd.vue'; //添加页面
import NoticeDetail from '@/components/notice-icon/NoticeDetail.vue'; //详情页面
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 100px' },
  wrapperCol: { flex: '1 1 0' }
};
let colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
let columns = [
  {
    title: '序号',
    ellipsis: true,
    width: 80,
    align: 'center',
    key: 'id',
    fixed: 'left'
  },
  {
    title: '消息标题',
    dataIndex: 'attribute01',
    key: 'attribute01',
    ellipsis: true,
    sorter: true,
    align: 'left'
  },
  {
    title: '消息内容',
    dataIndex: 'content',
    ellipsis: true,
    sorter: true,
    key: 'content'
  },
  {
    title: '消息发送人',
    dataIndex: 'sendUserAlias',
    ellipsis: true,
    align: 'center',
    key: 'sendUserAlias'
  },
  {
    title: '发送时间',
    dataIndex: 'sendDate',
    ellipsis: true,
    sorter: true,
    align: 'center',
    key: 'sendDate'
  },
  {
    title: '消息接收人',
    dataIndex: 'recvUserAlias',
    align: 'center',
    ellipsis: true,
    key: 'recvUserAlias'
  },
  {
    title: '到期时间',
    dataIndex: 'disappearDate',
    sorter: true,
    align: 'center',
    ellipsis: true,
    key: 'disappearDate'
  },
  {
    align: 'center',
    title: '是否已读',
    dataIndex: 'isReaded',
    key: 'isReaded'
  }
];

let showAddModal = ref(false);
let showDetailModal = ref(false);
let advanced = ref(false);
let loading = ref(false);
let isAdvancedSearch = ref(false);
let isSearchByKeyWord = ref(true);
const form = ref({
  attribute01: '',
  sendUser: '',
  content: '',
  sendDateBegin: '',
  sendDateEnd: '',
  sendUserAlias: '',
  receiveMsg: '0',
  sendMsg: ''
}); //高级查询内容
let searchText = ref('');
let messageId = ref('');
let selectedRowKeys = ref([]);
let selectedRows = ref([]);
let isReadedList = ref('0');
let recvOrSend = ref('1');
let data = ref([]);
let totalPage = ref(0);
let addModalRefName = 'addModal';
let detailModalRefName = 'detailModal';
let selectType = 'multi'; // 表格单选: single, 多选: multi
const avicTable = ref();
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...form.value
  },
  keyWord: isSearchByKeyWord.value ? searchText.value : null, // 快速查询数据
  sidx: '', // 排序字段
  sord: '' // 排序方式: desc降序 asc升序
});

onMounted(() => {
  getList();
});
watch(
  queryParam,
  newV => {
    if (newV.searchParams['recvOrSend'] == '0') {
      avicTable.value.changeColumnsSetting([
        {
          align: 'center',
          title: '是否已读',
          dataIndex: 'isReaded',
          key: 'isReaded',
          visible: false
        }
      ]);
    } else {
      avicTable.value.changeColumnsSetting([
        {
          align: 'center',
          title: '是否已读',
          dataIndex: 'isReaded',
          key: 'isReaded',
          visible: true
        }
      ]);
    }
  },
  { deep: true }
);
/** 获取表格数据 */
function getList() {
  let obj = {
    isReaded: '',
    recvOrSend: ''
  };
  if (isSearchByKeyWord.value) {
    // 普通查询数据
    obj = {
      ...queryParam.searchParams, // 普通查询数据
      isReaded: isReadedList.value, //已读，未读查询条件
      recvOrSend: recvOrSend.value //
    };
  } else if (isAdvancedSearch.value) {
    let isReaded = form.value.receiveMsg;
    let recvOrSend = form.value.sendMsg;
    if (isReaded !== '') {
      recvOrSend = '1';
    } else if (isReaded) {
      isReaded = '';
    }
    // 高级查询数据
    obj = {
      // ...this.searchParam, // 普通查询数据
      ...form.value, // 高级查询数据
      isReaded: isReaded, //已读，未读查询条件
      recvOrSend: recvOrSend
    };
    if (form.value.receiveMsg != '') {
      obj.recvOrSend = '1';
      obj.isReaded = form.value.receiveMsg == '-1' ? '' : form.value.receiveMsg;
    } else if (form.value.sendMsg != '') {
      obj.recvOrSend = '0';
      obj.isReaded = '';
    }
  }
  delete obj['receiveMsg'];
  delete obj['sendMsg'];
  queryParam.searchParams = obj;
  loading.value = true;
  selectedRowKeys.value = []; // 清空选中
  getListApi(queryParam)
    .then((response: any) => {
      data.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      data.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

/** 高级查询 查询按钮操作 */
function handleQuery() {
  isSearchByKeyWord.value = false;
  isAdvancedSearch.value = true;
  queryParam.searchParams = { ...form.value };
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  form.value = {
    attribute01: '',
    sendUser: '',
    content: '',
    sendDateBegin: '',
    sendDateEnd: '',
    sendUserAlias: '',
    receiveMsg: '0',
    sendMsg: ''
  };
  handleQuery();
}
/** 高级查询 展开/收起 */
function handleAdvancedSearch() {
  advanced.value = !advanced.value;
}

function handleChange(value) {
  isAdvancedSearch.value = false;
  isSearchByKeyWord.value = true;
  if (value == '2') {
    //我的发送
    isReadedList.value = '';
    recvOrSend.value = '0';
    getList();
  } else {
    //我的接收
    recvOrSend.value = '1';
    isReadedList.value = value;
    getList();
  }
}
/** 搜索 */
function searchByKeyWord() {
  isSearchByKeyWord.value = true;
  isAdvancedSearch.value = false;
  queryParam.keyWord = searchText.value;
  getList();
}

function handleSendMsg(e) {
  let sendMsg = e.target.value;
  if (sendMsg == '0') {
    form.value.receiveMsg = '';
  }
}
function handleReceiveMsg(e) {
  let receiveMsg = e.target.value;
  if (receiveMsg !== '') {
    form.value.sendMsg = '';
  }
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 详情 */
function handleDetail(obj) {
  showDetailModal.value = true;
  messageId.value = obj.id;
}
/** 删除 */
function handleDelete() {
  if (selectedRowKeys.value.length == 0) {
    proxy.$message.warning('请选择一条要删除的数据！');
    return;
  }
  if (selectedRows.value.filter(item => item.isReaded == '否').length) {
    proxy.$message.warning('未读消息不可删除！');
    return;
  }
  proxy.$Modal.confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      // 确认删除
      handleConfirm();
    }
  });
}
/** 删除 */
function handleConfirm() {
  delParamApi(selectedRowKeys.value.join(',')).then((response: any) => {
    if (response.success) {
      proxy.$message.success('删除成功！'); // 提示删除成功
      selectedRowKeys.value = []; // 清空表格选中项
      getList(); //刷新表格
    }
  });
}
/** 标记已读 */
function haveRead() {
  if (selectedRowKeys.value.length == 0) {
    proxy.$message.warning('请选择一条数据！');
    return;
  }
  let param = selectedRowKeys.value.join(',');
  doReadParamApi(param).then((response: any) => {
    if (response.success) {
      proxy.$message.success('设置已读成功！'); // 提示成功
      selectedRowKeys.value = []; // 清空表格选中项
      getList(); //刷新表格
    }
  });
}
/** 标记未读 */
function noRead() {
  if (selectedRowKeys.value.length == 0) {
    proxy.$message.warning('请选择一条数据！');
    return;
  }
  let param = selectedRowKeys.value.join(',');
  doUnReadParamApi(param).then((response: any) => {
    if (response.success) {
      proxy.$message.success('设置未读成功！'); // 提示成功
      selectedRowKeys.value = []; // 清空表格选中项
      getList(); //刷新表格
    }
  });
}
/** 是否已读 */
function isRead(value) {
  let param = value.param.id;
  let isReadFlag = value.param.isReadFlag;
  if (isReadFlag == '否') {
    doReadParamApi(param).then((response: any) => {
      if (response.success) {
        proxy.$message.success('设置已读成功！'); // 提示成功
        selectedRowKeys.value = []; // 清空表格选中项
        getList();
      }
    });
  } else {
    doUnReadParamApi(param).then((response: any) => {
      if (response.success) {
        proxy.$message.success('设置未读成功！'); // 提示成功
        selectedRowKeys.value = []; // 清空表格选中项
        getList();
      }
    });
  }
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
function menuRefresh() {
  getList();
}
</script>
<style lang="less" scoped></style>
