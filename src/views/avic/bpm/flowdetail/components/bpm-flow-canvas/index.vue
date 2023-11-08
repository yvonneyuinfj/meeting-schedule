<template>
  <div class="graph-container" ref="graphContainer">
    <div class="layout">
      <!-- 图形容器 -->
      <div :id="id" :ref="id" class="graph-main-container"></div>
      <!--      <teleport-container  :to="divElement" :key="id"   />-->
    </div>
  </div>
</template>

<script>
import { FunctionExt } from '@antv/x6';
import registerNode from './shape/registerNode';
import { initGraph } from './common/graph';

import * as graphFunc from './common/functions';
import { Scroller } from '@antv/x6-plugin-scroller';

export default {
  name: 'AvicBpmFlowCanvas',
  props: {
    list: {},
    flowId: {
      type: String,
      default: '8a69d6f87db1d421017db6b8d5b807e3'
    },
    data: {
      type: Object,
      required: true
    },
    flowType: {
      //1未发布,2已发布
      type: Number,
      default: 2
    },
    flowQueryUrl: {
      type: Object,
      default: () => {
        return {
          get: '/api/bpm/design/getProcessJson/v1'
        };
      }
    },
    // 画布初始化自定义选项 可覆盖graph.js中的默认值
    graphOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      id: '',
      formData: {},
      graph: {},
      node: [],
      graphKey: '',
      disabled: false,
      currentIndex: 0,
      selectCell: '',
      nodeForm: {},
      type: 'grid',
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
        type: 'mesh',
        args: {
          color: '#D0D0D0',
          thickness: 1, // 网格线宽度/网格点大小
          factor: 10
        }
      },
      isRending: false,
      tooltipsContent: null
    };
  },
  created() {
    this.id = 'container' + this.getRandomAlphaNum(10);
  },
  mounted() {
    // console.log('id = ',this.id)
    // 实例化x6
    // this.graph = initGraph(this.id,this.graphOption);

    // // 监听
    // this.initListenerCustomEvent();

    // // 注册节点
    // registerNode();

    this.initFlow(this.data);
  },
  methods: {
    initMain(callback) {
      let that = this;
      // console.log('that.graph = ',that.graph)
      if (that.graph && that.graph.data) {
        if (callback) callback();
        return;
      }
      // console.log('initMain')
      window.setTimeout(() => {
        let graphContainerWidth = that.$refs['graphContainer'].clientWidth;
        let graphContainerHeight = that.$refs['graphContainer'].clientHeight;
        // return
        // console.log('graphContainerWidth',graphContainerWidth)
        // console.log('graphContainerHeight',graphContainerHeight)
        // 实例化x6
        that.graph = initGraph(that.id, {
          // scroller: {
          //   enabled: true,
          //   pageVisible: true,
          //   pageBreak: false,
          //   width: graphContainerWidth,
          //   height: graphContainerHeight,
          //   pageWidth: graphContainerWidth,
          //   pageHeight: graphContainerHeight
          // },
          ...that.graphOption
        });

        that.graph.use(
          new Scroller({
            enabled: true,
            pageVisible: true,
            pageBreak: false,
            width: graphContainerWidth,
            height: graphContainerHeight,
            pageWidth: graphContainerWidth,
            pageHeight: graphContainerHeight
          })
        );

        graphFunc.onlyLook(false, that.graph);

        // 监听
        that.initListenerCustomEvent();

        // 注册节点
        registerNode();

        if (callback) callback();

        that.$nextTick(() => {
          graphFunc.onlyLook(true, that.graph);
          window.setTimeout(() => {
            that.resizeGraph();
          }, 200);
          that.$nextTick(() => {
            graphFunc.fixFireFox(that.graph.getNodes());
            window.setTimeout(() => {
              that.isRending = false;
            }, 10);
          });
        });
      }, 0);
    },
    initFlow(data) {
      if (Object.keys(data).length > 0 && !this.isRending) {
        // console.log('initFlow data = ',data)
        let that = this;
        this.isRending = true;
        this.initMain(() => {
          // graphFunc.onlyLook(false, that.graph);
          let { edge, graph, node } = data;
          if (!graph.key) return this.$message.error('获取参数错误,缺少key');
          that.graphKey = graph.key;

          // that.$nextTick(()=>{
          if (that.graph && that.graph.data) return;

          that.graph.data = graph.data;
          graphFunc.initDefaultData(node, edge, that.graph);
          // that.graph.center();
          // })
        });
      }
    },
    resizeGraph() {
      let graphDiv = this.$refs[this.id];

      let paddingBtm = 50;

      let graphDivW = graphDiv.style.width;
      let graphDivH = graphDiv.style.height;

      // 容器父级
      let parentL1 = graphDiv.parentNode;
      // 滚动容器祖父级
      let parentL2 = graphDiv.parentNode.parentNode;
      // console.log('graphDiv = ',graphDiv)
      // console.log('parentL1 = ',parentL1)
      // console.log('parentL2 = ',parentL2)
      // console.log('graphDiv.width = ',graphDiv.style.width)
      // console.log('graphDiv.height = ',graphDiv.style.height)

      graphDiv.style.height = parseInt(graphDivH) + paddingBtm + 'px';

      graphDiv.style.width = parseInt(graphDivW) - 8 + 'px';
      graphDiv.style.left = 0 + 'px';
      graphDiv.style.top = 0 + 'px';

      parentL1.style.width = parseInt(graphDivW) - 8 + 'px';
      parentL1.style.height = parseInt(graphDivH) + paddingBtm + 'px';

      parentL2.style.width = graphDivW;
      parentL2.style.height = parseInt(graphDivH) + paddingBtm + 'px';
      parentL2.style.overflow = 'hidden';
      parentL2.style.overflowX = 'auto';
    },
    lockCanvas(status = true) {
      graphFunc.onlyLook(status, this.graph);
    },
    initListenerCustomEvent() {
      // emit 节点单击
      this.graph.on('node:click', ({ e, x, y, node, view }) => {
        // console.log('e = ',e)
        // console.log('click node e = ',e.target)
        if (e.target && e.target.id === 'user-defined') {
          this.$emit('user-defined-click', { e, x, y, node, view });
        } else {
          this.$emit('node-click', { e, x, y, node, view });
        }
      });
      // 节点鼠标移入
      this.graph.on(
        'node:mouseenter',
        FunctionExt.debounce(({ e, node, view }) => {
          // console.log("flowCanvas mouseenter node = ", node);
          this.$emit('node-mouseenter', { e, node, view });
        }),
        500
      );
      // 节点鼠标移出
      this.graph.on('node:mouseleave', ({ e, node, view }) => {
        // console.log("flowCanvas mouseleave node = ", node);
        this.$emit('node-mouseleave', { e, node, view });
      });
    },
    getRandomAlphaNum(len) {
      let rdmString = '';
      for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
      return rdmString.substr(0, len);
    }
  }
};
</script>

