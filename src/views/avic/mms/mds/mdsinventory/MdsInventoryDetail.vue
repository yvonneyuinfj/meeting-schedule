<template>
  <AvicModal :visible="true" title="详情" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsInventoryId" label="上级库房">
              <AvicModalSelect v-model:value="form.parentMdsInventoryIdAlias"
                :defaultShowValue="form.parentMdsInventoryIdAlias" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsProjectId" label="项目ID ^ ">
              <AvicModalSelect v-model:value="form.mdsProjectId" :defaultShowValue="form.mdsProjectId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryCode" label="库房代码 ">
              <a-input v-model:value="form.inventoryCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryName" label="库房名称">
              <a-input v-model:value="form.inventoryName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryLocation" label="库房地点">
              <a-input v-model:value="form.inventoryLocation" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryTypeId" label="库房类别 ">
              <a-select v-model:value="form.mdsInventoryTypeId"
                :get-popup-container="(triggerNode) => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in mdsInventoryTypeIdList" :key="item.sysLookupTlId"
                  :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="库房是否有效 ">
              <a-select v-model:value="form.validFlag" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in validFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryDeptId" label="库房所属部门">
              <AvicCommonSelect v-model:value="form.inventoryDeptId" type="deptSelect" placeholder="库房所属部门"
                :defaultShowValue="form.inventoryDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="inventoryDeptCode" label="库房所属部门编码">
              <a-input v-model:value="form.inventoryDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="inventoryDeptName" label="库房所属部门名称">
              <a-input v-model:value="form.inventoryDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contactUserId" label="联系人">
              <AvicCommonSelect v-model:value="form.contactUserId" type="userSelect" placeholder="请选择联系人"
                :defaultShowValue="form.contactUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="contactUserCode" label="联系人编码">
              <a-input v-model:value="form.contactUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="contactUserName" label="联系人姓名">
              <a-input v-model:value="form.contactUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contactTel" label="联系电话 ^">
              <a-input v-model:value="form.contactTel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注 ^">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionType" label="业务类型">
              <a-select v-model:value="form.transactionType"
                :get-popup-container="(triggerNode) => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in transactionTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="quanlityType" label="质量状态">
              <a-select v-model:value="form.quanlityType" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in quanlityTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsAreaId" label="区域ID">
              <AvicModalSelect v-model:value="form.mdsAreaId" :defaultShowValue="form.mdsAreaId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageItemCategory" label="库房所存储物料品类">
              <a-input v-model:value="form.storageItemCategory" disabled />
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
import { useMdsInventoryForm, emits } from './ts/MdsInventoryForm'; // 引入表单ts
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
  mdsInventoryTypeIdList,
  transactionTypeList,
  quanlityTypeList,
  validFlagList,
  secretLevelList,
  closeModal
} = useMdsInventoryForm({
  props: props,
  emit: emit
});
</script>


