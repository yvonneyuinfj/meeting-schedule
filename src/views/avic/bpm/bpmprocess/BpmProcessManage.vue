<template>
  <AvicSplit>
    <AvicPane size="250px">
      <BpmModelTree @onModelTreeSelect="onModelTreeSelect" :hasAuthEnable="true"></BpmModelTree>
    </AvicPane>
    <AvicPane>
      <BpmProcess :params="selectedTreeNode" />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import BpmModelTree from '../component/BpmModelTree.vue';
import BpmProcess from './BpmProcess.vue';
import type { params } from '../types';

const selectedTreeNode = reactive<params>({
  nodeId: undefined,
  nodeType: undefined
});
function onModelTreeSelect(node: params) {
  selectedTreeNode.nodeId = node.nodeId;
  selectedTreeNode.nodeType = node.nodeType;
}
</script>
