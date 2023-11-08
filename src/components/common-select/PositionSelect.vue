<!-- 选岗位 -->
<template>
  <a-modal
    :width="800"
    :body-style="{ height: '520px' }"
    wrap-class-name="common-content position-select-content vxe-table--ignore-clear"
    :centered="true"
    :visible="visible"
    :destroy-on-close="false"
    :mask-closable="false"
    @ok="confirm"
    @cancel="handleClose"
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
    <div class="commonselect-container-box" style="height: calc(100% - 42px); display: flex">
      <div class="container-left">
        <div class="v-select">
          <a-select
            v-if="orgList.length > 0"
            placeholder="当前组织"
            :show-search="true"
            option-filter-prop="children"
            :filter-option="filterOption"
            v-model:value="orgSelectId"
            @change="handleChange"
          >
            <a-select-option :key="item.id" :value="item.id" v-for="item in orgList">
              {{ item.orgName }}
            </a-select-option>
          </a-select>
          <a-input-search
            :class="{ 'only-search': orgList.length == 0 }"
            :placeholder="searchPlaceholder"
            :allow-clear="true"
            v-model="searchText"
            @search="handleSearch"
          />
        </div>
        <div class="container-checkbox">
          <s-table
            row-key="id"
            :row-height="32"
            :bordered="false"
            :show-header="false"
            :columns="columns"
            :data-source="tableData"
            :scroll="{ y: 380 }"
            :row-selection="{
              type: selectModel != 'single' ? 'checkbox' : 'radio',
              selectedRowKeys: selectedRowKeys,
              onSelect: onSelectChange,
              columnWidth: selectModel != 'single' ? 40 : 0
            }"
            :custom-row="
              record => {
                return {
                  onClick: () => {
                    handleRowSelection(record);
                  },
                  onDblclick: () => {
                    handleRowDblClick(record);
                  }
                };
              }
            "
            v-model:pagination="pagination"
            @change="handleTableChange"
          >
            <template #bodyCell="{ record }">
              <span class="user-icon">
                <avic-icon color="#24b3b3" svg="avic-user-2-fill" />
              </span>
              <span class="cell-txt" :title="record['positionName']">
                <span>{{ record['positionName'] }}</span>
              </span>
              <span class="cell-popover">
                <a-tooltip>
                  <template #title>
                    <p style="margin: 0">
                      {{ record['positionDesc'] ? record['positionDesc'] : '暂无描述' }}
                    </p>
                  </template>
                  <question-circle-outlined />
                </a-tooltip>
              </span>
            </template>
          </s-table>
        </div>
      </div>
      <div class="container-right">
        <div class="container-right-top">
          已选{{ name + ` (` + selectLength + `)` }}
          <delete-outlined class="total-delete-icon" title="清空" @click="handleDelSelectedTotal" />
        </div>
        <div class="checkgroup">
          <s-table
            row-key="id"
            :columns="selectListColumns"
            :data-source="select"
            :show-header="false"
            :scroll="{ y: 380 }"
            :row-height="32"
            :pagination="false"
            rowDrag="true"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.key === 'positionName'">
                <span class="" :title="record['positionName']">
                  <avic-icon svg="avic-user-2-fill" style="color: #24b3b3; margin-right: 4px" />
                  {{ text }}
                  <span style="color: #86909c">
                    {{ record.orgIdentityName ? '(' + record.orgIdentityName + ')' : '' }}
                  </span>
                </span>
                <span class="checkclose" title="删除" @click="handleDelSelectedItem(record)">
                  <avic-icon svg="avic-close-fill" style="font-size: 1.3em" />
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
import { searchOrgName, selectOrgName, httpRequest } from './api';
const { proxy } = getCurrentInstance();
//岗位列
const positionColumns = [
  {
    title: '岗位名称',
    dataIndex: 'positionName',
    key: 'title'
  }
];
const selectListColumns = ref([
  {
    title: '已选岗位',
    align: 'left',
    dataIndex: 'positionName',
    key: 'positionName'
  }
]);

