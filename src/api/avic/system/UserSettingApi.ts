import request from '@/utils/request';
import type { ResponsePageData, ResponseBaseData } from '@/api/model/baseModel';
const basePath = '/appsys/user';
const consolePath = '/appsys/console/customed';
const multiorgPath = '/appsys/user/multiorg';

/**获取个人信息 */
export function getUserInfo(): Promise<ResponseBaseData<any>> {
  return request.get(basePath + '/user/info');
}

/** 修改个人信息 */
export function updateUserInfo(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/user/update', param);
}

/** 删除个人头像 */
export function deleteLogo(): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/user/photo/delete');
}

/** 获取个人头像 */
export function getLogo(): Promise<ResponseBaseData<any>> {
  return request.get(basePath + '/user/photo/get');
}

/** 根据用户和配置数据编码获取已配置的个性化数据 */
export function getCustomed(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/customed/get/v1', param);
}

/** 添加/修改用户的个性化设置数据 */
export function saveCustomed(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/customed/updateAll/v1', param);
}

/** 获取个人群组列表 */
export function getPersonalGroupListByPage(param): Promise<ResponsePageData<any>> {
  return request.post(consolePath + '/searchPersonalGroupByPage/v1', param);
}

/**  新增或修改个人群组 */
export function insertOrUpdatePersonalGroupList(param): Promise<ResponseBaseData<any>> {
  return request.post(consolePath + '/insertOrUpdatePersonalGroupList/v1', param);
}

/** 编辑个人群组  */
export function EditPersonalGroupUser(id): Promise<ResponseBaseData<any>> {
  return request.get(consolePath + '/getPersonalGroup/' + id + '/v1');
}

/** 搜索个人群组 */
export function searchPersonalGroupList(param): Promise<ResponseBaseData<any>> {
  return request.post(consolePath + '/searchPersonalGroupByPage/v1', param);
}

/** 删除个人群组 */
export function deletePersonalGroupList(id): Promise<ResponseBaseData<any>> {
  return request({
    url: consolePath + '/deletePersonalGroup/' + id + '/v1',
    data: id,
    method: 'delete'
  });
}

/** 获取常用意见配置 */
export function getApprovalOptionListByPage(param): Promise<ResponsePageData<any>> {
  return request.post(consolePath + '/searchApprovalOptionByPage/v1', param);
}

/** 编辑常用意见 */
export function EditApprovalOptionList(id): Promise<ResponseBaseData<any>> {
  return request({
    url: consolePath + '/getApprovalOption/' + id + '/v1',
    data: id,
    method: 'get'
  });
}

/** 新增或修改常用意见 */
export function insertOrUpdateApprovalOptionList(param): Promise<ResponseBaseData<any>> {
  return request.post(consolePath + '/insertOrUpdateApprovalOptionList/v1', param);
}

/** 删除常用意见 */
export function deleteApprovalOptionList(param): Promise<ResponseBaseData<any>> {
  return request.post(consolePath + '/deleteApprovalOptionList/v1', param);
}

/** 获取用户当前身份多组织 */
export function getCurrentMultiOrgInfo(): Promise<ResponseBaseData<any>> {
  return request.get(multiorgPath + '/current');
}

/** 获取多组织 */
export function getOrgList(): Promise<ResponseBaseData<any>> {
  return request.get(multiorgPath + '/list/org');
}

/** 获取多组织下部门 */
export function getorgDept(orgId): Promise<ResponseBaseData<any>> {
  return request.get(multiorgPath + '/list/dept/' + orgId);
}

/** 切换组织部门 */
export function changeOrgDept(param): Promise<ResponseBaseData<any>> {
  return request.post(multiorgPath + '/change', param);
}

/** 修改密码 */
export function changePassword(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/changePassword/v2', param);
}

/** 获取个人群组成员列表 */
export function getPersonalGroupMember(param): Promise<ResponsePageData<any>> {
  return request.post(
    consolePath + '/searchPersonalGroupMemberByPage/' + param.id + '/v1',
    param.queryParam
  );
}

/** 新增或修改个人群组成员列表 */
export function savePersonalGroupMember(param): Promise<ResponseBaseData<any>> {
  return request.post(
    consolePath + '/savePersonalGroupMember/' + param.id + '/v1',
    param.selectedAddRows
  );
}

/** 删除个人群组成员列表 */
export function deletePersonalGroupMember(params): Promise<ResponseBaseData<any>> {
  return request({
    url: consolePath + '/deletePersonalGroupMember/' + params.id + '/v1',
    data: params.selectedRowKeys,
    method: 'delete'
  });
}

/** 获取个人群组分享成员列表 */
export function getPersonalGroupSharedUser(param): Promise<ResponsePageData<any>> {
  return request.post(
    consolePath + '/searchPersonalGroupSharedUserByPage/v1/' + param.id,
    param.queryParam
  );
}

/** 新增或修改个人群组分享成员列表 */
export function savePersonalGroupShareUsers(param): Promise<ResponseBaseData<any>> {
  return request.post(
    consolePath + '/savePersonalGroupShareUsers/' + param.id + '/v1',
    param.selectedAddRows
  );
}

/** 删除个人群组分享成员列表 */
export function deletePersonalGroupShareUser(params): Promise<ResponseBaseData<any>> {
  return request({
    url: consolePath + '/deletePersonalGroupShareUser/' + params.id + '/v1',
    data: params.selectedRowKeys,
    method: 'delete'
  });
}
