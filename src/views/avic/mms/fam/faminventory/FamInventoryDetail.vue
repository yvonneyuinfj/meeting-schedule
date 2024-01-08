<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="1280px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <div>
      <a-spin :spinning="loading">
        <a-form
          ref="formRef"
          :model="form"
          v-bind="layout"
          layout="horizontal"
        >
          <a-row :gutter="16">
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="secretLevel"
                label="数据密级"
              >
                <a-select
                  v-model:value="form.secretLevel"
                  :auto-focus="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  disabled
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
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetsCode"
                label="资产编号"
              >
                <a-input
                  v-model:value="form.assetsCode"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetsName"
                label="资产名称"
              >
                <a-input
                  v-model:value="form.assetsName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetClassName"
                label="资产类别名称"
              >
                <a-input
                  v-model:value="form.assetClassName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetSource"
                label="资产来源"
              >
                <a-input
                  v-model:value="form.assetSource"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetsStatus"
                label="资产状态"
              >
                <a-select
                  v-model:value="form.assetsStatus"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  disabled
                >
                  <a-select-option
                    v-for="item in assetsStatusList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                  >
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetsUse"
                label="资产用途"
              >
                <a-input
                  v-model:value="form.assetsUse"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="entryDate"
                label="入账日期"
              >
                <a-input
                  v-model:value="form.entryDate"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetOriginalValue"
                label="资产原值"
              >
                <a-input
                  v-model:value="form.assetOriginalValue"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="depreciationValue"
                label="累计折旧"
              >
                <a-input
                  v-model:value="form.depreciationValue"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="depreciationWay"
                label="折旧方法"
              >
                <a-input
                  v-model:value="form.depreciationWay"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetNum"
                label="资产数量"
              >
                <a-input
                  v-model:value="form.assetNum"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="useTime"
                label="使用年限"
              >
                <a-input
                  v-model:value="form.useTime"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetNetValue"
                label="资产净值"
              >
                <a-input
                  v-model:value="form.assetNetValue"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="monDepreciation"
                label="月折旧额"
              >
                <a-input
                  v-model:value="form.monDepreciation"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="storageLocation"
                label="存放地点"
              >
                <a-input
                  v-model:value="form.storageLocation"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="deptName"
                label="部门名称"
              >
                <a-input
                  v-model:value="form.deptName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="responseUserNameAlias"
                label="责任人"
              >
                <AvicCommonSelect
                  v-model:value="form.responseUserNameAlias"
                  type="userSelect"
                  :defaultShowValue="form.responseUserNameAlias"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="firstDepreciationValue"
                label="入账时累计折旧"
              >
                <a-input
                  v-model:value="form.firstDepreciationValue"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="monthProposed"
                label="已提月份"
              >
                <a-date-picker
                  v-model:value="form.monthProposed"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="brandModel"
                label="品牌型号"
              >
                <a-input
                  v-model:value="form.brandModel"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="purchaseDate"
                label="购置日期"
              >
                <a-date-picker
                  v-model:value="form.purchaseDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="currentYearDepreciation"
                label="入账前当年折旧"
              >
                <a-input
                  v-model:value="form.currentYearDepreciation"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="newaCurrentmProvision"
                label="新增当月计提"
              >
                <a-input
                  v-model:value="form.newaCurrentmProvision"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="other"
                label="其他"
              >
                <a-input
                  v-model:value="form.other"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="resetVoucherNo"
                label="重置凭证号"
              >
                <a-input
                  v-model:value="form.resetVoucherNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="equipNo"
                label="设备编号"
              >
                <a-input
                  v-model:value="form.equipNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="productionNo"
                label="出厂编号"
              >
                <a-input
                  v-model:value="form.productionNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="voucherNo"
                label="凭证号"
              >
                <a-input
                  v-model:value="form.voucherNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="factoryOwner"
                label="厂商"
              >
                <a-input
                  v-model:value="form.factoryOwner"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="buildProject"
                label="建设项目"
              >
                <a-input
                  v-model:value="form.buildProject"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="brand"
                label="品牌"
              >
                <a-input
                  v-model:value="form.brand"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="ownershipCertNo"
                label="权属证号"
              >
                <a-input
                  v-model:value="form.ownershipCertNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="procureOrderNo"
                label="采购合同号"
              >
                <a-input
                  v-model:value="form.procureOrderNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetSecretLevel"
                label="资产密级"
              >
                <a-input
                  v-model:value="form.assetSecretLevel"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="ynMilitaryKeyEquip"
                label="是否军工关键设备"
              >
                <a-select
                  v-model:value="form.ynMilitaryKeyEquip"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  disabled
                >
                  <a-select-option
                    v-for="item in ynMilitaryKeyEquipList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                  >
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="receiveDeptName"
                label="接收部门名称"
              >
                <AvicCommonSelect
                  v-model:value="form.receiveDeptName"
                  type="deptSelect"
                  :defaultShowValue="form.receiveDeptNameAlias"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="managerDeptName"
                label="主管部门"
              >
                <AvicCommonSelect
                  v-model:value="form.managerDeptName"
                  type="deptSelect"
                  placeholder="请选择管理部门"
                  :defaultShowValue="form.managerDeptNameAlias"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetClass"
                label="资产类别"
              >
                <a-input
                  v-model:value="form.assetClass"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="fundSource"
                label="资金来源"
              >
                <a-input
                  v-model:value="form.fundSource"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="projectName"
                label="项目名称"
              >
                <a-input
                  v-model:value="form.projectName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="handlePersonName"
                label="经办人名称"
              >
                <AvicCommonSelect
                  v-model:value="form.handlePersonName"
                  type="userSelect"
                  :defaultShowValue="form.handlePersonNameAlias"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="equipClass"
                label="设备大类"
              >
                <a-input
                  v-model:value="form.equipClass"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetSpec"
                label="资产规格"
              >
                <a-input
                  v-model:value="form.assetSpec"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetModel"
                label="资产型号"
              >
                <a-input
                  v-model:value="form.assetModel"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetUnit"
                label="资产单价"
              >
                <a-input
                  v-model:value="form.assetUnit"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="invoiceNo"
                label="发票号"
              >
                <a-input
                  v-model:value="form.invoiceNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="productionDate"
                label="出厂日期"
              >
                <a-date-picker
                  v-model:value="form.productionDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="parentAssetNo"
                label="父资产编号"
              >
                <a-input
                  v-model:value="form.parentAssetNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="importedOrNot"
                label="是否为进口设备"
              >
                <a-select
                  v-model:value="form.importedOrNot"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  disabled
                >
                  <a-select-option
                    v-for="item in importedOrNotList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                  >
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="assetType"
                label="资产分类"
              >
                <a-select
                  v-model:value="form.assetType"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  disabled
                >
                  <a-select-option
                    v-for="item in assetTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                  >
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="warrantyPeriod"
                label="质保期"
              >
                <a-input
                  v-model:value="form.warrantyPeriod"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="geographicalAreaName"
                label="地理区域"
              >
                <a-input
                  v-model:value="form.geographicalAreaName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="commencementTime"
                label="开工时间"
              >
                <a-date-picker
                  v-model:value="form.commencementTime"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="timeCompletion"
                label="竣工时间"
              >
                <a-date-picker
                  v-model:value="form.timeCompletion"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="belongingLand"
                label="所属土地"
              >
                <a-input
                  v-model:value="form.belongingLand"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="certificateTitle"
                label="不动产权证书"
              >
                <a-input
                  v-model:value="form.certificateTitle"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="certificateTitleArea"
                label="不动产权证书面积"
              >
                <a-input
                  v-model:value="form.certificateTitleArea"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="issuanceTime"
                label="发证时间"
              >
                <a-date-picker
                  v-model:value="form.issuanceTime"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="recordNumber"
                label="竣工备案书档案编号"
              >
                <a-input
                  v-model:value="form.recordNumber"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="planningPermit"
                label="工程规划许可证"
              >
                <a-input
                  v-model:value="form.planningPermit"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="notice"
                label="通知书"
              >
                <a-input
                  v-model:value="form.notice"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="attachedFileNumber"
                label="附图档案编号"
              >
                <a-input
                  v-model:value="form.attachedFileNumber"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="isFactoryBuilding"
                label="是否为科研厂房"
              >
                <a-input
                  v-model:value="form.isFactoryBuilding"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="importedEquipment"
                label="进口设备国别"
              >
                <a-input
                  v-model:value="form.importedEquipment"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="vehicleUsageName"
                label="车辆用途"
              >
                <a-input
                  v-model:value="form.vehicleUsageName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="vehicleNumber"
                label="车辆识别号"
              >
                <a-input
                  v-model:value="form.vehicleNumber"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="licensePlateNumber"
                label="车牌号"
              >
                <a-input
                  v-model:value="form.licensePlateNumber"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="airDisplacement"
                label="排气量/ml"
              >
                <a-input
                  v-model:value="form.airDisplacement"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="engineNo"
                label="发动机号"
              >
                <a-input
                  v-model:value="form.engineNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="usePosition"
                label="使用位置"
              >
                <a-input
                  v-model:value="form.usePosition"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="floorspace"
                label="建筑面积"
              >
                <a-input
                  v-model:value="form.floorspace"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item
                name="supplier"
                label="供应商"
              >
                <a-input
                  v-model:value="form.supplier"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
    </div>
    <div style="display:flex;">
      <div
        v-for="item in famTabs"
        :class="tab === item.id ? 'active' : 'unActive'"
        style="margin:0 20px 10px 0"
        @click="famTabsClick(item.id)"
      >{{
          item.label
        }}
      </div>
    </div>
    <AvicTable
      v-if="show"
      ref="famInventory"
      table-key="famInventory"
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }"
      :pageParameter="queryParam.pageParameter"
      :total="totalPage"
      @refresh="getList"
    >
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.dataIndex === 'creationDate'">
          {{ dayjs(record.creationDate).format('YYYY-MM-DD')}}
        </template>
      </template>
    </AvicTable>

    <template #footer>
      <a-button
        title="返回"
        type="primary"
        ghost
        @click="closeModal"
      >返回
      </a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamInventoryForm, emits } from './ts/FamInventoryForm'; // 引入表单ts
