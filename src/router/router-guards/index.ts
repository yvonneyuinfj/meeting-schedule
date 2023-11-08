import router from '@/router';
import { allowList, loginRoutePath, ssoEnableFlag } from '../define-meta';
// eslint-disable-next-line
import { useUserStore, GLOBAL_USER_CUSTOMED_CONFIG } from '@/store/user';
import { useAppStore, layoutMap, colorMap } from '@/store/app';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 50, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});
router.beforeEach(async to => {
  const userStore = useUserStore();
  const userToken = userStore.token;
  const appStore = useAppStore();
  NProgress.start();
  // token check
  if (!userToken) {
    // 白名单路由列表检查
    if (allowList.includes(to.name as string)) {
      return true;
    }
    if (to.fullPath !== loginRoutePath) {
      // 未登录，进入到登录页
      let queryParam = null;
      if (ssoEnableFlag) {
        queryParam = {
          redirect_url: to.fullPath
        };
      } else {
        queryParam = {
          redirect_url: encodeURIComponent(to.fullPath)
        };
      }
      return {
        path: loginRoutePath,
        replace: true,
        // 登录后跳转到之前页面，如不需要，直接删除 query 即可
        query: queryParam
      };
    }
    return to;
  } else {
    // 白名单路由列表检查
    if (allowList.includes(to.name as string)) {
      return true;
    }
  }

  // check login user.role is null
  if (userStore.allowRouters && userStore.allowRouters.length > 0) {
    return true;
  } else {
    // 从服务端获取用户的 [基础信息] 和 [权限信息]
    // 并构建动态路由和菜单
    // 问题1：为什么这么做：
    //   - 一般开发需要权限的系统时，都会有 登录 步骤
    //   - SPA 单页应用每次刷新时，内存中的数据都会被清空，如果每次刷新，执行一次 登录 步骤则非常不合理。
    //   - 所以设计为，一次登录，获得用户的授权 access token，并持久化到 localstorage，之后用户每次打开
    //     页面或者刷新页面时，都利用这个 token 去向后端索要用户的真实信息
    // 问题2：为什么不把用户信息也存到 localstorage 来少一次请求？
    //   - 用户信息存在 localstorage 后，使用者打开控制台，直接修改其中的权限信息，如：
    //     我的用户角色是 'user' ，这时改成 'admin'。刷新页面时就能看到 'admin' 才能看到的信息。所以该方案不可行！
    // 问题3：为什么不每次都调用登录？
    //   - 如果每次刷新都进行登录认证，那么用户的账户以及密码则不可保障安全
    //   - 要登录必然要账户密码或相同功能的认证信息代替
    // 问题4：access token 不是也不能保障安全吗？
    //   - 用户在此进行登录，代表认同该设备。保存用户的 token 可以进行快速身份认证，
    //     并且当用户认为 token 发生泄露或不安全时，可以根据相关服务端 token 设计规则，让 token 失效。

    // 加载用户信息、权限信息，生成对应的路由表
    const allowRouters = await userStore.GENERATE_ROUTES_DYNAMIC();
    const gloabalUserConfig = await userStore.GET_USER_CUSTOMED_CONFIG(GLOBAL_USER_CUSTOMED_CONFIG);
    // 加载当前用户配置的导航模式与主题颜色
    if (gloabalUserConfig?.G_LAYOUT_MODE) {
      appStore.layout =
        layoutMap[gloabalUserConfig.G_LAYOUT_MODE] || gloabalUserConfig.G_LAYOUT_MODE;
    }
    if (gloabalUserConfig?.G_SKIN_COLOR) {
      appStore.primaryColor =
        colorMap[gloabalUserConfig.G_SKIN_COLOR] || gloabalUserConfig.G_SKIN_COLOR;
    }
    if (allowRouters) {
      return { ...to, replace: true };
    }
    return false;
  }
});

router.afterEach(() => {
  NProgress.done();
});
