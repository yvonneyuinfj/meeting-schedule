import { CarValidateRules } from './columns/CarColumns';
import { DeviceValidateRules } from './columns/DeviceColumns';
import { HouseValidateRules } from './columns/HouseColumns';
import { ITValidateRules } from './columns/ITColumns';
import { OfficialValidateRules } from './columns/OfficialColumns';

/** 基础字段校验 */
const BaseValidateRules = {
  // assetName: [{ required: true, message: '资产名称不能为空' }],
  // assetClass: [{ required: true, message: '资产类别不能为空' }],
  // assetModel: [{ required: true, message: '资产型号不能为空' }],
  // assetUnit: [{ required: true, message: '资产单价不能为空' }],
  // assetOriginalValue: [{ required: true, message: '资产原值不能为空' }],
  // brand: [{ required: true, message: '品牌不能为空' }],
  // installLocation: [{ required: true, message: '存放地点不能为空' }],
  // liablePerson: [{ required: true, message: '责任人不能为空' }]
};

export const validateRules = {
  BaseValidateRules,
  CarValidateRules,
  DeviceValidateRules,
  HouseValidateRules,
  ITValidateRules,
  OfficialValidateRules
};
