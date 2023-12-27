<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      layout="horizontal"
      class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyNo')">
          <a-form-item name="applyNo" label="申请单编号" :rules="fieldRequired('applyNo')" has-feedback>
            <AvicAutoCode
              v-model:value="form.applyNo"
              ref="autoCode"
              code-type="FAM_BILL_NO"
              code-param="FAM_ASSET_LEND"
              :allow-clear="true"
              :disabled="fieldDisabled('applyNo')"
              placeholder="请输入申请单编号"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('title')">
          <a-form-item name="title" label="标题" :rules="fieldRequired('title')" has-feedback>
            <a-input
              v-model:value="form.title"
              :auto-focus="true"
              :disabled="fieldDisabled('title')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('tranType')">
          <a-form-item name="tranType" label="事务类型" :rules="fieldRequired('tranType')" has-feedback>
            <a-select
              v-model:value="form.tranType"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('tranType')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
          <a-form-item name="managerDeptId" label="主管部门" :rules="fieldRequired('managerDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.managerDeptId"
              type="deptSelect"
              :defaultShowValue="form.managerDeptIdAlias"
              :disabled="fieldDisabled('managerDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('hireDeptId')">
          <a-form-item name="hireDeptId" label="出租单位" :rules="fieldRequired('hireDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.hireDeptId"
              type="deptSelect"
              :defaultShowValue="form.hireDeptIdAlias"
              :disabled="fieldDisabled('hireDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('lesseeDeptId')">
          <a-form-item name="lesseeDeptId" label="承租单位" :rules="fieldRequired('lesseeDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.lesseeDeptId"
              type="deptSelect"
              :defaultShowValue="form.lesseeDeptIdAlias"
              :disabled="fieldDisabled('lesseeDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('startLeaseDate')">
          <a-form-item name="startLeaseDate" label="起租日期" :rules="fieldRequired('startLeaseDate')" has-feedback>
            <a-date-picker
              v-model:value="form.startLeaseDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('startLeaseDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId')">
          <a-form-item name="handlePersonId" label="经办人" :rules="fieldRequired('handlePersonId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="申请时间" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
              v-model:value="form.applyDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
<!--        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billStatus')">-->
<!--          <a-form-item name="billStatus" label="审批状态" :rules="fieldRequired('billStatus')" has-feedback>-->
<!--            <a-input-->
<!--              v-model:value="form.billStatus"-->
<!--              :disabled="fieldDisabled('billStatus')"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('leaseTerm')">
          <a-form-item name="leaseTerm" label="租赁期限(单位年)" :rules="fieldRequired('leaseTerm')" has-feedback>
            <a-input
              v-model:value="form.leaseTerm"
              :disabled="fieldDisabled('leaseTerm')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('hireTerm')">
          <a-form-item name="hireTerm" label="出借期限(单位年)" :rules="fieldRequired('hireTerm')" has-feedback>
            <a-input
              v-model:value="form.hireTerm"
              :disabled="fieldDisabled('hireTerm')"
            />
          </a-form-item>
        </a-col>
        <!--        <a-col v-bind="colLayout.cols" v-if="fieldVisible('rent')">-->
        <!--          <a-form-item name="rent" label="租金" :rules="fieldRequired('rent')" has-feedback>-->
        <!--            <a-input-->
        <!--              v-model:value="form.rent"-->
        <!--              :disabled="fieldDisabled('rent')"-->
        <!--            />-->
        <!--          </a-form-item>-->
        <!--        </a-col>-->
      </a-row>
    </a-form>
    <FamAssetLendListEdit
      v-if="fieldVisible('FAM_ASSET_LEND_LIST')"
      ref="famAssetLendListEdit"
      :mainId="formId || form.id"
      read-only="true"
      :bpmInstanceObject="bpmInstanceObject"
      :bpmParams="bpmParams"
    />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="addSubTableButton"
      label="添加"
      title="添加"
      style="display: none"
    >
      添加
    </a-button>
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="deleteSubTableButton"
      label="删除"
      title="删除"
      style="display: none"
    >
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { useFamAssetLendForm, emits } from './ts/FamAssetLendForm'; // 引入表单ts
import FamAssetLendListEdit from '@/views/avic/mms/fam/famassetlendlist/FamAssetLendListEdit.vue'; // 引入子表组件

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
  bpmParams,
  layout,
  colLayout,
  autoCode,
  famAssetLendListEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  tranTypeList,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamAssetLendForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>


