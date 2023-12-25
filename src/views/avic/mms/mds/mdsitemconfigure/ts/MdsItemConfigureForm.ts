import type { MdsItemConfigureDto } from '@/api/avic/mms/mds/MdsItemConfigureApi'; // 引入模块DTO
import { getMdsItemConfigure, saveMdsItemConfigure } from '@/api/avic/mms/mds/MdsItemConfigureApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsItemConfigureForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsItemConfigureDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    mdsItemId: [
      { required: true, message: '物料ID ^ 取自Mds_Item.Id不能为空', trigger: 'change' }
    ],
    planVLt: [
      { required: true, message: '计划可变提前期(天) ^  , 使用的提前期中随着批量大小而变化的部分。定义时为对应平均批量值不能为空', trigger: 'change' }
    ],
    ynSale: [
      { required: true, message: '是否允许销售, N-否,Y-是不能为空', trigger: 'change' }
    ],
    ynOverseaSale: [
      { required: true, message: '是否允许海外销售, N-否,Y-是不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 默认2内部 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码

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
    getMdsItemConfigure(id)
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
        saveMdsItemConfigure(postData)
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


