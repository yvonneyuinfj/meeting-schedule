<!--
  选人
-->
<template>
  <a-modal
    :visible="visible"
    :width="800"
    :body-style="{ height: '520px' }"
    wrap-class-name="common-content user-select-content vxe-table--ignore-clear"
    :centered="true"
    :keyboard="false"
    :mask-closable="false"
    :destroy-on-close="true"
    @ok="onConfirm"
    @cancel="onClose"
  >
    <div class="popup-title">
      <h2>
        {{ title }}
        <a-tooltip v-if="titleTips" placement="top">
          <template #title>
            <span>{{ titleTips }}</span>
          </template>
          <avic-icon svg="avic-question-fill" />
        </a-tooltip>
      </h2>
    </div>
    <div style="height: calc(100% - 42px); display: flex">
      <a-tabs
        type="card"
        style="padding: 0"
        class="container-left"
        v-model:activeKey="activeKey"
        @change="onTabChange"
      >
        <a-tab-pane v-for="pane in tabs" :key="pane.id" :tab="pane.name">
          <a-input-search
            v-model:value="keyword"
            :placeholder="searchPlaceholder"
            style="width: 100%; margin-bottom: 8px"
            @search="autoLoadAsyn"
          />
          <a-tree
            :height="380"
            :multiple="selectModel !== 'single'"
            :checkable="selectModel !== 'single'"
            :load-data="loadDataAsyn"
            :tree-data="treeData"
            v-model:checkedKeys="treeCheckedKeys"
            v-model:selectedKeys="treeCheckedKeys"
            v-model:expandedKeys="realExpandedKeys"
            :loadedKeys="treeLoadedKeys"
            :show-line="true && { showLeafIcon: false }"
            :show-icon="false"
            @select="onSelect"
            @check="onCheck"
            @expand="onExpand"
            @load="onLoad"
          >
            <template v-slot:title="{ dataRef }">
              <!-- 选人组件图标 -->
              <span class="user-icon">
                <avic-icon
                  v-if="dataRef.nodeType == 'user'"
                  svg="avic-account-circle-fill"
                  color="#3370ff"
                />
                <avic-icon
                  v-else-if="dataRef.nodeType == 'role'"
                  svg="avic-folder-2-fill"
                  color="#ffb800"
                />
                <avic-icon
                  v-else-if="dataRef.nodeType == 'group'"
                  svg="avic-team-fill"
                  color="#0035cc"
                />
                <avic-icon
                  v-else-if="dataRef.nodeType == 'position' && !dataRef.isExpand"
                  svg="avic-folder-2-fill"
                  color="#ffb800"
                />
                <avic-icon
                  v-else-if="dataRef.nodeType == 'position' && dataRef.isExpand"
                  svg="avic-folder-open-fill"
                  color="#ffb800"
                />
                <avic-icon
                  v-else-if="dataRef.nodeType == 'dept'"
                  svg="avic-organization-chart"
                  color="#24b3b3"
                />
                <avic-icon color="#0035cc" v-else svg="avic-building-fill" />
              </span>
              <span v-if="dataRef.nodeType == 'user' && dataRef.title.indexOf(keyword) > -1">
                {{ dataRef.title.substr(0, dataRef.title.indexOf(keyword)) }}
                <span style="color: #f50">{{ keyword }}</span>
                {{ dataRef.title.substr(dataRef.title.indexOf(keyword) + keyword.length) }}
                <span v-if="moreUserInfo.length > 0">
                  (
                  <span v-for="(infoItem, index) in moreUserInfo" :key="infoItem">
                    {{ dataRef.attributes ? dataRef.attributes[infoItem] : '' }}
                    <span v-if="index < moreUserInfo.length - 1">,</span>
                  </span>
                  )
                </span>
              </span>
              <span v-else>
                {{ dataRef.title }}
                <span v-if="dataRef.nodeType == 'user' && moreUserInfo.length > 0">
                  (
                  <span v-for="(infoItem, index) in moreUserInfo" :key="infoItem">
                    {{ dataRef.attributes ? dataRef.attributes[infoItem] : '' }}
                    <span v-if="index < moreUserInfo.length - 1">,</span>
                  </span>
                  )
                </span>
              </span>
            </template>
          </a-tree>
        </a-tab-pane>
      </a-tabs>
      <div class="container-right">
        <div class="container-right-top">
          已选{{ name + ` (` + selectLength + `)` }}
          <delete-outlined class="total-delete-icon" title="清空" @click="handleDelTotal" />
        </div>
        <div class="checkgroup">
          <s-table
            :columns="selectColumns"
            :data-source="selectList"
            :pagination="false"
            :showHeader="false"
            :row-height="32"
            :height="428"
            childrenColumnName="hasChild"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'title'">
                <span class="cell-txt" :title="record['title']">
                  <avic-icon color="#3370ff" svg="avic-account-circle-fill" />
                  <span style="color: #1d2129">{{ text }}</span>
                  <span
                    style="color: #86909c"
                    v-if="
                      record.nodeType == 'user' &&
                      moreUserInfo.length > 0 &&
                      record.attributes[moreUserInfo[0]]
                    "
                  >
                    (
                    <span v-for="(infoItem, index) in moreUserInfo" :key="infoItem">
                      {{ record.attributes[infoItem] }}
                      <span v-if="index < moreUserInfo.length - 1">,</span>
                    </span>
                    )
                  </span>
                  &nbsp;
                  <span style="color: #86909c">
                    {{
                      record.attributes && record.attributes.deptname
                        ? '(' + record.attributes.deptname + ')'
                        : ''
                    }}
                  </span>
                </span>
                <span class="checkclose" title="删除" @click="handleDelItem($event, record)">
                  <avic-icon svg="avic-close-fill" />
                </span>
              </template>
            </template>
          </s-table>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { httpRequest } from './api';
