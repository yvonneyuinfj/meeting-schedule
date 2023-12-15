import type { MdsInventoryConfigureDto } from '@/api/avic/mms/mds/MdsInventoryConfigureApi'; // 引入模块DTO
import { getMdsInventoryConfigure, saveMdsInventoryConfigure, listMdsInventoryConfigure, saveMdsInventoryConfigure2 } from '@/api/avic/mms/mds/MdsInventoryConfigureApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsInventoryConfigureForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsInventoryConfigureDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    balanceType: [
      { required: true, message: '库房盘点方法不能为空', trigger: 'change' }
    ],
    planBalanceFlag: [
      { required: true, message: '参与计划平衡标记不能为空', trigger: 'change' }
    ],
    fundCalculateFlag: [
      { required: true, message: '参与资金计算标记不能为空', trigger: 'change' }
    ],
    jitFlag: [
      { required: true, message: 'JIT库房标记不能为空', trigger: 'change' }
    ],
    purchaseBalanceFlag: [
      { required: true, message: '参与采购平衡标记不能为空', trigger: 'change' }
    ],
    filterFlag: [
      { required: true, message: '是否筛选不能为空', trigger: 'change' }
    ],
    minusQtyFlag: [
      { required: true, message: '是否允许有负库存不能为空', trigger: 'change' }
    ],
    consignmentFlag: [
      { required: true, message: '是否寄售库房不能为空', trigger: 'change' }
    ],
    ynInventoryMerge: [
      { required: true, message: '库存台帐合并标记不能为空', trigger: 'change' }
    ],
    ynOutApprove: [
      { required: true, message: '是否进行出库审批不能为空', trigger: 'change' }
    ],
    ynOutCheck: [
      { required: true, message: '是否进行出库检验不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    ynOilSealWarn: [
      { required: true, message: '是否参与油封期预警不能为空', trigger: 'change' }
    ],
    oilSealWarnDays: [
      { required: true, message: '油封期提前预警天数不能为空', trigger: 'change' }
    ],
    ynRecheckWarn: [
      { required: true, message: '是否参与复验期预警不能为空', trigger: 'change' }
    ],
    recheckWarnDays: [
      { required: true, message: '复验期提前预警天数不能为空', trigger: 'change' }
    ],
    ynEffectStockWarn: [
      { required: true, message: '是否参与保管期预警不能为空', trigger: 'change' }
    ],
    effectStockWarnDays: [
      { required: true, message: '保管期提前预警天数不能为空', trigger: 'change' }
    ],
    ynBacklogWarn: [
      { required: true, message: '是否参与积压预警不能为空', trigger: 'change' }
    ],
    backlogWarnDays: [
      { required: true, message: '积压提前预警天数不能为空', trigger: 'change' }
    ],
    ynOverstockWarn: [
      { required: true, message: '是否参与超储预警不能为空', trigger: 'change' }
    ],
    overstockWarnRatio: [
      { required: true, message: '超储警戒系数不能为空', trigger: 'change' }
    ],
    ynLackWarn: [
      { required: true, message: '是否参与缺货预警不能为空', trigger: 'change' }
    ],
    lackWarnRatio: [
      { required: true, message: '缺货警戒系数不能为空', trigger: 'change' }
    ],
    ynOrderPointWarn: [
      { required: true, message: '是否参与订货点预警不能为空', trigger: 'change' }
    ],
    orderPointWarnRatio: [
      { required: true, message: '订货点警戒系数不能为空', trigger: 'change' }
    ],
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout3; // 调用布局公共方法
  const loading = ref(false);
  const balanceTypeList = ref([]); // 库房盘点方法通用代码
  const yNFlagList = ref([]); // 是否通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const lookupParams = [
    { fieldName: 'balanceType', lookUpType: 'MDS_BALANCE_TYPE' },
    { fieldName: 'yNFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
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
      balanceTypeList.value = result.balanceType;
      yNFlagList.value = result.yNFlag;
    });
  }
  /** 获取当前用户对应的文档密级 */
  function getUserFileSecretList() {
    proxy.$getUserFileSecretLevelList(result => {
      secretLevelList.value = result;
    });
  }
  const queryParam = reactive({
    pageParameter: {
      page: 1, // 页数
      rows: 20 // 每页条数
    },
    // 请求表格数据参数
    searchParams: {
      mdsInventoryId: ''
    },
    keyWord: ref(''), // 快速查询数据
    sidx: null, // 排序字段
    sord: null // 排序方式: desc降序 asc升序
  });
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(mdsInventoryId) {
    loading.value = true;
    queryParam.searchParams.mdsInventoryId = mdsInventoryId ? mdsInventoryId : '-1';
    listMdsInventoryConfigure(queryParam)
      .then(async (res) => {
        if (res.success) {
          form.value = res.data || {};
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
        form.value.mdsInventoryId = props.formId;
        const postData = proxy.$lodash.cloneDeep(form.value);
        console.log(postData);
        // 发送请求
        saveMdsInventoryConfigure(postData)
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
    balanceTypeList,
    secretLevelList,
    yNFlagList,
    saveForm,
    closeModal
  };
}


