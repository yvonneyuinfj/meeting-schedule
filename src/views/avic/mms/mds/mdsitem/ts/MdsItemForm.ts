import type { MdsItemDto } from '@/api/avic/mms/mds/MdsItemApi'; // 引入模块DTO
import { getMdsItem, saveMdsItem } from '@/api/avic/mms/mds/MdsItemApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsItemForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsItemDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    itemCode: [
      { required: true, message: '物料号 不能为空', trigger: 'change' }
    ],
    itemName: [
      { required: true, message: '物料名称 不能为空', trigger: 'change' }
    ],
    itemType: [
      { required: true, message: '物料类型 不能为空', trigger: 'change' }
    ],
    mdsUnitId: [
      { required: true, message: '计量单位 不能为空', trigger: 'change' }
    ],
    mdsUnitName: [
      { required: true, message: '计量单位 不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级 不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const itemTypeList = ref([]); // 物料类型 通用代码
  const sourceTypeList = ref([]); // 来源类型通用代码
  const keyFlagList = ref([]); // 关重件标记通用代码
  const appProductCodeList = ref([]); // 适用产品通用代码
  const mdsItemStatusList = ref([]); // 物料状态 通用代码
  const secretLevelList = ref([]); // 密级 通用代码
  const dataSourceList = ref([]); // 数据来源通用代码
  const ynKeyMaterialList = ref([]); // 是否关键原材料通用代码
  const ynKeyZwList = ref([]); // 是否关键站位通用代码
  const lookupParams = [
    { fieldName: 'itemType', lookUpType: 'MDS_ITEM_TYPE' },
    { fieldName: 'sourceType', lookUpType: 'SOURCE_TYPE: ' },
    { fieldName: 'keyFlag', lookUpType: 'KEY_FLAG' },
    { fieldName: 'appProductCode', lookUpType: 'PPM_MILITARY_CIVILIAN_AIRPLANE' },
    { fieldName: 'mdsItemStatus', lookUpType: 'MDS_ITEM_STATUS' },
    { fieldName: 'dataSource', lookUpType: 'MDS_ITEM_DATASOURCE ' },
    { fieldName: 'ynKeyMaterial', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynKeyZw', lookUpType: 'PLATFORM_YES_NO_FLAG' }
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
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      itemTypeList.value = result.itemType;
      sourceTypeList.value = result.sourceType;
      keyFlagList.value = result.keyFlag;
      appProductCodeList.value = result.appProductCode;
      mdsItemStatusList.value = result.mdsItemStatus;
      dataSourceList.value = result.dataSource;
      ynKeyMaterialList.value = result.ynKeyMaterial;
      ynKeyZwList.value = result.ynKeyZw;
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
    getMdsItem(id)
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
        // 附件密级校验 先判断
        const errorMessage = uploadFile.value.validateUploaderFileSecret(
          form.value.secretLevel
        );
        alert(errorMessage);
        if (errorMessage) {
          return;
        }
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveMdsItem(postData)
          .then((res) => {
            if (res.success) {
              uploadFile.value.upload(form.value.id || res.data); // 附件上传
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
  /** 数据保存失败的回调 */
  function errorCallback() {
    emit('reloadData');
    emit('close');
  }
  /** 附件上传完之后的回调函数 */
  function afterUploadEvent(successFile, errorFile) {
    if (errorFile.length > 0) {
      // 有附件保存失败的处理
      errorCallback();
    } else {
      // 所有附件都保存成功的处理
      successCallback();
    }
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
    itemTypeList,
    sourceTypeList,
    keyFlagList,
    appProductCodeList,
    mdsItemStatusList,
    secretLevelList,
    dataSourceList,
    ynKeyMaterialList,
    ynKeyZwList,
    uploadFile,
    afterUploadEvent,
    saveForm,
    closeModal
  };
}