const { proxy } = getCurrentInstance();
const props = defineProps({
  /** 是否显示 */
  show: { type: Boolean, required: true, default: false },
  /** 右侧列表已选标题文案 */
  name: { type: String, default: '人员' },
  /** 标题 */
  title: { type: String, default: '人员选择' },
  /** 辅助提示信息 */
  titleTips: { type: String, default: '' },
  /** 搜索提示 */
  searchPlaceholder: { type: String, default: '请输入用户信息' },
  /** 单选 single ，多选 multi */
  selectModel: { type: String, default: 'single' },
  /** 多选最多选择数量 */
  maxSelect: { type: Number, default: 0 },
  /** 默认值 */
  defaultValue: { type: [Object, String], default: '' },
  /** 双向绑定值 */
  modelChange: {
    type: Object,
    default: () => {
      return { ids: '', names: '' };
    }
  },
  /** tab页签集合 */
  userSelectTabs: { type: Array, default: () => [] },
  /** 展示人员的额外信息 */
  moreUserInfo: { type: Array, default: () => [] },
  /** 组织范围 */
  viewScope: { type: String, default: '' },
  /** 默认加载组织id */
  defaultOrgId: { type: String, default: '' },
  /** 默认加载部门id */
  defaultLoadDeptId: { type: String, default: '' },
  /** 默认加载群组id */
  defaultLoadGroupId: { type: String, default: '' },
  /** 默认加载角色id */
  defaultLoadRoleId: { type: String, default: '' },
  /** 默认加载岗位id */
  defaultLoadPositionId: { type: String, default: '' },
  /** 人员密级过滤 */
  secretLevel: { type: String, default: '' },
  /** 是否展示无效用户 */
  viewSystemUser: { type: Boolean, default: false },
  /** 部门tab页初始展开层级 */
  deptTabExpandLevel: { type: Number, default: 2 },
  /** 关键字查询时最大用户数限制 */
  searchNumLimit: { type: Number, default: 200 },
  /** 自定义参数 */
  customParam: { type: Object, default: () => {} },
  /** 搜索自定义参数 */
  customSearchParam: { type: Object, default: () => {} },
  /** 获取初始化用户信息请求地址 */
  getInitUserInfoUrl: { type: String, default: '/appsys/common/select/getSelectedUserInfo/v1' },
  /** 获取初始化用户信息请求类型 */
  getInitUserInfoMethod: { type: String, default: 'post' },
  /** 用户请求地址 */
  userUrl: { type: String, default: '/appsys/common/select/getUserSelectList/v1' },
  /** 用户请求类型 */
  methodType: { type: String, default: 'post' },
  /** 搜索用户请求地址 */
  userSearchUrl: { type: String, default: '/appsys/common/select/getUserSelectList/v1' }
});

