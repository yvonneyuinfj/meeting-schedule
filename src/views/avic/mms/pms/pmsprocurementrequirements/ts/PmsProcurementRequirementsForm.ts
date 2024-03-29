import type { PmsProcurementRequirementsDto } from '@/api/avic/mms/pms/PmsProcurementRequirementsApi'; // 引入模块DTO
import {
  getPmsProcurementRequirements,
  saveFormAndStartProcess,
  savePmsProcurementRequirements
} from '@/api/avic/mms/pms/PmsProcurementRequirementsApi'; // 引入模块API
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

export function usePmsProcurementRequirementsForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<PmsProcurementRequirementsDto>({});
  const pmsProcurementRequirementsLEdit = ref();
  const formRef = ref(null);
  const formCode = 'PmsProcurementRequirements';
  const openType = ref('add'); // 流程表单的打开方式，add: 流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); // 提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
  const rules: Record<string, Rule[]> = {
    pmsPlanId: [
      { required: true, message: '科研任务名称不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    projectRequirements: [
      { required: true, message: '项目要求不能为空', trigger: 'change' }
    ],
    supplierRequirements: [
      { required: true, message: '供应商要求不能为空', trigger: 'change' }
    ],
    publishInformationSecurityLevel: [
      { required: true, message: '本次发布信息密级不能为空', trigger: 'change' }
    ],
    procurementTaskClassification: [
      { required: true, message: '本项采购任务密级不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '140px' },
    wrapperCol: { flex: '1' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const secretLevelList = ref([]); // 密级通用代码
  const procurementMethodList = ref([]); // 采购方式通用代码
  const supplierSelectionCriteriaList = ref([]); // 供应商中选标准通用代码
  const procureStageList = ref([]); // 采购阶段通用代码
  const processingTypeList = ref([]); // 是否为加工类通用代码
  const publishInformationSecurityLevelList = ref([]); // 本次发布信息密级通用代码
  const procurementTaskClassificationList = ref([]); // 本项采购任务密级通用代码
  const lookupParams = [
    { fieldName: 'procurementMethod', lookUpType: 'PMS_PROCUREMENT_METHOD' },
    { fieldName: 'supplierSelectionCriteria', lookUpType: 'PMS_SUPPLIER_SELECTION_CRITERIA' },
    { fieldName: 'procureStage', lookUpType: 'PMS_PROCURE_STAGE' },
    { fieldName: 'processingType', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'publishInformationSecurityLevel', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' },
    { fieldName: 'procurementTaskClassification', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' }
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

  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      procurementMethodList.value = result.procurementMethod;
      supplierSelectionCriteriaList.value = result.supplierSelectionCriteria;
      procureStageList.value = result.procureStage;
      processingTypeList.value = result.processingType;
      publishInformationSecurityLevelList.value = result.publishInformationSecurityLevel;
      procurementTaskClassificationList.value = result.procurementTaskClassification;
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
    if (!id) {
      return;
    }
    loading.value = true;
    getPmsProcurementRequirements(id)
      .then(async res => {
        if (res.data) {
          form.value = res.data;
          // 处理数据
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
        pmsProcurementRequirementsLEdit.value
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
            const subInfoList = pmsProcurementRequirementsLEdit.value.getChangedData(); // 获取子表数据
            // 处理数据
            postData.pmsProcurementRequirementsLList = subInfoList; // 挂载子表数据
            // 发送请求
            savePmsProcurementRequirements(postData)
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
              .catch((error) => {
                proxy.$message.warning(error.message);
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
        pmsProcurementRequirementsLEdit.value
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
      const subInfoList = pmsProcurementRequirementsLEdit.value.getChangedData(); // 获取子表数据
      loading.value = true;
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(form.value);
      postData.pmsProcurementRequirementsLList = subInfoList; // 挂载子表数据
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
        .catch((error) => {
          proxy.$message.warning(error.message);
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
    procurementMethodList,
    supplierSelectionCriteriaList,
    procureStageList,
    processingTypeList,
    publishInformationSecurityLevelList,
    procurementTaskClassificationList,
    uploadFile,
    afterUploadEvent,
    attachmentRequired,
    saveForm,
    saveAndStartProcess,
    closeModal,
    fieldVisible,
    fieldDisabled,
    fieldRequired,
    beforeClickBpmButtons,
    afterClickBpmButtons,
    pmsProcurementRequirementsLEdit
  };
}


