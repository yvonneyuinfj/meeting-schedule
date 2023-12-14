import type { MenuDataItem, UserPermissions } from './typing';
import type { RouteItem } from '@/api/user/login';
import { getUserPermissions } from '@/api/user/login';
import { routes as staticRoutes } from './index.ts';
import { USER_TYPE } from '@/store/app';
import { localStorage } from '@/utils/local-storage';
// 根级菜单
const rootRouter: MenuDataItem = {
  name: 'index',
  path: '/',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  component: () => import('@/layouts/index.vue'),
  children: [] as MenuDataItem[]
};

const IFRAME_VIEW = 'IframeVIew';
const ROUTE_VIEW = 'RouteView';
const defineRouteComponents: Record<string, any> = {
  BasicLayout: () => import('@/layouts/index.vue'),
  PageView: () => import('@/layouts/route-view.vue'),
  [ROUTE_VIEW]: () => import('@/layouts/route-view.vue'),
  [IFRAME_VIEW]: () => import('@/layouts/Iframe-vIew.vue')
};

const defineRouteComponentKeys = Object.keys(defineRouteComponents);

// export const generator = (
//   routeMap: RouteItem[],
//   parentId: string | number,
//   routeItem?: RouteRecordRaw | MenuDataItem
// ) => {
//   return routeMap
//   .filter(item => item.parentId === parentId)
//     .map(item => {
//       const { title, hideInMenu, hideChildrenInMenu, target, icon, authority } = item.meta || {};
//       const currentRouter: MenuDataItem = {
//         // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
//         path: item.path || `${(routeItem && routeItem.path) || ''}/${item.name}`,
//         // 路由名称，建议唯一
//         name: item.name || `${item.id}`,
//         // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
//         meta: {
//           title,
//           icon: icon || undefined,
//           hideInMenu,
//           hideChildrenInMenu,
//           target: target,
//           authority: authority
//         },
//         // 该路由对应页面的 组件 (动态加载 @/views/ 下面的路径文件)
//         component:
//           item.component && defineRouteComponentKeys.includes(item.component)
//             ? defineRouteComponents[item.component]
//             : () => import(/* @vite-ignore */ `../views/${item.component}.vue`)
//       };

//       // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
//       if (!currentRouter.path.startsWith('http')) {
//         currentRouter.path = currentRouter.path.replace('//', '/');
//       }

//       // 重定向
//       item.redirect && (currentRouter.redirect = item.redirect);

//       // 子菜单，递归处理
//       currentRouter.children = generator(routeMap, item.id, currentRouter);
//       if (currentRouter.children === undefined || currentRouter.children.length <= 0) {
//         delete currentRouter.children;
//       }
//       return currentRouter;
//     })
//     .filter(item => item);
// };

const modules = import.meta.glob('../views/**/*.vue');
// 从树结构解析转换平级结构的路由表
export const generator = (
  routeMap: RouteItem[],
  menuData: MenuDataItem[],
  routes: MenuDataItem[],
  blankRoutes: MenuDataItem[],
  parentPath?: string
) => {
  routeMap.map(item => {
    const { title, hideChildrenInMenu, attribute01, icon, menuMark, menuMarkName, url } =
      item.meta || {};
    const target = attribute01 !== 'mainframe' ? '_blank' : undefined;
    let component = '';
    if (url) {
      component = target !== '_blank' ? IFRAME_VIEW : null;
    } else {
      component = item.component || ROUTE_VIEW;
    }

    const currentRouter: MenuDataItem = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parentPath || ''}/${item.name || item.id}`,
      // path: item.path,
      // 路由名称，建议唯一
      // 路由名称，必须唯一(动态+静态全部唯一)，否则无法按名称跳转路由
      name: `${item.id}`,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        id: `${item.id}`,
        title,
        icon: icon || undefined,
        hideInMenu: item.ishidden !== '0',
        hideChildrenInMenu,
        target,
        menuMark,
        menuMarkName,
        url
      },
      // 该路由对应页面的 组件 (动态加载 @/views/ 下面的路径文件)
      component:
        component && defineRouteComponentKeys.includes(component)
          ? defineRouteComponents[component]
          : modules[`../views/${component}.vue`]
    };
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (currentRouter.path && !currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/');
    }

    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect);

    // 子菜单，递归处理
    if (item.children?.length > 0) {
      const subMenus: MenuDataItem[] = [];
      generator(item.children, subMenus, routes, blankRoutes, currentRouter.path);
      if (subMenus?.length) {
        currentRouter.children = subMenus;
        currentRouter.component = defineRouteComponents[ROUTE_VIEW];
        currentRouter.redirect = currentRouter.children[0].path;
      }
    }
    if (currentRouter.children === undefined || currentRouter.children.length <= 0) {
      delete currentRouter.children;
    }
    if (target == '_blank') {
      blankRoutes.push(currentRouter);
    } else {
      if (item.component || url) {
        routes.push(currentRouter);
      }
    }
    menuData.push(currentRouter);
  });
};

export const generatorDynamicRouter = () => {
  return new Promise<UserPermissions>((resolve, reject) => {
    getUserPermissions()
      .then(response => {
        const { permissionButtonList, permissionColumnList, roleCodeList, userInfo } =
          response.data;
        let menuList  = response.data.menuList
        if(localStorage.get(USER_TYPE)){
          menuList  = menuList.filter(item => item.name === localStorage.get(USER_TYPE) || item.name === null)
        }
        const routes: MenuDataItem[] = [];
        const blankRoutes: MenuDataItem[] = [];
        const menuData: MenuDataItem[] = [];
        generator(
          menuList.filter(menu => menu.meta.menuType === '1'),
          menuData,
          routes,
          blankRoutes
        );
        console.log({ menuData, routes, blankRoutes });
        const routerView = {
          path: '/router',
          name: 'RouterView',
          meta: { title: '路由视图' },
          component: defineRouteComponents[ROUTE_VIEW],
          redirect: '/dashboard',
          children: [...routes]
        };
        rootRouter.children = [...staticRoutes[0].children, routerView];
        resolve({
          rootRouters: [rootRouter, ...blankRoutes],
          userInfo,
          menuList,
          routes: [...staticRoutes[0].children, ...menuData],
          permissionButtonList,
          permissionColumnList,
          roleCodeList
        } as UserPermissions);
      })
      .catch(err => {
        reject(err);
      });
  });
};
