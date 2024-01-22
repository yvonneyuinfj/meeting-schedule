import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/syncuserlogs';
/** SYNC_USER_LOG */
export interface SyncUserLogDto extends BaseBeanModel {
  /** 所属应用系统ID */
  sysApplicationId?: string;
  /** SYSLOG_USERNAME_ZH */
  syslogUsernameZh?: string;
  /** SYSLOG_USERNAME */
  syslogUsername?: string;
  /** SYSLOG_USERNO */
  syslogUserno?: string;
  /** SYSLOG_IP */
  syslogIp?: string;
  /** SYSLOG_TIME */
  syslogTime?: any;
  syslogTimeBegin?: any;
  syslogTimeEnd?: any;
  /** SYSLOG_MODULE */
  syslogModule?: string;
  /** SYSLOG_CONTENT */
  syslogContent?: string;
  /** SYSLOG_OP */
  syslogOp?: string;
  /** SYSLOG_TYPE */
  syslogType?: string;
  /** SYSLOG_IS_GD */
  syslogIsGd?: string;
  /** SYSLOG_RESULT */
  syslogResult?: any;
  /** SYSLOG_TABLE */
  syslogTable?: string;
  /** SYSLOG_SECRETLEVEL */
  syslogSecretlevel?: string;
  /** SYSLOG_FORMID */
  syslogFormid?: string;
  /** SYSLOG_TITLE */
  syslogTitle?: string;
}

/** 获取分页数据 */
export function listSyncUserLogByPage (
  param: QueryParamModel
): Promise<ResponsePageData<SyncUserLogDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getSyncUserLog (id: string): Promise<ResponseBaseData<SyncUserLogDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveSyncUserLog (form: SyncUserLogDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delSyncUserLog (ids: [string]): Promise<ResponseBaseData<any>> {
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
