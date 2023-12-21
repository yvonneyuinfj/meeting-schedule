<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      class="form-excel-style"
     >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('billNo')">
          <a-form-item name="billNo" label="立项编号" :rules="fieldRequired('billNo')" has-feedback>
              <a-input v-model:value="form.billNo" :disabled="fieldDisabled('billNo')" @change='getInfo' />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDeptName')">
          <a-form-item name="editDeptName" label="立项单位" :rules="fieldRequired('editDeptName')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.editDeptName"
              :auto-focus="true"
              type="deptSelect"
              :defaultShowValue="form.problemFinderName"
              :disabled="fieldDisabled('editDeptName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('problemFinderId')">
          <a-form-item name="problemFinderId" label="问题发现人" :rules="fieldRequired('problemFinderId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.problemFinderId"
              type="userSelect"
              :defaultShowValue="form.problemFinderName"
              :disabled="fieldDisabled('problemFinderId')"
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('projectCategory')">
            <a-form-item name="projectCategory" label="问题立项" :rules="fieldRequired('projectCategory')">
              <a-checkbox-group v-model:value="form.projectCategory" button-style="solid" :auto-focus="true" :disabled="fieldDisabled('projectCategory')">
                <a-checkbox
                  v-for="item in projectCategoryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-checkbox>
              </a-checkbox-group>
            </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectName')">
          <a-form-item name="projectName" label="项目立项名称" :rules="fieldRequired('projectName')" has-feedback>
            <a-input
              v-model:value="form.projectName"
              :disabled="fieldDisabled('projectName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="提出时间" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
              v-model:value="form.applyDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('planFinishDate')">
          <a-form-item name="planFinishDate" label="计划完成时间" :rules="fieldRequired('planFinishDate')" has-feedback>
            <a-date-picker
              v-model:value="form.planFinishDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('planFinishDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('location')">
          <a-form-item name="location" label="地点/位置" :rules="fieldRequired('location')" has-feedback>
            <a-input
              v-model:value="form.location"
              :disabled="fieldDisabled('location')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select
              v-model:value="form.secretLevel"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')"
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
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('problemDescription')">
            <a-form-item
              name="problemDescription"
              label="问题描述"
              :rules="fieldRequired('problemDescription')"
            >
              <div class="Richtext">
                  <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                  />
                  <Editor
                    style="height: 150px; overflow-y: auto"
                    v-model:value="form.problemDescription"
                    :defaultConfig="editorConfig"
                    @onCreated="onCreated"
                  />
              </div>
            </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('problemAdvice')">
          <a-form-item name="problemAdvice" label="问题改善建议" :rules="fieldRequired('problemAdvice')" has-feedback>
            <a-textarea v-model:value="form.problemAdvice" :rows="2" :disabled="fieldDisabled('problemAdvice')" />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('chargeUserId')">
          <a-form-item name="chargeUserId" label="项目组长" :rules="fieldRequired('chargeUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.chargeUserId"
              type="userSelect"
              :defaultShowValue="form.chargeUserNameAlias"
              :disabled="fieldDisabled('chargeUserId')"
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        </a-row>
        <a-row>
        <a-col v-bind="colLayout.cols3" v-if="fieldVisible('teamUserId')">
          <a-form-item name="teamUserId" label="团队成员" :rules="fieldRequired('teamUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.teamUserId"
              type="userSelect"
              :defaultShowValue="form.teamUserNameAlias"
              :disabled="fieldDisabled('teamUserId')"
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
      <a-col v-bind="colLayout.cols3">
        <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
          <AvicUploader
            element-id="1"
            ref="uploadFile"
            label="上传附件"
            :form-id="form.id"
            :bpm-instance-object="props.bpmInstanceObject"
            :form-secret-level="form.secretLevel"
            :allow-download="true"
            table-name="TPM_6S_APPLY"
            @afterUpload="afterUploadEvent"
          />
        </a-form-item>
      </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useTpm6sApplyForm, emits } from './ts/Tpm6sApplyForm'; // 引入表单ts
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'; // 引入富文本依赖
import '@wangeditor/editor/dist/css/style.css'; // 引入富文本样式
const { proxy } = getCurrentInstance();
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
  bpmOperatorRefresh: {
    type: Function
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
  projectCategoryList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  editorRef,
  toolbarConfig,
  editorConfig,
  onCreated,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  autoCode,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useTpm6sApplyForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});

function getInfo() {
  let billNo = autoCode.value.getSegmentValue();
  billNo = billNo.split('$$');
  billNo[1] = proxy.$getLoginUser().entityDeptName;
  form.value.billNo = billNo.toString().replaceAll(',','');
}
</script>
