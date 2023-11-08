import type { UserInfo } from '@/store/user';
import type { VNodeChild } from 'vue';
import type {
  RouteMeta,
  RouteComponent,
  RouteRecordRedirectOption,
  RouteRecordRaw
} from 'vue-router';

type Lazy<T> = () => Promise<T>;

export interface MenuRouteMeta {
  id?: string;
  hideChildrenInMenu?: boolean;
  hideInBreadcrumb?: boolean;
  hideInMenu?: boolean;
  icon?: string | VNodeChild | JSX.Element;
  authority?: string | string[];
  target?: '_blank' | '_self' | '_parent' | '_top';
  keepAlive?: boolean;
  lock?: boolean;
  mergeTab?: boolean;
  url?: string;
}

export type MenuDataItem = {
  path: string;
  name?: string;
  children?: MenuDataItem[];
  meta?: MenuRouteMeta & RouteMeta;
  redirect?: RouteRecordRedirectOption;
  component?: RouteComponent | Lazy<RouteComponent>;
};

export interface UserPermissions {
  userInfo: UserInfo;
  routes: RouteRecordRaw[]; // 用户具有访问权限的菜单集合(树)
  menuList: MenuDataItem[]; // 用户具有访问权限的菜单集合(树)
  permissionButtonList: Array<any>; // 权限-按钮类资源集合
  permissionColumnList: Array<any>; // 权限-表格列类资源集合
  roleCodeList: Array<string>; // 用户所属角色的编码集合
  rootRouter?: RouteRecordRaw; // 由菜单构建的vue-router路由表
  [key: string]: any;
}
