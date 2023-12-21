<!----附件上传组件-->
<template>
  <a-spin :spinning="uploadLoading">
    <div class="avic-upload">
      <div class="upload-button">
        <file-upload
          ref="uploadRef"
          v-model="filesBind"
          class="avic-upload"
          :name="name"
          :input-id="formId + elementId"
          :post-action="uploaderAction"
          :extensions="uploadFileType || $settings.uploader.fileType"
          :accept="uploadAcceptType"
          :maximum="fileNumLimit"
          :multiple="multiple"
          :headers="uploadHeaders"
          :directory="false"
          :size="size"
          :thread="uploadMaxThread"
          :data="uploadData"
          :add-index="false"
          :disabled="directoryfile"
          :chunk-enabled="chunkEnabled"
          :chunk="chunk"
          :drop="draggable"
          :drop-directory="false"
          @input="selectFile"
          @input-filter="inputFilter"
          @input-file="inputFile"
        >
          <AddBtn v-if="fileAddable" type="primary">选择文件</AddBtn>
        </file-upload>

        <UploadBtn v-if="fileAddable && uploadButtonVisible" type="primary" @upload="handleUpload">
          上传
        </UploadBtn>
        <BatchBtn
          v-if="allowDownload && files[elementId].length && isShowBatchBtn(files[elementId])"
          :form-id="formId"
          :element-id="elementId"
          :flow-uploader="Boolean(entryId)"
          :task-name="activityname"
          :entry-id="entryId"
        >
          批量下载
        </BatchBtn>
        <a-alert v-if="fileAddable" :message="rulesInfo" type="info" show-icon />
        <div class="file-open" @click="onOpenList">
          <span class="file-text">
            已添加
            <span class="file-text-num">{{ files[elementId].length }}</span>
            附件
          </span>
          <avic-icon svg="avic-arrow-right-s-fill" style="font-size: 1.4em" v-show="!openList" />
          <avic-icon svg="avic-arrow-down-s-fill" style="font-size: 1.4em" v-show="openList" />
        </div>
        <!-- <div>

          <a-icon v-if="fileAddable" class="rules-info-icon" type="info-circle" theme="twoTone" />
          <span v-if="fileAddable" class="rules-info-text">{{ rulesInfo }}</span>
        </div> -->
      </div>

      <div
        v-show="draggable == true && $refs.upload && $refs.upload.dropActive"
        class="avic-uploader-drop-active"
      >
        <h3 class="drop-message">将文件拖拽到此上传</h3>
      </div>
      <a-spin :spinning="listLoading">
        <transition name="bounce" v-if="showType == 'span'">
          <AvicList
            v-show="openList"
            :file-list="files[elementId]"
            :secret-level-list="secretLevelList"
            :flow-uploader="Boolean(entryId)"
            :task-name="activityname"
            :entry-id="entryId"
            :form-id="formId"
            :allow-update-secret-level="fileSecretChangeable"
            :colspan="colspan"
            :allow-delete="fileDeletable"
            :allow-download="allowDownload"
            :allow-preview="allowPreview"
            :allow-encry="allowEncry"
            :view-type="viewType"
            :show-size="showSize"
            @remove="removeFile"
          />
        </transition>
        <transition v-if="showType == 'table'">
          <AvicTableVue
            :file-list="files[elementId]"
            :secret-level-list="secretLevelList"
            :flow-uploader="Boolean(entryId)"
            :task-name="activityname"
            :entry-id="entryId"
            :form-id="formId"
            :allow-update-secret-level="allowUpdateSecretLevel"
            :colspan="colspan"
            :allow-delete="allowDelete"
            :allow-download="allowDownload"
            :allow-preview="allowPreview"
            :allow-encry="allowEncry"
            :show-type="showType"
            :view-type="viewType"
            :show-size="showSize"
            @remove="removeFile"
          />
        </transition>
      </a-spin>
    </div>
  </a-spin>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/user';
