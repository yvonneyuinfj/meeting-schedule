<template>
  <div class="bpm-chart">
    <div :id="popoverId"></div>
    <a-spin :spinning="spinning && !contentLoading" class="flow-graph-spin-box">
      <avic-error-card v-if="error" :error-message="error" />
      <avic-flow-canvas
        ref="flowCanvas"
        :graphOption="graphOption"
        :data="flowData"
        @node-click="nodeClick"
        @user-defined-click="userDefinedClick"
        @node-mouseenter="nodeMouseenter"
        @node-mouseleave="nodeMouseleave"
      />
      <!--子流程图-->
      <avic-bpm-chart-child
        :deployment-id="deploymentIdChild"
        :select-visible="selectVisibleChild"
        @closeChild="closeChild"
      />
      <!--子流程流程跟踪--->
      <father-track
        :title="fatherTitle"
        :show-bpm-open-form-but="true"
        :entry-id="fatherEntryId"
        :visible="fatherVisible"
        @closeFather="closeFather"
      />
      <sub-flow-list
        v-if="subListVisible"
        :sub-data="subList"
        @close="closeSubFlow"
        @confirm="selectSubFlow"
      />
      <AvicModal
        :visible="openModal"
        title="配置的人员信息"
        width="800px"
        height="520px"
        :centered="true"
        :maskClosable="false"
        :footer="null"
        @cancel="closeModal"
      >
        <a-list :data-source="nodeUserDefinedList">
          <template #renderItem="{ item }">
            <a-list-item>{{ item.userName }} （ {{ item.deptName }} ）</a-list-item>
          </template>
        </a-list>
      </AvicModal>
    </a-spin>
  </div>
</template>

<script>
import { Spin, Popover } from 'ant-design-vue';
import AvicErrorCard from '@/components/error-card/index.vue';
import AvicBpmFlowCanvas from '../bpm-flow-canvas/index.vue';
import AvicBpmChartChild from '../bpm-content/AvicBpmChartChild/index.vue';
import FatherTrack from '../bpm-buttons-modal/FatherTrack.vue';
import SubFlowList from '../bpm-buttons-modal/SubFlowList.vue';
import bpmUtils from '../../../bpmutils/FlowUtils';
import { httpAction } from '@/api/avic/bpm/FlowUtilApi';
function validNodePosition(node) {
  if (
    node.position &&
    typeof node.position.x !== 'undefined' &&
    typeof node.position.y !== 'undefined'
  ) {
    return true;
  }
  return false;
}
/** 两点连线的接入点
 * 目标节点相对起始节点的位置
 */
const fixedLinePort = {
  // 正左
  L: {
    sourcePort: 'p_top',
    targetPort: 'p_top'
  },
  // 正右
  R: {
    sourcePort: 'p_top',
    targetPort: 'p_top'
  },
  // 正上
  B: {
    sourcePort: 'p_right',
    targetPort: 'p_right'
  },
  // 正下
  T: {
    sourcePort: 'p_right',
    targetPort: 'p_right'
  },
  // 左上
  LT: {
    sourcePort: 'p_top',
    targetPort: 'p_right'
  },
  // 左下
  LB: {
    sourcePort: 'p_bottom',
    targetPort: 'p_right'
  },
  // 右上
  RT: {
    sourcePort: 'p_top',
    targetPort: 'p_left'
  },
  // 右下
  RB: {
    sourcePort: 'p_bottom',
    targetPort: 'p_left'
  },
  // 上左
  TL: {
    sourcePort: 'p_left',
    targetPort: 'p_bottom'
  },
  // 上右
  TR: {
    sourcePort: 'p_right',
    targetPort: 'p_bottom'
  },
  // 下左
  BL: {
    sourcePort: 'p_left',
    targetPort: 'p_top'
  },
  // 下右
  BR: {
    sourcePort: 'p_right',
    targetPort: 'p_top'
  }
};
/**
 * 计算节点连线的连接点（最佳路径）
 */
