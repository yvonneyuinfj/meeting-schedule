<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px; padding-top: 10px">
    <AvicTable
      v-if="showTable"
      ref="famAccpetList"
      table-key="famAccpetList"
      :height="300"
      :columns="columns"
      :row-key="record => record.id"
      :pagination="false"
      :data-source="list"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }"
      :showTableSetting="false"
      :customRow="customRow"
      @change="handleTableChange"

      :total="totalPage"
    >
<!--      :pageParameter="queryParam.pageParameter"-->
      <template v-if="!props.readOnly" #toolBarLeft>
        <a-space>
          <a-space>
            <a-button
              v-if="props.accpetType === '1' && props.assetClasst"
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
              v-if="props.accpetType === '2' && props.assetClass"
              v-hasPermi="['famAccpetList:add']"
              title="添加"
              type="primary"
              @click="handleMostAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              批量添加
            </a-button>
            <!--            复制数量-->
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
              'militaryKeyEquipCode',
              'countryOfOrigin',
              'equipmentNumber', 'storageType' ,'storageNumber' ,'storageCode' ,'storageName' ,'ipAddress' ,'storageLevel', 'storageState','geographicLocation','certificateNumber'
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
                  changeCommonSelect(value, record, 'liablePersonId');
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
              'acceptanceTime',
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
        <!--  资产类别-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'assetClass'&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-if="props.accpetType === '1'"
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
            <div v-else>
              {{ record.assetClass }}
            </div>
          </template>
        </AvicRowEdit>

        <!--  设备类别-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'equipClass'&& (props.accpetType === '1' || (props.accpetType ==='2'  && props.assetClass === '2'))"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record.equipClassName"
              @click="equipClassClick(record)"
              placeholder="请选择设备类别"
            >
              <template #suffix>
                <a-tooltip title="Extra information">
                  <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>
                </a-tooltip>
              </template>
            </a-input>
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
          {{ record.assetNo || '提交后自动生成' }}
        </template>
        <template v-else-if="column.dataIndex === 'equipNo'">
          {{ record.equipNo || '提交后自动生成' }}
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
              'assetsUse','housingType'
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
    <a-modal :visible="assetClassOpen" :body-style="bodyStyle" @cancel="handleCancel" @ok="handleSummit">
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

    <a-modal :visible="equipClassOpen" :body-style="bodyStyle" @cancel="equiphandleCancel" @ok="equiphandleSummit">
      <div style="height: 100%;overflow: scroll">
        <a-spin :spinning="treeLoading">
          <a-tree
            v-if="equipsetreeData && equipsetreeData.length > 0"
            v-model:expanded-keys="equipselexpandedKeys"
            v-model:selectedKeys="equipselectedKeys"
            :tree-data="equipsetreeData"
            :load-data="equipseonLoadData"
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
      </div>
    </a-modal>

    <a-modal
      :visible="open"
      title="批量新增"
      @ok="handleOk"
      @cancel="handleOk"
      width="80%"
      style="top: 20px"
    >
      <div style="height: 600px; overflow: auto">
        <fam-inventory-manage
          :isAdd="true"
          :assetClass="props.assetClass"
          ref="famInventoryManage"
        ></fam-inventory-manage>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import type { FamAccpetListDto } from '@/api/avic/mms/fam/FamAccpetListApi'; // 引入模块DTO
import { listFamAccpetListByPage, getEquipClassCode } from '@/api/avic/mms/fam/FamAccpetListApi'; // 引入模块API
import { getFamAssetClass, getTreeData } from '@/api/avic/mms/fam/FamAssetClassApi'; // 引入模块API
import { getTpmAssetClass, getTreeData as getTpmTreeData } from '@/api/avic/mms/tpm/TpmAssetClassApi'; // 引入模块API
import { setNodeSlots, getExpandedKeys } from '@/utils/tree-util'; // 引入树公共方法
import FamInventoryManage from '@/views/avic/mms/fam/faminventory/FamInventoryManage.vue';
import TreeModal from '@/components/tree-modal/TreeModal.vue';
import { ListColumns, backColumnsObj } from './ListColumns';
import { validateRules as Rules } from '@/views/avic/mms/fam/famaccpetlist/ValidateRules';

