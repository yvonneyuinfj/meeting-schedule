import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdstipss';
/** 提示 */
export interface MdsTipsDto extends BaseBeanModel {
  /** 标题 */
  title?: string;
  /** 模块名 */
  moduleName?: string;
  /** 模块英文名 */
  moduleNameEn?: string;
  /** 内容 */
  content?: string;
  /** 接收人ID */
  receiver?: string;
  receiverAlias?: string;
  /** 接收人编码 */
  receiverCode?: string;
  /** 接收人名字 */
  receiverName?: string;
  /** 接收时间 */
  receptionTime?: any;
  receptionTimeBegin?: any;
  receptionTimeEnd?: any;
  /** 跳转地址 */
  jumpAddress?: string;
  /** 紧急层度 */
  emergencyStratification?: any;
  /** 密级 */
  secretLevel?: any;
  /** 对应ID */
  formId?: string;
}

/** 获取分页数据 */
export function listMdsTipsByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsTipsDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsTips (id: string): Promise<ResponseBaseData<MdsTipsDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsTips (form: MdsTipsDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsTips (ids: [string]): Promise<ResponseBaseData<any>> {
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

/** 触发方法 */
export function triggerMethod (id: string): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/triggerMethod/v1', id);
}