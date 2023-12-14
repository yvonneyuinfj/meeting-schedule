import { acceptHMRUpdate, defineStore } from 'pinia';
import ls from '@/utils/local-storage';
import Cookies from 'js-cookie';
import { STORAGE_TOKEN_KEY, SSO_TYPE, USER_TYPE } from './app';
import type { LoginParams } from '@/api/user/login';
import { postLogout, postAccountLogin } from '@/api/user/login';
import { getMenuList, saveMenu, deleteByMenuId } from '@/api/avic/system/CommonMenuApi';
import type { RouteRecordRaw } from 'vue-router';
import { default as router } from '@/router';
import type { MenuDataItem, UserPermissions } from '@/router/typing';
import { generatorDynamicRouter } from '@/router/generator-routers';
import { saveCustomed, getCustomed } from '@/api/avic/system/UserSettingApi';

export interface UserInfo {
  /** 用戶Id */
  id: string;
  /** 登录名 */
  loginName: string;
  /** 姓名 */
  name: string;
  /** 用户编号 */
  no: string;
  /** 用户类型: 0:后台；1:前台 */
  consoleType: '0' | '1';
  /** 用户头像地址 */
  avatar: string;
  /** 部门Id */
  deptId: string;
  /** 部门名称 */
  deptName: string;
  /** 应用Id */
  appId: string;
  /** 应用名称 */
  appName: string;
  /** 组织Id */
  orgId: string;
  /** 组织名称 */
  orgName: string;
  /** 是否开启三员认证 */
  sanyEnable: boolean;
  /** 人员密级编码 */
  secretLevel: string;
  /** 人员密级名称 */
  secretLevelName: string;

  [key: string]: any;
}

export interface UserState {
  /** 登录认证token信息 */
  token: string;
  /** 用户信息 */
  userInfo: UserInfo;
  /** 用户可访问的路由表(授权菜单与静态路由) */
  allowRouters?: RouteRecordRaw[];
  // 已授权菜单
  menuList?: MenuDataItem[];
  // // 已授权按钮
  // permissionButtonList?: Array<string>;
  // // 已授权模块列
  // permissionColumnList?: Array<string>;
  // // 已分配角色
  // roleCodeList?: Array<string>;
  // 已授权按钮
  permissionButtonMap?: Map<string, any>;
  // 已授权模块列
  permissionColumnMap?: Map<string, any>;
  // 已分配角色
  roleMap?: Map<string, any>;
  // 用户收藏的菜单
  collectedMenuList?: Array<MenuDataItem>;

