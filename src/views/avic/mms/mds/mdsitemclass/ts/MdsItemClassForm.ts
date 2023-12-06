import type { MdsItemClassDto } from '@/api/avic/mms/mds/MdsItemClassApi'; // 引入模块DTO
import { getMdsItemClass, saveMdsItemClass, basePath } from '@/api/avic/mms/mds/MdsItemClassApi'; // 引入模块API
export const emits = ['reloadData', 'afterAddTreeNode', 'afterEditTreeNode', 'close'];
export function useMdsItemClassForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsItemClassDto>({});
  const formRef = ref(null);  // 表单ref
  const rules: Record<string, Rule[]> = {
    classCode: [
      { required: true, message: '大类编码不能为空', trigger: 'change' }
    ],
    classType: [
      { required: true, message: '大类类型不能为空', trigger: 'change' }
    ],
    className: [
      { required: true, message: '大类名称不能为空', trigger: 'change' }
    ],
    parentClassId: [
      { required: true, message: '父类ID ^ 取自Mds_Class.Id不能为空', trigger: 'change' }
    ],
    innerOrder: [
      { required: true, message: '排序序号不能为空', trigger: 'change' }
    ],
    validFlag: [
      { required: true, message: '是否有效不能为空', trigger: 'change' }
    ],
    ynItemSerialNo: [
      { required: true, message: '是否带小编号标识不能为空', trigger: 'change' }
    ],
    ynCheck: [
      { required: true, message: '是否检验标识不能为空', trigger: 'change' }
    ],
    ynRelSeqCatalog: [
      { required: true, message: '是否关联工序配套目录不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ],
    treeSort: [
      { required: true, message: '树节点排序号（本级）不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const baseUrl = basePath; // 树选择组件的baseUrl
  const loading = ref(false);
  const classTypeList = ref([]); // 大类类型通用代码
  const validFlagList = ref([]); // 是否有效通用代码
  const ynItemSerialNoList = ref([]); // 是否带小编号标识通用代码
  const ynCheckList = ref([]); // 是否检验标识通用代码
  const ynRelSeqCatalogList = ref([]); // 是否关联工序配套目录通用代码
  const secretLevelList = ref([]); // 密级通用代码
  const lookupParams = [
    { fieldName: 'classType', lookUpType: 'MDS_CLASS_TYPE' },
    { fieldName: 'validFlag', lookUpType: 'MDS_VAILD_FLAG' },
    { fieldName: 'ynItemSerialNo', lookUpType: 'MDS_NUMBER_FLAG' },
    { fieldName: 'ynCheck', lookUpType: 'MDS_INSPECTION_FLAG' },
    { fieldName: 'ynRelSeqCatalog', lookUpType: 'MDS_CATALOG_FLAG' }
  ];
  onMounted(() => {
    // 获取通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
  });

  /** 获取通用代码 */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      classTypeList.value = result.classType;
      validFlagList.value = result.validFlag;
      ynItemSerialNoList.value = result.ynItemSerialNo;
      ynCheckList.value = result.ynCheck;
      ynRelSeqCatalogList.value = result.ynRelSeqCatalog;
    });
  }
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
    getMdsItemClass(id)
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
        saveMdsItemClass(postData)
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
    emit('reloadData');
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
        // document.querySelector('.avic-tree-select').scrollIntoView({
        //   block: 'center',
        //   behavior: 'smooth'
        // });
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
    classTypeList,
    validFlagList,
    ynItemSerialNoList,
    ynCheckList,
    ynRelSeqCatalogList,
    secretLevelList,
    baseUrl,
    saveForm,
    closeModal,
    reloadDetail
  };
}
