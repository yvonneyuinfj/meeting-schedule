import { defineAsyncComponent, h } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import type { MenuDataItem } from './typing';
import { settings } from '@/settings';
import Layout from '@/layouts/index.vue';
import RouteView from '@/layouts/route-view.vue';
const AsyncDashboard = defineAsyncComponent(() => import('@/views/dashboard/index.vue'));
export const routes: MenuDataItem[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          icon: 'home-outlined',
          title: '首页',
          lock: true,
          hideInBreadcrumb: true,
          hideInMenu: true,
          hideChildrenInMenu: true
        },
        component: h(RouteView, null, () => h(AsyncDashboard))
      },
      {
        name: 'exception',
        path: '/exception',
        meta: {
          title: 'pages.exception.title',
          icon: 'WarningOutlined',
          hideInMenu: true,
          hideChildrenInMenu: true
        },
        component: RouteView,
        redirect: '/exception/403',
        children: [
          {
            name: 'exception403',
            path: '/exception/403',
            meta: { title: 'pages.exception.403.title' },
            component: () => import('@/views/exception/403.vue')
          },
          {
            name: 'exception404',
            path: '/exception/404',
            meta: { title: 'pages.exception.404.title' },
            component: () => import('@/views/exception/404.vue')
          },
          {
            name: 'exception500',
            path: '/exception/500',
            meta: { title: 'pages.exception.500.title' },
            component: () => import('@/views/exception/500.vue')
          }
        ]
      },

      /* 不在菜单中展示 */
      {
        name: 'account',
        path: '/account',
        meta: {
          title: 'pages.account.title',
          icon: 'AppstoreAddOutlined',
          hideInMenu: true,
          hideInBreadcrumb: true,
          hideChildrenInMenu: true
        },
        component: RouteView,
        redirect: '/account/information',
        children: [
          {
            name: 'AccountInformation',
            path: '/account/information',
            meta: { title: 'pages.account.information.title' },
            component: () => import('@/views/avic/portal/account/information/index.vue')
          },
          {
            name: 'AccountSettings',
            path: '/account/settings',
            meta: {
              title: 'pages.account.settings.title',
              keepAlive: false
            },
            // redirect: '/account/settings/base',
            component: () => import('@/views/avic/portal/account/settings/index.vue')
          }
        ]
      }
    ]
  }
];

export const staticRoutes: MenuDataItem[] = [
  {
    path: '/user',
    name: 'user',
    meta: { hideInMenu: true, title: 'pages.layouts.userLayout.title' },
    children: [
      {
        path: '/user/login',
        name: 'login',
        meta: { title: 'pages.login.accountLogin.tab' },
        component: () => import('@/views/login/login.vue')
      }
    ]
  },
  {
    path: '/casLogin',
    name: 'casLogin',
    meta: { hideInMenu: true },
    component: () => import('@/views/login/CasLogin.vue')
  },
  {
    path: '/oauth2Login',
    name: 'oauth2Login',
    meta: { hideInMenu: true },
    component: () => import('@/views/login/Oauth2Login.vue')
  },
  {
    path: '/koalLogin',
    name: 'koalLogin',
    meta: { hideInMenu: true },
    component: () => import('@/views/login/KoalLogin.vue')
  },
  {
    path: '/httpheaderLogin',
    name: 'httpheaderLogin',
    meta: { hideInMenu: true },
    component: () => import('@/views/login/HttpHeaderLogin.vue')
  },
  {
    path: '/flowdetail/:id',
    name: 'flowdetail',
    component: () => import('@/views/avic/bpm/flowdetail/index.vue'),
    meta: { title: 'flowdetail' }
  },
  {
    path: '/access-from-console',
    name: 'accessfromConsole',
    component: () => import('@/views/login/AccessFromConsole.vue'),
    meta: { title: '控制台到门户' }
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/portletConfig',
    name: 'portletConfig',
    meta: { hideInMenu: true },
    component: () => import('@/views/avic/portal/portlet/portletconfig/PortletConfigManage.vue')
  }
];

const router = createRouter({
  ...settings.routerOptions,
  history: createWebHistory(settings.routerOptions.base),
  routes: staticRoutes as RouteRecordRaw[],
  scrollBehavior: (to, from) => {
    if (to.path !== from.path) {
      setTimeout(() => {
        document.getElementById('app').scrollTop = 0;
      });
    }
    return { top: 0 };
  }
});

export default router;
