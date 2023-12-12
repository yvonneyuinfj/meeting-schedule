<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="1200px"
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
            <a-form-item name="billNo" label="活动编号" has-feedback>
              <a-input
                v-model:value="form.billNo"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入活动编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oplDeptId" label="培训单位名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.oplDeptId"
                type="deptSelect"
                :defaultShowValue="form.oplDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="subject" label="主题" has-feedback>
              <a-input
                v-model:value="form.subject"
                :maxLength="200"
                placeholder="请输入主题"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="groupName" label="小组名称">
              <a-input
                v-model:value="form.groupName"
                :maxLength="200"
                placeholder="请输入小组名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="subjectCategory" label="课题分类">
              <a-select
                v-model:value="form.subjectCategory"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                mode="multiple"
                placeholder="请选择课题分类"
              >
                <a-select-option
                  v-for="item in subjectCategoryList"
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
            <a-form-item name="editUserName" label="编制人姓名">
              <a-input
                v-model:value="form.editUserName"
                :maxLength="64"
                placeholder="请输入编制人姓名"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="trainingDate" label="培训时间">
              <a-date-picker
                v-model:value="form.trainingDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择培训时间"
              />
            </a-form-item>
          </a-col>
          </a-row>
          <a-row :gutter="16">
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="trainingPurpose" label="培训目的">
              <div class="Richtext">
                  <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                  />
                  <Editor
                    style="height: 150px; overflow-y: auto"
                    v-model:value="form.trainingPurpose"
                    :defaultConfig="editorConfig"
                    @onCreated="onCreated"
                  />
              </div>
            </a-form-item>
          </a-col>
          </a-row>
          <a-row :gutter="16">
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="trainingFocus" label="培训要点">
              <a-input
                v-model:value="form.trainingFocus"
                :maxLength="4000"
                placeholder="请输入培训要点"
                style="height: 150px; overflow-y: auto"
              />
            </a-form-item>
          </a-col>
          </a-row>
          <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lecturerUserId" label="讲师姓名">
              <AvicCommonSelect
                v-model:value="form.lecturerUserId"
                type="userSelect"
                placeholder="请选择讲师姓名"
                :defaultShowValue="form.lecturerUserIdAlias"
                @change="calculatePeopleNumber"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="peopleNumber" label="人数">
              <a-input-number
                v-model:value="form.peopleNumber"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                :disabled="true"
                placeholder="请输入人数"
              />
            </a-form-item>
          </a-col>
          </a-row>
          <a-row :gutter="16">
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="trainingPersonId" label="培训人员">
              <AvicCommonSelect
                v-model:value="form.trainingPersonId"
                type="userSelect"
                selectModel="multi"
                placeholder="请选择培训人员"
                @change="calculatePeopleNumber"
                :defaultShowValue="form.trainingPersonName"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols3">
            <a-form-item
              label="附件"
            >
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
                table-name="TPM_OPL_TRAINING"
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
import { useTpmOplTrainingForm, emits } from './ts/TpmOplTrainingForm'; // 引入表单ts
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'; // 引入富文本依赖
import '@wangeditor/editor/dist/css/style.css'; // 引入富文本样式
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
   infoStatus: {
     type: String,
     default: 'edit'
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
  subjectCategoryList,
  secretLevelList,
  editorRef,
  toolbarConfig,
  editorConfig,
  onCreated,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = useTpmOplTrainingForm({
  props: props,
  emit: emit
});

function calculatePeopleNumber() {
    let trainingPersonId = form.value.trainingPersonId;
    let lecturerUserId = form.value.lecturerUserId;
    let trainingPersonIdNum = 0;
    if (trainingPersonId != undefined){
      trainingPersonIdNum = trainingPersonId.split(";").length;
    }
    let lecturerUserIdNum = 0;
    if (lecturerUserId != undefined){
        if (lecturerUserId.length > 0){
          lecturerUserIdNum = 1;
        }
    }
    form.value.peopleNumber = trainingPersonIdNum + lecturerUserIdNum;
}
</script>


