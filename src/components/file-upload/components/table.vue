<template>
  <AvicTable
    ref="avicTable"
    table-key="avicTable"
    :columns="columns"
    :row-key="record => record.id"
    :showTableSetting="false"
    :bordered="true"
    :pagination="false"
    :data-source="fileList"
    :customRow="customRow"
  >
    <template #bodyCell="{ column, record }">
      <AvicRowEdit
        v-if="column.dataIndex === 'secretLevel'"
        :record="record"
        :column="column.dataIndex"
      >
        <template #edit>
          <a-select
            v-model:value="record.data.secretLevel"
            placeholder="请选择"
            style="width: 100%"
            @change="value => changeControlValue(value, record, 'secretLevel')"
          >
            <a-select-option
              v-for="select in secretLevelList"
              :key="select.sysLookupTlId"
              :title="select.lookupName"
              :value="select.lookupCode"
            >
              {{ select.lookupName }}
            </a-select-option>
          </a-select>
        </template>
        <template #default>
          {{ filterData(record.data.secretLevel) }}
        </template>
      </AvicRowEdit>
      <template v-else-if="column.dataIndex === 'action'">
        <AvicPreview
          :file="record"
          :allow-preview="allowPreview && $settings.uploader.allowPreview"
          :allow-encry="allowEncry"
          :flow-uploader="flowUploader"
          :task-name="taskName"
          :entry-id="entryId"
        />
        <a-button
          v-if="record.complete && allowDownload"
          @click="downloadFile(record)"
          svg="avic-download-fill"
          type="link"
        >
          下载
        </a-button>
        <AvicDelete
          v-if="!record.data.createdByName || allowDelete"
          title="您确定要删除选择的文件吗？"
          :type="'link'"
          style="color: #1f76cb"
          @click-confirm="remove(record)"
        >
          删除
        </AvicDelete>
      </template>
    </template>
  </AvicTable>
</template>

