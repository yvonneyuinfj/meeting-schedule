import type { DemoTreegridDto } from '@/api/avic/demo/DemoTreegridApi'; // 引入模块DTO
import {
  getDemoTreegrid,
  saveDemoTreegrid,
  checkDemoUniqueUnique,
  basePath
} from '@/api/avic/demo/DemoTreegridApi'; // 引入模块API

export const emits = ['reloadData', 'close'];
export function useDemoTreegridForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<DemoTreegridDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    parentId: [{ required: true, message: '父节点id不能为空', trigger: 'change' }],
    demoNotnull: [{ required: true, message: '必填不能为空', trigger: 'change' }],
    demoTitle: [{ required: true, message: '节点名称不能为空', trigger: 'change' }],
    demoUnique: [
      { required: true, message: '唯一值不能为空', trigger: 'change' },
      { validator: (rule, value) => validateDemoUniqueUnique(rule, value), trigger: 'change' }
    ],
    demoUserId: [{ required: true, message: '用户不能为空', trigger: 'change' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'change' }],
    demoPhone: [proxy.$validateRegExp('phone')],
    demoEmail: [proxy.$validateRegExp('email')],
    demoWebsite: [proxy.$validateRegExp('url')],
    treeSort: [{ required: true, message: '排序号(本级)不能为空', trigger: 'change' }]
  };
  const layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const autoCode = ref(null); // 自动编码ref
  const secretLevelList = ref([]); // 密级通用代码
  const demoRadioList = ref([]); // 单选通用代码
  const demoRadioButtonList = ref([]); // 单选按钮组通用代码
  const demoCheckboxList = ref([]); // 复选通用代码
  const demoSelectList = ref([]); // 下拉通用代码
  const demoSelectMultipleList = ref([]); // 下拉多选通用代码
  const lookupParams = [
    { fieldName: 'demoRadio', lookUpType: 'PLATFORM_SEX' },
    { fieldName: 'demoRadioButton', lookUpType: 'CHECK_TYPE' },
    { fieldName: 'demoCheckbox', lookUpType: 'CHECK_TYPE' },
    { fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' },
    { fieldName: 'demoSelectMultiple', lookUpType: 'CHECK_TYPE' }
  ];
  const baseUrl = basePath; // 树选择组件的baseUrl

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
      demoRadioList.value = result.demoRadio;
      demoRadioButtonList.value = result.demoRadioButton;
      demoCheckboxList.value = result.demoCheckbox;
      demoSelectList.value = result.demoSelect;
      demoSelectMultipleList.value = result.demoSelectMultiple;
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
    getDemoTreegrid(id)
      .then(res => {
        if (res.success) {
          form.value = res.data;
          // 处理数据
          form.value.demoCheckbox = form.value.demoCheckbox?.toString()?.split(';'); // 处理复选框数据
          form.value.demoSelectMultiple = form.value.demoSelectMultiple?.toString()?.split(';'); // 处理多选下拉数据
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
      .then(async () => {
        // 附件密级校验
        const errorMessage = uploadFile.value.validateUploaderFileSecret(form.value.secretLevel);
        if (errorMessage) {
          return;
        }
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        postData.demoCheckbox = postData.demoCheckbox?.join(';'); // 处理复选框数据
        postData.demoSelectMultiple = postData.demoSelectMultiple?.join(';'); // 处理多选下拉数据
        postData.demoSwitch = postData.demoSwitch === 'Y' ? 'Y' : 'N'; // 处理开关
        if (autoCode.value) {
          // 处理编码
          const codeResult = await autoCode.value.submitCode();
          postData.demoCode = codeResult.autoCodeValue;
        }
        // 发送请求
        saveDemoTreegrid(postData)
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
    emit('reloadData', props.parentId);
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
  /** 异步校验唯一值唯一 */
  async function validateDemoUniqueUnique(rule, value) {
    if (value) {
      const res = await checkDemoUniqueUnique({
        demoUnique: value,
        id: props.formId || ''
      });
      if (res.success) {
        if (res.data) {
          return Promise.resolve();
        } else {
          return Promise.reject('唯一值已存在!');
        }
      } else {
        return Promise.reject('唯一值唯一性校验失败!');
      }
    } else {
      return Promise.resolve();
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
    demoRadioList,
    demoRadioButtonList,
    demoCheckboxList,
    demoSelectList,
    demoSelectMultipleList,
    secretLevelList,
    uploadFile,
    autoCode,
    baseUrl,
    saveForm,
    afterUploadEvent,
    closeModal
  };
}
