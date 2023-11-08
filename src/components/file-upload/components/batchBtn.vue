<template>
  <div class="button-box" style="margin-left: 8px">
    <a-button v-bind="$attrs" :loading="loading" @click="batchDownload">
      <template #icon><download-outlined /></template>
      <slot />
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { downloadFiles } from '@/utils/download-util'; // 引入文件下载
const { proxy } = getCurrentInstance();
const props = defineProps({
  fileName: {
    type: String,
    default: '批量下载' + dayjs().format('YYYY-MM-DD') + '.zip'
  },
  formId: {
    type: String,
    required: true
  },
  elementId: {
    type: String,
    required: true
  },
  //是否流程上传
  flowUploader: {
    type: Boolean,
    required: false, //校验
    default: false
  },
  //当前流程节点
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
  }
});
// let {fileName,formId,elementId,flowUploader,taskName,entryId} = props;

let batchDownloadParam = reactive({
    url: '/appsys/common/uploader/multidownload/v1',
    method: 'post'
  }),
  loading = ref(false);
const parameter = computed(() => {
  return {
    formId: props.formId,
    elementId: props.elementId,
    fileName: props.fileName
  };
});
// 附件批量下载
function batchDownload() {
  loading.value = true;
  // 流程详情页批量下载加权限判断修改
  let postParam = {};
  if (props.flowUploader) {
    postParam = {
      ...parameter.value,
      _taskName: props.taskName,
      _entryId: props.entryId
    };
  } else {
    postParam = { ...parameter.value };
  }

  downloadFiles({ url: batchDownloadParam.url, data: postParam, method: batchDownloadParam.method })
    .then(() => {
      proxy.$message.success('正在下载附件，请稍候！');
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}
</script>

<style lang="less" scoped>
.button-box {
  display: inline-block;
  margin: 0;
}
</style>
