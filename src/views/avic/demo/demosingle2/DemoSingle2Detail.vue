<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUserId" label="用户">
              <a-input v-model:value="form.demoUserId" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDeptId" label="部门">
              <a-input v-model:value="form.demoDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRoleId" label="角色">
              <a-input v-model:value="form.demoRoleId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoGroupId" label="群组">
              <a-input v-model:value="form.demoGroupId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPositionId" label="岗位">
              <a-input v-model:value="form.demoPositionId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRadio" label="单选">
              <a-input v-model:value="form.demoRadio" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRadioButton" label="单选（按钮样式）">
              <a-input v-model:value="form.demoRadioButton" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCheckbox" label="复选">
              <a-input v-model:value="form.demoCheckbox" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoSelect" label="下拉">
              <a-input v-model:value="form.demoSelect" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoSelectMultiple" label="下拉多选">
              <a-input v-model:value="form.demoSelectMultiple" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
              <a-input v-model:value="form.demoSwitch" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoNumber" label="小数">
              <a-input-number
                v-model:value="form.demoNumber"
min="0"
                :max="9999999999.99"
                :precision="2"
                :step="0.01"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoInteger" label="整数">
              <a-input-number
                v-model:value="form.demoInteger"
min="0"
                :max="999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDate" label="日期">
              <a-date-picker
                v-model:value="form.demoDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDateTime" label="日期时间">
              <a-date-picker
                v-model:value="form.demoDateTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoNotnull" label="必填">
              <a-input v-model:value="form.demoNotnull" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCode" label="编码">
              <a-input v-model:value="form.demoCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPhone" label="电话(正则)">
              <a-input v-model:value="form.demoPhone" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoEmail" label="邮件(正则)">
              <a-input v-model:value="form.demoEmail" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoWebsite" label="网址(正则)">
              <a-input v-model:value="form.demoWebsite" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUnique" label="唯一值">
              <a-input v-model:value="form.demoUnique" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoModalSelect" label="弹窗">
              <a-input v-model:value="form.demoModalSelect" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoBackgroundColor" label="背景样式">
              <a-input v-model:value="form.demoBackgroundColor" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRichtext" label="富文本">
              <a-input v-model:value="form.demoRichtext" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoTextarea" label="多行文本">
              <a-input v-model:value="form.demoTextarea" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
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
  layout,
  colLayout,
  loading,
  secretLevelList,
  closeModal
} = useDemoSingle2Form({
  props: props,
  emit: emit
});
</script>