import { getFormList } from '@/api/avic/mms/fam/FamInventoryApi.ts';
import dayjs from 'dayjs';

const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const tab = ref(0);
const loading = ref(false)
const famTabs = ref([
  {
    label: '资产变更记录',
    id: 1
  },
  {
    label: '资产改造信息',
    id: 2
  },
  {
    label: '资产出租/出借信息',
    id: 3
  },
  {
    label: '资产调拨信息',
    id: 4
  },
  {
    label: '资产封存/启封信息',
    id: 5
  },
  {
    label: '内部借用信息',
    id: 6
  },
  {
    label: '附属台账信息',
    id: 7
  },
]);
const columns = ref([]);

const columns1 = [
  {
    title: '流程状态',
    dataIndex: 'businessstate_',
    minWidth:80,
    key: 'businessstate_'
  },
  {
    title: '更改单号',
    dataIndex: 'changeApplyNo',
    minWidth:180,
    key: 'changeApplyNo'
  },
  {
    title: '更改内容',
    dataIndex: 'changeNote',
    minWidth:320,
    key: 'changeNote'
  },
  {
    title: '更改原因',
    key: 'changeReason',
    minWidth:180,
    dataIndex: 'changeReason'
  },
  {
    title: '申请人',
    key: 'createdBy',
    minWidth:80,
    dataIndex:'createdBy'
  },
  {
    title: '申请日期',
    key: 'creationDate',
    minWidth:100,
    dataIndex:'creationDate'
  },
  {
    title: '联系电话',
    key: 'changePhone',
    minWidth:100,
    dataIndex:'changePhone'
  },
];

