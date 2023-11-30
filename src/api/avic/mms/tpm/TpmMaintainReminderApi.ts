import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/tpm/tpmmaintainreminder';

/** 设备保养提醒 */
export interface TpmMaintainReminderDto extends BaseBeanModel {
  /** 设备编号，编码规则：分类码+四位流水 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 保养项目 */
  maintenanceItems?: string;
  /** 保养部位 */
  maintenancePosition?: string;
  /** 计划保养日期 */
  planMaintenDate?: any;
  /** 上次保养日期 */
  lastMaintenDate?: any;
  /** 小时数 */
  maintenanceHours?: number;
  /** 使用部门ID */
  useDeptId?: string;
  /** 使用部门NAME */
  useDeptName?: string;
  /** 主管技术员ID */
  techUserId?: string;
  techUserIdAlias?: string;
}

/** 获取分页数据 */
export function listTpmStandardByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmMaintainReminderDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}
