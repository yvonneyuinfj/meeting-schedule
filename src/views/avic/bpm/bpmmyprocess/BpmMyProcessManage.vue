<template>
  <AvicSplit>
    <AvicPane size="250px">
      <BpmModelTree @onModelTreeSelect="onModelTreeSelect"></BpmModelTree>
    </AvicPane>
    <AvicPane>
      <a-tabs
        default-active-key="1"
        v-model:value="tabSelected"
        @change="reloadFocusedTask"
        class="avic-content-tab"
      >
        <a-tab-pane key="1" :forceRender="true">
          <template #tab>
            <!-- <a-badge :count="DraftCount"> -->
            <span>
              我的草稿
              <a-tag>{{ DraftCount }}</a-tag>
            </span>
            <!-- </a-badge> -->
          </template>
          <MyDraft
            v-if="tabDraftLoad || tabSelected == 1"
            ref="myDraft"
            :params="selectedTreeNode"
          />
        </a-tab-pane>
        <a-tab-pane key="2" :forceRender="true">
          <template #tab>
            <!-- <a-badge :count="ApplicationCount"> -->
            <span>
              我的申请
              <a-tag>{{ ApplicationCount }}</a-tag>
            </span>
            <!-- </a-badge> -->
          </template>
          <MyApplication
            v-if="tabApplicationLoad || tabSelected == 2"
            ref="tomyApplicationRead"
            :params="selectedTreeNode"
          />
        </a-tab-pane>
        <a-tab-pane key="3" :forceRender="true">
          <template #tab>
            <!-- <a-badge :count="ManagementCount"> -->
            <span>
              我的经办
              <a-tag>{{ ManagementCount }}</a-tag>
            </span>
            <!-- </a-badge> -->
          </template>
          <MyManagement
            v-if="tabManagementLoad || tabSelected == 3"
            ref="myManagement"
            :params="selectedTreeNode"
          />
        </a-tab-pane>
      </a-tabs>
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import { searchMyProcessCount } from '@/api/avic/bpm/BpmTaskApi';
import BpmModelTree from '../component/BpmModelTree.vue';
import MyDraft from './MyDraft.vue';
import MyApplication from './MyApplication.vue';
import MyManagement from './MyManagement.vue';
import type { treeParams } from '../types';

let tabSelected = ref<number>(1);
let tabDraftLoad = ref(true);
let tabApplicationLoad = ref(false);
let tabManagementLoad = ref(false);

const selectedTreeNode = reactive<treeParams>({
  nodeId: '',
  nodeType: ''
});
const data = reactive({
  DraftCount: '',
  ApplicationCount: '',
  ManagementCount: ''
});
let { DraftCount, ApplicationCount, ManagementCount } = toRefs(data);

function onModelTreeSelect(node: treeParams) {
  selectedTreeNode.nodeId = node.nodeId;
  selectedTreeNode.nodeType = node.nodeType;

  getMyProcessCount();

  if (tabSelected.value != 1) {
    tabDraftLoad.value = false;
  }
  if (tabSelected.value != 2) {
    tabApplicationLoad.value = false;
  }
  if (tabSelected.value != 3) {
    tabManagementLoad.value = false;
  }
}

function reloadFocusedTask(activeKey) {
  tabSelected.value = activeKey;
  if (activeKey == 1) {
    tabDraftLoad.value = true;
  } else if (activeKey == 2) {
    tabApplicationLoad.value = true;
  } else if (activeKey == 3) {
    tabManagementLoad.value = true;
  }
}

function getMyProcessCount() {
  searchMyProcessCount(selectedTreeNode)
    .then((response: any) => {
      data.DraftCount = response.data.myDraftCount || '0';
      data.ApplicationCount = response.data.myApplicationCount || '0';
      data.ManagementCount = response.data.myManagementCount || '0';
    })
    .catch(() => {
      data.DraftCount = '0';
      data.ApplicationCount = '0';
      data.ManagementCount = '0';
    });
}
</script>
<style lang="less" scoped>
:deep(.ant-badge) {
  display: flex;
  align-items: center;
  .ant-badge-count {
    background-color: @primary-4;
    position: initial;
    transform: initial;
    margin-left: 4px;
    transition: none;
    transform-origin: unset;
  }
}
:deep(.ant-tabs-nav) {
  .ant-tabs-tab-btn > span {
    display: flex;
    align-items: center;
    font-size: @font-size-lg;
  }
  .ant-tag {
    margin: 0 4px;
    padding: 0 10px;
    border-radius: 12px;
    line-height: 19px;
    background-color: @table-header-bg;
    border: @table-header-bg;
  }
  .ant-tabs-tab-active {
    .ant-tag {
      color: #fff;
      background-color: @primary-color;
      border: @primary-color;
    }
  }
}
</style>
