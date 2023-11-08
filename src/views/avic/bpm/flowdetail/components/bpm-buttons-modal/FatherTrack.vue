<template>
  <AvicModal
    :visible="visible"
    :title="title"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
    :body-style="{ padding: '8px 16px' }"
  >
    <div
      class="track-head"
      style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px"
    >
      <h3 style="margin: 0">流程跟踪</h3>
      <div>
        <a
          v-if="fatherEntryId"
          href="javascript:void(0);"
          class="father-flow"
          @click="unfoldFather"
        >
          <avic-icon svg="avic-zoom-in-line" />
          父流程图
        </a>
        <a
          v-if="showBpmOpenFormBut"
          href="javascript:void(0);"
          class="father-flow"
          @click="openflow"
        >
          <avic-icon svg="avic-file-3-line" />
          相关表单
        </a>
      </div>
    </div>
    <div class="flow-chart-box">
      <avic-bpm-x6-chart-template
        v-if="visible"
        ref="flowChart"
        :flow-param="flowParam"
        :bpmInstanceObject="bpmInstanceObject"
      />
    </div>
    <h3>流程意见</h3>
    <avic-bpm-tracking-template ref="trackingTemplate" :flow-param="tracksParam" />
    <avic-bpm-detail-list :bpmInstanceObject="bpmInstanceObject" />
    <father-track
      :show-bpm-open-form-but="true"
      :entry-id="fatherEntryId"
      :visible="fatherVisible"
      :bpmInstanceObject="bpmInstanceObject"
      @closeFather="closeFather"
    />
  </AvicModal>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import AvicBpmTrackingTemplate from '../bpm-tracking-template/index.vue';
import AvicBpmDetailList from '../bpm-detail-list';
import FatherTrack from './FatherTrack.vue';
import bpmUtils from '../../../bpmutils/FlowUtils';
import { getParentProcess } from '@/api/avic/bpm/BpmParentFlowApi.js';
const AvicBpmX6ChartTemplate = defineAsyncComponent(
  () =>
    //异步引入组件
    import('../bpm-chart-content/index.vue')
);
const { proxy } = getCurrentInstance();
const props = defineProps({
  //prop接收传过来的参数
  entryId: { required: false, type: String, default: '' },
  visible: { type: Boolean, required: false, default: false },
  showBpmOpenFormBut: { type: Boolean, required: false, default: false },
  title: { required: false, type: String, default: '父流程' },
  bpmInstanceObject: { type: Object }
});

const tracksParam = reactive({
    url: bpmUtils.baseurl + '/business/doGettracks/v1',
    parameter: {
      entryId: ''
    },
    method: 'post'
  }),
  flowParam = reactive({
    url: '/bpm/bpmmodel/appBpmPicRest/getProcessPicInfo/v1',
    parameter: {},
    method: 'post'
  }),
  fatherEntryId = ref(''),
  fatherVisible = ref(false);
const trackingTemplate = ref();
watch(
  () => props.visible,
  visible => {
    if (visible) {
      setTimeout(() => {
        loadFlowTextTrack();
      }, 0);
      getParentprocess();
    }
  },
  { immediate: true }
);
const $emit = defineEmits(['closeFather']);
/**
 * 点击返回、点击X关闭事件
 */
function closeModal() {
  $emit('closeFather');
}

/**
 * 加载流程意见
 */
function loadFlowTextTrack() {
  if (props.entryId) {
    tracksParam.parameter = {
      entryId: props.entryId
    };
    flowParam.parameter = {
      processInstanceId: props.entryId
    };
    if (trackingTemplate.value) {
      trackingTemplate.value.refreshFlowTracking();
    }
  }
}

//获取是否有父流程
function getParentprocess() {
  if (props.entryId) {
    let parameter = {
      entryId: props.entryId
    };
    getParentProcess(parameter).then(res => {
      if (res.success) {
        fatherEntryId.value = res.data;
      }
    });
  }
}

//打开父流程
function unfoldFather() {
  fatherVisible.value = true;
}

//关闭父流程
function closeFather() {
  fatherVisible.value = false;
}

//打开流程详情
function openflow() {
  if (props.entryId) {
    bpmUtils.detail(props.bpmInstanceObject, props.entryId).catch(() => {
      proxy.$message.error('启动流程失败!');
    });
  }
}
</script>
<style lang="less" scoped></style>
