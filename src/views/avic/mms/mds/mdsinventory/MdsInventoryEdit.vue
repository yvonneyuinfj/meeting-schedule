<template>
  <AvicModal :visible="true" title="编辑" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">

          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="parentMdsInventoryId" label="上级库房ID">
              <a-input v-model:value="form.parentMdsInventoryId" :maxLength="64" :auto-focus="true" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsInventoryAlias" label="上级库房">
              <a-input v-model:value="form.parentMdsInventoryIdAlias" :maxLength="64" :auto-focus="true"
                placeholder="选择上级库房" @click="inventoryClick">
                <template #suffix>
                  <a-tooltip title="库房">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsProjectId" label="项目ID ^ ">
              <AvicModalSelect
                v-model:value="form.mdsProjectId"
                title="选择项目ID ^ "
                placeholder="请选择项目ID ^ "
                valueField=""
                showField=""
                :selectComponent="mdsProjectSelectComponent"
                :defaultShowValue="form.mdsProjectId"
                :allow-clear="true"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryCode" label="库房代码 " has-feedback>
              <a-input v-model:value="form.inventoryCode" :maxLength="64" :auto-focus="true" placeholder="请输入库房代码 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryName" label="库房名称">
              <a-input v-model:value="form.inventoryName" :maxLength="128" placeholder="请输入库房名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="inventoryLocation" label="库房地点">
              <a-input v-model:value="form.inventoryLocation" :maxLength="128" placeholder="请输入库房地点" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryTypeId" label="库房类别 " has-feedback>
              <a-select v-model:value="form.mdsInventoryTypeId"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择库房类别 ">
                    <a-select-option v-for="item in mdsInventoryTypeIdList" :key="item.id"
                      :value="item.id">
                    {{ item.invTypeCode }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="validFlag" label="库房是否有效 " has-feedback>
                <a-select v-model:value="form.validFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择库房是否有效">
                  <a-select-option v-for="item in validFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="inventoryDeptId" label="库房所属部门" has-feedback>
                <AvicCommonSelect v-model:value="form.inventoryDeptId" type="deptSelect" placeholder="库房所属部门"
                  :defaultShowValue="form.inventoryDeptName" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="inventoryDeptCode" label="库房所属部门编码">
                <a-input v-model:value="form.inventoryDeptCode" :maxLength="64" placeholder="请输入库房所属部门编码" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="inventoryDeptName" label="库房所属部门名称">
                <a-input v-model:value="form.inventoryDeptName" :maxLength="128" placeholder="请输入库房所属部门名称" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="contactUserId" label="联系人">
                <AvicCommonSelect v-model:value="form.contactUserId" type="userSelect" placeholder="请选择联系人"
                  :defaultShowValue="form.contactUserName" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="contactUserCode" label="联系人编码">
                <a-input v-model:value="form.contactUserCode" :maxLength="64" placeholder="请输入联系人编码" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="contactUserName" label="联系人姓名">
                <a-input v-model:value="form.contactUserName" :maxLength="128" placeholder="请输入联系人姓名" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="contactTel" label="联系电话 ^">
                <a-input v-model:value="form.contactTel" :maxLength="32" placeholder="请输入联系电话" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="note" label="备注">
                <a-input v-model:value="form.note" :maxLength="2048" placeholder="请输入备注" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transactionType" label="业务类型" has-feedback>
              <a-select v-model:value="form.transactionType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择业务类型">
                <a-select-option v-for="item in transactionTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="quanlityType" label="质量状态">
              <a-select v-model:value="form.quanlityType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择质量状态">
                <a-select-option v-for="item in quanlityTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsAreaId" label="区域ID">
              <AvicModalSelect
                v-model:value="form.mdsAreaId"
                title="选择区域ID"
                placeholder="请选择区域ID"
                valueField=""
                showField=""
                :selectComponent="mdsAreaSelectComponent"
                :defaultShowValue="form.mdsAreaId"
                :allow-clear="true"
              />
            </a-form-item>
          </a-col> -->
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageItemCategory" label="库房所存储物料品类">
              <a-input v-model:value="form.storageItemCategory" :maxLength="128" placeholder="请输入库房所存储物料品类" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <MdsInventorySelect v-if="mdsInventoryModal" ref="mdsInventorySelect" :visible="mdsInventoryModal"
      @closeCancel="closeInventory" @getInventoryId="getInventoryId" />
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsInventoryForm, emits } from './ts/MdsInventoryForm'; // 引入表单ts
import MdsInventorySelect from '@/views/avic/mms/mds/mdsinventory/MdsInventorySelect.vue'; // 引入弹窗选择页
// import mdsProjectSelect from '@/views/avic/mms/mds/mdsproject/MdsProjectSelect.vue'; // 引入弹窗选择页
// import mdsAreaSelect from '@/views/avic/mms/mds/mdsproject/MdsAreaSelect.vue'; // 引入弹窗选择页
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const mdsInventoryModal = ref<boolean>(false);// 是否展示库房弹窗
const mdsInventorySelect = ref(null);
// const mdsInventorySelectComponent = mdsInventorySelect;// 自定义选择
// const mdsProjectSelectComponent = mdsProjectSelect;// 自定义选择
// const mdsAreaSelectComponent = mdsAreaSelect;// 自定义选择
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  mdsInventoryTypeIdList,
  transactionTypeList,
  quanlityTypeList,
  validFlagList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsInventoryForm({
  props: props,
  emit: emit
});
/** 库房弹窗 */
const inventoryClick = () => {
  mdsInventoryModal.value = true;
};
/** 关闭库房弹窗 */
const closeInventory = () => {
  mdsInventoryModal.value = false;
};
const getInventoryId = (v) => {
  form.value.parentMdsInventoryId = v.id;
  form.value.parentMdsInventoryIdAlias = v.inventoryName;
  mdsInventoryModal.value = false;
};
</script>


