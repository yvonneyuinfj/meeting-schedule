import type { SyncUserLogDto } from '@/api/avic/mms/mds/SyncUserLogApi'; // 引入模块DTO
import { getSyncUserLog, saveSyncUserLog } from '@/api/avic/mms/mds/SyncUserLogApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useSyncUserLogForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<SyncUserLogDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const syslogResultList = ref([]); // SYSLOG_RESULT通用代码
  const lookupParams = [
    { fieldName: 'syslogResult', lookUpType: 'SYNC_USER_LOG_RESULT' }
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
    syslogResultList.value = result.syslogResult;
    });
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData (id) {
    loading.value = true;
    getSyncUserLog(id)
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
        saveSyncUserLog(postData)
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
    syslogResultList,
    saveForm,
    closeModal
  };
}


