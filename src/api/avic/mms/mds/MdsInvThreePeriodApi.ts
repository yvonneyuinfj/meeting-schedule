import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsinvthreeperiods';
/** 物料三期信息表 */
export interface MdsInvThreePeriodDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 库存三期代码 */
  invThreePeriodCode?: string;
  /** 复验日期计算类型 */
  recheckDateCalType?: any;
  /** 物料ID */
  mdsItemId?: string;
  /** 基本有效贮存期(天) */
  basicEffectStockPeriod?: number;
  /** 固定复验期(天) */
  recheckPeriod?: number;
  /** 有效贮存期(天) */
  effectStockPeriod?: number;
  /** 油封期(天) */
  oilSealPeriod?: number;
  /** 第一次复验延长期(天) */
  firstRecheckPeriod?: number;
  /** 第二次复验延长期(天) */
  secondRecheckPeriod?: number;
  /** 第三次复验延长期(天) */
  thirdRecheckPeriod?: number;
  /** 第四次复验延长期(天) */
  fourthRecheckPeriod?: number;
  /** 提前通知天数(天) */
  informInAdvancePeriod?: number;
  /** 是否有效 */
  validFlag?: any;
}

/** 获取分页数据 */
export function listMdsInvThreePeriodByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsInvThreePeriodDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsInvThreePeriod (id: string): Promise<ResponseBaseData<MdsInvThreePeriodDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsInvThreePeriod (form: MdsInvThreePeriodDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsInvThreePeriod (ids: [string]): Promise<ResponseBaseData<any>> {
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
