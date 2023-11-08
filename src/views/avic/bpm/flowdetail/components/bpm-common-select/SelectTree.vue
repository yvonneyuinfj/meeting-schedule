<!--
 选择区域
-->
<template>
  <div class="flow-select-tree-box">
    <div class="search-box">
      <a-input-search
        v-model:value="searchText"
        allowClear
        placeholder="请输入姓名或拼音或登录名检索"
        @search="onSearch"
      />
    </div>
    <div class="select-role-box">
      <!--      多选-->
      <a-tree
        v-model:checkedKeys="treeCheckedKeys"
        v-model:selectedKeys="treeCheckedKeys"
        v-model:expandedKeys="expandedKeys"
        autoExpandParent
        :ref="treeRefName"
        :height="260"
        :multiple="treeCheckable"
        :checkable="treeCheckable"
        :load-data="loadDataAsyn"
        :tree-data="treeData"
        :loading="loading"
        @select="selectTree"
        @check="checkTree"
        :show-line="true && { showLeafIcon: false }"
        :show-icon="false"
      >
        <template v-slot:title="{ title, attributes, deptName }">
          <!-- 选人组件图标 -->
          <span class="user-icon">
            <avic-icon
              v-if="attributes && attributes.nodeType == 'user'"
              svg="avic-account-circle-fill"
              color="#3370ff"
            />
            <avic-icon
              v-else-if="attributes && attributes.nodeType == 'dept'"
              svg="avic-organization-chart"
              color="#0035cc"
            />
            <avic-icon
              v-else-if="selectTag == 'role'"
              svg="avic-account-box-fill"
              color="#0035cc"
            />
            <avic-icon v-else-if="selectTag == 'group'" svg="avic-team-fill" color="#0035cc" />
            <avic-icon
              v-else-if="selectTag == 'position' && !isExpand"
              svg="avic-folder-2-fill"
              color="#0035cc"
            />
            <avic-icon
              v-else-if="selectTag == 'position' && isExpand"
              svg="avic-folder-open-fill"
              color="#0035cc"
            />
            <avic-icon v-else svg="avic-building-fill" color="#0035cc" />
          </span>
          <span v-if="searchText && title.indexOf(searchText) > -1">
            {{ title.substr(0, title.indexOf(searchText)) }}
            <span style="color: #f50">{{ searchText }}</span>
            {{ title.substr(title.indexOf(searchText) + searchText.length) }}
          </span>
          <span v-else>
            {{ title }}
            <span v-if="deptName && deptName != null" class="cell-txt-dept">
              （{{ deptName }}）
            </span>
            <span
              v-if="
                (deptName == null || deptName == undefined) &&
                attributes &&
                attributes['deptName'] != null
              "
              class="cell-txt-dept"
            >
              （{{ attributes['deptName'] }}）
            </span>
          </span>
        </template>
      </a-tree>
    </div>
  </div>
</template>
<script>
import { setUserList, processNodes } from './_util';
import request from '@/utils/request';

