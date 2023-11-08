<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item[matchField])">
        <span v-if="!item.bgColor" :key="item[matchField]" :index="index">
          {{ item.lookupName }}
        </span>
        <a-tag
          v-else
          v-bind="$attrs"
          :key="item[matchField] + 1"
          :index="index"
          :color="item.bgColor"
        >
          {{ item.lookupName }}
        </a-tag>
      </template>
    </template>
  </div>
</template>
<script lang="ts" setup>
interface LookupData {
  lookupName: string;
  lookupCode: string;
  bgColor: string;
}
const props = defineProps({
  /** 数据字典集合 */
  options: { type: Object as PropType<Array<LookupData>>, default: null },
  /**
   * 如果value传入通用代码转换后的中文则该参数默认为lookupName
   * 如果value传入通用代码未转换的（数字或英文）该参数需要传入lookupCode
   */
  matchField: { type: String as PropType<'lookupName' | 'lookupCode'>, default: 'lookupName' },
  /** 双向绑定数据 */
  value: [String]
});
let values = computed(() => {
  if (props.value !== null && typeof props.value !== 'undefined') {
    if (props.value.includes(',')) {
      return props.value.split(',');
    } else if (props.value.includes(';')) {
      return props.value.split(';');
    } else {
      return Array.isArray(props.value) ? props.value : [String(props.value)];
    }
  } else {
    return [];
  }
});
</script>
<style scoped>
.a-tag + .a-tag {
  margin-left: 10px;
}
</style>
