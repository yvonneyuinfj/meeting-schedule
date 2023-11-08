/**
 * v-hasRole 角色权限处理，只需包含其中一个，角色权限标签值为数组
 */
import type { Directive, DirectiveBinding } from 'vue';
import { useUserStore } from '@/store/user';

const hasRole: Directive = {
  mounted: (el: Element, binding: DirectiveBinding) => {
    const { value } = binding;
    const userStore = useUserStore();
    const roleMap = userStore.roleMap;

    if (value && value instanceof Array && value.length > 0) {
      const roles = value;
      const hasRole = roles.some(role => {
        return roleMap.has(role);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置角色权限标签值"`);
    }
  }
};
export default function (app) {
  app.directive('hasRole', hasRole);
}
