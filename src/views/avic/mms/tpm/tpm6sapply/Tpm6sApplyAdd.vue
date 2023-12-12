<template>
  <AvicModal
    :visible="true"
    title="添加"
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
        class="form-excel-style"
      >
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billNo" label="立项编号" has-feedback>
              <avic-auto-code
                v-model:value="form.billNo"
                ref="autoCode"
                code-type="TPM_6S_APPLY_NUMBER"
                code-param="TPM_6S_APPLY"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入立项编号"
                @change='getInfo'
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editDeptName" label="立项单位" has-feedback>
              <AvicCommonSelect
                v-model:value="form.editDeptName"
                type="deptSelect"
                placeholder="请选择立项单位"
                :defaultShowValue="form.editDeptName"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="problemFinderId" label="问题发现人" has-feedback>
              <AvicCommonSelect
                v-model:value="form.problemFinderId"
                type="userSelect"
                placeholder="请选择问题发现人"
                :defaultShowValue="form.problemFinderName"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="projectCategory" label="‘六源’问题立项">
              <a-checkbox-group v-model:value="form.projectCategory" button-style="solid" :auto-focus="true">
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目立项名称" has-feedback>
              <a-input
                v-model:value="form.projectName"
                :maxLength="200"
                placeholder="请输入项目立项名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="提出时间" has-feedback>
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择提出时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planFinishDate" label="计划完成时间" has-feedback>
              <a-date-picker
                v-model:value="form.planFinishDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择计划完成时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="location" label="地点/位置" has-feedback>
              <a-input
                v-model:value="form.location"
                :maxLength="512"
                placeholder="请输入地点/位置"
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
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item
              name="problemDescription"
              label="‘六源’问题描述"
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
          <a-col v-bind="colLayout.cols3">
            <a-form-item
              name="problemAdvice"
              label="‘六源’问题改善建议"
            >
              <a-textarea
                v-model:value="form.problemAdvice"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入‘六源’问题改善建议"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="chargeUserId" label="项目组长" has-feedback>
              <AvicCommonSelect
                v-model:value="form.chargeUserId"
                type="userSelect"
                placeholder="请选择项目组长"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item name="teamUserId" label="团队成员" has-feedback>
              <AvicCommonSelect
                v-model:value="form.teamUserId"
                type="userSelect"
                placeholder="请选择团队成员"
                selectModel="multi"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols3">
            <a-form-item
              label="附件"
            >
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
                table-name="TPM_6S_APPLY"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="保存并返回" type="primary" :loading="loading" @click="saveAndClose">保存并返回</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpm6sApplyForm, emits } from './ts/Tpm6sApplyForm'; // 引入表单ts
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'; // 引入富文本依赖
import '@wangeditor/editor/dist/css/style.css'; // 引入富文本样式
import {useUserStore} from "@/store/user";
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
const userStore = useUserStore();
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  projectCategoryList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  editorRef,
  toolbarConfig,
  editorConfig,
  onCreated,
  autoCode,
  saveAndStartProcess,
  saveAndClose,
  closeModal
} = useTpm6sApplyForm({
  props: props,
  emit: emit
});

function getInfo() {
  let billNo = autoCode.value.getSegmentValue();
  billNo = billNo.split('$$');
  billNo[1] = userStore.userInfo.deptName;
  form.value.billNo = billNo.toString().replaceAll(',','');
}
</script>
