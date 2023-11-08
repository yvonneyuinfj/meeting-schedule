import * as Vue from 'vue';
import { message } from 'ant-design-vue';
import AvicBpmFormCode from '@/views/avic/bpm/flowdetail/components/bpm-form-code/index.vue';
import { AvicBpmDetailList } from '../flowdetail/components/bpm-detail-list/index.js';
// import AvicBpmModal from '../flowdetail/components/bpm-modal/index.js';
// Vue.component('AvicBpmDetailList', AvicBpmDetailList);
import {
  start,
  getProcessDetailParameter,
  finishreader,
  getDefineIdByEntryId,
  getBpmButtonListBySelf,
  getoperateright,
  getOperaterightAndFormSecuritys,
  getBpmTabs,
  getBpmNavbarType,
  getProcessPicInfo
} from '@/api/avic/bpm/FlowUtilApi';
import { useAppStore } from '@/store/app';
import cloneDeep from 'lodash.clonedeep';
import core from '@/core';
// Vue.prototype.$AvicBpmModal = AvicBpmModal;
function Store() {
  //  return Vue.prototype.$sdk.getVuex();
  return useAppStore();
}
let doc = null;
let beterScrollTop = 0;
/**
 * 流程通用工具类
 */

const bpmUtils = {
  /**
   * 根路径
   */
  baseurl: '/bpm/bpm',
  /**
   * 流程审批页面打开方式，可通过系统参数“PLATFORM_V6_BPMSHOWMODE”进行配置
   * default : window.open 的方式
   * dialog : top.layer.open 的方式
   * tab : tap.addTab 的方式
   * 默认不配置或配置不合法，按“default”处理
   */
  bpm_show_mode: 'default',
  // 弹窗实例
  bpm_modal_instance: {},
  /**
   * 判断非空
   *
   * @returns {Boolean}
   */
  notNull() {
    for (let i = 0; i < arguments.length; i++) {
      let obj = arguments[i];
      if (
        typeof obj === 'undefined' ||
        obj == null ||
        (typeof obj === 'string' && obj == 'undefined')
      ) {
        return false;
      }
      if (typeof obj === 'string' && obj.trim() == '') {
        return false;
      }
      if (obj == 'null') {
        return false;
      }
    }
    return true;
  },
  /**
   * 判断路由
   * @param dataJson
   */
  getConditions(dataJson) {
    return {
      // 分支
      isBranch() {
        if (dataJson.nextTask != null && dataJson.nextTask.length > 1) {
          // 分支
          return true;
        } else {
          // 非分支
          return false;
        }
      },
      // 选人方式
      isUserSelectTypeAuto(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (
          dataJson.nextTask != null &&
          dataJson.nextTask[branchNo].currentActivityAttr.userSelectType
        ) {
          if (dataJson.nextTask[branchNo].currentActivityAttr.userSelectType == 'auto') {
            return true; // 自动选人方式
          } else {
            return false;
          }
        } else {
          return false; // 手动选人方式
        }
      },
      // 是否启用工作移交
      isWorkHandUser(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (
          dataJson.nextTask != null &&
          dataJson.nextTask[branchNo].currentActivityAttr.isWorkHandUser
        ) {
          if (dataJson.nextTask[branchNo].currentActivityAttr.isWorkHandUser == 'no') {
            return false; // 启用
          } else {
            return true; // 不启用
          }
        } else {
          // 默认
          return true; // 不启用
        }
      },
      // 处理方式
      getDealType(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (dataJson.nextTask != null && dataJson.nextTask[branchNo].currentActivityAttr.dealType) {
          return dataJson.nextTask[branchNo].currentActivityAttr.dealType;
        }
        return '2';
      },
      // 处理方式
      getSingle(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (dataJson.nextTask != null && dataJson.nextTask[branchNo].currentActivityAttr.single) {
          return dataJson.nextTask[branchNo].currentActivityAttr.single;
        }
        return 'no';
      },
      // 是否必须选人
      isMustUser(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (
          dataJson.nextTask != null &&
          dataJson.nextTask[branchNo].currentActivityAttr.isMustUser
        ) {
          if (dataJson.nextTask[branchNo].currentActivityAttr.isMustUser == 'no') {
            // 必须选人
            return false;
          } else {
            return true; // 必须选人
          }
        } else {
          return true; // 默认值
        }
      },
      // 是否启用密级
      isSecret(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (dataJson.nextTask != null && dataJson.nextTask[branchNo].currentActivityAttr.isSecret) {
          if (dataJson.nextTask[branchNo].currentActivityAttr.isMustUser == 'yes') {
            // 启用
            return true;
          } else {
            return false; // 不启用
          }
        } else {
          return false; // 不启用
        }
      },
      // 意见添写方式
      getIdeaType() {
        if (dataJson.currentActivityAttr.ideaType) {
          return dataJson.currentActivityAttr.ideaType;
        }
        return '';
      },
      // 是否强制表态
      isIdeaCompelManner() {
        if (dataJson.currentActivityAttr.ideaCompelManner) {
          if (dataJson.currentActivityAttr.ideaCompelManner == 'yes') {
            // 强制
            return true;
          } else {
            return false; // 不强制
          }
        } else {
          return false; // 不强制
        }
      },
      // 退回意见是否必填
      isNeedIdea() {
        if (dataJson.currentActivityAttr.isNeedIdea) {
          if (dataJson.currentActivityAttr.isNeedIdea == 'no') {
            // 强制
            return false;
          } else {
            return true; // 不强制
          }
        } else {
          return true; // 不强制
        }
      },
      // 是否显示选人框
      isSelectUser(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (
          dataJson.nextTask != null &&
          dataJson.nextTask[branchNo].currentActivityAttr.isSelectUser
        ) {
          if (dataJson.nextTask[branchNo].currentActivityAttr.isSelectUser == 'no') {
            // 不显示
            return false;
          } else {
            return true; // 显示
          }
        } else {
          return true; // 显示
        }
      },
      /**
       * 是否自动获取用户
       */
      isAutoGetUser(branchNo) {
        if (typeof branchNo === 'undefined') {
          branchNo = 0;
        }
        if (
          dataJson.nextTask != null &&
          dataJson.nextTask[branchNo].currentActivityAttr.isAutoGetUser
        ) {
          if (dataJson.nextTask[branchNo].currentActivityAttr.isAutoGetUser == 'no') {
            // 不显示
            return false;
          } else {
            return true; // 是
          }
        } else {
          return false;
        }
      },
      // 获取下节点类型
      getNextActivityType() {
        return dataJson.activityType;
      },
      //是否是自由流程
      isUflow() {
        return dataJson.isUflow == '2';
      }
    };
  },
  /**
   * 封装 openFlowDetail方法，提供对象式API
   * @param {Object} options 打开流程详情页的参数
   */
  openFlowDetailByOptions(options) {
    return this.openFlowDetail(
      options.url,
      options.flowDetailUrl,
      options.callback,
      options.entryId ? `FlowDetail${options.entryId}` : '',
      options.viewMode,
      options.entryId,
      options.bpmOperatorRefresh
    );
  },
  //打开流程详情页面
  openFlowDetail: (
    url,
    flowDetailUrl,
    callback,
    windowName = 'NewFlowDetailWin',
    viewMode,
    entryId,
    bpmOperatorRefresh
  ) => {
    if (url) {
      let skipUrl = '';
      if (flowDetailUrl && url.indexOf('?') != -1) {
        url = url.split('?')[1];
        skipUrl = encodeURIComponent(flowDetailUrl.replace(RegExp('/', 'g'), '_')) + '?' + url;
      } else {
        if (url.indexOf('?') != -1) {
          let urlStr = url.split('?');
          skipUrl = encodeURIComponent(urlStr[0].replace(RegExp('/', 'g'), '_')) + '?' + urlStr[1];
        } else {
          skipUrl = encodeURIComponent(url.replace(RegExp('/', 'g'), '_'));
        }
      }

      // let openType = Store().state.customConfig.platformConfigList['PLATFORM_V6_BPMSHOWMODE'];
      let openType = 'default'; // 先暂时写死
      bpmUtils.bpm_show_mode = openType;
      if (openType === 'dialog') {
        let openComp;
        if (skipUrl.indexOf('eform') >= 0) {
          openComp = Store().state.customConfig.bpmDialogComp['eform'];
        } else {
          openComp = Store().state.customConfig.bpmDialogComp['index'];
        }

        let params = bpmUtils.getQueryArr(skipUrl);
        // window.open('/flowdetail/' + skipUrl, windowName);
        bpmUtils.bpm_modal_instance = Vue.prototype.$AvicBpmModal({
          data: function () {
            return {
              windowName,
              modalTitle: viewMode == 'detailForm' ? '响应界面' : '详情',
              params: params,
              iframeUrl: '/flowdetail/' + skipUrl,
              detailVueCompnent: openComp,
              viewMode: viewMode
            };
          }
        });
      } else {
        if (bpmOperatorRefresh && typeof bpmOperatorRefresh === 'function') {
          window['bpmOperatorRefresh' + entryId] = () => {
            bpmOperatorRefresh();
          };
        }
        // window.open((Vue.prototype.$sdk.getAvicConfig('routerConfig')?.base || '/') + 'flowdetail/' + skipUrl, windowName);
        window.open('/flowdetail/' + skipUrl, windowName);
      }

      if (callback) {
        callback();
      }
    } else {
      if (callback) {
        callback();
      }
    }
  },
  getQueryArr(url) {
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if (url.indexOf('?') == -1) {
      return;
    }

    // 获取链接中参数部分
    let queryString = url.substring(url.indexOf('?') + 1);

    // 分离参数对 ?key=value&key2=value2
    let parameters = queryString.split('&');

    let params = {};
    for (const elem of parameters) {
      let s = elem.split('=');
      params[s[0]] = s[1];
    }

    if (url.indexOf('eform') == -1) {
      let routeId = url.split('?');
      params['routeId'] = routeId[0] ? routeId[0] : '';
    }
    return params;
  },
  //普通流程添加打开流程页面 timestamp ,发起流程的当前窗口的唯一标识时间戳
  addListStart(defineId, title, viewCode, timestamp) {
    let p = new Promise(function (resolve, reject) {
      start({ defineId })
        .then(res => {
          if (res.success) {
            resolve(res);
            if (res.data.formType && res.data.formType == 'eformvue') {
              // 电子表单流程
              bpmUtils.openFlowDetail(
                res.data.formUrl +
                  '&viewCode=' + // 流程详情页url加入视图编码
                  viewCode +
                  '&defineId=' +
                  res.data.defineId +
                  '&deploymentId=' +
                  res.data.deploymentId +
                  '&title=' +
                  title +
                  '&timestamp=' +
                  timestamp,
                '',
                null,
                'FlowAdd-' + res.data.defineId + '-' + res.data.deploymentId
              );
            } else {
              if (res.data?.siteType == '1') {
                bpmUtils.openFlowDetail(
                  res.data.formUrl +
                    '?defineId=' +
                    res.data.defineId +
                    '&deploymentId=' +
                    res.data.deploymentId +
                    '&title=' +
                    title +
                    '&timestamp=' +
                    timestamp +
                    '&siteType=' +
                    res.data.siteType +
                    '&microAppUrl=' +
                    res.data.microAppUrl +
                    '&microAppName=' +
                    res.data.microAppName,
                  '',
                  null,
                  'FlowAdd-' + res.data.defineId + '-' + res.data.deploymentId
                );
              } else {
                bpmUtils.openFlowDetail(
                  res.data.formUrl +
                    '?defineId=' +
                    res.data.defineId +
                    '&deploymentId=' +
                    res.data.deploymentId +
                    '&title=' +
                    title +
                    '&timestamp=' +
                    timestamp,
                  '',
                  null,
                  'FlowAdd-' + res.data.defineId + '-' + res.data.deploymentId
                );
              }
            }
          } else {
            reject(res);
          }
        })
        .catch(() => {
          reject({ success: false });
        });
    });
    return p;
  },
  detailByOptions(options) {
    return this.detail(
      options.bpmInstanceObject,
      options.formId,
      options.flowDetailUrl,
      options.extType,
      options.viewCode,
      options.bpmOperatorRefresh,
      options.viewMode,
      options.formId,
      options.formResourceName,
      options.customStatus
    );
  },
  /**
   * 获取流程详情页面相关数据
   * id 流程实例Id或者业务表单Id
   */
  detail: (
    bpmInstanceObject,
    id,
    flowDetailUrl,
    extType,
    viewCode,
    bpmOperatorRefresh,
    viewMode,
    formId,
    formResourceName,
    customStatus
  ) => {
    let p = new Promise(function (resolve, reject) {
      // if (!bpmUtils.notNull(extType)) {
      //   extType = '2';
      // }
      let postParam = {
        id: id
      };
      if (bpmUtils.notNull(extType)) {
        postParam.manager = extType;
      }
      getProcessDetailParameter(postParam)
        .then(res => {
          if (res.success) {
            if (res.data.length == 0) {
              if (viewMode == 'detailForm') {
                bpmUtils.executeTask(
                  id, // processInstanceId
                  '', //executionId
                  '', // taskID
                  formId, //formId
                  formResourceName, //formResourceName
                  '', // 展示流程标题
                  '', //formResourceName
                  flowDetailUrl,
                  bpmOperatorRefresh,
                  viewCode,
                  viewMode,
                  customStatus
                );
              } else {
                message.error('非本人参与流程，无法查看详情');
              }
            } else if (res.data.length == 1) {
              const n = res.data[0];
              bpmUtils.executeTask(
                n.processInstance, // processInstanceId
                n.executionId, //executionId
                n.dbid, // taskID
                n.businessId, //formId
                n.formResourceName, //formResourceName
                n.processDefName || n.taskTitle, // 展示流程标题
                n.taskType, //formResourceName
                flowDetailUrl,
                bpmOperatorRefresh,
                viewCode,
                viewMode,
                customStatus
              );
            } else {
              const callback = selectedTask => {
                // 点击取消时，无已选待办
                if (selectedTask) {
                  const n = selectedTask;
                  bpmUtils.executeTask(
                    n.processInstance, // processInstanceId
                    n.executionId, //executionId
                    n.dbid, // taskID
                    n.businessId, //formId
                    n.formResourceName, //formResourceName
                    n.processDefName || n.taskTitle, // 展示流程标题
                    n.taskType, //formResourceName
                    flowDetailUrl,
                    bpmOperatorRefresh,
                    viewCode,
                    viewMode,
                    customStatus
                  );
                }
              };
              selectBpmTask({ taskList: res.data, callback });
            }
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(() => {
          reject({ success: false });
        });
    });
    return p;
  },
  executeTask: (
    entryId,
    executionId,
    taskId,
    formId,
    url,
    title,
    taskType,
    flowDetailUrl,
    bpmOperatorRefresh,
    viewCode,
    viewMode,
    customStatus
  ) => {
    if (url == null || url == '') {
      return;
    }
    if (taskType == '1') {
      finishreader({
        dbid: taskId,
        entryId,
        doTask: 'false' //是否是快速办理
      }).then(() => {});
    }
    let proxyPage = 'N'; //是否做页面代理
    if (url.indexOf('proxyPage=Y') != -1) {
      //是否做页面代理
      proxyPage = 'Y';
    }
    if (proxyPage != 'Y') {
      //不明确指定用代理页面的，则通通跳转到自己页面
      if (url.indexOf('?') > 0) {
        url += '&entryId=' + entryId;
      } else {
        url += '?entryId=' + entryId;
      }
      url += '&id=' + formId;
      url += '&executionId=' + executionId;
      if (url.indexOf('taskId=') == -1) {
        url += '&taskId=' + taskId;
      }
      url += '&title=' + title;
      // 电子表单流程详情页传递viewCode
      if (viewCode) {
        url += '&viewCode=' + viewCode;
      }
      if (customStatus) {
        url += '&customStatus=' + customStatus;
      }
      bpmUtils.openFlowDetail(url, flowDetailUrl, null, 'FlowDetail-' + entryId, viewMode);
    } else {
      // var redirectPath = "avicit/platform6/bpmreform/bpmbusiness/approve/ProcessApprove.jsp";
      // redirectPath += "?id=" + formId;
      // redirectPath += "&entryId=" + entryId;
      // redirectPath += "&executionId=" + executionId;
      // redirectPath += "&taskId=" + taskId;
      // redirectPath += "&title=" + encodeURI(title);
      if (url.indexOf('?') > 0) {
        url += '&entryId=' + entryId;
      } else {
        url += '?entryId=' + entryId;
      }
      url += '&id=' + formId;
      url += '&executionId=' + executionId;
      if (url.indexOf('taskId=') == -1) {
        url += '&taskId=' + taskId;
      }
      url += '&title=' + title;
      //redirectPath += "&url=" + encodeURI(url);
      //redirectPath += "&url=" + encodeURIComponent(url);
      // 电子表单流程详情页传递viewCode
      if (viewCode) {
        url += '&viewCode=' + viewCode;
      }
      if (customStatus) {
        url += '&customStatus=' + customStatus;
      }
      bpmUtils.openFlowDetail(url, flowDetailUrl, null, 'FlowDetail-' + entryId, viewMode);
    }
    if (bpmOperatorRefresh && typeof bpmOperatorRefresh === 'function') {
      window['bpmOperatorRefresh' + entryId] = () => {
        bpmOperatorRefresh();
      };
    }
  },
  //获取流程 DefineId
  getDefineIdByEntryId: async (bpmInstanceObject, entryId) => {
    let result = await getDefineIdByEntryId({
      entryId
    });
    return new Promise(resolve => {
      if (result.success) {
        bpmInstanceObject.bpmModel.defineId = result.data;
        resolve(result);
      } else {
        resolve(result);
      }
    });
  },
  // 获取流程按钮设置
  getBpmButtonListBySelf: async (entryId, executionId, taskId, formId, userId) => {
    let result = await getBpmButtonListBySelf({
      bpm_entryId: entryId,
      bpm_executionId: executionId,
      bpm_taskId: taskId,
      bpm_formId: formId,
      userId
    });
    return new Promise(resolve => {
      if (result.success) {
        resolve(result);
      } else {
        resolve(result);
      }
    });
  },
  //获取流程按钮
  getoperateright: async (bpmInstanceObject, entryId, executionId, taskId, formId) => {
    let result = await getoperateright({
      processInstanceId: entryId,
      executionId,
      taskId,
      bpm_formId: formId
    });
    return new Promise(resolve => {
      if (result.success) {
        bpmInstanceObject.bpmModel.defineId = result.data.defineId;
        resolve(result);
      } else {
        resolve(result);
      }
    });
  },

  //请求合并后接口，获取defineId、流程按钮、流程节点、表单权限
  getOperaterightAndFormSecuritys: async (
    bpmInstanceObject,
    entryId,
    executionId,
    taskId,
    formId
  ) => {
    let result = await getOperaterightAndFormSecuritys({
      processInstanceId: entryId,
      executionId,
      taskId,
      bpm_formId: formId
    });
    return new Promise(resolve => {
      if (result.success) {
        bpmInstanceObject.bpmModel.defineId = result.data.defineId;
        resolve(result);
      } else {
        resolve(result);
      }
    });
  },
  //发起流程获取流程参数
  flowStart: async defineId => {
    let result = await start({
      defineId
    });
    return new Promise(resolve => {
      if (result.success) {
        resolve(result);
      } else {
        resolve(result);
      }
    });
  },

  //获取流程节点信息
  setFlowStartAndEndTask: async (bpmInstanceObject, deploymentId) => {
    let res = await getProcessPicInfo({ deploymentId: deploymentId });
    let firstNode = [];
    let lastNode = [];
    if (res.success) {
      const startCell = res.data.processModel.node[0].id;
      const endCell = res.data.processModel.node[1].id;
      res.data.processModel.edge.forEach(item => {
        if (item.source.cell == startCell) {
          firstNode = item.target.cell;
        }
        if (item.target.cell == endCell) {
          lastNode.push(item.target.cell);
        }
      });
      bpmInstanceObject.bpmModel.firstTaskName = firstNode;
      bpmInstanceObject.bpmModel.lastTaskName = lastNode;

      const result = { firstNode, lastNode };
      return new Promise(resolve => {
        if (result.success) {
          resolve(result);
        } else {
          resolve(result);
        }
      });
    }
  },
  //获取流程页面标签页
  getBpmTabs: async () => {
    let result = await getBpmTabs('');
    return new Promise(resolve => {
      if (result.success) {
        resolve(result);
      } else {
        resolve(result);
      }
    });
  },
  //获取流程标签类型
  getBpmNavbarType: async () => {
    let result = await getBpmNavbarType('');
    return new Promise(resolve => {
      if (result.success) {
        resolve(result);
      } else {
        resolve(result);
      }
    });
  },
  //设置标题
  setTitle: title => {
    if (title) {
      document.title = title;
    }
  },
  //表单是否可编辑
  isEnable(bpmInstanceObject) {
    if (
      !bpmInstanceObject.bpmSave ||
      (bpmInstanceObject.bpmSave && bpmInstanceObject.bpmSave.enable == false)
    ) {
      return true; // 没有保存按钮 不可编辑
    } else {
      return false;
    }
  },
  //form表单的是否可操作
  formOperability: (bpmInstanceObject, code) => {
    if (bpmUtils.isEnable(bpmInstanceObject)) {
      return true;
    }
    if (bpmInstanceObject.bpmModel.userIdentityKey == '7' && bpmInstanceObject.bpmSave.enable) {
      // 管理员允许编辑表单
      return false;
    }
    // 非已办人、已阅人、读者、未知身份，判断表单字段权限
    if (
      code &&
      bpmInstanceObject.bpmEditor.formSecuritys.result &&
      bpmInstanceObject.bpmEditor.formSecuritys.result.length > 0 &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '2' &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '4' &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '5' &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '0'
    ) {
      let result = true;
      bpmInstanceObject.bpmEditor.formSecuritys.result.map(tim => {
        if (tim.tag == code && tim.operability == '1') {
          result = false;
        }
      });
      return result;
    } else {
      return true;
    }
  },
  //form表单的是否必填
  /**
   * 增加代码生成器中，对数据库必填字段在拟稿节点的处理
   */
  formRequired: (bpmInstanceObject, code, options) => {
    let tips = !options
      ? '请输入'
      : typeof options === 'object'
      ? options['tip'] || '请输入'
      : options;
    let dbRequired = typeof options === 'object' && options['dbRequired'] ? true : false;
    let result = [];
    if (bpmUtils.isEnable(bpmInstanceObject)) {
      result = [];
    } else {
      if (code) {
        if (
          bpmInstanceObject.bpmEditor.formSecuritys.result &&
          bpmInstanceObject.bpmEditor.formSecuritys.result.length > 0
        ) {
          bpmInstanceObject.bpmEditor.formSecuritys.result.map(tim => {
            if (
              tim.tag == code &&
              tim.required == '1' &&
              tim.accessibility == '1' &&
              tim.operability == '1'
            ) {
              result = [{ required: true, message: `${tips}${tim.tagName}！` }];
            }
          });
        }
      }
    }
    if (dbRequired && !result.length) {
      result = [{ required: true, message: `此项不可为空！` }];
    }
    return result;
  },
  //form表单的是否显示
  formAccessibility: (bpmInstanceObject, code) => {
    if (code) {
      if (
        bpmInstanceObject.bpmEditor.formSecuritys.result &&
        bpmInstanceObject.bpmEditor.formSecuritys.result.length > 0
      ) {
        let result = false;
        bpmInstanceObject.bpmEditor.formSecuritys.result.map(tim => {
          if (tim.tag == code && tim.accessibility == '1') {
            result = true;
          }
        });
        return result;
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
  flowFileEditable: (...args) => bpmUtils.isDisabledAccessory(...args),
  //附件是否可编辑
  isDisabledAccessory: (bpmInstanceObject, index) => {
    if (bpmUtils.isEnable(bpmInstanceObject)) {
      return false;
    }
    if (bpmInstanceObject.bpmModel.userIdentityKey == '7' && bpmInstanceObject.bpmSave.enable) {
      // 管理员允许编辑附件
      return true;
    }
    if (
      bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths &&
      bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths.length >= index &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '2' &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '4' &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '5' &&
      bpmInstanceObject.bpmModel.userIdentityKey !== '0'
    ) {
      let result = false;
      if (
        bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths[index - 1] &&
        bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths[index - 1].operability == '1'
      ) {
        result = true;
      }
      return result;
    } else {
      return false;
    }
  },
  flowFileSecretChangeable: (...args) => bpmUtils.isLevelAccessory(...args),
  //附件是否可修改密级
  isLevelAccessory: (bpmInstanceObject, index) => {
    if (bpmUtils.isEnable(bpmInstanceObject)) {
      return false;
    }
    if (bpmInstanceObject.bpmModel.userIdentityKey == '7' && bpmInstanceObject.bpmSave.enable) {
      // 管理员允许修改附件密级
      return true;
    }
    if (
      bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths &&
      bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths.length >= index
    ) {
      let result = false;
      let attachment = bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths[index - 1];
      if (attachment && attachment.modifySecretLevel == '1') {
        result = true;
      }
      return result;
    } else {
      return false;
    }
  },

  //子表状态控制
  subTablePermissions(bpmInstanceObject, pageSettingData, subTableName, buttonFors) {
    let userIdentityKey = bpmInstanceObject.bpmModel.userIdentityKey;
    let permissions = false;
    //按钮控制
    if (buttonFors && buttonFors.length > 0) {
      if (
        bpmInstanceObject.bpmEditor.formSecuritys.result &&
        bpmInstanceObject.bpmEditor.formSecuritys.result.length > 0
      ) {
        bpmInstanceObject.bpmEditor.formSecuritys.result.map(tim => {
          if (buttonFors.indexOf(tim.tag) != -1 && tim.accessibility == '1') {
            permissions = true;
          }
        });
      } else {
        permissions = false; // 未配置权限时 按钮不显示 by cuijj 2022-10-12
      }
    } else {
      permissions = true;
    }
    if (userIdentityKey !== '1' && userIdentityKey !== '6') {
      permissions = false;
    }
    //已办 已阅 读者 未知 状态的隐藏子表按钮 禁用子表字段
    if (
      userIdentityKey == '2' ||
      userIdentityKey == '4' ||
      userIdentityKey == '5' ||
      userIdentityKey == '0'
    ) {
      //子表不可编辑
      pageSettingData.map(tim => {
        tim.isCanEdit = false;
      });
      return { pageSettingData, permissions };
    } else {
      if (bpmUtils.isEnable(bpmInstanceObject)) {
        //子表不可编辑
        pageSettingData.map(tim => {
          tim.isCanEdit = false;
        });
        return { pageSettingData, permissions };
      }
      if (
        bpmInstanceObject.bpmEditor.formSecuritys.result &&
        bpmInstanceObject.bpmEditor.formSecuritys.result.length > 0
      ) {
        bpmInstanceObject.bpmEditor.formSecuritys.result.map(tim => {
          pageSettingData.map((table, index) => {
            if (subTableName + '__' + table.dataIndex == tim.tag) {
              //表格是否显示
              if (tim.accessibility != '1') {
                pageSettingData.splice(index, 1);
              } else {
                //表单是否可编辑
                if (tim.operability == '1') {
                  table.isCanEdit = true;
                } else {
                  table.isCanEdit = false;
                }
                //是否必填
                if (tim.required == '1' && tim.accessibility == '1' && tim.operability == '1') {
                  table.headerClassName = 'required-table-title';
                }
              }
            }
          });
        });
        return { pageSettingData, permissions };
      } else {
        return { pageSettingData, permissions };
      }
    }
  },
  /** 校验流程表单中的附件区域是否为必填项 */
  attachmentRequired: (bpmInstanceObject, fieldName) => {
    if (!bpmInstanceObject || !fieldName) {
      return [];
    }
    if (bpmUtils.isEnable(bpmInstanceObject)) {
      return [];
    }
    if (bpmInstanceObject.bpmEditor?.formSecuritys?.attachmentAuths) {
      let attachmentFieldAuth = bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths.find(
        item => fieldName === item.tag && item.required == '1' && item.operability == '1'
      );
      if (attachmentFieldAuth) {
        return [{ required: true, message: '请上传附件！' }];
      }
    }
    return [];
  },
  //附件是否必填
  isQequiredAccessory: (bpmInstanceObject, index) => {
    if (bpmUtils.isEnable(bpmInstanceObject)) {
      return [];
    }
    if (
      bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths &&
      bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths.length >= index
    ) {
      let result = [];
      let attachment = bpmInstanceObject.bpmEditor.formSecuritys.attachmentAuths[index];
      if (attachment && attachment.required == '1' && attachment.operability == '1') {
        result = [{ required: true, message: '请上传附件！' }];
      }
      return result;
    } else {
      return [];
    }
  },
  /**
   * 创建空的xmlDocument
   * @param {*} arguments
   */
  createXmlDocument: () => {
    if (document.implementation && document.implementation.createDocument) {
      doc = document.implementation.createDocument('', '', null);
    } else if (window.ActiveXObject) {
      // eslint-disable-next-line no-undef
      doc = new ActiveXObject('Microsoft.XMLDOM');
    }
    return doc;
  },
  /**
   * 构建xml元素
   * @param {*} value
   */
  createElement: value => {
    if (doc == null) {
      doc = bpmUtils.createXmlDocument();
    }
    return doc.createElement(value);
  },

  createTextNode: value => {
    if (doc == null) {
      doc = bpmUtils.createXmlDocument();
    }
    if (value) {
      value = value.replace(/(^\s+)|(\s+$)/g, '');
    }
    return doc.createTextNode(value);
  },
  /**
   * 关闭当前窗口
   */
  closeWindow(entryId, viewCode) {
    if (bpmUtils.bpm_show_mode == 'dialog') {
      if (bpmUtils.bpm_modal_instance) {
        bpmUtils.bpm_modal_instance.handleClose();
      }
    } else {
      if (window.opener == null) {
        document.title = '页面已过期';
        location.replace('about:blank');
      } else {
        window.close();
      }
    }

    this.refreshBack(entryId, viewCode); // 电子表单流程刷新父页面需要唯一视图编码标识
  },
  /**
   * 刷新父页面，bpm_operator_refresh
   */
  refreshBack(entryId, viewCode) {
    try {
      if (window.opener && !window.opener.closed) {
        // 优先根据entryId刷新父页面
        if (
          entryId &&
          window.opener['bpmOperatorRefresh' + entryId] &&
          typeof window.opener['bpmOperatorRefresh' + entryId] === 'function'
        ) {
          window.opener['bpmOperatorRefresh' + entryId]();
          setTimeout(() => {
            window.opener['bpmOperatorRefresh' + entryId] = null;
          }, 100);
        } else if (
          viewCode &&
          window.opener['bpmOperatorRefresh' + viewCode] &&
          typeof window.opener['bpmOperatorRefresh' + viewCode] === 'function'
        ) {
          // 电子表单流程刷新父页面需要唯一视图编码标识
          window.opener['bpmOperatorRefresh' + viewCode]();
          // setTimeout(() => {
          //   window.opener['bpmOperatorRefresh' + viewCode] = null;
          // }, 100);
        } else if (bpmUtils.notNull(window.opener.bpmOperatorRefresh)) {
          window.opener.bpmOperatorRefresh();
        }
      } else {
        // 弹框形式流程详情页 刷新外部界面 by cuijj 2021-08-13
        if (
          entryId &&
          window['bpmOperatorRefresh' + entryId] &&
          typeof window['bpmOperatorRefresh' + entryId] === 'function'
        ) {
          console.log('执行前', window['bpmOperatorRefresh' + entryId]);
          window['bpmOperatorRefresh' + entryId]();
          setTimeout(() => {
            window['bpmOperatorRefresh' + entryId] = null;
          }, 100);
        } else if (
          viewCode &&
          window['bpmOperatorRefresh' + viewCode] &&
          typeof window['bpmOperatorRefresh' + viewCode] === 'function'
        ) {
          // 电子表单流程刷新父页面需要唯一视图编码标识
          window['bpmOperatorRefresh' + viewCode]();
          // setTimeout(() => {
          //   window['bpmOperatorRefresh' + viewCode] = null;
          // }, 100);
        } else if (bpmUtils.notNull(window.bpmOperatorRefresh)) {
          window.bpmOperatorRefresh();
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * 校验不通过,滚动到校验不通过元素位置,提示用户
   */
  getFirstCheckErrorElement(err) {
    for (let key in err) {
      // return document.querySelector("div[for='" + key + "']") || document.querySelector("div[for='" + key + "Alias']") || document.querySelector("div[for='" + key + "Name']");
      return document.querySelector('#' + key);
    }
  },
  /**
   * 流程详情页面滚动事件
   */
  handleScroll() {
    let scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    let headTop,
      tabsTop = '0';
    if (scrollTop != 0 && scrollTop - beterScrollTop > 0) {
      headTop = '-40px';
      tabsTop = '0px';
    } else {
      headTop = '0px';
      tabsTop = '40px';
    }
    beterScrollTop = scrollTop;
    return { headTop, tabsTop };
  }
};

export default bpmUtils;

export function selectBpmTask({ taskList, callback }) {
  const div = document.createElement('div');
  const el = document.createElement('div');
  document.body.appendChild(div);
  div.appendChild(el);
  let bpmTaskListIns = null;
  const selectBpmTaskProps = {
    ref: 'bpmTaskList',
    data: taskList,
    onClose: function () {
      bpmTaskListIns?.unmount();
      bpmTaskListIns = null;
      div.parentNode && div.parentNode.removeChild(div);
    },
    onSelect: function (args) {
      callback(args);
    }
  };
  bpmTaskListIns = Vue.createApp({
    render() {
      return Vue.h(AvicBpmDetailList, selectBpmTaskProps);
    },
    mounted() {
      this.$refs['bpmTaskList'].showTaskList();
    }
  });
  bpmTaskListIns.use(core);
  bpmTaskListIns.mount(el);
}

/**
 * 根据表单编码及启动条件查询并选择可启动的流程定义
 * @param {formCode:String, formData: Object, callback: Function} param0
 * formCode 表单编码
 * formData 校验启动条件所需的参数
 * callback 回调函数
 */
export function startFlowByFormCode({ formCode, formData, callback }) {
  const div = document.createElement('div');
  const el = document.createElement('div');
  document.body.appendChild(div);
  div.appendChild(el);
  let bpmFormCodeIns = null;
  const formCodeProps = {
    ref: 'bpmFormCode',
    formCode: formCode,
    onClose: function () {
      bpmFormCodeIns?.unmount();
      bpmFormCodeIns = null;
      div.parentNode && div.parentNode.removeChild(div);
    },
    onSelect: function (...args) {
      callback(...args);
    }
  };
  bpmFormCodeIns = Vue.createApp({
    render() {
      return Vue.h(AvicBpmFormCode, formCodeProps);
    },
    mounted() {
      this.$refs['bpmFormCode'].loadFormcode({ formData });
    }
  });
  bpmFormCodeIns.use(core);
  bpmFormCodeIns.mount(el);
}

/* 打开流程详细页 */
export function openFlowDetail(bpmResult, bpmOperatorRefresh) {
  if (bpmResult.taskUrl) {
    let parameter = '';
    if (bpmResult.taskTitle) {
      parameter = '&title=' + bpmResult.taskTitle;
    }
    bpmUtils.openFlowDetailByOptions({
      url: bpmResult.taskUrl + parameter,
      bpmOperatorRefresh,
      entryId: bpmResult.entryId
    });
  } else {
    message.error('打开流程详情失败！');
  }
}
/* 关闭流程loading */
export function closeFlowLoading(bpmInstanceObject) {
  if (bpmInstanceObject && bpmInstanceObject.bpmEditor) {
    bpmInstanceObject.bpmEditor.closeLoading(bpmInstanceObject);
    bpmInstanceObject.bpmEditor.setIsButtonLoading(bpmInstanceObject, false);
  }
}

/**
 * 构建字段权限结构
 * @param {Object} bpmInstanceObject
 * @returns
 */
export function getFieldAuth(bpmInstanceObject) {
  var tempJson = null; //创建JSON
  if (
    bpmInstanceObject &&
    bpmInstanceObject.bpmEditor &&
    bpmInstanceObject.bpmEditor.formSecuritys.result &&
    bpmInstanceObject.bpmEditor.formSecuritys.result.length > 0
  ) {
    tempJson = {}; //创建JSON
    bpmInstanceObject.bpmEditor.formSecuritys.result.map(tim => {
      //处理单个字段的disabled属性
      let itemDisabled = true;
      if (tim.operability == '1') {
        itemDisabled = false;
      }
      //处理单个字段的必填属性
      let itemRequired = {};
      if (tim.required == '1' && tim.accessibility == '1' && tim.operability == '1') {
        itemRequired = { required: true, message: `请输入${tim.tagName}！` };
      }
      let itemVisible = false;
      if (tim.accessibility == '1') {
        itemVisible = true;
      }
      const fieldAuth = {
        visible: itemVisible,
        disabled: itemDisabled,
        required: itemRequired
      };
      tempJson[tim.tag] = fieldAuth;
    });
  }

  return tempJson;
}

export function getFieldVisible(authJson, fieldName) {
  let fieldVisiable = true;
  if (authJson != null && authJson[fieldName]) {
    fieldVisiable = authJson[fieldName].visible;
  }
  return fieldVisiable;
}

export function getFieldDisabled(authJson, fieldName, bpmInstanceObject) {
  if (bpmUtils.isEnable(bpmInstanceObject)) {
    return true;
  }
  if (bpmInstanceObject.bpmModel.userIdentityKey == '7' && bpmInstanceObject.bpmSave.enable) {
    // 管理员允许编辑表单
    return false;
  }
  if (
    fieldName &&
    bpmInstanceObject.bpmEditor.formSecuritys.result &&
    bpmInstanceObject.bpmEditor.formSecuritys.result.length > 0 &&
    bpmInstanceObject.bpmModel.userIdentityKey !== '2' &&
    bpmInstanceObject.bpmModel.userIdentityKey !== '4' &&
    bpmInstanceObject.bpmModel.userIdentityKey !== '5' &&
    bpmInstanceObject.bpmModel.userIdentityKey !== '0'
  ) {
    let fieldDisabled = true;
    if (authJson != null && authJson[fieldName]) {
      fieldDisabled = authJson[fieldName].disabled;
    }
    return fieldDisabled;
  } else {
    return true;
  }
}

export function getFieldRequired(authJson, fieldName, rules, bpmInstanceObject, options) {
  let dbRequired = typeof options === 'object' && options['dbRequired'] ? true : false;
  let result = [];
  const getRules = rules[fieldName];
  if (getRules) {
    result = cloneDeep(getRules);
  }
  //result.push({ required: true, message: `不能为空` })
  if (!bpmUtils.isEnable(bpmInstanceObject)) {
    if (authJson != null && authJson[fieldName]) {
      result.push(authJson[fieldName].required);
    }
  }
  if (dbRequired && !result.length) {
    result.push({ required: true, message: `此项不可为空！` });
  }
  if (result.length > 0) {
    result = result.filter(item => {
      return JSON.stringify(item) != '{}';
    });
  }
  return result;
}
