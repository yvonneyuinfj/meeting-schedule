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
            <a-button
              v-if="props.accpetType === '2'"
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
        <AvicRowEdit
          v-if="
            [
              'assetSource',
              'fundSource',
              'firstDepreciationValue',
              'installLocation',
              'ownershipCertNo',
              'assetModel',
              'factoryNo',
              'procureOrder',
              'assetSpec',
              'assetUnit',
              'warrantyPeriod',
              'assetName',
              'producer',
              'invoiceNo',
              'deviceStandby1',
              'deviceStandby2',
              'deviceStandby3',
              'brand',
              'parentAssetNo',
              'floorspace',
              'belongingLand',
              'certificateTitle',
              'certificateTitleArea',
              'recordNumber',
              'planningPermit',
              'notice',
              'attachedFileNumber',
              'isFactoryBuilding',
              'currentYearDepreciation',
            ].includes(column.dataIndex) &&
            (props.accpetType === '1' || (props.accpetType === '2' && props.assetClass === '2'))
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

        <!-- 已提月份-->
        <AvicRowEdit v-else-if="column.dataIndex === 'monthProposed' &&
         (props.accpetType === '1' || (props.accpetType === '2' && props.assetClass === '2'))"
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

        <AvicRowEdit
          v-else-if="column.dataIndex === 'assetOriginalValue'"
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
        <template v-else-if="column.dataIndex === 'assetNo'">
          {{ props.accpetType === '1' ? '提交后自动生成' : record.assetNo }}
        </template>
        <template v-else-if="column.dataIndex === 'equipNo'">
          {{ props.accpetType === '1' ? '提交后自动生成' : record.equipNo }}
        </template>

        <AvicRowEdit
          v-else-if="column.dataIndex === 'assetClass'"
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

        <AvicRowEdit
          v-else-if="column.dataIndex === 'equipClass'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-if="props.accpetType === '1'"
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

        <AvicRowEdit
          v-else-if="
            [
              'productionDate',
              'commencementTime',
              'timeCompletion',
              'issuanceTime'
            ].includes(column.dataIndex)"
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
        <AvicRowEdit
          v-else-if="column.dataIndex === 'importedOrNot'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.importedOrNot"
              style="width: 100%"
              placeholder="请选择是否为进口设备"
              :disabled="props.accpetType === '2' && props.assetClass === '1'"
              @change="value => changeControlValue(value, record, 'importedOrNot')"
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
            <AvicDictTag :value="record.importedOrNotName" :options="importedOrNotList"/>
          </template>
        </AvicRowEdit>

        <AvicRowEdit
          v-else-if="column.dataIndex === 'equipType'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.equipType"
              style="width: 100%"
              placeholder="请选择是否为进口设备"
              :disabled="props.accpetType === '2' && props.assetClass === '1'"
              @change="value => changeControlValue(value, record, 'equipType')"
            >
              <a-select-option
                v-for="select in equipTypeList"
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
            <AvicDictTag :value="record.equipTypeName" :options="equipTypeList"/>
          </template>
        </AvicRowEdit>


        <AvicRowEdit
          v-else-if="column.dataIndex === 'assetSecretLevel'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.assetSecretLevel"
              style="width: 100%"
              placeholder="请选择资产密级"
              @change="value => changeControlValue(value, record, 'assetSecretLevel')"
            >
              <a-select-option
                v-for="select in assetSecretLevelList"
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
            <AvicDictTag :value="record.assetSecretLevelName" :options="assetSecretLevelList"/>
          </template>
        </AvicRowEdit>

        <AvicRowEdit
          v-else-if="column.dataIndex === 'ynMilitaryKeyEquip'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.ynMilitaryKeyEquip"
              style="width: 100%"
              placeholder="请选择是否为军工关键设备"
              :disabled="props.accpetType === '2' && props.assetClass === '1'"
              @change="value => changeControlValue(value, record, 'ynMilitaryKeyEquip')"
            >
              <a-select-option
                v-for="select in ynMilitaryKeyEquipList"
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
            <div>
              {{
                record.ynMilitaryKeyEquip ? (record.ynMilitaryKeyEquip === '1' ? '是' : '否') : ''
              }}
            </div>
          </template>
        </AvicRowEdit>

        <!-- 责任人-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'liablePerson'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.liablePerson"
              type="userSelect"
              placeholder="请选择责任人名称"
              :defaultShowValue="record.liablePersonAlias"
              @callback="
                (value, _selectRows) => {
                  changeCommonSelect(value, record, 'liablePerson');
                }
              "
            />
          </template>
          <template #default>
            {{ record.liablePersonAlias }}
          </template>
        </AvicRowEdit>

        <!-- 主管部门-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'managerDeptId'"
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
          v-else-if="column.dataIndex === 'receiveDeptId'"
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

        <!--  备注-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'note'"
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
          v-else-if="column.dataIndex === 'assetsUse'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.assetsUse"
              style="width: 100%"
              placeholder="请选择资产用途"
              @change="value => changeControlValue(value, record, 'assetsUse')"
            >
              <a-select-option
                v-for="select in assetsUseList"
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
            <AvicDictTag :value="record.assetsUseName" :options="assetsUseList"/>
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

    <a-modal :visible="assetClassOpen" @cancel="handleCancel" @ok="handleSummit">
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

    <a-modal :visible="equipClassOpen" @cancel="equiphandleCancel" @ok="equiphandleSummit">
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
import { listFamAccpetListByPage } from '@/api/avic/mms/fam/FamAccpetListApi'; // 引入模块API
import { getFamAssetClass, getTreeData } from '@/api/avic/mms/fam/FamAssetClassApi'; // 引入模块API
import { getTpmAssetClass, getTreeData as getTpmTreeData } from '@/api/avic/mms/tpm/TpmAssetClassApi'; // 引入模块API
import { setNodeSlots, getExpandedKeys } from '@/utils/tree-util'; // 引入树公共方法
import FamInventoryManage from '@/views/avic/mms/fam/faminventory/FamInventoryManage.vue';
import {
  HouseColumns,
  DeviceColumns,
  CarColumns,
  OfficialColumns,
  ITColumns,
  backColumnsObj
} from './ListColumns';
import {
  CarValidateRules,
  HouseValidateRules,
  ITValidateRules, OfficialValidateRules
} from '@/views/avic/mms/fam/famaccpetlist/ValidateRules';

