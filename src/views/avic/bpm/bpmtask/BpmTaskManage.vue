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
            <a-badge :count="todoTotalNumber">
              <span class="tab_title">
                我的待办
                <!-- <a-tag>{{ todoTotalNumber }}</a-tag> -->
              </span>
            </a-badge>
          </template>
          <TodoTask
            v-if="tabTodoTaskLoad || tabSelected == 1"
            ref="todoTask"
            :params="selectedTreeNode"
          />
        </a-tab-pane>
        <a-tab-pane key="2" :forceRender="true">
          <template #tab>
            <a-badge :count="toReadTotalNumber">
              <span class="tab_title">
                我的待阅
                <!-- <a-tag>{{ toReadTotalNumber }}</a-tag> -->
              </span>
            </a-badge>
          </template>
          <ToRead
            v-if="tabToReadLoad || tabSelected == 2"
            ref="toRead"
            :params="selectedTreeNode"
          />
        </a-tab-pane>
        <a-tab-pane key="3" :forceRender="true">
          <template #tab>
            <a-badge>
              <span class="tab_title">
                我的已办
                <!-- <a-tag>{{ toReadTotalNumber }}</a-tag> -->
              </span>
            </a-badge>
          </template>
          <FinishedTask
            v-if="tabFinishedTaskLoad || tabSelected == 3"
            ref="finishedTask"
            :params="selectedTreeNode"
          />
        </a-tab-pane>
        <a-tab-pane key="4" :forceRender="true">
          <template #tab>
            <a-badge>
              <span class="tab_title">
                我的已阅
                <!-- <a-tag>{{ toReadTotalNumber }}</a-tag> -->
              </span>
            </a-badge>
          </template>
          <FinishedRead
            v-if="tabFinishedReadLoad || tabSelected == 4"
            ref="finishedRead"
            :params="selectedTreeNode"
          />
        </a-tab-pane>
      </a-tabs>
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import { searchBpmTaskCount } from '@/api/avic/bpm/BpmTaskApi';
import BpmModelTree from '../component/BpmModelTree.vue';
import ToRead from './ToRead.vue';
import FinishedTask from './FinishedTask.vue';
import FinishedRead from './FinishedRead.vue';
import TodoTask from './TodoTask.vue';
import type { treeParams } from '../types';

let tabSelected = ref<number>(1);
let tabTodoTaskLoad = ref(true);
let tabToReadLoad = ref(false);
let tabFinishedTaskLoad = ref(false);
let tabFinishedReadLoad = ref(false);
let data = reactive({
  todoTotalNumber: '',
  toReadTotalNumber: ''
});
let { todoTotalNumber, toReadTotalNumber } = toRefs(data);
const selectedTreeNode = reactive<treeParams>({
  nodeId: '',
  nodeType: '',
  procDefId: ''
});

function onModelTreeSelect(node: treeParams) {
  selectedTreeNode.nodeId = node.nodeId;
  selectedTreeNode.nodeType = node.nodeType;
  selectedTreeNode.procDefId = node.procDefId;

  /** 查询待办、待阅数量 */
  getBpmTaskCount();

  if (tabSelected.value != 1) {
    tabTodoTaskLoad.value = false;
  }
  if (tabSelected.value != 2) {
    tabToReadLoad.value = false;
  }
  if (tabSelected.value != 3) {
    tabFinishedTaskLoad.value = false;
  }
  if (tabSelected.value != 4) {
    tabFinishedReadLoad.value = false;
  }
}

function reloadFocusedTask(activeKey) {
  tabSelected.value = activeKey;
  if (activeKey == 1) {
    tabTodoTaskLoad.value = true;
  } else if (activeKey == 2) {
    tabToReadLoad.value = true;
  } else if (activeKey == 3) {
    tabFinishedTaskLoad.value = true;
  } else if (activeKey == 4) {
    tabFinishedReadLoad.value = true;
  }
}

function getBpmTaskCount() {
  searchBpmTaskCount(selectedTreeNode)
    .then(response => {
      data.todoTotalNumber = response.data.todoTaskCnt || '0';
      data.toReadTotalNumber = response.data.todoReadCnt || '0';
    })
    .catch(() => {
      data.todoTotalNumber = '0';
      data.toReadTotalNumber = '0';
    });
}
</script>
<style lang="less"></style>
