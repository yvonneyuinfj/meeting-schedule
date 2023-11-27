import type { FamOverhaulRequireDto } from '@/api/avic/mms/fam/FamOverhaulRequireApi'; // 引入模块DTO
import {
  getFamOverhaulRequire,
  saveFamOverhaulRequire,
  saveFormAndStartProcess
} from '@/api/avic/mms/fam/FamOverhaulRequireApi'; // 引入模块API
import { createEditor } from '@wangeditor/editor'; // 引入富文本依赖
import { useRichText } from '@/utils/hooks/useRichText'; // 引入富文本相关配置及方法
import {
  default as flowUtils,
  startFlowByFormCode,
  closeFlowLoading,
  openFlowDetail,
  getFieldAuth,
  getFieldVisible,
  getFieldDisabled,
  getFieldRequired
} from '@/views/avic/bpm/bpmutils/FlowUtils.js';

export const emits = ['reloadData', 'close'];
export function useFamOverhaulRequireForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamOverhaulRequireDto>({});
  const formRef = ref(null);
  const formCode = 'FamOverhaulRequire';
  const openType = ref('add'); // 流程表单的打开方式，add: 流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); // 提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
  const rules: Record<string, Rule[]> = {
    secretLevel: [{ required: true, message: '数据密级不能为空', trigger: 'change' }],
    billNo: [{ required: true, message: '单据号不能为空', trigger: 'change' }],
    maintPlan: [{ required: true, message: '维修计划不能为空', trigger: 'change' }],
    maintCategory: [{ required: true, message: '维修类别不能为空', trigger: 'change' }],
    expectMaintTime: [{ required: true, message: '需求时间不能为空', trigger: 'change' }],
    managerDeptId: [{ required: true, message: '主管部门不能为空', trigger: 'change' }],
    managerDeptName: [{ required: true, message: '主管部门名称不能为空', trigger: 'change' }],
    isUsedScientificrs: [
      { required: true, message: '是否使用型号经费不能为空', trigger: 'change' }
    ],
    budgetProject: [{ required: true, message: '预算项目不能为空', trigger: 'change' }],
    budgetSubitem: [{ required: true, message: '预算分项不能为空', trigger: 'change' }],
    budgetOrg: [{ required: true, message: '预算组织不能为空', trigger: 'change' }],
    annualProvisional: [{ required: true, message: '年度/临时不能为空', trigger: 'change' }],
    projectNumber: [{ required: true, message: '课题号不能为空', trigger: 'change' }],
    projectAmount: [{ required: true, message: '项目金额（万元）不能为空', trigger: 'change' }],
    isNeedReview: [{ required: true, message: '是否需要评审不能为空', trigger: 'change' }],
    reqSuggest: [{ required: true, message: '要求及建议不能为空', trigger: 'change' }],
    applyDeptId: [{ required: true, message: '申请部门不能为空', trigger: 'change' }],
    applyDeptName: [{ required: true, message: '申请部门名称不能为空', trigger: 'change' }],
    handlePersonId: [{ required: true, message: '需求申请人不能为空', trigger: 'change' }],
    handlePersonName: [{ required: true, message: '需求申请人名称不能为空', trigger: 'change' }],
    applyDate: [{ required: true, message: '故障时间不能为空', trigger: 'change' }],
    telephone: [{ required: true, message: '联系电话不能为空', trigger: 'change' }]
  };
  const famOverhaulRequireListEdit = ref();
  const layout = {
    labelCol: { flex: '140px' },
    wrapperCol: { flex: '1' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const secretLevelList = ref([]); // 数据密级通用代码
  const maintCategoryList = ref([]); // 维修类别通用代码
  const isUsedScientificrsList = ref([]); // 是否使用型号经费通用代码
  const annualProvisionalList = ref([]); // 年度/临时通用代码
  const autoCode = ref(null); // 自动编码ref
  const isNeedReviewList = ref([]); // 是否需要评审通用代码
  const lookupParams = [
    { fieldName: 'maintCategory', lookUpType: 'FAM_MAINT_CATEGORY' },
    { fieldName: 'isUsedScientificrs', lookUpType: 'FAM_PROGRAM_VERSION' },
    { fieldName: 'annualProvisional', lookUpType: 'FAM_ANNUAL_PROVISIONAL' },
    { fieldName: 'isNeedReview', lookUpType: 'FAM_PROGRAM_VERSION' }
  ];
  const editorRef = shallowRef(null); // 编辑器实例，必须用 shallowRef
  const { toolbarConfig, editorConfig, onCreated, dealRichText, convertImageSrc } = useRichText(
    editorRef,
    'famOverhaulRequireApplyReason',
    'FAM_OVERHAUL_REQUIRE'
  );
  const authJson = ref(null);

  if (props.params) {
    bpmParams.value = props.params;
  } else {
    if (proxy.$route) {
      bpmParams.value = proxy.$route.query;
    }
  }
  if (bpmParams) {
    //加载流程数据
    form.value.id = bpmParams.value.id;
    openType.value = bpmParams.value.id ? 'edit' : 'add';
  }

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId || form.value.id) {
      // 编辑详情页面加载数据
      getFormData(props.formId || form.value.id);
    } else {
      // 添加表单的初始值
      initForm();
    }
  });
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  });
  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      maintCategoryList.value = result.maintCategory;
      isUsedScientificrsList.value = result.isUsedScientificrs;
      annualProvisionalList.value = result.annualProvisional;
      isNeedReviewList.value = result.isNeedReview;
    });
  }
  /** 获取当前用户对应的文档密级 */
  function getUserFileSecretList() {
    proxy.$getUserFileSecretLevelList(result => {
      secretLevelList.value = result;
    });
  }
  /**
   * 编辑详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id) {
    if (!id) {
      return;
    }
    loading.value = true;
    getFamOverhaulRequire(id)
      .then(async res => {
        if (res.data) {
          form.value = res.data;
          // 处理数据
          // 处理富文本
          await dealRichText(form.value.applyReason);
          // 详情表单 富文本是否可编辑
          if ( props.bpmInstanceObject &&  fieldDisabled('applyReason')) {
            editorRef.value.disable();
          }
          loading.value = false;
        } else {
          initForm();
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取表单数据失败！');
        loading.value = false;
      });
  }
  /** 保存 */
  function saveForm(params) {
    formRef.value
      .validate()
      .then(async () => {
        famOverhaulRequireListEdit.value
          .validate(async validate => {
            if (!validate) {
              return;
            }
            // 附件密级校验
            const validateResult = validateUploaderFileSecret();
            if (!validateResult) {
              return;
            }
            loading.value = true;
            const postData = proxy.$lodash.cloneDeep(form.value);
            const subInfoList = famOverhaulRequireListEdit.value.getChangedData(); // 获取子表数据
            // 处理数据
            postData.famOverhaulRequireListList = subInfoList; // 挂载子表数据
            // 处理富文本
            const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
            convertImageSrc(editorHtmljsonCopy);
            const newEditor = createEditor({ content: editorHtmljsonCopy });
            const newEditorHtml = newEditor.getHtml();
            postData.applyReason = newEditorHtml;
            // 发送请求
            saveFamOverhaulRequire(postData)
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
                  loading.value = false;
                }
              })
              .catch(() => {
                loading.value = false;
              });
          })
          .catch(error => {
            console.log('error', error);
            loading.value = false;
          });
      })
      .catch(error => {
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
    formRef.value
      .validate()
      .then(() => {
        famOverhaulRequireListEdit.value
          .validate(validate => {
            if (!validate) {
              return;
            }
            // 附件密级校验
            const validateResult = validateUploaderFileSecret();
            if (!validateResult) {
              return;
            }
            startFlowByFormCode({
              formCode: formCode,
              callback: bpmDefinedInfo => {
                saveAndStartProcess(bpmDefinedInfo);
              }
            });
          })
          .catch(error => {
            console.log('error', error);
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
  /** 保存并启动流程 */
  async function saveAndStartProcess(params) {
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
      const subInfoList = famOverhaulRequireListEdit.value.getChangedData(); // 获取子表数据
      loading.value = true;
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(form.value);
      postData.famOverhaulRequireListList = subInfoList; // 挂载子表数据
      // 处理富文本
      const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
      convertImageSrc(editorHtmljsonCopy);
      const newEditor = createEditor({ content: editorHtmljsonCopy });
      const newEditorHtml = newEditor.getHtml();
      if (autoCode.value) {
        // 获取编码码段值
        postData.billNo = autoCode.value.getSegmentValue();
      }
      postData.applyReason = newEditorHtml;
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
            uploadFile.value.upload(form.value.id || res.data); // 附件上传
          } else {
            errorCallback();
          }
        })
        .catch(() => {
          errorCallback();
        });
    }
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
  function checkAuthJson() {
    if (authJson.value == null) {
      authJson.value = getFieldAuth(props.bpmInstanceObject);
    }
  }

  return {
    form,
    formRef,
    bpmParams,
    rules,
    layout,
    colLayout,
    loading,
    secretLevelList,
    maintCategoryList,
    isUsedScientificrsList,
    annualProvisionalList,
    isNeedReviewList,
    uploadFile,
    afterUploadEvent,
    attachmentRequired,
    toolbarConfig,
    editorConfig,
    editorRef,
    onCreated,
    saveForm,
    saveAndStartProcess,
    closeModal,
    fieldVisible,
    autoCode,
    fieldDisabled,
    fieldRequired,
    beforeClickBpmButtons,
    afterClickBpmButtons,
    famOverhaulRequireListEdit
  };
}
