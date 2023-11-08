<!---
  子流程弹出框
-->
<template>
  <!-- <AvicModal
    :visible="selectVisible"
    modal-title="子流程"
    :set-modal-style="modalWidthAndHeight.modalStyle"
    :set-modal-body-style="modalWidthAndHeight.bodyStyle"
    :modal-width="modalWidthAndHeight.standardModalStyle.width"
    :modal-height="modalWidthAndHeight.standardModalStyle.height"
    :modal-cut-height="98"
    :adjust-size="true"
    :centered="true"
    :mask-close-able="false"
    :destroy-on-close="true"
    @ok="afterClose"
    @cancel="closeModal"
  > -->
  <AvicModal
    :visible="selectVisible"
    title="子流程"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <AvicBpmX6ChartTemplate ref="flowChartChild" :flow-param="flowParam" />
  </AvicModal>
</template>
<script>
// import bpmUtils from '../../../../bpmutils/FlowUtils';
export default {
  name: 'AvicBpmChartChild',
  components: {},
  props: {
    selectVisible: {
      type: Boolean,
      required: true, //校验
      default: false
    },
    deploymentId: {
      type: String,
      required: true, //校验
      default: ''
    }
  },
  data() {
    return {
      refFlowName: 'flowChartChild',
      flowParam: {
        url: '/bpm/bpmmodel/appBpmPicRest/getProcessPicInfo/v1',
        parameter: {},
        method: 'post'
      }
    };
  },
  watch: {
    selectVisible: {
      immediate: true,
      handler(newV) {
        if (newV == true) {
          this.loadData();
        }
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.deploymentId) {
        this.flowParam.parameter.deploymentId = this.deploymentId;
        setTimeout(() => {
          this.$refs.flowChartChild.refreshFlowChart();
        }, 0);
      }
    },
    afterClose() {
      this.$emit('closeChild');
    },
    closeModal() {
      this.$emit('closeChild');
    }
  }
};
</script>
<style lang="less" scoped>
.flow-track-box {
  width: 100%;
  min-width: 400px;
  height: 100%;
  min-height: 200px;
  text-align: center;
}
</style>
