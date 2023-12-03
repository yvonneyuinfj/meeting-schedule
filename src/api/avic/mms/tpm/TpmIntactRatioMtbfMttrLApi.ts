import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import { TpmIntactRatioMtbfMttrDto } from './TpmIntactRatioMtbfMttrApi';

const basePath = '/mms/tpm/tpmintactratiomtbfmttrls';

/** 设备完好率、MTBF、MTTR申报子表 */
export interface TpmIntactRatioMtbfMttrLDto extends BaseBeanModel {
  /** 设备完好率、MTBF、MTTR申报主表ID */
  tpmIntactRatioMtbfMttrId?: string;
  /** 设备台账ID */
  tpmInventoryId?: string;
  /** 设备编号 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 合计 */
  equipmentStatusTotal?: number;
  /** 设备运行时间（h） */
  equipmentRunTime?: string;
  /** 设备故障修复时间（h） */
  repairTime?: string;
  /** 设备故障次数 */
  failureNumber?: string;
  /** MTBF */
  mtbf?: string;
  /** MTTR */
  mttr?: string;
  /** 月MTBF */
  monthMtbf?: string;
  /** 月MTTR */
  monthMttr?: string;
  /** 月设备状态 */
  equipmentStatus?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listTpmIntactRatioMtbfMttrLByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmIntactRatioMtbfMttrLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmIntactRatioMtbfMttrL(id: string): Promise<ResponseBaseData<TpmIntactRatioMtbfMttrLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmIntactRatioMtbfMttrL(form: TpmIntactRatioMtbfMttrLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmIntactRatioMtbfMttrL(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 获取指定年份的子表数据 */
export function getSpecifyYearList(form: TpmIntactRatioMtbfMttrDto, subForm: TpmIntactRatioMtbfMttrLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/getSpecifyYearList/v1', { form: form, subForm: subForm });
}
