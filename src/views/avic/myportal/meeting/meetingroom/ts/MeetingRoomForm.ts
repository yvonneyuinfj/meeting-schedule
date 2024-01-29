import type { MeetingRoomDto } from '@/api/avic/myportal/meeting/MeetingRoomApi'; // 引入模块DTO
import { getMeetingRoom, saveMeetingRoom } from '@/api/avic/myportal/meeting/MeetingRoomApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMeetingRoomForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<MeetingRoomDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: '会议室名称不能为空', trigger: 'change' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'change' }]
  };
  const layout = {
    labelCol: { flex: '0 0 110px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const ynPublicList = ref([]); // 是否公开通用代码
  const ynApproveList = ref([]); // 是否需要审批通用代码
  const ynValidList = ref([]); // 是否可用通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const typeList = ref([]); // 会议室分类通用代码
  const lookupParams = [
    { fieldName: 'ynPublic', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynApprove', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynValid', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'type', lookUpType: 'MYPORTAL_MR_TYPE' }
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
    if (!form.value.capacity) {
      form.value.capacity = 10;
    }
    if(!form.value.createdBy){
      form.value.createdByAlias = proxy.$getLoginUser().name;
    }
  }
  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      ynPublicList.value = result.ynPublic;
      ynApproveList.value = result.ynApprove;
      ynValidList.value = result.ynValid;
      typeList.value = result.type;
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
    getMeetingRoom(id)
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
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveMeetingRoom(postData)
          .then(res => {
            if (res.success) {
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
    ynPublicList,
    ynApproveList,
    ynValidList,
    secretLevelList,
    typeList,
    selectCallback,
    saveForm,
    closeModal
  };
}
