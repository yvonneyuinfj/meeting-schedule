import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsperiods';
/** 系统期段表 */
export interface MdsPeriodDto extends BaseBeanModel {
  /** 会计年度 */
  year?: number;
  /** 期段号 */
  orderNo?: number;
  /** 开始日期 */
  arrangeDate?: any;
  arrangeDateBegin?: any;
  arrangeDateEnd?: any;
  /** 结束日期 */
  endDate?: any;
  endDateBegin?: any;
  endDateEnd?: any;
  /** 期段类型 ^ 取自通用代码APPLICATION_TYPE:  1-日,2-周,3-月,4-季度,5-年份' */
  periodType?: any;
  /** 期段工作日总数（生产） ^ */
  countWorkDay?: number;
  /** 期段需求日期（生产） */
  reqDate?: any;
  reqDateBegin?: any;
  reqDateEnd?: any;
  /** 期段应用类型 ^  取自通用代码APPLICATION_TYPE:  1-生产,2-采购,3-库存,4-成本' */
  applicationType?: any;
  /** 备注 */
  note?: string;
  /** 是否使用 ^ Y: 已使用   N: 未使用 */
  ynUsedFlag?: any;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listMdsPeriodByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsPeriodDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsPeriod (id: string): Promise<ResponseBaseData<MdsPeriodDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsPeriod (form: MdsPeriodDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsPeriod (ids: [string]): Promise<ResponseBaseData<any>> {
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
