<template>
  <AvicModal
    :visible="true"
    title="编辑"
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
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="attribute01" label="ATTRIBUTE_01" has-feedback>
              <a-input
                v-model:value="form.attribute01"
                :maxLength="255"
                :auto-focus="true"
                placeholder="请输入ATTRIBUTE_01"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsCode" label="资产编号" has-feedback>
              <a-input
                v-model:value="form.assetsCode"
                :maxLength="128"
                placeholder="请输入资产编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsName" label="资产名称" has-feedback>
              <a-input
                v-model:value="form.assetsName"
                :maxLength="128"
                placeholder="请输入资产名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClassName" label="资产类别名称" has-feedback>
              <a-input
                v-model:value="form.assetClassName"
                :maxLength="64"
                placeholder="请输入资产类别名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSource" label="资产来源" has-feedback>
              <a-input
                v-model:value="form.assetSource"
                :maxLength="64"
                placeholder="请输入资产来源"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsStatus" label="资产状态">
              <a-input
                v-model:value="form.assetsStatus"
                :maxLength="2"
                placeholder="请输入资产状态"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsUse" label="资产用途" has-feedback>
              <a-input
                v-model:value="form.assetsUse"
                :maxLength="64"
                placeholder="请输入资产用途"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="entryDate" label="入账日期" has-feedback>
              <a-input
                v-model:value="form.entryDate"
                :maxLength="64"
                placeholder="请输入入账日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetOriginalValue" label="资产原值" has-feedback>
              <a-input
                v-model:value="form.assetOriginalValue"
                :maxLength="64"
                placeholder="请输入资产原值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationValue" label="累计折旧">
              <a-input
                v-model:value="form.depreciationValue"
                :maxLength="20"
                placeholder="请输入累计折旧"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationWay" label="折旧方法">
              <a-input
                v-model:value="form.depreciationWay"
                :maxLength="64"
                placeholder="请输入折旧方法"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNum" label="资产数量" has-feedback>
              <a-input
                v-model:value="form.assetNum"
                :maxLength="16"
                placeholder="请输入资产数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTime" label="使用年限">
              <a-input
                v-model:value="form.useTime"
                :maxLength="16"
                placeholder="请输入使用年限"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNetValue" label="资产净值" has-feedback>
              <a-input
                v-model:value="form.assetNetValue"
                :maxLength="16"
                placeholder="请输入资产净值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="monDepreciation" label="月折旧额" has-feedback>
              <a-input
                v-model:value="form.monDepreciation"
                :maxLength="16"
                placeholder="请输入月折旧额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageLocation" label="存放地点" has-feedback>
              <a-input
                v-model:value="form.storageLocation"
                :maxLength="64"
                placeholder="请输入存放地点"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deptName" label="部门名称" has-feedback>
              <a-input
                v-model:value="form.deptName"
                :maxLength="64"
                placeholder="请输入部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门">
              <a-input
                v-model:value="form.managerDeptId"
                :maxLength="64"
                placeholder="请输入主管部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responseUserId" label="责任人">
              <a-input
                v-model:value="form.responseUserId"
                :maxLength="64"
                placeholder="请输入责任人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="firstDepreciationValue" label="入账时累计折旧">
              <a-input
                v-model:value="form.firstDepreciationValue"
                :maxLength="20"
                placeholder="请输入入账时累计折旧"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="monthProposed" label="已提月份">
              <a-date-picker
                v-model:value="form.monthProposed"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择已提月份"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="brandModel" label="品牌型号">
              <a-input
                v-model:value="form.brandModel"
                :maxLength="50"
                placeholder="请输入品牌型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseDate" label="购置日期">
              <a-date-picker
                v-model:value="form.purchaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currentYearDepreciation" label="入账前当年折旧">
              <a-input
                v-model:value="form.currentYearDepreciation"
                :maxLength="16"
                placeholder="请输入入账前当年折旧"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="newaCurrentmProvision" label="新增当月计提">
              <a-input
                v-model:value="form.newaCurrentmProvision"
                :maxLength="64"
                placeholder="请输入新增当月计提"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="other" label="其他">
              <a-input
                v-model:value="form.other"
                :maxLength="64"
                placeholder="请输入其他"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="resetVoucherNo" label="重置凭证号">
              <a-input
                v-model:value="form.resetVoucherNo"
                :maxLength="64"
                placeholder="请输入重置凭证号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipNo" label="设备编号">
              <a-input
                v-model:value="form.equipNo"
                :maxLength="128"
                placeholder="请输入设备编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionNo" label="出厂编号">
              <a-input
                v-model:value="form.productionNo"
                :maxLength="64"
                placeholder="请输入出厂编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="voucherNo" label="凭证号">
              <a-input
                v-model:value="form.voucherNo"
                :maxLength="128"
                placeholder="请输入凭证号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factoryOwner" label="厂商">
              <a-input
                v-model:value="form.factoryOwner"
                :maxLength="64"
                placeholder="请输入厂商"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="buildProject" label="建设项目">
              <a-input
                v-model:value="form.buildProject"
                :maxLength="64"
                placeholder="请输入建设项目"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="brand" label="品牌">
              <a-input
                v-model:value="form.brand"
                :maxLength="64"
                placeholder="请输入品牌"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ownershipCertNo" label="权属证号">
              <a-input
                v-model:value="form.ownershipCertNo"
                :maxLength="64"
                placeholder="请输入权属证号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureOrderNo" label="采购合同号">
              <a-input
                v-model:value="form.procureOrderNo"
                :maxLength="64"
                placeholder="请输入采购合同号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSecretLevel" label="资产密级">
              <a-input
                v-model:value="form.assetSecretLevel"
                :maxLength="64"
                placeholder="请输入资产密级"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备">
              <a-input
                v-model:value="form.ynMilitaryKeyEquip"
                :maxLength="2"
                placeholder="请输入是否军工关键设备"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveDeptId" label="接收部门">
              <a-input
                v-model:value="form.receiveDeptId"
                :maxLength="64"
                placeholder="请输入接收部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClass" label="资产类别">
              <a-input
                v-model:value="form.assetClass"
                :maxLength="64"
                placeholder="请输入资产类别"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fundSource" label="资金来源">
              <a-input
                v-model:value="form.fundSource"
                :maxLength="64"
                placeholder="请输入资金来源"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称">
              <a-input
                v-model:value="form.projectName"
                :maxLength="32"
                placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人">
              <a-input
                v-model:value="form.handlePersonId"
                :maxLength="64"
                placeholder="请输入经办人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipClass" label="设备大类" has-feedback>
              <a-input
                v-model:value="form.equipClass"
                :maxLength="32"
                placeholder="请输入设备大类"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSpec" label="资产规格" has-feedback>
              <a-input
                v-model:value="form.assetSpec"
                :maxLength="32"
                placeholder="请输入资产规格"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetModel" label="资产型号" has-feedback>
              <a-input
                v-model:value="form.assetModel"
                :maxLength="32"
                placeholder="请输入资产型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetUnit" label="资产单价" has-feedback>
              <a-input
                v-model:value="form.assetUnit"
                :maxLength="16"
                placeholder="请输入资产单价"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invoiceNo" label="发票号" has-feedback>
              <a-input
                v-model:value="form.invoiceNo"
                :maxLength="64"
                placeholder="请输入发票号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productionDate" label="出厂日期" has-feedback>
              <a-date-picker
                v-model:value="form.productionDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentAssetNo" label="父资产编号" has-feedback>
              <a-input
                v-model:value="form.parentAssetNo"
                :maxLength="32"
                placeholder="请输入父资产编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="importedOrNot" label="是否为进口设备" has-feedback>
              <a-input
                v-model:value="form.importedOrNot"
                :maxLength="10"
                placeholder="请输入是否为进口设备"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetType" label="资产分类" has-feedback>
              <a-input
                v-model:value="form.assetType"
                :maxLength="64"
                placeholder="请输入资产分类"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="warrantyPeriod" label="质保期" has-feedback>
              <a-input
                v-model:value="form.warrantyPeriod"
                :maxLength="64"
                placeholder="请输入质保期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentId" label="父级分类">
              <AvicTreeSelect
                v-model:value="form.parentId"
                ref="treeSelectRef"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle">
              </AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="树节点排序号（本级）" has-feedback>
              <a-input
                v-model:value="form.treeSort"
                :maxLength="22"
                placeholder="请输入树节点排序号（本级）"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
        <a-button
          title="保存"
          type="primary"
          :loading="loading"
          @click="saveForm"
        >
          保存
        </a-button>
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
  saveForm,
  closeModal
} = useFamInventoryForm({
  props: props,
  emit: emit
});
</script>
