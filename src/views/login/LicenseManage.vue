<template>
  <div class="">
    <a-row>
      <a-col>
        <a-button type="primary" title="上传" @click="onClick">
          <template #icon>
            <avic-icon svg="avic-upload-cloud-2-line" />
          </template>
          上传
        </a-button>
        <a-button
          title="删除授权文件"
          :disabled="disable"
          :style="{ marginLeft: '8px' }"
          @click="removeLicenseFile"
        >
          <template #icon>
            <avic-icon svg="avic-delete-bin-5-line" />
          </template>
          删除授权文件
        </a-button>
      </a-col>
    </a-row>
    <a-form layout="horizontal" class="form-excel-style">
      <a-row>
        <a-col :span="24">
          <a-form-item label="授权服务器地址">
            <li v-for="item in licenseServers" :key="item.serverUrl">
              <div v-if="item.serverUrl != ''">
                {{ item.serverUrl }}
                <a-icon
                  type="check-circle"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  style="margin-left: 5px"
                  v-if="item.status == '1'"
                />
                <a-icon
                  type="close-circle"
                  theme="twoTone"
                  two-tone-color="#eb2f96"
                  style="margin-left: 5px"
                  v-else
                />
              </div>
            </li>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="授权过期时间">
            {{ licenseLastDate }}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="授权在线用户数">
            {{ licenseOnline == '0' ? '无限制' : licenseOnline }}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <AvicModal
      :visible="visible"
      title="上传授权文件"
      width="650px"
      height="400px"
      :adjustSize="false"
      :centered="true"
      :footer="null"
      @cancel="cancel"
    >
      <a-alert
        message="注：平台授权文件仅支持【.res】格式"
        type="info"
        show-icon
        style="margin-bottom: 8px"
      />
      <AvicUploader
        key="1"
        element-id="0"
        form-type="edit"
        form-id="fileLicense"
        :drag-uploader="true"
        :multiple="false"
        :file-size-limit="40"
        ref="avicEditUploaderFile"
        :allow-encry="false"
        :allow-same-name="false"
        :allow-preview="false"
        :allow-download="false"
        :allow-delete="false"
        :chunk-enabled="true"
        :colspan="1"
        :auto-upload="true"
        :upload-url="uploadFileParam.url"
        :file-size="15"
        :file-num-limit="fileNumLimit"
        :upload-type="uploadType"
        :show-size="false"
        :use-form-info-param="false"
        table-name="MPM_PROJECT_INFO"
        @afterUpload="afterUpload"
      />
    </AvicModal>
  </div>
</template>

<script lang="ts" setup>
import { getLicenseSingle, deleteLicenseFile } from '@/api/user/login';
const { proxy } = getCurrentInstance();
defineProps({
  useFormInfoParam: {
    type: Boolean,
    required: false,
    default: true
  }
});
const licenseServers = ref([]);
const licenseLastDate = ref('');
const licenseOnline = ref('');
const visible = ref(false);
const fileNumLimit = ref(1);
const uploadType = ref('res');
const disable = ref(false);
// 上传授权文件
// 接口带访问前缀 By Cj 2022-3-28
// 附件组件内部已处理前缀，此处不用处理，否则会导致重复拼接 by cuijj 2022-06-30
const uploadFileParam = reactive({
  url: '/appsys/SysLicenseRest/uploadResFile/v1',
  method: 'POST'
});
const avicEditUploaderFile = ref();
onMounted(() => {
  getLicenseInfo();
  disable.value = licenseServers.value.length == 0 ? true : false;
});
function getLicenseInfo() {
  getLicenseSingle().then((res: any) => {
    if (res.success) {
      if (res.data) {
        licenseServers.value = res.data.licenseServers;
        licenseLastDate.value = res.data.licenseLastDate;
        licenseOnline.value = res.data.licenseOnline;
        const date1 = proxy.$dayjs(licenseLastDate.value);
        const date2 = proxy.$dayjs();
        const dateDiff = date1.diff(date2, 'year'); // 20214000000 默认单位是毫秒
        if (dateDiff > 5) {
          licenseLastDate.value = '无限制';
        }
        disable.value = false;
      } else {
        licenseServers.value = [];
        licenseLastDate.value = '';
        licenseOnline.value = '';
        disable.value = true;
      }
    } else {
      proxy.$message.error('获取授权文件失败!');
    }
  });
}
function onClick() {
  visible.value = true;
  getFileInfos();
}
function cancel() {
  visible.value = false;
  getLicenseInfo();
}

//获取已经上传的文件
function getFileInfos() {
  getLicenseSingle().then((res: any) => {
    if (res.success) {
      if (res.data) {
        avicEditUploaderFile.value.openList = true;
      } else {
        avicEditUploaderFile.value.openList = false;
      }
      avicEditUploaderFile.value.files = [];
      avicEditUploaderFile.value.files[0] = setfile(res.data);
      avicEditUploaderFile.value.filesBind = avicEditUploaderFile.value.files[0];
      avicEditUploaderFile.value.filesCount = 1;
      if (avicEditUploaderFile.value.filesBind.length > 0) {
        // filesChange事件添加标志位做区分
        // 原change事件更名为filesChange，用于组件与表单数据状态交互
        // 添加change事件，用于form表单数据校验
        avicEditUploaderFile.value.$emit('change', avicEditUploaderFile.value.filesBind);
        avicEditUploaderFile.value.$emit('filesChange', {
          file: avicEditUploaderFile.value.filesBind,
          flag: 'completeUpload'
        });
      }
    }
  });
}
// 设置文件
function setfile(fileContent) {
  let result = [];
  result.push({
    name: fileContent.licenseHostName + '应用端授权文件',
    id: fileContent.id,
    complete: true, // 是否已经上传
    active: false,
    success: true,
    timeout: 50000,
    speed: 0,
    progress: 0.0
  });
  return result;
}
function removeLicenseFile() {
  proxy.$confirm({
    title: '确认要删除授权文件吗?',
    content: '',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      deleteLicenseFile().then((res: any) => {
        if (res.success) {
          getLicenseInfo();
          let file = avicEditUploaderFile.value.files[0][0];
          avicEditUploaderFile.value.removeFile(file);
          disable.value = true;
        }
      });
    },
    onCancel() {}
  });
}
function afterUpload(_successFile, errorFiles) {
  if (errorFiles.length > 0) {
    let errorResult = errorFiles[errorFiles.length - 1].response;
    let message = errorResult.errorDesc;
    if (message) {
      proxy.$message.error(message);
    } else {
      proxy.$message.error('上传失败！');
    }
    let file = avicEditUploaderFile.value.files[0][0];
    avicEditUploaderFile.value.removeFile(file);
    return;
  } else {
    proxy.$message.success('上传成功');
  }
}
</script>

<style lang="less" scoped>
.form-excel-style {
  margin-top: 8px;
}
:deep(.ant-form-item) {
  .ant-form-item-label {
    flex: 0 0 140px;
  }
}
</style>
