// import Vue from 'vue';

// function httpAction() {
//   return Vue.prototype.$sdk.http(...arguments)
// }

import { Modal, message } from 'ant-design-vue';
import bpmUtils from './FlowUtils';
import {
  getBpmButtonExtsByPage,
  getFormSecuritys,
  dosupplementassignee,
  getTaskRemark,
  setFocusedTask,
  doend,
  dojump,
  doresume,
  dosuspend,
  beforepresstodo,
  dopresstodo,
  dobacktofirst,
  dobacktoprev,
  dobacktowant,
  dobacktoactivity,
  getSubPdId,
  processStartView,
  dostartsubprocess,
  douserdefined,
  dosubmit,
  dosupersede,
  getcoordinate,
  dotaskreader,
  dotransmit,
  dosubmitTransmit,
  dowithdrawcurract,
  dowithdrawactassignee,
  dowithdrawpart
} from '@/api/avic/bpm/FlowEditorApi';
import { useUserStore } from '@/store/user';

const bpmInstanceObject = {
  // 流程操作
  bpmEditor: {
    flowIdea: '',
    isStart: false, // 是否新建
    isStartPage: false, // 是否是发起页面
    afterInit: false, // 自定义的加载后事件是否已经执行
    needRefreshPic: false, // 刷新是否被挂起
    needRefreshIdea: false, // 刷新是否被挂起
    leadButCodeList: [], // 引导按钮
    flowButtons: [], // 权限按钮
    customButtons: [], //自定义按钮
    formSecuritys: [], //表单权限,
    loadingState: true, //表单加载蒙层状态
    isButtonLoading: false, // 流程按钮加载蒙层状态
    loadingSaveState: false, // 表单提交蒙层状态
    eformConfig: {}, // 流程电子表单参数
    // 初始化
    flowEditorInitFunc: async (bpmInstanceObject, params) => {
      // 数据存储
      bpmInstanceObject.bpmModel.defineId = params.defineId;
      bpmInstanceObject.bpmModel.deploymentId = params.deploymentId;
      bpmInstanceObject.bpmModel.entryId = params.entryId;
      bpmInstanceObject.bpmModel.executionId = params.executionId;
      bpmInstanceObject.bpmModel.taskId = params.taskId;
      bpmInstanceObject.bpmModel.formId = params.formId;
      bpmInstanceObject.bpmEditor.eformConfig = params.eformConfig || {};

      if (bpmUtils.notNull(params.defineId)) {
        bpmInstanceObject.bpmEditor.isStart = true;
        bpmInstanceObject.bpmEditor.isStartPage = true;
        let res = await bpmUtils.flowStart(params.defineId);
        // 初始化流程
        bpmUtils.setFlowStartAndEndTask(bpmInstanceObject, params.deploymentId);

        if (res.success) {
          bpmInstanceObject.bpmModel.activityname = res.data.firstTaskName;
          bpmInstanceObject.bpmModel.activitylabel = res.data.firstTaskAlias;
          bpmInstanceObject.bpmModel.deploymentId = res.data.deploymentId;
          bpmInstanceObject.bpmModel.userIdentityKey = '6';
          bpmInstanceObject.bpmModel.userIdentity = '拟稿人';
          bpmInstanceObject.bpmEditor.closeLoading(bpmInstanceObject);
        } else {
          Modal.warning({
            title:
              '流程参数错误！无法初始化权限按钮！您可能是通过非法的途径进入了当前页面，例如重复刷新页面，拷贝链接到浏览器地址栏等操作。点击确定关闭表单',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
              window.close();
            }
          });
          return false;
        }
      } else if (
        bpmUtils.notNull(params.entryId, params.executionId, params.taskId, params.formId)
      ) {
        //
      } else {
        Modal.warning({
          title:
            '流程参数错误！无法初始化权限按钮！您可能是通过非法的途径进入了当前页面，例如重复刷新页面，拷贝链接到浏览器地址栏等操作。点击确定关闭表单',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            window.close();
          }
        });
        return false;
      }
      // 权限按钮
      await bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
    },
    // 权限按钮重置
    createButtons: async (bpmInstanceObject, params) => {
      if (bpmInstanceObject.bpmEditor.isStart) {
        //自定义的加载事件
        if (!bpmInstanceObject.bpmEditor.afterInit) {
          bpmInstanceObject.bpmEditor.afterInit = true;
        }
        let buttonListDefault = [
          {
            id: 'doformsave',
            lable: '暂存',
            event: 'doformsave',
            icon: 'icon iconfont icon-customicon-temporary-storage'
          },
          {
            id: 'dostart',
            lable: '提交',
            event: 'dostart',
            icon: 'icon iconfont icon-customicon-submit'
          },
          {
            id: 'bpm_but_track',
            lable: '流程跟踪',
            event: 'bpm_but_track',
            icon: 'icon iconfont icon-question-circle'
          },
          {
            id: 'bpm_but_help',
            lable: '帮助',
            event: 'bpm_but_help',
            icon: 'icon iconfont icon-question-circle'
          }
        ];
        // 获取流程按钮列表，用自定义名称替换默认名称
        let res = await getBpmButtonExtsByPage({
          pageParameter: {
            page: 1, // 页数
            rows: 9999 // 每页条数
          }
        });
        if (res.success) {
          buttonListDefault.map(item => {
            res.data?.result.map(listItem => {
              if (listItem.code == item.id) {
                item.lable = listItem.name || listItem.dName;
              }
            });
          });
        }
        await bpmInstanceObject.bpmEditor.controlFormInput(bpmInstanceObject);
        await bpmInstanceObject.bpmEditor.drawDefaultButtons(bpmInstanceObject, {
          buttonListDefault
        });
      } else {
        let res = await bpmUtils.getOperaterightAndFormSecuritys(
          bpmInstanceObject,
          bpmInstanceObject.bpmModel.entryId,
          bpmInstanceObject.bpmModel.executionId,
          bpmInstanceObject.bpmModel.taskId,
          bpmInstanceObject.bpmModel.formId
        );
        if (res.success) {
          bpmInstanceObject.bpmModel.activityname = res.data.bpmContent.processActivityName;
          bpmInstanceObject.bpmModel.activitylabel = res.data.bpmContent.processActivityLabel;
          bpmInstanceObject.bpmModel.userIdentityKey = res.data.bpmContent.userIdentityKey;
          bpmInstanceObject.bpmModel.userIdentity = res.data.bpmContent.userIdentity;
          bpmInstanceObject.bpmEditor.formSecuritys = res.data.formSecuritys;
          bpmInstanceObject.bpmEditor.ideasBySelf = res.data.bpmContent.ideasBySelf;

          await bpmInstanceObject.bpmEditor.drawButtons(bpmInstanceObject, {
            operateRights: res.data
          });
          // 默认点击提交
          if (params && params.flg) {
            bpmInstanceObject.bpmSubmit.clickBut(bpmInstanceObject, params.outcome);
            bpmInstanceObject.bpmEditor.outcome = params.outcome;
          }
          //自定义的加载事件
          if (!bpmInstanceObject.bpmEditor.afterInit) {
            bpmInstanceObject.bpmEditor.afterInit = true;
          }
        }
      }
      bpmInstanceObject.bpmModel.flowRefreshFunc(bpmInstanceObject);
    },
    closeLoading: bpmInstanceObject => {
      bpmInstanceObject.bpmEditor.loadingState = false;
    },
    // 画按钮,流程未启动时
    drawDefaultButtons: async (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmEditor.flowButtons = [...params.buttonListDefault];
      for (let i = 0; i < bpmInstanceObject.bpmEditor.flowButtons.length; i++) {
        let item = bpmInstanceObject.bpmEditor.flowButtons[i];
        // 将视图编码塞入按钮数据内
        if (
          bpmInstanceObject.bpmEditor.eformConfig &&
          bpmInstanceObject.bpmEditor.eformConfig.isEform
        ) {
          item.viewCode = bpmInstanceObject.bpmEditor.eformConfig.viewCode;
        }
        if (item.event === 'doformsave') {
          // 暂存
          bpmInstanceObject.bpmSave.BpmSaveInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dosubmit' || item.event === 'dostart') {
          // 提交
          for (let i = 0; i < bpmInstanceObject.bpmEditor.flowButtons.length; i++) {
            let btn = bpmInstanceObject.bpmEditor.flowButtons[i];
            if (btn.event === 'dosubmit' || btn.event === 'dostart') {
              bpmInstanceObject.bpmSubmit.BpmSubmitInitFunc(bpmInstanceObject, {
                data: btn
              });
            }
          }
        }
      }
    },
    // 画按钮
    drawButtons: async (bpmInstanceObject, params) => {
      // 节点内容处理
      let bpmContent = params.operateRights.bpmContent;
      //如果曾经在当前节点办理过，提示用户
      if (bpmUtils.notNull(bpmContent.messageForEver)) {
        message.info(bpmContent.messageForEver);
      }
      // 按钮处理
      // 权限按钮
      let buttonListRight = params.operateRights.operateRight;
      if (buttonListRight == null) {
        return;
      }
      // 默认按钮
      let defaultButtonArray = [
        {
          id: 'bpm_but_track',
          lable: '流程跟踪',
          event: 'bpm_but_track',
          icon: 'icon iconfont icon-question-circle'
        },
        {
          id: 'bpm_but_help',
          lable: '帮助',
          event: 'bpm_but_help',
          icon: 'icon iconfont icon-question-circle'
        }
      ];
      // 获取流程按钮列表，用自定义名称替换默认名称
      let res = await getBpmButtonExtsByPage({
        pageParameter: {
          page: 1, // 页数
          rows: 9999 // 每页条数
        }
      });
      if (res.success) {
        defaultButtonArray.map(item => {
          res.data?.result.map(listItem => {
            if (listItem.code == item.id) {
              item.lable = listItem.name || listItem.dName;
            }
          });
        });
      }
      // 获取权限按钮中的退回按钮集合
      let retreatButtonsArr = []; // 退回按钮集合
      for (let i = 0; i < buttonListRight.length; i++) {
        let buttonItem = buttonListRight[i];
        if (buttonItem.event !== 'dosubmit' && buttonItem.event !== 'doretreattoactivity') {
          // 提交、跨节点退回不用默认名称，其他用默认名称
          buttonItem.lable = buttonItem.customName || buttonItem.dName || buttonItem.lable;
        }
        if (
          buttonItem.event === 'doretreattodraft' ||
          buttonItem.event === 'doretreattoprev' ||
          buttonItem.event === 'doretreattowant'
        ) {
          // 退回上一步 退回拟稿人 任意退回
          retreatButtonsArr.push(buttonItem);
        } else if (buttonItem.event === 'doretreattoactivity') {
          // 跨节点退回
          let doretreattoactivityArr = [];
          let activityArr = buttonItem.targetName.split(',');
          let activityNameArr = buttonItem.lable.split(',');
          for (let j = 0; j < activityArr.length; j++) {
            doretreattoactivityArr.push(buttonItem);
          }
          for (let k = 0; k < doretreattoactivityArr.length; k++) {
            let obj = JSON.parse(JSON.stringify(doretreattoactivityArr[k]));
            obj.targetName = activityArr[k];
            obj.lable = '退回到【' + activityNameArr[k] + '】节点';
            retreatButtonsArr.push(obj);
          }
        }
      }
      // 处理全部按钮，赋给state
      let buttonsArray = [];
      let flowButtonsArr = [...buttonListRight, ...defaultButtonArray];
      let retreatButtonsNum = 0; // 退回按钮出现次数
      for (let i = 0; i < flowButtonsArr.length; i++) {
        let btnItem = flowButtonsArr[i];
        // 将视图编码塞入按钮数据内
        if (
          bpmInstanceObject.bpmEditor.eformConfig &&
          bpmInstanceObject.bpmEditor.eformConfig.isEform
        ) {
          btnItem.viewCode = bpmInstanceObject.bpmEditor.eformConfig.viewCode;
        }
        if (
          btnItem.event === 'doretreattodraft' ||
          btnItem.event === 'doretreattoprev' ||
          btnItem.event === 'doretreattowant' ||
          btnItem.event === 'doretreattoactivity'
        ) {
          // 退回类按钮
          retreatButtonsNum++;
          if (retreatButtonsArr.length == 1) {
            buttonsArray.push(btnItem); // 一个退回按钮不作集合
          } else if (retreatButtonsArr.length > 1 && retreatButtonsNum == 1) {
            buttonsArray.push({
              retreatButtons: retreatButtonsArr
            }); // 多个退回按钮作为一个集合
          }
        } else {
          // 其他按钮
          buttonsArray.push(btnItem);
        }
      }
      bpmInstanceObject.bpmEditor.flowButtons = [...buttonsArray];
      for (let i = 0; i < bpmInstanceObject.bpmEditor.flowButtons.length; i++) {
        let item = bpmInstanceObject.bpmEditor.flowButtons[i];
        if (item.event === 'doformsave') {
          // 暂存
          bpmInstanceObject.bpmSave.BpmSaveInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dosubmit' || item.event === 'dostart') {
          // 提交
          for (let i = 0; i < bpmInstanceObject.bpmEditor.flowButtons.length; i++) {
            let btn = bpmInstanceObject.bpmEditor.flowButtons[i];
            if (btn.event === 'dosubmit' || btn.event === 'dostart') {
              bpmInstanceObject.bpmSubmit.BpmSubmitInitFunc(bpmInstanceObject, {
                data: btn
              });
            }
          }
        } else if (item.event === 'dotransmitsubmit') {
          // 已阅
          bpmInstanceObject.bpmTransmitSubmit.BpmTransmitSubmitInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dowithdraw') {
          // 拿回
          bpmInstanceObject.bpmWithdraw.BpmWithdrawInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dosupplement') {
          // 补发
          bpmInstanceObject.bpmSupplement.BpmSupplementInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dotransmit') {
          // 发送阅知即流程转发
          bpmInstanceObject.bpmTransmit.BpmTransmitInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'doadduser') {
          // 加签
          bpmInstanceObject.bpmAdduser.BpmAdduserInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dowithdrawassignee') {
          // 减签
          bpmInstanceObject.bpmWithdrawassignee.BpmWithdrawassigneeInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dosupersede') {
          // 流程转办
          bpmInstanceObject.bpmSupersede.BpmSupersedeInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dopresstodo') {
          // 发送催办
          bpmInstanceObject.bpmPresstodo.BpmPresstodoInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dostepuserdefined') {
          // 自定义选人
          bpmInstanceObject.bpmStepuserdefined.BpmStepuserdefinedInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dotaskreader') {
          // 增加读者
          bpmInstanceObject.bpmTaskreader.BpmTaskreaderInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dostartsubprocess') {
          // 发起子流程
          bpmInstanceObject.bpmStartsubflow.BpmStartsubflowInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'doglobalidea') {
          // 意见修改
          bpmInstanceObject.bpmGlobalidea.BpmGlobalideaInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'doglobaljump') {
          // 流程跳转
          bpmInstanceObject.bpmGlobaljump.BpmGlobaljumpInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'doglobalsuspend') {
          // 流程暂停
          bpmInstanceObject.bpmGlobalsuspend.BpmGlobalsuspendInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'doglobalresume') {
          // 流程恢复
          bpmInstanceObject.bpmGlobalresume.BpmGlobalresumeInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'doglobalend') {
          // 流程结束
          bpmInstanceObject.bpmGlobalend.BpmGlobalendInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dofocus') {
          // 关注工作
          bpmInstanceObject.bpmFocus.BpmFocusInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'doadduserandsubmit') {
          // 加签并提交
          bpmInstanceObject.bpmAdduserAndSubmit.BpmAdduserAndSubmitInitFunc(bpmInstanceObject, {
            data: item
          });
        } else if (item.event === 'dowithdrawpart') {
          // 拿回部分待办
          bpmInstanceObject.bpmWithdrawPart.BpmWithdrawPartInitFunc(bpmInstanceObject, {
            data: item
          });
        }
      }
    },
    // 流程启动后
    afterStart: (bpmInstanceObject, result) => {
      bpmInstanceObject.bpmEditor.isStart = false;
      bpmInstanceObject.bpmModel.defineId = result.defineId;
      bpmInstanceObject.bpmModel.entryId = result.entryId;
      bpmInstanceObject.bpmModel.executionId = result.executionId;
      bpmInstanceObject.bpmModel.taskId = result.taskId;
      bpmInstanceObject.bpmModel.activityname = result.activityname;
    },
    // 获取表单权限数据
    controlFormInput: async bpmInstanceObject => {
      let parameter = {
        defineId: bpmInstanceObject.bpmModel.defineId,
        activityname: bpmInstanceObject.bpmModel.activityname
      };
      getFormSecuritys(parameter)
        .then(res => {
          if (res.success) {
            bpmInstanceObject.bpmEditor.formSecuritys = res.data;
          }
        })
        .catch(() => {});
    },
    setFlowButtons: (bpmInstanceObject, flowButtons) => {
      bpmInstanceObject.bpmEditor.flowButtons = flowButtons;
    },
    setIsButtonLoading: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmEditor.isButtonLoading = params;
      if (!params && bpmInstanceObject.bpmEditor.loadingSaveState) {
        bpmInstanceObject.bpmEditor.loadingSaveState = false;
      }
    },
    setLoadingSaveState: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmEditor.loadingSaveState = params;
    }
  },
  // 数据模板
  bpmModel: {
    formId: null,
    defineId: null,
    deploymentId: null,
    entryId: null,
    executionId: null,
    taskId: null,
    activityname: null,
    activitylabel: null,
    userIdentityKey: null,
    userIdentity: null,
    flowRefresh: false, // 刷新页面
    afterButtonsEvent: null, //按钮点击完成事件
    firstTaskName: null, // 流程起始任务节点
    lastTaskName: [], // 流程最后一个任务节点
    // 刷新页面方法
    flowRefreshFunc: bpmInstanceObject => {
      bpmInstanceObject.bpmModel.flowRefresh = !bpmInstanceObject.bpmModel.flowRefresh;
    },
    //创建流程对象
    createFlowModel(
      bpmInstanceObject,
      entryId = '',
      executionId,
      taskId,
      defineId,
      deploymentId,
      formId
    ) {
      if (!entryId) {
        new Error('流程实例ID不能空');
      }
      bpmInstanceObject.bpmModel.defineId = defineId;
      bpmInstanceObject.bpmModel.deploymentId = deploymentId;
      bpmInstanceObject.bpmModel.entryId = entryId;
      bpmInstanceObject.bpmModel.executionId = executionId;
      bpmInstanceObject.bpmModel.taskId = taskId;
      bpmInstanceObject.bpmModel.formId = formId;
    },
    //按钮点击后置事件
    afterButtons(bpmInstanceObject, afterButtonsEvent = null) {
      bpmInstanceObject.bpmModel.afterButtonsEvent = afterButtonsEvent;
    }
  },
  // 流程图
  bpmChart: {
    isShowBpmStepsOpTypeInfo: true
  },
  // 加签
  bpmAdduser: {
    data: {},
    enable: false,
    // 初始化
    BpmAdduserInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmAdduser.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmAdduser.data)) {
        bpmInstanceObject.bpmAdduser.enable = true;
      }
    },
    // 执行
    BpmAdduserExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmAdduser.data,
        submitFuncName: 'BpmAdduserSubmit'
      });
    },
    // 选人回调
    BpmAdduserSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      let usersInfo = JSON.parse(params.users);
      if (
        usersInfo.users[0].selectedUsers.some(item => item.userId === useUserStore().currentUser.id)
      ) {
        message.warning('不能给自己加签！');
        return;
      }
      dosupplementassignee({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        opType: 'doadduser'
      }).then(res => {
        if (bpmInstanceObject.bpmAdduser.data.callback) {
          bpmInstanceObject.bpmAdduser.data.callback(res);
        } else {
          if (res.success) {
            bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
            message.success('加签成功');
            try {
              //按钮点击后置事件
              bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                event: params.buttonData.event
              });
            } catch (e) {
              console.log(e);
            }
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          }
        }
      });
    }
  },
  // 帮助
  bpmButHelp: {
    data: null,
    enable: true,
    helpinfo: '',
    // 执行
    BpmButHelpExecute: bpmInstanceObject => {
      getTaskRemark({
        defineId: bpmInstanceObject.bpmModel.defineId,
        activityname: bpmInstanceObject.bpmModel.activityname
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmButHelp.helpinfo = res.data || '当前节点无描述';
        }
      });
    }
  },
  // 流程跟踪
  bpmButTrack: {
    butTrackVisible: false,
    // 执行
    BpmButTrackExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmButTrack.butTrackVisible = true;
    },
    // 关闭流程跟踪弹窗
    closeButTrackModal: bpmInstanceObject => {
      bpmInstanceObject.bpmButTrack.butTrackVisible = false;
    }
  },
  // 选人
  bpmCommonSelect: {
    selectVisible: false,
    buttonData: null, //按钮表单数据
    submitFuncName: '', //掉用点击事件
    beforeOpenSelect: false, //大选人前置事件
    defaultSelectUsers: null, // 默认选中用户
    isShowOpinion: true, //是否显示流程意见框
    isShowOpinionNode: true, //输入意见时，是否显示【节点信息】
    //打开流程选人
    openBpmCommonSelect: (bpmInstanceObject, data) => {
      if (bpmInstanceObject.bpmCommonSelect.selectVisible != true) {
        bpmInstanceObject.bpmCommonSelect.buttonData = data.buttonData;
        if (!bpmInstanceObject.bpmCommonSelect.buttonData.defineId) {
          bpmInstanceObject.bpmCommonSelect.buttonData.defineId =
            bpmInstanceObject.bpmModel.defineId;
        }
        if (!bpmInstanceObject.bpmCommonSelect.buttonData.executionId) {
          bpmInstanceObject.bpmCommonSelect.buttonData.executionId =
            bpmInstanceObject.bpmModel.executionId;
        }
        if (!bpmInstanceObject.bpmCommonSelect.buttonData.executionId) {
          bpmInstanceObject.bpmCommonSelect.buttonData.processInstanceId =
            bpmInstanceObject.bpmModel.processInstanceId;
        }
        bpmInstanceObject.bpmCommonSelect.submitFuncName = data.submitFuncName;
        if (data.defaultSelectUsers) {
          bpmInstanceObject.bpmCommonSelect.defaultSelectUsers = data.defaultSelectUsers;
        }
        if (typeof data.isShowOpinion != 'undefined') {
          bpmInstanceObject.bpmCommonSelect.isShowOpinion = data.isShowOpinion;
        }
        bpmInstanceObject.bpmCommonSelect.beforeOpenSelect = true;
        bpmInstanceObject.bpmCommonSelect.selectVisible = true;
      } else {
        bpmInstanceObject.bpmCommonSelect.buttonData = null;
        bpmInstanceObject.bpmCommonSelect.submitFuncName = null;
        bpmInstanceObject.bpmCommonSelect.selectVisible = false;
        bpmInstanceObject.bpmCommonSelect.isShowOpinion = true;
      }
    },
    //设置默认选中人
    setDefaultSelectUsers: (bpmInstanceObject, defaultSelectUsers) => {
      bpmInstanceObject.bpmCommonSelect.defaultSelectUsers = defaultSelectUsers;
    },
    //关闭流程选人
    closeBpmCommonSelect: bpmInstanceObject => {
      if (bpmInstanceObject.bpmCommonSelect.selectVisible == true) {
        bpmInstanceObject.bpmCommonSelect.buttonData = null;
        bpmInstanceObject.bpmCommonSelect.submitFuncName = null;
        bpmInstanceObject.bpmCommonSelect.selectVisible = false;
      }
    },
    //设置流程意见框是否可见
    setShowOpinion: (bpmInstanceObject, isShowOpinion) => {
      bpmInstanceObject.bpmCommonSelect.isShowOpinion = isShowOpinion;
    }
  },
  // 跳转流程详情页面多个任务选择打开的任务操作
  bpmDetailSelect: {
    data: [],
    flowDetailUrl: '',
    // 打开流程详情跳转选择
    openFlowDetailSelect: (bpmInstanceObject, data) => {
      bpmInstanceObject.bpmDetailSelect.data = data.data;
      bpmInstanceObject.bpmDetailSelect.flowDetailUrl = data.flowDetailUrl;
    }
  },
  // 关注工作
  bpmFocus: {
    data: {},
    enable: false,
    // 初始化
    BpmFocusInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmFocus.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmFocus.data)) {
        bpmInstanceObject.bpmFocus.enable = true;
      }
    },
    // 执行
    BpmFocusExecute: (bpmInstanceObject, params) => {
      setFocusedTask({
        processInstanceId: bpmInstanceObject.bpmModel.entryId,
        dbid: bpmInstanceObject.bpmModel.taskId
      })
        .then(res => {
          if (res.success) {
            if (res.data == false) {
              message.success('该任务此前已被关注');
            } else {
              message.success('已成功关注该任务');
            }
          }
          if (params?.callback) {
            params.callback();
          }
        })
        .catch(() => {
          if (params?.callback) {
            params.callback();
          }
        });
    }
  },
  // 流程结束
  bpmGlobalend: {
    data: {},
    enable: false,
    // 初始化
    BpmGlobalendInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmGlobalend.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmGlobalend.data)) {
        bpmInstanceObject.bpmGlobalend.enable = true;
      }
    },
    // 执行
    BpmGlobalendExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmGlobalend.data,
        submitFuncName: 'BpmGlobalendSubmit'
      });
    },
    // 选人回调
    BpmGlobalendSubmit: (bpmInstanceObject, params) => {
      doend({
        executionId: params.buttonData.executionId,
        message: JSON.parse(params.users).idea
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success(
            '操作成功！表单将自动关闭',
            2,
            function () {
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.closeWindow(null, params.buttonData?.viewCode);
              setTimeout(function () {
                bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              }, 500);
            },
            true
          );
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  },
  // 意见修改
  bpmGlobalidea: {
    data: {},
    enable: false,
    globalideaVisible: false,
    // 初始化
    BpmGlobalideaInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmGlobalidea.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmGlobalidea.data)) {
        bpmInstanceObject.bpmGlobalidea.enable = true;
      }
    },
    // 执行
    BpmGlobalideaExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmGlobalidea.globalideaVisible = true;
    },
    // 关闭意见修改弹窗
    closeGlobalideaModal: bpmInstanceObject => {
      bpmInstanceObject.bpmGlobalidea.globalideaVisible = false;
    }
  },
  // 流程跳转
  bpmGlobaljump: {
    data: {},
    enable: false,
    // 初始化
    BpmGlobaljumpInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmGlobaljump.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmGlobaljump.data)) {
        bpmInstanceObject.bpmGlobaljump.enable = true;
      }
    },
    // 执行
    BpmGlobaljumpExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmNodeSelect.OpenFlowNodeSelectModal(bpmInstanceObject, {
        type: bpmInstanceObject.bpmGlobaljump.data.event,
        title: '跳转节点选择'
      });
    },
    // 选择流程节点回调
    BpmGlobaljumpCallback: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmNodeSelect.closeFlowNodeSelectModal(bpmInstanceObject);
      let data = JSON.parse(JSON.stringify(bpmInstanceObject.bpmGlobaljump.data));
      if (bpmUtils.notNull(params.executionId)) {
        data.executionId = params.executionId;
      }
      data.targetActivityName = params.activityName;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: data,
        submitFuncName: 'BpmGlobaljumpSubmit'
      });
    },
    // 选人回调
    BpmGlobaljumpSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length == 0) {
        message.warning('选人错误');
        return;
      }
      dojump({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        activityName: params.buttonData.targetActivityName
      }).then(res => {
        if (bpmInstanceObject.bpmGlobaljump.data.callback) {
          bpmInstanceObject.bpmGlobaljump.data.callback(res);
        } else {
          if (res.success) {
            bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
            message.success(
              '跳转成功！表单将自动关闭',
              2,
              function () {
                // 电子表单流程刷新父页面需要唯一视图编码标识
                bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
                setTimeout(function () {
                  bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
                }, 500);
              },
              true
            );
            try {
              //按钮点击后置事件
              bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                event: params.buttonData.event
              });
            } catch (e) {
              console.log(e);
            }
          }
        }
      });
    }
  },
  // 流程恢复
  bpmGlobalresume: {
    data: {},
    enable: false,
    // 初始化
    BpmGlobalresumeInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmGlobalresume.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmGlobalresume.data)) {
        bpmInstanceObject.bpmGlobalresume.enable = true;
      }
    },
    // 执行
    BpmGlobalresumeExecute: (bpmInstanceObject, params) => {
      Modal.confirm({
        title: '您确定恢复该流程吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          doresume({
            processInstanceId: bpmInstanceObject.bpmGlobalresume.data.procinstDbid
          }).then(res => {
            if (res.success) {
              message.success('操作成功');
              try {
                //按钮点击后置事件
                bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                  event: bpmInstanceObject.bpmGlobalresume.data.event
                });
              } catch (e) {
                console.log(e);
              }
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.refreshBack(null, params.data?.viewCode);
            }
          });
        }
      });
    }
  },
  // 流程暂停
  bpmGlobalsuspend: {
    data: {},
    enable: false,
    // 初始化
    BpmGlobalsuspendInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmGlobalsuspend.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmGlobalsuspend.data)) {
        bpmInstanceObject.bpmGlobalsuspend.enable = true;
      }
    },
    // 执行
    BpmGlobalsuspendExecute: (bpmInstanceObject, params) => {
      Modal.confirm({
        title: '您确定暂停该流程吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          dosuspend({
            processInstanceId: bpmInstanceObject.bpmGlobalsuspend.data.procinstDbid
          }).then(res => {
            if (res.success) {
              message.success('操作成功！');
              try {
                //按钮点击后置事件
                bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                  event: bpmInstanceObject.bpmGlobalsuspend.data.event
                });
              } catch (e) {
                console.log(e);
              }
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.refreshBack(null, params.data?.viewCode);
            }
          });
        }
      });
    }
  },
  // 选择流程节点
  bpmNodeSelect: {
    flowNodeSelectVisible: false,
    type: '',
    title: '',
    // 打开选择流程节点弹窗
    OpenFlowNodeSelectModal: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmNodeSelect.type = params.type;
      bpmInstanceObject.bpmNodeSelect.title = params.title;
      bpmInstanceObject.bpmNodeSelect.flowNodeSelectVisible = true;
    },
    // 关闭选择流程节点弹窗
    closeFlowNodeSelectModal: bpmInstanceObject => {
      bpmInstanceObject.bpmNodeSelect.type = '';
      bpmInstanceObject.bpmNodeSelect.title = '';
      bpmInstanceObject.bpmNodeSelect.flowNodeSelectVisible = false;
    }
  },
  // 发送催办
  bpmPresstodo: {
    data: {},
    enable: false,
    // 初始化
    BpmPresstodoInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmPresstodo.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmPresstodo.data)) {
        bpmInstanceObject.bpmPresstodo.enable = true;
      }
    },
    // 执行
    BpmPresstodoExecute: bpmInstanceObject => {
      beforepresstodo({
        executionId: bpmInstanceObject.bpmPresstodo.data.executionId
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmPresstodo.presstodo(bpmInstanceObject, res.data);
        }
      });
    },
    // 执行
    presstodo: (bpmInstanceObject, result) => {
      let msg = '';
      if (result.flg == 'true') {
        msg = '确定对下一节点进行催办吗？' + result.msg;
      } else {
        msg = '下一节点在' + result.time + '被催办过，确定继续进行催办吗？' + result.msg;
      }
      const msgs = msg.split('<br/>');
      const msgList = [];
      msgs.forEach(element => {
        msgList.push(h('p', element));
      });
      Modal.confirm({
        title: '提示',
        content: h('div', { style: 'max-height: 150px;overflow: auto' }, msgList),
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          dopresstodo({
            executionId: bpmInstanceObject.bpmPresstodo.data.executionId
          }).then(res => {
            if (res.success) {
              message.success('催办成功');
              try {
                //按钮点击后置事件
                bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                  event: bpmInstanceObject.bpmPresstodo.data.event
                });
              } catch (e) {
                console.log(e);
              }
            }
          });
        }
      });
    }
  },
  // 流程退回,包括退回上一步、退回拟稿人、任意退回、跨节点退回
  bpmRetreat: {
    data: {},
    enable: false,
    doretreattodraft: '',
    doretreattoprev: '',
    doretreattowant: '',
    doretreattoactivity: '',
    isDoretreattodraftAutoSave: null, // 是否自动保存 留出流程详情页配置的口
    isDoretreattoprevAutoSave: null, // 是否自动保存 留出流程详情页配置的口
    isDoretreattowantAutoSave: null, // 是否自动保存 留出流程详情页配置的口
    isDoretreattoactivityAutoSave: null, // 是否自动保存 留出流程详情页配置的口
    // 初始化
    BpmRetreatInitFunc: (bpmInstanceObject, params) => {
      if (params.data.event === 'doretreattodraft') {
        // 退回拟稿人
        bpmInstanceObject.bpmRetreat.doretreattodraft = params.data;
      } else if (params.data.event === 'doretreattoprev') {
        // 退回上一步
        bpmInstanceObject.bpmRetreat.doretreattoprev = params.data;
      } else if (params.data.event === 'doretreattowant') {
        // 任意退回
        bpmInstanceObject.bpmRetreat.doretreattowant = params.data;
      } else if (params.data.event === 'doretreattoactivity') {
        // 跨节点退回
        bpmInstanceObject.bpmRetreat.doretreattoactivity = params.data;
      }
      if (
        bpmUtils.notNull(bpmInstanceObject.bpmRetreat.doretreattodraft) ||
        bpmUtils.notNull(bpmInstanceObject.bpmRetreat.doretreattoprev) ||
        bpmUtils.notNull(bpmInstanceObject.bpmRetreat.doretreattowant) ||
        bpmUtils.notNull(bpmInstanceObject.bpmRetreat.doretreattoactivity)
      ) {
        bpmInstanceObject.bpmRetreat.enable = true;
      }
    },
    // 执行 退回拟稿人
    executeTodraft: (bpmInstanceObject, params) => {
      // 自动保存
      // if (bpmInstanceObject.bpmSave.enable) {
      if (
        (bpmInstanceObject.bpmRetreat.isDoretreattodraftAutoSave == null &&
          bpmInstanceObject.bpmSave.enable) ||
        (bpmInstanceObject.bpmRetreat.isDoretreattodraftAutoSave != null &&
          bpmInstanceObject.bpmRetreat.isDoretreattodraftAutoSave == true)
      ) {
        params.save({
          callback(startResult) {
            bpmInstanceObject.bpmRetreat.executeTodraftBack(bpmInstanceObject);
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          }
        });
      } else {
        bpmInstanceObject.bpmRetreat.executeTodraftBack(bpmInstanceObject);
      }
    },
    // 执行
    executeTodraftBack: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmRetreat.doretreattodraft,
        submitFuncName: 'executeTodraftSubmit'
      });
    },
    // 选人回调 退回拟稿人
    executeTodraftSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dobacktofirst({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success(
            '退回成功！表单将自动关闭',
            2,
            function () {
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
              setTimeout(function () {
                bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              }, 500);
            },
            true
          );
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    },
    // 执行 退回上一步
    executeToprev: (bpmInstanceObject, params) => {
      // 自动保存
      if (
        (bpmInstanceObject.bpmRetreat.isDoretreattoprevAutoSave == null &&
          bpmInstanceObject.bpmSave.enable) ||
        (bpmInstanceObject.bpmRetreat.isDoretreattoprevAutoSave != null &&
          bpmInstanceObject.bpmRetreat.isDoretreattoprevAutoSave == true)
      ) {
        params.save({
          callback(startResult) {
            bpmInstanceObject.bpmRetreat.executeToprevBack(bpmInstanceObject);
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          }
        });
      } else {
        bpmInstanceObject.bpmRetreat.executeToprevBack(bpmInstanceObject);
      }
    },
    // 执行
    executeToprevBack: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmRetreat.doretreattoprev,
        submitFuncName: 'executeToprevSubmit'
      });
    },
    // 选人回调 退回上一步
    executeToprevSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dobacktoprev({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success(
            '退回成功！表单将自动关闭',
            2,
            function () {
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
              setTimeout(function () {
                bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              }, 500);
            },
            true
          );
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    },
    // 执行 任意退回
    executeTowant: (bpmInstanceObject, params) => {
      // 自动保存
      // if (bpmInstanceObject.bpmSave.enable) {
      if (
        (bpmInstanceObject.bpmRetreat.isDoretreattowantAutoSave == null &&
          bpmInstanceObject.bpmSave.enable) ||
        (bpmInstanceObject.bpmRetreat.isDoretreattowantAutoSave != null &&
          bpmInstanceObject.bpmRetreat.isDoretreattowantAutoSave == true)
      ) {
        params.save({
          callback(startResult) {
            bpmInstanceObject.bpmRetreat.executeTowantSelectTask(bpmInstanceObject);
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          }
        });
      } else {
        bpmInstanceObject.bpmRetreat.executeTowantSelectTask(bpmInstanceObject);
      }
    },
    // 执行
    executeTowantSelectTask: bpmInstanceObject => {
      bpmInstanceObject.bpmNodeSelect.OpenFlowNodeSelectModal(bpmInstanceObject, {
        type: bpmInstanceObject.bpmRetreat.doretreattowant.event,
        title: '任意退回节点选择'
      });
    },
    // 选择流程节点回调
    executeTowantCallback: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmNodeSelect.closeFlowNodeSelectModal(bpmInstanceObject);
      let data = JSON.parse(JSON.stringify(bpmInstanceObject.bpmRetreat.doretreattowant));
      data.targetActivityName = params.activityName;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: data,
        submitFuncName: 'executeTowantSubmit'
      });
    },
    // 选人回调 任意退回
    executeTowantSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dobacktowant({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        activityName: params.buttonData.targetActivityName
      }).then(res => {
        bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
        message.success(
          '退回成功！表单将自动关闭',
          2,
          function () {
            // 电子表单流程刷新父页面需要唯一视图编码标识
            bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
            setTimeout(function () {
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
            }, 500);
          },
          true
        );
      });
      try {
        //按钮点击后置事件
        bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
          event: params.buttonData.event
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 执行 跨节点退回
    executeToactivity: (bpmInstanceObject, params) => {
      // 自动保存
      // if (bpmInstanceObject.bpmSave.enable) {
      if (
        (bpmInstanceObject.bpmRetreat.isDoretreattoactivityAutoSave == null &&
          bpmInstanceObject.bpmSave.enable) ||
        (bpmInstanceObject.bpmRetreat.isDoretreattoactivityAutoSave != null &&
          bpmInstanceObject.bpmRetreat.isDoretreattoactivityAutoSave == true)
      ) {
        params.save({
          callback(startResult) {
            bpmInstanceObject.bpmRetreat.executeToactivityBack(bpmInstanceObject, {
              targetActivityName: params.data.targetName
            });
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          }
        });
      } else {
        bpmInstanceObject.bpmRetreat.executeToactivityBack(bpmInstanceObject, {
          targetActivityName: params.data.targetName
        });
      }
    },
    // 执行
    executeToactivityBack: (bpmInstanceObject, params) => {
      let data = JSON.parse(JSON.stringify(bpmInstanceObject.bpmRetreat.doretreattoactivity));
      data.targetActivityName = params.targetActivityName;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: data,
        submitFuncName: 'executeToactivitySubmit'
      });
    },
    // 选人回调
    executeToactivitySubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dobacktoactivity({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        activityName: params.buttonData.targetActivityName
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success(
            '退回成功！表单将自动关闭',
            2,
            function () {
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
              setTimeout(function () {
                bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              }, 500);
            },
            true
          );
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  },
  // 保存
  bpmSave: {
    data: {},
    enable: false,
    // 初始化
    BpmSaveInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmSave.data = params.data;
      if (bpmInstanceObject.bpmEditor.isStart || bpmUtils.notNull(bpmInstanceObject.bpmSave.data)) {
        bpmInstanceObject.bpmSave.enable = true;
      }
    },
    // 执行
    BpmSaveExecute: (bpmInstanceObject, params) => {
      {
        if (bpmInstanceObject.bpmEditor.isStart) {
          params.start({
            defineId: bpmInstanceObject.bpmModel.defineId,
            callback(startResult) {
              message.success('暂存成功');
              bpmInstanceObject.bpmEditor.afterStart(bpmInstanceObject, startResult);
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.refreshBack(null, params.data?.viewCode);
            }
          });
        } else {
          params.save({
            callback() {
              message.success('暂存成功');
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.refreshBack(null, params.data?.viewCode);
            }
          });
        }
      }
    }
  },
  // 选择流程委托处理人
  bpmSelectWorkHandUser: {
    selectWorkHandUserVisible: false,
    // 打开选择流程委托处理人弹窗
    openSelectWorkHandUserModal: bpmInstanceObject => {
      bpmInstanceObject.bpmSelectWorkHandUser.selectWorkHandUserVisible = true;
    },
    // 关闭选择流程委托处理人弹窗
    closeSelectWorkHandUserModal: bpmInstanceObject => {
      bpmInstanceObject.bpmSelectWorkHandUser.selectWorkHandUserVisible = false;
    }
  },
  // 发起子流程
  bpmStartsubflow: {
    data: {},
    enable: false,
    startsubflowVisible: false,
    isShowAllFlowModel: false,
    isShowFlowNameForm: false,
    allFlowModelData: [],
    selectedFlowModelData: [],
    // 初始化
    BpmStartsubflowInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmStartsubflow.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmStartsubflow.data)) {
        bpmInstanceObject.bpmStartsubflow.enable = true;
      }
    },
    // 执行 （暂弃）
    BpmStartsubflowExecute: bpmInstanceObject => {
      getSubPdId({
        procinstDbid: bpmInstanceObject.bpmStartsubflow.data.procinstDbid,
        executionId: bpmInstanceObject.bpmStartsubflow.data.executionId
      }).then(res => {
        if (res.success) {
          if (res.data.length === 0) {
            //默认展示所有流程模板
            bpmInstanceObject.bpmStartsubflow.showAllFlowModel(bpmInstanceObject);
          } else if (res.data.length === 1) {
            // 直接跳选人
            bpmInstanceObject.bpmStartsubflow.executeUserInfo(bpmInstanceObject, res.data[0].id);
          } else {
            // 展示配置的模板
            bpmInstanceObject.bpmStartsubflow.executeSelectId(bpmInstanceObject, res.data);
          }
        }
      });
    },
    // （暂弃）
    showAllFlowModel: bpmInstanceObject => {
      // 所有的模板
      bpmInstanceObject.bpmStartsubflow.isShowAllFlowModel = true;
      processStartView({}).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmStartsubflow.allFlowModelData = res.data;
        }
      });
      bpmInstanceObject.bpmStartsubflow.startsubflowVisible = true;
    },
    executeSelectId: (bpmInstanceObject, ids) => {
      // 配置的模板
      bpmInstanceObject.bpmStartsubflow.isShowAllFlowModel = false;
      bpmInstanceObject.bpmStartsubflow.selectedFlowModelData = ids;
      bpmInstanceObject.bpmStartsubflow.startsubflowVisible = true;
    },
    executeUserInfo: (bpmInstanceObject, id, name, version) => {
      // 如果有模板弹窗,则关闭
      if (bpmInstanceObject.bpmStartsubflow.startsubflowVisible) {
        bpmInstanceObject.bpmStartsubflow.startsubflowVisible = false;
      }
      bpmInstanceObject.bpmStartsubflow.data.deployId = id;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmStartsubflow.data,
        submitFuncName: 'BpmStartsubflowSubmit'
      });

      // bpmInstanceObject.bpmStartsubflow.data.deployName = name;
      // bpmInstanceObject.bpmStartsubflow.data.version = version; // 发起子流程-显示选择的流程模型版本
      // // 发起子流程前 先收集流程实例名称
      // bpmInstanceObject.bpmStartsubflow.isShowFlowNameForm = true;
    },
    // 选人回调
    BpmStartsubflowSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dostartsubprocess({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        id: params.buttonData.deployId
        // processInstanceName: params.buttonData.processInstanceName
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success('操作成功！');
          bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          bpmUtils.refreshBack();
        }
      });
    },
    // 关闭发起子流程弹窗
    closeStartsubflowModal: bpmInstanceObject => {
      bpmInstanceObject.bpmStartsubflow.startsubflowVisible = false;
    }
  },
  // 自定义选人
  bpmStepuserdefined: {
    data: {},
    enable: false,
    // 初始化
    BpmStepuserdefinedInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmStepuserdefined.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmStepuserdefined.data)) {
        bpmInstanceObject.bpmStepuserdefined.enable = true;
      }
    },
    // 执行
    BpmStepuserdefinedExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmNodeSelect.OpenFlowNodeSelectModal(bpmInstanceObject, {
        type: bpmInstanceObject.bpmStepuserdefined.data.event,
        title: '自定义审批人'
      });
    },
    // 选择流程节点回调
    BpmStepuserdefinedCallback: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmNodeSelect.closeFlowNodeSelectModal(bpmInstanceObject);
      let data = JSON.parse(JSON.stringify(bpmInstanceObject.bpmStepuserdefined.data));
      data.activityName = params.activityName;
      data.targetActivityName = params.activityName;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: data,
        submitFuncName: 'BpmStepuserdefinedSubmit'
      });
    },
    // 选人回调
    BpmStepuserdefinedSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      console.log(params, '---params------');
      douserdefined({
        procinstDbid: params.buttonData.procinstDbid,
        userJson: params.users,
        //selectUserIds: params.users,
        activityName: params.buttonData.activityName
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success('操作成功');
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  },
  // 提交
  bpmSubmit: {
    data: {},
    enable: false,
    isAutoClickAfterStart: false, // 是否是启动流程后的自动点击事件
    // 初始化
    BpmSubmitInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmSubmit.data = params.data;
      if (
        bpmInstanceObject.bpmEditor.isStart ||
        bpmUtils.notNull(bpmInstanceObject.bpmSubmit.data)
      ) {
        bpmInstanceObject.bpmSubmit.enable = true;
      }
    },
    // 执行
    BpmSubmitExecute: (bpmInstanceObject, params) => {
      if (params.data) {
        bpmInstanceObject.bpmSubmit.outcome = params.data.name;
      }
      if (bpmInstanceObject.bpmEditor.isStart) {
        params.start({
          defineId: bpmInstanceObject.bpmModel.defineId,
          callback(startResult) {
            bpmInstanceObject.bpmEditor.afterStart(bpmInstanceObject, startResult);
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject, { flg: true });
            // 电子表单流程刷新父页面需要唯一视图编码标识
            bpmUtils.refreshBack(null, params.data?.viewCode);
          }
        });
      } else {
        // 自动保存
        if (
          !bpmInstanceObject.bpmSubmit.isAutoClickAfterStart &&
          bpmInstanceObject.bpmSubmit.enable
        ) {
          params.save({
            callback() {
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject, {
                flg: true,
                outcome: params.data.name
              });
            }
          });
        } else {
          bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
            buttonData: params.data,
            submitFuncName: 'BpmSubmitSubmit'
          });
        }
      }
    },
    // 选人回调
    BpmSubmitSubmit: (bpmInstanceObject, params) => {
      dosubmit({
        userJson: params.users,
        instanceId: params.buttonData.procinstDbid,
        taskId: params.buttonData.taskId,
        outcome: params.buttonData.name,
        formJson: '',
        uflowDealType: '',
        isUflow: false
      })
        .then(res => {
          if (res.success) {
            bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
            message.success('提交成功！表单将自动关闭', 2, function () {
              // 电子表单流程刷新父页面需要唯一视图编码标识
              bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
              setTimeout(function () {
                bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
              }, 500);
            });
            try {
              //按钮点击后置事件
              bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                event: params.buttonData.event
              });
            } catch (e) {
              console.log(e);
            }
          } else {
            message.error('提交失败！', 2);
          }
        })
        .catch(error => {
          // 【7643】流程提交选人选择1500用户进行提交，30秒超时 界面无任何响应
          if (error?.message?.indexOf('timeout of') !== -1) {
            // 超时
            message.error('连接超时！', 2);
            bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          } else {
            message.error('提交失败！', 2);
          }
        });
    },
    // 流程启动之后自动点击一次提交按钮,或者触发保存之后再来调用提交
    clickBut: (bpmInstanceObject, outcome) => {
      if (bpmInstanceObject.bpmSubmit.enable) {
        let buttonsArray = bpmInstanceObject.bpmEditor.flowButtons;
        let submitButtonsArray = [];
        let submitButtonNum = 0;
        for (let i = 0; i < buttonsArray.length; i++) {
          if (buttonsArray[i].event === 'dosubmit') {
            submitButtonsArray.push(buttonsArray[i]);
            submitButtonNum += 1;
          }
        }
        if (bpmUtils.notNull(outcome)) {
          if (submitButtonNum > 0) {
            for (let i = 0; i < submitButtonsArray.length; i++) {
              if (submitButtonsArray[i].name === outcome) {
                bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
                  buttonData: submitButtonsArray[i],
                  submitFuncName: 'BpmSubmitSubmit'
                });
                return;
              }
            }
          }
          message.warning('路由条件可能已经发生变化，请重新进行提交');
        } else {
          if (submitButtonNum > 1) {
            message.success('流程已创建，请选择一个分支进行提交');
          } else if (submitButtonNum > 0) {
            bpmInstanceObject.bpmSubmit.isAutoClickAfterStart = true;
            try {
              bpmInstanceObject.bpmSubmit.BpmSubmitExecute(bpmInstanceObject, {
                data: submitButtonsArray[0]
              });
            } catch (e) {
              bpmInstanceObject.bpmSubmit.isAutoClickAfterStart = false;
            }
            bpmInstanceObject.bpmSubmit.isAutoClickAfterStart = false;
          } else if (submitButtonNum == 0) {
            //【7040】拟稿节点点击提交，路由条件不满足给出提示
            message.warning('路由条件可能已经发生变化，请重新进行提交');
          }
        }
      }
    }
  },
  // 流程转办
  bpmSupersede: {
    data: {},
    enable: false,
    // 初始化
    BpmSupersedeInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmSupersede.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmSupersede.data)) {
        bpmInstanceObject.bpmSupersede.enable = true;
      }
    },
    // 执行
    BpmSupersedeExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmSupersede.data,
        submitFuncName: 'BpmSupersedeSubmit'
      });
    },
    // 选人回调
    BpmSupersedeSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dosupersede({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        selectUserId: null,
        formJson: null,
        activityName: params.buttonData.targetActivityName
      })
        .then(res => {
          if (res.success) {
            bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
            message.success(
              '操作成功！表单将自动关闭',
              2,
              function () {
                // 电子表单流程刷新父页面需要唯一视图编码标识
                bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
                setTimeout(function () {
                  bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
                }, 500);
              },
              true
            );
            try {
              //按钮点击后置事件
              bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                event: params.buttonData.event
              });
            } catch (e) {
              console.log(e);
            }
          }
        })
        .catch(e => message.error(e.message));
    }
  },
  // 补发
  bpmSupplement: {
    data: {},
    enable: false,
    // 初始化
    BpmSupplementInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmSupplement.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmSupplement.data)) {
        bpmInstanceObject.bpmSupplement.enable = true;
      }
    },
    // 执行
    BpmSupplementExecute: bpmInstanceObject => {
      getcoordinate({
        processInstanceId: bpmInstanceObject.bpmSupplement.data.procinstDbid
      }).then(res => {
        if (res.success) {
          if (bpmUtils.notNull(res.data)) {
            for (let key in res.data) {
              let activity = res.data[key];
              let activityName = activity.activityName;
              let isCurrent = activity.isCurrent;
              let executionId = activity.executionId;
              let isAlone = activity.executionAlone;
              // 只有一个当前节点时候补发操作和拿回操作自动处理
              if (isAlone && isCurrent == 'true') {
                bpmInstanceObject.bpmSupplement.BpmSupplementCallback(bpmInstanceObject, {
                  executionId,
                  activityName
                });
                return;
              }
            }
            bpmInstanceObject.bpmNodeSelect.OpenFlowNodeSelectModal(bpmInstanceObject, {
              type: bpmInstanceObject.bpmSupplement.data.event,
              title: '补发节点选择'
            });
          }
        }
      });
    },
    // 选择流程节点回调
    BpmSupplementCallback: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmNodeSelect.closeFlowNodeSelectModal(bpmInstanceObject);
      let data = JSON.parse(JSON.stringify(bpmInstanceObject.bpmSupplement.data));
      data.executionId = params.executionId;
      data.targetActivityName = params.activityName;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: data,
        submitFuncName: 'BpmSupplementSubmit'
      });
    },
    // 选人回调
    BpmSupplementSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dosupplementassignee({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        opType: 'dosupplement'
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success('补发成功');
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
          bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
        }
      });
    }
  },
  // 流程tabs页签
  bpmTabs: {
    tabsVisible: false,
    tabs: [],
    showTabs: [],
    originalTabs: [],
    setBpmOriginalTabs: (bpmInstanceObject, list) => {
      bpmInstanceObject.bpmTabs.originalTabs = JSON.parse(JSON.stringify(list));
    },
    //获取流程标签
    getBpmTabs: async bpmInstanceObject => {
      let res = await bpmUtils.getBpmTabs();
      if (res.success) {
        // 字符串数据，暂时无用
        bpmInstanceObject.bpmTabs.originalTabs = JSON.parse(JSON.stringify(res.data));
        bpmInstanceObject.bpmTabs.tabs = res.data;
        let arr = [];
        arr.push(res.data.slice(0)[0]);
        bpmInstanceObject.bpmTabs.showTabs = res.data;
      } else {
        message.error('获取流程页签失败!');
      }
    },
    showAllTabs: bpmInstanceObject => {
      bpmInstanceObject.bpmTabs.showTabs = bpmInstanceObject.bpmTabs.tabs;
    },
    // 获取流程导航类型
    getBpmNavbarType: async bpmInstanceObject => {
      let res = await bpmUtils.getBpmNavbarType();
      if (res.success) {
        if (res.data == '1') {
          bpmInstanceObject.bpmTabs.tabsVisible = true;
        } else {
          bpmInstanceObject.bpmTabs.tabsVisible = false;
        }
      } else {
        message.error('获取流程页签失败!');
      }
    }
  },
  // 增加读者
  bpmTaskreader: {
    data: {},
    enable: false,
    // 初始化
    BpmTaskreaderInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmTaskreader.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmTaskreader.data)) {
        bpmInstanceObject.bpmTaskreader.enable = true;
      }
    },
    // 执行
    BpmTaskreaderExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmTaskreader.data,
        submitFuncName: 'BpmTaskreaderSubmit'
      });
    },
    // 选人回调
    BpmTaskreaderSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dotaskreader({
        procinstDbid: params.buttonData.procinstDbid,
        taskId: params.buttonData.taskId,
        userJson: params.users
      }).then(res => {
        if (bpmInstanceObject.bpmTaskreader.data.callback) {
          bpmInstanceObject.bpmTaskreader.data.callback(res);
        } else {
          if (res.success) {
            bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
            message.success('操作成功');
            try {
              //按钮点击后置事件
              bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                event: params.buttonData.event
              });
            } catch (e) {
              console.log(e);
            }
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          }
        }
      });
    }
  },
  // 发送阅知 即流程转发
  bpmTransmit: {
    data: {},
    enable: false,
    // 初始化
    BpmTransmitInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmTransmit.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmTransmit.data)) {
        bpmInstanceObject.bpmTransmit.enable = true;
      }
    },
    // 执行
    BpmTransmitExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmTransmit.data,
        submitFuncName: 'BpmTransmitSubmit'
      });
    },
    // 选人回调
    BpmTransmitSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        bpmUtils.warning('选人错误');
        return;
      }
      dotransmit({
        procinstDbid: params.buttonData.procinstDbid,
        taskId: params.buttonData.taskId,
        userJson: params.users
      }).then(res => {
        if (bpmInstanceObject.bpmTransmit.data.callback) {
          bpmInstanceObject.bpmTransmit.data.callback(res);
        } else {
          if (res.success) {
            bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
            message.success('操作成功');
            try {
              //按钮点击后置事件
              bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                event: params.buttonData.event
              });
            } catch (e) {
              console.log(e);
            }
            bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
          }
        }
      });
    }
  },
  // 已阅
  bpmTransmitSubmit: {
    data: {},
    enable: false,
    // 初始化
    BpmTransmitSubmitInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmTransmitSubmit.data = params.data;
      if (
        bpmInstanceObject.bpmEditor.isStart ||
        bpmUtils.notNull(bpmInstanceObject.bpmTransmitSubmit.data)
      ) {
        bpmInstanceObject.bpmTransmitSubmit.enable = true;
      }
    },
    // 完成传阅
    BpmTransmitSubmitExecute: bpmInstanceObject => {
      // 【7384】【7385】我的待阅，在流程详情页操作"已阅"提示更改问题
      // Modal.confirm({
      //   title: '确定标记为已阅吗？',
      //   okText: "确定",
      //   cancelText: "取消",
      //   onOk: () => {
      //     bpmInstanceObject.bpmTransmitSubmit.transmitSubmit(bpmInstanceObject);
      //   }
      // });
      // 【9305】已阅按钮，点击后弹出的应该是意见输入框
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmTransmitSubmit.data,
        submitFuncName: 'transmitSubmit'
      });
    },
    // 执行
    transmitSubmit: (bpmInstanceObject, params) => {
      dosubmitTransmit({
        instanceId: bpmInstanceObject.bpmTransmitSubmit.data.procinstDbid,
        // message: '已阅',
        message: JSON.parse(params.users).idea,
        taskId: bpmInstanceObject.bpmTransmitSubmit.data.taskId
      }).then(res => {
        if (res.success) {
          message.success('提交成功！表单将自动关闭', 2, function () {
            // 电子表单流程刷新父页面需要唯一视图编码标识
            bpmUtils.closeWindow(
              bpmInstanceObject.bpmTransmitSubmit.data.procinstDbid,
              bpmInstanceObject.bpmTransmitSubmit.buttonData?.viewCode
            );
            setTimeout(function () {
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
            }, 500);
          });
        }
      });
    }
  },
  // 拿回
  bpmWithdraw: {
    data: {},
    enable: false,
    // 初始化
    BpmWithdrawInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmWithdraw.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmWithdraw.data)) {
        bpmInstanceObject.bpmWithdraw.enable = true;
      }
    },
    // 执行
    BpmWithdrawExecute: bpmInstanceObject => {
      getcoordinate({
        processInstanceId: bpmInstanceObject.bpmWithdraw.data.procinstDbid
      }).then(res => {
        if (res.success) {
          if (bpmUtils.notNull(res.data)) {
            for (let key in res.data) {
              let activity = res.data[key];
              let activityName = activity.activityName;
              let isCurrent = activity.isCurrent;
              let executionId = activity.executionId;
              let isAlone = activity.executionAlone;
              // 只有一个当前节点时候补发操作和拿回操作自动处理
              if (isAlone && isCurrent == 'true') {
                bpmInstanceObject.bpmWithdraw.BpmWithdrawCallback(bpmInstanceObject, {
                  executionId,
                  activityName
                });
                return;
              }
            }
            bpmInstanceObject.bpmNodeSelect.OpenFlowNodeSelectModal(bpmInstanceObject, {
              type: bpmInstanceObject.bpmWithdraw.data.event,
              title: '拿回节点选择'
            });
          }
        }
      });
    },
    // 选择流程节点回调
    BpmWithdrawCallback: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmNodeSelect.closeFlowNodeSelectModal(bpmInstanceObject);
      let data = JSON.parse(JSON.stringify(bpmInstanceObject.bpmWithdraw.data));
      //循环节点中的拿回传入的executionId不准确
      // 这里注释掉,正常的拿回会有问题
      data.executionId = params.executionId;
      data.targetActivityName = params.activityName;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: data,
        submitFuncName: 'BpmWithdrawSubmit'
      });
    },
    // 选人回调
    BpmWithdrawSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dowithdrawcurract({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success('拿回成功！表单将自动关闭', 2, function () {
            // 电子表单流程刷新父页面需要唯一视图编码标识
            bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
            setTimeout(function () {
              bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
            }, 500);
          });
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  },
  // 减签
  bpmWithdrawassignee: {
    data: {},
    enable: false,
    // 初始化
    BpmWithdrawassigneeInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmWithdrawassignee.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmWithdrawassignee.data)) {
        bpmInstanceObject.bpmWithdrawassignee.enable = true;
      }
    },
    // 执行
    BpmWithdrawassigneeExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmWithdrawassignee.data,
        submitFuncName: 'BpmWithdrawassigneeSubmit'
      });
    },
    // 选人回调
    BpmWithdrawassigneeSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        bpmUtils.warning('选人错误');
        return;
      }
      dowithdrawactassignee({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success('减签成功');
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
          bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
        }
      });
    }
  },
  // 加签并提交
  bpmAdduserAndSubmit: {
    data: {},
    enable: false,
    // 初始化
    BpmAdduserAndSubmitInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmAdduserAndSubmit.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmAdduserAndSubmit.data)) {
        bpmInstanceObject.bpmAdduserAndSubmit.enable = true;
      }
    },
    // 执行
    BpmAdduserAndSubmitExecute: bpmInstanceObject => {
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: bpmInstanceObject.bpmAdduserAndSubmit.data,
        submitFuncName: 'BpmAdduserAndSubmitSubmit'
      });
    },
    // 选人回调
    BpmAdduserAndSubmitSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      let usersInfo = JSON.parse(params.users);
      if (
        usersInfo.users[0].selectedUsers.some(item => item.userId === useUserStore().currentUser.id)
      ) {
        message.warning('不能给自己加签！');
        return;
      }
      dosupplementassignee({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        opType: 'doadduserandsubmit',
        taskId: params.buttonData.taskId,
        outcome: '' // 先传空
      })
        .then(res => {
          if (bpmInstanceObject.bpmAdduserAndSubmit.data.callback) {
            bpmInstanceObject.bpmAdduserAndSubmit.data.callback(res);
          } else {
            if (res.success) {
              bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
              message.success('加签并提交成功！表单将自动关闭', 2, function () {
                // 电子表单流程刷新父页面需要唯一视图编码标识
                bpmUtils.closeWindow(params.buttonData.procinstDbid, params.buttonData?.viewCode);
                setTimeout(function () {
                  bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
                }, 500);
              });
              try {
                //按钮点击后置事件
                bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
                  event: params.buttonData.event
                });
              } catch (e) {
                console.log(e);
              }
            }
          }
        })
        .catch(e => {
          message.error(e.message);
        });
    }
  },
  // 拿回部分待办
  bpmWithdrawPart: {
    data: {},
    enable: false,
    // 初始化
    BpmWithdrawPartInitFunc: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmWithdrawPart.data = params.data;
      if (bpmUtils.notNull(bpmInstanceObject.bpmWithdrawPart.data)) {
        bpmInstanceObject.bpmWithdrawPart.enable = true;
      }
    },
    // 执行
    BpmWithdrawPartExecute: bpmInstanceObject => {
      getcoordinate({
        processInstanceId: bpmInstanceObject.bpmWithdrawPart.data.procinstDbid
      }).then(res => {
        if (res.success) {
          if (bpmUtils.notNull(res.data)) {
            bpmInstanceObject.bpmNodeSelect.OpenFlowNodeSelectModal(bpmInstanceObject, {
              type: bpmInstanceObject.bpmWithdrawPart.data.event,
              title: '拿回部分待办节点选择'
            });
          }
        }
      });
    },
    // 选择流程节点回调
    BpmWithdrawPartCallback: (bpmInstanceObject, params) => {
      bpmInstanceObject.bpmNodeSelect.closeFlowNodeSelectModal(bpmInstanceObject);
      let data = JSON.parse(JSON.stringify(bpmInstanceObject.bpmWithdrawPart.data));
      //循环节点中的拿回传入的executionId不准确
      // 这里注释掉,正常的拿回会有问题
      data.executionId = params.executionId;
      data.targetActivityName = params.activityName;
      bpmInstanceObject.bpmCommonSelect.openBpmCommonSelect(bpmInstanceObject, {
        buttonData: data,
        submitFuncName: 'BpmWithdrawPartSubmit'
      });
    },
    // 选人回调
    BpmWithdrawPartSubmit: (bpmInstanceObject, params) => {
      if (!bpmUtils.notNull(params.users) || params.users.length === 0) {
        message.warning('选人错误');
        return;
      }
      dowithdrawpart({
        procinstDbid: params.buttonData.procinstDbid,
        executionId: params.buttonData.executionId,
        userJson: params.users,
        taskId: params.buttonData.taskId
      }).then(res => {
        if (res.success) {
          bpmInstanceObject.bpmCommonSelect.closeBpmCommonSelect(bpmInstanceObject);
          message.success('拿回部分待办成功');
          try {
            //按钮点击后置事件
            bpmInstanceObject.bpmModel.afterButtons(bpmInstanceObject, {
              event: params.buttonData.event
            });
          } catch (e) {
            console.log(e);
          }
          bpmInstanceObject.bpmEditor.createButtons(bpmInstanceObject);
        }
      });
    }
  }
};

export default bpmInstanceObject; // vuex改传参
