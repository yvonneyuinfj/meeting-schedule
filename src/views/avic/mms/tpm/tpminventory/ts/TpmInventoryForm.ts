import type { TpmInventoryDto } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块DTO
import { getTpmInventory, saveTpmInventory } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useTpmInventoryForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<TpmInventoryDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    equipmentCode: [
      { required: true, message: '设备编号，编码规则：分类码+四位流水不能为空', trigger: 'change' }
    ],
    equipmentName: [
      { required: true, message: '设备名称不能为空', trigger: 'change' }
    ],
    qty: [
      { required: true, message: '数量不能为空', trigger: 'change' }
    ],
    abcdType: [
      { required: true, message: '设备级别，ABCD分类，通用代码：TPM_ABCD_TYPE^ A重点设备B主要设备 C一般设备 D不重要设备不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '数据密级不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 数据密级通用代码

  onMounted(() => {
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

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
    getTpmInventory(id)
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
        saveTpmInventory(postData)
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
    saveForm,
    closeModal
  };
}


