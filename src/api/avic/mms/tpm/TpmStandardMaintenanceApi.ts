import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmstandardmaintenances';

/** 设备标准保养规程表 */
export interface TpmStandardMaintenanceDto extends BaseBeanModel {
  /** 设备标准主表ID */
  tpmStandardId?: string;
  /** 序号 */
  serialNo?: number;
  /** 保养部位 */
  maintenancePosition?: string;
  /** 保养项目 */
  maintenanceItems?: string;
  /** 保养依据 */
  maintenanceBasis?: string;
  /** 保养内容 */
  maintenanceContent?: string;
  /** 保养要求 */
  maintenanceRequirement?: string;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 申请人ID */
  applyUserId?: string;
  applyUserIdAlias?: string;
  /** 申请人姓名 */
  applyUserName?: string;
  /** 保养周期 */
  maintenanceCycle?: number;
  /** 主管技术员ID */
  techUserId?: string;
  techUserIdAlias?: string;
  /** 主管计划员姓名 */
  techUserName?: string;
  /** 小时数 */
  maintenanceHours?: number;
  /** 是否自主维护 */
  ynSelfMaintenance?: any;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
  /** 预留字段 */
  attribute01?: string;
  /** 预留字段 */
  attribute02?: string;
  /** 预留字段 */
  attribute03?: string;
  /** 预留字段 */
  attribute04?: string;
  /** 预留字段 */
  attribute05?: string;
  /** 预留字段 */
  attribute06?: string;
  /** 预留字段 */
  attribute07?: string;
  /** 预留字段 */
  attribute08?: string;
  /** 预留字段 */
  attribute09?: string;
  /** 预留字段 */
  attribute10?: string;
  /** 上次保养日期 */
  lastMaintenDate?: any;
  lastMaintenDateBegin?: any;
  lastMaintenDateEnd?: any;
  /** 主管计划员编码 */
  techUserCode?: string;
  /** 申请人编码 */
  applyUserCode?: string;
  /** 使用部门 */
  useDeptId?: string;
}

/** 获取分页数据 */
export function listTpmStandardMaintenanceByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmStandardMaintenanceDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

export function listTpmStandardMaintenanceSelectByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmStandardMaintenanceDto>> {
  return request.post(basePath + '/search-select-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmStandardMaintenance(id: string): Promise<ResponseBaseData<TpmStandardMaintenanceDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmStandardMaintenance(form: TpmStandardMaintenanceDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmStandardMaintenance(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
