import type { Tpm6sApplyDto } from '@/api/avic/mms/tpm/Tpm6sApplyApi'; // 引入模块DTO
import { getTpm6sApply, saveFormAndStartProcess, saveTpm6sApply } from '@/api/avic/mms/tpm/Tpm6sApplyApi'; // 引入模块API
import {
  closeFlowLoading,
  default as flowUtils,
  getFieldAuth,
  getFieldDisabled,
  getFieldRequired,
  getFieldVisible,
  openFlowDetail,
  startFlowByFormCode
} from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import dayjs from 'dayjs';
import { createEditor } from '@wangeditor/editor'; // 引入富文本依赖
import { useRichText } from '@/utils/hooks/useRichText'; // 引入富文本相关配置及方法
export const emits = ['reloadData', 'close'];
export function useTpm6sApplyForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<Tpm6sApplyDto>({});
  const formRef = ref(null);
  const formCode = 'Tpm6sApply';
  const openType = ref('add'); // 流程表单的打开方式，add:流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); //提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
  const rules: Record<string, Rule[]> = {
    billNo: [
      { required: true, message: '立项编号不能为空', trigger: 'change' }
    ],
    editDeptName: [
      { required: true, message: '立项单位不能为空', trigger: 'change' }
    ],
    problemFinderName: [
      { required: true, message: '问题发现人不能为空', trigger: 'change' }
    ],
    problemDescription:[
      { required: true, message: '问题描述不能为空', trigger: 'blur' }
    ],
    projectCategory: [
      { required: true, message: '问题立项不能为空', trigger: 'change' }
    ],
    projectName: [
      { required: true, message: '项目立项名称不能为空', trigger: 'change' }
    ],
    applyDate: [
      { required: true, message: '提出时间不能为空', trigger: 'change' }
    ],
    planFinishDate: [
      { required: true, message: '计划完成时间不能为空', trigger: 'change' }
    ],
    location: [
      { required: true, message: '地点/位置不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    chargeUserName: [
      { required: true, message: '项目组长不能为空', trigger: 'change' }
    ],
    teamUserName: [
      { required: true, message: '团队成员不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout3; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const autoCode = ref(null); // 自动编码ref
  const projectCategoryList = ref([]); // 问题立项通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const editorRef = shallowRef(null); // 编辑器实例，必须用 shallowRef
  const lookupParams = [
    { fieldName: 'projectCategory', lookUpType: 'TPM_6S_PROBLEM_APPLY' }
  ];
  const authJson = ref(null);
  const {
    toolbarConfig,
    editorConfig,
    onCreated,
    dealRichText,
    convertImageSrc
  } = useRichText(
    editorRef,
    'tpm6sApplyProblemDescription',
    'tpm6sApply'
  );
  if (props.params) {
    bpmParams.value = props.params;
  } else {
    if (proxy.$route) {
      bpmParams.value = proxy.$route.query;
    }
  }
  if (bpmParams) {
    // 加载流程数据
    form.value.id = bpmParams.value.id;
    openType.value = bpmParams.value.id ? 'edit' : 'add';
  }

  onMounted(() => {
    // 获取通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId || form.value.id) {
      // 编辑、详情页面加载数据
      getFormData(props.formId || form.value.id, props.infoStatus);
    } else {
      // 添加表单的初始值
      initForm();
      form.value.editDeptId = proxy.$getLoginUser().entityDeptId;
      form.value.editDeptName = proxy.$getLoginUser().entityDeptName;
      form.value.editDeptNameAlias = proxy.$getLoginUser().entityDeptName;
      form.value.editUserId = proxy.$getLoginUser().id;
      form.value.editUserName = proxy.$getLoginUser().name;
      form.value.problemFinderId = proxy.$getLoginUser().id;
      form.value.problemFinderName = proxy.$getLoginUser().name;
      form.value.applyDate = dayjs(new Date());
    }
  });

  /** 获取通用代码 */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
    projectCategoryList.value = result.projectCategory;
    });
  }
  /** 获取当前用户对应的文档密级 */
  function getUserFileSecretList() {
    proxy.$getUserFileSecretLevelList(result => {
      secretLevelList.value = result;
    });
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id, infoStatus) {
    if (!id) {
      return;
    }
    loading.value = true;
    getTpm6sApply(id)
      .then(async res => {
        if (res.success) {
          if (res.data) {
            res.data.projectCategory = res.data.projectCategory.split(',');
            form.value = res.data;
            // 处理数据
            // 处理富文本
            if (infoStatus == 'detail'){
              if (fieldDisabled('problemDescription')){
                editorRef.value.disable();
              }
            }
            await dealRichText(form.value.problemDescription);
            loading.value = false;
          } else {
            initForm();
            loading.value = false;
          }
          closeFlowLoading(props.bpmInstanceObject);
        }
      })
      .catch(() => {
        proxy.$message.warning('获取表单数据失败！');
        loading.value = false;
      });
  }
  /** 保存 */
  function saveForm(params) {
    // 处理富文本
    const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
    convertImageSrc(editorHtmljsonCopy);
    const newEditor = createEditor({ content: editorHtmljsonCopy });
    const newEditorHtml = newEditor.getHtml();
    form.value.problemDescription = newEditorHtml === '<p><br></p>' ? '':newEditorHtml;
    formRef.value
      .validate()
      .then(() => {
        // 附件密级校验
        const errorMessage = uploadFile.value.validateUploaderFileSecret(
          form.value.secretLevel
        );
        if (errorMessage) {
          return;
        }
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        //处理富文本
        postData.projectCategory = postData.projectCategory.toString();
        // 发送请求
        saveTpm6sApply(postData)
          .then(res => {
            if (res.success) {
              if (props.bpmInstanceObject) {
                bpmButtonParams.value = { params, result: res.data };
              }
              uploadFile.value.upload(form.value.id || res.data); // 附件上传
            } else {
              errorCallback();
            }
          })
          .catch(() => {
            errorCallback();
          });
      })
      .catch(error => {
        if (props.bpmInstanceObject) {
          closeFlowLoading(props.bpmInstanceObject);
        }
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }
  /** 设置添加表单的初始值 */
  function initForm() {
    // 初始化光标定位
    nextTick(() => {
      closeFlowLoading(props.bpmInstanceObject);
    });
  }
  /** 校验通过后，读取要启动的流程模板 */
  function getBpmDefine() {
    // 附件密级校验
    const validateResult = validateUploaderFileSecret();
    if (!validateResult) {
      return;
    }
    startFlowByFormCode({
      formCode: formCode,
      formData: form.value,
      callback: bpmDefinedInfo => {
        saveAndStartProcess(bpmDefinedInfo);
      }
    });
  }
  /** 保存并返回 */
  async function saveAndClose() {
    // 处理富文本
    const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
    convertImageSrc(editorHtmljsonCopy);
    const newEditor = createEditor({ content: editorHtmljsonCopy });
    const newEditorHtml = newEditor.getHtml();
    form.value.problemDescription = newEditorHtml === '<p><br></p>' ? '':newEditorHtml;
    formRef.value
      .validate()
      .then(() => {
          // 附件密级校验
          const errorMessage = uploadFile.value.validateUploaderFileSecret(
            form.value.secretLevel
          );
          if (errorMessage) {
            return;
          }
          // 处理数据
          loading.value = true;
          const postData = proxy.$lodash.cloneDeep(form.value);
          // 处理富文本
          // const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
          // convertImageSrc(editorHtmljsonCopy);
          // const newEditor = createEditor({ content: editorHtmljsonCopy });
          // const newEditorHtml = newEditor.getHtml();
          //处理富文本
          // postData.problemDescription = newEditorHtml;
          postData.projectCategory = postData.projectCategory.toString();
          if (autoCode.value) {
            // 获取编码码段值
            postData.billNo = autoCode.value.getSegmentValue();
          }
          // 发送请求
        saveTpm6sApply(postData)
            .then(res => {
              if (res.success) {
                uploadFile.value.upload(form.value.id || res.data); // 附件上传
              } else {
                loading.value = false;
              }
            })
            .catch((error) => {
              loading.value = false;
              proxy.$message.error(error);
              emit('close');
            });
      })
      .catch(error => {
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }

  /** 保存并启动流程 */
  async function saveAndStartProcess(params) {
    // 处理富文本
    const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
    convertImageSrc(editorHtmljsonCopy);
    const newEditor = createEditor({ content: editorHtmljsonCopy });
    const newEditorHtml = newEditor.getHtml();
    form.value.problemDescription = newEditorHtml === '<p><br></p>' ? '':newEditorHtml;
    formRef.value
      .validate()
      .then(() => {
        // 点击保存并启动流程按钮触发
        if (!props.bpmInstanceObject && !params.dbid) {
          // 校验表单并选择需要启动的流程模板
          getBpmDefine();
        } else {
          // 附件密级校验
          const validateResult = validateUploaderFileSecret();
          if (!validateResult) {
            return;
          }
          loading.value = true;
          // 处理数据
          const postData = proxy.$lodash.cloneDeep(form.value);
          // 处理富文本
          // const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
          // convertImageSrc(editorHtmljsonCopy);
          // const newEditor = createEditor({ content: editorHtmljsonCopy });
          // const newEditorHtml = newEditor.getHtml();
          //处理富文本
          // postData.problemDescription = newEditorHtml;
          postData.projectCategory = postData.projectCategory.toString();
              if (autoCode.value) {
                // 获取编码码段值
                postData.billNo = autoCode.value.getSegmentValue();
              }
          const param = {
            processDefId: params.dbid || bpmParams.value.defineId,
            formCode: formCode,
            postData
          };
          // 发送请求
          saveFormAndStartProcess(param)
            .then(res => {
              if (res.success) {
                if (props.bpmInstanceObject) {
                  bpmButtonParams.value = { params, result: res.data };
                }
                bpmResult.value = res.data;
                if (!form.value.id) {
                  form.value.id = res.data.formId;
                }
                uploadFile.value.upload(form.value.id || res.data.formId); // 附件上传
              } else {
                errorCallback();
              }
            })
            .catch(() => {
              errorCallback();
            });
        }
      })
      .catch(error => {
        if (props.bpmInstanceObject) {
          closeFlowLoading(props.bpmInstanceObject);
        }
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }

  /** 保存、保存并启动流程处理成功后的逻辑 */
  function successCallback() {
    if (props.bpmInstanceObject) {
      closeFlowLoading(props.bpmInstanceObject);
      // 刷新表单版本
      getFormData(form.value.id, props.infoStatus);
      // 回调选人等流程按钮事件
      if (bpmButtonParams.value.params.callback) {
        bpmButtonParams.value.params.callback(bpmButtonParams.value.result);
        bpmButtonParams.value = {};
      }
    } else {
      // 添加页面-保存并启动流程后，打开流程详情页
      if (bpmResult.value) {
        openFlowDetail(bpmResult.value, props.bpmOperatorRefresh);
      }
      proxy.$message.success('保存成功！');
      emit('reloadData');
      emit('close');
    }
  }
  /** 数据保存失败的回调 */
  function errorCallback() {
    if (props.bpmInstanceObject) {
      closeFlowLoading(props.bpmInstanceObject);
    } else {
      loading.value = false;
      proxy.$message.error('保存失败！');
      emit('reloadData');
      emit('close');
    }
  }
  /** 附件上传完之后的回调函数 */
  function afterUploadEvent(successFile, errorFile) {
    if (errorFile.length > 0) {
      // 有附件保存失败的处理
      errorCallback();
    } else {
      // 所有附件都保存成功的处理
      successCallback();
    }
  }
  /** 返回关闭事件 */
  function closeModal() {
    emit('close');
  }
  /** 点击流程按钮的前置事件 */
  function beforeClickBpmButtons() {
    return new Promise(resolve => {
      resolve(true);
    });
  }
  /** 点击流程按钮的后置事件 */
  function afterClickBpmButtons() {
    return new Promise(resolve => {
      resolve(true);
    });
  }
  /** 表单字段是否显示 */
  function fieldVisible(fieldName) {
    checkAuthJson();
    return getFieldVisible(authJson.value, fieldName);
  }
  /** 表单字段是否可编辑 */
  function fieldDisabled(fieldName) {
    checkAuthJson();
    return getFieldDisabled(authJson.value, fieldName, props.bpmInstanceObject);
  }
  /** 表单字段是否显示 */
  function fieldRequired(fieldName) {
    checkAuthJson();
    return getFieldRequired(authJson.value, fieldName, rules, props.bpmInstanceObject);
  }
  /** 校验表单附件密级 */
  function validateUploaderFileSecret() {
    const errorMessage = uploadFile.value.validateUploaderFileSecret(form.value.secretLevel);
    if (errorMessage) {
      closeFlowLoading(props.bpmInstanceObject);
      return false;
    }
    return true;
  }
  /** 表单附件是否必填(按elementId) */
  function attachmentRequired(fieldName) {
    const res = flowUtils.attachmentRequired(props.bpmInstanceObject, fieldName);
    return res;
  }
  /** 校验权限JSON */
  function checkAuthJson() {
    if (authJson.value == null) {
      authJson.value = getFieldAuth(props.bpmInstanceObject);
    }
  }
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    projectCategoryList,
    secretLevelList,
    uploadFile,
    toolbarConfig,
    editorConfig,
    editorRef,
    onCreated,
    afterUploadEvent,
    attachmentRequired,
    autoCode,
    saveForm,
    saveAndStartProcess,
    saveAndClose,
    closeModal,
    fieldVisible,
    fieldDisabled,
    fieldRequired,
    beforeClickBpmButtons,
    afterClickBpmButtons
  };
}
