import type { FamAddApplyManageDto } from '@/api/avic/mms/fam/FamAddApplyManageApi'; // 引入模块DTO
import { getFamAddApplyManage, saveFamAddApplyManage, saveFormAndStartProcess } from '@/api/avic/mms/fam/FamAddApplyManageApi'; // 引入模块API
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
export function useFamAddApplyManageForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamAddApplyManageDto>({});
  const formRef = ref(null);
  const formCode = 'FamAddApplyManage';
  const openType = ref('add'); // 流程表单的打开方式，add:流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); //提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
  const rules: Record<string, Rule[]> = {
    capitalAssetName: [{ required: true, message: '固定资产名称不能为空', trigger: 'change' }],
    capitalAssetDept: [{ required: true, message: '固定资产主管部门不能为空', trigger: 'change' }],
    ynScientific: [{ required: true, message: '是否科研用不能为空', trigger: 'change' }],
    budgetItemId: [{ required: true, message: '预算项目不能为空', trigger: 'change' }],
    purchaseNum: [{ required: true, message: '购置数量不能为空', trigger: 'change' }],
    budgetUnivalent: [{ required: true, message: '预算单价不能为空', trigger: 'change' }],
    tel: [{ required: true, message: '联系方式不能为空', trigger: 'change' }],
    qualityDate: [{ required: true, message: '需求日期不能为空', trigger: 'change' }],
    goodsLevel: [{ required: true, message: '物资等级不能为空', trigger: 'change' }],
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const autoCode = ref(null); // 自动编码ref
  const ynScientificList = ref([]); // 是否科研用通用代码
  const ynReviewList = ref([]); // 是否需要评审通用代码
  const goodsLevelList = ref([]); // 物资等级通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const lookupParams = [
    { fieldName: 'ynScientific', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynReview', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'goodsLevel', lookUpType: 'FAM_GOODS_LEVEL' }

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
      ynScientificList.value = result.ynScientific;
      ynReviewList.value = result.ynReview;
      goodsLevelList.value = result.goodsLevel;
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
    getFamAddApplyManage(id)
      .then(async res => {
        if (res.success) {
          if (res.data) {
            form.value = res.data;
            // 处理数据
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
        if (autoCode.value) {
          // 获取编码码段值
          postData.applyNo = autoCode.value.getSegmentValue();
        }
        // 发送请求
        saveFamAddApplyManage(postData)
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
          if (autoCode.value) {
            // 获取编码码段值
            postData.applyNo = autoCode.value.getSegmentValue();
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
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    autoCode,
    ynScientificList,
    ynReviewList,
    goodsLevelList,
    secretLevelList,
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
    afterClickBpmButtons
  };
}
