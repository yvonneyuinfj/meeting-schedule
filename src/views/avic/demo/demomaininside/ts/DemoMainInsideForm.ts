import type { DemoMainInsideDto } from '@/api/avic/demo/DemoMainInsideApi'; //引入模块DTO
import {
  getDemoMainInside,
  saveDemoMainInside,
  checkDemoUniqueUnique
} from '@/api/avic/demo/DemoMainInsideApi'; // 引入模块API
import { createEditor } from '@wangeditor/editor'; // 引入富文本依赖
import { useRichText } from '@/utils/hooks/useRichText'; // 引入富文本相关配置及方法

export const emits = ['reloadData', 'close'];
export function useDemoMainInsideForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<DemoMainInsideDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    demoNotnull: [{ required: true, message: '必填不能为空', trigger: 'blur' }],
    demoUserId: [{ required: true, message: '用户不能为空', trigger: 'blur' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'blur' }],
    demoPhone: [proxy.$validateRegExp('phone')],
    demoEmail: [proxy.$validateRegExp('email')],
    demoWebsite: [proxy.$validateRegExp('url')],
    demoUnique: [
      { validator: (rule, value) => validateDemoUniqueUnique(rule, value), trigger: 'change' }
    ]
  };
  const richtextDetail = ref();
  const demoSubInsideEdit = ref();
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const autoCode = ref(null); // 自动编码
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
  const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
  const { toolbarConfig, editorConfig, onCreated, dealRichText, convertImageSrc } = useRichText(
    editorRef,
    'demoMainInsideDemoRichText',
    'demoMainInside'
  );
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
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
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
    getDemoMainInside(id)
      .then(async res => {
        if (res.success) {
          form.value = res.data;
          // 处理数据
          form.value.demoCheckbox = form.value.demoCheckbox?.toString()?.split(';'); // 处理复选框数据
          form.value.demoSelectMultiple = form.value.demoSelectMultiple?.toString()?.split(';'); // 处理多选下拉数据
          // 处理富文本
          await dealRichText(form.value.demoRichtext);
          // 详情表单 富文本不可编辑
          if (richtextDetail.value) {
            editorRef.value.disable();
          }
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
        demoSubInsideEdit.value
          .validate(async validate => {
            if (!validate) {
              return;
            }
            // 附件密级校验
            const errorMessage = uploadFile.value.validateUploaderFileSecret(
              form.value.secretLevel
            );
            if (errorMessage) {
              return;
            }
            loading.value = true;
            const subInfoList = demoSubInsideEdit.value.getChangedData(); // 获取子表数据
            // 处理数据
            const postData = proxy.$lodash.cloneDeep(form.value);
            postData.demoCheckbox = postData.demoCheckbox?.join(';'); // 处理复选框数据
            postData.demoSelectMultiple = postData.demoSelectMultiple?.join(';'); // 处理多选下拉数据
            postData.demoSwitch = postData.demoSwitch === 'Y' ? 'Y' : 'N'; // 处理开关
            postData.demoSubInsideList = subInfoList; //挂载子表数据
            if (autoCode.value) {
              // 处理编码
              const codeResult = await autoCode.value.submitCode();
              postData.demoCode = codeResult.autoCodeValue;
            }
            // 处理富文本
            const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
            convertImageSrc(editorHtmljsonCopy);
            const newEditor = createEditor({ content: editorHtmljsonCopy });
            const newEditorHtml = newEditor.getHtml();
            postData.demoRichtext = newEditorHtml;
            // 发送请求
            saveDemoMainInside(postData)
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
            console.log('error', error);
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
    toolbarConfig,
    editorConfig,
    editorRef,
    onCreated,
    saveForm,
    afterUploadEvent,
    closeModal,
    richtextDetail,
    demoSubInsideEdit
  };
}