export default {
  name: 'SelectTree',

  props: {
    //prop接收传过来的参数
    select: {
      required: true //校验
    },
    data: {
      required: true, //校验
      default: []
    },
    selectAll: {
      required: false, //校验
      default: ''
    },
    formId: {
      type: String,
      required: false, //校验
      default: ''
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    buttonData: {
      required: false,
      type: Object,
      default: () => {}
    },
    //流程实例
    bpmInstanceObject: {
      type: Object
    },
    defaultSelectedUser: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      selectUser: [], //选中的用户
      noChange: false,
      searchList: [],
      userList: [],
      treeCheckedKeys: [],
      treeSelectedKeys: [],
      expandedKeys: [],
      treeData: [],
      defaultMaxParentId: '-1',
      initTreeData: [], //初始化加载树数据
      tableRefName: 'userListTable',
      treeRefName: 'avicTreeElement',
      deptUrl: '/bpm/bpmActor/bpmSelectUserAction2/dept/v1', //部门树访问地址
      positionUrl: '/bpm/bpmActor/bpmSelectUserAction2/position/v1', //岗位树访问地址
      groupUrl: '/bpm/bpmActor/bpmSelectUserAction2/group/v1', //群组树访问地址
      roleUrl: '/bpm/bpmActor/bpmSelectUserAction2/role/v1', //角色树访问地址
      selectFlowTab: 0, // 当前选中的流程页签
      selectTag: '', // 当前选人的纬度类型
      // 树组件需要的加载数据格式
      treeParam: {
        url: '',
        parameter: {
          checked: false
        },
        method: 'post'
      },
      // 树搜索组件需要的加载数据格式
      searchTreeParam: {
        url: '/bpm/bpmActor/bpmSelectUserAction2/getSearchUsersJSONData/v1',
        parameter: {},
        method: 'post'
      },
      isSwitch: false,
      showSearchList: false,
      searchText: '',
      treeCheckable: true, //是否多选
      scopedSlots: { title: 'title' }, //树收藏
      menuList: [],
      menuVisible: false,
      addCommonContactUrl: '/bpm/bpmActor/bpmSelectUserAction2/addCommonContact/v1',
      delCommonContactUrl: '/bpm/bpmActor/bpmSelectUserAction2/delCommonContact/v1',
      rightNode: null,
      roleSpinning: false,
      treeNodeDataRef: {}, //当前节点信息
      loading: false, //bigtree loading
      selectListMap: {}, //bigtree 选中的用户
      expandLevel: '1', //展开层级
      emptyText: '暂无数据' //搜索为空时的提示数据
    };
  },
  /** 参数 select {selectFlowTab:3 当前激活的分支节点页签, selectTag:"user" 节点可选择的维度} */
  watch: {
    select: {
      immediate: true,
      handler(newV) {
        if (
          newV &&
          newV.selectTag &&
          newV.selectFlowTab > -1 &&
          (newV.selectTag != this.selectTag || newV.selectFlowTab != this.selectFlowTab)
        ) {
          this.selectFlowTab = newV.selectFlowTab; // 记录当前激活的分支页签
          if (newV.selectTag != this.selectTag) {
            this.isSwitch = true; // 标记为新切换的 选人维度
          }
          this.showSearchList = false;
          this.searchText = '';
          this.selectTag = newV.selectTag; // 记录当前 选人维度
          this.iniTree();
          this.setDefaultSelectUser(this.defaultSelectedUser);
        }
      }
    }
  },
  mounted() {
    // this.iniTree();
  },
  methods: {
    /** 初始化树列表*/
    iniTree() {
      if (this.loading) {
        return;
      }
      if (this.selectTag && this.selectFlowTab > -1) {
        this.iniTreeUrl(); // 初始化请求参数
        this.iniTreeData(); // 初始化数据
      }
    },
    /** 1.初始化查询路径url */
    iniTreeUrl() {
      if (this.data.nextTask && this.data.nextTask[this.selectFlowTab].currentActivityAttr) {
        if (
          this.data.nextTask[this.selectFlowTab].currentActivityAttr.dealType == '1' ||
          this.data.nextTask[this.selectFlowTab].currentActivityAttr.single == 'yes'
        ) {
          //单选用户
          this.treeCheckable = false;
        } else {
          this.treeCheckable = true;
        }
      }
      if (this.selectTag != 'user') {
        let para = [];
        let list = '';
        let nodeType = '';
        if (this.selectTag == 'orgDept') {
          if (this.data.nextTask && this.data.nextTask[this.selectFlowTab].orgList.length > 0) {
            list = 'orgList'; //组织
            nodeType = 'rootOrg';
          } else if (
            this.data.nextTask &&
            this.data.nextTask[this.selectFlowTab].deptList.length > 0
          ) {
            list = 'deptList'; //部门
            nodeType = 'root';
          }
          this.treeParam.url = this.data.orgDeptTreeUrl ? this.data.orgDeptTreeUrl : this.deptUrl;
        } else if (this.selectTag == 'role') {
          list = 'roleList';
          nodeType = this.selectTag;
          this.treeParam.url = this.data.roleTreeUrl ? this.data.roleTreeUrl : this.roleUrl;
        } else if (this.selectTag == 'group') {
          list = 'groupList';
          nodeType = this.selectTag;
          this.treeParam.url = this.data.groupTreeUrl ? this.data.groupTreeUrl : this.groupUrl;
        } else if (this.selectTag == 'position') {
          list = 'positionList';
          nodeType = this.selectTag;
          this.treeParam.url = this.data.positionTreeUrl
            ? this.data.positionTreeUrl
            : this.positionUrl;
        }
        if (
          this.data.nextTask &&
          list != '' &&
          this.data.nextTask[this.selectFlowTab][list] &&
          this.data.nextTask[this.selectFlowTab][list].length > 0
        ) {
          this.data.nextTask[this.selectFlowTab][list].map(tim => {
            para.push(tim.id);
          });
        }
        let buttonData = this.getButtonData();
        if (this.selectTag == 'role') {
          this.setParameter(para, buttonData);
        } else {
          this.treeParam.parameter = {
            nodeType,
            para: JSON.stringify(para),
            filterUser: '',
            secretLevel: this.data.secretLevel,
            formId: this.formId,
            executionId: buttonData.buttonData.executionId,
            processInstanceId: buttonData.buttonData.processInstanceId,
            taskId: buttonData.buttonData.taskId
          };
        }
      }
    },
    /*
        获取流程参数
    */
    getButtonData() {
      if (this.visible) {
        return { buttonData: this.buttonData, submitFuncName: '' };
      } else {
        return this.bpmInstanceObject.bpmCommonSelect;
      }
    },
    /*
        2. bigtree 初始化数据
    */
    async iniTreeData() {
      this.initTreeData = [];
      this.expandedKeys = [];
      let treeData = [];

      // console.log('this.selectTag = ',this.selectTag)
      if (this.selectTag == 'orgDept') {
        if (this.data.orgDeptTreeZNode && this.data.orgDeptTreeZNode.length > 0) {
          treeData = this.data.orgDeptTreeZNode;
        }
      } else if (this.selectTag == 'role') {
        if (this.data.currentActivityAttr?.cfSelectUser == 'true') {
          // 成飞复杂角色树
          this.$emit('loading', true);

          let result = await this.getRole();
          if (result.success) {
            treeData = result.result;
            this.processInitRole(treeData);
          }
          this.$emit('loading', false);
        } else {
          // 平台正常角色树
          if (this.data.roleTreeZNode && this.data.roleTreeZNode.length > 0) {
            treeData = this.data.roleTreeZNode;
          } else {
            if (this.data.nextTask && this.data.nextTask[this.selectFlowTab].roleList.length > 0) {
              treeData = this.processTreeData(this.data.nextTask[this.selectFlowTab].roleList);
            }
          }
        }
      } else if (this.selectTag == 'user') {
        if (this.data.nextTask && this.data.nextTask[this.selectFlowTab].userList.length > 0) {
          treeData = setUserList(
            this.data.nextTask[this.selectFlowTab].userList,
            this.treeCheckable
          );
        }
      } else if (this.selectTag == 'model') {
        if (this.data.nextTask && this.data.nextTask[this.selectFlowTab].modelList.length > 0) {
          treeData = this.processTreeData(this.data.nextTask[this.selectFlowTab].modelList);
        }
      } else if (this.selectTag == 'group') {
        if (this.data.groupTreeZNode && this.data.groupTreeZNode.length > 0) {
          treeData = this.data.groupTreeZNode;
        } else {
          if (this.data.nextTask && this.data.nextTask[this.selectFlowTab].groupList.length > 0) {
            treeData = this.processTreeData(this.data.nextTask[this.selectFlowTab].groupList);
          }
        }
      } else if (this.selectTag == 'position') {
        if (this.data.positionTreeZNode && this.data.positionTreeZNode.length > 0) {
          treeData = this.data.positionTreeZNode;
        } else {
          if (
            this.data.nextTask &&
            this.data.nextTask[this.selectFlowTab].positionList.length > 0
          ) {
            treeData = this.processTreeData(this.data.nextTask[this.selectFlowTab].positionList);
          }
        }
      }

      //tree 中放入数据
      if (this.selectTag !== 'orgDept' && this.selectTag !== 'root') {
        // 【8523】641版本，流程选人框角色维度可默认展开
        this.expandLevel = '2';
        // this.treeData = [...treeData];
        this.setExpandedKeys(treeData); // 初始化展开节点
      } else if (this.selectTag == 'orgDept') {
        this.expandLevel = '2';
        this.autoLoadAsyn();
      }
    },
    /**
        3.数据加载前参数设置
     */
    beforeLoadData(treeData, parentId) {
      if (treeData.attributes && treeData.attributes.nodeType) {
        this.treeParam.parameter.nodeType = treeData.attributes.nodeType;
      }
      this.treeParam.parameter.formId = '';
      this.treeParam.parameter.id = parentId;
      this.treeNodeDataRef = treeData;
    },
    /**
     *  4. 数据加载完成事件
     */
    afterLoadData(res) {
      if (this.treeCheckable) {
        if (res.data.length > 0) {
          // this.setTreeData(res.data,this.treeNodeDataRef.key);
        }
      }
      if (res.data.length == 0) {
        this.treeNodeDataRef.disableCheckbox = true;
        this.treeNodeDataRef.disabled = true;
        this.treeNodeDataRef.isLeaf = true;
      }
    },
    /**
     * 设置参数---成飞流程自定义选人方案
     */
    setParameter(para, buttonData) {
      if (this.data.currentActivityAttr?.cfSelectUser == 'true') {
        // 成飞复杂角色树
        let toActivityName = '';
        if (this.buttonData && this.buttonData.targetActivityName) {
          toActivityName = this.buttonData.targetActivityName;
        } else if (this.data.nextTask.length > 0) {
          toActivityName = this.data.nextTask[0].currentActivityAttr.activityName;
        }
        let deptImpl = '';
        if (this.data.nextTask.length > 0 && this.data.nextTask[0].currentActivityAttr.deptImpl) {
          deptImpl = this.data.nextTask[0].currentActivityAttr.deptImpl;
        }
        this.treeParam.parameter = {
          nodeType: '',
          //para: JSON.stringify(para),
          para: '',
          roleIds: para.join(','),
          // procInstId:buttonData.buttonData.procinstDbid ,
          procInstId: buttonData.buttonData.processInstanceId,
          fromActivityName: this.data.currentActivityAttr.activityName
            ? this.data.currentActivityAttr.activityName
            : '',
          toActivityName,
          deptImpl,
          processKey: this.data.processKey ? this.data.processKey : '',
          filterUser: '',
          secretLevel: this.data.secretLevel,
          formId: this.data.formId,
          executionId: buttonData.buttonData.executionId,
          // processInstanceId: buttonData.buttonData.processInstanceId,
          taskId: buttonData.buttonData.taskId,
          id: ''
        };
      } else {
        // 平台正常角色树
        this.treeParam.parameter = {
          nodeType: 'role',
          id: buttonData.buttonData.id,
          para: JSON.stringify(para),
          filterUser: '',
          secretLevel: this.data.secretLevel,
          formId: this.data.formId,
          checked: ''
        };
      }
    },
    /**
     * 异步获取角色树---成飞流程自定义选人方案
     */
    async getRole() {
      this.roleSpinning = true;
      let result = await request({
        url: this.roleUrl,
        data: this.treeParam.parameter,
        method: 'post'
      });
      return new Promise(resolve => {
        this.roleSpinning = false;
        if (result.success) {
          resolve(result);
        } else {
          resolve(result);
        }
      });
    },
    /**
     * 角色节点处理 -- 成飞选人
     */
    processInitRole(tree) {
      if (tree && tree.length > 0) {
        tree.map(tim => {
          if (tim.attributes.nodeType != 'user') {
            tim.isLeaf = false;
            tim.disableCheckbox = false;
          }
          if (tim.children) {
            this.processInitRole(tim.children);
          }
        });
      }
    },
    /**
     * 搜索 1.点击搜索
     */
    onSearch(e) {
      if (e) {
        this.showSearchList = true;
        let searchCondition = this.getSearchCondition();
        let selectTag = this.selectTag;
        if (selectTag == 'user') {
          selectTag = 'userList';
        }
        let paramDeptIds = '';
        if (this.selectTag == 'role') {
          if (this.initTreeData && this.initTreeData.length > 0) {
            if (this.initTreeData[0].attributes.nodeType == 'dept') {
              paramDeptIds = this.initTreeData[0].attributes.deptId;
            }
          }
        }
        let parameter = {
          searchContent: e,
          searchType: selectTag,
          searchCondition,
          paramDeptIds,
          secretLevel: this.data.secretLevel
        };
        this.$emit('loading', true);
        request({
          url: this.searchTreeParam.url,
          data: parameter,
          method: this.searchTreeParam.method
        })
          .then(res => {
            if (res.success) {
              if (res.data && res.data.length > 0) {
                this.setSearchList(res.data);
                this.treeData = [...this.searchList];
              } else {
                if (parameter.searchContent != '') {
                  this.$message.warning(res.errorDesc || '未查询到匹配数据！');
                } else {
                  this.$message.warning(`暂无数据！`);
                }
              }
            } else {
              this.showSearchList = false;
            }
            this.$emit('loading', false);
          })
          .catch(() => {
            this.showSearchList = false;
            this.$emit('loading', false);
          });
      } else {
        this.showSearchList = false;
        this.iniTreeData();
      }
    },
    /**
     * 搜索 step 2.拼接查询条件
     */
    getSearchCondition() {
      let conditionList = [];
      let nextTask = null;
      if (this.data.nextTask.length >= this.selectFlowTab) {
        nextTask = this.data.nextTask[this.selectFlowTab];
      }
      if (nextTask) {
        if (this.selectTag == 'user') {
          let condition = {};
          condition.processInstanceId = nextTask.currentActivityAttr.processInstanceId;
          condition.executionId = nextTask.currentActivityAttr.executionId;
          if (
            nextTask.currentActivityAttr.outcome == null ||
            nextTask.currentActivityAttr.outcome == 'null'
          ) {
            condition.outcome = '';
          } else {
            condition.outcome = nextTask.currentActivityAttr.outcome;
          }

          condition.type = nextTask.currentActivityAttr.type;
          condition.targetActivityName = nextTask.currentActivityAttr.targetActivityName;
          condition.userId = nextTask.currentActivityAttr.userId;
          condition.taskId = nextTask.currentActivityAttr.taskId;
          condition.index = nextTask.currentActivityAttr.index;
          conditionList[0] = condition;
        } else if (this.selectTag == 'orgDept') {
          if (nextTask.orgList != null && nextTask.orgList.length && nextTask.orgList.length > 0) {
            for (let i = 0; i < nextTask.orgList.length; i++) {
              let orgInfo = {};
              orgInfo.id = nextTask.orgList[i].id;
              orgInfo.name = nextTask.orgList[i].name;
              orgInfo.type = 'org';
              conditionList.push(orgInfo);
            }
          } else {
            for (let i = 0; i < nextTask.deptList.length; i++) {
              let deptInfo = {};
              deptInfo.id = nextTask.deptList[i].id;
              deptInfo.name = nextTask.deptList[i].name;
              deptInfo.type = 'dept';
              conditionList.push(deptInfo);
            }
          }
        } else if (this.selectTag == 'role') {
          conditionList = nextTask.roleList;
        } else if (this.selectTag == 'model') {
          conditionList = nextTask.modelList;
        } else if (this.selectTag == 'group') {
          conditionList = nextTask.groupList;
        } else if (this.selectTag == 'position') {
          conditionList = nextTask.positionList;
        }
        // if(conditionList.length>0){
        //   conditionList[0].secretLevel = '3'
        // }
      }

      return JSON.stringify(conditionList);
    },
    /**
     * 搜索 step 3.缓存符合查询条件的数据
     */
    setSearchList(list) {
      this.searchList = [];
      if (list && list.length > 0) {
        list.map(user => {
          this.searchList.push({
            key: user.id || user.userId,
            attributes: {
              deptId: user.deptId,
              deptName: user.deptName,
              nodeType: 'user'
            },
            isLeaf: true,
            title: user.userName,
            deptId: user.deptId,
            deptName: user.deptName,
            id: user.id || user.userId,
            name: user.userName,
            orderBy: user.orderBy
          });
        });
      }
    },
    /**
     * 切换选人事件 （父组件调用此方法回显已选人员）
     */
    changeSelectUser(list) {
      this.noChange = true;
      this.setDefaultSelectUser(list);
    },
    /**
     * 切换选人时 设置默认选中的user
     */
    setDefaultSelectUser(list) {
      if (list && list.length > 0) {
        let checkedKeys = [];
        this.selectListMap = {};
        let _this = this;
        list.map(tim => {
          if (tim.selectFlowTab == _this.selectFlowTab) {
            if (tim.users.length == 0) {
              checkedKeys = [];
            } else {
              tim.users.map(user => {
                checkedKeys.push(user.key);
                this.selectListMap[user.id] = user; //初始化listmap
              });
            }
          }
        });
        // this.treeCheckedKeys = checkedKeys;
        this.selectUser = [...list];
        if (checkedKeys.length > 0) {
          this.dealTreeCheckedKeys(this.treeData, checkedKeys);
          this.treeCheckedKeys = [...checkedKeys];
        }
      }
    },
    dealTreeCheckedKeys(treeData, checkedKeys) {
      treeData.map(item => {
        if (!checkedKeys.includes(item.key)) {
          checkedKeys.map((tim, index) => {
            if (tim.substring(0, 32) == item.key.substring(0, 32)) {
              checkedKeys.splice(index, 1, item.key);
              this.selectListMap[item.key.substring(0, 32)] = item;
            }
          });
        }
        if (item.children) {
          this.dealTreeCheckedKeys(item.children, checkedKeys);
        }
      });
    },
    /*  tree 方法 start*/

    // tree 自动初始化节点
    autoLoadAsyn() {
      this.loadDataAsyn(null);
    },
    // tree 请求数据
    loadDataAsyn(node) {
      let _this = this;
      const keyword = this.searchText;

      return new Promise((resolve, reject) => {
        if ((node && node.children) || (node && node?.dataRef && node.dataRef.children)) {
          resolve();
          return;
        }
        // 非查询条件下异步加载节点，修改treeParam传递的node的id
        if (node) {
          let id = node.id;
          _this.beforeLoadData(node, id);
        } else {
          this.iniTreeUrl();
        }
        let param = {};
        if (!keyword || keyword == '') {
          _this.treeParam.parameter.keyword = keyword;
          param = this.treeParam;
        } else {
          param = this.searchTreeParam;
        }
        if (param.url == '' || param.url == null || param.url === undefined) {
          return;
        }
        this.$emit('loading', true);
        request({
          url: param.url,
          data: param.parameter ? param.parameter : '',
          method: param.method
        })
          .then(res => {
            if (res.success) {
              if (res.data.length > 0) {
                // 【12703】【12704】【12705】用户顺序根据orderBy排序
                res.data.sort((a, b) => {
                  return a.attributes.orderBy - b.attributes.orderBy;
                });
                let list = processNodes(res.data);
                if (node) {
                  node.children = [...list];
                  if (node.dataRef) {
                    node.dataRef.children = [...list];
                  }
                  _this.treeData = [..._this.treeData];
                } else {
                  // _this.treeData = [...list];
                  this.setExpandedKeys(list); //初始化展开节点
                }
                // #31392 自动选人选中节点不能回显问题修复
                if (this.treeCheckedKeys.length > 0) {
                  list.map(item => {
                    if (!this.treeCheckedKeys.includes(item.key)) {
                      this.treeCheckedKeys.map((tim, index) => {
                        if (tim.substring(0, 32) == item.key.substring(0, 32)) {
                          this.treeCheckedKeys.splice(index, 1, item.key);
                          this.selectListMap[item.key.substring(0, 32)] = item;
                        }
                      });
                    }
                  });
                  this.treeCheckedKeys = [...this.treeCheckedKeys];
                }
              } else {
                node.dataRef.isLeaf = true;
                _this.treeData = [..._this.treeData];
                this.emptyText = '暂无数据！';
              }
            }
            this.$emit('loading', false);
            resolve(true);
          })
          .catch(response => {
            this.$emit('loading', false);
            resolve(true);
          });
      });
    },
    // tree 选中操作 点击label 选中和取消
    selectTree(selectedKeys, { selected, selectedNodes, node, event }) {
      if (selected && node.attributes.nodeType == 'user') {
        //选中
        if (!this.treeCheckable) {
          this.selectListMap = {}; //单选清空原来的数据
        }
        if (!this.selectListMap[node.id]) {
          this.selectListMap[node.id] = { ...node };
          this.selectUser.forEach(tim => {
            if (tim.selectFlowTab == this.selectFlowTab) {
              tim.users = Object.values(this.selectListMap);
            }
          });
        }
      } else if (!selected && node.attributes.nodeType == 'user') {
        //取消
        if (this.selectListMap[node.id]) {
          delete this.selectListMap[node.id];
        }
        this.selectUser.forEach(tim => {
          if (tim.selectFlowTab == this.selectFlowTab) {
            tim.users = Object.values(this.selectListMap);
          }
        });
      }
      this.setCheckData();
      this.$emit('changeSelectUser', this.selectUser);
    },
    // step3. 复选框点击事件处理
    checkTree(checkedKeys, { checked, checkedNodes, node, event }) {
      //多选
      if (!checked) {
        //节点删除操作，先删除selectListMap中的节点信息
        this.deleteNode(node);
        this.selectUser.map(tim => {
          if (tim.selectFlowTab == this.selectFlowTab) {
            tim.users = Object.values(this.selectListMap);
          }
        });
      } else {
        // 选中操作
        let select = checkedNodes;
        this.setSelectUserList(select);
      }
      this.$emit('changeSelectUser', this.selectUser);
    },
    /*  tree 方法 end*/
    // 删除节点
    deleteNode(node) {
      if (node.isLeaf) {
        delete this.selectListMap[node.id];
      } else if (node.dataRef.children && node.dataRef.children.length > 0) {
        node.dataRef.children.map(tim => {
          this.deleteNode(tim);
        });
      }
    },
    // 过滤出选中的节点
    setSelectUserList(nodes) {
      let selectList = []; //保存选中的节点
      if (nodes) {
        nodes.map(tim => {
          //if (!this.selectListMap[tim.id] && tim.attributes.nodeType !='dept') {
          //过滤用户user添加到右侧列表
          if (!this.selectListMap[tim.id] && tim.attributes && tim.attributes.nodeType == 'user') {
            let str = JSON.stringify(tim);
            let item = JSON.parse(str);
            selectList.push(item);
            this.selectListMap[tim.id] = item;
          }
        });
      }
      this.setDatatoSelectUser(selectList);
    },
    // 选中的节点放入selectUser 中
    setDatatoSelectUser(list) {
      let that = this;
      this.selectUser.map(tim => {
        if (tim.selectFlowTab == that.selectFlowTab) {
          // 暂时解决切换页签左侧值会出现重复的问题
          const ids = tim.users.map(item => item.id);
          const arr = list.filter(node => !ids.includes(node.id));
          tim.users = tim.users.concat(arr);
        }
      });
    },
    // 设置treeCheckedKeys
    setCheckData() {
      const keys = Object.values(this.selectListMap).map(item => item.key);
      this.treeCheckedKeys = [...keys];
    },
    // 加载子节点数据
    loadChildren(list = []) {
      const nodes = list.filter(item => !item.isLeaf);
      if (nodes.length > 0) {
        let promises = [];
        nodes.forEach(element => {
          promises.push(this.loadDataAsyn(element));
        });
        return new Promise(resolve => {
          Promise.all(promises).then(res => {
            resolve(true);
          });
        });
      } else {
        return new Promise(resolve => {
          resolve(true);
        });
      }
    },
    // 初始化展开节点操作
    async setExpandedKeys(list = []) {
      this.loadChildren(list).then(res => {
        const keys = list.map(item => {
          if (!item.isLeaf) return item.key;
        });
        this.expandedKeys = [...keys];
        this.treeData = [...list];
        this.loading = false;
      });
    },
    /**
     * 把平台返回的tree数据转换成 ant.design tree数据
     * @param {*} data  原始数据
     * @param {*} scopedSlot   可通过 slot-scope 属性支持的属性
     * @param {*} scopedSlot   可通过 slot-scope 属性支持的属性
     */
    processTreeData(data, nodeType, scopedSlot = {}, custom) {
      let result = [];
      if (data && data.length > 0) {
        data.forEach(tim => {
          let tree = {
            id: tim.id,
            nodeType: tim.nodeType ? tim.nodeType : nodeType,
            title: tim.name,
            key: tim.id,
            isLeaf: false,
            _parentId: this.defaultMaxParentId,
            disableCheckbox: false,
            disabled: false,
            selectable: true,
            checked: false
          };
          if (custom) {
            custom(tree);
          }
          result.push(tree);
        });
      }
      return result;
    }
  }
};
</script>
