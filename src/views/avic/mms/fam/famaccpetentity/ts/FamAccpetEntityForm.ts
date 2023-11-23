import type { FamAccpetDto } from '@/api/avic/mms/fam/FamAccpetEntityApi'; // 引入模块DTO
import {
  getFamAccpet,
  saveFamAccpet,
  saveFormAndStartProcess,
  getTreeParent
} from '@/api/avic/mms/fam/FamAccpetEntityApi'; // 引入模块API

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

export function useFamAccpetForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamAccpetDto>({});
  const formRef = ref(null);
  const formCode = 'FamAccpetEntity';
  // const accpetType = ref();
  const openType = ref('add'); // 流程表单的打开方式，add: 流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); // 提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据

  const rules: Record<string, Rule[]> = {
    accpetApplyNo: [{ required: true, message: '验收申请单号不能为空', trigger: 'change' }],
    accpetType: [{ required: true, message: '验收类型不能为空', trigger: 'change' }],
    orderName: [{ required: true, message: '合同名称不能为空', trigger: 'change' }],
    orderNo: [{ required: true, message: '合同编号不能为空', trigger: 'change' }],
    orderValue: [{ required: true, message: '合同金额不能为空', trigger: 'change' }],
    procureDeptName: [{ required: true, message: '采购部门名称不能为空', trigger: 'change' }],
    accpetDate: [{ required: true, message: '验收日期不能为空', trigger: 'change' }],
    managerDeptName: [{ required: true, message: '主管部门名称不能为空', trigger: 'change' }],
    receiveDeptName: [{ required: true, message: '接收部门名称不能为空', trigger: 'change' }],
    assetClass: [{ required: true, message: '资产属性不能为空', trigger: 'change' }],
    fundSource: [{ required: true, message: '资金来源不能为空', trigger: 'change' }],
    otherMatter: [{ required: true, message: '其他事项不能为空', trigger: 'change' }],
    purchWay: [{ required: true, message: '购置方式不能为空', trigger: 'change' }],
    projectName: [{ required: true, message: '项目名称不能为空', trigger: 'change' }],
    handlePersonName: [{ required: true, message: '经办人名称不能为空', trigger: 'change' }],
    equipmentType: [{ required: true, message: '设备类型不能为空', trigger: 'change' }],
    assetClasst: [{ required: true, message: '资产类别不能为空', trigger: 'change' }]
  };
  const famAccpetListEntityEdit = ref();
  const layout = {
    labelCol: { flex: '140px' },
    wrapperCol: { flex: '1' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const autoCode = ref(null); // 自动编码ref
  const secretLevelList = ref([]); // 数据密级通用代码
  const accpetTypeList = ref([]); // 验收类型通用代码
  const assetTypeList = ref([]); //资产属性通用代码
  const equipmentTypeList = ref([]); //设备类型通用代码
  const lookupParams = [
    { fieldName: 'accpetType', lookUpType: 'FAM_ACCPET_TYPE' },
    { fieldName: 'assetType', lookUpType: 'FAM_ASSET_TYPE' },
    { fieldName: 'equipmentType', lookUpType: 'TPM_EQUIPMENT_TYPE' }
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

  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      accpetTypeList.value = result.accpetType;
      assetTypeList.value = result.assetType;
      equipmentTypeList.value = result.equipmentType;
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
    getFamAccpet(id)
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
        famAccpetListEntityEdit.value
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
            if (famAccpetListEntityEdit.value) {
              const subInfoList = famAccpetListEntityEdit.value.getChangedData(); // 获取子表数据
              // 处理数据
              postData.famAccpetListList = subInfoList; // 挂载子表数据
            }
            // 发送请求
            saveFamAccpet(postData)
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
        // famAccpetListEdit.value
        //   .validate(async validate => {
        //     if (!validate) {
        //       return;
        //     }
        //   })
        //   .catch(error => {
        //     console.log('error', error);
        //     loading.value = false;
        //   });
      })
      .catch(error => {
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }

  /** 新增 */
  function addForm(params) {
    formRef.value
      .validate()
      .then(async () => {
        // 附件密级校验
        const validateResult = validateUploaderFileSecret();
        if (!validateResult) {
          return;
        }
        loading.value = true;
        const postData = proxy.$lodash.cloneDeep(form.value);
        if (autoCode.value) {
          // 获取编码码段值
          postData.accpetApplyNo = autoCode.value.getSegmentValue();
        }

        if (famAccpetListEntityEdit.value) {
          const subInfoList = famAccpetListEntityEdit.value.getChangedData(); // 获取子表数据
          // 处理数据
          postData.famAccpetListList = subInfoList; // 挂载子表数据
        }
        // 发送请求
        saveFamAccpet(postData)
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
        // famAccpetListEdit.value
        //   .validate(async validate => {
        //     if (!validate) {
        //       return;
        //     }
        //   })
        //   .catch(error => {
        //     console.log('error', error);
        //     loading.value = false;
        //   });
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
        famAccpetListEntityEdit.value
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
      const subInfoList = famAccpetListEntityEdit.value.getChangedData(); // 获取子表数据
      console.log(subInfoList)
      loading.value = true;
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(form.value);
      postData.famAccpetListEntityList = subInfoList; // 挂载子表数据
      // if (autoCode.value) {
      //   // 获取编码码段值
      //   postData.accpetApplyNo = autoCode.value.getSegmentValue();
      // }
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
    accpetTypeList,
    assetTypeList,
    equipmentTypeList,
    uploadFile,
    afterUploadEvent,
    attachmentRequired,
    autoCode,
    saveForm,
    addForm,
    saveAndStartProcess,
    closeModal,
    fieldVisible,
    fieldDisabled,
    fieldRequired,
    beforeClickBpmButtons,
    afterClickBpmButtons,
    famAccpetListEntityEdit
  };
}
