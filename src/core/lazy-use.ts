/* 平台按需加载组件 */
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  Select,
  Button,
  Checkbox,
  Tabs,
  Tag,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Radio,
  Tooltip,
  Space,
  Steps,
  Divider,
  Descriptions,
  Alert,
  Result,
  Statistic,
  Popconfirm,
  Popover,
  Table,
  Avatar,
  List,
  Progress,
  Switch,
  Modal,
  Rate,
  ConfigProvider,
  Empty,
  Spin,
  Drawer,
  PageHeader,
  Carousel,
  BackTop,
  Upload,
  Badge,
  Tree,
  Collapse,
  Calendar,Timeline,TimelineItem
} from 'ant-design-vue';
import STable from '@surely-vue/table';
import AvicIcon from '@/components/icon/index.vue';
import AvicModal from '@/components/modal/index.vue';
import AvicTreeSelect from '@/components/tree-select/AvicTreeSelect.vue';
import { ProProvider, PageContainer, TransformVnode } from '@/components';
import * as Icons from '@ant-design/icons-vue';
import AvicTable from '@/components/table/index.vue';
import AvicDictTag from '@/components/dict-tag/index.vue';
import AvicCommonSelect from '@/components/common-select/index.vue';
import AvicUploader from '@/components/file-upload/index.vue';
import AvicAutoCode from '@/components/auto-code/index';
import AvicExcelImport from '@/components/excel-import/index.vue';
import AvicModalSelect from '@/components/modal-select/index.vue';
import AvicRowEdit from '@/components/row-edit/index.vue';
import AvicBpmFilter from '@/components/bpm-filter/index.vue';
import { Splitpanes, Pane } from '@/components/split-panes/index';
import Viewer from 'v-viewer';

export function registerComponents(app) {
  app
    .use(STable)
    .use(Layout)
    .use(Menu)
    .use(Row)
    .use(Col)
    .use(Card)
    .use(Form)
    .use(Dropdown)
    .use(Select)
    .use(Button)
    .use(Checkbox)
    .use(Tabs)
    .use(Tag)
    .use(Tree)
    .use(Input)
    .use(InputNumber)
    .use(DatePicker)
    .use(TimePicker)
    .use(Radio)
    .use(Tooltip)
    .use(Space)
    .use(Steps)
    .use(Divider)
    .use(Descriptions)
    .use(Alert)
    .use(Result)
    .use(Statistic)
    .use(Popconfirm)
    .use(Popover)
    .use(Table)
    .use(Avatar)
    .use(List)
    .use(Progress)
    .use(Switch)
    .use(Modal)
    .use(Rate)
    .use(ConfigProvider)
    .use(Empty)
    .use(Spin)
    .use(Drawer)
    .use(PageHeader)
    .use(Badge)
    .use(Carousel)
    .use(BackTop)
    .use(Upload)
    .use(ProProvider)
    .use(Collapse)
    .use(Viewer)
    .use(Calendar)
    .use(Timeline)
    .use(TimelineItem)
    .component('AvicIcon', AvicIcon)
    .component('AvicModal', AvicModal)
    .component('AvicTreeSelect', AvicTreeSelect)
    .component(PageContainer.name, PageContainer)
    .component(TransformVnode.name, TransformVnode)
    .component('AvicTable', AvicTable)
    .component('AvicDictTag', AvicDictTag)
    .component('AvicCommonSelect', AvicCommonSelect)
    .component('AvicUploader', AvicUploader)
    .component('AvicAutoCode', AvicAutoCode)
    .component('AvicExcelImport', AvicExcelImport)
    .component('AvicModalSelect', AvicModalSelect)
    .component('AvicRowEdit', AvicRowEdit)
    .component('AvicSplit', Splitpanes)
    .component('AvicPane', Pane)
    .component('AvicBpmFilter', AvicBpmFilter);
  // 全局使用图标，遍历引入
  const icons: any = Icons;
  for (const i in icons) {
    // app.component(i, icons[i]);
    // 平台默认仅挂载线条图标，实现和双色图标自行按需引入
    const svgName = icons[i].displayName;
    if (svgName && svgName.includes('Outlined')) {
      app.component(i, icons[i]);
    }
  }
}