const { proxy } = getCurrentInstance();
const assetClassOpen = ref<boolean>(false);
const equipClassOpen = ref<boolean>(false);
const bodyStyle = {
  overflow: 'hidden',
  overflowY: 'scroll',
  height: '400px'
};
const FamInventoryManageComponent = FamInventoryManage;
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  accpetType: {
    type: String,
    default: ''
  },
  assetClass: {
    type: String,
    default: ''
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  },
  assetClasstObj: {
    type: Object,
    default: {}
  },
  assetClasst: {
    type: String,
    default: ''
  },
  bpmParams: {
    type: Object,
    default: {}
  },
  bpmInstanceObject: {
    type: Object,
    default: {}
  },
  equipmentType: {
    type: String,
    default: ''
  }
});
let columns = ref([]);

const { getHouseObj, getCarsObj, getOfficialObject, getITObj, getDeviceObj } = backColumnsObj();

const queryForm = ref<FamAccpetListDto>({});

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
const famAccpetList = ref(null);
const open = ref<boolean>(false);
const famInventoryManage = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const expandedKeys = ref([]); //树节点validateRules
const equipselexpandedKeys = ref([]);
const treeData = ref(null);
const equipsetreeData = ref(null);
const selectedKeys = ref([]);
const equipselectedKeys = ref([]);
const secretLevelList = ref([]); // 数据密级通用代码
const defaultRootParentId = ref('-1');
const treeLoading = ref(false);
const isNewAssetList = ref([]); // 是否新增资产通用代码
const importedOrNotList = ref([]); // 是否为进口设备通用代码
const assetClassRecord = ref();
const equiphClassRecord = ref();
const ynMilitaryKeyEquipList = ref([]);
const assetsUseList = ref([]);
const geographicalAreaList = ref([]);
const equipTypeList = ref([]);
const vehicleUsageList = ref([]);
const isFactoryBuildingList = ref([]);
const assetSecretLevelList = ref([]);
const abcdTypeList = ref([]);
const energyefficiencyNameList = ref([]);
const fundSourceList = ref([]);
const housingTypeList = ref([]);
const copyNumber = ref();

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
  { fieldName: 'fundSource', lookUpType: 'TPM_CAPITAL_SOURCE' },
  { fieldName: 'housingType', lookUpType: 'FAM_HOUSE_TYPE' }
];
let validateRules = {};
const addObj = ref();
const deletedData = ref([]); // 前台删除数据的记录
const treeNodeId = ref();
const showTable = ref(true);
const code = ref('1');

// 非只读状态添加操作列
if (!props.readOnly) {
  columns.value.push({
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    fixed: 'right',
    align: 'center'
  });
}

onMounted(() => {
  allocationColumn('1');
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  //获取树
  getTreeList();
});

function tableSelectList(columns) {
  if (columns === 'vehicleUsage') return vehicleUsageList.value;
  if (columns === 'abcdType') return abcdTypeList.value;
  if (columns === 'energyefficiencyName') return energyefficiencyNameList.value;
  if (columns === 'fundSource') return fundSourceList.value;
  if (columns === 'equipType') return equipTypeList.value;
  if (columns === 'assetSecretLevel') return assetSecretLevelList.value;
  if (columns === 'geographicalArea') return geographicalAreaList.value;
  if (columns === 'assetsUse') return assetsUseList.value;
  if (columns === 'housingType') return housingTypeList.value;
}

/** 树节点展开事件 */
function handleExpand(keys) {
  expandedKeys.value = keys;
}

function equiphandleExpand(keys) {
  equipselexpandedKeys.value = keys;
}


/** 关闭类别树弹窗 */
function handleCancel() {
  assetClassOpen.value = false;
}

