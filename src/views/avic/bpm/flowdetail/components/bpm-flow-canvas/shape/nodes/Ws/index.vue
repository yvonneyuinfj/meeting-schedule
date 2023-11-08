<template>
  <div>
    <div class="x6-html-node task_icon task_webservice" :class="nodeStatus" @click="click"></div>
    <div class="task-label">{{ showData.alias }}</div>
  </div>
</template>

<script>
import nodeIconMixin from '../../../mixins/nodeIcon.js';
export default {
  name: 'Ws',
  mixins: [nodeIconMixin]
};
</script>
