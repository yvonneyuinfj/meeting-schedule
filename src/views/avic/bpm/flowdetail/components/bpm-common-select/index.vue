<!--
 子流程
-->
<template>
  <a-modal
    :visible="selectVisible"
    :centered="true"
    :title="modalTitle"
    :mask-close-able="false"
    wrap-class-name="main_modal"
    :width="800"
    :body-style="bodyStyle"
    :destroy-on-close="true"
    :style="modalStyle"
    @afterClose="afterClose"
    @cancel="closeModal"
  >
    <div class="main-box" style="height: 100%">
      <a-spin class="main" :spinning="spinning">
        <div v-if="userBoxList.length > 0">
          <a-tabs
            :class="userBoxList.length == 1 ? ' user-tab head-tab-single' : 'head-tab'"
            default-active-key="0"
            v-model="selectFlowTab"
            @change="changeTabs"
          >
            <a-tab-pane v-for="(item, index) in userBoxList" :key="index">
              <template v-slot:tab>
                <span class="head-tab">
                  <span v-if="userBoxList.length == 1">
                    请{{ titleAction
                    }}{{ bpmInstanceObject.bpmCommonSelect.isShowOpinionNode === false ? '' : title
                    }}{{ actionObject }}
                  </span>
                  <span v-if="isMustUser(index) && !needSelectUser" class="required">*</span>
                  <a-tooltip v-if="userBoxList.length > 1">
                    <template v-slot:title>
                      {{ item.name }}
                    </template>
                    {{ item.name }}
                  </a-tooltip>
                </span>
              </template>
              <div class="choose">
                <div class="subcontent left" ref="subcontent">
                  <a-tabs
                    v-model:activeKey="selectTag"
                    type="card"
                    @change="changeHeadTag"
                    destroyInactiveTabPane
                  >
                    <a-tab-pane v-for="tab in item.tabs" :key="tab.nodeType" :tab="tab.name">
                      <div class="tree-box">
                        <select-tree
                          :button-data="buttonData"
                          :visible="visible"
                          :ref="treeRefName + index + tab.nodeType"
                          :select="{ selectTag: selectTag, selectFlowTab: selectFlowTab }"
                          :data="taskUserSelect"
                          :defaultSelectedUser="selectUser"
                          :bpm-instance-object="bpmInstanceObject"
                          @loading="onTreeLoading"
                          @changeSelectUser="onChange"
                        />
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </div>
                <div class="right" ref="pullRefresh">
                  <div ref="inputBox" class="input-box">
                    <select-user-box
                      :ref="selectUserBoxRefName + index"
                      :select-flow-tab="selectFlowTab"
                      :user-box-list="userBoxList"
                      @changeSelectUser="changeSelectUser"
                    />
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <!--<span
              class="main-tab-bar"
              style="width: 48px; height: 48px; display: inline-block"
              slot="tabBarExtraContent"
            />-->
          </a-tabs>
        </div>
        <bpm-opinion
          v-if="isShowFlowOpinion"
          :visible="visible"
          :button-data="buttonData"
          :height="flowOpinionHeight"
          :userSelectVisible="userBoxList.length > 0 ? true : false"
          :textarea-max="flowOpinionLength"
          :ref="flowOpinionRefName"
          :bpm-instance-object="bpmInstanceObject"
          v-bind="$attrs"
        />
        <select-work-hand-user
          ref="selectWorkHandUser"
          :process-key="processKey"
          :user-list="selectWorkHand"
          :bpmInstanceObject="bpmInstanceObject"
          @closeSelectWorkHandUserList="closeSelectWorkHandUserList"
          @getSelectWorkHandUserList="getSelectWorkHandUserList"
        />
      </a-spin>
    </div>
    <template v-slot:footer>
      <a-button
        v-for="(button, index) in buttonsList"
        :key="index"
        :type="button.key != 'cancel' ? 'primary' : 'default'"
        :loading="spinningButton && button.key == 'confirm'"
        @click="() => clickModal(button.key)"
      >
        {{ button.name }}
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import SelectTree from './SelectTree.vue';
import SelectUserBox from './SelectUserBox.vue';
import SelectWorkHandUser from '../bpm-buttons-modal/SelectWorkHandUser.vue';
import BpmOpinion from './BpmOpinion.vue';
import bpmUtils from '../../../bpmutils/FlowUtils';
import { isAutoSelectUser, setUserList } from './_util';
import request from '@/utils/request';

