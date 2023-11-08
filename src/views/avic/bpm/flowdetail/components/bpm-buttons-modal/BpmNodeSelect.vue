<template>
  <!-- <AvicModal
    :visible="flowNodeSelectVisible"
    :modal-title="getFlowNodeSelectTitle"
    :set-modal-style="modalWidthAndHeight.modalStyle"
    :set-modal-body-style="modalWidthAndHeight.bodyStyle"
    :modal-width="modalWidthAndHeight.standardModalStyle.width"
    :modal-height="modalWidthAndHeight.standardModalStyle.height"
    :modal-cut-height="48"
    :adjust-size="true"
    wrap-class-name="table-modal-wrap"
    :centered="true"
    :destroy-on-close="true"
    :mask-close-able="false"
    :footer="null"
    @cancel="closeModal"
  > -->
  <AvicModal
    :visible="flowNodeSelectVisible"
    :title="getFlowNodeSelectTitle"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
    :bodyStyle="{ padding: '8px' }"
  >
    <a-alert
      v-if="getFlowNodeSelectType === 'doglobaljump'"
      message="在有多个并发节点的情况下，请您先选择一个流程跳转的起始节点（点击红框标记的节点），然后再选择一个目标节点后执行流程跳转操作"
      type="info"
      show-icon
    />
    <!-- <a-tag color="blue">
    
    </a-tag> -->
    <a-alert
      v-if="getFlowNodeSelectType === 'dowithdrawpart'"
      message="在有多个并发节点的情况下，请您先选择一个流程拿回部分待办的节点（点击红框标记的节点），然后执行流程拿回部分待办操作"
      type="info"
      show-icon
    />

    <!-- <a-tag color="blue" v-if="getFlowNodeSelectType === 'dowithdrawpart'">
      
    </a-tag> -->
    <div style="height: calc(100% - 50px); margin-top: 8px">
      <avic-bpm-chart
        v-if="flowNodeSelectVisible"
        :type="getFlowNodeSelectType"
        :bpmInstanceObject="bpmInstanceObject"
        @clickNode="clickNode"
      />
    </div>
  </AvicModal>
</template>
<script>
import AvicBpmChart from '../bpm-content/AvicBpmChart/index.vue';
// import { modalWidthAndHeight } from 'avic-common';
export default {
  name: 'BpmNodeSelect',
  components: {
    AvicBpmChart
  },
  props: {
    bpmInstanceObject: {
      type: Object
    }
  },
  data() {
    return {
      flowNodeSelectVisible: false // 弹窗modal显隐
      // modalWidthAndHeight: modalWidthAndHeight(1280, 540, 48) // 弹窗modal宽高控制
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      // this.modalWidthAndHeight = modalWidthAndHeight(1280, 540, 48);
    });
  },
  methods: {
    /**
     * 点击返回、点击X关闭事件
     */
    closeModal() {
      this.bpmInstanceObject.bpmNodeSelect.closeFlowNodeSelectModal(this.bpmInstanceObject);
    },
    clickNode(params) {
      if (this.getFlowNodeSelectType === 'doglobaljump') {
        // 流程跳转
        this.bpmInstanceObject.bpmGlobaljump.BpmGlobaljumpCallback(this.bpmInstanceObject, params);
      } else if (this.getFlowNodeSelectType === 'doretreattowant') {
        // 任意退回
        this.bpmInstanceObject.bpmRetreat.executeTowantCallback(this.bpmInstanceObject, params);
      } else if (this.getFlowNodeSelectType === 'dosupplement') {
        // 补发
        this.bpmInstanceObject.bpmSupplement.BpmSupplementCallback(this.bpmInstanceObject, params);
      } else if (this.getFlowNodeSelectType === 'dowithdraw') {
        // 拿回
        this.bpmInstanceObject.bpmWithdraw.BpmWithdrawCallback(this.bpmInstanceObject, params);
      } else if (this.getFlowNodeSelectType === 'dostepuserdefined') {
        // 自定义选人
        this.bpmInstanceObject.bpmStepuserdefined.BpmStepuserdefinedCallback(
          this.bpmInstanceObject,
          params
        );
      } else if (this.getFlowNodeSelectType === 'dowithdrawpart') {
        // 拿回部分待办
        this.bpmInstanceObject.bpmWithdrawPart.BpmWithdrawPartCallback(
          this.bpmInstanceObject,
          params
        );
      }
    }
  },
  computed: {
    getFlowNodeSelectTitle() {
      return this.bpmInstanceObject.bpmNodeSelect.title;
    },
    getFlowNodeSelectType() {
      return this.bpmInstanceObject.bpmNodeSelect.type;
    }
  },
  watch: {
    /**
     * 监听是否显示
     */
    'bpmInstanceObject.bpmNodeSelect.flowNodeSelectVisible': {
      handler(flowNodeSelectVisible) {
        this.flowNodeSelectVisible = flowNodeSelectVisible;
        if (flowNodeSelectVisible) {
          setTimeout(() => {}, 0);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
