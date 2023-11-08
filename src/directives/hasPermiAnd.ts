/**
 * v-hasPermiAnd 操作权限处理，必须全部拥有，权限标签值为数组
 */
import type { Directive, DirectiveBinding } from 'vue';
import { useUserStore } from '@/store/user';

const hasPermiAnd: Directive = {
  mounted: (el: Element, binding: DirectiveBinding) => {
    const { value } = binding;
    const userStore = useUserStore();
    const permissionButtonMap = userStore.permissionButtonMap;

    if (value && value instanceof Array && value.length > 0) {
      const permissionCode = value;
      const hasPermissions = permissionCode.every(code => {
        return permissionButtonMap.has(code);
      });

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(
        `请设置正确的按钮权限标签值，例如：v-hasPermiAnd="['demoSingle:add','demoSingle:edit']"`
      );
    }
  }
};
export default function (app) {
  app.directive('hasPermiAnd', hasPermiAnd);
}
