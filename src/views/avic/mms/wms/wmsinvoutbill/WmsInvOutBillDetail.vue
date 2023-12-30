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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select
              v-model:value="form.secretLevel"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="单据编号" :rules="fieldRequired('billNo')" has-feedback>
            <a-input
              v-model:value="form.billNo"
              :disabled="fieldDisabled('billNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billType')">
          <a-form-item name="billType" label="单据类型" :rules="fieldRequired('billType')" has-feedback>
            <a-select
              v-model:value="form.billType"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('billType')"
            >
              <a-select-option
                v-for="item in billTypeList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('useDeptId')">
          <a-form-item name="useDeptId" label="领用部门" :rules="fieldRequired('useDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.useDeptId"
              type="deptSelect"
              :defaultShowValue="form.useDeptIdAlias"
              :disabled="fieldDisabled('useDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('mdsInventoryId')">
          <a-form-item name="mdsInventoryId" label="库房" :rules="fieldRequired('mdsInventoryId')" has-feedback>
            <a-input
              v-model:value="form.mdsInventoryId"
              :disabled="fieldDisabled('mdsInventoryId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyUserId')">
          <a-form-item name="applyUserId" label="申请人" :rules="fieldRequired('applyUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.applyUserId"
              type="userSelect"
              :defaultShowValue="form.applyUserIdAlias"
              :disabled="fieldDisabled('applyUserId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDeptId')">
          <a-form-item name="applyDeptId" label="申请部门" :rules="fieldRequired('applyDeptId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.applyDeptId"
              type="deptSelect"
              :defaultShowValue="form.applyDeptIdAlias"
              :disabled="fieldDisabled('applyDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="申请日期" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
              v-model:value="form.applyDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-input
              v-model:value="form.note"
              :disabled="fieldDisabled('note')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <WmsInvOutBillLEdit
      v-if="fieldVisible('WMS_INV_OUT_BILL_L')"
      ref="wmsInvOutBillLEdit"
      :mainId="formId || form.id"
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
import { useWmsInvOutBillForm, emits } from './ts/WmsInvOutBillForm'; // 引入表单ts
import WmsInvOutBillLEdit from './sub/WmsInvOutBillLEdit.vue'; // 引入子表组件

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
  secretLevelList,
  billTypeList,
  wmsInvOutBillLEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useWmsInvOutBillForm({
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