<script setup lang="ts">
import AvicDelete from './delBtn.vue';
import {
  downloadFlowFile,
  deleteFile,
  fileEditInfo,
  validDownload
} from '@/api/avic/system/FileUploadApi';
import AvicPreview from './preview.vue';
import { download } from '@/utils/download-util'; // 引入文件下载
import { fileTypeAll, createRegExp } from './util';
const { proxy } = getCurrentInstance();
const props = defineProps({
  fileList: {
    type: Object,
    required: true, //校验
    default: null
  },
  secretLevelList: {
    type: Array,
    required: false, //校验
    default() {
      return [];
    }
  },
  formId: {
    type: String,
    required: false, //校验
    default: ''
  },
  /** 是否可以修改密级 */
  allowUpdateSecretLevel: {
    type: Boolean,
    default: false
  },
  /** 是否允许删除附件 */
  allowDelete: {
    type: Boolean,
    default: false
  },
  /** 是否允许下载附件 */
  allowDownload: {
    type: Boolean,
    default: false
  },
  /** 是否允许预览 */
  allowPreview: {
    type: Boolean,
    default: false
  },
  //是否加密
  allowEncry: {
    type: Boolean,
    required: false,
    default: false
  },
  //是否流程上传
  flowUploader: {
    type: Boolean,
    required: false, //校验
    default: false
  },
  //流程节点
  taskName: {
    type: String,
    required: false, //校验
    default: ''
  },
  //实例id
  entryId: {
    type: String,
    required: false, //校验
    default: ''
  },
  /** 视图类型 line block */
  viewType: {
    type: String,
    required: false, //校验
    default: 'line'
  },
  /** 是否显示文件大小 */
  showSize: {
    type: Boolean,
    required: false,
    default: true
  },
  // 是否展示表格 span table
  showType: {
    type: String,
    default: 'span'
  }
});
const {
  fileList,
  formId,
  allowDelete,
  allowDownload,
  allowPreview,
  allowEncry,
  flowUploader,
  taskName,
  entryId
} = toRefs(props);
const $emit = defineEmits(['remove', 'preview']);
const columns = [
  {
    title: '附件名称',
    dataIndex: 'name',
    ellipsis: true
  },
  {
    title: '附件大小',
    dataIndex: 'size',
    ellipsis: true,
    align: 'center',
    customRender: obj => {
      return getFileSize(obj.text);
    }
  },
  {
    title: '密级',
    dataIndex: 'secretLevel',
    ellipsis: true,
    align: 'center',
    scopedSlots: { customRender: 'secretLevel' }
  },
  {
    title: '上传人',
    dataIndex: 'createdByName',
    ellipsis: true,
    align: 'center',
    customRender: obj => {
      return obj.record.data.createdByName;
    }
  },
  {
    title: '上传时间',
    dataIndex: 'creationDate',
    align: 'center',
    ellipsis: true,
    customRender: obj => {
      return obj.record.data.creationDate ? proxy.$dateFormat(obj.record.data.creationDate) : '';
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
];
const downloadFileParam = ref({
  url: '/appsys/common/uploader/download/v1/',
  allowEncry: allowEncry,
  method: 'get'
});
const downloadLoding = ref(false);
const levelLoading = ref(false);
const isPreview = ref(true);
const thumbnailImg = ref('other');
const secretLevel = ref([]);

onMounted(() => {
  let fileTypeList = fileTypeAll();
  let regexp = createRegExp(fileTypeList['image']);
  if (regexp != null && regexp.test(props.fileList.name)) {
    isPreview.value = true;
  }
});

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      if (props.allowUpdateSecretLevel) {
        handleEdit(record);
      }
    }
  };
}
/** 编辑 */
function handleEdit(record) {
  record.editable = true;
  record.operationType_ = record.operationType_ || 'update';
  const newData = [...fileList.value];
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  fileList.value = newData;
}
/** 密级选择 */
function changeControlValue(values, record, column) {
  const target = proxy[column + 'List'].find(item => values === item.lookupCode);
  if (record) {
    record.data.secretLevel = target.lookupCode;
  }
  if (record.complete && props.allowUpdateSecretLevel) {
    uploadfileEditInfo(target.lookupCode, record);
  }
}
/** 密级处理 */
function filterData(id) {
  let arr = props.secretLevelList.filter(item => {
    return item.lookupCode == id;
  });
  return arr[0].lookupName;
}
/** 校验下载 */
function validDownloadFunc(file) {
  let parameter = {
    fileId: file.id
  };
  /* this.$sdk.http(this.validDownloadParam.url,parameter,this.validDownloadParam.method,false, true, false, true) */
  validDownload(parameter)
    .then(res => {
      if (res.success) {
        if (!res.data) {
          proxy.$message.error(res.message);
        } else {
          downloadTemplate(file);
        }
      }
    })
    .catch(() => {});
}

function downloadFile(file) {
  if (flowUploader.value) {
    downloadFlow(file);
  } else {
    validDownloadFunc(file);
  }
}

/** 流程下载文件 */
function downloadFlow(file) {
  if (entryId.value && taskName.value) {
    let parameter = {
      fileId: file.id,
      // allowEncry:this.allowEncry,
      _taskName: taskName.value,
      _entryId: entryId.value
    };
    // let url = this.downloadFlowFileParam.url;
    // let method = this.downloadFlowFileParam.method;
    // this.$sdk.http(url, parameter, method, false, true, false, true)
    downloadFlowFile(parameter, false, true, false, true)
      .then(res => {
        if (!res.data) {
          proxy.$message.error(res.message);
        } else {
          validDownloadFunc(file);
        }
        levelLoading.value = false;
      })
      .catch(() => {
        levelLoading.value = false;
      });
  } else {
    proxy.$message.error('下载失败缺少参数！');
  }
}

