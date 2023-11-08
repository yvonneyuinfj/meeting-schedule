<template>
  <a-config-provider :locale="locale">
    <div ref="buttonBox" class="button-box">
      <!-- 暂不支持按钮（后来新加的）：加签并提交 拿回部分待办 抄送 -->
      <!-- <ul > -->
      <!-- <li> -->
      <!-- 流程操作按钮 -->
      <!-- 退回按钮集合 -->
      <a-space>
        <span v-for="(item1, index1) in topFlowButtons" :key="index1" class="button">
          <a-dropdown
            v-if="item1.retreatButtons && item1.retreatButtons.length > 0"
            :trigger="['hover']"
            class="flow-dropdown-button"
          >
            <template #overlay>
              <a-menu class="button_box_menu">
                <a-menu-item
                  v-for="(subitem, index2) in item1.retreatButtons"
                  :key="index2"
                  class="more-button"
                  @click="handleFlow(subitem, index2)"
                >
                  <a-button
                    class="more-flow-button"
                    :title="subitem.alias ? subitem.alias : subitem.lable"
                    :loading="
                      subitem.id === triggerButtonId && isLoading && index2 === triggerButtonIndex
                    "
                  >
                    <avic-icon
                      v-if="
                        !(
                          subitem.id === triggerButtonId &&
                          isLoading &&
                          index2 === triggerButtonIndex
                        )
                      "
                      :svg="subitem.event ? bpmButtonIcon[subitem.event] : ''"
                    />
                    {{ subitem.alias ? subitem.alias : subitem.lable }}
                  </a-button>
                </a-menu-item>
              </a-menu>
            </template>
            <a-button type="primary" ghost>
              退回
              <DownOutlined />
            </a-button>
          </a-dropdown>
          <!-- 平铺按钮 -->
          <a-button
            v-show="
              !disabledBtns.includes(item1.event) &&
              !item1.retreatButtons &&
              index1 < maxButton &&
              (item1.jScript ? evalFunc(item1.jScript) : true)
            "
            class="flow-button"
            type="primary"
            :ghost="
              item1.event &&
              (item1.event == 'submit' ||
                item1.event == 'dosubmit' ||
                item1.event == 'dostart' ||
                item1.event == 'dotransmitsubmit')
                ? false
                : true
            "
            :title="item1.alias ? item1.alias : item1.lable"
            :loading="item1.id === triggerButtonId && isLoading && index1 === triggerButtonIndex"
            :disabled="disabledBtns.includes(item1.event)"
            :class="{ 'disabled-flow-button': disabledBtns.includes(item1.event) }"
            @click="handleFlow(item1, index1)"
          >
            <template #icon>
              <avic-icon
                v-if="
                  !(item1.id === triggerButtonId && isLoading && index1 === triggerButtonIndex) &&
                  item1.event &&
                  bpmButtonIcon[item1.event]
                "
                :svg="item1.event ? bpmButtonIcon[item1.event] : ''"
              />
            </template>
            {{ item1.alias ? item1.alias : item1.lable }}
          </a-button>
          <!-- 超出最多按钮个数,显示更多 -->
          <a-dropdown
            v-if="!item1.retreatButtons && index1 === maxButton"
            :trigger="['hover']"
            class="flow-dropdown-button"
          >
            <a-button type="primary" ghost>
              更多
              <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu class="button_box_menu">
                <span
                  v-for="(tirditem, index3) in topFlowButtons"
                  :key="index3"
                  v-show="index3 >= maxButton"
                >
                  <a-menu-item class="more-button" @click="handleFlow(tirditem, index3)">
                    <a-button
                      class="more-flow-button"
                      v-show="tirditem.jScript ? evalFunc(tirditem.jScript) : true"
                      :title="tirditem.alias ? tirditem.alias : tirditem.lable"
                      :loading="
                        tirditem.id === triggerButtonId &&
                        isLoading &&
                        index3 === triggerButtonIndex
                      "
                    >
                      <avic-icon
                        v-if="
                          !(
                            tirditem.id === triggerButtonId &&
                            isLoading &&
                            index3 === triggerButtonIndex
                          ) &&
                          tirditem.event &&
                          bpmButtonIcon[tirditem.event]
                        "
                        :svg="tirditem.event ? bpmButtonIcon[tirditem.event] : ''"
                        style="margin-right: 4px; vertical-align: -0.2em; font-size: 1.2em"
                      />
                      {{ tirditem.alias ? tirditem.alias : tirditem.lable }}
                    </a-button>
                  </a-menu-item>
                </span>
              </a-menu>
            </template>
          </a-dropdown>
        </span>
      </a-space>
      <!-- </li> -->
      <!-- </ul> -->
      <avic-bpm-common-select
        @afterBpmButtons="afterBpmButtons"
        :bpmInstanceObject="bpmInstanceObject"
        :defaultOpinion="defaultOpinion"
      />
      <globalidea
        v-if="hasGlobalidea"
        @closeGlobalidea="hasGlobalidea = false"
        :bpmInstanceObject="bpmInstanceObject"
      />
      <start-sub-flow v-if="hasStartsubflow" :bpmInstanceObject="bpmInstanceObject" />
      <bpm-node-select :bpmInstanceObject="bpmInstanceObject" />
      <relative-process-list
        v-if="showRelativeProcessModal"
        :procinst-dbid="procinstDbid"
        :bpmInstanceObject="bpmInstanceObject"
        @close="showRelativeProcessModal = false"
      />
      <ButTrack
        v-if="showButTrack"
        :bpmInstanceObject="bpmInstanceObject"
        @close="showButTrack = false"
      />
      <parent-process-modal
        v-if="showParentProcessModal"
        :is-parent-process-exist="isParentProcessExist"
        :procinst-dbid="procinstDbid"
        :bpmInstanceObject="bpmInstanceObject"
        @saveSuccess="saveParentProcessSuccess"
        @updateParentFlow="updateParentFlow"
        @close="showParentProcessModal = false"
      />
      <a-modal :visible="helpInfoVisible" :closable="false" :body-style="{ padding: '0' }">
        <h4 style="border-bottom: 1px solid #e5e6eb; padding: 12px 16px; margin: 0">帮助信息</h4>
        <div style="padding: 16px">
          <a-empty v-if="helpInfo == '当前节点无描述'" style="margin: 32px 0">
            <template #description>
              <span>当前节点无描述</span>
            </template>
          </a-empty>
          <div v-else v-html="helpInfo" />
        </div>
        <template v-slot:footer>
          <a-button @click="closeHelpInfo">知道了</a-button>
        </template>
      </a-modal>
      <div class="flowshade" />
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import AvicBpmCommonSelect from '../bpm-common-select/index.vue';
import BpmNodeSelect from '../bpm-buttons-modal/BpmNodeSelect.vue';
import { httpAction } from '@/api/avic/bpm/FlowUtilApi';
import bpmUtils from '../../../bpmutils/FlowUtils';
import globalidea from '../bpm-buttons-modal/Globalidea.vue';
import ButTrack from '../bpm-buttons-modal/ButTrack.vue';
import ParentProcessModal from '../bpm-buttons-modal/ParentProcessModal/index.vue';
import RelativeProcessList from '../bpm-buttons-modal/RelativeProcessList/index.vue';
import StartSubFlow from '../bpm-buttons-modal/StartSubFlow.vue';

