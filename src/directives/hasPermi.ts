/**
 * v-hasPermi 操作权限处理，只需包含其中一个，权限标签值为数组
 */
import type { Directive, DirectiveBinding } from 'vue';
import { useUserStore } from '@/store/user';

const hasPermi: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    const { value } = binding;
    const userStore = useUserStore();
    const permissionButtonMap = userStore.permissionButtonMap;

    if (value && value instanceof Array && value.length > 0) {
      const permissionCode = value;
      const hasPermissions = permissionCode.some(code => {
        return permissionButtonMap.has(code);
      });

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(
        `请设置正确的按钮权限标签值，例如：v-hasPermi="['demoSingle:add', 'demoSingle:edit']"`
      );
    }
  }
};

export default function (app) {
  app.directive('hasPermi', hasPermi);
}
