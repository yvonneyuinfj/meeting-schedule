import type { WmsCheckRecordDto } from '@/api/avic/mms/wms/WmsCheckRecordApi'; // 引入模块DTO
import { getWmsCheckRecord, saveWmsCheckRecord } from '@/api/avic/mms/wms/WmsCheckRecordApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useWmsCheckRecordForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<WmsCheckRecordDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    originalOrderDetailId: [
      { required: true, message: '原始单据ID不能为空', trigger: 'change' }
    ],
    billSource: [
      { required: true, message: '单据类型不能为空', trigger: 'change' }
    ],
    checkSubmitType: [
      { required: true, message: '送检类型不能为空', trigger: 'change' }
    ],
    mdsItemId: [
      { required: true, message: '送检物料ID不能为空', trigger: 'change' }
    ],
    checkSubmitQty: [
      { required: true, message: '送检数量不能为空', trigger: 'change' }
    ],
    checkSubmitUserId: [
      { required: true, message: '送检人ID不能为空', trigger: 'change' }
    ],
    checkSubmitDeptId: [
      { required: true, message: '送检部门ID不能为空', trigger: 'change' }
    ],
    checkSubmitDate: [
      { required: true, message: '送检日期不能为空', trigger: 'change' }
    ],
    checkStatus: [
      { required: true, message: '检验状态不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级 不能为空', trigger: 'change' }
    ],
    wmsCheckNo: [
      { required: true, message: '送检单号不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2;; // 调用布局公共方法
  const loading = ref(false);
  const billSourceList = ref([]); // 单据类型通用代码
  const checkSubmitTypeList = ref([]); // 送检类型通用代码
  const checkStatusList = ref([]); // 检验状态通用代码
  const secretLevelList = ref([]); // 密级 通用代码
  const confineFlagList = ref([]); // 是否限用通用代码
    const lookupParams = [
    { fieldName: 'billSource', lookUpType: 'WMS_BILL_SOURCE' },
    { fieldName: 'checkSubmitType', lookUpType: 'WMS_CHECK_SUBMIT_TYPE' },
    { fieldName: 'checkStatus', lookUpType: 'WMS_CHECK_STATUS' },
    { fieldName: 'confineFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
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
    billSourceList.value = result.billSource;
    checkSubmitTypeList.value = result.checkSubmitType;
    checkStatusList.value = result.checkStatus;
    confineFlagList.value = result.confineFlag;
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
    getWmsCheckRecord (id)
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
    form.value.originalOrderTabName = props.mainId;
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveWmsCheckRecord (postData)
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
    billSourceList,
    checkSubmitTypeList,
    checkStatusList,
    secretLevelList,
    confineFlagList,
    saveForm,
    closeModal
  };
}

