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
        class="form-excel-style"
      >
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportDate" label="申报月份" has-feedback>
              <a-date-picker
                v-model:value="form.reportDate"
                :auto-focus="true"
                format="YYYY-MM"
                value-format="YYYY-MM"
                placeholder="请选择申报月份"
                picker=month
                :disabled="true"
                @change="reportDateChange"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="" :label-col="{ background: '#fff', border: 'none' }" has-feedback>
              <a-input :disabled="true" :maxLength="512" default-value="关键瓶颈设备运行数据上报"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportDeptId" label="填报部门" has-feedback>
              <AvicCommonSelect
                v-model:value="form.reportDeptId"
                type="deptSelect"
                placeholder="请选择填报部门"
                :defaultShowValue="form.reportDeptIdAlias"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserId" label="填报人" has-feedback>
              <AvicCommonSelect
                v-model:value="form.applyUserId"
                type="userSelect"
                placeholder="请选择填报人"
                :defaultShowValue="form.applyUserIdAlias"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="填报日期" has-feedback>
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择填报日期"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentIntegrityRate" label="设备完好率(%)">
              <a-input
                v-model:value="form.equipmentIntegrityRate"
                :maxLength="16"
                placeholder="请输入设备完好率(%)"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
                :disabled="props.readOnly"
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
        <TpmIntactRatioMtbfMttrLEdit ref="tpmIntactRatioMtbfMttrLEdit" :mainId="formId || form.id" :reportDate="reportDate" :readOnly="props.readOnly" />
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" v-if="startLoading" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="保存并返回" v-if="saveLoading" type="primary" :loading="loading" @click="saveForm">保存并返回</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmIntactRatioMtbfMttrForm, emits } from './ts/TpmIntactRatioMtbfMttrForm'; // 引入表单ts
import TpmIntactRatioMtbfMttrLEdit from '@/views/avic/mms/tpm/tpmintactratiomtbfmttrl/TpmIntactRatioMtbfMttrLEdit.vue'; // 引入子表组件

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
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  },
  // 保存并启动流程
  startLoading: {
    type: Boolean,
    default: false
  },
  // 保存并返回
  saveLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(emits);
const reportDate = ref();
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
  closeModal,
  tpmIntactRatioMtbfMttrLEdit
} = useTpmIntactRatioMtbfMttrForm({
  props: props,
  emit: emit
});


function reportDateChange(v) {
  reportDate.value = v;
}

watch(
  () => form.value.reportDate,
  newV => {
    reportDate.value = newV;
  }
);
</script>
