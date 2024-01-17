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
          <a-col :span="12">
            <a-form-item name="reqPlanName" label="采购计划名称" has-feedback>
              <AvicModalSelect
                v-model:value="form.pmsPlanId"
                title="选择采购计划名称"
                placeholder="请选择采购计划名称"
                valueField="pmsPlanId"
                showField="reqPlanName"
                :defaultShowValue="form.reqPlanName"
                :selectComponent="PmsProcurementInformationReleaseApplicationSelectComponent"
                :allow-clear="true"
                @selectConfirm="changePlan($event, form)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procurementMethod" label="采购方式">
              <a-radio-group v-model:value="form.procurementMethod" disabled>
                <a-radio
                  v-for="item in procurementMethodList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsPrice" label="采购价格">
              <a-radio-group v-model:value="form.pmsPrice">
                <a-radio
                  v-for="item in pmsPriceList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="vendorReason"
              label="确定供应商理由"
            >
              <a-textarea
                v-model:value="form.vendorReason"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入确定供应商理由"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="vendorReviewMode"
              label="候选供应商审查方式"
            >
              <a-textarea
                v-model:value="form.vendorReviewMode"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入候选供应商审查方式"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人" has-feedback>
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                placeholder="请选择经办人"
                :defaultShowValue="form.handlePersonIdAlias"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <PmsFindSourceVendorEdit ref="pmsFindSourceVendorEdit" :mainId="formId || form.id" />
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { usePmsFindSourceForm, emits } from './ts/PmsFindSourceForm'; // 引入表单ts
import PmsFindSourceVendorEdit from '@/views/avic/mms/pms/pmsfindsourcevendor/PmsFindSourceVendorEdit.vue';
import PmsProcurementInformationReleaseApplicationSelect
  from "@/views/avic/mms/pms/pmsfindsource/PmsProcurementInformationReleaseApplicationSelect.vue"; // 引入子表组件

const PmsProcurementInformationReleaseApplicationSelectComponent = PmsProcurementInformationReleaseApplicationSelect;


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

function changePlan(e, record) {
  record.pmsTaskNo = e[0].pmsTaskNo;
  record.reqPlanNo = e[0].reqPlanNo;
  record.reqPlanName = e[0].reqPlanName;
  record.pmsProcurementInformationReleaseApplicationId = e[0].id;
  record.secretLevel = e[0].secretLevel;
  record.procurementMethod = e[0].procurementMethod;
  record.supplierSelectionCriteria = e[0].supplierSelectionCriteria;
}

const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  procurementMethodList,
  pmsPriceList,
  secretLevelList,
  supplierSelectionCriteriaList,
  saveForm,
  closeModal,
  pmsFindSourceVendorEdit
} = usePmsFindSourceForm({
  props: props,
  emit: emit
});
</script>