let visible = ref(false),
  tabs = ref([]),
  tabsMap = {
    dept: { id: '1', name: '部门', type: 'dept' },
    group: { id: '2', name: '群组', type: 'group' },
    role: { id: '3', name: '角色', type: 'role' },
    position: { id: '4', name: '岗位', type: 'position' }
  },
  activeKey = ref('1'),
  currentTab = 'dept',
  loadedTabs = ['dept'],
  treeParam = {
    url: props.userUrl,
    parameter: {},
    method: props.methodType
  },
  searchTreeParam = {
    url: props.userSearchUrl,
    parameter: {},
    method: props.methodType
  },
  keyword = ref(''),
  keywordDept = ref(''),
  keywordGroup = ref(''),
  keywordRole = ref(''),
  keywordPosition = ref(''),
  searchResultFlag = ref(false),
  searchResultFlagDept = ref(false),
  searchResultFlagGroup = ref(false),
  searchResultFlagRole = ref(false),
  searchResultFlagPosition = ref(false),
  treeData = ref([]),
  treeDataDept = ref([]),
  treeDataGroup = ref([]),
  treeDataRole = ref([]),
  treeDataPosition = ref([]),
  treeCheckedKeys = ref([]),
  realExpandedKeys = ref([]), //树节点最终使用的展开节点key集合
  treeExpandedKeys = ref([]),
  treeExpandedKeysDept = ref([]),
  treeExpandedKeysGroup = ref([]),
  treeExpandedKeysRole = ref([]),
  treeExpandedKeysPosition = ref([]),
  treeLoadedKeys = ref([]),
  treeLoadedKeysDept = ref([]),
  treeLoadedKeysGroup = ref([]),
  treeLoadedKeysRole = ref([]),
  treeLoadedKeysPosition = ref([]),
  selectColumns = ref([
    {
      title: '已选人员',
      dataIndex: 'title',
      rowDrag: () => {
        return props.selectModel == 'multi' ? true : false;
      }
    }
  ]),
  selectList = ref([]),
  selectListMap = {},
  selectLength = ref(0),
  treeClickCount = ref(0); // 树点击次数

