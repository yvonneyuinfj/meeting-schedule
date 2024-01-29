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
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="authorId" label="创建人">
              {{ form.authorName }}
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="creationDate" label="创建时间">
              {{ dayjs().format('YYYY-MM-DD HH:mm') }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="eventType" label="日程类型">
              <a-select
                v-model:value="form.eventType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择日程类型"
              >
                <a-select-option
                  v-for="item in eventTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="name" label="日程主题" has-feedback>
              <a-input
                v-model:value="form.name"
                :maxLength="100"
                :auto-focus="true"
                placeholder="请输入日程主题"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="startTime" label="开始时间">
              <a-date-picker
                show-time
                v-model:value="form.startTime"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                placeholder="请选择开始时间"
              />
            </a-form-item>
          </a-col>
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
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="时间范围">
              <a-range-picker
                v-model:value="rangeTime"
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                :placeholder="['开始时间', '结束时间']"
                @change="onRangeChange"
              />
            </a-form-item>
          </a-col> -->

          <a-col v-bind="colLayout.cols">
            <a-form-item name="meetingRoomName" label="日程地点">
              <a-input
                v-model:value="form.meetingRoomName"
                :maxLength="100"
                placeholder="请输入日程地点"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="remindDuration" label="日程提醒">
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
            <a-form-item name="ynValid" label="是否可用">
              <a-select
                v-model:value="form.ynValid"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否可用"
              >
                <a-select-option
                  v-for="item in ynValidList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="remindType" label="待办提醒">
              <a-select
                v-model:value="form.remindType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择待办提醒类型"
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
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynPublic" label="是否公开">
              <a-switch
                v-model:checked="form.ynPublic"
                checked-value="Y"
                un-checked-value="N"
                checked-children="是"
                un-checked-children="否"
              />
              <a-alert message="公开后同步日程看板" type="info" show-icon />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols2">
            <a-form-item name="content" label="日程内容">
              <a-textarea
                v-model:value="form.content"
                :maxLength="512"
                placeholder="请输入日程内容"
                allow-clear
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
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useEventForm, emits } from './ts/EventForm'; // 引入表单ts
import dayjs from 'dayjs';
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  dateInfo: {
    type:Object,
    default:null
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
  eventTypeList,
  remindTypeList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal,
  selectCallback
} = useEventForm({
  props: props,
  emit: emit
});
</script>
<style lang="less" scoped>
.ant-input-number-group-wrapper {
  width: 100%;
}

:deep(.ant-form-item-control-input-content) {
  display: flex;
  align-items: center;
  .ant-alert {
    margin: 0 8px;
    padding: 4px 12px 4px 8px;
  }
  .avicit-select-box,
  .ant-picker {
    width: 100%;
  }
}
</style>
