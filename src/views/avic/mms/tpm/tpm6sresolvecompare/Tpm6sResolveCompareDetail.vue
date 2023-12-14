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
            <a-input
                v-model:value="form.billNo"
                :disabled="fieldDisabled('billNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('editDeptName')">
          <a-form-item name="editDeptName" label="立项单位" :rules="fieldRequired('editDeptName')" has-feedback>
            <a-input
                v-model:value="form.editDeptName"
                :disabled="fieldDisabled('editDeptName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('problemFinderName')">
          <a-form-item name="problemFinderName" label="问题发现人" :rules="fieldRequired('problemFinderName')"
                       has-feedback>
            <a-input
                v-model:value="form.problemFinderName"
                :disabled="fieldDisabled('problemFinderName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectName')">
          <a-form-item name="projectName" label="立项名称" :rules="fieldRequired('projectName')" has-feedback>
            <a-input
                v-model:value="form.projectName"
                :disabled="fieldDisabled('projectName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="立项时间" :rules="fieldRequired('applyDate')" has-feedback>
            <a-input
                v-model:value="form.applyDate"
                :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('finishDate')">
          <a-form-item name="finishDate" label="完成时间" :rules="fieldRequired('finishDate')" has-feedback>
            <a-date-picker
                v-model:value="form.finishDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                :disabled="fieldDisabled('finishDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('location')">
          <a-form-item name="location" label="地点位置" :rules="fieldRequired('location')" has-feedback>
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('chargeUserName')">
          <a-form-item name="chargeUserName" label="项目组长" :rules="fieldRequired('chargeUserName')" has-feedback>
            <a-input
                v-model:value="form.chargeUserName"
                :disabled="fieldDisabled('chargeUserName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('problemSolvingEvaluation')">
          <a-form-item name="problemSolvingEvaluation" label="问题的解决评价"
                       :rules="fieldRequired('problemSolvingEvaluation')" has-feedback>
            <a-select
                v-model:value="form.problemSolvingEvaluation"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                :disabled="fieldDisabled('problemSolvingEvaluation')"
            >
              <a-select-option
                  v-for="item in problemSolvingEvaluationList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('teamUserName')">
          <a-form-item name="teamUserName" label="团队成员" :rules="fieldRequired('teamUserName')" has-feedback>
            <a-textarea
                v-model:value="form.teamUserName"
                :disabled="fieldDisabled('teamUserName')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item name="problemDescription" label="问题描述">
            <div class="Richtext">
              <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="problemDescriptionEditorRef"
                  :defaultConfig="SToolbarConfig"
              />
              <Editor
                  style="height: 150px; overflow-y: auto"
                  v-model:value="form.problemDescription"
                  :defaultConfig="SEditorConfig"
                  @onCreated="SOnCreated"
              />
            </div>
          </a-form-item>
        </a-col>
        <!--        <a-col v-bind="colLayout.cols2">-->
        <!--          <a-form-item-->
        <!--              name="problemDescription"-->
        <!--              label="问题描述"-->
        <!--          >-->
        <!--            <a-textarea-->
        <!--                v-model:value="form.problemDescription"-->
        <!--                :rows="2"-->
        <!--                :maxLength="4000"-->
        <!--                placeholder="问题描述"-->
        <!--                readOnly-->
        <!--            />-->
        <!--          </a-form-item>-->
        <!--        </a-col>-->
        <a-col v-bind="colLayout.cols2">
          <a-form-item name="problemSolvingInstruction" label="问题解决情况">
            <div class="Richtext">
              <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
              />
              <Editor
                  style="height: 50px; overflow-y: auto"
                  v-model:value="form.problemSolvingInstruction"
                  :defaultConfig="editorConfig"
                  @onCreated="onCreated"
              />
            </div>
          </a-form-item>
        </a-col>
        <!--   <a-col v-bind="colLayout.cols" v-if="fieldVisible('billStatus')">
             <a-form-item name="billStatus" label="流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过" :rules="fieldRequired('billStatus')" has-feedback>
               <a-radio-group v-model:value="form.billStatus" :disabled="fieldDisabled('billStatus')">
                 <a-radio
                   v-for="item in billStatusList"
                   :key="item.sysLookupTlId"
                   :value="item.lookupCode"
                 >
                   {{ item.lookupName }}
                 </a-radio>
               </a-radio-group>
             </a-form-item>
           </a-col>
          -->
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader
                element-id="1"
                ref="uploadFile"
                label="上传附件"
                :form-id="form.id"
                :bpm-instance-object="props.bpmInstanceObject"
                :form-secret-level="form.secretLevel"
                :allow-download="true"
                table-name="TPM_6S_RESOLVE_COMPARE"
                @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { emits, useTpm6sResolveCompareForm } from './ts/Tpm6sResolveCompareForm'; // 引入表单ts
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
  problemSolvingEvaluationList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  toolbarConfig,
  editorConfig,
  onCreated,
  editorRef,
  SToolbarConfig,
  SEditorConfig,
  SOnCreated,
  problemDescriptionEditorRef,
  afterClickBpmButtons
} = useTpm6sResolveCompareForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>
