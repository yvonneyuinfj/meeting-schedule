import request from '@/utils/request';
import type {BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel} from '@/api/model/baseModel';
import type {downloadParam} from '@/utils/download-util';
import {downloadSysFile} from '@/utils/download-util';

const basePath = '/mms/pms/pmsreviews';

/** 采购评审 */
export interface PmsReviewDto extends BaseBeanModel {
  /** 采购寻源 */
  pmsFindSourceId?: string;
  /** 采购计划ID */
  pmsPlanId?: string;
  /** SECRET_LEVEL */
  secretLevel?: any;
  /** 采购评审情况记录 */
  reviewContent?: string;
  bpmState?: string;
  bpmType?: string;
  procurementMethodName?: string;
  pmsPriceName?: string;
  pmsTaskNo?: string;
  reqPlanNo?: string;
  reqPlanName?: string;
  /** 子表集合 */
  pmsReviewExpertList?: [];
}

/** 获取分页数据 */
export function listPmsReviewByPage(param: QueryParamModel): Promise<ResponsePageData<PmsReviewDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsReview(id: string): Promise<ResponseBaseData<PmsReviewDto>> {
  return request.get(basePath + '/detail/' + id);
}

/** 保存表单数据 */
export function savePmsReview(form: PmsReviewDto): Promise<ResponseBaseData<any>> {
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
export function delPmsReview(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', {data: ids});
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
