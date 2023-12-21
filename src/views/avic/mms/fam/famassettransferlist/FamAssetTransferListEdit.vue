<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="famAssetTransferList"
      table-key="famAssetTransferList"
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
      <template
        v-if="!props.readOnly"
        #toolBarLeft
      >
        <a-space>
          <a-space>
            <!-- <a-button
              v-hasPermi="['famAssetTransferList:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button> -->
            <a-button
              v-hasPermi="['famAssetTransferList:add']"
              title="添加"
              type="primary"
              @click="handleMostAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              批量添加
            </a-button>
            <a-button
              v-hasPermi="['famAssetTransferList:del']"
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
          v-if="['assetCode','assetOriginalValue','technicalDataList','factorySerialNumber','attachmentToolList','assetModel','assetName','assetSecretLevel',
          'storageLocation','assetSpec'].includes(
               column.dataIndex
              )"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record[column.dataIndex]"
              :maxLength="64"
              @input="$forceUpdate()"
              style="width: 100%"
              placeholder="请输入"
              @blur="blurInput($event, record, column.dataIndex)"
            >
            </a-input>
          </template>
        </AvicRowEdit>

        <AvicRowEdit
          v-else-if="column.dataIndex === 'geographicalArea'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.geographicalArea"
              style="width: 100%"
              placeholder="请选择地理区域"
              @change="value => changeControlValue(value, record, 'geographicalArea')"
            >
              <a-select-option
                v-for="select in geographicalAreaList"
                :key="select.sysLookupTlId"
                :value="select.lookupCode"
                :title="select.lookupName"
                :disabled="select.disabled === true"
              >
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            <AvicDictTag :value="record.geographicalAreaName" :options="geographicalAreaList"/>
          </template>
        </AvicRowEdit>

        <AvicRowEdit
          v-else-if="column.dataIndex === 'isAssetIntact'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.isAssetIntact"
              style="width: 100%"
              placeholder="请选择资产是否完好"
              @change="(value)=>changeControlValue(value,record,'isAssetIntact')"
            >
              <a-select-option
                v-for="select in isAssetIntactList"
                :key="select.sysLookupTlId"
                :value="select.lookupCode"
                :title="select.lookupName"
                :disabled="select.disabled === true"
              >
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            <AvicDictTag
              :value="record.isAssetIntactName"
              :options="isAssetIntactList"
            />
          </template>
        </AvicRowEdit>
        <!--        <AvicRowEdit-->
        <!--          v-else-if="column.dataIndex === 'geographicalArea'"-->
        <!--          :record="record"-->
        <!--          :column="column.dataIndex"-->
        <!--        >-->
        <!--          <template #edit>-->
        <!--            <a-input-->
        <!--              v-model:value="record.geographicalArea"-->
        <!--              @click="geographicalAreaClick(record)"-->
        <!--              placeholder="请选择地理区域"-->
        <!--            >-->
        <!--              <template #suffix>-->
        <!--                <a-tooltip title="Extra information">-->
        <!--                  <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>-->
        <!--                </a-tooltip>-->
        <!--              </template>-->
        <!--            </a-input>-->
        <!--          </template>-->
        <!--          <template #default>-->
        <!--            {{ record.geographicalArea }}-->
        <!--          </template>-->
        <!--        </AvicRowEdit>-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'responseUserId'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.responseUserId"
              :defaultShowValue="record.responseUserIdAlias"
              placeholder="请选择责任人"
              type="userSelect"
              @callback="
                  (value, _selectRows) => {
                    changeCommonSelect(value,record,'responseUserId')
                  }
                "
            />
          </template>
          <template #default>
            {{ record['responseUserIdAlias'] }}
          </template>
        </AvicRowEdit>
        <template v-else-if="column.dataIndex === 'action' && !props.readOnly">
          <a-button
            class="inner-btn"
            type="link"
            @click="
              event => {
                handleDelete([record.id], event);
              }
            "
          >
            删除
          </a-button>
        </template>
      </template>
    </AvicTable>
    <a-modal :visible="geographicalOpen" @cancel="handleCancel" @ok="handleSummit">
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
    <a-modal
      :visible="open"
      title="批量新增"
      @ok="handleOk"
      @cancel="handleOk"
      width="80%"
      style="top: 20px"
    >
      <div style="height: 600px;overflow: auto">
        <fam-inventory-manage
          :isAdd="'true'"
          ref="famInventoryManage"
        ></fam-inventory-manage>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import type { FamAssetTransferListDto } from '@/api/avic/mms/fam/FamAssetTransferListApi'; // 引入模块DTO
