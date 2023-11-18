import type { FamAssetInventoryTaskDto } from '@/api/avic/mms/fam/FamAssetInventoryTaskApi'; // 引入模块DTO
import { getFamAssetInventoryTask, saveFamAssetInventoryTask } from '@/api/avic/mms/fam/FamAssetInventoryTaskApi'; // 引入模块API

export const emits = ['reloadData', 'close'];
export function useFamAssetInventoryTaskForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamAssetInventoryTaskDto>({});
  const famAssetInventoryTaskListEdit = ref();
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    inventoryNo: [
      { required: true, message: '盘点编号不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const autoCode = ref(null); // 自动编码ref
  onMounted(() => {
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData (id) {
    loading.value = true;
    getFamAssetInventoryTask(id)
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
        famAssetInventoryTaskListEdit.value
          .validate(async validate => {
            if (!validate) {
              return;
            }
            loading.value = true;
            const subInfoList = famAssetInventoryTaskListEdit.value.getChangedData(); // 获取子表数据
            // 处理数据
            const postData = proxy.$lodash.cloneDeep(form.value);
            postData.famAssetInventoryTaskListList = subInfoList; // 挂载子表数据
        if (autoCode.value) {
          // 获取编码码段值
          postData.inventoryNo = autoCode.value.getSegmentValue();
        }
            // 发送请求
            saveFamAssetInventoryTask(postData)
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
    autoCode,
    saveForm,
    closeModal,
    famAssetInventoryTaskListEdit
  };
}