import AddBtn from './components/addBtn.vue';
import AvicTableVue from './components/table.vue';
import UploadBtn from './components/uploadBtn.vue';
import BatchBtn from './components/batchBtn.vue';
import AvicList from './components/list.vue';
import FileUpload from 'vue-upload-component/src/FileUpload.vue';
import ChunkUploadHandler from './components/chunk/AvicChunk';
import { fileTypeAll, fileAcceptTypeAll, createRegExp } from './components/util';
// import { getAvicConfig } from '@utils/request';
import { getInfos } from '@/api/avic/system/FileUploadApi';
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils';
import { Form } from 'ant-design-vue';
const formItemContext = Form.useInjectFormItemContext();

const { proxy } = getCurrentInstance();

const props = defineProps({
  /** 流程实例对象 */
  bpmInstanceObject: { type: Object },
  /** 上传url */
  uploadUrl: { type: String, default: '/appsys/common/uploader/upload/v1' },
  /** 密级url */
  getInfosUrl: { type: String, default: '/appsys/common/uploader/getInfos/v1' },
  /** 表单id */
  formId: { type: String },
  /** table 名称 */
  tableName: { type: String },
  /** 是否多选 */
  multiple: { type: Boolean, default: true },
  /** 文件最多上传个数 */
  fileNumLimit: { type: Number, default: 10 },
  /** 文件大小 单位 mb 默认10mb */
  fileSizeLimit: { type: Number, default: 10 },
  /**
   * 上传的文件分类，多个分类用逗号分隔
   * all|text|code|word|excel|ppt|pdf|zip|image|video|audio|res
   */
  uploadType: { type: String },
  /** 可上传的文件类型(文件扩展名)集合，多个类型用逗号分隔 */
  fileType: { type: String },
  /** 可上传的文件类型(MIME类型)集合，多个类型用逗号分隔 */
  acceptType: { type: String },
  /** 一列显示多少个 */
  colspan: { type: Number, default: 1 },
  /** 是否可以修改密级 */
  allowUpdateSecretLevel: { type: Boolean, default: false },
  /** 上传最大线程 */
  uploadMaxThread: { type: Number, default: 5 },
  /** 是否显示上传按钮 */
  uploadButtonVisible: { type: Boolean, default: false },
  /** 是否允许下载附件 */
  allowDownload: { type: Boolean, default: false },
  /** 是否允许添加附件 */
  allowAdd: { type: Boolean, default: true },
  /** 是否允许删除附件 */
  allowDelete: { type: Boolean, default: false },
  /** 是否允许预览 */
  allowPreview: { type: Boolean, default: true },
  /** 是否允许文件名称重复 */
  allowSameName: { type: Boolean, default: false },
  /** 是否分片上传 */
  chunkEnabled: { type: Boolean, default: false },
  /** 分片上传每一片的大小(单位Mb) */
  minChunkSize: { type: Number, default: 1 },
  /** 上传类型,包括DataBase、Disk、FastDfs、HuaweiObs和第三方 */
  saveType: {
    type: String as PropType<'DataBase' | 'Disk' | 'FastDfs' | 'HuaweiObs'>
  },
  /** 密级通用代码 */
  secretLevel: { type: String, default: 'PLATFORM_FILE_SECRET_LEVEL' },
  /** 是否自动上传 */
  autoUpload: { type: Boolean, default: false },
  /** 是否加密 */
  allowEncry: { type: Boolean, default: true },
  /** 所有附件ID，根据这些ID加载附件 */
  attIds: { type: String },
  /** 文件分类，一般配置业务的通用代码 */
  category: { type: String },
  /** fastdfs存储附件节点的组名 */
  nodeId: { type: String },
  /** 未知类型 */
  markProcess: { type: String },
  /** 多附件的每个附件组件的唯一id */
  elementId: { type: String, default: '1' },
  /** 是否拖拽上传 */
  draggable: { type: Boolean, default: false },
  /** 表单类型 add  edit detail */
  formType: { type: String as PropType<'add' | 'edit' | 'detail'>, default: 'add' },
  /** 视图类型 line block */
  viewType: { type: String, default: 'block' },
  /** 表单密级 */
  formSecretLevel: { type: String },
  /** 是否显示文件大小 */
  showSize: { type: Boolean, default: true },
  /** 显示类型 span table */
  showType: { type: String, default: 'span' },
  /** 是否使用默认接口获取文件及密级 */
  useFormInfoParam: { type: Boolean, default: true },
  /** 是否设置附件默认密级 */
  setDefaultSecretLevel: { type: Boolean, default: true },
  /** 上传前是否校验密级 */
  validateSecretBeforeUpload: { type: Boolean, default: true },
  /** 超时时间 */
  uploadTimeout: { type: Number, default: 50000 },
  /** 超时提示信息 */
  timeoutMessage: { type: String, default: '上传超时' },
  /** 上传请求的前置处理 */
  beforeUpload: { type: Function }
});
const {
  uploadUrl,
  getInfosUrl,
  formId,
  tableName,
  multiple,
  fileNumLimit,
  fileSizeLimit,
  fileType,
  acceptType,
  colspan,
  allowUpdateSecretLevel,
  uploadMaxThread,
  uploadButtonVisible,
  allowDownload,
  allowAdd,
  allowDelete,
  allowPreview,
  allowSameName,
  chunkEnabled,
  minChunkSize,
  saveType,
  secretLevel,
  autoUpload,
  allowEncry,
  attIds,
  category,
  nodeId,
  markProcess,
  elementId,
  draggable,
  formType,
  viewType,
  formSecretLevel,
  showSize,
  useFormInfoParam,
  setDefaultSecretLevel,
  validateSecretBeforeUpload,
  uploadTimeout,
  timeoutMessage,
  bpmInstanceObject
} = toRefs(props);
let newUrl = '/api' + uploadUrl.value;
// if (getAvicConfig('network')?.baseURL && getAvicConfig('network')?.baseURL == '/') {
//   newUrl = this.uploadUrl;
// } else {
//   newUrl = (getAvicConfig('network')?.baseURL || '') + this.uploadUrl;
// }

