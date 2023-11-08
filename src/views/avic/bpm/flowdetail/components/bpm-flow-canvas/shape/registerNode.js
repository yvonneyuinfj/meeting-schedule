/*
  新增一个节点的步骤分为6步
  1.创建节点基础文件,于shape\nodes文件夹下以节点名创建文件夹,文件夹顺序决定了左侧工具栏图标排序;
  2.于文件夹内创建index.vue(渲染节点组件),form.js(节点配置表单属性管理文件),panel.vue(节点属性配置表单模板文件)三个文件;
  3.于../common/emums.js的NodeTypeEnum对象中注册节点名(对应indev.vue中的name的全小写,之后所有地点均使用NodeTypeEnum中注册的对应节点名)
  
  ps:已有节点图标通过class方式统一管理(../icons/img.less) 节点图标尺寸48*48
*/

// const icons = require.context('./nodes', true, /index\.vue$/)
const icons = import.meta.globEager('./nodes/**/index.vue');
// console.log('register icons = ',icons)

import { register } from '@antv/x6-vue-shape';
import '../icons/img.less';

export default () => {
  // 注册面板图标
  Object.keys(icons).forEach(fileName => {
    const comp = icons[fileName];
    // console.log('icon comp = ',comp)
    const compName = comp.default.name.toLowerCase();
    const compBody = comp.default;
    register({
      shape: compName,
      width: 100,
      height: 100,
      component: compBody
    });
  });
};
