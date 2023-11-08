<!--
  文件列表
-->
<template>
  <div v-show="fileList.length" class="uploader-file-list">
    <div class="file-box" v-for="(file, index) in fileList" :key="index">
      <AvicFile
        :task-name="taskName"
        :flow-uploader="flowUploader"
        :key="file.id"
        :entry-id="entryId"
        :allow-encry="allowEncry"
        :allow-preview="allowPreview"
        :allow-delete="allowDelete"
        :allow-download="allowDownload"
        :allow-update-secret-level="allowUpdateSecretLevel"
        :form-id="formId"
        :view-type="viewType"
        :show-size="showSize"
        v-bind="$attrs"
        :file="file"
        @preview="preview"
        @remove="removeFile"
      />
    </div>
    <!-- <AvicPreview v-model="previewFile" :allow-encry="allowEncry" /> -->
  </div>
</template>

<script lang="ts" setup>
import AvicFile from './file.vue';
const props = defineProps({
  fileList: {
    type: Array,
    required: true, //校验
    default: null
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
  //一列显示多少个
  colspan: {
    type: Number,
    default: 1
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
  // 是否显示文件大小
  showSize: {
    type: Boolean,
    required: false,
    default: true
  }
});
let span = ref(24),
  previewFile = ref();
watch(
  () => props.colspan,
  newV => {
    if (newV) {
      if (newV > 3) {
        span.value = 24 / 3;
      } else if (newV < 1) {
        span.value = 24 / 1;
      } else {
        span.value = 24 / newV;
      }
    }
  },
  { immediate: true }
);
const $emit = defineEmits(['remove']);
//删除文件
function removeFile(file) {
  $emit('remove', file);
}
//预览图片
function preview(file) {
  previewFile.value = file;
}
</script>

<style lang="less">
.file-list {
  margin-top: 4px;
  padding: 4px;
  line-height: 22px;
  background: #f8f9fa;
  border-radius: 4px;
}

.file-box {
  display: inline-block;
  margin-right: 12px;
}
</style>
