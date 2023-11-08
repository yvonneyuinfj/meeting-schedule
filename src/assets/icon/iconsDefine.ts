/**
 * 组装ICON结构
 */
const icons = [
  // {
  //   title: '商务',
  //   dir: 'Business',//图标所在文件夹名称
  //   iconList:[]
  // },
  // {
  //   title: '文档',
  //   dir: 'Document',
  //   iconList:[]
  // },

  // {
  //   title: '设备',
  //   dir: 'Device',
  //   iconList:[]
  // },
  {
    title: '系统',
    dir: 'System',
    iconList:[]
  },
  {
    title: 'Ant图标',
    dir: 'antdesign',//固定写法请勿修改
    iconList:[]
  },
  // {
  //   title: '其他',
  //   dir: 'Others',
  //   iconList:[]
  // },
  {
    title: '平台自定义',
    dir: 'AvicSvg',
    iconList:[]
  }
];
export function getIconsDefine() {
  return icons;
}