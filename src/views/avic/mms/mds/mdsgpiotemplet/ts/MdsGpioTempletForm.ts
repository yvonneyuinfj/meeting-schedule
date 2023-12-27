import type { MdsGpioTempletDto } from '@/api/avic/mms/mds/MdsGpioTempletApi'; // 引入模块DTO
import { getMdsGpioTemplet, saveMdsGpioTemplet } from '@/api/avic/mms/mds/MdsGpioTempletApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsGpioTempletForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsGpioTempletDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    templetCode: [
      { required: true, message: '模板编号不能为空', trigger: 'change' }
    ],
    templetName: [
      { required: true, message: '模板名称不能为空', trigger: 'change' }
    ],
    templetType: [
      { required: true, message: '模板格式 不能为空', trigger: 'change' }
    ],
    templetClass: [
      { required: true, message: '模板分类不能为空', trigger: 'change' }
    ],
    templetVersion: [
      { required: true, message: '模板版本号不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    secModelType: [
      { required: true, message: '二级类型不能为空', trigger: 'change' }
    ],
    contractClass: [
      { required: true, message: '合同分类不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const templetTypeList = ref([]); // 模板格式 通用代码
  const templetClassList = ref([]); // 模板分类通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const secModelTypeList = ref([]); // 二级类型通用代码
  const contractClassList = ref([]); // 合同分类通用代码
  const standardContactFlagList = ref([]); // 是否标准模板通用代码
  const lookupParams = [
    { fieldName: 'templetType', lookUpType: 'MDS_GPIO_TEMPLET_TYPE' },
    { fieldName: 'templetClass', lookUpType: 'MDS_GPIO_TEMPLET_CLASS' },
    { fieldName: 'secModelType', lookUpType: 'PMS_SEC_MODEL_TYPE' },
    { fieldName: 'contractClass', lookUpType: 'MDS_CONTRACT_TYPE' },
    { fieldName: 'standardContactFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
    ];

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

  /** 获取通用代码  */
  function getLookupList () {
    proxy.$getLookupByType(lookupParams, result => {
    templetTypeList.value = result.templetType;
    templetClassList.value = result.templetClass;
    secModelTypeList.value = result.secModelType;
    contractClassList.value = result.contractClass;
    standardContactFlagList.value = result.standardContactFlag;
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
  function getFormData (id) {
    loading.value = true;
    getMdsGpioTemplet(id)
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
  function saveForm () {
    formRef.value
      .validate()
      .then( () => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveMdsGpioTemplet(postData)
          .then((res) => {
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
  function successCallback () {
    proxy.$message.success('保存成功！');
    emit('reloadData');
    emit('close');
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
    templetTypeList,
    templetClassList,
    secretLevelList,
    secModelTypeList,
    contractClassList,
    standardContactFlagList,
    saveForm,
    closeModal
  };
}


