<!---
流程意见, 列表或者时间轴
--->
<template>
  <avic-bpm-tracking-content-template
    :ref="refName"
    :flow-param="tracksParam"
    :currentTab="currentTab"
  />
</template>
<script>
import AvicBpmTrackingContentTemplate from '../../bpm-tracking-content-template/index.vue';
import bpmUtils from '../../../../bpmutils/FlowUtils';

export default {
  name: 'AvicBpmTrackingContent',
  components: {
    AvicBpmTrackingContentTemplate
  },
  props: {
    bpmInstanceObject: {
      type: Object
    },
    currentTab: {
      type: String,
      default: 'tracking'
    }
  },
  watch: {
    'bpmInstanceObject.bpmModel.entryId': {
      immediate: true,
      handler(entryId) {
        if (this.entryId != entryId) {
          this.entryId = entryId;
          this.loadData();
        }
      }
    },
    'bpmInstanceObject.bpmModel.flowRefresh': {
      immediate: true,
      handler() {
        this.loadData();
      }
    }
  },
  data() {
    return {
      url: bpmUtils.baseurl + '/business/doGettracks/v1',
      tracksParam: {
        url: '',
        parameter: {
          entryId: ''
        },
        method: 'post'
      },
      entryId: '',
      refName: 'flowTracking'
    };
  },
  mounted() {
    this.entryId = this.bpmInstanceObject.bpmModel.entryId;
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.entryId) {
        this.tracksParam.parameter.entryId = this.entryId;
        this.tracksParam.url = this.url;
        if (this.$refs[this.refName]) {
          this.$refs[this.refName].refreshFlowTracking();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
