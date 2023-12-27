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
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyNo" label="申请单编号" has-feedback>
              <avic-auto-code
                v-model:value="form.applyNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_ASSET_LEND"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入申请单编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="title" label="标题">
              <a-input
                v-model:value="form.title"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入标题"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tranType" label="事务类型">
              <a-select
                v-model:value="form.tranType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择事务类型"
              >
                <a-select-option
                  v-for="item in tranTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门">
              <AvicCommonSelect
                v-model:value="form.managerDeptId"
                type="deptSelect"
                placeholder="请选择主管部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="hireDeptId" label="出租单位">
              <AvicCommonSelect
                v-model:value="form.hireDeptId"
                type="deptSelect"
                placeholder="请选择出租单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lesseeDeptId" label="承租单位">
              <AvicCommonSelect
                v-model:value="form.lesseeDeptId"
                type="deptSelect"
                placeholder="请选择承租单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="startLeaseDate" label="起租日期">
              <a-date-picker
                v-model:value="form.startLeaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择起租日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人">
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                placeholder="请选择经办人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请时间">
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择申请时间"
              />
            </a-form-item>
          </a-col>
<!--          <a-col v-bind="colLayout.cols">-->
<!--            <a-form-item name="billStatus" label="审批状态">-->
<!--              <a-input-->
<!--                v-model:value="form.billStatus"-->
<!--                :maxLength="32"-->
<!--                placeholder="请输入审批状态"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="leaseTerm" label="租赁期限(单位年)">
              <a-input
                v-model:value="form.leaseTerm"
                :maxLength="10"
                placeholder="请输入租赁期限(单位年)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="hireTerm" label="出借期限(单位年)">
              <a-input
                v-model:value="form.hireTerm"
                :maxLength="10"
                placeholder="请输入出借期限(单位年)"
              />
            </a-form-item>
          </a-col>
<!--          <a-col v-bind="colLayout.cols">-->
<!--            <a-form-item name="rent" label="租金">-->
<!--              <a-input-->
<!--                v-model:value="form.rent"-->
<!--                :maxLength="20"-->
<!--                placeholder="请输入租金"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </a-row>
      </a-form>
      <FamAssetLendListEdit ref="famAssetLendListEdit" />
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAssetLendForm, emits } from './ts/FamAssetLendForm'; // 引入表单ts
import FamAssetLendListEdit from '@/views/avic/mms/fam/famassetlendlist/FamAssetLendListEdit.vue';
import dayjs from 'dayjs'; // 引入子表组件

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
const { proxy } = getCurrentInstance();
const emit = defineEmits(emits);
onMounted(()=>{
  form.value.title = proxy.$getLoginUser().name + dayjs(new Date()).format('YYYYMMDD') + '出租申请';
});
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  autoCode,
  tranTypeList,
  closeModal,
  saveAndStartProcess,
  famAssetLendListEdit
} = useFamAssetLendForm({
  props: props,
  emit: emit
});
</script>
