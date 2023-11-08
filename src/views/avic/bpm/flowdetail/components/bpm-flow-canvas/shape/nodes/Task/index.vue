<template>
  <avic-node-popover
    :popoverHistActivity="popoverHistActivity"
    :popoverData="popoverData"
    :popconfirmId="popconfirmId"
  >
    <div class="task-node">
      <div class="x6-html-node task_icon task_human" :class="nodeStatus" @click="click"></div>
      <span
        v-if="showData.userDefinedStatus == 'defined'"
        id="user-defined"
        class="user-defined-icon"
      ></span>
      <div class="task-label">{{ showData.alias }}</div>
    </div>
  </avic-node-popover>
</template>

<script>
import AvicNodePopover from './AvicNodePopover.vue';
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils';
import nodeIconMixin from '../../../mixins/nodeIcon.js';
import { httpAction } from '@/api/avic/bpm/FlowUtilApi';
export default {
  name: 'Task',
  components: {
    AvicNodePopover
  },
  data() {
    return {
      //鼠标到流程节点显示流程详情
      gettracktipParam: {
        url: bpmUtils.baseurl + '/clientbpmdisplayaction/gettracktip/v1',
        method: 'post'
      },
      popoverHistActivity: null,
      popoverData: [],
      popconfirmId: '' // 气泡框悬挂的父容器ID 解决层级问题
    };
  },
  mixins: [nodeIconMixin],
  mounted() {
    this.gettracktip();
    this.popconfirmId = this.form.popconfirmId;
  },
  methods: {
    /**
     * 流程节点跟踪信息
     */
    async gettracktip() {
      if (this.popoverSpinning) {
        return '';
      }
      let _this = this;
      let { nodeStatus, alias, nodeType, entryId, name } = this.showData;
      if (entryId && ['over', 'run'].includes(nodeStatus)) {
        this.popoverSpinning = true;
        let parameter = {
          processInstanceId: entryId,
          activityName: name
        };
        httpAction(this.gettracktipParam.url, parameter, this.gettracktipParam.method)
          .then(res => {
            if (res.success) {
              this.popoverData = res.data.tracks;
              //节点跟踪过滤显示10条数据，如果不过滤，跟踪数据量大，渲染效率慢，而且也看不全
              this.popoverData = this.popoverData.filter((item, index, self) => index <= 10);
              this.popoverHistActivity = res.data.histActivity;
            }
            this.popoverSpinning = false;
          })
          .catch(e => {
            console.log('error', e);
            this.popoverSpinning = false;
          });
      }
    }
  }
};
</script>
