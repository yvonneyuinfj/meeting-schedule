import { getIconsDefine } from './iconsDefine';
import * as antIcons from '@ant-design/icons-vue';
//获取自动以图标集合数据
export function getIcons() {
  const icons = getIconsDefine();
  const files = import.meta.glob('./../../assets/icon/*/*.svg');
  const iconMap = new Map<string,any>();
  for (const key in files) {
    const name = key.split('/').pop().replace('.svg', '');
    const dirName = key.split('/')[key.split('/').length -2];
    const iconList = iconMap.get(dirName);
    if(iconList){
      iconList.push('avic-'+name);
    }else{
      const list = ['avic-'+name];
      iconMap.set(dirName,list);
    }
  }
  const anticons: any = antIcons;
  icons.forEach(cat=> {
    let iconList = [];
    if(cat.dir == 'antdesign'){
      for (const i in anticons) {
        // 平台默认仅挂载线条图标，实现和双色图标自行按需引入
        const svgName = anticons[i].displayName;
        if (svgName && svgName.includes('Outlined')) {
            iconList.push(svgName);
        }
      }
    }else{
      iconList = iconMap.get(cat.dir);
    }
    cat.iconList = iconList;
  });
  return icons;
}