<template>
  <AvicModal :visible="true" title="详情" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportDate" label="申报月份">
              <a-date-picker v-model:value="form.reportDate" :auto-focus="true" format="YYYY-MM" value-format="YYYY-MM"
                             :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="关键瓶颈设备运行数据上报" :colon="false"
                         :label-col="{ flex: '0 0 200px' }"></a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportDeptId" label="申报部门">
              <AvicCommonSelect v-model:value="form.reportDeptId" type="deptSelect"
                                :defaultShowValue="form.reportDeptIdAlias" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserName" label="申请人名称">
              <a-input v-model:value="form.applyUserName" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请日期">
              <a-date-picker v-model:value="form.applyDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                             :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级">
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                        option-filter-prop="children" :show-search="true" :allow-clear="true" :disabled="true">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
                name="note"
                label="备注"
            >
              <a-textarea
                  v-model:value="form.note"
                  :rows="2"
                  :maxLength="512"
                  placeholder="请输入备注"
                  :disabled="true"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { emits, useTpmOeeForm } from './ts/TpmOeeForm'; // 引入表单ts
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
  layout,
  colLayout,
  loading,
  secretLevelList,
  closeModal
} = useTpmOeeForm({
  props: props,
  emit: emit
});
</script>

