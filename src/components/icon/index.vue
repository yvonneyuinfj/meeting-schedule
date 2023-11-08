<template>
  <span :class="svgClass" :style="{ color: color }">
    <component v-if="iconSource == 'ant'" :is="iconObj"></component>
    <svg v-else class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconObj" :fill="color" />
    </svg>
  </span>
</template>
<script setup lang="ts">
const props = defineProps({
  /** 附加avic-icon类 */
  avicIconClass: { type: String, default: 'avic-icon' },
  /** 图标的svg图的名称 */
  svg: { type: String, default: '' },
  /** 图标颜色 */
  color: { type: String, default: '' }
});

let svgClass = computed(() => {
  if (props.avicIconClass) {
    return `${props.avicIconClass}`;
  }
  return 'avic-icon';
});
let iconObj = ref('');
let iconSource = ref('ant');
getIconInfo(props.svg);
//这里需要监听svg变化，否则动态修改svg后不生效
watch(
  () => props.svg,
  newValue => {
    getIconInfo(newValue);
  }
);
function getIconInfo(svgName) {
  if (svgName.includes('avic-')) {
    //当svg不为空时表示自定义图标库
    const iconComputed = computed(() => `#${svgName}`);
    iconObj.value = iconComputed.value;
    iconSource.value = 'avic';
  } else {
    //否则ant图标
    const svgNameLower = svgName.toLowerCase();
    //兼容vue2 ant design 图标库，vue3图标名称默认追加outlined或filled或tone，
    if (
      !svgNameLower.includes('outlined') &&
      !svgNameLower.includes('filled') &&
      !svgNameLower.includes('tone')
    ) {
      // 确认图标为vue2图标，手动追加-outlined保证在vue3项目中可识别
      svgName = svgName + '-outlined';
    }
    iconObj.value = svgName;
    iconSource.value = 'ant';
  }
}
</script>
<style lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
