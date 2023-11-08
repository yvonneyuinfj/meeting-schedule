<template>
  <avic-bpm-steps-template
    :ref="refName"
    :flow-param="tracksParam"
    :bpmInstanceObject="bpmInstanceObject"
  />
</template>

<script>
import AvicBpmStepsTemplate from '../../bpm-steps-template';
import bpmUtils from '../../../../bpmutils/FlowUtils';
export default {
  name: 'AvicBpmSteps',
  components: {
    AvicBpmStepsTemplate
  },
  props: {
    bpmInstanceObject: {
      type: Object
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
      handler(flowRefresh) {
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
      refName: 'flowSteps'
    };
  },
  mounted() {
    this.entryId = this.bpmInstanceObject.bpmModel.entryId;
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.entryId) {
        //有实例id 后台查询处理意见数据
        this.tracksParam.parameter.entryId = this.entryId;
        this.tracksParam.url = this.url;
        if (this.$refs[this.refName]) {
          this.$refs[this.refName].refreshStepsTracking();
        }
      } else {
        if (this.$refs[this.refName]) {
          //无实例id 拟稿阶段  初始化数据
          this.$refs[this.refName].initStepsTracking();
        }
      }
    }
  }
};
</script>
