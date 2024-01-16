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
        :label-col="{ style: { width: '160px' } }"
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
            <a-form-item name="pmsMethod" label="采购方式">
              <a-radio-group v-model:value="form.pmsMethod">
                <a-radio
                  v-for="item in pmsMethodList"
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
              name="projectTopicNumber"
              label="确定供应商理由"
            >
              <a-textarea
                v-model:value="form.projectTopicNumber"
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
              name="productReqClassify"
              label="候选供应商审查方式"
            >
              <a-textarea
                v-model:value="form.productReqClassify"
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
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <PmsFindSourceVendorEdit ref="pmsFindSourceVendorEdit"/>
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程
      </a-button>
      <a-button :loading="loading" title="保存并返回" type="primary" @click="saveForm">保存并返回</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import {usePmsFindSourceForm, emits} from './ts/PmsFindSourceForm'; // 引入表单ts
import PmsFindSourceVendorEdit from '@/views/avic/mms/pms/pmsfindsourcevendor/PmsFindSourceVendorEdit.vue'; // 引入子表组件
import PmsProcurementInformationReleaseApplicationSelect from './PmsProcurementInformationReleaseApplicationSelect.vue'

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
}


const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  pmsMethodList,
  pmsPriceList,
  secretLevelList,
  closeModal,
  saveForm,
  saveAndStartProcess,
  pmsFindSourceVendorEdit
} = usePmsFindSourceForm({
  props: props,
  emit: emit
});
</script>
