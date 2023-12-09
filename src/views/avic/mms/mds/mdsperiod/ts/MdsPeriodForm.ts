import type { MdsPeriodDto } from '@/api/avic/mms/mds/MdsPeriodApi'; // 引入模块DTO
import { getMdsPeriod, saveMdsPeriod } from '@/api/avic/mms/mds/MdsPeriodApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsPeriodForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsPeriodDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    orderNo: [
      { required: true, message: '期段号不能为空', trigger: 'change' }
    ],
    arrangeDate: [
      { required: true, message: '开始日期不能为空', trigger: 'change' }
    ],
    endDate: [
      { required: true, message: '结束日期不能为空', trigger: 'change' }
    ],
    periodType: [
      { required: true, message: '期段类型', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const periodTypeList = ref([]); // 期段类型 ^ 取自通用代码APPLICATION_TYPE:  1-日,2-周,3-月,4-季度,5-年份'通用代码
  const applicationTypeList = ref([]); // 期段应用类型 ^  取自通用代码APPLICATION_TYPE:  1-生产,2-采购,3-库存,4-成本'通用代码
  const ynUsedFlagList = ref([]); // 是否使用 ^ Y: 已使用   N: 未使用通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const lookupParams = [
    { fieldName: 'periodType', lookUpType: 'MDS_PERIOD_PERIOD_TYPE' },
    { fieldName: 'applicationType', lookUpType: 'MDS_PERIOD_APPLICATION_TYPE' },
    { fieldName: 'ynUsedFlag', lookUpType: 'MDS_PERIOD_USED_FLAG' }
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
      periodTypeList.value = result.periodType;
      applicationTypeList.value = result.applicationType;
      ynUsedFlagList.value = result.ynUsedFlag;
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
    getMdsPeriod(id)
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
        // 发送请求
        saveMdsPeriod(postData)
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
    periodTypeList,
    applicationTypeList,
    ynUsedFlagList,
    secretLevelList,
    saveForm,
    closeModal
  };
}


