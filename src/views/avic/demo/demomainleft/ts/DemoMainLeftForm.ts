import type { DemoMainDto } from '@/api/avic/demo/DemoMainApi'; // 引入模块DTO
import { getDemoMain, saveDemoMain } from '@/api/avic/demo/DemoMainApi'; // 引入模块API

export const emits = ['reloadData', 'close'];
export function useDemoMainLeftForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<DemoMainDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    projectClassCode: [{ required: true, message: '项目分类编号不能为空', trigger: 'blur' }],
    projectClassName: [{ required: true, message: '项目分类名称不能为空', trigger: 'blur' }],
    projectClassLevel: [{ required: true, message: '项目分类级别不能为空', trigger: 'change' }],
    projectClassManager: [{ required: true, message: '项目分类管理员不能为空', trigger: 'blur' }],
    projectClassStatus: [{ required: true, message: '项目分类状态不能为空', trigger: 'change' }],
    projectClassDate: [{ required: true, message: '项目分类维护时间不能为空', trigger: 'change' }],
    projectClassOrder: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'change' }]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null);
  const secretLevelList = ref([]); // 密级通用代码
  const projectClassStatusList = ref([]); // 项目分类状态通用代码
  const projectClassLevelList = ref([]); // 项目分类级别通用代码
  const lookupParams = [
    // 通用代码请求参数
    { fieldName: 'projectClassLevel', lookUpType: 'MPM_PROJECT_CLASS_LEVEL' },
    { fieldName: 'projectClassStatus', lookUpType: 'MPM_PROJECT_STATUS' }
  ];

  onMounted(() => {
    // 获取页面通用代码
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
      projectClassLevelList.value = result.projectClassLevel;
      projectClassStatusList.value = result.projectClassStatus;
    });
  }
  /** 获取当前用户对应的文档密级 */
  function getUserFileSecretList() {
    proxy.$getUserFileSecretLevelList(result => {
      secretLevelList.value = result;
    });
  }
  /**
   *  编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id) {
    loading.value = true;
    getDemoMain(id)
      .then(res => {
        if (res.success) {
          form.value = res.data;
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
        saveDemoMain(postData)
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
    projectClassStatusList,
    projectClassLevelList,
    secretLevelList,
    uploadFile,
    saveForm,
    afterUploadEvent,
    closeModal
  };
}
