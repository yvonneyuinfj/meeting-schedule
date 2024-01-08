<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      layout="horizontal"
      class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('changeApplyNo')">
          <a-form-item name="voucherNo" label="申请单编号" :rules="fieldRequired('changeApplyNo')" has-feedback>
            <a-input
              v-model:value="form.changeApplyNo"
              :disabled="fieldDisabled('changeApplyNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetsStatus')">
          <a-form-item name="assetsStatus" label="资产状态" :rules="fieldRequired('assetsStatus')" has-feedback>
            <a-select
              v-model:value="form.assetsStatus"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('assetsStatus')"
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
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetsUse')">
          <a-form-item name="assetsUse" label="资产用途" :rules="fieldRequired('assetsUse')" has-feedback>
            <a-input
              v-model:value="form.assetsUse"
              :disabled="fieldDisabled('assetsUse')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('entryDate')">-->
<!--          <a-form-item name="entryDate" label="入账日期" :rules="fieldRequired('entryDate')" has-feedback>-->
<!--            <a-date-picker-->
<!--              v-model:value="form.entryDate"-->
<!--              format="YYYY-MM-DD"-->
<!--              value-format="YYYY-MM-DD"-->
<!--              :disabled="fieldDisabled('entryDate')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetOriginalValue')">
          <a-form-item name="assetOriginalValue" label="资产原值" :rules="fieldRequired('assetOriginalValue')" has-feedback>
            <a-input-number
              v-model:value="form.assetOriginalValue"
              :max="999999999999"
              :min="-999999999999"
              :precision="2"
              :step="0.01"
              style="width: 100%"
              :disabled="fieldDisabled('assetOriginalValue')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('depreciationValue')">
          <a-form-item name="depreciationValue" label="累计折旧" :rules="fieldRequired('depreciationValue')" has-feedback>
            <a-input-number
              v-model:value="form.depreciationValue"
              :max="999999999999"
              :min="-999999999999"
              :precision="2"
              :step="0.01"
              style="width: 100%"
              :disabled="fieldDisabled('depreciationValue')"
            ></a-input-number>
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('depreciationWay')">-->
<!--          <a-form-item name="depreciationWay" label="折旧方法" :rules="fieldRequired('depreciationWay')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.depreciationWay"-->
<!--              :disabled="fieldDisabled('depreciationWay')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetNum')">
          <a-form-item name="assetNum" label="资产数量" :rules="fieldRequired('assetNum')" has-feedback>
            <a-input-number
              v-model:value="form.assetNum"
              :max="999999999999"
              :min="-999999999999"
              :disabled="fieldDisabled('assetNum')"
              style="width: 100%"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('useTime')">
          <a-form-item name="useTime" label="使用年限" :rules="fieldRequired('useTime')" has-feedback>
            <a-input
              v-model:value="form.useTime"
              :disabled="fieldDisabled('useTime')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetNetValue')">
          <a-form-item name="assetNetValue" label="资产净值" :rules="fieldRequired('assetNetValue')" has-feedback>
            <a-input-number
              v-model:value="form.assetNetValue"
              :max="999999999999"
              :min="-999999999999"
              :precision="2"
              :step="0.01"
              :disabled="fieldDisabled('assetNetValue')"
              style="width: 100%"
            ></a-input-number>
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('monDepreciation')">-->
<!--          <a-form-item name="monDepreciation" label="月折旧额" :rules="fieldRequired('monDepreciation')" has-feedback>-->
<!--            <a-input-number-->
<!--              v-model:value="form.monDepreciation"-->
<!--              :max="999999999999"-->
<!--              :min="-999999999999"-->
<!--              :precision="2"-->
<!--              :step="0.01"-->
<!--              :disabled="fieldDisabled('monDepreciation')"-->
<!--              style="width: 100%"-->
<!--            ></a-input-number>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('storageLocation')">
          <a-form-item name="storageLocation" label="存放地点" :rules="fieldRequired('storageLocation')" has-feedback>
            <a-input
              v-model:value="form.storageLocation"
              :disabled="fieldDisabled('storageLocation')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('deptName')">-->
<!--          <a-form-item name="deptName" label="部门名称" :rules="fieldRequired('deptName')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.deptName"-->
<!--              :disabled="fieldDisabled('deptName')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('managerDeptId')">-->
<!--          <a-form-item name="managerDeptId" label="主管部门" :rules="fieldRequired('managerDeptId')" has-feedback>-->
<!--            <AvicCommonSelect-->
<!--              v-model:value="form.managerDeptId"-->
<!--              type="deptSelect"-->
<!--              :defaultShowValue="form.managerDeptIdAlias"-->
<!--              :disabled="fieldDisabled('managerDeptId')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('responseUserId')">
          <a-form-item name="responseUserId" label="责任人" :rules="fieldRequired('responseUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.responseUserId"
              type="userSelect"
              :defaultShowValue="form.responseUserIdAlias"
              :disabled="fieldDisabled('responseUserId')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('firstDepreciationValue')">-->
