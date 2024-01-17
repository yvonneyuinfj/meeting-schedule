import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/myportal/meeting/meetings';
/** 会议表 */
export interface MeetingDto extends BaseBeanModel {
  /** 会议名称 */
  name?: string;
  /** 作者 */
  authorId?: string;
  authorIdAlias?: string;
  /** 作者职工号 */
  authorCode?: string;
  /** 作者名称 */
  authorName?: string;
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
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listMeetingByPage(param: QueryParamModel): Promise<ResponsePageData<MeetingDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
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
