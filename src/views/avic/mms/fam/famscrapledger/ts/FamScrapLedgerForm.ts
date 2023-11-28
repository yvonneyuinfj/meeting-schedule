import type { FamScrapLedgerDto } from '@/api/avic/mms/fam/FamScrapLedgerApi'; // 引入模块DTO
import { getFamScrapLedger, saveFamScrapLedger,saveEnterFamScrapLedger } from '@/api/avic/mms/fam/FamScrapLedgerApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useFamScrapLedgerForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamScrapLedgerDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout4; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 数据密级通用代码
  const isAttendList = ref([]); // 是否上会通用代码
  const reportToGroupList = ref([]); // 是否已上报集团通用代码
  const hasBeenApprovedList = ref([]); // 集团是否已批复通用代码
  const isMilitaryIndustryList = ref([]); // 是否为军工关键设备通用代码
  const isIndustryList = ref([]); // 是否已上报科工局通用代码
  const approvedOrNotList = ref([]); // 科工局是否已批复通用代码
  const completedOrNotList = ref([]); // 是否完成通用代码
  const lookupParams = [
    { fieldName: 'isAttend', lookUpType: 'FAM_PROGRAM_VERSION' },
    { fieldName: 'reportToGroup', lookUpType: 'FAM_PROGRAM_VERSION' },
    { fieldName: 'hasBeenApproved', lookUpType: 'FAM_PROGRAM_VERSION' },
    { fieldName: 'isMilitaryIndustry', lookUpType: 'FAM_PROGRAM_VERSION' },
    { fieldName: 'isIndustry', lookUpType: 'FAM_PROGRAM_VERSION' },
    { fieldName: 'approvedOrNot', lookUpType: 'FAM_PROGRAM_VERSION' },
    { fieldName: 'completedOrNot', lookUpType: 'FAM_PROGRAM_VERSION' }
    ];

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

  /** 获取通用代码  */
  function getLookupList () {
    proxy.$getLookupByType(lookupParams, result => {
    isAttendList.value = result.isAttend;
    reportToGroupList.value = result.reportToGroup;
    hasBeenApprovedList.value = result.hasBeenApproved;
    isMilitaryIndustryList.value = result.isMilitaryIndustry;
    isIndustryList.value = result.isIndustry;
    approvedOrNotList.value = result.approvedOrNot;
    completedOrNotList.value = result.completedOrNot;
    });
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData (id) {
    loading.value = true;
    getFamScrapLedger(id)
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
        saveFamScrapLedger(postData)
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

  /** 保存批量录入批复文号 */
  function saveEnter(){
    formRef.value
      .validate()
      .then( () => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        postData['note'] = props.selectIds
        // 发送请求
        saveEnterFamScrapLedger(postData)
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
    isAttendList,
    reportToGroupList,
    hasBeenApprovedList,
    isMilitaryIndustryList,
    isIndustryList,
    approvedOrNotList,
    completedOrNotList,
    saveForm,
    saveEnter,
    closeModal
  };
}


