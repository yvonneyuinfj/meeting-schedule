import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import path, { resolve } from 'path';
import createVitePlugins from './vite/plugins';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const isBuild = command === 'build';
  return {
    base: env.VITE_APP_PUBLIC_PATH,
    // 兼容 Cli
    define: {
      'process.env.VUE_APP_API_BASE_URL': JSON.stringify(env.VITE_APP_API_BASE_URL),
      'process.env.VUE_APP_PUBLIC_PATH': JSON.stringify(env.VITE_APP_PUBLIC_PATH)
    },
    plugins: createVitePlugins(env, isBuild),
    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            antdv: ['ant-design-vue', '@ant-design/icons-vue']
          }
        }
      }
    },
    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
        vue: 'vue/dist/vue.esm-bundler.js',
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        dayjs: resolve(__dirname, 'node_modules', 'dayjs')
      }
    },
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/en_US',
        'ant-design-vue/es/locale/zh_CN',
        'store/plugins/expire',
        'ant-design-vue/es/form',
        'dayjs',
        'dayjs/locale/en',
        'dayjs/locale/zh-cn',
        '@ant-design/icons-vue',
        'lodash-es',
        'pinia'
      ]
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: 'true; @import "~/styles/variables.less";',
            'root-entry-name': 'variable'
          },
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true
        }
      }
    },
    server: {
      port: 4000,
      host: true,
      proxy:
        /* env.VITE_HTTP_MOCK === 'true'
      ? undefined
      : */

        {
          '/api/mms/mds/': {
            target: 'http://127.0.0.1:10008',
            ws: false,
            changeOrigin: true
          },
          '/api/mms/tpm': {
            target: 'http://127.0.0.1:10009',
            ws: false,
            changeOrigin: true
          },
          '/api/mms/fam': {
            target: 'http://127.0.0.1:10010',
            ws: false,
            changeOrigin: true
          },
          '/api/mms/pms': {
            target: 'http://127.0.0.1:10012',
            ws: false,
            changeOrigin: true
          },
          '/api/mms/wms': {
            target: 'http://127.0.0.1:10013',
            ws: false,
            changeOrigin: true
          },
          '/api': {
            target: 'http://127.0.0.1:10001',
            ws: false,
            changeOrigin: true
            // rewrite: (p) => p.replace(/^\/api/, '')
          },
          // 门户改造
          '/api/myportal': {
            target: 'http://127.0.0.1:10100',
            ws: false,
            changeOrigin: true
          }
        }
    }
  };
};
