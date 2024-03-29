import type { Tpm6sResolveCompareDto } from '@/api/avic/mms/tpm/Tpm6sResolveCompareApi'; // 引入模块DTO
import {
  getTpm6sResolveCompare,
  saveFormAndStartProcess,
  saveTpm6sResolveCompare
} from '@/api/avic/mms/tpm/Tpm6sResolveCompareApi'; // 引入模块API
import { createEditor } from '@wangeditor/editor'; // 引入富文本依赖
import { useRichText } from '@/utils/hooks/useRichText'; // 引入富文本相关配置及方法
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

export const emits = ['reloadData', 'close'];

export function useTpm6sResolveCompareForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<Tpm6sResolveCompareDto>({});
  const formRef = ref(null);

  const formCode = 'Tpm6sResolveCompare';
  const openType = ref('add'); // 流程表单的打开方式，add:流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); //提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
  const rules: Record<string, Rule[]> = {
    problemSolvingInstruction: [
      { required: true, message: '问题解决情况不能为空', trigger: 'blur' }
    ],
    finishDate: [
      { required: true, message: '完成时间不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    problemSolvingEvaluation: [
      { required: true, validator: problemSolvingEvaluationValidator, message: '问题解决评价不能为空', trigger: 'change' }
    ]
  };

  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const editorRef = shallowRef(null); // 编辑器实例，必须用 shallowRef
  const problemDescriptionEditorRef = shallowRef(null);
  const showSaveAndPro = ref(false);
  const showSave = ref(false);

  const {
    toolbarConfig,
    editorConfig,
    onCreated,
    dealRichText,
    convertImageSrc
  } = useRichText(
    editorRef,
    'tpm6sResolveCompareProblemDescription',
    'tpm6sResolveCompare'
  );
  const editor = useRichText(problemDescriptionEditorRef,
    'tpm6sApplyProblemDescription',
    'tpm6sApply');
  const SToolbarConfig = editor.toolbarConfig;
  const SEditorConfig = editor.editorConfig;
  const SDealRichText = editor.dealRichText;
  const SOnCreated = editor.onCreated;

  const billStatusList = ref([]); // 流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过通用代码
  const problemSolvingEvaluationList = ref([]);  //评价通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const lookupParams = [
    { fieldName: 'billStatus', lookUpType: 'PLATFORM_BPM_TASK_STATE' },
    { fieldName: 'evaluationStatus', lookUpType: 'TPM_PROBLEM_SOLVING_EVALUATION' }
  ];
  const authJson = ref(null);
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
      getFormData(props.formId || form.value.id);
    } else {
      // 添加表单的初始值
      initForm();
    }
  });

  /** 获取通用代码 */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      billStatusList.value = result.billStatus;
      problemSolvingEvaluationList.value = result.evaluationStatus;
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
  function getFormData(id) {
    //此函数也用来处理流程的回显页面
    if (!id) {
      return;
    }
    loading.value = true;
    getTpm6sResolveCompare(id)
      .then(async res => {
        if (res.success) {
          if (res.data) {
            form.value = res.data;
            await dealRichText(form.value.problemSolvingInstruction);
            await SDealRichText(form.value.problemDescription);
            problemDescriptionEditorRef.value.disable();
            loading.value = false;
            if (form.value.bpmState == 'active' || form.value.bpmState == 'ended') {
              showSave.value = true;
              showSaveAndPro.value = true;
            }
            if (props.infoStatus == 'detail'){
              if (fieldDisabled('problemSolvingInstruction')){
                editorRef.value.disable();
              }
            }
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
    form.value.problemSolvingInstruction = newEditorHtml === '<p><br></p>' ? '' : newEditorHtml;
    formRef.value
      .validate()
      .then(() => {
        // 附件密级校验
        const validateResult = validateUploaderFileSecret();
        if (!validateResult) {
          return;
        }
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        //处理富文本
        postData.problemSolvingInstruction = postData.problemSolvingInstruction.toString();
        // 发送请求
        saveTpm6sResolveCompare(postData)
          .then(res => {
            if (res.success) {
              if (props.bpmInstanceObject) {
                bpmButtonParams.value = { params, result: res.data };
              }
              if (!form.value.id) {
                form.value.id = res.data;
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

  /** 保存并启动流程 */
  async function saveAndStartProcess(params) {
    // 处理富文本
    const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
    convertImageSrc(editorHtmljsonCopy);
    const newEditor = createEditor({ content: editorHtmljsonCopy });
    const newEditorHtml = newEditor.getHtml();
    form.value.problemSolvingInstruction = newEditorHtml === '<p><br></p>' ? '' : newEditorHtml;
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
          // 处理数据
          const postData = proxy.$lodash.cloneDeep(form.value);
          //处理富文本
          postData.problemSolvingInstruction = postData.problemSolvingInstruction.toString();
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
      getFormData(form.value.id);
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

  async function problemSolvingEvaluationValidator(_rule) {

    if (form.value.bpmState == 'active' && fieldDisabled('problemSolvingEvaluation')) {
      return Promise.resolve();
    }
  };

  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    showSaveAndPro,
    showSave,
    billStatusList,
    problemSolvingEvaluationList,
    secretLevelList,
    uploadFile,
    toolbarConfig,
    editorConfig,
    editorRef,
    SToolbarConfig,
    SEditorConfig,
    SOnCreated,
    problemDescriptionEditorRef,
    onCreated,
    afterUploadEvent,
    attachmentRequired,
    saveForm,
    saveAndStartProcess,
    closeModal,
    fieldVisible,
    fieldDisabled,
    fieldRequired,
    beforeClickBpmButtons,
    afterClickBpmButtons
  };
}
