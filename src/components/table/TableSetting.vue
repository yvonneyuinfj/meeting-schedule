<template>
  <div class="action-columns" ref="root">
    <div
      class="action-columns-box"
      :style="{ height: tableHeaderHeight + 'px' }"
      @click="onDrawerShow"
    >
      <avic-icon svg="avic-settings-4-line" />
    </div>
    <a-drawer
      title="表格设置"
      placement="right"
      width="320px"
      :headerStyle="headerStyle"
      :bodyStyle="bodyStyle"
      :closable="false"
      v-model:visible="visible"
      @close="onDrawerClose"
    >
      <div class="table-size">
        <a-form>
          <a-form-item label="显示密度">
            <a-radio-group v-model:value="size" button-style="solid" @change="onSizeChange">
              <a-radio-button v-for="item in selectSizeList" :key="item.value" :value="item.value">
                {{ item.title }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
      <a-divider style="margin: 8px 0" />
      <div class="table-column">
        <div class="table-column-setting-title">
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
            表头设置
          </a-checkbox>
          <a href="#" @click="onColumnsReset" class="table-column-setting-reset">重置</a>
        </div>
        <div class="table-column-setting-list">
          <ul class="table-column-setting-list-item">
            <draggable
              v-model="settingColumns"
              v-bind="dragOptions"
              handle=".li-drag"
              item-key="dataIndex"
              @start="drag = true"
              @end="onDragEnd"
            >
              <template #item="{ element }">
                <li class="table-column-setting-list-item-li">
                  <avic-icon class="li-drag" svg="HolderOutlined" />
                  <a-checkbox
                    v-model:checked="element.visible"
                    :title="element.title"
                    @change="e => onCheckChange(e, element)"
                  >
                    {{ element.title }}
                  </a-checkbox>
                  <div style="margin-left: auto">
                    <AvicIcon
                      class="fixed-icon-l"
                      svg="avic-download-fill"
                      title="左"
                      :class="element.fixed == 'left' ? 'active' : ''"
                      @click="e => onFixedChange(e, element, 'left')"
                    />
                    <AvicIcon
                      class="fixed-icon-r"
                      svg="avic-download-fill"
                      title="右"
                      :class="element.fixed == 'right' ? 'active' : ''"
                      @click="e => onFixedChange(e, element, 'right')"
                    />
                  </div>
                </li>
              </template>
            </draggable>
          </ul>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<script setup lang="ts">
import cloneDeep from 'lodash.clonedeep';
import draggable from 'vuedraggable';
const $emit = defineEmits(['sizeChange', 'columnsChange', 'columnsReset']);
const props = defineProps({
  tableHeaderHeight: {
    type: Number
  },
  defaultSize: {
    type: String
  },
  sizeList: {
    type: Object
  },
  columns: {
    type: Array
  }
});
let visible = ref(false),
  size = ref(''),
  backColumns = ref([]),
  settingColumns = ref([]),
  indeterminate = ref(false),
  checkAll = ref(true),
  checkedCounts = ref(0),
  drag = ref(false);
const dragOptions = {
    // 列表拖拽配置参数
    animation: 300,
    group: 'columnsSettingDragGroup',
    disabled: false,
    ghostClass: 'ghost',
    forceFallback: true,
    fallbackClass: 'drag-fallback'
  },
  headerStyle = {
    padding: '8px 16px'
  },
  bodyStyle = {
    padding: '8px',
    height: 'calc(100% - 40px)'
  };

// 抽屉开关状态
function onDrawerShow() {
  visible.value = true;
}
function onDrawerClose() {
  visible.value = false;
}
// 表格尺寸
watch(
  () => props.defaultSize,
  newVal => {
    size.value = newVal;
  },
  { immediate: true }
);
let selectSizeList = computed(() => {
  let selectSizeList = [];
  for (let key in props.sizeList) {
    selectSizeList.push({
      value: key,
      title: props.sizeList[key]['title']
    });
  }
  return selectSizeList;
});
function onSizeChange(e) {
  $emit('sizeChange', e.target.value);
}

// 表格列
onMounted(() => {
  nextTick(() => {
    backColumns.value = cloneDeep(props.columns);
    settingColumns.value = cloneDeep(props.columns);
    checkedCounts.value = props.columns.length;
  });
});
function formatColumns(columns) {
  for (let col of columns) {
    if (!col.visible) {
      checkedCounts.value -= 1;
    }
  }
}
watch(
  () => props.columns,
  (newVal, oldVal) => {
    if (newVal != oldVal) {
      checkedCounts.value = newVal.length;
      formatColumns(newVal);
      settingColumns.value = cloneDeep(props.columns); // 初始状态显示
    }
  }
);
watch(checkedCounts, val => {
  checkAll.value = val === props.columns.length;
  indeterminate.value = val > 0 && val < props.columns.length;
});
// 列变化
function columnsChange(columnItem) {
  $emit('columnsChange', settingColumns.value, columnItem);
}
// 列显隐
function onCheckChange(e, col) {
  if (!col.visible) {
    checkedCounts.value -= 1;
  } else {
    checkedCounts.value += 1;
  }
  columnsChange(null);
}
function onCheckAllChange(e) {
  if (e.target.checked) {
    checkedCounts.value = settingColumns.value.length;
    settingColumns.value.forEach(function (col, index) {
      col.visible = true;
    });
  } else {
    checkedCounts.value = 0;
    settingColumns.value.forEach(function (col, index) {
      col.visible = false;
    });
  }
  columnsChange(null);
}
// 拖拽调序
function onDragEnd() {
  drag.value = false;
  nextTick(() => {
    columnsChange(null);
  });
}
// 固定列调整
function onFixedChange(e, column, type) {
  let columns = [...settingColumns.value];
  let columnItem;
  columns.map(item => {
    if (
      (item['dataIndex'] && item['dataIndex'] === column['dataIndex']) ||
      (item['field'] && item['field'] === column['field'])
    ) {
      if (item['dataIndex'] && item['dataIndex'] === column['dataIndex']) {
        columnItem = item;
      }
      if (type === 'left') {
        item.fixed = item.fixed == 'left' ? null : 'left';
      } else if (type === 'right') {
        item.fixed = item.fixed == 'right' ? null : 'right';
      }
    }
  });
  columnsChange(columnItem);
}
// 列重置
function onColumnsReset() {
  settingColumns.value = backColumns.value;
  checkedCounts.value = settingColumns.value.length;
  $emit('columnsReset');
}
</script>
<style lang="less">
@import './style/tableSetting.less';
</style>
