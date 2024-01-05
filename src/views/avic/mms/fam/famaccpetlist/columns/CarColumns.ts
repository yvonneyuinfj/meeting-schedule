import { baseObj } from '../ListColumns';

/** 车辆列  （4）*/
export const CarColumns = [
  {
    title: '车辆用途',
    dataIndex: 'vehicleUsage',
    key: 'vehicleUsage',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '车牌号',
    dataIndex: 'licensePlateNumber',
    key: 'licensePlateNumber',
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
    title: '排气量/ml',
    dataIndex: 'airDisplacement',
    key: 'airDisplacement',
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
    title: '发动机号',
    dataIndex: 'engineNo',
    key: 'engineNo',
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
    title: '车辆识别号',
    dataIndex: 'vehicleNumber',
    key: 'vehicleNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  // {
  //   title: '已提月份',
  //   dataIndex: 'monthProposed',
  //   key: 'monthProposed',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
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
    title: '密级',
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

/** 车辆对象 */
export function getCarsObj(props,uuid) {
  return {
    ...baseObj,
    id: 'newLine' + uuid,
    assetClass: props ? props.classCode : '',
    assetClassName: props ? props.className : '',
    useTime: props ? props.useTime : '',
    assetsUse: '',
    equipType: '',
    geographicalAreaName: '',
    producer: '',
    assetSecretLevel: '',
    ynMilitaryKeyEquip: '',
    productionDate: '',
    vehicleUsage: '',
    vehicleNumber: '',
    licensePlateNumber: '',
    airDisplacement: '',
    engineNo: ''
  };
};

/** 车辆校验 */
export const CarValidateRules = {
  vehicleUsage: [{ required: true, message: '车辆用途不能为空' }],
  licensePlateNumber: [{ required: true, message: '车牌号不能为空' }],
  airDisplacement: [{ required: true, message: '排气量/ml不能为空' }],
  engineNo: [{ required: true, message: '发动机号不能为空' }],
  assetSecretLevel: [{ required: true, message: '密级不能为空' }]
};

