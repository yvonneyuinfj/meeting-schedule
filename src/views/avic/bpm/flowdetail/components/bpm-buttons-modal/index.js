import ParentProcessModal from './ParentProcessModal';
import RelativeProcessList from './RelativeProcessList';
import BpmNodeSelect from './BpmNodeSelect.vue';
import ButTrack from './ButTrack.vue';
import FatherTrack from './FatherTrack.vue';
import Globalidea from './Globalidea.vue';
import ProcessTreeTable from './ProcessTreeTable.vue';
import SelectWorkHandUser from './SelectWorkHandUser.vue';
import Startsubflow from './Startsubflow.vue';

const components = {
  ParentProcessModal,
  RelativeProcessList,
  BpmNodeSelect,
  ButTrack,
  FatherTrack,
  Globalidea,
  ProcessTreeTable,
  SelectWorkHandUser,
  Startsubflow
};

Object.keys(components).forEach(key => {
  console.log(key);
  components[key].install = function (Vue) {
    Vue.component(components[key].name, components[key]);
  };
});
export default {
  ParentProcessModal,
  RelativeProcessList,
  BpmNodeSelect,
  ButTrack,
  FatherTrack,
  Globalidea,
  ProcessTreeTable,
  SelectWorkHandUser,
  Startsubflow
};

export {
  ParentProcessModal,
  RelativeProcessList,
  BpmNodeSelect,
  ButTrack,
  FatherTrack,
  Globalidea,
  ProcessTreeTable,
  SelectWorkHandUser,
  Startsubflow
};