const props = defineProps({
  /** 是否显示 */
  show: { type: Boolean, required: true, default: false },
  /** 右侧列表已选标题文案 */
  name: { type: String, default: '岗位' },
  /** 标题 */
  title: { type: String, default: '岗位选择' },
  /** 辅助提示信息 */
  titleTips: { type: String, default: '' },
  /** 搜索提示 */
  searchPlaceholder: { type: String, default: '请输入岗位名称' },
  /** 单选 single ，多选 multi */
  selectModel: { type: String, required: false, default: 'single' },
  /** 多选最多选择数量 */
  maxSelect: { type: Number, required: false, default: 0 },
  /** 默认选中项 */
  defaultValue: { type: Object, required: false, default: null },
  /** 双向绑定改变事件 */
  modelChange: { type: [Object, String], required: false, default: null },
  /** 组织范围 */
  viewScope: { type: String, required: false, default: '' },
  /** 应用id */
  appId: { type: String, required: false, default: '' },
  /** 默认加载指定组织id */
  defaultOrgId: { type: String, required: false, default: '' },
  /** 组织id */
  orgId: { type: String, required: false, default: '' },
  /** 岗位请求接口url */
  positionUrl: { type: String, default: '/appsys/common/select/getInitPositionInfo/v1' },
  /** 岗位请求接口method */
  positionMethodType: { type: String, default: 'POST' },
  /** 获取初始化岗位的组织信息请求地址 */
  getInitPositionInfoUrl: {
    type: String,
    default: '/appsys/common/select/getSelectedPositionInfo/v1'
  },
  /** 获取初始化岗位的组织信息请求类型 */
  getInitPositionInfoMethod: { type: String, default: 'post' }
});
const {
  show,
  name,
  title,
  titleTips,
  searchPlaceholder,
  selectModel,
  maxSelect,
  modelChange,
  viewScope,
  appId,
  defaultOrgId,
  orgId,
  positionUrl,
  positionMethodType,
  getInitPositionInfoUrl,
  getInitPositionInfoMethod
} = toRefs(props);
const data = reactive({
  visible: false, // 弹窗显示与否
  orgSelect: {}, // 选中组织
  orgSelectId: '',
  orgList: [], // 组织列表
  searchText: '', // 搜索内容
  defaultSelectedRows: [], // 默认选择框选中的值
  localOrgId: '',
  tableRefName: 'positionSelectTable', // 表格ref名称
  page: '1', // 初始请求第几页
  rows: '20', // 初始每页请求几条数据
  sord: 'asc',
  columns: [], // 表格列配置
  tableData: [], // 表格数据
  rowKey: 'id', // 表格数据唯一key
  select: [], // 右侧区域列表
  selectLength: 0, // 右侧区域列表长度
  selectedRowKeys: [] //右侧表格选中项
});
let {
  visible,
  orgSelect,
  orgSelectId,
  orgList,
  searchText,
  defaultSelectedRows,
  localOrgId,
  sord,
  columns,
  tableData,
  select,
  selectLength,
  selectedRowKeys
} = toRefs(data);
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
});
/**
 * 最多选择的数量
 */
const maxSelectNumber = computed(() => {
  let maxSelectNumber = 0;
  if (maxSelect.value > 0) {
    maxSelectNumber = maxSelect.value;
  }
  return maxSelectNumber;
});
watch(
  select,
  newV => {
    selectLength.value = newV.length;
  },
  { immediate: true }
);
watch(
  show,
  newV => {
    visible.value = newV;
    if (newV === true) {
      init();
    }
  },
  { immediate: true }
);
watch(
  orgId,
  newV => {
    localOrgId.value = newV;
  },
  { immediate: true }
);
watch(
  () => props.defaultValue,
  newV => {
    if (newV) {
      loadingDefaultData(newV, '1');
    }
  }
);
/**双向绑定，处理回填数据*/
watch(
  modelChange,
  newV => {
    if (newV && newV.ids) {
      let ids = newV.ids.split(';');
      let names = newV.names.split(';');
      let orgIdentitys = newV.orgIdentitys ? newV.orgIdentitys.split(';') : [];
      let orgIdentityNames = newV.orgIdentityNames ? newV.orgIdentityNames.split(';') : [];
      if (orgIdentityNames.length == 0) {
        httpRequest(getInitPositionInfoUrl.value, ids, getInitPositionInfoMethod.value)
          .then(res => {
            if (res.data) {
              res.data.map(item => {
                defaultSelectedRows.value.push({
                  id: item.id,
                  positionName: item.name,
                  orgIdentity: item.orgIdentity,
                  orgIdentityName: item.orgIdentityName
                });
              });
              setSelect([], false);
            }
          })
          .catch(() => {
            for (let i = 0; i < ids.length; i++) {
              defaultSelectedRows.value.push({
                id: ids[i],
                positionName: names[i],
                orgIdentity: '',
                orgIdentityName: ''
              });
            }
            setSelect([], false);
          });
      } else {
        for (let i = 0; i < ids.length; i++) {
          defaultSelectedRows.value.push({
            id: ids[i],
            positionName: names[i],
            orgIdentity: orgIdentitys[i],
            orgIdentityName: orgIdentityNames[i]
          });
        }
        setSelect([], false);
      }
    }
  },
  { immediate: true, deep: true }
);

