// eslint-disable-next-line import/no-unresolved
import autoImport from 'unplugin-auto-import/vite';
//配置完成之后使用ref reactive watch 等无须import 导入 ，可以直接使用
export default function createAutoImport() {
  return autoImport({
    imports: ['vue', 'vue-router'],
    eslintrc: {
      enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
      filepath: './.eslintrc-auto-import.json', // 生成json文件
      globalsPropValue: true
    },
    dts: false
    //dts:'./src/types/auto-import.d.ts',
  });
}
