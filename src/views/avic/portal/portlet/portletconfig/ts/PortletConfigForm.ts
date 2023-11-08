import { savePortletConfig, getPortletConfig, updatePortalInfo } from '@/api/avic/system/PortalApi';
import { getUserInfo, getRoleInfo } from '@/api/avic/system/CommonApi';
import type { PortletConfigDto } from '@/api/avic/system/PortalApi'; // 引入模块DTO

export const emits = ['reloadData', 'close', 'openDesignModal'];
export function useDemoSingleForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<PortletConfigDto>({
    resourceType: '1',
    isDefault: '0'
  });
  const formRef = ref(null);
  const isUser = ref(false);
  const isRole = ref(true);
  const rules: Record<string, Rule[]> = {
    portletCode: [{ required: true, message: '编码不能为空', trigger: 'change' }],
    portletName: [{ required: true, message: '名称不能为空', trigger: 'change' }],
    resourceType: [{ required: true, message: '应用范围不能为空', trigger: 'change' }]
  };
  const layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout1; // 调用布局公共方法
  const loading = ref(false);
  onMounted(() => {
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });
  function handleRadioChange(value) {
    form.value.resourceId = null;
    if (value == '0') {
      //选择系统默认
      isUser.value = false;
      isRole.value = false;
    } else if (value == '1') {
      //选择角色默认
      isUser.value = false;
      isRole.value = true;
    } else if (value == '2') {
      // 用户默认状态可不修改
      form.value.isDefault = '0';
      isUser.value = true; //选择用户
      isRole.value = false;
    }
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id) {
    loading.value = true;
    getPortletConfig(id)
      .then(async res => {
        if (res.success) {
          const resourceType = res.data.resourceType;
          handleRadioChange(resourceType);
          form.value = res.data;
          if (resourceType == '1') {
            //角色
            getSelectRoleInfo();
          } else if (resourceType == '2') {
            //用户
            getSelectUserInfo();
          }
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取表单数据失败！');
        loading.value = false;
      });
  }
  function getSelectUserInfo() {
    getUserInfo([form.value.resourceId]).then(res => {
      if (res.success) {
        form.value.resourceIdAlias = res.data[0].name;
      }
    });
  }
  function getSelectRoleInfo() {
    getRoleInfo([form.value.resourceId]).then(res => {
      if (res.success) {
        form.value.resourceIdAlias = res.data[0].name;
      }
    });
  }
  /** 保存 */
  function saveForm(type) {
    formRef.value
      .validate()
      .then(async () => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        if (props.formId) {
          updatePortalInfo(postData)
            .then(res => {
              if (res.success) {
                successCallback();
              } else {
                errorCallback();
              }
            })
            .catch(() => {
              loading.value = false;
            });
        } else {
          // 发送请求
          savePortletConfig(postData)
            .then(res => {
              if (type == 'addAndDesign') {
                emit('openDesignModal', {
                  id: res.data,
                  content: null,
                  portletName: form.value.portletName
                });
              }
              if (res.success) {
                successCallback();
              } else {
                errorCallback();
              }
            })
            .catch(() => {
              loading.value = false;
            });
        }
      })
      .catch(error => {
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }
  /** 数据保存成功的回调 */
  function successCallback() {
    loading.value = false;
    proxy.$message.success('保存成功！');
    emit('reloadData');
    emit('close');
  }
  /** 数据保存失败的回调 */
  function errorCallback() {
    loading.value = false;
    emit('reloadData');
    emit('close');
  }
  /** 返回关闭事件 */
  function closeModal() {
    emit('close');
  }
  return {
    form,
    formRef,
    isUser,
    isRole,
    handleRadioChange,
    rules,
    layout,
    colLayout,
    loading,
    saveForm,
    closeModal
  };
}