const $emit = defineEmits(['close', 'callBack', 'defaultBack']);

/**
 * 初始化函数
 */
function init() {
  findSearchOrgName();
  if (!props.modelChange.ids) {
    empty();
  }
}

/**
 * 请求表格数据
 */
function initTable() {
  findInitPositionInfo(() => {
    // setSelect(res);
  });
}

/**
 * 下拉框filterOption
 */
function filterOption(input, option) {
  return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

/**
 * 下拉框改变切换组织
 */
function handleChange(value) {
  let orgObj = orgList.value.filter(item => item.id === value)[0];
  localOrgId.value = orgObj.id;
  initTable();
}

/**
 * 输入框搜索事件
 */
function handleSearch(value) {
  searchText.value = value;
  findInitPositionInfo(() => {
    // 请求表格数据
    let selectIds = [];
    for (let i = 0; i < select.value.length; i++) {
      selectIds.push(select.value[i].id);
    }
  });
}

/**
 * 当手动勾选并且值发生改变时触发的事件
 */
function onSelectChange(record, selected, selectedRows) {
  if (selectModel.value === 'multi') {
    let selectIds = [...selectedRowKeys.value];
    if (selected) {
      // 选中
      if (!selectIds.includes(record.id)) {
        if (maxSelectNumber.value > 0 && selectIds.length > maxSelectNumber.value - 1) {
          proxy.$message.warning(`已设置最多选择${maxSelectNumber.value}个角色！`);
          // $refs[tableRefName].changeSelectedRowKeys(selectIds);
        } else {
          select.value.push(record);
        }
      }
    } else {
      // 取消选中
      if (selectIds.includes(record.id)) {
        select.value = select.value.filter(item => item.id != record.id);
      }
    }
    select.value = [...select.value];
  } else {
    select.value = selectedRows;
  }
  setSelectRows();
}

/**
 * 点击行实现选中
 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  if (selectModel.value === 'multi') {
    // 多选
    if (!selectIds.includes(record.id)) {
      // 选中
      if (maxSelectNumber.value > 0 && selectIds.length > maxSelectNumber.value - 1) {
        proxy.$message.warning(`已设置最多选择${maxSelectNumber.value}个角色！`);
        // $refs[tableRefName].changeSelectedRowKeys(selectIds);
      } else {
        select.value.push(record);
      }
    } else {
      // 取消选中
      select.value = select.value.filter(item => item.id != record.id);
    }
    select.value = [...select.value];
  } else {
    if (!selectIds.includes(record.id)) {
      select.value = [record];
    } else {
      select.value = [];
    }
  }
  setSelectRows();
}

/**
 * 表格行双击
 */
function handleRowDblClick(row) {
  if (selectModel.value !== 'multi') {
    select.value = [row];
    setSelectRows();
    const result = getResult();
    $emit('callBack', result, select.value);
    visible.value = false;
  }
}

/**
 * 接收并处理分页、排序信息
 * @pagination,  分页信息
 * @filters, 过滤信息
 * @sorter,  排序信息
 * @obj { action: 'paginate' | 'sort' | 'filter' } 操作类型
 */
function handleTableChange(paginationInfo, filters, sorter) {
  pagination.value.current = paginationInfo.current; // 页数
  pagination.value.pageSize = paginationInfo.pageSize; // 每页条数
  // 处理排序信息
  if (sorter) {
    sord.value = sorter.sord || ''; // 排序方式: desc降序 asc升序
  }
  initTable();
}

/**
 * 右侧区域列表单独删除
 */
function handleDelSelectedItem(item) {
  let list = [];
  let selectIds = [];
  for (let i = 0; i < select.value.length; i++) {
    if (select.value[i].id !== item.id) {
      list.push(select.value[i]);
      selectIds.push(select.value[i].id);
    }
  }
  select.value = [...list];
  setSelectRows();
}

/**
 * 右侧区域列表批量删除
 */
function handleDelSelectedTotal() {
  empty();
}

/**
 * 设置右侧区域列表合集
 */
function setSelectRows() {
  let ids = [];
  let list = [...select.value];
  for (let i = 0; i < list.length; i++) {
    ids.push(list[i].id);
  }
  selectedRowKeys.value = ids;
}

/**清空选中数据*/
function empty() {
  select.value = []; //选择的列
  setSelectRows();
}

function findSelectOrgName() {
  selectOrgName(viewScope.value, defaultOrgId.value)
    .then(res => {
      if (res.data) {
        orgList.value = res.data;
        if (res.data.length > 0) {
          if (!localOrgId.value) {
            localOrgId.value = res.data[0].id;
          }
          orgSelect.id = res.data.filter(tim => tim.id === localOrgId.value)[0].id;
          orgSelectId.value = orgSelect.id;
        }
      }
      initTable();
    })
    .catch(() => {
      initTable();
    });
}

/**获取默认选中组织*/
function findSearchOrgName() {
  if (orgSelect.value.length > 0) {
    return;
  }
  searchOrgName('', viewScope.value, defaultOrgId.value)
    .then(res => {
      if (res.data) {
        if (!defaultOrgId.value) {
          localOrgId.value = res.data.orgId;
          orgSelect.orgId = res.data.orgId;
        }
      }
      findSelectOrgName();
    })
    .catch(() => {
      findSelectOrgName();
    });
}

/**加载默认值 判断是否需要去查询数据库*/
function loadingDefaultData(value) {
  if (value) {
    let isLoading = false;
    if (typeof value.ids === 'undefined') {
      let ids = (value + '').split(';');
      for (let i = 0; i < ids.length; i++) {
        defaultSelectedRows.value.push({
          id: ids[i],
          positionName: '',
          orgIdentity: '',
          orgIdentityName: ''
        });
      }
      isLoading = true;
    } else {
      let ids = [];
      let names = [];
      let orgIdentitys = [];
      let orgIdentityNames = [];
      if (value.ids) {
        ids = (value.ids + '').split(';');
      }
      if (value.names) {
        names = value.names.split(';');
      }
      if (value.orgIdentitys) {
        orgIdentitys = value.orgIdentitys.split(';');
      }
      if (value.orgIdentityNames) {
        orgIdentityNames = value.orgIdentityNames.split(';');
      }
      if (ids.length > 0 && ids.length !== names.length) {
        isLoading = true;
      }
      for (let i = 0; i < ids.length; i++) {
        defaultSelectedRows.value.push({
          id: ids[i],
          positionName: names[i],
          orgIdentity: orgIdentitys[i],
          orgIdentityName: orgIdentityNames[i]
        });
      }
    }
    if (isLoading) {
      findInitPositionInfo(res => {
        setSelect(res, true);
      });
    }
  }
}

/**设置默认选中*/
function setSelect(res, isCallBack = false) {
  if (defaultSelectedRows.value) {
    defaultSelectedRows.value.map(item => {
      let noSelect = select.value.filter(tim => tim.id === item.id);
      //判断是否已经在已选中元素中
      if (noSelect.length === 0) {
        select.value.push(item);
      }
    });
    let selectIds = [];
    select.value.map(item => {
      selectIds.push(item.id);
    });
    selectedRowKeys.value = selectIds;
    defaultSelectedRows.value = [];
  }
  if (isCallBack) {
    const result = getResult();
    setTimeout(() => {
      $emit('defaultBack', result);
    }, 100);
  }
}

function getList() {
  let param = {
    url: positionUrl.value,
    parameter: {
      searchText: searchText.value,
      viewScope: viewScope.value,
      defaultOrgId: defaultOrgId.value,
      orgId: localOrgId.value,
      appId: appId.value,
      rows: pagination.value.pageSize,
      page: pagination.value.current,
      sord: sord.value
    },
    method: positionMethodType.value
  };
  return new Promise(resolve => {
    httpRequest(param.url, param.parameter ? param.parameter : '', param.method)
      .then(res => {
        if (res.data.result.length > 0) {
          tableData.value = [...res.data.result];
        } else {
          tableData.value = [];
        }
        pagination.value.total = res.data.pageParameter.totalCount;
        resolve(res.data.result);
      })
      .catch(() => {
        resolve();
      });
  });
}

/**
 *加载岗位列表
 */
function findInitPositionInfo(success) {
  columns.value = positionColumns;
  getList().then(res => {
    if (res && success) {
      success(res);
    }
  });
}

/**
 * 加工返回数据
 */
function getResult() {
  let ids = '';
  let names = '';
  let orgIdentitys = '';
  let orgIdentityNames = '';
  if (select.value && select.value.length > 0) {
    select.value.map((res, i) => {
      if (i > 0) {
        ids += ';';
        names += ';';
        orgIdentitys += ';';
        orgIdentityNames += ';';
      }
      ids += res.id;
      names += res.positionName;
      orgIdentitys += res.orgIdentity;
      orgIdentityNames += res.orgIdentityName;
    });
  }
  let result = { ids, names, orgIdentitys, orgIdentityNames };
  return result;
}

/**
 * 确定
 */
function confirm() {
  const result = getResult();
  if (result.ids) {
    $emit('callBack', result);
  } else {
    $emit('callBack', {});
  }
  visible.value = false;
}

/**
 * 取消
 */
function handleClose() {
  visible.value = false;
  $emit('close');
}
</script>