const columns2 = [
  {
    title: '流程状态',
    dataIndex: 'businessstate_',
    key: 'businessstate_'
  },
  {
    title: '单据号',
    dataIndex: 'billNo',
    key: 'billNo'
  },
  // {
  //   title: '维修内容',
  //   dataIndex: 'address',
  //   key: 'address'
  // },
  // {
  //   title: '新增原值',
  //   key: 'tags',
  //   dataIndex: 'tags'
  // },
  {
    title: '申请人',
    key: 'createdBy',
    dataIndex: 'createdBy'
  },
  {
    title: '申请日期',
    key: 'creationDate',
    dataIndex: 'creationDate'
  },
  {
    title: '联系电话',
    key: 'telephone',
    dataIndex: 'telephone'
  },
  // {
  //   title: '密级',
  //   key: 'action'
  // }
];

const columns3 = [
  {
    title: '流程状态',
    dataIndex: 'businessstate_',
    key: 'businessstate_'
  },
  {
    title: '单据号',
    dataIndex: 'applyNo',
    key: 'applyNo'
  },
  {
    title: '起租日期',
    dataIndex: 'startLeaseDate',
    key: 'startLeaseDate'
  },
  {
    title: '经办人',
    key: 'handlePersonIdAlias',
    dataIndex: 'handlePersonIdAlias'
  },
  {
    title: '申请人',
    key: 'createdBy',
    dataIndex:'createdBy'
  },
  {
    title: '租凭期限',
    key: 'leaseTerm',
    dataIndex: 'leaseTerm'
  },
  {
    title: '租金',
    key: 'rent',
    dataIndex: 'rent'
  },
  // {
  //   title: '密级',
  //   key: 'action'
  // }
];

const columns4 = [
  {
    title: '流程状态',
    key: 'businessstate_',
    dataIndex: 'businessstate_'
  },
  {
    title: '调拨编号',
    dataIndex: 'applyNo',
    key: 'applyNo'
  },
  {
    title: '调入部门',
    dataIndex: 'inTransferDeptIdAlias',
    key: 'inTransferDeptIdAlias'
  },
  {
    title: '调拨原因',
    key: 'borrowReason',
    dataIndex: 'borrowReason'
  },
  {
    title: '申请人',
    key: 'handlePersonIdAlias',
    dataIndex: 'handlePersonIdAlias'
  },
  {
    title: '申请日期',
    key: 'applyDate',
    dataIndex: 'applyDate'
  }
  // {
  //   title: '调拨日期',
  //   key: 'action',
  //   dataIndex: ''
  // },
  // {
  //   title: '密级',
  //   key: 'secretLevelName',
  //   dataIndex:'secretLevelName'
  // }
];