const { proxy } = getCurrentInstance();
const assetClassOpen = ref<boolean>(false);
const equipClassOpen = ref<boolean>(false);
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
  isLand: {
    type: Boolean,
    default: false
  },
  assetClasstObj: {
    type: Object,
    defalut: {}
  }
});
let columns = ref([]);

const columns1 = [
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
    title: '资产类别名称',
    dataIndex: 'assetClassName',
    key: 'assetClassName',
    minWidth: 120
  },
  {
    title: '资产编号',
    dataIndex: 'assetNo',
    key: 'assetNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
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
    title: '使用年限',
    dataIndex: 'useTime',
    key: 'useTime',
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
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  },
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
    title: '资产型号',
    dataIndex: 'assetModel',
    key: 'assetModel',
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
    title: '资产单价',
    dataIndex: 'assetUnit',
    key: 'assetUnit',
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
    title: '资产数量',
    dataIndex: 'assetNum',
    key: 'assetNum',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    key: 'assetOriginalValue',
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
    title: '存放地点',
    dataIndex: 'installLocation',
    key: 'installLocation',
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
    title: '责任人',
    dataIndex: 'liablePerson',
    key: 'liablePerson',
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
    title: '主管部门',
    dataIndex: 'managerDeptId',
    key: 'managerDeptId',
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
    title: '使用部门',
    dataIndex: 'receiveDeptId',
    key: 'receiveDeptId',
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
    title: '厂商',
    dataIndex: 'producer',
    key: 'producer',
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
    title: '出厂号',
    dataIndex: 'factoryNo',
    key: 'factoryNo',
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
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
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
    title: '采购合同号',
    dataIndex: 'procureOrder',
    key: 'procureOrder',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
    key: 'invoiceNo',
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
    title: '权属证号',
    dataIndex: 'ownershipCertNo',
    key: 'ownershipCertNo',
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
    title: '出厂日期',
    dataIndex: 'productionDate',
    key: 'productionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '父资产编号',
    dataIndex: 'parentAssetNo',
    key: 'parentAssetNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质保期',
    dataIndex: 'warrantyPeriod',
    key: 'warrantyPeriod',
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
    title: '是否为进口设备',
    dataIndex: 'importedOrNot',
    key: 'importedOrNot',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '地理区域',
    dataIndex: 'geographicalArea',
    key: 'geographicalArea',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },

  {
    title: '资产用途',
    dataIndex: 'assetsUse',
    key: 'assetsUse',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '供应商',
    dataIndex: 'fundSource',
    key: 'fundSource',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '设备类型',
    dataIndex: 'equipType',
    key: 'equipType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '入账时累计折旧',
    dataIndex: 'firstDepreciationValue',
    key: 'firstDepreciationValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '已提月份',
    dataIndex: 'monthProposed',
    key: 'monthProposed',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产密级',
    dataIndex: 'assetSecretLevel',
    key: 'assetSecretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  },
  {
    title: '备注',
    key: 'note',
    dataIndex: 'note',
    ellipsis: true,
    minWidth: 220,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否军工关键设备',
    dataIndex: 'ynMilitaryKeyEquip',
    key: 'ynMilitaryKeyEquip',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  }
] as any[];

