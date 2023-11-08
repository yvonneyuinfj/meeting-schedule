<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目编号" name="projectCode">
              <a-input v-model:value="form.projectCode" placeholder="请输入项目编号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目名称" name="projectName">
              <a-input v-model:value="form.projectName" placeholder="请输入项目名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目经理" name="projectManager">
              <AvicCommonSelect
                v-model:value="form.projectManager"
                type="userSelect"
                placeholder="请选择项目经理"
                :defaultShowValue="form.projectManagerAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目组成员" name="projectMembers">
              <AvicCommonSelect
                v-model:value="form.projectMembers"
                type="userSelect"
                select-model="multi"
                placeholder="请选择项目组成员"
                :defaultShowValue="form.projectMembersAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目启动时间" name="projectStartDate">
              <a-date-picker
                v-model:value="form.projectStartDate"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                placeholder="请选择项目启动时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="年度" name="projectYear">
              <a-input-number
                v-model:value="form.projectYear"
                :min="0"
                :max="9999999999"
                :precision="0"
                :step="1"
                placeholder="请输入年度"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目状态" name="projectStatus">
              <a-radio-group v-model:value="form.projectStatus">
                <a-radio
                  v-for="item in projectStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目所属部门" name="projectDept">
              <AvicCommonSelect
                v-model:value="form.projectDept"
                type="deptSelect"
                placeholder="请选择项目所属部门"
                :defaultShowValue="form.projectDeptAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目技术" name="projectTechs">
              <a-checkbox-group v-model:value="form.projectTechs">
                <a-checkbox
                  v-for="item in projectTechsList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="密级" name="secretLevel">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                show-search
                allow-clear
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
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="备注" name="projectRemark">
              <a-textarea v-model:value="form.projectRemark" :rows="2" placeholder="请输入备注" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader
                element-id="1"
                form-type="edit"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                table-name="MPM_PROJECT_SUB_INFO"
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
import { useDemoSubForm, emits } from './ts/DemoSubForm'; // 引入表单ts
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
  projectStatusList,
  projectTechsList,
  secretLevelList,
  uploadFile,
  saveForm,
  closeModal,
  afterUploadEvent
} = useDemoSubForm({
  props: props,
  emit: emit
});
</script>
