<template>
  <AvicModal
    :visible="true"
    title="编辑"
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
            <a-form-item name="mdsVendorId" label="供应商信息表主键ID" has-feedback>
              <a-input
                v-model:value="form.mdsVendorId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入供应商信息表主键ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proveNo" label="资质编号" has-feedback>
              <a-input
                v-model:value="form.proveNo"
                :maxLength="128"
                placeholder="请输入资质编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proveName" label="资质名称" has-feedback>
              <a-input
                v-model:value="form.proveName"
                :maxLength="256"
                placeholder="请输入资质名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proveType" label="资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证">
              <a-select
                v-model:value="form.proveType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资质类型 ^ SRM_PROVE_TYPE: 1-质量认证，2-环境认证，3-NADCAP认证，4-适航认证， 5-武器装备承制资格认证，6-保密认证，7-武器装备，8-科研生产许可认证"
              >
                <a-select-option
                  v-for="item in proveTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proveGrade" label="资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III">
              <a-select
                v-model:value="form.proveGrade"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资质等级 ^ SRM_PROVE_GRADE:0-I,1-II,2-III"
              >
                <a-select-option
                  v-for="item in proveGradeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseDept" label="发证单位">
              <a-input
                v-model:value="form.releaseDept"
                :maxLength="256"
                placeholder="请输入发证单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="releaseDate" label="发证日期">
              <a-date-picker
                v-model:value="form.releaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择发证日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveBenDate" label="有效开始日期">
              <a-date-picker
                v-model:value="form.effectiveBenDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效开始日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveEndDate" label="有效结束日期">
              <a-date-picker
                v-model:value="form.effectiveEndDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效结束日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserId" label="编制人ID">
              <AvicCommonSelect
                v-model:value="form.editorUserId"
                type="userSelect"
                placeholder="请选择编制人ID"
                :defaultShowValue="form.editorUserIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserCode" label="编制人编码 ^ 员工编码">
              <AvicCommonSelect
                v-model:value="form.editorUserCode"
                type="userSelect"
                placeholder="请选择编制人编码 ^ 员工编码"
                :defaultShowValue="form.editorUserCodeAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserName" label="编制人姓名">
              <AvicCommonSelect
                v-model:value="form.editorUserName"
                type="userSelect"
                placeholder="请选择编制人姓名"
                :defaultShowValue="form.editorUserNameAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptId" label="编制部门ID">
              <AvicCommonSelect
                v-model:value="form.editorDeptId"
                type="deptSelect"
                placeholder="请选择编制部门ID"
                :defaultShowValue="form.editorDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptCode" label="编制部门编码">
              <AvicCommonSelect
                v-model:value="form.editorDeptCode"
                type="deptSelect"
                placeholder="请选择编制部门编码"
                :defaultShowValue="form.editorDeptCodeAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptName" label="编制部门名称">
              <AvicCommonSelect
                v-model:value="form.editorDeptName"
                type="deptSelect"
                placeholder="请选择编制部门名称"
                :defaultShowValue="form.editorDeptNameAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDate" label="编制时间">
              <a-date-picker
                v-model:value="form.editorDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 ^ 通用代码MMS_DATA_SECRET_LEVEL"
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
import { useMdsVendorProveForm, emits } from './ts/MdsVendorProveForm'; // 引入表单ts
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
  proveTypeList,
  proveGradeList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsVendorProveForm({
  props: props,
  emit: emit
});
</script>