const { getHouseObj } = backColumnsObj();

const queryForm = ref<FamAccpetListDto>({});
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
const assetSecretLevelList = ref([]);
const lookupParams = [
  { fieldName: 'isNewAsset', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'importedOrNot', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'FAM_PROGRAM_VERSION' },
  { fieldName: 'assetsUse', lookUpType: 'FAM_ASSETS_USE' },
  { fieldName: 'equipType', lookUpType: 'TPM_EQUIPMENT_TYPE' },
  { fieldName: 'assetSecretLevel', lookUpType: 'FAM_SECRET_LEVEL' },
  { fieldName: 'geographicalArea', lookUpType: 'FAM_GEOGRAPHICAL_AREA' }
];
let validateRules = {};
const addObj = ref();
// const validateRules = {
//   assetClass: [{ required: true, message: '资产类别列不能为空' }],
//   equipClass: [{ required: props.isLand, message: '设备大类列不能为空' }],
//   assetName: [{ required: true, message: '资产名称不能为空' }],
//   assetModel: [{ required: true, message: '资产型号不能为空' }],
//   assetUnit: [{ required: true, message: '资产单价列不能为空' }],
//   assetOriginalValue: [{ required: true, message: '资产原值不能为空' }],
//   installLocation: [{ required: true, message: '存放地点列不能为空' }],
//   liablePerson: [{ required: true, message: '责任人不能为空' }],
//   invoiceNo: [{ required: true, message: '发票号不能为空' }],
//   ownershipCertNo: [{ required: true, message: '权属证号不能为空' }],
//   producer: [{ required: true, message: '厂商不能为空' }],
//   factoryNo: [{ required: true, message: '出厂号列不能为空' }],
//   brand: [{ required: true, message: '品牌列不能为空' }],
//   productionDate: [{ required: true, message: '出厂日期列不能为空' }],
//   warrantyPeriod: [{ required: true, message: '质保期不能为空' }],
//   importedOrNot: [{ required: true, message: '是否为进口设备列不能为空' }],
//   geographicalArea: [{ required: true, message: '地理区域不能为空' }],
//   assetsUse: [{ required: true, message: '资产用途列不能为空' }],
//   fundSource: [{ required: true, message: '资金来源不能为空' }],
//   equipType: [{ required: true, message: '设备类型不能为空' }],
//   assetSecretLevel: [{ required: true, message: '资产密级不能为空' }],
//   ynMilitaryKeyEquip: [{ required: true, message: '是否军工关键设备不能为空' }]
// }; // 必填列,便于保存和新增数据时校验
const deletedData = ref([]); // 前台删除数据的记录

