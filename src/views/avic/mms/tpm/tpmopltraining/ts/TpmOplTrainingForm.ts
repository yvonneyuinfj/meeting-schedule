import type { TpmOplTrainingDto } from '@/api/avic/mms/tpm/TpmOplTrainingApi'; // 引入模块DTO
import { getTpmOplTraining, saveTpmOplTraining } from '@/api/avic/mms/tpm/TpmOplTrainingApi'; // 引入模块API
import { createEditor } from '@wangeditor/editor'; // 引入富文本依赖
import { useRichText } from '@/utils/hooks/useRichText'; // 引入富文本相关配置及方法
export const emits = ['reloadData', 'close'];
import {useUserStore} from "@/store/user";

export function useTpmOplTrainingForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<TpmOplTrainingDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    billNo: [
      { required: true, message: '活动编号不能为空', trigger: 'change' }
    ],
    oplDeptId: [
      { required: true, message: '培训单位ID不能为空', trigger: 'change' }
    ],
    subject: [
      { required: true, message: '主题不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    groupName: [
      { required: true, message: '小组名称不能为空', trigger: 'change' }
    ],
    subjectCategory: [
      { required: true, message: '课题分类不能为空', trigger: 'change' }
    ],
    trainingDate: [
      { required: true, message: '培训时间不能为空', trigger: 'change' }
    ],
    // trainingPurpose: [
    //   { required: true, message: '培训目的不能为空', trigger: 'change' }
    // ],
    trainingFocus: [
      { required: true, message: '培训要点不能为空', trigger: 'change' }
    ],
    lecturerUserId: [
      { required: true, message: '讲师姓名不能为空', trigger: 'change' }
    ],
    trainingPersonId: [
      { required: true, message: '培训人员不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout3; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const editorRef = shallowRef(null); // 编辑器实例，必须用 shallowRef
  const subjectCategoryList = ref([]); // 课题分类通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const userStore = useUserStore();
  const lookupParams = [
    { fieldName: 'subjectCategory', lookUpType: 'TPM_OPL_SUBJECT_CATEGORY' }
    ];

  const {
    toolbarConfig,
    editorConfig,
    onCreated,
    dealRichText,
    convertImageSrc
  } = useRichText(
    editorRef,
    'tpmOplTrainingProblemDescription',
    'tpmOplTraining'
  );

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId, props.infoStatus);
    } else {
      form.value.editUserId = userStore.userInfo.id;
      form.value.editUserName = userStore.userInfo.name;
      form.value.oplDeptId = userStore.userInfo.deptId;
      form.value.oplDeptName = userStore.userInfo.deptName;
      form.value.oplDeptIdAlias = userStore.userInfo.deptName;
    }
  });

  /** 获取通用代码  */
  function getLookupList () {
    proxy.$getLookupByType(lookupParams, result => {
    subjectCategoryList.value = result.subjectCategory;
    });
  }
  /** 获取当前用户对应的文档密级 */
  function getUserFileSecretList () {
    proxy.$getUserFileSecretLevelList(result => {
      secretLevelList.value = result;
    });
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData (id, infoStatus) {
    loading.value = true;
    getTpmOplTraining(id)
      .then(async (res) => {
        if (res.success) {
          form.value = res.data;
          form.value.subjectCategory = form.value.subjectCategory.split(',');
          // 处理富文本
          await dealRichText(form.value.trainingPurpose);
          if (infoStatus == 'detail'){
            editorRef.value.disable();
          }
          // 处理数据
          loading.value = false;
        }
      })
      .catch((e) => {
        alert(e)
        proxy.$message.warning('获取表单数据失败！');
        loading.value = false;
      });
  }
  /** 保存 */
  function saveForm () {
    formRef.value
      .validate()
      .then( () => {
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
        // 处理富文本
        const editorHtmljsonCopy = proxy.$lodash.cloneDeep(editorRef.value.children);
        convertImageSrc(editorHtmljsonCopy);
        const newEditor = createEditor({ content: editorHtmljsonCopy });
        const newEditorHtml = newEditor.getHtml();
        //处理富文本
        postData.trainingPurpose = newEditorHtml;
        postData.subjectCategory = postData.subjectCategory.join(',');
        // 发送请求
        saveTpmOplTraining(postData)
          .then((res) => {
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
  function successCallback () {
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
  function closeModal () {
    emit('close');
  }
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    subjectCategoryList,
    secretLevelList,
    uploadFile,
    toolbarConfig,
    editorConfig,
    editorRef,
    onCreated,
    afterUploadEvent,
    saveForm,
    closeModal
  };
}


