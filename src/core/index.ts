/* 平台扩展挂载入口 */
import { registerComponents } from './lazy-use'; //组件全局挂载
import { registerMethod } from './utils'; //方法全局挂载
export default {
  install(app) {
    registerComponents(app);
    registerMethod(app);
  }
};
