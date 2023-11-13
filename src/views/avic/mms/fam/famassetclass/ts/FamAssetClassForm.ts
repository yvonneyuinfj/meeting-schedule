import type { FamAssetClassDto } from '@/api/avic/mms/fam/FamAssetClassApi'; // 引入模块DTO
import { listFamAssetClassByPage, getFamAssetClass, saveFamAssetClass, basePath } from '@/api/avic/mms/fam/FamAssetClassApi'; // 引入模块API
export const emits = ['afterAddTreeNode', 'afterEditTreeNode', 'close'];
export function useFamAssetClassForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamAssetClassDto>({
    parentId: props.parentId
  });
  const formRef = ref(null);  // 表单ref
  const rules: Record<string, Rule[]> = {
    classCode: [
      { required: true, message: '资产类别编码不能为空', trigger: 'change' }
    ],
    className: [
      { required: true, message: '资产类别名称不能为空', trigger: 'change' }
    ],
    modelContent: [
      { required: true, message: '编码规则不能为空', trigger: 'change' }
    ],
    useTime: [
      { required: true, message: '使用年限不能为空', trigger: 'change' }
    ],
    parentAssetClassName: [
      { required: true, message: '上级资产类别名称不能为空', trigger: 'change' }
    ],
    parentAssetCode: [
      { required: true, message: '上级资产类别编码不能为空', trigger: 'change' }
    ],
    parentId: [
      { required: true, message: '上级节点ID不能为空', trigger: 'change' }
    ],
    treeSort: [
      { required: true, message: '树节点排序号(本级)不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const baseUrl = basePath; // 树选择组件的baseUrl
  const loading = ref(false);
  onMounted(() => {
  });

  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id) {
    loading.value = true;
    getFamAssetClass(id)
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
        saveFamAssetClass(postData)
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
    console.log('save');
    emit('getList1');
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
        if (document.querySelector('.avic-tree-select'))
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
    baseUrl,
    saveForm,
    closeModal,
    reloadDetail
  };
}
