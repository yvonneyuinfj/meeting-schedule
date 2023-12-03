import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmoees';

/** OEE设备综合效率主表 */
export interface TpmOeeDto extends BaseBeanModel {
  /** 申报月份 */
  reportDate?: any;
  reportDateBegin?: any;
  reportDateEnd?: any;
  /** 申报部门 */
  reportDeptId?: string;
  reportDeptIdAlias?: string;
  /** 申报部门编码 */
  reportDeptCode?: string;
  /** 申报部门名称 */
  reportDeptName?: string;
  /** 申请人ID */
  applyUserId?: string;
  /** 申请人编码 */
  applyUserCode?: string;
  /** 申请人名称 */
  applyUserName?: string;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 密级 */
  secretLevel?: any;
  /** 备注 */
  note?: string;
}

/** 获取分页数据 */
export function listTpmOeeByPage(
  param: QueryParamModel
): Promise<ResponsePageData<TpmOeeDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmOee(id: string): Promise<ResponseBaseData<TpmOeeDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmOee(form: TpmOeeDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmOee(ids: [string]): Promise<ResponseBaseData<any>> {
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