watch(
  () => props.show,
  newV => {
    visible.value = newV;
    if (newV === true) {
      init();
    }
  },
  { immediate: true }
);
watch(
  () => props.userSelectTabs,
  newV => {
    if (newV && newV.length > 0) {
      let list = [];
      newV.map(tim => {
        list.push(tabsMap[tim]);
      });
      tabs.value = list;
      activeKey.value = tabs.value[0].id;
      currentTab = tabs.value[0].type;
      loadedTabs = [tabs.value[0].type];
    }
  },
  { immediate: true }
);
watch(
  () => props.defaultValue,
  defaultValue => {
    if (defaultValue && defaultValue.ids) {
      let ids = defaultValue.ids.split(';');
      let names = [];
      if (defaultValue.names) {
        names = defaultValue.names.split(';');
      }
      if (ids.length === names.length) {
        initDataNotHttp(defaultValue);
      } else {
        loadDefaultValue(defaultValue.ids);
      }
    } else if (Object.prototype.toString.call(defaultValue) === '[object String]') {
      loadDefaultValue(defaultValue);
    }
  },
  { immediate: true }
);
watch(
  () => props.modelChange,
  newV => {
    if (newV && newV.ids) {
      let ids = newV.ids.split(';');
      let names = [];
      if (newV.names) {
        names = newV.names.split(';');
      }
      if (ids.length === names.length) {
        initDataNotHttp(newV);
      }
    } else {
      if (selectList.value.length > 0) {
        emptySelect();
      }
    }
  },
  { immediate: true, deep: true }
);
watch(
  selectList,
  newV => {
    selectLength.value = newV.length;
  },
  { immediate: true }
);
watch(
  keyword,
  newV => {
    if (currentTab === 'dept') {
      keywordDept.value = newV;
    } else if (currentTab === 'group') {
      keywordGroup.value = newV;
    } else if (currentTab === 'role') {
      keywordRole.value = newV;
    } else if (currentTab === 'position') {
      keywordPosition.value = newV;
    }
  },
  { immediate: true }
);
watch(
  treeExpandedKeys,
  newV => {
    realExpandedKeys.value = [...newV];
    if (currentTab === 'dept') {
      treeExpandedKeysDept.value = [...newV];
    } else if (currentTab === 'group') {
      treeExpandedKeysGroup.value = [...newV];
    } else if (currentTab === 'role') {
      treeExpandedKeysRole.value = [...newV];
    } else if (currentTab === 'position') {
      treeExpandedKeysPosition.value = [...newV];
    }
  },
  { immediate: true }
);
watch(
  treeLoadedKeys,
  newV => {
    if (currentTab === 'dept') {
      treeLoadedKeysDept.value = [...newV];
    } else if (currentTab === 'group') {
      treeLoadedKeysGroup.value = [...newV];
    } else if (currentTab === 'role') {
      treeLoadedKeysRole.value = [...newV];
    } else if (currentTab === 'position') {
      treeLoadedKeysPosition.value = [...newV];
    }
  },
  { immediate: true }
);
watch(
  searchResultFlag,
  newV => {
    if (currentTab === 'dept') {
      searchResultFlagDept.value = newV;
    } else if (currentTab === 'group') {
      searchResultFlagGroup.value = newV;
    } else if (currentTab === 'role') {
      searchResultFlagRole.value = newV;
    } else if (currentTab === 'position') {
      searchResultFlagPosition.value = newV;
    }
  },
  { immediate: true }
);

onBeforeMount(() => {
  setTreeParameter('', '');
  setTreeSearchParameter('');
});
onMounted(() => {
  // 初始化节点数据
  autoLoadAsyn();
  // 处理默认值
  if (props.defaultValue) {
    let defaultValue = props.defaultValue;
    if (defaultValue && defaultValue.ids) {
      let ids = defaultValue.ids.split(';');
      let names = [];
      if (defaultValue.names) {
        names = defaultValue.names.split(';');
      }
      if (ids.length == names.length) {
        initDataNotHttp(defaultValue);
      } else {
        loadDefaultValue(defaultValue.ids);
      }
    } else if (Object.prototype.toString.call(defaultValue) === '[object String]') {
      loadDefaultValue(defaultValue);
    }
  }
});

const $emit = defineEmits(['defaultBack', 'callBack', 'close']);
/**
 * 初始化事件
 */
function init() {
  setTreeParameter('', '');
  setTreeSearchParameter('');
  if (!props.modelChange.ids) {
    emptySelect();
  }
}
/**
 * 设置加载用户节点需要传的数据
 */
function setTreeParameter(id = '', nodeType = '') {
  treeParam.parameter = {
    viewScope: props.viewScope,
    defaultOrgId: props.defaultOrgId,
    nodeType,
    id,
    currentTab: currentTab,
    defaultLoadDeptId: props.defaultLoadDeptId,
    defaultLoadGroupId: props.defaultLoadGroupId,
    defaultLoadRoleId: props.defaultLoadRoleId,
    defaultLoadPositionId: props.defaultLoadPositionId,
    viewSystemUser: props.viewSystemUser,
    secretLevel: props.secretLevel,
    expandLevel: props.deptTabExpandLevel
  };
  if (Object.keys(props.customParam)) {
    Object.assign(treeParam.parameter, props.customParam);
  }
}
/**
 * 设置搜索用户节点需要传的数据
 */
