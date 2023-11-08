import type { ComputedRef, Ref, UnwrapRef } from 'vue';
import { computed, inject, onMounted, reactive, ref, toRefs, watch } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { LayoutType, MenuTheme } from '@/components/base-layouts/typing';
import { xor } from 'lodash-es';
import { genMenuInfo } from './menu-util';
import { findNodeForTreegrid } from '@/utils/tree-util';
import type { MultiTabStore } from '@/components/multi-tab';
import { loginRoutePath } from '@/router/define-meta';
import type { MenuRouteMeta } from '@/router/typing';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';

export interface MenuState {
  collapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  current?: string;
  isMobile?: Ref<boolean>;
}
type LayoutState = {
  layout: Ref<LayoutType>;
  theme: Ref<MenuTheme>;
  fixedSidebar: Ref<boolean>;
  contentWidth: Ref<string>;
  splitMenus: Ref<boolean>;
  transitionName: Ref<string>;
  multiTab: Ref<boolean>;
  multiTabFixed: Ref<boolean>;
  fixedHeader: Ref<boolean>;
};
interface MenuStated extends LayoutState {
  hasSideMenu: ComputedRef<boolean>;
  isTopMenu: ComputedRef<boolean>;
  sideWidth: ComputedRef<number | undefined>;
  secondSideWidth: Ref<number>;
  breadcrumb: Ref<
    {
      path: string;
      breadcrumbName: string;
    }[]
  >;
  collapsed: Ref<boolean | undefined> | undefined;
  selectedKeys: Ref<string[]> | undefined;
  openKeys: Ref<string[]> | undefined;
  updateSelectKeys: (keys: string[]) => void;
  updateCollapsed: (s: boolean) => void;
}

export interface BreadcrumbItem {
  path: string;
  breadcrumbName: string;
}

const sideWidth = 208;
const collapsedWidth = 48;
const firstSideWidth = 80; // for leftmenu-layout
const secondSideWidth = 160; // for leftmenu-layout