export default {
  name: 'AvicBpmButtons',
  components: {
    AvicBpmCommonSelect,
    BpmNodeSelect,
    globalidea,
    ButTrack,
    ParentProcessModal,
    RelativeProcessList,
    StartSubFlow
    // Globalidea: () => ({
    //   // 需要加载的组件 (应该是一个 `Promise` 对象)
    //   component: import('../bpm-buttons-modal/Globalidea.vue'),
    //   // 异步组件加载时使用的组件
    //   // loading: loadingComp,
    //   // 加载失败时使用的组件
    //   // error: '',
    //   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    //   delay: 200,
    //   // 如果提供了超时时间且组件加载也超时了，
    //   // 则使用加载失败时使用的组件。默认值是：`Infinity`
    //   timeout: 3000
    // }),
    // Startsubflow: () => ({
    //   // 需要加载的组件 (应该是一个 `Promise` 对象)
    //   component: ()=>import('../bpm-buttons-modal/Startsubflow.vue'),
    //   // 异步组件加载时使用的组件
    //   // loading: loadingComp,
    //   // 加载失败时使用的组件
    //   // error: '',
    //   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    //   delay: 200,
    //   // 如果提供了超时时间且组件加载也超时了，
    //   // 则使用加载失败时使用的组件。默认值是：`Infinity`
    //   timeout: 3000
    // })
    // RelativeProcessList: () => ({
    //   // 需要加载的组件 (应该是一个 `Promise` 对象)
    //   component: import('../bpm-buttons-modal/RelativeProcessList/index.vue'),
    //   // 异步组件加载时使用的组件
    //   // loading: loadingComp,
    //   // 加载失败时使用的组件
    //   // error: '',
    //   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    //   delay: 200,
    //   // 如果提供了超时时间且组件加载也超时了，
    //   // 则使用加载失败时使用的组件。默认值是：`Infinity`
    //   timeout: 3000
    // })
    // ParentProcessModal: () => ({
    //   // 需要加载的组件 (应该是一个 `Promise` 对象)
    //   component: import('../bpm-buttons-modal/ParentProcessModal/index.vue'),
    //   // 异步组件加载时使用的组件
    //   // loading: loadingComp,
    //   // 加载失败时使用的组件
    //   // error: '',
    //   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    //   delay: 200,
    //   // 如果提供了超时时间且组件加载也超时了，
    //   // 则使用加载失败时使用的组件。默认值是：`Infinity`
    //   timeout: 3000
    // })
  },
  props: {
    maxButtonBoxWidth: {
      type: Number
    },
    flowCustomVars: {
      type: Object,
      default: () => {}
    },
    bpmInstanceObject: {
      type: Object
    },
    beforeBpmButtons: {
      type: Function
    }
  },
  data() {
    return {
      bpmButtonIcon: {
        doformsave: 'avic-save-3-line', // 暂存
        dostart: 'avic-share-forward-fill', // 提交
        dosubmit: 'avic-share-forward-fill', // 提交
        dosubmit_mesh: 'avic-share-forward-fill', // 提交
        dotransmitsubmit: 'avic-mail-check-line', // 已阅
        doretreat_mesh: 'avic-reply-fill', // 退回
        doretreattoprev: 'avic-reply-fill', // 退回上一步
        doretreattowant: 'avic-reply-fill', // 任意退回
        doretreattodraft: 'avic-user-received-2-line', // 退回拟稿人
        doretreattoactivity: 'avic-reply-all-fill', // 退回到taskName节点
        dosupersede: 'avic-git-pull-request-fill', // 流程转办
        dotransmit: 'avic-mail-send-line', // 发送阅知
        doadduser: 'avic-shield-cross-line', // 加签
        doadduserandsubmit: 'avic-shield-check-line', // 加签并提交
        dowithdrawassignee: 'avic-delete-back-line', // 减签
        dostartsubprocess: 'avic-git-merge-fill', // 发起子流程
        dowithdraw: 'avic-arrow-go-back-fill', // 拿回
        dowithdrawpart: 'avic-arrow-go-back-fill', // 拿回部分待办
        dosupplement: 'avic-file-transfer-line', // 补发
        dotaskreader: 'avic-account-box-line', // 增加读者
        dopresstodo: 'avic-send-plane-fill', // 发送催办
        doglobalend: 'avic-stop-circle-line', // 流程结束
        doglobaljump: 'avic-arrow-go-forward-fill', // 流程跳转
        doglobalresume: 'avic-refresh-line', // 流程恢复
        doglobalsuspend: 'avic-pause-circle-line', // 流程暂停
        doglobalidea: 'avic-draft-line', // 意见修改
        dostepuserdefined: 'avic-user-settings-line', // 自定义选人
        dorelationprocess: 'avic-organization-chart', // 相关流程
        dorelationparentprocess: 'avic-links-fill', // 关联父流程
        dofocus: 'avic-star-line', // 关注
        bpm_but_track: 'avic-focus-3-line', // 流程跟踪
        bpm_but_relation: 'avic-mind-map', // 关联流程
        bpm_but_help: 'avic-question-line' // 帮助
      },
      locale: zhCN,
      hasGlobalidea: false,
      hasStartsubflow: false,
      procinstDbid: '',
      showRelativeProcessModal: false, // 展示相关流程模态框
      showParentProcessModal: false, // 展示关联父流程模态框
      isParentProcessExist: false,
      maxButton: 6, // 最多显示多少个按钮
      triggerButtonId: '',
      triggerButtonIndex: '',
      recordButton: {},
      showButTrack: false,
      helpInfoVisible: false,
      disabledBtns: [], // 支持加签并提交 拿回部分待办
      isShowFlowNameForm: false,
      form: {}, // this.$form.createForm(this, { name: 'instance_name_form' }),
      defaultOpinion: ''
    };
  },
  watch: {
    //监听按钮后置事件
    'bpmInstanceObject.bpmModel.afterButtonsEvent': {
      handler(buttinsEvent) {
        this.$emit('afterBpmButtons', this.recordButton);
      }
    },
    'bpmInstanceObject.bpmCommonSelect.beforeOpenSelect': {
      handler(e) {
        //按钮点击前置事件
        this.$emit('beforeOpenSelect', this.bpmInstanceObject.bpmCommonSelect.defaultSelectUsers);
      }
    },
    'bpmInstanceObject.bpmStartsubflow.isShowFlowNameForm': {
      handler(isShowFlowNameForm) {
        this.isShowFlowNameForm = isShowFlowNameForm;
        if (isShowFlowNameForm) {
          this.form.resetFields();
        }
      }
    }
    // topFlowButtons(btnList) {
    //   let hasGlobalidea = false,
    //     hasStartsubflow = false;
    //   btnList.map(item => {
    //     if (item.event === 'doglobalidea') {
    //       hasGlobalidea = true;
    //     }
    //     if (item.event === 'dostartsubprocess') {
    //       hasStartsubflow = true;
    //     }
    //   });
    //   this.hasGlobalidea = hasGlobalidea;
    //   this.hasStartsubflow = hasStartsubflow;
    // }
  },
  methods: {
    handleOk() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.bpmInstanceObject.bpmStartsubflow.isShowFlowNameForm = false;
          this.bpmInstanceObject.bpmStartsubflow.data.processInstanceName =
            values.processInstanceName;
          this.bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(this.bpmInstanceObject, {
            buttonData: this.bpmInstanceObject.bpmStartsubflow.data,
            submitFuncName: 'BpmStartsubflowSubmit'
          });
        }
      });
    },
    handleCancel() {
      this.bpmInstanceObject.bpmStartsubflow.isShowFlowNameForm = false;
    },
    /**
     * 计算按钮显示个数
     */
    // setMaxButt() {
    //   let lis = this.$refs.buttonBox.querySelectorAll('li');
    //   let width = 0;
    //   let maxIndex = 0;
    //   for (let i = 0; i < lis.length; i++) {
    //     width = width + lis[i].offsetWidth;
    //     if (width > this.maxButtonBoxWidth) {
    //       maxIndex = i - 2;
    //       break;
    //     }
    //   }
    //   if (maxIndex > 1) {
    //     this.maxButton = maxIndex - 1;
    //   }
    // },
    evalFunc(evalString) {
      let index = evalString.indexOf('==');
      let k = evalString.substring(0, index).trim();
      let v = evalString.substring(index + 2).trim();
      let flag = false;
      let isCheck = false;
      this.computedFlowCustomVars.map(item => {
        if (item.key == k && !isCheck) {
          if (item.value == v) {
            flag = true;
          } else {
            flag = false;
          }
          isCheck = true;
        }
      });
      return flag;
    },
    /**
     * 关闭按钮Loading
     */
    closeButtonLoading() {
      let that = this;
      setTimeout(() => {
        that.bpmInstanceObject.bpmEditor.setIsButtonLoading(that.bpmInstanceObject, false);
      }, 2000);
    },
    /**
     * 关闭按钮Loading 不带延时
     */
    closeButtonLoadingNoDelay() {
      let that = this;
      that.bpmInstanceObject.bpmEditor.setIsButtonLoading(that.bpmInstanceObject, false);
    },
    /**
     * 流程按钮点击事件
     */
    handleFlow(item, index) {
      this.recordButton = item;
      // 规避连续点按钮
      this.triggerButtonId = item.id;
      this.bpmInstanceObject.bpmEditor.setIsButtonLoading(this.bpmInstanceObject, true);
      this.triggerButtonIndex = index;
      let _this = this;
      this.procinstDbid = item.procinstDbid;
      //按钮点击前置事件 使用promise函数，以可阻断后续程序 by cuijj 2021-12-24
      if (this.beforeBpmButtons) {
        this.beforeBpmButtons({ data: item })
          .then(res => {
            if (res) {
              this.btnClick(item, _this);
            } else {
              this.closeButtonLoadingNoDelay();
            }
          })
          .catch(err => {
            console.log(err);
            this.closeButtonLoadingNoDelay();
          });
      } else {
        this.btnClick(item, _this);
      }
    },
    btnClick(item, _this) {
      if (item.event === 'doformsave') {
        // 暂存
        this.bpmInstanceObject.bpmEditor.setLoadingSaveState(this.bpmInstanceObject, true);
        this.bpmInstanceObject.bpmSave.BpmSaveExecute(this.bpmInstanceObject, {
          data: item,
          start: params => {
            _this.$emit('saveAndStartProcess', params);
          },
          save: params => {
            _this.$emit('saveForm', params);
          }
        });
      } else if (item.event === 'dosubmit' || item.event === 'dostart') {
        // 提交
        this.bpmInstanceObject.bpmSubmit.BpmSubmitInitFunc(this.bpmInstanceObject, { data: item });
        this.bpmInstanceObject.bpmSubmit.BpmSubmitExecute(this.bpmInstanceObject, {
          data: item,
          start: params => {
            // 提交流程时，静默保存表单
            params.isKeepSilent = true;
            _this.$emit('saveAndStartProcess', params);
          },
          save: params => {
            // 提交流程时，静默保存表单
            params.isKeepSilent = true;
            _this.$emit('saveForm', params);
          }
        });
      } else if (item.event === 'dotransmitsubmit') {
        // 已阅
        this.bpmInstanceObject.bpmTransmitSubmit.BpmTransmitSubmitExecute(this.bpmInstanceObject);
        this.defaultOpinion = '已阅';
        this.closeButtonLoading();
      } else if (item.event === 'bpm_but_track') {
        // 流程跟踪
        this.showButTrack = true;
        this.bpmInstanceObject.bpmButTrack.BpmButTrackExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'bpm_but_help') {
        // 帮助
        this.helpInfoVisible = true;
        this.bpmInstanceObject.bpmButHelp.BpmButHelpExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (
        item.event === 'doretreattodraft' ||
        item.event === 'doretreattoprev' ||
        item.event === 'doretreattowant' ||
        item.event === 'doretreattoactivity'
      ) {
        // 由于跨节点退回用同一个vuex,为了解决数据不能区分问题,每次点击按钮都初始化一下按钮数据.
        this.bpmInstanceObject.bpmRetreat.BpmRetreatInitFunc(this.bpmInstanceObject, {
          data: item
        });
        if (item.event === 'doretreattodraft') {
          // 退回拟稿人
          this.bpmInstanceObject.bpmRetreat.executeTodraft(this.bpmInstanceObject, {
            data: item,
            start: params => {
              _this.$emit('saveAndStartProcess', params);
            },
            save: params => {
              _this.$emit('saveForm', params);
            }
          });
        } else if (item.event === 'doretreattoprev') {
          // 退回上一步
          this.bpmInstanceObject.bpmRetreat.executeToprev(this.bpmInstanceObject, {
            data: item,
            start: params => {
              _this.$emit('saveAndStartProcess', params);
            },
            save: params => {
              _this.$emit('saveForm', params);
            }
          });
        } else if (item.event === 'doretreattowant') {
          // 任意退回
          this.bpmInstanceObject.bpmRetreat.executeTowant(this.bpmInstanceObject, {
            data: item,
            start: params => {
              _this.$emit('saveAndStartProcess', params);
            },
            save: params => {
              _this.$emit('saveForm', params);
            }
          });
        } else if (item.event === 'doretreattoactivity') {
          // 跨节点退回
          this.bpmInstanceObject.bpmRetreat.executeToactivity(this.bpmInstanceObject, {
            data: item,
            start: params => {
              _this.$emit('saveAndStartProcess', params);
            },
            save: params => {
              _this.$emit('saveForm', params);
            }
          });
        }
        this.closeButtonLoading();
      } else if (item.event === 'dowithdraw') {
        // 拿回
        this.bpmInstanceObject.bpmWithdraw.BpmWithdrawExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dosupplement') {
        // 补发
        this.bpmInstanceObject.bpmSupplement.BpmSupplementExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dotransmit') {
        // 发送阅知即流程转发
        this.bpmInstanceObject.bpmTransmit.BpmTransmitExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'doadduser') {
        // 加签
        this.bpmInstanceObject.bpmAdduser.BpmAdduserExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dowithdrawassignee') {
        // 减签
        this.bpmInstanceObject.bpmWithdrawassignee.BpmWithdrawassigneeExecute(
          this.bpmInstanceObject
        );
        this.closeButtonLoading();
      } else if (item.event === 'dosupersede') {
        // 流程转办
        this.bpmInstanceObject.bpmSupersede.BpmSupersedeExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dopresstodo') {
        // 发送催办
        this.bpmInstanceObject.bpmPresstodo.BpmPresstodoExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dostepuserdefined') {
        // 自定义选人
        this.bpmInstanceObject.bpmStepuserdefined.BpmStepuserdefinedExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dotaskreader') {
        // 增加读者
        this.bpmInstanceObject.bpmTaskreader.BpmTaskreaderExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dostartsubprocess') {
        // 发起子流程
        this.hasStartsubflow = true;
        this.bpmInstanceObject.bpmStartsubflow.BpmStartsubflowExecute(this.bpmInstanceObject);
        // this.BpmStartsubflowExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'doglobalidea') {
        console.log(item, 'item');
        // 意见修改
        this.hasGlobalidea = true;
        this.bpmInstanceObject.bpmGlobalidea.BpmGlobalideaExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'doglobaljump') {
        // 流程跳转
        this.bpmInstanceObject.bpmGlobaljump.BpmGlobaljumpExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'doglobalsuspend') {
        // 流程暂停
        this.bpmInstanceObject.bpmGlobalsuspend.BpmGlobalsuspendExecute(this.bpmInstanceObject, {
          data: item
        });
        this.closeButtonLoading();
      } else if (item.event === 'doglobalresume') {
        // 流程恢复
        this.bpmInstanceObject.bpmGlobalresume.BpmGlobalresumeExecute(this.bpmInstanceObject, {
          data: item
        });
        this.closeButtonLoading();
      } else if (item.event === 'doglobalend') {
        // 流程结束
        this.bpmInstanceObject.bpmGlobalend.BpmGlobalendExecute(this.bpmInstanceObject);
        this.closeButtonLoading();
      } else if (item.event === 'dofocus') {
        // 关注工作
        // 【1622】关注结果以提示，按钮还在转问题修改
        this.bpmInstanceObject.bpmFocus.BpmFocusExecute(this.bpmInstanceObject, {
          callback: this.closeButtonLoadingNoDelay
        });
      } else if (item.event === 'dorelationprocess') {
        // 相关流程
        this.showRelativeProcessModal = true;
        this.closeButtonLoading();
      } else if (item.event == 'dorelationparentprocess') {
        // 关联父流程
        this.onParentProcess();
        this.closeButtonLoading();
      } else if (item.event.indexOf('_attribute') > 0) {
        // 自定义按钮
        this.$emit('flowCustomFunction', { jsfunction: item.jsfunction, data: item });
        this.closeButtonLoading();
      } else if (item.event == 'custom') {
        //表单自定义按钮
        this.closeButtonLoading();
      } else if (item.event == 'doadduserandsubmit') {
        // 加签并提交
        this.bpmInstanceObject.bpmAdduserAndSubmit.BpmAdduserAndSubmitExecute(
          this.bpmInstanceObject,
          {
            data: item
          }
        );
        this.closeButtonLoading();
      } else if (item.event == 'dowithdrawpart') {
        // 拿回部分待办
        this.bpmInstanceObject.bpmWithdrawPart.BpmWithdrawPartExecute(this.bpmInstanceObject, {
          data: item
        });
        this.closeButtonLoading();
      }
    },
    onParentProcess() {
      // 查询是否已关联父流程
      let httpConfig = {
        checkParentProcess: {
          url: bpmUtils.baseurl + '/business/related/findSubProcessById/v1',
          method: 'post'
        }
      };
      let param = {
        data: this.procinstDbid
      };
      httpAction(httpConfig.checkParentProcess.url, param, httpConfig.checkParentProcess.method)
        .then(res => {
          if (res.success) {
            if (res.data === 'exist') {
              this.$confirm({
                title: '当前流程已关联父流程，确定重新关联父流程吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                  this.isParentProcessExist = true;
                  this.showParentProcessModal = true;
                }
              });
            } else if (res.data === 'success') {
              this.showParentProcessModal = true;
              this.isParentProcessExist = false;
            } else if (res.data === 'existAndNoEdit') {
              this.$warning({
                title: '系统提示',
                content: '该流程为父流程自动发起，不允许手动关联父流程！'
              });
            }
          }
        })
        .catch(e => {});
    },
    // 发起子流程
    BpmStartsubflowExecute(bpmInstanceObject) {
      this.$sdk
        .http(
          bpmUtils.baseurl + '/business/getSubPdId/v1',
          {
            procinstDbid: bpmInstanceObject.bpmStartsubflow.data.procinstDbid,
            executionId: bpmInstanceObject.bpmStartsubflow.data.executionId
          },
          'post'
        )
        .then(res => {
          if (res.success) {
            if (res.data.length === 0) {
              //默认展示所有流程模板
              // bpmInstanceObject.bpmStartsubflow.showAllFlowModel(bpmInstanceObject);
              this.$emit('selectSubFlow', (id, name, version) => {
                bpmInstanceObject.bpmStartsubflow.executeUserInfo(
                  bpmInstanceObject,
                  id,
                  name,
                  version
                );
              });
            } else if (res.data.length === 1) {
              // 直接跳选人
              bpmInstanceObject.bpmStartsubflow.executeUserInfo(
                bpmInstanceObject,
                res.data[0].id,
                res.data[0].name
              );
            } else {
              // 展示配置的模板
              bpmInstanceObject.bpmStartsubflow.executeSelectId(bpmInstanceObject, res.data);
            }
          }
        });
    },
    saveParentProcessSuccess() {
      this.showParentProcessModal = false;
      this.$message.success('【关联父流程】操作成功');
    },
    updateParentFlow() {
      this.$emit('selectParentFlow');
    },
    //流程选人打开前置事件
    afterBpmButtons(e) {
      this.$emit('afterBpmButtons', e);
    },
    closeHelpInfo() {
      this.helpInfoVisible = false;
    }
  },
  computed: {
    /**
     * 获取流程按钮
     */
    topFlowButtons() {
      let topFlowButtons = this.bpmInstanceObject.bpmEditor.flowButtons;
      let topCustomButtons = this.bpmInstanceObject.bpmEditor.customButtons;
      return [...topFlowButtons, ...topCustomButtons];
    },
    computedFlowCustomVars() {
      let computedFlowCustomVars = [];
      for (let key in this.flowCustomVars) {
        computedFlowCustomVars.push({
          key,
          value: this.flowCustomVars[key]
        });
      }
      return computedFlowCustomVars;
    },
    isLoading() {
      let isLoading = this.bpmInstanceObject.bpmEditor.isButtonLoading;
      return isLoading;
    },
    helpInfo() {
      let helpInfo = this.bpmInstanceObject.bpmButHelp.helpinfo;
      return helpInfo;
    }
  }
};
</script>
