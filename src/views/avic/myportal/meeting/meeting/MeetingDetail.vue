<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" class="form-excel-style">
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('name')">
          <a-form-item name="name" label="会议名称" :rules="fieldRequired('name')" has-feedback>
            <a-input v-model:value="form.name" :auto-focus="true" :disabled="fieldDisabled('name')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('authorId')">
          <a-form-item name="authorId" label="作者" :rules="fieldRequired('authorId')" has-feedback>
            <AvicCommonSelect v-model:value="form.authorId" type="userSelect" :defaultShowValue="form.authorIdAlias"
              :disabled="fieldDisabled('authorId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('meetingRoomId')">
          <a-form-item name="meetingRoomId" label="会议室" :rules="fieldRequired('meetingRoomId')" has-feedback>
            <AvicModalSelect v-model:value="form.meetingRoomId" :defaultShowValue="form.meetingRoomId" modalTitle="选择会议室"
              placeholder="请选择会议室" valueField="" showField="" :selectComponent="meetingroomComponent"
              :isMultiSelection="false" :allow-clear="true" :disabled="fieldDisabled('meetingRoomId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('meetingRoomName')">
          <a-form-item name="meetingRoomName" label="会议室名称" :rules="fieldRequired('meetingRoomName')" has-feedback>
            <a-input v-model:value="form.meetingRoomName" :disabled="fieldDisabled('meetingRoomName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('ynApprove')">
          <a-form-item name="ynApprove" label="是否需要审批" :rules="fieldRequired('ynApprove')" has-feedback>
            <a-select v-model:value="form.ynApprove" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true"
              :disabled="fieldDisabled('ynApprove')">
              <a-select-option v-for="item in ynApproveList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('preStartTime')">
          <a-form-item name="preStartTime" label="占用开始时间" :rules="fieldRequired('preStartTime')" has-feedback>
            <a-date-picker v-model:value="form.preStartTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('preStartTime')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('startTime')">
          <a-form-item name="startTime" label="会议开始时间" :rules="fieldRequired('startTime')" has-feedback>
            <a-date-picker v-model:value="form.startTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('startTime')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('endTime')">
          <a-form-item name="endTime" label="会议结束时间" :rules="fieldRequired('endTime')" has-feedback>
            <a-date-picker v-model:value="form.endTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('endTime')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('hostId')">
          <a-form-item name="hostId" label="主持人" :rules="fieldRequired('hostId')" has-feedback>
            <AvicCommonSelect v-model:value="form.hostId" type="userSelect" :defaultShowValue="form.hostIdAlias"
              :disabled="fieldDisabled('hostId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('ynValid')">
          <a-form-item name="ynValid" label="是否可用" :rules="fieldRequired('ynValid')" has-feedback>
            <a-select v-model:value="form.ynValid" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true" :disabled="fieldDisabled('ynValid')">
              <a-select-option v-for="item in ynValidList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('content')">
          <a-form-item name="content" label="会议内容" :rules="fieldRequired('content')" has-feedback>
            <a-input v-model:value="form.content" :disabled="fieldDisabled('content')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('meetingTypeId')">
          <a-form-item name="meetingTypeId" label="会议类型" :rules="fieldRequired('meetingTypeId')" has-feedback>
            <a-input v-model:value="form.meetingTypeId" :disabled="fieldDisabled('meetingTypeId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('attendeeIds')">
          <a-form-item name="attendeeIds" label="参会人员" :rules="fieldRequired('attendeeIds')" has-feedback>
            <AvicCommonSelect v-model:value="form.attendeeIds" type="userSelect" :defaultShowValue="form.attendeeIdsAlias"
              :disabled="fieldDisabled('attendeeIds')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-input v-model:value="form.note" :disabled="fieldDisabled('note')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')">
              <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader element-id="1" ref="uploadFile" label="上传附件" :form-id="form.id"
              :bpm-instance-object="props.bpmInstanceObject" :form-secret-level="form.secretLevel" :allow-download="true"
              table-name="MEETING" @afterUpload="afterUploadEvent" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useMeetingForm, emits } from './ts/MeetingForm'; // 引入表单ts
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
  layout,
  colLayout,
  ynApproveList,
  ynValidList,
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
  afterClickBpmButtons
} = useMeetingForm({
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
