<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="1280px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
      >
        <a-row  :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="attribute01" label="ATTRIBUTE_01">
              <a-input v-model:value="form.attribute01" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsCode" label="资产编号">
              <a-input v-model:value="form.assetsCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsName" label="资产名称">
              <a-input v-model:value="form.assetsName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClassName" label="资产类别名称">
              <a-input v-model:value="form.assetClassName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSource" label="资产来源">
              <a-input v-model:value="form.assetSource" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsStatus" label="资产状态">
              <a-input v-model:value="form.assetsStatus" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsUse" label="资产用途">
              <a-input v-model:value="form.assetsUse" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="entryDate" label="入账日期">
              <a-input v-model:value="form.entryDate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetOriginalValue" label="资产原值">
              <a-input v-model:value="form.assetOriginalValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationValue" label="累计折旧">
              <a-input v-model:value="form.depreciationValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationWay" label="折旧方法">
              <a-input v-model:value="form.depreciationWay" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNum" label="资产数量">
              <a-input v-model:value="form.assetNum" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTime" label="使用年限">
              <a-input v-model:value="form.useTime" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNetValue" label="资产净值">
              <a-input v-model:value="form.assetNetValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="monDepreciation" label="月折旧额">
              <a-input v-model:value="form.monDepreciation" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageLocation" label="存放地点">
              <a-input v-model:value="form.storageLocation" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deptName" label="部门名称">
              <a-input v-model:value="form.deptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门">
              <a-input v-model:value="form.managerDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responseUserId" label="责任人">
              <a-input v-model:value="form.responseUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="firstDepreciationValue" label="入账时累计折旧">
              <a-input v-model:value="form.firstDepreciationValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="monthProposed" label="已提月份">
              <a-date-picker
                v-model:value="form.monthProposed"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="brandModel" label="品牌型号">
              <a-input v-model:value="form.brandModel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseDate" label="购置日期">
              <a-date-picker
                v-model:value="form.purchaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentYearDepreciation" label="入账前当年折旧">
              <a-input v-model:value="form.currentYearDepreciation" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="newaCurrentmProvision" label="新增当月计提">
              <a-input v-model:value="form.newaCurrentmProvision" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="other" label="其他">
              <a-input v-model:value="form.other" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="resetVoucherNo" label="重置凭证号">
              <a-input v-model:value="form.resetVoucherNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipNo" label="设备编号">
              <a-input v-model:value="form.equipNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionNo" label="出厂编号">
              <a-input v-model:value="form.productionNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="voucherNo" label="凭证号">
              <a-input v-model:value="form.voucherNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factoryOwner" label="厂商">
              <a-input v-model:value="form.factoryOwner" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="buildProject" label="建设项目">
              <a-input v-model:value="form.buildProject" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="brand" label="品牌">
              <a-input v-model:value="form.brand" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ownershipCertNo" label="权属证号">
              <a-input v-model:value="form.ownershipCertNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureOrderNo" label="采购合同号">
              <a-input v-model:value="form.procureOrderNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSecretLevel" label="资产密级">
              <a-input v-model:value="form.assetSecretLevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备">
              <a-input v-model:value="form.ynMilitaryKeyEquip" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveDeptId" label="接收部门">
              <a-input v-model:value="form.receiveDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClass" label="资产类别">
              <a-input v-model:value="form.assetClass" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fundSource" label="资金来源">
              <a-input v-model:value="form.fundSource" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称">
              <a-input v-model:value="form.projectName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人">
              <a-input v-model:value="form.handlePersonId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipClass" label="设备大类">
              <a-input v-model:value="form.equipClass" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSpec" label="资产规格">
              <a-input v-model:value="form.assetSpec" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetModel" label="资产型号">
              <a-input v-model:value="form.assetModel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetUnit" label="资产单价">
              <a-input v-model:value="form.assetUnit" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invoiceNo" label="发票号">
              <a-input v-model:value="form.invoiceNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionDate" label="出厂日期">
              <a-date-picker
                v-model:value="form.productionDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentAssetNo" label="父资产编号">
              <a-input v-model:value="form.parentAssetNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="importedOrNot" label="是否为进口设备">
              <a-input v-model:value="form.importedOrNot" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetType" label="资产分类">
              <a-input v-model:value="form.assetType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="warrantyPeriod" label="质保期">
              <a-input v-model:value="form.warrantyPeriod" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentId" label="父级分类">
              <AvicTreeSelect
                v-model:value="form.parentId"
                ref="treeSelectRef"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="树节点排序号（本级）">
              <a-input v-model:value="form.treeSort" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button
        type="primary"
        ghost
        title="返回"
        @click="closeModal"
      >
        返回
      </a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamInventoryForm, emits } from './ts/FamInventoryForm'; //引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  parentId: {
    type: String,
    required: true
  },
  parentTitle: {
    type: String,
    required: true
  },
  defaultTreeLevel: {
    type: Number,
    default: 1
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  baseUrl,
  closeModal
} = useFamInventoryForm({
  props: props,
  emit: emit
});
</script>
