<template>
  <AvicSplit>
    <AvicPane size="250px">
      <BpmModelTree @onModelTreeSelect="onModelTreeSelect"></BpmModelTree>
    </AvicPane>
    <AvicPane>
      <FocusedTask :params="selectedTreeNode" />
    </AvicPane>
  </AvicSplit>
</template>
<script lang="ts" setup>
import BpmModelTree from '../component/BpmModelTree.vue';
import FocusedTask from './FocusedTask.vue';

const selectedTreeNode = reactive({
  nodeId: '',
  nodeType: ''
});

function onModelTreeSelect(node) {
  selectedTreeNode.nodeId = node.nodeId;
  selectedTreeNode.nodeType = node.nodeType;
}
</script>
