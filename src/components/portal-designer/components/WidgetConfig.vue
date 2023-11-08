<template>
  <div v-if="showConfig">
    <a-form layout="horizontal" labelAlign="right">
      <a-form-item label="小页标题" v-if="data.type != 'grid'">
        <a-input v-model:value="porlet.options.title" />
      </a-form-item>
      <a-form-item label="显示标题" v-if="Object.keys(data.options).includes('titleRequired')">
        <a-switch v-model:checked="porlet.options.titleRequired" />
      </a-form-item>
      <a-form-item label="显示刷新" v-if="Boolean(data.options.titleRequired)">
        <a-switch v-model:checked="porlet.options.isShowRefresh" />
      </a-form-item>
      <a-form-item
        v-if="Object.keys(data.options).includes('fontSize') && Boolean(data.options.titleRequired)"
        label="标题样式"
      >
        <div class="avic-font-set-group">
          <a-select v-model:value="porlet.options.fontSize" style="width: 48px">
            <a-select-option v-for="item in fontSizeList" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
          <a-select v-model:value="porlet.options.lineHeight" style="width: 48px">
            <template #suffixIcon><unordered-list-outlined /></template>
            <a-select-option v-for="tim in lineHeightList" :key="tim" :value="tim + ''">
              {{ tim }}
            </a-select-option>
          </a-select>
          <a-checkable-tag
            :checked="Boolean(porlet.options.fontWeight)"
            @change="handleTagsChange($event, 'fontWeight')"
          >
            B
          </a-checkable-tag>
          <a-checkable-tag
            :checked="Boolean(porlet.options.italic)"
            @change="handleTagsChange($event, 'italic')"
            style="font-style: italic; padding-left: 4px"
          >
            I
          </a-checkable-tag>
          <span class="avic-font-setting">
            <color-picker v-model:pureColor="porlet.options.fontColor" />
          </span>
        </div>
      </a-form-item>
      <a-form-item v-if="data.w == 0 || data.w > 0">
        <template #label>
          宽度
          <a-tooltip title="设计区域划分为24等分">
            <question-circle-outlined class="portal-icon-question-circle" />
          </a-tooltip>
        </template>
        <a-input-number v-model:value="porlet.w" :min="1" :max="24" :step="1" />
      </a-form-item>

      <a-form-item label="高度" v-if="data.h">
        <a-input-number
          :formatter="value => `${value}px`"
          :parser="value => value.replace('px', '')"
          v-model:value="dataHeight"
          :min="100"
          :max="2000"
          :step="10"
          @change="changeNumber"
        />
      </a-form-item>
      <a-form-item label="小页路径" v-if="data.type != 'grid'">
        <a-textarea :disabled="true" :value="porlet.url" />
      </a-form-item>
    </a-form>
  </div>
  <div v-else class="empty">
    <a-empty :image="simpleImage">
      <template #description>
        <span>请选择一个小页设置</span>
      </template>
    </a-empty>
  </div>
</template>

<script setup lang="ts">
import { ColorPicker } from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';
import { QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons-vue';
import { Empty } from 'ant-design-vue';
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP } from './js/componentsConfig';

const props = defineProps({
  /** 门户小页配置信息 */
  data: { type: Object }
});
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const porlet = toRef(props, 'data');
const dataHeight = ref(0),
  fontSizeList = ref(FONT_SIZE_MAP),
  lineHeightList = ref(LINE_HEIGHT_MAP);
const showConfig = computed(() => {
  if (props.data && Object.keys(props.data).length > 0) {
    return true;
  }
  return false;
});
function changeNumber(value) {
  if (value === '' || value == null) {
    dataHeight.value = 100;
    porlet.value.h = 10;
  } else {
    porlet.value.h = dataHeight.value / 10;
  }
}
function handleTagsChange(e, key) {
  if (key) {
    porlet.value.options[key] = Number(e);
  }
}
watch(
  () => props.data.h,
  val => {
    if ((Object.keys(props.data).length > 0 && val == null) || val == '') {
      porlet.value.h = 10;
    }
    dataHeight.value = props.data.h * 10;
  }
);
watch(
  () => props.data.w,
  val => {
    if ((Object.keys(props.data).length > 0 && val == null) || val == '') {
      porlet.value.w = 1;
    }
  }
);
</script>
