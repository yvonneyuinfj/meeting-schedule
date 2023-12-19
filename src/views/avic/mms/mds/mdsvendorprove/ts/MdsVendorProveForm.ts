import type { MdsVendorProveDto } from '@/api/avic/mms/mds/MdsVendorProveApi'; // 引入模块DTO
import { getMdsVendorProve, saveMdsVendorProve } from '@/api/avic/mms/mds/MdsVendorProveApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsVendorProveForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsVendorProveDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    mdsVendorId: [
      { required: true, message: '供应商信息表主键ID不能为空', trigger: 'change' }
    ],
    proveNo: [
      { required: true, message: '资质编号不能为空', trigger: 'change' }
    ],
    proveName: [
      { required: true, message: '资质名称不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级 ^ 通用代码MMS_DATA_SECRET_LEVEL不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const proveTypeList = ref([]); // 资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证通用代码
  const proveGradeList = ref([]); // 资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const lookupParams = [
    { fieldName: 'proveType', lookUpType: 'MDS_PROVE_TYPE' },
    { fieldName: 'proveGrade', lookUpType: 'MDS_VENDOR_LEVEL' }
    ];

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });

  /** 获取通用代码  */
  function getLookupList () {
    proxy.$getLookupByType(lookupParams, result => {
    proveTypeList.value = result.proveType;
    proveGradeList.value = result.proveGrade;
    });
  }
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
    getMdsVendorProve(id)
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
        saveMdsVendorProve(postData)
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
    proveTypeList,
    proveGradeList,
    secretLevelList,
    saveForm,
    closeModal
  };
}


