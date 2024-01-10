import type { FamInvisibleScrapLedgerDto } from '@/api/avic/mms/fam/FamInvisibleScrapLedgerApi'; // 引入模块DTO
import { getFamInvisibleScrapLedger, saveFamInvisibleScrapLedger, saveEnterFamInvisibleScrapLedger } from '@/api/avic/mms/fam/FamInvisibleScrapLedgerApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useFamInvisibleScrapLedgerForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamInvisibleScrapLedgerDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    assetNo: [
      { required: true, message: '资产编号不能为空', trigger: 'change' }
    ],
    assetName: [
      { required: true, message: '资产名称不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const ynReportGroupList = ref([]); // 是否已经上报集团通用代码
  const secretLevelList = ref([]); // 数据密级通用代码
  const lookupParams = [
    { fieldName: 'ynReportGroup', lookUpType: 'PLATFORM_YES_NO_FLAG' }
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
    ynReportGroupList.value = result.ynReportGroup;
    });
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData (id) {
    loading.value = true;
    getFamInvisibleScrapLedger(id)
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
        saveFamInvisibleScrapLedger(postData)
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
  /** 保存批量录入批复文号 */
  function saveEnter() {
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        postData['ids'] = props.selectIds
        // 发送请求
        saveEnterFamInvisibleScrapLedger(postData)
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
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    ynReportGroupList,
    secretLevelList,
    saveForm,
    saveEnter,
    closeModal
  };
}


