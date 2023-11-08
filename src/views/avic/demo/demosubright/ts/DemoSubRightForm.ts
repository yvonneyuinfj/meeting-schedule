import { getDemoSub, saveDemoSub } from '@/api/avic/demo/DemoSubApi'; // 引入模块API
import type { DemoSubDto } from '@/api/avic/demo/DemoSubApi';

export const emits = ['reloadData', 'close'];
export function useDemoSubRightForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<DemoSubDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    projectCode: [{ required: true, message: '项目分类编号不能为空', trigger: 'blur' }],
    projectName: [{ required: true, message: '项目分类名称不能为空', trigger: 'blur' }],
    projectManager: [{ required: true, message: '项目分类管理员不能为空', trigger: 'blur' }],
    projectStatus: [{ required: true, message: '项目分类状态不能为空', trigger: 'change' }],
    projectDate: [{ required: true, message: '项目分类维护时间不能为空', trigger: 'change' }],
    projectOrder: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'change' }]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const secretLevelList = ref([]); // 密级通用代码
  const projectStatusList = ref([]); // 项目状态通用代码
  const projectTechsList = ref([]); // 项目信息通用代码
  const projectSecretList = ref([]); // 项目密级通用代码
  const lookupParams = [
    { fieldName: 'projectTechs', lookUpType: 'MPM_PROJECT_TECHS' },
    { fieldName: 'projectStatus', lookUpType: 'MPM_PROJECT_STATUS' }
  ];

  onMounted(() => {
    // 获取通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

  /** 获取通用代码 */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      projectTechsList.value = result.projectTechs;
      projectStatusList.value = result.projectStatus;
      secretLevelList.value = result.projectSecret;
    });
  }
  /** 获取当前用户对应的文档密级  */
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
    getDemoSub(id)
      .then(res => {
        if (res.success) {
          form.value = res.data;
          // 处理数据
          form.value.projectTechs = form.value.projectTechs?.split(';'); // 处理复选框数据
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
    form.value.projectClassId = props.mainId;
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        postData.projectTechs = postData.projectTechs?.join(';'); // 处理复选框数据
        // 发送请求
        saveDemoSub(postData)
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
    proxy.$message.success('附件保存失败！');
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
    uploadFile,
    projectStatusList,
    projectTechsList,
    projectSecretList,
    secretLevelList,
    saveForm,
    closeModal,
    afterUploadEvent
  };
}
