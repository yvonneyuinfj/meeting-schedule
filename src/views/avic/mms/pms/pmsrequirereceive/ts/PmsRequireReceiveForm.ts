import type { PmsRequireReceiveDto } from '@/api/avic/mms/pms/PmsRequireReceiveApi'; // 引入模块DTO
import { getPmsRequireReceive, savePmsRequireReceive } from '@/api/avic/mms/pms/PmsRequireReceiveApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function usePmsRequireReceiveForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<PmsRequireReceiveDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    reqPlanNo: [
      { required: true, message: '采购计划号不能为空', trigger: 'change' }
    ],
    reqPlanName: [
      { required: true, message: '采购计划名称不能为空', trigger: 'change' }
    ],
    managerUserId: [
      { required: true, message: '采购负责人不能为空', trigger: 'change' }
    ],
    planType: [
      { required: true, message: '计划类型不能为空', trigger: 'change' }
    ],
    sourceType: [
      { required: true, message: '需求来源不能为空', trigger: 'change' }
    ],
    managerUserCode: [
      { required: true, message: '项目主管编码不能为空', trigger: 'change' }
    ],
    managerUserName: [
      { required: true, message: '项目主管名称不能为空', trigger: 'change' }
    ],
    reqStatus: [
      { required: true, message: '需求状态不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 密级通用代码
  const planTypeList = ref([]); // 计划类型通用代码
  const sourceTypeList = ref([]); // 需求来源通用代码
  const proposedSourcingMethodList = ref([]); // 拟寻源方式通用代码
  const reqStatusList = ref([]); // 需求状态通用代码
  const lookupParams = [
    { fieldName: 'planType', lookUpType: 'PMS_PLAN_TYPE' },
    { fieldName: 'sourceType', lookUpType: 'PMS_SOURCE_TYPE' },
    { fieldName: 'proposedSourcingMethod', lookUpType: 'PMS_PROPOSED_SOURCING_METHOD' },
    { fieldName: 'reqStatus', lookUpType: 'PMS_REQ_STATUS' }
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
    planTypeList.value = result.planType;
    sourceTypeList.value = result.sourceType;
    proposedSourcingMethodList.value = result.proposedSourcingMethod;
    reqStatusList.value = result.reqStatus;
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
    getPmsRequireReceive(id)
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
        savePmsRequireReceive(postData)
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
    secretLevelList,
    planTypeList,
    sourceTypeList,
    proposedSourcingMethodList,
    reqStatusList,
    saveForm,
    closeModal
  };
}


