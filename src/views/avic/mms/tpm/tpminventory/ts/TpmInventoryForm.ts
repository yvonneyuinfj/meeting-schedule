import type { TpmInventoryDto } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块DTO

import { getTpmInventory, saveTpmInventory,getCodeById,checkEquipmentCodeUnique } from '@/api/avic/mms/tpm/TpmInventoryApi'; // 引入模块API

import { useUserStore } from '@/store/user';
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
   * 于小耘 20231111
   */
  // 特种设备和普通设备的公共校验规则
  const rules_common = reactive({
    equipmentType: [
      { required: true, message: '设备类型不能为空', trigger: 'change' }
    ],
    tpmAssetClassId: [
      { required: true, message: '设备大类不能为空', trigger: 'change' }
    ],
    assetsCode: [
      { required: true, message: '资产编号不能为空', trigger: 'change' }
    ],
    equipmentCode: [
      { required: true, message: '设备编号不能为空', trigger: 'change' },
      { validator: (rule, value) => validateEquipmentCodeUnique(rule, value), trigger: 'blur' }
    ],
    equipmentName: [
      { required: true, message: '设备名称不能为空', trigger: 'change' }
    ],
    useDeptId: [
      { required: true, message: '使用部门不能为空', trigger: 'change' }
    ],
    tpmAreaId: [
      { required: true, message: '设备地理区域不能为空', trigger: 'change' }
    ],
    storageLocation: [
      { required: true, message: '具体位置不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ]
  });
  // 特种设备校验规则
  const rules_01 = reactive({
    registrationCode: [{ required: true, message: '注册代码不能为空' }],
    ynAnnualInspection: [{ required: true, message: '是否年检不能为空' }]
  });
  // 普通设备校验规则
  const rules_05 = reactive({
    manufactureFactoryName: [{ required: true, message: '生产厂家不能为空', trigger: 'change' }],
    manufactureFactoryCountry: [{ required: true, message: '厂家国别不能为空', trigger: 'change' }],
    originalValue: [{ required: true, message: '原值不能为空', trigger: 'change' }],
    abcdType: [{ required: true, message: '设备级别不能为空', trigger: 'change' }],
    recordDate: [{ required: true, message: '启用时间不能为空', trigger: 'change' }],
    responseUserId: [{ required: true, message: '责任人不能为空', trigger: 'change' }],
    equipmentManageDeptId: [{ required: true, message: '管理部门不能为空', trigger: 'change' }]
  });
  const rules = reactive({});
  for (const key in rules_common) {
    rules[key] = rules_common[key];
  }
  // const rules: Record<string, Rule[]> = {
  // equipmentType: [
  //   { required: true, message: '设备类型不能为空', trigger: 'change' }
  // ],
  // tpmAssetClassId: [
  //   { required: true, message: '设备大类不能为空', trigger: 'change' }
  // ],
  // assetsCode: [
  //   { required: true, message: '资产编号不能为空', trigger: 'change' }
  // ],
  // equipmentCode: [
  //   { required: true, message: '设备编号不能为空', trigger: 'change' }
  // ],
  // equipmentName: [
  //   { required: true, message: '设备名称不能为空', trigger: 'change' }
  // ],
  // useDeptId: [
  //   { required: true, message: '使用部门不能为空', trigger: 'change' }
  // ],
  // tpmAreaId: [
  //   { required: true, message: '设备地理区域不能为空', trigger: 'change' }
  // ],
  // storageLocation: [
  //   { required: true, message: '具体位置不能为空', trigger: 'change' }
  // ],
  // secretLevel: [
  //   { required: true, message: '密级不能为空', trigger: 'change' }
  // ],
  // manufactureFactoryName: [
  //   { required: true, message: '生产厂家不能为空', trigger: 'change' }
  // ],
  // manufactureFactoryCountry: [
  //   { required: true, message: '厂家国别不能为空', trigger: 'change' }
  // ],

  // abcdType: [
  //   { required: true, message: '设备级别不能为空', trigger: 'change' }
  // ],

  // responseUserId: [
  //   { required: true, message: '责任人不能为空', trigger: 'change' }
  // ],
  // recordDate: [
  //   { required: true, message: '启用时间不能为空', trigger: 'change' }
  // ],
  // equipmentManageDeptId: [
  //   { required: true, message: '管理部门不能为空', trigger: 'change' }
  // ],
  // };

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
  const ynFixedList = ref([]); // 是转固，通用代码：YN_FLAG^ Y是，N否通用代码
  const assetTypeList = ref([]); // 资产类别通用代码
  const assetsUseList = ref([]); // 资产用途通用代码
  const transferProjectTypeList = ref([]); // 移交项目类别通用代码
  const ynMaintainList = ref([]); // 是否保养通用代码
  const ynTransferRecordList = ref([]); // 是否调拨通用代码
  const equipmentUseList = ref([]); // 用途通用代码
  const ynBottleneckEquipmentList = ref([]); // 是否瓶颈设备通用代码
  const energyEfficiencyList = ref([]); // 能效通用代码
  const ynAnnualInspectionList = ref([]); // 是否年检通用代码
  const ynMajorAssetsList = ref([]); // 是否军工重大专用资产
  const capitalSourceList = ref([]);  // 资金来源通用代码
  const userStore = useUserStore();
  const lookupParams = [
    { fieldName: 'equipmentType', lookUpType: 'TPM_EQUIPMENT_TYPE' },
    { fieldName: 'abcdType', lookUpType: 'TPM_ABCD_TYPE' },
    { fieldName: 'keyOnlyChildFlag', lookUpType: 'YN_FLAG' },
    { fieldName: 'cncType', lookUpType: 'TPM_CNC_TYPE' },
    { fieldName: 'equipmentStatus', lookUpType: 'TPM_EQUIPMENT_STATUS' },
    { fieldName: 'assetsStatus', lookUpType: 'TPM_ASSETS_STATUS' },
    { fieldName: 'ynEntrance', lookUpType: 'YN_FLAG' },
    { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'YN_FLAG' },
    { fieldName: 'ynFixed', lookUpType: 'YN_FLAG' },
    { fieldName: 'assetType', lookUpType: 'TPM_ASSET_TYPE' },
    { fieldName: 'assetsUse', lookUpType: 'TPM_ASSETS_USE' },
    { fieldName: 'transferProjectType', lookUpType: 'TPM_TRANSFER_PROJECT_TYPE' },
    { fieldName: 'ynMaintain', lookUpType: 'YN_FLAG' },
    { fieldName: 'ynTransferRecord', lookUpType: 'YN_FLAG' },
    { fieldName: 'equipmentUse', lookUpType: 'TPM_EQUIPMENT_USE' },
    { fieldName: 'ynBottleneckEquipment', lookUpType: 'YN_FLAG' },
    { fieldName: 'energyEfficiency', lookUpType: 'TPM_ENERGY_EFFICIENCY' },
    { fieldName: 'ynAnnualInspection', lookUpType: 'YN_FLAG' },
    { fieldName: 'ynMajorAssets', lookUpType: 'YN_FLAG' },
    { fieldName: 'capitalSource', lookUpType: 'TPM_CAPITAL_SOURCE' }
  ];
  /** 
   *  过滤设备类型列表，只显示1特种设备5普通设备
   *  by 于小耘
   *  Date 20231111
   */
  watchEffect(() => {
    if (equipmentTypeList.value.length > 0) {
      equipmentTypeList.value = equipmentTypeList.value.filter(item => item.lookupCode != 10 && item.lookupCode != 15);
    }
  });
  /** 
   *  监听设备类型，动态修改校验规则。
   *  by 于小耘
   *  Date 20231112
   */
  watch(
    () => form.value.equipmentType,
    newVal => {
      for (const key in rules) {
        if (!(key in rules_common)) {
          delete rules[key];
        }
      }
      if (newVal === '1') { 
        for (const key in rules_01) {
          rules[key] = rules_01[key];
        }
      } else if (newVal === '20' || newVal === '25' || newVal === '30') {  // 普通设备
        for (const key in rules_05) {
          rules[key] = rules_05[key];
        }
      }
    },
    { immediate: true }
  );
  /**
   *  监听是否军工关键设备，如果是，则军工关键设备专用代码必填。
   *  by 于小耘
   *  Date 20231112
   */
  watch(
    () => form.value.ynMilitaryKeyEquip,
    newVal => {
      console.log('军工关键设备==============>', newVal);
      if (newVal === '1') {
        rules['militaryKeyEquipCode'] = [{ required: true, message: '军工关键设备专用代码不能为空', trigger: 'change' }];
      }
    },
    { immediate: true }
  );
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
    // 初始化设备状态，默认【在用】
    if (!form.value.equipmentStatus) {
      form.value.equipmentStatus = '1';
    }
    // 初始化数量，默认为1
    if (!form.value.qty) {
      form.value.qty = '1';
    }
    // 初始化创建人姓名,默认为当前登录人
    if (!form.value.attribute01) {
      form.value.attribute01 = proxy.$getLoginUser().name;
    }
    // 初始化责任人，默认为当前登录人
    if (!form.value.responseUserId) {
      form.value.responseUserId = proxy.$getLoginUser().id;
      form.value.responseUserName = proxy.$getLoginUser().name;
    }
    // 初始化管理部门，默认为当前登录人部门
    if (!form.value.equipmentManageDeptId) {
      form.value.equipmentManageDeptId = proxy.$getLoginUser().deptId;
      form.value.attribute02 = proxy.$getLoginUser().deptName;
    }
    // 初始化使用部门，默认为当前登录人部门
    if (!form.value.useDeptId) {
      form.value.useDeptId = proxy.$getLoginUser().deptId;
      form.value.useDeptName = proxy.$getLoginUser().deptName;
    }
  };

  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      console.log(result)
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
      ynMajorAssetsList.value = result.ynMajorAssets;
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
        // if (form.value.abcdType) {
        //   form.value.abcdType = '';
        // }
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

  /** 
   *  CommenSelect 组件 callback 事件扩展
   *  增加点击确定按钮后，表单name字段写入功能
   *  by 于小耘
   *  Date 20231110
   */
  const getSelectName = (e, name) => {
    form.value[name] = e.names;
  };
  const getTreeNodeTitle = (nodeTitle, name) => {
    form.value[name] = nodeTitle;
  };
  const getTreeChangeId = (id) =>{
    if(!id) return
    getCodeById(id).then(res =>{
      if (res.success){
        form.value.equipmentCode = res.data
      }
    })
  }
  /** 异步校验设备编号唯一 */
  async function validateEquipmentCodeUnique(rule, value) {
    if (value) {
      const res = await checkEquipmentCodeUnique({
        reportDate: value,
        id: props.formId || form.value.id || ''
      });
      if (res.success) {
        if (res.data) {
          return Promise.resolve();
        } else {
          return Promise.reject('设备编号已存在!');
        }
      } else {
        return Promise.reject('设备编号唯一性校验失败!');
      }
    } else {
      return Promise.resolve();
    }
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
    ynMajorAssetsList,
    uploadFile,
    proxy,
    afterUploadEvent,
    saveForm,
    closeModal,
    getSelectName,
    getTreeNodeTitle,
    getTreeChangeId,
  };
}
