<!--
  文件
-->
<template>
  <div class="file-wrapper">
    <div v-if="viewType == 'line'" class="file-main">
      <div class="file-list" :title="file.name">
        <div class="111">
          {{ file.name }}
          <a-dropdown
            v-if="secretLevelList && secretLevelList.length > 0 && allowUpdateSecretLevel"
            :trigger="['click']"
            :get-popup-container="triggerNode => triggerNode.parentNode"
          >
            <a class="select-link" href="#">
              {{ secretLevel.length > 0 ? secretLevel[0].lookupName : '请选择文件密级' }}
              <down-outlined v-if="!levelLoading" />
              <loading-outlined v-if="levelLoading" />
              <!--              <a-icon  type="down"/>-->
              <!--              <a-icon v-if="levelLoading" type="loading"/>-->
            </a>
            <template #overlay>
              <a-menu @click="e => levelChange(e, file)">
                <a-menu-item v-for="level in secretLevelList" :key="level.lookupCode">
                  {{ level.lookupName }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div v-else class="ant-dropdown-link" href="#">
            <a-spin :spinning="levelLoading">
              {{ secretLevel.length > 0 ? secretLevel[0].lookupName : '' }}
            </a-spin>
          </div>
          <span v-if="showSize" :title="getFileSize(file.size)" class="file-size">
            {{ getFileSize(file.size) }}
          </span>
          <AvicPreview
            :file="file"
            class="close-icon"
            :allow-preview="allowPreview && $settings.uploader.allowPreview"
            :allow-encry="allowEncry"
            :flow-uploader="flowUploader"
            :task-name="taskName"
            :entry-id="entryId"
          />
          <download-outlined
            v-if="file.complete && !downloadLoding && allowDownload"
            class="close-icon"
            @click="downloadFile(file)"
          />
          <loading-outlined v-if="downloadLoding" class="close-icon" />
          <AvicDelete
            v-if="allowDelete"
            class="table-handle-button"
            title="您确定要删除选择的文件吗？"
            @click-confirm="remove(file)"
          >
            <avic-icon svg="avic-close-line" class="close-icon" />
          </AvicDelete>
        </div>
      </div>
    </div>
    <div v-if="viewType == 'block'" class="file-block has-upload-user-time">
      <div class="file-list">
        <avic-icon :svg="svgName" class="file-icon" />
        <!--        <icon :component="svgComponent"/>-->
        <div class="name-box name-box-title">
          <span class="name" :title="file.name">
            {{ file.name }}
          </span>
        </div>
        <div class="name-box name-box-drop">
          <a-dropdown
            v-if="secretLevelList && secretLevelList.length > 0 && allowUpdateSecretLevel"
            :trigger="['click']"
            :get-popup-container="triggerNode => triggerNode.parentNode"
          >
            <a class="select-link" @click.prevent>
              {{ secretLevel.length > 0 ? secretLevel[0].lookupName : '请选择文件密级' }}
              <down-outlined v-if="!levelLoading" />
              <loading-outlined v-if="levelLoading" />
              <!--              <a-icon v-if="!levelLoading" type="down"/>-->
              <!--              <a-icon v-if="levelLoading" type="loading"/>-->
            </a>
            <template #overlay>
              <a-menu @click="e => levelChange(e, file)">
                <a-menu-item v-for="level in secretLevelList" :key="level.lookupCode">
                  {{ level.lookupName }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div v-else class="ant-dropdown-link" href="#">
            <a-spin :spinning="levelLoading">
              {{ secretLevel.length > 0 ? secretLevel[0].lookupName : '' }}
            </a-spin>
          </div>
          <div v-if="showSize" :title="getFileSize(file.size)" class="file-size">
            {{ getFileSize(file.size) }}
          </div>
        </div>
        <!-- <div class="name-box upload-user-time">
      上传人：<span :title="file.data.createdByName">{{file.data.createdByName}}</span>&nbsp;&nbsp;&nbsp;
      上传时间：<span :title="file.data.creationDate ? moment(file.data.creationDate).format('YYYY-MM-DD HH:mm:ss') : ''">{{file.data.creationDate ? moment(file.data.creationDate).format('YYYY-MM-DD HH:mm:ss') : ''}}</span>
    </div> -->
        <div class="file_icon_box">
          <AvicPreview 
            :file="file" 
            class="close-icon" 
            :allow-preview="allowPreview && $settings.uploader.allowPreview" 
            :allow-encry="allowEncry"
            :flow-uploader="flowUploader" 
            :task-name="taskName" 
            :entry-id="entryId"/>
          <avic-icon
            v-if="file.complete && !downloadLoding && allowDownload"
            @click="downloadFile(file)"
            class="close-icon"
            svg="avic-download-fill"
          />
          <avic-icon v-if="downloadLoding" class="close-icon" svg="avic-loader-2-line" />
          <AvicDelete
            v-if="allowDelete"
            class="table-handle-button"
            title="您确定要删除选择的文件吗？"
            @click-confirm="remove(file)"
          >
            <avic-icon svg="avic-close-line" class="close-icon" />
          </AvicDelete>
        </div>
      </div>
    </div>
  </div>
  <!--<AvicProgress :progress="parseInt(file.progress)" :upload-failed="file.uploadFailed" />-->
</template>

<script lang="ts" setup>
import AvicDelete from './delBtn.vue';
import AvicPreview from './preview.vue';
import { fileTypeAll, createRegExp } from './util';
import {
  downloadFlowFile,
  deleteFile,
  fileEditInfo,
  validDownload
} from '@/api/avic/system/FileUploadApi';
import { download } from '@/utils/download-util'; // 引入文件下载
const { proxy } = getCurrentInstance();

const props = defineProps({
  file: {
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
  //是否可以修改密级
  allowUpdateSecretLevel: {
    type: Boolean,
    default: false
  },
  //是否允许删除附件
  allowDelete: {
    type: Boolean,
    default: false
  },
  //是否允许下载附件
  allowDownload: {
    type: Boolean,
    default: false
  },
  //是否允许预览
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
  //视图类型 line block
  viewType: {
    type: String,
    required: false, //校验
    default: 'line'
  },
  showSize: {
    type: Boolean,
    required: false,
    default: true
  }
});
const {
  file,
  formId,
  allowDelete,
  allowDownload,
  allowPreview,
  allowEncry,
  flowUploader,
  taskName,
  entryId,
  viewType,
  showSize
} = toRefs(props);
const data = reactive({
  secretLevel: [],
  fileUploadMessage: {
    success: '上传成功',
    error: '上传失败',
    active: '上传中',
    complete: '已经上传'
  },
  //下载文件
  downloadFileParam: {
    url: '/appsys/common/uploader/download/v1/',
    allowEncry: allowEncry,
    method: 'get'
  },
  downloadLoding: false,
  levelLoading: false,
  isPreview: true, //文件格式是否可以预览
  thumbnailImg: 'other' //缩略图
});
let { secretLevel, downloadFileParam, downloadLoding, levelLoading, isPreview, thumbnailImg } =
  toRefs(data);
const svgName = computed(() => {
  if (thumbnailImg.value) {
    return 'avic-upload-' + thumbnailImg.value;
  }
  return undefined;
});
watch(
  () => props.file,
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
onMounted(() => {
  let fileTypeList = fileTypeAll();
  let regexp = createRegExp(fileTypeList['image']);
  if (regexp != null && regexp.test(props.file.name)) {
    isPreview.value = true;
  }
});

function downloadFile(file) {
  if (flowUploader.value) {
    downloadFlow(file);
  } else {
    validDownloadFunc(file);
  }
}

//流程下载文件
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

// 6121 【轻量化】【密级关系】对于密级关系，前端缺少校验，后端的提示信息也不对。
//校验下载
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

//普通下载文件
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
const $emit = defineEmits(['remove', 'preview']);
// 删除文件
function remove(file) {
  if (file) {
    if (file.complete) {
      removeByHttp(file);
    } else {
      $emit('remove', file);
    }
  }
}

//删除文件
function removeByHttp(file) {
  if (file.id) {
    /* this.$sdk.http(
         this.deleteFileParam.url,
         file.id,
         this.deleteFileParam.method,
         false,
         true,
         false,
         true
       ) */
    deleteFile(file.id)
      .then(res => {
        if (res.success) {
          $emit('remove', file);
        }
      })
      .catch(() => {});
  }
}

//修改文件密级
function levelChange(e, file) {
  secretLevel.value = props.secretLevelList.filter(tim => tim.lookupCode == e.key);
  file.data = { secretLevel: secretLevel.value[0].lookupCode };
  if (file.complete && props.allowUpdateSecretLevel) {
    uploadfileEditInfo(secretLevel.value[0].lookupCode, file);
  }
}

//修改文件密级
function uploadfileEditInfo(level, file) {
  levelLoading.value = true;
  if (file.complete) {
    let parameter = {
      formId: formId.value,
      fileId: file.id,
      secretLevel: level
    };
    /* this.$sdk.http(
        this.fileEditInfoParam.url,
        parameter,
        this.fileEditInfoParam.method,
        false,
        true,
        false,
        true
      ) */
    fileEditInfo(parameter)
      .then(() => {
        levelLoading.value = false;
      })
      .catch(() => {
        levelLoading.value = false;
      });
  }
}

//转换文件大小
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
</script>
<style lang="less">
// 附件样式
.file-wrapper {
  display: inline-block;
}

.file-list {
  padding-left: 8px;

  :first-child.anticon {
    padding: 0;
    font-size: 12px;
  }

  .viewer {
    display: none;
  }
  .file-icon {
    margin-right: 4px;
    font-size: 1.4em;
    .svg-icon {
      vertical-align: -0.25em;
    }
  }
  .name-box {
    display: inline;
  }

  .name-box-drop {
    display: inline;
    margin-left: auto;

    i.anticon {
      font-size: 14px;
    }

    .select-link {
      display: inline-block;
      min-width: 96px;
      padding-left: 8px;
      color: red;
    }
  }

  .ant-spin-container {
    color: red;
  }

  .file-size {
    display: inline-block;
    padding: 0 8px;
    color: #4290f7;
  }

  .ant-dropdown-link {
    display: inline-flex;
  }

  .close-icon {
    padding: 0 4px;
    color: @text-color-less;
    font-size: 1.2em;
    vertical-align: middle;
    cursor: pointer;
  }

  .file_icon_box {
    display: inline;
  }
}
</style>
