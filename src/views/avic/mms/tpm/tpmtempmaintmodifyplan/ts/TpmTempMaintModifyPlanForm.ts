import type {TpmTempMaintModifyPlanDto} from '@/api/avic/mms/tpm/TpmTempMaintModifyPlanApi'; // 引入模块DTO
import {getTpmTempMaintModifyPlan, saveTpmTempMaintModifyPlan} from '@/api/avic/mms/tpm/TpmTempMaintModifyPlanApi'; // 引入模块API
export const emits = ['reloadData', 'close'];

export function useTpmTempMaintModifyPlanForm({
                                                props: props,
                                                emit: emit
                                              }) {
  const {proxy} = getCurrentInstance();
  const form = ref<TpmTempMaintModifyPlanDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    secretLevel: [
      {required: true, message: '密级不能为空', trigger: 'change'}
    ]
  };
  const layout = {
    labelCol: {flex: '0 0 140px'},
    wrapperCol: {flex: '1 1 0'}
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const secretLevelList = ref([]); // 密级通用代码

  onMounted(() => {
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

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
    getTpmTempMaintModifyPlan(id)
      .then(async (res) => {
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
    formRef.value.validate().then(() => {
      // 附件密级校验 先判断
      const errorMessage = uploadFile.value.validateUploaderFileSecret(
        form.value.secretLevel
      );
      if (errorMessage) {
        return;
      }
      loading.value = true;
      // 处理数据
      const postData = proxy.$lodash.cloneDeep(form.value);
      // 发送请求
      saveTpmTempMaintModifyPlan(postData)
        .then((res) => {
          if (res.success) {
            uploadFile.value.upload(form.value.id || res.data); // 附件上传
          } else {
            loading.value = false;
          }
        }).catch(() => {
        loading.value = false;
      });
    }).catch(error => {
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

  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    secretLevelList,
    uploadFile,
    afterUploadEvent,
    saveForm,
    closeModal
  };
}


