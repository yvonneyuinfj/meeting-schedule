import { useUserStore } from '@/store/user';

/**
 * 操作权限处理，只需包含其中一个，权限标签值为数组
 * @param {Array} value 校验值
 */
export function hasPermi(value) {
  if (value && value instanceof Array && value.length > 0) {
    const userStore = useUserStore();
    const permissionButtonMap = userStore.permissionButtonMap;
    const permissionCode = value;
    const hasPermissions = permissionCode.some(code => {
      return permissionButtonMap.has(code);
    });
    if (!hasPermissions) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like hasPermi="['system:user:add','system:user:edit']"`);
    return false;
  }
}

/**
 * 操作权限处理，必须全部拥有，权限标签值为数组
 * @param value
 * @returns
 */
export function hasPermiAnd(value) {
  if (value && value instanceof Array && value.length > 0) {
    const userStore = useUserStore();
    const permissionButtonMap = userStore.permissionButtonMap;
    const permissionCode = value;
    const hasPermissions = permissionCode.every(code => {
      return permissionButtonMap.has(code);
    });
    if (!hasPermissions) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like hasPermiAnd="['system:user:add','system:user:edit']"`);
    return false;
  }
}

/**
 * 角色权限处理，只需包含其中一个，角色权限标签值为数组
 * @param value
 * @returns
 */
export function hasRole(value) {
  if (value && value instanceof Array && value.length > 0) {
    const userStore = useUserStore();
    const roleMap = userStore.roleMap;
    const roles = value;
    const hasRole = roles.some(role => {
      return roleMap.has(role);
    });
    if (!hasRole) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like hasRole="['admin','system']"`);
    return false;
  }
}

/**
 * 角色权限处理，必须全部拥有，角色权限标签值为数组
 * @param value
 * @returns
 */
export function hasRoleAnd(value) {
  if (value && value instanceof Array && value.length > 0) {
    const userStore = useUserStore();
    const roleMap = userStore.roleMap;
    const roles = value;
    const hasRole = roles.every(role => {
      return roleMap.has(role);
    });
    if (!hasRole) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like hasRole="['admin','system']"`);
    return false;
  }
}
