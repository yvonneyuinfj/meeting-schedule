import type { MdsCustomerDto } from '@/api/avic/mms/mds/MdsCustomerApi'; // 引入模块DTO
import { getMdsCustomer, saveMdsCustomer } from '@/api/avic/mms/mds/MdsCustomerApi'; // 引入模块API
import { MdsCustomerTypeDto, getMdsCustomerTypeAll } from '@/api/avic/mms/mds/MdsCustomerTypeApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsCustomerForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsCustomerDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    customerCode: [
      { required: true, message: '客户编码不能为空', trigger: 'change' }
    ],
    corporationUniqueCode: [
      { required: true, message: '企业编码不能为空', trigger: 'change' }
    ],
    customerName: [
      { required: true, message: '客户名称不能为空', trigger: 'change' }
    ],
    tel: [
      proxy.$validateRegExp('phone')
    ],
    tel2: [
      proxy.$validateRegExp('phone')
    ],
    tel3: [
      proxy.$validateRegExp('phone')
    ],
    url: [
      proxy.$validateRegExp('url')
    ],
    email: [
      proxy.$validateRegExp('email')
    ],
    payMode: [
      { required: true, message: '付款方式不能为空', trigger: 'change' }
    ],
    vendorQulityLevel: [
      { required: true, message: '质量等级不能为空', trigger: 'change' }
    ],
    corporationMode: [
      { required: true, message: '单位性质不能为空', trigger: 'change' }
    ],
    customerImport: [
      { required: true, message: '客户重要程度不能为空', trigger: 'change' }
    ],
    customerType: [
      { required: true, message: '单位类型不能为空', trigger: 'change' }
    ],
    riskResistable: [
      { required: true, message: '抗风险能力不能为空', trigger: 'change' }
    ],
    devAbility: [
      { required: true, message: '研发能力不能为空', trigger: 'change' }
    ],
    certificate: [
      { required: true, message: '客户认证不能为空', trigger: 'change' }
    ],
    qualityCreditId: [
      { required: true, message: '质量信誉不能为空', trigger: 'change' }
    ],
    ynReplace: [
      { required: true, message: '是否可替代不能为空', trigger: 'change' }
    ],
    deliveryChangeDeal: [
      { required: true, message: '交付期变化处理不能为空', trigger: 'change' }
    ],
    overAcceptDeal: [
      { required: true, message: '超出接受处理不能为空', trigger: 'change' }
    ],
    validFlag: [
      { required: true, message: '有效标识不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 密级通用代码
  const payModeList = ref([]); // 付款方式通用代码
  const vendorQulityLevelList = ref([]); // 质量等级通用代码
  const corporationModeList = ref([]); // 单位性质通用代码
  const customerImportList = ref([]); // 客户重要程度通用代码
  const customerTypeList = ref([]); // 单位类型通用代码
  const riskResistableList = ref([]); // 抗风险能力通用代码
  const devAbilityList = ref([]); // 研发能力通用代码
  const certificateList = ref([]); // 客户认证通用代码
  const qualityCreditIdList = ref([]); // 质量信誉通用代码
  const ynReplaceList = ref([]); // 是否可替代通用代码
  const deliveryChangeDealList = ref([]); // 交付期变化处理通用代码
  const overAcceptDealList = ref([]); // 超出接受处理通用代码
  const validFlagList = ref([]); // 有效标识通用代码
  const mdsCustomerTypeList = ref([])//客户类型 
  const lookupParams = [
    { fieldName: 'payMode', lookUpType: 'MDS_PAY_MODE' },
    { fieldName: 'vendorQulityLevel', lookUpType: 'MDS_VENDOR_QULITY_LEVEL' },
    { fieldName: 'corporationMode', lookUpType: 'MDS_CORPORATION_MODE' },
    { fieldName: 'customerImport', lookUpType: 'MDS_CUSTOMER_IMPORT' },
    { fieldName: 'customerType', lookUpType: 'MDS_CUSTOMER_TYPE' },
    { fieldName: 'riskResistable', lookUpType: 'MDS_RISK_RESISTABLE' },
    { fieldName: 'devAbility', lookUpType: 'MDS_DEV_ABILITY' },
    { fieldName: 'certificate', lookUpType: 'MDS_CERTIFICATE' },
    { fieldName: 'qualityCreditId', lookUpType: 'MDS_QUALITY_CREDIT_ID' },
    { fieldName: 'ynReplace', lookUpType: 'MDS_YN_REPLACE' },
    { fieldName: 'deliveryChangeDeal', lookUpType: 'MDS_DELIVERY_CHANGE_DEAL' },
    { fieldName: 'overAcceptDeal', lookUpType: 'MDS_OVER_ACCEPT_DEAL' },
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
    //加载客户类型数据
    getMdsCustomerTypeList();
  });


  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      payModeList.value = result.payMode;
      vendorQulityLevelList.value = result.vendorQulityLevel;
      corporationModeList.value = result.corporationMode;
      customerImportList.value = result.customerImport;
      customerTypeList.value = result.customerType;
      riskResistableList.value = result.riskResistable;
      devAbilityList.value = result.devAbility;
      certificateList.value = result.certificate;
      qualityCreditIdList.value = result.qualityCreditId;
      ynReplaceList.value = result.ynReplace;
      deliveryChangeDealList.value = result.deliveryChangeDeal;
      overAcceptDealList.value = result.overAcceptDeal;
      validFlagList.value = result.validFlag;
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
    getMdsCustomer(id)
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
        saveMdsCustomer(postData)
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
  /**获取客户类型信息*/
  const queryForm = ref<MdsCustomerTypeDto>({});
  const queryParam = reactive({
    // 请求表格数据参数
    pageParameter: {
      page: 1, // 页数
      rows: 20 // 每页条数
    },
    searchParams: {
      ...queryForm
    },
    keyWord: ref(''), // 快速查询数据
    sidx: null, // 排序字段
    sord: null // 排序方式: desc降序 asc升序
  });
  /**加载客户类型数据 */
  function getMdsCustomerTypeList() {
    loading.value = true;
    getMdsCustomerTypeAll(queryParam)
      .then(async (res) => {
        if (res.success) {
          mdsCustomerTypeList.value = res.data.result;;
          // 处理数据
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取客户类型失败！');
        loading.value = false;
      });
  }
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    secretLevelList,
    payModeList,
    vendorQulityLevelList,
    corporationModeList,
    customerImportList,
    customerTypeList,
    riskResistableList,
    devAbilityList,
    certificateList,
    qualityCreditIdList,
    ynReplaceList,
    deliveryChangeDealList,
    overAcceptDealList,
    validFlagList,
    saveForm,
    closeModal,
    mdsCustomerTypeList
  };
}

