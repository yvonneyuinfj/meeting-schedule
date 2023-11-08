import request from '@/utils/request';
import type { ResponseBaseData } from '@/api/model/baseModel';

/** 获取收藏菜单的数量 */
export function getMenuList(menuType = '1'): Promise<ResponseBaseData<any>> {
  return request.get(`/appsys/user/menu/personalMenu/getMenuList/v1//${menuType}`);
}
/** 叶子节点菜单*/
export function searchSubMenuList(id): Promise<ResponseBaseData<any>> {
  return request.get(`/appsys/user/menu/personalMenu/searchSubMenuList/v1/${id}`);
}

/** 常用菜单添加*/
export function saveMenu(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/user/menu/personalMenu/saveMenu/v1', param);
}

/** 常用菜单移除*/
export function deleteByMenuId(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/user/menu/personalMenu/deleteByMenuId/v1', param);
}

/** 常用菜单批量操作*/
export function savePersonMenuList(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/user/menu/personalMenu/savePersonMenuList/v1/1', param);
}
