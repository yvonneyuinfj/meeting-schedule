import { baseObj } from '@/views/avic/mms/fam/famaccpetlist/ListColumns';

/** 房屋土地列 （1） */
export const HouseColumns = [
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
  {
    title: '是否军工关键设施',
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
    title: '建筑面积',
    dataIndex: 'floorspace',
    key: 'floorspace',
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
    title: '竣工备案书档案编号',
    dataIndex: 'recordNumber',
    key: 'recordNumber',
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
    title: '工程规划许可证编号',
    dataIndex: 'planningPermit',
    key: 'planningPermit',
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
    title: '通知书编号',
    dataIndex: 'notice',
    key: 'notice',
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
    title: '附图档案编号',
    dataIndex: 'attachedFileNumber',
    key: 'attachedFileNumber',
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
    title: '开工时间',
    dataIndex: 'commencementTime',
    key: 'commencementTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '竣工时间',
    dataIndex: 'timeCompletion',
    key: 'timeCompletion',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '验收时间',
    dataIndex: 'acceptanceTime',
    key: 'acceptanceTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '地理位置',
    dataIndex: 'geographicLocation',
    key: 'geographicLocation',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '所属土地',
    dataIndex: 'belongingLand',
    key: 'belongingLand',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '房屋类型',
    dataIndex: 'housingType',
    key: 'housingType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否科研厂房',
    dataIndex: 'isFactoryBuilding',
    key: 'isFactoryBuilding',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '不动产权证书',
    dataIndex: 'certificateTitle',
    key: 'certificateTitle',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '不动产权证书面积',
    dataIndex: 'certificateTitleArea',
    key: 'certificateTitleArea',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '发证时间',
    dataIndex: 'issuanceTime',
    key: 'issuanceTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '权证编号',
    dataIndex: 'certificateNumber',
    key: 'certificateNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },

  // {
  //   title: '入账前当年折旧',
  //   dataIndex: 'currentYearDepreciation',
  //   key: 'currentYearDepreciation',
  //   ellipsis: true,
  //   minWidth: 200,
  //   resizable: true,
  //   align: 'left'
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

/** 获取房屋的对象 */
export function getHouseObj(props, uuid) {
  return {
    ...baseObj,
    id: 'newLine' + uuid,
    assetClass: props ? props.classCode : '',
    assetClassName: props ? props.className : '',
    useTime: props ? props.useTime : '',
    assetsUse: '',
    // geographicalAreaName: '',
    producer: '',
    ownershipCertNo: '',
    assetSecretLevel: '',
    productionDate: '',
    floorspace: '',
    recordNumber: '',
    planningPermit: '',
    notice: '',
    attachedFileNumber: '',
  };
};

/** 房屋土地列验证 */
export const HouseValidateRules = {
  floorspace: [{ required: true, message: '建筑面积不能为空' }],
  // geographicalAreaName: [{ required: true, message: '地理区域不能为空' }],
  // assetsUse: [{ required: true, message: '资产用途不能为空' }],
  ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }],
  planningPermit: [{ required: true, message: '工程规划许可证不能为空' }],
  notice: [{ required: true, message: '通知书不能为空' }],
  attachedFileNumber: [{ required: true, message: '附图档案编号不能为空' }],
  assetSecretLevel: [{ required: true, message: '密级不能为空' }]
};
