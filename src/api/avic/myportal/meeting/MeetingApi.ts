import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/myportal/meeting/meetings';
/** 会议日程信息表 */
export interface MeetingDto extends BaseBeanModel {
  /** 会议名称 */
  name?: string;
  /** 创建者 */
  authorId?: string;
  authorIdAlias?: string;
  /** 创建者姓名 */
  authorName?: string;
  /** 创建者职工号 */
  authorCode?: string;
  /** 会议室 */
  meetingRoomId?: string;
  meetingRoomIdAlias?: string;
  /** 会议室名称 */
  meetingRoomName?: string;
  /** 是否需要审批 */
  ynApprove?: any;
  /** 占用开始时间 */
  preStartTime?: any;
  preStartTimeBegin?: any;
  preStartTimeEnd?: any;
  /** 会议开始时间 */
  startTime?: any;
  startTimeBegin?: any;
  startTimeEnd?: any;
  /** 会议结束时间 */
  endTime?: any;
  endTimeBegin?: any;
  endTimeEnd?: any;
  /** 主持人 */
  hostId?: string;
  hostIdAlias?: string;
  /** 主持人职工号 */
  hostCode?: string;
  /** 主持人名称 */
  hostName?: string;
  /** 是否可用 */
  ynValid?: any;
  /** 会议内容 */
  content?: string;
  /** 会议类型 */
  meetingTypeId?: string;
  /** 会议类型编号 */
  meetingTypeCode?: string;
  /** 会议类型 */
  meetingTypeName?: string;
  /** 参会人员 */
  attendeeIds?: string;
  attendeeIdsAlias?: string;
  /** 参会人员职工号 */
  attendeeCodes?: string;
  /** 参会人员姓名 */
  attendeeNames?: string;
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
  /** 地点ID */
  placeId?: string;
  /** 地点名称 */
  placeName?: string;
  /** 审批人ID */
  approvalIds?: string;
  /** 审批人代码 */
  approvalCodes?: string;
  /** 审批人名称 */
  approvalNames?: string;
  /** 审批人状态 */
  approvalState?: string;
  /** 组织部门ID */
  orgDeptId?: string;
  orgDeptIdAlias?: string;
  /** 组织部门代码 */
  orgDeptCode?: string;
  /** 组织部门名称 */
  orgDeptName?: string;
  /** 是否公开 */
  ynPublic?: string;
  /** 是否新地点（是/否） */
  ynNewPlace?: string;
  /** 是否显示事件（是/否） */
  ynShowEvent?: string;
  /** 联系电话 */
  phoneNumber?: string;
  /** 日程类型 */
  eventType?: any;
  /** 提醒类型 */
  remindType?: any;
  /** 背景颜色 */
  bgColor?: string;
  /** 提醒天数 */
  remindDuration?: number;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listMeetingByPage(param: QueryParamModel): Promise<ResponsePageData<MeetingDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}
/** 获取数据（不分页） */
export function listMeeting(param: QueryParamModel): Promise<ResponsePageData<MeetingDto>> {
  return request.post(basePath + '/search/v1', param);
}

/** 根据id加载数据 */
export function getMeeting (id: string): Promise<ResponseBaseData<MeetingDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMeeting (form: MeetingDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 保存并启动流程 */
export function saveFormAndStartProcess({
  processDefId,
  formCode,
  postData
}): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save-and-start-process/v1', {
    processDefId,
    formCode,
    bean: postData
  });
}

/** 根据id集合删除数据 */
export function delMeeting(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}

// export function listMeetingsByUserId(param: QueryParamModel): Promise<ResponsePageData<MeetingDto>> {
//   return request.post(basePath + '/getList/v1', param);
// }
