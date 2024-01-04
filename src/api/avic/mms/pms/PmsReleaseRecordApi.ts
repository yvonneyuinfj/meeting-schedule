import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmsreleaserecords';
/** 发布记录表 */
export interface PmsReleaseRecordDto extends BaseBeanModel {
  /** 采购任务编号 */
  pmsTaskNo?: string;
  /** 计划表ID */
  pmsPlanId?: string;
  /** 采购计划号 */
  reqPlanNo?: string;
  /** 采购计划名称 */
  reqPlanName?: string;
  /** 动力函号 */
  powerLetterNumber?: string;
  /** 脱密发布名称 */
  decryptionReleaseName?: string;
  /** 发布日期 */
  releaseDate?: any;
  releaseDateBegin?: any;
  releaseDateEnd?: any;
  /** 截止日期 */
  releaseEndDate?: any;
  releaseEndDateBegin?: any;
  releaseEndDateEnd?: any;
  /** 发布统一编码 */
  releaseUnifiedCode?: string;
  /** 发布人ID */
  releaseUserId?: string;
  releaseUserIdAlias?: string;
  /** 发布人编码 */
  releaseUserCode?: string;
  /** 发布人名称 */
  releaseUserName?: string;
  /** 单据号 */
  billNo?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listPmsReleaseRecordByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsReleaseRecordDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsReleaseRecord (id: string): Promise<ResponseBaseData<PmsReleaseRecordDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsReleaseRecord (form: PmsReleaseRecordDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsReleaseRecord (ids: [string]): Promise<ResponseBaseData<any>> {
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
