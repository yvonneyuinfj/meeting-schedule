import type { WmsCamItemInventoryDto } from '@/api/avic/mms/wms/WmsCamItemInventoryApi'; // 引入模块DTO
import { getWmsCamItemInventory, saveWmsCamItemInventory } from '@/api/avic/mms/wms/WmsCamItemInventoryApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useWmsCamItemInventoryForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<WmsCamItemInventoryDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
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
  const uploadFile = ref(null); // 附件ref
  const billSourceList = ref([]); // 单据来源 ^ R-原材料,C-成品通用代码
  const inventoryStatusList = ref([]); // 库存状态 ^“1-正常，0-冻结，2-异常通用代码
  const lockReasonList = ref([]); // 冻结原因 ^“1-盘点中，2-油封处理中，3-复验处理中，4-保管期处理中通用代码
  const abnormalReasonList = ref([]); // 异常原因 ^1-复验不合格，2-超最长保管期通用代码
  const certificationFlagList = ref([]); // 合格标记 Y合格，X限用，N不合格,0 无效通用代码
  const useLimitList = ref([]); // 限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const confineFlagList = ref([]); // 是否限用 YN_flag Y是 ,N 否通用代码
  const materialStatusList = ref([]); // 材料状态 1 标准料 ，2 下料中 ，3 余料通用代码
  const lookupParams = [
    { fieldName: 'billSource', lookUpType: 'WMS_BILL_SOURCE' },
    { fieldName: 'inventoryStatus', lookUpType: 'WMS_INVENTORY_STATUS' },
    { fieldName: 'lockReason', lookUpType: 'WMS_LOCK_REASON' },
    { fieldName: 'abnormalReason', lookUpType: 'WMS_ABNORMAL_REASON' },
    { fieldName: 'certificationFlag', lookUpType: 'WMS_CERTIFICATION_FLAG' },
    { fieldName: 'useLimit', lookUpType: 'WMS_USE_LIMIT' },
    { fieldName: 'confineFlag', lookUpType: 'PLATFORM_VALID_FLAG' },
    { fieldName: 'materialStatus', lookUpType: '	WMS_MATERIAL_STATUS_CL' }
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
    inventoryStatusList.value = result.inventoryStatus;
    lockReasonList.value = result.lockReason;
    abnormalReasonList.value = result.abnormalReason;
    certificationFlagList.value = result.certificationFlag;
    useLimitList.value = result.useLimit;
    confineFlagList.value = result.confineFlag;
    materialStatusList.value = result.materialStatus;
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
    getWmsCamItemInventory(id)
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
        // 发送请求
        saveWmsCamItemInventory(postData)
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
    billSourceList,
    inventoryStatusList,
    lockReasonList,
    abnormalReasonList,
    certificationFlagList,
    useLimitList,
    secretLevelList,
    confineFlagList,
    materialStatusList,
    uploadFile,
    afterUploadEvent,
    saveForm,
    closeModal
  };
}


