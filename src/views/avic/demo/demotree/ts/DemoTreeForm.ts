import type { DemoTreeDto } from '@/api/avic/demo/DemoTreeApi'; // 引入模块DTO
import {
  getDemoTree,
  saveDemoTree,
  checkDemoUniqueUnique,
  basePath
} from '@/api/avic/demo/DemoTreeApi'; // 引入模块API

export const emits = ['afterAddTreeNode', 'afterEditTreeNode', 'close'];
export function useDemoTreeForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<DemoTreeDto>({
    parentId: props.parentId
  });
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
  const baseUrl = basePath; // 树选择组件的baseUrl
  const loading = ref(false);
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
  onMounted(() => {
    // 获取通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
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
    getDemoTree(id)
      .then(res => {
        if (res.success) {
          form.value = res.data;
          // 处理数据
          form.value.demoCheckbox = form.value.demoCheckbox?.split(';'); // 处理复选框数据
          form.value.demoSelectMultiple = form.value.demoSelectMultiple?.split(';'); // 处理多选下拉数据
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
        loading.value = true;
        const id = form.value.id;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        if (autoCode.value) {
          // 处理编码
          const codeResult = await autoCode.value.submitCode();
          postData.demoCode = codeResult.autoCodeValue;
        }
        postData.demoCheckbox = postData.demoCheckbox?.join(';'); // 处理复选框数据
        postData.demoSelectMultiple = postData.demoSelectMultiple?.join(';'); // 处理多选下拉数据
        // 发送请求
        saveDemoTree(postData)
          .then(res => {
            if (res.success) {
              if (id) {
                // 编辑
                emit('afterEditTreeNode', res.data);
              } else {
                // 添加
                emit('afterAddTreeNode', res.data);
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
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }
  /** 数据保存成功的回调 */
  function successCallback() {
    proxy.$message.success('保存成功！');
    emit('close');
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
  /** 重新加载详细页面 */
  function reloadDetail() {
    getFormData(props.formId);
  }
  watch(
    () => props.formId,
    newVal => {
      if (newVal) {
        // 编辑、详情页面加载数据
        getFormData(newVal);
        // 切换树节点时右侧表单定位至最上方
        document.querySelector('.avic-tree-select').scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      }
    },
    { immediate: true }
  );
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
    autoCode,
    baseUrl,
    saveForm,
    closeModal,
    reloadDetail
  };
}
