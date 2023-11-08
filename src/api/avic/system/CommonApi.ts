import request from '@/utils/request';
import type { ResponseBaseData } from '@/api/model/baseModel';

/** 富文本上传图片 */
export function uploadImage(param): Promise<ResponseBaseData<any>> {
  return request.post('/appsys/common/uploader/upload/v1', param);
}

/** 获取系统参数配置 */
export function getProfileValueByCode(profileCode: string): Promise<ResponseBaseData<any>> {
  if (!profileCode) {
    return Promise.resolve(null);
  }
  return request.post('/appsys/profile/ProfileRest/getProfileValueByCode/v1', { profileCode });
}

/** 获取系统logo配置和系统名称 */
export function geSystemLogo(): Promise<ResponseBaseData<any>> {
  return request.get('/appsys/logo/AppLogoConfigRest/get/v1');
}

/**
 * 根据指定用户Id数组获取用户信息
 * @param userIds 用户Id数组
 * @returns
 */
export function getUserInfo(userIds: [string]): Promise<ResponseBaseData<any>> {
  return request.get('/appsys/common/select/getSelectedUserInfo/v1', { data: userIds });
}

/**
 * 根据指定角色Id数组获取角色信息
 * @param roleIds
 * @returns
 */
export function getRoleInfo(roleIds: [string]): Promise<ResponseBaseData<any>> {
  return request.get('/appsys/common/select/getSelectedRoleInfo/v1', { data: roleIds });
}