const pattern = /^((\/)?(https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
const state = reactive<MenuState>({
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
  current: undefined
});

let res: (MenuStated & LayoutState & { isMobile: Ref<boolean>; collapsedWidth: number }) | null =
  null;
// 用 symbol 类型是最好的，但由于热更新会导致 symbol 更新，导致获取不到正确的 provide 值
export const MenuStateSymbol = 'proGlobalMenuState';

export const injectMenuState = () => {
  return inject(MenuStateSymbol, { ...toRefs(reactive({})) } as MenuStated &
    LayoutState & { isMobile: Ref<boolean>; collapsedWidth: number });
};
const menuPathMap = new Map();
export default function useMenuState(
  initialState?: MenuState,
  multiTabState?: UnwrapRef<MultiTabStore>
) {
  const { t, locale } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const appStore = useAppStore();
  const isMobile =
    initialState && initialState.isMobile ? initialState.isMobile : inject('isMobile', ref(false));
  Object.assign(state, res ? {} : initialState);
  // define layoutSettings
  const layoutState = reactive({
    layout: computed(() => (isMobile.value ? 'side' : appStore.layout)),
    theme: computed(() => {
      const navTheme = appStore.navTheme;
      return navTheme === 'realDark' ? 'dark' : navTheme;
    }),
    primaryColor: computed(() => appStore.primaryColor),
    fixedSidebar: computed(() => appStore.fixedSidebar),
    fixedHeader: computed(() => appStore.fixedHeader),
    contentWidth: computed(() => appStore.contentWidth),
    // only work layout `mix` `side`
    splitMenus: computed(() => !isMobile.value && appStore.splitMenus),
    transitionName: computed(() => appStore.transitionName),
    multiTab: computed(() => appStore.multiTab),
    multiTabFixed: computed(() => appStore.multiTabFixed),
    title: computed(() => appStore.title)
  } as LayoutState);
  const hasSideMenu = computed(() => {
    return layoutState.layout !== 'top';
  });
  const isTopMenu = computed(() => layoutState.layout === 'top');
  const menuWidth = computed(() => {
    if (isMobile.value) {
      return sideWidth;
    }
    const width: number = layoutState.layout === 'left' ? firstSideWidth : sideWidth;
    return hasSideMenu.value ? (state.collapsed ? collapsedWidth : width) : undefined;
  });
  // 解决动态路由 打开页面 openKeys 错误问题
  const allowRouters = computed(() => userStore.allowRouters); // genMenuInfo(filterMenu(routes)).menus;
  const menuKeyMap = computed(() => genMenuInfo(allowRouters.value).menuKeyMap);
  const getOpenKeysBySelectKey = (key: string) => {
    return menuKeyMap.value[key]?.parentKeys;
  };
  watch(
    () => state.collapsed,
    () => {
      if (state.collapsed && !isMobile.value) {
        state.openKeys = [];
      } else {
        state.openKeys = getOpenKeysBySelectKey(route.path);
      }
    }
  );
  // 布局变化时 openKeys 为空
  watch([computed(() => layoutState.layout), computed(() => layoutState.splitMenus)], () => {
    state.openKeys = [];
  });
  const getRouteInfoFromMultiTab = (path: string): RouteLocationNormalized => {
    const cacheList = multiTabState?.cacheList || [];
    const routeInfo = cacheList.find(cache => cache.path === path)
      ?.route as RouteLocationNormalized;
    return routeInfo!;
  };
  watch(
    () => state.selectedKeys,
    (_newVal, oldVal = []) => {
      if (state.selectedKeys) {
        if (isMobile.value) {
          state.collapsed = true;
        }
        const path = state.selectedKeys[state.selectedKeys.length - 1];
        const routes = router.getRoutes();
        const { target, url } = (routes.find(r => r.path == path)?.meta || {}) as MenuRouteMeta;

        const isOtherUrlForOldVal = pattern.test(oldVal[oldVal?.length - 1]);
        if (
          !state.collapsed &&
          layoutState.layout !== 'left' &&
          (layoutState.layout === 'side' ||
            layoutState.layout === 'mix' ||
            layoutState.splitMenus === true) &&
          !isOtherUrlForOldVal
        ) {
          const openKeys = getOpenKeysBySelectKey(path);
          if (xor(state.openKeys, openKeys).length) {
            state.openKeys = openKeys || [];
          }
        }
        if (target == '_blank') {
          state.selectedKeys = oldVal;
          // 站外重定向直接打开url
          if (url) {
            window.open(url, path);
          } else {
            if (path !== route.path) {
              window.open(path, path);
            }
          }
          return;
        }
        router.isReady().then(() => {
          const routeInfo = getRouteInfoFromMultiTab(path) || ({ path } as RouteLocationNormalized);
          if (routeInfo.fullPath !== route.fullPath) {
            // 优先级 routeInfo.fullPath >  route.fullPath > routeInfo
            router.push(route.path === path ? routeInfo.fullPath || route.fullPath : routeInfo);
          }
        });
      }
    }
  );
  const updateMenuState = (path: string): void => {
    const cachedKeys = getOpenKeysBySelectKey(path) || [];
    state.selectedKeys = [...cachedKeys, path];
  };
  const breadcrumb = ref<BreadcrumbItem[]>([]);
  const updateBreadcrumb = () => {
    if (route.meta.hideInBreadcrumb) {
      breadcrumb.value = [];
      return;
    }
    // 过滤掉隐藏的路由
    const newAllowRouters = [];
    allowRouters.value.map(item => {
      if (!item.meta.hideInMenu) {
        newAllowRouters.push(item);
      }
    });
    const home = {
      path: '/',
      breadcrumbName: t('pages.home'),
      children: newAllowRouters.map(item => {
        const path = getFirstPath(item);
        return {
          path: path,
          breadcrumbName: item.meta.title !== undefined ? t(`${item.meta.title}`) : ''
        };
      })
    };
    const breadcrumbData = [home];
    menuKeyMap.value[route.path]?.parentKeys.map(parentKey => {
      const parentMenus = findNodeForTreegrid(allowRouters.value, 'path', parentKey);
      if (parentMenus && parentMenus.length) {
        const pMenu = parentMenus[0];
        parentKey = getFirstPath(pMenu);
        const children = [];
        if (pMenu.children?.length) {
          pMenu.children.map(item => {
            //过滤隐藏菜单
            if (!item.meta.hideInMenu) {
              const path = getFirstPath(item);
              children.push({
                path: path,
                breadcrumbName:
                  item.path === '/'
                    ? t('pages.home')
                    : item.meta.title !== undefined
                    ? t(`${item.meta.title}`)
                    : ''
              });
            }
          });
        }
        //过滤隐藏菜单
        if (!pMenu.meta.hideInMenu) {
          breadcrumbData.push({
            path: parentKey,
            breadcrumbName:
              pMenu.path === '/'
                ? t('pages.home')
                : pMenu.meta.title !== undefined
                ? t(`${pMenu.meta.title}`)
                : '',
            children
          });
        }
      }
    });
    breadcrumbData.push({
      path: route.path,
      breadcrumbName:
        route.path === '/'
          ? t('pages.home')
          : route.meta.title !== undefined
          ? t(`${route.meta.title}`)
          : '',
      children: []
    });
    breadcrumb.value = breadcrumbData;
    // breadcrumb.value = route.matched.concat().map(r => {
    //   const routeChildren = [];
    //   //组装多级面包屑数据
    //   if (r.children && r.children.length > 0) {
    //     //处理路由中未设置redirect是面包屑点击一级节点时无从跳转的问题，这里跳转到一级节点下第一个子节点
    //     if (!r.redirect) {
    //       r.redirect = r.children[0].path;
    //     }
    //     r.children.forEach(item => {
    //       routeChildren.push({
    //         path: item.path,
    //         breadcrumbName: item.path === '/'
    //           ? t('pages.home')
    //           : item.meta.title !== undefined
    //             ? t(`${item.meta.title}`)
    //             : ''
    //       });
    //     });
    //   }
    //   return {
    //     path: r.path,
    //     breadcrumbName:
    //       r.path === '/'
    //         ? t('pages.home')
    //         : r.meta.title !== undefined
    //           ? t(`${r.meta.title}`)
    //           : '',
    //     children: routeChildren
    //   };
    // });
  };
  /**
   * 迭代获取菜单下第一个可以访问的path
   * @param menu
   * @returns
   */
  const getFirstPath = menu => {
    let path = menuPathMap.get(menu.name);
    if (path) {
      return path;
    }
    path = 'RouteView' + menu.name;
    if (menu.component && menu.component.name == 'RouteView') {
      if (menu.children?.length) {
        for (let i = 0; i < menu.children.length; i++) {
          if (menu.children[i]) {
            path = getFirstPath(menu.children[i]);
            if (!path.includes('RouteView')) {
              break;
            }
          }
        }
      }
    } else {
      path = menu.path;
    }
    if (path.includes('RouteView')) {
      path = 'RouteView' + menu.name;
    }
    menuPathMap.set(menu.name, path);
    return path;
  };
  const updateSelectKeys = (keys: string[]) => {
    state.selectedKeys = keys;
  };
  const updateCollapsed = (val: boolean) => {
    state.collapsed = !val;
  };
  onMounted(() => {
    watch(
      () => route.fullPath,
      () => {
        if (route.path !== loginRoutePath) {
          updateMenuState(route.path);
          // 更新面包屑
          updateBreadcrumb();
        }
      }
      // { immediate: true },
    );

    // 动态刷新面包屑多语言
    watch(
      () => locale.value,
      () => updateBreadcrumb()
    );
  });
  res = {
    ...toRefs(state),
    ...toRefs(layoutState),
    isMobile,
    hasSideMenu,
    isTopMenu,
    sideWidth: menuWidth,
    secondSideWidth: ref(secondSideWidth),
    breadcrumb,
    collapsedWidth,
    updateSelectKeys,
    updateCollapsed
  };
  return res;
}
