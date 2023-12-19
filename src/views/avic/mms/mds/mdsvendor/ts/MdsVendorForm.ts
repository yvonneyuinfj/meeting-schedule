import type { MdsVendorDto } from '@/api/avic/mms/mds/MdsVendorApi'; // 引入模块DTO
import { getMdsVendor, saveMdsVendor } from '@/api/avic/mms/mds/MdsVendorApi'; // 引入模块API

export const emits = ['reloadData', 'close'];
export function useMdsVendorForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsVendorDto>({});
  const mdsVendorAccountEdit = ref();
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    vendorCode: [
      { required: true, message: '供应商编码不能为空', trigger: 'change' }
    ],
    vendorName: [
      { required: true, message: '企业名称不能为空', trigger: 'change' }
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
  const corporationModeList = ref([]); // 企业性质分类 ^ SRM_CORPORATION_MODE:1-国家行政企业，2-公司合作企业，3-中外合资企业，4-社会组织机构，5-国际组织机构，6-外资企业，7-私营企业，8-集体企业，9-国防军事企业通用代码
  const ynInternalList = ref([]); // 是否集团内 ^ YN_FLAG:Y-是,N-否 ->GYS_LX 01集团内 02集团外通用代码
  const businessTypeList = ref([]); // 供应商所属行业 ^ SRM_BUSINESS_TYPE:1-航空，2-航天，3-兵器，4-船舶，10-其他通用代码
  const vendorLevelList = ref([]); // 供应商等级 ^ SRM_VENDOR_LEVEL:0-I,1-II,2-III通用代码
  const taxpayerTypeList = ref([]); // 纳税人身份 ^ SRM_TAXPAYER_TYPE:0-一般纳税人；1-小规模纳税人通用代码
  const vendorTypeList = ref([]); // 供应商性质分类 ^ SRM_VENDOR_TYPE: 1-经销商,2-制造商,3-其他； 通用代码
  const validFlagList = ref([]); // 是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效通用代码
  const vendorApproveTypeList = ref([]); // 批准状态 ^ SRM_VENDOR_APPROVE_TYPE：0-不批准；1-批准；2-有条件批准；3-一次性批准通用代码
  const ynEligibilityList = ref([]); // 是否合格供应商 ^ YN_FLAG:Y-是,N-否通用代码
  const selfUnitFlagList = ref([]); // 本单位标识 ^ SRM_SELF_UNIT_FLAG:0-本单位，1-非本单位通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const useModuleList = ref([]); // 使用单位（SF）使用单位（SF）A1器材 A2零供通用代码
  const vendorCategoryList = ref([]); // 供应商类别 ^ 多选，以“,”分隔；SRM_VENDOR_CATEGORY: 1-一类,2-二类,3-三类,4-二类（海），三类（空）通用代码
  const lookupParams = [
    { fieldName: 'corporationMode', lookUpType: 'MDS_CORPORATION_MODE_QY' },
    { fieldName: 'ynInternal', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'businessType', lookUpType: 'MDS_BUSINESS_TYPE' },
    { fieldName: 'vendorLevel', lookUpType: 'MDS_VENDOR_LEVEL' },
    { fieldName: 'taxpayerType', lookUpType: 'MDS_TAXPAYER_TYPE' },
    { fieldName: 'vendorType', lookUpType: 'MDS_VENDOR_TYPE' },
    { fieldName: 'validFlag', lookUpType: 'PLATFORM_VALID_FLAG' },
    { fieldName: 'vendorApproveType', lookUpType: 'MDS_VENDOR_APPROVE_TYPE' },
    { fieldName: 'ynEligibility', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'selfUnitFlag', lookUpType: 'MDS_SELF_UNIT_FLAG' },
    { fieldName: 'useModule', lookUpType: 'MDS_USE_MODULE' },
    { fieldName: 'vendorCategory', lookUpType: 'MDS_VENDOR_CATEGORY' }
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
    corporationModeList.value = result.corporationMode;
    ynInternalList.value = result.ynInternal;
    businessTypeList.value = result.businessType;
    vendorLevelList.value = result.vendorLevel;
    taxpayerTypeList.value = result.taxpayerType;
    vendorTypeList.value = result.vendorType;
    validFlagList.value = result.validFlag;
    vendorApproveTypeList.value = result.vendorApproveType;
    ynEligibilityList.value = result.ynEligibility;
    selfUnitFlagList.value = result.selfUnitFlag;
    useModuleList.value = result.useModule;
    vendorCategoryList.value = result.vendorCategory;
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
    getMdsVendor(id)
      .then(async res => {
        if (res.success) {
          form.value = res.data;
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
      .then(() => {
        mdsVendorAccountEdit.value
          .validate(async validate => {
            if (!validate) {
              return;
            }
            loading.value = true;
            const subInfoList = mdsVendorAccountEdit.value.getChangedData(); // 获取子表数据
            // 处理数据
            const postData = proxy.$lodash.cloneDeep(form.value);
            postData.mdsVendorAccountList = subInfoList; // 挂载子表数据
            // 发送请求
            saveMdsVendor(postData)
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
            console.log('error', error);
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
    corporationModeList,
    ynInternalList,
    businessTypeList,
    vendorLevelList,
    taxpayerTypeList,
    vendorTypeList,
    validFlagList,
    vendorApproveTypeList,
    ynEligibilityList,
    selfUnitFlagList,
    secretLevelList,
    useModuleList,
    vendorCategoryList,
    saveForm,
    closeModal,
    mdsVendorAccountEdit
  };
}


