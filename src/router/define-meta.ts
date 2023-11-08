import { getssoInfo } from '@/utils/common-util';
export const allowList = [
  'login',
  'register',
  'register-result',
  'casLogin',
  'oauth2Login',
  'koalLogin',
  'httpheaderLogin',
  'accessfromConsole'
]; // no redirect whitelist
const ssoInfo = getssoInfo();
let loginPath = '/user/login';
let ssoEnable = false;
if (ssoInfo.enable) {
  loginPath = ssoInfo.path;
  ssoEnable = true;
}
export const ssoEnableFlag = ssoEnable;
export const loginRoutePath = loginPath;
export const defaultRoutePath = '/dashboard';
