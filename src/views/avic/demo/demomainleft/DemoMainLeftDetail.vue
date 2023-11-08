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
      <a-form :model="form" ref="formRef" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目分类编号" name="projectClassCode">
              <a-input v-model:value="form.projectClassCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目分类名称" name="projectClassName">
              <a-input v-model:value="form.projectClassName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目分类级别" name="projectClassLevel">
              <a-select
                v-model:value="form.projectClassLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in projectClassLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目分类管理员" name="projectClassManager">
              <AvicCommonSelect
                v-model:value="form.projectClassManager"
                type="userSelect"
                disabled
                :defaultShowValue="form.projectClassManagerAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目分类状态" name="projectClassStatus">
              <a-radio-group v-model:value="form.projectClassStatus" disabled>
                <a-radio
                  v-for="item in projectClassStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目分类维护时间" name="projectClassDate">
              <a-date-picker
                v-model:value="form.projectClassDate"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="排序" name="projectClassOrder">
              <a-input-number v-model:value="form.projectClassOrder" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="密级" name="secretLevel">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
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
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="备注" name="projectClassRemark">
              <a-textarea v-model:value="form.projectClassRemark" :rows="2" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件上传">
              <AvicUploader
                element-id="1"
                form-type="detail"
                :allow-add="false"
                :allow-preview="true"
                :allow-download="true"
                :form-id="form.id"
              />
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
import { useDemoMainLeftForm, emits } from './ts/DemoMainLeftForm'; // 引入表单ts
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
  projectClassStatusList,
  projectClassLevelList,
  secretLevelList,
  closeModal
} = useDemoMainLeftForm({
  props: props,
  emit: emit
});
</script>
