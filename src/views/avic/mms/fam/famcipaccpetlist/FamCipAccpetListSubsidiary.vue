<script setup lang="ts">
import { listFamInventorySubByPage, saveFamInventorySub } from '@/api/avic/mms/fam/FamInventorySubApi';
import { getTreeData, getFamAssetClass } from '@/api/avic/mms/fam/FamAssetClassApi';
import { setNodeSlots, getExpandedKeys } from '@/utils/tree-util';

const { proxy } = getCurrentInstance();
const props = defineProps({
  mainId: {
    type: String,
    default: ''
  },
  open: {
    type: Boolean,
    default: false
  }
});
const famCipAccpetListSub = ref(null);
const loading = ref(false);
const emit = defineEmits(['closeLink']);
const list = ref([]);
const saveLoading = ref(false);
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const delLoading = ref(false);
const deletedData = ref([]); // 前台删除数据的记录
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const assetClassOpen = ref(false);
const treeLoading = ref(false);
const assetClassRecord = ref();
const expandedKeys = ref([]); //树节点validateRules
const treeData = ref(null);
const selectedKeys = ref([]);
const treeNodeId = ref();
const defaultRootParentId = ref('-1');

const columns = [
  {
    title: '单项工程名称',
    dataIndex: 'singleProjectName',
    key: 'singleProjectName',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '资产描述',
    dataIndex: 'assetDescribe',
    key: 'assetDescribe',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '资产类别',
    dataIndex: 'assetClass',
    key: 'assetClass',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '规格型号',
    dataIndex: 'specModel',
    key: 'specModel',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '面积',
    dataIndex: 'area',
    key: 'area',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '购置价格',
    dataIndex: 'acquisitionValue',
    key: 'acquisitionValue',
    minWidth: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  }
] as any[];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    inventoryListId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const validateRules = {
  singleProjectName: [{ required: true, message: '单项工程名称不能为空' }],
  assetDescribe: [{ required: true, message: '资产描述不能为空' }],
  assetClass: [{ required: true, message: '资产类别不能为空' }],
  specModel: [{ required: true, message: '规格型号不能为空' }],
  unit: [{ required: true, message: '单位不能为空' }],
  area: [{ required: true, message: '面积不能为空' }],
  acquisitionValue: [{ required: true, message: '购置价格不能为空' }]
}; // 必填列,便于保存和新增数据时校验
const totalPage = ref(0);


onMounted(() => {
  getTreeList();
});

/** 查询数据 */
function getTreeList() {
  treeLoading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  expandedKeys.value = [];
  getTreeData(expandLevel, defaultRootParentId.value).then(response => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    treeData.value = response.data;
    treeLoading.value = false;
  });
}


/** 关闭弹窗 */
const handleCancel = () => {
  emit('closeLink');
};

/** 保存 */
const handleSave = () => {
  if (validateRecordData(list.value)) {
    saveLoading.value = true;
    // 变动的数据集合
    const changedData = proxy.$getChangeRecords(list, initialList);
    changedData.map(item => {
      item.inventoryListId = props.mainId;
    });
    // 删除的数据添加 ‘delete’ 字段
    deletedData.value.forEach(item => {
      item['operationType_'] = 'delete';
    });

    const form = {
      famInventorySubDTOList: proxy.$lodash.cloneDeep(deletedData.value.concat(changedData))
    };
    saveFamInventorySub(form).then(res => {
      if (res.success) {
        saveLoading.value = false;
        emit('closeLink');
      }
    }).catch(() => {
      saveLoading.value = false;
    });
  }
};

/** 获取列表数据 */
const getList = () => {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryParam.searchParams.inventoryListId = props.mainId ? props.mainId : '-1';
  listFamInventorySubByPage(queryParam).then(response => {
    list.value = response.data.result;
    totalPage.value = response.data.pageParameter.totalCount;
    loading.value = false;
    initialList.value = proxy.$lodash.cloneDeep(list.value);
  }).catch(() => {
    list.value = [];
    totalPage.value = 0;
    loading.value = false;
  });
};


/** 行点击事件 */
const customRow = (record) => {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
};

const handleTableChange = (pagination, _filters, sorter) => {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
};

/** 编辑 */
const handleEdit = (record) => {
  record.editable = true;
  record.operationType_ = record.operationType_ || 'update';
  const newData = [...list.value];
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
};

/** 勾选复选框时触发 */
const onSelectChange = (rowKeys, rows) => {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
};

/** 添加 */
const handleAdd = () => {
  let item = {
    // id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    singleProjectName: '',
    assetDescribe: '',
    assetClass: '',
    specModel: '',
    unit: '',
    area: '',
    acquisitionValue: ''
  };
  const newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData)) {
    return;
  }
  // 其他列编辑状态修改为false
  newData.forEach(item => {
    item.editable = false;
  });
  newData.unshift(item);
  list.value = newData;
};