// 分片上传参数
const chunkBody = reactive({
  addTime: new Date().getTime(),
  guid: proxy.$uuid(),
  formId: '',
  tableName: tableName.value,
  saveType: saveType.value || proxy.$settings.uploader.saveType,
  allowEncry: allowEncry.value,
  chunkSize: 0
  //elementId: this.elementId,
});
const files = reactive({ [elementId.value]: [] }); //文件集合
const filesBind = ref([]);
// 获取文件或者密级
const formInfoParam = reactive({
  url: getInfosUrl.value,
  parameter: {
    formId: '',
    elementId: elementId.value,
    attIds: attIds.value,
    fileCategory: '',
    secretLevel: secretLevel.value
  },
  method: 'post'
});
const data = reactive({
  timeoutAction: null, // 超时逻辑
  secretLevelList: [], //文件密级
  secretLevelListNoFormSecret: [], //未根据表单密级过滤的文件密级
  filesBind: [],
  directoryfile: false, //附件是否 directory
  name: 'file', //上传时候的文件名称
  uploaderAction: newUrl, // 上传文件地址
  uploadHeaders: getRequestHeader(),
  uploadData: {
    //文件上传的参数
    addTime: new Date().getTime(),
    guid: proxy.$uuid(),
    formId: '',
    tableName: tableName.value,
    saveType: saveType.value || proxy.$settings.uploader.saveType,
    allowEncry: allowEncry.value,
    category: category.value,
    nodeId: nodeId.value,
    markProcess: markProcess.value
    //elementId: this.elementId,
  },
  size: 0, //最大文件大小
  uploadFileType: '', //上传文件类型
  uploadAcceptType: '', //选中框限制类型
  regexp: null, // 正则验证对象
  formDataId: '', //form表单数据

  //分片上传参数
  chunk: {
    handler: ChunkUploadHandler, //这句很重要覆盖插件的分片上传代码
    headers: getRequestHeader(),
    action: newUrl,
    uploadBody: chunkBody,
    startBody: chunkBody,
    finishBody: chunkBody,
    minSize: 0,
    maxActive: 1000,
    maxRetries: 3 // 最大重试次数
  },
  uploadLoading: false, //上传按钮状态
  completeFiles: [], //所有上传文件的集合
  listLoading: false, //加载状态
  openList: true, //展开附件
  toUpload: false, // 手动提交上传按钮是否显示
  filesCount: 0 //上传的文件个数
});
let {
  timeoutAction,
  secretLevelList,
  secretLevelListNoFormSecret,
  directoryfile,
  name,
  uploaderAction,
  uploadHeaders,
  uploadData,
  size,
  uploadFileType,
  uploadAcceptType,
  regexp,
  formDataId,
  chunk,
  uploadLoading,
  completeFiles,
  listLoading,
  toUpload,
  filesCount
} = toRefs(data);
const openList = ref(true);
const rulesInfo = computed(() => {
  return `可上传${fileNumLimit.value}个大小不超过${fileSizeLimit.value}MB的${
    uploadFileType.value || '任意'
  }类型文件`;
});
watch(
  () => props.fileSizeLimit,
  newV => {
    if (newV > 0) {
      size.value = 1024 * 1024 * newV;
    }
  },
  { immediate: true }
);

