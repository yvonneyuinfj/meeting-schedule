import type { MdsGpioTempletGridDto } from '@/api/avic/mms/mds/MdsGpioTempletGridApi'; // 引入模块DTO
import { getMdsGpioTempletGrid, saveMdsGpioTempletGrid } from '@/api/avic/mms/mds/MdsGpioTempletGridApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsGpioTempletGridForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsGpioTempletGridDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    gridCode: [
      { required: true, message: '表格编号不能为空', trigger: 'change' }
    ],
    gridName: [
      { required: true, message: '表格名称不能为空', trigger: 'change' }
    ],
    innerOrder: [
      { required: true, message: '排序号不能为空', trigger: 'change' }
    ],
    mdsGpioTempletId: [
      { required: true, message: '所属模板ID不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 密级通用代码

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
    getMdsGpioTempletGrid(id)
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
        form.value.mdsGpioTempletId = props.parentId;
        const postData = proxy.$lodash.cloneDeep(form.value);
        saveMdsGpioTempletGrid(postData)
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
    secretLevelList,
    saveForm,
    closeModal
  };
}