const treeNodeId = ref();
const showTable = ref(true);

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
  showTable.value = false;
  columns.value = [...columns1];
  validateRules = { ...HouseValidateRules };
  setTimeout(() => {
    showTable.value = true;
  }, 1000);
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  //获取树
  getTreeList();
});

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
      treeData.value = [...treeData.value];
      resolve();
    });
  });

}

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
  console.log(record);
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
  });
}

/** 获取修改的数据 */
function getChangedData() {
  // deletedData.value.forEach(item => {
  //   item['operationType_'] = 'delete';
  // });
  const changedData = proxy.$getChangeRecords(list, initialList);
  // return deletedData.value.concat(changedData);
  return changedData;
}

/** 批量添加 */
function handleMostAdd() {
  open.value = true;
}

/** 批量新增确认  */
const handleOk = () => {
  open.value = false;
  const selectRow = famInventoryManage.value.selectedRow();
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
  list.value = [...list.value, ...selectRow];
};

/** 添加 */
function handleAdd() {
  // backHouseColumnsObj()
  // let item = {
  //   id: 'newLine' + proxy.$uuid(),
  //   operationType_: 'insert',
  //   isNewAsset: undefined,
  //   assetClass: props.assetClasstObj ? props.assetClasstObj.classCode : '',
  //   assetClassName: props.assetClasstObj ? props.assetClasstObj.assetClassName : '',
  //   useTime: props.assetClasstObj ? props.assetClasstObj.useTime : '',
  //   assetNo: '',
  //   equipNo: '',
  //   equipClass: '',
  //   assetName: '',
  //   assetSpec: '',
  //   assetModel: '',
  //   assetUnit: '',
  //   assetNum: '1',
  //   assetOriginalValue: '',
  //   installLocation: '',
  //   liablePerson: '',
  //   producer: '',
  //   factoryNo: '',
  //   brand: '',
  //   procureOrder: '',
  //   invoiceNo: '',
  //   ownershipCertNo: '',
  //   parentAssetNo: '',
  //   warrantyPeriod: '',
  //   importedOrNot: undefined,
  //   productionDate: null,
  //   editable: true, // true为编辑中, false为未编辑
  //   geographicalArea: '',
  //   assetsUse: '',
  //   fundSource: '',
  //   note: '',
  //   equipType: '',
  //   monthProposed: '',
  //   assetSecretLevel: '',
  //   ynMilitaryKeyEquip: ''
  // };
  const newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData)) {
    return;
  }
  // 其他列编辑状态修改为false
  newData.forEach(item => {
    item.editable = false;
  });
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
  selectedRows.value.map(rows => {
    let item = {
      ...rows,
      id: 'newLine' + proxy.$uuid(),
      operationType_: 'insert',
      editable: false // true为编辑中, false为未编辑
    };
    itemList.unshift(item);
  });
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
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
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

/** 分配列 */
function allocationColumn(code) {
  showTable.value = false;
  switch (code) {
    case'1':
      columns.value = [...HouseColumns];
      validateRules = { ...HouseValidateRules };
      addObj.value = getHouseObj(props.assetClasstObj);
      console.log('房屋');
      break;
    case'4':
      columns.value = [...CarColumns];
      validateRules = { ...CarValidateRules };
      console.log('车辆');
      break;
    case'6':
      columns.value = [...ITColumns];
      validateRules = { ...ITValidateRules };
      console.log('IT');
      break;
    case'8':
      columns.value = [...OfficialColumns];
      validateRules = { ...OfficialValidateRules };
      console.log('办公');
      break;
    default:
      columns.value = [...DeviceColumns];
      console.log('设备');
      break;
  }
  setTimeout(() => {
    showTable.value = true;
  }, 100);

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
    const code = props.assetClasstObj.classCode.charAt(0);
    allocationColumn(code);
    list.value.map(item => {
      console.log(item);
      item.assetClass = newV.classCode;
      item.assetClassName = newV.className;
      item.useTime = newV.useTime;
    });
  }
);

defineExpose({
  validate,
  getChangedData
});
</script>
