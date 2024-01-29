<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="960px"
    height="520px"
    @cancel="closeModal"
    style="top:20px"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
      >
        <a-row :gutter="16">
          <!-- 创建人 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item label="创建人">
              {{ form.createdByAlias }}
            </a-form-item>
          </a-col>
          <!-- 创建时间 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="creationDate" label="创建时间">
              {{ dayjs().format('YYYY-MM-DD HH:mm') }}
            </a-form-item>
          </a-col>
          <!-- 会议室名称 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="name" label="会议室名称" has-feedback>
              <a-input
                v-model:value="form.name"
                :maxLength="100"
                :auto-focus="true"
                placeholder="请输入会议室名称"
              />
            </a-form-item>
          </a-col>
          <!-- 会议室位置 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="locationName" label="会议室位置">
              <a-input
                v-model:value="form.locationName"
                :maxLength="100"
                placeholder="请输入会议室位置"
              />
            </a-form-item>
          </a-col>
          <!-- 可容纳人数 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="capacity" label="可容纳人数">
              <a-input-number
                v-model:value="form.capacity"
                :min="0"
                :max="9999"
                :precision="0"
                :step="1"
                placeholder="请输入可容纳人数"
              />
            </a-form-item>
          </a-col>
          <!-- 联系电话 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="adminPhone" label="联系电话">
              <a-input
                v-model:value="form.adminPhone"
                :maxLength="100"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col>
          <!-- 管理员 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="adminId" label="管理员">
              <AvicCommonSelect
                v-model:value="form.adminId"
                type="userSelect"
                placeholder="请选择管理员"
              />
            </a-form-item>
          </a-col>
          <!-- 管理部门 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ownerDeptId" label="管理部门">
              <AvicCommonSelect
                v-model:value="form.ownerDeptId"
                type="deptSelect"
                placeholder="请选择管理部门"
              />
            </a-form-item>
          </a-col>
          <!-- 会议室类别 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="type" label="会议室类别">
              <a-select
                v-model:value="form.type"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择会议室类别"
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
          <!-- 是否需要审批 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynApprove" label="是否需要审批">
              <a-switch
                v-model:checked="form.ynApprove"
                checked-value="Y"
                un-checked-value="N"
                checked-children="是"
                un-checked-children="否"
              />
            </a-form-item>
          </a-col>
          <!-- 审批人员 -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="approvalIds" label="审批人员">
              <AvicCommonSelect
                v-model:value="form.approvalIds"
                type="userSelect"
                placeholder="请选择审批人员"
                selectModel="multi"
                @callback="selectCallback('approvalNames',$event)"
              />
            </a-form-item>
          </a-col>
          <!-- 会议室设备 -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="mtDeviceNames" label="会议室设备">
              <a-input
                v-model:value="form.mtDeviceNames"
                :maxLength="4000"
                placeholder="请输入会议室设备"
              />
            </a-form-item>
          </a-col>
          <!-- 会议室描述 -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="descrption" label="会议室描述">
              <a-textarea
                v-model:value="form.descrption"
                :maxLength="512"
                placeholder="请输入会议室描述"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderBy" label="排序">
              <a-input-number
                v-model:value="form.orderBy"
                :min="0"
                :max="999"
                :precision="0"
                :step="1"
                placeholder="请输入排序"
              />
            </a-form-item>
          </a-col>

          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="ynPublic" label="是否公开">
              <a-select
                v-model:value="form.ynPublic"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否公开"
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
          </a-col> -->

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
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="256"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col> -->
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
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMeetingRoomForm, emits } from './ts/MeetingRoomForm'; // 引入表单ts
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
  rules,
  layout,
  colLayout,
  loading,
  // ynPublicList,
  // ynApproveList,
  // ynValidList,
  secretLevelList,
  typeList,
  selectCallback,
  saveForm,
  closeModal
} = useMeetingRoomForm({
  props: props,
  emit: emit
});
</script>

