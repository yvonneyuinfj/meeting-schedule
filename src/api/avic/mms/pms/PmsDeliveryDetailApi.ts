import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmsdeliverydetails';
/** 交付明细-采购负责人 */
export interface PmsDeliveryDetailDto extends BaseBeanModel {
  /** 计划ID */
  pmsPlanId?: string;
  /** 编号层次 */
  numberingHierarchy?: string;
  /** 计划类型 */
  planDeliveryType?: any;
  /** 生产任务分类 */
  productionTaskClassification?: string;
  /** 图号规格/目录 */
  drawingNoSpecification?: string;
  /** 名称 */
  name?: string;
  /** 单台数量（件） */
  quantityNumber?: number;
  /** 生产数量（件） */
  productionNumber?: number;
  /** 承制单位 */
  supplierDeptId?: string;
  supplierDeptIdAlias?: string;
  /** 承制单位编码 */
  supplierDeptCode?: string;
  /** 承制单位名称 */
  supplierDeptName?: string;
  /** 接收单位 */
  receiveDeptId?: string;
  receiveDeptIdAlias?: string;
  /** 接收单位编码 */
  receiveDeptCode?: string;
  /** 接收单位名称 */
  receiveDeptName?: string;
  /** 发图时间 */
  sendingTime?: any;
  sendingTimeBegin?: any;
  sendingTimeEnd?: any;
  /** 计划结束时间 */
  scheduledEndTime?: any;
  scheduledEndTimeBegin?: any;
  scheduledEndTimeEnd?: any;
  /** 执行文件 */
  executionFile?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listPmsDeliveryDetailByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsDeliveryDetailDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsDeliveryDetail (id: string): Promise<ResponseBaseData<PmsDeliveryDetailDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsDeliveryDetail (form: PmsDeliveryDetailDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsDeliveryDetail (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel (param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
