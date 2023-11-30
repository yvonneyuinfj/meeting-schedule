<template>
  <AvicModal :visible="true" title="添加" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportDate" label="申报月份" has-feedback>
              <a-date-picker v-model:value="form.reportDate" :auto-focus="true" format="YYYY-MM" value-format="YYYY-MM"
                placeholder="请选择申报月份" picker=month />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="关键瓶颈设备运行数据上报" :colon="false" :label-col="{ flex: '0 0 200px' }"></a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportDeptId" label="申报部门" has-feedback>
              <AvicCommonSelect v-model:value="form.reportDeptId" :defaultShowValue="form.reportDeptIdAlias" :disabled="true"
                disabledtype="deptSelect" placeholder="请选择申报部门" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserName" label="申请人名称">
              <a-input v-model:value="form.applyUserName" :maxLength="64" :disabled="true" placeholder="请输入申请人名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请日期">
              <a-date-picker v-model:value="form.applyDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :disabled="true"
                placeholder="请选择申请日期" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" :maxLength="512" placeholder="请输入备注" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
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
import { useTpmOeeForm, emits } from './ts/TpmOeeForm'; // 引入表单ts
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
  secretLevelList,
  saveForm,
  closeModal
} = useTpmOeeForm({
  props: props,
  emit: emit
});
</script>
