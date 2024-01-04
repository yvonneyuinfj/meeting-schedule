import { CarColumns, getCarsObj } from '@/views/avic/mms/fam/famaccpetlist/columns/CarColumns';
import { DeviceColumns, getDeviceObj } from '@/views/avic/mms/fam/famaccpetlist/columns/DeviceColumns';
import { HouseColumns, getHouseObj } from '@/views/avic/mms/fam/famaccpetlist/columns/HouseColumns';
import { ITColumns, getITObj } from '@/views/avic/mms/fam/famaccpetlist/columns/ITColumns';
import { OfficialColumns, getOfficialObject } from '@/views/avic/mms/fam/famaccpetlist/columns/OfficialColumns';

/** 基础列 */
export const BaseColumns = [
  {
    title: '资产编号',
    dataIndex: 'assetNo',
    key: 'assetNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left',
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '资产名称',
    dataIndex: 'assetName',
    key: 'assetName',
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
    title: '资产类别',
    dataIndex: 'assetClassName',
    key: 'assetClassName',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '资产型号',
    dataIndex: 'assetModel',
    key: 'assetModel',
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
    title: '资产单价',
    dataIndex: 'assetUnit',
    key: 'assetUnit',
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
    title: '资产数量',
    dataIndex: 'assetNum',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left',
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    key: 'assetOriginalValue',
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
    title: '品牌',
    dataIndex: 'brand',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left',
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '存放地点',
    dataIndex: 'installLocation',
    key: 'installLocation',
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
    title: '责任人',
    dataIndex: 'liablePerson',
    key: 'liablePerson',
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
    title: '资产规格',
    dataIndex: 'assetSpec',
    key: 'assetSpec',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '净值',
    dataIndex: 'assetNetValue',
    key: 'assetNetValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '累计折旧值',
    dataIndex: 'firstDepreciationValue',
    key: 'firstDepreciationValue',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '采购合同编号',
    dataIndex: 'procureOrder',
    key: 'procureOrder',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
    key: 'invoiceNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '生产商',
    dataIndex: 'producer',
    key: 'producer',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '出厂号',
    dataIndex: 'factoryNo',
    key: 'factoryNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '权属证号',
    dataIndex: 'ownershipCertNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂日期',
    dataIndex: 'productionDate',
    key: 'productionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
];
/** 全部的输入列 */

export const AllColumns = [
  {
    title: '资产名称',
    dataIndex: 'assetName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产类别',
    dataIndex: 'assetClassName',
    key: 'assetClassName',
    minWidth: 120
  },

  {
    title: '资产编号',
    dataIndex: 'assetNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用年限',
    dataIndex: 'useTime',
    key: 'useTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备大类',
    dataIndex: 'equipClassName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '地理区域',
    dataIndex: 'geographicalAreaName',
    key: 'geographicalAreaName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产规格',
    dataIndex: 'assetSpec',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产型号',
    dataIndex: 'assetModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产单价',
    dataIndex: 'assetUnit',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产数量',
    dataIndex: 'assetNum',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'installLocation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厂商',
    dataIndex: 'producer',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂号',
    dataIndex: 'factoryNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购合同',
    dataIndex: 'procureOrder',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '权属证号',
    dataIndex: 'ownershipCertNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂日期',
    dataIndex: 'productionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '父资产编号',
    dataIndex: 'parentAssetNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质保期',
    dataIndex: 'warrantyPeriod',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资金来源',
    dataIndex: 'fundSource',
    key: 'fundSource',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否为进口设备',
    dataIndex: 'importedOrNotName',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
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
    title: '所属土地',
    dataIndex: 'belongingLand',
    key: 'belongingLand',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不动产权证书',
    dataIndex: 'certificateTitle',
    key: 'certificateTitle',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不动产权面积',
    dataIndex: 'certificateTitleArea',
    key: 'certificateTitleArea',
    ellipsis: true,
    minWidth: 120,
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
    title: '竣工备案书档案编号',
    dataIndex: 'recordNumber',
    key: 'recordNumber',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '工程规划许可证',
    dataIndex: 'planningPermit',
    key: 'planningPermit',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '通知书',
    dataIndex: 'notice',
    key: 'notice',
    ellipsis: true,
    minWidth: 120,
    resizable: true,

    align: 'center'
  },
  {
    title: '附图档案编号',
    dataIndex: 'attachedFileNumber',
    key: 'attachedFileNumber',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否为科研厂房',
    dataIndex: 'isFactoryBuilding',
    key: 'isFactoryBuilding',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '入账前当年折旧',
    dataIndex: 'currentYearDepreciation',
    key: 'currentYearDepreciation',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产数量',
    dataIndex: 'assetNum',
    key: 'assetNum',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '进口设备国别',
    dataIndex: 'importedEquipment',
    key: 'importedEquipment',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '车辆用途',
    dataIndex: 'vehicleUsage',
    key: 'vehicleUsage',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
  {
    title: '车牌号',
    dataIndex: 'licensePlateNumber',
    key: 'licensePlateNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '排气量/ml',
    dataIndex: 'airDisplacement',
    key: 'airDisplacement',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发动机号',
    dataIndex: 'engineNo',
    key: 'engineNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '使用位置',
    dataIndex: 'usePosition',
    key: 'usePosition',
    ellipsis: true,
    minWidth: 120,
    resizable: true,

    align: 'center'
  },
  {
    title: '建筑面积',
    dataIndex: 'floorspace',
    key: 'floorspace',
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
    title: '设备级别',
    dataIndex: 'abcdType',
    key: 'abcdType',
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
    title: '资产净值',
    dataIndex: 'assetNetValue',
    key: 'assetNetValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '启动时间',
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
    title: '能效',
    dataIndex: 'energyefficiencyName',
    key: 'energyefficiencyName',
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
  }
];

export const Columns = [
  {
    title: '资产名称',
    dataIndex: 'assetName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产类别',
    dataIndex: 'assetClassName',
    key: 'assetClassName',
    minWidth: 120
  },

  {
    title: '资产编号',
    dataIndex: 'assetNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用年限',
    dataIndex: 'useTime',
    key: 'useTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备大类',
    dataIndex: 'equipClassName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '地理区域',
    dataIndex: 'geographicalAreaName',
    key: 'geographicalAreaName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产规格',
    dataIndex: 'assetSpec',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产型号',
    dataIndex: 'assetModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产单价',
    dataIndex: 'assetUnit',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产数量',
    dataIndex: 'assetNum',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'installLocation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厂商',
    dataIndex: 'producer',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂号',
    dataIndex: 'factoryNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购合同',
    dataIndex: 'procureOrder',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '权属证号',
    dataIndex: 'ownershipCertNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂日期',
    dataIndex: 'productionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '父资产编号',
    dataIndex: 'parentAssetNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质保期',
    dataIndex: 'warrantyPeriod',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资金来源',
    dataIndex: 'fundSource',
    key: 'fundSource',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否为进口设备',
    dataIndex: 'importedOrNotName',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
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
    title: '所属土地',
    dataIndex: 'belongingLand',
    key: 'belongingLand',
    ellipsis: true,
    minWidth: 120,
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
    title: '不动产权面积',
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
    title: '竣工备案书档案编号',
    dataIndex: 'recordNumber',
    key: 'recordNumber',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '工程规划许可证',
    dataIndex: 'planningPermit',
    key: 'planningPermit',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '通知书',
    dataIndex: 'notice',
    key: 'notice',
    ellipsis: true,
    minWidth: 120,
    resizable: true,

    align: 'center'
  },
  {
    title: '附图档案编号',
    dataIndex: 'attachedFileNumber',
    key: 'attachedFileNumber',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否为科研厂房',
    dataIndex: 'isFactoryBuilding',
    key: 'isFactoryBuilding',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '入账前当年折旧',
    dataIndex: 'currentYearDepreciation',
    key: 'currentYearDepreciation',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产数量',
    dataIndex: 'assetNum',
    key: 'assetNum',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '进口设备国别',
    dataIndex: 'importedEquipment',
    key: 'importedEquipment',
    ellipsis: true,
    minWidth: 200,
    resizable: true,
    align: 'center'
  },
  {
    title: '车辆用途',
    dataIndex: 'vehicleUsage',
    key: 'vehicleUsage',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
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
  {
    title: '车牌号',
    dataIndex: 'licensePlateNumber',
    key: 'licensePlateNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '排气量/ml',
    dataIndex: 'airDisplacement',
    key: 'airDisplacement',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发动机号',
    dataIndex: 'engineNo',
    key: 'engineNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
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
    title: '使用位置',
    dataIndex: 'usePosition',
    key: 'usePosition',
    ellipsis: true,
    minWidth: 120,
    resizable: true,

    align: 'center'
  },
  {
    title: '建筑面积',
    dataIndex: 'floorspace',
    key: 'floorspace',
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
    title: '使用年限',
    dataIndex: 'useTime',
    key: 'useTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质保期',
    dataIndex: 'warrantyPeriod',
    key: 'warrantyPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  {
    title: '父资产编号',
    dataIndex: 'parentAssetNo',
    key: 'parentAssetNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
];

export const baseObj = {
  operationType_: 'insert',
  isNewAsset: undefined,
  assetName: '',
  assetModel: '',
  assetUnit: '',
  brand: '',
  assetOriginalValue: '',
  installLocation: '',
  liablePerson: '',
  importedOrNot: undefined,
  editable: true, // true为编辑中, false为未编辑
  assetNum: '1'
};

export function backColumnsObj() {
  return {
    baseObj,
    getCarsObj,
    getDeviceObj,
    getHouseObj,
    getITObj,
    getOfficialObject
  };
}


export const ListColumns = {
  BaseColumns,
  AllColumns,
  Columns,
  CarColumns,
  DeviceColumns,
  HouseColumns,
  ITColumns,
  OfficialColumns
};

