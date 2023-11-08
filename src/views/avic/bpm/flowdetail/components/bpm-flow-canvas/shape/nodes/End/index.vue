<template>
  <div>
    <div class="x6-html-node task_icon end_event" :class="nodeStatus" @click="click"></div>
    <div class="task-label">{{ showData.alias }}</div>
  </div>
</template>

<script>
import nodeIconMixin from '../../../mixins/nodeIcon.js';
export default {
  name: 'End',
  mixins: [nodeIconMixin]
};
</script>
