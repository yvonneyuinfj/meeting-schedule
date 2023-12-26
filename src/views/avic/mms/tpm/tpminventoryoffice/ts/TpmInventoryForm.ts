import type { TpmInventoryDto } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块DTO
import { getTpmInventory, saveTpmInventory, getCodeById } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块API

export const emits = ['reloadData', 'close'];
export function useTpmInventoryForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<TpmInventoryDto>({});
  const formRef = ref(null);
  /**
   * 校验规则
   * 于小耘 20231113
   */
  const rules = reactive({
    equipmentType: [{ required: true, message: '设备类型不能为空', trigger: 'change' }],
    tpmAssetClassId: [{ required: true, message: '设备大类不能为空', trigger: 'change' }],
    assetsCode: [{ required: true, message: '资产编号不能为空', trigger: 'change' }],
    equipmentCode: [{ required: true, message: '设备编号不能为空', trigger: 'change' }],
    equipmentName: [{ required: true, message: '设备名称不能为空', trigger: 'change' }],
    useDeptId: [{ required: true, message: '使用部门不能为空', trigger: 'change' }],
    tpmAreaId: [{ required: true, message: '设备地理区域不能为空', trigger: 'change' }],
    storageLocation: [{ required: true, message: '存放地点不能为空', trigger: 'change' }],
    secretLevel: [{ required: true, message: '密级不能为空', trigger: 'change' }],
    recordDate: [{ required: true, message: '启用时间不能为空', trigger: 'change' }],
    responseUserId: [{ required: true, message: '责任人不能为空', trigger: 'change' }],
    equipmentStatus: [{ required: true, message: '设备状态不能为空', trigger: 'change' }]
  });

  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout4; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const equipmentTypeList = ref([]); // 设备类型通用代码
  const abcdTypeList = ref([]); // 设备级别，ABCD分类通用代码
  const keyOnlyChildFlagList = ref([]); // 是否关键独生子通用代码
  const cncTypeList = ref([]); // 数控分类通用代码
  const equipmentStatusList = ref([]); // 设备状态通用代码
  const assetsStatusList = ref([]); // 资产状态通用代码
  const ynEntranceList = ref([]); // 是否进口通用代码
  const secretLevelList = ref([]); // 数据密级通用代码
  const ynMilitaryKeyEquipList = ref([]); // 是否军工关键设备通用代码
  const ynFixedList = ref([]); // 是转固，通用代码：PLATFORM_YES_NO_FLAG^ Y是，N否通用代码
  const assetTypeList = ref([]); // 资产类别通用代码
  const assetsUseList = ref([]); // 资产用途通用代码
  const transferProjectTypeList = ref([]); // 移交项目类别通用代码
  const ynMaintainList = ref([]); // 是否保养通用代码
  const ynTransferRecordList = ref([]); // 是否调拨通用代码
  const equipmentUseList = ref([]); // 用途通用代码
  const ynBottleneckEquipmentList = ref([]); // 是否瓶颈设备通用代码
  const energyEfficiencyList = ref([]); // 能效通用代码
  const ynAnnualInspectionList = ref([]); // 是否年检通用代码
  const capitalSourceList = ref([]);  // 资金来源通用代码
  const lookupParams = [
    { fieldName: 'equipmentType', lookUpType: 'TPM_EQUIPMENT_TYPE' },
    { fieldName: 'abcdType', lookUpType: 'TPM_ABCD_TYPE' },
    { fieldName: 'keyOnlyChildFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'cncType', lookUpType: 'TPM_CNC_TYPE' },
    { fieldName: 'equipmentStatus', lookUpType: 'TPM_EQUIPMENT_STATUS' },
    { fieldName: 'assetsStatus', lookUpType: 'TPM_ASSETS_STATUS' },
    { fieldName: 'ynEntrance', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynFixed', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'assetType', lookUpType: 'TPM_ASSET_TYPE' },
    { fieldName: 'assetsUse', lookUpType: 'TPM_ASSETS_USE' },
    { fieldName: 'transferProjectType', lookUpType: 'TPM_TRANSFER_PROJECT_TYPE' },
    { fieldName: 'ynMaintain', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'ynTransferRecord', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'equipmentUse', lookUpType: 'TPM_EQUIPMENT_USE' },
    { fieldName: 'ynBottleneckEquipment', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'energyEfficiency', lookUpType: 'TPM_ENERGY_EFFICIENCY' },
    { fieldName: 'ynAnnualInspection', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'capitalSource', lookUpType: 'TPM_CAPITAL_SOURCE' }
  ];

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    } else {
      // 初始化表单数据
      initFormDate();
    }
  });
  /** 
   *  初始化表单数据
   *  by 于小耘
   *  Date 20231110
   */
  const initFormDate = () => {
    // 设备类型默认10办公自动化设备
    if (!form.value.equipmentType) {
      form.value.equipmentType = '10';
    }
    // 初始化设备状态，默认【在用】
    if (!form.value.equipmentStatus) {
      form.value.equipmentStatus = '1';
    }
    // 初始化数量，默认为1
    if (!form.value.qty) {
      form.value.qty = '1';
    }
    // 初始化创建人姓名,默认为当前登录人
    if (!form.value.createdBy) {
      form.value.attribute01 = proxy.$getLoginUser().name;
    }
  };

  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      equipmentTypeList.value = result.equipmentType;
      abcdTypeList.value = result.abcdType;
      keyOnlyChildFlagList.value = result.keyOnlyChildFlag;
      cncTypeList.value = result.cncType;
      equipmentStatusList.value = result.equipmentStatus;
      assetsStatusList.value = result.assetsStatus;
      ynEntranceList.value = result.ynEntrance;
      ynMilitaryKeyEquipList.value = result.ynMilitaryKeyEquip;
      ynFixedList.value = result.ynFixed;
      assetTypeList.value = result.assetType;
      assetsUseList.value = result.assetsUse;
      transferProjectTypeList.value = result.transferProjectType;
      ynMaintainList.value = result.ynMaintain;
      ynTransferRecordList.value = result.ynTransferRecord;
      equipmentUseList.value = result.equipmentUse;
      ynBottleneckEquipmentList.value = result.ynBottleneckEquipment;
      energyEfficiencyList.value = result.energyEfficiency;
      ynAnnualInspectionList.value = result.ynAnnualInspection;
      capitalSourceList.value = result.capitalSource;
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
    getTpmInventory(id)
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
        if (errorMessage) {
          return;
        }
        loading.value = true;
        // 处理数据
        if (form.value.abcdType) {
          form.value.abcdType = '';
        }
        const postData = proxy.$lodash.cloneDeep(form.value);
        saveTpmInventory(postData)
          .then(res => {
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
  const getTreeChangeId = (id) => {
    if (!id) return
    getCodeById(id).then(res => {
      if (res.success) {
        form.value.equipmentCode = res.data
      }
    })
  }
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    equipmentTypeList,
    abcdTypeList,
    keyOnlyChildFlagList,
    cncTypeList,
    equipmentStatusList,
    assetsStatusList,
    ynEntranceList,
    secretLevelList,
    ynMilitaryKeyEquipList,
    ynFixedList,
    assetTypeList,
    assetsUseList,
    transferProjectTypeList,
    ynMaintainList,
    ynTransferRecordList,
    equipmentUseList,
    ynBottleneckEquipmentList,
    energyEfficiencyList,
    ynAnnualInspectionList,
    capitalSourceList,
    uploadFile,
    proxy,
    afterUploadEvent,
    saveForm,
    closeModal,
    getTreeChangeId
  };
}
