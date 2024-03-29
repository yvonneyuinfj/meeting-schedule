import type { FamSealAndUnsealDto } from '@/api/avic/mms/fam/FamSealAndUnsealApi'; // 引入模块DTO
import {
  getFamSealAndUnseal,
  saveFamSealAndUnseal,
  saveFormAndStartProcess
} from '@/api/avic/mms/fam/FamSealAndUnsealApi'; // 引入模块API
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

export function useFamSealAndUnsealForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamSealAndUnsealDto>({});
  const formRef = ref(null);
  const formCode = 'FamSealAndUnseal';
  const openType = ref('add'); // 流程表单的打开方式，add: 流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); // 提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
  const rules: Record<string, Rule[]> = {
    applyNo: [
      { required: true, message: '申请单编号不能为空', trigger: 'change' }
    ],
    applyDeptId: [
      { required: true, message: '申请部门不能为空', trigger: 'change' }
    ],
    sealingType:[
      { required: true, message: '封存类型不能为空', trigger: 'change' }
    ],
    isAssetIntact:[
      { required: true, message: '资产是否完好不能为空', trigger: 'change' }
    ],
    managerDeptId:[
      { required: true, message: '主管部门不能为空', trigger: 'change' }
    ],
    applyReason:[
      { required: true, message: '申请理由不能为空', trigger: 'change' }
    ],
    handlePersonId: [
      { required: true, message: '经办人不能为空', trigger: 'change' }
    ],
    applyDate: [
      { required: true, message: '申请时间不能为空', trigger: 'change' }
    ],
    sealingStartDate: [
      { validator: sealingStartDateValidator, trigger: 'change' }
    ],
    unsealStartDate: [
      { validator: unsealStartDateValidator, trigger: 'change' }
    ]
  };
  const famSealAndUnsealListEdit = ref();
  const layout = {
    labelCol: { flex: '140px' },
    wrapperCol: { flex: '1' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const autoCode = ref(null); // 自动编码ref
  const secretLevelList = ref([]); // SECRET_LEVEL通用代码
  const isAssetIntactList = ref([]); // 资产是否完好（是/否）通用代码
  const sealingTypeList = ref([]); // 封存类型 通用代码
  const lookupParams = [
    { fieldName: 'isAssetIntact', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'sealingType', lookUpType: 'FAM_SEALING_TYPE' }
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
    if (props.formId || form.value.id) {
      // 编辑详情页面加载数据
      getFormData(props.formId || form.value.id);
    } else {
      // 添加表单的初始值
      initForm();
    }
  });

  // 封存日期开始时间校验
  async function sealingStartDateValidator(rule, value) {
    if (form.value.sealingType === '1') {
      if (!value) {
        return Promise.reject(new Error('请选择封存日期开始时间'));
      }
    } else {
      return Promise.resolve();
    }
  }

  // 启封日期开始时间校验
  async function unsealStartDateValidator(rule, value) {
    if (form.value.sealingType === '2') {
      if (!value) {
        return Promise.reject(new Error('请选择启封日期开始时间'));
      }
    } else {
      return Promise.resolve();
    }
  }

  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      isAssetIntactList.value = result.isAssetIntact;
      sealingTypeList.value = result.sealingType;
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
    getFamSealAndUnseal(id)
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
        famSealAndUnsealListEdit.value
          .validate(async validate => {
            if (!validate) {
              return;
            }
            loading.value = true;
            const postData = proxy.$lodash.cloneDeep(form.value);
            const subInfoList = famSealAndUnsealListEdit.value.getChangedData(); // 获取子表数据
            // 处理数据
            postData.famSealAndUnsealListList = subInfoList; // 挂载子表数据
            // 发送请求
            saveFamSealAndUnseal(postData)
              .then(res => {
                if (res.success) {
                  if (props.bpmInstanceObject) {
                    bpmButtonParams.value = { params, result: res.data };
                  }
                  if (!form.value.id) {
                    form.value.id = res.data;
                  }
                  successCallback();
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
        famSealAndUnsealListEdit.value
          .validate(validate => {
            if (!validate) {
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
      const subInfoList = famSealAndUnsealListEdit.value.getChangedData(); // 获取子表数据
      loading.value = true;
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(form.value);
      postData.famSealAndUnsealListList = subInfoList; // 挂载子表数据
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
            successCallback();
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
    isAssetIntactList,
    autoCode,
    saveForm,
    saveAndStartProcess,
    closeModal,
    fieldVisible,
    fieldDisabled,
    fieldRequired,
    beforeClickBpmButtons,
    afterClickBpmButtons,
    sealingTypeList,
    famSealAndUnsealListEdit
  };
}