function setTreeSearchParameter(keyword) {
  let select = [];
  selectList.value.map(tim => {
    select.push(tim.id);
  });
  searchTreeParam.parameter = {
    viewScope: props.viewScope,
    defaultOrgId: props.defaultOrgId,
    currentTab: currentTab,
    selectedUser: select.join(','),
    defaultLoadDeptId: props.defaultLoadDeptId,
    defaultLoadGroupId: props.defaultLoadGroupId,
    defaultLoadRoleId: props.defaultLoadRoleId,
    defaultLoadPositionId: props.defaultLoadPositionId,
    viewSystemUser: props.viewSystemUser,
    secretLevel: props.secretLevel,
    searchText: keyword,
    numLimit: props.searchNumLimit
  };
  if (Object.keys(props.customSearchParam)) {
    Object.assign(searchTreeParam.parameter, props.customSearchParam);
  }
}
/**
 * 自动初始化节点
 */
function autoLoadAsyn() {
  if (keyword.value == '') {
    treeExpandedKeys.value = [];
  }
  treeLoadedKeys.value = [];
  searchResultFlag.value = false;
  loadDataAsyn(null);
}
/**
 * 异步加载数据
 */
function loadDataAsyn(node) {
  return new Promise(resolve => {
    if (node && node.children && node.children.length > 0) {
      resolve();
      return;
    }
    if (node && !treeLoadedKeys.value.includes(node.id)) {
      treeLoadedKeys.value.push(node.id);
      treeLoadedKeys.value = [...treeLoadedKeys.value];
    }
    if (node) {
      setTreeParameter(node.id, node.nodeType);
    } else {
      setTreeParameter('', '');
    }
    let param = {};
    if (keyword.value == '' || searchResultFlag.value === true) {
      treeParam.parameter.searchText = '';
      param = treeParam;
    } else {
      setTreeSearchParameter(keyword.value);
      param = searchTreeParam;
    }
    httpRequest(param.url, param.parameter ? param.parameter : '', param.method)
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          afterLoadData(res);
          if (!node) {
            treeData.value = res.data;
            treeData.value = [...treeData.value];
            if (keyword.value != '') {
              // 全部展开
              let expandedKeys = [];
              getExpandedKeys(treeData.value, expandedKeys);
              treeExpandedKeys.value = expandedKeys;
            } else {
              nextTick(() => {
                if (currentTab === 'dept') {
                  treeExpandedKeys.value = treeData.value ? [treeData.value[0].id] : [];
                }
              });
            }
          } else {
            node.dataRef.children = res.data;
            treeData.value = [...treeData.value];
          }
          if (currentTab === 'dept') {
            treeDataDept.value = [...treeData.value];
          } else if (currentTab === 'group') {
            treeDataGroup.value = [...treeData.value];
          } else if (currentTab === 'role') {
            treeDataRole.value = [...treeData.value];
          } else if (currentTab === 'position') {
            treeDataPosition.value = [...treeData.value];
          }
        } else {
          if (keyword.value != '') {
            proxy.$message.warning(res.errorDesc || '未查询到匹配数据！');
            searchResultFlag.value = true;
          }
          proxy.$message.warning(`${node.title} 节点下无数据。`);
        }
        resolve();
      })
      .catch(() => {});
  });
}
/**
 * 搜索时，获取所有需要展开的节点
 */
function getExpandedKeys(data, expandedKeys) {
  if (data && data.length > 0) {
    data.map(item => {
      if (item.children && item.children.length > 0) {
        expandedKeys.push(item.id);
        getExpandedKeys(item.children, expandedKeys);
      }
    });
  }
}
/**
 * 展开/收起节点
 */
function onExpand(expandedKeys) {
  treeExpandedKeys.value = [...expandedKeys];
}
/**
 * 节点加载完毕
 */
