<template>
  <!-- <avic-modal
    :visible="butTrackVisible"
    modal-title="流程跟踪"
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
    :visible="true"
    title="流程跟踪"
    width="960px"
    height="580px"
    :centered="true"
    @cancel="closeModal"
    :body-style="{ padding: '8px 16px' }"
  >
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>

    <div
      class="track-head"
      style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px"
    >
      <h3 style="margin: 0">流程跟踪</h3>
      <a v-if="fatherEntryId" href="javascript:void(0);" class="father-flow" @click="unfoldFather">
        <avic-icon svg="avic-zoom-in-line" />
        查看父流程
      </a>
    </div>
    <div style="height: 300px">
      <avic-bpm-chart :bpmInstanceObject="bpmInstanceObject" />
    </div>

    <h3 style="margin-top: 16px">流程意见</h3>
    <avic-bpm-tracking-template :ref="refName" :flow-param="tracksParam" />
    <father-track
      :show-bpm-open-form-but="true"
      :entry-id="fatherEntryId"
      :visible="fatherVisible"
      :bpmInstanceObject="bpmInstanceObject"
      @closeFather="closeFather"
    />
  </AvicModal>
</template>
<script>
import AvicBpmChart from '../bpm-content/AvicBpmChart/index.vue';
import AvicBpmTrackingTemplate from '../bpm-tracking-template/index.vue';
import FatherTrack from './FatherTrack.vue';
import { httpAction } from '@/api/avic/bpm/FlowUtilApi';
import bpmUtils from '../../../bpmutils/FlowUtils';
export default {
  name: 'ButTrack',
  components: {
    AvicBpmChart,
    AvicBpmTrackingTemplate,
    FatherTrack
  },
  props: {
    bpmInstanceObject: {
      type: Object
    }
  },
  data() {
    return {
      tracksParam: {
        url: bpmUtils.baseurl + '/business/doGettracks/v1',
        parameter: {
          entryId: this.bpmInstanceObject.bpmModel.entryId
        },
        method: 'post'
      },
      getParentprocessParam: {
        url: bpmUtils.baseurl + '/business/getParentprocess/v1',
        method: 'post'
      },
      fatherEntryId: '', //父流程EntryId
      fatherVisible: false, //打开父流程
      refName: 'flowTextTrack'
    };
  },
  mounted() {
    // window.addEventListener('resize', () => {
    //   this.modalWidthAndHeight = modalWidthAndHeight(1280, 540, 48, 'auto', 'fff');
    // });
  },
  methods: {
    /**
     * 点击返回、点击X关闭事件
     */
    closeModal() {
      this.$emit('close');
      this.bpmInstanceObject.bpmButTrack.closeButTrackModal(this.bpmInstanceObject);
    },
    /**
     * 加载流程意见
     */
    loadFlowTextTrack() {
      this.tracksParam.parameter.entryId = this.bpmInstanceObject.bpmModel.entryId;
      this.$refs[this.refName].refreshFlowTracking();
    },
    //获取是否有父流程
    getParentprocess() {
      if (this.bpmInstanceObject.bpmModel.entryId) {
        let parameter = {
          entryId: this.bpmInstanceObject.bpmModel.entryId
        };
        httpAction(this.getParentprocessParam.url, parameter, this.getParentprocessParam.method)
          .then(res => {
            if (res.success) {
              this.fatherEntryId = res.data;
            }
          })
          .catch(e => {});
      }
    },
    //打开父流程
    unfoldFather() {
      this.fatherVisible = true;
    },
    //关闭父流程
    closeFather() {
      this.fatherVisible = false;
    }
  },
  computed: {},
  watch: {
    /**
     * 监听是否显示
     */
    'bpmInstanceObject.bpmButTrack.butTrackVisible': {
      immediate: true,
      handler(butTrackVisible) {
        if (butTrackVisible) {
          setTimeout(() => {
            this.loadFlowTextTrack();
          }, 0);
          this.getParentprocess();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
