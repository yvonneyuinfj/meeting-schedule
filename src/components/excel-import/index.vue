<template>
  <AvicModal
    :visible="true"
    :title="title"
    width="960px"
    height="520px"
    :centered="true"
    :adjust-size="false"
    @cancel="closeModal"
  >
    <div class="content-wrapper">
      <!-- 表格 -->
      <div class="table-wrapper">
        <AvicTable
          ref="avicTable"
          row-key="id"
          :bordered="true"
          :columns="columns"
          :data-source="list"
          :loading="loading"
          :pageParameter="queryParam.pageParameter"
          :total="total"
          :showTableSetting="false"
          @refresh="getList"
          @change="handleTableChange"
        >
          <template v-slot:toolBarLeft>
            <a-space>
              <!-- 图标还未导入 icon="download" -->
              <a-button ghost type="primary" title="导入模板下载" @click="downLoadFile">
                导入模板下载
              </a-button>
              <AvicUploader
                :element-id="elementId"
                form-type="add"
                :form-id="formId"
                table-name="EXCEL_IMPORT_TABLE"
                :multiple="false"
                :file-size-limit="5"
                ref="avicEditUploaderFile"
                :allow-delete="true"
                :upload-timeout="300000"
                timeout-message="上传文件过大，请稍后在【查看导入结果】中查看上传情况"
                :colspan="1"
                :upload-url="importUrl"
                :file-num-limit="2"
                upload-type="excel"
                :show-size="false"
                :use-form-info-param="false"
                :validateSecretBeforeUpload="false"
                @afterUpload="afterUpload"
                @filesChange="filesChange"
              />
            </a-space>
          </template>
          <!-- icon 还未导入 icon="import"  -->
          <template v-slot:toolBarRight>
            <a-button title="导入" type="primary" @click="importFile" :disabled="importDisabled">
              导入
            </a-button>
          </template>
          // eslint-disable-next-line vue/no-unused-vars
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'id'">
              {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
            </template>
            <template v-else-if="column.dataIndex === 'download'">
              <font style="color: green" v-if="record.failCount == 0" title="导入成功">
                <span style="padding: 0 8px">导入成功</span>
              </font>
              <a-button
                v-else
                class="table-detail-link inner-btn"
                style="color: red"
                type="link"
                title="失败【查看】"
                @click="handleDownload(record)"
              >
                失败【查看】
              </a-button>
            </template>
            <template v-else-if="column.dataIndex === 'action'">
              <a-button type="link" class="inner-btn" @click="handleDelete([record.id])">
                删除
              </a-button>
            </template>
          </template>
        </AvicTable>
      </div>
    </div>
    <template #footer>
      <a-button title="返回" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { download } from '@/utils/download-util';
import type { downloadParam } from '@/utils/download-util';
import {
  getExcelImportHis,
  downloadErrorFile,
  delExcelImportHis
} from '@/api/avic/system/AvicImportApi';
import { ref } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
  /** 弹框title */
  title: { type: String, required: false, default: 'EXCEL导入' },
  /** excel导入需要传入后台的参数对象，JSON格式 */
  formData: { type: Object, required: true },
  /** 下载模板接口地址 */
  downloadTemplateUrl: { type: String, required: false, default: '' },
  /** 导入接口地址 */
  importUrl: { type: String, required: true, default: '' }
});
/**
 * close 关闭导入组件回调
 * reloadData 刷新父组件表格数据回调
 */
