import vue from '@vitejs/plugin-vue';
import type { PluginOption } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
const mock = require('../../build/mock/createMockServer');
import createSvgIcon from './svg-icon';
import createCompression from './compression';
import createAutoImport from './auto-import';
export default function createVitePlugins(env, isBuild) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vue(),
    vueJsx(),
    mock({
      watch: true,
      mockUrlList: [/api/],
      cwd: process.cwd(),
      enable: env.VITE_HTTP_MOCK === 'true' && process.env.NODE_ENV !== 'production'
    })
  ];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(env));
  return vitePlugins;
}
