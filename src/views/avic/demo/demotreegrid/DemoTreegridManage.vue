<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="必填">
              <a-input
                v-model:value="queryForm.demoNotnull"
                placeholder="请输入必填"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="编码">
              <a-input
                v-model:value="queryForm.demoCode"
                placeholder="请输入编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="标题">
              <a-input
                v-model:value="queryForm.demoTitle"
                placeholder="请输入标题"
                allow-clear
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="唯一值">
              <a-input
                v-model:value="queryForm.demoUnique"
                placeholder="请输入唯一值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="用户">
              <AvicCommonSelect
                v-model:value="queryForm.demoUserId"
                type="userSelect"
                placeholder="请选择用户"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="部门">
              <AvicCommonSelect
                v-model:value="queryForm.demoDeptId"
                type="deptSelect"
                placeholder="请选择部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单选">
              <a-select
                v-model:value="queryForm.demoRadio"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                :allow-clear="true"
                placeholder="请选择单选"
              >
                <a-select-option
                  v-for="item in demoRadioList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单选按钮">
              <a-select
                v-model:value="queryForm.demoRadioButton"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                :allow-clear="true"
                placeholder="请选择单选按钮"
              >
                <a-select-option
                  v-for="item in demoRadioButtonList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下拉">
              <a-select
                v-model:value="queryForm.demoSelect"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                :allow-clear="true"
                placeholder="请选择下拉"
              >
                <a-select-option
                  v-for="item in demoSelectList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                :allow-clear="true"
                placeholder="请选择密级"
              >
                <a-select-option
                  v-for="item in secretLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开关">
              <a-select
                v-model:value="queryForm.demoSwitch"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                :allow-clear="true"
                placeholder="请选择开关"
              >
                <a-select-option value="Y">有效</a-select-option>
                <a-select-option value="N">无效</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="日期(起)">
              <a-date-picker
                v-model:value="queryForm.demoDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期(起)"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, queryForm.demoDateEnd)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="日期(止)">
              <a-date-picker
                v-model:value="queryForm.demoDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期(止)"
                :disabled-date="
                  endValue => proxy.$disabledEndDate(endValue, queryForm.demoDateBegin)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined />
                  查询
                </a-button>
                <a-button @click="resetQuery" type="primary" ghost>
                  <redo-outlined />
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced" />
                  <down-outlined v-else />
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 树形表格 -->
    <div class="table-wrapper">
      <AvicTable
        ref="demoTreegrid"
        class="treegrid"
        table-key="demoTreegrid"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :pagination="false"
        :expand-row-by-click="true"
        lineField="demoTitle"
        :indent-size="25"
        v-model:expanded-row-keys="expandedRowKeys"
        @handleRowSelection="handleRowSelection"
        @expand="handleExpand"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['demoTreegrid:add']"
              type="primary"
              title="添加"
              @click="handleAdd(rootTree)"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            v-model:value="searchKeyWord"
            placeholder="请输入必填或编码或标题或唯一值"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record }">
          <!-- 显示字段 -->
          <template v-if="column.dataIndex === 'demoTitle'">
            <AvicIcon
              v-if="!record.expanded && record.treeLeaf == 'N'"
              svg="avic-folder-3-fill"
              color="#ffb800"
            />
            <AvicIcon
              v-if="record.expanded && record.treeLeaf == 'N'"
              svg="avic-folder-open-fill"
              color="#ffb800"
            />
            <avic-icon v-if="record.treeLeaf == 'Y'" svg="avic-file-fill" color="#3370ff" />
            <a
              href="javascript:;"
              class="table-detail-link"
              :title="record.demoTitle"
              @click.stop="handleDetail(record)"
            >
              {{ record.demoTitle }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'demoSwitch'">
            <a-popconfirm
              ok-text="确定"
              cancel-text="取消"
              @confirm="changeDemoSwitchStatus(record)"
            >
              <template #title>
                确认将该数据改为
                <b>{{ record.demoSwitch === 'Y' ? '无效' : '有效' }}</b>
                吗?
              </template>
              <a-switch
                :checked="getDemoSwitchStatus(record) == 'Y'"
                checked-children="有效"
                un-checked-children="无效"
              />
            </a-popconfirm>
          </template>
          <template v-else-if="column.dataIndex === 'demoSelectName'">
            <AvicDictTag :value="text" :options="demoSelectList" />
          </template>
          <!-- 表格操作列 -->
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              v-hasPermi="['demoTreegrid:add']"
              type="link"
              class="inner-btn"
              @click.stop="handleAdd(record)"
            >
              添加
            </a-button>
            <a-button
              v-hasPermi="['demoTreegrid:edit']"
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record)"
            >
              编辑
            </a-button>
            <a-button
              v-hasPermi="['demoTreegrid:del']"
              v-if="record.treeLeaf == 'Y'"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete(record)"
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <DemoTreegridAdd
      v-if="showAddModal"
      ref="addModal"
      :default-tree-level="treeLevel"
      :parent-id="parentNodeId"
      :parent-title="parentTitle"
      @reloadData="reloadData"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <DemoTreegridEdit
      v-if="showEditModal"
      ref="editModal"
      :parent-id="parentNodeId"
      :parent-title="parentTitle"
      :form-id="formId"
      @reloadData="reloadData"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <DemoTreegridDetail
      v-if="showDetailModal"
      ref="detailModal"
      :parent-id="parentNodeId"
      :parent-title="parentTitle"
      :form-id="formId"
      @close="showDetailModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { DemoTreegridDto } from '@/api/avic/demo/DemoTreegridApi'; // 引入模块DTO
