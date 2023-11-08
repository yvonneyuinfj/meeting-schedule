import request from '@/utils/request';
import type {
  BaseBeanModel,
  ResponsePageData,
  ResponseBaseData,
  QueryParamModel
} from '@/api/model/baseModel';

const basePath = '/oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest';
/** 项目详细信息表 */
export interface DemoSubDto extends BaseBeanModel {
  /** 项目编号 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /** 项目经理 */
  projectManager?: string;
  projectManagerAlias?: string;
  /** 项目组成员 */
  projectMembers?: string;
  projectMembersAlias?: string;
  /** 项目启动时间 */
  projectStartDate?: any;
  /** 年度 */
  projectYear?: any;
  /** 项目状态 */
  projectStatus?: string;
  /** 项目所属部门 */
  projectDept?: string;
  projectDeptAlias?: string;
  /** 项目技术 */
  projectTechs?: any;
  /** 备注 */
  projectRemark?: string;
  projectClassId?: string;
}
/** 获取分页数据 */
export function listDemoSubByPage(param: QueryParamModel): Promise<ResponsePageData<DemoSubDto>> {
  return request.post(basePath + '/search-sub-by-page/v1', param);
}

/** 根据id加载数据 */
export function getDemoSub(id: string): Promise<ResponseBaseData<DemoSubDto>> {
  return request.get(basePath + '/get-sub/' + id + '/v1');
}

/** 保存表单数据 */
export function saveDemoSub(form: DemoSubDto): Promise<ResponseBaseData<DemoSubDto>> {
  return request.post(basePath + '/save-sub/v1', form);
}

/** 根据id集合删除数据 */
export function delDemoSub(ids: [string]): Promise<ResponseBaseData<DemoSubDto>> {
  return request.delete(basePath + '/delete-sub-by-ids/v1', { data: ids });
}
