<template>
  <a-modal
    title="附件"
    :visible="props.attachOpen"
    @cancel="handleCancel"
    width="40%"
  >
    <AvicUploader
      element-id="1"
      ref="uploadFile"
      label="上传附件"
      :form-id="form.id"
      :form-secret-level="form.secretLevel"
      :allow-add="true"
      :allow-download="true"
      :allow-preview="true"
      :allow-delete="true"
      :table-name="tableName"
      @afterUpload="afterUploadEvent"
    />
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="upload">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="handleCancel">返回</a-button>
    </template>
  </a-modal>
</template>
<script setup lang="ts">

const props = defineProps({
  attachOpen: {
    type: Boolean,
    default: false
  },
  attachForm: {
    type: Object,
    default: {}
  },
  tableName: {
    type: String,
    default: ''
  },
  saveForm: {
    type: Function,
    default: () => {}
  }
});

const emit = defineEmits(['reloadData', 'close']);
const loading = ref(false);
const uploadFile = ref(null); // 附件ref
const {proxy} = getCurrentInstance();

const form = reactive({
  id: '',
  secretLevel: ''
});

function handleCancel() {
  emit('close');
}

function upload() {
  loading.value = true;
  if (form.id) {
    // 主表数据已存在，直接保存
    uploadFile.value.upload(form.id); // 附件上传
  } else {
    // 主表数据不存在，先保存主表数据，再上传文件
    props.saveForm(formId => uploadFile.value.upload(formId));
  }
}

function afterUploadEvent(successFile, errorFile) {
  if (errorFile.length > 0) {
    // 有附件保存失败的处理
    errorCallback();
  } else {
    // 所有附件都保存成功的处理
    successCallback();
  }
}

/** 保存成功后的逻辑 */
function successCallback() {
  loading.value = false;
  proxy.$message.success('保存成功！');
  emit('reloadData');
  emit('close');
}

/** 数据保存失败的回调 */
function errorCallback() {
  loading.value = false;
  proxy.$message.error('保存失败！');
  emit('reloadData');
  emit('close');
}

watch(
  () => props.attachForm.id,
  newV => {
    if (newV) {
      form.id = newV;
      form.secretLevel = props.attachForm.secretLevel;
    }
  },
  {immediate: true}
);
</script>