  [key: string]: any;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GENERATE_ROUTES_DYNAMIC = 'GENERATE_ROUTES_DYNAMIC';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_ROUTERS = 'SET_ROUTERS';
export const SET_PERMISSION = 'SET_PERMISSION';
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';
export const GET_COLLECTED_MENUS = 'GET_COLLECTED_MENUS';
export const SET_COLLECTED_MENUS = 'SET_COLLECTED_MENUS';
export const COLLECT_MENU = 'COLLECT_MENU';
export const UNCOLLECT_MENU = 'UNCOLLECT_MENU';
export const GET_USER_CUSTOMED_CONFIG = 'GET_USER_CUSTOMED_CONFIG';
export const SET_USER_CUSTOMED_CONFIG = 'SET_USER_CUSTOMED_CONFIG';

/** 存储用户的全局个性化配置数据用的键值 */
export const GLOBAL_USER_CUSTOMED_CONFIG = 'G_USER_CFG';

export const initState = (): UserState => ({
  token: Cookies.get(STORAGE_TOKEN_KEY),
  userInfo: {
    id: '',
    loginName: '',
    name: '',
    no: '',
    consoleType: '1',
    avatar: '',
    deptId: '',
    deptName: '',
    appId: '',
    appName: '',
    orgId: '',
    orgName: '',
    sanyEnable: false,
    secretLevel: '',
    secretLevelName: ''
  },
  allowRouters: [],
  menuList: [],
  permissionButtonMap: undefined,
  permissionColumnMap: undefined,
  roleMap: undefined,
  collectedMenuList: []
});

export const useUserStore = defineStore('user', {
  state: initState,
  getters: {
    currentUser: state => state.userInfo,
    getCustomedConfig: state => {
      return customedCode => {
        return state[customedCode] || {};
      };
    }
  },
  actions: {
    [SET_TOKEN](token: string) {
      this.token = token;
      if (token) {
        Cookies.set(STORAGE_TOKEN_KEY, token);
      } else {
        Cookies.remove(STORAGE_TOKEN_KEY);
      }
    },
    [SET_USER_INFO](userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    [SET_ROUTERS](allowRoutes: UserState['allowRouters']) {
      this.allowRouters = allowRoutes;
    },
    [SET_PERMISSION](userPermissions: UserPermissions) {
      const permissionButtonMap = new Map();
      const permissionColumnMap = new Map();
      const roleMap = new Map();
      userPermissions.permissionButtonList.forEach(permissionButton => {
        permissionButtonMap.set(permissionButton.action, true);
      });
      userPermissions.permissionColumnList.forEach(permissionColumn => {
        permissionColumnMap.set(permissionColumn.action, permissionColumn.isAuth == '1');
      });
      userPermissions.roleCodeList.forEach(permissionColumn => {
        roleMap.set(permissionColumn, true);
      });
      this.menuList = userPermissions.menuList;
      this.permissionButtonMap = permissionButtonMap;
      this.permissionColumnMap = permissionColumnMap;
      this.roleMap = roleMap;
    },
    [SET_COLLECTED_MENUS](collectedMenuList: Array<MenuDataItem>) {
      this.collectedMenuList = collectedMenuList;
    },
    [GET_COLLECTED_MENUS](): Promise<void> {
      return new Promise((resolve, reject) => {
        getMenuList()
          .then((res: any) => {
            if (res.success && res.data?.length) {
              res.data.forEach(item => {
                if (item.meta) {
                  item.meta.id = item.id;
                }
              });
              this[SET_COLLECTED_MENUS](res.data);
              resolve();
            }
          })
          .catch(err => {
            this[SET_COLLECTED_MENUS]([]);
            reject(err);
          });
      });
    },
    [COLLECT_MENU](menu: MenuDataItem) {
      if (menu.meta?.id) {
        saveMenu(menu.meta.id).then(response => {
          if (response.success) {
            this.collectedMenuList.push(menu);
          }
        });
      }
    },
    [UNCOLLECT_MENU](menuId: string) {
      const menuIndex = this.collectedMenuList.findIndex(item => item.meta.id === menuId);
      if (menuIndex !== -1) {
        deleteByMenuId(menuId).then(response => {
          if (response.success) {
            this.collectedMenuList.splice(menuIndex, 1);
          }
        });
      }
    },
    [RESET_CURRENT_USER]() {
      this.SET_TOKEN(null);
      this.$reset();
    },

    async [LOGIN](info: LoginParams) {
      return new Promise((resolve, reject) => {
        ls.set(SSO_TYPE, '');
        ls.set(USER_TYPE, '');
        // call ajax
        postAccountLogin(info)
          .then(res => {
            if (res.success) {
              this.SET_TOKEN(res.data.token);
              resolve(res);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 从后端获取路由表结构体，并构建前端路由
    async [GENERATE_ROUTES_DYNAMIC]() {
      return new Promise(resolve => {
        generatorDynamicRouter()
          .then(userPermissions => {
            const { rootRouters, routes, userInfo } = userPermissions;
            // 添加到路由表
            rootRouters.forEach(rootRouter => {
              router.addRoute(rootRouter);
            });
            this[SET_ROUTERS](routes);
            this[SET_PERMISSION](userPermissions);
            this.SET_USER_INFO(userInfo);
            resolve(rootRouters);
          })
          .catch(err => {
            console.error('generatorDynamicRouter', err);
          });
      });
    },
    async [LOGOUT]() {
      return new Promise<void>(resolve => {
        postLogout().finally(() => {
          this[RESET_CURRENT_USER]();
          resolve();
        });
      });
    },
    /** 保存用户的个性化配置 */
    [SET_USER_CUSTOMED_CONFIG](customedCode, customedContent): Promise<void> {
      this[customedCode] = customedContent;
      return new Promise(resolve => {
        const param = {
          userId: this.id,
          customedCode,
          customedContent: JSON.stringify(customedContent)
        };
        saveCustomed(param).then(reponse => {
          if (reponse.success) {
            resolve();
          }
        });
      });
    },
    async [GET_USER_CUSTOMED_CONFIG](customedCode): Promise<any> {
      if (this[customedCode]) {
        return Promise.resolve(this[customedCode]);
      }
      return new Promise(resolve => {
        const param = {
          userId: this.userInfo.id,
          customedCode
        };
        getCustomed(param).then(response => {
          if (response.success && response.data) {
            this[customedCode] = JSON.parse(response.data);
          }
          resolve(this[customedCode]);
        });
      });
    }
  }
});

const hot = import.meta.webpackHot || (import.meta as any).hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
