import type { FamAssetClassTherrDto } from '@/api/avic/mms/fam/FamAssetClassTherrApi'; // 引入模块DTO
import { getFamAssetClassTherr, saveFamAssetClassTherr, basePath } from '@/api/avic/mms/fam/FamAssetClassTherrApi'; // 引入模块API
export const emits = ['afterAddTreeNode', 'afterEditTreeNode', 'close'];
export function useFamAssetClassTherrForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamAssetClassTherrDto>({
    attribute01: props.parentId
  });
  const formRef = ref(null);  // 表单ref
  const rules: Record<string, Rule[]> = {
    attribute01: [
      { required: true, message: 'ATTRIBUTE_01不能为空', trigger: 'change' }
    ],
    parentId: [
      { required: true, message: '上级节点ID不能为空', trigger: 'change' }
    ],
    treeSort: [
      { required: true, message: '树节点排序号(本级)不能为空', trigger: 'change' }
    ],
    parentClassName: [
      { required: true, message: '上级类别名称不能为空', trigger: 'change' }
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
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id) {
    loading.value = true;
    getFamAssetClassTherr(id)
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
        saveFamAssetClassTherr(postData)
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
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    baseUrl,
    loading,
    saveForm,
    closeModal
  };
}
