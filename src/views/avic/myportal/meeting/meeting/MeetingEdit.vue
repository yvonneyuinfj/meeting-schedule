<template>
  <AvicModal :visible="true" title="编辑" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="name" label="会议名称" has-feedback>
              <a-input v-model:value="form.name" :maxLength="128" :auto-focus="true" placeholder="请输入会议名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="authorId" label="作者">
              <AvicCommonSelect v-model:value="form.authorId" type="userSelect" placeholder="请选择作者"
                :defaultShowValue="form.authorIdAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meetingRoomId" label="会议室">
              <AvicModalSelect v-model:value="form.meetingRoomId" title="选择会议室" placeholder="请选择会议室" valueField=""
                showField="" :selectComponent="meetingroomComponent" :defaultShowValue="form.meetingRoomId"
                :allow-clear="true" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meetingRoomName" label="会议室名称">
              <a-input v-model:value="form.meetingRoomName" :maxLength="128" placeholder="请输入会议室名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynApprove" label="是否需要审批">
              <a-select v-model:value="form.ynApprove" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否需要审批">
                <a-select-option v-for="item in ynApproveList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="preStartTime" label="占用开始时间">
              <a-date-picker v-model:value="form.preStartTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择占用开始时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="startTime" label="会议开始时间">
              <a-date-picker v-model:value="form.startTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择会议开始时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="endTime" label="会议结束时间">
              <a-date-picker v-model:value="form.endTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择会议结束时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="hostId" label="主持人">
              <AvicCommonSelect v-model:value="form.hostId" type="userSelect" placeholder="请选择主持人"
                :defaultShowValue="form.hostIdAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynValid" label="是否可用">
              <a-select v-model:value="form.ynValid" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否可用">
                <a-select-option v-for="item in ynValidList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="content" label="会议内容">
              <a-input v-model:value="form.content" :maxLength="512" placeholder="请输入会议内容" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meetingTypeId" label="会议类型">
              <a-input v-model:value="form.meetingTypeId" :maxLength="64" placeholder="请输入会议类型" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="attendeeIds" label="参会人员">
              <AvicCommonSelect v-model:value="form.attendeeIds" type="userSelect" placeholder="请选择参会人员"
                :defaultShowValue="form.attendeeIdsAlias" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" :maxLength="256" placeholder="请输入备注" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="edit" ref="uploadFile" :allow-download="true" :allow-preview="true"
                :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                :form-secret-level="form.secretLevel" table-name="MEETING" @afterUpload="afterUploadEvent" />
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
import { useMeetingForm, emits } from './ts/MeetingForm'; // 引入表单ts
import meetingroom from '@/views/avic/myportal/meeting/meetingroom/MeetingRoomSelect.vue'; // 引入弹窗选择页
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
const meetingroomComponent = meetingroom;// 自定义选择
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  ynApproveList,
  ynValidList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = useMeetingForm({
  props: props,
  emit: emit
});
</script>
