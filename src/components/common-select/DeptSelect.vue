<!--
  选部门
-->
<template>
  <a-modal
    :width="800"
    :body-style="{ height: '520px' }"
    wrap-class-name="common-content dept-select-content vxe-table--ignore-clear"
    :centered="true"
    :visible="visible"
    :keyboard="false"
    :destroy-on-close="true"
    :mask-closable="false"
    @ok="confirm"
    @cancel="closeModal"
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
      <div class="container-left" style="padding: 8px">
        <a-input-search
          v-model:value="keyword"
          :placeholder="searchPlaceholder"
          style="width: 100%; margin-bottom: 8px"
          @search="autoLoadAsyn"
        />
        <a-tree
          :height="450"
          :multiple="selectModel != 'single'"
          :checkable="selectModel != 'single'"
          :load-data="loadDataAsyn"
          :tree-data="treeData"
          v-model:checkedKeys="treeCheckedKeys"
          v-model:selectedKeys="treeCheckedKeys"
          v-model:expandedKeys="expandedKeys"
          :loadedKeys="loadedKeys"
          :show-line="true && { showLeafIcon: false }"
          @select="selectTree"
          @check="checkTree"
          @expand="onExpand"
          @load="onLoad"
        >
          <template v-slot:title="{ dataRef }">
            <span class="user-icon">
              <avic-icon
                v-if="dataRef.nodeType == 'dept'"
                svg="avic-organization-chart"
                color="#24b3b3"
              />
              <avic-icon color="#0035cc" v-else svg="avic-building-fill" />
            </span>
            <span v-if="dataRef.title.indexOf(keyword) > -1">
              {{ dataRef.title.substr(0, dataRef.title.indexOf(keyword)) }}
              <span style="color: #f50">
                {{ keyword }}
              </span>
              {{ dataRef.title.substr(dataRef.title.indexOf(keyword) + keyword.length) }}
            </span>
            <span v-else>
              {{ dataRef.title }}
            </span>
          </template>
        </a-tree>
      </div>
      <div class="container-right">
        <div class="container-right-top">
          已选{{ name + ` (` + selectLength + `)` }}
          <delete-outlined class="total-delete-icon" title="清空" @click="handleDelTotal" />
        </div>
        <div class="checkgroup">
          <s-table
            :columns="selectListColumns"
            :data-source="selectList"
            :showHeader="false"
            :scroll="{ y: 380 }"
            :row-height="32"
            :pagination="false"
            childrenColumnName="hasChild"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.key === 'title'">
                <span class="" :title="record['title']">
                  <avic-icon svg="avic-organization-chart" color="#24b3b3" />
                  {{ text }}
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
import { getInitDeptInfo, httpRequest } from './api';
const { proxy } = getCurrentInstance();
const props = defineProps({
  /** 是否显示 */
  show: { type: Boolean, required: true, default: false, key: 'title' },
  /** 右侧列表已选标题文案 */
  name: { type: String, default: '部门' },
  /** 标题 */
  title: { type: String, default: '部门选择' },
  /** 辅助提示信息 */
  titleTips: { type: String, default: '' },
  /** 搜索提示 */
  searchPlaceholder: { type: String, default: '请输入部门名称' },
  /** 单选 single ，多选 multi */
  selectModel: { type: String, required: false, default: 'single' },
  /** 多选最多选择数量 */
  maxSelect: { type: Number, required: false, default: 0 },
  /** 默认值 */
  defaultValue: { type: Object, required: false, default: () => null },
  /** 双向绑定改变事件 */
  modelChange: { type: Object, required: false, default: () => null },
  /** 组织范围 */
  viewScope: { type: String, required: false, default: '' },
  /** 默认加载指定组织的id */
  defaultOrgId: { type: String, required: false, default: '' },
  /** 默认加载部门id */
  defaultLoadDeptId: { type: String, required: false, default: '' },
  /** 部门等级 */
  deptLevel: { type: Number, required: false },
  /** 是否显示无效部门 */
  viewSystemDept: { type: Boolean, required: false, default: false },
  /** 部门请求地址 */
  deptUrl: {
    type: String,
    required: false,
    default: '/appsys/common/select/getDeptSelectList/v1'
  },
  /** 请求类型 */
  methodType: { type: String, required: false, default: 'post' },
  /** 部门搜索请求地址 */
  deptSearchUrl: {
    type: String,
    required: false,
    default: '/appsys/common/select/getDeptSelectList/v1'
  },
  /** 选部门初始展开层级 */
  deptExpandLevel: { type: Number, default: 2 },
  /** 自定义参数 */
  customParam: { type: Object, required: false, default: null },
  /** 自定义搜索参数 */
  customSearchParam: { type: Object, required: false, default: null }
});
let visible = ref(false), //窗口是否显示
  // 树组件需要的加载数据格式
  treeParam = {
    url: props.deptUrl,
    parameter: {},
    method: props.methodType
  },
  // 树搜索组件需要的加载数据格式
  searchTreeParam = {
    url: props.deptSearchUrl,
    parameter: {},
    method: props.methodType
  },
  treeData = ref([]),
  keyword = ref(''),
  searchResultFlag = ref(false),
  treeCheckedKeys = ref([]), //树选中控制
  expandedKeys = ref([]),
  loadedKeys = ref([]),
  maxSelectNumber = ref(0), //最多选择数量
  selectListColumns = ref([
    {
      title: '已选部门',
      dataIndex: 'title',
      key: 'title',
      rowDrag: true
    }
  ]),
  selectList = ref([]), //选中的部门
  selectListMap = {}, //选中的部门
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
  selectList,
  newV => {
    selectLength.value = newV.length;
  },
  { immediate: true }
);
watch(
  () => props.defaultValue,
  defaultValue => {
    if (defaultValue) {
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
  }
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
      if (ids.length == names.length) {
        initDataNotHttp(newV);
      }
    } else {
      if (selectList.value.length > 0) {
        empty();
      }
    }
  },
  { immediate: true, deep: true }
);
watch(
  () => props.maxSelect,
  newV => {
    if (newV > 0) {
      maxSelectNumber.value = newV;
    }
  },
  { immediate: true, deep: true }
);