<style lang="less" scoped>
.graph-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  //overflow: hidden;
  .toolbar-container {
    position: absolute;
    top: 60px;
    right: 330px;
    z-index: 999;
    width: 400px;
    height: 30px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0px 1px 8px -2px #000;
  }
}

.layout {
  position: relative;
  display: flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0;

  .graph-main-container {
    flex: 1;
    width: 100%;
    height: 100%;
    left: 0 !important;
    /*margin-top: 50px;*/
  }

  // tooltip
  #tooltip-container {
    position: absolute;
    z-index: 1;
    display: none;
    display: n;
    width: 350px;
    padding: 10px;
    color: #545454;
    font-size: 12px;
    word-break: break-all;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    user-select: none;
    adow: rgb(174, 174, 1);
  }
  .node-bar-container {
    z-index: 2;
  }
  .panel-area-container {
    top: 0;
    right: 0;
    z-index: 2;
    height: 100%;
    box-shadow: 0 0 10px 0px #0000003b;
  }
}

// 连接点交互
circle[data-class='choice-point']:hover {
  transition: all 0.05s;
  r: 9;
}
.options-container {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  padding-top: 13px;
  padding-right: 330px;
  padding-left: 60px;
  text-align: right;
  background: #fff;
  border-bottom: 1px solid #efefef;
  button {
    margin: 0 5px;
  }
}
</style>
<style lang="less" scoped>
:deep(.x6-node) {
  [magnet='true'] {
    cursor: crosshair;
    transition: none;

    &[port-group='in'] {
      cursor: move;
    }
  }

  &.x6-node-immovable {
    cursor: pointer;
  }

  .x6-port-body {
    visibility: hidden;
  }

  foreignObject {
    body {
      min-width: auto;
      &.user-defined-border {
        border: 1px solid #0e42d2;
        padding: 10px;
        width: 68px !important;
        margin: -10px;
      }
    }
  }
}
</style>
