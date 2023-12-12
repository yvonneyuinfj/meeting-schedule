import type { TpmAssetClassDto } from '@/api/avic/mms/tpm/TpmAssetClassApi'; // 引入模块DTO
import { getTpmAssetClass, saveTpmAssetClass, basePath } from '@/api/avic/mms/tpm/TpmAssetClassApi'; // 引入模块API
export const emits = ['afterAddTreeNode', 'afterEditTreeNode', 'close'];
export function useTpmAssetClassForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<TpmAssetClassDto>({
    parentId: props.parentId
  });
  const formRef = ref(null);  // 表单ref
  const rules: Record<string, Rule[]> = {
    parentId: [
      { required: true, message: '父节点不能为空', trigger: 'change' }
    ],
    classCode: [
      { required: true, message: '大类编码不能为空', trigger: 'change' }
    ],
    className: [
      { required: true, message: '大类名称不能为空', trigger: 'change' }
    ],
    treeSort: [
      { required: true, message: '序号（本级）不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const baseUrl = basePath; // 树选择组件的baseUrl
  const loading = ref(false);
  const secretLevelList = ref([]); // 密级通用代码
  onMounted(() => {
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
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
    getTpmAssetClass(id)
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
        const id = form.value.id;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveTpmAssetClass(postData)
          .then(res => {
            if (res.success) {
              if (id) {
                // 编辑
                emit('afterEditTreeNode', res.data);
              } else {
                // 添加
                emit('afterAddTreeNode', res.data);
              }
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
    emit('close');
  }
  /** 返回关闭事件 */
  function closeModal() {
    emit('close');
  }
  /** 重新加载详细页面 */
  function reloadDetail() {
    getFormData(props.formId);
  }
  watch(
    () => props.formId,
    newVal => {
      if (newVal) {
        // 编辑、详情页面加载数据
        getFormData(newVal);
        // 切换树节点时右侧表单定位至最上方
        document.querySelector('.avic-tree-select').scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      }
    },
    { immediate: true }
  );
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    secretLevelList,
    baseUrl,
    saveForm,
    closeModal,
    reloadDetail
  };
}
