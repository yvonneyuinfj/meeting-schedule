<template>
  <a-layout-content :class="classNames">
    <div class="" style="height: 100%; padding: 8px; overflow: auto">
      <slot />
    </div>
  </a-layout-content>
</template>

<script>
import { defineComponent, ref, toRefs } from 'vue';
import { useProProvider } from '@/components/base-layouts/pro-provider';

export default defineComponent({
  name: 'WrapContent',
  setup() {
    const { getPrefixCls } = toRefs(useProProvider());
    const prefixCls = getPrefixCls.value('basicLayout');
    const classNames = ref({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-has-header`]: true
    });
    return {
      classNames
    };
  }
});
</script>
