import { acceptHMRUpdate, defineStore } from 'pinia';
import { settings } from '@/settings';
import type { PureSettings } from '@/components/base-layouts/defaultSettings';
import type { Locale } from '@/locales';
import { loadLanguageAsync } from '@/locales';

import type { ContentWidth, LayoutType, MenuTheme } from '@/components/base-layouts/typing';

import { useUserStore, GLOBAL_USER_CUSTOMED_CONFIG } from './user';

export const STORAGE_TOKEN_KEY = 'access_token';
export const STORAGE_LANG_KEY = 'app_lang';
export const SSO_TYPE = 'sso_type';
export const USER_TYPE: 'user_type' = 'user_type';

export interface AppState extends PureSettings {
  lang: string;
  device: 'mobile' | 'desktop' | string;
  transitionName: string;
  multiTab: boolean;
  multiTabFixed: boolean;
  portalDesign: string;
  logo: object | any;
}

const SET_LANG = 'SET_LANG';
const SET_DEVICE = 'SET_DEVICE';
const SET_LAYOUT = 'SET_LAYOUT';
const SET_NAV_THEME = 'SET_NAV_THEME';
const SET_CONTENT_WIDTH = 'SET_CONTENT_WIDTH';
const SET_FIXED_HEADER = 'SET_FIXED_HEADER';
const SET_FIXED_SIDEBAR = 'SET_FIXED_SIDEBAR';
const SET_PRIMARY_COLOR = 'SET_PRIMARY_COLOR';
const SET_COLOR_WEAK = 'SET_COLOR_WEAK';
const SET_SPLIT_MENUS = 'SET_SPLIT_MENUS';
const SET_TRANSITION_NAME = 'SET_TRANSITION_NAME';
const SET_MULTI_TAB = 'SET_MULTI_TAB';
const SET_FIXED_MULTI_TAB = 'SET_FIXED_MULTI_TAB';
const SET_PORTAL_DESIGN = 'SET_PORTAL_DESIGN';
const SET_LOGO = 'SET_LOGO';

/** 兼容上一版用户配置数据结构，在前端做导航模式枚举值的映射 */
export const layoutMap = {
  hplusmenu: 'side',
  traditionmenu: 'top',
  simplemenu: 'mix',
  winmenu: 'left'
};
export const colorMap = {
  'blue-initial': '#1f76cb',
  blue: '#0E42D2',
  red: '#E62340',
  purple: '#7364BF',
  green: '#00B791',
  ashen: '#505364'
};
export const colorList = Object.keys(colorMap).map(key => {
  return { key, color: colorMap[key] };
});

export const useAppStore = defineStore('app', {
  // https://github.com/prazdevs/pinia-plugin-persistedstate 提供
  // persist: true, //process.env.NODE_ENV !== 'production',
  state: (): AppState => ({
    lang: 'en-US',
    device: 'desktop',
    layout: (settings.layout || 'left') as LayoutType, //导航模式 side侧边菜单布局,top顶部菜单布局,mix混合布局,left左侧混合布局
    navTheme: 'dark', //整体风格设置light亮色，dark暗色，realdark暗黑
    contentWidth: 'Fluid', //内容区域宽度
    fixedHeader: true, //是否固定头部Header
    fixedSidebar: true, //固定侧边菜单
    menu: { locale: false },
    splitMenus: false, //自动分割菜单
    title: settings.appName || '业务基础平台',
    primaryColor: settings.primaryColor || '#1f76cb', //主题色
    colorWeak: false, //色弱
    transitionName: '', //路由动画Null,Slide Up,Slide Right,Fade In,Zoom
    multiTab: true, //是否开启多页签
    multiTabFixed: true, //是否固定多页签
    portalDesign: '', //门户设置,
    logo: {} //配置的logo和标题
  }),
  actions: {
    async [SET_LANG](lang: Locale) {
      loadLanguageAsync(lang)
        .then(() => {
          this.lang = lang;
          localStorage.set(STORAGE_LANG_KEY, lang);
        })
        .catch(() => {
        });
    },
    [SET_DEVICE](device: string) {
      this.device = device;
    },
    [SET_LAYOUT](layout: LayoutType) {
      this.layout = layout;
      // 保存导航模式配置
      const userStore = useUserStore();
      const globalUserCustomConfig = { ...userStore[GLOBAL_USER_CUSTOMED_CONFIG] };
      Object.keys(layoutMap).forEach(layoutKey => {
        if (layoutMap[layoutKey] == layout) {
          globalUserCustomConfig.G_LAYOUT_MODE = layoutKey;
        }
      });
      globalUserCustomConfig.G_LAYOUT_MODE = globalUserCustomConfig.G_LAYOUT_MODE || layout;
      userStore.SET_USER_CUSTOMED_CONFIG(GLOBAL_USER_CUSTOMED_CONFIG, globalUserCustomConfig);
    },
    [SET_PORTAL_DESIGN](designId: string) {
      this.portalDesign = designId;
      // 保存门户小页配置
      const userStore = useUserStore();
      const globalUserCustomConfig = { ...userStore[GLOBAL_USER_CUSTOMED_CONFIG] };
      globalUserCustomConfig.PORTAL_DESIGN = designId;
      userStore.SET_USER_CUSTOMED_CONFIG(GLOBAL_USER_CUSTOMED_CONFIG, globalUserCustomConfig);
    },
    [SET_NAV_THEME](navTheme: MenuTheme | 'realDark' | undefined) {
      this.navTheme = navTheme;
    },
    [SET_CONTENT_WIDTH](contentWidth: ContentWidth) {
      this.contentWidth = contentWidth;
    },
    [SET_FIXED_HEADER](fixedHeader: boolean) {
      this.fixedHeader = fixedHeader;
    },
    [SET_FIXED_SIDEBAR](fixedSidebar: boolean) {
      this.fixedSidebar = fixedSidebar;
    },
    [SET_PRIMARY_COLOR](color: string) {
      this.primaryColor = color;
      // 保存主题色配置
      const userStore = useUserStore();
      const globalUserCustomConfig = { ...userStore[GLOBAL_USER_CUSTOMED_CONFIG] };
      Object.keys(colorMap).forEach(key => {
        if (colorMap[key] == color) {
          globalUserCustomConfig.G_SKIN_COLOR = key;
        }
      });
      globalUserCustomConfig.G_SKIN_COLOR = globalUserCustomConfig.G_SKIN_COLOR || color;
      userStore.SET_USER_CUSTOMED_CONFIG(GLOBAL_USER_CUSTOMED_CONFIG, globalUserCustomConfig);
    },
    [SET_COLOR_WEAK](colorWeak: boolean) {
      this.colorWeak = colorWeak;
    },
    [SET_SPLIT_MENUS](split: boolean) {
      this.splitMenus = split;
    },
    [SET_TRANSITION_NAME](name: string) {
      this.transitionName = name;
    },
    [SET_MULTI_TAB](isOpen: boolean) {
      this.multiTab = isOpen;
    },
    [SET_FIXED_MULTI_TAB](fixed: boolean) {
      this.multiTabFixed = fixed;
    },
    [SET_LOGO](logo: object) {
      this.logo = logo;
    }
  },
  getters: {}
});
const hot = import.meta.webpackHot || (import.meta as any).hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useAppStore, hot));
}
