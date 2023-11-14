<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="960px"
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
            <a-form-item name="assetCode" label="资产编码">
              <a-input
                v-model:value="form.assetCode"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入资产编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetName" label="资产名称">
              <a-input
                v-model:value="form.assetName"
                :maxLength="64"
                placeholder="请输入资产名称"
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
            <a-form-item name="equipNo" label="设备编号">
              <a-input
                v-model:value="form.equipNo"
                :maxLength="128"
                placeholder="请输入设备编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetModel" label="资产型号">
              <a-input
                v-model:value="form.assetModel"
                :maxLength="64"
                placeholder="请输入资产型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetOriginalValue" label="资产原值（元）">
              <a-input
                v-model:value="form.assetOriginalValue"
                :maxLength="22"
                placeholder="请输入资产原值（元）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseTime" label="购置时间">
              <a-date-picker
                v-model:value="form.purchaseTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNetValue" label="资产净值">
              <a-input
                v-model:value="form.assetNetValue"
                :maxLength="22"
                placeholder="请输入资产净值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factorySerialNumber" label="出厂序列号">
              <a-input
                v-model:value="form.factorySerialNumber"
                :maxLength="64"
                placeholder="请输入出厂序列号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSpec" label="资产规格">
              <a-input
                v-model:value="form.assetSpec"
                :maxLength="64"
                placeholder="请输入资产规格"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAssetInventoryTaskListForm, emits } from './ts/FamAssetInventoryTaskListForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
    type: String,
    default: ''
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
  saveForm,
  closeModal
} = useFamAssetInventoryTaskListForm({
  props: props,
  emit: emit
});
</script>