function calcLinePort(lineEdges) {
  const result = {
    sourcePort: 'p_top',
    targetPort: 'p_top'
  };
  if (
    !lineEdges ||
    lineEdges.length < 2 ||
    !validNodePosition(lineEdges[0] || !validNodePosition(lineEdges[1]))
  ) {
    return result;
  }
  const source = lineEdges[0],
    target = lineEdges[1];
  let offsetX = target.position.x - source.position.x;
  let offsetY = target.position.y - source.position.y;
  let positionOffsetType = '';
  // 起点在终点的左右(模糊)
  if (Math.abs(offsetX) > Math.abs(offsetY)) {
    positionOffsetType += offsetX >= 0 ? 'R' : 'L';
    if (offsetY !== 0) {
      positionOffsetType += offsetY > 0 ? 'B' : 'T';
    }
  } else {
    positionOffsetType += offsetY > 0 ? 'B' : 'T';
    if (offsetX !== 0) {
      positionOffsetType += offsetX > 0 ? 'R' : 'L';
    }
  }
  return fixedLinePort[positionOffsetType];
}

export default {
  name: 'AvicBpmX6ChartTemplate',
  props: {
    //流程图加载参数 ,包括 url 请求地址  parameter 加载参数 method 请类型
    flowParam: {
      type: Object,
      required: true,
      default: null
    },
    //点击流程节点类型
    type: {
      type: String,
      required: false,
      default: null
    },
    contentLoading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ASpin: Spin,
    APopover: Popover,
    AvicFlowCanvas: AvicBpmFlowCanvas,
    AvicBpmChartChild,
    FatherTrack,
    AvicErrorCard,
    SubFlowList
  },
  data() {
    return {
      flowQueryUrl: '/api/bpm/design/getProcessJson/v1',
      flowId: '4028b8817d320895017d320c37d40009',
      flowType: 2,
      spinning: false,
      graphOption: {
        panning: false,
        grid: 1
      },
      error: '',
      data: null,
      flowData: {},
      instanceData: {},
      //获取流程图数据
      iconTypeParam: {
        url: bpmUtils.baseurl + '/business/getIconType/v1',
        method: 'post'
      },
      //流程跳转
      getValidateDestActivity: {
        url: bpmUtils.baseurl + '/business/validateDestActivity/v1',
        method: 'post'
      },
      getcoordinate: {
        url: bpmUtils.baseurl + '/clientbpmdisplayaction/getcoordinate/v1',
        method: 'post'
      },
      startExecutionId: '', //流程跳转
      fatherVisible: false, // 子流程状态
      fatherEntryId: '', //子流程id
      subListVisible: false, //子流程列表状态
      subList: [], // 子表列表
      subprocess: [],
      fatherTitle: '',
      deploymentIdChild: '', //字流程 deploymentId
      chartHeight: '300px',
      selectVisibleChild: false, //子流程 是否显示
      arrayObj: [],
      popoverId: '', //气泡框父容器
      getUserDefinedParam: {
        url: bpmUtils.baseurl + '/business/getUserDefined/v1',
        method: 'post'
      },
      userDefinedList: [],
      openModal: false,
      nodeUserDefinedList: []
    };
  },
  mounted() {
    this.refreshFlowChart();
    this.$nextTick(function () {
      this.chartHeight = 'auto';
    });
    this.popoverId = 'popoverId' + this.getRandomAlphaNum(4);
  },
  methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    //刷新流程图
    async refreshFlowChart() {
      if (this.flowParam && this.flowParam.parameter && this.flowParam.url) {
        this.spinning = true;
        this.$emit('beforeLoadFlowChart', this.flowParam);
        this.loadDataProcessJson();
      }
    },
    //加载流程数据
    loadDataProcessJson() {
      // this.$sdk
      //   .http(this.flowParam.url, this.flowParam.parameter)
      httpAction(this.flowParam.url, this.flowParam.parameter)
        .then(res => {
          if (res.success == true) {
            this.data = res.data;
            this.drawChart(res.data);
            this.instanceData = res.data;
            if (res.data && res.data.subprocess) {
              this.subprocess = res.data.subprocess;
            }
            this.error = '';
          } else {
            this.error = '流程加载失败';
          }
          this.spinning = false;
          this.$emit('afterLoadFlowChart', res);
        })
        .catch(e => {
          this.spinning = false;
          this.$emit('afterLoadFlowChart', null);
          this.error = '流程加载失败';
        });
    },
    //画图
    async drawChart(result) {
      let {
        showInfo,
        processModel,
        currActivities,
        histActivities,
        processAssignee,
        subprocess,
        autocopyformdata,
        historyLines
      } = result;
      let { edge, graph, node } = processModel;
      if (this.type === 'dostepuserdefined') {
        let userDefinedListRes = await httpAction(
          this.getUserDefinedParam.url,
          this.entryId,
          this.getUserDefinedParam.method
        );
        if (userDefinedListRes && userDefinedListRes.data) {
          this.userDefinedList = userDefinedListRes.data;
        }
      }
      node.forEach(item => {
        item.data.popconfirmId = this.popoverId; //存入id
        item.data.entryId = this.entryId; //存入实例id 获取节点的流程处理信息
        item.data.nodeStatus = 'norun';
        if (
          this.type === 'dostepuserdefined' &&
          Object.keys(this.userDefinedList).includes(item.data.name)
        ) {
          item.data.userDefinedStatus = 'defined';
          item.data.userDefinedList = this.userDefinedList[item.data.name];
          item.attrs = {
            body: {
              class: 'user-defined-border'
            }
          };
        }

        if (histActivities && histActivities.includes(item.data.name)) {
          item.data.nodeStatus = 'over';
          item.data.showTooltipName = item.data.name;
        }
        if (currActivities && currActivities.includes(item.data.name)) {
          item.data.nodeStatus = 'run';
          item.data.showTooltipName = item.data.name;
        }
        if (subprocess && subprocess[item.data.name]) {
          if (currActivities && currActivities.includes(item.data.name)) {
            item.data.nodeStatus = 'subrun';
          } else if (histActivities && histActivities.includes(item.data.name)) {
            item.data.nodeStatus = 'subover';
          }
          item.data.showTooltipName = item.data.name;
        }
      });
      edge.forEach((item, index) => {
        let line = [];
        node.forEach(tim => {
          if (tim.id == item.source.cell) {
            line.unshift(tim.data.name);
          } else if (tim.id == item.target.cell) {
            line.push(tim.data.name);
          }
        });
        if (historyLines && historyLines.includes(line.join(','))) {
          item.data.edegStatus = 'run';
        } else {
          item.data.edegStatus = 'norun';
        }
      });
      // 将模板图中没有的流转线加到实例图的edge集合
      historyLines &&
        historyLines.forEach(item => {
          if (item && item.split(',').length === 2) {
            const linePoints = item.split(',');
            const sourceNode = linePoints[0],
              targetNode = linePoints[1];
            let sourceNodeId = '',
              targetNodeId = '';
            let jumpLineNodes = [];
            node.forEach(flowNode => {
              if (flowNode.data.name === sourceNode) {
                sourceNodeId = flowNode.id;
                jumpLineNodes.unshift(flowNode);
              }
              if (flowNode.data.name === targetNode) {
                targetNodeId = flowNode.id;
                jumpLineNodes.push(flowNode);
              }
            });
            // 校验模板图中有没有的流转线
            let currentLine = edge.find(
              templateEdge =>
                templateEdge.source.cell === sourceNodeId &&
                templateEdge.target.cell === targetNodeId
            );
            if (!currentLine) {
              let { sourcePort, targetPort } = calcLinePort(jumpLineNodes);
              edge.push({
                shape: 'edge',
                source: {
                  cell: sourceNodeId,
                  port: sourcePort
                },
                target: {
                  cell: targetNodeId,
                  port: targetPort
                },
                data: {
                  edegStatus: 'jump'
                }
              });
            }
          }
        });

      this.flowData = { edge, graph, node };
      if (this.$refs['flowCanvas']) {
        this.$refs['flowCanvas'].initFlow(this.flowData);
      }
    },

    //节点点击事件
    nodeClick({ node }) {
      // this.hovered = false;
      this.childClick(node);
      this.drawAct(this.flowParam.parameter.processInstanceId, node);
    },
    userDefinedClick({ node }) {
      this.nodeUserDefinedList = node.data.userDefinedList
        ? JSON.parse(node.data.userDefinedList)
        : [];
      this.openModal = true;
    },
    closeModal() {
      this.openModal = false;
    },
    /**
     * 节点鼠标移入事件
     */
    nodeMouseenter(node) {
      // this.gettracktip(node);
    },
    /**
     * 节点鼠标移出事件
     */
    nodeMouseleave(node) {
      // this.hovered = false;
    },
    /**
     * 获取流程点击事件coordinate
     */
    async getcoordinateByEntryId(entryId) {
      if (entryId) {
        // let result = await this.$sdk.http(
        //   this.getcoordinate.url,
        //   {
        //     processInstanceId: entryId
        //   },
        //   this.getcoordinate.method
        // );
        let res = await httpAction(
          this.getcoordinate.url,
          {
            processInstanceId: entryId
          },
          this.getcoordinate.method
        );
        return new Promise(resolve => {
          if (res.success) {
            resolve(res);
          } else {
            resolve(res);
          }
        });
      }
    },
    /**
     * 创建流程节点点击事件
     */
    async drawAct(entryId, cell) {
      let node = cell.store.data;
      let res = await this.getcoordinateByEntryId(entryId);
      let _self = this;
      if (res.success) {
        for (let key in res.data) {
          let activity = res.data[key];
          let activityName = activity.activityName;
          if (activityName == node.data.name) {
            let activityAlias = activity.activityAlias;
            let isCurrent = activity.isCurrent;
            let over = activity.over;
            let executionId = activity.executionId;
            let isAlone = activity.executionAlone;
            // let sameActName = activity.sameActName;
            if (bpmUtils.notNull(node.data.name)) {
              if (isCurrent == 'true') {
                _self.arrayObj.push(node);
              }
              if (isCurrent == 'true') {
                if (_self.type == 'dosupplement') {
                  _self.$emit('clickNode', activityName, executionId);
                }
                if (_self.type == 'doglobaljump') {
                  _self.dojump(
                    activityName,
                    executionId,
                    node,
                    entryId,
                    isCurrent,
                    activityAlias,
                    isAlone
                  );
                }
                if (_self.type == 'dowithdraw') {
                  _self.$emit('clickNode', activityName, executionId);
                }
                // 拿回部分待办
                if (_self.type == 'dowithdrawpart') {
                  _self.$emit('clickNode', activityName, executionId);
                }
              } else {
                if (_self.type == 'doglobaljump') {
                  _self.dojump(
                    activityName,
                    executionId,
                    node,
                    entryId,
                    isCurrent,
                    activityAlias,
                    isAlone
                  );
                }
                if (_self.type == 'doretreattowant' && over == 'true') {
                  _self.$emit('clickNode', activityName);
                }
              }
              if (_self.type == 'dostepuserdefined') {
                _self.$emit('clickNode', activityName, executionId, entryId);
              }
            }
          }
        }
      }
    },
    //子流程点击事件
    childClick(node) {
      let child = node.store.data;
      if (
        child.data.name == 'sub-process' ||
        ['subrun', 'subover'].includes(child.data.nodeStatus)
      ) {
        let _this = this;
        if (_this.subprocess) {
          if (_this.subprocess[child.data.name]) {
            if (_this.subprocess[child.data.name].entryId) {
              _this.fatherVisible = true;
              _this.fatherEntryId = _this.subprocess[child.data.name].entryId;
            } else if (_this.subprocess[child.data.name].length > 1) {
              _this.subListVisible = true;
              _this.subList = _this.subprocess[child.data.name];
            } else if (
              _this.subprocess[child.data.name].length > 0 &&
              _this.subprocess[child.data.name][0].entryId
            ) {
              _this.fatherTitle = '子流程';
              _this.fatherVisible = true;
              _this.fatherEntryId = _this.subprocess[child.data.name][0].entryId;
            } else if (child.store.data.deploymentId) {
              _this.deploymentIdChild = child.data.deploymentId;
              _this.selectVisibleChild = true;
            }
          } else {
            if (child.deploymentId) {
              _this.deploymentIdChild = child.data.deploymentId;
              _this.selectVisibleChild = true;
            }
          }
        } else if (child.deploymentId) {
          _this.deploymentIdChild = child.data.deploymentId;
          _this.selectVisibleChild = true;
        }
      }
    },
    /** 选择指定的子流程图打开*/
    selectSubFlow(entryId) {
      if (entryId) {
        this.fatherTitle = '子流程';
        this.fatherVisible = true;
        this.fatherEntryId = entryId;
      }
    },
    /** 关闭选择子流程弹窗*/
    closeSubFlow() {
      this.subListVisible = false;
    },
    //流程跳转
    async dojump(
      activityName,
      executionId,
      node,
      processInstanceId,
      isCurrent,
      activityAlias,
      isAlone
    ) {
      let _values = this.data.processModel.node;
      let _self = this;
      // 只有一个当前节点，默认是开始节点
      if (isAlone) {
        if (isCurrent == 'true') {
          return;
        }
      } else {
        if (isCurrent == 'true') {
          this.startExecutionId = executionId;
          // this.mxEditor.graph.setCellStyles('imageBorder', 'blue', [node.getCell()]);
          // TODO:设置节点样式
          for (let key in this.arrayObj) {
            let n = _values[key];
            if (n.id != node.store.data.id) {
              node.store.data.data.nodeStatus = node.store.data.data.nodeStatus + ' red';
            }
          }
          return;
        } else {
          if (!bpmUtils.notNull(this.startExecutionId)) {
            this.$message.error('请您先选择一个当前节点作为流程跳转的起始节点');
            return;
          }
        }
      }
      // Added in 01-16
      let rst;
      if (bpmUtils.notNull(this.startExecutionId)) {
        rst = await this.validateDestActivity(
          processInstanceId,
          this.startExecutionId,
          activityName
        );
      } else {
        rst = await this.validateDestActivity(processInstanceId, executionId, activityName);
      }
      if (rst.data.flag == 'failed') {
        this.$message.error('无法跳转到所选节点，请您重新选择');
        return;
      }
      // 分支跳转
      if (bpmUtils.notNull(this.startExecutionId)) {
        executionId = this.startExecutionId;
      }
      this.$emit('clickNode', activityName, executionId);
    },
    //流程跳转
    async validateDestActivity(processInstanceId, executionId, activityName) {
      let res = await httpAction(
        this.getValidateDestActivity.url,
        {
          procinstDbid: processInstanceId,
          executionId,
          activityName
        },
        this.getValidateDestActivity.method
      );
      return new Promise(resolve => {
        if (res.success) {
          resolve(res);
        } else {
          resolve(res);
        }
      });
    },
    closeChild() {
      this.selectVisibleChild = false;
    },
    closeFather() {
      this.fatherVisible = false;
      this.fatherEntryId = '';
    },
    getRandomAlphaNum(len) {
      let rdmString = '';
      for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
      return rdmString.substr(0, len);
    }
  },
  computed: {
    entryId() {
      return this.flowParam.parameter.entryId || this.flowParam.parameter.processInstanceId || '';
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  border: 1px solid #d6dce3;
}
.bpm-chart {
  overflow: auto;
  height: 100%;
  background: #f7f8fa url('../../assets/bpm-chart-bg/flow_bg.png');
}
.bpm-popover-box {
  display: inline-block;
}
.bpm-node-box {
  display: flex;
  width: 600px;
  /*max-height: 140px;*/
  /*overflow: auto;*/
  .ant-spin-container {
    width: 100%;
    height: 100%;
  }
  .table-box {
    display: flex;
    flex: 1;
    width: 600px;
    .node {
      flex: 1;
      .name {
        width: 20px;
      }
    }
  }
  :deep(.table-content) {
    min-height: 86px;
    max-height: 224px;
    overflow: hidden;
  }
}
.flow-track-box {
  width: 100%;
  min-width: 400px;
  height: auto !important;
  text-align: center;
}
.graph-button-box {
  .ant-btn-group {
    .ant-btn {
      padding: 0;
    }
  }
}
</style>