onBeforeMount(() => {
  setTreeParam('', '');
  autoLoadAsyn();
});

onMounted(() => {
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

const $emit = defineEmits(['close', 'callBack', 'defaultBack']);

/**
 * 初始化函数
 */
function init() {
  setTreeParam();
  if (!props.modelChange.ids) {
    empty();
  }
}

/**
 * 加载默认数据
 */
function loadDefaultValue(ids) {
  if (ids.value) {
    let deptids = [];
    deptids = ids.value.split(';');
    initDeptInfo(deptids);
  }
}

/**
 * 加载初始化选中的部门
 */
function initDeptInfo(data) {
  empty();
  getInitDeptInfo(data)
    .then(res => {
      if (res.success && res.data) {
        res.data.map(tim => {
          selectList.value.push({
            id: tim.id,
            nodeType: 'dept',
            title: tim.name,
            key: tim.id,
            isLeaf: true,
            children: []
          });
          treeCheckedKeys.value.push(tim.id);
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
 * 初始化回填部门，不去请求http
 */
function initDataNotHttp(data) {
  empty();
  let type = 'dept';
  let ids = data.ids.split(';');
  let names = data.names.split(';');
  selectList.value = [];
  selectListMap = {};
  ids.map((tim, i) => {
    let item = {
      id: tim,
      nodeType: type,
      title: names[i],
      key: tim,
      isLeaf: true,
      children: []
    };
    selectList.value.push(item);
    selectListMap[tim] = item;
  });
  treeCheckedKeys.value = ids;
}

/**
 *  加载部门节点需要传的数据
 */
function setTreeParam(id = '', nodeType = '') {
  treeParam.parameter = {
    viewScope: props.viewScope,
    defaultOrgId: props.defaultOrgId,
    nodeType,
    id,
    viewSystemDept: props.viewSystemDept,
    defaultLoadDeptId: props.defaultLoadDeptId,
    deptLevel: props.deptLevel
  };
  if (Object.keys(props.customParam)) {
    Object.assign(treeParam.parameter, props.customParam);
  }
}

/**
 * 搜索部门节点需要传的数据
 */
function setTreeSearchParam(e) {
  let select = [];
  selectList.value.map(tim => {
    select.push(tim.id);
  });
  searchTreeParam.parameter = {
    viewScope: props.viewScope,
    defaultOrgId: props.defaultOrgId,
    selectedDept: select.join(','),
    viewSystemDept: props.viewSystemDept,
    defaultLoadDeptId: props.defaultLoadDeptId,
    deptLevel: props.deptLevel,
    searchText: e
  };
  if (Object.keys(props.customSearchParam)) {
    Object.assign(searchTreeParam.parameter, props.customSearchParam);
  }
}

/**
 * tree 自动初始化节点
 */
function autoLoadAsyn() {
  // expandedKeys.value = [];
  loadedKeys.value = [];
  searchResultFlag.value = false;
  loadDataAsyn(null);
}

/**
 * tree 请求数据
 */
function loadDataAsyn(node) {
  return new Promise(resolve => {
    if (node && node.children && node.children.length > 0) {
      resolve();
      return;
    }
    // 非查询条件下异步加载节点，修改treeParam传递的node的id
    if (node) {
      beforeLoadData(node);
    } else {
      //非异步加载节点加载清除id 和nodeType
      treeParam.parameter.id = '';
      treeParam.parameter.nodeType = '';
    }
    let param = {};
    if (keyword.value == '' || searchResultFlag.value === true) {
      treeParam.parameter.searchText = '';
      param = treeParam;
    } else {
      setTreeSearchParam(keyword.value);
      param = searchTreeParam;
    }
    httpRequest(param.url, param.parameter ? param.parameter : '', param.method)
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          afterLoadData(res.data);
          if (!node) {
            treeData.value = res.data;
            treeData.value = [...treeData.value];
            if (keyword.value == '') {
              nextTick(() => {
                expandedKeys.value = treeData.value ? [treeData.value[0].id] : [];
              });
            } else {
              // 全部展开
              let treeExpandedKeys = [];
              getExpandedKeys(treeData.value, treeExpandedKeys);
              expandedKeys.value = [...treeExpandedKeys];
            }
          } else {
            node.dataRef.children = res.data;
            treeData.value = [...treeData.value];
          }
        } else {
          if (keyword.value != '') {
            proxy.$message.warning('未查询到匹配数据！');
            searchResultFlag.value = true;
          }
          proxy.$message.warning(`${node.title} 节点下无数据。`);
        }
        resolve();
      })
      .catch(() => {});
  });
}

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
function onExpand(treeExpandedKeys) {
  expandedKeys.value = [...treeExpandedKeys];
}

/**
 * 节点加载完毕
 */
function onLoad(treeLoadedKeys) {
  loadedKeys.value = [...treeLoadedKeys];
}

/**
 * 加载节点前事件，设置加载节点的参数
 */
function beforeLoadData(data) {
  if (data) {
    setTreeParam(data.id, data.nodeType);
  }
}

/**
 * 数据加载完成，处理数据
 */
function afterLoadData(res) {
  setTreeData(res);
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
        if (tim.isLeaf && tim.nodeType != 'dept') {
          tim.disableCheckbox = true;
        } else {
          tim.disableCheckbox = false;
        }
      } else {
        if (tim.nodeType !== 'dept') {
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
function selectTree(_, { selected, node }) {
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
        selectList.value = [{ ...node }];
      } else {
        selectListMap = {};
        selectList.value = [];
      }
      setCheckData();
    } else if (treeClickCount.value > 1) {
      //把次数归零
      treeClickCount.value = 0;
      //双击事件
      if (props.selectModel == 'single') {
        if (node.nodeType === 'dept') {
          selectListMap = {};
          selectListMap[node.id] = { ...node };
          selectList.value = [{ ...node }];
          setCheckData();
          confirm();
        }
      }
    }
  }, 300);
}

/**
 * 多选点击复选框事件
 */
function checkTree(checkedKeys, { checked, checkedNodes, node }) {
  if (props.maxSelect > 0 && checkedKeys.length > props.maxSelect) {
    proxy.$message.warning(`已设置最多选择${maxSelectNumber.value}个部门！`);
    setCheckData();
  } else {
    if (checked) {
      // 选中
      setSelectList(checkedNodes);
      setCheckData();
    } else {
      // 取消选中
      setUnSelectList(node);
      setCheckData();
    }
  }
}

/**
 * 多选选中节点时，处理右侧列表数据
 */
function setSelectList(nodes) {
  if (nodes) {
    nodes.map(tim => {
      if (!selectListMap[tim.id] && tim.nodeType == 'dept') {
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
 * 设置treeCheckedKeys
 */
function setCheckData() {
  let list = [];
  selectList.value.map(tim => {
    list.push(tim.id);
  });
  treeCheckedKeys.value = list;
}

/**
 * 清空右侧列表
 */
function handleDelTotal() {
  empty();
}

/**
 * 删除右侧列表单条数据
 */
function handleDelItem(e, item) {
  e.stopPropagation();
  let list = [];
  for (let i = 0; i < selectList.value.length; i++) {
    if (selectList.value[i].id != item.id) {
      list.push(selectList.value[i]);
    }
  }
  selectList.value = list;
  delete selectListMap[item.id];
  setCheckData();
}

/**
 * 清空选中人员
 */
function empty() {
  treeCheckedKeys.value = [];
  selectList.value = [];
  selectListMap = {};
}

/**
 * 清除查询条件
 */
function emptyQuery() {
  setTreeSearchParam('');
  setTreeParam('', '');
}

/**
 * 点击确定
 */
function confirm() {
  const result = setResultData();
  if (result.ids) {
    $emit('callBack', result);
  } else {
    $emit('callBack', {});
  }
  visible.value = false;
  emptyQuery();
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
      names += res.title;
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
 * 点击取消、关闭
 */
function closeModal() {
  emptyQuery();
  $emit('close');
}
</script>
