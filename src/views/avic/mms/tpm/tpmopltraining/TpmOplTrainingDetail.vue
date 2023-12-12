<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="1200px"
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
            <a-form-item name="billNo" label="活动编号">
              <a-input v-model:value="form.billNo" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oplDeptId" label="培训单位名称">
              <AvicCommonSelect
                v-model:value="form.oplDeptId"
                type="deptSelect"
                :defaultShowValue="form.oplDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="subject" label="主题">
              <a-input v-model:value="form.subject" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="groupName" label="小组名称">
              <a-input v-model:value="form.groupName" disabled />
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
                disabled
                mode="multiple"
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
            <a-form-item name="editUserName" label="编制人姓名">
              <a-input v-model:value="form.editUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="trainingDate" label="培训时间">
              <a-date-picker
                v-model:value="form.trainingDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
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
                style="height: 150px; overflow-y: auto"
                disabled
              />
            </a-form-item>
          </a-col>
          </a-row>
          <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lecturerUserName" label="讲师姓名">
              <a-input v-model:value="form.lecturerUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="peopleNumber" label="人数">
              <a-input-number
                v-model:value="form.peopleNumber"
                min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="trainingPersonName" label="培训人员">
              <a-input v-model:value="form.trainingPersonName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols3">
            <a-form-item label="附件">
              <AvicUploader
                element-id="1"
                form-type="detail"
                :allow-add="false"
                :allow-download="true"
                :allow-preview="true"
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
    default: 'detail'
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  loading,
  subjectCategoryList,
  secretLevelList,
  editorRef,
  toolbarConfig,
  editorConfig,
  onCreated,
  closeModal
} = useTpmOplTrainingForm({
  props: props,
  emit: emit
});
</script>


