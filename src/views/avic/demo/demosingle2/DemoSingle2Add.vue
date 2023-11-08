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
        layout="horizontal"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUserId" label="用户" has-feedback>
              <a-input
                v-model:value="form.demoUserId"
                :maxLength="100"
                :auto-focus="true"
                placeholder="请输入用户"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDeptId" label="部门">
              <a-input
                v-model:value="form.demoDeptId"
                :maxLength="100"
                placeholder="请输入部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRoleId" label="角色">
              <a-input
                v-model:value="form.demoRoleId"
                :maxLength="100"
                placeholder="请输入角色"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoGroupId" label="群组">
              <a-input
                v-model:value="form.demoGroupId"
                :maxLength="100"
                placeholder="请输入群组"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPositionId" label="岗位">
              <a-input
                v-model:value="form.demoPositionId"
                :maxLength="100"
                placeholder="请输入岗位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRadio" label="单选">
              <a-input
                v-model:value="form.demoRadio"
                :maxLength="50"
                placeholder="请输入单选"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRadioButton" label="单选（按钮样式）">
              <a-input
                v-model:value="form.demoRadioButton"
                :maxLength="50"
                placeholder="请输入单选（按钮样式）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCheckbox" label="复选">
              <a-input
                v-model:value="form.demoCheckbox"
                :maxLength="50"
                placeholder="请输入复选"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoSelect" label="下拉">
              <a-input
                v-model:value="form.demoSelect"
                :maxLength="50"
                placeholder="请输入下拉"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoSelectMultiple" label="下拉多选">
              <a-input
                v-model:value="form.demoSelectMultiple"
                :maxLength="50"
                placeholder="请输入下拉多选"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoSwitch" label="开关">
              <a-input
                v-model:value="form.demoSwitch"
                :maxLength="2"
                placeholder="请输入开关"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoNumber" label="小数">
              <a-input-number
                v-model:value="form.demoNumber"
                :min="0"
                :max="9999999999.99"
                :precision="2"
                :step="0.01"
                placeholder="请输入小数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoInteger" label="整数">
              <a-input-number
                v-model:value="form.demoInteger"
                :min="0"
                :max="999999999"
                :precision="0"
                :step="1"
                placeholder="请输入整数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDate" label="日期">
              <a-date-picker
                v-model:value="form.demoDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDateTime" label="日期时间">
              <a-date-picker
                v-model:value="form.demoDateTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoNotnull" label="必填" has-feedback>
              <a-input
                v-model:value="form.demoNotnull"
                :maxLength="50"
                placeholder="请输入必填"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCode" label="编码">
              <a-input
                v-model:value="form.demoCode"
                :maxLength="50"
                placeholder="请输入编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPhone" label="电话(正则)">
              <a-input
                v-model:value="form.demoPhone"
                :maxLength="50"
                placeholder="请输入电话(正则)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoEmail" label="邮件(正则)">
              <a-input
                v-model:value="form.demoEmail"
                :maxLength="50"
                placeholder="请输入邮件(正则)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoWebsite" label="网址(正则)">
              <a-input
                v-model:value="form.demoWebsite"
                :maxLength="50"
                placeholder="请输入网址(正则)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUnique" label="唯一值">
              <a-input
                v-model:value="form.demoUnique"
                :maxLength="255"
                placeholder="请输入唯一值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoModalSelect" label="弹窗">
              <a-input
                v-model:value="form.demoModalSelect"
                :maxLength="255"
                placeholder="请输入弹窗"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoBackgroundColor" label="背景样式">
              <a-input
                v-model:value="form.demoBackgroundColor"
                :maxLength="50"
                placeholder="请输入背景样式"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRichtext" label="富文本">
              <a-input
                v-model:value="form.demoRichtext"
                :maxLength="4000"
                placeholder="请输入富文本"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoTextarea" label="多行文本">
              <a-input
                v-model:value="form.demoTextarea"
                :maxLength="4000"
                placeholder="请输入多行文本"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useDemoSingle2Form, emits } from './ts/DemoSingle2Form'; // 引入表单ts
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
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  saveForm,
  closeModal
} = useDemoSingle2Form({
  props: props,
  emit: emit
});
</script>