/** 关闭类别树弹窗 */
function equiphandleCancel() {
  equipClassOpen.value = false;
}


/** 树选中事件 */
function handleSelect(keys: string[], node) {
  treeNodeId.value = node.node.id;
}

/** 查询数据 */
function getTreeList() {
  treeLoading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  equipsetreeData.value = [];
  expandedKeys.value = [];
  getTreeData(expandLevel, defaultRootParentId.value).then(response => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    treeData.value = response.data;
    treeLoading.value = false;
  });

  getTpmTreeData(expandLevel, defaultRootParentId.value).then(response => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    equipsetreeData.value = response.data;
    treeLoading.value = false;
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

async function equipseonLoadData(treeNode) {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    getTpmTreeData(1, treeNode.dataRef.id).then(response => {
      setNodeSlots(response.data);
      treeNode.dataRef.children = response.data;
      equipsetreeData.value = [...equipsetreeData.value];
      resolve();
    });
  });

}

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}

/** 提交类别 */
function handleSummit() {
  getFamAssetClass(treeNodeId.value)
    .then(async res => {
      if (res.success) {
        const record = list.value.filter(item => item.id === assetClassRecord.value.id)[0];
        record.assetClass = res.data.classCode;
        record.assetClassName = res.data.className;
        record.useTime = res.data.useTime;
        assetClassOpen.value = false;
        assetClassRecord.value = null;
      }
    })
    .catch(() => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}

function equiphandleSummit() {
  getTpmAssetClass(treeNodeId.value)
    .then(async res => {
      if (res.success) {
        const record = list.value.filter(item => item.id === equiphClassRecord.value.id)[0];
        record.equipClass = res.data.classCode;
        record.equipClassName = res.data.className;
        getEquipClassCode(record.equipClass).then(r => {
          if (r.success)
            record.equipNo = r.data;
        });
        equipClassOpen.value = false;
        equiphClassRecord.value = null;
      }
    })
    .catch(() => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}

/** 类别树弹窗 */
function assetClassClick(column) {
  assetClassOpen.value = true;
  assetClassRecord.value = column;
}

function equipClassClick(column) {
  equipClassOpen.value = true;
  equiphClassRecord.value = column;
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
    housingTypeList.value = result.housingType;
  });
}

/** 获取修改的数据 */
function getChangedData() {
  deletedData.value.forEach(item => {
    item['operationType_'] = 'delete';
  });
  const changedData = proxy.$getChangeRecords(list, initialList);
  // if (deletedData.value.length === 0 && changedData.length === 0) {
  //   return list.value;
  // }
  return deletedData.value.concat(changedData);

}

/** 批量添加 */
function handleMostAdd() {
  open.value = true;
}

/** 批量新增确认  */
const handleOk = () => {
  open.value = false;
  let code = '';
  if (props.assetClass === '2' && list.value.length > 0) {
    code = list.value[0].assetClass.charAt(0);
  }
  const selectRow = famInventoryManage.value.selectedRow(code);
  selectRow.map(item => {
    item['assetNo'] = item.assetsName;
    item['assetName'] = item.assetsName;
    item['assetCode'] = item.assetsCode;
    item['managerDeptId'] = item.managerDeptName;
    item['liablePerson'] = item.responseUserId;
    item['factoryNo'] = item.productionNo;
    item['procureOrder'] = item.procureOrderNo;
    item['equipType'] = item.equipClass;
    item['inventoryId'] = item.id;
    item['installLocation'] = item.storageLocation;
    item['producer'] = item.factoryOwner;
    item['liablePerson'] = item.responseUserName;
  });
  if (selectRow.length > 0 && props.assetClass === '2') allocationColumn(selectRow[0].assetClass.charAt(0));
  list.value = [...list.value, ...selectRow];
  // 批量新增数组合并去重
  let array = JSON.parse(JSON.stringify([...list.value, ...selectRow]));
  let obj = {};
  array = array.reduce((cur, next) => {
    obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
    return cur;
  }, []);
  list.value = array;
};

