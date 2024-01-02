/** 房屋土地列验证 */
export const HouseValidateRules = {
  assetName: [{ required: true, message: '资产名称不能为空' }],
  assetClass: [{ required: true, message: '资产类别不能为空' }],
  assetsUse: [{ required: true, message: '资产用途不能为空' }],
  assetOriginalValue: [{ required: true, message: '资产原值不能为空' }],
  equipType: [{ required: true, message: '设备类型不能为空' }],
  geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  installLocation: [{ required: true, message: '存放地点不能为空' }],
  // managerDeptId: [{ required: true, message: '主管部门不能为空' }],
  liablePerson: [{ required: true, message: '责任人不能为空' }],
  producer: [{ required: true, message: '厂商不能为空' }],
  ownershipCertNo: [{ required: true, message: '权属证号不能为空' }],
  assetSecretLevel: [{ required: true, message: '资产密级不能为空' }],
  ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  // receiveDeptId: [{ required: true, message: '使用部门不能为空' }],
  assetUnit: [{ required: true, message: '资产单价不能为空' }],
  productionDate: [{ required: true, message: '出厂日期不能为空' }],
  floorspace: [{ required: true, message: '建筑面积不能为空' }],
  commencementTime: [{ required: true, message: '开工时间不能为空' }],
  timeCompletion: [{ required: true, message: '竣工时间不能为空' }],
  belongingLand: [{ required: true, message: '所属土地不能为空' }],
  certificateTitle: [{ required: true, message: '不动产权证书不能为空' }],
  certificateTitleArea: [{ required: true, message: '不动产权面积不能为空' }],
  issuanceTime: [{ required: true, message: '发证时间不能为空' }],
  recordNumber: [{ required: true, message: '竣工备案书档案编号不能为空' }],
  planningPermit: [{ required: true, message: '工程规划许可证不能为空' }],
  notice: [{ required: true, message: '通知书不能为空' }],
  attachedFileNumber: [{ required: true, message: '附图档案编号不能为空' }],
  isFactoryBuilding: [{ required: true, message: '是否为科研厂房不能为空' }]
};

/** 设备验收 */
export const DeviceValidateRules = {
  assetName: [{ required: true, message: '资产名称不能为空' }],
  assetClass: [{ required: true, message: '资产类别不能为空' }],
  assetsUse: [{ required: true, message: '资产用途不能为空' }],
  assetOriginalValue: [{ required: true, message: '资产原值不能为空' }],
  geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  installLocation: [{ required: true, message: '存放地点不能为空' }],
  // managerDeptId: [{ required: true, message: '管理部门不能为空' }],
  liablePerson: [{ required: true, message: '责任人不能为空' }],
  assetModel: [{ required: true, message: '资产型号不能为空' }],
  producer: [{ required: true, message: '厂商不能为空' }],
  assetSecretLevel: [{ required: true, message: '资产密级不能为空' }],
  ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  // receiveDeptId: [{ required: true, message: '使用部门不能为空' }],
  fundSource: [{ required: true, message: '资金来源不能为空' }],
  assetUnit: [{ required: true, message: '资产单价不能为空' }],
  importedOrNot: [{ required: true, message: '是否为进口设备不能为空' }],
  productionDate: [{ required: true, message: '出厂日期不能为空' }],
  equipClassName: [{ required: true, message: '设备大类不能为空' }],
  // storageLocation: [{ required: true, message: '具体位置不能为空' }],
  abcdType: [{ required: true, message: '设备级别不能为空' }]
};


/** 车辆列验收 */
export const CarValidateRules = {
  assetName: [{ required: true, message: '资产名称不能为空' }],
  assetClass: [{ required: true, message: '资产类别不能为空' }],
  assetsUse: [{ required: true, message: '资产用途不能为空' }],
  assetOriginalValue: [{ required: true, message: '资产原值不能为空' }],
  equipType: [{ required: true, message: '设备类型不能为空' }],
  geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  installLocation: [{ required: true, message: '存放地点不能为空' }],
  // managerDeptId: [{ required: true, message: '主管部门不能为空' }],
  liablePerson: [{ required: true, message: '责任人不能为空' }],
  assetModel: [{ required: true, message: '资产型号不能为空' }],
  producer: [{ required: true, message: '厂商不能为空' }],
  assetSecretLevel: [{ required: true, message: '资产密级不能为空' }],
  ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  // receiveDeptId: [{ required: true, message: '使用部门不能为空' }],
  assetUnit: [{ required: true, message: '资产单价不能为空' }],
  productionDate: [{ required: true, message: '出厂日期不能为空' }],
  vehicleUsage: [{ required: true, message: '车辆用途不能为空' }],
  vehicleNumber: [{ required: true, message: '车辆识别号不能为空' }],
  brand: [{ required: true, message: '品牌不能为空' }],
  licensePlateNumber: [{ required: true, message: '车牌号不能为空' }],
  airDisplacement: [{ required: true, message: '排气量/ml不能为空' }],
  engineNo: [{ required: true, message: '发动机号不能为空' }]
};

/** 办公家具列验收 */
export const OfficialValidateRules = {
  assetName: [{ required: true, message: '资产名称不能为空' }],
  assetClass: [{ required: true, message: '资产类别不能为空' }],
  assetsUse: [{ required: true, message: '资产用途不能为空' }],
  assetOriginalValue: [{ required: true, message: '资产原值不能为空' }],
  equipType: [{ required: true, message: '设备类型不能为空' }],
  geographicalArea: [{ required: true, message: '地理区域不能为空' }],
  installLocation: [{ required: true, message: '存放地点不能为空' }],
  // managerDeptId: [{ required: true, message: '主管部门不能为空' }],
  liablePerson: [{ required: true, message: '责任人不能为空' }],
  assetModel: [{ required: true, message: '资产型号不能为空' }],
  producer: [{ required: true, message: '厂商不能为空' }],
  ownershipCertNo: [{ required: true, message: '权属证号不能为空' }],
  assetSecretLevel: [{ required: true, message: '资产密级不能为空' }],
  ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  // receiveDeptId: [{ required: true, message: '使用部门不能为空' }],
  assetUnit: [{ required: true, message: '资产单价不能为空' }],
  productionDate: [{ required: true, message: '出厂日期不能为空' }]
};

/** IT列校验 */
export const ITValidateRules = {
  assetName: [{ required: true, message: '资产名称不能为空' }],
  assetClass: [{ required: true, message: '资产类别不能为空' }],
  assetsUse: [{ required: true, message: '资产用途不能为空' }],
  assetOriginalValue: [{ required: true, message: '资产原值不能为空' }],
  equipType: [{ required: true, message: '设备类型不能为空' }],
  geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  installLocation: [{ required: true, message: '存放地点不能为空' }],
  // managerDeptId: [{ required: true, message: '主管部门不能为空' }],
  liablePerson: [{ required: true, message: '责任人不能为空' }],
  assetModel: [{ required: true, message: '资产型号不能为空' }],
  producer: [{ required: true, message: '厂商不能为空' }],
  ownershipCertNo: [{ required: true, message: '权属证号不能为空' }],
  assetSecretLevel: [{ required: true, message: '资产密级不能为空' }],
  ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  // receiveDeptId: [{ required: true, message: '使用部门不能为空' }],
  assetUnit: [{ required: true, message: '资产单价不能为空' }],
  productionDate: [{ required: true, message: '出厂日期不能为空' }],
  usePosition: [{ required: true, message: '使用位置不能为空' }],
  factoryNo: [{ required: true, message: '出厂序列号不能为空' }]
};
