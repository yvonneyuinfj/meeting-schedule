import type {MdsReportConditionDto} from '@/api/avic/mms/mds/MdsReportConditionApi'; // 引入模块DTO
import {
  createMdsReportConditionByUserId,
  getMdsReportCondition,
  saveMdsReportCondition
} from '@/api/avic/mms/mds/MdsReportConditionApi'; // 引入模块API
export const emits = ['reloadData', 'close'];

export function useMdsReportConditionForm({
                                            props: props,
                                            emit: emit
                                          }) {
  const {proxy} = getCurrentInstance();
  const form = ref<MdsReportConditionDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    secretLevel: [
      {required: true, message: '密级 ^ 通用代码MMS_DATA_SECRET_LEVEL不能为空', trigger: 'change'}
    ]
  };
  const layout = {
    labelCol: {flex: '0 0 140px'},
    wrapperCol: {flex: '1 1 0'}
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码

  onMounted(() => {
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

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
    getMdsReportCondition(id)
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
        saveMdsReportCondition(postData)
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

  function createMdsReportCondition(ids, url) {
    if (ids.length == 0) {
      proxy.$message.warning('请选择要打印的数据！');
      return;
    }
    proxy.$confirm({
      title: `确认要打印选择的数据吗?`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        form.value.tableIdList = ids;
        const postData = proxy.$lodash.cloneDeep(form.value);
        createMdsReportConditionByUserId(postData)
          .then(res => {
            if (res.success) {
              window.open(url, '_blank', '资产台账卡片');
            }
          })
          .catch((e) => {
            proxy.$message.error(e.message);
          });
      }
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
    secretLevelList,
    saveForm,
    closeModal
  };
}