// 计算分片上传单个大小
watch(
  () => props.minChunkSize,
  newV => {
    if (newV > 0) {
      chunk.minSize = 1024 * 1024 * newV;
      chunkBody.chunkSize = 1024 * 1024 * newV;
    }
  },
  { immediate: true }
);
// 计算分片上传单个大小
watch(
  () => props.formId,
  newV => {
    if (formDataId.value != newV) {
      formDataId.value = newV;
      formInfoParam.parameter.formId = newV;
      uploadData.formId = newV;
      chunkBody.formId = newV;
      chunk.uploadBody = chunkBody.value;
      chunk.startBody = chunkBody.value;
      chunk.finishBody = chunkBody.value;
      //获取上传的文件或者密级
      if (formType.value != 'add') {
        getfileInfos();
      }
    }
  },
  { immediate: true }
);
// 上传的文件类型
watch(
  () => props.uploadType,
  newV => {
    if (newV && newV != 'all') {
      let types = newV.split(',');
      let fileType = [];
      let acceptType = [];
      types.map(tim => {
        if (tim) {
          let fileTypeList = fileTypeAll();
          fileType = fileType.concat(fileTypeList[tim]);
        }
      });
      let fileAcceptTypeList = fileAcceptTypeAll();
      if (types.length == 1 && fileAcceptTypeList[types[0]]) {
        acceptType.push(fileAcceptTypeList[types[0]]);
      }
      if (fileType && fileType.length > 0) {
        regexp.value = createRegExp(fileType);
        uploadFileType.value = fileType.join(',');
      }
      if (acceptType && acceptType.length > 0) {
        uploadAcceptType.value = acceptType.join(',');
      }
    }
  },
  { immediate: true }
);
// 上传的文件类型
watch(
  filesBind,
  newV => {
    files[elementId.value] = newV;
  },
  { immediate: true, deep: true }
);
// 根据表单密级更新文档密级
watch(
  () => props.formSecretLevel,
  newV => {
    if (newV) {
      secretLevelList.value = secretLevelListNoFormSecret.value.filter(
        tim => tim.lookupCode <= newV
      );
    }
  },
  { immediate: true }
);
watch(
  files,
  (newV, oldV) => {
    if (
      !(
        JSON.stringify(newV[elementId.value]) == '[]' &&
        JSON.stringify(newV[elementId.value]) == JSON.stringify(oldV[elementId.value])
      )
    ) {
      $emit('update:value', newV[elementId.value]);
      // 触发表单字段的change校验
      formItemContext?.onFieldChange && formItemContext.onFieldChange();
    }
  },
  { immediate: false, deep: true }
);
const uploadRef = ref();
onMounted(() => {
  //计算文件大小
  if (fileSizeLimit.value > 0) {
    size.value = 1024 * 1024 * fileSizeLimit.value;
  }
  //计算文件大小
  if (minChunkSize.value > 0) {
    chunk.minSize = 1024 * 1024 * minChunkSize.value;
    chunkBody.chunkSize = 1024 * 1024 * minChunkSize.value;
  }
  //文件类型
  if (fileType.value) {
    regexp.value = createRegExp(fileType.value.split(','));
    uploadFileType.value = fileType.value;
  }
  //浏览器选择文件类型
  if (acceptType.value) {
    uploadAcceptType.value = acceptType.value;
  }
  //获取上传的文件或者密级
  if (uploadRef && !uploadRef.value.active && formType.value == 'add') {
    getfileInfos();
  }
  if (elementId.value) {
    files[elementId.value] = [];
  }
});

