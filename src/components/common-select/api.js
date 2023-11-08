import request from '@/utils/request';
var basePath = '/appsys/common/select';
const httpRequest = (url, parameter, method) =>
  request({
    url: url,
    data: parameter,
    method: method
  });
//初始化加载用户或则部门
const getInitUserInfo = (userids = []) =>
  request({
    url: basePath + '/getSelectedUserInfo/v1',
    data: userids,
    method: 'POST'
  });
//人员，部门默认选中
const getInitDeptInfo = (deptids = []) =>
  request({
    url: basePath + '/getSelectedDeptInfo/v1',
    data: deptids,
    method: 'POST'
  });
//获取当前组织
const searchOrgName = async function (id = '', viewScope = '', defaultOrgId = '') {
  let result = await request({
    url: basePath + '/searchOrgName/v1',
    data: {
      id,
      defaultOrgId,
      viewScope
    },
    method: 'POST'
  });
  return new Promise(resolve => {
    resolve(result);
  });
};
//获取组织列表
const selectOrgName = async function (viewScope = '', defaultOrgId = '') {
  let result = await request({
    url: basePath + '/selectOrgName/v1',
    data: {
      viewScope,
      defaultOrgId
    },
    method: 'POST'
  });
  return new Promise(resolve => {
    resolve(result);
  });
};
//获取角色
const getInitRoleInfo = (
  roleUrl = '',
  roleMethodType = 'POST',
  searchText = '',
  viewScope = '',
  defaultOrgId = '',
  orgId = '',
  appId = '',
  rows = 20,
  page = 1,
  sord = 'asc'
) =>
  request({
    url: roleUrl,
    data: {
      searchText,
      viewScope,
      defaultOrgId,
      orgId,
      appId,
      rows,
      page,
      sord
    },
    method: roleMethodType
  });
//获取群组
const getInitGroupInfo = (
  groupUrl = '',
  groupMethodType = 'POST',
  searchText = '',
  viewScope = '',
  defaultOrgId = '',
  orgId = '',
  appId = '',
  rows = 20,
  page = 1,
  sord = 'asc'
) =>
  request({
    url: groupUrl,
    data: {
      searchText,
      viewScope,
      defaultOrgId,
      orgId,
      appId,
      rows,
      page,
      sord
    },
    method: groupMethodType
  });
//获取岗位
const getInitPositionInfo = (
  positionUrl = '',
  positionMethodType = 'POST',
  searchText = '',
  viewScope = '',
  defaultOrgId = '',
  orgId = '',
  appId = '',
  rows = 20,
  page = 1,
  sord = 'asc'
) =>
  request({
    url: positionUrl,
    data: {
      searchText,
      viewScope,
      defaultOrgId,
      orgId,
      appId,
      rows,
      page,
      sord
    },
    method: positionMethodType
  });
const getDeptAndPosition = async ids => {
  const dept = sessionStorage.getItem('sessionDept');
  if (dept == null && typeof dept !== 'undefined') {
    let result = await request({
      url: '/appsys/user/getDeptAndPositionListBySysUserId/v1',
      data: ids,
      method: 'post'
    });
    return new Promise(resolve => {
      if (result.success) {
        sessionStorage.setItem('sessionDept', JSON.stringify(result.result[0]));
        resolve(result.result[0]);
      } else {
        resolve(null);
      }
    });
  } else {
    return new Promise(resolve => {
      try {
        resolve(JSON.parse(dept));
      } catch (e) {
        resolve(null);
      }
    });
  }
};

const getRoles = async id => {
  const role = sessionStorage.getItem('sessionRole');
  if ((role == null || role == 'null') && typeof role !== 'undefined') {
    let result = await request({
      url: '/appsys/role/RoleRest/getRolesByUserId/v1',
      data: { userId: id, appId: 1 },
      method: 'post'
    });
    return new Promise(resolve => {
      if (result.success) {
        sessionStorage.setItem('sessionRole', JSON.stringify(result.result));
        resolve(result.result);
      } else {
        resolve(null);
      }
    });
  } else {
    return new Promise(resolve => {
      try {
        resolve(JSON.parse(role));
      } catch (e) {
        resolve(null);
      }
    });
  }
};
const getRecommendUser = async () => {
  let result = await request({
    url: '/eform/dataSource/searchByPage/v1',
    data: null,
    method: 'post'
  });
  return new Promise(resolve => {
    if (result.success) {
      sessionStorage.setItem('sessionDept', JSON.stringify(result.result[0]));
      resolve(result);
    } else {
      resolve(null);
    }
  });
};
const getInitOrgInfo = (orgids = []) =>
  request({
    url: basePath + '/getSelectedOrgInfo/v1',
    data: orgids,
    method: 'post'
  });
const getOrg = (defaultOrgId = '', id = '', viewScope = '') =>
  request({
    url: basePath + '/searchOrgName/v1',
    data: {
      id,
      defaultOrgId,
      viewScope
    },
    method: 'post'
  });
export {
  getInitDeptInfo,
  searchOrgName,
  selectOrgName,
  getInitRoleInfo,
  getInitGroupInfo,
  getInitPositionInfo,
  getInitUserInfo,
  getDeptAndPosition,
  getRoles,
  getRecommendUser,
  getInitOrgInfo,
  getOrg,
  httpRequest
};
