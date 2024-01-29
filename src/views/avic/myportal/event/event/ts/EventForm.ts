import type { MeetingDto } from '@/api/avic/myportal/meeting/MeetingApi'; // 引入模块DTO
import { getMeeting, saveMeeting } from '@/api/avic/myportal/meeting/MeetingApi';
import dayjs from 'dayjs'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useEventForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<MeetingDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: '日程主题不能为空', trigger: 'change' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'change' }]
  };
  const layout = {
    labelCol: { flex: '0 0 90px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const ynValidList = ref([]); // 是否可用通用代码
  const ynPublicList = ref([]); // 是否公开通用代码
  const eventTypeList = ref([]); // 日程类型通用代码
  const remindTypeList = ref([]); // 待办提醒通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const lookupParams = [
    { fieldName: 'ynValid', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynPublic', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'eventType', lookUpType: 'MYPORTAL_EVENT_TYPE' },
    { fieldName: 'remindType', lookUpType: 'MYPORTAL_REMIND_TYPE' }
  ];

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    } else {
      initForm();
    }
  });
  function initForm() {
    if (!form.value.authorId) {
      form.value.authorId = proxy.$getLoginUser().id;
      form.value.authorCode = proxy.$getLoginUser().loginName;
      form.value.authorIdAlias = proxy.$getLoginUser().name;
      form.value.authorName = proxy.$getLoginUser().name;
    }
    if (!form.value.eventType) {
      form.value.eventType = '1';
    }
    if (!form.value.remindType) {
      form.value.remindType = '1';
    }
    if (!form.value.ynPublic) {
      form.value.ynPublic = 'Y';
    }
    if (!form.value.remindDuration) {
      form.value.remindDuration = 1;
    }
    if(!form.value.preStartTime){
      form.value.preStartTime = dayjs().format('YYYY-MM-DD HH:mm');
      form.value.startTime = dayjs().format('YYYY-MM-DD HH:mm');
      form.value.endTime = dayjs().add(1, 'h').format('YYYY-MM-DD HH:mm');
    }
    if (props.dateInfo) {
      form.value.preStartTime = dayjs(props.dateInfo.start).add(8,'h').format('YYYY-MM-DD HH:mm');
      form.value.startTime = dayjs(props.dateInfo.start).add(8,'h').format('YYYY-MM-DD HH:mm');
      form.value.endTime = dayjs(props.dateInfo.end).add(9,'h').format('YYYY-MM-DD HH:mm');
    }
  }
  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      ynValidList.value = result.ynValid;
      ynPublicList.value = result.ynPublic;
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
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id) {
    loading.value = true;
    getMeeting(id)
      .then(async res => {
        if (res.success) {
          form.value = res.data;
          // 处理数据
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取表单数据失败！');
        loading.value = false;
      });
  }
  /** 保存 */
  function saveForm() {
    formRef.value
      .validate()
      .then(() => {
        // 附件密级校验 先判断
        const errorMessage = uploadFile.value.validateUploaderFileSecret(form.value.secretLevel);
        if (errorMessage) {
          return;
        }
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveMeeting(postData)
          .then(res => {
            if (res.success) {
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
  /** 数据保存成功的回调 */
  function successCallback() {
    proxy.$message.success('保存成功！');
    emit('reloadData');
    emit('close');
  }
  /** 数据保存失败的回调 */
  function errorCallback() {
    emit('reloadData');
    emit('close');
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

  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    ynValidList,
    ynPublicList,
    eventTypeList,
    remindTypeList,
    secretLevelList,
    uploadFile,
    afterUploadEvent,
    saveForm,
    closeModal,
    selectCallback
  };
}
