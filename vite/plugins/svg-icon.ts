import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { getIconsDefine } from '../../src/assets/icon/iconsDefine';

export default function createSvgIcon(isBuild) {
  const iconDirs: string[] = [];
  const iconsObj = getIconsDefine();
  if (iconsObj) {
    iconsObj.forEach(item => {
      iconDirs.push(path.resolve(process.cwd(), 'src/assets/icon/' + item.dir));
    });
  }
  return createSvgIconsPlugin({
    iconDirs: iconDirs,
    symbolId: 'avic-[dir]-[name]',
    svgoOptions: isBuild
  });
}
