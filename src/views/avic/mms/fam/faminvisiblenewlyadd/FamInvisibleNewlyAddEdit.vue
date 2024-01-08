<template>
  <AvicModal :visible="true" title="编辑" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invisibleAssetName" label="无形资产名称">
              <a-input v-model:value="form.invisibleAssetName" :maxLength="64" :auto-focus="true"
                placeholder="请输入无形资产名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetNum" label="预算号">
              <a-input v-model:value="form.budgetNum" :maxLength="64" placeholder="请输入预算号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetUnitPrice" label="预计单价（万元）">
              <a-input v-model:value="form.budgetUnitPrice" :maxLength="16" placeholder="请输入预计单价（万元）" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门">
              <AvicCommonSelect v-model:value="form.managerDeptId" type="deptSelect" placeholder="请选择主管部门"
                :defaultShowValue="form.managerDeptIdAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="managerDeptName" label="主管部门名称">
              <a-input v-model:value="form.managerDeptName" :maxLength="64" placeholder="请输入主管部门名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerLeaderId" label="主管副所长">
              <AvicCommonSelect v-model:value="form.managerLeaderId" type="userSelect" placeholder="请选择主管副所长"
                :defaultShowValue="form.managerLeaderIdAlias" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="applyReasion" label="申请理由">
              <a-textarea v-model:value="form.applyReasion" :rows="2" :maxLength="4000" placeholder="请输入申请理由" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="reqAndAdvise" label="要求及建议">
              <a-textarea v-model:value="form.reqAndAdvise" :rows="2" :maxLength="4000" placeholder="请输入要求及建议" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersionId" label="经办人">
              <AvicCommonSelect v-model:value="form.handlePersionId" type="userSelect" placeholder="请选择经办人"
                :defaultShowValue="form.handlePersionIdAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="handlePersionName" label="经办人名称">
              <a-input v-model:value="form.handlePersionName" :maxLength="64" placeholder="请输入经办人名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门">
              <AvicCommonSelect v-model:value="form.useDeptId" type="deptSelect" placeholder="请选择使用部门"
                :defaultShowValue="form.useDeptIdAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="useDeptName" label="使用部门名称">
              <a-input v-model:value="form.useDeptName" :maxLength="64" placeholder="请输入使用部门名称" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="数据密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择数据密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="保存" type="primary" :loading="loading" @click="saveAndStartProcess">
        推进流程
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamInvisibleNewlyAddForm, emits } from './ts/FamInvisibleNewlyAddForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
  bpmOperatorRefresh: {
    type: Function
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
  secretLevelList,
  saveForm,
  saveAndStartProcess,
  closeModal
} = useFamInvisibleNewlyAddForm({
  props: props,
  emit: emit
});
</script>
