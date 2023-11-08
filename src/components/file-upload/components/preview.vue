<!---
    文件预览
-->
<template>
  <div class="avic-upload-preview">
    <avic-icon
      v-if="allowPreview && fileType && showType == 'span'"
      class="close-icon"
      @click="previewOpen()"
      :svg="loading ? 'avic-loader-2-line' : 'avic-eye-line'"
    />
    <a-button
      v-if="allowPreview && fileType && showType == 'table'"
      @click="previewOpen()"
      type="link"
    >
      预览
    </a-button>
    <!--图片预览-->
    <img-viewer ref="viewer" :options="{ navbar: false, title: false, url: 'data-source' }" />
  </div>
</template>

<script lang="ts" setup>
import ImgViewer from './preview/imgViewer.vue';
import { fileTypeAll, getFileExtension } from './util.js';
import { validPreview } from '@/api/avic/system/FileUploadApi.js';
import { download } from '@/utils/download-util';

const { proxy } = getCurrentInstance();

const props = defineProps({
  //返回数据
  file: {
    type: Object,
    required: true, //校验
    default: null
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
  // 展示类型
  showType: {
    type: String,
    default: 'span'
  }
});

const data = reactive({
  downloadFileParam: {
    url: '/appsys/common/uploader/downloadForPreview/v1/',
    method: 'get'
  },
  //预览验证
  previewVisible: false,
  previewImgVisible: false,
  fileType: '',
  progress: 0,
  error: '',
  openPdf: '../js/pdf/web/viewer.html?file=',
  name: '图片',
  flowData: null,
  isHasDownload: true,
  imageFile: { id: '' },

  loading: false //预览图标的loading 效果控制参数
});

let { fileType, loading } = toRefs(data);
const viewer = ref();

watch(
  () => props.file,
  newV => {
    if (newV) {
      getFileType(newV);
    }
  },
  { immediate: true }
);

//预览图片
function previewOpen() {
  let parameter = {
    fileId: props.file.id,
    _taskName: props.taskName,
    _entryId: props.entryId
  };
  validPreview(parameter)
    .then(res => {
      if (!res.data.success) {
        proxy.$message.error('没有权限预览附件！');
      } else {
        data.loading = true;
        if (data.fileType == 'image') {
          previewAction();
        } else {
          //直接弹出调用预览接口
          window.open(
            proxy.$settings.uploader.previewDomain +
              '/api/oss/preview/online/v1?previewId=' +
              res.data.previewId
          );
        }
      }
      data.loading = false;
    })
    .catch(() => {
      data.loading = false;
    });
}

function getFileType(file) {
  if (file.name && file && file.id && file.complete) {
    let extension = getFileExtension(file.name);

    let fileType = '';
    if (extension.length > 0) {
      fileType = extension[1];
    }

    // 大写转小写 统一校验格式
    fileType = fileType.toLowerCase();

    let fileTypeList = fileTypeAll();
    if (fileTypeList['image'].filter(tim => tim == fileType).length > 0) {
      data.fileType = 'image';
    } else if (!(fileTypeList['zip'].filter(tim => tim == fileType).length > 0)) {
      data.fileType = fileType;
    }
  }
}
//预览请求
function previewAction() {
  //预览图片时蒙层后面的页面禁止滚动
  //document.body.style = `overflow: hidden;`;
  if (props.file) {
    if (props.file.id && props.file.complete && !props.file.file) {
      let url = '';
      if (props.entryId.length > 0 && props.taskName != null && props.taskName != undefined) {
        url =
          data.downloadFileParam.url +
          props.file.id +
          '/' +
          props.allowEncry +
          '/' +
          props.entryId +
          '/' +
          props.taskName;
      } else {
        url = data.downloadFileParam.url + props.file.id + '/' + props.allowEncry;
      }
      download({
        url: url,
        data: null,
        method: 'get',
        listenerProgress: progress => {
          if (progress >= 100) {
            data.progress = 0;
          } else {
            data.progress = progress;
          }
        },
        fileName: '',
        isdownload: false,
        messageTime: 4,
        callBack: preVisible => {
          data.previewImgVisible = preVisible;
        }
      })
        .then(res => {
          if (res) {
            data.flowData = res;
            let filereader = new FileReader();
            filereader.onloadend = function (event) {
              let image = event.target.result
                .toString()
                .replace('data:application/json;', 'data:img/jpg;');
              // props.file.file = image;
              viewer.value.show([
                {
                  thumbnail: image,
                  source: image
                }
              ]);
            };
            filereader.readAsDataURL(res as Blob);

            data.loading = false;
          }
        })
        .catch(() => {
          data.loading = false;
          // this.$message.error(`预览${this.name}失败`);
        });
    } else if (props.file.file) {
      data.flowData = props.file.file;
      viewer.value.show([
        {
          thumbnail: props.file.file,
          source: props.file.file
        }
      ]);
      data.loading = false;
    }
  }
}
</script>
<style lang="less">
.avic-upload-preview {
  display: inline-block;
}

.avic-preview-progress {
  position: relative;
  top: 50%;
}
</style>
