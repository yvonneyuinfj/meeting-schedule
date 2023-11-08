import request from '@/utils/request';
import type {
  BaseBeanModel,
  ResponsePageData,
  ResponseBaseData,
  QueryParamModel
} from '@/api/model/baseModel';

const basePath = '/oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest';
/** 项目基础信息表 */
export interface DemoMainDto extends BaseBeanModel {
  /** 项目编号 */
  projectClassCode?: string;
  /** 项目名称 */
  projectClassName?: string;
  /** 项目分类级别 */
  projectClassLevel?: string;
  /** 项目分类管理员 */
  projectClassManager?: string;
  projectClassManagerAlias?: string;
  /** 项目分类状态 */
  projectClassStatus?: string;
  /** 项目分类维护时间 */
  projectClassDate?: any;
  projectClassDateBegin?: any;
  projectClassDateEnd?: any;
  /** 排序 */
  projectClassOrder?: number;
  /** 备注 */
  projectClassRemark?: string;
}
/** 获取主表分页数据 */
export function listDemoMainByPage(param: QueryParamModel): Promise<ResponsePageData<DemoMainDto>> {
  return request.post(basePath + '/search-main-by-page/v1', param);
}

/** 根据id加载主表数据 */
export function getDemoMain(id: [string]): Promise<ResponseBaseData<DemoMainDto>> {
  return request.get(basePath + '/get-main/' + id + '/v1');
}

/** 保存主表数据 */
export function saveDemoMain(form: DemoMainDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save-main/v1', form);
}

/** 根据id集合删除主表数据 */
export function delDemoMain(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-main-by-ids/v1', { data: ids });
}
