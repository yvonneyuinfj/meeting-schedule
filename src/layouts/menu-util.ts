import type { RouteRecordRaw } from 'vue-router';
import type { MenuDataItem } from '@/router/typing';
import type { RouteProps } from '@/components/base-layouts/typing';
import { slugify } from 'transliteration';

interface MenuMap {
  parentKeys?: string[];
}
interface MenuInfo {
  menus: RouteProps[];
  menuKeyMap: MenuKeyMap;
}
type MenuKeyMap = Record<string, MenuMap>;

/**
 * 校验菜单名称是否包含关键字(支持拼音首字母)
 * @param title
 */
export function checkMenuTitleByKeywords(title: string, keywords: string): boolean {
  const pinyinList = slugify(title).split('-');
  let firstLetters = '';
  pinyinList.map(fl => {
    firstLetters += fl.substring(0, 1);
  });

  return (
    title.indexOf(keywords) > -1 ||
    firstLetters.toLowerCase().indexOf(keywords.toLowerCase()) !== -1
  );
}

export const filterMenu = (routes: MenuDataItem[]) => {
  return routes.find(item => item.name === 'index')?.children || [];
};

export const genMenuInfo = (routes: RouteRecordRaw[]): MenuInfo => {
  const menuKeyMap: MenuKeyMap = {};
  const getMenuInfo = (routes: RouteRecordRaw[], parentKeys: string[] = []): RouteProps[] => {
    return routes.map(route => {
      const currentRouter: RouteProps = {
        ...route
      };
      menuKeyMap[currentRouter.path] = { parentKeys: parentKeys };
      if (route.meta?.hideChildrenInMenu) {
        route.children &&
          route.children
            .map(item => item.path)
            .forEach(
              value => (menuKeyMap[value] = { parentKeys: [...parentKeys, currentRouter.path] })
            );
      }
      // 是否有子菜单，并递归处理
      if (route.children && route.children.length > 0 && !route.meta?.hideChildrenInMenu) {
        currentRouter.children = getMenuInfo(route.children, [...parentKeys, currentRouter.path]);
      } else {
        currentRouter.children = undefined;
      }

      return currentRouter;
    });
  };
  const menus = getMenuInfo(routes);
  return {
    menus,
    menuKeyMap
  };
};

/**
 * 根据关键字过滤菜单
 * @param routes 全量路由表
 * @param keywords 菜单搜索关键字
 * @param collectedMenuList 用户已收藏的菜单
 * @returns
 */
export const genMenuInfoByKeywords = (
  routes: RouteRecordRaw[],
  keywords?: string,
  collectedMenuList?: RouteRecordRaw[]
): RouteProps[] => {
  const getMenuInfo = (routes: RouteRecordRaw[], parentIncludeKeywords?: boolean): RouteProps[] => {
    return routes
      .map(route => {
        const currentRouter: RouteProps = {
          ...route,
          includeKeywords:
            !keywords ||
            checkMenuTitleByKeywords(`${route.meta.title}`, keywords) ||
            parentIncludeKeywords
        };
        // 是否有子菜单，并递归处理
        if (route.children && route.children.length > 0 && !route.meta?.hideChildrenInMenu) {
          currentRouter.children = getMenuInfo(route.children, currentRouter.includeKeywords);
          if (!currentRouter.children || currentRouter.children.length <= 0) {
            currentRouter.children = undefined;
          } else {
            currentRouter.includeKeywords = true;
          }
        } else {
          // 校验菜单是否已收藏
          if (collectedMenuList?.length && currentRouter.meta?.id) {
            currentRouter.meta.collected = collectedMenuList.find(
              item => item.meta.id === currentRouter.meta.id
            )
              ? true
              : false;
          }
          currentRouter.children = undefined;
        }
        return currentRouter.includeKeywords ? currentRouter : undefined;
      })
      .filter(item => item);
  };
  const menus = getMenuInfo(routes);
  return menus?.length ? menus : keywords ? [] : routes;
};

export const getMenuFirstChildren = (menus: RouteProps[]) => {
  return menus.map(menu => {
    // eslint-disable-next-line
    const { children: _children, ...rest } = menu;
    return rest;
  });
};

export const findMenuChildren = (
  menus: RouteProps[] | undefined,
  key: string | symbol | undefined
) => {
  return (menus && menus.find(item => item.name === key)?.children) || [];
};
