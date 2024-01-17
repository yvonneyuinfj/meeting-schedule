<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
    height="520px"
    @cancel="closeModal"
    style="top: 20px"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="authorId" label="创建人">
              {{ form.authorName }}
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="creationDate" label="创建时间">
              {{ dayjs(form.creationDate).format('YYYY-MM-DD HH:mm') }}
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="type" label="日程类型">
              <a-select
                v-model:value="form.type"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in typeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="name" label="日程主题">
              <a-input v-model:value="form.name" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="startTime" label="开始时间">
              <a-date-picker
                show-time
                v-model:value="form.startTime"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                disabled
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
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="placeName" label="日程地点">
              <a-input
                v-model:value="form.placeName"
                :maxLength="100"
                placeholder="请输入日程地点"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="" label="日程提醒">
              <a-input-number
                v-model:value="form.remindDuration"
                :min="1"
                :max="99"
                :precision="0"
                :step="1"
                disabled
              >
                <template #addonAfter>
                  <span style="display: inline-block; width: 50px">天</span>
                </template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="sharedUserIds" label="共享给">
              <AvicCommonSelect
                v-model:value="form.sharedUserIds"
                type="userSelect"
                :defaultShowValue="form.sharedUserIdsAlias"
                disabled
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
                disabled
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
                disabled
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
                disabled
              />
            </a-form-item>
          </a-col>

          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="authorCode" label="作者职工号">
              <a-input v-model:value="form.authorCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="authorName" label="作者">
              <a-input v-model:value="form.authorName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="placeName" label="日程地点">
              <a-input v-model:value="form.placeName" disabled />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynValid" label="是否可用">
              <a-select
                v-model:value="form.ynValid"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynPublic" label="是否公开">
              <a-select
                v-model:value="form.ynPublic"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in ynPublicList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="content" label="日程内容">
              <a-input v-model:value="form.content" disabled />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="remindType" label="提醒类型">
              <a-select
                v-model:value="form.remindType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col> -->
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
          <a-col v-bind="colLayout.cols2">
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
import { useEventForm, emits } from './ts/EventForm'; // 引入表单ts
import dayjs from 'dayjs';
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  loading,
  typeList,
  remindTypeList,
  secretLevelList,
  closeModal
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
  .avicit-select-box,.ant-picker{
    width:100%;
  }
}
</style>