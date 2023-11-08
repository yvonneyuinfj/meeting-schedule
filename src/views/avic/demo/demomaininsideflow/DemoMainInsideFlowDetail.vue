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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoNotnull')">
          <a-form-item
            name="demoNotnull"
            label="必填"
            :rules="fieldRequired('demoNotnull')"
            has-feedback
          >
            <a-input
              v-model:value="form.demoNotnull"
              :disabled="fieldDisabled('demoNotnull')"
              placeholder="请输入必填"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoUserId')">
          <a-form-item
            name="demoUserId"
            label="用户"
            :rules="fieldRequired('demoUserId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.demoUserId"
              type="userSelect"
              :defaultShowValue="form.demoUserIdAlias"
              :disabled="fieldDisabled('demoUserId')"
              placeholder="请选择用户"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoDeptId')">
          <a-form-item
            name="demoDeptId"
            label="部门"
            :rules="fieldRequired('demoDeptId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.demoDeptId"
              type="deptSelect"
              :defaultShowValue="form.demoDeptIdAlias"
              :disabled="fieldDisabled('demoDeptId')"
              placeholder="请选择部门"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoRoleId')">
          <a-form-item
            name="demoRoleId"
            label="角色"
            :rules="fieldRequired('demoRoleId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.demoRoleId"
              type="roleSelect"
              :defaultShowValue="form.demoRoleIdAlias"
              :disabled="fieldDisabled('demoRoleId')"
              placeholder="请选择角色"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoGroupId')">
          <a-form-item
            name="demoGroupId"
            label="群组"
            :rules="fieldRequired('demoGroupId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.demoGroupId"
              type="groupSelect"
              :defaultShowValue="form.demoGroupIdAlias"
              :disabled="fieldDisabled('demoGroupId')"
              placeholder="请选择群组"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoPositionId')">
          <a-form-item
            name="demoPositionId"
            label="岗位"
            :rules="fieldRequired('demoPositionId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.demoPositionId"
              type="positionSelect"
              :defaultShowValue="form.demoPositionIdAlias"
              :disabled="fieldDisabled('demoPositionId')"
              placeholder="请选择岗位"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoRadio')">
          <a-form-item name="demoRadio" label="单选" :rules="fieldRequired('demoRadio')">
            <a-radio-group v-model:value="form.demoRadio" :disabled="fieldDisabled('demoRadio')">
              <a-radio
                v-for="item in demoRadioList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoRadioButton')">
          <a-form-item
            name="demoRadioButton"
            label="单选（按钮）"
            :rules="fieldRequired('demoRadioButton')"
          >
            <a-radio-group
              v-model:value="form.demoRadioButton"
              button-style="solid"
              :disabled="fieldDisabled('demoRadioButton')"
            >
              <a-radio-button
                v-for="item in demoRadioButtonList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoCheckbox')">
          <a-form-item name="demoCheckbox" label="复选" :rules="fieldRequired('demoCheckbox')">
            <a-checkbox-group
              v-model:value="form.demoCheckbox"
              :disabled="fieldDisabled('demoCheckbox')"
            >
              <a-checkbox
                v-for="item in demoCheckboxList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoSelect')">
          <a-form-item
            name="demoSelect"
            label="下拉"
            :rules="fieldRequired('demoSelect')"
            has-feedback
          >
            <a-select
              v-model:value="form.demoSelect"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              show-search
              :allow-clear="true"
              :disabled="fieldDisabled('demoSelect')"
              placeholder="请选择下拉"
            >
              <a-select-option
                v-for="item in demoSelectList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoSelectMultiple')">
          <a-form-item
            name="demoSelectMultiple"
            label="下拉多选"
            :rules="fieldRequired('demoSelectMultiple')"
            has-feedback
          >
            <a-select
              v-model:value="form.demoSelectMultiple"
              mode="multiple"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :allow-clear="true"
              :disabled="fieldDisabled('demoSelectMultiple')"
              placeholder="请选择下拉多选"
            >
              <a-select-option
                v-for="item in demoSelectMultipleList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item
            name="secretLevel"
            label="密级"
            :rules="fieldRequired('secretLevel')"
            has-feedback
          >
            <a-select
              v-model:value="form.secretLevel"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              show-search
              :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')"
              placeholder="请选择密级"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoSwitch')">
          <a-form-item name="demoSwitch" label="开关" :rules="fieldRequired('demoSwitch')">
            <a-switch
              v-model:checked="form.demoSwitch"
              checked-value="Y"
              un-checked-value="N"
              checked-children="有效"
              un-checked-children="无效"
              :disabled="fieldDisabled('demoSwitch')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoNumber')">
          <a-form-item
            name="demoNumber"
            label="小数"
            :rules="fieldRequired('demoNumber')"
            has-feedback
          >
            <a-input-number
              v-model:value="form.demoNumber"
              :min="-999999999999"
              :max="999999999999"
              :step="0.01"
              :disabled="fieldDisabled('demoNumber')"
              placeholder="请输入小数"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoInteger')">
          <a-form-item
            name="demoInteger"
            label="整数"
            :rules="fieldRequired('demoInteger')"
            has-feedback
          >
            <a-input-number
              v-model:value="form.demoInteger"
              :min="-999999999999"
              :max="999999999999"
              :step="1"
              :disabled="fieldDisabled('demoInteger')"
              placeholder="请输入整数"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoDate')">
          <a-form-item name="demoDate" label="日期" :rules="fieldRequired('demoDate')">
            <a-date-picker
              v-model:value="form.demoDate"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              :disabled="fieldDisabled('demoDate')"
              placeholder="请选择日期"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoDateTime')">
          <a-form-item name="demoDateTime" label="日期时间" :rules="fieldRequired('demoDateTime')">
            <a-date-picker
              v-model:value="form.demoDateTime"
              format="YYYY-MM-DD HH:mm:ss"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              show-time
              :disabled="fieldDisabled('demoDateTime')"
              placeholder="请选择日期时间"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('demoTextarea')">
          <a-form-item name="demoTextarea" label="多行文本" :rules="fieldRequired('demoTextarea')">
            <a-textarea
              v-model:value="form.demoTextarea"
              :max-length="4000"
              :rows="2"
              :disabled="fieldDisabled('demoTextarea')"
              placeholder="请输入多行文本"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item
            label="上传附件"
            name="uploadFile"
            type="attachment"
            :rules="attachmentRequired('uploadFile')"
          >
            <AvicUploader
              element-id="1"
              ref="uploadFile"
              label="上传附件"
              :form-id="form.id"
              :allow-download="true"
              :allow-preview="true"
              :bpm-instance-object="props.bpmInstanceObject"
              :form-secret-level="form.secretLevel"
              table-name="DEMO_MAIN_INSIDE_FLOW"
              @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <DemoSubInsideFlowEdit
      v-if="fieldVisible('DEMOSUBFLOWINFO')"
      ref="demoSubInsideFlowEdit"
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
import { useDemoMainInsideFlowForm, emits } from './ts/DemoMainInsideFlowForm'; //引入表单ts
import DemoSubInsideFlowEdit from '@/views/avic/demo/demosubinsideflow/DemoSubInsideFlowEdit.vue'; //引入子表组件

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
  demoRadioList,
  demoRadioButtonList,
  demoCheckboxList,
  demoSelectList,
  demoSelectMultipleList,
  secretLevelList,
  uploadFile,
  demoSubInsideFlowEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  saveAndStartProcess,
  afterUploadEvent,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useDemoMainInsideFlowForm({
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