/** 普通下载文件 */
function downloadTemplate(file) {
  downloadLoding.value = true;
  let url = downloadFileParam.value.url + file.id + '/' + allowEncry.value;
  download({
    url,
    method: downloadFileParam.value.method,
    progress: progress => {
      if (progress > 100) {
        file.progress = 0;
      } else if (progress == 100) {
        file.progress = progress;
        setTimeout(() => {
          file.progress = 0;
        }, 1000);
      } else {
        file.progress = progress;
      }
    }
  })
    .then(() => {
      downloadLoding.value = false;
    })
    .catch(() => {
      downloadLoding.value = false;
    });
}

/** 删除文件 */
function remove(file) {
  if (file) {
    if (file.complete) {
      removeByHttp(file);
    } else {
      $emit('remove', file);
    }
  }
}

/** 删除文件 */
function removeByHttp(file) {
  if (file.id) {
    deleteFile(file.id)
      .then(res => {
        if (res.success) {
          $emit('remove', file);
        }
      })
      .catch(() => {});
  }
}

/** 修改文件密级 */
function uploadfileEditInfo(level, file) {
  levelLoading.value = true;
  if (file.complete) {
    let parameter = {
      formId: formId.value,
      fileId: file.id,
      secretLevel: level
    };
    fileEditInfo(parameter)
      .then(() => {
        levelLoading.value = false;
      })
      .catch(() => {
        levelLoading.value = false;
      });
  }
}

/** 转换文件大小 */
function getFileSize(number) {
  if (number <= 0) {
    return '0KB';
  } else {
    if (number > 1048576) {
      return (number / 1024 / 1024).toFixed(2) + 'MB';
    } else {
      return (number / 1024).toFixed(2) + 'KB';
    }
  }
}
/**
 * 设置缩略图图片类型
 */
function setThumbnailImg(newV) {
  if (newV && newV.name) {
    // 大写转小写 统一校验格式
    // newV.name = newV.name.toLowerCase();
    // 上传文件名会全部变为小写问题修复 by cuijj 2022-08-12
    let newVName = newV.name.toLowerCase();

    if (newVName.indexOf('.gif') != -1) {
      thumbnailImg.value = 'gif';
    } else if (newVName.indexOf('.jpg') != -1) {
      thumbnailImg.value = 'jpg';
    } else if (newVName.indexOf('.pdf') != -1) {
      thumbnailImg.value = 'pdf';
    } else if (newVName.indexOf('.png') != -1) {
      thumbnailImg.value = 'png';
    } else if (
      newVName.indexOf('.ppt') != -1 ||
      newVName.indexOf('.pptx') != -1 ||
      newVName.indexOf('.dps') != -1
    ) {
      thumbnailImg.value = 'ppt';
    } else if (
      newVName.indexOf('.doc') != -1 ||
      newVName.indexOf('.docx') != -1 ||
      newVName.indexOf('.wps') != -1
    ) {
      thumbnailImg.value = 'word';
    } else if (
      newVName.indexOf('.xls') != -1 ||
      newVName.indexOf('.xlsx') != -1 ||
      newVName.indexOf('.et') != -1
    ) {
      thumbnailImg.value = 'excel';
    } else if (newVName.indexOf('.txt') != -1) {
      thumbnailImg.value = 'text';
    } else if (newVName.indexOf('.rar') != -1 || newVName.indexOf('.zip') != -1) {
      thumbnailImg.value = 'zip';
    } else {
      thumbnailImg.value = 'other';
    }
  }
}
watch(
  () => props.fileList,
  newV => {
    if (props.viewType == 'block') {
      setThumbnailImg(newV);
    }
    if (newV.data && newV.data.secretLevel) {
      if (!newV.data.secretName) {
        secretLevel.value = props.secretLevelList.filter(
          tim => tim.lookupCode == newV.data.secretLevel
        );
      } else {
        secretLevel.value = [
          { lookupName: newV.data.secretName, lookupCode: newV.data.secretLevel }
        ];
      }
    } else {
      secretLevel.value = props.secretLevelList[0] ?? [];
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
