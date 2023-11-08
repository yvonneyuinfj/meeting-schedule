<template>
  <div :style="showData.style" style="width: 100%; height: 100%">
    <div class="x6-html-node" :class="nodeStatus" @click="click">
      <div>{{ showData.alias }}</div>
    </div>
  </div>
</template>

<script>
import nodeIconMixin from '../../../mixins/nodeIcon.js';
export default {
  name: 'Text',
  mixins: [nodeIconMixin]
};
</script>
