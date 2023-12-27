import type { WmsCamItemTransactionDto } from '@/api/avic/mms/wms/WmsCamItemTransactionApi'; // 引入模块DTO
import { getWmsCamItemTransaction, saveWmsCamItemTransaction } from '@/api/avic/mms/wms/WmsCamItemTransactionApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useWmsCamItemTransactionForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<WmsCamItemTransactionDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    transactionCode: [
      { required: true, message: '事务处理流水号不能为空', trigger: 'change' }
    ],
    billSource: [
      { required: true, message: '单据来源 ^ R-原材料 C-成品不能为空', trigger: 'change' }
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
  const uploadFile = ref(null); // 附件ref
  const billSourceList = ref([]); // 单据来源 ^ R-原材料 C-成品通用代码
  const ynRedBillList = ref([]); // 是否红单 ^ Y-红单,N-蓝单通用代码
  const invTransactStatusList = ref([]); // 库存事务状态^ D-登账,J-结转 ,B-调错（作废） 按此字段建立分区通用代码
  const urgentReleaseFlagList = ref([]); // 紧急放行标识^Y-是紧急放行、N-非紧急放行通用代码
  const certificationFlagList = ref([]); // 合格标记 Y合格，X限用，N不合格,0 无效通用代码
  const useLimitList = ref([]); // 限用条件 0 不限用；1单架限用；2 多架次限用；3多批次限用通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const mdsInvOperationTypeList = ref([]); // 操作类型 O-出库 ，I -入库通用代码
  const confineFlagList = ref([]); // 是否限用 YN_flag Y是 ,N 否通用代码
  const auditStatusList = ref([]); // 稽核状态，0未稽核，1稽核驳回，5已申请，10已稽核通用代码
  const billStatusList = ref([]); // 开票状态 0未开票 5已开票通用代码
  const writeOffStatusList = ref([]); // 核销状态 0未核销 5已核销 （是否已做发票）通用代码
  const writeOffTypeList = ref([]); // 核销类型 1.挂账核销 2.回冲核销 3.历史核销 4.供应商免费核销 5.顶账核销通用代码
  const settlementStatusList = ref([]); // 挂账状态 0未挂账 5挂账中 10已挂账通用代码
  const lookupParams = [
    { fieldName: 'billSource', lookUpType: 'MDS_ITEM_DATASOURCE ' },
    { fieldName: 'ynRedBill', lookUpType: 'WMS_YN_RED_BILL' },
    { fieldName: 'invTransactStatus', lookUpType: 'WMS_INV_TRANSACT_STATUS' },
    { fieldName: 'urgentReleaseFlag', lookUpType: 'WMS_URGENT_RELEASE_FLAG' },
    { fieldName: 'certificationFlag', lookUpType: 'WMS_CERTIFICATION_FLAG' },
    { fieldName: 'useLimit', lookUpType: 'WMS_USE_LIMIT' },
    { fieldName: 'mdsInvOperationType', lookUpType: 'WMS_OPERATION_TYPE' },
    { fieldName: 'confineFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'auditStatus', lookUpType: 'WMS_AUDIT_STATUS' },
    { fieldName: 'billStatus', lookUpType: 'WMS_BILL_STATUS' },
    { fieldName: 'writeOffStatus', lookUpType: 'WMS_WRITE_OFF_STATUS' },
    { fieldName: 'writeOffType', lookUpType: 'WMS_WRITE_OFF_TYPE' },
    { fieldName: 'settlementStatus', lookUpType: 'WMS_SETTLEMENT_STATUS' }
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
    ynRedBillList.value = result.ynRedBill;
    invTransactStatusList.value = result.invTransactStatus;
    urgentReleaseFlagList.value = result.urgentReleaseFlag;
    certificationFlagList.value = result.certificationFlag;
    useLimitList.value = result.useLimit;
    mdsInvOperationTypeList.value = result.mdsInvOperationType;
    confineFlagList.value = result.confineFlag;
    auditStatusList.value = result.auditStatus;
    billStatusList.value = result.billStatus;
    writeOffStatusList.value = result.writeOffStatus;
    writeOffTypeList.value = result.writeOffType;
    settlementStatusList.value = result.settlementStatus;
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
    getWmsCamItemTransaction(id)
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
        saveWmsCamItemTransaction(postData)
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
    ynRedBillList,
    invTransactStatusList,
    urgentReleaseFlagList,
    certificationFlagList,
    useLimitList,
    secretLevelList,
    mdsInvOperationTypeList,
    confineFlagList,
    auditStatusList,
    billStatusList,
    writeOffStatusList,
    writeOffTypeList,
    settlementStatusList,
    uploadFile,
    afterUploadEvent,
    saveForm,
    closeModal
  };
}


