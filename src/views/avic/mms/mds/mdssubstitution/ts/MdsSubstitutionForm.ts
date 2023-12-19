import type { MdsSubstitutionDto } from '@/api/avic/mms/mds/MdsSubstitutionApi'; // 引入模块DTO
import { getMdsSubstitution, saveMdsSubstitution } from '@/api/avic/mms/mds/MdsSubstitutionApi'; // 引入模块API

export const emits = ['reloadData', 'close'];
export function useMdsSubstitutionForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsSubstitutionDto>({});
  const mdsSubstitutionLEdit = ref();
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    substitutionNo: [
      { required: true, message: '单号不能为空', trigger: 'change' }
    ],
    billType: [
      { required: true, message: '类型  ^0-长期代料，1-临时代料不能为空', trigger: 'change' }
    ],
    // substitutionType: [
    //   { required: true, message: '代料关系分类 ^ G-代料单，E-等效代料，S-规格代料不能为空', trigger: 'change' }
    // ],
    substitutionItemId: [
      { required: true, message: '替代物料ID不能为空', trigger: 'change' }
    ],
    effectiveType: [
      { required: true, message: '生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制不能为空', trigger: 'change' }
    ],
    // status: [
    //   { required: true, message: '订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回不能为空', trigger: 'change' }
    // ],
    // validFlag: [
    //   { required: true, message: '是否有效 ^ 0-无效；1-有效不能为空', trigger: 'change' }
    // ],
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
  const billTypeList = ref([]); // 类型  ^0-长期代料，1-临时代料通用代码
  const substitutionTypeList = ref([]); // 代料关系分类 ^ G-代料单，E-等效代料，S-规格代料通用代码
  const effectiveTypeList = ref([]); // 生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制通用代码
  const statusList = ref([]); // 订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回通用代码
  const validFlagList = ref([]); // 是否有效 ^ 0-无效；1-有效通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const lookupParams = [
    { fieldName: 'billType', lookUpType: 'MDS_SUBSTITUTION_BILL_TYPE' },
    { fieldName: 'substitutionType', lookUpType: 'MDS_SUBSTITUTION_TYPE' },
    { fieldName: 'effectiveType', lookUpType: 'MDS_SUBSTITUTION_EFFECTIVE_TYPE' },
    { fieldName: 'status', lookUpType: 'MDS_SUBSTITUTION_STATUS' },
    { fieldName: 'validFlag', lookUpType: 'MDS_SUB_VALID_FLAG' }
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
      billTypeList.value = result.billType;
      substitutionTypeList.value = result.substitutionType;
      effectiveTypeList.value = result.effectiveType;
      statusList.value = result.status;
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
    getMdsSubstitution(id)
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
  function saveForm() {
    formRef.value
      .validate()
      .then(() => {
        mdsSubstitutionLEdit.value
          .validate(async validate => {
            if (!validate) {
              return;
            }
            loading.value = true;
            const subInfoList = mdsSubstitutionLEdit.value.getChangedData(); // 获取子表数据
            // 处理数据
            const postData = proxy.$lodash.cloneDeep(form.value);
            postData.mdsSubstitutionLList = subInfoList; // 挂载子表数据
            // 发送请求
            saveMdsSubstitution(postData)
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
    billTypeList,
    substitutionTypeList,
    effectiveTypeList,
    statusList,
    validFlagList,
    secretLevelList,
    saveForm,
    closeModal,
    mdsSubstitutionLEdit
  };
}