const columns5 = [
  {
    title: '流程状态',
    dataIndex: 'businessstate_',
    key: 'businessstate_'
  },
  {
    title: '单据号',
    dataIndex: 'applyNo',
    key: 'applyNo'
  },
  // {
  //   title: '业务类型',
  //   dataIndex: 'address',
  //   key: 'address'
  // },
  // {
  //   title: '封存/启封原因',
  //   key: 'tags',
  //   dataIndex: 'tags'
  // },
  {
    title: '申请人',
    key: 'createdBy',
    dataIndex: 'createdBy'
  },
  {
    title: '申请日期',
    key: 'creationDate',
    dataIndex: 'creationDate'
  },
  // {
  //   title: '封存地点',
  //   key: 'action',
  //   dataIndex:''
  // },
  // // {
  //   title: '密级',
  //   key: 'action'
  // }
];

const columns6 = [
  {
    title: '流程状态',
    dataIndex: 'businessstate_',
    key: 'businessstate_'
  },
  {
    title: '单据号',
    dataIndex: 'applyNo',
    key: 'applyNo'
  },
  {
    title: '借用理由',
    dataIndex: 'borrowReson',
    key: 'borrowReson'
  },
  // {
  //   title: '封存/启封原因',
  //   key: 'tags',
  //   dataIndex: 'tags'
  // },
  {
    title: '经办人',
    key: 'handlePersonIdAlias',
    dataIndex: 'handlePersonIdAlias'
  },
  {
    title: '申请日期',
    key: 'applyDate',
    dataIndex: 'applyDate'
  },
  // {
  //   title: '封存地点',
  //   key: 'action',
  //   dataIndex:''
  // },
  // // {
  //   title: '密级',
  //   key: 'action'
  // }
];

const columns7 = [
  {
    title: '单项工程名称',
    dataIndex: 'singleProjectName',
    key: 'singleProjectName'
  },
  {
    title: '资产描述',
    dataIndex: 'assetDescribe',
    key: 'assetDescribe'
  },
  {
    title: '资产类别',
    dataIndex: 'assetClass',
    key: 'assetClass'
  },
  {
    title: '规格型号',
    key: 'specModel',
    dataIndex: 'specModel'
  },
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit'
  },
  {
    title: '面积',
    dataIndex: 'area',
    key: 'area'
  },
  {
    title: '购置价值',
    dataIndex: 'acquisitionValue',
    key: 'acquisitionValue'
  },
  // {
  //   title: '密级',
  //   dataIndex: 'name',
  //   key: 'action'
  // }
];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const data = ref([]);
const selectedRowKeys = ref([]); // 选中数据主键集合
const totalPage = ref(0);

onMounted(() => {
  tab.value = 1
  columns.value = [...columns1];
  getList(1);
});
const show = ref(true);

const emit = defineEmits(emits);

/** 资产列表tab点击 */
function famTabsClick(id) {
  tab.value = id;
  switch (id) {
    case 1:
      columns.value = [...columns1];
      getList(1)
      break;
    case 2:
      columns.value = [...columns2];
      getList(2)
      break;
    case 3:
      columns.value = [...columns3];
      getList(3)
      break;
    case 4:
      columns.value = [...columns4];
      getList(4)
      break;
    case 5:
      columns.value = [...columns5];
      getList(5)
      break;
    case 6:
      columns.value = [...columns6];
      getList(6)
      break;
    case 7:
      columns.value = [...columns7];
      getList(7)
      break;
  }
}

/** 获取列表 */
function getList(id) {
  show.value = false;
  loading.value = true
  getFormList(id,props.formId).then(res =>{
    if(res.success){
      show.value = true;
      data.value = res.data;
      loading.value = false
    }else{
      show.value = true;
      data.value = [];
      loading.value = false
    }
  }).catch(()=>{
    show.value = true;
    data.value = [];
    loading.value = false
  })
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys) {
  selectedRowKeys.value = rowKeys;
}


const {
  form,
  formRef,
  layout,
  colLayout,
  secretLevelList,
  assetsStatusList,
  ynMilitaryKeyEquipList,
  importedOrNotList,
  assetTypeList,
  closeModal
} = useFamInventoryForm({
  props: props,
  emit: emit
});
</script>


<style scoped lang="less">
.active {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}

.unActive {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #1d2129;
  border-color: #c9cdd4;
  background: #fff;

  &:hover {
    color: #4096ff;
    border-color: #4096ff;
  }
}
</style>
