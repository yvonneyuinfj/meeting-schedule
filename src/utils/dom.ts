import type { Ref, ComponentPublicInstance } from 'vue';

export type BasicTarget<T = HTMLElement> = (() => T | null) | T | null | Ref<T | null | undefined>;

export type TargetElement = ComponentPublicInstance | HTMLElement | Element | Document | Window;

/**
 * 获取Dom元素
 * @param target
 * @param defaultElement
 * @returns
 */
export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetElement | undefined | null;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('value' in target) {
    targetElement = (target.value as ComponentPublicInstance)?.$el;
  } else {
    targetElement = target;
  }

  return targetElement;
}

/**
 * 判断元素是否包含某个class
 * @param node
 * @param className
 * @returns
 */
export function hasClass(node: Element, className: string) {
  if (node.classList) {
    return node.classList.contains(className);
  }
  const originClass = node.className;
  return ` ${originClass} `.indexOf(` ${className} `) > -1;
}

/**
 * 给元素添加class
 * @param node 操作的元素
 * @param className 要添加的class名称
 */
export function addClass(node: Element, className: string) {
  if (node.classList) {
    node.classList.add(className);
  } else {
    if (!hasClass(node, className)) {
      node.className = `${node.className} ${className}`;
    }
  }
}

/**
 * 移除元素的某个class
 * @param node 操作的元素
 * @param className 要移除的class名称
 */
export function removeClass(node: Element, className: string) {
  if (node.classList) {
    node.classList.remove(className);
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className;
      node.className = ` ${originClass} `.replace(` ${className} `, ' ');
    }
  }
}