function onLoad(loadedKeys) {
  treeLoadedKeys.value = [...loadedKeys];
}
/**
 * 切换tab页签事件
 */
function onTabChange(val) {
  activeKey.value = val;
  currentTab = tabs.value.filter(({ id }) => id == val)?.[0]?.type;
  if (currentTab === 'dept') {
    keyword.value = keywordDept.value;
    searchResultFlag.value = searchResultFlagDept.value;
  } else if (currentTab === 'group') {
    keyword.value = keywordGroup.value;
    searchResultFlag.value = searchResultFlagGroup.value;
  } else if (currentTab === 'role') {
    keyword.value = keywordRole.value;
    searchResultFlag.value = searchResultFlagRole.value;
  } else if (currentTab === 'position') {
    keyword.value = keywordPosition.value;
    searchResultFlag.value = searchResultFlagPosition.value;
  }
  realExpandedKeys.value = [
    ...new Set([
      ...treeExpandedKeysDept.value,
      ...treeExpandedKeysGroup.value,
      ...treeExpandedKeysRole.value,
      ...treeExpandedKeysPosition.value
    ])
  ];
  if (loadedTabs.indexOf(currentTab) == -1) {
    loadedTabs.push(currentTab);
    setTreeParameter('', '');
    setTreeSearchParameter('');
    autoLoadAsyn();
  } else {
    if (currentTab === 'dept') {
      treeData.value = [...treeDataDept.value];
      treeLoadedKeys.value = [...treeLoadedKeysDept.value];
    } else if (currentTab === 'group') {
      treeData.value = [...treeDataGroup.value];
      treeLoadedKeys.value = [...treeLoadedKeysGroup.value];
    } else if (currentTab === 'role') {
      treeData.value = [...treeDataRole.value];
      treeLoadedKeys.value = [...treeLoadedKeysRole.value];
    } else if (currentTab === 'position') {
      treeData.value = [...treeDataPosition.value];
      treeLoadedKeys.value = [...treeLoadedKeysPosition.value];
    }
    treeData.value = [...treeData.value];
    treeLoadedKeys.value = [...treeLoadedKeys.value];
  }
}
/**
 * 数据加载完成，处理数据
 */
function afterLoadData(res) {
  setTreeData(res.data);
}
/**
 * 处理数据
 */
function setTreeData(data) {
  if (data && data.length > 0) {
    data.map(tim => {
      tim.disabled = false;
      if (props.selectModel == 'multi') {
        tim.selectable = false;
        if (tim.isLeaf && tim.nodeType != 'user') {
          tim.disableCheckbox = true;
        } else {
          tim.disableCheckbox = false;
        }
      } else {
        if (tim.nodeType !== 'user') {
          tim.selectable = false;
        } else {
          tim.selectable = true;
        }
      }
      if (tim.children) {
        setTreeData(tim.children);
      }
    });
  }
}
/**
 * 点击树节点事件 单击 / 双击（300毫秒内连续点击两次视为双击）
 */
function onSelect(_, { selected, node }) {
  //记录点击次数
  treeClickCount.value++;
  //单次点击次数超过2次不作处理,直接返回,也可以拓展成多击事件
  if (treeClickCount.value >= 2) {
    return;
  }
  //计时器,计算300毫秒为单位,可自行修改
  window.setTimeout(() => {
    if (treeClickCount.value == 1) {
      //把次数归零
      treeClickCount.value = 0;
      //单击事件
      if (selected) {
        selectListMap = {};
        selectListMap[node.id] = { ...node };
        selectList.value = [];
        selectList.value = [{ ...node }];
      } else {
        selectListMap = {};
        selectList.value = [];
      }
      setCheckedData();
    } else if (treeClickCount.value > 1) {
      //把次数归零
      treeClickCount.value = 0;
      //双击事件
      if (props.selectModel == 'single') {
        if (node.nodeType === 'user') {
          selectListMap = {};
          selectListMap[node.id] = { ...node };
          selectList.value = [];
          selectList.value = [{ ...node }];
          setCheckedData();
          onConfirm();
        }
      }
    }
  }, 300);
}
/**
 * 多选点击复选框事件
 */
