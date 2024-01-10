import { baseObj } from '@/views/avic/mms/fam/famaccpetlist/ListColumns';

/** IT列 (6) */
export const ITColumns = [
  // {
  //   title: '地理区域',
  //   dataIndex: 'geographicalAreaName',
  //   key: 'geographicalAreaName',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
  //   align: 'center'
  // },
  // {
  //   title: '资产用途',
  //   dataIndex: 'assetsUse',
  //   key: 'assetsUse',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
  //   align: 'center'
  // },
  // {
  //   title: '设备类型',
  //   dataIndex: 'equipType',
  //   key: 'equipType',
  //   ellipsis: true,
  //   minWidth: 180,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
  //   align: 'center'
  // },
  // {
  //   title: '是否军工关键设备',
  //   dataIndex: 'ynMilitaryKeyEquip',
  //   key: 'ynMilitaryKeyEquip',
  //   ellipsis: true,
  //   minWidth: 200,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
  //   align: 'center'
  // },
  // {
  //   title: '使用位置',
  //   dataIndex: 'usePosition',
  //   key: 'usePosition',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   customHeaderCell() {
  //     return {
  //       ['class']: 'required-table-title'
  //     };
  //   },
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
    align: 'center'
  }
];


/** 获取IT的对象 */
export function getITObj(props, uuid) {

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
    ownershipCertNo: '',
    assetSecretLevel: '',
    ynMilitaryKeyEquip: '',
    productionDate: '',
    usePosition: '',
    factoryNo: ''
  };
};

/** IT列校验 */
export const ITValidateRules = {
  // geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  // assetsUse: [{ required: true, message: '资产用途不能为空' }],
  // equipType: [{ required: true, message: '设备类型不能为空' }],
  // ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  // usePosition: [{ required: true, message: '使用位置不能为空' }],
  // assetSecretLevel: [{ required: true, message: '密级不能为空' }]
};
