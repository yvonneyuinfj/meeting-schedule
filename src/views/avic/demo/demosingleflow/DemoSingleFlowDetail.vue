<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" class="form-excel-style">
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
          <a-form-item
            name="demoRadio"
            label="单选"
            :rules="fieldRequired('demoRadio')"
            has-feedback
          >
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
            label="单选按钮"
            :rules="fieldRequired('demoRadioButton')"
            has-feedback
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
          <a-form-item
            name="demoCheckbox"
            label="复选"
            :rules="fieldRequired('demoCheckbox')"
            has-feedback
          >
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
          <a-form-item
            name="demoSwitch"
            label="开关"
            :rules="fieldRequired('demoSwitch')"
            has-feedback
          >
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
              :disabled="fieldDisabled('demoInteger')"
              placeholder="请输入整数"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoDate')">
          <a-form-item name="demoDate" label="日期" :rules="fieldRequired('demoDate')" has-feedback>
            <a-date-picker
              v-model:value="form.demoDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('demoDate')"
              placeholder="请选择日期"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoDateTime')">
          <a-form-item
            name="demoDateTime"
            label="日期时间"
            :rules="fieldRequired('demoDateTime')"
            has-feedback
          >
            <a-date-picker
              v-model:value="form.demoDateTime"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              show-time
              :disabled="fieldDisabled('demoDateTime')"
              placeholder="请选择日期时间"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoCode')">
          <a-form-item name="demoCode" label="编码" :rules="fieldRequired('demoCode')" has-feedback>
            <AvicAutoCode
              v-model:value="form.demoCode"
              ref="autoCode"
              code-type="DEMO_SINGLE_CODE"
              code-param="DEMO_SINGLE_FLOW"
              :allow-clear="true"
              :disabled="fieldDisabled('demoCode')"
              placeholder="请输入编码"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoPhone')">
          <a-form-item
            name="demoPhone"
            label="电话(正则)"
            :rules="fieldRequired('demoPhone')"
            has-feedback
          >
            <a-input
              v-model:value="form.demoPhone"
              :disabled="fieldDisabled('demoPhone')"
              placeholder="请输入电话(正则)"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoEmail')">
          <a-form-item
            name="demoEmail"
            label="邮件(正则)"
            :rules="fieldRequired('demoEmail')"
            has-feedback
          >
            <a-input
              v-model:value="form.demoEmail"
              :disabled="fieldDisabled('demoEmail')"
              placeholder="请输入邮件(正则)"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoWebsite')">
          <a-form-item
            name="demoWebsite"
            label="网址(正则)"
            :rules="fieldRequired('demoWebsite')"
            has-feedback
          >
            <a-input
              v-model:value="form.demoWebsite"
              :disabled="fieldDisabled('demoWebsite')"
              placeholder="请输入网址(正则)"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoUnique')">
          <a-form-item
            name="demoUnique"
            label="唯一值"
            :rules="fieldRequired('demoUnique')"
            has-feedback
          >
            <a-input
              v-model:value="form.demoUnique"
              :disabled="fieldDisabled('demoUnique')"
              placeholder="请输入唯一值"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('demoTextarea')">
          <a-form-item
            name="demoTextarea"
            label="多行文本"
            :rules="fieldRequired('demoTextarea')"
            has-feedback
          >
            <a-textarea
              v-model:value="form.demoTextarea"
              :rows="2"
              :disabled="fieldDisabled('demoTextarea')"
              placeholder="请输入多行文本"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('demoRichtext')">
          <a-form-item
            name="demoRichtext"
            label="富文本"
            :rules="fieldRequired('demoRichtext')"
            has-feedback
          >
            <div class="Richtext">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
              />
              <Editor
                style="height: 500px; overflow-y: auto"
                v-model:value="form.demoRichtext"
                :defaultConfig="editorConfig"
                @onCreated="onCreated"
              />
            </div>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('demoModalSelect')">
          <a-form-item
            name="demoModalSelect"
            label="弹窗"
            :rules="fieldRequired('demoModalSelect')"
            has-feedback
          >
            <AvicModalSelect
              v-model:value="form.demoModalSelect"
              :defaultShowValue="form.demoModalSelect"
              modalTitle="选择弹窗"
              placeholder="请选择弹窗"
              valueField="demoNotnull"
              showField="demoNotnull"
              :selectComponent="demoSingleSelectComponent"
              :isMultiSelection="false"
              :allow-clear="true"
              :disabled="fieldDisabled('demoModalSelect')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader
              element-id="1"
              ref="uploadFile"
              label="上传附件"
              :form-id="form.id"
              :allow-download="true"
              :allow-preview="true"
              :bpm-instance-object="props.bpmInstanceObject"
              :form-secret-level="form.secretLevel"
              table-name="DEMO_SINGLE_FLOW"
              @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useDemoSingleFlowForm, emits } from './ts/DemoSingleFlowForm'; // 引入表单ts
import DemoSingleSelect from '@/views/avic/demo/demosingle/DemoSingleSelect.vue'; // 引入弹窗选择页
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'; // 引入富文本依赖
import '@wangeditor/editor/dist/css/style.css'; // 引入富文本样式
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
const demoSingleSelectComponent = DemoSingleSelect; // 弹窗选择组件
const {
  form,
  formRef,
  layout,
  colLayout,
  demoRadioList,
  demoRadioButtonList,
  demoCheckboxList,
  demoSelectList,
  demoSelectMultipleList,
  secretLevelList,
  uploadFile,
  autoCode,
  toolbarConfig,
  editorConfig,
  editorRef,
  onCreated,
  afterUploadEvent,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons,
  flowCustomFunction
} = useDemoSingleFlowForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons,
  flowCustomFunction
});
</script>
