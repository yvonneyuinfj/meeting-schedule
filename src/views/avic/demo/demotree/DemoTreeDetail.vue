<template>
  <div class="content-form">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentId" label="父级分类" has-feedback>
              <AvicTreeSelect
                v-model:value="form.parentId"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoNotnull" label="必填" has-feedback>
              <a-input
                v-model:value="form.demoNotnull"
                :maxLength="50"
                :autofocus="true"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCode" label="编码" has-feedback>
              <a-input v-model:value="form.demoCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoTitle" label="节点名称" has-feedback>
              <a-input v-model:value="form.demoTitle" :maxLength="100" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUnique" label="唯一值" has-feedback>
              <a-input v-model:value="form.demoUnique" :maxLength="255" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoUserId" label="用户" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoUserId"
                type="userSelect"
                :defaultShowValue="form.demoUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDeptId" label="部门" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoDeptId"
                type="deptSelect"
                :defaultShowValue="form.demoDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <!--<a-col v-bind="colLayout.cols">
            <a-form-item name="demoRoleId" label="角色" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoRoleId"
                type="roleSelect"
                placeholder="请选择角色"
                :defaultShowValue="form.demoRoleIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoGroupId" label="群组" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoGroupId"
                type="groupSelect"
                placeholder="请选择群组"
                :defaultShowValue="form.demoGroupIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPositionId" label="岗位" has-feedback>
              <AvicCommonSelect
                v-model:value="form.demoPositionId"
                type="positionSelect"
                placeholder="请选择岗位"
                :defaultShowValue="form.demoPositionIdAlias"
              />
            </a-form-item>
          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoRadio" label="单选">
              <a-radio-group v-model:value="form.demoRadio" disabled>
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
            <a-form-item name="demoRadioButton" label="单选按钮">
              <a-radio-group v-model:value="form.demoRadioButton" disabled>
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
              <a-checkbox-group v-model:value="form.demoCheckbox" disabled>
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
                show-search
                allow-clear
                disabled
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
                allow-clear
                disabled
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
                show-search
                allow-clear
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
              <a-switch
                v-model:checked="form.demoSwitch"
                checked-value="Y"
                un-checked-value="N"
                checked-children="有效"
                un-checked-children="无效"
                disabled
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
                disabled
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
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoDate" label="日期" has-feedback>
              <a-date-picker
                v-model:value="form.demoDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
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
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoPhone" label="电话(正则)" has-feedback>
              <a-input v-model:value="form.demoPhone" :maxLength="50" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoEmail" label="邮件(正则)" has-feedback>
              <a-input v-model:value="form.demoEmail" :maxLength="50" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoWebsite" label="网址(正则)" has-feedback>
              <a-input v-model:value="form.demoWebsite" :maxLength="50" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="demoTextarea" label="多行文本">
              <a-textarea v-model:value="form.demoTextarea" :rows="2" :maxLength="4000" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="排序号(本级)" has-feedback>
              <a-input-number
                v-model:value="form.treeSort"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { useDemoTreeForm, emits } from './ts/DemoTreeForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  parentId: {
    type: String,
    default: ''
  },
  parentTitle: {
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
  demoRadioList,
  demoRadioButtonList,
  demoCheckboxList,
  demoSelectList,
  demoSelectMultipleList,
  secretLevelList,
  baseUrl,
  reloadDetail
} = useDemoTreeForm({
  props: props,
  emit: emit
});
defineExpose({
  reloadDetail
});
</script>
<style lang="less" scoped>
.content-form {
  max-height: 100%;
  padding: 24px 24px 50px 24px;
  overflow: auto;
}
</style>
