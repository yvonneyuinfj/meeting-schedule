<!--
    流程头部 按钮区域
--->
<template>
  <div v-cloak>
    <div class="head" :style="{ top: isScrollDown && !fixedTop ? '-40px' : '0px' }">
      <div ref="flowHead" class="flow-head">
        <!--<a-row style="height: 56px; width: 100%; padding-left: 10px" align="middle">
          <a-col ref="flowHeadBox" :span="6">
            <div class="flow-title-left">
              <AvicIcon svg="avic-flow-title" />
              <span :title="title">{{ title }}</span>
              <em v-if="flowRole != null && flowRole != ''" v-text="flowRole" />
            </div>
          </a-col>
          <a-col class="flow-button-left">
          <a-col class="flow-title-right">-->
        <div>
          <!-- 流程按钮 -->
          <avic-bpm-buttons
            :flow-custom-vars="flowCustomVars"
            :bpmInstanceObject="bpmInstanceObject"
            :beforeBpmButtons="beforeBpmButtons"
            @saveAndStartProcess="saveAndStartProcess($event)"
            @saveForm="saveForm($event)"
            @afterBpmButtons="afterBpmButtons"
            @beforeOpenSelect="beforeOpenSelect"
            @flowCustomFunction="flowCustomFunction($event)"
            @selectSubFlow="selectSubFlow"
            @selectParentFlow="selectParentFlow"
          />
        </div>
      </div>
    </div>
    <avic-bpm-tabs
      v-show="showBpmTabs"
      :ref="tabsRefName"
      :tabs-top="isScrollDown && !fixedTop ? '0px' : '40px'"
      :bpmInstanceObject="bpmInstanceObject"
      @scrollViewByTab="scrollViewByTab"
    />
  </div>
</template>
<script>
import { Row, Col } from 'ant-design-vue';
import AvicBpmTabs from '../bpm-tabs';
import AvicBpmButtons from './AvicBpmButtons.vue';
export default {
  name: 'FlowHead',
  components: {
    ARow: Row,
    ACol: Col,
    AvicBpmTabs,
    AvicBpmButtons
  },
  props: {
    // 非路由获取传参时使用
    params: {
      type: Object,
      required: false,
      default: null
    },
    flowCustomVars: {
      type: Object,
      default: () => {}
    },
    isScrollDown: {
      type: Boolean,
      default: false
    },
    bpmInstanceObject: {
      type: Object
    },
    showBpmTabs: {
      type: Boolean,
      default: true
    },
    beforeBpmButtons: {
      type: Function
    }
  },
  data() {
    return {
      title: '',
      showTop: true,
      fixedTop: true,
      maxButtonBoxWidth: 0,
      tabsRefName: 'tabsRefName',
      flowRole: '' // 节点名称
    };
  },
  created() {
    if (this.params) {
      this.title = this.params.title ? this.params.title : '';
    } else {
      this.title = this.$route.query.title ? this.$route.query.title : '';
    }
  },
  //注册接受组件传参事件
  // computed: {
  //   ...mapGetters(['getUserIdentityKey', 'getActivitylabel', 'getTabs'])
  // },
  //接收组件传参
  watch: {
    'bpmInstanceObject.bpmModel.userIdentityKey': {
      immediate: true,
      handler(userIdentityKey) {
        // 分支1 显示当前用户的流程角色，显示已办节点
        // if (getUserIdentityKey != '' && this.$store.state.bpmModel.activitylabel !== null) {
        //   this.flowRole = `${this.$store.state.bpmModel.activitylabel}`;
        // }

        // 分支2 显示当前用户的当前待办节点或者拟稿，无待办不显示
        if (
          (userIdentityKey == '1' || userIdentityKey == '6') &&
          this.bpmInstanceObject.bpmModel.activitylabel !== null
        ) {
          this.flowRole = `${this.bpmInstanceObject.bpmModel.activitylabel}`;
        }
      }
    },
    'bpmInstanceObject.bpmModel.activitylabel': {
      immediate: true,
      handler(activitylabel) {
        // 分支1 显示当前用户的流程角色，显示已办节点
        // if (this.$store.state.bpmModel.getUserIdentityKey != '' && activitylabel !== null) {
        //   this.flowRole = `${activitylabel}`;
        // }

        // 分支2 显示当前用户的当前待办节点或者拟稿，无待办不显示
        if (
          (this.bpmInstanceObject.bpmModel.userIdentityKey == '1' ||
            this.bpmInstanceObject.bpmModel.userIdentityKey == '6') &&
          activitylabel !== null
        ) {
          this.flowRole = `${activitylabel}`;
        }
      }
    }
  },
  mounted() {
    this.bpmInstanceObject.bpmTabs.getBpmNavbarType(this.bpmInstanceObject);
  },
  methods: {
    //注册事件
    bpmHeadFixed() {
      this.fixedTop = !this.fixedTop;
      this.$emit('handleFixedTop', this.fixedTop);
    },
    // 表单启动流程
    saveAndStartProcess(params) {
      this.$emit('saveAndStartProcess', params);
    },
    // 表单暂存
    saveForm(params) {
      this.$emit('saveForm', params);
    },
    //按钮点击后置事件
    afterBpmButtons(data) {
      this.$emit('afterBpmButtons', data);
    },
    // 自定义按钮事件
    flowCustomFunction(params) {
      this.$emit('flowCustomFunction', params);
    },
    beforeOpenSelect(data) {
      this.$emit('beforeOpenSelect', data);
    },
    scrollViewByTab(tab) {
      this.$emit('scrollViewByTab', tab);
    },
    selectSubFlow(callback) {
      // 选择子流程
      this.$emit('selectSubFlow', callback);
    },
    selectParentFlow() {
      // 选择父流程
      this.$emit('selectParentFlow');
    }
  }
};
</script>
<style lang="less">
@import './style/base.less';
</style>
