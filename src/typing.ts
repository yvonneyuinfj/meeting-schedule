import type { TablePaginationConfig } from 'ant-design-vue/es/table/interface';
import type { ColumnType } from 'ant-design-vue/lib/table';
import type { FilterValue } from 'ant-design-vue/lib/table/interface';
import type { Ref } from 'vue';
import type { AxiosRequestConfig } from 'axios';
import type { RouterOptions } from 'vue-router';
import type { LayoutType } from '@/components/base-layouts/typing';

export type Pagination = TablePaginationConfig;
export type TableFilters = Record<string, FilterValue>;
export type TableColumn = ColumnType;
export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type MaybeRef<T> = T | Ref<T>;
export interface TableSettings {
  /** 表格大小 */
  size?: 'default' | 'small' | 'middle';
  /** 指定每页可以显示多少条 ['10', '20', '30', '40', '50']*/
  pageSizeOptions?: Array<string>;
  /** 每页条数 */
  pageSize?: number;
  /** 展示树形数据时，每层缩进的宽度，以 px 为单位 */
  indentSize?: number;
  /** 配置行高，组件内部默认会根据 size 自动调整高度，如果需要自定义高度可使用该属性 */
  rowHeight?: number;
}
export interface SsoConfig {
  /** 单点登录方式 cas认证，koal格尔认证，header认证，oauth2 */
  ssoFlag?: 'cas' | 'koal' | 'header' | 'oauth2' | '';
}
/** vue-router配置 */
export interface RouterSettings extends Partial<RouterOptions> {
  /** 基准路径 */
  base: string;
}
export interface uploaderSettings {
  /** 可上传的文件类型 */
  fileType?: string;
  /** 文件存储方式 */
  saveType?: 'DataBase' | 'Disk' | 'FastDfs' | 'HuaweiObs';
  /** 是否支持预览 */
  allowPreview?: boolean;
  /** 预览服务地址 */
  previewDomain?: string;
}
export interface Settings {
  /** 应用ID */
  appId: string;
  /** 登录密码加密公钥 */
  publicKey: string;
  /** 路由配置 */
  routerOptions: RouterSettings;
  /** 网络请求配置 */
  axiosRequestConfig?: AxiosRequestConfig;
  /**
   * 默认导航模式
   * side H+
   * top 传统
   * mix 简约
   * left 左侧混合布局
   */
  layout?: LayoutType;
  /** 表格默认参数 */
  table?: TableSettings;
  /** 附件默认参数 */
  uploader?: uploaderSettings;
  /** 控制台地址,配置该地址后默认开启根据用户跳转控制台 */
  consoleUrl?: string;
  /** 单点登录配置 */
  ssoConfig?: SsoConfig;
  [key: string]: any;
}
