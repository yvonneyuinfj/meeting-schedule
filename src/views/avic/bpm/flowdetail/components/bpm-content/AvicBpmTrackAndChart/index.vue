<template>
  <div>
    <div v-show="show">
      <avic-bpm-steps :bpmInstanceObject="bpmInstanceObject" />
    </div>
    <div v-show="!show">
      <avic-bpm-chart v-if="!show" :bpmInstanceObject="bpmInstanceObject" />
      <!--<a-divider />
      <AvicBpmTracking :bpmInstanceObject="bpmInstanceObject"/>-->
    </div>
  </div>
</template>

<script>
import { Divider } from 'ant-design-vue';
import AvicBpmSteps from '../AvicBpmSteps/index.vue';
import AvicBpmChart from '../AvicBpmChart/index.vue';
import AvicBpmTracking from '../AvicBpmTracking/index.vue';
export default {
  name: 'AvicBpmTrackAndChart',
  props: {
    isSteps: {
      type: Boolean,
      required: false, //校验
      default: true
    },
    //流程实例
    bpmInstanceObject: {
      type: Object
    }
  },
  components: {
    ADivider: Divider,
    AvicBpmChart,
    AvicBpmSteps,
    AvicBpmTracking
  },
  watch: {
    isSteps: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.show = newVal;
        }
      }
    }
  },
  data() {
    return {
      show: true
    };
  }
};
</script>
