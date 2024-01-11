<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px; padding-top: 10px">
    <AvicTable
      v-if="showTabel"
      ref="famAccpetList"
      table-key="famAccpetList"
      :height="300"
      :columns="columns"
      :pagination="false"
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
      :total="totalPage"
      :customRow="customRow"

    >
      <!--      :pageParameter="queryParam.pageParameter"-->
      <!--      @change="handleTableChange"-->
      <template v-if="!props.readOnly" #toolBarLeft>
        <a-space>
          <a-space>
            <a-button
              v-if="props.accpetType === '1'"
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
            <a-input-number
              v-if="props.accpetType === '1'"
              style="width: 150px"
              v-model:value="copyNumber"
              :min="0"
              :max="100"
              :precision="0"
              :step="1"
              placeholder="请输入复制数量"
            />
            <a-button
              v-if="props.accpetType === '1'"
              v-hasPermi="['famAccpetList:add']"
              title="复制"
              type="primary"
              @click="event => handleCopy(selectedRowKeys, event)"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              复制
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
        <!-- input输入框 -->
        <AvicRowEdit
          v-if="
            [
              'assetSource',
              'installLocation',
              'ownershipCertNo',
              'assetModel',
              'factoryNo',
              'procureOrder',
              'assetSpec',
              'assetName',
              'producer',
              'invoiceNo',
              'deviceStandby1',
              'deviceStandby2',
              'deviceStandby3',
              'brand',
              'floorspace',
              'belongingLand',
              'certificateTitle',
              'certificateTitleArea',
              'recordNumber',
              'planningPermit',
              'notice',
              'attachedFileNumber',
              'engineNo',
              'airDisplacement',
              'licensePlateNumber',
              'vehicleNumber',
              'usePosition',
              'importedEquipment',
              'supplier',
              'equipmentNo',
              'storageLocation',
              'registrationCode',
              'militaryKeyEquipCode','equipmentNumber','storageType','storageNumber','storageCode','storageName','ipAddress','storageLevel'
              ,'storageState','orderName','orderNo','orderValue','infProjectName','researchProjectName'
            ].includes(column.dataIndex)
            && (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))
          "
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

        <!-- 已提月份 (月选择)-->
        <AvicRowEdit v-else-if="column.dataIndex === 'monthProposed'
            && (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))
        "
                     :record="record"
                     :column="column.dataIndex"
        >
          <template #edit>
            <a-date-picker
              v-model:value="record.monthProposed"
              value-format="YYYY-MM-DD"
              placeholder="请选择月份"
              :disabled="props.accpetType === '2' && props.assetClass === '1'"
            ></a-date-picker>
          </template>
        </AvicRowEdit>

        <!-- 责任人-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'liablePerson'
          && (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))
          "
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.liablePerson"
              type="userSelect"
              placeholder="请选择责任人名称"
              :defaultShowValue="record.liablePersonIdAlias"
              @callback="
                (value, _selectRows) => {
                  changeCommonSelect(value, record, 'liablePerson');
                }
              "
            />
          </template>
          <template #default>
            {{ record.liablePersonIdAlias }}
          </template>
        </AvicRowEdit>

        <!-- 主管部门-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'managerDeptId'&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.managerDeptId"
              type="deptSelect"
              placeholder="请选择主管部门名称"
              :defaultShowValue="record.managerDeptIdAlias"
              @callback="
                (value, _selectRows) => {
                  changeCommonSelect(value, record, 'managerDeptId');
                }
              "
            />
          </template>
          <template #default>
            {{ record.managerDeptIdAlias }}
          </template>
        </AvicRowEdit>

        <!-- 使用部门-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'receiveDeptId'&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.receiveDeptId"
              type="deptSelect"
              placeholder="请选择使用部门名称"
              :defaultShowValue="record.receiveDeptIdAlias"
              @callback="
                (value, _selectRows) => {
                  changeCommonSelect(value, record, 'receiveDeptId');
                }
              "
            />
          </template>
          <template #default>
            {{ record.receiveDeptIdAlias }}
          </template>
        </AvicRowEdit>

        <!-- 日期选择器-->
        <AvicRowEdit
          v-else-if="
            [
              'warrantyPeriod',
              'productionDate',
              'commencementTime',
              'timeCompletion',
              'issuanceTime',
              'purchaseDate',
              'recordDate',
              'commissionDate',
            ].includes(column.dataIndex)&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-date-picker
              v-model:value="record[column.dataIndex]"
              value-format="YYYY-MM-DD"
              placeholder="请选择日期"
              :disabled="props.accpetType === '2' && props.assetClass === '1'"
            ></a-date-picker>
          </template>
        </AvicRowEdit>

        <!-- 是否选择器-->
        <AvicRowEdit
          v-else-if="
            [
              'importedOrNot',
              'ynMilitaryKeyEquip',
              'isFactoryBuilding',
              'ynMaintainName',
              'importedOrNotName',
              'ynAnnualInspection','ynMajorAssets','ynBottleneckEquipmentName'
            ].includes(column.dataIndex)&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record[column.dataIndex]"
              style="width: 100%"
              placeholder="请选择是否"
              @change="value => changeControlValue(value, record, column.dataIndex,true)"
            >
              <a-select-option
                v-for="select in importedOrNotList"
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
            <AvicDictTag :value="record[column.dataIndex]" :matchField="'lookupCode'" :options="importedOrNotList"/>
          </template>
        </AvicRowEdit>

        <!--  备注-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'note'&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record.note"
              @input="$forceUpdate()"
              style="width: 100%"
              placeholder="请输入"
              @blur="blurInput($event, record, column.dataIndex)"
            />
          </template>
        </AvicRowEdit>

        <!--  父资产号-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'parentAssetNo'&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicModalSelect
              v-model:value="record.parentAssetNo"
              title="选择弹窗"
              placeholder="请选择弹窗"
              valueField="assetsCode"
              showField="assetsCode"
              :defaultShowValue="record.parentAssetNo"
              :selectComponent="FamInventoryManageComponent"
              :isMultiSelection="false"
              :allow-clear="true"
            />
          </template>
          <template #default>
            {{ record.parentAssetNo }}
          </template>
        </AvicRowEdit>


        <!--  设备类别-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'equipClassName'&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <TreeModal
              v-model:value="record.equipCode"
              :parentId="record.equipCode"
              :parentTitle="record.equipClassName"
              ref="treeSelectRef"
              baseUrl="/mms/tpm/tpmassetclasss"
              @getTile="getTreeNodeTitle($event, record ,'equipClassName')"
              @change="getTreeNodeCode($event, record ,'equipClass')"
              :allowSelectNonIsLeaf="false"
              placeholder="请选择"
            />
          </template>
          <template #default>
            {{ record.equipClassName }}
          </template>
        </AvicRowEdit>

        <!-- 数字输入框-->
        <AvicRowEdit
          v-if="
            [
              'firstDepreciationValue',
              'assetUnit',
              'currentYearDepreciation',
              'assetNetValue',
            ].includes(column.dataIndex)
            && (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))
          "
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input-number
              v-model:value="record[column.dataIndex]"
              :max="999999999999"
              :min="-999999999999"
              :precision="2"
              :step="0.01"
              @input="$forceUpdate()"
              @blur="blurInput($event, record, column.dataIndex)"
              placeholder="请输入"
              style="width: 100%"
            ></a-input-number>
          </template>
        </AvicRowEdit>

        <!-- 资产原值-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'assetOriginalValue'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input-number
              v-model:value="record[column.dataIndex]"
              :max="999999999999"
              :min="-999999999999"
              :precision="2"
              :step="0.01"
              @input="$forceUpdate()"
              @blur="blurInput($event, record, column.dataIndex)"
              placeholder="请输入"
              style="width: 100%"
            ></a-input-number>
          </template>
        </AvicRowEdit>
        <template v-else-if="column.dataIndex === 'assetNo'">
          提交后自动生成
        </template>
        <template v-else-if="column.dataIndex === 'equipNo'">
          提交后自动生成
        </template>

        <!-- 选择框-->
        <AvicRowEdit
          v-else-if="
            [
              'vehicleUsage',
              'abcdType',
              'energyefficiencyName',
              'fundSource',
              'equipType',
              'assetSecretLevel',
              'assetsUse',
            ].includes(column.dataIndex)&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record[column.dataIndex]"
              style="width: 100%"
              placeholder="请选择"
              @change="value => changeControlValue(value, record, column.dataIndex)"
            >
              <a-select-option
                v-for="select in tableSelectList(column.dataIndex)"
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
            <AvicDictTag :value="record[column.dataIndex]" :matchField="'lookupCode'"
                         :options="tableSelectList(column.dataIndex)"/>
          </template>
        </AvicRowEdit>

        <!--        @change="getTreeChangeId"-->
        <!-- 树形弹窗 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'geographicalAreaName'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <TreeModal
              v-model:value="record.geographicalArea"
              :parentId="record.geographicalArea"
              :parentTitle="record.geographicalAreaName"
              ref="treeSelectRef"
              baseUrl="/mms/tpm/tpmareas"
              @getTile="getTreeNodeTitle($event, record ,'geographicalAreaName')"
              :allowSelectNonIsLeaf="false"
              placeholder="请选择"
            >
            </TreeModal>
          </template>
          <template #default>
            {{ record.geographicalAreaName }}
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
    <div style="padding-left: 10px;">
      已选择{{ selectedRows.length }}条
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FamCipAccpetDto } from '@/api/avic/mms/fam/FamCipAccpetApi'; // 引入模块DTO
import { listFamAccpetListByPage } from '@/api/avic/mms/fam/FamCipAccpetListApi'; // 引入模块API
import FamInventoryManage from '@/views/avic/mms/fam/faminventory/FamInventoryManage.vue';
import { AllColumns } from '@/views/avic/mms/fam/famaccpetlist/ListColumns';
import TreeModal from '@/components/tree-modal/TreeModal.vue';
import { getTpmAssetClass } from '@/api/avic/mms/tpm/TpmAssetClassApi';

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  accpetType: {
    type: String,
    defalut: ''
  },
  assetClass: {
    type: String,
    defalut: ''
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  },
  assetClasstObj: {
    type: Object,
    defalut: {}
  }
});
const columns = [
  ...AllColumns,
  {
    title: '合同名称',
    dataIndex: 'orderName',
    key: 'orderName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
    // customHeaderCell() {
    //   return {
    //     ['class']: 'required-table-title'
    //   };
    // }
  },
  {
    title: '合同编号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
    // customHeaderCell() {
    //   return {
    //     ['class']: 'required-table-title'
    //   };
    // }
  },
  {
    title: '合同金额',
    dataIndex: 'orderValue',
    key: 'orderValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
    // customHeaderCell() {
    //   return {
    //     ['class']: 'required-table-title'
    //   };
    // }
  },
  {
    title: '基建项目名称',
    dataIndex: 'infProjectName',
    key: 'infProjectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
    // customHeaderCell() {
    //   return {
    //     ['class']: 'required-table-title'
    //   };
    // }
  },
  {
    title: '科研项目名称',
    dataIndex: 'researchProjectName',
    key: 'researchProjectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
    // customHeaderCell() {
    //   return {
    //     ['class']: 'required-table-title'
    //   };
    // }
  }
];

