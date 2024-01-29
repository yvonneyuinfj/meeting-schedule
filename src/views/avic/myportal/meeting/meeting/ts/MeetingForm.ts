import type { MeetingDto } from '@/api/avic/myportal/meeting/MeetingApi'; // 引入模块DTO
import {
  getMeeting,
  saveMeeting,
  saveFormAndStartProcess
} from '@/api/avic/myportal/meeting/MeetingApi'; // 引入模块API
import request from '@/utils/request';
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
import dayjs from 'dayjs';

export const emits = ['reloadData', 'close'];
export function useMeetingForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<MeetingDto>({});
  const formRef = ref(null);
  const formCode = 'Meeting';
  const openType = ref('add'); // 流程表单的打开方式，add: 流程中心打开, edit: 待办打开
  const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
  const bpmButtonParams = ref<any>({}); // 提交按钮传递的参数
  const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: '会议名称不能为空', trigger: 'change' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'change' }]
  };
  // const meetingUserEdit = ref();
  const layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const ynApproveList = ref([]); // 是否需要审批通用代码
  const ynValidList = ref([]); // 是否有效通用代码
  const ynPublicList = ref([]); // 是否公开通用代码
  const ynNewPlaceList = ref([]); // 是否新地点通用代码
  const ynShowEventList = ref([]); // 是否显示日程通用代码
  const eventTypeList = ref([]); // 日程类型通用代码
  const remindTypeList = ref([]); // 待办提醒通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const lookupParams = [
    { fieldName: 'ynApprove', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynValid', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynPublic', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynNewPlace', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynShowEvent', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'eventType', lookUpType: 'MYPORTAL_EVENT_TYPE' },
    { fieldName: 'remindType', lookUpType: 'MYPORTAL_REMIND_TYPE' }
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
      ynApproveList.value = result.ynApprove;
      ynValidList.value = result.ynValid;
      ynPublicList.value = result.ynPublic;
      ynNewPlaceList.value = result.ynNewPlace;
      ynShowEventList.value = result.ynShowEvent;
      eventTypeList.value = result.eventType;
      remindTypeList.value = result.remindType;
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
    getMeeting(id)
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
        // meetingUserEdit.value
        //   .validate(async validate => {
        //     if (!validate) {
        //       return;
        //     }
        //   }).catch(error => {
        //     console.log('error', error);
        //     loading.value = false;
        //   });
        // 附件密级校验
        const validateResult = validateUploaderFileSecret();
        if (!validateResult) {
          return;
        }
        loading.value = true;
        const postData = proxy.$lodash.cloneDeep(form.value);
        // const subInfoList = meetingUserEdit.value.getChangedData(); // 获取子表数据
        // 处理数据
        // postData.meetingUserList = subInfoList; // 挂载子表数据
        // 发送请求
        saveMeeting(postData)
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
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }
  /** 设置添加表单的初始值 */
  async function initForm() {
    const todayAt8AM = dayjs().set('hour', 8).set('minute', 0).set('second', 0).format('YYYY-HH-MM HH:mm').toString();
    const todayAt9AM = dayjs().set('hour', 9).set('minute', 0).set('second', 0).format('YYYY-HH-MM HH:mm').toString();
    const res = await request.get('/appsys/user/user/info');
    form.value.phoneNumber=res.data.mobile;
    form.value.authorId = proxy.$getLoginUser().id;
    form.value.authorCode = proxy.$getLoginUser().loginName;
    form.value.authorIdAlias = proxy.$getLoginUser().name;
    form.value.authorName = proxy.$getLoginUser().name;
    form.value.eventType = '5';
    form.value.remindType = '1';
    form.value.ynPublic = 'Y';
    form.value.remindDuration = 1;
    form.value.preStartTime = todayAt8AM;
    form.value.startTime = todayAt8AM;
    form.value.endTime = todayAt9AM;

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
        // meetingUserEdit.value
        //   .validate(validate => {
        //     if (!validate) {
        //       return;
        //     }
        //   })
        //   .catch(error => {
        //     console.log('error', error);
        //   });
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
      // const subInfoList = meetingUserEdit.value.getChangedData(); // 获取子表数据
      loading.value = true;
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(form.value);
      // postData.meetingUserList = subInfoList; // 挂载子表数据
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
  /** 选人回调事件 */
  function selectCallback(prop, e) {
    form.value[prop] = e.names;
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
  function handleSelectConfirm(arr) {
    form.value.meetingRoomId = arr[0].id;
    form.value.meetingRoomIdAlias = arr[0].name;
    form.value.meetingRoomName = arr[0].name;
    form.value.ynApprove = arr[0].ynApprove;
    form.value.approvalIds = arr[0].approvalIds;
    form.value.approvalNames = arr[0].approvalIdsAlias;
  }
  
  function handleSelectClear(){
    form.value.meetingRoomId = '';
    form.value.meetingRoomIdAlias = '';
    form.value.meetingRoomName = '';
    form.value.ynApprove = '';
    form.value.approvalIds = '';
    form.value.approvalNames = '';
  }
  function handleTreeSelectChange(arr,fieldName){
    form.value[fieldName] = arr[1];
  }

  return {
    form,
    formRef,
    bpmParams,
    rules,
    layout,
    colLayout,
    loading,
    ynApproveList,
    ynValidList,
    ynPublicList,
    ynNewPlaceList,
    ynShowEventList,
    eventTypeList,
    remindTypeList,
    secretLevelList,
    uploadFile,
    afterUploadEvent,
    attachmentRequired,
    saveForm,
    saveAndStartProcess,
    closeModal,
    selectCallback,
    fieldVisible,
    fieldDisabled,
    fieldRequired,
    beforeClickBpmButtons,
    afterClickBpmButtons,
    // meetingUserEdit,
    handleSelectConfirm,
    handleSelectClear,
    handleTreeSelectChange
  };
}