/**
 * input 附件改变事件
 * change 附件改变事件
 * filesChange 附件变化事件, 区分附件变化时机
 *
 */
const $emit = defineEmits([
  'input',
  'change',
  'filesChange',
  'fileSecretLevelCheckError',
  'afterUpload',
  'update:value'
]);

function getRequestHeader(headers = {}) {
  const userStore = useUserStore();
  const token = userStore.token;
  if (token) {
    headers['X-Access-Token'] = token;
  }
  if (proxy.$settings.appId) {
    headers['X-App-Id'] = proxy.$settings.appId;
  }
  return headers;
}

// 【3810】是否可显示批量下载
function isShowBatchBtn(files) {
  let successFileNum = 0;
  files.map(item => {
    if (item.success) {
      successFileNum++;
    }
  });
  if (successFileNum > 0) {
    return true;
  } else {
    return false;
  }
}

function onOpenList() {
  // this.openList = !this.openList; //隐藏已上传文件列表
  let filesArr = files[elementId.value].length;
  if (filesArr > 0) {
    openList.value = !openList.value;
  } else {
    openList.value = false;
  }
}
/** 删除所有附件 */
function removeAll(elementId) {
  // 如不可删除，则不做处理
  if (!fileDeletable.value) {
    return;
  }
  const elemetFiles = files[elementId];
  if (elemetFiles.length > 0) {
    elemetFiles.forEach(file => {
      removeFile(file);
    });
  }
}
// 删除文件
function removeFile(file) {
  if (file) {
    uploadRef.value.remove(file);
    filesCount.value = filesCount.value - 1;
    if (file.id) {
      files[elementId.value] = files[elementId.value].filter(tim => tim.id != file.id);
    }
    filesBind.value = files[elementId.value];
  }
  if (!file.success) {
    uploadLoading.value = false;
    uploadRef.value.active = false;
    file.active = false;
  }
  // filesChange事件添加标志位做区分 by cuijj 2020-05-22
  // 原change事件更名为filesChange，用于组件与表单数据状态交互
  // 添加change事件，用于form表单数据校验
  // $emit('input', filesBind.value);
  // $emit('change', filesBind.value);
  // $emit('filesChange', {
  //   file: filesBind.value,
  //   flag: 'delete'
  // });
}

//设置文件
function setfile(list) {
  let result = [];
  list.map(tim => {
    result.push({
      size: tim.size,
      data: {
        secretLevel: tim.secret,
        secretName: tim.secretName,
        createdByName: tim.createdByName ?? '',
        creationDate: tim.creationDate ?? ''
      },
      secretName: tim.secretName,
      name: tim.name,
      id: tim.fileId,
      complete: true, // 是否已经上传
      active: false,
      success: true,
      timeout: uploadTimeout.value,
      speed: 0,
      progress: 0.0,
      editable: false,
      operationType_: 'insert'
    });
  });
  return result;
}

/** 上传按钮事件(主动上传) */
function handleUpload() {
  let uplaodFile = files[elementId.value].filter(tim => !tim.complete);
  if (uplaodFile.length) {
    upload(formId);
  } else {
    proxy.$message.warning('请选择文件后上传！');
  }
}