/** 添加 */
function handleAdd() {
  const newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData)) {
    return;
  }
  // 其他列编辑状态修改为false
  newData.forEach(item => {
    item.editable = false;
  });
  const uuid = proxy.$uuid();
  getAddObj(code.value, uuid);
  newData.unshift(addObj.value);
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
  if (props.readOnly)
    if (!['task2', 'task3', 'task4', 'task6'].includes(props.bpmInstanceObject.bpmModel.activityname))
      return;
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
  // queryParam.pageParameter.page = pagination.current;
  // queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

function getTreeNodeTitle(nodeTitle, record, name) {
  record[name] = nodeTitle;
};


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
  if (code.value && !(['1', '4', '6', '8'].includes(code.value)) && column === 'assetOriginalValue') record.assetNetValue = record.assetOriginalValue;
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
  // const changedData = proxy.$getChangeRecords(list, initialList);
  if (validateRecordData(list.value)) {
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

/** 分配对象 */
function getAddObj(code, uuid) {

  switch (code) {
    case'1':
      addObj.value = getHouseObj(props.assetClasstObj, uuid);
      break;
    case'4':
      addObj.value = getCarsObj(props.assetClasstObj, uuid);
      break;
    case '6':
    case '9' :
    case'5':
      addObj.value = getITObj(props.assetClasstObj, uuid);
      break;
    case'8':
      addObj.value = getOfficialObject(props.assetClasstObj, uuid);
      break;
    default:
      addObj.value = getDeviceObj(props.assetClasstObj, uuid);
      break;
  }
}

/** 分配列 */
function allocationColumn(code) {
  showTable.value = false;
  if (code) {
    /**
     * 新增
     */
    switch (code) {
      //房屋
      case'1':
        columns.value = [...ListColumns.BaseColumns, ...ListColumns.HouseColumns];
        validateRules = { ...Rules.BaseValidateRules, ...Rules.HouseValidateRules };
        break;
      // 车辆
      case'4':
        columns.value = [...ListColumns.BaseColumns, ...ListColumns.CarColumns];
        validateRules = { ...Rules.BaseValidateRules, ...Rules.CarValidateRules };
        break;
      //9 6 5
      case '6':
      case '9' :
      case'5':
        columns.value = [...ListColumns.BaseColumns, ...ListColumns.ITColumns];
        validateRules = { ...Rules.BaseValidateRules, ...Rules.ITValidateRules };
        break;
      //办公自动化
      case'8':
        columns.value = [...ListColumns.BaseColumns, ...ListColumns.OfficialColumns];
        validateRules = { ...Rules.BaseValidateRules, ...Rules.OfficialValidateRules };
        if (props.readOnly) {
          if (props.bpmInstanceObject.bpmModel.activityname && props.bpmInstanceObject.bpmModel.activityname !== 'task6') return;
          const list = [
            {
              title: '设备大类',
              dataIndex: 'equipClass',
              key: 'equipClass',
              width: 120,
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              customHeaderCell() {
                return {
                  ['class']: 'required-table-title'
                };
              },
              align: 'left',
              hidden: true
            },
            {
              title: '设备编号',
              dataIndex: 'equipNo',
              key: 'equipNo',
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              align: 'left'
            }
          ];
          validateRules['equipClass'] = [
            { required: true, message: '设备大类不能为空' }
          ];
          columns.value = [...columns.value, ...list];
        }
        break;
      //设备
      default:
        columns.value = [...ListColumns.BaseColumns, ...ListColumns.DeviceColumns];
        validateRules = { ...Rules.BaseValidateRules, ...Rules.DeviceValidateRules };
        // 提交流程
        if (props.readOnly) {
          if (props.bpmInstanceObject.bpmModel.activityname && props.bpmInstanceObject.bpmModel.activityname !== 'task6') return;
          const list = [
            {
              title: '设备大类',
              dataIndex: 'equipClass',
              key: 'equipClass',
              width: 120,
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              customHeaderCell() {
                return {
                  ['class']: 'required-table-title'
                };
              },
              align: 'left',
              hidden: true
            },
            {
              title: '设备编号',
              dataIndex: 'equipNo',
              key: 'equipNo',
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              align: 'left'
            },
            {
              title: '是否瓶颈设备',
              dataIndex: 'ynBottleneckEquipmentName',
              key: 'ynBottleneckEquipmentName',
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              align: 'left'
            },
            {
              title: '军工关键设备专用代码',
              dataIndex: 'militaryKeyEquipCode',
              key: 'militaryKeyEquipCode',
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              align: 'left'
            },
            {
              title: '是否重大军工设备',
              dataIndex: 'ynMajorAssets',
              key: 'ynMajorAssets',
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              align: 'left'
            }
          ];
          validateRules['militaryKeyEquipCode'] = [{
            validator: validatorMilitaryKeyEquipCode,
            trigger: 'blur'
          }];
          validateRules['equipClass'] = [
            { required: true, message: '设备大类不能为空' }
          ];
          // 特种设备
          const list1 = [
            {
              title: '是否年检',
              dataIndex: 'ynAnnualInspection',
              key: 'ynAnnualInspection',
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              customHeaderCell() {
                return {
                  ['class']: 'required-table-title'
                };
              },
              align: 'left'
            },
            {
              title: '特种设备注册码',
              dataIndex: 'registrationCode',
              key: 'registrationCode',
              ellipsis: true,
              minWidth: 120,
              resizable: true,
              customHeaderCell() {
                return {
                  ['class']: 'required-table-title'
                };
              },
              align: 'left'
            }
          ];
          columns.value = [...columns.value, ...list];
          if (props.equipmentType === '1') {
            columns.value = [...columns.value, ...list1];
            validateRules['ynAnnualInspection'] = [{ required: true, message: '是否年检不能为空' }];
            validateRules['registrationCode'] = [{ required: true, message: '特种设备注册码不能为空' }];
          }
        }
        break;
    }
    if (props.accpetType === '2' && props.assetClass === '2')
      validateRules['parentAssetNo'] = [{ required: true, message: '父资产编号不能为空' }];
    getAddObj(code, proxy.$uuid());
  } else {
    /**
     *  改造 固定资产
     */
    columns.value = [...ListColumns.BaseColumns];
    validateRules = {
      assetOriginalValue: [{ required: true, message: '资产原值不能为空' }]
    };
  }

  setTimeout(() => {
    showTable.value = true;
  }, 1000);
}

/** 军工关键设备 校验 */
function validatorMilitaryKeyEquipCode(value, record) {
  if (record.ynMilitaryKeyEquip === '1' && !value) {
    return {
      flag: false,
      message: '军工关键设备专用代码必填！'
    };
  } else {
    return {
      flag: true
    };
  }
}

/**
 * 验收类型监控
 */
watch(
  () => props.accpetType,
  (newV, oldV) => {
    if (newV === '2') {
      allocationColumn('');
      if (oldV) {
        list.value = [];
      }
    } else {
      allocationColumn(props.assetClasst.charAt(0));
      if (oldV) {
        list.value = [];
      }
    }
  }
);

/**
 * 资产类别监控
 */
watch(
  () => props.assetClasst, (newV, oldV) => {
    code.value = props.assetClasst.charAt(0);
    allocationColumn(code.value);
    if (oldV) {
      let ids = [];
      list.value.map(item => ids.push(item.id));
      handleDelete(ids);
    }
  }
);

/**
 * 资产属性监控
 */
watch(() => props.assetClass, (newV, oldV) => {
  if (props.accpetType === '2' && newV && oldV) {
    list.value = [];
  }
});

defineExpose({
  validate,
  getChangedData,
  list
});
</script>