const $emit = defineEmits(['close', 'reloadData']);
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 60,
    align: 'center',
    ellipsis: true
  },
  {
    title: '成功数',
    dataIndex: 'successCount',
    width: 120,
    align: 'right',
    ellipsis: true
  },
  {
    title: '失败数',
    dataIndex: 'failCount',
    width: 120,
    align: 'right',
    ellipsis: true
  },
  {
    title: '导入用户',
    dataIndex: 'opetatorPerson',
    width: 120,
    ellipsis: true
  },
  {
    title: '导入时间',
    dataIndex: 'lastUpdateDate',
    width: 150,
    ellipsis: true
  },
  {
    title: '下载',
    dataIndex: 'download',
    width: 120,
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 100,
    align: 'center',
    ellipsis: true
  }
];
const elementId = '0';
const queryForm = ref({});
let queryParam = reactive({
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
const list = ref([]); //表格数据集合
const selectedRowKeys = ref([]); //选中数据主键集合
const selectedRows = ref([]); //选中数据集合
const loading = ref(false); // 表格loading状态
const formId = ref('fileInfo');
const importDisabled = ref(false);
const total = ref(0);
const avicEditUploaderFile = ref();
onMounted(() => {
  // 加载表格数据
  getList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中 // 清空选中
  selectedRows.value = [];
  loading.value = true;
  getExcelImportHis(queryParam, props.formData.tableName)
    .then(response => {
      list.value = response.data.result;
      total.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      total.value = 0;
      loading.value = false;
    });
}
/** 点击返回、点击X关闭事件 */
function closeModal() {
  $emit('close');
}
/** 下载模板 */
function downLoadFile() {
  loading.value = true;
  // 暂时未引入download
  const downloadDto = {
    url: props.downloadTemplateUrl,
    data: null,
    method: 'GET'
  } as downloadParam;
  download(downloadDto).then(() => {
    loading.value = false;
  });
}
/** 导入模板 */
function importFile() {
  if (avicEditUploaderFile.value.filesCount == 0) {
    proxy.$message.warning('请选择要导入的文件！');
  } else {
    loading.value = true;
    setUploadData();
    avicEditUploaderFile.value.upload(formId.value);
    importDisabled.value = true;
  }
}
/** 设置上传文件的参数 */
function setUploadData() {
  avicEditUploaderFile.value?.files['0'].map(tim => {
    if (!tim.complete) {
      tim.data.impExcelFile = avicEditUploaderFile.value.filesBind[0].file;
      tim.data.formData = JSON.stringify(props.formData);
    }
  });
}
/** 下载错误数据 */
function handleDownload(data) {
  loading.value = true;
  const param = data.id + '?fileName=' + data.fileUrl;
  loading.value = false;
  downloadErrorFile(param).then(() => {
    loading.value = false;
  });
}
/** 删除导出记录 */
function handleDelete(ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: '确定要删除选择的数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      delExcelImportHis(ids.join(','))
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            getList();
          }
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
}
/** 导入后提示信息 */
function afterUpload(successFile, errorFiles) {
  loading.value = false;
  importDisabled.value = false;
  avicEditUploaderFile.value.removeAll(elementId);
  if (errorFiles.length > 0) {
    let errorResult = errorFiles[errorFiles.length - 1].response;
    let message = errorResult.errorDesc;
    if (!message) {
      message = '上传失败！';
    }
    proxy.$message.warning({
      class: 'errorBody',
      title: '导入异常',
      content: message
    });
    return;
  }
  let result = successFile[successFile.length - 1].response.responseBody;
  if (result) {
    proxy.$message.info(result.message);
    getList();
    $emit('reloadData');
  } else {
    proxy.$message.error('导入失败');
  }
}
function filesChange() {
  avicEditUploaderFile.value.removeAll(elementId);
  importDisabled.value = false;
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
</script>
<style lang="less" scoped>
:deep(.avic-upload) {
  .ant-btn-primary {
    color: @primary-color;
    background: #fff;
    cursor: pointer;
  }
  display: inline-flex;
  .ant-alert-info {
    display: none;
  }
  .file-open {
    display: none;
  }
  .file-list {
    margin: 0;
    padding: 5px;
  }
}
</style>

<style>
.errorBody .ant-modal-confirm-content {
  max-height: 180px;
  overflow: auto;
}
</style>
