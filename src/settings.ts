import type { Settings } from './typing';
/** 登录密码加密公钥 */
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCHqXl6pfiwPBbMIHBGdQ97jTw0VLf1iAxWStaa64vnF/qAaNOigfm+LSnOnZJRL5JCrz4ZeXtSxPSwCv2Eay4yivJ5qS4LTKPUBvNPJnbYE0T/TXkbZ78l6A3kgYRZxQ5E1WnU4B81UmtZmO9AG+q8RH13nXl/K0+VO2GZPOHbTwIDAQAB';
/**
 * window.$config为全局静态配置资源，
 * 开发时在public/static/config.js下进行配置,
 * 打包后该文件会生成到dist目录下static/config.js下
 * 打包后直接修改配置，实时生效无需重新打包
 **/
/**
 * 全局参数统一配置
 */
export const settings: Settings = {
  /** 应用ID */
  appId: '1',
  /** 登录密码加密公钥 */
  publicKey,
  /** 应用初始默认标题 */
  appName: window.$config.appName,
  /** 默认布局模式 */
  layout: 'side',
  /** 默认皮肤配置 */
  primaryColor: '#1f76cb',
  /** axios网络请求配置 */
  axiosRequestConfig: {
    timeout: 60000,
    baseURL: import.meta.env.VITE_APP_API_BASE_URL
  },
  // 路由配置(vue-router)
  routerOptions: {
    base: import.meta.env.VITE_APP_PUBLIC_PATH
  },
  /** 表格默认参数配置 */
  table: {
    /** 表格大小 */
    size: window.$config.table.size,
    /** 每页条数 */
    pageSize: 20,
    /** 行高 */
    rowHeight: 36,
    /** 展示树形数据时，每层缩进的宽度，以 px 为单位 */
    indentSize: 24,
    /** 每页条数可选项 */
    pageSizeOptions: window.$config.table.pageSizeOptions
  },
  /** 附件默认参数 */
  uploader: {
    /** 可上传的文件类型 */
    fileType: '',
    /** 文件存储方式 */
    saveType: window.$config.uploader.saveType,
    /** 是否支持预览 */
    allowPreview: true,
    /** 预览服务地址 */
    previewDomain: ''
  },
  /** 控制台地址,配置该地址后默认开启根据用户跳转控制台 */
  consoleUrl: window.$config.consolePath,
  /** 单点登录配置 */
  ssoConfig: {
    /** 单点登录方式，未开启单点和多种单点方式配置空，其余按照具体单点方式配置 */
    ssoFlag: window.$config.ssoConfig.ssoFlag
  }
};
