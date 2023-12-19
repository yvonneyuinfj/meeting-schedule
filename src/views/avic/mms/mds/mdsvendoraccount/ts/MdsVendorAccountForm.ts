import type { MdsVendorAccountDto } from '@/api/avic/mms/mds/MdsVendorAccountApi'; // 引入模块DTO
import { getMdsVendorAccount, saveMdsVendorAccount } from '@/api/avic/mms/mds/MdsVendorAccountApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsVendorAccountForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsVendorAccountDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    bank: [
      { required: true, message: '开户行不能为空', trigger: 'change' }
    ],
    bankName: [
      { required: true, message: '开户行名称不能为空', trigger: 'change' }
    ],
    accountNo: [
      { required: true, message: '银行帐号不能为空', trigger: 'change' }
    ],
    accountName: [
      { required: true, message: '账户名称不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级 ^ 通用代码MMS_DATA_SECRET_LEVEL不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2;; // 调用布局公共方法
  const loading = ref(false);
  const accountAttributeList = ref([]); // 账户性质 ^ SRM_ACCOUNT_ATTRIBUTE:1-基本存款账户,2-一般存款账户,3-临时存款账户,4-专用存款账户通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const validFlagList = ref([]); // 是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效通用代码
    const lookupParams = [
    { fieldName: 'accountAttribute', lookUpType: 'MDS_ACCOUNT_ATTRIBUTE' },
    { fieldName: 'validFlag', lookUpType: 'PLATFORM_VALID_FLAG' }
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
    accountAttributeList.value = result.accountAttribute;
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
    getMdsVendorAccount (id)
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
    form.value.mdsVendorId = props.mainId;
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveMdsVendorAccount (postData)
          .then(res => {
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
    accountAttributeList,
    secretLevelList,
    validFlagList,
    saveForm,
    closeModal
  };
}