import { listFamAssetTransferListByPage } from '@/api/avic/mms/fam/FamAssetTransferListApi'; // 引入模块API
import FamInventoryManage from '@/views/avic/mms/fam/faminventory/FamInventoryManage.vue';
import { getFamAssetClass, getTreeData } from '@/api/avic/mms/fam/FamAssetClassApi';
import { setNodeSlots, getExpandedKeys } from '@/utils/tree-util';

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  }
});
const columns = [
  {
    title: '资产编码',
    dataIndex: 'assetCode',
    key: 'assetCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产名称',
    dataIndex: 'assetName',
    key: 'assetName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产密级',
    dataIndex: 'assetSecretLevel',
    key: 'assetSecretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '地理区域',
    dataIndex: 'geographicalArea',
    key: 'geographicalArea',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'storageLocation',
    key: 'storageLocation',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '责任人',
    dataIndex: 'responseUserId',
    key: 'responseUserId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产型号',
    dataIndex: 'assetModel',
    key: 'assetModel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产是否完好',
    dataIndex: 'isAssetIntact',
    key: 'isAssetIntact',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产原值（元）',
    dataIndex: 'assetOriginalValue',
    key: 'assetOriginalValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  // {
  //   title: '资产原值（元）',
  //   dataIndex: 'factorySerialNumber',
  //   key: 'factorySerialNumber',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  {
    title: '资产规格',
    dataIndex: 'assetSpec',
    key: 'assetSpec',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术资料清单',
    dataIndex: 'technicalDataList',
    key: 'technicalDataList',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '附件工具清单',
    dataIndex: 'attachmentToolList',
    key: 'attachmentToolList',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const queryForm = ref<FamAssetTransferListDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {},
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const famAssetTransferList = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const open = ref<boolean>(false);
const famInventoryManage = ref(null);
const totalPage = ref(0);
const secretLevelList = ref([]); // SECRET_LEVEL通用代码
const isAssetIntactList = ref([]); // 资产是否完好通用代码
const lookupParams = [
  { fieldName: 'isAssetIntact', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'geographicalArea', lookUpType: 'FAM_GEOGRAPHICAL_AREA' }
];
const validateRules = {}; // 必填列,便于保存和新增数据时校验
const deletedData = ref([]); // 前台删除数据的记录
const geographicalOpen = ref<boolean>(false);
const geographicalRecord = ref();
const treeLoading = ref(false);
const expandedKeys = ref([]); //树节点validateRules
const treeData = ref(null);
const selectedKeys = ref([]);
const treeNodeId = ref();
const defaultRootParentId = ref('-1');
const geographicalAreaList = ref([]);

// 非只读状态添加操作列
if (!props.readOnly) {
  columns.push({
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    fixed: 'right',
    align: 'center'
  });
}

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
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

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.assetTransferId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listFamAssetTransferListByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      // 查询的初始数据,保存时做比对
      initialList.value = proxy.$lodash.cloneDeep(list.value);
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    isAssetIntactList.value = result.isAssetIntact;
    geographicalAreaList.value = result.geographicalArea;
  });
}

/** 获取修改的数据 */
function getChangedData() {
  deletedData.value.forEach(item => {
    item['operationType_'] = 'delete';
  });
  const changedData = proxy.$getChangeRecords(list, initialList);
  return deletedData.value.concat(changedData);
}

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    assetCode: '',
    assetName: '',
    assetSecretLevel: '',
    responseUserId: '',
    assetModel: '',
    isAssetIntact: undefined,
    assetOriginalValue: '',
    factorySerialNumber: '',
    assetSpec: '',
    technicalDataList: '',
    attachmentToolList: '',
    editable: true // true为编辑中, false为未编辑
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
}

/** 批量添加 */
function handleMostAdd() {
  open.value = true;
}

/** 点击地理区域 */
const geographicalAreaClick = (record) => {
  geographicalOpen.value = true;
  geographicalRecord.value = record;
};

/** 关闭类别树弹窗 */
function handleCancel() {
  geographicalOpen.value = false;
}

/** 树节点展开事件 */
function handleExpand(keys) {
  expandedKeys.value = keys;
}

/** 树选中事件 */
function handleSelect(keys: string[], node) {
  treeNodeId.value = node.node.id;
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

/** 提交类别 */
function handleSummit() {
  getFamAssetClass(treeNodeId.value)
    .then(async res => {
      if (res.success) {
        const record = list.value.filter(item => item.id === geographicalRecord.value.id)[0];
        record.geographicalArea = res.data.classCode;
        record.geographicalAreaName = res.data.className;
        geographicalOpen.value = false;
        geographicalRecord.value = null;
      }
    })
    .catch(() => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}

/** 批量新增确认  */
const handleOk = () => {
  open.value = false;
  const selectRow = famInventoryManage.value.selectedRow();
  selectRow.map(item => {
    item['assetNo'] = item.assetsName;
    item['assetName'] = item.assetsName;
    item['assetCode'] = item.assetsCode;
    item['inventoryId'] = item.id;
  });
  list.value = [...list.value, ...selectRow];
};

/** 编辑 */
function handleEdit(record) {
  record.editable = true;
  record.operationType_ = record.operationType_ || 'update';
  const newData = [...list.value];
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}

/** 删除处理逻辑*/
function handleDelete(ids, e) {
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
}

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}

/** 表头排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}

/**控件变更事件 */
function changeControlValue(values, record, column) {
  let labels = [];
  if (Array.isArray(values)) {
    // 多选处理
    for (let i = 0; i < values.length; i++) {
      // 从对应的通用代码中查询对应的label
      const target = proxy[column + 'List'].find(item => values[i] === item.lookupCode);
      labels.push(target.lookupName);
    }
  } else {
    // 单选处理
    const target = proxy[column + 'List'].find(item => values === item.lookupCode);
    labels.push(target.lookupName);
  }
  if (record) {
    record[column + 'Name'] = labels.join(',');
  }
}

/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}

/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(
      records[index],
      validateRules,
      list.value,
      famAssetTransferList
    );
    if (!flag) {
      break;
    }
  }
  return flag;
}

/** 校验并执行回调函数*/
function validate(callback) {
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && validateRecordData(changedData)) {
    // 校验通过
    if (callback) {
      callback(true);
    }
  } else {
    // 校验未通过
    if (callback) {
      callback(false);
    }
  }
}

defineExpose({
  validate,
  getChangedData
});
</script>



