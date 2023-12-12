import type { MdsInventoryTransactionDto } from '@/api/avic/mms/mds/MdsInventoryTransactionApi'; // 引入模块DTO
import { getMdsInventoryTransaction, saveMdsInventoryTransaction } from '@/api/avic/mms/mds/MdsInventoryTransactionApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsInventoryTransactionForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsInventoryTransactionDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    invTransactTypeCode: [
      { required: true, message: '库存事务处理类型代码不能为空', trigger: 'change' }
    ],
    operationSource: [
      { required: true, message: '操作来源代码 ^ C --采购; S--生产; K--库存; X--销售; P--配套; I--零星; J--JIT; D--调换; T--退货; Z--建帐; Y--移库; L--领用; W--维修;B--报废;不能为空', trigger: 'change' }
    ],
    operationType: [
      { required: true, message: '操作类型代码 ^ O --出库;   I--入库不能为空', trigger: 'change' }
    ],
    keepAccountFlag: [
      { required: true, message: '是否登帐标记 ^ 不能为空', trigger: 'change' }
    ],
    changeInvQtyFlag: [
      { required: true, message: '库房总数量变化标记 ^+ --增加；- --减少；0 --不变不能为空', trigger: 'change' }
    ],
    prefixCode: [
      { required: true, message: '单据前缀代码 ^ 事务号前缀，用来生成事务处理单据号不能为空', trigger: 'change' }
    ],
    ynOutApprove: [
      { required: true, message: '是否进行出库审批不能为空', trigger: 'change' }
    ],
    ynOutCheck: [
      { required: true, message: '是否进行出库检验不能为空', trigger: 'change' }
    ],
    validFlag: [
      { required: true, message: '有效标记^ 0-无效；1-有效不能为空', trigger: 'change' }
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
  const operationSourceList = ref([]); // 操作来源代码 ^ C --采购; S--生产; K--库存; X--销售; P--配套; I--零星; J--JIT; D--调换; T--退货; Z--建帐; Y--移库; L--领用; W--维修;B--报废;通用代码
  const operationTypeList = ref([]); // 操作类型代码 ^ O --出库;   I--入库通用代码
  const keepAccountFlagList = ref([]); // 是否登帐标记 ^ 通用代码
  const changeInvQtyFlagList = ref([]); // 库房总数量变化标记 ^+ --增加；- --减少；0 --不变通用代码
  const changeSumupInQtyFlagList = ref([]); // 累计入库量变化标记 ^+ --增加；- --减少；0 --不变通用代码
  const changeSumupOutQtyFlagList = ref([]); // 累计出库量变化标记 ^+ --增加；- --减少；0 --不变通用代码
  const changeAllocatedQtyFlagList = ref([]); // 已分配量变化标记 ^+ --增加；- --减少；0 --不变通用代码
  const ynOutApproveList = ref([]); // 是否进行出库审批通用代码
  const ynOutCheckList = ref([]); // 是否进行出库检验通用代码
  const validFlagList = ref([]); // 有效标记^ 0-无效；1-有效通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const lookupParams = [
    { fieldName: 'operationSource', lookUpType: 'TRANSACTION_OPERATION_SOURCE' },
    { fieldName: 'operationType', lookUpType: 'TRANSACTION_OPERATION_TYPE' },
    { fieldName: 'keepAccountFlag', lookUpType: 'TRANSACTION_KEEP_ACCOUNT_FLAG' },
    { fieldName: 'changeInvQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
    { fieldName: 'changeSumupInQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
    { fieldName: 'changeSumupOutQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
    { fieldName: 'changeAllocatedQtyFlag', lookUpType: 'TRANSACTION_QTY_FLAG' },
    { fieldName: 'ynOutApprove', lookUpType: 'TRANSACTION_KEEP_ACCOUNT_FLAG' },
    { fieldName: 'ynOutCheck', lookUpType: 'TRANSACTION_KEEP_ACCOUNT_FLAG' },
    { fieldName: 'validFlag', lookUpType: 'TRANSACTION_VALID_FLAG' }
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
    operationSourceList.value = result.operationSource;
    operationTypeList.value = result.operationType;
    keepAccountFlagList.value = result.keepAccountFlag;
    changeInvQtyFlagList.value = result.changeInvQtyFlag;
    changeSumupInQtyFlagList.value = result.changeSumupInQtyFlag;
    changeSumupOutQtyFlagList.value = result.changeSumupOutQtyFlag;
    changeAllocatedQtyFlagList.value = result.changeAllocatedQtyFlag;
    ynOutApproveList.value = result.ynOutApprove;
    ynOutCheckList.value = result.ynOutCheck;
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
    getMdsInventoryTransaction(id)
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
        saveMdsInventoryTransaction(postData)
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
    operationSourceList,
    operationTypeList,
    keepAccountFlagList,
    changeInvQtyFlagList,
    changeSumupInQtyFlagList,
    changeSumupOutQtyFlagList,
    changeAllocatedQtyFlagList,
    ynOutApproveList,
    ynOutCheckList,
    validFlagList,
    secretLevelList,
    saveForm,
    closeModal
  };
}


