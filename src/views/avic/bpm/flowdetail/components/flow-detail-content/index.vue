<template>
  <a-layout class="flow-detail-card">
    <a-layout-content class="flow-content">
      <a-spin
        :spinning="loadingSaveState || loading"
        wrapper-class-name="flow-detail-content-spin"
        :tip="loadingTips"
        size="large"
      >
        <div class="flow-content-wrapper">
          <div class="flow-content-top" v-show="viewMode !== 'detailForm'">
            <avic-bpm-head
              :params="params"
              :flow-custom-vars="flowCustomVars"
              :is-scroll-down="isScrollDown"
              :bpmInstanceObject="bpmInstanceObject"
              :showBpmTabs="eformMode == 'inModal' ? false : true"
              :beforeBpmButtons="beforeBpmButtons"
              @saveAndStartProcess="saveAndStartProcess"
              @saveForm="saveForm"
              @afterBpmButtons="afterBpmButtons"
              @flowCustomFunction="flowCustomFunction"
              @scrollViewByTab="scrollViewByTab"
              @handleFixedTop="handleFixedTop"
              @selectSubFlow="selectSubFlow"
              @selectParentFlow="selectParentFlow"
            />
          </div>
          <div
            ref="flowBody"
            class="flow-content-body"
            :style="modeStyle"
            :class="{ 'flow-content-body-down': isScrollDown && !fixedTop }"
          >
            <div
              class="bpm-pic-tab"
              :class="
                Object.assign(
                  { formDetail: viewMode == 'detailForm' },
                  eformMode == 'inModal' ? avicTopPanelClass : {}
                )
              "
            >
              <template v-for="item in bpmTabs">
                <div
                  v-if="item.display == '1'"
                  :ref="item.id"
                  :key="item.id"
                  class="section-content"
                >
                  <div v-if="item.display == '1'" class="section-title">
                    <div class="title">
                      <avic-icon svg="avic-file-text-fill" />
                      <h4>{{ item.name }}</h4>
                    </div>

                    <a v-if="item.id == 'bpm_pic_tab' && item.display == '1'" @click="changeTabs">
                      {{ switchTitle }}
                    </a>
                    <span
                      v-if="item.id == 'bpm_track_tab' && item.display == '1'"
                      class="flow-tabs"
                    >
                      <!-- <a-radio-group
                        v-for="(tab, i) in tabs"
                        :key="i"
                        :checked="currentTab == tab.type"
                        @change="changeHeadTag(tab)"
                        button-style="solid"
                        size="small"
                        v-model:value="value1"
                      >
                        <a-radio-button value="a" v-if="i == 0">
                          <avic-icon svg="avic-list-unordered" />
                        </a-radio-button>
                        <a-radio-button value="b" v-if="i == 1">
                          <avic-icon svg="avic-time-line" />
                        </a-radio-button>
                      </a-radio-group> -->
                      <a-radio-group button-style="solid" size="small" v-model:value="currentTab">
                        <a-radio-button
                          v-for="(tab, i) in tabs"
                          :key="i"
                          :value="tab.type"
                          @change="changeHeadTag(tab)"
                        >
                          <avic-icon :svg="tab.svg" />
                        </a-radio-button>
                      </a-radio-group>
                    </span>
                  </div>
                  <div class="section-iframe">
                    <component
                      v-if="item.id == 'bpm_form_tab'"
                      :params="params"
                      :microParams="microParams"
                      :is="detailVueCompnent"
                      :bpmInstanceObject="bpmInstanceObject"
                      ref="flowDetail"
                      @changeFlowCustomVars="changeFlowCustomVars"
                    />
                    <div v-if="item.id == 'bpm_idea_tab' && item.display == '1'" class="main">
                      <avic-bpm-opinion :bpmInstanceObject="bpmInstanceObject" />
                    </div>
                    <div v-if="item.id == 'bpm_pic_tab' && item.display == '1'" class="main">
                      <avic-bpm-track-and-chart
                        :is-steps="isSteps"
                        :bpmInstanceObject="bpmInstanceObject"
                      />
                    </div>
                    <div v-if="item.id == 'bpm_track_tab' && item.display == '1'" class="main">
                      <avic-bpm-tracking
                        :bpmInstanceObject="bpmInstanceObject"
                        :current-tab="currentTab"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </a-spin>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { AvicBpmHead } from '../bpm-head';
import AvicBpmContent from '../bpm-content';
import { AvicBpmOpinion } from '../bpm-opinion';
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils';

