import request from '@/utils/request';
import type {
  ResponseBaseData,
  BaseBeanModel,
  QueryParamModel,
  ResponsePageData
} from '@/api/model/baseModel';
const basePath = '/appsys/portlet/portalConfig';
export interface PortletConfigDto extends BaseBeanModel {
  /** 必填 */
  demoNotnull?: string;
  content?: any;
  isDefault?: string;
  logAppId?: string;
  logFormName?: string;
  logTitle?: string;
  logType?: string;
  memo?: string;
  portletCode?: string;
  portletName?: string;
  resourceId?: string;
  resourceIdAlias?: string;
  resourceType?: string;
  secretLevel?: string;
  sysApplicationId?: string;
  systemDefinedId?: string;
  uiType?: string;
}
/**保存首页名称 */
export function savePortalInfo(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', param);
}

/**修改首页名称 */
export function updatePortalInfo(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/update/v1', param);
}

/** 修改默认首页 */
export function updatePortalConfig(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/toSetDefaultPortletConfig/v1', param);
}
/** 获取用户的门户配置信息 */
export function getUserPortal(): Promise<ResponseBaseData<any>> {
  return request.get(basePath + '/getUserPortlets/v1');
}

/** 保存模版信息 */
export function savePortalDesign(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/updateForPortlet/v1', param);
}

/** 根据portlet id 获取content内容 **/
export async function getPortletContentById(id): Promise<ResponseBaseData<any>> {
  return request.get(basePath + '/get/v1/' + id);
}
/** 获取所有的门户小页列表 */
export async function getAllPortlet(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/togGetPortalAuth/v1', param);
}
/** 删除门户 */
export async function deletePortalById(id): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/delete/v1/' + id);
}
/** 获取分页数据 */
export function listDemoSingleByPage(
  param: QueryParamModel
): Promise<ResponsePageData<PortletConfigDto>> {
  return request.post(basePath + '/togGetPortalConfigJsonDataByPage/v1', param);
}
/** 保存表单数据 */
export function savePortletConfig(form: PortletConfigDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}
/** 根据id加载数据 */
export function getPortletConfig(id: string): Promise<ResponseBaseData<PortletConfigDto>> {
  return request.get(basePath + '/get/v1/' + id);
}
/** 根据id集合删除数据 */
export function delPortletConfig(ids: string): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/deleteByIds/v1', ids);
}
/** 根据id集合删除数据 */
export function updatePortletConfig(param: object): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/update/v1', param);
}