const tabs = {
  org: { id: 1, name: '部门', nodeType: 'orgDept', para: [] },
  user: { id: 2, name: '用户', nodeType: 'user', para: [] },
  group: { id: 3, name: '群组', nodeType: 'group', para: [] },
  role: { id: 4, name: '角色', nodeType: 'role', para: [] },
  position: { id: 5, name: '岗位', nodeType: 'position', para: [] },
  otg: { id: 5, name: '关系', nodeType: '', para: [] }
};
const buttons = {
  confirm: { name: '确定', key: 'confirm' },
  cancel: { name: '取消', key: 'cancel' },
  agree: { name: '同意并提交', key: 'agreeAndSubmit' },
  disagree: { name: '不同意并提交', key: 'disagreeAndSubmit' }
};
export default {
  name: 'AvicBpmCommonSelect',
  components: {
    BpmOpinion,
    SelectTree,
    SelectUserBox,
    SelectWorkHandUser
  },
  props: {
    buttonData: {
      required: false,
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    //是否显示编辑框
    isShowOpinion: {
      type: Boolean,
      required: false,
      default: true
    },
    //默认选中人员
    defaultSelectUsers: {
      required: false,
      type: Object,
      default: () => {}
    },
    //流程实例
    bpmInstanceObject: {
      type: Object
    }
  },
  data() {
    return {
      modalStyle: {
        opacity: 1
      },
      bodyStyle: { padding: '0px', overflowY: 'hidden' },
      modalTitle: null,
      selectVisible: false, //窗口是否显示
      refersTop: 78.5 + 'px', //尖头高度
      selectFlowTab: 0, //选择的切换页
      selectUser: [], //选择的用户
      selectTag: '', //树上方选中的按钮
      treeRefName: 'selectTree',
      isTreeLoading: false,
      selectUserBoxRefName: 'selectUserBox',
      flowOpinionRefName: 'flowOpinion',
      getActJsonInfoParam: {
        // 弹窗详情的请求接口
        url: bpmUtils.baseurl + '/business/getActJsonInfo2/v1',
        method: 'post'
      },
      //获取配置选人用户
      bpmStepPersonParam: {
        url: bpmUtils.baseurl + '/business/getBpmStepPerson/v1',
        method: 'post'
      },
      taskUserSelect: [],
      //按钮集合
      buttonsList: [],
      //选择框集合
      userBoxList: [],
      submitFuncName: '', // 提交按钮名称
      title: '', //标题名称
      titleAction: '选择', //标题动作
      actionObject: '处理人',
      spinning: false, //加载状态
      spinningButton: false, //按钮状态
      formId: '',
      selectWorkHand: [], //流程委托
      processKey: '', //流程委托
      needSelectUser: false, //判断是否选人
      compelManner: '', //选人表态
      isShowFlowOpinion: true, //是否显示意见
      flowOpinionHeight: 60, //意见框高度控制
      flowOpinionLength: 500 //流程意见长度
    };
  },
  /* //注册接受组件传参事件
  computed: {
    ...mapGetters(['getSelectVisible'])
  },*/
  //接收组件传参
  watch: {
    'bpmInstanceObject.bpmCommonSelect.selectVisible': {
      immediate: true,
      handler(selectVisible) {
        this.selectVisible = selectVisible;
        if (selectVisible) {
          this.selectFlowTab = 0;
          this.getActJsonInfo();
        } else {
          this.empty();
        }
      }
    },
    visible: {
      immediate: true,
      handler(newV) {
        this.selectVisible = newV;
        if (newV) {
          this.selectFlowTab = 0;
          this.getActJsonInfo();
        } else {
          this.empty();
        }
      }
    },
    isShowOpinion: {
      immediate: true,
      handler(newV) {
        this.isShowFlowOpinion = newV;
      }
    }
  },
  created() {
    this.init();
  },
  activated() {
    if (this.$refs.pullRefresh) {
      this.$refs.pullRefresh.scrollTop = this.scroll;
    }
  },
  methods: {
    BpmSubmitSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmSubmit.BpmSubmitSubmit(bpmInstanceObject, params);
    },
    executeTodraftSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmRetreat.executeTodraftSubmit(bpmInstanceObject, params);
    },
    executeToprevSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmRetreat.executeToprevSubmit(bpmInstanceObject, params);
    },
    executeTowantSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmRetreat.executeTowantSubmit(bpmInstanceObject, params);
    },
    BpmWithdrawSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmWithdraw.BpmWithdrawSubmit(bpmInstanceObject, params);
    },
    BpmSupplementSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmSupplement.BpmSupplementSubmit(bpmInstanceObject, params);
    },
    BpmTransmitSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmTransmit.BpmTransmitSubmit(bpmInstanceObject, params);
    },
    BpmAdduserSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmAdduser.BpmAdduserSubmit(bpmInstanceObject, params);
    },
    BpmWithdrawassigneeSubmit(bpmInstanceObject, params) {
      // 【4156】减签没反应 by cuijj
      return this.bpmInstanceObject.bpmWithdrawassignee.BpmWithdrawassigneeSubmit(
        bpmInstanceObject,
        params
      );
    },
    BpmSupersedeSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmSupersede.BpmSupersedeSubmit(bpmInstanceObject, params);
    },
    BpmStepuserdefinedSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmStepuserdefined.BpmStepuserdefinedSubmit(
        bpmInstanceObject,
        params
      );
    },
    BpmTaskreaderSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmTaskreader.BpmTaskreaderSubmit(bpmInstanceObject, params);
    },
    BpmStartsubflowSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmStartsubflow.BpmStartsubflowSubmit(
        bpmInstanceObject,
        params
      );
    },
    BpmGlobaljumpSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmGlobaljump.BpmGlobaljumpSubmit(bpmInstanceObject, params);
    },
    BpmGlobalendSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmGlobalend.BpmGlobalendSubmit(bpmInstanceObject, params);
    },
    executeToactivitySubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmRetreat.executeToactivitySubmit(bpmInstanceObject, params);
    },
    openSelectWorkHandUserModal(bpmInstanceObject) {
      return this.bpmInstanceObject.bpmSelectWorkHandUser.openSelectWorkHandUserModal(
        bpmInstanceObject
      );
    },
    BpmAdduserAndSubmitSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmAdduserAndSubmit.BpmAdduserAndSubmitSubmit(
        bpmInstanceObject,
        params
      );
    },
    BpmWithdrawPartSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmWithdrawPart.BpmWithdrawPartSubmit(
        bpmInstanceObject,
        params
      );
    },
    transmitSubmit(bpmInstanceObject, params) {
      return this.bpmInstanceObject.bpmTransmitSubmit.transmitSubmit(bpmInstanceObject, params);
    },
    // ...mapActions([
    //   'closeBpmCommonSelect',
    //   'BpmSubmitSubmit',
    //   'executeTodraftSubmit',
    //   'executeToprevSubmit',
    //   'executeTowantSubmit',
    //   'BpmWithdrawSubmit',
    //   'BpmSupplementSubmit',
    //   'BpmTransmitSubmit',
    //   'BpmAdduserSubmit',
    //   'BpmWithdrawassigneeSubmit',
    //   'BpmSupersedeSubmit',
    //   'BpmStepuserdefinedSubmit',
    //   'BpmTaskreaderSubmit',
    //   'BpmStartsubflowSubmit',
    //   'BpmGlobaljumpSubmit',
    //   'BpmGlobalendSubmit',
    //   'executeToactivitySubmit',
    //   'openSelectWorkHandUserModal'
    // ]),
    //初始化函数
    init() {},
    onTreeLoading(isTreeLoading) {
      this.isTreeLoading = isTreeLoading;
    },
    changeHeadTag(nodeType) {
      /* 当前维度的数据加载中时，不可切换到其他维度 */
      if (this.isTreeLoading) {
        return;
      } else {
        this.selectTag = nodeType;
        setTimeout(() => {
          const selectUserBoxRef = this.selectUserBoxRefName + this.selectFlowTab;
          if (this.$refs[selectUserBoxRef] && this.$refs[selectUserBoxRef].length >= 0) {
            this.$refs[selectUserBoxRef][0].getUserData(this.selectUser);
          }
        }, 500);
      }
    },
    //判断是否显示选人框
    showSelectUser(taskUserSelect) {
      let bpmCommonSelect = this.getButtonData();
      let event = bpmCommonSelect.buttonData.event;
      if (!taskUserSelect.nextTask) {
        return false;
      } else if (isAutoSelectUser(event)) {
        return false;
      } else {
        for (let i = 0; i < taskUserSelect.nextTask.length; i++) {
          let _nextActorModel = taskUserSelect.nextTask[i];
          if (
            _nextActorModel.activityType == 'sub-process' ||
            _nextActorModel.activityType == 'foreach'
          ) {
            if (_nextActorModel.currentActivityAttr.isMustUser == 'yes') {
              return true;
            }
          } else if (_nextActorModel.activityType == 'end') {
            return false;
          } else {
            if (_nextActorModel.currentActivityAttr.isSelectUser == 'yes') {
              return true;
            }
          }
        }
      }
      return false;
    },
    //强制表态
    isIdeaCompelManner(taskUserSelect) {
      if (taskUserSelect.currentActivityAttr.ideaCompelManner) {
        if (taskUserSelect.currentActivityAttr.ideaCompelManner == 'yes') {
          // 强制
          return true;
        } else {
          return false; // 不强制
        }
      } else {
        return false; // 不强制
      }
    },
    //初始化加载选人组件
    getActJsonInfo() {
      let bpmCommonSelect = this.getButtonData();
      if (this.validationOpenSelect(bpmCommonSelect)) {
        this.spinning = true;
        //初始化按钮
        if (bpmCommonSelect.buttonData) {
          this.submitFuncName = bpmCommonSelect.submitFuncName;
          //如果是自定义选人则不显示输入意见框
          if (this.submitFuncName == 'BpmStepuserdefinedSubmit') {
            this.isShowFlowOpinion = false;
          }
          // if (bpmCommonSelect.buttonData.alias) {
          //   this.title = '【' + bpmCommonSelect.buttonData.alias + '】';
          // } else if (bpmCommonSelect.buttonData.lable) {
          //   this.title = '【' + bpmCommonSelect.buttonData.lable + '】';
          // }
          this.buttonsList = [];
          this.buttonsList.push(buttons.cancel);
          this.buttonsList.push(buttons.confirm);
          let parameter = {
            procinstDbid: bpmCommonSelect.buttonData.procinstDbid,
            executionId: bpmCommonSelect.buttonData.executionId,
            taskId: bpmCommonSelect.buttonData.taskId,
            outcome: bpmCommonSelect.buttonData.name,
            targetActivityName: bpmCommonSelect.buttonData.targetActivityName,
            type: bpmCommonSelect.buttonData.event
          };
          request({
            url: this.getActJsonInfoParam.url,
            data: parameter,
            method: this.getActJsonInfoParam.method
          }) // 提交
            .then(res => {
              if (res.success) {
                this.formId = res.data.formId;
                if (this.isShowFlowOpinion == false) {
                  this.bodyStyle['height'] = '520px';
                } else {
                  this.flowOpinionHeight = 80;
                  this.bodyStyle['height'] = '580px';
                }
                this.initUserSelectBox(res.data);
              } else {
                this.$message.error('打开选人失败，缺少参数');
                this.closeModal();
              }
              this.spinning = false;
            })
            .catch(error => {
              this.spinning = false;
              if (error?.message?.indexOf('timeout of') !== -1) {
                this.$message.error('打开选人失败，请联系管理员查看配置是否正确！');
              } else {
                this.$message.error('打开选人失败，系统错误');
              }
              this.closeModal();
            });
        } else {
          this.spinning = false;
          this.$message.error('打开选人失败，缺少参数');
          this.closeModal();
        }
      } else {
        this.$message.error('打开选人失败，缺少参数');
        this.closeModal();
      }
    },
    //验证打开选人参数是否完整
    validationOpenSelect(bpmCommonSelect) {
      let result = false;
      if (bpmCommonSelect && bpmCommonSelect.buttonData) {
        if (bpmCommonSelect.buttonData) {
          if (bpmCommonSelect.buttonData.procinstDbid && bpmCommonSelect.buttonData.executionId) {
            result = true;
          }
        }
      }
      return result;
    },
    //初始化选人区域
    initUserSelectBox(actInfo) {
      let that = this;
      this.userBoxList = [];
      let taskUserSelect = {};
      if (actInfo) {
        if (actInfo.taskUserSelect) {
          taskUserSelect = actInfo.taskUserSelect;
        } else {
          taskUserSelect = actInfo;
        }
      }
      this.taskUserSelect = taskUserSelect;
      this.needSelectUser = this.noNeedSelectUser(); //获取是否选人
      // 强制表态--仅提交类操作
      let bpmCommonSelect = this.getButtonData();
      if (
        this.isIdeaCompelManner(taskUserSelect) &&
        bpmCommonSelect.buttonData.event == 'dosubmit'
      ) {
        this.buttonsList = [];
        this.buttonsList.push(buttons.cancel);
        this.buttonsList.push(buttons.agree);
        this.buttonsList.push(buttons.disagree);
      }
      if (
        this.showSelectUser(taskUserSelect) &&
        taskUserSelect.nextTask &&
        taskUserSelect.nextTask.length > 0
      ) {
        taskUserSelect.nextTask.map((tim, index) => {
          let selectFlowTabs = [];
          // 部门
          if (tim.orgList.length > 0 || tim.deptList.length > 0) {
            let org = tabs.org,
              mapList = tim.orgList.length > 0 ? tim.orgList : tim.deptList;
            mapList.map(tim => {
              org.para.push(tim.id);
            });
            selectFlowTabs.push(org);
          }
          //用户
          if (tim.userList.length > 0) {
            // 【12702】用户顺序根据orderBy排序
            tim.userList.sort((a, b) => {
              return a.orderBy - b.orderBy;
            });
            let user = tabs.user;
            tim.userList.map(tim => {
              user.para.push(tim.id);
            });
            selectFlowTabs.push(user);
          }
          //群组
          if (tim.groupList.length > 0) {
            let group = tabs.group;
            tim.groupList.map(tim => {
              group.para.push(tim.id);
            });
            selectFlowTabs.push(group);
          }
          //角色
          if (tim.roleList.length > 0) {
            let role = tabs.role;
            tim.roleList.map(tim => {
              role.para.push(tim.id);
            });
            selectFlowTabs.push(role);
          }
          //岗位
          if (tim.positionList.length > 0) {
            let position = tabs.position;
            tim.positionList.map(tim => {
              position.para.push(tim.id);
            });
            selectFlowTabs.push(position);
          }
          let data = {
            id: index,
            name: taskUserSelect.nextTask.length > 1 ? tim.currentActivityAttr.activityAlias : '',
            tabs: selectFlowTabs
          };
          this.userBoxList.push(data);
          if (index == 0) {
            if (selectFlowTabs.length == 0) {
              this.spinning = false;
              this.$message.error('没有符合要求的处理人！');
            } else {
              this.selectTag = selectFlowTabs[0].nodeType;
            }
          }
          // 【6813】分支节点过多时，提交界面，个别节点选择用户后，已选用户展示多个相同用户
          // if (this.selectUser && this.selectUser.length > 0) {
          //   this.selectUser.map((user, i) => {
          //     if (user.selectFlowTab != index) {
          //       this.selectUser.push({
          //         selectFlowTab: index,
          //         users: []
          //       });
          //     }
          //   });
          // } else {
          let select = this.selectUser.filter(us => us.selectFlowTab == index);
          if (select.length <= 0) {
            this.selectUser.push({
              selectFlowTab: index,
              users: []
            });
          }
          // }
        });
        if (this.titleAction == '输入') {
          this.titleAction = '选择';
          this.actionObject = '处理人';
        }
      } else {
        if (taskUserSelect.nextTask && taskUserSelect.nextTask.length > 0) {
          taskUserSelect.nextTask.map((tim, index) => {
            // if (this.selectUser && this.selectUser.length > 0) {
            //   this.selectUser.map(user => {
            //     if (user.selectFlowTab != index) {
            //       this.selectUser.push({
            //         selectFlowTab: index,
            //         users: []
            //       });
            //     }
            //   });
            // } else {
            let select = this.selectUser.filter(us => us.selectFlowTab == index);
            if (select.length <= 0) {
              this.selectUser.push({
                selectFlowTab: index,
                users: []
              });
            }
            // }
          });
        }

        this.titleAction = '输入';
        this.actionObject = '处理意见';
        this.bodyStyle['height'] = '300px';
        this.flowOpinionHeight = 190;
      }

      if (taskUserSelect.nextTask && taskUserSelect.nextTask.length == 1) {
        if (
          taskUserSelect.nextTask[0].currentActivityAttr &&
          taskUserSelect.nextTask[0].currentActivityAttr.activityAlias
        ) {
          // this.title = '【' + taskUserSelect.nextTask[0].currentActivityAttr?.activityAlias + '】';
          if (!this.showSelectUser(taskUserSelect)) {
            // #31492 不显示选人框时，提交流程页面意见输入框title显示不对，应显示当前节点名称
            this.title =
              '【' +
              (taskUserSelect.currentActivityAttr.activityAlias ||
                this.bpmInstanceObject.bpmModel.activitylabel) +
              '】';
          } else {
            this.title =
              '【' + taskUserSelect.nextTask[0].currentActivityAttr?.activityAlias + '】';
          }
        } else {
          this.title = '';
        }
      }
      if (this.userBoxList.length == 0) {
        // 弹出的意见框，是否显示【节点信息】
        if (this.bpmInstanceObject.bpmCommonSelect.isShowOpinionNode === false) {
          this.modalTitle = '请' + this.titleAction + this.actionObject;
        } else {
          this.modalTitle = '请' + this.titleAction + this.title + this.actionObject;
        }
      } else {
        this.modalTitle = null;
      }
      //设置默认选人
      if (this.bpmInstanceObject.bpmCommonSelect.defaultSelectUsers != null) {
        this.setDefaultSelectUsers(this.bpmInstanceObject.bpmCommonSelect.defaultSelectUsers);
      }
      //是否显示流程意见框
      if (typeof this.bpmInstanceObject.bpmCommonSelect.isShowOpinion != 'undefined') {
        this.isShowFlowOpinion = this.bpmInstanceObject.bpmCommonSelect.isShowOpinion;
        // 【7551】节点-基本信息-允许提交不弹框，配置不生效
        if (this.userBoxList.length > 0) {
          this.bodyStyle['height'] = '520px';
          this.modalStyle.opacity = 1;
        } else {
          // 不用选人，不用强制表态，提交意见配置“可以不填”，并且勾选“允许提交不弹框”，不显示意见框，直接提交
          if (
            !(
              this.isIdeaCompelManner(taskUserSelect) &&
              bpmCommonSelect.buttonData.event == 'dosubmit'
            ) &&
            taskUserSelect.currentActivityAttr.ideaType == 'can' &&
            taskUserSelect.currentActivityAttr.canHideDialog == 'yes'
          ) {
            this.isShowFlowOpinion = false;
            this.modalStyle.opacity = 0;
            this.$confirm({
              title: '确定提交吗？',
              okText: '确定',
              cancelText: '取消',
              onOk: () => {
                this.clickModal('confirm');
              },
              onCancel: () => {
                this.closeModal();
              }
            });
          }
        }
      }

      if (this.defaultSelectUsers != null) {
        this.setDefaultSelectUsers(this.defaultSelectUsers);
      }
      //去掉重复的选择用户
      this.repeatSelectUser();
      //自动选人
      this.autoSelectToCheckUserList();
      //配置选人
      this.getBpmStepPerson();
      setTimeout(() => {
        this.setValueToTreeAndBox();
      }, 600);
    },
    //切换tabs页签
    changeTabs(e) {
      if (typeof e == 'object') {
        if (this.selectFlowTab != e.index) {
          if (this.userBoxList.length >= e.index && this.userBoxList[e.index].tabs.length > 0) {
            this.changeHeadTag(this.userBoxList[e.index].tabs[0].nodeType);
          }
          this.selectFlowTab = e.index;
        }
      } else if (typeof e == 'number') {
        if (this.userBoxList.length >= e && this.userBoxList[e].tabs.length > 0) {
          this.changeHeadTag(this.userBoxList[e].tabs[0].nodeType);
        }
        this.selectFlowTab = e;
        this.selectTag = this.userBoxList[e].tabs[0].nodeType;
      }
    },
    //点击取消
    closeModal() {
      if (this.visible) {
        this.selectVisible = false;
        this.$emit('closeBpmSelectUser');
        this.empty();
      } else {
        this.bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(this.bpmInstanceObject);
        this.selectVisible = false;
      }
    },
    clickModal(type) {
      //取消
      if (type == 'cancel') {
        this.closeModal();
        //确定
      } else if (type == 'confirm') {
        let compelManner = '';
        // 强制表态--仅提交类操作
        let bpmCommonSelect = this.getButtonData();
        console.log('clickModal bpmCommonSelect', bpmCommonSelect);
        console.log(
          'clickModal this.isIdeaCompelManner(this.taskUserSelect)',
          this.isIdeaCompelManner(this.taskUserSelect)
        );
        console.log(
          'clickModal bpmCommonSelect.buttonData.event',
          bpmCommonSelect.buttonData.event
        );
        if (
          this.isIdeaCompelManner(this.taskUserSelect) &&
          bpmCommonSelect.buttonData.event == 'dosubmit'
        ) {
          compelManner = 'yes';
        }
        this.confirm(compelManner);
        //同意并提交
      } else if (type == 'agreeAndSubmit') {
        this.confirm('yes');
        //不同意并提交
      } else if (type == 'disagreeAndSubmit') {
        this.confirm('no');
      }
    },
    // 【4912】流程处理意见字符数超出后依旧可继续输入并且可提交成功
    checkWord(text = '') {
      if (text == '') return 0;
      let curLen = text.replace(/[^\0x00-\xff]/g, '*').length;
      return Math.floor(curLen);
    },
    //点击确定
    confirm(compelManner) {
      console.log('confirm compelManner', compelManner);
      console.log('confirm this.submitFuncName', this.submitFuncName, this);
      console.log('confirm this.needSelectUser', this.needSelectUser);
      this.compelManner = compelManner;
      // 【4912】流程处理意见字符数超出后依旧可继续输入并且可提交成功
      if (
        this.$refs[this.flowOpinionRefName] &&
        this.checkWord(this.$refs[this.flowOpinionRefName].getInputText()) > this.flowOpinionLength
      ) {
        this.$message.warning('流程意见超出长度' + this.flowOpinionLength);
        return;
      }
      if (!this.needSelectUser) {
        if (this.selectUser.length < 1) {
          this.$message.error('请选择处理人');
        } else if (
          this.selectUser.length == 1 &&
          (this.selectUser[0].users == null || this.selectUser[0].users.length == 0)
        ) {
          this.$message.error('请选择处理人');
        } else if (this.isSelectUser()) {
          this.$message.error(this.isSelectUser());
        } else if (this.isOpinion() == false) {
          this.$message.error('请填写流程意见');
        } else {
          this.spinningButton = true;
          let result = this.getResultUserData(compelManner);
          let bpmCommonSelect = this.getButtonData();
          //流程委托
          if (this.checkWorkHandUser()) {
            this.openWorkHandUser(result);
            if (this.modalStyle.opacity == 0) {
              this.modalStyle.opacity == 1;
            }
          } else {
            if (this.visible) {
              this.$emit('bpmSubmit', { users: result, buttonData: bpmCommonSelect.buttonData });
              this.selectVisible = false;
              this.bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(this.bpmInstanceObject);
            } else {
              if (this.submitFuncName) {
                this[this.submitFuncName](this.bpmInstanceObject, {
                  users: JSON.stringify(result),
                  buttonData: bpmCommonSelect.buttonData
                });
              } else {
                this.$emit('afterBpmButtons', {
                  users: result,
                  buttonData: bpmCommonSelect.buttonData
                });
                this.$emit('bpmSubmit', { users: result, buttonData: bpmCommonSelect.buttonData });
                this.selectVisible = false;
                this.bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(this.bpmInstanceObject);
              }
            }
          }
          setTimeout(() => {
            this.spinningButton = false;
          }, 2000);
        }
      } else {
        this.spinningButton = true;
        let result = this.getResultUserData(compelManner);
        let bpmCommonSelect = this.getButtonData();
        //流程委托
        if (this.checkWorkHandUser()) {
          this.openWorkHandUser(result);
          if (this.modalStyle.opacity == 0) {
            this.modalStyle.opacity == 1;
          }
        } else {
          if (this.visible) {
            this.$emit('bpmSubmit', { users: result, buttonData: bpmCommonSelect.buttonData });
            this.selectVisible = false;
          } else {
            if (this.submitFuncName) {
              this[this.submitFuncName](this.bpmInstanceObject, {
                users: JSON.stringify(result),
                buttonData: bpmCommonSelect.buttonData
              });
            } else {
              this.$emit('afterBpmButtons', {
                users: result,
                buttonData: bpmCommonSelect.buttonData
              });
              this.$emit('bpmSubmit', { users: result, buttonData: bpmCommonSelect.buttonData });
              this.selectVisible = false;
            }
          }
        }
        setTimeout(() => {
          this.spinningButton = false;
        }, 2000);
      }
    },
    /**
     * 分支节点必须选人
     */
    isMustUser(index) {
      console.log(
        'isMustUser',
        index,
        this.taskUserSelect.nextTask,
        this.taskUserSelect.nextTask.length
      );
      // 【7740】分支节点必须选人，不生效
      if (index > -1) {
        if (this.taskUserSelect.nextTask && this.taskUserSelect.nextTask.length > 1) {
          if (
            this.taskUserSelect.nextTask[index].currentActivityAttr.isMustUser &&
            this.taskUserSelect.nextTask[index].currentActivityAttr.isMustUser == 'no'
          ) {
            // 必须选人
            return false;
          } else {
            return true; // 必须选人
          }
        } else {
          return false; // 默认值
        }
      }
      return false;
    },
    //判断是否选人
    isSelectUser() {
      let resMessage = '';
      if (
        this.taskUserSelect &&
        this.taskUserSelect.nextTask &&
        this.taskUserSelect.nextTask.length > 0
      ) {
        if (this.selectUser.length > 1) {
          // 修复15226 【流程提交】流程节点配置“分支节点必须选人”后，流程提交时的提示信息不对
          let message = this.selectUser.reduce((pre, tim, i) => {
            if (this.isMustUser(i)) {
              if (tim.users.length == 0) {
                let data = this.taskUserSelect.nextTask[i];
                pre.push(data ? data.currentActivityAttr.activityAlias : '当前');
              }
            }
            return pre;
          }, []);
          // 多个分支节点则未选择的分支节点必选时 提醒选人
          if (message.length > 0) {
            resMessage = `请选择【${message.join(',')}】节点处理人！`;
          }
          // 【7553】 流程提交时不勾选处理人也可以提交流程
          if (resMessage == '') {
            let isSelect = false;
            this.selectUser.map(tim => {
              if (tim.users.length > 0) {
                isSelect = true;
              }
            });
            if (isSelect == false) {
              resMessage = '请选择处理人！';
            }
          }
        } else {
          let isSelect = false;
          this.selectUser.map(tim => {
            if (tim.users.length > 0) {
              isSelect = true;
            }
          });
          if (isSelect == false) {
            resMessage = '请选择处理人！';
          }
        }
      }
      return resMessage;
    },

    //判断是否选人
    noNeedSelectUser() {
      if (this.taskUserSelect.nextTask && this.taskUserSelect.nextTask.length > 0) {
        let count = 0;
        for (let i = 0; i < this.taskUserSelect.nextTask.length; i++) {
          let _nextActorModel = this.taskUserSelect.nextTask[i];
          if (_nextActorModel.activityType == 'end') {
            return true;
          } else if (
            _nextActorModel.activityType == 'sub-process' ||
            _nextActorModel.activityType == 'foreach'
          ) {
            if (_nextActorModel.currentActivityAttr.isMustUser == 'yes') {
              return false;
            } else {
              count++;
            }
          }
        }
        if (
          this.taskUserSelect.nextTask.length > 0 &&
          count == this.taskUserSelect.nextTask.length
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    //判断是否填写意见
    isOpinion() {
      let bpmCommonSelect = this.getButtonData();
      let isOpinion = true;
      //如果是自定义选人则不显示输入意见框
      if (this.submitFuncName == 'BpmStepuserdefinedSubmit') {
        return isOpinion;
      }
      if (bpmCommonSelect.buttonData.event == 'dosubmit') {
        if (this.taskUserSelect.currentActivityAttr.ideaType == 'must') {
          // 【7555】人工节点-意见，提交意见配置和退回意见必填两个配置不应该受到自定义表态的影响
          if (
            this.$refs[this.flowOpinionRefName] &&
            !this.$refs[this.flowOpinionRefName].getInputText()
          ) {
            isOpinion = false;
          }
        } //判断退回是否需要填写意见
      } else if (
        bpmCommonSelect.buttonData.event == 'doretreattodraft' ||
        bpmCommonSelect.buttonData.event == 'doretreattoprev' ||
        bpmCommonSelect.buttonData.event == 'doretreattowant' ||
        bpmCommonSelect.buttonData.event == 'doretreattoactivity'
      ) {
        if (this.taskUserSelect.currentActivityAttr.isNeedIdea == 'yes') {
          // 意见必须填写
          // 【7555】人工节点-意见，提交意见配置和退回意见必填两个配置不应该受到自定义表态的影响
          if (
            this.$refs[this.flowOpinionRefName] &&
            !this.$refs[this.flowOpinionRefName].getInputText()
          ) {
            isOpinion = false;
          }
        }
      }
      return isOpinion;
    },
    //打开流程委托
    openWorkHandUser(result) {
      if (result && result.users.length > 0) {
        let selectWorkHand = [];
        this.processKey = this.taskUserSelect.processKey;
        result.users.map(tim => {
          selectWorkHand = selectWorkHand.concat(tim.selectedUsers);
        });
        this.selectWorkHand = selectWorkHand;
        this.$refs.selectWorkHandUser.loadWorkHandUserData(this.processKey, this.selectWorkHand);
      }
    },
    //流程委托选人点击确定
    getSelectWorkHandUserList(list) {
      let result = this.getResultUserData(this.compelManner);
      let bpmCommonSelect = this.getButtonData();
      if (result && result.users.length > 0) {
        result.users.map(tim => {
          tim.workhandUsers = list;
        });
      }
      if (this.visible) {
        this.$emit('bpmSubmit', { users: result, buttonData: bpmCommonSelect.buttonData });
        this.selectVisible = false;
      } else {
        if (this.submitFuncName) {
          this[this.submitFuncName](this.bpmInstanceObject, {
            users: JSON.stringify(result),
            buttonData: bpmCommonSelect.buttonData
          });
        } else {
          this.$emit('afterBpmButtons', { users: result, buttonData: bpmCommonSelect.buttonData });
          this.$emit('bpmSubmit', { users: result, buttonData: bpmCommonSelect.buttonData });
          this.selectVisible = false;
        }
      }
    },
    //流程委托选人点击取消
    closeSelectWorkHandUserList() {
      this.spinningButton = false;
    },
    //判断是否存在工作移交
    checkWorkHandUser() {
      let bpmCommonSelect = this.getButtonData();
      if (
        bpmCommonSelect.buttonData.event == 'doretreattodraft' || //退回拟稿人
        bpmCommonSelect.buttonData.event == 'doretreattoprev' || //退回上一步
        bpmCommonSelect.buttonData.event == 'doretreattowant' || // 任意退回
        bpmCommonSelect.buttonData.event == 'doretreattoactivity' || // 退回到taskName节点
        bpmCommonSelect.buttonData.event == 'dowithdraw' || //拿回
        bpmCommonSelect.buttonData.event == 'dotransmit' || // 发送阅知
        bpmCommonSelect.buttonData.event == 'dotaskreader' || //增加读者
        bpmCommonSelect.buttonData.event == 'dowithdrawassignee' || //减签
        bpmCommonSelect.buttonData.event == 'dowithdrawpart' // 拿回部分待办
      ) {
        return false;
      }
      if (this.taskUserSelect && this.taskUserSelect.nextTask) {
        for (let i = 0; i < this.taskUserSelect.nextTask.length; i++) {
          let jsonData = this.taskUserSelect.nextTask[i];
          if (jsonData.currentActivityAttr.isWorkHandUser == 'yes') {
            return true;
          }
        }
      } else {
        return false;
      }
    },
    //获取按钮数据
    getButtonData() {
      if (this.visible) {
        return { buttonData: this.buttonData, submitFuncName: '' };
      } else {
        return this.bpmInstanceObject.bpmCommonSelect;
      }
    },
    //加工点击确定返回数据
    getResultUserData(compelManner) {
      let idea = this.$refs[this.flowOpinionRefName]
        ? this.$refs[this.flowOpinionRefName].getText()
        : '';
      let bpmCommonSelect = this.getButtonData();
      let resultData = {
        idea,
        compelManner,
        outcome: bpmCommonSelect.buttonData.name
      };
      let users = [];
      if (
        this.taskUserSelect &&
        this.taskUserSelect.nextTask &&
        this.taskUserSelect.nextTask.length > 0
      ) {
        let outcome = this.taskUserSelect.currentActivityAttr.outcome;
        this.taskUserSelect.nextTask.map((tim, index) => {
          let select = this.selectUser.filter(us => us.selectFlowTab == index);
          if (select && select.length > 0) {
            let selectedUsers = [];
            select[0].users.map(user => {
              selectedUsers.push({
                userId: user.id,
                userName: user.title,
                deptId: user.attributes.deptId,
                deptName: user.attributes.deptName
              });
            });
            let user = {
              outcome,
              targetActivityName: tim.currentActivityAttr.activityName,
              selectedUsers,
              workhandUsers: []
            };
            users.push(user);
          }
        });
      }
      resultData.users = users;
      return resultData;
    },
    //清空数据
    empty() {
      this.selectUser = [];
      this.userBoxList = [];
      this.spinningButton = false;
      this.selectFlowTab = 0;
    },
    //完全关闭回掉
    afterClose() {
      this.spinningButton = false;
    },
    changeSelectUser(e) {
      this.selectUser = e;
      //去掉重复的选择用户
      // this.repeatSelectUser();
      const treeRef = this.treeRefName + this.selectFlowTab + this.selectTag;
      if (this.$refs[treeRef] && this.$refs[treeRef][0]) {
        this.$refs[treeRef][0].changeSelectUser(e);
      }
    },
    onChange(data) {
      const selectUserBoxRef = this.selectUserBoxRefName + this.selectFlowTab;
      if (this.$refs[selectUserBoxRef] && this.$refs[selectUserBoxRef].length >= 0) {
        this.$refs[selectUserBoxRef][0].getUserData(data);
      }
    },

    //设置传入的默认选中
    setDefaultSelectUsers(defaultSelectUsers) {
      if (
        defaultSelectUsers != null &&
        defaultSelectUsers.users != null &&
        defaultSelectUsers.users.users != null &&
        defaultSelectUsers.users.users.length > 0 &&
        this.taskUserSelect != null
      ) {
        let selectUser = [];
        this.taskUserSelect.nextTask.map((tim, index) => {
          defaultSelectUsers.users.users.map((user, i) => {
            if (user.targetActivityName == tim.currentActivityAttr.activityName) {
              if (user.selectedUsers && user.selectedUsers.length > 0) {
                let usersList = [];
                user.selectedUsers.map(u => {
                  usersList.push({
                    key: u.userId + u.deptId,
                    title: u.userName,
                    id: u.userId,
                    name: u.userName,
                    deptId: u.deptId,
                    deptName: u.deptName,
                    attributes: {
                      deptId: u.deptId,
                      deptName: u.deptName,
                      nodeType: 'user'
                    }
                  });
                });
                if (usersList && usersList.length > 0) {
                  selectUser.push({
                    selectFlowTab: index,
                    users: usersList
                  });
                }
              }
            }
          });
        });
        if (selectUser && selectUser.length > 0) {
          if (this.selectUser.length > 0) {
            if (selectUser.length == 1 && selectUser[0].users.length > 0) {
              this.selectUser = selectUser;
            } else {
              selectUser.map((newusers, i) => {
                if (i <= this.selectUser.length) {
                  newusers.users.map(newuser => {
                    let isAdd = true;
                    this.selectUser[i].users.map(user => {
                      if ((newuser.id = user.id)) {
                        isAdd = false;
                      }
                    });
                    if (isAdd) {
                      this.selectUser[i].users.push(newuser);
                    }
                  });
                } else {
                  let select = this.selectUser.filter(
                    us => us.selectFlowTab == newusers.selectFlowTab
                  );
                  if (select.length <= 0) {
                    this.selectUser.push(newusers);
                  }
                }
              });
            }
          } else {
            this.selectUser = selectUser;
          }
          //设置默认页签值
          this.selectTag = this.userBoxList[0].tabs[0].nodeType;
          setTimeout(() => {
            this.setValueToTreeAndBox();
          }, 600);
        }
      }
    },
    //分别为左侧树和右侧列表赋值
    setValueToTreeAndBox() {
      const treeRef = this.treeRefName + this.selectFlowTab + this.selectTag;
      if (this.$refs[treeRef] && this.$refs[treeRef].length > 0) {
        this.$refs[treeRef][0].setDefaultSelectUser(this.selectUser);
      }
      const selectUserBoxRef = this.selectUserBoxRefName + this.selectFlowTab;
      if (this.$refs[selectUserBoxRef] && this.$refs[selectUserBoxRef].length > 0) {
        this.$refs[selectUserBoxRef][0].getUserData(this.selectUser);
      }
    },
    //获取设置的配置选人
    getBpmStepPerson() {
      let taskUserSelect = this.taskUserSelect;
      if (taskUserSelect) {
        request({
          url: this.bpmStepPersonParam.url,
          data: {
            entryId: taskUserSelect.currentActivityAttr.processInstanceId,
            activityName: taskUserSelect.currentActivityAttr.activityName
          },
          method: this.bpmStepPersonParam.method
        }).then(res => {
          if (res.success && res.data.length > 0) {
            if (this.taskUserSelect.nextTask.length > 0) {
              let usersList = [];
              res.data.map(user => {
                usersList.push({
                  key: user.id,
                  title: user.name,
                  id: user.id,
                  name: user.name,
                  deptId: user.deptId,
                  deptName: user.deptName,
                  attributes: {
                    deptId: user.deptId,
                    deptName: user.deptName,
                    nodeType: 'user'
                  }
                });
              });
              if (this.selectUser.length > 0) {
                // console.log('this.selectUser.length', this.selectUser.length)
                // console.log('this.selectUser.length.length', this.selectUser.length.length)
                // this.selectUser.length.length ??
                if (this.selectUser.length == 1 && this.selectUser[0].users.length > 0) {
                  this.selectUser = [{ selectFlowTab: 0, users: usersList }];
                } else {
                  usersList.map(newUser => {
                    let isAdd = true;
                    this.selectUser[0].users.map(user => {
                      if (user.id == newUser.id) {
                        isAdd = false;
                      }
                    });
                    if (isAdd) {
                      this.selectUser[0].users.push(newUser);
                    }
                  });
                }
              } else {
                this.selectUser = [{ selectFlowTab: 0, users: usersList }];
              }
              setTimeout(() => {
                this.setValueToTreeAndBox();
              }, 600);
            }
          }
        });
      }
    },
    /**
     * -----------------------自动选人-------------------------------------------
     */
    //设置自动选人
    setAutoUser(userList, tabIndex) {
      let that = this;
      if (userList && userList.length > 0) {
        userList.map(user => {
          that.selectUser.map(tim => {
            if (tim.selectFlowTab == tabIndex) {
              let select = tim.users.filter(item => item.id == user.id);
              if (select.length == 0) {
                tim.users.push(user);
              }
            }
          });
        });
      }
    },
    //自动选人
    autoSelectUser(_nextActorModel, tabIndex) {
      //部门
      if (
        _nextActorModel.orgDeptUserList != null &&
        _nextActorModel.orgDeptUserList.length &&
        _nextActorModel.orgDeptUserList.length > 0
      ) {
        let selectUser = setUserList(_nextActorModel.orgDeptUserList);
        this.setAutoUser(selectUser, tabIndex);
      }
      //用户
      if (
        _nextActorModel.userList != null &&
        _nextActorModel.userList.length &&
        _nextActorModel.userList.length > 0
      ) {
        let selectUser = setUserList(_nextActorModel.userList);
        this.setAutoUser(selectUser, tabIndex);
      }
      //群组
      if (
        _nextActorModel.groupUserList != null &&
        _nextActorModel.groupUserList.length &&
        _nextActorModel.groupUserList.length > 0
      ) {
        let selectUser = setUserList(_nextActorModel.groupUserList);
        this.setAutoUser(selectUser, tabIndex);
      }
      //角色
      if (
        _nextActorModel.roleUserList != null &&
        _nextActorModel.roleUserList.length &&
        _nextActorModel.roleUserList.length > 0
      ) {
        let selectUser = setUserList(_nextActorModel.roleUserList);
        this.setAutoUser(selectUser, tabIndex);
      }
      //岗位
      if (
        _nextActorModel.positionUserList != null &&
        _nextActorModel.positionUserList.length &&
        _nextActorModel.positionUserList.length > 0
      ) {
        let selectUser = setUserList(_nextActorModel.positionUserList);
        this.setAutoUser(selectUser, tabIndex);
      }
    },
    // 【7559】人工节点同时配置了自动选人和单人处理，流程选人框中还是会选择多个人
    // 单人处理自动选人
    autoSelectUserSingle(_nextActorModel, tabIndex) {
      //部门
      if (
        _nextActorModel.orgDeptUserList != null &&
        _nextActorModel.orgDeptUserList.length &&
        _nextActorModel.orgDeptUserList.length > 0
      ) {
        let selectUser = setUserList([_nextActorModel.orgDeptUserList[0]]);
        this.setAutoUser(selectUser, tabIndex);
        return;
      }
      //用户
      if (
        _nextActorModel.userList != null &&
        _nextActorModel.userList.length &&
        _nextActorModel.userList.length > 0
      ) {
        let selectUser = setUserList([_nextActorModel.userList[0]]);
        this.setAutoUser(selectUser, tabIndex);
        return;
      }
      //群组
      if (
        _nextActorModel.groupUserList != null &&
        _nextActorModel.groupUserList.length &&
        _nextActorModel.groupUserList.length > 0
      ) {
        let selectUser = setUserList([_nextActorModel.groupUserList[0]]);
        this.setAutoUser(selectUser, tabIndex);
        return;
      }
      //角色
      if (
        _nextActorModel.roleUserList != null &&
        _nextActorModel.roleUserList.length &&
        _nextActorModel.roleUserList.length > 0
      ) {
        let selectUser = setUserList([_nextActorModel.roleUserList[0]]);
        this.setAutoUser(selectUser, tabIndex);
        return;
      }
      //岗位
      if (
        _nextActorModel.positionUserList != null &&
        _nextActorModel.positionUserList.length &&
        _nextActorModel.positionUserList.length > 0
      ) {
        let selectUser = setUserList([_nextActorModel.positionUserList[0]]);
        this.setAutoUser(selectUser, tabIndex);
        return;
      }
    },
    //自动选人
    autoSelectToCheckUserList() {
      if (this.taskUserSelect.nextTask && this.taskUserSelect.nextTask.length > 0) {
        let bpmCommonSelect = this.getButtonData();
        let event = bpmCommonSelect.buttonData.event;
        this.taskUserSelect.nextTask.map((tim, index) => {
          if (this.isUserSelectTypeAuto(tim) || isAutoSelectUser(event)) {
            // 【7559】人工节点同时配置了自动选人和单人处理，流程选人框中还是会选择多个人
            if (tim.currentActivityAttr?.dealType == '1') {
              // 单人处理
              this.autoSelectUserSingle(tim, index);
            } else {
              this.autoSelectUser(tim, index);
            }
          }
        });
      }
    },
    // 判断是否自动选中
    isUserSelectTypeAuto(_nextActorModel) {
      if (_nextActorModel != null && 'auto' == _nextActorModel.currentActivityAttr.userSelectType) {
        return true;
      }
      return false;
    },
    //去掉重复的 selectFlowTab
    repeatSelectUser() {
      if (this.userBoxList.length != this.selectUser.length) {
        this.selectUser.map((user, index) => {
          let selectFlowTab = user.selectFlowTab;
          let select = this.selectUser.filter(us => us.selectFlowTab == selectFlowTab);
          if (select.length > 1) {
            this.selectUser.splice(index, 1);
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
.main_modal {
  .head-tab {
    .ant-tabs-nav-wrap {
      padding: 0 12px;
      .ant-tabs-tab {
        margin-right: 8px;
        font-size: @font-size-lg;
        .head-tab {
          font-weight: 600;
        }
      }
    }
  }
  .user-tab {
    .ant-tabs-nav-wrap {
      padding: 4px 16px;
      .ant-tabs-tab {
        margin-right: 12px;
        .head-tab {
          font-weight: 600;
        }
      }
    }
  }
  .required {
    color: red;
  }
  .choose {
    display: flex;
    border-bottom: 1px solid @border-color-split;
    .left,
    .right {
      width: 50%;
      height: 100%;
      float: left;
    }
    .left {
      border-right: 1px solid @border-color-split;

      .ant-tabs-nav {
        // margin-bottom: 8px;
        padding: 8px 8px 0 8px;
        .ant-tabs-nav-wrap {
          padding: 0;
          .ant-tabs-tab {
            margin-right: 0;
            font-size: @font-size-base;
            .head-tab {
              font-weight: normal;
            }
          }
        }
      }
      .tree-box {
        height: 310px;
        padding: 8px 8px 0 8px;
        .search-box {
          margin-bottom: 4px;
        }
        .ant-tree-checkbox {
          margin: 4px 4px 0 0;
        }
      }
      .ant-tree-title {
        .avic-icon {
          margin-right: 4px;
          font-size: 1.3em;
          vertical-align: -0.225em;
        }
      }
    }
    .right {
      .container-box {
        .container-right-top {
          display: flex;
          align-items: center;
          padding: 8px;
          line-height: 23px;
          border-bottom: 1px solid @border-color-split;
          .total-delete-icon {
            margin-right: 8px;
            margin-left: auto;
            cursor: pointer;
            &:hover {
              color: red;
              fill: red;
            }
          }
        }
        .surely-table-body {
          height: 310px;
          .surely-table-cell {
            border: 0;
            .avic-icon {
              margin-right: 4px;
              font-size: 1.3em;
              vertical-align: -0.525em;
            }
            .checkclose {
              margin-right: 8px;
              margin-left: auto;
              color: @text-color-less;
              cursor: pointer;
              fill: @text-color-less;
              &:hover {
                color: red;
                fill: red;
              }
            }
            .surely-table-drag-handle {
              margin-left: 8px;
              color: @text-color-less;
              cursor: move;
              fill: @text-color-less;
            }
          }
          .checkclose {
            margin-right: 8px;
            margin-left: auto;
            color: @text-color-less;
            fill: @text-color-less;
          }
          .surely-table-drag-handle {
            margin-left: 8px;
            color: @text-color-less;
            fill: @text-color-less;
          }
        }
      }
    }
  }
  .select-count {
    // height: 100%;
    .ope-box {
      height: 100%;
    }
    .ant-popover-title {
      display: flex;
      flex-direction: row-reverse;
      padding: 4px;
    }
    .ant-popover-inner-content {
      min-height: 120px;
      padding: 4px;
      .popover-box-ul {
        margin-bottom: 0;
        padding: 0;
        height: 180px;
        overflow: auto;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px;
          width: 220px;
          &:hover {
            color: @primary-color;
            background: @primary-1;
          }
          .table-handle-button {
            color: @text-color-less;
            cursor: pointer;
            fill: @text-color-less;
            &:hover {
              color: red;
              fill: red;
            }
          }
        }
      }
    }
    .ant-input,
    .ant-input:focus,
    .ant-input-focused,
    .ant-input:hover {
      border: 0;
      box-shadow: none;
    }

    .ant-input-textarea-show-count::after {
      position: absolute;
      right: 4px;
      bottom: 4px;
      z-index: 2;
    }
    .tool-box {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      font-size: @font-size-base;
      background: @table-header-bg;
      .right {
        margin-left: auto;
      }
      .idea-box {
        margin-right: 4px;
        font-weight: 600;
      }
      .ant-tag > .anticon + span,
      .ant-tag > span + .anticon {
        margin-left: 4px;
      }
    }
  }
}
</style>
