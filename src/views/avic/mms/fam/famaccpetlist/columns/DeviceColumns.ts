import { baseObj } from '@/views/avic/mms/fam/famaccpetlist/ListColumns';

/** 设备列  */
export const DeviceColumns = [
  {
    title: '地理区域',
    dataIndex: 'geographicalAreaName',
    key: 'geographicalAreaName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '设备级别',
    dataIndex: 'abcdType',
    key: 'abcdType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '资金来源',
    dataIndex: 'fundSource',
    key: 'fundSource',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  },
  {
    title: '是否军工关键设备',
    dataIndex: 'ynMilitaryKeyEquip',
    key: 'ynMilitaryKeyEquip',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '供应商名称',
    dataIndex: 'supplier',
    key: 'supplier',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '生产国别',
    dataIndex: 'countryOfOrigin',
    key: 'countryOfOrigin',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '启用时间',
    dataIndex: 'recordDate',
    key: 'recordDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '投产时间',
    dataIndex: 'commissionDate',
    key: 'commissionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '购置日期',
    dataIndex: 'purchaseDate',
    key: 'purchaseDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '对应试验器',
    dataIndex: 'equipmentNo',
    key: 'equipmentNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否保养',
    dataIndex: 'ynMaintainName',
    key: 'ynMaintainName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '能效',
    dataIndex: 'energyefficiencyName',
    key: 'energyefficiencyName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否为进口设备',
    dataIndex: 'importedOrNot',
    key: 'importedOrNot',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注',
    key: 'note',
    dataIndex: 'note',
    ellipsis: true,
    minWidth: 220,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产密级',
    dataIndex: 'assetSecretLevel',
    key: 'assetSecretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  }
];

/** 设备对象 */
export function getDeviceObj(props, uuid) {

  return {
    ...baseObj,
    id: 'newLine' + uuid,
    assetClass: props ? props.classCode : '',
    assetClassName: props ? props.className : '',
    useTime: props ? props.useTime : '',
    geographicalAreaName: '',
    abcdType: '',
    fundSource: '',
    equipClass: '',
    militaryKeyEquipCode: '',
    ynAnnualInspection: '',
    registrationCode: '',
    ynMilitaryKeyEquip: '',
    assetSecretLevel: ''
  };
}

/** 设备验收 */
export const DeviceValidateRules = {
  geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  abcdType: [{ required: true, message: '设备级别不能为空' }],
  fundSource: [{ required: true, message: '资金来源不能为空' }],
  ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  assetSecretLevel: [{ required: true, message: '密级不能为空' }]
};