//上传触发上传事件
async function upload(formId) {
  // 上传前校验密级
  if (validateSecretBeforeUpload.value) {
    let secretLevelCheckErrorFile = files[elementId.value]?.find(item => {
      return typeof item.data.secretLevel === 'undefined' || item.data.secretLevel == '';
    });
    if (secretLevelCheckErrorFile) {
      proxy.$message.error('请选择附件密级！');
      $emit('fileSecretLevelCheckError', secretLevelCheckErrorFile);
      return;
    }
  }
  //上传前置处理
  if (props.beforeUpload) {
    const result = await props.beforeUpload(filesBind.value);
    if (!result) {
      return;
    }
  }
  if (formId) {
    setUploadData(formId);
  } else if (formDataId.value) {
    setUploadData(formDataId.value);
  } else {
    proxy.$message.error('formId不存在');
    return null;
  }
  //上传前置事件
  if (uploadRef && files[elementId.value].length > 0) {
    let uplaodFile = files[elementId.value].filter(tim => !tim.complete);
    // 重新上传参数设置 Start by cuijj 2020-05-11
    uplaodFile.map(file => {
      uploadRef.value.update(file, { active: true, error: '', progress: '0.00' });
    });
    // 重新上传参数设置 End by cuijj 2020-05-11
    completeFiles.value = []; // 每次上传开始，清空上传文件集合 by cuijj 2020-05-11
    if (uplaodFile.length > 0) {
      uploadRef.value.active = true;
      toUpload.value = false;
      timeoutAction.value = setTimeout(() => {
        uploadLoading.value = false;
        proxy.$message.error(timeoutMessage.value);
        uploadLoading.value = false;
      }, uploadTimeout.value);
    } else {
      //上传后置事件
      $emit('afterUpload', [], []);
    }
  } else {
    //上传后置事件
    $emit('afterUpload', [], []);
  }
}

//设置上传文件的参数
function setUploadData(formId) {
  files[elementId.value].map(tim => {
    if (!tim.complete) {
      tim.data.size = tim.size;
      tim.data.addTime = new Date().getTime();
      tim.data.guid = new Date().getTime();
      tim.data.formId = formId;
      tim.data.tableName = tableName.value;
      tim.data.saveType = saveType.value || proxy.$settings.uploader.saveType;
      tim.data.allowEncry = allowEncry.value;
      tim.data.fileName = encodeURIComponent(tim.name);
      tim.data.elementId = elementId.value;
      tim.data.category = category.value;
      tim.data.nodeId = nodeId.value;
      tim.data.markProcess = markProcess.value;
      // tim.name = encodeURIComponent(tim.name);
    }
  });
}

//验证文件密级是否大于传入密级
function validateUploaderFileSecret(validateSecretLevel) {
  let errorMessage = '';
  if (validateSecretLevel) {
    for (let i = 0; i < filesBind.value.length; i++) {
      let file = filesBind.value[i];
      if (Number(file.data.secretLevel) > Number(validateSecretLevel)) {
        if (file.complete) {
          errorMessage = '已上传的第' + (i + 1) + '个附件密级高于文档密级！';
          proxy.$message.error(errorMessage);
          break;
        } else {
          errorMessage = '待上传的第' + (i + 1) + '个附件密级高于文档密级！';
          proxy.$message.error(errorMessage);
          break;
        }
      }
    }
  }
  return errorMessage;
}

//获取文件密级或者已经上传的文件
function getfileInfos() {
  if (useFormInfoParam.value) {
    if (formType.value != 'add') {
      formInfoParam.parameter.formId = formDataId.value;
    }
    listLoading.value = true;
    getInfos(formInfoParam.url, formInfoParam.parameter)
      .then(res => {
        if (res.success) {
          if (res.data.fileList.length == 0) {
            openList.value = false;
          } else {
            openList.value = true;
          }
          files[elementId.value] = setfile(res.data.fileList);
          filesBind.value = files[elementId.value];
          filesCount.value = res.data.fileList.length;
          if (filesBind.value.length > 0) {
            // filesChange事件添加标志位做区分 by cuijj 2020-05-22
            // 原change事件更名为filesChange，用于组件与表单数据状态交互
            // 添加change事件，用于form表单数据校验
            $emit('change', filesBind.value);
            $emit('input', filesBind.value);
            $emit('filesChange', {
              file: filesBind.value,
              flag: 'completeUpload'
            });
          }
          // secretLevelList = res.data.secretLevelList;
          secretLevelListNoFormSecret.value = res.data.secretLevelList;
          // 【7466】附件关联密级后，附件不受密级控件控制
          if (formSecretLevel.value) {
            secretLevelList.value = secretLevelListNoFormSecret.value.filter(
              tim => tim.lookupCode <= formSecretLevel.value
            );
          } else {
            secretLevelList.value = res.data.secretLevelList;
          }
        }
        listLoading.value = false;
      })
      .catch(() => {
        listLoading.value = false;
      });
  }
}

