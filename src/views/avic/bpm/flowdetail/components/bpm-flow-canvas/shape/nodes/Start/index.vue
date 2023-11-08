<template>
  <div>
    <div class="x6-html-node task_icon start_event" :class="nodeStatus" @click="click"></div>
    <div class="task-label">{{ showData.alias }}</div>
  </div>
</template>

<script>
import nodeIconMixin from '../../../mixins/nodeIcon.js';
export default {
  name: 'Start',
  mixins: [nodeIconMixin]
};
</script>
