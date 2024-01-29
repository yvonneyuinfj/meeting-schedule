<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" class="form-excel-style">
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('authorId')">
          <a-form-item
            name="authorId"
            label="创建人"
            :rules="fieldRequired('authorId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.authorId"
              type="userSelect"
              :defaultShowValue="form.authorIdAlias"
              :disabled="fieldDisabled('authorId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('creationDate')">
          <a-form-item name="creationDate" label="创建时间">
            {{ dayjs().format('YYYY-MM-DD HH:mm') }}
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('meetingRoomId')">
          <a-form-item
            name="meetingRoomId"
            label="会议地点"
            :rules="fieldRequired('meetingRoomId')"
            has-feedback
          >
            <AvicModalSelect
              v-model:value="form.meetingRoomId"
              :defaultShowValue="form.meetingRoomName"
              title="选择会议室"
              placeholder="请选择会议室"
              valueField="id"
              showField="name"
              :selectComponent="meetingRoomSelect"
              style="top: 20px"
              :disabled="fieldDisabled('meetingRoomId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('ynApprove')">
          <a-form-item
            name="ynApprove"
            label="是否需要审批"
            :rules="fieldRequired('ynApprove')"
            has-feedback
          >
            <a-switch
              v-model:checked="form.ynApprove"
              checked-value="Y"
              un-checked-value="N"
              checked-children="是"
              un-checked-children="否"
              :disabled="fieldDisabled('ynApprove')"
            />
          </a-form-item>
        </a-col>
        <!-- 审批人 -->
        <a-col
          v-bind="colLayout.cols2"
          v-if="fieldVisible('approvalIds') && form.ynApprove === 'Y'"
        >
          <a-form-item name="approvalIds" label="审批人">
            <a-input
              v-model:value="form.approvalNames"
              :auto-focus="true"
              :disabled="fieldDisabled('approvalNames')"
            />
          </a-form-item>
        </a-col>
        <!-- 会议名称 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('name')">
          <a-form-item name="name" label="会议名称" :rules="fieldRequired('name')" has-feedback>
            <a-input
              v-model:value="form.name"
              :auto-focus="true"
              :disabled="fieldDisabled('name')"
            />
          </a-form-item>
        </a-col>
        <!-- 联系电话 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('phoneNumber')">
          <a-form-item name="phoneNumber" label="联系电话">
            <a-input
              v-model:value="form.phoneNumber"
              :maxLength="50"
              placeholder="请输入联系电话"
              :disabled="fieldDisabled('phoneNumber')"
            />
          </a-form-item>
        </a-col>
        <!-- 占用开始时间 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('preStartTime')">
          <a-form-item
            name="preStartTime"
            label="占用开始时间"
            :rules="fieldRequired('preStartTime')"
            has-feedback
          >
            <a-date-picker
              show-time
              v-model:value="form.preStartTime"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              :disabled="fieldDisabled('preStartTime')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('endTime')">
          <a-form-item
            name="endTime"
            label="会议结束时间"
            :rules="fieldRequired('endTime')"
            has-feedback
          >
            <a-date-picker
              show-time
              v-model:value="form.endTime"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              :disabled="fieldDisabled('endTime')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('startTime')">
          <a-form-item
            name="startTime"
            label="会议开始时间"
            :rules="fieldRequired('startTime')"
            has-feedback
          >
            <a-date-picker
              show-time
              v-model:value="form.startTime"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              :disabled="fieldDisabled('startTime')"
            />
          </a-form-item>
        </a-col>
        <!-- 会议密级 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item
            name="secretLevel"
            label="会议密级"
            :rules="fieldRequired('secretLevel')"
            has-feedback
          >
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

        <!-- 会议类型 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('meetingTypeIdAlias')">
          <a-form-item
            name="meetingTypeId"
            label="会议类型"
            :rules="fieldRequired('meetingTypeId')"
            has-feedback
          >
            <AvicTreeSelect
              v-model:value="form.meetingTypeId"
              baseUrl="/myportal/meeting/meetingtypes"
              :parentId="form.meetingTypeId"
              :parentTitle="form.meetingTypeName"
              :allowSelectNonIsLeaf="false"
              placeholder="请选择会议类型"
              @change="handleTreeSelectChange($event, 'meetingTypeName')"
              :disabled="fieldDisabled('meetingTypeId')"
            />
          </a-form-item>
        </a-col>
        <!-- 提前提醒 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('remindDuration')">
          <a-form-item name="remindDuration" label="提前提醒">
            <!-- <a-input-number
              v-model:value="form.remindDuration"
              :min="1"
              :max="99"
              :precision="0"
              :step="1"
              :disabled="fieldDisabled('remindDuration')"
            >
              <template #addonAfter>
                <span style="display: inline-block; width: 50px">天</span>
              </template>
            </a-input-number> -->
            <span style="margin-left: 3px;margin-right: 3px;">{{ form.remindDuration }}</span>天
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('content')">
          <a-form-item
            name="content"
            label="会议内容"
            :rules="fieldRequired('content')"
            has-feedback
          >
            <a-textarea v-model:value="form.content" :disabled="fieldDisabled('content')" />
          </a-form-item>
        </a-col>
        <!-- 主持人 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('hostId')">
          <a-form-item name="hostId" label="主持人" :rules="fieldRequired('hostId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.hostId"
              type="userSelect"
              :defaultShowValue="form.hostIdAlias"
              :disabled="fieldDisabled('hostId')"
            />
          </a-form-item>
        </a-col>
        <!-- 组织单位 -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('orgDeptId')">
          <a-form-item name="orgDeptId" label="组织单位">
            <AvicCommonSelect
              v-model:value="form.orgDeptId"
              :defaultShowValue="form.orgDeptIdAlias"
              type="deptSelect"
              placeholder="请选择组织单位"
              @callback="selectCallback('orgDeptName', $event)"
              :disabled="fieldDisabled('orgDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('attendeeIds')">
          <a-form-item
            name="attendeeIds"
            label="参会人员"
            :rules="fieldRequired('attendeeIds')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.attendeeIds"
              type="userSelect"
              :defaultShowValue="form.attendeeIdsAlias"
              :disabled="fieldDisabled('attendeeIds')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-textarea v-model:value="form.note" :disabled="fieldDisabled('note')" />
          </a-form-item>
        </a-col>

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
              table-name="MEETING"
              @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useMeetingForm, emits } from './ts/MeetingForm'; // 引入表单ts
import meetingRoomSelect from '@/views/avic/myportal/meeting/meetingroom/MeetingRoomSelect.vue'; // 引入弹窗选择页
import dayjs from 'dayjs';
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
  // ynApproveList,
  // ynValidList,
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
  afterClickBpmButtons,
  handleTreeSelectChange,
  selectCallback
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
