import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/myportal/meeting/meetingrooms';
/** 会议室台账表 */
export interface MeetingRoomDto extends BaseBeanModel {
  /** 会议室名称 */
  name?: string;
  /** 会议室容量 */
  capacity?: number;
  /** 会议室地点ID */
  locationId?: string;
  /** 会议室地点名称 */
  locationName?: string;
  /** 会议室描述 */
  descrption?: string;
  /** 管理员 */
  adminId?: string;
  adminIdAlias?: string;
  /** 管理员职工号 */
  adminCode?: string;
  /** 管理员姓名 */
  adminName?: string;
  /** 联系电话 */
  adminPhone?: string;
  /** 是否公开 */
  ynPublic?: any;
  /** 排序 */
  orderBy?: number;
  /** 管理部门 */
  ownerDeptId?: string;
  ownerDeptIdAlias?: string;
  /** 管理部门编号 */
  ownerDeptCode?: string;
  /** 管理部门名称 */
  ownerDeptName?: string;
  /** 是否需要审批 */
  ynApprove?: any;
  /** 审批人员IDS */
  approvalIds?: string;
  approvalIdsAlias?: string;
  /** 审批人员职工号 */
  approvalCodes?: string;
  /** 审批人员姓名 */
  approvalNames?: string;
  /** 是否可用 */
  ynValid?: any;
  /** 备注 */
  note?: string;
  /** 预留字段01 */
  attribute01?: string;
  /** 预留字段02 */
  attribute02?: string;
  /** 预留字段03 */
  attribute03?: string;
  /** 预留字段04 */
  attribute04?: string;
  /** 预留字段05 */
  attribute05?: string;
  /** 预留字段06 */
  attribute06?: string;
  /** 预留字段07 */
  attribute07?: string;
  /** 预留字段08 */
  attribute08?: string;
  /** 预留字段09 */
  attribute09?: any;
  attribute09Begin?: any;
  attribute09End?: any;
  /** 预留字段10 */
  attribute10?: any;
  attribute10Begin?: any;
  attribute10End?: any;
  /** 密级 */
  secretLevel?: any;
  /** 会议室设备ID */
  mtDeviceIds?: string;
  /** 会议室设备编号 */
  mtDeviceCodes?: string;
  /** 会议室设备名称 */
  mtDeviceNames?: string;
}

/** 获取分页数据 */
export function listMeetingRoomByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MeetingRoomDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMeetingRoom (id: string): Promise<ResponseBaseData<MeetingRoomDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMeetingRoom (form: MeetingRoomDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMeetingRoom (ids: [string]): Promise<ResponseBaseData<any>> {
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
