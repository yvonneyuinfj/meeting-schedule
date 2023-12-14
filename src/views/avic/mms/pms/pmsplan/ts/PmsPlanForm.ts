import type { PmsPlanDto } from '@/api/avic/mms/pms/PmsPlanApi'; // 引入模块DTO
import { getPmsPlan, savePmsPlan } from '@/api/avic/mms/pms/PmsPlanApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function usePmsPlanForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<PmsPlanDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    pmsTaskNo: [
      { required: true, message: '采购任务编号不能为空', trigger: 'change' }
    ],
    mergeFlag: [
      { required: true, message: '合并标识不能为空', trigger: 'change' }
    ],
    reqPlanNo: [
      { required: true, message: '采购计划号不能为空', trigger: 'change' }
    ],
    managerUserId: [
      { required: true, message: '采购负责人不能为空', trigger: 'change' }
    ],
    pmsRequireReceiveId: [
      { required: true, message: '需求接收ID不能为空', trigger: 'change' }
    ],
    reqPlanName: [
      { required: true, message: '采购计划名称不能为空', trigger: 'change' }
    ],
    // managerUserCode: [
    //   { required: true, message: '项目主管编码不能为空', trigger: 'change' }
    // ],
    // managerUserName: [
    //   { required: true, message: '项目主管名称不能为空', trigger: 'change' }
    // ],
    abutmentUserId: [
      { required: true, message: '对接人不能为空', trigger: 'change' }
    ],
    planStatus: [
      { required: true, message: '计划状态不能为空', trigger: 'change' }
    ],
    procureStage: [
      { required: true, message: '采购阶段不能为空', trigger: 'change' }
    ],
    productReqClassify: [
      { required: true, message: '产品需求分类不能为空', trigger: 'change' }
    ],
    productType: [
      { required: true, message: '产品类型不能为空', trigger: 'change' }
    ],
    procureDeptId: [
      { required: true, message: '采购部门不能为空', trigger: 'change' }
    ],
    procureUserId: [
      { required: true, message: '采购主管不能为空', trigger: 'change' }
    ],
    deliveryDate: [
      { required: true, message: '交付日期不能为空', trigger: 'change' }
    ],
    proposedSourcingMethod: [
      { required: true, message: '拟寻源方式不能为空', trigger: 'change' }
    ],
    appointVendorId: [
      { required: true, message: '指定供应商不能为空', trigger: 'change' }
    ],
    techDocCompleteDate: [
      { required: true, message: '技术文件完成日期不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const autoCode = ref(null); // 自动编码ref
  const secretLevelList = ref([]); // 密级通用代码
  const mergeFlagList = ref([]); // 合并标识通用代码
  const proposedSourcingMethodList = ref([]); // 拟寻源方式通用代码
  const planStatusList = ref([]); // 计划状态通用代码
  const lookupParams = [
    { fieldName: 'mergeFlag', lookUpType: 'PMS_MERGE_FLAG' },
    { fieldName: 'proposedSourcingMethod', lookUpType: 'PMS_PROPOSED_SOURCING_METHOD' },
    { fieldName: 'planStatus', lookUpType: 'PMS_PLAN_STATUS' }
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
    mergeFlagList.value = result.mergeFlag;
    proposedSourcingMethodList.value = result.proposedSourcingMethod;
    planStatusList.value = result.planStatus;
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
    getPmsPlan(id)
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
        if (autoCode.value) {
          // 获取编码码段值
          postData.pmsTaskNo = autoCode.value.getSegmentValue();
        }
        // 发送请求
        savePmsPlan(postData)
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
    mergeFlagList,
    proposedSourcingMethodList,
    planStatusList,
    autoCode,
    saveForm,
    closeModal
  };
}