const showTabel = ref(false);
const queryForm = ref<FamCipAccpetDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  // pageParameter: {
  //   page: 1, // 页数
  //   rows: 20 // 每页条数
  // },
  searchParams: {},
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});

const bodyStyle = {
  overflow: 'hidden',
  overflowY: 'scroll',
  height: '600px'
};
const FamInventoryManageComponent = FamInventoryManage;
const famAccpetList = ref(null);
const copyNumber = ref();
// const open = ref<boolean>(false);
const famInventoryManage = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const secretLevelList = ref([]); // 数据密级通用代码
const defaultRootParentId = ref('-1');
const isNewAssetList = ref([]); // 是否新增资产通用代码
const importedOrNotList = ref([]); // 是否为进口设备通用代码
const totalPage = ref(0);

/** 通用代码数组 */
const ynMilitaryKeyEquipList = ref([]);
const assetsUseList = ref([]);
const geographicalAreaList = ref([]);
const vehicleUsageList = ref([]);
const abcdTypeList = ref([]);
const fundSourceList = ref([]);
const energyefficiencyNameList = ref([]);
const equipTypeList = ref([]);
const assetSecretLevelList = ref([]);
const isFactoryBuildingList = ref([]);

const lookupParams = [
  { fieldName: 'isNewAsset', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'importedOrNot', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'assetsUse', lookUpType: 'FAM_ASSETS_USE' },
  { fieldName: 'equipType', lookUpType: 'TPM_EQUIPMENT_TYPE' },
  { fieldName: 'assetSecretLevel', lookUpType: 'FAM_SECRET_LEVEL' },
  { fieldName: 'geographicalArea', lookUpType: 'FAM_GEOGRAPHICAL_AREA' },
  { fieldName: 'vehicleUsage', lookUpType: 'FAM_VEHICLE_USAGE' },
  { fieldName: 'abcdType', lookUpType: 'TPM_ABCD_TYPE' },
  { fieldName: 'energyefficiencyName', lookUpType: 'TPM_ENERGY_EFFICIENCY' },
  { fieldName: 'fundSource', lookUpType: 'TPM_CAPITAL_SOURCE' }
];

