<!--
流程详情页面 , 可以点击的流程图
---->
<template>
  <div class="chart-box">
    <avic-bpm-x6-chart-template
      :ref="refFlowName"
      :flow-param="flowParam"
      :type="type"
      @clickNode="clickNode"
    />
  </div>
</template>
<script>
import AvicBpmX6ChartTemplate from '../../bpm-chart-content/index.vue';
export default {
  name: 'AvicBpmChart',
  components: {
    AvicBpmX6ChartTemplate
  },
  props: {
    //点击流程节点类型
    type: {
      type: String,
      required: false, //校验
      default: null
    },
    //流程实例v
    bpmInstanceObject: {
      type: Object
    }
  },
  watch: {
    'bpmInstanceObject.bpmModel.entryId': {
      immediate: true,
      handler(entryId) {
        if (entryId) {
          this.loadData(entryId);
        }
      }
    },
    'bpmInstanceObject.bpmModel.flowRefresh': {
      immediate: true,
      handler(flowRefresh) {
        if (this.entryId || this.deploymentId) {
          this.loadData(this.entryId, this.deploymentId);
        }
      }
    },
    'bpmInstanceObject.bpmModel.deploymentId': {
      immediate: true,
      handler(deploymentId) {
        if (deploymentId) {
          this.loadData('', deploymentId);
        }
      }
    }
  },
  /*watch: {
    getEntryId(entryId) {
      if (entryId) {
        this.loadData(entryId);
      }
    },
    //刷新页面
    getFlowRefresh() {
      if (this.entryId || this.deploymentId) {
        this.loadData(this.entryId, this.deploymentId);
      }
    },
    getDeploymentId(deploymentId) {
      if (deploymentId) {
        this.loadData('', deploymentId);
      }
    }
  },*/
  data() {
    return {
      refFlowName: 'flow',
      //获取流程图数据流程详情页面
      processXml: '/bpm/bpmmodel/appBpmPicRest/getProcessPicInfo/v1',
      //获取流程图数据启动流程页面
      processXmlByDefineId: '/bpm/bpmmodel/appBpmPicRest/getProcessPicInfo/v1',
      deploymentId: '',
      entryId: '',
      flowParam: {
        url: '',
        parameter: {},
        method: 'post'
      }
    };
  },
  mounted() {
    this.loadData(
      this.bpmInstanceObject.bpmModel.entryId,
      this.bpmInstanceObject.bpmModel.deploymentId
    );
  },
  methods: {
    loadData(entryId, deploymentId) {
      if (entryId || deploymentId) {
        if (entryId) {
          this.flowParam.url = this.processXml;
          this.flowParam.parameter.processInstanceId = entryId;
        }
        if (deploymentId) {
          this.flowParam.url = this.processXmlByDefineId;
          this.flowParam.parameter.deploymentId = deploymentId;
        }
        if (this.$refs[this.refFlowName]) {
          this.$refs[this.refFlowName].refreshFlowChart();
        }
      }
    },
    //流程点击事件
    clickNode(activityName, executionId, procinstDbid) {
      this.$emit('clickNode', {
        activityName,
        executionId,
        procinstDbid
      });
    }
  }
};
</script>
<style lang="less" scoped>
.chart-box {
  height: 100%;
  border: 1px solid @border-color-split;
}
.flow-track-box {
  width: 100%;
  min-width: 400px;
  height: 100%;
  min-height: 200px;
  text-align: center;
}
</style>
