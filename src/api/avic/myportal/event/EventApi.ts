import request from '@/utils/request';
import type {
  BaseBeanModel,
  ResponsePageData,
  ResponseBaseData,
  QueryParamModel
} from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/myportal/event/events';
/** 日程表 */
export interface EventDto extends BaseBeanModel {
  /** 日程主题 */
  name?: string;
  /** 作者 */
  authorId?: string;
  authorIdAlias?: string;
  /** 作者职工号 */
  authorCode?: string;
  /** 作者 */
  authorName?: string;
  /** 日程地点ID */
  placeId?: string;
  /** 日程地点 */
  placeName?: string;
  /** 开始时间 */
  startTime?: any;
  startTimeBegin?: any;
  startTimeEnd?: any;
  /** 结束时间 */
  endTime?: any;
  endTimeBegin?: any;
  endTimeEnd?: any;
  /** 是否可用 */
  ynValid?: any;
  /** 是否公开 */
  ynPublic?: any;
  /** 日程内容 */
  content?: string;
  /** 日程类型 */
  type?: any;
  /** 提醒类型 */
  remindType?: any;
  /** 共享给 */
  sharedUserIds?: string;
  sharedUserIdsAlias?: string;
  /** 共享人员职工号 */
  sharedUserCodes?: string;
  /** 共享人员姓名 */
  sharedUserNames?: string;
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
  /** 提醒天数 */
  remindDuration?: number;
}

/** 获取分页数据 */
export function listEventByPage(param: QueryParamModel): Promise<ResponsePageData<EventDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}
/** 获取数据（不分页） */
export function listEvent(param: QueryParamModel): Promise<ResponsePageData<EventDto>> {
  return request.post(basePath + '/search/v1', param);
}

/** 根据id加载数据 */
export function getEvent(id: string): Promise<ResponseBaseData<EventDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveEvent(form: EventDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delEvent(ids: [string]): Promise<ResponseBaseData<any>> {
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
