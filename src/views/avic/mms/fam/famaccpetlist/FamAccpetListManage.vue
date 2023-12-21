<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="famAccpetList"
        table-key="famAccpetList"
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
        :customRow="
          record => {
            return {
              onClick: () => {
                handleRowSelection(record);
              }
            };
          }
        "
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
            <a-button
              title="导入"
              type="primary"
              ghost
              @click="handleImport"
            >
              <template #icon>
                <import-outlined/>
              </template>
              导入
            </a-button>
          </a-space>
        </template>
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
          <template v-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click="handleAttach(record)"
            >
              附件
            </a-button>
            <a-button
              type="link"
              class="inner-btn"
              @click="handleDelete([record.id], 'row')"
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="单表模板导入"
        importUrl="/mms/fam/famaccpetlists/importData/v1"
        downloadTemplateUrl="/mms/fam/famaccpetlists/downloadTemplate/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
      <a-modal
        title="查看附件"
        :visible="attachOpen"
        @cancel="()=>attachOpen = false"
        @ok="handleOk"
        width="60%"
      >
        <AvicUploader
          v-if="attachOpen"
          element-id="1"
          form-type="add"
          ref="uploadFile"
          save-type="Disk"
          :allow-download="true"
          :allow-preview="true"
          :allow-delete="true"
          :allow-update-secret-level="true"
          :form-id="attachId"
          :draggable="true"
          table-name="FAM_ACCPET"
          @afterUpload="afterUploadEvent"
        />
        <a-image-preview-group style="display: flex;flex-wrap: wrap">
          <a-image v-for="item in fileImgList" :src="item" :width="150" style="margin-right: 20px"></a-image>
        </a-image-preview-group>
        <template #footer>
          <a-button key="back" @click="()=>attachOpen = false">关闭</a-button>
          <a-button key="submit" type="primary" :loading="uploadLoading" @click="handleOk">保存</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { listFamAccpetListByPage, delFamAccpetList, previewImage } from '@/api/avic/mms/fam/FamAccpetListApi';
import { validPreview } from '@/api/avic/system/FileUploadApi.ts';
import { AllColumns } from './ListColumns';
import { closeFlowLoading } from '@/views/avic/bpm/bpmutils/FlowUtils'; // 引入模块API

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  }
});
const columns = [...AllColumns];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    amAccpetId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const fileImg = ref();
const attachId = ref<string>('');
const uploadLoading = ref<boolean>(false);
const attachOpen = ref<boolean>(false);
const list = ref([]); // 表格数据集合
const uploadFile = ref(null);
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const secretLevel = ref(); // 附件密集
const delLoading = ref(false);
const showImportModal = ref(false); // 是否展示导入弹窗
const totalPage = ref(0);
const secretLevelList = ref([]); // 数据密级通用代码
const excelParams = ref({ tableName: 'famAssetClass' }); // 导入Excel数据过滤参数
const isNewAssetList = ref([]); // 是否新增资产通用代码
const importedOrNotList = ref([]); // 是否为进口设备通用代码
const fileImgList = ref([]);
const lookupParams = [
  { fieldName: 'isNewAsset', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'importedOrNot', lookUpType: 'FAM_PROGRAM_VERSION' }
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
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.amAccpetId = props.mainId ? props.mainId : '-1';
  listFamAccpetListByPage(queryParam)
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
    isNewAssetList.value = result.isNewAsset;
    importedOrNotList.value = result.importedOrNot;
  });
}

const handleAttach = (record) => {
  attachId.value = record.id;
  secretLevel.value = record.secretLevel;
  attachOpen.value = true;
  // setTimeout(() => {
  //   if (uploadFile.value) {
  //     uploadFile.value.files['1'].map(item => {
  //       //循环请求出图片列表
  //       getFileImageList(item.id);
  //     });
  //   }
  // }, 500);
};

const handleOk = () => {
  const validateResult = validateUploaderFileSecret(secretLevel.value);
  if (!validateResult) {
    return;
  }
  uploadFile.value.upload(attachId);
  proxy.$message.success('保存成功!');
  attachOpen.value = false;
};

// 浏览图片验证
const fileValidPreview = (id) => {
  return new Promise((resolve, reject) => {
    const data = {
      fileId: id,
      _entryId: '',
      _taskName: ''
    };
    validPreview(data).then(res => {
      resolve(res.data);
    });
  });
};

// 获取图片列表
async function getFileImageList(id) {
  const result = await fileValidPreview(id);
  await getFileView(id, 'false');
}

// 获取图片
const getFileView = (id, result) => {
  return new Promise((resolve, reject) => {
    previewImage(id, result).then(res => {
      console.log(res);
      fileImgList.value.push(res);
    });
  });
};

/** 校验表单附件密级 */
function validateUploaderFileSecret() {
  const errorMessage = uploadFile.value.validateUploaderFileSecret();
  if (errorMessage) {
    return false;
  }
  return true;
}


/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {};
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 导入 */
function handleImport() {
  showImportModal.value = true;
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
      delFamAccpetList(ids)
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

/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}

/** 上传之后的回调  */
const afterUploadEvent = (successFile, errorFile) => {
  console.log(successFile);
  console.log(errorFile);
};


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
