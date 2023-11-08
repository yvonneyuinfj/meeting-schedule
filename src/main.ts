import 'ant-design-vue/dist/antd.variable.less';
import '@surely-vue/table/dist/index.less';
import './assets/styles/base-style.less';
import './assets/styles/excel-form-style.less';
import VueGridLayout from 'vue-grid-layout';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
//平台扩展入口文件
import core from './core';
import router from './router';
import App from './App.vue';
import directives from './directives';
//流程图节点渲染
import { getTeleport } from '@antv/x6-vue-shape';
const TeleportContainer = getTeleport();
// 注册自定义svg图标
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import locale from './locales';

//import { useIcons } from '@/icons';
import Authority from './utils/authority/authority.vue';
import './app.less';
import './router/router-guards';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app
  .use(locale as any)
  .use(router)
  .use(core)
  .use(directives)
  .use(VueGridLayout)
  .component(Authority.name, Authority)
  .component('TeleportContainer', TeleportContainer);

//useIcons(app);
app.mount('#app');