function onCheck(checkedKeys, { checked, checkedNodes, node }) {
  if (props.maxSelect > 0 && checkedKeys.length > props.maxSelect) {
    proxy.$message.warning(`已设置最多选择${props.maxSelect}个人员！`);
    setCheckedData();
  } else {
    if (checked) {
      setSelectList(checkedNodes);
      setCheckedData();
    } else {
      setUnSelectList(node);
      setCheckedData();
    }
  }
}
/**
 * 多选选中节点时，处理右侧列表数据
 */
function setSelectList(nodes) {
  if (nodes) {
    nodes.map(tim => {
      if (!selectListMap[tim.id] && tim.nodeType == 'user') {
        let item = proxy.$lodash.cloneDeep(tim);
        selectList.value.push(item);
        selectListMap[tim.id] = item;
        selectList.value = [...selectList.value];
      }
    });
  }
}
/**
 * 多选取消选中节点时，处理右侧列表数据
 */
function setUnSelectList(node) {
  let childrenIds = [];
  getTarget(treeData.value, node.id, childrenIds);
  selectList.value = selectList.value.filter(item => !childrenIds.includes(item.id));
  childrenIds.map(item => {
    delete selectListMap[item];
  });
}
function getTarget(data, id, childrenIds) {
  if (data && data.length > 0 && id) {
    data.map(item => {
      if (item.id == id) {
        childrenIds.push(item.id);
        if (item.children) {
          getChildren(item.children, childrenIds);
        }
      } else {
        if (item.children) {
          getTarget(item.children, id, childrenIds);
        }
      }
    });
  }
}
function getChildren(data, childrenIds) {
  if (data && data.length > 0) {
    data.map(item => {
      childrenIds.push(item.id);
      if (item.children) {
        getChildren(item.children, childrenIds);
      }
    });
  }
}
/**
 * 设置树选中节点
 */
function setCheckedData() {
  let list = [];
  selectList.value.map(tim => {
    list.push(tim.id);
  });
  treeCheckedKeys.value = list;
}
/**
 * 默认值只有ids时，加载默认数据的处理
 */
function loadDefaultValue(ids) {
  if (ids) {
    let userIds = [];
    userIds = ids.split(';');
    findInitUserInfo(userIds);
  }
}
/**
 * 根据ids获取用户信息
 */
function findInitUserInfo(userIds) {
  emptySelect();
  httpRequest(props.getInitUserInfoUrl, userIds, props.getInitUserInfoMethod)
    .then(res => {
      if (res.success) {
        res.data.map(tim => {
          if (tim.id) {
            selectList.value.push({
              id: tim.id,
              nodeType: 'user',
              title: tim.name,
              key: tim.id,
              isLeaf: true,
              children: [],
              attributes: {
                deptid: tim.deptid,
                deptname: tim.deptname
              }
            });
            selectListMap[tim.id] = tim;
            treeCheckedKeys.value.push(tim.id);
          }
        });
      }
      const result = setResultData();
      setTimeout(() => {
        $emit('defaultBack', result);
      }, 100);
    })
    .catch(() => {});
}
/**
 * 默认值有ids和names时，加载默认数据的处理
 */
function initDataNotHttp(data) {
  emptySelect();
  let ids = data.ids.split(';');
  if (ids.length > 0) {
    let names = data.names.split(';');
    let deptIds = [];
    let deptNames = [];
    if (data.deptid && data.deptname) {
      deptIds = data.deptid.split(';');
      deptNames = data.deptname.split(';');
      setInitData(ids, names, deptIds, deptNames);
    } else {
      let userIds = data.ids.split(';');
      getInitUserInfoFunc(
        {
          url: props.getInitUserInfoUrl,
          parameter: userIds,
          method: props.getInitUserInfoMethod
        },
        result => {
          result.map(item => {
            deptIds.push(item.deptid);
            deptNames.push(item.deptname);
          });
          setInitData(ids, names, deptIds, deptNames);
        },
        () => {
          setInitData(ids, names, deptIds, deptNames);
        }
      );
    }
  }
}
/**
 * 根据ids获取用户信息
 */
