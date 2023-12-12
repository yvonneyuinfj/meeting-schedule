<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="750px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        class="form-excel-style"
       >
        <a-row>
         <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="立项编号">
              <a-input
                v-model:value="form.billNo"
                :maxLength="50"
                :auto-focus="true"
                placeholder="请输入"
                readonly                
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptName" label="立项单位">
              <a-input
                v-model:value="form.editDeptName"
                :maxLength="50"                
                placeholder="请输入立项单位ID(冗余)"
                 readOnly
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="problemFinderName" label="问题发现人">
              <a-input
                v-model:value="form.problemFinderName"
                :maxLength="50"
                :auto-focus="true"
                placeholder="请输入问题发现人"
                 readOnly
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="立项名称">
              <a-input
                v-model:value="form.projectName"
                :maxLength="50"
                placeholder="请输入立项名称"
                 readOnly
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="立项时间">
             <a-date-picker
                v-model:value="form.applyDate"
                  format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请输入立项时间"                
                @change="onlyDate"
                disabled
              />
            </a-form-item>
          </a-col>       
           <a-col v-bind="colLayout.cols">
            <a-form-item name="finishDate" label="完成时间" has-feedback>
              <a-date-picker
                v-model:value="form.finishDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择完成时间"
              />
            </a-form-item>
          </a-col>
            <a-col v-bind="colLayout.cols">
            <a-form-item name="location" label="地点位置">
              <a-input
                v-model:value="form.location"
                :maxLength="600"
                placeholder="请输入地点位置"
                 readOnly
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
            <a-form-item name="chargeUserName" label="项目组长">
              <a-input
                v-model:value="form.chargeUserName"
                :maxLength="600"
                placeholder="请输入项目组长"
                 readOnly
              />
            </a-form-item>
          </a-col>   
           <a-col v-bind="colLayout.cols">
            <a-form-item name="problemSolvingEvaluation" label="问题解决评价" has-feedback>
              <a-select
                v-model:value="form.problemSolvingEvaluation"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择问题解决评价"
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
           <a-col v-bind="colLayout.cols2">
            <a-form-item name="teamUserName" label="团队成员">
              <a-textarea
                v-model:value="form.teamUserName"
                :maxLength="600"
                placeholder="请输入团队成员"
                 readOnly
              />
            </a-form-item>
          </a-col>              
          <!-- <a-col v-bind="colLayout.cols2">
            <a-form-item name="problemDescription" label="六源问题描述">
            <div class="Richtext">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                />
                <Editor
                  style="height: 50px; overflow-y: auto"
                  v-model:value="form.problemDescription"
                  :defaultConfig="editorConfig"
                  @onCreated="onCreated"
                />
              </div>             
            </a-form-item>
          </a-col>  -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item
              name="problemDescription"
              label="六源问题描述"
            >
              <a-textarea
                v-model:value="form.problemDescription"
                :rows="2"
                :maxLength="4000"
                placeholder="六源问题描述"
                readOnly
              />
            </a-form-item>
          </a-col>                                     
           <a-col v-bind="colLayout.cols2">
            <a-form-item name="problemSolvingInstruction" label="六源问题解决情况">
            <div class="Richtext">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                />
                <Editor
                  style="height: 150px; overflow-y: auto"
                  v-model:value="form.problemSolvingInstruction"
                  :defaultConfig="editorConfig"
                  @onCreated="onCreated"
                />
              </div>             
            </a-form-item>
          </a-col> 
          
          
         <!--
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billStatus" label="流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过">
              <a-radio-group v-model:value="form.billStatus">
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
                table-name="TPM_6S_RESOLVE_COMPARE"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm" :disabled="showSave">保存</a-button>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess" :disabled="showSaveAndPro">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpm6sResolveCompareForm, emits } from './ts/Tpm6sResolveCompareForm'; // 引入表单ts
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
  showSave,
  showSaveAndPro,
  billStatusList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  toolbarConfig,
  editorConfig,
  onCreated,
  onlyDate,
  editorRef,
  saveAndStartProcess,
  saveForm,
  fieldDisabled,
  closeModal,
  problemSolvingEvaluationList
} = useTpm6sResolveCompareForm({
  props: props,
  emit: emit
});


</script>
