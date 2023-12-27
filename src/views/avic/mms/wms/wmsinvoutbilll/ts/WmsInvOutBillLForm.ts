import type { WmsInvOutBillLDto } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块DTO
import { getWmsInvOutBillL, saveWmsInvOutBillL } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useWmsInvOutBillLForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<WmsInvOutBillLDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    wmsInvOutBillId: [
      { required: true, message: '申请单主表ID不能为空', trigger: 'change' }
    ],
    outBillLStatus: [
      { required: true, message: '单据状态不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const ynCloseList = ref([]); // 是否关闭 通用代码
  const cuttingFlagList = ref([]); // 是否下料通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const otherSysFlagList = ref([]); // 是否资源选择其它系统通用代码
  const ynInstallFlagList = ref([]); // 是否上机标识通用代码
  const outBillLStatusList = ref([]);//单据状态通用代码
  const lookupParams = [
    { fieldName: 'ynClose', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'cuttingFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'otherSysFlag', lookUpType: 'YN_FLAG' },
    { fieldName: 'ynInstallFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'outBillLStatus', lookUpType: 'WMS_OUT_BILL_L_STATUS' }
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
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      ynCloseList.value = result.ynClose;
      cuttingFlagList.value = result.cuttingFlag;
      otherSysFlagList.value = result.otherSysFlag;
      ynInstallFlagList.value = result.ynInstallFlag;
      outBillLStatusList.value = result.outBillLStatus;
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
    getWmsInvOutBillL(id)
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
  function saveForm() {
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        saveWmsInvOutBillL(postData)
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
  function successCallback() {
    proxy.$message.success('保存成功！');
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
    rules,
    layout,
    colLayout,
    loading,
    ynCloseList,
    cuttingFlagList,
    secretLevelList,
    otherSysFlagList,
    ynInstallFlagList,
    outBillLStatusList,
    saveForm,
    closeModal
  };
}