import bpmInstanceObject from '@/views/avic/bpm/bpmutils/FlowEditor';
export default {
  name: 'FlowDetailContent',
  props: {
    // 非电子表单detailvue文件的component对象
    detailVueCompnent: {
      // type: Function,
      required: true
    },
    // 非路由获取传参时使用
    params: {
      type: Object,
      required: false,
      default: null
    },
    viewMode: {
      type: String,
      required: false,
      default: ''
    },
    loadComponent: {
      type: Function,
      default: null
    }
  },
  components: {
    AvicBpmOpinion: AvicBpmOpinion,
    AvicBpmTrackAndChart: AvicBpmContent.AvicBpmTrackAndChart,
    AvicBpmHead,
    AvicBpmChart: AvicBpmContent.AvicBpmChart,
    AvicBpmTracking: AvicBpmContent.AvicBpmTracking
  },
  data() {
    return {
      id: null,
      contentLastScrollTop: 0,
      isScrollDown: false,
      fixedTop: true,
      openType: 'add',
      loadingTips: '正在加载流程表单',
      loadingSaveState: false,
      loading: false,
      bpmTabs: [], // 显示区域数据
      currentTab: 'tracking', // 文字跟踪当前展示tab页
      tabs: [
        { id: 1, name: '列表', type: 'list', svg: 'avic-list-unordered' },
        { id: 2, name: '时间轴', type: 'tracking', svg: 'avic-time-line' }
      ],
      flowCustomVars: {},
      isSteps: false, // 流程意见显隐控制
      switchTitle: '查看时间轴',
      urlParams: {},
      modeStyle: {},
      eformMode: '',
      visible: false,
      preConfirmedModel: '',
      selectSubFlowCallback: '',
      microParams: {}, // 微前端配置项
      bpmInstanceObject
    };
  },
  watch: {
    'bpmInstanceObject.bpmEditor.loadingState': {
      handler(val) {
        if (val) {
          this.loadingTips = '正在加载流程表单';
        }
        this.loading = val;
      }
    },
    'bpmInstanceObject.bpmEditor.loadingSaveState': {
      handler(val) {
        if (val) {
          this.loadingTips = '正在提交表单';
        }
        this.loadingSaveState = val;
      }
    },
    //监听tab数据变化
    'bpmInstanceObject.bpmTabs.showTabs': {
      handler(tabs) {
        if (this.viewMode === 'detailForm') {
          this.bpmTabs = tabs.filter(function (value, index, array) {
            return value.code == 'bpm_form_tab';
          });
        } else {
          this.bpmTabs = tabs;
        }
      }
    }
  },
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'flow-detail-body';
  },
  created() {
    if (this.params) {
      this.eformMode = 'inModal';
      let modeStyleHeight = this.viewMode === 'detailForm' ? '456px' : '400px';
      this.modeStyle = {
        height: modeStyleHeight
      };
      this.urlParams = this.params;
    } else {
      // 添加条件判断，避免dialog模式查看表单时js错误 By Cj
      if (this.$route) {
        this.urlParams = this.$route.query;
      }
    }
    this.id = this.urlParams.id;
    this.openType = this.urlParams.id ? 'edit' : 'add';
    if (this.urlParams.siteType == '1') {
      this.microParams.id = this.urlParams.defineId;
      this.microParams.microAppName = this.urlParams.microAppName;
      this.microParams.microAppUrl = this.urlParams.microAppUrl;
      this.microParams.microAppSubUrl = '/' + this.microParams.microAppName;
      this.microParams.microAppSubComponent = decodeURIComponent(this.$route.params.id).replace(
        RegExp('_', 'g'),
        '/'
      );
    }
    this.setFlowData();
    // // loadComponent方法测试代码
    // this.testCompnent = this.loadComponent('views/account/center/index');
  },
  mounted() {
    this.bpmTabs = this.bpmInstanceObject.bpmTabs.tabs;
    this.contentLastScrollTop = this.$refs.flowBody.scrollTop;
    this.$refs.flowBody.addEventListener('scroll', this.handleScroll);
    //刷新页面提示并关闭窗口
    if (this.openType == 'add') {
      this.refreshWindow();
    }
  },
  methods: {
    //设置流程数据
    setFlowData() {
      //设置流程标题
      if (!this.params) {
        bpmUtils.setTitle(this.urlParams.title);
      }
      if (this.openType == 'add') {
        if (!this.urlParams.defineId) {
          this.$message.error('系统错误缺少参数');
        }
        //初始化流程按钮和参数
        this.bpmInstanceObject.bpmEditor.flowEditorInitFunc(this.bpmInstanceObject, {
          deploymentId: this.urlParams.deploymentId,
          defineId: this.urlParams.defineId
        });
      } else if (this.openType == 'edit') {
        //初始化流程按钮和参数
        this.bpmInstanceObject.bpmEditor.flowEditorInitFunc(this.bpmInstanceObject, {
          entryId: this.urlParams.entryId,
          executionId: this.urlParams.executionId,
          taskId: this.urlParams.taskId,
          formId: this.urlParams.id
        });
      } else {
        this.$message.error('系统错误缺少参数');
      }
    },
    saveAndStartProcess(params) {
      this.$refs.flowDetail[0].saveAndStartProcess(params);
    },
    saveForm(params) {
      this.$refs.flowDetail[0].saveForm(params);
    },
    beforeBpmButtons(params) {
      // 向低版本保持兼容
      if (
        this.$refs.flowDetail[0].beforeBpmButtons &&
        typeof this.$refs.flowDetail[0].beforeBpmButtons == 'function'
      ) {
        return this.$refs.flowDetail[0].beforeBpmButtons(params);
      } else if (
        this.$refs.flowDetail[0].beforeClickBpmButtons &&
        typeof this.$refs.flowDetail[0].beforeClickBpmButtons == 'function'
      ) {
        return this.$refs.flowDetail[0].beforeClickBpmButtons(params);
      } else {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
      }
    },
    afterBpmButtons(params) {
      if (
        this.$refs.flowDetail[0].afterBpmButtons &&
        typeof this.$refs.flowDetail[0].afterBpmButtons == 'function'
      ) {
        return this.$refs.flowDetail[0].afterBpmButtons(params);
      } else if (
        this.$refs.flowDetail[0].afterClickBpmButtons &&
        typeof this.$refs.flowDetail[0].afterClickBpmButtons == 'function'
      ) {
        return this.$refs.flowDetail[0].afterClickBpmButtons(params);
      }
    },
    flowCustomFunction(params) {
      this.$refs.flowDetail[0].flowCustomFunction(params);
    },
    changeFlowCustomVars(params) {
      this.flowCustomVars = Object.assign({}, this.flowCustomVars, params);
    },
    handleFixedTop(val) {
      this.fixedTop = val;
    },
    scrollViewByTab(tab) {
      if (tab.id) {
        this.$refs[tab.id][0].scrollIntoView({ behavior: 'smooth' });
      }
    },
    handleScroll() {
      let scrollTop = this.$refs.flowBody.scrollTop;
      if (scrollTop > 0 && scrollTop - this.contentLastScrollTop > 0) {
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
      this.contentLastScrollTop = scrollTop;
    },
    refreshWindow() {
      if (!this.params && this.viewMode != 'detailForm') {
        if (window.name.indexOf('isReload') != -1) {
          this.$message.warning({
            title:
              '流程参数错误！无法初始化权限按钮！您可能是通过非法的途径进入了当前页面，例如重复刷新页面，拷贝链接到浏览器地址栏等操作。点击确定关闭表单',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
              window.close();
            }
          });
        } else {
          window.name = window.name + 'isReload';
        }
      }
    },
    /*查看详情*/
    changeTabs() {
      this.isSteps = !this.isSteps;
      if (this.isSteps) {
        this.switchTitle = '查看详情';
      } else {
        this.switchTitle = '查看时间轴';
      }
    },
    // 文字跟踪切换按钮
    changeHeadTag(e) {
      this.currentTab = e.type;
    },
    inModalResize(h) {
      let ch = this.viewMode === 'detailForm' ? 48 : 104;
      this.modeStyle = {
        // 104为modal头高度+流程页头高度
        height: h > ch ? h - ch + 'px' : 0
      };
    },
    selectSubFlow(callback) {
      this.visible = true;
      this.selectSubFlowCallback = callback;
    },
    //关联父流程后刷新流程图
    selectParentFlow() {
      this.$refs['bpmInstanceChart'].refreshFlowChart();
    },
    handleCancel() {
      this.visible = false;
    },
    onChoose(val) {
      this.preConfirmedModel = val;
    },
    handleConfirm() {
      const { title, deploymentId, version } = this.preConfirmedModel;
      if (!deploymentId) {
        this.$message.warning('请先选择一条流程');
        return;
      }
      this.visible = false;
      this.selectSubFlowCallback(deploymentId, title, version);
    }
  }
};
</script>
<style lang="less">
@import '@/views/avic/bpm/flowdetail/assets/styles/flow-detail.less';
.flow-detail-content-spin {
  & > .ant-spin {
    position: fixed !important;
  }
}
</style>