/** 批量数据校验 */
const validateRecordData = (records) => {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, famCipAccpetListSub);
    if (!flag) {
      break;
    }
  }
  return flag;
};


/** 删除处理逻辑*/
const handleDelete = (ids, e) => {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  let newData = [...list.value];
  let deletedItems = [];
  for (let i = 0; i < ids.length; i++) {
    if (ids[i].indexOf('newLine') == -1) {
      // 缓存删除的后台数据
      deletedItems.push(newData.find(item => item['id'] == ids[i]));
    }
    newData = newData.filter(item => item['id'] !== ids[i]);
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  selectedRows.value = [];
  // 前台刷新表格
  list.value = newData;
  deletedData.value = deletedData.value.concat(deletedItems);
};

/** 输入框的值失去焦点 */
const blurInput = (e, record, column) => {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
};

const assetClassClick = (column) => {
  assetClassOpen.value = true;
  assetClassRecord.value = column;
};

/** 树节点展开事件 */
function handleExpand(keys) {
  expandedKeys.value = keys;
}

/** 关闭类别树弹窗 */
function handleTreeCancel() {
  assetClassOpen.value = false;
}

/** 提交类别 */
function handleSummit() {
  getFamAssetClass(treeNodeId.value)
    .then(async res => {
      if (res.success) {
        const record = list.value.filter(item => item.id === assetClassRecord.value.id)[0];
        record.assetClass = res.data.classCode;
        record.assetClassName = res.data.className;
        assetClassOpen.value = false;
        assetClassRecord.value = null;
      }
    })
    .catch(() => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}

/** 异步加载树节点 */
async function onLoadData(treeNode) {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    getTreeData(1, treeNode.dataRef.id).then(response => {
      setNodeSlots(response.data);
      treeNode.dataRef.children = response.data;
      treeData.value = [...treeData.value];
      resolve();
    });
  });
}

/** 树选中事件 */
function handleSelect(keys: string[], node) {
  treeNodeId.value = node.node.id;
}

watch(() => props.mainId, newV => {
  getList();
});
</script>

<template>
  <a-modal :visible="props.open" width="80%" title="附属台账信息" @cancel="handleCancel">
    <AvicTable
      ref="famCipAccpetListSub"
      table-key="famCipAccpetListSub"
      :height="300"
      :columns="columns"
      :row-key="record => record.id"
      :data-source="list"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }"
      :showTableSetting="false"
      :pageParameter="queryParam.pageParameter"
      :total="totalPage"
      :customRow="customRow"
      @change="handleTableChange"
    >
      <template #toolBarLeft>
        <a-space>
          <a-space>
            <a-button
              v-hasPermi="['famAccpetList:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['famAccpetList:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleDelete(selectedRowKeys, event);
                }
              "
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
          </a-space>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
        <AvicRowEdit
          v-if="
            ['singleProjectName','assetDescribe','specModel','unit','area','acquisitionValue'].includes(column.dataIndex)"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record[column.dataIndex]"
              :maxLength="32"
              @input="$forceUpdate()"
              style="width: 100%"
              placeholder="请输入"
              @blur="blurInput($event, record, column.dataIndex)"
            ></a-input>
          </template>
        </AvicRowEdit>

        <!-- 资产类别 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'assetClass'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record.assetClass"
              @click="assetClassClick(record)"
              placeholder="请选择资产类别"
            >
              <template #suffix>
                <a-tooltip title="Extra information">
                  <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>
                </a-tooltip>
              </template>
            </a-input>
          </template>
          <template #default>
            {{ record.assetClass }}
          </template>
        </AvicRowEdit>
      </template>
    </AvicTable>

    <a-modal :visible="assetClassOpen" @cancel="handleTreeCancel" @ok="handleSummit">
      <a-spin :spinning="treeLoading">
        <a-tree
          v-if="treeData && treeData.length > 0"
          v-model:expanded-keys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          :tree-data="treeData"
          :load-data="onLoadData"
          :show-icon="true"
          :show-line="true && { showLeafIcon: false }"
          :default-expand-all="true"
          @expand="handleExpand"
          @select="handleSelect"
        >
          <template #icon="{ expanded, dataRef }">
            <AvicIcon v-if="dataRef.isLeaf" svg="avic-file-fill" color="#3370ff"/>
            <AvicIcon
              v-if="!expanded && !dataRef.isLeaf"
              svg="avic-folder-3-fill"
              color="#ffb800"
            />
            <AvicIcon
              v-if="expanded && !dataRef.isLeaf"
              svg="avic-folder-open-fill"
              color="#ffb800"
            />
          </template>
        </a-tree>
      </a-spin>
    </a-modal>

    <template #footer>
      <a-button key="submit" type="primary" :loading="saveLoading" @click="handleSave">保存</a-button>
      <a-button key="back" @click="handleCancel">取消</a-button>
    </template>
  </a-modal>
</template>

<style scoped lang="less">

</style>