//上传后置事件
function afterUpdate() {
  if (uploadRef.value.uploaded == true) {
    let suucessFiles = [];
    let errorFiles = [];
    completeFiles.value.map(tim => {
      if (tim.response && (tim.response.retCode == '200' || tim.response.success == true)) {
        suucessFiles.push(tim);
      } else {
        errorFiles.push(tim);
      }
    });
    /*if (errorFiles.length > 0) {
        this.$message.error(`共有${errorFiles.length}文件上传失败`);
      }*/
    //上传后置事件
    $emit('afterUpload', suucessFiles, errorFiles);
    uploadLoading.value = false; // “选择文件”按钮loading状态恢复 by cuijj 2020-05-09
  }
}

//选择文件时候掉用方法
function selectFile() {
  //验证最多上传个数
  if (
    uploadRef.value.active != true &&
    filesBind.value &&
    (filesBind.value.length > fileNumLimit.value || filesCount.value > fileNumLimit.value)
  ) {
    filesCount.value = fileNumLimit.value; //计数器设置为文件实际总数
    proxy.$message.warning(`上传文件最多不得超过${fileNumLimit.value}个`);
  }
  if (!openList.value) {
    openList.value = true;
  }
}

//选择文件过滤方法
function inputFilter(newFile, oldFile, prevent) {
  if (newFile && !oldFile) {
    // 验证上传文件类型
    if (regexp.value != null && !regexp.value.test(newFile.name)) {
      proxy.$message.error('您选中的文件格式不符合要求！');
      return prevent();
    }
    // 验证最大上传文件
    if (newFile.size > size.value) {
      proxy.$message.error(`文件大小不得超过${fileSizeLimit.value}Mb`);
      return prevent();
    }
    // 验证最多上传个数
    if (filesBind.value && filesBind.value.length >= fileNumLimit.value) {
      proxy.$message.destroy();
      filesCount.value = fileNumLimit.value;
      proxy.$message.warning(`上传文件最多不得超过${fileNumLimit.value}个`);
      return prevent();
    }
    // 验证文件名是否重复
    if (!allowSameName.value) {
      let allowSameFile = filesBind.value.filter(
        tim => tim.name.toLowerCase() == newFile.name.toLowerCase()
      );
      if (allowSameFile.length > 0) {
        proxy.$message.warning(`${newFile.name}文件已存在`);
        return prevent();
      }
    }
    //记录总共选择了几个文件
    filesCount.value = filesCount.value + 1;
    //设置文件大小
    newFile.data.size = newFile.size;
    //设置文件默认密级
    if (secretLevelList.value.length > 0 && setDefaultSecretLevel.value) {
      newFile.data.secretLevel = secretLevelList.value[0].lookupCode;
    }
    if (formDataId.value) {
      toUpload.value = true;
    }
    // change事件添加标志位做区分 by cuijj 2020-05-22
    // 原change事件更名为filesChange，用于组件与表单数据状态交互
    // 添加change事件，用于form表单数据校验
    // filesBind.pus
    $emit('input', filesBind.value);
    $emit('change', filesBind.value);
    $emit('filesChange', {
      file: newFile,
      flag: 'inputFilter'
    });
  }
}

