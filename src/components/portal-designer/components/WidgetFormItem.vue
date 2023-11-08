<template>
  <div
    class="portal-widget-view"
    v-if="element && element.key"
    :class="{ active: select && select.key == element.key }"
    :label="element.name"
    @click.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type == 'smallPage'">
      <!-- 【5960】 【轻量化】【多栏目门户】门户预览页面，点击的更多，页面打开是404 -->
      <card-container :data="data" :element="element" source="design" />
    </template>
    <div class="portal-widget-view-action" v-if="select && select.key == element.key">
      <span title="设置" @click.stop="handleWidgetOpensSet"><setting-outlined /></span>
      <span title="拖动小页"><drag-outlined /></span>
      <span title="删除小页" @click.stop="handleWidgetDelete(index)"><delete-outlined /></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SettingOutlined, DragOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import CardContainer from './CardContainer.vue';

const props = defineProps({
  /** 门户小页配置信息 */
  data: { type: Object },
  /** 选中的小页 */
  select: { type: Object },
  /** 当前的小页 */
  element: { type: Object },
  /** 当前的小页下标 */
  index: { type: Number },
  /** 配置包含的小页 */
  layout: { type: Object }
});

const porletList = toRef(props, 'data');
const emit = defineEmits(['handleSelectWidget', 'move', 'handleWidgetOpensSet']);
function handleSelectWidget(index) {
  emit('handleSelectWidget', index);
}
function handleWidgetOpensSet() {
  emit('handleWidgetOpensSet');
}
/**选中 */
function handleWidgetDelete(index) {
  emit('move', props.data.list[index].url);
  porletList.value.list.splice(index, 1);
}
</script>
