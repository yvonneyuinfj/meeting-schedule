import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
const basePath = '/mms/pms/pmsreviewexperts';
/** 采购评审专家 */
export interface PmsReviewExpertDto extends BaseBeanModel {
  /** 采购评审ID */
  pmsReviewId?: string;
  /** 专家类型 */
  expertType?: any;
  /** 专家名称 */
  expertId?: string;
  expertIdAlias?: string;
  /** 部门 */
  deptId?: string;
  deptIdAlias?: string;
  /** 专家编码 */
  expertCode?: string;
  /** 部门名称 */
  deptName?: string;
  /** 专家名称 */
  expertName?: string;
  /** 密级 */
  secretLevel?: any;
  /** 部门编码 */
  deptCode?: string;
  /** 备注 */
  remark?: string;
}

/** 获取分页数据 */
export function listPmsReviewExpertByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsReviewExpertDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsReviewExpert (id: string): Promise<ResponseBaseData<PmsReviewExpertDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsReviewExpert (form: PmsReviewExpertDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsReviewExpert (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}



