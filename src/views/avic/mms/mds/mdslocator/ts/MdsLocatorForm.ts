import type { MdsLocatorDto } from '@/api/avic/mms/mds/MdsLocatorApi'; // 引入模块DTO
import { getMdsLocator, saveMdsLocator } from '@/api/avic/mms/mds/MdsLocatorApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsLocatorForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsLocatorDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    mdsInventoryId: [
      { required: true, message: '库房ID ^不能为空', trigger: 'change' }
    ],
    locatorNo: [
      { required: true, message: '库位号 ^ 有层架位的代码规则不能为空', trigger: 'change' }
    ],
    locatorType: [
      { required: true, message: '库位类型 ^ 0-常规库位；1-灵活库位不能为空', trigger: 'change' }
    ],
    validFlag: [
      { required: true, message: '库位是否有效 ^ 0-无效；1-有效不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级 ^ 通用代码MMS_DATA_SECRET_LEVEL不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const locatorTypeList = ref([]); // 库位类型 ^ 0-常规库位；1-灵活库位通用代码
  const placeTypeList = ref([]); // 区域类型 ^ 新增字段,表示对应实际库房的区、排、架、层、位通用代码
  const validFlagList = ref([]); // 库位是否有效 ^ 0-无效；1-有效通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const lookupParams = [
    { fieldName: 'locatorType', lookUpType: 'MDS_LOCATOR_TYPE' },
    { fieldName: 'placeType', lookUpType: 'MDS_PLACE_TYPE' },
    { fieldName: 'validFlag', lookUpType: 'MDS_VAILD_FLAG' }
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
    locatorTypeList.value = result.locatorType;
    placeTypeList.value = result.placeType;
    validFlagList.value = result.validFlag;
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
    getMdsLocator(id)
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
        saveMdsLocator(postData)
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
    locatorTypeList,
    placeTypeList,
    validFlagList,
    secretLevelList,
    saveForm,
    closeModal
  };
}


