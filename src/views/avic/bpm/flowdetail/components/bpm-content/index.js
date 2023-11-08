import AvicBpmChart from './AvicBpmChart/index.vue';
import AvicBpmChartChild from './AvicBpmChartChild/index.vue';
import AvicBpmSteps from './AvicBpmSteps/index.vue';
import AvicBpmTrackAndChart from './AvicBpmTrackAndChart/index.vue';
import AvicBpmTracking from './AvicBpmTracking/index.vue';
import AvicBpmTrackingContent from './AvicBpmTrackingContent/index.vue';

const components = {
  AvicBpmChart,
  AvicBpmChartChild,
  AvicBpmSteps,
  AvicBpmTrackAndChart,
  AvicBpmTracking,
  AvicBpmTrackingContent
};

Object.keys(components).forEach(key => {
  console.log(key);
  components[key].install = function (Vue) {
    Vue.component(components[key].name, components[key]);
  };
});
export default {
  AvicBpmChart,
  AvicBpmChartChild,
  AvicBpmSteps,
  AvicBpmTrackAndChart,
  AvicBpmTracking,
  AvicBpmTrackingContent
};
export {
  AvicBpmChart,
  AvicBpmChartChild,
  AvicBpmSteps,
  AvicBpmTrackAndChart,
  AvicBpmTracking,
  AvicBpmTrackingContent
};
