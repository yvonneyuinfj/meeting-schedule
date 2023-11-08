import { columnsData } from './columnsConfig.js';
/**
 *模板列表的布局数据
 */
export const layouts = [
  {
    type: 'grid',
    name: '模板一',
    icon: 'icon-grid-',
    columns: JSON.stringify(columnsData.columns1)
  },
  {
    type: 'grid',
    name: '模板二',
    icon: 'icon-grid-',
    columns: JSON.stringify(columnsData.columns2)
  }
];

export const FONT_SIZE_MAP = [
  '8',
  '10',
  '11',
  '12',
  '13',
  '14',
  '16',
  '18',
  '20',
  '24',
  '26',
  '28',
  '30',
  '36',
  '48',
  '72'
];

// 行高
export const LINE_HEIGHT_MAP = ['28', '30', '36', '38', '40', '44', '48', '50', '52'];
