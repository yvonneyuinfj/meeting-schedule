<template>
  <a-space>
    <span v-hasPermi="allFileAuth">
      <a-dropdown>
        <template #overlay>
          <a-menu @click="({ key }) => handleChangeBpmFilter('all', key)">
            <template v-for="item in bpmStateOptions" :key="item.key">
              <a-menu-item>{{ item.label.all }}</a-menu-item>
            </template>
          </a-menu>
        </template>
        <a-button :type="bpmType == 'all' ? 'danger' : 'default'" :ghost="bpmType == 'all'">
          {{ labelForAll }}
          <down-outlined />
        </a-button>
      </a-dropdown>
    </span>
    <span v-hasPermi="myFileAuth">
      <a-dropdown>
        <template #overlay>
          <a-menu @click="({ key }) => handleChangeBpmFilter('my', key)">
            <template v-for="item in bpmStateOptions" :key="item.key">
              <a-menu-item>{{ item.label.my }}</a-menu-item>
            </template>
          </a-menu>
        </template>
        <a-button :type="bpmType == 'my' ? 'danger' : 'default'" :ghost="bpmType == 'my'">
          {{ labelForMy }}
          <down-outlined />
        </a-button>
      </a-dropdown>
    </span>
  </a-space>
</template>

<script lang="ts">
const bpmStateOptions = [
  {
    key: 'all',
    label: {
      all: '全部文件',
      my: '我的全部'
    }
  },
  {
    key: 'start',
    label: {
      all: '全部拟稿中',
      my: '我的拟稿中'
    }
  },
  {
    key: 'active',
    label: {
      all: '全部流转中',
      my: '我的流转中'
    }
  },
  {
    key: 'ended',
    label: {
      all: '全部已完成',
      my: '我的已完成'
    }
  }
];
export default {
  name: 'BpmFilter',
  props: {
    /** 默认显示“我的流程” */
    defaultBpmType: {
      type: String as PropType<'my' | 'all'>,
      default: 'my'
    },
    /** 默认显示“流转中”流程 */
    defaultBpmState: {
      type: String as PropType<'active' | 'end' | 'start'>,
      default: 'active'
    },
    /** "全部文件"按钮组的权限标识 */
    allFileAuth: {
      type: Array,
      default: () => []
    },
    /** "我的文件"按钮组的权限标识 */
    myFileAuth: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      bpmStateOptions,
      labelForAll: '',
      labelForMy: '',
      bpmType: this.defaultBpmType,
      bpmState: this.defaultBpmState
    };
  },
  created() {
    this.labelForAll =
      this.defaultBpmType == 'my'
        ? bpmStateOptions.find(item => item.key == 'all').label.all
        : bpmStateOptions.find(item => item.key == this.defaultBpmState).label.all;
    this.labelForMy =
      this.defaultBpmType == 'my'
        ? bpmStateOptions.find(item => item.key == this.defaultBpmState).label.my
        : bpmStateOptions.find(item => item.key == 'active').label.my;
  },
  methods: {
    handleChangeBpmFilter(bpmType, bpmState) {
      this.bpmType = bpmType;
      this.bpmState = bpmState;
      if (bpmType == 'all') {
        this.labelForAll = bpmStateOptions.find(item => item.key == this.bpmState).label.all;
      } else {
        this.labelForMy = bpmStateOptions.find(item => item.key == this.bpmState).label.my;
      }
      this.$emit('change', { bpmType, bpmState });
    }
  }
};
</script>

<style></style>
