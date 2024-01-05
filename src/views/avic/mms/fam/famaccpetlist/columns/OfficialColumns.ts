import { baseObj } from '@/views/avic/mms/fam/famaccpetlist/ListColumns';

/** 办公家具列 （8）*/
export const OfficialColumns = [
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
    title: '供应商名称',
    dataIndex: 'supplier',
    key: 'supplier',
    ellipsis: true,
    minWidth: 120,
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
    title: '设备序列号',
    dataIndex: 'equipmentNumber',
    key: 'equipmentNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '存储介质类型',
    dataIndex: 'storageType',
    key: 'storageType',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'center'
  },
  {
    title: '存储介质序列号',
    dataIndex: 'storageNumber',
    key: 'storageNumber',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'center'
  },
  {
    title: '存储介质编码',
    dataIndex: 'storageCode',
    key: 'storageCode',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'center'
  },
  {
    title: '存储介质名称',
    dataIndex: 'storageName',
    key: 'storageName',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'center'
  },
  {
    title: '联网设备IP地址',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '存储介质密级',
    dataIndex: 'storageLevel',
    key: 'storageLevel',
    ellipsis: true,
    minWidth: 180,
    resizable: true,
    align: 'center'
  },
  {
    title: '存储介质使用状态',
    dataIndex: 'storageState',
    key: 'storageState',
    ellipsis: true,
    minWidth: 180,
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


/** 获取家具的对象 */
export function getOfficialObject(props,uuid) {

  return {
    ...baseObj,
    id: 'newLine' + uuid,
    assetClass: props ? props.classCode : '',
    assetClassName: props ? props.className : '',
    useTime: props ? props.useTime : '',
    geographicalAreaName: '',
    assetSecretLevel: ''
  };
};

/** 办公家具列验收 */
export const OfficialValidateRules = {
  geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  assetSecretLevel: [{ required: true, message: '密级不能为空' }]
};
