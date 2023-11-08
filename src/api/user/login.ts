import request from '@/utils/request';
import type { ResponseBaseData } from '@/api/model/baseModel';

export interface LoginParams {
  username: string;
  password: string;
}

export enum Action {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  QUERY = 'query',
  IMPORT = 'import',
  EXPORT = 'export'
}

export interface Permission {
  /* 权限ID */
  id: string | number;
  /* 权限归属的角色 */
  roleId?: string | number;
  /* 权限名称 */
  name: string;
  /* 权限显示的名字 */
  label?: string;
  /* 权限拥有的操作 [增,删,改,查] */
  actions?: Action[];
}

/** 菜单数据结构定义 */
export type RouteItem = {
  id: number | string;
  parentId: number | string;
  name: string;
  path: string;
  redirect: string;
  component: string;
  children: Array<RouteItem> | null;
  meta: {
    /** 菜单打开方式 */
    attribute01?: 'mainframe' | '_blank';
    /** 菜单类型 1:前台菜单 0:后台菜单 */
    menuType: '1' | '0';
    /** 站外重定向地址 */
    url: string | null;
    title: string | false;
    icon?: string;
    target?: '_blank' | '_self';
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    hideInBreadcrumb?: boolean;
    menuMark?: string;
    menuMarkName?: string;
    [key: string]: any;
  };
};

/** 用户登录 */
export async function postAccountLogin(params: LoginParams): Promise<ResponseBaseData<any>> {
  return request.post<any, any>('/appsys/user/login/v2', params);
}

/** 获取用户头像 */
export async function getUserPhoto() {
  return request.get<any, any>('/appsys/user/user/photo/get', {
    responseType: 'arraybuffer'
  });
}

/** 用户登出 */
export async function postLogout() {
  return request.post<any, any>('/appsys/user/logout');
}

/** 获取当前用户基本信息, 菜单/角色/按钮/列 */
export async function getUserPermissions() {
  return request({ url: '/appsys/user/getUserPermissions/v1', method: 'get' });
}

/** 校验用户是否为授权文件管理员 */
export function getLincenseIsAdmin(reqParams: any): Promise<ResponseBaseData<any>> {
  return request.get('/appsys/user/license/isAdmin', { data: reqParams });
}

/** 获取已上传的授权文件信息 */
export function getLicenseSingle(): Promise<ResponseBaseData<any>> {
  return request.get('/appsys/SysLicenseRest/getLicenseSingle/v1');
}

/** 删除授权文件 */
export function deleteLicenseFile(): Promise<ResponseBaseData<any>> {
  return request.delete('/appsys/SysLicenseRest/delete/v1');
}
