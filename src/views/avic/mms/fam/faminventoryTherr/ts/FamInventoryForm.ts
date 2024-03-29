import type { FamInventoryDto } from '@/api/avic/mms/fam/FamInventoryTherrApi'; // 引入模块DTO
import { getFamInventory, saveFamInventory, basePath } from '@/api/avic/mms/fam/FamInventoryTherrApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useFamInventoryForm({ props: props, emit: emit }) {
  const { proxy } = getCurrentInstance();
  const form = ref<FamInventoryDto>({});
  const formRef = ref(null);  // 表单ref
  const rules: Record<string, Rule[]> = {
    attribute01: [
      { required: true, message: 'ATTRIBUTE_01不能为空', trigger: 'change' }
    ],
    assetsCode: [
      { required: true, message: '资产编号不能为空', trigger: 'change' }
    ],
    assetsName: [
      { required: true, message: '资产名称不能为空', trigger: 'change' }
    ],
    assetClassName: [
      { required: true, message: '资产类别名称不能为空', trigger: 'change' }
    ],
    assetSource: [
      { required: true, message: '资产来源不能为空', trigger: 'change' }
    ],
    assetsUse: [
      { required: true, message: '资产用途不能为空', trigger: 'change' }
    ],
    entryDate: [
      { required: true, message: '入账日期不能为空', trigger: 'change' }
    ],
    assetOriginalValue: [
      { required: true, message: '资产原值不能为空', trigger: 'change' }
    ],
    assetNum: [
      { required: true, message: '资产数量不能为空', trigger: 'change' }
    ],
    assetNetValue: [
      { required: true, message: '资产净值不能为空', trigger: 'change' }
    ],
    monDepreciation: [
      { required: true, message: '月折旧额不能为空', trigger: 'change' }
    ],
    storageLocation: [
      { required: true, message: '存放地点不能为空', trigger: 'change' }
    ],
    deptName: [
      { required: true, message: '部门名称不能为空', trigger: 'change' }
    ],
    equipClass: [
      { required: true, message: '设备大类不能为空', trigger: 'change' }
    ],
    assetSpec: [
      { required: true, message: '资产规格不能为空', trigger: 'change' }
    ],
    assetModel: [
      { required: true, message: '资产型号不能为空', trigger: 'change' }
    ],
    assetUnit: [
      { required: true, message: '资产单价不能为空', trigger: 'change' }
    ],
    invoiceNo: [
      { required: true, message: '发票号不能为空', trigger: 'change' }
    ],
    productionDate: [
      { required: true, message: '出厂日期不能为空', trigger: 'change' }
    ],
    parentAssetNo: [
      { required: true, message: '父资产编号不能为空', trigger: 'change' }
    ],
    importedOrNot: [
      { required: true, message: '是否为进口设备不能为空', trigger: 'change' }
    ],
    assetType: [
      { required: true, message: '资产分类不能为空', trigger: 'change' }
    ],
    warrantyPeriod: [
      { required: true, message: '质保期不能为空', trigger: 'change' }
    ],
    parentId: [
      { required: true, message: '父节点 ID不能为空', trigger: 'change' }
    ],
    treeSort: [
      { required: true, message: '树节点排序号（本级）不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout4; // 调用布局公共方法
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
    getFamInventory(id)
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
        saveFamInventory(postData)
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
  function successCallback() {  
    proxy.$message.success('保存成功！');
    emit('reloadData', props.parentId);
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
    baseUrl,
    saveForm,
    closeModal
  };
}
