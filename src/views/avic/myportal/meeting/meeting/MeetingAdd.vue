<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="960px"
    height="520px"
    @cancel="closeModal"
    style="top: 20px"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="0">
          <!-- 创建人 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="authorId" label="创建人">
              {{ form.authorName }}
            </a-form-item>
          </a-col>
          <!-- 创建时间 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="creationDate" label="创建时间">
              {{ dayjs().format('YYYY-MM-DD HH:mm') }}
            </a-form-item>
          </a-col>
          <!-- 会议室 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meetingRoomId" label="会议地点">
              <AvicModalSelect
                v-model:value="form.meetingRoomId"
                :defaultShowValue="form.meetingRoomName"
                title="选择会议室"
                placeholder="请选择会议室"
                valueField="id"
                showField="name"
                :selectComponent="meetingRoomSelectComponent"
                :allow-clear="true"
                @selectConfirm="handleSelectConfirm"
                @clear="handleSelectClear"
                style="top: 20px"
              />
            </a-form-item>
          </a-col>
          <!-- 是否需要审批 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynApprove" label="是否需要审批">
              <a-switch
                v-model:checked="form.ynApprove"
                checked-value="Y"
                un-checked-value="N"
                checked-children="是"
                un-checked-children="否"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2" v-if="form.ynApprove === 'Y'">
            <a-form-item name="approvalIds" label="审批人">
              {{ form.approvalNames }}
            </a-form-item>
          </a-col>
          <!-- 会议名称 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="name" label="会议名称" has-feedback>
              <a-input
                v-model:value="form.name"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入会议名称"
              />
            </a-form-item>
          </a-col>
          <!-- 联系电话 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="phoneNumber" label="联系电话">
              <a-input
                v-model:value="form.phoneNumber"
                :maxLength="50"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col>
          <!-- 占用开始时间 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="preStartTime" label="占用开始时间">
              <a-date-picker
                show-time
                v-model:value="form.preStartTime"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                placeholder="请选择占用开始时间"
              />
            </a-form-item>
          </a-col>
          <!-- 结束时间 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="endTime" label="结束时间">
              <a-date-picker
                show-time
                v-model:value="form.endTime"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                placeholder="请选择结束时间"
              />
            </a-form-item>
          </a-col>
          <!-- 会议开始时间 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="startTime" label="会议开始时间">
              <a-date-picker
                show-time
                v-model:value="form.startTime"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                placeholder="请选择会议开始时间"
              />
            </a-form-item>
          </a-col>
          <!-- 会议密级 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="会议密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择会议密级"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meetingTypeId" label="会议类型">
              <AvicTreeSelect
                v-model:value="form.meetingTypeId"
                baseUrl="/myportal/meeting/meetingtypes"
                :parentId="form.meetingTypeId"
                :parentTitle="form.meetingTypeName"
                :allowSelectNonIsLeaf="false"
                placeholder="请选择会议类型"
                @change="handleTreeSelectChange($event, 'meetingTypeName')"
                @callback="Myfn"
              />
            </a-form-item>
          </a-col>
          <!-- 提前提醒 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="remindDuration" label="提前提醒">
              <a-input-number
                v-model:value="form.remindDuration"
                :min="1"
                :max="99"
                :precision="0"
                :step="1"
              >
                <template #addonAfter>
                  <span style="display: inline-block; width: 50px">天</span>
                </template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="remindType" label="待办提醒">
              <a-select
                v-model:value="form.remindType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择待办提醒"
              >
                <a-select-option
                  v-for="item in remindTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <!-- 会议内容  -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="content" label="会议内容">
              <a-textarea
                v-model:value="form.content"
                :maxLength="512"
                placeholder="请输入会议内容"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <!-- 主持人 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="hostId" label="主持人">
              <AvicCommonSelect
                v-model:value="form.hostId"
                type="userSelect"
                placeholder="请选择主持人"
                @callback="selectCallback('hostName', $event)"
              />
            </a-form-item>
          </a-col>
          <!-- 组织单位 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orgDeptId" label="组织单位">
              <AvicCommonSelect
                v-model:value="form.orgDeptId"
                type="deptSelect"
                placeholder="请选择组织单位"
                @callback="selectCallback('orgDeptName', $event)"
              />
            </a-form-item>
          </a-col>
          <!-- 参会人员 -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="attendeeIds" label="共享给">
              <AvicCommonSelect
                v-model:value="form.attendeeIds"
                type="userSelect"
                placeholder="请选择共享给"
                selectModel="multi"
                @callback="selectCallback('attendeeNames', $event)"
              />
            </a-form-item>
          </a-col>
          <!-- 外来人员 -->
          <!-- 备注 -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="note" label="备注">
              <a-textarea v-model:value="form.note" :maxLength="256" placeholder="请输入备注" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
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
                table-name="MEETING"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- <MeetingUserEdit ref="meetingUserEdit" /> -->
    </a-spin>
    <template #footer>
      <a-button
        title="保存"
        type="primary"
        :loading="loading"
        @click="saveForm"
        v-show="form.ynApprove === 'N'"
      >
        保存
      </a-button>

      <a-button
        title="保存并启动流程"
        type="primary"
        :loading="loading"
        @click="saveAndStartProcess"
        v-show="form.ynApprove === 'Y'"
      >
        保存并启动流程
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMeetingForm, emits } from './ts/MeetingForm'; // 引入表单ts
// import MeetingUserEdit from '@/views/avic/myportal/meeting/meetinguser/MeetingUserEdit.vue'; // 引入子表组件
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
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  }
});
const emit = defineEmits(emits);
const meetingRoomSelectComponent = meetingRoomSelect; // 自定义选择
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  // ynApproveList,
  // ynValidList,
  // ynPublicList,
  // ynNewPlaceList,
  // ynShowEventList,
  // eventTypeList,
  // remindTypeList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  closeModal,
  selectCallback,
  saveAndStartProcess,
  saveForm,
  handleSelectConfirm,
  handleSelectClear,
  handleTreeSelectChange
  // meetingUserEdit
} = useMeetingForm({
  props: props,
  emit: emit
});
function Myfn(e){
  console.log('123',e);
}
</script>
<style lang="less" scoped>
.ant-input-number-group-wrapper {
  width: 100%;
}
</style>
