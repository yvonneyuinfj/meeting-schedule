<!--
  流程中间部分
-->
<template>
  <div v-show="tabsVisible" class="flow-avic-top" :style="style" id="moveDiv">
    <!--<div class="left anchor" style="border-bottom: 1px solid #dddddd" v-show="showDragFlag">
      <a href="#" @mousedown="move">
        <a-icon type="drag" title="点我可随意拖动哦!" />
      </a>
    </div>
    <div class="left" style="height:52px;width:52px" v-show="!showDragFlag">
    </div>-->
    <div class="left anchor">
      <a-popover
        placement="bottomLeft"
        overlay-class-name="left-popover"
        :visible="showTable"
        :get-popup-container="triggerNode => triggerNode.parentNode"
        @visibleChange="changeTable"
      >
        <a>
          <!-- <a-icon type="setting" /> -->
          <avic-icon svg="avic-settings-line" />
        </a>
        <template #content>
          <div class="flow-chart-table">
            <div class="top-box">
              模块显示管理
              <span>拖动名称可排序</span>
            </div>
            <table class="tab-box">
              <thead>
                <tr>
                  <th>显示</th>
                  <th>名称</th>
                  <th>顺序</th>
                </tr>
              </thead>
              <tbody>
                <draggable
                  v-model="data"
                  v-bind="dragOptions"
                  handle=".li-drag"
                  style="display: contents"
                  @end="dragEnd"
                >
                  <template #item="{ element: tim }">
                    <tr class="flow-table-row">
                      <td>
                        <a-checkbox
                          :id="tim.id"
                          :checked="tim.display === '1'"
                          :disabled="tim.code === 'bpm_form_tab'"
                          @click="updateTableShow"
                        />
                      </td>
                      <td class="li-drag">{{ tim.name }}</td>
                      <td>{{ tim.order }}</td>
                    </tr>
                  </template>
                </draggable>
              </tbody>
            </table>
          </div>
        </template>
      </a-popover>
    </div>
    <div class="divider-left" />
    <div class="main">
      <ul class="table anchor">
        <li
          v-for="(item, $index) in data"
          v-show="item?.display == '1'"
          :key="$index"
          :class="{ activeTab: selectTab === $index }"
          @click="selectTable(item, $index)"
        >
          <a>{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="right">角色：{{ this.bpmInstanceObject.bpmModel.userIdentity }}</div>
    <div class="divider-right"></div>
  </div>
</template>
<script>
import { Popover, Checkbox } from 'ant-design-vue';
// import Vue from 'vue';
// import VueDND from 'awe-dnd';
// Vue.use(VueDND);
import bpmUtils from '../../../bpmutils/FlowUtils';
import draggable from 'vuedraggable';
import request from '@/utils/request';
export default {
  name: 'BpmTabs',
  components: {
    APopover: Popover,
    ACheckbox: Checkbox,
    draggable
  },
  props: {
    // prop接收传过来的参数
    tabsTop: {
      type: String,
      required: true
    },
    bpmInstanceObject: {
      type: Object
    }
  },
  data() {
    return {
      clientWidth: null,
      clientHeight: null,
      elementX: null,
      elementY: null,
      showDragFlag: false,
      style: null,
      data: [],
      tabsVisible: true,
      selectTab: '0',
      showTable: false,
      flowRole: '',
      // 树搜索组件需要的加载数据格式
      updateBpmTabsExtsParam: {
        url: bpmUtils.baseurl + '/business/updateBpmTabsExts/v1',
        method: 'post'
      },
      dragOptions: {
        // 拖拽配置参数
        itemKey: 'id',
        animation: 500,
        group: 'tabs',
        disabled: false,
        ghostClass: 'ghost',
        forceFallback: true,
        fallbackClass: 'sortable-fallback'
      }
    };
  },
  //接收组件传参
  watch: {
    'bpmInstanceObject.bpmModel.userIdentity': {
      immediate: true,
      handler(userIdentity) {
        if (userIdentity != '') {
          this.flowRole = `${this.bpmInstanceObject.bpmModel.activitylabel}  当前身份：${userIdentity}`;
        } else {
          this.flowRole = `${this.bpmInstanceObject.bpmModel.activitylabel}`;
        }
      }
    },
    'bpmInstanceObject.bpmModel.activitylabel': {
      immediate: true,
      handler(activitylabel) {
        if (this.bpmInstanceObject.bpmModel.userIdentity != '') {
          this.flowRole = `${activitylabel}  当前身份：${this.bpmInstanceObject.bpmModel.userIdentity}`;
        } else {
          this.flowRole = `${activitylabel}`;
        }
      }
    },
    'bpmInstanceObject.bpmTabs.showTabs': {
      handler(tabs) {
        if (tabs) {
          // 流程意见默认不显示
          tabs.forEach(item => {
            if (item.code === 'bpm_idea_tab') {
              item.display = '0';
            }
          });
        }
        this.data = tabs;
      }
    }
  },
  created() {
    this.bpmInstanceObject.bpmTabs.getBpmTabs(this.bpmInstanceObject);
  },
  mounted() {
    if (
      this.bpmInstanceObject.bpmModel &&
      this.bpmInstanceObject.bpmModel.userIdentity &&
      this.bpmInstanceObject.bpmModel.activitylabel
    ) {
      this.flowRole = `${this.bpmInstanceObject.bpmModel.activitylabel} 当前身份：${this.bpmInstanceObject.bpmModel.userIdentity}`;
    }
    // this.$dragging.$on('dragged', ({ value }) => {
    //   value.list.map((tim, index) => {
    //     tim.order = index + 1;
    //   });
    // });
    this.selectTab = 0; // 初始选中第一个tab
  },
  methods: {
    selectTable(e, index) {
      let that = this;
      that.selectTab = index;
      setTimeout(function () {
        that.$emit('scrollViewByTab', e);
      });
    },
    showDrag() {
      this.showDragFlag = true;
    },
    hideDrag() {
      this.showDragFlag = false;
    },

    move(e) {
      e.preventDefault();
      //let odiv = e.target;// 获取目标元素
      let odiv = document.getElementById('moveDiv'); //计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
      let x = e.clientX - odiv.offsetLeft;
      let y = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        this.showDragFlag = true;
        // 获取拖拽元素的位置
        let left = e.clientX - x;
        let top = e.clientY - y;
        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;
        // 把拖拽元素 放到 当前的位置
        let positionX =
          left <= 0
            ? 0
            : left >= this.clientWidth - odiv.offsetWidth
            ? this.clientWidth - odiv.offsetWidth
            : e.clientX - x;
        let positionY =
          top <= 0
            ? 0
            : top >= this.clientHeight - odiv.offsetHeight
            ? this.clientHeight - odiv.offsetHeight
            : e.clientY - y;
        // if (left <= 0) {
        //   left = 0;
        // } else if (left >= document.documentElement.clientWidth - odiv.offsetWidth) {
        //   //document.documentElement.clientWidth 屏幕的可视宽度
        //   left = document.documentElement.clientWidth - odiv.offsetWidth;
        // }
        // if (top <= 0) {
        //   top = 0;
        // } else if (top >= document.documentElement.clientHeight - odiv.offsetHeight) {
        //   // document.documentElement.clientHeight 屏幕的可视高度
        //   top = document.documentElement.clientHeight - odiv.offsetHeight;
        // }
        //this.style = `left:${left}px;top:${top}px;width:52px;z-index: 9999 !important`;
        this.style = `left:${positionX}px;top:${positionY}px;width:52px;z-index: 9999 !important`;
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    //滚动屏幕
    handleTabsScroll(e) {
      if (e.id) {
        let x = document.querySelectorAll('div#' + e.id);
        let scrollTopValue = x[0].offsetTop;
        window.scrollTo(0, scrollTopValue - 90);
      }
    },
    getTabsVisible(tabsVisible) {
      this.tabsVisible = tabsVisible;
    },
    //修改个性设备
    updateBpmTabsExts() {
      this.data.forEach((itme, index) => {
        itme.order = index + 1;
      });
      let parameter = { listStr: JSON.stringify(this.data) };
      // this.$sdk
      //   .http(this.updateBpmTabsExtsParam.url, parameter, this.updateBpmTabsExtsParam.method) // 提交
      request({
        url: this.updateBpmTabsExtsParam.url,
        data: parameter,
        method: this.updateBpmTabsExtsParam.method
      })
        .then(res => {
          if (res.success) {
            this.$message.success('修改设置成功');
            this.bpmInstanceObject.bpmTabs.setBpmOriginalTabs(this.bpmInstanceObject, this.data);
          } else {
            this.$message.error('修改设置失败!');
          }
        })
        .catch(() => {
          this.$message.error('修改设置失败!');
        });
    },
    updateBpmMessage() {
      let _this = this;
      this.$confirm({
        title: '修改设置',
        okText: '确定',
        cancelText: '取消',
        content: '您确定要保存当前的设置吗？',
        onOk() {
          _this.updateBpmTabsExts();
        },
        onCancel() {
          _this.bpmInstanceObject.bpmTabs.getBpmTabs(_this.bpmInstanceObject);
        }
      });
    },
    changeTable() {
      if (this.showTable === true) {
        let isUpdate = false;
        if (
          this.bpmInstanceObject.bpmTabs.originalTabs &&
          this.bpmInstanceObject.bpmTabs.originalTabs.length > 0
        ) {
          let originalTabs = [];
          let datas = [];
          this.bpmInstanceObject.bpmTabs.originalTabs.map(tim => {
            if (tim.id !== 'bpm_idea_tab') {
              originalTabs.push(tim);
            }
          });
          this.data.map(tim => {
            if (tim.id !== 'bpm_idea_tab') {
              datas.push(tim);
            }
          });
          originalTabs.map((tim, index) => {
            if (!isUpdate && (datas[index].id !== tim.id || tim.display !== datas[index].display)) {
              isUpdate = true;
            }
          });
        }
        if (isUpdate === true) {
          this.updateBpmMessage();
        }
      }
      this.showTable = !this.showTable;
    },
    updateTableShow(e) {
      if (e.target.id) {
        this.data.map(tim => {
          if (tim.id == e.target.id) {
            if (tim.display == '1') {
              tim.display = '0';
            } else {
              tim.display = '1';
            }
          }
        });
      }
    },
    dragEnd() {
      this.bpmInstanceObject.bpmTabs.showTabs = this.data;
    }
  }
};
</script>
<style lang="less">
@import './style/base.less';
</style>