<!--          <a-form-item name="firstDepreciationValue" label="入账时累计折旧" :rules="fieldRequired('firstDepreciationValue')" has-feedback>-->
<!--            <a-input-number-->
<!--              v-model:value="form.firstDepreciationValue"-->
<!--              :max="999999999999"-->
<!--              :min="-999999999999"-->
<!--              :precision="2"-->
<!--              :step="0.01"-->
<!--              :disabled="fieldDisabled('firstDepreciationValue')"-->
<!--              style="width: 100%"-->
<!--            ></a-input-number>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('monthProposed')">
          <a-form-item name="monthProposed" label="已提月份" :rules="fieldRequired('monthProposed')" has-feedback>
            <a-date-picker
              v-model:value="form.monthProposed"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('monthProposed')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('brandModel')">-->
<!--          <a-form-item name="brandModel" label="品牌型号" :rules="fieldRequired('brandModel')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.brandModel"-->
<!--              :disabled="fieldDisabled('brandModel')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('purchaseDate')">-->
<!--          <a-form-item name="purchaseDate" label="购置日期" :rules="fieldRequired('purchaseDate')" has-feedback>-->
<!--            <a-date-picker-->
<!--              v-model:value="form.purchaseDate"-->
<!--              format="YYYY-MM-DD"-->
<!--              value-format="YYYY-MM-DD"-->
<!--              :disabled="fieldDisabled('purchaseDate')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('currentYearDepreciation')">-->
<!--          <a-form-item name="currentYearDepreciation" label="入账前当年折旧" :rules="fieldRequired('currentYearDepreciation')" has-feedback>-->
<!--            <a-input-number-->
<!--              v-model:value="form.currentYearDepreciation"-->
<!--              :max="999999999999"-->
<!--              :min="-999999999999"-->
<!--              :precision="2"-->
<!--              :step="0.01"-->
<!--              :disabled="fieldDisabled('currentYearDepreciation')"-->
<!--              style="width: 100%"-->
<!--            ></a-input-number>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('newaCurrentmProvision')">-->
<!--          <a-form-item name="newaCurrentmProvision" label="新增当月计提" :rules="fieldRequired('newaCurrentmProvision')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.newaCurrentmProvision"-->
<!--              :disabled="fieldDisabled('newaCurrentmProvision')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('other')">-->
<!--          <a-form-item name="other" label="其他" :rules="fieldRequired('other')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.other"-->
<!--              :disabled="fieldDisabled('other')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('resetVoucherNo')">-->
<!--          <a-form-item name="resetVoucherNo" label="重置凭证号" :rules="fieldRequired('resetVoucherNo')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.resetVoucherNo"-->
<!--              :disabled="fieldDisabled('resetVoucherNo')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('equipNo')">-->
<!--          <a-form-item name="equipNo" label="设备编号" :rules="fieldRequired('equipNo')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.equipNo"-->
<!--              :disabled="fieldDisabled('equipNo')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('productionNo')">
          <a-form-item name="productionNo" label="出厂编号" :rules="fieldRequired('productionNo')" has-feedback>
            <a-input
              v-model:value="form.productionNo"
              :disabled="fieldDisabled('productionNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('voucherNo')">
          <a-form-item name="voucherNo" label="凭证号" :rules="fieldRequired('voucherNo')" has-feedback>
            <a-input
              v-model:value="form.voucherNo"
              :disabled="fieldDisabled('voucherNo')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('factoryOwner')">-->
<!--          <a-form-item name="factoryOwner" label="厂商" :rules="fieldRequired('factoryOwner')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.factoryOwner"-->
<!--              :disabled="fieldDisabled('factoryOwner')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('buildProject')">-->
<!--          <a-form-item name="buildProject" label="建设项目" :rules="fieldRequired('buildProject')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.buildProject"-->
<!--              :disabled="fieldDisabled('buildProject')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('brand')">
          <a-form-item name="brand" label="品牌" :rules="fieldRequired('brand')" has-feedback>
            <a-input
              v-model:value="form.brand"
              :disabled="fieldDisabled('brand')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('ownershipCertNo')">
          <a-form-item name="ownershipCertNo" label="权属证号" :rules="fieldRequired('ownershipCertNo')" has-feedback>
            <a-input
              v-model:value="form.ownershipCertNo"
              :disabled="fieldDisabled('ownershipCertNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('procureOrderNo')">
          <a-form-item name="procureOrderNo" label="采购合同号" :rules="fieldRequired('procureOrderNo')" has-feedback>
            <a-input
              v-model:value="form.procureOrderNo"
              :disabled="fieldDisabled('procureOrderNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetSecretLevel')">
          <a-form-item name="assetSecretLevel" label="资产密级" :rules="fieldRequired('assetSecretLevel')" has-feedback>
            <a-input
              v-model:value="form.assetSecretLevel"
              :disabled="fieldDisabled('assetSecretLevel')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('ynMilitaryKeyEquip')">
          <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备" :rules="fieldRequired('ynMilitaryKeyEquip')" has-feedback>
            <a-select
              v-model:value="form.ynMilitaryKeyEquip"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('ynMilitaryKeyEquip')"
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
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('receiveDeptId')">-->
        <!--          <a-form-item name="receiveDeptId" label="接收部门" :rules="fieldRequired('receiveDeptId')" has-feedback>-->
        <!--            <AvicCommonSelect-->
        <!--              v-model:value="form.receiveDeptId"-->
        <!--              type="deptSelect"-->
        <!--              :defaultShowValue="form.receiveDeptIdAlias"-->
        <!--              :disabled="fieldDisabled('receiveDeptId')"-->
        <!--            />-->
        <!--          </a-form-item>-->
        <!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetClass')">
          <a-form-item name="assetClass" label="资产类别" :rules="fieldRequired('assetClass')" has-feedback>
            <a-input
              v-model:value="form.assetClass"
              :disabled="fieldDisabled('assetClass')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('fundSource')">
          <a-form-item name="fundSource" label="资金来源" :rules="fieldRequired('fundSource')" has-feedback>
            <a-input
              v-model:value="form.fundSource"
              :disabled="fieldDisabled('fundSource')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('projectName')">
          <a-form-item name="projectName" label="项目名称" :rules="fieldRequired('projectName')" has-feedback>
            <a-input
              v-model:value="form.projectName"
              :disabled="fieldDisabled('projectName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('handlePersonId')">
          <a-form-item name="handlePersonId" label="经办人" :rules="fieldRequired('handlePersonId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('equipClass')">-->
