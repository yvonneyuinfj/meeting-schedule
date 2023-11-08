import type { RuleObject } from 'ant-design-vue/es/form';
import type { PropType as PropTypeObj } from 'vue';
import type { Settings, SsoConfig, TableSettings, uploaderSettings } from '@/typing';
import type { UserInfo } from '@/store/user';
export {};
declare global {
  type Rule = RuleObject;
  type PropType<T> = PropTypeObj<T>;
  // 系统静态资源声明
  interface Window {
    $config: {
      consolePath: string;
      appName: string;
      table?: TableSettings;
      uploader?: uploaderSettings;
      ssoConfig: SsoConfig;
    };
  }
}
import type lodash from 'lodash';
//声明全局挂载方法，处理proxy使用全局挂载方法时eslint警告
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $encrypt: any;
    $lodash: typeof lodash;
    $message: any;
    $Modal: any;
    $Empty: any;
    $confirm: any;
    $colLayout1: any;
    $colLayout2: any;
    $colLayout3: any;
    $colLayout4: any;
    $settings: Settings;
    $modalWidthAndHeightBylayout: any;
    $getLookupByType: any;
    $getUserFileSecretLevelList: any;
    $objIsNotBlank: any;
    $checkJsonIsAllBlank: any;
    $uuid: any;
    $disabledStartDate: any;
    $disabledEndDate: any;
    $getChangeRecords: any;
    $validateInputMaxlength: any;
    $validateRegExp: any;
    $validateData: any;
    $validateRecordData: any;
    $formatZero: any;
    $dayjs: any;
    $formatValueToArray: any;
    $scrollToFirstErrorField: any;
    $dateFormat: any;
    $hasPermi: any;
    $hasPermiAnd: any;
    $hasRole: any;
    $hasRoleAnd: any;
    /** 当前登录用户 */
    $getLoginUser?: () => UserInfo;
    /** 获取系统参数 */
    $getProfileValue: (profileCode: string) => Promise<string>;
  }
}