const validateRules = {
  assetClass: [{ required: true, message: '资产类别列不能为空' }],
  equipClassName: [{ required: true, message: '设备大类列不能为空' }],
  assetName: [{ required: true, message: '资产名称不能为空' }]
}; // 必填列,便于保存和新增数据时校验

const deletedData = ref([]); // 前台删除数据的记录

// 非只读状态添加操作列
// if (!props.readOnly) {
//   columns.push({
//     title: '操作',
//     dataIndex: 'action',
//     key: 'action',
//     width: '120',
//     fixed: 'right',
//     align: 'center'
//   });
// }

onMounted(() => {
  setTimeout(() => {
    showTabel.value = true;
  }, 500);
  setUpRequired();
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
});

function setUpRequired() {
  columns.map(item => {
    if (item.title === '资产名称' || item.title === '设备大类' || item.title === '资产类别') {
      item['customHeaderCell'] = () => {
        return {
          ['class']: 'required-table-title'
        };
      };
    }
  });
}

function tableSelectList(columns) {
  if (columns === 'vehicleUsage') return vehicleUsageList.value;
  if (columns === 'abcdType') return abcdTypeList.value;
  if (columns === 'energyefficiencyName') return energyefficiencyNameList.value;
  if (columns === 'fundSource') return fundSourceList.value;
  if (columns === 'equipType') return equipTypeList.value;
  if (columns === 'assetSecretLevel') return assetSecretLevelList.value;
  if (columns === 'geographicalArea') return geographicalAreaList.value;
  if (columns === 'assetsUse') return assetsUseList.value;
}