<!--          <a-form-item name="equipClass" label="设备大类" :rules="fieldRequired('equipClass')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.equipClass"-->
<!--              :disabled="fieldDisabled('equipClass')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetSpec')">
          <a-form-item name="assetSpec" label="资产规格" :rules="fieldRequired('assetSpec')" has-feedback>
            <a-input
              v-model:value="form.assetSpec"
              :disabled="fieldDisabled('assetSpec')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetModel')">
          <a-form-item name="assetModel" label="资产型号" :rules="fieldRequired('assetModel')" has-feedback>
            <a-input
              v-model:value="form.assetModel"
              :disabled="fieldDisabled('assetModel')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetUnit')">
          <a-form-item name="assetUnit" label="资产单价" :rules="fieldRequired('assetUnit')" has-feedback>
            <a-input-number
              v-model:value="form.assetUnit"
              :max="999999999999"
              :min="-999999999999"
              :precision="2"
              :step="0.01"
              :disabled="fieldDisabled('assetUnit')"
              style="width: 100%"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('invoiceNo')">
          <a-form-item name="invoiceNo" label="发票号" :rules="fieldRequired('invoiceNo')" has-feedback>
            <a-input
              v-model:value="form.invoiceNo"
              :disabled="fieldDisabled('invoiceNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('productionDate')">
          <a-form-item name="productionDate" label="出厂日期" :rules="fieldRequired('productionDate')" has-feedback>
            <a-date-picker
              v-model:value="form.productionDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('productionDate')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('parentAssetNo')">-->
<!--          <a-form-item name="parentAssetNo" label="父资产编号" :rules="fieldRequired('parentAssetNo')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.parentAssetNo"-->
<!--              :disabled="fieldDisabled('parentAssetNo')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('importedOrNot')">
          <a-form-item name="importedOrNot" label="是否为进口设备" :rules="fieldRequired('importedOrNot')" has-feedback>
            <a-select
              v-model:value="form.importedOrNot"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('importedOrNot')"
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
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('assetType')">
          <a-form-item name="assetType" label="资产分类" :rules="fieldRequired('assetType')" has-feedback>
            <a-select
              v-model:value="form.assetType"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('assetType')"
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
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('warrantyPeriod')">
          <a-form-item name="warrantyPeriod" label="质保期" :rules="fieldRequired('warrantyPeriod')" has-feedback>
            <a-date-picker
              v-model:value="form.warrantyPeriod"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('warrantyPeriod')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols4" v-if="fieldVisible('changeReason')">
          <a-form-item name="changeReason" label="更改原因" :rules="fieldRequired('changeReason')" has-feedback>
            <a-textarea
              v-model:value="form.changeReason"
              :rows="2"
              :disabled="fieldDisabled('changeReason')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <FamInventoryChangeListEdit
      v-if="fieldVisible('FAM_INVENTORY_CHANGE_LIST')"
      ref="famInventoryChangeListEdit"
      :mainId="formId || form.id"
      :bpmInstanceObject="bpmInstanceObject"
      :bpmParams="bpmParams"
    />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="addSubTableButton"
      label="添加"
      title="添加"
      style="display: none"
    >
      添加
    </a-button>
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="deleteSubTableButton"
      label="删除"
      title="删除"
      style="display: none"
    >
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { useFamInventoryChangeForm, emits } from './ts/FamInventoryChangeForm'; // 引入表单ts
import FamInventoryChangeListEdit from '@/views/avic/mms/fam/faminventorychangelist/FamInventoryChangeListEdit.vue'; // 引入子表组件

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  bpmParams,
  layout,
  colLayout,
  secretLevelList,
  assetsStatusList,
  ynMilitaryKeyEquipList,
  importedOrNotList,
  assetTypeList,
  famInventoryChangeListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamInventoryChangeForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>


