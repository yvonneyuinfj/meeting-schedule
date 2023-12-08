import type { MdsInventoryDto } from '@/api/avic/mms/mds/MdsInventoryApi'; // 引入模块DTO
import type { MdsInventoryTypeDto } from '@/api/avic/mms/mds/MdsInventoryTypeApi'; // 引入模块DTO
import { getMdsInventory, saveMdsInventory } from '@/api/avic/mms/mds/MdsInventoryApi'; // 引入模块API
import { getMdsInventoryTypeAll } from '@/api/avic/mms/mds/MdsInventoryTypeApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsInventoryForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsInventoryDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    inventoryCode: [
      { required: true, message: '库房代码 不能为空', trigger: 'change' }
    ],
    mdsInventoryTypeId: [
      { required: true, message: '库房类别 不能为空', trigger: 'change' }
    ],
    validFlag: [
      { required: true, message: '库房是否有效 不能为空', trigger: 'change' }
    ],
    inventoryDeptId: [
      { required: true, message: '库房所属部门ID不能为空', trigger: 'change' }
    ],
    transactionType: [
      { required: true, message: '业务类型不能为空', trigger: 'change' }
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
  const mdsInventoryTypeIdList = ref([]); // 库房类别 通用代码
  const transactionTypeList = ref([]); // 业务类型通用代码
  const quanlityTypeList = ref([]); // 质量状态通用代码
  const validFlagList = ref([]); // 是否有效通用代码
  const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
  const lookupParams = [
    { fieldName: 'mdsInventoryTypeId', lookUpType: 'MDS_INVENTORY_TYPE' },
    { fieldName: 'transactionType', lookUpType: 'MDS_TRANSACTION_TYPE' },
    { fieldName: 'transactionType', lookUpType: 'MDS_TRANSACTION_TYPE' },
    { fieldName: 'validFlag', lookUpType: 'PLATFORM_VALID_FLAG' },
    { fieldName: 'quanlityType', lookUpType: 'MDS_QUANLITY_TYPE' }
  ];

  onMounted(() => {
    //加载库房类型
    getInventoryTypeInfo();
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
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      //mdsInventoryTypeIdList.value = result.mdsInventoryTypeId;
      transactionTypeList.value = result.transactionType;
      quanlityTypeList.value = result.quanlityType;
      validFlagList.value = result.validFlag;
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
    getMdsInventory(id)
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
        saveMdsInventory(postData)
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
    emit('reloadData');
    emit('close');
  }
  /** 返回关闭事件 */
  function closeModal() {
    emit('close');
  }
  /**获取库房类型信息*/
  const queryForm = ref<MdsInventoryTypeDto>({});
  const queryParam = reactive({
    // 请求表格数据参数
    pageParameter: {
      page: 1, // 页数
      rows: 20 // 每页条数
    },
    searchParams: {
      ...queryForm
    },
    keyWord: ref(''), // 快速查询数据
    sidx: null, // 排序字段
    sord: null // 排序方式: desc降序 asc升序
  });
  function getInventoryTypeInfo() {
    loading.value = true;
    //queryParam.searchParams.validFlag = '1';
    getMdsInventoryTypeAll(queryParam)
      .then(async (res) => {
        if (res.success) {
          mdsInventoryTypeIdList.value = res.data.result;;
          // 处理数据
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取库房类型失败！');
        loading.value = false;
      });
  }
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    mdsInventoryTypeIdList,
    transactionTypeList,
    quanlityTypeList,
    validFlagList,
    secretLevelList,
    saveForm,
    closeModal
  };
}


