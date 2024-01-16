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
            <a-form-item name="reqPlanName" label="采购计划名称" has-feedback>
              <a-input
                v-model:value="form.reqPlanName"
                :maxLength="4000"
                :auto-focus="true"
                placeholder="请输入采购计划名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsProcurementInformationReleaseApplicationId" label="科研采购信息发布申请ID">
              <a-input
                v-model:value="form.pmsProcurementInformationReleaseApplicationId"
                :maxLength="64"
                placeholder="请输入科研采购信息发布申请ID"
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
import PmsFindSourceVendorEdit from '@/views/avic/mms/pms/pmsfindsourcevendor/PmsFindSourceVendorEdit.vue'; // 引入子表组件

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
  saveForm,
  closeModal,
  pmsFindSourceVendorEdit
} = usePmsFindSourceForm({
  props: props,
  emit: emit
});
</script>