//文件上传中的过滤方法
function inputFile(newFile, oldFile) {
  if (newFile && oldFile) {
    //开始上传
    if (newFile.active !== oldFile.active) {
      //this.directoryfile = true;
      uploadLoading.value = true;
    }
    // 上传进度
    if (newFile.progress !== oldFile.progress) {
      uploadLoading.value = true; // 上传过程中，不可选择文件 by cuijj 2020-05-11
      // 上传失败时，进度不可显示完成误导用户 by cuijj 2020-05-11
      if (newFile.error !== oldFile.error) {
        newFile.progress =
          newFile.progress == '100' || newFile.progress == '100.00' ? '99' : newFile.progress;
      }
    }
    // 上传错误
    if (newFile.error !== oldFile.error) {
      completeFiles.value.push(newFile);
      // newFile.progress = 0; // 进度要保留 by cuijj 2020-05-09
      // newFile.complete = true; // 是否已经上传 上传失败设为false，以便重新上传 by cuijj 2020-05-09
      afterUpdate();
    }
    // 上传成功
    if (newFile.success !== oldFile.success) {
      completeFiles.value.push(newFile);
      if (
        newFile.response &&
        (newFile.response.retCode == '200' || newFile.response.success == true)
      ) {
        if (newFile.response.responseBody) {
          newFile.fileId = newFile.response.responseBody;
          newFile.id = newFile.response.responseBody;
          newFile.file = null;
        } else {
          newFile.fileId = newFile.response.data;
          newFile.id = newFile.response.data;
          newFile.file = null;
        }

        newFile.complete = true; // 是否已经上传
      } else {
        newFile.error = true;
      }
      clearTimeout(timeoutAction.value);
      timeoutAction.value = null;
      afterUpdate();
      // newFile.progress = 0; // 进度要保留 by cuijj 2020-05-09
    }
  }

  // 自动上传
  if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
    if (autoUpload.value && !uploadRef.value.active) {
      uploadRef.value.active = true;
    }
  }
}

/** 校验流程附件是否可编辑 */
function flowFileEditable() {
  // 业务需求：自定义不可编辑
  // if (this.customStatus && this.customStatus == 'nonEditable') {
  //   return false;
  // }
  if (elementId.value != null) {
    return bpmUtils.flowFileEditable(bpmInstanceObject.value, elementId.value); // ---需要传参bpmInstanceObject
  } else {
    return true;
  }
}
function flowFileSecretChangeable() {
  if (elementId.value != null) {
    return bpmUtils.flowFileSecretChangeable(bpmInstanceObject.value, elementId.value); // -----需要传参bpmInstanceObject
  } else {
    return true;
  }
}
const entryId = computed(() => bpmInstanceObject.value?.bpmModel?.entryId);
const activityname = computed(() => bpmInstanceObject.value?.bpmModel?.activityname);
const fileAddable = computed(() => (bpmInstanceObject.value ? flowFileEditable() : allowAdd.value));
const fileDeletable = computed(() =>
  bpmInstanceObject.value ? flowFileEditable() : allowDelete.value
);
const fileSecretChangeable = computed(() =>
  bpmInstanceObject.value ? flowFileSecretChangeable() : allowUpdateSecretLevel.value
);
defineExpose({
  files,
  filesBind,
  filesCount,
  // 校验附件密级
  validateUploaderFileSecret,
  // 上传附件
  upload,
  //删除附件
  removeFile,
  // 删除所有附件
  removeAll
});
</script>
<style lang="less" scoped>
:deep(.avic-upload) {
  .file-uploads.file-uploads-html4 input,
  .file-uploads.file-uploads-html5 label {
    cursor: pointer;
  }

  .upload-button {
    display: flex;
    align-items: center;
    .ant-alert-info {
      margin: 0 8px;
    }
  }

  .file-open {
    margin-left: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    .file-text-num {
      padding: 0 4px;
      color: @info-color;
      font-weight: 600;
      font-size: 16px;
    }
    .svg-icon {
      vertical-align: -0.175em;
    }
  }

  .ant-alert-info {
    padding: 4px 12px 4px 8px;
    // background-color: transparent;
    // border: 0;
  }

  .ant-alert-icon {
    top: 10px;
    left: 8px;
  }
}
</style>
