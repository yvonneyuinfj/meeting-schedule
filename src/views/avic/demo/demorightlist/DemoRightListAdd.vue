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
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoNotnull" label="必填" has-feedback>
              <a-input v-model:value="form.demoNotnull" :maxLength="50" placeholder="请输入必填" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCode" label="编码" has-feedback>
              <AvicAutoCode
                v-model:value="form.demoCode"
                ref="autoCode"
                code-type="DEMO_RIGHT_LIST_CODE"
                code-param="DEMO_RIGHT_LIST"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUnique" label="唯一值" has-feedback>
              <a-input
                v-model:value="form.demoUnique"
                :maxLength="255"
                placeholder="请输入唯一值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUserId" label="用户" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoUserId"
                type="userSelect"
                placeholder="请选择用户"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDeptId" label="部门" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoDeptId"
                type="deptSelect"
                placeholder="请选择部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRoleId" label="角色" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoRoleId"
                type="roleSelect"
                placeholder="请选择角色"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoGroupId" label="群组" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoGroupId"
                type="groupSelect"
                placeholder="请选择群组"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPositionId" label="岗位" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoPositionId"
                type="positionSelect"
                placeholder="请选择岗位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRadio" label="单选">
              <a-radio-group v-model:value="form.demoRadio">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRadioButton" label="单选(按钮)">
              <a-radio-group v-model:value="form.demoRadioButton" button-style="solid">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCheckbox" label="复选">
              <a-checkbox-group v-model:value="form.demoCheckbox">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoSelect" label="下拉" has-feedback>
              <a-select
                v-model:value="form.demoSelect"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoSelectMultiple" label="下拉多选" has-feedback>
              <a-select
                v-model:value="form.demoSelectMultiple"
                mode="multiple"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :allow-clear="true"
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
              <a-switch
                v-model:checked="form.demoSwitch"
                checked-value="Y"
                un-checked-value="N"
                checked-children="有效"
                un-checked-children="无效"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoNumber" label="小数" has-feedback>
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
            <a-form-item name="demoInteger" label="整数" has-feedback>
              <a-input-number
                v-model:value="form.demoInteger"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入整数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDate" label="日期" has-feedback>
              <a-date-picker
                v-model:value="form.demoDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDateTime" label="日期时间" has-feedback>
              <a-date-picker
                v-model:value="form.demoDateTime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                show-time
                placeholder="请选择日期时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPhone" label="电话(正则)" has-feedback>
              <a-input
                v-model:value="form.demoPhone"
                :maxLength="50"
                placeholder="请输入电话(正则)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoEmail" label="邮件(正则)" has-feedback>
              <a-input
                v-model:value="form.demoEmail"
                :maxLength="50"
                placeholder="请输入邮件(正则)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoWebsite" label="网址(正则)" has-feedback>
              <a-input
                v-model:value="form.demoWebsite"
                :maxLength="50"
                placeholder="请输入网址(正则)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="demoTextarea" label="多行文本">
              <a-textarea
                v-model:value="form.demoTextarea"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入多行文本"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader
                element-id="1"
                form-type="add"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                table-name="DEMO_RIGHT_LIST"
                @afterUpload="afterUploadEvent"
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
import { useDemoRightListForm, emits } from './ts/DemoRightListForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
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
  demoRadioList,
  demoRadioButtonList,
  demoCheckboxList,
  demoSelectList,
  demoSelectMultipleList,
  secretLevelList,
  uploadFile,
  autoCode,
  saveForm,
  afterUploadEvent,
  closeModal
} = useDemoRightListForm({
  props: props,
  emit: emit
});
</script>