function getInitUserInfoFunc(param, successCallback, errorCallback) {
  httpRequest(param.url, param.parameter, param.method)
    .then(res => {
      if (res.success && res.data) {
        if (successCallback) {
          successCallback(res.data);
        }
      } else {
        if (errorCallback) {
          errorCallback();
        }
      }
    })
    .catch(() => {
      if (errorCallback) {
        errorCallback();
      }
    });
}
/**
 * 处理默认数据
 */
function setInitData(ids, names, deptIds, deptNames) {
  let list = [];
  selectList.value = [];
  selectListMap = {};
  ids.map((tim, i) => {
    let item = {
      id: tim,
      nodeType: 'user',
      title: names[i],
      key: tim,
      isLeaf: true,
      children: [],
      attributes: {
        deptid: deptIds[i] ? deptIds[i] : '',
        deptname: deptNames[i] ? deptNames[i] : ''
      }
    };
    selectList.value.push(item);
    list.push(tim);
    selectListMap[tim] = item;
  });
  treeCheckedKeys.value = list;
}
/**
 * 删除右侧列表单条数据
 */
function handleDelItem(e, item) {
  e.stopPropagation();
  let newSelectList = [];
  for (let i = 0; i < selectList.value.length; i++) {
    if (selectList.value[i].id != item.id) {
      newSelectList.push(selectList.value[i]);
    }
  }
  selectList.value = newSelectList;
  delete selectListMap[item.id];
  setCheckedData();
}
/**
 * 清空右侧列表
 */
function handleDelTotal() {
  emptySelect();
}
/**
 * 清空选中人员
 */
function emptySelect() {
  treeCheckedKeys.value = [];
  selectList.value = [];
  selectListMap = {};
}
/**
 * 清除查询条件
 */
function emptyQuery() {
  currentTab = tabs.value[0].type;
  loadedTabs = [tabs.value[0].type];
  setTreeParameter('', '');
  setTreeSearchParameter('');
  activeKey.value = '1';
  keyword.value = '';
  autoLoadAsyn();
}
/**
 * 点击确定事件
 */
function onConfirm() {
  const result = setResultData();
  if (result.ids) {
    $emit('callBack', result, selectList.value);
  } else {
    $emit('callBack', {});
  }
  emptyQuery();
  visible.value = false;
}
/**
 * 处理返回的数据格式
 */
function setResultData() {
  let ids = '';
  let names = '';
  let deptid = '';
  let deptname = '';
  if (selectList.value && selectList.value.length > 0) {
    selectList.value.map((res, i) => {
      if (i > 0) {
        ids += ';';
        names += ';';
        if (res.attributes) {
          deptid += ';';
          deptname += ';';
        }
      }
      ids += res.id;
      if (props.moreUserInfo && props.moreUserInfo.length > 0) {
        let newTitle = res.title;
        props.moreUserInfo.forEach((item, index) => {
          if (index == 0) {
            newTitle += '(';
          }
          if (index < props.moreUserInfo.length - 1 && res.attributes) {
            newTitle += res.attributes[item] + ',';
          } else if (res.attributes) {
            newTitle += res.attributes[item];
          }
          if (index == props.moreUserInfo.length - 1) {
            newTitle += ')';
          }
        });
        names += newTitle;
      } else {
        names += res.title;
      }
      if (res.attributes) {
        deptid += res.attributes.deptid;
        deptname += res.attributes.deptname;
      }
    });
  }
  let result = null;
  if (deptid) {
    result = { ids, names, deptid, deptname };
  } else {
    result = { ids, names };
  }
  return result;
}
/**
 * 点击取消、关闭事件
 */
function onClose() {
  emptyQuery();
  $emit('close');
}
</script>
