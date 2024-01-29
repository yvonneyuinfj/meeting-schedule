import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/myportal/meeting/meetingusers';
/** 会议与参会人关系表 */
export interface MeetingUserDto extends BaseBeanModel {
  /** MEETING_ID */
  meetingId?: string;
  /** USER_ID */
  userId?: string;
  /** ATTRIBUTE_01 */
  attribute01?: string;
  /** ATTRIBUTE_02 */
  attribute02?: string;
  /** ATTRIBUTE_03 */
  attribute03?: string;
  /** ATTRIBUTE_04 */
  attribute04?: string;
  /** ATTRIBUTE_05 */
  attribute05?: string;
  /** ATTRIBUTE_06 */
  attribute06?: string;
  /** ATTRIBUTE_07 */
  attribute07?: string;
  /** ATTRIBUTE_08 */
  attribute08?: string;
  /** ATTRIBUTE_09 */
  attribute09?: any;
  attribute09Begin?: any;
  attribute09End?: any;
  /** ATTRIBUTE_10 */
  attribute10?: any;
  attribute10Begin?: any;
  attribute10End?: any;
  /** SECRET_LEVEL */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMeetingUserByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MeetingUserDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMeetingUser (id: string): Promise<ResponseBaseData<MeetingUserDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMeetingUser (form: MeetingUserDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMeetingUser (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