import {
  getDemoTreegridNode,
  searchDemoTreegrid,
  delDemoTreegrid,
  expandDemoTreegrid,
  updateDemoSwitch
} from '@/api/avic/demo/DemoTreegridApi'; // 引入模块API
import {
  expendNodeForTreegrid,
  getAllNodeForTreegrid,
  findNodeForTreegrid,
  deleteNodeForTreegrid,
  getExpandedKeys
} from '@/utils/tree-util'; // 引入树工具类
import DemoTreegridAdd from './DemoTreegridAdd.vue'; // 引入添加页面组件
import DemoTreegridEdit from './DemoTreegridEdit.vue'; // 引入编辑页面组件
import DemoTreegridDetail from './DemoTreegridDetail.vue'; // 引入详细页面组件

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '标题',
    dataIndex: 'demoTitle',
    ellipsis: true,
    width: 240,
    minwidth: 240,
    resizable: true,
    sorter: true,
    fixed: 'left'
  },
  {
    title: '必填',
    dataIndex: 'demoNotnull',
    ellipsis: true,
    width: 120,
    minwidth: 120,
    resizable: true,
    sorter: true,
    align: 'left'
  },
  {
    title: '编码',
    dataIndex: 'demoCode',
    ellipsis: true,
    minwidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '唯一值',
    dataIndex: 'demoUnique',
    ellipsis: true,
    minwidth: 120,
    resizable: true
  },
  {
    title: '用户',
    dataIndex: 'demoUserIdAlias',
    ellipsis: true,
    minwidth: 120,
    resizable: true
  },
  {
    title: '部门',
    dataIndex: 'demoDeptIdAlias',
    ellipsis: true,
    minwidth: 120,
    resizable: true
  },
  {
    title: '角色',
    dataIndex: 'demoRoleIdAlias',
    ellipsis: true,
    minwidth: 120,
    resizable: true
  },
  {
    title: '群组',
    dataIndex: 'demoGroupIdAlias',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '岗位',
    dataIndex: 'demoPositionIdAlias',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '单选',
    dataIndex: 'demoRadioName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '单选按钮',
    dataIndex: 'demoRadioButtonName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '复选',
    dataIndex: 'demoCheckboxName',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '下拉',
    dataIndex: 'demoSelectName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下拉多选',
    dataIndex: 'demoSelectMultipleName',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开关',
    dataIndex: 'demoSwitch',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '小数',
    dataIndex: 'demoNumber',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '整数',
    dataIndex: 'demoInteger',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '日期',
    dataIndex: 'demoDate',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '电话(正则)',
    dataIndex: 'demoPhone',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '日期时间',
    dataIndex: 'demoDateTime',
    ellipsis: true,
    width: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '邮件(正则)',
    dataIndex: 'demoEmail',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '网址(正则)',
    dataIndex: 'demoWebsite',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '弹窗',
    dataIndex: 'demoModalSelectName',
    ellipsis: true,
    width: 120,
    resizable: true
  },
  {
    title: '背景样式',
    dataIndex: 'demoBackgroundColor',
    ellipsis: true,
    sorter: true,
    width: 120,
    resizable: true
  },
  {
    title: '多行文本',
    dataIndex: 'demoTextarea',
    ellipsis: true,
    width: 200,
    resizable: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 160,
    align: 'left',
    fixed: 'right'
  }
];
const queryForm = ref<DemoTreegridDto>({}); // 高级查询对象
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); //选中数据主键集合
const selectedRows = ref([]); // 选中数据行集合
const loading = ref(false);
const searchKeyWord = ref(''); // keyword信息
const isSearchByKeyWord = ref(false); // keyword查询标识
const isAdvancedSearch = ref(false); // 高级查询标识
const expandedRowKeys = ref([]); // 展开数据集合
const rootTree = ref(null); // 树结构根节点
const parentNodeId = ref(''); // 添加节点的初始父节点
const parentTitle = ref(''); // 初始父节点名称
const treeLevel = ref(1);
const secretLevelList = ref([]); // 密级通用代码
const demoRadioList = ref([]); // 单选通用代码
const demoRadioButtonList = ref([]); // 单选按钮组通用代码
const demoSelectList = ref([]); // 下拉通用代码
const lookupParams = [
  { fieldName: 'demoRadio', lookUpType: 'PLATFORM_SEX' },
  { fieldName: 'demoRadioButton', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' }
];
// const demoSingleSelectComponent = DemoSingleSelect; // 弹窗选择组件

onMounted(() => {
  // 加载表格数据
  getRootNode();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 加载树表格数据  */
function getRootNode() {
  rootTree.value = null;
  loading.value = true;
  const expandLevel = 2;
  list.value = [];
  expandedRowKeys.value = [];
  getDemoTreegridNode(expandLevel, '-1')
    .then(res => {
      if (res.success && res.data.length === 1) {
        rootTree.value = res.data[0];
        list.value = res.data[0].children;
        list.value.forEach(item => {
          item.demoSwitch = item.demoSwitch === 'Y' ? true : false; // 处理开关
        });
        getExpandedKeys(list.value, expandLevel, expandedRowKeys.value);
        loading.value = false;
      } else {
        proxy.$message.error('初始化根节点失败！');
        loading.value = false;
      }
    })
    .catch(() => {
      console.error('获取根节点失败！');
      loading.value = false;
    });
}
/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    demoRadioList.value = result.demoRadio;
    demoRadioButtonList.value = result.demoRadioButton;
    demoSelectList.value = result.demoSelect;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  // 查询区内容全部为空时不进行查询操作
  if (proxy.$checkJsonIsAllBlank(queryForm)) {
    proxy.$message.warning('请输入查询条件！');
    return;
  }
  loading.value = true;
  isSearchByKeyWord.value = false;
  isAdvancedSearch.value = true;
  // 高级查询数据处理
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  searchTreegrid(null);
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {};
  getRootNode();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑  */
function handleKeyWordQuery() {
  loading.value = true;
  isSearchByKeyWord.value = true;
  isAdvancedSearch.value = false;
  let value = searchKeyWord.value.trim();
  if (value.length) {
    const keyWord = {
      demoNotnull: value,
      demoCode: value,
      demoTitle: value,
      demoUnique: value
    };
    queryParam.keyWord = JSON.stringify(keyWord);
    searchTreegrid(null);
  } else {
    isSearchByKeyWord.value = false;
    getRootNode();
  }
}
/** 添加 */
function handleAdd(parentTree) {
  treeLevel.value = parentTree.treeLevel;
  parentTitle.value = parentTree.demoTitle;
  parentNodeId.value = parentTree.id;
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(row) {
  // 编辑节点
  parentNodeId.value = row.parentId;
  const parentNodes = findNodeForTreegrid(list.value, 'id', row.parentId);
  const parentNode = parentNodes.length == 1 ? parentNodes[0] : null;
  if (parentNode == null || parentNode.length == 0) {
    parentTitle.value = '根节点';
  } else {
    parentTitle.value = parentNode.demoTitle;
  }
  formId.value = row.id;
  showEditModal.value = true;
}
/** 详情 */
function handleDetail(row) {
  parentNodeId.value = row.parentId;
  const parentNodes = findNodeForTreegrid(list.value, 'id', row.parentId);
  const parentNode = parentNodes.length == 1 ? parentNodes[0] : null;

  if (parentNode == null || parentNode.length == 0) {
    parentTitle.value = '根节点';
  } else {
    parentTitle.value = parentNode.demoTitle;
  }
  formId.value = row.id;
  showDetailModal.value = true;
}
/** 删除 */
function handleDelete(treeNode) {
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      delDemoTreegrid(treeNode.id)
        .then(res => {
          if (res.success) {
            // 匹配第一层节点并删除
            if (treeNode.treeLevel == 2) {
              let beforeLength = list.value.length;
              list.value = list.value.filter(item => item.id !== treeNode.id);
              if (beforeLength != list.value.length) {
                loading.value = false;
                return;
              }
            } else {
              // 递归删除
              deleteNodeForTreegrid(list.value, treeNode);
            }

            proxy.$message.success('删除成功！'); // 提示成功
          }
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
}
/** 添加、编辑、删除、配置权限后默认展开至已修改项 */
function setExpandedRowKeys(treeId) {
  const nodes = findNodeForTreegrid(list.value, 'id', treeId);
  const node = nodes.length == 1 ? nodes[0] : null;
  if (!node) {
    expandedRowKeys.value = [];
  } else {
    let rowKeys = node.treePath.split('/');
    'Y' == node.treeLeaf || !node.children ? rowKeys.pop() : rowKeys;
    expandedRowKeys.value = rowKeys;
  }
}
/** 搜索树 */
function searchTreegrid(expandTreeId) {
  list.value = [];
  expandedRowKeys.value = [];
  searchDemoTreegrid(queryParam)
    .then(res => {
      if (res.success) {
        list.value = res.data[0].children || [];
        //查询后展开全部节点
        expandedRowKeys.value = getAllNodeForTreegrid(list.value, 'id');

        if (proxy.$objIsNotBlank(expandTreeId)) {
          setExpandedRowKeys(expandTreeId);
        }
      } else {
        list.value = [];
      }
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      loading.value = false;
    });
}
/** 重载数据 */
function reloadData(expandTreeId) {
  loading.value = true;
  if (isSearchByKeyWord.value) {
    let value = searchKeyWord.value.trim();
    const keyWord = {
      demoNotnull: value,
      demoCode: value,
      demoTitle: value,
      demoUnique: value
    };
    queryParam.keyWord = JSON.stringify(keyWord);
    searchTreegrid(expandTreeId);
  } else if (isAdvancedSearch.value) {
    // 高级查询数据处理
    queryParam.searchParams = queryForm.value;
    queryParam.keyWord = '';
    searchTreegrid(expandTreeId);
  } else {
    expandDemoTreegrid(expandTreeId)
      .then(res => {
        if (res.success && res.data && res.data.length) {
          rootTree.value = res.data[0];
          list.value = res.data[0].children || [];
          setExpandedRowKeys(expandTreeId);
        } else {
          list.value = [];
        }
        loading.value = false;
      })
      .catch(() => {
        list.value = [];
        loading.value = false;
      });
  }
}
/** 展开父级 */
function handleExpand(expanded, record) {
  record.expanded = expanded;
  if (expanded) {
    if (record.treeLeaf == 'N' && (!record.children || !record.children.length)) {
      loading.value = true;

      getDemoTreegridNode(1, `${record.id}`)
        .then(res => {
          if (res.success) {
            expendNodeForTreegrid(list.value, record.id, res.data);
            expandedRowKeys.value.push(record.id);
          }
          loading.value = false;
        })
        .catch(() => {
          list.value = [];
        });
    } else {
      expandedRowKeys.value.push(record.id);
    }
  } else {
    expandedRowKeys.value = expandedRowKeys.value.filter(item => item != record.id);
  }
}
/** 记录选中项 */
function handleRowSelection(obj) {
  if (obj.selectedRowKeys) {
    selectedRowKeys.value = obj.selectedRowKeys;
  }
  if (obj.selectedRows) {
    selectedRows.value = obj.selectedRows;
  }
}
/** 改变开关状态 */
function changeDemoSwitchStatus(record) {
  const tip = record.demoSwitch === 'Y' ? '无效' : '有效';
  const updateValue = record.demoSwitch === 'Y' ? 'N' : 'Y';
  updateDemoSwitch(record.id, updateValue).then(res => {
    if (res.success) {
      const nodes = findNodeForTreegrid(list.value, 'id', record.id);
      if (nodes != undefined && nodes.length == 1) {
        nodes[0].demoSwitch = updateValue;
      }
      proxy.$message.success(`${tip}成功！`);
    }
  });
}
/** 查询开关状态 */
function getDemoSwitchStatus(record) {
  const nodes = findNodeForTreegrid(list.value, 'id', record.id);
  return nodes.length == 1 ? nodes[0].demoSwitch : 'N';
}
</script>
