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
            <a-form-item name="assetName" label="资产名称" has-feedback>
              <a-input
                v-model:value="form.assetName"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入资产名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNo" label="资产编号" has-feedback>
              <a-input
                v-model:value="form.assetNo"
                :maxLength="50"
                placeholder="请输入资产编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="usufruct" label="使用权">
              <a-input
                v-model:value="form.usufruct"
                :maxLength="64"
                placeholder="请输入使用权"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ownerShip" label="所有权">
              <a-input
                v-model:value="form.ownerShip"
                :maxLength="64"
                placeholder="请输入所有权"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="softwareVendors" label="软件商名称">
              <a-input
                v-model:value="form.softwareVendors"
                :maxLength="50"
                placeholder="请输入软件商名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTime" label="使用年限（10年）">
              <a-input-number
                v-model:value="form.useTime"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入使用年限（10年）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAuthorization" label="是否授权">
              <a-select
                v-model:value="form.ynAuthorization"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否授权"
              >
                <a-select-option
                  v-for="item in ynAuthorizationList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="entity" label="实体">
              <a-input
                v-model:value="form.entity"
                :maxLength="64"
                placeholder="请输入实体"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="usufructNo" label="使用权编号">
              <a-input
                v-model:value="form.usufructNo"
                :maxLength="64"
                placeholder="请输入使用权编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factoryPrice" label="原值（等于出厂原价）">
              <a-input
                v-model:value="form.factoryPrice"
                :maxLength="22"
                placeholder="请输入原值（等于出厂原价）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="num" label="数量（默认1）" has-feedback>
              <a-input-number
                v-model:value="form.num"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入数量（默认1）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contractNo" label="合同编号">
              <a-input
                v-model:value="form.contractNo"
                :maxLength="64"
                placeholder="请输入合同编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderValue" label="合同金额">
              <a-input
                v-model:value="form.orderValue"
                :maxLength="16"
                placeholder="请输入合同金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="liablePersion" label="责任人">
              <AvicCommonSelect
                v-model:value="form.liablePersion"
                type="userSelect"
                placeholder="请选择责任人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门id">
              <AvicCommonSelect
                v-model:value="form.managerDeptId"
                type="deptSelect"
                placeholder="请选择主管部门id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptName" label="主管部门名称">
              <a-input
                v-model:value="form.managerDeptName"
                :maxLength="64"
                placeholder="请输入主管部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门id">
              <AvicCommonSelect
                v-model:value="form.useDeptId"
                type="deptSelect"
                placeholder="请选择使用部门id"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门名称">
              <a-input
                v-model:value="form.useDeptName"
                :maxLength="64"
                placeholder="请输入使用部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetStatus" label="资产状态（在用，处置）">
              <a-select
                v-model:value="form.assetStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资产状态（在用，处置）"
              >
                <a-select-option
                  v-for="item in assetStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseTime" label="购置时间（验收审批完成时间）">
              <a-date-picker
                v-model:value="form.purchaseTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置时间（验收审批完成时间）"
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
import { useFamInvisibleInventoryForm, emits } from './ts/FamInvisibleInventoryForm'; // 引入表单ts
const props = defineProps({
  formId: {
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
  ynAuthorizationList,
  assetStatusList,
  secretLevelList,
  saveForm,
  closeModal
} = useFamInvisibleInventoryForm({
  props: props,
  emit: emit
});
</script>