/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}


/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.amAccpetId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listFamAccpetListByPage(queryParam)
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
    isNewAssetList.value = result.isNewAsset;
    importedOrNotList.value = result.importedOrNot;
    ynMilitaryKeyEquipList.value = result.importedOrNot;
    assetsUseList.value = result.assetsUse;
    geographicalAreaList.value = result.geographicalArea;
    equipTypeList.value = result.equipType;
    assetSecretLevelList.value = result.assetSecretLevel;
    vehicleUsageList.value = result.vehicleUsage;
    isFactoryBuildingList.value = result.importedOrNot;
    abcdTypeList.value = result.abcdType;
    energyefficiencyNameList.value = result.energyefficiencyName;
    fundSourceList.value = result.fundSource;
  });
}

/** 获取修改的数据 */
function getChangedData() {
  deletedData.value.forEach(item => {
    item['operationType_'] = 'delete';
  });
  const changedData = proxy.$getChangeRecords(list, initialList);
  return deletedData.value.concat(changedData);
  // return changedData;
}


/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    isNewAsset: undefined,
    assetClass: props.assetClasstObj ? props.assetClasstObj.classCode : '',
    assetClassName: props.assetClasstObj ? props.assetClasstObj.className : '',
    useTime: props.assetClasstObj ? props.assetClasstObj.useTime : '',
    equipClass: '',
    assetName: '',
    assetNum: '1',
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

/** 复制 */
function handleCopy(ids, e) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要复制的数据！');
    return;
  }
  // 校验所选复制信息是否编辑完成 ， 没有编辑完不能复制
  // 数据校验
  let newData = [...list.value];
  if (!validateRecordData(selectedRows.value)) {
    return;
  }
  let itemList = [];

  for (let i = 0; i < (copyNumber.value || 1); i++) {
    selectedRows.value.map(rows => {
      let item = {
        ...rows,
        id: 'newLine' + proxy.$uuid(),
        operationType_: 'insert',
        editable: false // true为编辑中, false为未编辑
      };
      itemList.unshift(item);
    });
  }
  newData = [...itemList, ...newData];
  list.value = newData;
}


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
// function handleTableChange(pagination, _filters, sorter) {
//   queryParam.pageParameter.page = pagination.current;
//   queryParam.pageParameter.rows = pagination.pageSize;
//   if (proxy.$objIsNotBlank(sorter.field)) {
//     queryParam.sidx = sorter.field;
//     queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
//   }
//   getList();
// }

function getTreeNodeTitle(nodeTitle, record, name) {
  record[name] = nodeTitle;
};

function getTreeNodeCode(nodeId, record, name) {
  getTpmAssetClass(nodeId)
    .then(async res => {
      if (res.success) {
        record[name] = res.data.classCode;
      }
    });
}

/**控件变更事件 */
function changeControlValue(values, record, column, isTF: false) {
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
    if (isTF) {
      const target = proxy['importedOrNotList'].find(item => values === item.lookupCode);
      labels.push(target.lookupName);
    } else {
      const target = proxy[column + 'List'].find(item => values === item.lookupCode);
      labels.push(target.lookupName);
    }

    if (record) {
    }
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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, famAccpetList);
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

watch(
  () => props.accpetType,
  (_newV, oldV) => {
    if (oldV) {
      list.value = [];
    }
  }
);

watch(
  () => props.assetClasstObj,
  newV => {
    console.log(props.assetClasstObj);
    list.value.map(item => {
      item.assetClass = newV.classCode;
      item.assetClassName = newV.className;
      item.useTime = newV.useTime;
    });
  }
);


defineExpose({
  validate,
  getChangedData,
  list
});
</script>
